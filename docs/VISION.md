# Project Vision — Sun Prairie Tamil Society

**Domain:** sunprairietamilsociety.com (transfer in progress)
**Type:** Public community hub website with selective login for interactive features

---

## Who We Are Building For

**Primary (most important):**
1. Existing SPTS members — Tamil parents and students already in the community
2. New Tamil families in Sun Prairie — looking for community, school, activities

**Secondary:**
3. General public / non-Tamil visitors (city officials, sponsors, neighbors)
4. Other Tamil societies and organizations

---

## The Feeling

When anyone lands on this site, they should feel:
- **Pride** — in Tamil culture, language, and what this community has built
- **Belonging** — "there are people like me here"
- **Professionalism** — this is a serious, organized, well-run organization
- **Warmth** — this is family, not a corporation

---

## What This Site Is

A **community hub** for the Sun Prairie Tamil Society. A single place that:
- Showcases the society and all its programs
- Connects the Tamil community (feed, events, help board)
- Celebrates Tamil culture and achievements
- Links to all sub-apps (School, Library, Pattarai, Music)

---

## What This Site Is NOT

- Not a replacement for the school site (spts-clean) — that lives on its own domain
- Not a social media platform — it's a community hub with social features
- Not a membership paywall site — society is open/free; login only gates interactive features

---

## Language Approach

**English primary.** Tamil is used **strategically and authentically** — not translated everywhere, not repeated. Tamil appears in:
- Hero section title (Tamil script)
- Program names in Tamil
- Section headers where culturally appropriate
- Event names and cultural references
- Decorative Kolam/cultural motifs

One Tamil web font loaded globally (Noto Serif Tamil or Catamaran). No full i18n translation system.

---

## Programs on This Site

| Program | Type | Navigation |
|---------|------|-----------|
| Tamil School (SPTS) | Existing separate site | External link to school domain |
| Library | Future app | Will be hosted at school-domain/library |
| Tamil Pattarai | Future app | Will be hosted at school-domain/pattarai |
| Music Club | Landing page → future app | On this site initially |
| Volunteer Program | Landing page + form | On this site |

---

## Site Architecture

```
sunprairietamilsociety.com/          ← Society hub (THIS PROJECT)
  /about
  /programs
  /events
  /gallery
  /community (feed + achievements + help)
  /board
  /admin (protected)

[school-domain]/                     ← Separate existing site (spts-clean)
[school-domain]/library              ← Future app
[school-domain]/pattarai             ← Future app
```

---

## Visual Identity

**Colors (Tamil cultural palette):**
- Primary: Deep Crimson `#8B1A1A` — Tamil temple/heritage
- Secondary: Warm Gold `#D4930A` — festival/celebration
- Accent: Forest Green `#1B5E3B` — Tamil Nadu green
- Background: Warm Parchment `#FAF7F0` — welcoming, clean
- Surface: White `#FFFFFF`
- Text: Near-black `#1A1A2E`

**Design motifs:**
- Subtle Kolam (rangoli) patterns as dividers and decorative elements
- Temple arch shapes in card headers
- Warm, community photography throughout

**Logo:** To be designed. Concept: Tamil script "SPTS" with a subtle Kolam or lotus icon. Text: "சன் பிரேரி தமிழ் சமூகம்" + "Sun Prairie Tamil Society"

**Typography:**
- Headings: Playfair Display (elegant, heritage feel) or Fraunces
- Body: Inter (clean, readable)
- Tamil script: Noto Serif Tamil (Google Font, excellent rendering)

---

## Success Metrics

- Tamil families in Sun Prairie can find the society and programs easily
- New families feel welcomed and know how to join
- Community events are well-attended (RSVP tracking)
- Community activity feed is active (weekly posts)
- Achievement wall showcases student wins
- Admins can maintain content without developer help

---

## Key Differentiators vs. Other Tamil Sangam Sites

Most Tamil Sangam sites (NYTS, FeTNA, Carolina, KC) are:
- Built on WordPress/Wix (outdated)
- Not mobile-first
- Poor performance
- No interactive community features
- Generic looking

**SPTS will be the first Tamil society with:**
- Modern Next.js 15 app (fast, beautiful)
- Mobile-first (since community is phone-first)
- Interactive community feed + achievement wall
- Beautiful Tamil-inspired design system
- Easy admin UI for non-tech board members
