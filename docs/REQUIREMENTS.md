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
| REQ-202603-003 | P1 | done | Thirukkural rotation — standalone section | Live with full 133-chapter lookup. CORS verified Session 18 — GitHub raw serves Access-Control-Allow-Origin: *. Fallback confirmed. |
| REQ-202603-004 | P1 | in_progress | Admin CMS — full landing page customizable | Admin portal fully operational. Announcements admin added (/admin/announcements). All content fields editable. |
| REQ-202603-005 | P2 | in_progress | Achievement submit + detail pages | Submit form wired to POST /api/achievements/submit (Session 18). DEF-202603-009 fixed (Other category). Photo upload to Supabase on submit pending. |
| REQ-202603-006 | P2 | in_progress | Board management — individual pages + admin headshots | /board and /board/[slug] fully DB-driven. Photos on all 3 surfaces. Tamil role/responsibilities/since admin-editable. |
| REQ-202603-007 | P2 | in_progress | RSVP page — per-event RSVP form + tracking | Built Session 18. /events/[id]/rsvp + POST /api/rsvp/[eventId]. DEF-202603-008 fixed. Pending user verification. |
| REQ-202603-008 | P2 | in_progress | Program website URL — optional admin-controlled external link | Migration 004 run (confirmed). Admin form has URL + visibility checkbox. /programs/[slug] shows "Visit website →" in sidebar when visible=true. Verified live. |
| REQ-202603-009 | P2 | in_progress | External announcement board — ticker + detail pages | Migration 005 run (confirmed). /admin/announcements CRUD with poster upload, expiry, publish toggle. AnnouncementTicker inside Nav. /announcements/[id] detail page. Verified end-to-end by user. |
| REQ-202603-010 | P2 | in_progress | Home page admin editing — hero story, year, tagline, subtext | Migration 006 run (confirmed). /admin/home page with 4 editable fields. site_settings table. heroContent wired in page.tsx. Year propagates to hero (×3 instances) + footer. programCount always live from DB. |
| REQ-202603-011 | P2 | done | Section visibility toggles — admin can hide Events/Achievements homepage sections | All criteria met. Migration 007 run. E2E spec written. Closed Session 18. |

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

## REQ-202603-011: Section Visibility Toggles
**Priority:** P2
**Status:** done
**Created:** 2026-03-09
**Updated:** 2026-03-09

### Description
Admin can hide the Achievements section and Events section on the homepage when there is no content to show. Controlled by two boolean flags stored in `site_settings` (same table used by REQ-202603-010). Toggles live inside the relevant admin section pages. Achievement submit form (`/achievements/submit`) is always accessible regardless of toggle state.

### Acceptance Criteria
- [x] `events_section_enabled` flag in site_settings defaults to `"true"` — Events section shows by default
- [x] `achievements_section_enabled` flag in site_settings defaults to `"true"` — Achievements section shows by default
- [x] Admin can toggle each flag in the respective admin section header (on/off checkbox)
- [x] When a section is disabled, it does not render on the homepage — no gap, no placeholder
- [x] `/achievements/submit` page remains accessible regardless of the achievements toggle
- [x] Playwright E2E test validates toggle off/on cycle end-to-end (tests/e2e/specs/admin-toggles.spec.ts — runs when TEST_ADMIN_EMAIL/PASSWORD env vars set)

### Design Considerations
- Mobile: toggle is a standard checkbox — no mobile-specific behavior needed
- Tamil/English: no Tamil text needed for admin UI
- Accessibility: checkbox must have a visible label

### Security/Privacy Considerations
- Write is admin-only (existing `site_settings_admin_write` RLS policy covers this)
- Read is public (existing `site_settings_public_read` RLS policy covers this — homepage needs it)

### Dependencies
- Requires: REQ-202603-010 (site_settings table + API already exist)
- Blocks: none
- Conflicts: none

### Decisions
- D-004: Supabase — site_settings already uses key-value store pattern; boolean stored as string "true"/"false"

### Test Cases
- TC-REQ-202603-011-a: Disable events section in admin → reload homepage → verify events section not rendered
- TC-REQ-202603-011-b: Re-enable events section → reload homepage → verify events section renders
- TC-REQ-202603-011-c: Disable achievements section → verify NeytalAchievements not rendered on homepage
- TC-REQ-202603-011-d: Disable achievements → navigate to /achievements/submit → verify form still accessible (200)
- TC-REQ-202603-011-e: Toggle defaults to "on" for both sections on fresh install

---

## Completed Requirements

| ID | Title | Completed |
|----|-------|-----------|
| REQ-202603-003 | Thirukkural rotation — standalone section | 2026-03-09 Session 18 |
| REQ-202603-011 | Section visibility toggles | 2026-03-09 Session 18 |
