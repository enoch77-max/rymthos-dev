# Phase 03: The "Beast Machine" Real-Time Web Auditor & Debugger

## 1. Objectives
Build an interactive, live diagnostic terminal right on the portfolio homepage that:
1. Pings and inspects any prospect's URL in real time (within 3–5 seconds).
2. Automatically classifies the website sector (E-Commerce, Dental/Clinic, Professional Services, Restaurant, Real Estate, SaaS, etc.).
3. Detects critical architectural failures:
   - **The "Facebook Ordering" Flaw**: E-commerce stores that are just image catalogs forcing buyers to order through Facebook Messenger or WhatsApp instead of on-site checkout.
   - **Broken or Missing Customer Accounts & Order Tracking**.
   - **Security Gaps**: Missing SSL, absent security headers (HSTS, CSP, X-Frame-Options), exposed login endpoints.
   - **SEO & Social Visibility Gaps**: Missing OpenGraph meta tags (broken WhatsApp/Facebook share previews).
   - **Mobile & Performance Friction**: Slow Time-To-First-Byte (TTFB), non-responsive viewports.
4. Translates technical bugs into **direct business revenue impact**:
   - Calculates estimated lost conversion rate and abandoned sales.
   - For Bangladeshi sites or users, provides crystal-clear bilingual context (English + Banglish) so the impact is immediately understood.
5. Converts the user on the spot with a 1-click **"Fix These Issues With Us"** action plan.

---

## 2. Abuse Prevention & Security Filter (Gatekeeper)

Before any scan starts, the engine passes the domain through a strict security filter:
1. **Domain Blacklist (High-Traffic / Big Tech Platforms)**:
   - Blocks: `google.com`, `facebook.com`, `amazon.com`, `youtube.com`, `apple.com`, `microsoft.com`, `instagram.com`, `tiktok.com`, `twitter.com`, `x.com`, `linkedin.com`, `netflix.com`, `wikipedia.org`, `reddit.com`, `github.com`.
   - Rejection notice: *"Major tech platforms and search engines are excluded from this audit. Please enter your business or personal site URL."*
2. **SSRF & Private Network Protection**:
   - Rejects `localhost`, `127.0.0.1`, `0.0.0.0`, `*.local`, `10.*.*.*`, `172.16-31.*.*`, `192.168.*.*`.
3. **Sliding-Window Rate Limiter**:
   - Maximum 5 audits per IP per 10 minutes. Returns a friendly cooldown notice if exceeded.

---

## 3. Diagnostic Engine Steps

```
Client enters URL (e.g., myshopbd.com)
            │
            ▼
[Gatekeeper Filter: Blacklist & Rate Limit Check]
            │
            ▼
[Live HTTP Fetch (10s Timeout, Head & GET Request)]
    ├─ Extract HTTP Response Headers (HSTS, CSP, X-Frame, Server)
    ├─ Measure Response Latency (TTFB in ms)
    ├─ Extract SSL/TLS Protocol & HTTPS Redirection
            │
            ▼
[DOM & Heuristic Scanner]
    ├─ Site Category Identification:
    │    • E-Commerce: detects 'cart', 'checkout', 'add to cart', price markers ('৳', '$', 'Tk', 'BDT')
    │    • Clinic / Medical: detects 'appointment', 'patient', 'doctor', 'treatment', 'dental'
    │    • Restaurant: detects 'menu', 'reservation', 'order food', 'table'
    │    • Services / Agency: detects 'portfolio', 'services', 'quote', 'contact us'
    │
    ├─ Critical Flaw Detection:
    │    • Catalog-only with no on-site checkout ("Inbox to order" / Facebook redirect)
    │    • Absence of user account creation / login / order history
    │    • Missing viewport meta tag (broken on mobile devices)
    │    • Missing og:image / og:title (broken social sharing preview)
    │
    ├─ Page Title, Headings & Real Business Name Extraction
            │
            ▼
[DeepSeek V4 Flash Synthesis]
    ├─ Generates Health Score (0 - 100)
    ├─ Formulates 3 - 4 categorized issues (CRITICAL / WARNING / PASSED)
    ├─ Calculates estimated monthly lost sales / bounce rate penalty
    ├─ Formulates personalized recommendations in crisp English + Banglish context
            │
            ▼
[Instant Interactive UI Terminal Output]
    ├─ Animated Terminal HUD with real extracted business name & category
    ├─ Scorecard with color-coded pills
    ├─ Business Impact Box ("What this is costing you")
    └─ One-Click CTA: [Fix My Website with Rymthos Dev]
```

---

## 4. Real-World Diagnostic Examples

### Scenario A: Bangladeshi Fashion E-Commerce Site
- **Scraped Reality**: Has pictures of sarees/panjabis with price, but "Buy Now" opens a Facebook page link. No cart, no login.
- **Diagnostic Result**:
  - **Category Detected**: Fashion & Apparel E-Commerce (`myshopbd.com`).
  - **Health Score**: `38 / 100` (Critical Attention Required).
  - **Critical Flaw**: *"Facebook Redirect Checkout — Customer cart is non-existent. Shoppers are forced to message on Facebook to place an order."*
  - **Business Impact**: *"Shoppers drop off by 40–55% when forced to leave your website to order on social media. You are losing instant impulse buyers and have zero automated order tracking."*
  - **Banglish Translation/Note**: *"Website theke Facebook inbox e pathale instant customer-ra bounce kore. Automatic checkout thakle sales 40%+ barano possible."*
  - **Fix Proposal**: *"Integrate native single-page checkout with bKash/Nagad/Cards + instant WhatsApp order confirmation."*

### Scenario B: Medical / Dental Clinic Site
- **Scraped Reality**: Clinic website without SSL (`http://`), no online booking, 7.8s load time.
- **Diagnostic Result**:
  - **Category Detected**: Healthcare & Dental Clinic.
  - **Health Score**: `44 / 100`.
  - **Critical Flaws**: *"No SSL Certificate (Browsers mark site as 'Not Secure' to patients) · 7.8s Mobile Load Time · Missing automated booking calendar."*
  - **Business Impact**: *"Patients immediately distrust clinics with 'Not Secure' warnings in their browser bar. Over 60% of smartphone users abandon the page before it finishes loading."*
  - **Fix Proposal**: *"Bank-grade SSL hardening + Next.js speed overhaul + self-serve 24/7 appointment scheduling."*

---

## 5. Conversion Hook & Lead Handoff
When the client clicks **`[Fix These Issues With Rymthos Dev]`**:
1. The modal opens with their URL, site category, and diagnosed flaws pre-filled into the project brief.
2. The submission is piped into Supabase `leads` and linked with the `audit_reports` entry.
3. The founder immediately receives a Telegram notification containing the exact audit breakdown, enabling a fully informed, high-converting consultation.
