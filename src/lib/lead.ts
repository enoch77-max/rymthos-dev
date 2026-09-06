// FRONTEND CONFIG — public values only. Every secret lives server-side in
// Supabase Edge Functions (backend/supabase/functions), injected via Supabase Secrets.

// Web3Forms is public by design — their service expects the key in the form.
export const WEB3FORMS_KEY = '01a40913-71e3-4eec-aff1-d9c54abb9e68';
export const WA_NUMBER = '8801400788738';
export const BD_WA_NUMBER = '8801400788738';
export const EMAIL = 'rymthos.dev@gmail.com';

// Backend endpoints pointing to live Supabase Edge Functions on project rqiynsrdmrjdbyewecjq.
// Can also be overridden at build time via VITE_LEAD_API and VITE_AUDIT_API env vars.
export const API_ENDPOINT: string =
  import.meta.env.VITE_LEAD_API || 'https://rqiynsrdmrjdbyewecjq.supabase.co/functions/v1/lead-pipeline';
export const AUDIT_ENDPOINT: string =
  import.meta.env.VITE_AUDIT_API || 'https://rqiynsrdmrjdbyewecjq.supabase.co/functions/v1/web-audit';
