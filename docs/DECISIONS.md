# Architecture Decisions — SPTS

All architectural decisions are logged here with `D-NNN` IDs. Reference these in code comments.

Format:
```
## D-NNN: Decision Title
**Date:** YYYY-MM-DD
**Status:** Accepted | Superseded by D-NNN | Deprecated
**Context:** Why was a decision needed?
**Decision:** What was decided?
**Rationale:** Why this option over alternatives?
**Consequences:** Trade-offs and implications
**References:** Links to spts-clean/zenith patterns or external docs
```

---

## D-001: Next.js 16.1.6 App Router as Framework
**Date:** 2026-03-01
**Status:** Accepted
**Context:** Needed a React framework for a full-stack community management app.
**Decision:** Next.js **16.1.6** with App Router and TypeScript strict mode.
**Rationale:** Both spts-clean and zenith use Next.js. Vercel-native. App Router enables server components and streaming. Turbopack for fast dev experience.
**Consequences:** Must use `'use client'` pragma for interactive components. Cannot mix with Pages Router. Next.js 16 uses `src/proxy.ts` for locale routing instead of `src/middleware.ts`. next-intl v4.x required (v3 only supports up to Next.js 15).
**References:** spts-clean/next.config.ts, zenith/next.config.ts

---

## D-002: TypeScript Strict Mode
**Date:** 2026-03-01
**Status:** Accepted
**Context:** spts-clean used a less strict TypeScript config, causing runtime surprises. Zenith used strict mode and had fewer type-related bugs.
**Decision:** Enable `strict: true`, `noImplicitAny`, `noImplicitReturns`, `noUncheckedIndexedAccess` in tsconfig.json.
**Rationale:** Catches bugs at compile time. Zenith proved this pattern works.
**Consequences:** More upfront effort typing, but less debugging later. All function return types must be explicit.

---

## D-003: Shadcn/UI + Tailwind CSS + Framer Motion
**Date:** 2026-03-01
**Status:** Accepted
**Context:** spts-clean used raw Radix UI components with manual styling. Zenith used Shadcn/UI (which wraps Radix) for pre-built accessible components.
**Decision:** Use Shadcn/UI as the component foundation, Tailwind CSS for styling, Framer Motion for transitions.
**Rationale:** Shadcn/UI provides the same Radix accessibility guarantees but with pre-built components — significantly better DX. Components are owned in-repo (not a package dependency).
**Consequences:** Run `npx shadcn@latest add [component]` to add components to `src/components/ui/`. Do not edit generated components directly without good reason.

---

## D-004: Supabase PostgreSQL as Database
**Date:** 2026-03-01
**Status:** Accepted
**Context:** Need a managed PostgreSQL database with auth, realtime, and storage built in.
**Decision:** Supabase PostgreSQL with hand-written SQL migrations (no ORM).
**Rationale:** Both spts-clean and zenith use Supabase successfully. No ORM means full SQL control and no abstraction leaks.
**Consequences:** All migrations in `database/migrations/` as numbered SQL files. Every UP has a paired DOWN.

---

## D-005: Supabase Auth (Not Custom Auth)
**Date:** 2026-03-01
**Status:** Accepted
**Context:** spts-clean built a custom auth system (`lib/auth.tsx`) with sessionStorage and role selection modals. This was complex to maintain and had multiple bugs.
**Decision:** Use Supabase Auth for all authentication. Multi-role support via `user_roles` table + RLS policies.
**Rationale:** RLS enforced at the database level is more secure than application-level checks. Reduces auth attack surface. Multi-role supported natively.
**Consequences:** Use `createServerClient()` in server components/routes. Use `createBrowserClient()` in client components. Never use service role key client-side.

---

## D-006: TanStack Query v5 for Server State
**Date:** 2026-03-01
**Status:** Accepted
**Context:** Need a consistent pattern for fetching, caching, and invalidating server data.
**Decision:** TanStack Query v5 for all server state management.
**Rationale:** Proven in spts-clean. Handles loading/error states, caching, and background refetch. Works well with Next.js App Router.
**Consequences:** Wrap app in `QueryClientProvider`. Use `useQuery` for reads, `useMutation` for writes. Do not fetch in useEffect when TanStack Query can handle it.

---

## D-007: Strategic Tamil Placement (No Full i18n System)
**Date:** 2026-03-01
**Status:** Accepted (revised from initial decision)
**Context:** Initial plan was next-intl for full Tamil+English. User clarified: "I don't want everything to be in Tamil. I don't want everything to be repeated in Tamil either. Where it is good, include Tamil — just balance it."
**Decision:** English is the primary language. Tamil appears strategically — in hero titles, program names, event titles, and cultural accents. Load one Tamil web font globally (Noto Serif Tamil). No full translation system, no locale routing.
**Rationale:** Full i18n (next-intl with locale routing) is unnecessary overhead for this use case. Strategic Tamil placement is more authentic and less repetitive. Easier for admin to maintain.
**Consequences:** Tamil text is hardcoded in specific components where culturally appropriate. No `/en/` or `/ta/` route prefixes. Load `Noto Serif Tamil` from Google Fonts in root layout.

---

## D-008: Vitest + Testing Library for Unit/Integration Tests
**Date:** 2026-03-01
**Status:** Accepted
**Context:** Need a fast unit test runner.
**Decision:** Vitest with @testing-library/react for component tests.
**Rationale:** Both spts-clean and zenith use this. ESM-native, fast, compatible with Next.js. 70% coverage threshold (higher than spts-clean's 50%).
**Consequences:** Tests in `tests/unit/` and `tests/integration/`. Run with `npm run test`.

---

## D-009: Playwright for E2E Tests via MCP
**Date:** 2026-03-01
**Status:** Accepted
**Context:** spts-clean had no E2E tests in the main project (separate repo). zenith had Playwright E2E from the start with MCP support.
**Decision:** Playwright E2E tests from day 1 in `tests/e2e/`. Use Playwright MCP in Claude Code for interactive UI validation during development.
**Rationale:** User explicitly requires "user perspective testing." Playwright runs real Chromium. MCP integration lets Claude Code validate UI directly.
**Consequences:** Every major user flow needs a Playwright spec. Page Object Model pattern used.

---

## D-010: Sentry for Error Monitoring (Day 1)
**Date:** 2026-03-01
**Status:** Accepted
**Context:** spts-clean had no error monitoring. Bugs in production were found by users. zenith added Sentry from the start.
**Decision:** Sentry integrated at project initialization, not added later.
**Rationale:** Catch production bugs immediately. Error context (user, route, payload) makes debugging faster. Optional: only activates when NEXT_PUBLIC_SENTRY_DSN is set.
**Consequences:** Graceful degradation — app works without DSN set. Add `NEXT_PUBLIC_SENTRY_DSN` to Vercel env vars.

---

## D-011: Nodemailer + iCloud SMTP for Email
**Date:** 2026-03-01
**Status:** Accepted
**Context:** Need email capability for notifications, enrollment, and parent communication.
**Decision:** Nodemailer with iCloud SMTP (same configuration as spts-clean).
**Rationale:** Proven in spts-clean. Same SMTP credentials can be reused.
**Consequences:** Centralize in `src/lib/email/sendEmail.ts`. Never call nodemailer directly in route handlers.

---

## D-012: GitHub Actions + Vercel for CI/CD
**Date:** 2026-03-01
**Status:** Accepted
**Context:** spts-clean used GitLab CI. zenith used GitHub Actions + Vercel. Need a CI/CD pipeline from day 1.
**Decision:** GitHub Actions for PR quality gates. Vercel for deployment. Release branch strategy.
**Rationale:** zenith pattern is simpler. GitHub Actions is free for public repos. Vercel has native Next.js support.
**Consequences:** `.github/workflows/ci.yml` runs on all PRs. `.github/workflows/deploy.yml` runs on release branch push.

---

## D-013: Framer Motion for Animations
**Date:** 2026-03-01
**Status:** Accepted
**Context:** UI needs smooth transitions for a professional feel, especially on mobile.
**Decision:** Framer Motion for all animations and transitions.
**Rationale:** zenith uses it with great results. Declarative API works well with React. Accessible by default (respects prefers-reduced-motion).
**Consequences:** Import from `framer-motion`. Use `motion.div` etc. for animated elements.

---

## D-016: RSVP is Admin-Optional Per Event
**Date:** 2026-03-07
**Status:** Accepted
**Context:** Original MarutamEvents had hardcoded RSVP buttons for all events. Not all events have external RSVP registration.
**Decision:** Each event has an optional `rsvpUrl` field. If set by admin, RSVP button renders. If not set, button shows "Details TBA".
**Rationale:** Avoids misleading users with dead RSVP links. Admin CMS (REQ-202603-004) will let board set rsvpUrl per event.
**Consequences:** Never render RSVP with `href="#"`. Always check `rsvpUrl` before rendering. Applied in both MarutamEvents (landing) and /events list page.

---

## D-015: Space Grotesk + Outfit Fonts (Zenith Pattern)
**Date:** 2026-03-07
**Status:** Accepted
**Context:** Original font stack (Playfair Display + DM Sans) loaded via CSS `@import` — caused invisible text and Thirukkural Tamil section not rendering.
**Decision:** Switch to Space Grotesk (display headings) + Outfit (body/UI) loaded via Next.js `next/font/google`. Keep Noto Serif Tamil for Tamil script.
**Rationale:** This is the zenith repo font pattern. `next/font/google` is zero-FOUT — fonts are self-hosted by Next.js with no external network request at render time. Eliminates broken @import. Space Grotesk is more readable than Playfair Display for community/information sites.
**Consequences:** `--font-display` → Space Grotesk. `--font-body` → Outfit. `--font-tamil` → Noto Serif Tamil. Font CSS variables applied to `<html>` via className. No @import needed in globals.css.
**References:** zenith/src/app/layout.tsx, zenith/src/app/globals.css

---

## D-014: Keep [locale] Routing with next-intl (Strategic Tamil, Not Full Translation)
**Date:** 2026-03-07
**Status:** Accepted
**Context:** D-007 revised Tamil strategy to "strategic placement only, no full i18n system." However, next-intl v4 was already set up with `[locale]` route segments and `src/proxy.ts`. Removing it would require significant refactoring with no clear benefit.
**Decision:** Keep `[locale]` routing in place. Use next-intl for routing infrastructure but not for full translation. Translations remain minimal — nav, hero titles, program names — not every string.
**Rationale:** next-intl is already installed and configured. Removing it gains nothing while losing the ability to expand Tamil support later. The `[locale]` segment is invisible to users (default locale redirects cleanly). This is the spts-clean pattern as well.
**Consequences:** All page components live under `src/app/[locale]/`. `generateStaticParams` returns `['en', 'ta']`. Tamil strings are populated only where culturally meaningful, not for every UI label.
**References:** D-007 (original Tamil strategy), src/proxy.ts, src/i18n/routing.ts
