-- ============================================================
-- RYMTHOS DEV — SUPABASE PRODUCTION DATABASE SCHEMA
-- ============================================================
-- Execute in your Supabase Project -> SQL Editor
-- ============================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Leads Table (Client Project Inquiries & Converted Audits)
CREATE TABLE IF NOT EXISTS public.leads (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  name           TEXT NOT NULL,
  email          TEXT NOT NULL,
  project_type   TEXT DEFAULT 'Website',
  budget         TEXT,
  message        TEXT NOT NULL,
  source         TEXT DEFAULT 'contact_form', -- 'contact_form' | 'audit_conversion' | 'calculator'
  status         TEXT DEFAULT 'new',          -- 'new' | 'reviewed' | 'contacted' | 'archived'
  ai_score       INT,                         -- Deal quality / seriousness (1-10)
  ai_urgency     TEXT,                        -- 'low' | 'medium' | 'high'
  ai_summary     TEXT,                        -- One crisp summary line for the founder
  ai_draft_reply TEXT,                        -- Personalized reply draft
  client_country TEXT,                        -- Geo-detected or self-selected
  metadata       JSONB DEFAULT '{}'::jsonb
);

-- 3. Audit Reports Table (Real-Time Website Debugger & Diagnostic Records)
CREATE TABLE IF NOT EXISTS public.audit_reports (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  url                  TEXT NOT NULL,
  domain               TEXT NOT NULL,
  site_type            TEXT,                   -- 'ecommerce' | 'clinic/dental' | 'services' | 'restaurant' | 'saas' | 'portfolio'
  health_score         INT NOT NULL,            -- Overall score (0 - 100)
  critical_issues      JSONB DEFAULT '[]'::jsonb,
  warnings             JSONB DEFAULT '[]'::jsonb,
  passed_checks        JSONB DEFAULT '[]'::jsonb,
  business_impact      TEXT,                   -- Revenue/conversion leakage explanation (with Banglish clarity for BD)
  estimated_recovery   TEXT,                   -- Projected improvement (e.g. "+35% orders")
  tech_stack_detected  TEXT[],
  lead_id              UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  ip_hash              TEXT                    -- Anonymized IP hash for rate limiting
);

-- Indexes for lightning queries in Supabase Table Editor
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_audit_reports_created_at ON public.audit_reports (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_reports_domain ON public.audit_reports (domain);

-- ============================================================
-- 4. ROW LEVEL SECURITY (RLS) LOCKDOWN
-- ============================================================
-- Deny-by-default on public reads to guarantee zero client data leaks.
-- Public anon users CANNOT select or read any leads or audits.
-- Service role key (used by Supabase Edge Functions) bypasses RLS safely.

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_reports ENABLE ROW LEVEL SECURITY;

-- Deny all public read/select access
CREATE POLICY "Deny public select on leads" 
  ON public.leads 
  FOR SELECT 
  TO anon 
  USING (false);

CREATE POLICY "Deny public select on audit_reports" 
  ON public.audit_reports 
  FOR SELECT 
  TO anon 
  USING (false);

-- Allow Edge Functions and authenticated founder to insert and read
CREATE POLICY "Allow service role full access on leads"
  ON public.leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full access on audit_reports"
  ON public.audit_reports
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
