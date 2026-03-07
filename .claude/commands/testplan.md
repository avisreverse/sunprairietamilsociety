# /testplan — Define Test Cases BEFORE Writing Code

Use this command after /req and /review, BEFORE any implementation begins.
Test cases must be defined and reviewed before forge agent writes any code.

## Input
REQ-YYYYMM-NNN (the requirement being implemented)

## Step 1: Read the requirement
Read docs/REQUIREMENTS.md and find the REQ-### entry.
Extract all acceptance criteria.

## Step 2: Define test cases for each layer

### Unit Tests (Vitest)
For each utility function or custom hook this feature needs:
- TC-UNIT-NNN: function name, input, expected output, edge cases

### Integration Tests (Vitest)
For each API route this feature creates or modifies:
- TC-INT-NNN: endpoint, method, auth required, request shape, expected response, error cases

### E2E Tests (Playwright)
For each user-facing flow this feature enables:
- TC-E2E-NNN: user role, entry point, actions, expected UI state, assertions

### Regression Tests
For each existing feature that this change touches:
- TC-REG-NNN: what existing behavior must still work, how to verify it

## Step 3: Define edge cases explicitly
- Empty state: what happens with no data?
- Error state: what happens when API fails?
- Auth boundary: what happens if wrong role tries this?
- Mobile: does it work at 375px?
- Tamil/English: does text display correctly in both?

## Step 4: Estimate coverage impact
Will this maintain ≥70% coverage? If not, flag it.

## Step 5: Output

```
TEST PLAN: REQ-YYYYMM-NNN
═══════════════════════════════════════
Requirement: [title]

UNIT TESTS (Vitest — tests/unit/)
  TC-UNIT-001: [function] — [what it tests]
  TC-UNIT-002: [function] — [edge case]

INTEGRATION TESTS (Vitest — tests/integration/)
  TC-INT-001: [GET/POST] /api/[route] — [scenario]
  TC-INT-002: [auth failure case]

E2E TESTS (Playwright — tests/e2e/)
  TC-E2E-001: [user role] → [flow] → [assertion]
  TC-E2E-002: [mobile viewport] → [flow] → [assertion]

REGRESSION TESTS
  TC-REG-001: [existing feature] — [what must not break]

Edge cases covered:
  ✅ Empty state
  ✅ API error state
  ✅ Auth boundary (wrong role)
  ✅ Mobile 375px
  ✅ Tamil text rendering

Coverage impact: [stays ≥70% / drops to X% — flag if below]

APPROVED TO IMPLEMENT? [Yes — run blueprint agent / No — gaps noted above]
═══════════════════════════════════════
```

Only after this plan is output and confirmed by the user should the blueprint agent begin implementation planning.
