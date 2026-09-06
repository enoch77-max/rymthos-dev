// Supabase Edge Function: lead-pipeline
// Handles client inquiries, AI lead triage via DeepSeek V4 Flash,
// Supabase database persistence, Telegram founder alerts, and branded HTML ack emails.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import { SECRETS } from "../_shared/secrets.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface LeadPayload {
  name: string;
  email: string;
  type?: string;
  budget?: string;
  message: string;
  source?: string;
  company?: string; // honeypot
  metadata?: Record<string, unknown>;
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY") || SECRETS.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = Deno.env.get("OPENROUTER_MODEL") || SECRETS.OPENROUTER_MODEL;
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") || SECRETS.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") || SECRETS.TELEGRAM_CHAT_ID;
const GMAIL_APP_USER = Deno.env.get("GMAIL_APP_USER") || SECRETS.GMAIL_APP_USER;
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD") || SECRETS.GMAIL_APP_PASSWORD;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body: LeadPayload = await req.json().catch(() => ({}));

    // Honeypot: if bot filled hidden field, return success silently
    if (body.company) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const name = String(body.name || "").trim().slice(0, 200);
    const email = String(body.email || "").trim().slice(0, 200);
    const projectType = String(body.type || "Website").trim().slice(0, 80);
    const budget = String(body.budget || "Unspecified").trim().slice(0, 80);
    const message = String(body.message || "").trim().slice(0, 5000);
    const source = String(body.source || "contact_form").trim().slice(0, 50);

    if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid name, email, or message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Analyze lead with DeepSeek via OpenRouter
    const ai = await analyzeLeadWithAI({ name, email, projectType, budget, message, source });

    // 2. Persist to Supabase Database (service role bypasses RLS safely)
    let leadId: string | null = null;
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const { data, error } = await supabase
        .from("leads")
        .insert([
          {
            name,
            email,
            project_type: projectType,
            budget,
            message,
            source,
            ai_score: ai.score,
            ai_urgency: ai.urgency,
            ai_summary: ai.summary,
            ai_draft_reply: ai.draftReply,
            metadata: body.metadata || {},
          },
        ])
        .select("id")
        .single();

      if (!error && data) {
        leadId = data.id;
      }
    }

    // 3. Dispatch Telegram Notification to Founder
    await sendTelegramAlert({
      leadId,
      name,
      email,
      projectType,
      budget,
      message,
      source,
      ai,
    });

    // 4. Send Branded HTML Acknowledgment Email to Client
    await sendAcknowledgmentEmail({
      name,
      email,
      projectType,
      draftReply: ai.draftReply,
    });

    return new Response(JSON.stringify({ ok: true, leadId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Lead Pipeline Error:", errorMsg);
    return new Response(JSON.stringify({ error: "Internal processing error", detail: errorMsg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function analyzeLeadWithAI(lead: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  source: string;
}) {
  if (!OPENROUTER_API_KEY) {
    return { score: 7, urgency: "medium", summary: "New project inquiry", draftReply: "" };
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are the executive technical director at Rymthos Dev, a high-end web, mobile & AI studio founded by Md. Billal Hossain. " +
              "Analyze this incoming lead. Reply ONLY with valid, compact JSON (no markdown formatting, no code fences): " +
              '{"score":<1-10>,"urgency":"low|medium|high","summary":"one sharp sentence summarizing client need and deal quality",' +
              '"draftReply":"warm, authoritative 2-3 sentence reply confirming receipt and asking ONE insightful technical discovery question"}',
          },
          {
            role: "user",
            content: JSON.stringify(lead),
          },
        ],
        temperature: 0.4,
        max_tokens: 350,
      }),
    });

    if (!res.ok) throw new Error(`OpenRouter status ${res.status}`);
    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    const cleaned = raw.replace(/```(?:json)?/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      score: typeof parsed.score === "number" ? parsed.score : 7,
      urgency: parsed.urgency || "medium",
      summary: parsed.summary || "Client inquiry received",
      draftReply: parsed.draftReply || "",
    };
  } catch (e) {
    console.error("AI Analysis Error:", e);
    return { score: 7, urgency: "medium", summary: "Client inquiry received", draftReply: "" };
  }
}

async function sendTelegramAlert(params: {
  leadId: string | null;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  source: string;
  ai: { score: number; urgency: string; summary: string; draftReply: string };
}) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  const scoreEmoji = params.ai.score >= 8 ? "🔥" : params.ai.score >= 5 ? "⚡" : "📌";
  const text =
    `${scoreEmoji} <b>NEW CLIENT LEAD</b> — Score: <b>${params.ai.score}/10</b> [${params.ai.urgency.toUpperCase()}]\n\n` +
    `👤 <b>Client:</b> ${params.name} (<a href="mailto:${params.email}">${params.email}</a>)\n` +
    `💼 <b>Project:</b> ${params.projectType} · Budget: <b>${params.budget}</b>\n` +
    `📌 <b>Source:</b> ${params.source}\n\n` +
    `💬 <b>Client Brief:</b>\n<i>${params.message}</i>\n\n` +
    `🤖 <b>AI Triage:</b> ${params.ai.summary}\n\n` +
    (params.ai.draftReply ? `✉️ <b>Suggested Reply:</b>\n<i>${params.ai.draftReply}</i>` : "");

  const inlineKeyboard = params.leadId
    ? {
        inline_keyboard: [
          [
            { text: "✉️ View AI Reply", callback_data: `reply:${params.leadId}` },
            { text: "💡 Deal Strategy", callback_data: `strat:${params.leadId}` },
          ],
          [
            { text: "🏷️ Mark Contacted", callback_data: `contacted:${params.leadId}` },
          ],
        ],
      }
    : undefined;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: inlineKeyboard,
      }),
    });
  } catch (e) {
    console.error("Telegram error:", e);
  }
}

async function sendAcknowledgmentEmail(params: {
  name: string;
  email: string;
  projectType: string;
  draftReply: string;
}) {
  const firstName = params.name.split(" ")[0];
  const html = getBrandedEmailHtml(firstName, params.draftReply, params.projectType);

  // If Resend API Key is configured, use Resend HTTP API
  if (RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Md. Billal Hossain — Rymthos Dev <intake@rymthos.dev>",
          to: params.email,
          subject: `We received your brief, ${firstName} — what happens next`,
          html,
        }),
      });
    } catch (e) {
      console.error("Resend mail error:", e);
    }
  }
}

function getBrandedEmailHtml(first: string, reply: string, projectType: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="max-width:580px;margin:28px auto;padding:0 12px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="background:#101013;padding:22px 28px;">
          <span style="color:#f4f4f0;font-weight:800;letter-spacing:2px;font-size:18px;">RYMTHOS</span>
          <span style="color:#ff4d1c;font-weight:800;font-size:10px;vertical-align:top;">®DEV</span>
          <span style="float:right;width:14px;height:14px;background:#ff4d1c;display:inline-block;"></span>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;border:2px solid #101013;border-top:0;padding:32px 28px;box-shadow:6px 6px 0 #101013;">
          <div style="color:#ff4d1c;font-family:monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">
            PROJECT BRIEF RECEIVED · ${projectType.toUpperCase()}
          </div>
          <h1 style="margin:0 0 14px;color:#101013;font-size:26px;line-height:1.15;font-weight:800;">
            Thanks, ${first} — your vision just landed on our desk.
          </h1>
          <p style="color:#555;font-size:15px;line-height:1.65;margin:0 0 20px;">
            ${reply || "Your brief is currently being analyzed by principal engineer Md. Billal Hossain. Every word is read by a human."}
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            <tr>
              <td style="padding:10px 0;width:40px;vertical-align:top;">
                <span style="background:#101013;color:#b8e62e;font-weight:800;font-size:11px;padding:3px 7px;font-family:monospace;">01</span>
              </td>
              <td style="padding:10px 0;">
                <div style="color:#101013;font-weight:700;font-size:14px;">Human Review Today</div>
                <div style="color:#777;font-size:13px;line-height:1.4;">No auto-filing bots — we review your requirements and architecture today.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;width:40px;vertical-align:top;">
                <span style="background:#ff4d1c;color:#ffffff;font-weight:800;font-size:11px;padding:3px 7px;font-family:monospace;">02</span>
              </td>
              <td style="padding:10px 0;">
                <div style="color:#101013;font-weight:700;font-size:14px;">Fixed Proposal Within 24h</div>
                <div style="color:#777;font-size:13px;line-height:1.4;">A tailored plan with timeline, stack recommendation, and fixed quote.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;width:40px;vertical-align:top;">
                <span style="background:#101013;color:#ffffff;font-weight:800;font-size:11px;padding:3px 7px;font-family:monospace;">03</span>
              </td>
              <td style="padding:10px 0;">
                <div style="color:#101013;font-weight:700;font-size:14px;">Zero Pressure Strategy Call</div>
                <div style="color:#777;font-size:13px;line-height:1.4;">Free 30-minute scoping call whenever you are ready.</div>
              </td>
            </tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
            <tr>
              <td style="background:#101013;padding:16px 20px;">
                <span style="color:#b8e62e;font-family:monospace;font-size:10px;letter-spacing:2px;font-weight:700;">THE RYMTHOS GUARANTEE &mdash; </span>
                <span style="color:#f4f4f0;font-size:12px;">30 days of free fixes. You own 100% of the code we build.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px;color:#888;font-size:12px;line-height:1.6;">
          Md. Billal Hossain &mdash; Founder & Principal Engineer, Rymthos Dev<br/>
          <a href="mailto:rymthos.dev@gmail.com" style="color:#ff4d1c;text-decoration:none;font-weight:bold;">rymthos.dev@gmail.com</a> &middot; 
          <a href="tel:+966571876846" style="color:#ff4d1c;text-decoration:none;font-weight:bold;">Direct Call (+966 57 187 6846)</a> &middot; 
          <a href="https://wa.me/8801400788738" style="color:#ff4d1c;text-decoration:none;font-weight:bold;">WhatsApp</a>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}
