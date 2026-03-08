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
| REQ-202603-001 | P1 | in_progress | Landing page — Design D Warm Cultural | All sections DB-driven. Individual detail pages live. 7 UX defects (DEF-202603-003 through 009) to fix next session. |
| REQ-202603-002 | P1 | in_progress | Programs section — bento grid, 5+ programs, individual pages | Bento grid DB-driven. All 5 /programs/[slug] detail pages live. Admin edit works. Add New Program form missing (DEF-202603-005). |
| REQ-202603-003 | P1 | in_progress | Thirukkural rotation — standalone section | Live with full 133-chapter lookup. CORS on Vercel needs real-world verification. |
| REQ-202603-004 | P1 | in_progress | Admin CMS — full landing page customizable | Admin portal live: login, dashboard, events, achievements, board, programs. Auth working (Bearer token). Photo uploads + Add Program form pending next session. |
| REQ-202603-005 | P2 | in_progress | Achievement submit + detail pages | /achievements/submit has local photo preview. /achievements/[id] detail pages use hardcoded data — needs DB wire-up. Photo upload to Supabase Storage pending. |
| REQ-202603-006 | P2 | in_progress | Board management — individual pages + admin headshots | /board grid + /board/[slug] live. Admin board edit works. Photo upload field missing (DEF-202603-004). |
| REQ-202603-007 | P2 | backlog | RSVP page — per-event RSVP form + tracking | Not started. rsvp_responses table exists in DB. Admin can set rsvp_url per event. Public RSVP form at /events/[id]/rsvp or external link needed. (DEF-202603-008) |

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
