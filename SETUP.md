# Rymthos Dev — Production Deployment Guide (Supabase + Modern Edge)

Everything is pre-built, hardened, and ready to deploy. As someone building with AI, you don't need to write any code — just follow these simple account steps.

```
project/
├── src/                          ← Frontend (React 19 + Tailwind v4 + Vite singlefile)
│   ├── components/
│   │   ├── AuditBand.tsx         ← "Beast Machine" Live Diagnostics Terminal
│   │   ├── Contact.tsx           ← Lead Intake Form with honeypot & auto-fill
│   │   └── ...
│   └── lib/lead.ts               ← Frontend config (public endpoints only)
├── backend/
│   └── supabase/
│       ├── schema.sql            ← PostgreSQL database tables with strict RLS
│       └── functions/
│           ├── lead-pipeline/    ← AI lead scoring, Telegram push, HTML ack email
│           └── web-audit/        ← Real-time website scanner & DeepSeek audit
├── planning/                     ← Architecture & design specs
├── .env.example                  ← Secrets template (never committed to git)
└── SETUP.md                      ← This guide
```

---

## Security Architecture & Data Flow

- **Zero Frontend Secrets**: No API keys, passwords, or service role tokens are bundled into the website.
- **Strict Row Level Security (RLS)**: The `leads` and `audit_reports` tables deny all anonymous public reads and writes by default. Only the backend functions running with the server-side service role key can access records.
- **Fail-Safe Client Resilience**:
  - The Web Auditor runs intelligent heuristics right in the client if the backend is offline or warming up.
  - The Contact form attempts your backend pipeline first, then Web3Forms, and gracefully falls back to pre-composed WhatsApp. A lead is never lost.

---

## Step 1 — Create Your Free Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Click **New Project**, choose a project name (e.g. `rymthos-backend`), and set a secure database password.
3. Once the project finishes provisioning (takes ~1 minute), go to **Project Settings** → **API**.
4. Note down your:
   - **Project URL** (e.g., `https://abcdefghijklm.supabase.co`)
   - **service_role (secret) key** (keep this confidential!)

---

## Step 2 — Run Database Schema (1 Click)

1. In your Supabase dashboard, click **SQL Editor** on the left menu.
2. Click **New query**.
3. Open `backend/supabase/schema.sql` from this codebase, copy all the SQL text, paste it into the editor, and click **Run**.
4. You will see two tables created with strict Row Level Security enabled:
   - `leads`: stores client submissions, AI triage scores, and replies.
   - `audit_reports`: stores analyzed website diagnostic telemetry.

---

## Step 3 — Deploy Supabase Edge Functions

You can deploy the functions using the official Supabase CLI from your terminal:

```bash
# 1. Login to Supabase CLI
npx supabase login

# 2. Link to your project
npx supabase link --project-ref your-project-ref

# 3. Set your server-side secrets
npx supabase secrets set OPENROUTER_API_KEY=sk-or-v1_your_key_here
npx supabase secrets set OPENROUTER_MODEL=deepseek/deepseek-v4-flash
npx supabase secrets set TELEGRAM_BOT_TOKEN=your_bot_token
npx supabase secrets set TELEGRAM_CHAT_ID=your_chat_id
npx supabase secrets set GMAIL_APP_USER=rymthos.dev@gmail.com
npx supabase secrets set GMAIL_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx

# 4. Deploy both Edge Functions
npx supabase functions deploy lead-pipeline --no-verify-jwt
npx supabase functions deploy web-audit --no-verify-jwt
```

Your endpoints will be live at:
- `https://<your-project-ref>.supabase.co/functions/v1/lead-pipeline`
- `https://<your-project-ref>.supabase.co/functions/v1/web-audit`

---

## Step 4 — Point the Frontend to Your Backend

When deploying your frontend (to Vercel, Netlify, Cloudflare Pages, or InsForge):

Set the following environment variables in your hosting dashboard:
```env
VITE_LEAD_API=https://<your-project-ref>.supabase.co/functions/v1/lead-pipeline
VITE_AUDIT_API=https://<your-project-ref>.supabase.co/functions/v1/web-audit
```

To build locally for production:
```bash
npm run build
```
This produces a single standalone file at `dist/index.html` (via `vite-plugin-singlefile`) which can be deployed anywhere or opened directly.

---

## Step 5 — Verify Live Operation

1. **Test the Live Auditor**:
   - Go to your site, scroll to the **Live System Diagnostics** section.
   - Enter a test website (e.g., `mystorebd.com`).
   - Watch the animated HUD inspect the domain and render the complete score, revenue impact analysis, Banglish insight, and 1-click CTA.
2. **Test the Contact Form**:
   - Fill out the inquiry form.
   - Check your Telegram for the instant instant alert with AI score and summary.
   - Check the `leads` table in Supabase to confirm the record was safely stored.
