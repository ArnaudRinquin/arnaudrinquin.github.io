---
title: "Not reading the code is nothing new"
description: "I had mixed feelings about this reality: half ashamed, half amazed. Then it clicked: this is nothing new. We all did it, long before AI. And I am at peace…"
publishedAt: 2026-07-01
linkedinUrl: https://www.linkedin.com/feed/update/urn:li:activity:7478078155547783168/
---

I was discussing with Valere Tetelin how I had delivered a multi-month project (Teetsh's AI agent, now in beta and reaaaaallly powerful) without even looking at the code.

I had mixed feelings about this reality: half ashamed, half amazed.

Then it clicked: this is nothing new. We all did it, long before AI. And I am at peace with it now.

Let me explain.

Assuming you have a powerful and tightly-built coding harness (that's a big assumption, but we've invested a lot in that direction, I encourage you to do so until you trust it to produce good enough code without micromanagement - just like an employed human developer, really) - you can trust that code quality and general architecture follow directions you set once, up front. The harness (and dogfooding) is everything here.

So all you do is give direction, set requirements and steer from a distance. Features or whole systems get developed without looking at the code. Pieces of your architecture become blackboxes. You know their capabilities, you defined important requirements, you reviewed the plans - but the details underneath are unknown to you, and honestly, unimportant.

Now back to "nothing new".

We've trusted black boxes for decades: libraries and packages. 99.9999% of the open-source code I use is a black box. Sure a few nerds actually read the source, but I must be honest and confess I barely ever did. You check its API, check the output - rest is implementation detail everyone is happy to ignore. As long as it works and produces what you need.

I am pretty sure badly-coded libraries have served us just fine in the past and will continue to do so.

"no look AI generated code" is the same thing. You know the surface, it produces what you asked for.

We've reached a point where "implementation detail" genuinely exists and stops burning your precious brain juice. Damn good deal.

It's actually better than OSS, because you can shape the surface of the blackbox however you like. New feature needed? Well you don't need to wait. Just ask for it. Won't be perfect maybe, but it will match your true needs.

Risky you say? Sure, which is exactly why it's on us to set the right tests and stay in real control of the outcome. The blackbox output has to be tightly watched (for the agent I built, observability is absolutely critical).

The shame is gone, good riddance. This process is now something I embrace and find liberating.

How about you? Can you keep your eyes closed on the PR diffs? Did you find your peace of mind about using AI, or does it still feel like shameful cheating?
