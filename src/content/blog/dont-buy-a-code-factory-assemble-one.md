---
title: "Don't buy a code factory, assemble one"
description: "Everyone is talking about code factories. After a year of rebuilding how I work with AI, I think we're mixing up three different things, and only some of them should be shared."
publishedAt: 2026-11-20
---

About a year ago, my AI workflow was opening a Claude instance and talking to it. That's it.

Then we started rebuilding the way we code and ship at [Teetsh](https://teetsh.com) from scratch. We're still at it. I've changed my workflow a dozen times this year, probably more. Some setups lived a month. Some barely outlived the next big change by a couple of weeks. And that's fine.

Now everyone's talking about code factories. High-level orchestration, fleets of agents, tickets in, pull requests out. I've looked at what's on sale. We built one internally too. It's maintained, and our CEO and others use it every day. I never really adopted it.

I've been thinking about why. My take: we're putting very different things in the same box, and calling the box a factory.

## The black box problem

The first few times I tried one of these tools, it went like this: the agent asked me a few questions, disappeared for a while, and came back with a result.

Maybe it was just an impression. Maybe it was the UI. To be fair, the chat bots I use today also go away and come back. But back then, I couldn't easily dig into what had been done. The code was written somewhere that wasn't mine: not my machine, not my localhost, not my terminal. Every tool had a cut somewhere, and past that cut, going deeper was either impossible or tedious enough that I gave up.

In July I wrote that [not reading the code is nothing new](/blog/not-reading-the-code-is-nothing-new/). I still believe it. But there's a catch I didn't spell out: I'm fine not reading the code because I *can* read it, any time, in seconds.

Trust doesn't come from looking. It comes from knowing you can look.

There was a second reason, and it's the same one in disguise: I hadn't built it. The box was handed to me, finished. I couldn't open it, and I hadn't put it together, so I had no way to earn my own trust in it. Being able to dig in and having assembled the thing yourself are two roads to the same place.

<figure class="wf-cut" style="margin:2rem 0">
<div style="display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center">
<svg viewBox="0 0 360 310" role="img" aria-label="The factory: you send a ticket into a black box running somewhere remote, a pull request comes out, and a cut stops you from looking inside" style="flex:1 1 300px;max-width:440px;height:auto;font-family:var(--font-mono)">
<defs><marker id="wfA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--dim)"/></marker></defs>
<text x="180" y="18" text-anchor="middle" font-size="13" font-weight="600" style="fill:var(--fg)">The factory</text>
<rect x="16" y="40" width="70" height="26" rx="6" style="fill:none;stroke:var(--accent)"/><text x="51" y="57" text-anchor="middle" font-size="11" style="fill:var(--fg)">You</text>
<text x="108" y="46" text-anchor="middle" font-size="9" style="fill:var(--soft)">ticket</text>
<line x1="86" y1="53" x2="132" y2="53" marker-end="url(#wfA)" style="stroke:var(--dim)"/>
<rect x="134" y="34" width="206" height="176" rx="8" style="fill:var(--line);stroke:var(--line)"/>
<text x="237" y="54" text-anchor="middle" font-size="9.5" style="fill:var(--soft)">somewhere remote</text>
<text x="237" y="138" text-anchor="middle" font-size="44" font-weight="700" style="fill:var(--dim)">?</text>
<line x1="112" y1="76" x2="112" y2="236" stroke-width="2" stroke-dasharray="5 4" style="stroke:var(--date)"/>
<text x="112" y="252" text-anchor="middle" font-size="9.5" style="fill:var(--date)">the cut</text>
<line x1="51" y1="66" x2="51" y2="150" stroke-dasharray="3 3" style="stroke:var(--dim)"/>
<line x1="51" y1="150" x2="100" y2="150" stroke-dasharray="3 3" style="stroke:var(--dim)"/>
<text x="104" y="154" font-size="12" font-weight="700" style="fill:var(--date)">×</text>
<text x="58" y="140" font-size="9" style="fill:var(--soft)">zoom in</text>
<line x1="237" y1="210" x2="237" y2="228" marker-end="url(#wfA)" style="stroke:var(--dim)"/>
<rect x="207" y="230" width="60" height="24" rx="6" style="fill:none;stroke:var(--dim)"/><text x="237" y="246" text-anchor="middle" font-size="10" style="fill:var(--fg)">PR</text>
<text x="180" y="290" text-anchor="middle" font-size="9.5" style="fill:var(--dim)">you see what goes in and what comes out</text>
</svg>
<svg viewBox="0 0 360 310" role="img" aria-label="The workshop: the same flow, but the box is open: orchestration, agent, worktree and code are stacked inside and you can zoom from the top down to a single line of code on your machine" style="flex:1 1 300px;max-width:440px;height:auto;font-family:var(--font-mono)">
<defs><marker id="wfB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--dim)"/></marker><marker id="wfC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--accent)"/></marker></defs>
<text x="180" y="18" text-anchor="middle" font-size="13" font-weight="600" style="fill:var(--fg)">The workshop</text>
<rect x="16" y="40" width="70" height="26" rx="6" style="fill:none;stroke:var(--accent)"/><text x="51" y="57" text-anchor="middle" font-size="11" style="fill:var(--fg)">You</text>
<text x="108" y="46" text-anchor="middle" font-size="9" style="fill:var(--soft)">ticket</text>
<line x1="86" y1="53" x2="132" y2="53" marker-end="url(#wfB)" style="stroke:var(--dim)"/>
<rect x="134" y="34" width="206" height="176" rx="8" style="fill:var(--panel);stroke:var(--line)"/>
<text x="237" y="54" text-anchor="middle" font-size="9.5" style="fill:var(--soft)">my machine</text>
<rect x="146" y="64" width="182" height="26" rx="5" style="fill:none;stroke:var(--accent)"/><text x="237" y="81" text-anchor="middle" font-size="10" style="fill:var(--fg)">orchestration · bots</text>
<rect x="146" y="98" width="182" height="26" rx="5" style="fill:none;stroke:var(--accent)"/><text x="237" y="115" text-anchor="middle" font-size="10" style="fill:var(--fg)">agent · Claude Code</text>
<rect x="146" y="132" width="182" height="26" rx="5" style="fill:none;stroke:var(--dim)"/><text x="237" y="149" text-anchor="middle" font-size="10" style="fill:var(--fg)">worktree · localhost</text>
<rect x="146" y="166" width="182" height="26" rx="5" style="fill:var(--date);fill-opacity:.15;stroke:var(--date)"/><text x="237" y="183" text-anchor="middle" font-size="10" style="fill:var(--fg)">code · line 42</text>
<line x1="51" y1="66" x2="51" y2="179" stroke-width="1.5" style="stroke:var(--accent)"/>
<line x1="51" y1="179" x2="144" y2="179" stroke-width="1.5" marker-end="url(#wfC)" style="stroke:var(--accent)"/>
<text x="58" y="140" font-size="9" style="fill:var(--soft)">zoom in</text>
<line x1="237" y1="210" x2="237" y2="228" marker-end="url(#wfB)" style="stroke:var(--dim)"/>
<rect x="207" y="230" width="60" height="24" rx="6" style="fill:none;stroke:var(--dim)"/><text x="237" y="246" text-anchor="middle" font-size="10" style="fill:var(--fg)">PR</text>
<text x="180" y="290" text-anchor="middle" font-size="9.5" style="fill:var(--dim)">every layer opens, down to the line</text>
</svg>
</div>
<figcaption style="text-align:center;font-size:.8rem;color:var(--dim);margin-top:.75rem">Same ticket, same PR. The difference is whether you can open the box.</figcaption>
</figure>

Hand me a black box and tell me "trust me, bro", and it won't work. I'd rather assemble it myself.

## So I assembled it

That's pretty much what I did all year. One brick at a time, each step checked by hand before I let it run on its own. Skills, tests, hooks, worktrees, a [release train](/blog/meet-thomas-the-release-train-that-ships-to-prod-on-its-own/).

It's how I ended up on [Orca](https://orca.dev), first with plain worktrees. It stayed close to the code. I never felt blind. I could dogfood everything and use my own skills.

There was still friction though. I spent a bit too much time managing worktrees myself. Even with skills that opened one and started Claude on a new piece of work, it was still a bit manual.

And keeping track was just as hard. Which topics were in flight, which ones were waiting on me, and in which worktree and which conversation each one lived. With a dozen things going in parallel, I was the index, and I kept losing entries.

Then I tried Orca's bots, and two things clicked.

**Worktrees went away.** The bots manage them. Worktrees and branches are hidden at exactly the right level. I talk about the work, the bot handles where it lives. And when I want to dig in, it's right there on my machine: a normal worktree I can open, run, and break.

**The bots keep track.** My previous setup was mostly one Claude conversation per project. Simple, mostly working. The bots handle ongoing tasks and topics much better. The granularity feels right. What needs me is clearly sorted, and when I have to answer a question, I get the exact context with it.

I was already juggling a lot of topics in parallel. Now it takes a lot less fiddling.

And under the hood, it's still the same low-level stuff: git, worktrees, terminals, Claude Code. Cheap, boring, and mine.

## What my day looks like now

I've stopped worrying about losing sight. The agents pull me in for what matters. Everything that can run without me just runs. I don't feel like anything critical happens without supervision, and I don't feel like I answer questions for nothing.

Part of that is a year of tailoring. The skills we wrote, the workflows I rebuilt, what my agents remember. We used to call that experience.

So my job is mostly expressing needs: what to build next, what to fix next. That works just as well at a high level as at a low level.

Say I ask for a full feature. Most of it I leave open. But if one detail matters to me, I pin it: "By the way, while you're at it, build this part like this." Or "this is a choice I want to make myself."

That's the real skill: give everything that matters, and only what matters. Whatever you leave out, you're saying you don't care how it's done. That's how you take yourself out of the loop: make sure the agent has what it needs to build your vision, and let go of the rest.

What if something you let go comes back wrong? That's experience too. You learn, and you put the lesson in a skill.

In practice it barely happens. We have tests, metrics, observability, and a release process with A/B testing and dogfooding. A small bug in production is still a bug. But if it's not critical and you can fix it in under an hour, it's fine. Fixes being cheap is what makes letting go safe.

## Harness and factory are not the same thing

Here's the part I think isn't discussed enough.

People talk about harnesses and factories as if they were one big thing. They're not, and I think it matters to split them.

My bots are personal. They're how *I* like to work. My teammates work differently, and I don't want them to adopt my setup.

I learned that one from both sides.

I've been on the receiving end: handed a workflow someone else had built and trusted, and expected to trust it too. I couldn't, not right away. I hadn't built that trust myself.

And I've done it to others. At some point I told friends and teammates: "Here's the skill I use to orchestrate my work. It just works." It didn't really work for them. It was good inspiration, but they couldn't use it the way I did. They had to build their own trust, and that takes time.

You can show people how you work. You can't force-feed it. Trust in a workflow is built by the person using it, one checked step at a time, the same way I built mine.

What *is* shared is what lives in our codebase:

- the tests and the checks
- our markdown docs
- guidelines for design, technical choices, and safety
- a review process with separate reviews for safety, security, and how things are built

That's the harness. And I insist: it has to be tied to the codebase, not to the tooling around it. Making sure our repo has all of that is probably the most important thing I worked on this year.

## Five layers

The words aren't settled. "Harness" already means something else: Anthropic calls Claude Code itself an agent harness. Concepts rise, die, and change meaning every few months. That's expected at this pace. So here's how I split it, at least for now:

<figure class="wf-layers" style="margin:2rem 0">
<svg viewBox="0 0 640 456" role="img" aria-label="Five layers. Strategy on top, shared company-wide. Orchestration below, personal: me with bots, a teammate and marketing each with their own. A sharp line. Product harness and coding harness, shared and in the repo, with a blurry line between them. Agent harness at the bottom, Claude Code or Codex, your pick." style="width:100%;height:auto;font-family:var(--font-mono)">
<text x="320" y="30" text-anchor="middle" font-size="17" font-weight="700" style="fill:var(--fg);font-family:var(--font-display);letter-spacing:.5px">SHARED AT THE TOP AND BOTTOM, PERSONAL IN THE MIDDLE</text>
<rect x="30" y="52" width="480" height="56" rx="10" style="fill:var(--date);fill-opacity:.12;stroke:var(--date);stroke-width:2"/>
<text x="50" y="76" font-size="12" font-weight="700" style="fill:var(--date)">STRATEGY</text>
<text x="50" y="96" font-size="10.5" style="fill:var(--soft)">goals · projects · who owns what · updates</text>
<text x="128" y="124" text-anchor="middle" font-size="9" style="fill:var(--dim)">↕ MCP</text><text x="283" y="124" text-anchor="middle" font-size="9" style="fill:var(--dim)">↕ MCP</text><text x="433" y="124" text-anchor="middle" font-size="9" style="fill:var(--dim)">↕ MCP</text>
<rect x="30" y="132" width="480" height="94" rx="10" style="fill:none;stroke:var(--accent);stroke-width:2"/>
<text x="50" y="154" font-size="12" font-weight="700" style="fill:var(--accent)">ORCHESTRATION</text>
<rect x="50" y="166" width="156" height="46" rx="7" stroke-dasharray="4 3" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent)"/><text x="128" y="186" text-anchor="middle" font-size="10.5" style="fill:var(--fg)">me</text><text x="128" y="202" text-anchor="middle" font-size="9.5" style="fill:var(--soft)">bots, worktrees</text>
<rect x="215" y="166" width="136" height="46" rx="7" stroke-dasharray="4 3" style="fill:none;stroke:var(--accent)"/><text x="283" y="186" text-anchor="middle" font-size="10.5" style="fill:var(--fg)">a teammate</text><text x="283" y="202" text-anchor="middle" font-size="9.5" style="fill:var(--soft)">their own way</text>
<rect x="360" y="166" width="136" height="46" rx="7" stroke-dasharray="4 3" style="fill:none;stroke:var(--accent)"/><text x="428" y="186" text-anchor="middle" font-size="10.5" style="fill:var(--fg)">marketing</text><text x="428" y="202" text-anchor="middle" font-size="9.5" style="fill:var(--soft)">nothing like mine</text>
<line x1="20" y1="241" x2="520" y2="241" stroke-width="3" style="stroke:var(--fg)"/>
<rect x="30" y="256" width="480" height="112" rx="10" style="fill:var(--date);fill-opacity:.12;stroke:var(--date);stroke-width:2"/>
<text x="50" y="280" font-size="12" font-weight="700" style="fill:var(--date)">PRODUCT HARNESS</text>
<text x="50" y="299" font-size="10" style="fill:var(--soft)">design · safety · security review · release train · A/B</text>
<line x1="44" y1="312" x2="496" y2="312" stroke-width="5" stroke-dasharray="2 7" stroke-linecap="round" style="stroke:var(--date);opacity:.45"/>
<text x="50" y="336" font-size="12" font-weight="700" style="fill:var(--date)">CODING HARNESS</text>
<text x="50" y="355" font-size="10" style="fill:var(--soft)">tests · lint · checks · code guidelines · build review</text>
<rect x="30" y="384" width="480" height="52" rx="10" stroke-dasharray="6 4" style="fill:none;stroke:var(--accent);stroke-width:2"/>
<text x="50" y="406" font-size="12" font-weight="700" style="fill:var(--accent)">AGENT HARNESS</text>
<text x="50" y="424" font-size="10" style="fill:var(--soft)">Claude Code · Codex · …</text>
<path d="M528 56v48" stroke-width="2" style="stroke:var(--date)"/><text x="538" y="78" font-size="11" font-weight="600" style="fill:var(--date)">shared</text><text x="538" y="94" font-size="9.5" style="fill:var(--soft)">company</text>
<path d="M528 136v86" stroke-width="2" style="stroke:var(--accent)"/><text x="538" y="176" font-size="11" font-weight="600" style="fill:var(--accent)">personal</text><text x="538" y="192" font-size="9.5" style="fill:var(--soft)">per person</text>
<text x="538" y="245" font-size="9.5" style="fill:var(--fg)">← stays sharp</text>
<path d="M528 260v104" stroke-width="2" style="stroke:var(--date)"/><text x="538" y="308" font-size="11" font-weight="600" style="fill:var(--date)">shared</text><text x="538" y="324" font-size="9.5" style="fill:var(--soft)">in the repo</text>
<path d="M528 388v44" stroke-width="2" stroke-dasharray="6 4" style="stroke:var(--accent)"/><text x="538" y="408" font-size="11" font-weight="600" style="fill:var(--accent)">your pick</text><text x="538" y="424" font-size="9.5" style="fill:var(--soft)">swappable</text>
</svg>
<figcaption style="text-align:center;font-size:.8rem;color:var(--dim);margin-top:.75rem">The line between the two harnesses is blurry. The one under orchestration isn't.</figcaption>
</figure>

The line between the two harnesses is blurry. A security review is about code and about product. That's fine. The line that has to stay sharp is the one under orchestration: everything below it belongs to the team and lives in the repo. Everything above it, up to strategy, is yours.

So it's shared at the top and bottom, and personal in the middle. The company agrees on where it's going (strategy) and on how quality is guaranteed (the harness). How each person gets from one to the other is up to them.

## The single vertical is an illusion

The strategy layer is the next problem I'm looking at. You need a company-wide view of where things stand: goals, projects, responsibilities. We used Linear projects for that. When we stopped using Linear for issues, we rebuilt it inside our internal tool.

But I think it should be its own brick. People contribute to it, and maybe agents one day: they move topics forward and post updates toward a goal. It should work on its own and plug into everything else through MCP or whatever comes next.

Trying to build one vertical from the codebase all the way up to strategy is an illusion. Here's a simple test: marketing. One vertical means your orchestration layer has to work just as well for a marketer as for a developer. It won't. Their middle layer looks nothing like mine, and it shouldn't.

You need the vision across the company. You don't need one tool to carry it.

## Everything has to be swappable and interoperable

Today I love Claude Code. Tomorrow, I don't know. Today I love Orca. Tomorrow, I don't know.

So every piece of the puzzle has to be replaceable, and interoperable: it has to talk to the others through open, boring interfaces (git, files, MCP) so you can pull one out without breaking the rest. And the shape of the puzzle changes too, because the tech moves, the ecosystem moves, and we get new ideas every day about how to build things.

If you want to keep the word "factory", fine. But it's not a black box. It's an assembly you can take apart. Think about your problems layer by layer, and keep the freedom to change how you solve each one.

That's also why the harness belongs in the repo, and why it's mostly written for agents. Markdown guidelines, tests, and checks are plain files any agent can read. Swap Claude Code, swap Orca, swap the whole orchestration layer: the harness stays. The experience you committed stays. A new teammate, human or agent, inherits it on day one.

Some layers churn every few weeks. Some last for years. Put what must last where no tool can take it away.

<figure class="wf-lifespan" style="margin:2rem 0">
<svg viewBox="0 0 640 300" role="img" aria-label="How long each layer lives over a year. Strategy moved once, from Linear to an internal tool. Orchestration was rebuilt about a dozen times. The agent harness stayed Claude Code so far. The harness in the repo never restarted and kept growing." style="width:100%;height:auto;font-family:var(--font-mono)">
<text x="320" y="28" text-anchor="middle" font-size="17" font-weight="700" style="fill:var(--fg);font-family:var(--font-display);letter-spacing:.5px">ONE YEAR, FOUR LIFESPANS</text>
<text x="20" y="74" font-size="11" style="fill:var(--fg)">strategy</text>
<rect x="180" y="59" width="250" height="22" rx="4" style="fill:var(--date);fill-opacity:.25;stroke:var(--date)"/><text x="305" y="74" text-anchor="middle" font-size="9.5" style="fill:var(--fg)">Linear projects</text>
<rect x="434" y="59" width="186" height="22" rx="4" style="fill:var(--date);fill-opacity:.25;stroke:var(--date)"/><text x="527" y="74" text-anchor="middle" font-size="9.5" style="fill:var(--fg)">internal tool</text>
<text x="20" y="124" font-size="11" style="fill:var(--fg)">orchestration</text>
<g style="fill:var(--accent);fill-opacity:.35;stroke:var(--accent)">
<rect x="180" y="109" width="30" height="22" rx="3"/><rect x="213" y="109" width="22" height="22" rx="3"/><rect x="238" y="109" width="45" height="22" rx="3"/><rect x="286" y="109" width="18" height="22" rx="3"/><rect x="307" y="109" width="40" height="22" rx="3"/><rect x="350" y="109" width="25" height="22" rx="3"/><rect x="378" y="109" width="60" height="22" rx="3"/><rect x="441" y="109" width="20" height="22" rx="3"/><rect x="464" y="109" width="35" height="22" rx="3"/><rect x="502" y="109" width="28" height="22" rx="3"/><rect x="533" y="109" width="50" height="22" rx="3"/><rect x="586" y="109" width="34" height="22" rx="3"/>
</g>
<text x="400" y="148" text-anchor="middle" font-size="9" style="fill:var(--dim)">a dozen rebuilds, some lived two weeks</text>
<text x="20" y="179" font-size="11" style="fill:var(--fg)">agent harness</text>
<rect x="180" y="164" width="440" height="22" rx="4" style="fill:var(--accent);fill-opacity:.15;stroke:var(--accent)"/><text x="400" y="179" text-anchor="middle" font-size="9.5" style="fill:var(--fg)">Claude Code, so far</text>
<text x="20" y="226" font-size="11" style="fill:var(--fg)">harness (repo)</text>
<path d="M180 219L620 205V237L180 225Z" style="fill:var(--date);fill-opacity:.5;stroke:var(--date)"/>
<text x="610" y="252" text-anchor="end" font-size="9" style="fill:var(--dim)">never restarted, keeps growing</text>
<line x1="180" y1="272" x2="620" y2="272" style="stroke:var(--line)"/>
<text x="180" y="290" font-size="9.5" style="fill:var(--dim)">a year ago</text><text x="620" y="290" text-anchor="end" font-size="9.5" style="fill:var(--dim)">today</text>
</svg>
<figcaption style="text-align:center;font-size:.8rem;color:var(--dim);margin-top:.75rem">Schematic, not to scale. The tools churn. What's committed to the repo stays.</figcaption>
</figure>

A year ago I was starting Claude instances by hand. Today agents run agents for me. Next year it'll probably look different again.

Don't buy a factory. Assemble one, and keep the parts you can't lose in the repo.

