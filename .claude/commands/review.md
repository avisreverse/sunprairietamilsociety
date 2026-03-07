# /review — Parallel Review Gates

Trigger all 7 review roles in parallel for the current implementation.

The user will specify what to review (a file, a feature, a PR diff, or "last change").

## Spawn these reviews simultaneously:

### 🏗️ Architect Review
- Does this fit the system architecture in CLAUDE.md?
- Does it follow the decisions in docs/DECISIONS.md?
- Are there unintended dependencies introduced?
- Is the component/API organized consistently with existing patterns?

### 🔒 Security Review
- Are all API routes authenticated before business logic?
- Is there a Zod validation schema on all POST/PUT/PATCH bodies?
- Are all Supabase queries using RLS-compatible patterns (not service role in client)?
- Any SQL injection risks? (use query builder or parameterized)
- Any XSS risks in rendered content?
- Is any student/minor data being exposed without need?
- Are secrets or keys in the code?

### 🎨 UX + Accessibility Review
- Does it work at 375px mobile viewport?
- Are all touch targets ≥ 44×44px?
- Is there no horizontal scroll on mobile?
- Are all strings using next-intl translation keys (not hardcoded English)?
- Is there a Tamil (`ta`) translation entry for every English (`en`) key used?
- Does it use Framer Motion for any state transitions?
- Is keyboard navigation working (tab order, focus management)?
- Are there appropriate ARIA labels?

### 🧪 QA Review
- Are there unit tests for all new utility functions?
- Are there integration tests for all new API routes?
- Is there a Playwright E2E spec for the user flow?
- Does the coverage remain above 70%?
- Are edge cases handled (empty state, error state, loading state)?
- Are there regression risks identified and addressed?

### 📋 Product Manager Review
- Does this match the requirement spec in docs/REQUIREMENTS.md?
- Are all acceptance criteria from the REQ-### met?
- Is this in scope (no scope creep)?
- Is it aligned with the project vision in docs/VISION.md?

### 🚀 DevOps Review
- Are there new environment variables? Are they in .env.example and Vercel?
- Are there new database migrations? Do they have DOWN partners?
- Does the DOWN migration cleanly undo the UP?
- Are there new cron jobs or background jobs? Are they configured?
- Is the build size acceptable?

### 🛡️ SRE Review
- Does the feature degrade gracefully if Supabase is slow?
- Are optional features (email, Sentry) fail-silent?
- Are all console logs using [Context] prefix format?
- Is there a health impact (new endpoints need rate limiting)?
- Is Sentry capturing errors with sufficient context?

## Output Format

```
SPTS REVIEW COMPLETE
═══════════════════════════════════════

🏗️ ARCHITECT: [PASS / ISSUES FOUND]
  [Details if issues found]

🔒 SECURITY: [PASS / ISSUES FOUND]
  [Details if issues found]

🎨 UX/A11Y: [PASS / ISSUES FOUND]
  [Details if issues found]

🧪 QA: [PASS / ISSUES FOUND]
  [Details if issues found]

📋 PM: [PASS / ISSUES FOUND]
  [Details if issues found]

🚀 DEVOPS: [PASS / ISSUES FOUND]
  [Details if issues found]

🛡️ SRE: [PASS / ISSUES FOUND]
  [Details if issues found]

VERDICT: ✅ SHIP IT / ⚠️ FIX BEFORE SHIP / 🔴 BLOCKING ISSUES
Issues to fix: [count]
Recommended action: [specific next steps]
═══════════════════════════════════════
```
