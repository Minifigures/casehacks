# uTrade, caseHACKS 2026

Swipe-native stock discovery inside Scotia mobile banking, funded by the chequing-and-sweep moat. Built for caseHACKS 2026 (submission 2026-05-24, 10:00 AM EDT).

> Wealthsimple can give you returns. Only Scotia can make you an owner.

**Proprietary, all rights reserved.** See [LICENSE](./LICENSE). This repository is published for caseHACKS 2026 evaluation only. Sponsors (Scotiabank, Tangerine, affiliates) receive no license to productize the Work without a signed written agreement with the Authors.

## Repo layout

```
.
|-- PRD.md                 # Product Requirements Doc for the MVP
|-- bankingbros.md         # Source product brief (internal codename "BankingBros")
|-- marco_ideas_FINAL.md   # Full research backing
|-- caseHackswinners_DeckCopy.md
|-- deck-visuals.html
|-- apps/
|   `-- web/               # Next.js 16 web app, ships the 5-screen prototype
`-- research/              # Raw research notes and citations
```

## Run locally

```bash
cd apps/web
npm install
npm run dev
```

Open http://localhost:3000.

## The 5 screens

1. **Chequing dashboard** — Scotia balance, recent activity, red CTA banner pushing the TFSA flow
2. **Onboarding quiz** — 2 questions (horizon + risk) that satisfy CIRO Rule 3400 suitability via group-affiliate reliance
3. **Success state** — TFSA opened, Scotia Owners equity-for-loyalty crumb
4. **Money Coach** — proactive nudge using chequing + Smart Investor + Scene+ + iTRADE data, four Scotia-only sources Wealthsimple can never match
5. **uTrade card stack** — swipe right to buy a fractional share, swipe left to pass, funded from Smart Sweep

## Responsive behavior

- Desktop and tablet (>= 768px): rendered inside a phone-frame mockup so judges see the prototype as a phone
- Mobile (< 768px): full-bleed responsive web, works in any mobile browser, installable as a PWA via the manifest

No iOS or Android native code, no App Store, no copyrighted store assets. One web build covers every device.

## Tech

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript strict (no `any`, no default exports outside Next route files)
- Tailwind CSS v4
- framer-motion (swipe physics, screen transitions)
- lucide-react (icons)
- Deployed on Vercel

## API routes

The prototype is fullstack. The BUY action hits a real server endpoint that returns a server-generated order ID:

- `GET /api/cards` returns the discovery card stack
- `GET /api/coach` returns the Money Coach nudge with model metadata
- `POST /api/trade` accepts `{ "ticker": "AMZN", "fractionalShares": 0.5 }` and returns `{ orderId, executionPrice, settleDate, route, funding, compliance, ... }`
- `GET /api/health` exposes route inventory and version

No real money moves, but the architecture is wired so the in-flight route can swap from the mock to the iTRADE order API in production.

## Demo flow for Sahil

1. Hand the judge a phone, open the URL.
2. Tap the red TFSA banner on the chequing dashboard.
3. Two taps through the quiz, watch the TFSA open in 23 seconds.
4. Confirm the Money Coach nudge.
5. **Hero moment:** swipe right on AMZN, "Bought 0.5 shares at $182.40, funded from Smart Sweep" modal.
6. Swipe through 4 more cards.

Total time from cold open: ~60 seconds.
