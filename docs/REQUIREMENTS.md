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
| REQ-202603-001 | P1 | in_progress | Landing page — Design D Warm Cultural | All sections DB-driven. PalaiBoard shows headshot photos. 3 open defects (DEF-003, 008, 009). Awaiting user visual feedback. |
| REQ-202603-002 | P1 | in_progress | Programs section — bento grid, 5+ programs, individual pages | /programs DB-driven Server Component. /programs/[slug] DB-driven with tagline/details/schedule/contact. Admin form has all fields. Add Program form live (DEF-005 fixed). Migration 003 must run in Supabase to populate new fields. |
| REQ-202603-003 | P1 | in_progress | Thirukkural rotation — standalone section | Live with full 133-chapter lookup. CORS on Vercel needs real-world verification. |
| REQ-202603-004 | P1 | in_progress | Admin CMS — full landing page customizable | Admin portal fully operational: events (CRUD + featured auto-unfeature), achievements, board (photo upload + Tamil role + responsibilities + since year), programs (all detail fields). Every public page field is now admin-editable. Migration 003 must be run in Supabase. |
| REQ-202603-005 | P2 | in_progress | Achievement submit + detail pages | /achievements/submit has local photo preview. /achievements/[id] detail pages still use hardcoded data — DB wire-up deferred. Photo upload to Supabase Storage pending. |
| REQ-202603-006 | P2 | in_progress | Board management — individual pages + admin headshots | /board and /board/[slug] fully DB-driven Server Components. Admin photo upload working (DEF-004 fixed). Photos display on /board, /board/[slug], homepage PalaiBoard. Tamil role, responsibilities, since year all admin-editable (DEF-016 closed). |
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
