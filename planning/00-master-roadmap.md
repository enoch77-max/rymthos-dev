# Rymthos Dev — Master Architecture & Production Roadmap

## Overview & Executive Vision
Transform **Rymthos Dev** from a locally-targeted portfolio into an **international digital production house** with enterprise-grade architecture, high-conversion branding, and two signature conversion engines:
1. **Real-Time Website Auditor & Debugger**: An instant, deep diagnostic tool that detects site category, uncovers critical bugs (such as broken e-commerce checkout, missing account creation, and security vulnerabilities), estimates lost revenue, and converts visitors on the spot.
2. **Advanced AI Executive Assistant**: Automated triage, lead scoring, personalized scope analysis, branded HTML email dispatch, and instant Telegram founder alerts.

All backend services will be deployed securely on **Supabase** (PostgreSQL with Row Level Security + Edge Functions) with zero frontend credential exposure.

---

## Strategic Phases

| Phase | File | Focus |
| :--- | :--- | :--- |
| **01** | `planning/01-international-positioning.md` | Strip Saudi-specific markers; establish global USD standard; create relatable Bangladesh bridge. |
| **02** | `planning/02-supabase-backend-architecture.md` | PostgreSQL schema (`leads`, `audit_reports`), Row Level Security, and Edge Functions. |
| **03** | `planning/03-advanced-web-audit-debugger.md` | Live site scraping, SSRF/abuse blacklist, e-commerce flaw detection, revenue leakage estimation, bilingual Banglish insights. |
| **04** | `planning/04-ai-assistant-email-pipeline.md` | DeepSeek/OpenRouter intelligence, branded portfolio HTML email template, Telegram instant push notifications. |
| **05** | `planning/05-testing-verification-runbook.md` | Local build verification, dependency resolution, end-to-end audit validation, deployment guide. |

---

## System Architecture Diagram

```mermaid
graph TD
    subgraph Frontend ["Client Layer (React 19 + Tailwind v4 + Vite 7)"]
        UI[Portfolio Sections]
        AuditTool[Live Website Diagnostics Terminal]
        ContactForm[Project Inquiry Brief]
        Calc[Interactive Cost Calculator]
    end

    subgraph SecurityGateway ["Security & Abuse Gateway"]
        BL[Domain Blacklist Filter: Google, FB, Amazon, RFC1918 IPs]
        RL[Sliding Window IP Rate Limiter]
        HP[Honeypot Anti-Bot Field]
    end

    subgraph Supabase ["Supabase Backend (Production Infrastructure)"]
        AuditEdge[Edge Function: web-audit]
        LeadEdge[Edge Function: lead-pipeline]
        DB[(Supabase PostgreSQL Database)]
        RLS[Row Level Security: Strict Service/Anon Policies]
    end

    subgraph Intelligence ["AI & External Services"]
        AI[DeepSeek V4 Flash / OpenRouter AI]
        TG[Telegram Founder Notification Bot]
        SMTP[Gmail SMTP / Resend Branded HTML Email]
    end

    AuditTool --> SecurityGateway
    ContactForm --> SecurityGateway
    SecurityGateway -->|Allowed| AuditEdge
    SecurityGateway -->|Allowed| LeadEdge
    AuditEdge --> AI
    AuditEdge --> DB
    AuditEdge --> TG
    LeadEdge --> AI
    LeadEdge --> DB
    LeadEdge --> TG
    LeadEdge --> SMTP
```
