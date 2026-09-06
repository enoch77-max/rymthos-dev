# Rymthos Dev — Going Live on InsForge (no coding required)

Everything is already built and organized. The steps below are account
clicks and copy-paste commands only.

```
project/
├── src/                  frontend (this site)
├── backend/
│   ├── compute/          ← the lead pipeline (Node service)
│   │   ├── server.js
│   │   └── package.json
│   └── schema.sql        ← leads table + security lockdown
├── .env.example          ← secrets template (copy to .env, never commit)
└── .gitignore            ← keeps .env out of git
```

## How the security works
- The frontend holds **zero secrets** — only public values.
- The `leads` table has Row Level Security enabled with **no public
  policies**: the anon token can't read or write it. Only the admin key,
  which lives solely inside the Compute service's environment, can touch it.
- The Compute service adds a honeypot, input sanitization, email validation,
  and a per-IP rate limit (10 requests / 10 min).
- Secrets are injected at deploy time via `--env-file` and stored by InsForge.

## Step 1 — Install the CLI and link your project
```bash
npx @insforge/cli login
npx @insforge/cli link --api-base-url https://4humvgph.us-east.insforge.app --api-key ik_YOUR_KEY
```

## Step 2 — Create the locked-down table
InsForge dashboard → SQL console → paste the contents of
`backend/schema.sql` → run.

## Step 3 — Deploy the backend (Compute)
```bash
cp .env.example .env        # fill in your real keys first
npx @insforge/cli compute deploy ./backend/compute --name rymthos-lead --port 8080 --env-file .env
```
The CLI prints your service URL — copy it (it ends in `/lead`).

## Step 4 — Point the site at the backend, then deploy the site
```bash
npx @insforge/cli deployments env set VITE_LEAD_API https://YOUR-COMPUTE-URL/lead
npx @insforge/cli deployments deploy .
```
(`VITE_LEAD_API` is browser-safe — it's just a URL, not a secret.)

## Step 5 — Daily digest (optional, 1 minute)
cron-job.org → new cron → `GET https://YOUR-COMPUTE-URL/digest?daily=1`
→ once per day. You'll get the pipeline summary on Telegram each morning.

## What you'll see once live
- Every submission → Telegram alert with AI score + ready-to-send reply draft.
- A new row in the InsForge `leads` table (dashboard → Table Editor).
- The client instantly receives the branded HTML acknowledgement email.
- If the backend is ever unreachable, the form silently falls back to
  Web3Forms email + WhatsApp — a lead is never lost.

## Vercel instead?
The same `backend/compute` service runs unchanged on any Node host
(Railway, Render, Fly.io): set the env vars in their dashboard and point
`VITE_LEAD_API` at it.

## If a key ever leaks
Rotate it at the source (OpenRouter dashboard, @BotFather, InsForge →
API Keys), update `.env`, and redeploy the Compute service. Nothing in the
frontend needs to change.
