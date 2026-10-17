---
title: "Developer experience is underrated at early-stage startups"
description: "When you're a small team moving fast, friction points sneak up on you. Here's what we were dealing with: 🔴 E2E tests ran on staging... after merge. Too…"
publishedAt: 2025-12-08
linkedinUrl: https://www.linkedin.com/feed/update/urn:li:activity:7403776059416137728/
---

Developer Experience at early-stage startups is underrated. Here's why I prioritized it.

When you're a small team moving fast, friction points sneak up on you. Here's what we were dealing with:

🔴 E2E tests ran on staging... after merge. Too late. 
🔴 Personal GitHub repo meant no Slack notifications. PRs sat waiting. 
🔴 One staging environment for everyone. Constant bottlenecks.

Here's what I shipped:

**Migrated to GitHub Org** + **Enterprise** Unlocked Slack notifications, full branch protection rules, and proper CI/CD workflows. No more PRs lost in the void, no more merging without checks. Also enabled Claude Code Web and Claude PR Review via official GitHub Actions - AI-assisted development that actually scales.

**Rebuilt our CI from scratch** Ditched our naive CircleCI pipeline for GitHub Actions. Sharded and parallelized all checks and tests. Switched to Blacksmith.sh as a drop-in replacement for GitHub runners - 2-3x faster, 2-3x cheaper.

**Introduced a merge queue** All checks + E2E run before merge, not after. No more "oops, staging is broken."

**On-demand preview environments** Add a label to your PR → get a temporary deployment. No more "is staging free?" Simple as that. (Running against the staging API for now, full isolation comes later.)

The result? Faster reviews, faster tests, fewer surprises, and a team that ships instead of waits.

At an early-stage startup, DX isn't a luxury - it's how you stay fast without breaking things. 🚀
