# /milestone — Record a Project Milestone

Use when something real and significant happens. These moments are permanent.

## When to invoke

- A feature works end-to-end for the first time
- The site goes live (first real deployment)
- The first real community member uses a feature
- A phase completes
- Any moment worth remembering — Siva says "this feels real"

## Execution

1. Ask: "What happened? What did it feel like? What made this significant?"
2. Read current `docs/MILESTONES.md` (create it if it doesn't exist)
3. Append the new milestone entry — never edit or delete existing entries

## Milestone format

```markdown
### 📍 [Date] — [Milestone Name]

*"[What happened. What the user saw. What it felt like.
Written specifically — dates, features, exact words said.
Never generic. Never AI-sounding.]*

Phase: [N] | REQ-### completed: [list] | Sessions to get here: [N]*
```

## Special milestone: "Site is live"

When the site first deploys to production at sunprairietamilsociety.com:

```markdown
### 📍 [Date] — SITE IS LIVE

*"[What the user said when they saw it live. What the homepage looked like.
What feature worked first. The moment the Sangam Scroll loaded on a real domain.]*

*Phase: 1 COMPLETE | Features shipped: [list] | Total sessions: [N]*
```

After recording, also:
- Update `docs/BUILD_SUMMARY.md` — mark phase complete
- Create next phase kickoff item in `docs/PARKING_LOT.md`

## Rules

- Milestones are permanent — never edit or delete once written
- Specific details always — no vague "we made good progress"
- Written like a human said it, not an AI
