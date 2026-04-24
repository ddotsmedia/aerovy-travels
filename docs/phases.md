# Phase breakdown

Deliverable-sized tickets. Feed them to Claude Code **one at a time**. Each ticket ends with a definition of done (DoD) and tests expected.

Convention:

- **[P1-T##]** = Phase 1, Ticket ##.
- Every ticket ends with: running `pnpm lint && pnpm typecheck && pnpm test && pnpm build` green.
- New dependencies require approval (call them out in the plan before installing).

---

## Phase 1 — Foundation (MVP)

### [P1-T01] Shared config package

Extract ESLint, Prettier, Tailwind preset, and TS configs into `packages/config`. Every future workspace extends from here.

- **Files:** `packages/config/{eslint,tsconfig,tailwind,prettier}/*`, root wiring.
- **DoD:** `eslint.config.mjs` + `tsconfig.base.json` consumed via `extends`; root scripts unchanged; CI still green.

### [P1-T02] Design system + tokens + icon generation

Create `packages/ui` with shadcn/ui primitives, brand tokens (`tokens.css`), Tailwind preset mapping tokens, and a one-shot `scripts/generate-icons.ts` (uses `sharp`) to emit favicons + OG from `assets/logo.png`. Commit output.

- **Deps to request:** `sharp`, `shadcn` CLI (dev).
- **DoD:** Storybook-free but a lightweight `apps/web` preview route renders `<Button>`, `<Card>`, `<Input>` in light + dark + RTL. Tokens match the six brand hex values exactly.

### [P1-T03] `apps/web` scaffold + i18n + RTL

Next.js 15 App Router app with `next-intl` (EN/AR/HI/RU/ZH), RTL for AR, Tajawal + Inter via `next/font`, layout with header/footer, landing page, 404.

- **DoD:** `/` renders in all 5 locales; `<html lang dir>` switches correctly; Lighthouse ≥ 90 on bare landing.

### [P1-T04] `packages/db` — Prisma schema (P1 subset)

Implement the ERD subset needed for P1: User, Auth.js tables, ExperienceCategory, Experience, ExperienceImage, ExperienceVariant, Schedule, Booking, BookingItem, Payment, Review, WishlistItem, PromoCode (table only, usage in P3).

- **Deps to request:** `prisma`, `@prisma/client`, `zod-prisma-types` (eval'd first).
- **DoD:** `pnpm db:push` works against a local Postgres; typed `prisma` client exports from `packages/db`.

### [P1-T05] Seed data — 20 Abu Dhabi experiences

Seed script inserts realistic categories + 20 experiences (Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, Yas Island, Liwa safari, Corniche cruise, Ferrari World, Qasr Al Watan, mangrove kayaking, Saadiyat Island beaches, Al Ain oasis day trip, etc.) with EN+AR copy, 3+ images each (placeholder URLs OK), 2+ variants and upcoming schedules.

- **DoD:** `pnpm db:seed` idempotent; featured flags + categories visible.

### [P1-T06] `packages/api` — tRPC setup

Create tRPC server with `publicProcedure`, `protectedProcedure`, `staffProcedure`, `adminProcedure`; wire to `apps/web` via `/api/trpc/[trpc]`; React Query client in the app; Zod on every input.

- **DoD:** `api.experience.list` returns seeded rows from the browser with full types.

### [P1-T07] Auth.js v5 + customer portal shell

Email magic links (Resend) + Google OAuth; `role` column; middleware-protected `/portal/*`; basic "My bookings" empty state + profile form.

- **Deps to request:** `next-auth@beta`, `@auth/prisma-adapter`, `resend`.
- **DoD:** Sign in with email + Google in dev; logged-in state is visible in header; session persists across refresh.

### [P1-T08] Experiences browse + detail + filters

Listing page with filters (category, duration, price, rating, date) and experience detail page with images, variants, schedule picker, "book now".

- **DoD:** Filters drive tRPC query; detail pages SSR'd with structured data (`TouristAttraction` + `Offer`); Lighthouse ≥ 90.

### [P1-T09] Search

Decide Meilisearch self-hosted vs. Algolia free tier (open PR with the decision doc). Implement indexing on `Experience` upsert/delete via Inngest; search box on the listing page.

- **DoD:** Typo-tolerant search across EN+AR titles + summaries; results paginated.

### [P1-T10] Cart + Stripe checkout + confirmation email

Client-side cart (persisted in localStorage + server-verified on checkout), Stripe Checkout session, webhook flips `Booking.status` to `CONFIRMED`, Resend email with booking details.

- **Deps to request:** `stripe`, `@stripe/stripe-js`, `react-email`, existing `resend`.
- **DoD:** End-to-end: add to cart → Stripe test card → confirmation email with voucher. Webhook signature verified.

### [P1-T11] Reviews & wishlist

Logged-in users can add/remove wishlist, leave a review after a confirmed booking (1 per experience). Moderation queue stub in admin (full queue in T13).

- **DoD:** Review shows on detail page only after `PUBLISHED`; rating avg updates via DB trigger or tRPC mutation.

### [P1-T12] Observability + rate limiting + error pages

Sentry in both apps, Upstash rate limit middleware, `/api/health`, branded 404/500, `structured` pino logs on server.

- **Deps to request:** `@sentry/nextjs`, `@upstash/ratelimit`, `@upstash/redis`, `pino`.
- **DoD:** Throwing an error in dev appears in Sentry; rate-limit headers visible.

### [P1-T13] Admin panel v1

`apps/admin` Next.js app: login (STAFF/ADMIN only), dashboard KPIs (revenue, bookings, top experiences), CRUD for experiences (incl. image upload to R2/UploadThing), bookings list, customers list, review moderation queue, audit log viewer.

- **Deps to request:** `@tanstack/react-table`, `recharts`, `@aws-sdk/client-s3` (R2).
- **DoD:** All admin mutations write to `AuditLog`; RBAC enforced at middleware + tRPC.

### [P1-T14] CI polish + deploy + runbook

GitHub Actions matrix if needed, Vercel projects wired (web + admin), Neon prod branch, Upstash prod, Inngest prod, Sentry projects, env vars set, `docs/ops.md` runbook (incidents, rotations, backups).

- **DoD:** Merging to `main` deploys both apps; `/api/health` green in prod; first synthetic booking on live Stripe test keys.

### [P1-T15] E2E happy path + final polish

Playwright: home → browse → detail → book (Stripe test) → confirmation. Lighthouse budget gate in CI for `/` and `/experiences/[slug]`. Accessibility audit (axe) gate.

- **DoD:** E2E green on CI; a11y 0 serious; performance budget enforced.

---

## Phase 2 — AI & Personalization

### [P2-T01] `packages/ai` foundation

Kill switch, daily spend cap, Redis cache, prompt-injection filter, audit logging. Exposes typed `generate(templateName, input, opts)`.

### [P2-T02] AI trip planner

Chat flow (4–6 questions) → day-by-day itinerary linked to real `Schedule`s. Persists to `Itinerary/Day/Stop`. Share link.

### [P2-T03] Smart search

Natural-language query → filters + ranked results with fallback to search engine from P1-T09.

### [P2-T04] AI concierge (logged-in)

Answers about bookings; upsell add-ons. Strict tool-use schema for booking lookups.

### [P2-T05] SEO content generation + review queue

Admin can request auto-copy per experience; goes to `status=REVIEW`, admin approves → `PUBLISHED`.

### [P2-T06] Review summarization

Per-experience summary of N most recent reviews, cached 24h, regenerated on new review.

---

## Phase 3 — Operations depth

### [P3-T01] Dynamic pricing & availability calendar

Per-experience rules (day-of-week, season, last-minute), admin calendar UI, price preview on detail page.

### [P3-T02] Promo codes, gift cards, bundles

Redemption at checkout, gift-card email delivery, bundle = multi-experience package.

### [P3-T03] Supplier portal

Vendor login, CRUD own experiences/hotels, payouts report, commission rate from `Supplier.commissionRate`.

### [P3-T04] Refunds & cancellations

Policy engine per experience, partial/full refunds via Stripe, email + WhatsApp on state change.

### [P3-T05] Multi-currency display

FX snapshot at render time (cached 1h); still charged in AED unless UAE gateway is wired.

### [P3-T06] WhatsApp Business notifications

Booking confirmations, 24-hour reminders, cancellation notices. Inngest step for retry.

### [P3-T07] UAE payment gateway adapter

Plug Telr / Network International behind the adapter shipped in P1-T10.

---

## Phase 4 — Mobile (Expo)

### [P4-T01] Expo app scaffold

NativeWind, shared types via `packages/api` client, Auth.js session via deep link.

### [P4-T02] Browse + book flows

Mirror web MVP; Stripe mobile SDK.

### [P4-T03] AI planner on mobile

Reuse `packages/ai` via tRPC endpoints.

### [P4-T04] Boarding-pass tickets + push + offline itinerary

QR code tickets, Expo push, offline store for confirmed itineraries.
