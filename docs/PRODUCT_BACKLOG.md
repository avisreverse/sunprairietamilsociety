# Product Backlog — SPTS Society Website

---

## Phase 1 — Foundation & Public Pages (Build Now)

| Priority | ID | Feature | Complexity | Notes |
|----------|----|---------|-----------|-------|
| P0 | REQ-202603-001 | Design System & Visual Identity | M | Colors, fonts, Kolam motifs, Logo concept, Shadcn tokens |
| P0 | REQ-202603-002 | Layout Shell (Header + Footer) | S | Nav: Programs, Events, Gallery, Community, About, Login |
| P0 | REQ-202603-003 | Homepage | L | Hero, Programs grid, Events preview, Feed preview, Achievement teaser, Gallery highlights, Board preview |
| P0 | REQ-202603-004 | Programs Landing Pages (5 pages) | M | School (link out), Library (link out), Pattarai (link out), Music, Volunteer |
| P1 | REQ-202603-005 | About / Board Members Page | M | Society story, 7-8 board members with photo + bio + role |
| P1 | REQ-202603-006 | Events Calendar | M | Upcoming events, RSVP, past events archive |
| P1 | REQ-202603-007 | Photo Gallery | L | Grid view, lightbox, admin upload, sort by year/event, Google Drive link option |
| P1 | REQ-202603-008 | Authentication (Supabase Auth) | M | Login for community features. Admin role + Member role |
| P1 | REQ-202603-009 | Achievement Wall | M | Student/member wins, admin-approved, categorized (academic, cultural, sports) |

## Phase 2 — Community Features

| Priority | ID | Feature | Complexity | Notes |
|----------|----|---------|-----------|-------|
| P1 | REQ-202603-010 | Community Activity Feed | L | Post text/images/events, reactions, comments, moderation |
| P1 | REQ-202603-011 | Help & Request Board | M | Submit requests, public visibility, community responses |
| P2 | REQ-202603-012 | Admin CMS (drag-drop UI) | XL | Manage board members, events, gallery, feed, achievements |
| P2 | REQ-202603-013 | Board Member Self-Update | S | Board members can edit own profile |
| P2 | REQ-202603-014 | Event RSVP System | M | Register for events, attendee list for admin |

## Phase 3 — Sub-App Integrations

| Priority | ID | Feature | Complexity | Notes |
|----------|----|---------|-----------|-------|
| P2 | REQ-202603-015 | Library App (school-domain/library) | XL | Separate app: catalog, borrow requests, admin management |
| P2 | REQ-202603-016 | Tamil Pattarai App (school-domain/pattarai) | L | Separate app: schedule, vocabulary, attendance |
| P3 | REQ-202603-017 | Music Club App | L | Roster, rehearsals, performance videos |
| P3 | REQ-202603-018 | Volunteer Program Portal | M | Opportunity listings, registration, tracking |

## Phase 4 — Growth Features

| Priority | ID | Feature | Complexity | Notes |
|----------|----|---------|-----------|-------|
| P2 | REQ-202603-019 | SEO Optimization | M | Meta tags, OG images, sitemap, schema.org markup |
| P3 | REQ-202603-020 | PWA / Mobile App Prep | M | Service worker, manifest, offline page |
| P3 | REQ-202603-021 | SSO with School Site | XL | Shared Supabase auth across society + school domains |
| P3 | REQ-202603-022 | Email Notifications | M | Event reminders, new posts, achievement announcements |
| P3 | REQ-202603-023 | Social Media Feed Embed | S | Embed Facebook/Instagram if accounts exist |

---

## Icebox (Future / Unscoped)

| Feature | Notes |
|---------|-------|
| Native Mobile App | User wants eventually. Post-launch. |
| Online Donations | If society pursues 501(c)(3) status |
| Tamil Pattarai interactive vocabulary | Interactive Tamil vocabulary builder |
| Virtual event streaming | For diaspora members outside Sun Prairie |

---

## Complexity Legend
- XS: < 1 hour
- S: 1–4 hours
- M: 4–8 hours (half day)
- L: 1–2 days
- XL: 3+ days
