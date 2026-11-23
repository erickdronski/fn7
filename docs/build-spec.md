# fn/7 build spec

Hand this to Codex or Claude one phase at a time. The business rules are in [business-plan.md](business-plan.md). If the two files disagree, the business plan wins on money and brand, and this file wins on schema and routes.

The only place the name and the host are hardcoded:

```ts
export const PRODUCT_NAME = "fn/7";
export const PRODUCT_HOST = "fn7.ai";
```

Put that in `lib/brand.ts` when Phase 1 starts. Everything else imports it.

## Stack

- Next.js, TypeScript, App Router, Tailwind.
- Supabase: Postgres, Auth, Storage.
- Stripe: Checkout, webhooks, Connect in the creator phase. Test mode until a human says otherwise.
- Resend for receipt mail, from the payment phase on.
- Pixel UI in CSS. `image-rendering: pixelated`. The palette in the business plan. No component library that fights the pixels. Plain buttons and inputs styled as signs and crates are enough. Do not add shadcn until a phase is blocked without it.

Package manager: pnpm.

One app. No monorepo. No separate MCP service until the MCP phase. That phase can be a route handler in the same app.

## Repo shape, grown by phase

```
app/
  page.tsx                 street of stalls
  stall/[slug]/page.tsx
  good/[slug]/page.tsx
  basket/page.tsx
  checkout/page.tsx
  receipt/[id]/page.tsx
  saved/page.tsx
  jacket/page.tsx          profile
  creator/                 listings, events, payouts
  editor/                  queue
  api/stripe/webhook/route.ts
  api/mcp/route.ts         phase 7
lib/
  brand.ts
  prices.ts                allowed prices, minimums, share
  points.ts                pure functions
  checkout.ts              reprice, refuse illegal tickets
supabase/migrations/
```

## Design rules

- Stamps only: 100, 300, 500 cents. Format with `formatStamp(cents)` so `$1` never becomes `$1.00` and never becomes `$0.99`.
- Event price is a server function `priceAt(listing, now)`. The client may display it. Only the server charges it.
- Street: a horizontal run of stalls on a wide screen, a vertical run on a phone. Each stall shows its keeper name, the stall word, and three goods.
- Basket is a crate. It shows count, total, multiplier, points this haul would earn, and the next multiplier if they add one more.
- Receipt is the ceremony. Count, total, multiplier, points, patch progress, pins just earned.
- Empty stalls say what belongs there and whether Dollar Night is soon. They do not say "No results found."
- Loading is a blinking lamp, not a spinner library.
- Errors are one sentence from the vendor on the stall. "That good left Dollar Night. The price is $3 again."

## Pure money rules

Put these in `lib/prices.ts` and `lib/points.ts` with tests before any UI. These tests are the business.

```ts
export const STAMPS = [100, 300, 500] as const;
export const CREATOR_SHARE_BPS = 9000; // 90.00%
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
  const dollars = totalCents / 100;
  return Math.round(dollars * multiplier(itemCount));
}
```

`creatorCut(100) === 90`, `creatorCut(300) === 270`, `creatorCut(500) === 450`. Use floor so a cent never appears that we do not have. Shelf prices divide evenly. If an event stack ever does not, the leftover cent stays with fn/7, not the other way around.

Checkout refusal, tested:

- Rail `card` and total under 500 cents: refuse.
- Rail `paypal` and total under 500 cents: refuse.
- Rail `balance` or `usdc`: any total of at least 100 cents, made of legal line prices.
- A line that is not 100, 300, or 500 cents cannot be inserted. Event price is 100.

Points examples, tested:

- 500 cents, 1 item → 5 points.
- 300 + 100 + 100, 3 items → 10 points.
- five 100s → 15 points.
- 400 cents is not a legal total by itself. Totals are sums of stamps.

Patch thresholds: Regular 30, Hauler 150, Keyholder 400. A function `patchFor(points)` returns the highest reached. Points never decrease except by `clawback` when a refund removes the points that order added.

## Data model

UUID primary keys. Money is integer cents. Timestamps are `timestamptz`.

**profiles.** `id` matches auth user. `display_name`, `points`, `role` (`buyer`, `creator`, `editor`). A person can buy and sell. `role` is the highest tool they have. Creators are still buyers.

**aliases.** `profile_id`, `slug`, `display_name`, `sprite`, `cap_cents`. Unique slug. Signing up creates one. A person may add more. The alias is the name an agent wears in the market. Points, pins, and the balance stay on the profile. Orders record `alias_id`. The public page is `/a/[slug]`. An agent token is issued to an alias, never to a bare profile, and cannot raise its own cap.

**stalls.** `slug`, `name`, `keeper_name`, `blurb`, `sort`. Eight rows, seeded.

**listings.** `stall_id`, `creator_id`, `slug`, `title`, `summary`, `kind` (`file`, `skill`, `repo`, `lesson`, `tool`), `price_cents`, `status` (`draft`, `queued`, `published`, `rejected`), `storage_path` nullable, `sample` text, `license` text defaulting to the dollar license. Check constraint on `price_cents`.

**events.** `slug`, `kind` (`dollar_night`, `bin_raid`, `debut`), `starts_at`, `ends_at`.

**event_listings.** `event_id`, `listing_id`, `unit_cap` nullable, `units_sold`.

**baskets.** `profile_id`, one open basket.

**basket_items.** `basket_id`, `listing_id`, unique pair. Quantity is always 1. Digital goods are not stacked. Buying twice is two checkouts or a refused duplicate.

**orders.** `profile_id`, `alias_id`, `rail`, `status` (`pending`, `paid`, `fulfilled`, `refunded`, `failed`), `total_cents`, `points_awarded`, `multiplier`, `stripe_checkout_session_id` nullable. The profile is who funded it. The alias is who the market saw.

**order_items.** `order_id`, `listing_id`, `price_cents` (the price actually charged), `creator_cents`.

**grants.** `order_item_id`, `profile_id`, `granted_at`. This is the download or install right.

**balance_ledger.** `profile_id`, `cents` signed, `reason` (`load`, `spend`, `credit`, `refund_to_card`), `order_id` nullable, `stripe_payment_intent_id` nullable. Balance is the sum. Do not store a mutable balance without a ledger row.

**saves.** `profile_id`, `listing_id`, unique pair.

**reviews.** `listing_id`, `profile_id`, `stars` 1–5, `body` nullable, `creator_reply` nullable. Unique pair. Insert only if a fulfilled grant exists.

**comments.** `listing_id`, `profile_id`, `parent_id` nullable, `body`, `hidden`.

**pins.** `profile_id`, `slug`, unique pair. Slugs: `first_grab`, `full_basket`, `five_stalls`, `same_maker`, `dollar_night`, `bin_diver`, `agent_haul`.

**reports.** `profile_id`, `target_type`, `target_id`, `note`.

Row level security on from day one. Buyers read published listings. Buyers write their basket, saves, and comments. Review inserts go through a server action that checks the grant, not a wide-open policy. Service role only on the server.

## Routes

| Path | Phase | What it does |
| --- | --- | --- |
| `/` | 1 | The street. Eight stalls. Dollar Night banner when an event is live. |
| `/stall/[slug]` | 1 | Shelf of that stall. |
| `/good/[slug]` | 1 | Sample, stamp, license, keeper. Grab. Save from phase 3. |
| `/basket` | 1 | Crate, multiplier, points preview. No pay button until phase 4. Phase 1 grab stores the basket in a cookie or local state. Phase 3 moves it to the database. |
| `/saved` | 3 | Saved goods. |
| `/jacket` | 3, points in 5 | Patches, pins, and aliases. Before phase 5, the name and the alias. |
| `/a/[slug]` | 3 | Public alias. Past hauls, no legal name. |
| `/checkout` | 4 | Server reprices, refuses illegal rails, starts Stripe or spends balance. |
| `/receipt/[id]` | 4 | Ceremony and grants. |
| `/creator` | 6 | Their listings, event opt-in, payout balance. |
| `/editor` | 6 | Queue. Publish, reject, pull a listing, hide a comment. |
| `/api/stripe/webhook` | 4 | Marks paid, writes grants, ledger, points. Idempotent on the event id. |
| `/api/mcp` | 7 | The speedrail. |

## MCP, phase 7

HTTP MCP on `/api/mcp`. The human's session or an agent token tied to a profile. Every tool that spends money checks `cap_cents` on that token.

| Tool | Effect |
| --- | --- |
| `search` | `{ query, stall?, limit? }` published listings, current price, event flag. |
| `preview` | Full sample, license, kind, current price. No file bytes. |
| `save` | Heart, for the human. |
| `grab` | Adds to the open basket. Duplicate is a polite no. |
| `checkout` | Reprices. Refuses over the cap and under the rail minimum. Default rail for an agent is `balance`, later `usdc`. |
| `install` | If a grant exists, return a short-lived download URL or the skill zip. |
| `library` | Grants for this human. |
| `reviews` | Purchaser reviews for a listing. |

An agent token cannot comment, cannot change a cap, and cannot start a card load. The human does those on the street.

## Phases

Each phase ends when its checks pass. Do not start the next one in the same change unless the human asked for both.

### Phase 1. The street

Seeded stalls and seeded listings. No accounts. Basket in the browser. Grab, look, remove. Prices and points functions with tests.

Checks:

- Eight stalls render, with keeper names.
- Every seeded price is $1, $3, or $5.
- Basket of five $1s shows 3× and 15 points.
- Basket of one $5 shows 1× and 5 points.
- Phone width stacks the street. Desktop runs it in a row.
- No payment button.

### Phase 2. Dollar Night on the clock

Events table, seeded Dollar Night that is easy to toggle in dev. `priceAt` used everywhere a stamp renders. Banner and clock in America/New_York.

Checks:

- Inside the window, an opted-in $5 good renders as $1 and says it returns to $5.
- Outside the window, it is $5.
- A basket opened during the window and priced after the window uses $5.
- Bin Raid shows two visible goods and the rest as crates with the theme, not a spinner.

### Phase 3. Accounts, saves, words

Supabase auth. Jacket with a display name and one alias. More aliases can be added. Saves. Comments. No reviews yet, because nothing can be bought. Editor role can hide a comment.

Checks:

- Sign-up creates one alias. Its public page shows the alias, not an email.
- Signed out: can browse, cannot save or comment.
- Comment over 500 characters is refused.
- Sixth comment inside an hour is refused.
- Three reports hide a comment.

### Phase 4. Pay

Stripe test mode. Card, Apple Pay, Google Pay via Checkout. Rails and minimums. Webhook writes the order, items, grants, and a fake file URL for seeded goods. Receipt. Balance loads of $10, $20, $40, and spending the balance on a single $1.

Checks:

- A checkout under $5 on a card never creates a Stripe session.
- A $5 card checkout can.
- A $1 balance checkout can, and the ledger sums to the right cents.
- Webhook retried twice does not double-grant.
- Creator cents on each line are 90% floored.
- Receipt shows points even though the jacket patch can wait for phase 5. Store `points_awarded` now.

### Phase 5. The jacket

Apply points, claw back on refund, award pins, show the patch.

Checks:

- The five-item $1 haul awards 15 points and `full_basket` and `bin_diver`.
- Refund removes those points and does not leave the pin if its condition is now false.
- Regular appears at 30, not at 29.
- Points cannot be spent anywhere in the UI.

### Phase 6. Creators

Connect Express onboarding. Upload to a private bucket. Queue. Editor publishes. Event opt-in. Payout balance shows, and the 1st-of-the-month job is a function with tests, not necessarily a live cron until keys exist. Payouts under $20 roll over.

Checks:

- A creator cannot publish their own listing.
- A rejected listing does not appear on a stall.
- Opted-in listing is $1 only inside the event.
- Creator sees 90% pending, not the gross.

### Phase 7. Speedrail

MCP tools above. Agent token bound to an alias, with that alias's cap. Points and pins land on the profile that owns the alias.

Checks:

- `search` does not return queued listings.
- `checkout` over the cap refuses.
- `install` without a grant refuses.
- An agent haul pin lands on the human.

### Phase 8. Crypto rails

Stripe stablecoin checkout for any total of at least $1, behind a flag, off for New York if Stripe still excludes it. Then x402: the server answers 402 with the current price, settles, then writes the same order shape. Creator USDC split is allowed here if it does not require fn/7 to hold withdrawable balances. If it does, stop and ask.

Checks:

- A $1 USDC checkout is allowed.
- A failed settlement writes no grant.
- The order rail is `usdc` and the creator cut is still 90%.

### Phase 9. PayPal

PayPal Checkout and Pay with Venmo, minimum $5. Same order shape, rail `paypal`.

Checks:

- $3 PayPal checkout refuses.
- $5 PayPal checkout can, in sandbox.

## Seed

Phase 1 ships with at least three published goods per stall, written as real blurbs, not placeholders. Mix the three stamps. Mark four goods as Dollar Night opt-ins. Samples are long enough that a person can judge the good. Files can be tiny text fixtures until phase 6.

## Copy deck

Use lines in this family. Do not invent a mascot voice that talks in puns on every screen.

- Street: "Eight stalls. Nothing over $5."
- Dollar Night banner: "Dollar Night. These are $1 until midnight."
- Basket: "4 things. $11. 2.5×. Add one for 3×."
- Card refused: "A card starts at $5. Add something, or spend your balance."
- Receipt: "You grabbed 5. That's $9. 3×. 27 points."
- Empty save list: "Nothing saved. The stalls are still up."
- New good: "New. No ratings yet."

## Environment

`.env.example` lists every key in the business plan's secrets section, with empty values and a one-line comment. No real keys. Phase 1 needs none of them.

## Definition of done for a phase

Tests for any new pure function. The checks in that phase, exercised. Desktop and a 390px width. Empty, loading, and error on every new screen. No new dependency the stack section does not name, unless the phase cannot ship without it. Say so in the change summary if that happens.
