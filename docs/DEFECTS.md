# Defects Tracker — SPTS

All bugs and defects tracked here with `DEF-YYYYMM-NNN` IDs.

## Status Legend
- 🔴 `open` — Not yet fixed
- 🟡 `in_progress` — Being investigated or fixed
- 🟢 `fixed` — Fixed and verified
- ⚪ `won't fix` — Accepted as-is, documented reason
- 🔵 `duplicate` — Duplicate of another defect

## Severity Legend
- P0: Critical — data loss, security breach, system down
- P1: High — core feature broken, no workaround
- P2: Medium — feature degraded, workaround exists
- P3: Low — cosmetic, minor inconvenience

---

## Open Defects

| ID | Severity | Status | Title | Linked REQ | Found In |
|----|----------|--------|-------|-----------|---------|
| — | — | — | No open defects | — | — |

---

## Defect Template

```markdown
## DEF-YYYYMM-NNN: [Title]
**Severity:** P0 / P1 / P2 / P3
**Status:** open | in_progress | fixed | won't fix | duplicate
**Created:** YYYY-MM-DD
**Fixed:** YYYY-MM-DD (when resolved)
**Linked Requirement:** REQ-YYYYMM-NNN
**Found In:** [Session N / version / environment]

### Description
[What is happening]

### Expected Behavior
[What should happen]

### Steps to Reproduce
1. [Step]
2. [Step]
3. [Result]

### Root Cause
[Once investigated]

### Fix Applied
[Description of fix, files changed]

### Regression Tests Added
- TC-DEF-YYYYMM-NNN: [test case that would catch this again]

### Notes
[Anything else relevant — spts-clean had a similar bug? zenith pattern avoids this?]
```

---

## Fixed Defects

## DEF-202603-001: onMouseEnter/onMouseLeave in Server Component
**Severity:** P0
**Status:** fixed
**Created:** 2026-03-01
**Fixed:** 2026-03-01
**Linked Requirement:** REQ-202603-001
**Found In:** Session 3

### Description
MullaiPrograms.tsx used `onMouseEnter`/`onMouseLeave` React event handlers without the `"use client"` directive. Event handlers cannot be serialized in Server Components — causes a 500 error at runtime.

### Expected Behavior
Page renders cleanly at `/en` with no 500 error.

### Root Cause
Missing `"use client"` directive in MullaiPrograms.tsx. Event handlers (onMouseEnter, onMouseLeave) are client-side only and cannot exist in a Server Component.

### Fix Applied
Added `"use client"` at top of `src/components/sections/MullaiPrograms.tsx`. Consistent with Nav.tsx which already had this directive.

### Regression Tests Added
- TC-DEF-202603-001: E2E test — load `/en`, assert page renders with HTTP 200, assert all 5 sections visible

### Notes
Nav.tsx already had `"use client"` so it was unaffected. Only MullaiPrograms.tsx was missing it.

---

## Known Patterns to Avoid (From spts-clean Lessons)

### Timezone Bug (spts-clean DEF-202510-001)
**Pattern:** `new Date("2025-10-03")` treats date as UTC midnight → shifts to wrong day in CST.
**Prevention:** Always use:
```typescript
// For display only (no formatting needed)
const dateStr = eventDate.split('T')[0]  // "2025-10-03"

// For formatted display (needs Date object)
const date = new Date(eventDate + 'T12:00:00')  // Force midday, avoid timezone shift
```

### Unsaved State on Mount (spts-clean DEF-202510-002)
**Pattern:** `useEffect` watching form data fires on initial mount, marking form "unsaved" before user touches it.
**Prevention:** Use a `isInitialMount` ref/state guard to skip the first render:
```typescript
const isInitialMount = useRef(true)
useEffect(() => {
  if (isInitialMount.current) { isInitialMount.current = false; return }
  // track changes here
}, [formData])
```

### Custom Auth Complexity (spts-clean pattern)
**Pattern:** Custom auth with sessionStorage/localStorage creates race conditions and security gaps.
**Prevention:** Use Supabase Auth from day 1 (D-005).
