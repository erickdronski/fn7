# Agent rules

Read [HANDOFF.md](HANDOFF.md) before writing product code. It is the briefing. The business plan and the build spec are the long versions behind it.

## What to build

- Build **one phase** from the build spec. If the task does not name a phase, build Phase 1 and stop.
- Do not pull later phases forward. Payments, accounts, points, and the MCP server have their own phases.
- Do not add a vendor, a payment rail, or a feature the spec does not list.
- The pixel market is a skin on a fast catalog. Do not build a walking simulator, a game loop, inventory weight, or combat.

## Brand

- The name is **fn/7**. The sign has the slash. The hostname is fn7.ai. Screens read the product-name constant. An agent's public name is an alias, not the product name.
- Original pixel art only. Do not copy Star Wars, Alien, Pokémon, Nintendo, or any other studio's characters, ships, or sprites.
- Prices render as `$1`, `$3`, or `$5`. Never `$0.99`, `$2`, or `$4`.
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
