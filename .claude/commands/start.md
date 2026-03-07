# /start — Session Start

Read the following files in this exact order before doing anything else:
1. `CLAUDE.md`
2. `docs/BUILD_SUMMARY.md`
3. `docs/REQUIREMENTS.md`
4. `docs/DEFECTS.md`
5. `docs/DECISIONS.md`
6. `docs/PARKING_LOT.md`

Then respond with this format:

```
SPTS SESSION START
═══════════════════════════════════════

Last session: [date + one-line summary from BUILD_SUMMARY.md]

📋 REQUIREMENTS
  In progress: [count + IDs]
  Blocked:     [count + what's blocking]
  Backlog:     [count]

🐛 DEFECTS
  P0 (Critical): [count]
  P1 (High):     [count]
  P2 (Medium):   [count]
  P3 (Low):      [count]

🅿️ PARKING LOT
  Awaiting your decision: [count + brief description of each item]
  Work interrupted:       [count + what was in progress]
  Deferred defects:       [count]
  Decisions to document:  [count — these need to become D-NNN entries]

🏗️ ARCHITECTURE DECISIONS: [count total in DECISIONS.md]

🎯 NEXT PRIORITY
  [Top item from PARKING_LOT if any, otherwise next from REQUIREMENTS backlog]

⚠️ BLOCKERS
  [Any blocking issues, or "None"]

❓ QUESTIONS (max 2, only if truly blocking)
  [Questions, or "None — ready to start"]

═══════════════════════════════════════
Ready. What are we building today?
```
