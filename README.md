# AutoPass OS — Driving Test Monitoring & Automated Booking SaaS

> An enterprise-grade, interactive driving test availability monitoring, appointment management, and white-label booking SaaS demonstration.

[![Netlify Status](https://api.netlify.com/api/v1/badges/deploy-status)](https://app.netlify.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)

---

## 🌟 Overview

**AutoPass OS** is a modern SaaS platform designed to capture regional driving test cancellations and automate rescheduling workflows with sub-second change detection, multi-channel candidate alerting, and white-label multi-tenancy.

### 🎯 Key Product Capabilities

- **5 Distinct Role Views**:
  - **Public Marketing Website**: Hero with live monitoring radar preview, trust strip, bento-style feature grid, 4-step process, and booking mode cards.
  - **Administrator Command Centre**: 6 KPIs, interactive 24h/7d/30d cancellation detection chart, booking distribution, live streaming operational activity feed, worker telemetry.
  - **Operations Staff Console**: Shift-based queue management, customer identification panels with masked driving licences, and escalation controls.
  - **Financial Accountant Dashboard**: Multi-country business tax profiles (United Kingdom £ / 20% VAT and Turkey ₺ / 20% KDV / e-Fatura), printable tax invoices, and 2-officer amendment approvals.
  - **Learner Customer Portal**: Welcome greeting, prominent monitoring status card, interactive December calendar grid, and 6-step application onboarding wizard.
- **Three Booking Execution Modes**:
  - **Manual Review**: Full human decision oversight with Proceed / Dismiss states.
  - **Timed-Manual (Flagship)**: Real-time, second-by-second **15-minute countdown clock**, candidate YES/NO SMS approval card, single-use cryptographic continuation links, and simulated verified handoff.
  - **Auto-Book**: Policy-governed progression with duplicate-attempt prevention and mandatory payment handoff safeguards.
- **White-Label Brand Engine**:
  - Live switcher between 3 independent tenant brands: *Drive Test Monitor*, *Earlier Test Finder*, and *Test Date Assist*.
  - Dynamic CSS variable synchronization, logo treatments, domains, and support metadata.
- **Administrative Simulator Tool**:
  - 10 end-to-end operational scenarios (match found, contention missed, reservation confirmed, YES accepted, NO declined, timer expired, payment handoff, completion, failover).

---

## 🚀 Deploy to Netlify

This project is pre-configured for one-click deployment on Netlify:

1. **Import from GitHub** in the Netlify Dashboard.
2. Netlify will automatically detect:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Configuration File**: `netlify.toml` (includes SPA `/* -> /index.html 200` rewrite rules and security headers).
3. Click **Deploy Site**.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (port 3000)
npm run dev

# 3. Compile and build production bundle
npm run build

# 4. Preview production build locally (port 4173)
npm run preview
```

---

## 🛡️ Architecture & Security Presentation

- **Simulated Demonstration**: Built with realistic simulated client-side state and reactive `localStorage` persistence.
- **Masked Data Protection**: Learner driving licences are masked (e.g. `HARRI705129J99LK ••••`).
- **Immutable Audit Logging**: Every administrative action, candidate decision, and simulated worker event creates an audit log entry.
- **Global Emergency Killswitch**: Instant simulated shutdown of all 8 regional worker nodes.

---

## 📄 License

Proprietary demonstration build. All rights reserved.
