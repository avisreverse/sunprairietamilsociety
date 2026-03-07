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
| PL-001 | Visual feedback on Design D | User to review live site at sunprairietamilsociety.vercel.app/en after session 8 deploy | User feedback on fonts, colors, sections, Thirukkural display | 2026-03-07 |
| PL-002 | Real content from user | Photos, board member names/bios, real event dates, real org stats | User to supply | 2026-03-07 |
| PL-003 | Admin CMS priority | REQ-202603-004 is backlog — when to start? Needs Supabase schema design | User to confirm priority | 2026-03-07 |

---

## Work In Progress (Interrupted)

| Feature/REQ | What was done | What remains | Status |
|-------------|--------------|--------------|--------|
| REQ-202603-003 Thirukkural | Component live with fallback | Verify GitHub raw fetch works on Vercel (CORS) — test from live URL in incognito | Needs verification |
| Mobile responsiveness | Not yet audited | Test all pages at 375px (iPhone SE), 768px (tablet) | Deferred until visual feedback done |

---

## Deferred Defects (Needs Priority Decision)

| DEF-### | Title | Severity | Why deferred | Added |
|---------|-------|----------|-------------|-------|
| — | — | — | — | — |

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
