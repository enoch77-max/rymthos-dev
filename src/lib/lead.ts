// FRONTEND CONFIG — public values only. Every secret lives server-side in the
// InsForge Compute service (backend/compute), injected via --env-file.

// Web3Forms is public by design — their service expects the key in the form.
export const WEB3FORMS_KEY = '01a40913-71e3-4eec-aff1-d9c54abb9e68';
export const WA_NUMBER = '8801400788738';
export const BD_WA_NUMBER = '8801400788738';
export const EMAIL = 'rymthos.dev@gmail.com';

// Backend endpoint. Set the browser-safe VITE_LEAD_API env var when deploying
// the site (InsForge Sites → deployments env set VITE_LEAD_API <compute-url>/lead).
// Falls back to /api/lead for same-domain hosts; on failure the form quietly
// uses Web3Forms + WhatsApp so a lead is never lost.
export const API_ENDPOINT: string = import.meta.env.VITE_LEAD_API || '/api/lead';
export const AUDIT_ENDPOINT: string = import.meta.env.VITE_AUDIT_API || '/api/audit';
