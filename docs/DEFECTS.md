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
| DEF-202603-003 | P3 | open | Board grid tile alignment — orphaned last card | REQ-202603-006 | Session 10 |
| DEF-202603-004 | P2 | open | Admin board members — no photo upload field | REQ-202603-006 | Session 10 |
| DEF-202603-005 | P2 | open | Admin programs — no Add New Program form | REQ-202603-002 | Session 10 |
| DEF-202603-006 | P2 | open | Admin achievements — no photo upload field | REQ-202603-005 | Session 10 |
| DEF-202603-007 | P2 | open | Public featured event card not clickable | REQ-202603-001 | Session 10 |
| DEF-202603-008 | P2 | open | RSVP page not built — DB table exists, no public form | REQ-202603-007 | Session 10 |
| DEF-202603-009 | P3 | open | Achievement category — no option to add custom categories | REQ-202603-005 | Session 10 |

---

## DEF-202603-003: Board Grid Tile Alignment — Orphaned Last Card
**Severity:** P3
**Status:** open
**Created:** 2026-03-08
**Linked Requirement:** REQ-202603-006
**Found In:** Session 10

### Description
With 7 board member cards in the grid, the last card is orphaned (left-aligned alone on the final row). The layout does not center or fill the pattern when the count doesn't divide evenly.

### Expected Behavior
Board cards should follow a centered or intentional pattern (e.g., last row centered, or dynamic column count that avoids orphaned cards).

### Steps to Reproduce
1. Go to `/en/board`
2. Observe the 7 cards — 6 fill two rows of 3, the 7th sits alone left-aligned on row 3.

---

## DEF-202603-004: Admin Board Members — No Photo Upload Field
**Severity:** P2
**Status:** open
**Created:** 2026-03-08
**Linked Requirement:** REQ-202603-006
**Found In:** Session 10

### Description
The admin board members form (Add/Edit) has no photo upload input. Board member headshots cannot be uploaded to Supabase Storage from the admin portal.

### Expected Behavior
Admin form should include a photo upload field that stores the image in Supabase Storage and saves the URL to the `board_members` table.

---

## DEF-202603-005: Admin Programs — No Add New Program Form
**Severity:** P2
**Status:** open
**Created:** 2026-03-08
**Linked Requirement:** REQ-202603-002
**Found In:** Session 10

### Description
The admin programs page only allows editing existing seeded programs. There is no UI to add a new program (the page text says "add new ones via the form below" but no such form exists).

### Expected Behavior
An "Add New Program" button and form should appear on the admin programs page, allowing creation of new programs with slug, name_en, name_ta, description, color, display_order, featured, and is_active fields.

---

## DEF-202603-006: Admin Achievements — No Photo Upload Field
**Severity:** P2
**Status:** open
**Created:** 2026-03-08
**Linked Requirement:** REQ-202603-005
**Found In:** Session 10

### Description
The achievement submit form (`/achievements/submit`) has a local photo preview (client-side only) but no Supabase Storage upload. Submitted achievements have no photo stored.

### Expected Behavior
Photo selection should upload to Supabase Storage and store the URL in the `achievements` table. Admin achievement edit should also support photo upload.

---

## DEF-202603-007: Public Featured Event Card Not Clickable
**Severity:** P2
**Status:** open
**Created:** 2026-03-08
**Linked Requirement:** REQ-202603-001
**Found In:** Session 10

### Description
On the public landing page (MarutamEvents section), the featured (large) event card is not wrapped in a link and cannot be clicked. Clicking on it does nothing.

### Expected Behavior
Featured event card should navigate to the individual event detail page (`/events/[slug]`) when clicked.

---

## DEF-202603-008: RSVP Page Not Built
**Severity:** P2
**Status:** open
**Created:** 2026-03-08
**Linked Requirement:** REQ-202603-007
**Found In:** Session 10

### Description
The `rsvp_responses` DB table exists and admin can set `rsvp_url` per event, but there is no public RSVP form page. Users cannot RSVP to events through the site.

### Expected Behavior
A public RSVP form at `/events/[id]/rsvp` or triggered by a button on event detail pages, allowing users to submit their name, email, and headcount. Responses stored in `rsvp_responses` table.

---

## DEF-202603-009: Achievement Category — No Option to Add Custom Categories
**Severity:** P3
**Status:** open
**Created:** 2026-03-08
**Linked Requirement:** REQ-202603-005
**Found In:** Session 10

### Description
Achievement categories are a hardcoded list in the submit form. There is no admin UI to add new categories.

### Expected Behavior
Admin CMS should include a category management section, or the achievement submit form should allow free-form category input.

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

## DEF-202603-011: Admin Cookie Auth Failure — API Routes Returning 401
**Severity:** P1
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-004
**Found In:** Session 10

### Description
Admin client pages (`fetch()` to `/api/admin/*`) silently received 401 responses. Admin pages showed empty content with no error. Supabase session cookies were not being forwarded correctly from client component `fetch()` calls to server-side API route handlers.

### Root Cause
`createServerClient` in API routes reads cookies from the incoming HTTP request. Client-side `fetch()` does send cookies for same-origin requests, but the session validation was failing due to token expiry or cookie parsing issues in serverless functions.

### Fix Applied
1. Created `src/lib/fetchAdmin.ts` — reads Supabase session token client-side and injects it as `Authorization: Bearer <token>` header on every admin API call.
2. Created `src/lib/adminAuth.ts` — `verifyAdminAuth(request)` checks Bearer header first (token-based), falls back to cookie session. Uses service-role admin client to verify token validity.
3. Updated all 9 admin API routes + all 5 admin client pages to use the new pattern.

### Regression Tests Added
- TC-DEF-202603-011: Log in as admin, navigate to all admin pages — verify each shows data (not blank).

---

## DEF-202603-010: next-intl Middleware Rewrote /api/* Routes Causing 404
**Severity:** P1
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-004
**Found In:** Session 10

### Description
All admin API routes (`/api/admin/*`) returned 404 after the Bearer token fix was applied. Pages showed "HTTP 404" error.

### Root Cause
`proxy.ts` runs `handleI18nRouting(request)` for all matched paths. next-intl v4 rewrites `/api/admin/programs` → `/en/api/admin/programs`, which does not exist in the App Router file structure. This caused every API call to return 404.

### Fix Applied
Added an early return in `src/proxy.ts` before the i18n routing call:
```typescript
if (pathname.startsWith("/api/")) {
  return NextResponse.next();
}
```
API routes are locale-agnostic and must bypass next-intl rewriting entirely.

### Regression Tests Added
- TC-DEF-202603-010: Call `GET /api/admin/programs` with valid Bearer token — verify 200 + JSON array response (not 404 HTML).

### Notes
This is a common gotcha with next-intl in App Router. The matcher in `proxy.ts` should ideally exclude `/api/*`, but adding an explicit early-return is more explicit and self-documenting.

---

## DEF-202603-002: Page transition flash with AnimatePresence in App Router shared layout
**Severity:** P2
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-001
**Found In:** Session 9

### Description
Using `AnimatePresence mode="wait"` in the locale layout caused a visible flash on navigation. Content snapped from top instead of transitioning smoothly.

### Root Cause
In Next.js App Router, the shared layout (`[locale]/layout.tsx`) does **not** unmount/remount on navigation — React reconciles the tree in-place. `AnimatePresence` relies on unmount to trigger exit animations, so `mode="wait"` stalled without a clean exit, causing a flash before the enter animation ran.

### Fix Applied
Replaced `AnimatePresence` wrapper with a plain `motion.div` keyed by `usePathname()`. When pathname changes, React treats it as a new element and plays the enter animation (`opacity: 0→1`, `y: 18→0`, 0.38s). No exit animation needed — the old content disappears instantly, new content fades in smoothly.

### Regression Tests Added
- TC-DEF-202603-002: Navigate between 3+ pages and verify no flash or snap-to-top behavior

---

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
