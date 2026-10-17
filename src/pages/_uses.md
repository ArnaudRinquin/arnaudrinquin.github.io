---
layout: ../layouts/Prose.astro
# Hidden (leading _ keeps Astro from routing it). Rename to publish + re-add to nav in src/config.ts.
title: Uses
description: The tools I use daily to ship software, mostly with AI.
updated: 2026-10-17
---

## Terminal

No IDE. [More on that](/blog/a-terminal-is-all-i-need-now/).

- **[Ghostty](https://ghostty.org) + tmux**: my whole dev environment. VSCode still opens occasionally, to review diffs.
- **[worktrunk](https://worktrunk.dev)**: one git worktree per branch. Its hooks install deps, assign unique ports and `.env` values so branches run side by side, and open a tmux window with 4 panes: shell, Claude Code, lazygit, and a homemade TUI to monitor services.
- **[lazygit](https://github.com/jesseduffield/lazygit)**: git without typing git.

## AI

- **[Claude Code](https://claude.com/claude-code)**: writes ~95% of the code I ship. Several sessions in parallel, one per worktree; each updates its tmux window name with a status emoji, so I can see at a glance who's waiting on me.
- **A second Claude as reviewer**: split terminal, one instance implements, the other reviews with a dedicated review skill. Fresh context catches what the first one won't.
- **[A GitHub Action that fixes CI](/blog/a-github-action-that-fixes-ci-failures-for-you/)**: CI fails on a PR, Claude analyzes, fixes and commits.
- **[Wispr Flow](https://wisprflow.ai)**: I talk instead of typing. Prompts, Slack, Linear, specs, posts, in English and French. [Why](/blog/stop-typing-start-talking/).
- **[Agentation](https://agentation.dev)**: annotate a page in the browser, copy the recap, paste it to Claude Code, come back to a PR.

## Habits

- Give the agent tools to check its own work (curl, a browser) and a dev setup with zero manual steps. [5 lessons](/blog/5-lessons-from-shipping-code-with-claude-code/).
- Keep `CLAUDE.md` lean, with links to focused sub-docs.
- Run `/insights` now and then: a retro on how I use Claude Code. [What it found](/blog/run-insights-on-claude-code/).

## Music

Spotify. If it goes quiet, something's off at work.
