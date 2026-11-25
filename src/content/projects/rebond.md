---
title: Rebond
summary: "Software for racket clubs: courts, lessons, tournaments, wallet and till in one tool. Players book and pay on their own."
year: 2026
kind: side-project
stack: [TypeScript, Effect, Hono, GraphQL, Postgres, React, Stripe, MCP]
url: https://rebond.dev
cover: ../../assets/projects/rebond/cover.png
featured: true
wip: true
order: 0
---

I'm building the software I want my club to run on. Rebond is for padel, squash and badminton clubs, white-labelled: each club gets its own colours and its own domain.

Players book a court, join an open match or sign up for Saturday's tournament from their phone. The court, the pints at the bar and the overgrip from the shop all land on one bill. The front desk gets the day's planning, clients, subscriptions and the till.

The hard rules live in Postgres: two desks booking the same court at the same time, and the database refuses the second. There's also an MCP server, so a club can run things from Claude.

Still a work in progress. Bø Sports Social Club, my squash club, is the pilot.
