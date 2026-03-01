# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## ⚠️ SESSION START PROTOCOL

Every session MUST begin by reading these files in order:
1. `CLAUDE.md` (this file)
2. `docs/BUILD_SUMMARY.md` — where we left off
3. `docs/REQUIREMENTS.md` — active requirements
4. `docs/DEFECTS.md` — open defects
5. `docs/DECISIONS.md` — architectural decisions already made

Then respond with:
```
SPTS SESSION START
Last session: [date from BUILD_SUMMARY.md]
Where we left off: [summary]
Open defects: [count + severity]
Active requirements: [count in-progress]
Next priority: [what to build next]
Blockers: [if any]
Questions before starting: [max 2, only if truly blocking]
```

Use `/start` command to trigger this automatically.

---

## 🌟 Project Vision

**Project:** Sun Prairie Tamil Society — community hub website
**Domain:** sunprairietamilsociety.com
**North Star:** First Tamil society in the US with a truly world-class, modern community hub. Pride + Belonging + Professionalism + Warmth in one place.

**Programs hosted/linked:**
- Tamil School → separate domain (spts-clean)
- Library → school-domain/library (future app)
- Tamil Pattarai → school-domain/pattarai (future app)
- Music Club → this site (landing) → future app
- Volunteer Program → this site

**Auth model:** Public by default. Login required for: posting to feed, submitting achievements, submitting help requests, board member self-edit, admin CMS.

**Language:** English primary. Tamil script used strategically (hero, program names, event names, decorative). Single Tamil font (Noto Serif Tamil). No full i18n system — see D-007.

See `docs/VISION.md` for full vision details.

---

## 🏛️ Ground Rules (Non-Negotiable)

### Rule 1: No Rework — Pre-Flight Review Gates

Every task (no matter how small) must pass through a mental multi-role review **before** any code is written. Run sub-agents in parallel for large tasks.

| Gate | Role | Check |
|------|------|-------|
| 🏗️ Architect | Architecture | System design impact, component dependencies, data flow |
| 🔒 Security | Security Analyst | Auth, injection, data exposure, GDPR, student/minor data |
| 🎨 UX | UX Designer | User flows, mobile-first, Tamil/English, 44px touch targets |
| 🧪 QA | QA Engineer | Test plan, edge cases, regression surface, E2E coverage |
| 📋 PM | Product Manager | Vision alignment, scope creep, priority against backlog |
| 🚀 DevOps | Cloud/Platform | Deployment, env vars, infra impact, migration safety |
| 🛡️ SRE | Reliability | Rollback plan, graceful degradation, monitoring impact |

**For small tasks (bug fix, UI tweak):** Do the gate checks mentally, flag only if an issue is found.
**For medium/large tasks:** Spawn parallel sub-agents (blueprint, verify, scout, devops) before writing code.

### Rule 2: Regression Check First — Always

Before starting anything: identify the regression surface. Ask — *"What existing behavior could this break?"* Do not proceed until convinced no regressions, or they are explicitly accepted.

### Rule 3: Front-Load All Questions — No Mid-Task Permission Prompts

Gather all required information in one batch before starting. Do not interrupt mid-execution for clarifications or permissions. One question batch → work continuously → report results.

**Tool use policy:** Proceed with ALL tool uses (Read, Write, Edit, Bash, WebFetch, WebSearch, Agent, Glob, Grep) without asking permission. Only stop for confirmation when an action is irreversible AND destructive (e.g., dropping a production database, force-pushing over another person's work). Normal development work — file edits, running tests, reading files, spawning agents, web research — proceeds autonomously.

### Rule 4: Pattern Comparison

When designing something new:
1. Check `../spts-clean/` — what pattern do they use?
2. Check `../vision/zenith/` — what pattern do they use?
3. Pick the better approach, document the decision in `docs/DECISIONS.md` with `D-NNN` prefix.

### Rule 5: User-Perspective Testing Is Not Optional

A feature is not done until a Playwright E2E test validates it from the user's perspective. API tests and unit tests are prerequisites, not replacements. Use Playwright MCP for interactive UI validation.

### Rule 6: Mobile-First + Tamil from Day 1

No component is complete unless it:
- Works at 375px (iPhone SE) viewport
- Has Tamil translation key in `src/i18n/ta.json`
- Has English translation key in `src/i18n/en.json`

### Rule 7: Comments Everywhere

Every function, every non-obvious logic block, every decision. See comment standards below.

---

## 🛠️ Confirmed Tech Stack

| Layer | Technology | Decision |
|-------|-----------|---------|
| Framework | Next.js 15 App Router | D-001 |
| Language | TypeScript (strict mode) | D-002 |
| Styling | Tailwind CSS + Shadcn/UI + Framer Motion | D-003 |
| Database | Supabase PostgreSQL | D-004 |
| Auth | Supabase Auth + RLS from day 1 | D-005 |
| Server State | TanStack Query v5 | D-006 |
| i18n | next-intl (Tamil `ta` + English `en`) | D-007 |
| Unit/Integration Tests | Vitest + Testing Library | D-008 |
| E2E Tests | Playwright (via MCP) | D-009 |
| Error Monitoring | Sentry (from day 1) | D-010 |
| Email | Nodemailer (iCloud SMTP, same as spts-clean) | D-011 |
| CI/CD | GitHub Actions → Vercel | D-012 |
| Animation | Framer Motion | D-013 |

See `docs/DECISIONS.md` for full rationale on each decision.

---

## 📁 Project Structure

```
sunprairietamilsociety/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes (by feature domain)
│   │   ├── [locale]/             # i18n locale routing (en, ta)
│   │   │   ├── (auth)/           # Auth pages (login, signup, reset)
│   │   │   └── [portal]/         # Portal pages (admin, teacher, parent)
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                   # Shadcn/UI base components only
│   │   └── [domain]/             # Feature-domain components
│   ├── lib/
│   │   ├── supabase/             # client.ts (browser), server.ts, admin.ts
│   │   ├── auth/                 # Auth utilities (role checks, guards)
│   │   ├── email/                # Email utilities (sendEmail wrapper)
│   │   └── utils/                # Shared utilities, retry, rate-limiter
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # index.ts — all TypeScript interfaces centralized
│   └── i18n/
│       ├── en.json               # English translations
│       └── ta.json               # Tamil translations
├── database/
│   ├── migrations/
│   │   ├── 001_initial.up.sql    # UP migration
│   │   └── 001_initial.down.sql  # DOWN migration (rollback — required)
│   └── seeds/                    # Dev seed data
├── tests/
│   ├── unit/                     # Vitest unit tests
│   ├── integration/              # Vitest integration tests
│   └── e2e/                      # Playwright E2E tests
├── docs/
│   ├── BUILD_SUMMARY.md          # Session-by-session progress log
│   ├── DECISIONS.md              # D-### architectural decisions
│   ├── REQUIREMENTS.md           # REQ-### requirements tracker
│   ├── DEFECTS.md                # DEF-### defect tracker
│   ├── PRODUCT_BACKLOG.md        # Feature backlog + priorities
│   └── VISION.md                 # Project vision + north star
├── .claude/
│   ├── agents/                   # Sub-agent configs
│   ├── commands/                 # Custom slash commands
│   └── settings.json             # Hooks configuration
├── .github/workflows/
│   ├── ci.yml                    # PR quality gate
│   └── deploy.yml                # Release branch deploy
└── CLAUDE.md
```

---

## 💬 Comment Standards

### Function-Level (JSDoc — all functions, all methods)
```typescript
/**
 * [One-line description of what this function does]
 *
 * @param paramName - description of parameter
 * @returns description of return value
 * @throws {ErrorType} when [condition that causes throw]
 * @see D-005 - links to decision if applicable
 * @see REQ-202503-001 - links to requirement if applicable
 */
```

### Inline (for non-obvious logic)
```typescript
// D-005: Using Supabase Auth (not custom) for multi-role RLS at DB level
// REQ-202503-001: User must be able to switch Tamil/English without re-login
// DEF-202503-001: Fixes UTC timezone shift on date display (see spts-clean bug)
```

### Console Log Standards (emoji prefix — consistent across codebase)
```typescript
console.log('✅ [Auth] User signed in: role=teacher')
console.log('❌ [Auth] Sign-in failed: invalid credentials')
console.log('📧 [Email] Sent to 12 parents for class Grade3')
console.log('🔒 [Security] Auth check passed for route /api/teacher')
console.log('🏗️ [Migration] Running 003_add_students.up.sql')
console.log('🌐 [i18n] Locale switched: en → ta')
console.log('🚀 [Deploy] Health check passed')
console.warn('⚠️ [RateLimit] Threshold reached for /api/enroll')
console.error('❌ [Critical] DB connection failed:', error)
```

---

## 🔢 Tracking ID Format

| Type | Format | Example | Where Tracked |
|------|--------|---------|---------------|
| Requirement | REQ-YYYYMM-NNN | REQ-202503-001 | `docs/REQUIREMENTS.md` |
| Defect | DEF-YYYYMM-NNN | DEF-202503-001 | `docs/DEFECTS.md` |
| Architecture Decision | D-NNN | D-001 | `docs/DECISIONS.md` |
| Test Case | TC-REQ-### or TC-DEF-### | TC-REQ-202503-001 | `tests/` files |

Rules:
- Every requirement gets a REQ-###
- Every defect must reference the REQ-### it breaks
- Every D-### must be mentioned in code comments where the decision applies
- Priority levels: P0 (blocker), P1 (high), P2 (medium), P3 (low)

---

## 🧪 Testing Standards

### Required Test Layers (all three required before a feature is "done")
1. **Unit tests** (Vitest) — pure functions, utilities, custom hooks
2. **Integration tests** (Vitest) — API routes, Supabase queries
3. **E2E tests** (Playwright) — full user flows validated in real browser

### Coverage Thresholds
```
statements: 70%
branches:   70%
functions:  70%
lines:      70%
```

### E2E Test Pattern (Page Object Model)
```
tests/e2e/
├── pages/          # Page Object Model classes
├── fixtures/       # Test data and mocks
└── specs/          # Test specifications (one per user flow)
```

### Playwright MCP Usage
Use Playwright MCP (available in Claude Code) to:
- Validate UI after implementing features (`screenshot`, `click`, `fill`)
- Check mobile responsiveness at 375px and 768px
- Verify Tamil/English language switching works correctly
- Validate keyboard navigation and accessibility

---

## 🔄 Rollback Strategy

### Database Rollback
Every migration MUST have a paired DOWN file:
```
database/migrations/
├── 001_initial_schema.up.sql    # Forward migration
└── 001_initial_schema.down.sql  # Must be able to undo cleanly
```
Test DOWN migration in dev before merging UP migration.

### Deployment Rollback
- Vercel: instant rollback to previous deployment from dashboard
- Keep last 5 deployments live
- Never delete the release branch

### Feature Flag Rollback
High-risk features use a `feature_flags` Supabase table for on/off toggle without deployment:
```typescript
const isEnabled = await getFeatureFlag('feature-name', userId)
if (!isEnabled) return <LegacyComponent />
```

---

## 🌍 i18n Standards (Tamil + English)

- Default locale: `en`
- Supported locales: `en` (English), `ta` (Tamil)
- Route pattern: `/en/...` and `/ta/...`
- All user-facing strings: in translation JSON files — **zero hardcoded English in components**
- Date/number formatting: use `next-intl` utilities for locale-aware output

Translation file structure:
```json
{
  "nav": { "home": "Home", "classes": "Classes" },
  "auth": { "signIn": "Sign In", "signOut": "Sign Out" },
  "[domain]": { "[key]": "[value]" }
}
```

---

## 📱 Mobile-First Standards

- Design at 375px first, then scale up (min-width breakpoints)
- Touch targets: minimum 44×44px (WCAG 2.5.5)
- No horizontal scroll at any viewport
- Test at: 375px (mobile), 768px (tablet), 1280px (desktop)

---

## 🔐 Security Standards

- **Auth first:** Every API route validates auth before any business logic
- **RLS always:** Every Supabase table has RLS policies — no exceptions
- **Zod validation:** All API request bodies validated with Zod schemas
- **No raw SQL strings:** Use Supabase query builder or parameterized queries only
- **Rate limiting:** Supabase-backed (persists across serverless cold starts)
- **Student/minor data:** Ask data privacy questions during requirement analysis
- **Secrets:** Never in code, never in git — Vercel env vars only

---

## 🛡️ SRE Standards

- **Health check endpoint:** `/api/health` returns `{ status: 'ok', ts: Date.now() }`
- **Graceful degradation:** Optional features (email, notifications) fail silently with error logging
- **Error budget:** Target 99.5% uptime
- **Sentry:** All production errors captured with context (user, route, payload shape)
- **Structured logs:** Every `console.log` has `[Context]` prefix for filtering
- **Cold start safety:** No in-memory state that can be lost (rate limits, sessions → Supabase)

---

## 🚀 Development Commands

```bash
npm run dev           # Dev server (turbopack)
npm run build         # Production build (must pass before PR)
npm run start         # Production server
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit (TypeScript strict check)
npm run test          # Vitest unit + integration
npm run test:watch    # Vitest watch mode
npm run test:coverage # Coverage report (must meet 70% threshold)
npm run test:e2e      # Playwright E2E tests
```

---

## 🔀 CI/CD & Branch Strategy

**Branch:** `release` is the production branch. All work branches off and merges to `release`.

**PR Pipeline (GitHub Actions):**
1. `npm run typecheck` — TypeScript must be clean
2. `npm run lint` — ESLint must pass
3. `npm run test` — Unit + integration must pass
4. `npm run build` — Build must succeed

**Deploy:** Push/merge to `release` → GitHub Actions → Vercel production

---

## 📋 Custom Commands

| Command | Purpose |
|---------|---------|
| `/start` | Begin session: read docs, report status, state plan |
| `/status` | Show current state from BUILD_SUMMARY.md |
| `/wrap` | End session: update BUILD_SUMMARY.md, commit docs |
| `/ship` | Commit + push to release branch workflow |
| `/review` | Trigger all parallel review agents (arch, security, QA, UX, DevOps) |

---

## 🤖 Sub-Agents

| Agent | File | Purpose |
|-------|------|---------|
| blueprint | `.claude/agents/blueprint.md` | Architecture planning before implementation |
| forge | `.claude/agents/forge.md` | Code implementation with standards |
| verify | `.claude/agents/verify.md` | QA, security, UI validation |
| scout | `.claude/agents/scout.md` | Research patterns across spts-clean and zenith |
| devops | `.claude/agents/devops.md` | CI/CD, migration safety, deployment |

---

## 🏗️ Architecture Decisions (Summary)

Full details in `docs/DECISIONS.md`.

| ID | Decision | Rationale |
|----|----------|-----------|
| D-001 | Next.js 15 App Router | Stable, both spts-clean & zenith use it, Vercel-native |
| D-002 | TypeScript strict | Catch bugs at compile time, zenith proved this works |
| D-003 | Shadcn/UI + Tailwind | Better DX than raw Radix (spts-clean), same accessibility |
| D-004 | Supabase PostgreSQL | Both projects use it, managed, RLS built-in |
| D-005 | Supabase Auth (not custom) | Multi-role RLS at DB level, reduces auth attack surface |
| D-006 | TanStack Query v5 | Server state caching, spts-clean proven pattern |
| D-007 | next-intl for i18n | Compile-time safe, App Router native, Tamil from day 1 |
| D-008 | Vitest + Testing Library | Fast, ESM-native, both projects use it |
| D-009 | Playwright E2E via MCP | Real browser, user-perspective, Claude Code native |
| D-010 | Sentry from day 1 | Production error visibility immediately, zenith pattern |
| D-011 | Nodemailer SMTP | Proven in spts-clean, iCloud SMTP works |
| D-012 | GitHub Actions + Vercel | Zenith pattern, simpler than GitLab CI |
| D-013 | Framer Motion | Smooth transitions, zenith pattern |
