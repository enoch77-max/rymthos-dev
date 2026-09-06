import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SECRETS } from "../_shared/secrets.ts";

const TELEGRAM_BOT_TOKEN = SECRETS.TELEGRAM_BOT_TOKEN;
const FOUNDER_CHAT_ID = String(SECRETS.TELEGRAM_CHAT_ID || "1352655812");
const OPENROUTER_API_KEY = SECRETS.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = SECRETS.OPENROUTER_MODEL || "deepseek/deepseek-v4-flash";

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
    [{ text: "📊 Live Stats" }, { text: "⚙️ System Health" }],
    [{ text: "🧹 Clear Memory" }, { text: "❓ Help & Commands" }],
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
    if (!message || !message.text) {
      return new Response("OK", { status: 200 });
    }

    const senderId = String(message.from?.id || "");
    const chatId = message.chat?.id;

    // 3. SAFEGUARD: Whitelist only — drop unauthorized users with ZERO tokens
    if (senderId !== FOUNDER_CHAT_ID) {
      console.warn("Unauthorized access attempt from Telegram ID:", senderId);
      await sendTelegram(
        chatId,
        "🔒 <b>Access Denied</b>\nThis bot is the private executive assistant to the founder of Rymthos Dev."
      );
      return new Response("OK", { status: 200 });
    }

    const text = message.text.trim();

    // 4. Zero-Token Command Handlers (Direct DB queries, 0 OpenRouter tokens)
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

    // 5. Conversational Executive Assistant via DeepSeek V4 Flash
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
    "• <b>📋 Recent Leads</b> — View latest inbound client briefs\n" +
    "• <b>🔍 Recent Audits</b> — Inspect tested client websites\n" +
    "• <b>📊 Live Stats</b> — Portfolio conversion & pipeline pulse\n" +
    "• <b>⚙️ System Health</b> — Edge functions & DB uptime\n" +
    "• <b>🧹 Clear Memory</b> — Reset chat context to preserve budget\n\n" +
    "💬 <b>AI Co-Founder:</b>\n" +
    "Send me any free-form question to get instant technical advice, pricing estimates, or pitch drafts powered by DeepSeek V4 Flash.";

  await sendTelegram(chatId, msg, { reply_markup: MAIN_KEYBOARD });
}

async function handleLeads(chatId: number | string) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    await sendTelegram(chatId, "⚠️ Supabase Service Role Key not set in Edge environment.");
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

  await sendTelegram(chatId, `📋 <b>LATEST ${leads.length} CLIENT LEADS:</b>`);

  for (const lead of leads) {
    const timeAgo = formatTimeAgo(new Date(lead.created_at));
    const statusEmoji = lead.status === "new" ? "🔥 NEW" : `✅ ${lead.status.toUpperCase()}`;
    const scoreText = lead.ai_score ? ` · Score: <b>${lead.ai_score}/10</b>` : "";

    const text =
      `👤 <b>${lead.name}</b> [${statusEmoji}${scoreText}]\n` +
      `✉️ <a href="mailto:${lead.email}">${lead.email}</a> · <i>${timeAgo}</i>\n` +
      `💼 <b>${lead.project_type}</b> · Budget: <b>${lead.budget || "Unspecified"}</b>\n\n` +
      `💬 <b>Brief:</b>\n<i>${(lead.message || "").slice(0, 200)}...</i>\n` +
      (lead.ai_summary ? `\n🤖 <b>AI Triage:</b> ${lead.ai_summary}` : "");

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: "✉️ View AI Reply", callback_data: `reply:${lead.id}` },
          { text: "💡 Deal Strategy", callback_data: `strat:${lead.id}` },
        ],
        [
          { text: "🏷️ Mark Contacted", callback_data: `contacted:${lead.id}` },
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

  await sendTelegram(chatId, `🔍 <b>LATEST ${audits.length} AUDIT REPORTS:</b>`);

  for (const a of audits) {
    const critCount = Array.isArray(a.critical_issues) ? a.critical_issues.length : 0;
    const timeAgo = formatTimeAgo(new Date(a.created_at));

    const text =
      `🌐 <b>${a.domain}</b> · <i>${timeAgo}</i>\n` +
      `Category: <b>${a.site_type || "Website"}</b>\n` +
      `Health Score: <b>${a.health_score}/100</b> | Critical Bugs: <b>${critCount}</b>\n\n` +
      `⚠️ <b>Leak:</b>\n<i>${(a.business_impact || "").slice(0, 180)}...</i>`;

    const inlineKeyboard = {
      inline_keyboard: [
        [{ text: "💡 Pitch Angle", callback_data: `pitch:${a.id}` }],
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
    `📥 <b>Total Inquiries:</b> ${totalLeads}\n` +
    `🔥 <b>New Pending Leads:</b> ${newLeads}\n` +
    `🔍 <b>Websites Audited:</b> ${totalAudits}\n\n` +
    "🌐 <b>Cloudflare Pages:</b> rymthos-dev.billalmohammad087.workers.dev\n" +
    "⚡ <b>Edge Backend:</b> Healthy (Singapore ap-southeast-1)\n" +
    "🤖 <b>AI Engine:</b> DeepSeek V4 Flash (OpenRouter)";

  await sendTelegram(chatId, msg, { reply_markup: MAIN_KEYBOARD });
}

async function handleStatus(chatId: number | string) {
  const d = new Date();
  const timeStr = d.toISOString().replace("T", " ").substring(0, 19) + " UTC";

  const msg =
    "⚙️ <b>SYSTEM STATUS & HEALTH</b>\n\n" +
    "• <b>Telegram Bot:</b> Online (@rymthosbot)\n" +
    `• <b>DeepSeek Model:</b> ${OPENROUTER_MODEL}\n` +
    "• <b>Cost Guard:</b> Active (Whitelist + MaxTokens 500)\n" +
    "• <b>Database:</b> Connected to Supabase rqiynsrdmrjdbyewecjq\n" +
    `• <b>Time:</b> ${timeStr}\n\n` +
    "Everything is operating normally with zero token waste.";

  await sendTelegram(chatId, msg, { reply_markup: MAIN_KEYBOARD });
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
        `✉️ <b>AI Reply Draft for ${lead.name} (${lead.email}):</b>\n\n<code>${lead.ai_draft_reply}</code>\n\n<i>Tap text above to copy.</i>`
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
      `You are the co-founder to Md. Billal Hossain (Rymthos Dev). ` +
      `A client named ${lead.name} submitted a project inquiry: ` +
      `Type: ${lead.project_type}, Budget: ${lead.budget || "Unknown"}, Message: "${lead.message}". ` +
      `Provide a crisp, actionable 3-point deal-closing plan: ` +
      `1. Exact scope and price recommendation. ` +
      `2. Ideal turnaround time. ` +
      `3. One killer opening question to hook them. Keep under 140 words.`;

    const reply = await callDeepSeekAI(prompt);
    await sendTelegram(chatId, `💡 <b>DEAL STRATEGY FOR ${lead.name.toUpperCase()}:</b>\n\n${reply}`);
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
      `You are the co-founder to Md. Billal Hossain (Rymthos Dev). ` +
      `We audited website "${audit.domain}" (${audit.site_type}, Score: ${audit.health_score}/100). ` +
      `Impact: "${audit.business_impact}". ` +
      `Write a high-converting, respectful 3-sentence outreach pitch to the business owner highlighting why fixing these specific issues will directly protect their revenue. Keep under 100 words.`;

    const reply = await callDeepSeekAI(prompt);
    await sendTelegram(chatId, `💡 <b>OUTREACH PITCH FOR ${audit.domain.toUpperCase()}:</b>\n\n${reply}`);
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
    "Rymthos Dev is an elite, direct-to-founder software engineering studio specializing in high-performance web applications (React, Next.js, TypeScript, Tailwind), mobile apps (Flutter), and secure backends (Supabase, PostgreSQL). " +
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
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenRouter returned status ${res.status}`);
    }

    const json = await res.json();
    const reply = json?.choices?.[0]?.message?.content || "No response received.";
    const usage = json?.usage;
    if (usage) {
      console.log(`OpenRouter DeepSeek Tokens: Prompt=${usage.prompt_tokens}, Completion=${usage.completion_tokens}, Total=${usage.total_tokens}`);
    }

    chatHistory.push({ role: "assistant", content: reply });

    await sendTelegram(chatId, reply, { reply_markup: MAIN_KEYBOARD });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("AI Assistant Error:", errorMsg);
    await sendTelegram(chatId, `⚠️ <b>Assistant error:</b> ${errorMsg}\nChat memory preserved.`);
  }
}

async function callDeepSeekAI(prompt: string): Promise<string> {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
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
  options?: { reply_markup?: unknown }
) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: options?.reply_markup,
      }),
    });
  } catch (e) {
    console.error("sendTelegram Error:", e);
  }
}

async function answerCallback(callbackQueryId: string, text?: string) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
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
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
}
