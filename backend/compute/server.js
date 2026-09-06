/**
 * RYMTHOS DEV — LEAD PIPELINE (InsForge Compute service)
 * -------------------------------------------------------
 * Deploy:
 *   npx @insforge/cli compute deploy ./backend/compute --name rymthos-lead \
 *     --port 8080 --env-file .env
 *
 * Routes:
 *   POST /lead              new lead/audit → AI → DB → Telegram → ack email
 *   GET  /health            liveness probe
 *   GET  /digest?daily=1    cron: Telegrams a 24h pipeline summary
 *   POST /status            { id, status } → update a lead
 *
 * Secrets come ONLY from the environment (set via --env-file, never in code).
 */

import http from 'node:http';
import nodemailer from 'nodemailer';

const {
  INSFORGE_URL, INSFORGE_KEY,
  OPENROUTER_API_KEY, OPENROUTER_MODEL = 'deepseek/deepseek-v4-flash',
  TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
  GMAIL_APP_PASSWORD,
  PORT = 8080,
} = process.env;

const json = (res, code, body) => {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(body));
};

const headers = () => ({
  Authorization: `Bearer ${INSFORGE_KEY}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

// ---------- InsForge DB (admin key bypasses RLS; anon cannot touch leads) ----------
async function saveLead(row) {
  const url = `${INSFORGE_URL}/api/database/records/leads`;
  let res = await fetch(url, { method: 'POST', headers: headers(), body: JSON.stringify(row) });
  if (!res.ok) {
    res = await fetch(url, { method: 'POST', headers: headers(), body: JSON.stringify([row]) });
  }
  if (!res.ok) throw new Error(`InsForge ${res.status}`);
  const data = await res.json().catch(() => ({}));
  const first = Array.isArray(data) ? data[0] : data?.[0] ?? data;
  return first?.id;
}

async function listLeadsSince(iso) {
  const res = await fetch(
    `${INSFORGE_URL}/api/database/records/leads?created_at=gte.${iso}&order=created_at.desc`,
    { headers: headers() }
  );
  return res.ok ? await res.json().catch(() => []) : [];
}

async function updateLead(id, patch) {
  await fetch(`${INSFORGE_URL}/api/database/records/leads?id=eq.${id}`, {
    method: 'PATCH', headers: headers(), body: JSON.stringify(patch),
  }).catch(() => {});
}

// ---------- DeepSeek V4 Flash via OpenRouter ----------
async function analyzeLead(lead) {
  if (!OPENROUTER_API_KEY) return { score: null, urgency: 'medium', summary: '', draft_reply: '' };
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENROUTER_API_KEY}` },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are the lead assistant for Rymthos Dev, a web & mobile studio. ' +
              (lead.kind === 'audit' ? 'The person requested a FREE website audit. ' : 'The person submitted a project inquiry. ') +
              'Reply ONLY with compact JSON, no markdown: ' +
              '{"score":<1-10>,"urgency":"low|medium|high","summary":"one crisp line for the founder",' +
              '"draft_reply":"warm professional 2-3 sentence reply confirming receipt + ONE sharp question"}',
          },
          { role: 'user', content: JSON.stringify({ name: lead.name, email: lead.email, wants: lead.type, budget: lead.budget, message: lead.message }) },
        ],
        temperature: 0.5,
        max_tokens: 400,
      }),
    });
    if (!res.ok) throw 0;
    const raw = (await res.json())?.choices?.[0]?.message?.content ?? '{}';
    const p = JSON.parse(raw.replace(/```(?:json)?/g, '').trim());
    return { score: p.score ?? null, urgency: p.urgency || 'medium', summary: p.summary || '', draft_reply: p.draft_reply || '' };
  } catch {
    return { score: null, urgency: 'medium', summary: '', draft_reply: '' };
  }
}

// ---------- Telegram ----------
async function telegram(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
  }).catch(() => {});
}

// ---------- Branded HTML ack email via your Gmail ----------
const mail = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'rymthos.dev@gmail.com', pass: GMAIL_APP_PASSWORD },
  });

const ackHtml = (first, reply, kind) => `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f0;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:580px;margin:0 auto;padding:24px 12px">
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
<tr><td style="background:#101013;padding:22px 28px"><span style="color:#f4f4f0;font-weight:800;letter-spacing:2px;font-size:18px">RYMTHOS</span><span style="color:#ff4d1c;font-weight:800;font-size:10px;vertical-align:top">&reg;DEV</span><span style="float:right;width:14px;height:14px;background:#ff4d1c;display:inline-block"></span></td></tr>
<tr><td style="background:#fff;border:1px solid #e2e1d9;border-top:0;padding:32px 28px">
<div style="color:#ff4d1c;font-family:monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px">${kind === 'audit' ? 'Free audit requested' : 'Project brief received'}</div>
<h1 style="margin:0 0 14px;color:#101013;font-size:26px;line-height:1.15">Thanks, ${first} — your ${kind === 'audit' ? 'site is in the teardown queue' : 'vision just landed on our desk'}.</h1>
<p style="color:#555;font-size:15px;line-height:1.65;margin:0 0 18px">${reply || 'Your brief is being reviewed right now — every word read by a human.'}</p>
${[['01','We read every word','No bots filing you away — a human reviews your brief today.'],['02','You hear back within 24h','A personal reply with next steps, timeline, and a fixed quote.'],['03','Zero pressure','Questions welcome on WhatsApp any time: +880 1400 788 738.']]
  .map(([n, t, d]) => `<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:9px 0;vertical-align:top;width:44px"><span style="display:inline-block;background:#ff4d1c;color:#fff;font-weight:800;font-size:12px;padding:4px 7px">${n}</span></td><td style="padding:9px 0"><div style="color:#101013;font-weight:700;font-size:14px">${t}</div><div style="color:#777;font-size:13px;line-height:1.5">${d}</div></td></tr></table>`).join('')}
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px"><tr><td style="background:#101013;padding:16px 20px"><span style="color:#b8e62e;font-family:monospace;font-size:10px;letter-spacing:2px">THE RYMTHOS GUARANTEE &mdash; </span><span style="color:#f4f4f0;font-size:12px">30 days of free fixes. You own 100% of what we build.</span></td></tr></table>
</td></tr>
<tr><td style="padding:18px 28px;color:#999;font-size:12px;line-height:1.6">Md. Billal Hossain &mdash; Founder, Rymthos Dev<br/><a href="mailto:rymthos.dev@gmail.com" style="color:#ff4d1c;text-decoration:none">rymthos.dev@gmail.com</a> &middot; <a href="https://wa.me/8801400788738" style="color:#ff4d1c;text-decoration:none">WhatsApp</a></td></tr>
</table></div></body></html>`;

// ---------- tiny in-memory rate limit (per IP, 10 req / 10 min) ----------
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 600_000);
  if (arr.length >= 10) return true;
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

const clean = (v, n) => String(v ?? '').replace(/[<>]/g, '').slice(0, n);

// ---------- server ----------
http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'OPTIONS') return json(res, 204, {});
    if (url.pathname === '/health') return json(res, 200, { ok: true });

    if (req.method === 'GET' && url.pathname === '/digest') {
      const leads = await listLeadsSince(new Date(Date.now() - 86_400_000).toISOString());
      const by = {};
      leads.forEach((l) => (by[l.status] = (by[l.status] || 0) + 1));
      await telegram(
        `\u{1F4CA} <b>Daily pipeline — ${leads.length} lead(s)</b>\n` +
          Object.entries(by).map(([k, v]) => `${k}: ${v}`).join('\n') +
          (leads.length ? '\n\n' + leads.map((l) => `\u2022 ${l.name} (${l.type}, ${l.budget}) — ${l.ai_summary || ''}`).join('\n') : '\n\nQuiet day.')
      );
      return json(res, 200, { ok: true, count: leads.length });
    }

    if (req.method === 'POST' && url.pathname === '/status') {
      const body = await reqBody(req);
      if (body?.id) await updateLead(body.id, { status: clean(body.status, 20) });
      return json(res, 200, { ok: true });
    }

    if (req.method === 'POST' && url.pathname === '/lead') {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '?';
      if (limited(ip)) return json(res, 429, { error: 'slow down' });

      const b = await reqBody(req);
      if (b?.company) return json(res, 200, { ok: true }); // honeypot: pretend success
      const lead = {
        name: clean(b?.name, 200),
        email: clean(b?.email, 200),
        type: clean(b?.type, 60) || 'Website',
        budget: clean(b?.budget, 60),
        message: clean(b?.message, 4000),
        kind: b?.kind === 'audit' ? 'audit' : 'project',
      };
      if (!lead.name || !lead.email || !lead.message || !/^\S+@\S+\.\S+$/.test(lead.email)) {
        return json(res, 400, { error: 'invalid' });
      }

      const ai = await analyzeLead(lead);
      let id;
      try {
        const { kind, ...row } = lead;
        id = await saveLead({ ...row, status: 'new', ai_score: ai.score, ai_summary: ai.summary, ai_reply: ai.draft_reply });
      } catch (e) {
        console.error('db:', e);
      }

      await telegram(
        `${lead.kind === 'audit' ? '\u{1F50D} <b>Audit request</b>' : '\u{1F514} <b>New lead</b>'}${ai.score ? ` — ${ai.score}/10` : ''} · ${ai.urgency}\n\n` +
          `<b>${lead.name}</b> (${lead.email})\nWants: ${lead.type} · ${lead.budget}\n\n${lead.message}\n\n` +
          `\u{1F916} <i>${ai.summary}</i>` +
          (ai.draft_reply ? `\n\n\u2709\uFE0F <i>Suggested reply: ${ai.draft_reply}</i>` : '')
      );

      if (GMAIL_APP_PASSWORD) {
        mail()
          .sendMail({
            from: '"Rymthos Dev" <rymthos.dev@gmail.com>',
            to: lead.email,
            subject:
              lead.kind === 'audit'
                ? `Your free site audit is queued, ${lead.name.split(' ')[0]}`
                : `We received your vision, ${lead.name.split(' ')[0]} — here's what happens next`,
            html: ackHtml(lead.name.split(' ')[0], ai.draft_reply, lead.kind),
          })
          .catch((e) => console.error('mail:', e));
      }

      return json(res, 200, { ok: true, id });
    }

    json(res, 404, { error: 'not found' });
  })
  .listen(PORT, () => console.log(`rymthos-lead listening on ${PORT}`));

function reqBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (c) => (raw += c).length > 1e6 && req.destroy());
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); } catch { resolve({}); }
    });
  });
}
