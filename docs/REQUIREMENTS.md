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
| REQ-202603-001 | P1 | in_progress | Landing page — Design D Warm Cultural | Design D all sections live. Fonts fixed (Space Grotesk + Outfit). All broken links fixed. Inner pages: /events, /board, /join, /achievements/submit. Awaiting user visual feedback. |
| REQ-202603-002 | P1 | in_progress | Programs section — bento grid, 5+ programs, individual pages | Bento grid with floating cards live. All 5 /programs/[slug] detail pages live. RSVP made optional via rsvpUrl field. |
| REQ-202603-003 | P1 | in_progress | Thirukkural rotation — standalone section | ThirukkuralSection live on landing page. Font fix ensures Tamil text renders. Fallback to 4 kurals if GitHub fetch fails. Needs real-world CORS verification. |
| REQ-202603-004 | P1 | backlog | Admin CMS — full landing page customizable | Supabase tables: programs, events, achievements, board, hero. Admin portal at /admin/*. Photo uploads to Supabase Storage. Role-based access. All current pages use static data as placeholders. |
| REQ-202603-005 | P2 | backlog | Achievement submit — form + photo upload | /achievements/submit page created (form stub). Needs Supabase Storage integration for photo upload + email notification to board. Depends on REQ-202603-004. |
| REQ-202603-006 | P2 | backlog | Board management — dedicated page + admin edit | /board page created (static bios). Needs admin edit capability via CMS. Depends on REQ-202603-004. |

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
