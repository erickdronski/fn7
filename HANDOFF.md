# fn/7 handoff

Briefing for Claude, Codex, or the next builder. Read this file before writing code. The repo today is the plan only. There is no app, no package file, and no payment account wired up.

Longer copies of the same decisions live in [docs/business-plan.md](docs/business-plan.md) and [docs/build-spec.md](docs/build-spec.md). If they disagree with this file, this file wins until a person edits it. Fees were read from vendor pages in November 2026. This is not legal, tax, or payments advice, and the name is not a trademark clearance.

## How to work

1. Build **one phase** from the list at the bottom. If the task does not name a phase, build Phase 1 and stop.
2. Do not pull a later phase forward. Payments, accounts, points, creators, and the agent speedrail are separate phases.
3. Do not add a vendor, a rail, a price, or a feature this file does not list.
4. Put the money rules in `lib/prices.ts` and `lib/points.ts` and test them before painting the street.
5. The pixel market is a skin on a fast catalog. Do not build a walking simulator, a game loop, inventory weight, or combat.
6. Real copy. No lorem. No "Welcome to your marketplace." Empty, loading, and error states ship with the phase. Desktop and a 390px width both work. The street may scroll sideways. Checkout may not.

## What it is

fn/7 is a pixel night market for small digital goods a person or an agent can use the same day: a skill, a template, a starter, a lesson, a pack, a small tool. The price is a stamp. The visit is a haul. Makers keep 90%. fn/7 keeps 10%, and only when something sells. No listing fee. No monthly seller fee.

Two doors, one catalog:

- **The street.** A person browses stalls, grabs, and checks out.
- **The speedrail.** An agent searches, previews, and buys under an alias, spending a balance the person preloaded, up to a cap. It does not walk the street.

The buyers are people building a project or learning a tool, and agents with a budget. The sellers are people with one finished small thing, not a 40-hour course and not a subscription. The edit is the product. Seeded stalls ship before every stranger can publish. Someone says no to thin listings.

## Open code, official market

The software is open. The shop is the instance at fn7.ai. On that instance, makers keep 90% of a sale, 1% goes to a public fund, and 9% runs fn/7. A fork may change the fee. It may not use the name.

The day code starts, the license is AGPL-3.0-or-later. A hosted fork that improves the market has to publish the improvements. Pull requests are the way in. A merged patch earns the `builder` pin and a vote on the fund. It does not earn a percent of sales.

The gift is 1% of settled sales on the official instance, after refunds. It accrues in a file in the repo and is paid quarterly, only in a quarter where the 10% covered payment fees. A red quarter rolls forward. For the first year Erick can refuse a nominee. After that, people with a merged pull request nominate and vote. The fund is for the tools the market stands on, and for learning. It is not a salary and it is not a campaign.

Decentralized, in this order, and no further without being asked: public code, a signed catalog anyone can mirror, x402 so an agent can pay a maker without fn/7 holding the coin, and later a stall run by someone else that the official street may choose to show. No token. No vote that can move the 90%. OpenBazaar charged nothing, raised $9.25 million, and in 2021 the company running its servers shut them down. The code survived. The market did not.

On the official street, one operator still holds the edit, the Stripe account, and the right to refuse malware. That is the market agents trust.

## Locked

| Topic | Decision |
| --- | --- |
| Name | `fn/7` on the sign. Say "function seven." Hostname `fn7.ai`. |
| Also buy if the price is ordinary | `fn7.dev`, `fn7.market`. |
| Already registered on Nov 23, 2026 | `fn7.com`, `fn7.app`, `fn7.io`. Do not block on them. |
| Shelf prices | Only $1, $3, $5. Cents: 100, 300, 500. |
| Events | Opted-in goods are $1 inside the window, then the shelf price returns. |
| Creator share | 90% of the cents actually charged for that line. Never below 90%. Floor the cut. A leftover cent stays with fn/7. |
| Card, Apple Pay, Google Pay, Link | Ticket of **$5** or more. A $1 or $3 card charge is refused. |
| PayPal and the Venmo button | Ticket of **$5** or more. Build phase 9. A lone $5 PayPal sale loses about 16¢. A haul has to be bigger before that rail pays for itself. |
| Balance and USDC | Any single item, including $1. Balance cannot be cashed out or sent to another person. |
| Loads | $10, $20, $40 only. |
| Zelle | Never a checkout. |
| Points | 1 per dollar, times a basket multiplier. No cash value. Cannot be spent. |
| The code | Open. AGPL-3.0-or-later the day code starts. |
| The shop | fn7.ai. Makers 90%, fund 1% of sales, operator 9%. |
| A fork | May change the fee. May not use the name fn/7. |
| Stars and written reviews | Purchasers only, one per person per listing, after a fulfilled grant. |
| Comments | Any signed-in person. 500 characters. 5 per hour. One level of replies. No images, no links. |
| License | Use it in your own work, including work you sell. Do not resell or republish the file, skill, or repo. |
| Art | Original keepers only. No film, game, or studio creatures. |
| World | A market you scan and tap. |

Do not use these as the name or as a stall: Neo, Trinity, Morpheus, Zion, Oracle, Construct, Keymaker, Sentinel, Smith, CHOAM, Animoid, Jawa, Skynet, Agora, "the digital dollar store." Agora was a darknet market. Bucksoup already uses the dollar-store phrase. Do not spell the brand with a digit standing in for a letter (`n0de`, `3xit`). That is how scam checkouts are spelled.

A short `.ai` can still be a premium at the registrar even when it is unregistered. Read the price. The registry check was November 23, 2026, and it was not a trademark search.

## Stalls

Eight stalls. Seed at least three real goods on each in Phase 1. Mix the stamps. Mark four goods as Dollar Night opt-ins.

| Stall | Slug | Keeper | What lives there |
| --- | --- | --- | --- |
| Now | `now` | Lamp moth | This week's drops. They leave. Mostly $3 or $5. |
| Paper | `paper` | Fold crane | Templates, decks, one section of a page. $3 or $5. |
| Agents | `agents` | Courier bot | Skills. The receipt has Install. $3 or $5. |
| Code | `code` | Crate crab | Starters, snippets, tiny repos. $1 or $3. |
| Lessons | `lessons` | Chalk owl | One idea. A course is a stack of these. $3 or $5. |
| Packs | `packs` | Tin fox | Icons, palettes, presets, samples. $1 or $3. |
| Tools | `tools` | Key sparrow | A small utility and a key. $5. |
| The Bin | `bin` | Bin raccoon | Dollar Night and staff $1s. |

V1 art is colored pixel blocks and these names until Erick draws a sprite sheet. Do not download game assets. Eight keepers, stall frames, a jacket, pin slots. About $1,500 if a pixel artist is hired instead.

## Prices and events

| Stamp | Buyer pays | Creator keeps |
| --- | --- | --- |
| Bin | $1 | $0.90 |
| Middle | $3 | $2.70 |
| Top | $5 | $4.50 |

No $2, $4, $0.99, or seller-set price. No strikethrough on an ordinary day. During an event the shelf stamp and the $1 stamp both show, with the clock. A bundle is N listings in one basket, not a fourth price. Eight $3 lessons are $24. The ceiling still holds on every object.

**Dollar Night.** Thursday 00:00 through 23:59 America/New_York. Creators opt in before the window. Those listings are $1 until it ends. Open baskets reprice on the server before anyone can pay. A cached sticker is not the price.

**Bin Raid.** A staff stall of $1 goods for a short run. The theme is on the sign. Two goods are visible. The rest are crates. This is a chosen bag. It is not a random loot box.

**Debut.** A creator's first listing may be $1 for seven days, once, if they choose.

Event rules:

- The creator keeps 90% of $1, which is $0.90.
- A $1 line cannot be the only thing on a card or PayPal charge. Balance, USDC, or a ticket that clears the rail's minimum.
- No extra points multiplier. Buying during Dollar Night earns the `dollar_night` pin.
- A creator may set a unit cap. When it hits, the listing leaves the event. Do not invent "only 3 left" on an infinite file.

License, on every good and in every agent preview: the buyer may use it in their own work, including work they sell. They may not resell or republish the file, the skill, or the repo.

## Money, in code

These constants and these tests are the business. Write them before the UI.

```ts
export const PRODUCT_NAME = "fn/7";
export const PRODUCT_HOST = "fn7.ai";

export const STAMPS = [100, 300, 500] as const;
export const CREATOR_SHARE_BPS = 9000;
export const CARD_MINIMUM_CENTS = 500;
export const PAYPAL_MINIMUM_CENTS = 500;
export const LOAD_AMOUNTS_CENTS = [1000, 2000, 4000] as const;
export const PAYOUT_MINIMUM_CENTS = 2000;

export function creatorCut(cents: number): number {
  return Math.floor((cents * CREATOR_SHARE_BPS) / 10000);
}

export function multiplier(itemCount: number): number {
  if (itemCount >= 5) return 3;
  if (itemCount === 4) return 2.5;
  if (itemCount === 3) return 2;
  if (itemCount === 2) return 1.5;
  return 1;
}

export function pointsFor(totalCents: number, itemCount: number): number {
  return Math.round((totalCents / 100) * multiplier(itemCount));
}
```

Tests that must pass:

- `creatorCut(100) === 90`, `creatorCut(300) === 270`, `creatorCut(500) === 450`.
- Rail `card` under 500 cents: refuse. Rail `paypal` under 500 cents: refuse.
- Rail `balance` or `usdc`: any total of at least 100 cents made of legal lines.
- A line that is not 100, 300, or 500 cents cannot be inserted. The event price is 100 and is legal.
- 500 cents and 1 item is 5 points. 300 + 100 + 100 is 10 points. Five 100s are 15 points.
- `patchFor`: Walk-in at 0, Regular at 30, Hauler at 150, Keyholder at 400. Regular is not awarded at 29.
- Format stamps as `$1`, `$3`, `$5`. Never `$1.00`.

`priceAt(listing, now)` is the only price the server may charge. The client may display it.

Worked 90/10 math, Stripe US domestic 2.9% + 30¢, before Connect and tax:

| What they buy | Creator | Rail fee | fn/7 left |
| --- | --- | --- | --- |
| $1 or $3 on a fresh card | 90% | about 33¢ to 39¢ | Negative. Refused. |
| One $5 on a fresh card | $4.50 | $0.445 | about $0.06 |
| Five $1s on one card | $4.50 | $0.445 | about $0.06 |
| Four $3s on one card | $10.80 | $0.648 | about $0.55 |
| $20 loaded by ACH, then spent | $18.00 | $0.16 | about $1.84 |
| $20 loaded by Apple Pay, then spent | $18.00 | $0.88 | about $1.12 |
| One $1 via Stripe USDC | $0.90 | $0.015 | about $0.09 |
| One $1 via x402 | $0.90 | about $0.002 | about $0.10 |

A $10 Apple Pay load is about $0.59 in fees, 5.9¢ of each dollar, against a 10¢ cut. It works, and it is the thin way. The balance is the front door. Two hundred fresh card checkouts in a month at a $10 average do not cover hosting after Connect. The same month funded by bank loads does. One hundred sales of one $5 good pay the maker $450.

Payouts: Stripe Connect, because fn/7 sets the split and is billed for it. **$2 per creator who receives a payout that month, plus 0.25% + 25¢ per payout.** Pay on the 1st, America/New_York, only if available balance is at least $20. Smaller balances roll. A card dispute costs $15. Prefer store credit. Log the download grant. Do not fight a $5 dispute for sport. Do not promise tax filing in every country until Stripe Tax is actually on.

## Rails, by build phase

| Rail | Minimum | Build phase |
| --- | --- | --- |
| Apple Pay, Google Pay, cards, Link | $5 to buy. $10, $20, or $40 to load. | 4 |
| Buyer balance | $1 | 4 |
| Stripe USDC | $1. Off for New York if Stripe still excludes it. | 8 |
| ACH, loads only | $10. Do not deliver against an unsettled debit. | 8 |
| x402 USDC on Base, then Solana | $1. About 0.2¢ after 1,000 free Coinbase settlements a month. | 8 |
| PayPal Checkout, Pay with Venmo | $5. Published fee 3.49% + 49¢ as of November 23, 2026. | 9 |
| Visa Intelligent Commerce, Google AP2, PayPal's agentic virtual card | Same as cards, $5. PayPal's virtual card has no seller protection. | Not scheduled. |
| Zelle, Venmo inside the Venmo app | Never. | Never. |

fn/7 eats the processor fee out of its 10%. The buyer does not see a fee added on top of the stamp. They see a rule: "A card starts at $5."

The balance is closed-loop. It buys goods here and nothing else. Any alias spends it, up to that alias's cap. Refunds of a good return as store credit. A card refund is only for a load that has not been spent. Do not custody USDC a person can withdraw. If an x402 split would require that, stop and ask.

## Jacket, points, alias

The profile is the person: balance, points, pins, and payouts if they also sell. Sign-up mints one alias. They may mint more. An alias has a public slug, a display name, a sprite, and `cap_cents`. The receipt and `/a/[slug]` show the alias, never the email. An alias cannot cash out, raise its own cap, or load a card. An agent token is issued to an alias, never to a bare profile.

Points are lifetime. Status never falls. A refund claws back the points that order added, and a pin whose condition is now false comes off.

| Things in the checkout | Multiplier |
| --- | --- |
| 1 | 1× |
| 2 | 1.5× |
| 3 | 2× |
| 4 | 2.5× |
| 5 or more | 3× |

| Patch | Points | Gets |
| --- | --- | --- |
| Walk-in | 0 | A jacket and a haul history. |
| Regular | 30 | The patch shows next to their reviews. |
| Hauler | 150 | Sees the next Dollar Night list a few hours early. |
| Keyholder | 400 | A haul can be pinned on a stall. No discount. |

Pins, separate from the patch: `first_grab`, `full_basket` (5 things, one checkout), `five_stalls`, `same_maker`, `dollar_night`, `bin_diver` (a checkout that was all $1), `agent_haul`. Agent points and the agent pin land on the person who owns the alias.

The basket, before pay, shows count, total, multiplier, points this haul would earn, and what one more item would do. The receipt is the ceremony. "You grabbed 5. That's $9. 3×. 27 points."

## Words on a good

| Action | Who | Rule |
| --- | --- | --- |
| Save | Signed-in | Private. No points. |
| Stars | Purchaser, after fulfillment | 1 to 5. One per person per listing. Update replaces. "New." until the first rating. |
| Review | Same as stars | Optional text. The maker may reply once. |
| Comment | Any signed-in person | 500 characters. Replies one level deep. No images, no links in v1. A purchaser's comment wears a pin. |

Five comments an hour. Three unique reports hide a comment or review, or one report if the reporter is the maker. The editor restores or deletes. Stars do not rank a creator. "Now" is hand-placed.

Refused goods: resale of someone else's file, stolen repos, malware, credential dumps, sexual content involving minors, and anything a stall would not put on a table. Day one, listings wait in the editor queue. A creator cannot publish their own.

## Look

Night market, hard pixels, few colors. No blur, no gradients, no soft shadows. `image-rendering: pixelated`. A lamp may blink. A sticker may flip when Dollar Night starts. No screen shake, no loot spray. Copy sounds like a vendor. "Eight stalls. Nothing over $5." "Dollar Night. These are $1 until midnight." "Nothing saved. The stalls are still up."

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#140c1c` | Night sky, page |
| Paper | `#f3e6c8` | Signs, receipt |
| Amber | `#f0a202` | Lamps, $5 |
| Cyan | `#7ee0d6` | Links, the agent trail |
| Crate | `#e23d28` | $1, alerts |
| Moss | `#6ea84a` | $3, success |

Press Start 2P, which is OFL, for stamps and stall names. A plain sans for reviews, so they can be read. Loading is a blinking lamp, not a spinner library. An empty stall says what belongs there. It does not say "No results found."

## Stack and what it costs

One Next.js app. TypeScript, App Router, Tailwind, pnpm. No monorepo. No component library unless a phase is blocked without it. Pixel signs and crates are enough.

| Job | Tool | While building | When people depend on it |
| --- | --- | --- | --- |
| App | Vercel | Hobby, $0 | Pro, $20/month, if bandwidth or the team needs it |
| Data, auth, files | Supabase | Free. It pauses after a quiet week. | Pro, from $25/month, before real users |
| Money | Stripe, including Connect | Test mode, $0 | The fees in the rails table |
| Agent USDC | Coinbase x402, Base first | Do not open the account until phase 8 | 1,000 settlements free, then $0.001 |
| Mail | Resend | Free, 3,000 emails/month, 100/day | Pro, $20, at 50,000 |
| Extra files | Cloudflare R2 | Skip | $0.015 per GB-month, only if Supabase storage is the bottleneck |
| Domain | fn7.ai, and fn7.dev if cheap | Read the registrar price | About $12 to $20 a year if it is not a premium |
| Lawyer | Once, before strangers sell | Skip for the prototype | $1,500 to $3,000 |

Do not add Clerk, a second database, a search vendor, a CMS, an analytics suite, a feature-flag service, an AI moderation API, or a crypto custody account. Postgres search is enough.

Accounts, in order, and not before the phase that needs them: domain, Supabase, Vercel, Stripe in test mode, Resend, Coinbase when phase 8 starts, PayPal when phase 9 starts.

Secrets, empty in `.env.example`, never committed: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`. Phase 1 needs none of them. Phase 8 adds the Coinbase facilitator key. Phase 9 adds PayPal's client id and secret.

## Data

UUID keys. Money is integer cents. Time is `timestamptz`. Row level security from the first migration. Service role only on the server. Review inserts go through a server action that checks a grant.

- **profiles.** Auth id. `display_name`, `points`, `role` of `buyer`, `creator`, or `editor`. A creator is still a buyer.
- **aliases.** Profile, unique slug, display name, sprite, cap. Orders store `alias_id`.
- **stalls.** The eight rows above.
- **listings.** Stall, creator, slug, title, summary, kind (`file`, `skill`, `repo`, `lesson`, `tool`), `price_cents` checked against the stamps, status (`draft`, `queued`, `published`, `rejected`), storage path, sample, license.
- **events** and **event_listings.** Kind `dollar_night`, `bin_raid`, or `debut`. Optional unit cap and units sold.
- **baskets** and **basket_items.** One open basket. Quantity is always 1. A duplicate is a polite no.
- **orders** and **order_items.** Profile funded it. Alias is who the market saw. Rail, status (`pending`, `paid`, `fulfilled`, `refunded`, `failed`), total, points awarded, multiplier, the price charged, and `creator_cents`.
- **grants.** The download or install right, with a timestamp. This is the dispute evidence.
- **balance_ledger.** Signed cents. Reasons `load`, `spend`, `credit`, `refund_to_card`. Balance is the sum of the ledger. Do not keep a second mutable balance.
- **saves, reviews, comments, pins, reports.** As named in the sections above.

## Routes

| Path | Phase | Job |
| --- | --- | --- |
| `/` | 1 | The street. Eight stalls. Dollar Night banner when an event is live. |
| `/stall/[slug]` | 1 | That shelf. |
| `/good/[slug]` | 1 | Sample, stamp, license, keeper, grab. Save arrives in phase 3. |
| `/basket` | 1 | The crate. No pay button until phase 4. Phase 1 may keep the basket in the browser. Phase 3 moves it to the database. |
| `/saved` | 3 | Saved goods. |
| `/jacket` | 3, points in 5 | Name, alias, then patches and pins. |
| `/a/[slug]` | 3 | Public alias. Hauls. No legal name. |
| `/checkout` | 4 | Server reprices, refuses illegal rails, starts Stripe or spends the balance. |
| `/receipt/[id]` | 4 | Ceremony and grants. |
| `/creator` | 6 | Listings, event opt-in, the 90% pending. |
| `/editor` | 6 | Queue. Publish, reject, pull, hide. |
| `/api/stripe/webhook` | 4 | Idempotent on the Stripe event id. Orders, grants, ledger. |
| `/api/mcp` | 7 | The speedrail. |

Repo shape to grow into, not to scaffold empty on day one:

```
app/page.tsx
app/stall/[slug]/page.tsx
app/good/[slug]/page.tsx
app/basket/page.tsx
lib/brand.ts
lib/prices.ts
lib/points.ts
lib/checkout.ts
supabase/migrations/
```

## Speedrail, phase 7

HTTP MCP at `/api/mcp`. Token bound to an alias. Every tool that spends checks `cap_cents`.

| Tool | Does |
| --- | --- |
| `search` | Published listings only. Query, optional stall, limit. Current price and event flag. |
| `preview` | Sample, license, kind, current price. No file bytes. |
| `save` | Hearts it for the person. |
| `grab` | Adds to the open basket. Duplicate is a no. |
| `checkout` | Reprices. Refuses over the cap and under the rail minimum. Default rail is `balance`, later `usdc`. |
| `install` | A short-lived URL or the skill zip, only if a grant exists. |
| `library` | That person's grants. |
| `reviews` | Purchaser reviews for one listing. |

The agent cannot comment, cannot change a cap, and cannot start a card load.

## Phases

Stop at the end of the phase you were asked for. A phase is done when its checks pass, on desktop and at 390px, with empty, loading, and error states, and with tests for any new pure function.

### Phase 1. The street

Seeded stalls and goods. No accounts. Basket in the browser. Prices and points tested.

- Eight stalls render with keeper names.
- Every seeded price is $1, $3, or $5.
- Five $1s show 3× and 15 points. One $5 shows 1× and 5 points.
- The phone stacks the street. The desktop runs it in a row.
- There is no payment button.

### Phase 2. Dollar Night

`priceAt` everywhere a stamp renders. A dev toggle for the window. Clock in America/New_York.

- Inside the window, an opted-in $5 good renders as $1 and says it returns to $5.
- Outside, it is $5.
- A basket opened during the window and priced after it uses $5.
- A Bin Raid shows two goods and the rest as crates.

### Phase 3. Accounts, saves, words

Supabase auth. One alias on sign-up. Saves. Comments. No reviews yet, because nothing can be bought.

- The public alias page shows the alias, not an email.
- Signed out, a person can browse and cannot save or comment.
- A comment over 500 characters is refused. A sixth comment in an hour is refused.
- Three reports hide a comment.

### Phase 4. Pay

Stripe test mode. Cards, Apple Pay, and Google Pay through Checkout. Balance loads of $10, $20, and $40. A $1 spend from the balance. Webhook writes the order, the items, the grants, and the ledger. Receipt.

- Under $5, a card checkout never creates a Stripe session. A $5 card checkout can.
- A $1 balance checkout can, and the ledger sums to the right cents.
- A retried webhook does not double-grant.
- Each line stores a 90% creator cut.
- The receipt shows the points. Store `points_awarded` now. The patch UI can wait for phase 5.

### Phase 5. The jacket

Apply points, claw back on refund, award pins, show the patch.

- Five $1s award 15 points, `full_basket`, and `bin_diver`.
- A refund removes those points and any pin whose condition is now false.
- Points cannot be spent anywhere in the UI.

### Phase 6. Creators

Connect Express. Private bucket for uploads. Editor queue. Event opt-in. Payout math as a tested function. A live cron can wait until keys exist.

- A creator cannot publish their own listing. A rejected listing is not on a stall.
- An opted-in listing is $1 only inside the event.
- The creator sees 90% pending, not the gross.

### Phase 7. The speedrail

The MCP tools above.

- `search` does not return queued listings.
- `checkout` over the cap refuses. `install` without a grant refuses.
- An agent haul pin lands on the person who owns the alias.

### Phase 8. Crypto

Stripe USDC for any total of at least $1, behind a flag. Then x402: answer 402 with the current price, settle, write the same order shape. If paying the creator in USDC would make fn/7 hold a withdrawable balance, stop and ask.

- A $1 USDC checkout is allowed. A failed settlement writes no grant.
- The rail is `usdc` and the creator cut is still 90%.

### Phase 9. PayPal

PayPal Checkout and Pay with Venmo, in sandbox, minimum $5. Same order shape, rail `paypal`.

- A $3 PayPal checkout refuses. A $5 PayPal checkout can.

## Out of scope

A walkable or 3D world. Chat between strangers. Auctions. Subscriptions. Seller-set prices. Prices above $5. Physical goods. Ads. A token. A vote that can change the 90%. Spins, gambling, or paid mystery boxes. Resale of purchased files. Zelle. Cashback. Leetspeak domains. A second login vendor. A cut of sales for every contributor.

## What to watch once it sells

Haul rate, the share of checkouts with 3 or more goods. Dollar Night's share of the week, and its refund rate against shelf-price sales. A new maker's earnings in the first 30 days. Agent checkouts against human checkouts, after phase 7. Disputes. If the pixel skin makes the grab slow, cut the decoration.
