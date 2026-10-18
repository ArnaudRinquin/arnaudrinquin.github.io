---
title: slack-to-laptop
summary: Mention a bot in Slack, a Claude Code job runs on my laptop, and its progress streams back to the thread.
year: 2026
kind: side-project
stack: [TypeScript, Bun, Slack Bolt, MCP]
repo: https://github.com/ArnaudRinquin/slack-to-laptop
cover: ../../assets/projects/slack-to-laptop/cover.png
featured: true
order: 1
---

One long-lived local process with three jobs: it listens for Slack `@mention`s, serves an HTTP MCP endpoint that Claude Code worktree jobs call to drive Slack's native streaming messages, and shows status in the macOS menu bar.

The thread is the correlation key, and state is snapshotted to disk, so restarting the bridge doesn't interrupt running jobs.

![A Slack thread: the mention, the job steps streaming in, then the PR](../../assets/projects/slack-to-laptop/thread.png)
