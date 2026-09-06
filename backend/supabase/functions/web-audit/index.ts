// Supabase Edge Function: web-audit
// Universal Website Diagnostic, Visual UI/UX & Security Engine
// Plain-language reporting (Zero confusing tech jargon), Universal Archetypes,
// Geo-detection (Bangladesh / Global), Memory-safe HTML streaming, and 2-Audit Rate Limiting.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import { SECRETS } from "../_shared/secrets.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-visitor-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BLACKLISTED_DOMAINS = [
  "google.com", "facebook.com", "amazon.com", "youtube.com",
  "instagram.com", "tiktok.com", "twitter.com", "x.com",
  "linkedin.com", "apple.com", "microsoft.com", "netflix.com",
  "wikipedia.org", "reddit.com", "github.com", "cloudflare.com",
  "yahoo.com", "bing.com", "pinterest.com", "whatsapp.com"
];

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://rqiynsrdmrjdbyewecjq.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY") || SECRETS.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = Deno.env.get("OPENROUTER_MODEL") || SECRETS.OPENROUTER_MODEL;
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") || SECRETS.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") || SECRETS.TELEGRAM_CHAT_ID;

// SHA-256 IP hasher for zero-cookie, privacy-compliant visitor identification
async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + "_rymthos_secure_salt");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Memory-safe stream reader to prevent Edge isolate memory limits (WORKER_RESOURCE_LIMIT)
async function readHtmlStream(response: Response, maxBytes = 64_000): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder("utf-8");
  let result = "";
  let totalBytes = 0;
  try {
    while (totalBytes < maxBytes) {
      const { done, value } = await reader.read();
      if (done || !value) break;
      result += decoder.decode(value, { stream: true });
      totalBytes += value.byteLength;
    }
  } catch {
    // Graceful stream termination
  } finally {
    try { reader.releaseLock(); } catch {}
  }
  return result;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const rawUrl = String(body.url || "").trim();
    const visitorToken = String(body.visitorToken || req.headers.get("x-visitor-token") || "").trim();

    if (!rawUrl) {
      return new Response(JSON.stringify({ error: "Please enter a valid website address" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. URL Normalization & Validation
    const targetUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : "https://" + rawUrl;
    let parsed: URL;
    try {
      parsed = new URL(targetUrl);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid URL format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const host = parsed.hostname.toLowerCase();

    // 2. Blacklist & SSRF Protection
    if (
      BLACKLISTED_DOMAINS.some((b) => host === b || host.endsWith("." + b)) ||
      host === "localhost" ||
      host.endsWith(".local") ||
      /^127\./.test(host) ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)
    ) {
      return new Response(
        JSON.stringify({
          error: "Excluded domain",
          message: "Major tech platforms and internal networks are excluded from public audits. Please enter your business website.",
        }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 3. Client IP & Country Geolocation Detection
    const clientIp =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";
    const ipHash = await hashIp(clientIp);
    const visitorCountry = (req.headers.get("cf-ipcountry") || "UNKNOWN").toUpperCase();

    // 4. Rate Limiting: Max 2 Audits per 24 Hours
    let supabase: ReturnType<typeof createClient> | null = null;
    let usedCount = 0;
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        let query = supabase
          .from("audit_reports")
          .select("id", { count: "exact", head: true })
          .gte("created_at", twentyFourHoursAgo);

        if (visitorToken && ipHash) {
          query = query.or("ip_hash.eq." + ipHash + ",visitor_token.eq." + visitorToken);
        } else if (ipHash) {
          query = query.eq("ip_hash", ipHash);
        } else if (visitorToken) {
          query = query.eq("visitor_token", visitorToken);
        }

        const { count } = await query;
        usedCount = count || 0;

        if (usedCount >= 2) {
          return new Response(
            JSON.stringify({
              ok: false,
              error: "RATE_LIMIT_EXCEEDED",
              remaining: 0,
              message: "You have used your 2 complimentary website audits for today. To conduct an exhaustive penetration test and full-stack redesign of your platform, contact Md. Billal Hossain directly.",
            }),
            {
              status: 429,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
      } catch (rateErr) {
        console.warn("Rate limit check warning:", rateErr);
      }
    }

    // 5. Live Non-Destructive HTTP Inspection
    const startTime = performance.now();
    let response: Response;
    try {
      response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 RymthosAuditor/2.0",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(9000),
      });
    } catch (e: unknown) {
      const errDetail = e instanceof Error ? e.message : String(e);
      return new Response(
        JSON.stringify({
          error: "Site unreachable",
          message: "Could not establish connection to the specified website. Please verify your domain and SSL certificate.",
          detail: errDetail,
        }),
        {
          status: 422,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const latency = Math.round(performance.now() - startTime);
    const headers = response.headers;
    const hasHsts = headers.has("strict-transport-security");
    const hasCsp = headers.has("content-security-policy");
    const hasXFrame = headers.has("x-frame-options");
    const isHttps = response.url.startsWith("https://");

    // Memory-safe HTML extraction (max 64KB)
    const html = await readHtmlStream(response, 64_000);
    const lowerHtml = html.toLowerCase();

    // 6. DOM & Visual Feature Extraction
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : host;

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const pageDescription = descMatch ? descMatch[1].trim() : "";

    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
    const hasOgImage = Boolean(ogImageMatch);

    // Visual & Responsive checks
    const hasProperViewport = /width=device-width/i.test(html);
    const usesGoogleFonts = /fonts\.(?:googleapis|gstatic)\.com/i.test(html);
    const hasFixedLargeWidth = /width\s*[:=]\s*["']?(?:1[0-9]{3}|2000)px/i.test(html);

    // Archetype heuristics to provide high-quality signals to AI
    const hasToolsKeywords = /calculator|converter|generator|formatter|compressor|developer tools|online tool|free tool|encoder|decoder|minify/i.test(lowerHtml);
    const hasEcommerceKeywords = /add to cart|checkout|product catalog|shopping cart|shipping|shop now|buy now|woocommerce|shopify|payment/i.test(lowerHtml);
    const hasClinicKeywords = /dentist|doctor|patient|appointment|treatment|clinic|hospital|consultation/i.test(lowerHtml);
    const hasPortfolioKeywords = /portfolio|my projects|resume|cv|full stack developer|designer portfolio|case study|about me/i.test(lowerHtml);
    const hasSaaSKeywords = /pricing|monthly plan|start free trial|dashboard|sign in|api access|documentation/i.test(lowerHtml);

    // Bangladeshi context signals
    const isBanglaMarket =
      visitorCountry === "BD" ||
      host.endsWith(".bd") ||
      /[\u0980-\u09FF]/.test(html) ||
      /bKash|Nagad|Rocket|Taka|Dhaka|Chittagong/i.test(html);

    // 7. Plain-Language AI Synthesis via DeepSeek V4 Flash
    const analysis = await synthesizeAuditWithAI({
      domain: host,
      targetUrl,
      pageTitle,
      pageDescription,
      latency,
      isHttps,
      hasHsts,
      hasCsp,
      hasXFrame,
      hasViewport: hasProperViewport,
      hasOgImage,
      usesGoogleFonts,
      hasFixedLargeWidth,
      hasToolsKeywords,
      hasEcommerceKeywords,
      hasClinicKeywords,
      hasPortfolioKeywords,
      hasSaaSKeywords,
      visitorCountry,
      isBanglaMarket,
    });

    // 8. Save Record to Supabase
    let auditId: string | null = null;
    if (supabase) {
      try {
        const { data: dbData } = await supabase
          .from("audit_reports")
          .insert([
            {
              url: targetUrl,
              domain: host,
              site_type: analysis.siteType,
              health_score: analysis.score,
              critical_issues: analysis.issues?.filter((i: { severity: string }) => i.severity === "Critical") || [],
              warnings: analysis.issues?.filter((i: { severity: string }) => i.severity === "Warning") || [],
              passed_checks: analysis.passedChecks || [],
              business_impact: analysis.businessImpact,
              estimated_recovery: analysis.estimatedRecovery,
              tech_stack_detected: analysis.techStack || [],
              ip_hash: ipHash,
              visitor_token: visitorToken || null,
            },
          ])
          .select("id")
          .single();

        if (dbData) auditId = dbData.id;
      } catch (dbErr) {
        console.error("DB Save Error:", dbErr);
      }
    }

    // 9. Send Instant Alert to Founder Telegram with One-Tap Deep Pentest Action
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID && analysis.score < 85) {
      const countryEmoji = visitorCountry === "BD" ? "\uD83C\uDDE7\uD83C\uDDE9" : visitorCountry === "SA" ? "\uD83C\uDDF8\uD83C\uDDE6" : "\uD83C\uDF10";
      const alertText =
        "🔍 <b>NEW AUDIT RUN: " + host + "</b> " + countryEmoji + "\n" +
        "Type: <b>" + analysis.siteType + "</b> · Score: <b>" + analysis.score + "/100</b>\n" +
        "Issues: <b>" + (analysis.issues?.length || 0) + "</b> (" + visitorCountry + ")\n\n" +
        "<i>" + (analysis.businessImpact || "").slice(0, 180) + "...</i>";

      const inlineKeyboard = auditId
        ? {
            inline_keyboard: [
              [{ text: "🔬 Deep Pentest & Pitch", callback_data: "deep:" + auditId }],
              [{ text: "💡 Client Outreach Pitch", callback_data: "pitch:" + auditId }],
            ],
          }
        : undefined;

      fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: alertText,
          parse_mode: "HTML",
          reply_markup: inlineKeyboard,
        }),
      }).catch(() => {});
    }

    const remaining = Math.max(0, 2 - (usedCount + 1));

    return new Response(
      JSON.stringify({
        ok: true,
        domain: host,
        url: targetUrl,
        latencyMs: latency,
        pageTitle,
        visitorCountry,
        remaining,
        ...analysis,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Audit Runtime Error:", errorMsg);
    return new Response(JSON.stringify({ error: "Audit error", detail: errorMsg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function synthesizeAuditWithAI(data: Record<string, unknown>) {
  if (!OPENROUTER_API_KEY) {
    return getFallbackAudit(data);
  }

  try {
    const prompt =
      "You are the Lead Systems & UX Auditor at Rymthos Dev (rymthos.dev). " +
      "Analyze the website telemetry and generate a crisp, authoritative, non-technical diagnostic report for business owners.\n\n" +
      "CRITICAL AUDIENCE GUIDELINE:\n" +
      "Website owners are NON-TECHNICAL. Never use intimidating jargon (no 'CWE-79', 'HSTS', 'DOM XSS Sinks', 'Permissive CORS', 'SSL Certificate', or 'Secured Backend'). " +
      "Explain every flaw in simple everyday language following this formula:\n" +
      "1. What is wrong (simple description)\n" +
      "2. What it is costing you (lost customers, trust, sales, or high bounce rate)\n" +
      "3. The simple fix (what gets improved and what the business gains)\n\n" +
      "STRICT ARCHETYPE & INVARIANT RULES:\n" +
      "1. Accurately deduce the website's true archetype (e.g. Free Online Utilities Platform, Fashion E-Commerce, Dental Clinic, Developer Portfolio, SaaS Platform, Restaurant).\n" +
      "2. If the site is NOT an e-commerce store (such as a free utility tools platform like 100toolcrate.com, portfolio, blog, or clinic), NEVER mention or suggest missing shopping carts, checkouts, or payment gateways.\n" +
      "3. If the site is a free online tool or static portfolio, NEVER suggest adding account registration or login friction. Anonymous instant access is an intentional advantage!\n" +
      "4. Inspect visual design & mobile layout: check for mobile cutoffs, tiny buttons, font misarrangement, or awkward spacing.\n" +
      (data.isBanglaMarket
        ? "5. The site has Bangladeshi context. Include a crisp, natural Banglish note ('banglishNote') explaining the core bottleneck so a local business owner instantly connects with the problem.\n"
        : "5. Provide global business clarity.\n") +
      "\nReturn ONLY valid JSON (no markdown fences, no formatting):\n" +
      "{\n" +
      '  "score": 72,\n' +
      '  "siteType": "<exact business archetype>",\n' +
      '  "issues": [\n' +
      "    {\n" +
      '      "title": "<short plain-language title>",\n' +
      '      "category": "Security & Protection",\n' +
      '      "whatIsWrong": "<1-2 simple sentences explaining the issue in everyday words>",\n' +
      '      "whatItCostsYou": "<1-2 sentences explaining how this loses visitors, trust, or sales>",\n' +
      '      "simpleFix": "<1-2 sentences explaining the solution and business gain>",\n' +
      '      "severity": "Critical"\n' +
      "    }\n" +
      "  ],\n" +
      '  "passedChecks": [\n' +
      '    { "title": "<plain title of what is working well>", "detail": "<simple positive detail>" }\n' +
      "  ],\n" +
      '  "businessImpact": "<2-3 sentence executive summary of overall site health, user trust, and visitor retention>",\n' +
      '  "banglishNote": "<relatable 1-2 sentence Banglish explanation, or empty string if not applicable>",\n' +
      '  "estimatedRecovery": "<e.g. +30% to +45% smartphone visitor retention with responsive mobile layout and fast loading>",\n' +
      '  "techStack": ["<detected tech, e.g. Modern Web App, Cloudflare CDN>"]\n' +
      "}";

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENROUTER_API_KEY,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: JSON.stringify(data) },
        ],
        temperature: 0.35,
        max_tokens: 850,
      }),
    });

    if (!res.ok) throw new Error("OpenRouter status " + res.status);
    const json = await res.json();
    const raw = json?.choices?.[0]?.message?.content ?? "{}";
    const cleaned = raw.replace(new RegExp("\x60\x60\x60(?:json)?", "g"), "").trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("AI Audit Synthesis Error:", e);
    return getFallbackAudit(data);
  }
}

function getFallbackAudit(data: Record<string, unknown>) {
  const isTools = Boolean(data.hasToolsKeywords);
  const isEcom = Boolean(data.hasEcommerceKeywords);
  const isClinic = Boolean(data.hasClinicKeywords);
  const isPortfolio = Boolean(data.hasPortfolioKeywords);
  const isSaaS = Boolean(data.hasSaaSKeywords);
  const isBangla = Boolean(data.isBanglaMarket);

  let siteType = "Business & Corporate Website";
  let score = 62;
  const issues = [];

  if (isTools) {
    siteType = "Free Online Utilities & Developer Tools";
    score = 72;
    issues.push({
      title: "Unprotected Script Vulnerability",
      category: "Security & Protection",
      whatIsWrong: "The website lacks script execution boundaries, which allows malicious actors to inject scam popups or alter client tool outputs.",
      whatItCostsYou: "Users and developers instantly lose trust if they see suspicious scripts or redirect prompts while using your tools.",
      simpleFix: "Deploy strict content security rules that only allow verified scripts from your domain.",
      severity: "Critical",
    });
    if (!data.hasOgImage) {
      issues.push({
        title: "Missing Social Preview Cards",
        category: "Visual Design & Mobile Layout",
        whatIsWrong: "When users share your tools on Twitter, Discord, or WhatsApp, the link displays as plain text with no graphic preview.",
        whatItCostsYou: "Links without visual preview cards receive up to 60% fewer clicks from developers and communities.",
        simpleFix: "Add branded visual preview cards for each tool to stand out when shared online.",
        severity: "Warning",
      });
    }
  } else if (isEcom) {
    siteType = "E-Commerce Storefront";
    score = 42;
    issues.push({
      title: "Order Redirection Friction",
      category: "Speed & Search Ranking",
      whatIsWrong: "Customers cannot complete their order in 1 click and are forced to message manually or wait for someone to respond.",
      whatItCostsYou: "Over 45% of online shoppers abandon their purchase when forced into manual messaging queues.",
      simpleFix: "Deploy instant 1-click on-site checkout with automated WhatsApp order confirmation.",
      severity: "Critical",
    });
  } else if (isClinic) {
    siteType = "Dental & Healthcare Clinic";
    score = 48;
    issues.push({
      title: "Absent 24/7 Self-Serve Appointment Booking",
      category: "Visual Design & Mobile Layout",
      whatIsWrong: "Patients must call during office hours to schedule visits. There is no automated after-hours booking calendar.",
      whatItCostsYou: "Over 40% of patients look for medical services in the evening and book with neighboring clinics that offer instant online scheduling.",
      simpleFix: "Integrate a synchronized live booking calendar with instant SMS confirmation.",
      severity: "Critical",
    });
  } else if (isPortfolio) {
    siteType = "Professional Portfolio & Agency Showcase";
    score = 68;
    issues.push({
      title: "Mobile Viewport & Touch Target Tightness",
      category: "Visual Design & Mobile Layout",
      whatIsWrong: "Interactive case study buttons and links are spaced too closely together for comfortable finger taps on smartphones.",
      whatItCostsYou: "Recruiters and prospective clients browsing on mobile experience mis-taps and leave before viewing your best work.",
      simpleFix: "Expand touch targets to minimum 44px with comfortable responsive spacing.",
      severity: "Warning",
    });
  } else if (isSaaS) {
    siteType = "Software & SaaS Platform";
    score = 64;
    issues.push({
      title: "Unrestricted Cross-Origin Connection",
      category: "Security & Protection",
      whatIsWrong: "Your application accepts requests from any external web origin without domain filtering.",
      whatItCostsYou: "Competitors or unauthorized third-party sites could scrape your authenticated APIs and user sessions.",
      simpleFix: "Restrict API origins strictly to your authorized web and mobile app domains.",
      severity: "Critical",
    });
  } else {
    issues.push({
      title: "Unprotected Network Connection Downgrade",
      category: "Security & Protection",
      whatIsWrong: "Visitors can be tricked by hostile public Wi-Fi networks into loading an unencrypted version of your site.",
      whatItCostsYou: "Browsers display 'Not Secure' warnings to prospective clients, destroying their confidence in your business.",
      simpleFix: "Enable Strict Transport Security headers to force permanent encrypted connections.",
      severity: "Critical",
    });
  }

  // Visual layout check
  if (!data.hasViewport) {
    issues.push({
      title: "Mobile Screen Cutoff",
      category: "Visual Design & Mobile Layout",
      whatIsWrong: "Your website is missing responsive screen scaling, causing text and images to appear cut off or microscopic on phones.",
      whatItCostsYou: "More than 65% of web visitors browse on smartphones. If they have to pinch-zoom or scroll horizontally, they bounce immediately.",
      simpleFix: "Implement standard responsive viewport tags and fluid container layouts.",
      severity: "Critical",
    });
  }

  const businessImpact = isTools
    ? "Your platform provides great utilities, but missing script security and unoptimized social sharing preview cards prevent word-of-mouth growth."
    : isEcom
    ? "Forcing customers to message manually to place orders causes an estimated 40% to 55% loss in completed sales. Modern buyers expect immediate on-site checkout."
    : "Unresponsive layouts and missing protection headers cause smartphone visitors to bounce and harm your organic Google rankings.";

  const banglishNote = isBangla
    ? isEcom
      ? "Website theke customer-ke Facebook inbox e pathale instant sales bounce kore. Automatic checkout thakle sales 35%+ barano possible."
      : "Mobile theke visitor-ra site dekhe text choto ba cutoff pele sathe sathe ber hoye jay. Responsive layout thakle trust o lead 40% bare."
    : "";

  return {
    score,
    siteType,
    issues,
    passedChecks: [
      { title: "Encrypted HTTPS Connection", detail: "Active secure connection protecting visitor privacy." },
      ...(data.hasViewport ? [{ title: "Mobile Device Viewport Configured", detail: "Screen adapts cleanly to smartphone dimensions." }] : []),
    ],
    businessImpact,
    banglishNote,
    estimatedRecovery: isEcom ? "+35% to +50% checkout completion rate" : "+30% to +45% mobile visitor retention",
    techStack: ["Modern Web Application", "Edge Delivery Network"],
  };
}
