import { API_ENDPOINT } from './lead';

export interface LeadInput {
  name: string;
  email: string;
  type: string;
  budget: string;
  message: string;
  kind: 'project' | 'audit';
}

// The entire pipeline (AI → DB → Telegram → ack email) runs server-side.
// The browser only forwards the lead to your backend endpoint.
export async function runLeadPipeline(l: LeadInput): Promise<void> {
  if (!API_ENDPOINT) return;
  fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(l),
  }).catch(() => {});
}
