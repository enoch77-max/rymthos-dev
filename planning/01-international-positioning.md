# Phase 01: International Positioning & The Bangladesh Bridge

## 1. Objectives
1. Eliminate all specific Saudi Arabian markers (`+966` number as primary, "WhatsApp · KSA", GST timezone in the top strip, Gulf references).
2. Position Rymthos Dev as an elite, borderless digital engineering & UI/UX studio for founders, startups, and expanding businesses worldwide.
3. Preserve a thoughtful, relatable bridge for Bangladeshi clients so they feel immediate familiarity and cultural comfort without diluting the international standard.

---

## 2. Surgical Changes Required

### A. Top Navigation Strip ([`src/components/Navbar.tsx`](file:///d:/Websites/portfolio/src/components/Navbar.tsx))
- **Current**: Shows `SYS.STATUS`, `Now booking · QX 2026`, and `HH:MM GST` (hardcoded to Gulf Standard Time / Asia/Dhaka labeled as GST).
- **Update**:
  - Replace `GST` with `UTC` or `WORLDWIDE / REMOTE`.
  - Display live availability status: `● Global Sprint Slots Available · QX 2026`.
  - Add a subtle currency / regional indicator or timezone indicator that feels modern and international.

### B. Founder Dossier ([`src/components/Hero.tsx`](file:///d:/Websites/portfolio/src/components/Hero.tsx))
- **Current**: Mentions "WhatsApp · 9–23h GST" and general copy.
- **Update**:
  - Emphasize borderless engineering: *"Building high-performing digital products for ambitious brands worldwide."*
  - Frame founder heritage with pride and global clarity: *"Founded by Md. Billal Hossain — engineering from Dhaka to the world, operating across global timezones."*
  - Update fast response badge: *"Fastest: WhatsApp / Direct Call · 24h turn-around"*.

### C. Unified Contact System ([`src/components/Contact.tsx`](file:///d:/Websites/portfolio/src/components/Contact.tsx))
- **Current**: Two separate conflicting rows: `WhatsApp · KSA (+966...)` and `WhatsApp · BD (+880...)`.
- **Update**:
  - Present a unified, elegant contact selector:
    - **Primary International Line**: Clean business contact via WhatsApp / Telegram / Direct Email.
    - **Bangladesh Dedicated Line**: Clear badge `[🇧🇩 BD Clients: Direct WhatsApp & Local Call]` with `+880 1400 788 738`.
    - Email: `rymthos.dev@gmail.com`.
  - Bangladeshi clients immediately see their local number and payment methods, while US/European/Australian clients see an international studio.

### D. Payments & Fintech Rails ([`src/components/Payments.tsx`](file:///d:/Websites/portfolio/src/components/Payments.tsx))
- Keep both global rails (Stripe, Visa, Mastercard, Wise, PayPal, Apple Pay) and regional Bangladeshi rails (bKash, Nagad, Rocket, Bank Transfer).
- **Positioning copy**: Frame this as engineering superiority:
  - *"From Silicon Valley Stripe checkouts to high-volume South Asian mobile financial services (MFS) like bKash & Nagad — we build payment systems that convert in every market you operate in."*

### E. Meta & Search Identity ([`index.html`](file:///d:/Websites/portfolio/index.html))
- Update Schema.org `areaServed` from "Worldwide" with a Saudi telephone number to clean international formatting.
- Ensure OpenGraph tags and page titles reflect: *"Rymthos Dev — Bespoke Web, Mobile & AI Product Engineering"*.
