# uTrade, caseHACKS 2026

Swipe-native stock discovery inside Scotia mobile banking, funded by the chequing-and-sweep moat. Built for caseHACKS 2026 (submission 2026-05-24, 10:00 AM EDT).

> Wealthsimple can give you returns. Only Scotia can make you an owner.

**Live demo (primary):** https://utrade-scotia.vercel.app
**Live demo (mirror):** https://utrade-scotia-app.vercel.app
**Repo:** https://github.com/Minifigures/casehacks

Both URLs serve the same fullstack Next.js build from independent Vercel projects, so the demo stays up if one project hits a quota or rolls back.

[![Deployed on Vercel](https://img.shields.io/badge/deployed-Vercel-000?logo=vercel)](https://utrade-scotia.vercel.app)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-000?logo=next.js)](https://nextjs.org)
[![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-06b6d4?logo=tailwindcss)](https://tailwindcss.com)
[![Proprietary](https://img.shields.io/badge/license-Proprietary-EC111A)](./LICENSE)

**Proprietary, all rights reserved.** See [LICENSE](./LICENSE). This repository is published for caseHACKS 2026 evaluation only. Sponsors (Scotiabank, Tangerine, affiliates) receive no license to productize the Work without a signed written agreement with the Authors.

## Quick links

| What | Primary | Mirror |
|---|---|---|
| Live mobile demo | https://utrade-scotia.vercel.app | https://utrade-scotia-app.vercel.app |
| API health check | [/api/health](https://utrade-scotia.vercel.app/api/health) | [/api/health](https://utrade-scotia-app.vercel.app/api/health) |
| Card stack feed | [/api/cards](https://utrade-scotia.vercel.app/api/cards) | [/api/cards](https://utrade-scotia-app.vercel.app/api/cards) |
| Money Coach nudge | [/api/coach](https://utrade-scotia.vercel.app/api/coach) | [/api/coach](https://utrade-scotia-app.vercel.app/api/coach) |
| Source code | `apps/web/` | same |

## Repo layout

```
.
|-- LICENSE                # Proprietary, all rights reserved
|-- README.md              # You are here
`-- apps/
    `-- web/               # Next.js 16 app, ships the 5-screen prototype + JSON API
        |-- src/app/       # Routes (page, layout, OG image) + /api endpoints
        |-- src/components/# PhoneFrame, screens, TradeConfirmation, etc.
        `-- src/lib/       # Shared types, frozen card data, trade client
```

Internal planning docs (PRD, deck copy, research notes) are kept out of the public repo. The README, the live URL, and the code are the public surface.

## Run locally

```bash
cd apps/web
npm install
npm run dev
```

Open http://localhost:3000 in any mobile browser, or full-screen in desktop Chrome to see the phone-frame mockup.

## The 5 screens

1. **Chequing dashboard** Scotia balance, recent activity, red CTA banner pushing the TFSA flow
2. **Onboarding quiz** 2 questions (horizon + risk) that satisfy CIRO Rule 3400 suitability via group-affiliate reliance
3. **Success state** TFSA opened in 23 seconds, Scotia Owners equity-for-loyalty crumb
4. **Money Coach** proactive nudge using chequing + Smart Investor + Scene+ + iTRADE data, four Scotia-only sources Wealthsimple can never match
5. **uTrade card stack (hero)** swipe right to buy a fractional share, swipe left to pass, funded from Smart Sweep

## Architecture

```
Browser (mobile or desktop phone-frame)
    |
    |  fetch /api/trade  (POST { ticker, fractionalShares })
    v
Next.js 16 App Router on Vercel Edge (apps/web)
    |
    |-- /api/cards   GET    card stack feed, freezes 5 tickers for the demo
    |-- /api/coach   GET    Money Coach nudge with model + source provenance
    |-- /api/trade   POST   simulated order, server-generates orderId / settleDate
    `-- /api/health  GET    route inventory + version, for judges and uptime probes
    |
    v
(in production) Scotia iTRADE order rails, CIRO 3252 + 3400 compliant
```

No real money moves in this prototype. The in-flight `/api/trade` route is wired so the mock can be swapped for the iTRADE order API without touching the frontend.

## API contract

```http
GET  /api/health
GET  /api/cards
GET  /api/coach
POST /api/trade
     content-type: application/json
     body: { "ticker": "AMZN", "fractionalShares": 0.5 }
```

Sample `POST /api/trade` response:

```json
{
  "status": "filled",
  "orderId": "UTR-202605240815-V6AGS9",
  "ticker": "AMZN",
  "name": "Amazon",
  "shares": 0.5,
  "executionPrice": 182.40,
  "notional": 91.20,
  "currency": "USD",
  "placedAt": "2026-05-24T08:15:41.299Z",
  "settleDate": "2026-05-25T08:15:41.299Z",
  "commission": 0,
  "route": "Scotia iTRADE, best execution",
  "funding": "Smart Sweep, Scotia HISA",
  "accountType": "TFSA",
  "compliance": { "ciroRules": ["3252", "3400"], "ofsiE23Tier": 1, "recordRetentionYears": 7 }
}
```

## Responsive behavior

- Desktop and tablet (>= 768px): rendered inside a phone-frame mockup so judges see the prototype as a phone
- Mobile (< 768px): full-bleed responsive web, works in any mobile browser, installable as a PWA via the manifest

One web build covers every device. No iOS or Android native code, no App Store, no copyrighted store assets.

## Tech

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript strict (no `any`, no default exports outside Next route files)
- Tailwind CSS v4
- framer-motion (swipe physics, screen transitions)
- lucide-react (icons)
- Deployed on Vercel, two independent projects: `utrade-scotia.vercel.app` (primary) and `utrade-scotia-app.vercel.app` (mirror)
- Designs from Google Stitch, hand-translated to React

## Demo flow for Sahil

1. Hand the judge a phone, open https://utrade-scotia.vercel.app
2. Tap the red TFSA banner on the chequing dashboard
3. Two taps through the quiz, watch the TFSA open in 23 seconds
4. Confirm the Money Coach nudge
5. **Hero moment:** swipe right on AMZN, see "Bought 0.5 shares at $182.40, funded from Smart Sweep" with a real server-generated order ID
6. Swipe through 4 more cards

Total time from cold open: ~60 seconds.

## Compliance posture (cited for Sahil's Q&A)

- CIRO Rule 3252 + 3400: suitability satisfied by the 2-question quiz, account opening routes through iTRADE
- CIRO Rule 3800: swipe + Money Coach transcripts retained 7y, Canadian-region cloud
- UMIR 7.514: no PFOF on Canadian-listed orders, ever
- PIPEDA + Quebec Law 25: PIA before any cross-border AI inference
- OSFI E-23 (effective 2027-05): Money Coach copy registered Tier 1 in model inventory, independent validation pre-launch

## Roadmap beyond MVP

- Real iTRADE order API integration replaces the mock `/api/trade`
- pgvector RAG over Scotia advisor content for live analyst excerpts
- Money Coach personalization on the chequing transaction stream
- Scotia Owners equity-for-loyalty mint
- Open Banking inbound, when Consumer-Driven Banking Act Phase 1 ships

## Team

- Marco Ayuste, build
- Aous, design
- Amrr, deck
- Sahil, pitch
