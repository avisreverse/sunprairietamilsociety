# /req — Requirement Intake + Full Impact Analysis

Use this command when the user describes a new feature or change. Do NOT skip any section.

## Step 1: Gather information (ask all at once — one batch)

Ask:
1. **What** — one sentence description
2. **Who** — Public visitor / Member / Admin / Board member
3. **Why** — problem it solves, user benefit
4. **Priority** — P0 / P1 / P2 / P3
5. **Phase** — 1 (Foundation) / 2 (Community) / 3 (Sub-apps) / 4 (Growth)
6. **Acceptance criteria** — 3–5 specific, testable statements
7. **Mobile** — any special mobile behavior?
8. **Tamil/English** — Tamil text needed anywhere?

## Step 2: Impact Analysis (run internally, surface findings)

### 2A — System Impact
- Which existing pages/components does this touch?
- Which API routes are affected or need to be created?
- Which database tables are affected?
- Which RLS policies need updating?

### 2B — Regression Risk
For each item touched, assess: what existing behavior could break?
Rate overall regression risk: LOW / MEDIUM / HIGH
If HIGH — list the specific risks and mitigation plan before proceeding.

### 2C — Future Growth / Scalability Check
- Does this design scale to 10x users without a rewrite?
- Is this SaaS-ready? (multi-tenant safe, no hardcoded org IDs)
- Does this create technical debt that blocks future phases?
- Does this conflict with any planned Phase 3/4 features in PRODUCT_BACKLOG.md?

### 2D — Security + Privacy Pre-check
- Does this handle user data? (PII, student data, emails)
- Does this require a new auth role or permission scope?
- Is there any XSS / injection surface in the input?

### 2E — Dependency Check
- Does this require another REQ-### to be done first?
- Does completing this unblock other requirements?
- Does this conflict with any D-NNN decision?

## Step 3: Create REQ entry

Auto-increment ID from last entry in docs/REQUIREMENTS.md.

Add to:
- docs/REQUIREMENTS.md — full template entry + active requirements table
- docs/PRODUCT_BACKLOG.md — correct phase and priority row

## Step 4: Output

```
NEW REQUIREMENT: REQ-YYYYMM-NNN
═══════════════════════════════════════
Title: [title]
Priority: P[N] | Phase: [N] | Status: backlog

Acceptance Criteria:
  1. [criterion]
  2. [criterion]
  3. [criterion]

Impact Analysis:
  System touch points: [list]
  Regression risk: [LOW/MEDIUM/HIGH]
  Regression concerns: [list or "none"]
  Scalability: [PASS / CONCERN: description]
  Technical debt risk: [LOW/MEDIUM/HIGH]
  Security surface: [list or "none"]

Dependencies:
  Requires: [REQ-### or "none"]
  Blocks: [REQ-### or "none"]
  Conflicts: [D-NNN or "none"]

Docs updated:
  docs/REQUIREMENTS.md ✅
  docs/PRODUCT_BACKLOG.md ✅

Next step: Run /testplan REQ-YYYYMM-NNN before implementation begins.
═══════════════════════════════════════
```
