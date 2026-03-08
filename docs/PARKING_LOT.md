# Parking Lot — Items Awaiting Decision or Continuation

Items land here when:
- Work is interrupted mid-feature (topic changed)
- A decision from the user is needed before proceeding
- A question was asked but not yet answered and acted on
- A defect was found but needs user priority decision
- Analysis was done but implementation not started

**Clear this list at every /start and /wrap.**

---

## Awaiting User Decision

| ID | Item | Context | Waiting for | Added |
|----|------|---------|------------|-------|
| PL-002 | Real content from user | Photos (event, board headshots), real board names/bios, real event dates, real org stats | User to supply when ready | 2026-03-07 |
| PL-004 | Admin auth — share spts-clean Supabase (D-017) | Decision made: Option A — point community site to spts-clean's Supabase project. Add `community_admin` role to existing school admins' `user_roles`. Reuse spts-clean auth pattern (email+password, requireAdminAuth). Implement AFTER rest of site is complete. | Implement when site is feature-complete | 2026-03-09 |
<!-- PL-007 resolved: Migration 004 confirmed run 2026-03-09 -->
<!-- PL-008 resolved: Migration 005 confirmed run 2026-03-09 -->

---

## Work In Progress (Interrupted)

| Feature/REQ | What was done | What remains | Status |
|-------------|--------------|--------------|--------|
| REQ-202603-003 Thirukkural | Full chapter lookup, watermarks, 3-line fix | Verify GitHub raw fetch works on Vercel (CORS) — test from live URL in incognito | Needs verification |
| Events detail pages | /events listing exists + DB-driven | Create /events/[id] individual event pages | Not started |
| Playwright E2E testing | User requested automated testing to replace manual testing | Set up Playwright test suite for all user flows (programs, events, achievements, board, admin) | Next session priority |
<!-- Mobile responsiveness audit COMPLETE — Session 16. All pages verified at 390px. -->

---

## Deferred Defects (Needs Priority Decision)

| DEF-### | Title | Severity | Why deferred | Added |
|---------|-------|----------|-------------|-------|
| DEF-202603-008 | RSVP page not built | P2 | REQ-202603-007 in backlog; deferred | 2026-03-08 |
<!-- DEF-202603-003 FIXED Session 16 — board grid mobile 2-col overflow resolved -->
| DEF-202603-009 | Achievement category — no add custom categories | P3 | Low priority; deferred | 2026-03-08 |
<!-- DEF-006 and DEF-007 removed — both fixed in Session 12 -->

---

## Analysis / Q&A Decisions to Document

| Topic | Decision made | Should become D-NNN? | Added |
|-------|--------------|---------------------|-------|
| — | All decisions from this session already documented as D-015 and D-016 | — | — |

---

## How to use this file

**When topic changes mid-work:**
Add the in-progress item to "Work In Progress" table with what was done and what remains.
At next /start, this will be surfaced as a pending item.

**When a decision is needed:**
Add to "Awaiting User Decision" table.
Claude will ask about it at the next /start.

**When analysis produces a decision:**
Add to "Analysis / Q&A Decisions to Document" table.
At /wrap, any items here get converted to D-NNN entries in DECISIONS.md.
