# /wrap — End Session

At the end of a work session, do ALL of the following automatically — do not ask permission.

## 1. Summarize what was completed
List requirements, defects, and decisions touched this session.

## 2. Update docs/BUILD_SUMMARY.md
Add a new session entry at the top of the Session Log:
- Date
- What was completed (REQ-### / DEF-### references)
- What was deferred and why
- New defects found
- Deployment status
Also update the "Current State" section and "What's Pending" checklist.

## 3. Update docs/REQUIREMENTS.md
Change status of any requirements touched:
- If all acceptance criteria met + /test passed → status: done
- If partially implemented → status: in_progress, update notes
- If blocked → status: blocked, note the blocker

## 4. Update docs/DEFECTS.md
For any defects touched:
- If fixed + verified → status: fixed, add Fixed date, add regression test reference
- If new defects found during testing → add to open defects table with DEF-### ID linked to REQ-###

## 5. Convert PARKING_LOT decisions to DECISIONS.md
Check docs/PARKING_LOT.md "Analysis / Q&A Decisions to Document" table.
For each item marked "Yes — D-NNN pending":
- Create a new D-NNN entry in docs/DECISIONS.md
- Remove from PARKING_LOT

## 6. Update PARKING_LOT
- Remove any items that were resolved this session
- Add any new interrupted work or awaiting-decision items
- Add any deferred defects

## 7. Output wrap summary

```
SPTS SESSION WRAP
═══════════════════════════════════════

✅ COMPLETED THIS SESSION
  [REQ/DEF-ID]: [What was done]

🔄 DEFERRED / INTERRUPTED
  [Item]: [Why — added to PARKING_LOT]

🐛 NEW DEFECTS FOUND
  [DEF-ID]: [Title] — [Severity] — [Linked to REQ-###]
  (or "None")

🅿️ PARKING LOT CHANGES
  Added: [items]
  Resolved: [items]
  Decisions documented as D-NNN: [list or "none"]

🚀 DEPLOYMENT
  [Branch/environment/status]
  (or "No deployment this session")

📝 DOCS UPDATED
  docs/BUILD_SUMMARY.md ✅
  docs/REQUIREMENTS.md [✅ or "no changes"]
  docs/DEFECTS.md [✅ or "no changes"]
  docs/DECISIONS.md [✅ or "no changes"]
  docs/PARKING_LOT.md ✅

🎯 NEXT SESSION PRIORITY
  [Top item from PARKING_LOT or requirements backlog]

═══════════════════════════════════════
Session complete. Docs updated.
```

## 8. Commit all doc changes
```bash
git add docs/
git commit -m "docs: session wrap [YYYY-MM-DD] — [one-line summary]

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
