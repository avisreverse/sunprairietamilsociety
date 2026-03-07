# /test — Run Full Test Suite + Playwright Validation

Use this command after implementation is complete to run all test layers.

## Step 1: Run unit + integration tests
```bash
npm run test
```
If any test fails — STOP. Do not proceed to E2E. Fix failures first.

Report: pass/fail count, coverage percentage.
Coverage must be ≥70% on statements, branches, functions, lines.

## Step 2: Run build check
```bash
npm run typecheck && npm run lint && npm run build
```
If any fails — STOP. Do not proceed to Playwright. Fix first.

## Step 3: Start dev server for Playwright
```bash
npm run dev
```
Wait for server to be ready on localhost:3000.

## Step 4: Run Playwright E2E tests
```bash
npm run test:e2e
```
Report: which specs passed, which failed, screenshots of failures.

## Step 5: Playwright visual validation (use Playwright MCP)
For the feature just built, use Playwright MCP tools to:
1. Navigate to the feature page
2. Screenshot at 375px (mobile) — verify no overflow, no cut-off text
3. Screenshot at 1280px (desktop) — verify layout correct
4. Interact with the main user flow (click, fill forms, navigate)
5. Verify Tamil text renders (if applicable)
6. Verify keyboard navigation works (tab through interactive elements)
7. Check any animation/transition works correctly

## Step 6: Regression check
Run the existing E2E specs for previously working features:
- Homepage sections (all 6) render correctly
- Navigation works
- Poem transitions work
- Any previously built features still function

## Step 7: Report

```
TEST REPORT: [REQ-NNN or "Full Suite"]
═══════════════════════════════════════
Unit + Integration:
  Tests: [passed]/[total]
  Coverage: [X]% (threshold: 70%)
  Status: ✅ PASS / ❌ FAIL

Build:
  typecheck: ✅/❌
  lint: ✅/❌
  build: ✅/❌

E2E (Playwright):
  [spec name]: ✅/❌
  [spec name]: ✅/❌

Visual Validation:
  Mobile 375px: ✅/❌ [notes]
  Desktop 1280px: ✅/❌ [notes]
  User flow: ✅/❌ [notes]
  Tamil text: ✅/❌ [notes]

Regression:
  Homepage: ✅/❌
  Navigation: ✅/❌
  [other existing features]: ✅/❌

VERDICT: ✅ ALL PASS — ready for /ship
         ⚠️ [N] failures — fix before shipping
         🔴 CRITICAL failure — [description]

New defects found: [list DEF-### or "none"]
═══════════════════════════════════════
```

## Step 8: Auto-log any defects found
If any test failure represents a bug (not just a missing test), create a DEF-### entry:
- Add to docs/DEFECTS.md open defects table
- Link to the REQ-### being tested
- Note severity (P0/P1/P2/P3)
- Add to docs/PARKING_LOT.md if it needs user decision before fixing
