---
title: "Nine months at Teetsh: in charge of everything AI"
description: "🤖 Back in March I demoed a secret side project: a prototype AI teaching assistant, my pitch for what an AI-first Teetsh could look like. It convinced the…"
publishedAt: 2026-07-22
linkedinUrl: https://www.linkedin.com/feed/update/urn:li:activity:7485640859007467520/
---

Time flies at Teetsh! Five months since my last check-in, ~600 PRs later, and the job has changed shape.

🤖 Back in March I demoed a secret side project: a prototype AI teaching assistant, my pitch for what an AI-first Teetsh could look like. It convinced the team to go all-in. The crew keeps pushing the core product; I'm in charge of everything AI. Since then I built the real thing from scratch: the agent itself (tools, sub-agents, memory, skills), an LLM-agnostic core, and the features on top of it.

📄 AI document import: teachers drop their existing docs (emplois du temps, programmations, séquences…) and they get rebuilt natively in Teetsh. It looks like a standalone feature, but it's the same agent running headless: a different UX riding on all the same tools and tuning. Day-1 banger: 10 to 30% of content creation now goes through it.

🧭 AI onboarding: an agent that sets up your year with you. New teachers activate 3x faster.

📚 Generation grounded in the official programmes (RAG), with citations.

🧊 An AI feature is an iceberg. "Drop a file and it's imported" sounds simple; under the waterline it's months of tinkering: prompts, tool design, edge cases, dozens of iterations to get it just right. You can't iterate that much blind, so I also built the measurement stack: tracing, an eval harness with LLM judges, cost and quality dashboards.

📊 The biggest change is the role itself. Working AI-native compressed the "how" down to architecture decisions and freed me to move up the stack: analytics, session replays, user interviews, dogfooding. Less "build what's specced", more "figure out what works, then prove it landed". The compound effect of removing friction is wild.

Also since February: a shared design system, per-branch full-stack dev VMs, unified CI, RGPD safeguards for AI, Belgian expansion.

Next up: more headless agent features, and new kinds of UX for AI. A chat panel is just the obvious one; most of our AI features aren't chats at all. 🚀
