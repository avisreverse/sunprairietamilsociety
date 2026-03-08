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
| Sentry integration | Nothing yet | Wire NEXT_PUBLIC_SENTRY_DSN — needs DSN from user | Awaiting user DSN |

<!-- RESOLVED Session 18: Thirukkural CORS verified (client-side, GitHub *), Events detail page (existed), Playwright E2E setup done, Migration 007 run by user, DEF-008 RSVP built, DEF-009 Other category added -->
<!-- Mobile responsiveness audit COMPLETE — Session 16. All pages verified at 390px. -->
<!-- REQ-202603-011 DONE — Session 18. All criteria met. -->

---

## Deferred Defects (Needs Priority Decision)

None — all defects resolved.
<!-- DEF-008 FIXED Session 18 — RSVP page built -->
<!-- DEF-009 FIXED Session 18 — Other category added -->
<!-- DEF-003 FIXED Session 16 — board grid mobile 2-col overflow resolved -->

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
