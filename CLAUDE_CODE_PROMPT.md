# Claude Code Master Prompt — Abu Dhabi Travel Platform

> **How to use this file:** Save this file as `CLAUDE_CODE_PROMPT.md` in an empty project folder. Open a terminal in that folder, run `claude`, then paste **Section 1 (The Prompt)** as your first message. Feed Claude Code the phases one at a time (not all at once) to keep token/credit usage low. Stop after each phase, review the output, then ask it to proceed.

---

## SECTION 0 — Credit-Saving Rules (read this first)

Building a full travel platform with a frontend, backend, admin panel, customer portal, AI, and a mobile app is a **very large** project. If you let an agent run uncontrolled it will burn through your plan fast. Follow these rules:

1. **Work phase by phase.** Do not ask Claude Code to "build everything." Give it one phase at a time. Review, then continue.
2. **Use `/clear` between unrelated phases.** This resets context so you don't pay for re-reading old chat history on every turn.
3. **Let Claude Code read the repo itself.** Don't paste long files into chat — ask it to open them.
4. **Prefer small, specific asks** ("create `src/components/Navbar.tsx` based on the spec in `docs/ui.md`") over vague ones ("build the UI").
5. **Pin a cheaper model for boilerplate.** Use Haiku / Sonnet for scaffolding and CRUD; reserve Opus for architecture, tricky debugging, and AI feature design. Switch with `/model`.
6. **Ask for plans before code.** "Plan this in ≤20 lines, then wait for my approval." Plans are cheap; wrong code is expensive.
7. **Enable skipping confirmations** only when you're comfortable — otherwise review each diff.
8. **Keep the scope honest.** Ship the web MVP first; mobile app and advanced AI come later once real users exist.

---

## SECTION 1 — THE PROMPT (paste this into Claude Code as your first message)

You are my senior full-stack engineer and technical architect. We are building **"Aerovy Travels"**, a premium travel platform focused on **Abu Dhabi, UAE**. The brand's logo is in `./assets/logo.png` (800 × 641 px, transparent background). A smaller thumbnail is at `./assets/logo-small.png` and the original print-ready PDF is at `./assets/logo-source.pdf`. Use the brand palette below verbatim — do NOT invent new colors.

**Brand palette (extracted from the official logo):**

- `--brand-primary` = **#CDA020** (Aerovy gold — used for the "A" mark and "AEROVY" wordmark)
- `--brand-secondary` = \*\*#2D151E` (deep aubergine/near-black — used for the paper-airplane element and "TRAVELS" wordmark)
- `--brand-accent` = **#E8C868** (lighter gold highlight, for hover/focus states)
- Neutrals: `--bg` `#FFFFFF`, `--surface` `#FAF8F3` (warm off-white), `--text` `#2D151E`, `--muted` `#6B5A5F`.

### Ground rules for this engagement

- Work in small, reviewable steps. After each major step, stop and summarize what you did in ≤10 bullet points, then wait for my "continue" before moving on.
- Before writing code for any new feature, produce a short plan (files to add/change, data model, API shape, risks) and wait for approval.
- Keep responses concise. No long explanations unless I ask. Prefer code + a 3-line summary.
- Never install a dependency without telling me why and what it costs in bundle size / lock-in.
- Use TypeScript everywhere. Write tests for business logic only (not every component).
- Favor free-tier-friendly services and open-source libraries. Flag any paid dependency clearly.

### Project vision

A bookable travel platform for inbound tourists and UAE residents exploring Abu Dhabi. It sells **tours, desert safaris, city experiences, hotel packages, airport transfers, and custom itineraries**, with an AI trip-planner, multilingual support (EN / AR / HI / RU / ZH), and full admin operations.

### Target users

1. **Travelers (public site + customer portal):** browse experiences, get AI-generated itineraries, book and pay, manage trips, leave reviews.
2. **Operations / Admin (admin panel):** manage inventory (tours, hotels, transfers), pricing, availability, bookings, customers, content (CMS), promos, and reports.
3. **Suppliers (optional Phase 3):** tour operators and hotels managing their own listings via a vendor portal.

### Tech stack (chosen for low cost + modern DX)

- **Monorepo:** pnpm + Turborepo.
- **Frontend (public site + customer portal):** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion. i18n via `next-intl`. RTL support for Arabic.
- **Admin panel:** Next.js app inside the monorepo (`apps/admin`) using shadcn/ui + TanStack Table + Recharts.
- **Backend:** Next.js Route Handlers + **tRPC** (typed end-to-end) + **Zod** for validation. Background jobs via **Inngest** (generous free tier).
- **Database:** **PostgreSQL** (Neon or Supabase free tier) with **Prisma** ORM.
- **Auth:** **Auth.js (NextAuth v5)** with email magic links + Google OAuth. Separate roles: `CUSTOMER`, `STAFF`, `ADMIN`, `SUPPLIER`.
- **Payments:** **Stripe** (cards, Apple Pay, Google Pay) + placeholder adapter for local UAE gateways (Telr / Network International) to plug in later.
- **File/media:** **Cloudflare R2** or **UploadThing**.
- **Search:** **Meilisearch** (self-hosted free) or **Algolia** free tier — pick whichever has a lower-friction managed option today.
- **AI layer:** Claude API via the `@anthropic-ai/sdk`. Wrap all AI calls through a single `packages/ai` module with strict prompt templates, token budgets, response caching (Redis / Upstash free tier), and a kill switch env var.
- **Email:** Resend (free tier) with React Email templates.
- **Analytics:** PostHog Cloud free tier + Vercel Web Analytics.
- **Hosting:** Vercel (web + admin), Neon/Supabase (DB), Upstash (Redis), Inngest (jobs). All have generous free tiers.
- **Mobile app (Phase 4, optional):** **Expo (React Native) + NativeWind** sharing types with the monorepo. Do NOT start this until web is live.

### Monorepo layout

```
/
├── apps/
│   ├── web/          # public marketing + booking + customer portal
│   ├── admin/        # internal admin panel
│   └── mobile/       # Expo app (Phase 4, scaffold only for now)
├── packages/
│   ├── ui/           # shared shadcn components + design tokens
│   ├── db/           # Prisma schema + client
│   ├── api/          # tRPC routers
│   ├── ai/           # Claude wrappers, prompt templates, guardrails
│   ├── config/       # eslint, tsconfig, tailwind presets
│   └── emails/       # React Email templates
├── assets/           # logo.pdf, logo.png, brand assets
├── docs/             # architecture.md, api.md, ops.md
└── README.md
```

### Feature scope

**Phase 1 — Foundation (MVP, must ship first)**

- Monorepo + CI (GitHub Actions: lint, typecheck, test, build).
- Design system seeded from the logo's color palette. Light + dark mode. Full RTL for Arabic.
- Marketing site: home, experiences listing, experience detail, about, contact, blog (MDX).
- Search & filter experiences (category, duration, price, rating, date).
- Cart + Stripe checkout + confirmation email.
- Auth + customer portal: my bookings, upcoming trips, invoices, profile, wishlist.
- Admin panel v1: login, dashboard KPIs, CRUD for experiences, bookings list, customers list.
- Seed data: 20 realistic Abu Dhabi experiences (Sheikh Zayed Grand Mosque tour, Louvre Abu Dhabi, Yas Island theme parks, Liwa desert safari, Corniche cruise, Ferrari World, Qasr Al Watan, mangrove kayaking, etc.).
- `docs/README.md` + deployment guide.

**Phase 2 — AI & Personalization**

- **AI Trip Planner:** chat-style, asks 4–6 questions (dates, party, budget, interests, pace), returns a day-by-day itinerary with bookable links to our inventory.
- **Smart search:** natural-language search ("romantic sunset for two under 500 AED").
- **AI concierge:** logged-in chatbot that can answer about bookings and suggest add-ons.
- **Auto-generated SEO content** for experience pages (with human review queue in admin).
- **Review summarization** per experience.
- Guardrails: prompt-injection filtering, max-token caps, daily spend cap, response caching.

**Phase 3 — Operations depth**

- Dynamic pricing & availability calendar per experience.
- Promo codes, gift cards, bundles.
- Supplier portal (vendors manage their own listings + payouts report).
- Refunds/cancellations workflow with policy engine.
- Multi-currency (AED default, USD/EUR/GBP/INR/CNY/RUB display).
- WhatsApp Business API notifications (booking confirmations, reminders).

**Phase 4 — Mobile app**

- Expo app: browse, book, AI planner, boarding-pass-style trip tickets with QR, push notifications, offline itinerary view.
- Share auth session with web via Auth.js.

### Non-functional requirements

- Performance: Lighthouse ≥ 90 on the public site. Core Web Vitals green.
- Accessibility: WCAG 2.1 AA.
- SEO: server-rendered, structured data (`TouristAttraction`, `Product`, `Offer`, `Review`), sitemap, robots, hreflang for all languages.
- Security: CSRF protection, input validation with Zod on every route, rate limiting via Upstash, secrets via env only, OWASP top-10 checks, audit log on admin mutations.
- Observability: structured logs, Sentry (free tier), PostHog product analytics, health-check endpoint.
- Testing: Vitest for units, Playwright for a small happy-path e2e (home → book → confirmation).

### Deliverable for your FIRST response

1. A root-level **`README.md`** that documents:
   - Project overview and vision
   - Architecture diagram (ASCII or Mermaid)
   - Tech stack and why each choice
   - Monorepo layout
   - Local setup: prerequisites, env vars, install, run, test
   - Deployment overview (Vercel + Neon + Upstash + Inngest)
   - Phase roadmap (1→4)
   - Brand assets and design tokens section
   - Scripts reference
   - Contribution guide
   - License placeholder
2. A **`docs/architecture.md`** with data model ERD (Mermaid), request flow, AI layer diagram, and auth/role matrix.
3. A **`docs/phases.md`** breaking Phase 1 into numbered tickets I can feed you one at a time.
4. Scaffold the empty monorepo (Turborepo + pnpm workspaces), root `package.json`, `turbo.json`, shared `tsconfig`, ESLint, Prettier, commit hooks (husky + lint-staged), and a GitHub Actions CI workflow. **No app code yet.**
5. A short bullet summary of what you did and the exact next step to run (e.g. `pnpm install && pnpm dev`).

**Do not build Phase 1 features yet.** Stop after step 5 and wait for me to say "start Phase 1, Ticket 1."

### Brand & assets

- Company name: **Aerovy Travels**
- Logo files (already in `./assets/`):
  - `logo.png` — 800 × 641 px, transparent background (use for web + admin)
  - `logo-small.png` — 400 × 321 px (use for favicons, mobile nav)
  - `logo-source.pdf` — original vector artwork (keep for print; do not ship to web)
- Use the hex codes above verbatim. Expose them in `packages/ui/tokens.css` and the Tailwind preset as `brand.primary`, `brand.secondary`, `brand.accent`, plus semantic tokens for surfaces, text, and borders.
- Generate a favicon set (`favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `og-image.png` 1200×630) from `logo.png` using `sharp` in a one-shot script and commit the output. Do not hand-draw SVGs.
- Typography: use **Tajawal** (Arabic + Latin) as the primary and **Inter** as fallback/Latin-only, both served via `next/font`. The logo's geometry suggests a geometric sans — Inter is a safe match; if you'd like a closer visual pair for the wordmark, propose one alternative and wait for approval.

### How I want you to communicate

- Short. Structured. Plans before code. Ask before installing new deps. Flag anything that could cost money.
- If a task looks like it will exceed one Claude Code turn, split it and tell me.

Acknowledge these rules in 3 lines, then produce the Phase-0 deliverables listed above.

---

## SECTION 2 — Follow-up prompts (use one at a time, AFTER Section 1 is done)

Paste these one at a time in the same Claude Code session. `/clear` before starting a new phase to save tokens.

**Prompt 2 — Design tokens & UI package**

> Build `packages/ui` with shadcn/ui installed and the Aerovy design tokens already specified in Section 1 (`#CDA020`, `#2D151E`, `#E8C868`, plus neutrals). Add dark mode, RTL utilities, and a brief MDX doc in `packages/ui/README.md`. Show me the token file and one Button + Card example using the tokens. Generate the favicon + OG image set from `assets/logo.png` with `sharp`. Stop.

**Prompt 3 — Database schema**

> Design the Prisma schema for Phase 1 in `packages/db/prisma/schema.prisma`: User, Account, Session, Role, Experience, ExperienceCategory, ExperienceMedia, Availability, Booking, BookingItem, Payment, Review, Wishlist, PromoCode, AuditLog. Add indexes and relations. Show an ERD in Mermaid. Wait for approval before running `prisma migrate dev`.

**Prompt 4 — Auth**

> Implement Auth.js v5 in `apps/web` and `apps/admin` with shared config. Email magic link + Google OAuth. Role-based middleware. Protect `/admin/*` behind `ADMIN` or `STAFF`. Add seed script that creates one admin user from env vars.

**Prompt 5 — Public site shell**

> Build the public layout: Navbar (with logo, language switcher EN/AR, currency switcher), Footer, home page hero + "Top experiences in Abu Dhabi" section + trust bar + newsletter. Pull experiences from the DB (seed 20 realistic Abu Dhabi experiences — I'll approve the seed list before you commit it).

**Prompt 6 — Experience listing + detail + search**

> Build `/experiences`, `/experiences/[slug]`, and a filter sidebar (category, price, duration, rating, date). Implement search with Meilisearch or Postgres full-text — recommend one and wait for my pick.

**Prompt 7 — Cart + Stripe checkout**

> Implement cart (Zustand), checkout page, Stripe Checkout session, webhook for payment success, booking creation, confirmation email via Resend + React Email. Use Stripe test mode.

**Prompt 8 — Customer portal**

> `/account` routes: my bookings, upcoming trips, past trips, invoices (PDF via `@react-pdf/renderer`), profile, wishlist, password/email management.

**Prompt 9 — Admin panel v1**

> Build `apps/admin`: login, dashboard (KPIs: revenue, bookings, conversion, top experiences via Recharts), experiences CRUD, bookings list + detail, customers list, CMS for blog MDX. Audit log on every mutation.

**Prompt 10 — Deployment**

> Produce a step-by-step `docs/deployment.md` for Vercel + Neon + Upstash + Inngest + Stripe. Add `vercel.json` if needed. Do a dry-run build locally and report any errors.

**Prompt 11 — Phase 2 kickoff (AI)**

> Build `packages/ai`: Anthropic client, prompt registry, token budget per feature, response cache (Upstash), prompt-injection filter, and a daily spend cap. Then implement the AI Trip Planner chat UI on `/plan` that outputs a day-by-day itinerary linking to our experiences.

(Phases 3 and 4 follow the same one-ticket-at-a-time pattern — don't start them until Phase 2 is stable and getting real traffic.)

---

## SECTION 3 — Things YOU (the human) should prepare before running this

- [x] ~~Company name~~ → **Aerovy Travels** (confirm the legal entity name matches).
- [x] ~~Logo conversion~~ → already done. Place `logo.png`, `logo-small.png`, and `logo-source.pdf` in `./assets/`.
- [x] ~~Brand hex colors~~ → already extracted and baked into Section 1.
- [ ] Create accounts (all have free tiers): GitHub, Vercel, Neon (or Supabase), Upstash, Inngest, Resend, Stripe (test mode), Anthropic API, Cloudflare R2 (optional), PostHog.
- [
