---
title: "Our agent writes code now, and it can finally count"
description: "I built code mode into the Teetsh agent in a week: a Wasm sandbox, one new tool, and an agent that does real arithmetic. Six days later, Claude Code shipped its own."
publishedAt: 2026-11-18
tags: [ai, agents, teetsh]
draft: false
linkedinUrl: https://www.linkedin.com/posts/arnaudrinquin_our-ai-agent-at-teetsh-can-finally-count-share-7528788800282562562-Aa01/
---

Ask an LLM agent "how many maths lessons do I have left before Christmas, bank holidays excluded?" and you'll get a confident number. It'll probably be wrong, too. The agent reads ten timetables one tool call at a time, holds them all in context, and counts in its head.

At Teetsh, our agent now writes a small program for that. The program walks every school day, skips holidays, counts the lessons and adds up the minutes. The machine does the maths, so the number is exact.

That's code mode. I took it from research to 20 % of prod in under two weeks, and I didn't have to wait for anyone to ship it.

## The idea

Instead of calling tools one by one, the model writes ~20 lines of JavaScript where our tools are plain async functions. The script loops, filters, joins and counts. Only its return value goes back to the model.

```js
// simplified
const days = teetsh.helpers.school_dates({ to: "2026-12-18" });
const edt = await teetsh.find_emplois_du_temps({ periode: 2 });
let sessions = 0, minutes = 0;
for (const d of days) {
  for (const slot of edt.slots_on(d)) {
    if (slot.subject === "maths") { sessions++; minutes += slot.duration; }
  }
}
return { sessions, hours: minutes / 60 };
```

None of this is my invention. Cloudflare called it Code Mode, Anthropic and OpenAI both offer "programmatic tool calling" in their APIs, Pydantic has its own take, and the CodeAct paper did it in 2024. When I looked at it end of October, the concept was clear and so were the numbers. What was missing was a version that fit us.

## Why it matters for us

Two thirds of what our agent read was raw tool output. Every step re-read the whole conversation, and the hard requests (prepare next week's cahier journal, check programme coverage, replan after a strike day) were exactly the long ones. That's where the model lost track mid-loop, copied the wrong ID from one result into the next call, or averaged 300 grades "in its head".

With code mode, the gradebooks never enter the context. The model gets back "5 pupils under 50 %, and the 3 skills they struggle with", computed by code.

<figure class="cm-diagram" style="margin:2rem 0">
<div style="display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center">
<svg viewBox="0 0 360 390" role="img" aria-label="Classic tool calls: three round trips, each one brings the full JSON back into the model's context, and the model counts in its head" style="flex:1 1 300px;max-width:440px;height:auto;font-family:var(--font-mono)">
<defs><marker id="cmA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--dim)"/></marker></defs>
<text x="180" y="18" text-anchor="middle" font-size="13" font-weight="600" style="fill:var(--fg)">Classic tool calls</text>
<rect x="40" y="32" width="80" height="26" rx="6" style="fill:none;stroke:var(--accent)"/><text x="80" y="49" text-anchor="middle" font-size="11" style="fill:var(--fg)">Model</text>
<rect x="250" y="32" width="80" height="26" rx="6" style="fill:none;stroke:var(--dim)"/><text x="290" y="49" text-anchor="middle" font-size="11" style="fill:var(--fg)">Tools</text>
<line x1="80" y1="58" x2="80" y2="320" stroke-dasharray="3 3" style="stroke:var(--line)"/><line x1="290" y1="58" x2="290" y2="320" stroke-dasharray="3 3" style="stroke:var(--line)"/>
<rect x="76" y="72" width="8" height="44" rx="2" style="fill:var(--accent);opacity:.55"/>
<text x="20" y="96" font-size="10" style="fill:var(--dim)">#1</text>
<text x="185" y="76" text-anchor="middle" font-size="9.5" style="fill:var(--soft)">find_emplois_du_temps</text>
<line x1="84" y1="82" x2="286" y2="82" marker-end="url(#cmA)" style="stroke:var(--dim)"/>
<path d="M286 96H90V93L84 101L90 109V106H286Z" style="fill:var(--date);fill-opacity:.3;stroke:var(--date)"/>
<text x="188" y="104" text-anchor="middle" font-size="9" style="fill:var(--fg)">full JSON · 10 timetables</text>
<rect x="76" y="142" width="8" height="44" rx="2" style="fill:var(--accent);opacity:.55"/>
<text x="20" y="166" font-size="10" style="fill:var(--dim)">#2</text>
<text x="185" y="146" text-anchor="middle" font-size="9.5" style="fill:var(--soft)">find_holidays</text>
<line x1="84" y1="152" x2="286" y2="152" marker-end="url(#cmA)" style="stroke:var(--dim)"/>
<path d="M286 166H90V163L84 171L90 179V176H286Z" style="fill:var(--date);fill-opacity:.3;stroke:var(--date)"/>
<text x="188" y="174" text-anchor="middle" font-size="9" style="fill:var(--fg)">full JSON · holidays</text>
<rect x="76" y="212" width="8" height="44" rx="2" style="fill:var(--accent);opacity:.55"/>
<text x="20" y="236" font-size="10" style="fill:var(--dim)">#3</text>
<text x="185" y="216" text-anchor="middle" font-size="9.5" style="fill:var(--soft)">find_cahier_journal</text>
<line x1="84" y1="222" x2="286" y2="222" marker-end="url(#cmA)" style="stroke:var(--dim)"/>
<path d="M286 236H90V233L84 241L90 249V246H286Z" style="fill:var(--date);fill-opacity:.3;stroke:var(--date)"/>
<text x="188" y="244" text-anchor="middle" font-size="9" style="fill:var(--fg)">full JSON · journal entries</text>
<rect x="20" y="272" width="320" height="32" rx="6" stroke-dasharray="4 3" style="fill:var(--panel);stroke:var(--accent)"/>
<text x="180" y="292" text-anchor="middle" font-size="10" style="fill:var(--fg)">model counts in its head: 22? 23?</text>
<text x="180" y="332" text-anchor="middle" font-size="9.5" style="fill:var(--dim)">one model call per step, each waits for the last</text>
<text x="20" y="354" font-size="9.5" style="fill:var(--soft)">what the model reads</text>
<rect x="20" y="362" width="320" height="10" rx="3" style="fill:none;stroke:var(--line)"/>
<rect x="20" y="362" width="300" height="10" rx="3" style="fill:var(--date);opacity:.7"/>
</svg>
<svg viewBox="0 0 360 390" role="img" aria-label="Code mode: one script goes to the sandbox, which calls the tools many times inside our API; the raw JSON stays there and only a small result comes back to the model" style="flex:1 1 300px;max-width:440px;height:auto;font-family:var(--font-mono)">
<defs><marker id="cmB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--dim)"/></marker><marker id="cmC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--accent)"/></marker></defs>
<text x="180" y="18" text-anchor="middle" font-size="13" font-weight="600" style="fill:var(--fg)">Code mode</text>
<rect x="128" y="96" width="228" height="150" rx="8" style="fill:var(--panel);stroke:var(--line)"/>
<text x="242" y="238" text-anchor="middle" font-size="9" style="fill:var(--dim)">inside our API · no model call</text>
<rect x="10" y="32" width="80" height="26" rx="6" style="fill:none;stroke:var(--accent)"/><text x="50" y="49" text-anchor="middle" font-size="11" style="fill:var(--fg)">Model</text>
<rect x="140" y="32" width="80" height="26" rx="6" style="fill:none;stroke:var(--date)"/><text x="180" y="49" text-anchor="middle" font-size="11" style="fill:var(--fg)">Sandbox</text>
<rect x="270" y="32" width="80" height="26" rx="6" style="fill:none;stroke:var(--dim)"/><text x="310" y="49" text-anchor="middle" font-size="11" style="fill:var(--fg)">Tools</text>
<line x1="50" y1="58" x2="50" y2="320" stroke-dasharray="3 3" style="stroke:var(--line)"/><line x1="180" y1="58" x2="180" y2="320" stroke-dasharray="3 3" style="stroke:var(--line)"/><line x1="310" y1="58" x2="310" y2="320" stroke-dasharray="3 3" style="stroke:var(--line)"/>
<rect x="46" y="70" width="8" height="20" rx="2" style="fill:var(--accent);opacity:.55"/>
<text x="20" y="96" font-size="10" style="fill:var(--dim)">#1</text>
<text x="115" y="76" text-anchor="middle" font-size="9.5" style="fill:var(--soft)">script, ~20 lines</text>
<line x1="54" y1="82" x2="176" y2="82" marker-end="url(#cmC)" style="stroke:var(--accent)"/>
<rect x="176" y="100" width="8" height="98" rx="2" style="fill:var(--date);opacity:.55"/>
<text x="246" y="110" text-anchor="middle" font-size="9" style="fill:var(--soft)">teetsh.find_*()</text>
<line x1="184" y1="116" x2="306" y2="116" marker-end="url(#cmB)" style="stroke:var(--dim)"/>
<path d="M306 122H190V120L184 126L190 132V130H306Z" style="fill:var(--date);fill-opacity:.3;stroke:var(--date)"/>
<line x1="184" y1="148" x2="306" y2="148" marker-end="url(#cmB)" style="stroke:var(--dim)"/>
<path d="M306 154H190V152L184 158L190 164V162H306Z" style="fill:var(--date);fill-opacity:.3;stroke:var(--date)"/>
<line x1="184" y1="180" x2="306" y2="180" marker-end="url(#cmB)" style="stroke:var(--dim)"/>
<path d="M306 186H190V184L184 190L190 196V194H306Z" style="fill:var(--date);fill-opacity:.3;stroke:var(--date)"/>
<text x="246" y="216" text-anchor="middle" font-size="9" style="fill:var(--fg)">loops, filters, counts here</text>
<text x="20" y="276" font-size="10" style="fill:var(--dim)">#2</text>
<text x="115" y="258" text-anchor="middle" font-size="9.5" style="fill:var(--fg)">{ sessions: 22, hours: 22 }</text>
<line x1="176" y1="266" x2="54" y2="266" marker-end="url(#cmC)" stroke-width="1.5" style="stroke:var(--accent)"/>
<rect x="46" y="262" width="8" height="20" rx="2" style="fill:var(--accent);opacity:.55"/>
<rect x="20" y="288" width="320" height="22" rx="6" style="fill:var(--panel);stroke:var(--line)"/>
<text x="180" y="303" text-anchor="middle" font-size="10" style="fill:var(--fg)">exact, the model just presents it</text>
<text x="180" y="332" text-anchor="middle" font-size="9.5" style="fill:var(--dim)">the raw JSON never leaves the sandbox</text>
<text x="20" y="354" font-size="9.5" style="fill:var(--soft)">what the model reads</text>
<rect x="20" y="362" width="320" height="10" rx="3" style="fill:none;stroke:var(--line)"/>
<rect x="20" y="362" width="36" height="10" rx="3" style="fill:var(--date);opacity:.7"/>
</svg>
</div>
<figcaption style="text-align:center;font-size:.8rem;color:var(--dim);margin-top:.75rem">Same question, two ways. Classic: every tool result goes through the model. Code mode: the script does the trips, only the answer comes back.</figcaption>
</figure>

## How it's built

The whole thing is one new tool, `run_script`, and it lives inside our Go API process:

- **Sandbox:** QuickJS (quickjs-ng) compiled to WebAssembly, run by wazero. Pure Go, no cgo, no new service, a few milliseconds to start.
- **Nothing to reach:** no network, no file system, no env. The only way out is our own tool functions, and the teacher's identity and school are bound by the server before the script starts.
- **Hard caps:** 15 s of CPU, 64 MB of memory, 50 tool calls, 20 KB of result.
- **Writes, carefully:** reads are open, writes are declared up front and capped, and deletes are never run in a script. They stop and wait for the teacher's approval, like before.
- **Helpers:** the school calendar (periods, holidays, school days) is available in the script, so the model doesn't reinvent date maths.
- **Observability:** every script, every inner call, its result and duration are stored and replayable in our admin.

Wasm is what makes this cheap. Not long ago, "run code the LLM wrote, safely, in your API" meant containers, microVMs or a whole new service. Today it's a Go library and a pinned `.wasm` file.

## Yo dawg

Code is great at counting, but bad at meaning. Ask "which of my lessons this year were about water?" and a script searching for "eau" will happily pick up the phonics lesson on the *au / eau* sound. No regex can tell those apart.

So scripts can call a model too. `teetsh.ai.classify` sends up to 100 short texts to a small, cheap classifier and gets a label back for each one, and `teetsh.ai.check` asks a yes/no question about each. The script loops, the small model judges each item, the code counts, and the agent only reads the total.

<figure class="cm-yodawg" style="margin:2rem 0">
<svg viewBox="0 0 640 420" role="img" aria-label="Four nested boxes: code (our Go API) runs an LLM (the agent model), which writes code (the script), which calls an LLM (a small classifier)" style="width:100%;height:auto;font-family:var(--font-mono)">
<text x="320" y="32" text-anchor="middle" font-size="21" font-weight="700" style="fill:var(--fg);font-family:var(--font-display);letter-spacing:.5px">YO DAWG, WE HEARD YOU LIKE CODE AND LLMS</text>
<rect x="20" y="52" width="600" height="314" rx="16" style="fill:var(--panel);stroke:var(--date);stroke-width:2"/>
<text x="40" y="78" font-size="12" style="fill:var(--fg)"><tspan font-weight="700" style="fill:var(--date)">CODE</tspan> · our Go API</text>
<rect x="48" y="92" width="544" height="260" rx="13" style="fill:var(--bg);stroke:var(--accent);stroke-width:2"/>
<text x="68" y="118" font-size="12" style="fill:var(--fg)"><tspan font-weight="700" style="fill:var(--accent)">LLM</tspan> · the agent model</text>
<rect x="76" y="132" width="488" height="206" rx="10" style="fill:var(--panel);stroke:var(--date);stroke-width:2"/>
<text x="96" y="158" font-size="12" style="fill:var(--fg)"><tspan font-weight="700" style="fill:var(--date)">CODE</tspan> · the script it writes</text>
<text x="96" y="184" font-size="11" style="fill:var(--soft)">await teetsh.ai.classify({ items, labels })</text>
<rect x="104" y="202" width="432" height="122" rx="8" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:2"/>
<text x="124" y="228" font-size="12" style="fill:var(--fg)"><tspan font-weight="700" style="fill:var(--accent)">LLM</tspan> · a small classifier</text>
<text x="124" y="256" font-size="11" style="fill:var(--soft)">"Le cycle de l'eau"</text><text x="320" y="256" font-size="11" style="fill:var(--fg)">→ water</text>
<text x="124" y="278" font-size="11" style="fill:var(--soft)">"Ne pas gaspiller l'eau"</text><text x="320" y="278" font-size="11" style="fill:var(--fg)">→ water</text>
<text x="124" y="300" font-size="11" style="fill:var(--soft)">"Le son au / eau"</text><text x="320" y="300" font-size="11" style="fill:var(--fg)">→ other</text>
<text x="320" y="400" text-anchor="middle" font-size="15" font-weight="600" style="fill:var(--fg);font-family:var(--font-display)">so our code runs an LLM that writes code that calls an LLM</text>
</svg>
</figure>

On the bench, the "meaning" cases went from 44 % to 67 % strict success, at a third of the cost per case. In prod the agent hasn't reached for it yet, so for now this one is a bench story.

## What it changed

On our bench (45 cases written for code mode, 5 runs each, same day, only the flag differs):

- **+15.6 points** of strict success (66.8 % → 82.3 %)
- **−38 %** cost per case
- Calendar questions went from 66 % to 96 %, bulk writes from 70 % to 96 %

It's not magic, though. The model still sometimes mis-copies the script's numbers into its answer: the code says 35, the reply says 33. The maths is right now, but the rewording isn't always. And on short requests it doesn't help, a single tool call is still cheaper than a script. In prod the agent only reaches for it in about one conversation out of five, which is about what you'd want.

## Data the model never sees

There's a side effect I like even more than the maths. Whatever stays inside the sandbox never reaches the model. A script can read 26 pupils' grades, compute who's struggling and on which skill, and return only what's needed.

For us, that matters. These are children's data. Our goal is simple to state: the LLM should never be able to recognise a pupil. Grades and averages can reach it, names, remarks, birth dates and health notes can't.

Code mode gives us the place to do that. Pupils come into the conversation as mentions, which the server turns into opaque tags. Tools hand the model tags instead of names, and anything sensitive is only readable from inside a script. The script can join, filter and count on the real data, and the model reasons on `élève_7f3a` without ever knowing who that is. The teacher still sees the real name in the app.

That part isn't shipped yet, we're building it now. But it's the reason I wanted the sandbox in our own process rather than in someone else's container.

## Six days later

We merged on November 6 and rolled out to 20 % of teachers on November 10. On November 12, Claude Code shipped [its own Code Mode](https://code.claude.com/docs/en/code-mode): Claude writes JavaScript that calls its tools. Same idea, almost the same shape.

I'm not claiming we beat Anthropic to anything. They had programmatic tool calling in their API a year ago. But I enjoyed the timing, because of what it says about how we can build now.

## Take the recipe, not the framework

The hosted version wasn't an option for us anyway. It runs in Anthropic's container, it isn't eligible for zero data retention (and these are pupils' data), and it only works with Claude, while we route to several models. Waiting for a framework to add it would have meant waiting for one that fits our Go harness, our scopes, our approval gate and our tracing.

So I didn't wait. I took the concept, the architecture everyone converged on and the gotchas they published, and built it into what we already had. The bridge reuses the exact dispatcher our agent already calls, with the same auth checks and the same traces.

That's the point I made in [Share the recipe, not the code](/blog/share-the-recipe-not-the-code/), from the other side. When code is cheap, what you want from others is the idea, the shape and the traps, not their package. A good write-up from Cloudflare or Anthropic was worth more to me than any SDK, because I could build it our way in a week.

Now it's just a matter of getting the idea, understanding the architecture, and going for it.
