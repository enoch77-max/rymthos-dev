# Phase 04: AI Assistant, Branded HTML Email & Telegram Pipeline

## 1. Objectives
1. Build an intelligent lead intake and executive triage assistant powered by **DeepSeek V4 Flash** via OpenRouter.
2. Design a **custom-crafted HTML email template** reflecting Rymthos Dev's brutalist aesthetic (warm `#f4f4f0` paper, `#101013` carbon ink, `#ff4d1c` vermilion accents, `#b8e62e` lime guarantee badge, and monospace typography).
3. Connect the founder's Gmail address via App Password for reliable outbound customer acknowledgments.
4. Establish real-time **Telegram Bot notifications** to deliver immediate lead intelligence directly to the founder's smartphone.

---

## 2. The AI Executive Triage Prompt

The AI assistant acts as Rymthos Dev's Senior Technical Director & Triage Executive:

```markdown
System Prompt Guidelines:
1. Analyze the lead's name, email, project type, budget range, and message.
2. Evaluate deal seriousness and budget realism (Score: 1 - 10).
3. Determine urgency (low / medium / high).
4. Extract the true technical scope (e.g., whether they need a custom PWA, headless Shopify, Flutter mobile app, or AI integration).
5. Generate a one-line executive briefing for the founder.
6. Draft a personalized, 2-to-3 sentence response acknowledging their specific goals and asking ONE sharp architectural discovery question.
```

---

## 3. Branded Portfolio HTML Email Template

Generic plain-text emails reduce perceived studio quality. The client will receive an email styled identically to the website:

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:'Instrument Sans',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="max-width:600px;margin:32px auto;padding:0 16px;">
    <!-- Top Header -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#101013;border-collapse:collapse;">
      <tr>
        <td style="padding:24px 32px;">
          <span style="color:#f4f4f0;font-weight:800;font-size:20px;letter-spacing:1px;">RYMTHOS</span>
          <span style="color:#ff4d1c;font-weight:800;font-size:11px;vertical-align:top;margin-left:2px;">®DEV</span>
          <span style="float:right;width:14px;height:14px;background:#ff4d1c;display:inline-block;"></span>
        </td>
      </tr>
    </table>

    <!-- Main Container Card -->
    <div style="background:#ffffff;border:2px solid #101013;border-top:none;padding:36px 32px;box-shadow:6px 6px 0px #101013;">
      <div style="color:#ff4d1c;font-family:'JetBrains Mono',monospace,Courier;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">
        {STATUS_TAG} · INTAKE RECEIVED
      </div>
      
      <h1 style="color:#101013;font-size:28px;line-height:1.15;font-weight:800;margin:0 0 16px;">
        Thanks, {FIRST_NAME} — your vision is on our desk.
      </h1>

      <p style="color:#4a4a46;font-size:15px;line-height:1.65;margin:0 0 24px;">
        {AI_PERSONALIZED_MESSAGE}
      </p>

      <!-- 3-Step Process Table -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border-top:1px solid #e2e1d9;">
        <tr>
          <td style="padding:14px 0;width:40px;vertical-align:top;">
            <span style="background:#101013;color:#b8e62e;font-size:12px;font-weight:800;padding:4px 8px;font-family:monospace;">01</span>
          </td>
          <td style="padding:14px 0;">
            <div style="color:#101013;font-weight:700;font-size:14px;">Human Review</div>
            <div style="color:#777;font-size:13px;line-height:1.4;">Every word is reviewed by the founder — no bot queues.</div>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;width:40px;vertical-align:top;">
            <span style="background:#ff4d1c;color:#ffffff;font-size:12px;font-weight:800;padding:4px 8px;font-family:monospace;">02</span>
          </td>
          <td style="padding:14px 0;">
            <div style="color:#101013;font-weight:700;font-size:14px;">Fixed Proposal Within 24h</div>
            <div style="color:#777;font-size:13px;line-height:1.4;">A direct reply with timeline, tech stack breakdown, and a clear quote.</div>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;width:40px;vertical-align:top;">
            <span style="background:#101013;color:#ffffff;font-size:12px;font-weight:800;padding:4px 8px;font-family:monospace;">03</span>
          </td>
          <td style="padding:14px 0;">
            <div style="color:#101013;font-weight:700;font-size:14px;">Zero Pressure Strategy Call</div>
            <div style="color:#777;font-size:13px;line-height:1.4;">Free 30-minute scoping call before you commit to anything.</div>
          </td>
        </tr>
      </table>

      <!-- Guarantee Ribbon -->
      <div style="background:#101013;padding:16px 20px;margin-bottom:24px;">
        <span style="color:#b8e62e;font-family:monospace;font-size:10px;letter-spacing:2px;font-weight:700;">THE RYMTHOS GUARANTEE — </span>
        <span style="color:#f4f4f0;font-size:12px;">30 days of free post-launch fixes. You own 100% of your source code.</span>
      </div>

      <!-- Sign-off -->
      <div style="border-top:1px solid #e2e1d9;padding-top:20px;">
        <div style="font-size:18px;font-style:italic;font-weight:700;color:#101013;">Md. Billal Hossain</div>
        <div style="color:#888;font-size:12px;margin-top:2px;">Founder &amp; Principal Engineer, Rymthos Dev</div>
        <div style="margin-top:12px;font-size:13px;">
          <a href="https://wa.me/8801400788738" style="color:#ff4d1c;text-decoration:none;font-weight:600;margin-right:16px;">Direct WhatsApp →</a>
          <a href="mailto:rymthos.dev@gmail.com" style="color:#ff4d1c;text-decoration:none;font-weight:600;">Email Us →</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## 4. Telegram Notification Engine

When a new lead or audit arrives, the founder receives an instant alert on their phone formatted as:

```
🔔 NEW LEAD: E-Commerce Store ($1,000–$2,500) — Score: 9/10 (High Urgency)

👤 Name: Tanvir Ahmed (tanvir@fashionbd.com)
📍 Origin: Bangladesh (Detected)
🌐 Service: E-Commerce Platform + Payment Rails

💬 Brief:
"We currently sell on Facebook page with 80k followers. We want a real website with bKash/Nagad automated checkout and inventory management."

🤖 AI Triage:
High-conversion lead. Strong social proof already existing. Ready to upgrade from social commerce to high-throughput automated storefront.

✉️ Suggested Reply:
"Hi Tanvir, excellent move transitioning your 80k Facebook followers into an automated on-site store — this usually increases repeat order rate by 35%. Are you looking to sync inventory with Pathao/Steadfast courier APIs as well?"
```
