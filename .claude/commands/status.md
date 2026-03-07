# /status — Current State

Read `docs/BUILD_SUMMARY.md`, `docs/REQUIREMENTS.md`, and `docs/DEFECTS.md`, then output:

```
SPTS STATUS
═══════════════════════════════════════

📅 Last Updated: [date]
🔀 Branch: [current branch]
🚀 Deployed: [last deployment info if known]

📋 REQUIREMENTS
  🟡 In Progress:  [list with IDs]
  🔴 Blocked:      [list with IDs + blockers]
  🟢 Done today:   [list with IDs]
  🔵 Backlog:      [count]

🐛 OPEN DEFECTS
  [ID] [Severity] [Title]
  ...

🏗️ DECISIONS PENDING REVIEW
  [Any D-NNN marked as "Proposed" not yet "Accepted"]

⚡ WHAT WAS JUST DONE
  [Summary from BUILD_SUMMARY.md last session]

🎯 WHAT'S NEXT
  [Top priority item]
═══════════════════════════════════════
```
