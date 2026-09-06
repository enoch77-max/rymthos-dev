-- ============================================================
-- RYMTHOS DEV — leads table (run once in InsForge SQL console)
-- ============================================================

CREATE TABLE IF NOT EXISTS leads (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  email      text NOT NULL,
  type       text,
  budget     text,
  message    text,
  status     text DEFAULT 'new',
  ai_score   int,
  ai_summary text,
  ai_reply   text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at DESC);

-- SECURITY: lock the table down. With RLS enabled and NO policies for the
-- anon/authenticated roles, the public anon token cannot read or write leads.
-- Only the admin/service key (ik_...) — held exclusively by the Compute
-- service — can access this table. The frontend never sees that key.
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- (Intentionally no CREATE POLICY statements: deny-by-default.)
