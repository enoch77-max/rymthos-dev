# Rymthos Dev — Future Tasks & Unfinished Roadmap

This document tracks all upcoming milestones, architectural enhancements, and domain/infrastructure tasks for **Rymthos Dev**.

---

## Priority 1: Domain & Production Deployment (Upcoming this month)

- [ ] **Domain Acquisition**:
  - Purchase `rymthos.dev` (Google Domains/Squarespace/Namecheap/Cloudflare Registrar).
- [ ] **Cloudflare Pages Production Deployment**:
  - Connect GitHub repository `enoch77-max/rymthos-dev` to Cloudflare Pages.
  - Build command: `npm run build`
  - Output directory: `dist`
  - Bind custom domain `rymthos.dev` and `www.rymthos.dev` with automatic SSL/TLS.
- [ ] **Branded Email Routing**:
  - Configure Cloudflare Email Routing or Google Workspace for `contact@rymthos.dev` and `billal@rymthos.dev`.
  - Add SPF, DKIM, and DMARC DNS records for 100% email deliverability.

---

## Priority 2: Telephony & Communication Upgrades

- [ ] **Activate Bangladesh Direct Cellular Calling Line**:
  - Currently, `+880 1400 788 738` is active on **WhatsApp only**; direct cellular calls route to the Saudi line `+966 57 187 6846`.
  - Once the Bangladesh SIM cellular calling package is activated, update `src/lib/lead.ts` to enable direct dial on both numbers.

---

## Priority 3: Telegram Bot Expansion (`@rymthosbot`)

- [ ] **Interactive Commands**:
  - Implement `/leads` to query the latest 5 inquiries directly from Telegram.
  - Implement `/audit <domain>` to trigger an instant on-demand audit from within Telegram chat.
  - Implement `/stats` for daily pipeline volume and conversion rates.

---

## Priority 4: Showcase Projects Strategic Roadmap

### 1. 100ToolCrate (`100toolcrate.com`)
- **Current State**: Live tooling platform with 100+ browser tools.
- **Next Steps**:
  - Add missing OpenGraph image card (`og:image`) for viral sharing on LinkedIn/Twitter.
  - Implement lightweight client-side favorites and recent tools history (localStorage).
  - Add a "Suggest a Tool" feature to capture developer leads.
  - Monetization & Pro tier: API access for batch file conversions and PDF tools.

### 2. Salah Companion (`github.com/enoch77-max/Salah_Companion`)
- **Current State**: Open-source Flutter app with zero trackers and zero ads.
- **Next Steps**:
  - Prepare Google Play Store & Apple App Store listings (screenshots, localized descriptions).
  - Add interactive widget preview or demo video recording in the portfolio showcase.
  - Position it as the benchmark case study for zero-knowledge privacy architecture and Flutter cross-platform mastery.

### 3. Commerce Engine (In Progress)
- **Current State**: Headless storefront with Stripe checkout and PostgreSQL inventory.
- **Next Steps**:
  - Deploy a live interactive staging demo so prospective e-commerce clients can experience the sub-second checkout flow live.
  - Connect with bKash/Nagad mock gateway for Bangladesh prospective clients.

### 4. Pulse Analytics (In Progress)
- **Current State**: Real-time BI dashboard with role-based access.
- **Next Steps**:
  - Deploy a sandbox demo dashboard with interactive charts, dark mode toggle, and dummy metrics.
