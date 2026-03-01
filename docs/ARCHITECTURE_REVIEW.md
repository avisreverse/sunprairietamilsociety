# Pre-Build Architecture Review — SPTS Society Website
**Date:** 2026-03-01 | **Status:** Finalized

All 7 hats reviewed before a single line of app code is written.

---

## 🏗️ ARCHITECT

### System Architecture
```
Browser
  └── sunprairietamilsociety.com (Vercel, this project)
        ├── Public pages: /, /about, /programs/*, /events, /gallery, /community
        ├── Protected pages: /admin, /community/post (requires login)
        └── API routes: /api/auth, /api/events, /api/gallery, /api/feed, /api/achievements, /api/board, /api/help

Supabase Project (SPTS-Society — SEPARATE from spts-clean)
  ├── Auth (Supabase Auth)
  ├── PostgreSQL DB
  │     ├── board_members
  │     ├── events + event_rsvp
  │     ├── gallery_items (Google Drive URLs + metadata)
  │     ├── achievements
  │     ├── feed_posts + feed_comments + feed_reactions
  │     └── help_requests + help_responses
  └── Storage (small: avatars, achievement photos, board member photos only)

Google Drive (Photo Gallery)
  └── SPTS shared Google Drive folder → linked via Drive API or public share links
      → gallery_items table stores Drive file IDs/URLs
      → Displayed via embedded viewer or direct URL

External Links
  ├── School site: [school domain] (spts-clean)
  ├── Library: [school domain]/library (future)
  └── Pattarai: [school domain]/pattarai (future)
```

### Data Flow
- Public reads: Next.js Server Components → Supabase (no auth) → render
- Authenticated writes: Client → /api/... → Supabase Auth check → RLS enforced write
- Gallery: Admin uploads to Drive → stores URL in Supabase → page fetches from DB
- Admin CMS: Protected /admin/* pages → server-side auth check → UI to manage all content

### Key Architectural Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| D-005 | Supabase Auth separate project | Separate from school, merge with SSO later |
| D-007 | No full i18n system | Strategic Tamil placement only |
| D-014 | Google Drive for gallery | No photo migration cost, uses existing Drive |
| D-015 | Admin CMS as protected pages | No headless CMS needed, keep it simple |
| D-016 | Server Components for public pages | Better SEO, faster initial load |

---

## 🔒 SECURITY

### Auth Model
```
Public visitor     → Can read everything
Logged-in member   → Can post to feed, submit achievements, submit help requests
Admin/Board member → Can manage all content, approve achievements, upload gallery
```

### Threat Surface & Mitigations
| Threat | Mitigation |
|--------|-----------|
| Feed spam / abuse | Login required to post. Supabase rate limiting. |
| Achievement faking | Admin must approve all achievement submissions before public display |
| Unauthorized admin access | Supabase RLS: admin role check on all write operations |
| Gallery unauthorized upload | Only admin role can add gallery items |
| Scraped member data | Board member emails behind contact form, not displayed directly |
| XSS in feed posts | Sanitize user content server-side before storage. Render as text, not HTML. |
| CSRF | Next.js + Supabase auth tokens handle this |
| Student data (Privacy) | No student PII on society site. School data stays on school site. |
| Drive API key exposed | Drive API calls server-side only (API route), never client-side |

### RLS Policies (Supabase)
```sql
-- board_members: public read, admin write
-- events: public read, admin write
-- event_rsvp: member read-own, member write-own, admin read-all
-- gallery_items: public read, admin write
-- achievements: public read, member insert (pending status), admin approve
-- feed_posts: public read, member insert, author/admin delete
-- feed_comments: public read, member insert, author/admin delete
-- help_requests: public read, member insert, member insert response, admin moderate
```

---

## 🎨 UX / UI

### Information Architecture
- **Flat navigation** (max 2 levels) — no deep nesting
- **Mobile hamburger** for < 768px
- **Sticky header** with login button always visible
- **Breadcrumbs** only on deep pages (gallery/event detail)

### User Flows
```
New Tamil Family → Homepage → Programs → School (clicks out to school site)
                                       → Events → RSVP
                                       → Community Feed (must login)

Existing Member → Login → Post to Feed → React to others' posts
                        → Submit Achievement → Admin approves → shows on wall

Board Member → Login → /admin → Manage events, gallery, board members, approvals

Admin → Everything above + approve achievements + moderate feed
```

### Performance Targets
- LCP < 2.5s (Largest Contentful Paint)
- CLS < 0.1 (no layout shift)
- FID < 100ms
- Mobile score > 90 (Lighthouse)

### Accessibility
- WCAG 2.1 AA compliance
- Tamil text: Noto Serif Tamil loaded via Google Fonts
- Minimum font size: 16px body, 14px captions
- Touch targets: 44×44px minimum
- Color contrast: 4.5:1 minimum for text

---

## 🗄️ DATABASE (DBA)

### Schema Overview
```sql
board_members       (id, name, role, bio, photo_url, display_order, is_active, year_start, year_end)
events              (id, title, title_tamil, description, event_date, location, image_url, rsvp_enabled, max_attendees)
event_rsvp          (id, event_id, user_id, name, email, attendee_count, created_at)
gallery_items       (id, title, event_name, year, drive_url, thumbnail_url, display_order, tags[])
gallery_albums      (id, name, event_name, year, cover_photo_id, created_at)
achievements        (id, person_name, competition_name, award, category, photo_url, event_date, status[pending/approved], submitted_by)
feed_posts          (id, author_id, content, image_url, post_type[announcement/event/achievement/help/general], created_at)
feed_comments       (id, post_id, author_id, content, created_at)
feed_reactions      (id, post_id, user_id, type[like/celebrate/heart], created_at)
help_requests       (id, author_id, title, description, category, status[open/resolved], created_at)
help_responses      (id, request_id, author_id, content, created_at)
user_profiles       (id, email, display_name, role[member/admin], avatar_url, joined_at)
```

### Migration Plan
```
001_initial_schema.up.sql   → user_profiles, board_members
002_events.up.sql           → events, event_rsvp
003_gallery.up.sql          → gallery_items, gallery_albums
004_community.up.sql        → achievements, feed_posts, feed_comments, feed_reactions
005_help.up.sql             → help_requests, help_responses
```
Every `.up.sql` paired with `.down.sql`.

---

## 🚀 DEVOPS

### Local Development Stack
```
Next.js dev (localhost:3000, turbopack)
Supabase (cloud free tier — no local needed for start)
Google Drive API (test credentials in .env.local)
```

### Environment Variables Needed
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_DRIVE_API_KEY=          (server-side only, NOT NEXT_PUBLIC_)
GOOGLE_DRIVE_FOLDER_ID=        (shared gallery folder ID)
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Build Pipeline (GitHub Actions, when ready)
```
push to release branch
  → typecheck → lint → test → build
  → Vercel production deploy
```

### Deployment
- Local: `npm run dev` → localhost:3000
- Production: Vercel (free tier) + Supabase (free tier) = $0/month initially

---

## 🛡️ SRE

### Reliability Plan
| Risk | Mitigation |
|------|-----------|
| Supabase downtime | Show cached data (Next.js ISR), graceful error pages |
| Google Drive unavailable | Show "Gallery loading..." instead of broken images |
| High traffic spike (after Tamil events) | Vercel auto-scales, Supabase connection pooling |
| Admin accidentally deletes content | Soft-delete pattern (is_deleted flag, not actual DELETE) |

### Health & Monitoring
- `/api/health` endpoint → `{ status: 'ok', ts: Date.now(), db: 'connected' }`
- Sentry: catch all production errors
- Console structured logging with [Context] prefix

---

## 🧪 QA STRATEGY

### Test Coverage Plan
- Unit tests: All utility functions (date formatting, content sanitization, Drive URL parsing)
- Integration tests: All API routes (events CRUD, feed CRUD, auth flows)
- E2E (Playwright): Homepage load, programs navigation, login flow, post to feed, RSVP to event

### Key Test Scenarios
1. Public visitor can view all public pages (no login)
2. Login flow works end-to-end
3. Member can post to feed, edit own post, cannot edit others'
4. Admin can approve achievement that was pending
5. Gallery loads photos from Drive correctly
6. Mobile viewport renders all sections correctly
7. Tamil text renders correctly (Noto Serif Tamil)

---

## 📋 PM SIGN-OFF

### Phase 1 Scope (Confirmed)
- ✅ Homepage with all sections
- ✅ 5 Program landing pages
- ✅ About + Board members
- ✅ Events calendar + RSVP
- ✅ Photo gallery (Google Drive linked)
- ✅ Authentication
- ✅ Achievement Wall
- ✅ Community Feed
- ✅ Help Board
- ✅ Admin CMS (basic)

### Out of Scope for Phase 1
- ❌ Library app (separate project)
- ❌ Pattarai app (separate project)
- ❌ Native mobile app
- ❌ SSO with school site
- ❌ Email notification system

### Build Order
1. Design system + tokens → 2. Layout shell → 3. Homepage → 4. Programs → 5. About/Board → 6. Auth → 7. Events → 8. Gallery → 9. Achievements → 10. Feed → 11. Help → 12. Admin CMS

---

**VERDICT: ✅ ARCHITECTURE APPROVED — Ready to build**
