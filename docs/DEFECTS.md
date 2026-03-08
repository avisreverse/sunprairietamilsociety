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
| DEF-202603-003 | P3 | open | Board grid tile alignment — orphaned last card on /board page | REQ-202603-006 | Session 10 |
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
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-006
**Found In:** Session 10

### Description
The admin board members form (Add/Edit) had no photo upload input. Board member headshots could not be uploaded to Supabase Storage from the admin portal.

### Fix Applied
Added `uploadPhoto()` function to admin board page. File input uploads to `board/{slug}.{ext}` in the Supabase Storage `media` bucket. Public URL is saved to `form.photo_url`. UI shows thumbnail preview or initials fallback, uploading spinner, and remove button.

### Regression Tests Added
- TC-DEF-202603-004: Edit a board member, upload a photo → verify thumbnail appears, form saves with photo_url.

---

## DEF-202603-005: Admin Programs — No Add New Program Form
**Severity:** P2
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-002
**Found In:** Session 10

### Description
The admin programs page only allowed editing existing seeded programs. No UI existed to add a new program.

### Fix Applied
Added `ADD_EMPTY` constant, `showAddForm` / `addForm` / `adding` / `addError` states, `setA()` helper, and `addProgram()` async function to `src/app/[locale]/admin/programs/page.tsx`. Header now shows "+ Add Program" button that opens a full form (slug, name_en, name_ta, description, color, display_order, featured, is_active).

### Regression Tests Added
- TC-DEF-202603-005: Click "+ Add Program" → fill slug + name → save → verify new program appears in list.

---

## DEF-202603-006: Admin Achievements — No Photo Upload Field
**Severity:** P2
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-005
**Found In:** Session 10

### Description
The admin achievements edit form had no photo upload. Achievement photos could not be uploaded to Supabase Storage.

### Fix Applied
Added `uploadPhoto()` function to admin achievements page. Uploads to `achievements/{id or timestamp}.{ext}`. Photo URL saved to form state and to the `achievements` table via PATCH. Matches board member upload pattern exactly.

### Regression Tests Added
- TC-DEF-202603-006: Edit an achievement, upload a photo → verify thumbnail appears, form saves with photo_url.

---

## DEF-202603-007: Public Featured Event Card Not Clickable
**Severity:** P2
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-001
**Found In:** Session 10

### Description
On the public landing page (MarutamEvents section), the featured (large) event card was not wrapped in a link and could not be clicked.

### Fix Applied
Added `useRouter` import to `MarutamEvents.tsx`. Featured card `motion.div` gets `onClick={() => router.push("/events")}` and `cursor: "pointer"`. RSVP `<a>` button gets `onClick={(e) => e.stopPropagation()}` to prevent card click from firing when RSVP is tapped.

### Regression Tests Added
- TC-DEF-202603-007: Click featured event card on landing page → verify navigates to /en/events.

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

## DEF-202603-010: Programs Bento Grid Hardcoded for 5 Items
**Severity:** P2
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-002
**Found In:** Session 11

### Description
MullaiPrograms.tsx bento grid layout was hardcoded for exactly 5 programs. A 6th program broke the visual layout.

### Fix Applied
Refactored to a 2-column outer grid (`1fr 2fr`): featured card fills the left column at full height; all remaining cards go into a 2-column sub-grid (`1fr 1fr`, `alignContent: start`) on the right. Any number of programs now renders cleanly.

### Regression Tests Added
- TC-DEF-202603-010: Add a 6th program in admin → verify programs section grid adapts (no overflow/orphan).

---

## DEF-202603-011: "Five Ways to Belong" Heading Hardcoded
**Severity:** P3
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-002
**Found In:** Session 11

### Description
The programs section heading "Five ways to belong" was hardcoded and did not reflect the actual program count.

### Fix Applied
Heading changed to dynamic: `{programs.length} way{programs.length !== 1 ? "s" : ""} to belong` in `MullaiPrograms.tsx`.

### Regression Tests Added
- TC-DEF-202603-011: Change program count in DB → verify heading updates correctly.

---

## DEF-202603-012: Admin Allows Multiple Featured Events — Public Shows Only First
**Severity:** P2
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-001
**Found In:** Session 11

### Description
Admin could mark multiple events as featured simultaneously. Public landing page only showed the first.

### Fix Applied
In `src/app/api/admin/events/[id]/route.ts` PATCH handler: when `body.featured === true`, first set `featured = false` on all other events (`neq("id", id)`), then update the target event. Ensures exactly one featured event at all times.

### Regression Tests Added
- TC-DEF-202603-012: Feature event A, then feature event B → verify event A is no longer featured in admin list.

---

## DEF-202603-013: /en/events Listing Page Uses Hardcoded 2025 Data
**Severity:** P1
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-001
**Found In:** Session 11

### Description
`/en/events` had a hardcoded EVENTS array with 2025 data. Admin-added events did not appear.

### Fix Applied
Fully rewrote `src/app/[locale]/events/page.tsx` as a Server Component with Supabase fetch. Added `parseDateDisplay()` using `T12:00:00` timezone fix. Orders by date ascending, handles empty state gracefully.

### Regression Tests Added
- TC-DEF-202603-013: Add a new event in admin → verify it appears on /en/events.

---

## DEF-202603-014: Achievement Detail Pages Use Hardcoded Array — DB UUID → 404
**Severity:** P1
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-005
**Found In:** Session 11

### Description
`/achievements/[id]/page.tsx` used a hardcoded integer-indexed array. DB UUIDs resolved to `array[NaN]` → 404.

### Root Cause
Page was built before DB wire-up. Used hardcoded array indexed by number.

### Fix Applied
Fully rewrote as a Server Component fetching by UUID: `.eq("id", id).eq("is_approved", true).eq("is_published", true).single()`. Calls `notFound()` if not found or not published. Shows `<img>` if photo_url exists, else initials avatar.

### Regression Tests Added
- TC-DEF-202603-014: Click an achievement card on landing page → verify detail page loads with correct data.

---

## DEF-202603-015: Photo Upload Fails — Supabase Storage Media Bucket Not Created
**Severity:** P1
**Status:** fixed
**Created:** 2026-03-08
**Fixed:** 2026-03-08
**Linked Requirement:** REQ-202603-005
**Found In:** Session 11

### Description
Photo upload failed because the Supabase Storage `media` bucket had not been created.

### Fix Applied
Migration `database/migrations/002_create_media_storage.up.sql` created + user ran it in Supabase SQL editor. Bucket `media` now exists with public read, 5MB limit, JPEG/PNG/WebP only.

### Regression Tests Added
- TC-DEF-202603-015: Upload a photo in admin board edit form → verify image appears, photo_url saved to DB.

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
