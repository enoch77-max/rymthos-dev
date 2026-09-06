# Phase 02: Supabase Architecture & Database Migration

## 1. Objectives
1. Replace the legacy InsForge backend with a modern, production-grade **Supabase** infrastructure.
2. Structure PostgreSQL tables for both client inquiries (`leads`) and live website diagnostic runs (`audit_reports`).
3. Enforce strict **Row Level Security (RLS)** with zero public key leaks.
4. Deploy lightweight **Supabase Edge Functions** (TypeScript/Deno) for secure backend execution.

---

## 2. PostgreSQL Database Schema

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table 1: Inquiries & Leads Pipeline
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT DEFAULT 'Website',
  budget TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'contact_form', -- 'contact_form' | 'audit_conversion' | 'calculator'
  status TEXT DEFAULT 'new',          -- 'new' | 'reviewed' | 'contacted' | 'archived'
  ai_score INT,                       -- Deal quality / seriousness (1-10)
  ai_urgency TEXT,                    -- 'low' | 'medium' | 'high'
  ai_summary TEXT,                    -- One crisp line for the founder
  ai_draft_reply TEXT,                -- Personalized 2-3 sentence drafted reply
  client_country TEXT,                -- Geo-detected or self-selected
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Table 2: Live Website Audit Reports
CREATE TABLE IF NOT EXISTS public.audit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  url TEXT NOT NULL,
  domain TEXT NOT NULL,
  site_type TEXT,                     -- 'ecommerce' | 'dental/clinic' | 'services' | 'restaurant' | 'portfolio' | 'saas'
  health_score INT NOT NULL,          -- Overall score 0 - 100
  critical_issues JSONB DEFAULT '[]'::jsonb,
  warnings JSONB DEFAULT '[]'::jsonb,
  passed_checks JSONB DEFAULT '[]'::jsonb,
  business_impact TEXT,               -- Revenue/conversion loss explanation (with Banglish clarity if BD)
  estimated_recovery TEXT,            -- e.g. "Up to 35% cart recovery with native checkout"
  tech_stack_detected TEXT[],
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  ip_hash TEXT                        -- Anonymized IP hash for rate-limiting
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_audit_reports_domain ON public.audit_reports (domain);
CREATE INDEX IF NOT EXISTS idx_audit_reports_created ON public.audit_reports (created_at DESC);
```

---

## 3. Row Level Security (RLS) Policy Architecture

To ensure total security:
```sql
-- 1. Lock down tables by default
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_reports ENABLE ROW LEVEL SECURITY;

-- 2. Restrict SELECT to authenticated users (Founder) or service_role only
-- Anon public users CANNOT read any client data or past audits
CREATE POLICY "Deny public read on leads" ON public.leads
  FOR SELECT TO anon USING (false);

CREATE POLICY "Deny public read on audit_reports" ON public.audit_reports
  FOR SELECT TO anon USING (false);

-- 3. Edge Functions run with service_role key to insert and update safely
```

---

## 4. Supabase Edge Functions Architecture

Two isolated edge functions will be set up in the Supabase project:
1. `supabase/functions/lead-pipeline/index.ts`:
   - Validates incoming form input + honeypot.
   - Invokes OpenRouter DeepSeek V4 Flash for lead analysis & scoring.
   - Inserts record into `leads` table.
   - Dispatches instant Telegram founder push notification with HTML buttons.
   - Sends branded HTML acknowledgment email via Gmail SMTP / Resend.
2. `supabase/functions/web-audit/index.ts`:
   - Enforces IP rate-limiting & domain blacklist.
   - Executes live URL fetch & security header checks.
   - Inspects DOM for critical e-commerce flaws & metadata.
   - Calls OpenRouter AI to generate the tailored audit synthesis.
   - Stores report in `audit_reports` and returns response to frontend.
