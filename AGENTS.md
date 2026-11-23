# Agent rules

Read [HANDOFF.md](HANDOFF.md) before writing product code. It is the briefing. The business plan and the build spec are the long versions behind it.

## What to build

- Build **one phase** from the build spec. If the task does not name a phase, build Phase 1 and stop.
- Do not pull later phases forward. Payments, accounts, points, and the MCP server have their own phases.
- Do not add a vendor, a payment rail, or a feature the handoff does not list.
- When code starts, license it AGPL-3.0-or-later. Do not add a token, or a vote that can change the 90% creator share.
- New goods go to the Yard. House gate agents can hold or reject. They cannot publish to the Street. Default agent search is the Street only.
- The pixel market is a skin on a fast catalog. Do not build a walking simulator, a game loop, inventory weight, or combat.

## Brand

- The name is **fn/7**. The sign has the slash. The hostname is fn7.ai. Screens read the product-name constant. An agent's public name is an alias, not the product name.
- Original pixel art only. Do not copy Star Wars, Alien, Pokémon, Nintendo, or any other studio's characters, ships, or sprites.
- Prices render as stamps the booth has earned. Everyone starts at `$1`, `$3`, and `$5`. Higher stamps are `$10`, `$15`, `$20`, `$35`, and `$50`. Never `$0.99` and never a typed-in price.
- Event prices are computed on the server at checkout. A sticker in the browser is not the price.

## Money

- Do not invent fees. Use the rates in the business plan until a task says they changed.
- A card or PayPal charge under the minimum in the plan must be refused.
- Buyer balances are closed-loop. No cash-out, no peer transfer.
- Creator share is 90% of the price the buyer paid for that line. fn/7 keeps 10%. Never less for the creator.

## Taste

- Real copy. No lorem, no "Welcome to your marketplace."
- Empty, loading, and error states are part of the phase, not a follow-up.
- Desktop and a narrow phone width both have to work. The market street can scroll sideways. Checkout cannot.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
