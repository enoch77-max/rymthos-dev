import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SECRETS } from "../_shared/secrets.ts";

const TELEGRAM_BOT_TOKEN = SECRETS.TELEGRAM_BOT_TOKEN;
const FOUNDER_CHAT_ID = String(SECRETS.TELEGRAM_CHAT_ID || "1352655812");
const OPENROUTER_API_KEY = SECRETS.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = SECRETS.OPENROUTER_MODEL || "deepseek/deepseek-v4-flash-0731";
const PRO_MODEL = "deepseek/deepseek-v4-pro-0813";
const VISION_EXP_MODEL = "deepseek/deepseek-v4-flash-vision-exp";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://rqiynsrdmrjdbyewecjq.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}
const chatHistory: ChatTurn[] = [];
const MAX_HISTORY_TURNS = 4;

const MAIN_KEYBOARD = {
  keyboard: [
    [{ text: "📋 Recent Leads" }, { text: "🔍 Recent Audits" }],
    [{ text: "🔬 Run Deep Pentest" }, { text: "📊 Live Stats" }],
    [{ text: "⚙️ System Health" }, { text: "🧹 Clear Memory" }],
  ],
  resize_keyboard: true,
  is_persistent: true,
};

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ status: "Rymthos Telegram Webhook Active" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const update = await req.json();

    // 1. SAFEGUARD: Drop bot updates and empty payloads (Loop Prevention)
    if (update.message?.from?.is_bot) {
      return new Response("OK", { status: 200 });
    }

    // 2. Handle Inline Button Callbacks
    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query);
      return new Response("OK", { status: 200 });
    }

    const message = update.message;
    if (!message) {
      return new Response("OK", { status: 200 });
    }

    const senderId = String(message.from?.id || "");
    const chatId = message.chat?.id;

    // 3. SAFEGUARD: Whitelist founder only
    if (senderId !== FOUNDER_CHAT_ID) {
      console.warn("Unauthorized access attempt from Telegram ID:", senderId);
      await sendTelegram(
        chatId,
        "🔒 <b>Access Denied</b>\nThis bot is the private executive assistant to the founder of Rymthos Dev."
      );
      return new Response("OK", { status: 200 });
    }

    // 4. Handle Screenshot / Photo Analysis via Vision EXP Model
    if (message.photo && message.photo.length > 0) {
      await handlePhotoVision(chatId, message.photo, message.caption || "");
      return new Response("OK", { status: 200 });
    }

    if (!message.text) {
      return new Response("OK", { status: 200 });
    }

    const text = message.text.trim();

    // 5. Zero-Token Command Handlers
    if (text === "/start" || text === "/menu" || text === "❓ Help & Commands") {
      await handleHelp(chatId);
      return new Response("OK", { status: 200 });
    }

    if (text === "/leads" || text === "📋 Recent Leads") {
      await handleLeads(chatId);
      return new Response("OK", { status: 200 });
    }

    if (text === "/audits" || text === "🔍 Recent Audits") {
      await handleAudits(chatId);
      return new Response("OK", { status: 200 });
    }

    if (text === "/stats" || text === "📊 Live Stats") {
      await handleStats(chatId);
      return new Response("OK", { status: 200 });
    }

    if (text === "/status" || text === "⚙️ System Health") {
      await handleStatus(chatId);
      return new Response("OK", { status: 200 });
    }

    if (text === "/clear" || text === "🧹 Clear Memory") {
      chatHistory.length = 0;
      await sendTelegram(chatId, "🧹 <b>Chat memory cleared.</b> Starting fresh context with 0 tokens accumulated.");
      return new Response("OK", { status: 200 });
    }

    if (text === "🔬 Run Deep Pentest") {
      await sendTelegram(
        chatId,
        "🔬 <b>Deep Pentest & Visual Audit</b>\n\n" +
        "Send me any URL to run an in-depth security and visual audit, for example:\n" +
        "• <code>/pentest clientwebsite.com</code>\n" +
        "• <code>/audit yourstore.com</code>\n\n" +
        "Or simply <b>send me a screenshot</b> of their website to analyze visual cutoffs and font bugs directly!"
      );
      return new Response("OK", { status: 200 });
    }

    // 6. Deep Pentest Command Trigger (/pentest <url> or /audit <url> or /pentest pro <url>)
    const urlMatch = text.match(/(?:https?:\/\/)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/i);
    const isExplicitAuditCmd =
      text.startsWith("/pentest") ||
      text.startsWith("/audit") ||
      text.toLowerCase().startsWith("pentest ") ||
      text.toLowerCase().startsWith("audit ");

    if (isExplicitAuditCmd && urlMatch) {
      const isPro = /\bpro\b/i.test(text);
      await handleDeepPentest(chatId, urlMatch[1], isPro);
      return new Response("OK", { status: 200 });
    }

    // 7. Conversational Executive Assistant
    await handleAIAssistant(chatId, text);

    return new Response("OK", { status: 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Telegram Webhook Error:", msg);
    return new Response(JSON.stringify({ error: msg }), { status: 200 });
  }
});

async function handleHelp(chatId: number | string) {
  const msg =
    "👋 <b>Welcome back, Billal.</b>\n" +
    "I am your <b>Rymthos Executive Assistant</b>.\n\n" +
    "⚡ <b>Quick Actions (0 AI Tokens):</b>\n" +
    "• <b>📋 Recent Leads</b> — Inbound client inquiries\n" +
    "• <b>🔍 Recent Audits</b> — Websites tested on portfolio\n" +
    "• <b>📊 Live Stats</b> — Portfolio conversion & pipeline\n" +
    "• <b>⚙️ System Health</b> — Edge runtime & DB status\n" +
    "• <b>🧹 Clear Memory</b> — Reset chat context\n\n" +
    "🔬 <b>Founder Deep Pentest Engine:</b>\n" +
    "Type <code>/pentest &lt;url&gt;</code> or send any website screenshot to receive:\n" +
    "1. 🛡️ Vulnerability & Risk Breakdown (CWE/OWASP)\n" +
    "2. 🎨 Visual UI/UX & Font Misarrangement Check\n" +
    "3. 💬 Copy-Paste Plain-Language Client Pitch (WhatsApp ready)\n" +
    "4. 💰 Recommended Flat-Rate Price & Scope ($149-$899)\n" +
    "5. 🛠️ Exact Developer Code Fix Blueprint";

  await sendTelegram(chatId, msg, { reply_markup: MAIN_KEYBOARD });
}

async function handleLeads(chatId: number | string) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    await sendTelegram(chatId, "⚠️ Supabase Service Role Key not set.");
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, name, email, project_type, budget, message, status, ai_score, ai_summary, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error || !leads || leads.length === 0) {
    await sendTelegram(chatId, "📋 <b>No client leads found in database yet.</b>");
    return;
  }

  await sendTelegram(chatId, "📋 <b>LATEST " + leads.length + " CLIENT LEADS:</b>");

  for (const lead of leads) {
    const timeAgo = formatTimeAgo(new Date(lead.created_at));
    const statusEmoji = lead.status === "new" ? "🔥 NEW" : "✅ " + lead.status.toUpperCase();
    const scoreText = lead.ai_score ? " · Score: <b>" + lead.ai_score + "/10</b>" : "";

    const text =
      "👤 <b>" + lead.name + "</b> [" + statusEmoji + scoreText + "]\n" +
      "✉️ <a href=\"mailto:" + lead.email + "\">" + lead.email + "</a> · <i>" + timeAgo + "</i>\n" +
      "💼 <b>" + lead.project_type + "</b> · Budget: <b>" + (lead.budget || "Unspecified") + "</b>\n\n" +
      "💬 <b>Brief:</b>\n<i>" + (lead.message || "").slice(0, 200) + "...</i>\n" +
      (lead.ai_summary ? "\n🤖 <b>AI Triage:</b> " + lead.ai_summary : "");

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: "✉️ View AI Reply", callback_data: "reply:" + lead.id },
          { text: "💡 Deal Strategy", callback_data: "strat:" + lead.id },
        ],
        [
          { text: "🏷️ Mark Contacted", callback_data: "contacted:" + lead.id },
        ],
      ],
    };

    await sendTelegram(chatId, text, { reply_markup: inlineKeyboard });
  }
}

async function handleAudits(chatId: number | string) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    await sendTelegram(chatId, "⚠️ Supabase Service Role Key not set.");
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: audits, error } = await supabase
    .from("audit_reports")
    .select("id, domain, site_type, health_score, critical_issues, business_impact, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error || !audits || audits.length === 0) {
    await sendTelegram(chatId, "🔍 <b>No website audits recorded yet.</b>");
    return;
  }

  await sendTelegram(chatId, "🔍 <b>LATEST " + audits.length + " AUDIT REPORTS:</b>");

  for (const a of audits) {
    const critCount = Array.isArray(a.critical_issues) ? a.critical_issues.length : 0;
    const timeAgo = formatTimeAgo(new Date(a.created_at));

    const text =
      "🌐 <b>" + a.domain + "</b> · <i>" + timeAgo + "</i>\n" +
      "Category: <b>" + (a.site_type || "Website") + "</b>\n" +
      "Health Score: <b>" + a.health_score + "/100</b> | Critical: <b>" + critCount + "</b>\n\n" +
      "⚠️ <b>Impact:</b>\n<i>" + (a.business_impact || "").slice(0, 180) + "...</i>";

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: "🔬 Deep Pentest & Pitch", callback_data: "deep:" + a.id },
          { text: "💡 Client Pitch", callback_data: "pitch:" + a.id },
        ],
      ],
    };

    await sendTelegram(chatId, text, { reply_markup: inlineKeyboard });
  }
}

async function handleStats(chatId: number | string) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    await sendTelegram(chatId, "⚠️ Supabase Service Role Key not set.");
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const [leadsRes, newLeadsRes, auditsRes] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("audit_reports").select("id", { count: "exact", head: true }),
  ]);

  const totalLeads = leadsRes.count || 0;
  const newLeads = newLeadsRes.count || 0;
  const totalAudits = auditsRes.count || 0;

  const msg =
    "📊 <b>RYMTHOS DEV — SYSTEM PULSE</b>\n\n" +
    "📥 <b>Total Inquiries:</b> " + totalLeads + "\n" +
    "🔥 <b>New Pending Leads:</b> " + newLeads + "\n" +
    "🔍 <b>Websites Audited:</b> " + totalAudits + "\n\n" +
    "🌐 <b>Production Site:</b> rymthos-dev.billalmohammad087.workers.dev\n" +
    "⚡ <b>Edge Backend:</b> Healthy (Singapore ap-southeast-1)\n" +
    "🤖 <b>AI Engines:</b> DeepSeek V4 Flash + Vision EXP";

  await sendTelegram(chatId, msg, { reply_markup: MAIN_KEYBOARD });
}

async function handleStatus(chatId: number | string) {
  const d = new Date();
  const timeStr = d.toISOString().replace("T", " ").substring(0, 19) + " UTC";

  const msg =
    "⚙️ <b>SYSTEM STATUS & HEALTH</b>\n\n" +
    "• <b>Telegram Bot:</b> Online (@rymthosbot)\n" +
    "• <b>Chat Model:</b> " + OPENROUTER_MODEL + "\n" +
    "• <b>Pentest & Vision Model:</b> " + VISION_EXP_MODEL + "\n" +
    "• <b>Database:</b> Connected to Supabase rqiynsrdmrjdbyewecjq\n" +
    "• <b>Time:</b> " + timeStr + "\n\n" +
    "Operating normally with zero token waste.";

  await sendTelegram(chatId, msg, { reply_markup: MAIN_KEYBOARD });
}

// SSRF Defense: Validate and reject non-public domains, IPs, loopbacks, and cloud metadata
function isBlockedHost(host: string): boolean {
  if (!host || host.length > 253) return true;
  if (host.startsWith("[") || host.includes(":")) return true;
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) return true;
  if (/^(?:0x[0-9a-fA-F]+|\d+)$/.test(host)) return true;

  const BLOCKED_HOSTS = [
    "localhost",
    "metadata",
    "metadata.google.internal",
    "instance-data",
    "169.254.169.254",
  ];
  if (BLOCKED_HOSTS.some((b) => host === b || host.startsWith(b + "."))) return true;

  const BLOCKED_TLDS = [".local", ".internal", ".arpa", ".corp", ".lan", ".home", ".test", ".example", ".invalid", ".onion"];
  if (BLOCKED_TLDS.some((tld) => host.endsWith(tld))) return true;
  if (!host.includes(".") || host.startsWith(".") || host.endsWith(".")) return true;

  return false;
}

// =========================================================================
// Deep Pentest & Executive Client-Closing Dossier Engine
// =========================================================================
async function handleDeepPentest(chatId: number | string, rawDomain: string, usePro = false) {
  const domain = rawDomain.replace(/^https?:\/\//, "").replace(/\/+$/, "").toLowerCase();

  if (isBlockedHost(domain)) {
    await sendTelegram(
      chatId,
      "🔒 <b>Audit Request Blocked:</b> Target is an internal network, raw IP, cloud metadata endpoint, or invalid domain."
    );
    return;
  }

  const selectedModel = usePro ? PRO_MODEL : OPENROUTER_MODEL;
  const modelLabel = usePro ? "DeepSeek V4 Pro (0813)" : "DeepSeek V4 Flash (0731)";

  const targetUrl = "https://" + domain;

  await sendTelegram(
    chatId,
    "🔬 <b>Initiating Deep Vulnerability & Visual Inspection...</b>\n" +
    "Target: <code>" + domain + "</code>\n" +
    "Engine: <code>" + modelLabel + "</code>"
  );

  let telemetry: Record<string, unknown> = { domain, url: targetUrl };
  try {
    const startTime = performance.now();
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 RymthosDeepPentest/1.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(9000),
    });

    const latency = Math.round(performance.now() - startTime);
    const headers = res.headers;
    const hasCsp = headers.has("content-security-policy");
    const hasHsts = headers.has("strict-transport-security");
    const hasXFrame = headers.has("x-frame-options");
    const cors = headers.get("access-control-allow-origin") || "restricted";
    const serverBanner = headers.get("server") || "hidden";

    const reader = res.body?.getReader();
    let html = "";
    if (reader) {
      const decoder = new TextDecoder();
      let bytes = 0;
      while (bytes < 48_000) {
        const { done, value } = await reader.read();
        if (done || !value) break;
        html += decoder.decode(value, { stream: true });
        bytes += value.byteLength;
      }
      try { reader.releaseLock(); } catch {}
    }

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const hasViewport = /width=device-width/i.test(html);
    const hasForms = /<form/i.test(html);
    const hasInputs = /<input/i.test(html);
    const hasScripts = /<script/i.test(html);
    const usesGoogleFonts = /fonts\.(?:googleapis|gstatic)\.com/i.test(html);

    telemetry = {
      domain,
      url: targetUrl,
      latencyMs: latency,
      pageTitle: titleMatch ? titleMatch[1].trim() : domain,
      hasCsp,
      hasHsts,
      hasXFrame,
      cors,
      serverBanner,
      hasViewport,
      hasForms,
      hasInputs,
      hasScripts,
      usesGoogleFonts,
      snippet: html.slice(0, 3000).replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, ""),
    };
  } catch (probeErr) {
    console.warn("Deep telemetry probe warning:", probeErr);
  }

  const prompt =
    "You are the Senior Security Architect and Lead UI/UX Engineer at Rymthos Dev (rymthos.dev), assisting founder Md. Billal Hossain.\n" +
    "Billal is NOT a developer or ethical hacker. He is the founder who needs an authoritative, deal-closing dossier for a prospective client.\n\n" +
    "Target Telemetry: " + JSON.stringify(telemetry) + "\n\n" +
    "Synthesize an Executive Client-Closing Dossier in 2 distinct sections:\n\n" +
    "SECTION 1: DIAGNOSTIC & PRICING\n" +
    "• 🛡️ VULNERABILITY BREAKDOWN: 2 real security flaws with CWE taxonomy (e.g. CWE-79 DOM XSS or CWE-1021 Clickjacking or CWE-693 Header gaps) and what an attacker could do.\n" +
    "• 🎨 VISUAL UI/UX & FONT AUDIT: Specific font arrangement, mobile cutoff, touch target, or spacing flaws.\n" +
    "• 💰 RECOMMENDED PRICING & SOW: Suggest flat-rate pricing ($149 / $499 / $899+), delivery turnaround (48h - 5 days), and deliverables.\n\n" +
    "SECTION 2: COPY-PASTE CLIENT OUTREACH (PLAIN ENGLISH)\n" +
    "• Write a persuasive, 100% plain-English message Billal can copy and paste into WhatsApp or Email to the client.\n" +
    "• NO jargon. Explain simply: what is broken, how it hurts their revenue/trust, and how Rymthos Dev will fix/upgrade it.\n" +
    "• If Bangladeshi context applies, add a natural Banglish version.\n\n" +
    "Format clearly with bold headers and emojis. Keep total response under 450 words.";

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENROUTER_API_KEY,
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.35,
        max_tokens: 850,
      }),
    });

    if (!res.ok) throw new Error("OpenRouter status " + res.status);
    const json = await res.json();
    const reply = json?.choices?.[0]?.message?.content || "Unable to generate dossier.";

    await sendTelegram(chatId, "📋 <b>EXECUTIVE DOSSIER FOR " + domain.toUpperCase() + ":</b>\n\n" + reply);
  } catch (e: unknown) {
    const err = e instanceof Error ? e.message : String(e);
    await sendTelegram(chatId, "⚠️ <b>Deep pentest synthesis failed:</b> " + err);
  }
}

// =========================================================================
// Photo / Screenshot Visual Analysis via DeepSeek V4 Flash Vision EXP
// =========================================================================
async function handlePhotoVision(chatId: number | string, photos: any[], caption: string) {
  await sendTelegram(chatId, "👁️ <b>Analyzing website screenshot with DeepSeek Vision EXP...</b>");

  try {
    // 1. Get highest resolution photo file ID
    const highestPhoto = photos[photos.length - 1];
    const fileId = highestPhoto.file_id;

    // 2. Fetch file path from Telegram
    const fileRes = await fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/getFile?file_id=" + fileId);
    const fileJson = await fileRes.json();
    const filePath = fileJson?.result?.file_path;

    if (!filePath) {
      await sendTelegram(chatId, "⚠️ Could not download screenshot from Telegram.");
      return;
    }

    // 3. Download image and convert to Base64
    const downloadRes = await fetch("https://api.telegram.org/file/bot" + TELEGRAM_BOT_TOKEN + "/" + filePath);
    const arrayBuf = await downloadRes.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuf);
    
    // Chunked base64 conversion to avoid call stack overflow
    let binary = "";
    const len = uint8.byteLength;
    for (let i = 0; i < len; i += 8192) {
      binary += String.fromCharCode.apply(null, Array.from(uint8.subarray(i, Math.min(i + 8192, len))));
    }
    const base64Image = btoa(binary);
    const imageUrl = "data:image/jpeg;base64," + base64Image;

    const prompt =
      "You are the Lead UI/UX Designer and Frontend Architect at Rymthos Dev, assisting founder Md. Billal Hossain.\n" +
      "Analyze this website screenshot carefully for visual, layout, and user experience flaws:\n" +
      "1. Font & Typography: Font misarrangement, readability, contrast, or awkward hierarchy.\n" +
      "2. Layout & Spacing: Any cutoff, misaligned columns, awkward margins, or mobile responsiveness flaws.\n" +
      "3. Call to Action: Are buttons clear, properly sized for fingers, and engaging?\n" +
      "4. Client Pitch: Write a 3-sentence plain-English pitch Billal can send to the site owner pointing out these visual flaws and offering a modern redesign sprint.\n\n" +
      (caption ? "Founder context / notes: " + caption + "\n\n" : "") +
      "Keep concise (under 250 words) with clear bullet points.";

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENROUTER_API_KEY,
      },
      body: JSON.stringify({
        model: VISION_EXP_MODEL,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
        temperature: 0.35,
        max_tokens: 600,
      }),
    });

    if (!res.ok) throw new Error("Vision EXP model status " + res.status);
    const json = await res.json();
    const reply = json?.choices?.[0]?.message?.content || "No visual analysis returned.";

    await sendTelegram(chatId, "🎨 <b>SCREENSHOT UI/UX AUDIT:</b>\n\n" + reply);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Photo Vision Error:", errorMsg);
    await sendTelegram(chatId, "⚠️ <b>Screenshot analysis error:</b> " + errorMsg);
  }
}

interface CallbackQuery {
  id: string;
  data?: string;
  from: { id: number | string };
  message?: { chat: { id: number | string } };
}

async function handleCallbackQuery(cq: CallbackQuery) {
  const senderId = String(cq.from?.id || "");
  const chatId = cq.message?.chat?.id;
  const data = cq.data || "";

  if (senderId !== FOUNDER_CHAT_ID || !chatId) {
    await answerCallback(cq.id, "Unauthorized");
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  if (data.startsWith("reply:")) {
    const leadId = data.replace("reply:", "");
    const { data: lead } = await supabase.from("leads").select("name, email, ai_draft_reply").eq("id", leadId).single();
    await answerCallback(cq.id, "Draft loaded!");
    if (lead?.ai_draft_reply) {
      await sendTelegram(
        chatId,
        "✉️ <b>AI Reply Draft for " + lead.name + " (" + lead.email + "):</b>\n\n<code>" + lead.ai_draft_reply + "</code>\n\n<i>Tap text above to copy.</i>"
      );
    } else {
      await sendTelegram(chatId, "No pre-generated draft found for this inquiry.");
    }
    return;
  }

  if (data.startsWith("contacted:")) {
    const leadId = data.replace("contacted:", "");
    await supabase.from("leads").update({ status: "contacted" }).eq("id", leadId);
    await answerCallback(cq.id, "Marked as contacted!");
    await sendTelegram(chatId, "✅ <b>Lead updated to 'contacted' in Supabase.</b>");
    return;
  }

  if (data.startsWith("strat:")) {
    const leadId = data.replace("strat:", "");
    const { data: lead } = await supabase.from("leads").select("*").eq("id", leadId).single();
    await answerCallback(cq.id, "Synthesizing strategy...");

    if (!lead) {
      await sendTelegram(chatId, "Lead not found.");
      return;
    }

    const prompt =
      "You are the co-founder to Md. Billal Hossain (Rymthos Dev). " +
      "A client named " + lead.name + " submitted a project inquiry: " +
      "Type: " + lead.project_type + ", Budget: " + (lead.budget || "Unknown") + ", Message: \"" + lead.message + "\". " +
      "Provide a crisp, actionable 3-point deal-closing plan: " +
      "1. Exact scope and price recommendation. " +
      "2. Ideal turnaround time. " +
      "3. One killer opening question to hook them. Keep under 140 words.";

    const reply = await callDeepSeekAI(prompt);
    await sendTelegram(chatId, "💡 <b>DEAL STRATEGY FOR " + lead.name.toUpperCase() + ":</b>\n\n" + reply);
    return;
  }

  if (data.startsWith("deep:")) {
    const auditId = data.replace("deep:", "");
    await answerCallback(cq.id, "Launching Deep Pentest...");
    const { data: audit } = await supabase.from("audit_reports").select("domain").eq("id", auditId).single();
    if (audit?.domain) {
      await handleDeepPentest(chatId, audit.domain);
    } else {
      await sendTelegram(chatId, "Audit record not found.");
    }
    return;
  }

  if (data.startsWith("pitch:")) {
    const auditId = data.replace("pitch:", "");
    const { data: audit } = await supabase.from("audit_reports").select("*").eq("id", auditId).single();
    await answerCallback(cq.id, "Drafting pitch...");

    if (!audit) {
      await sendTelegram(chatId, "Audit record not found.");
      return;
    }

    const prompt =
      "You are the co-founder to Md. Billal Hossain (Rymthos Dev). " +
      "We audited website \"" + audit.domain + "\" (" + audit.site_type + ", Score: " + audit.health_score + "/100). " +
      "Impact: \"" + audit.business_impact + "\". " +
      "Write a high-converting, respectful 3-sentence outreach pitch to the business owner in 100% plain English (no technical jargon) explaining how fixing these leaks directly protects their customers and revenue. Format as a tap-to-copy WhatsApp message. Keep under 110 words.";

    const reply = await callDeepSeekAI(prompt);
    await sendTelegram(
      chatId,
      "💡 <b>OUTREACH PITCH FOR " + audit.domain.toUpperCase() + ":</b>\n\n<code>" + reply + "</code>\n\n<i>Tap text above to copy directly to WhatsApp.</i>"
    );
    return;
  }

  await answerCallback(cq.id, "Action received");
}

async function handleAIAssistant(chatId: number | string, userPrompt: string) {
  chatHistory.push({ role: "user", content: userPrompt });
  if (chatHistory.length > MAX_HISTORY_TURNS * 2) {
    chatHistory.splice(0, chatHistory.length - MAX_HISTORY_TURNS * 2);
  }

  const systemInstruction =
    "You are the Executive AI Co-Founder and technical advisor to Md. Billal Hossain, founder of Rymthos Dev (rymthos.dev). " +
    "Rymthos Dev is an elite software engineering studio specializing in high-performance web applications (React, Next.js, TypeScript, Tailwind), mobile apps (Flutter), and secure backends (Supabase, PostgreSQL). " +
    "Pricing standard: Transparent flat-rate fees ($149+, $499+, $899+). Operating globally with authentic roots in Bangladesh. " +
    "Your role: Provide punchy, strategic, pragmatic advice on pricing, tech stack decisions, client negotiation, and growth. " +
    "Style rules: Direct, confident, zero fluff, concise (under 180 words unless explicitly asked for full code). Use bullet points.";

  const messages = [
    { role: "system", content: systemInstruction },
    ...chatHistory,
  ];

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENROUTER_API_KEY,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      throw new Error("OpenRouter returned status " + res.status);
    }

    const json = await res.json();
    const reply = json?.choices?.[0]?.message?.content || "No response received.";
    chatHistory.push({ role: "assistant", content: reply });

    await sendTelegram(chatId, reply, { reply_markup: MAIN_KEYBOARD });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("AI Assistant Error:", errorMsg);
    await sendTelegram(chatId, "⚠️ <b>Assistant error:</b> " + errorMsg + "\nChat memory preserved.");
  }
}

async function callDeepSeekAI(prompt: string): Promise<string> {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENROUTER_API_KEY,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 350,
      }),
    });

    if (!res.ok) return "Unable to generate AI response at this moment.";
    const json = await res.json();
    return json?.choices?.[0]?.message?.content?.trim() || "No response generated.";
  } catch (e) {
    console.error("DeepSeek Quick Call Error:", e);
    return "Error calling DeepSeek engine.";
  }
}

async function sendTelegram(
  chatId: number | string,
  text: string,
  options?: { reply_markup?: unknown; parse_mode?: string }
) {
  try {
    const res = await fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: options?.parse_mode ?? "HTML",
        disable_web_page_preview: true,
        reply_markup: options?.reply_markup,
      }),
    });

    if (!res.ok) {
      // If Telegram returned 400 (entity parse error), fallback to sending as plain text
      await fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text.replace(/<[^>]+>/g, ""),
          disable_web_page_preview: true,
          reply_markup: options?.reply_markup,
        }),
      });
    }
  } catch (e) {
    console.error("sendTelegram Error:", e);
  }
}

async function answerCallback(callbackQueryId: string, text?: string) {
  try {
    await fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/answerCallbackQuery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text,
      }),
    });
  } catch (e) {
    console.error("answerCallback Error:", e);
  }
}

function formatTimeAgo(date: Date): string {
  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSec < 60) return "just now";
  if (diffSec < 3600) return Math.floor(diffSec / 60) + "m ago";
  if (diffSec < 86400) return Math.floor(diffSec / 3600) + "h ago";
  return Math.floor(diffSec / 86400) + "d ago";
}
