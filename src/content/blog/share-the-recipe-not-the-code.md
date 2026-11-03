---
title: "Share the recipe, not the code"
description: "I wrote a 'build your own' guide for my agent without knowing it had a name. Then I found RECIPE.md files in the wild, and they might be the most valuable thing to share now."
publishedAt: 2026-11-03
---

The other day I stumbled upon a [RECIPE.md](https://github.com/Lakris2407/herdr-mods/blob/main/quota/RECIPE.md) in a repo of [herdr](https://herdr.dev) mods. It describes a small status-bar widget that shows your coding agents' quotas, down to the pixel: sizes, colours, refresh rules, edge cases. It's not documentation for someone who wants to install the widget. It's a brief for an agent that's going to build it.

It made me smile, because I'd written the same thing back in July without knowing it had a name.

## My accidental recipe

When I published [slack-to-laptop](/projects/slack-to-laptop/), I added a "Build your own" section to the README: "the architecture is small enough to rebuild in an afternoon, here's the TL;DR to hand your agent". My setup is very specific (my terminal multiplexer, my repos, my Slack), so the code itself is of little use to anyone else. The shape of it, plus the traps I fell into, is what's worth sharing.

This week I moved it to its own [RECIPE.md](https://github.com/ArnaudRinquin/slack-to-laptop/blob/main/RECIPE.md): the pitch, the ingredients and why each one is there, the architecture, and the gotchas.

## The prompt is the contribution

That file connected two other things in my head.

The first one is a maintainer's proposal from earlier this year: send [prompt requests instead of pull requests](https://jpos.org/blog/2026/02/prompt-requests). If the code was generated, reviewing it means reverse-engineering the intent. Send the intent, the context and the prompt, and the maintainer can generate it on their side, their way.

The second one is how tools are starting to get customised. herdr's mods are meant to be added by your agent: you hand it one line, it reads the recipe and builds the mod into your own layout, adapted to it. [Omarchy](https://omarchy.org) gives me the same feeling: it's less a product you install as-is than a base your agent bends to your taste.

Put together: code is becoming cheap and personal. Two people rebuilding the same tool from the same recipe will end up with two different programs, each fitting its owner. A fork drifts away from you; a recipe adapts to you. What's worth sharing is what can't be regenerated: the decisions and the scars.

## What goes in a good recipe

- **The pitch.** What it does and for whom, in one paragraph, so the agent knows what "done" looks like.
- **Ingredients, with the why.** Not just the libraries, the reason each one is there. That's what lets the agent swap one out sensibly.
- **The shape.** Components, the data flowing between them, what's persisted.
- **What's mine.** Machine-specific paths, tools and conventions, flagged as things to replace.
- **Watch out.** The section that cost hours: the env var missing when the app is started from the Dock, the API that lies about its reset time. This is the part an agent can't guess.

Next time you build something you're proud of, don't stop at the code. Ship the recipe.
