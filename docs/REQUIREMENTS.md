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
| REQ-202603-001 | P1 | in_progress | Landing page — Design D Warm Cultural | All sections + all inner pages live. Individual achievement detail pages (/achievements/[id]) and board member pages (/board/[slug]). Page transitions smooth. Admin page at /admin. User actively reviewing. |
| REQ-202603-002 | P1 | in_progress | Programs section — bento grid, 5+ programs, individual pages | Bento grid live. All 5 /programs/[slug] detail pages live. /programs listing fixed (was crashing — missing "use client"). |
| REQ-202603-003 | P1 | in_progress | Thirukkural rotation — standalone section | Live with full 133-chapter lookup. Book + chapter name watermarks working. 3-line wrapping bug fixed. CORS on Vercel still needs real-world verification. |
| REQ-202603-004 | P1 | backlog | Admin CMS — full landing page customizable | Placeholder at /admin. Supabase tables + admin portal needed. Photo uploads to Supabase Storage (admin-only). Board headshots currently initials until admin CMS ships. |
| REQ-202603-005 | P2 | in_progress | Achievement submit + detail pages | /achievements/submit has functional local photo preview. /achievements/[id] detail pages live. Supabase Storage integration pending REQ-202603-004. |
| REQ-202603-006 | P2 | in_progress | Board management — individual pages + admin headshots | /board grid page + /board/[slug] individual pages live. Headshot upload removed from public page — admin-only via CMS. |

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
