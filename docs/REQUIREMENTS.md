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
| REQ-202603-001 | P1 | in_progress | Landing page — Design D Warm Cultural | All sections DB-driven. Achievement photos now show on landing page (DEF-017 fixed). Announcement ticker in Nav. 3 open defects (DEF-003, 008, 009). |
| REQ-202603-002 | P1 | in_progress | Programs section — bento grid, 5+ programs, individual pages | /programs/[slug] now has optional website_url (REQ-202603-008). Migration 004 must run in Supabase. |
| REQ-202603-003 | P1 | in_progress | Thirukkural rotation — standalone section | Live with full 133-chapter lookup. CORS on Vercel needs real-world verification. |
| REQ-202603-004 | P1 | in_progress | Admin CMS — full landing page customizable | Admin portal fully operational. Announcements admin added (/admin/announcements). All content fields editable. |
| REQ-202603-005 | P2 | in_progress | Achievement submit + detail pages | DEF-202603-017 fixed — photo_url now fetched and shown on landing page. /achievements/[id] DB-driven. Submit form functional with local photo preview. |
| REQ-202603-006 | P2 | in_progress | Board management — individual pages + admin headshots | /board and /board/[slug] fully DB-driven. Photos on all 3 surfaces. Tamil role/responsibilities/since admin-editable. |
| REQ-202603-007 | P2 | backlog | RSVP page — per-event RSVP form + tracking | Not started. rsvp_responses table exists. (DEF-202603-008) |
| REQ-202603-008 | P2 | in_progress | Program website URL — optional admin-controlled external link | Migration 004 run (confirmed). Admin form has URL + visibility checkbox. /programs/[slug] shows "Visit website →" in sidebar when visible=true. Verified live. |
| REQ-202603-009 | P2 | in_progress | External announcement board — ticker + detail pages | Migration 005 run (confirmed). /admin/announcements CRUD with poster upload, expiry, publish toggle. AnnouncementTicker inside Nav. /announcements/[id] detail page. Verified end-to-end by user. |

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
