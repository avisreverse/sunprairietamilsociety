# Requirements Tracker — SPTS

All requirements tracked here with `REQ-YYYYMM-NNN` IDs.

## Status Legend
- 🔵 `backlog` — Not yet started, in queue
- 🟡 `in_progress` — Currently being implemented
- 🟢 `done` — Implemented and verified
- 🔴 `blocked` — Cannot proceed, blocker noted
- ⚪ `deferred` — Intentionally pushed to later phase

## Priority Legend
- P0: Blocker — system cannot function without this
- P1: High — core feature, needed for launch
- P2: Medium — important but not launch-blocking
- P3: Low — nice to have, can defer

---

## Active Requirements

| ID | Priority | Status | Title | Notes |
|----|----------|--------|-------|-------|
| REQ-202603-001 | P1 | in_progress | Landing page — Sangam Scroll design | Visual complete: 6 sections, 5 poem transitions, landscape watermarks, Tamil spelling locked. Backend/auth/real-photos pending. |

---

## Requirement Template

```markdown
## REQ-YYYYMM-NNN: [Title]
**Priority:** P0 / P1 / P2 / P3
**Status:** backlog | in_progress | done | blocked | deferred
**Created:** YYYY-MM-DD
**Updated:** YYYY-MM-DD

### Description
[What the feature does and why it's needed]

### Acceptance Criteria
- [ ] [Specific, testable criterion]
- [ ] [Specific, testable criterion]

### Design Considerations
- Mobile: [mobile-specific notes]
- Tamil/English: [i18n notes]
- Accessibility: [a11y notes]

### Security/Privacy Considerations
[Any auth, data, or privacy concerns]

### Dependencies
- Requires: REQ-YYYYMM-NNN [description]
- Blocks: REQ-YYYYMM-NNN [description]

### Decisions
- D-NNN: [decision that applies to this requirement]

### Defects
- DEF-YYYYMM-NNN: [defect found during implementation]

### Test Cases
- TC-REQ-YYYYMM-NNN: [test case description]
```

---

## Completed Requirements

None yet.
