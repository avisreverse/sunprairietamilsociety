# /deploy — First-Time Infrastructure Setup

Use this command to set up GitHub repo, release branch, GitHub Actions CI, and Vercel deployment from scratch.

## Step 1: Verify pre-conditions

Before deploying, confirm:
- [ ] `npm run build` passes cleanly
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `.env.example` exists with all required variables (no secrets)

## Step 2: Create release branch

```bash
git checkout -b release
git push -u origin release
```

## Step 3: Verify GitHub Actions CI file exists

Check that `.github/workflows/ci.yml` exists. If not, create it:

```yaml
# .github/workflows/ci.yml
name: CI Quality Gate

on:
  push:
    branches: [main, release]
  pull_request:
    branches: [release]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

## Step 4: Connect to Vercel

Ask user: "What is your Vercel team/account name? Have you already created the Vercel project?"

If not yet created:
1. Go to vercel.com → New Project → Import from GitHub
2. Set production branch to: `release`
3. Add all environment variables from `.env.example` (with real values)
4. Deploy

## Step 5: Verify Supabase connection

Ask user: "What is your Supabase project ID/URL for the SPTS Society project?"

Then verify `.env.local` has:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Step 6: Report

```
SPTS DEPLOY SETUP
═══════════════════════════════════════
🔀 release branch: [created/already exists]
🏗️ GitHub Actions CI: [created/already exists]
🚀 Vercel project: [connected/needs manual action]
🗄️ Supabase: [connected/needs env vars]
🔗 Production URL: [URL or "pending Vercel setup"]
═══════════════════════════════════════
```
