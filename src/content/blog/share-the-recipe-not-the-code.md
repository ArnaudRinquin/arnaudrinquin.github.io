---
title: "Share the recipe, not the code"
description: "I wrote a 'build your own' guide for agents, then stumbled upon a RECIPE.md doing the same. I don't know if it's a convention yet, but I think it should be."
publishedAt: 2026-11-03
linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7523367800610947073/
---

The other day I stumbled upon a [RECIPE.md](https://github.com/Lakris2407/herdr-mods/blob/main/quota/RECIPE.md) in a [herdr](https://herdr.dev) mod. You don't read it to install the mod. You hand it to your agent, and the agent builds it.

I smiled, because I'd written the same kind of thing back in July. I have no idea if it's a convention yet. I think it should be.

## My accidental recipe

When I published [slack-to-laptop](/projects/slack-to-laptop/), I added a "Build your own" section to the README. It literally said "here's the TL;DR to hand your agent". My setup is full of my own stuff (my terminal multiplexer, my repos, my Slack), so the code is close to useless for anyone else. What's worth taking is the shape of it and the traps I fell into.

Today I moved that section to its own [RECIPE.md](https://github.com/ArnaudRinquin/slack-to-laptop/blob/main/RECIPE.md).

## The prompt is the contribution

Two other things came back to me when I read that file.

A few months ago, an open source maintainer [suggested prompt requests instead of pull requests](https://jpos.org/blog/2026/02/prompt-requests). If the code was generated anyway, reviewing it means guessing the intent behind it. Just send the intent and the prompt, and they'll generate it themselves, their way.

Then there's how tools get customised now. herdr mods are meant to be installed by your agent: it reads the recipe and builds the mod into your layout, bent to fit. [Omarchy](https://omarchy.org) gives me the same vibe. You don't really install it as-is, you start from it and let your agent make it yours.

So code is getting cheap, and it's getting personal. Give the same recipe to two people's agents and you get two different programs, each one fitting its owner. Forks drift. Recipes adapt. The part worth sharing is the part you can't regenerate: why you made the choices you made, and what bit you along the way.

## What I put in mine

- A one-paragraph pitch, so the agent knows what "done" looks like.
- The ingredients, and why each one is there. That's what lets an agent swap one out without breaking everything.
- The architecture: the pieces, what flows between them, what gets saved to disk.
- Everything that's specific to my machine, flagged as "replace this".
- The gotchas. This is the section that cost me hours, and the one an agent can't guess. The herdr recipe has a great example: an app launched from the Dock doesn't get your shell's `PATH`.

If you build something you like, write the recipe. It's probably the most useful file in the repo.
