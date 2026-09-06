# Phase 05: Testing, Verification & Deployment Runbook

## 1. Local Build & Dependency Verification
1. **Initialize Git Version Control**:
   - Initialize git repository: `git init`.
   - Ensure `.gitignore` correctly ignores `.env`, `node_modules`, `dist`, `.insforge`, etc.
2. **Install Dependencies**:
   - Run `npm install` to install all declared dependencies (`react@19.2.6`, `tailwindcss@4.1.17`, `framer-motion`, `lucide-react`, etc.).
3. **Type-Check & Build**:
   - Run `npm run build` to ensure zero compilation errors with TypeScript and Vite.

---

## 2. Test Cases & Verification Checklist

| Area | Test Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **Audit Gatekeeper** | User enters `google.com`, `facebook.com`, `amazon.com` | Scan rejected instantly with explanation: *"Major tech platforms are excluded. Please test your own site."* |
| **Audit Gatekeeper** | User enters `http://localhost:3000` or `127.0.0.1` | Blocked immediately (SSRF protection). |
| **Audit Gatekeeper** | User runs >5 audits within 10 minutes | Friendly rate-limit cooldown notice displayed. |
| **E-Commerce Detection** | User enters a store with no cart (Facebook ordering) | Audit flags critical alert: *"Customer cart missing — orders forced to social media"*, calculates lost sales %. |
| **Bilingual Insight** | User enters a Bangladeshi domain (`.bd` or BD IP) | Explanatory note includes crisp Banglish context for fast comprehension. |
| **Contact Form** | Bot fills hidden `company` field | Submission returns success silently without triggering AI/database/Telegram (Honeypot). |
| **Contact Form** | Valid human lead submission | Lead persisted to Supabase, Telegram founder push triggered, branded HTML acknowledgment sent to client. |
| **Accessibility** | User uses keyboard `Tab` key | Skip-to-content anchor appears; focus visible outlines ring every interactive element. |
| **Motion Safety** | System has `prefers-reduced-motion` enabled | Marquees, float animations, and kinetic tickers pause or switch to instantaneous cuts. |

---

## 3. Deployment Runbook & Environment Setup

When ready to connect live credentials, you will only need to input the following keys into your Supabase project settings:

```env
# Supabase Project Credentials (from your Supabase Dashboard -> Project Settings -> API)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...

# Server-Side Secrets (stored strictly in Supabase Edge Secrets, never exposed to browser)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
OPENROUTER_API_KEY=sk-or-v1_...
OPENROUTER_MODEL=deepseek/deepseek-v4-flash
TELEGRAM_BOT_TOKEN=123456789:ABC...
TELEGRAM_CHAT_ID=your_chat_id
GMAIL_APP_USER=rymthos.dev@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```
