# /ship — Release Workflow

Two-stage: preview first → production only after explicit confirmation.

---

## Stage 1: Quality Gates (stop on first failure)

### Step 1 — TypeScript
```bash
npm run typecheck
```
Pass: zero errors. Fail: list all errors with file + line number.

### Step 2 — ESLint
```bash
npm run lint
```
Pass: zero errors, zero warnings. Fail: list all issues.

### Step 3 — Unit + Integration Tests
```bash
npm run test
```
Pass: all tests pass, coverage ≥ 70%. Fail: list failing tests with error messages.

### Step 4 — E2E Tests
```bash
npm run test:e2e
```
Pass: all Playwright specs pass. Fail: list failing scenarios.

### Step 5 — Build
```bash
npm run build
```
Pass: build succeeds clean. Fail: show build error.

**If any step fails — STOP. Do not proceed. Report exactly what failed and what to fix.**

---

## Stage 2: Preview Deploy

Only if all 5 gates pass:

```bash
git add [specific files — never git add -A blindly]
git commit -m "feat(REQ-YYYYMM-NNN): [description]

- [what changed]
- [what changed]

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

git push origin release
```

GitHub Actions CI runs. Vercel preview deploy triggers automatically.

Report the preview URL once available.

---

## Stage 3: Production Promotion (requires explicit user confirmation)

**Never promote to production automatically.**

After preview is verified by the user:
```
"Preview looks good — promote to production?"
```

Only after explicit "yes" → Vercel dashboard → Promote to Production.

---

## Output format

**All pass:**
```
SHIP READY ✅
═══════════════════════════════════════
TypeScript  ✅
ESLint      ✅
Tests       ✅  ([N] tests, [X]% coverage)
E2E         ✅  ([N] specs)
Build       ✅

Pushed to: release branch
Preview: [URL once Vercel builds]
Migrations applied: [list or "none"]

Ready for production? Verify preview first, then confirm.
═══════════════════════════════════════
```

**Any failure:**
```
SHIP BLOCKED ❌
═══════════════════════════════════════
Failed: [check name]

[Exact error — file:line where applicable]

Fix this before shipping.
═══════════════════════════════════════
```

---

## Rules

- Never skip a gate — all 5 must pass
- Never push with `git add -A` — stage specific files only (never commit .env.local)
- Never promote to production without user saying "yes"
- If migrations included: confirm DOWN file exists before pushing
