---
title: "Layout is where design handoffs break"
description: "There's a specific moment in every design-to-dev handover where things fall apart. It's not the colors—we have tokens for that. It's not the components—we…"
publishedAt: 2025-12-12
linkedinUrl: https://www.linkedin.com/feed/update/urn:li:activity:7405335639992373248/
---

**Has Anyone Solved the Design-to-Dev Layout Handover**?

There's a specific moment in every design-to-dev handover where things fall apart.

It's not the colors—we have tokens for that. It's not the components—we have libraries for those. It's the **layout**.

Spacing. Structure. Flow. The way things relate to each other, respond to content, and adapt to context.

Layout is arguably more logical than visual, and yet I've never seen it clearly conveyed in a Figma file. I'm not saying designers don't think about it—I'm certain they do. But something gets lost in translation, every single time.

—

A Figma design is a snapshot. It says: "these two elements are 24px apart." What it doesn't say is **why**, or what should happen when conditions change.

Is that 24px gap fixed, or is it space-between because these items should spread? Is this sidebar always 280px, or does it shrink on smaller screens? Does this grid wrap? In what order? At what breakpoint?

Auto-layout helped somewhat—it's Figma's approximation of flexbox, forcing us to think in terms of direction, gap, and padding rather than absolute positioning. But it only captures some layout logic. It doesn't express grid behaviors, responsive conditions, or which constraints are hard versus soft.

—

**Design systems solved components, not composition**.

When a designer says "use the Button component," everyone knows what that means. The implementation exists. The variants are defined. The contract is clear.

But there's no equivalent for layout patterns. No shorthand for "sidebar layout where the nav is fixed and the main content scrolls." No token for "these cards fill available space but never go below 280px."

We systematized the nouns but not the grammar.

—

I don't have an answer. But I can describe what a solution would need to do:

**Capture intent, not just outcome**—a spec should say "these items distribute evenly" rather than showing five items that happen to be 80px apart.

**Express conditionality**—layouts respond to viewport size, content length, sibling count. A static mockup can't show this.

**Create shared vocabulary**—if we had named patterns the way we have "modal" or "dropdown," we could communicate layout decisions without reverse-engineering every frame.

—

I've been doing this for years and still don't have a reliable process.

Every project, I ask the designer: "What should happen here when...?" Every time, they have a clear answer—they just hadn't written it down, because there was nowhere to write it.

So this is less of an article and more of a call for help. If you've found something that works—layout patterns, better tooling, a different conversation—I'd genuinely like to know.

**Layout remains the gap that design systems haven't closed**.
