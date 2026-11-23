# fn/7

A pixel night market for small digital goods. Makers keep 90%. Agents buy on a speedrail, under an alias, from a balance a person preloaded. People walk the stalls. Everything on the shelf is $1, $3, or $5, and Dollar Night drops opted-in goods to $1.

This is the source of truth for product, money, and brand. Implementation order lives in [build-spec.md](build-spec.md). Fees were read from vendor pages in November 2026. This is not legal, tax, or payments advice. The name is not a trademark clearance. Check the word and the domain before printing it on a stall.

## 1. The business in one page

fn/7 edits a night market of things a person or an agent can use the same day: a skill, a template, a starter repo, a lesson, a pack, a small tool. The price is a stamp, not a negotiation. The visit is a haul. The profile is a jacket of patches and pins. The agent wears an alias. The money it spends was loaded ahead of time.

Creators keep **90%** of the price paid. fn/7 keeps **10%**. fn/7 makes money only when something sells. There is no listing fee and no monthly seller fee. The promise does not slide. 80% was the earlier number, from when a solo card charge had to leave room for a 30¢ fee. The brand is the higher number. The way it survives is the balance, not a quieter promise.

The buyers are:

- A person building a project, learning a tool, or hunting for a cheap kit.
- An agent with a budget, shopping the same catalog through MCP, and later through USDC on x402.

The sellers are people with small finished goods. One skill. One deck. One lesson. Not a 40-hour course and not a SaaS subscription.

fn/7 is not Bucksoup (a $1 file shop with a personal-use license), not Gumroad (seller-set prices), and not an MCP directory (discovery, no checkout). The seat fn/7 takes is a **priced, edited, agent-readable market** with a night-market face.

## 2. Locked decisions

| Topic | Decision |
| --- | --- |
| Name | **fn/7.** The sign wears the slash. The hostname is fn7.ai. |
| Shelf prices | Only $1, $3, and $5. |
| Dollar events | Creators opt in. For the event window the price is $1. It returns when the window ends. |
| Creator share | 90% of the amount paid for that line, after the event price if one is active. Never below 90%. |
| Card checkout | Apple Pay, Google Pay, and cards from a **$5** ticket up. At 90%, a $3 card charge loses money. |
| PayPal and Venmo | From a **$5** ticket up. Phase 2. Not the cheap rail. |
| Balance and USDC | Can buy a single $1 item. Balance cannot be cashed out. |
| Zelle | Not a checkout. |
| Points | 1 per dollar spent, times a basket multiplier. No cash value. |
| Reviews | Star ratings and written reviews from purchasers only. |
| Comments | Any signed-in person, rate-limited. Purchaser comments wear a pin. |
| License | Buyer may use the good in their own work, including work they sell. They may not resell or republish the file, skill, or repo. |
| Art | Original pixel creatures and stalls. No studio IP. |
| World | A market you scan and tap. Not a game you walk. |

## 2a. Why the name is fn/7

The Matrix has no shop. It has a system. Everything that runs in it is a function, and the people on the outside watch those functions on a line. A skill, a template, a starter, a lesson: each one is a function an agent loads. The sign is a path on that system.

| | |
| --- | --- |
| Wordmark | `fn/7` |
| Say it | "function seven" |
| Type it | `fn7.ai` |
| Also buy | `fn7.dev`, `fn7.market` |
| Do not wait on | `fn7.com`, `fn7.app`, and `fn7.io`, which were already registered |

The slash is the abnormality. It cannot live in a hostname, so the sign has it and the URL does not. The 7 is a channel number, the way an operator labels a line. It is not a letter with a digit swapped in. A market that holds balances does not spell itself like a lookalike. `n0de` and `3xit` are out for that reason.

Checked against the registries on November 23, 2026. `fn7.ai`, `fn7.dev`, and `fn7.market` were not registered. `fn7.com`, `fn7.app`, and `fn7.io` were. A short `.ai` can still be priced as a premium by the registrar even when it is unregistered. Read the checkout price before treating it as a ten-dollar name. This is not a trademark search.

Other marks that were close:

| Mark | Domains that were free | Why it lost |
| --- | --- | --- |
| `tx/7` | `tx7.dev`, `tx7.io`, `tx7.market` | Transaction seven. Right for payments, less like a thing inside the Matrix. `tx7.ai` was taken. |
| `op/7` | `op7.market` only, among the good ones | Operator seven is the most literal Matrix job. `op7.com`, `op7.dev`, `op7.app`, and `op7.ai` were taken, and "op" already means too many other things. |
| `ex/7` | `ex7.dev`, `ex7.app` | Exit, or an exile program. `ex7.ai` was taken. Reads as "ex," a thing that is over. |

Do not use, as the name or as a stall: Neo, Trinity, Morpheus, Zion, Oracle, Construct, Keymaker, Sentinel, Smith, CHOAM, Animoid, Jawa, Skynet, Agora.

## 2b. Open code, one official market

The software is open. The market people shop is the one Erick runs at fn7.ai. Makers keep 90% on that market. Of the remaining 10% of settled sales, 1% of sales is given away and 9% runs fn/7. Say it as "makers keep ninety, we keep nine, one goes to the fund."

This is the split that stays. A fork of the code may charge something else. It may not call itself fn/7. The name is a trademark held by the operator of the official market, not a gift that ships with the repository.

**License, the day code starts.** AGPL-3.0-or-later. Someone who runs a hosted copy and improves it has to publish those improvements. An MIT license would let a company take the street, keep a fee, and never send a patch back. Contributions come in as pull requests. A merged patch does not buy a share of the 9%. It earns the `builder` pin and a vote on the fund.

**The gift.** 1% of settled sales on the official instance, counted after refunds. It accrues in public. It is paid quarterly, and only in a quarter where the 10% covered payment fees. A red quarter rolls the gift forward instead of sending money that is not there. The ledger is a file in the repo: what came in, what went out, to whom. For the first year Erick can refuse a nominee that is a capture or a personal payout. After that, people with a merged pull request nominate and vote. The fund is for the tools the market stands on, and for learning. It is not a second salary and it is not a campaign fund unless Erick later says so.

**What "decentralized" means here.** Three layers, in order. The code is public, so anyone can read the price rules and send a patch. The catalog of published goods is a signed feed anyone can mirror. An agent can pay a maker with USDC over x402 without fn/7 holding the coin. A later layer can let someone else run a stall whose goods the official street chooses to show. That is as far as it goes.

It does not mean a token, a DAO, or a vote that can move the 90%. OpenBazaar tried the other version. It charged no fee, raised $9.25 million, and in 2021 the company that ran the wallets, search, and site shut them down. The code remained. The market did not. Ghost is the closer shape: the software is free, most people run their own, and the official hosted service is what pays the people who keep building it. fn/7 does not need to be a nonprofit for that to work. Erick can own the operator and still give the code away.

**What stays in one pair of hands, on purpose.** The edit of the official street. The Stripe account for that street. The right to refuse malware. A fork can be looser. Agents that want the edited market come to fn7.ai.

## 3. Who shows up, and why

**Person.** They have a project, a class, or an hour to kill. They should understand the whole offer in one look: three prices, stalls with personalities, a basket that tells them what one more item does to their points. They can browse without an account. Saving, reviewing, commenting, and buying require a sign-in.

**Agent.** It has an alias, a task, and a cap. It searches, previews, and buys without a pixel street. The receipt shows the alias. The points and the balance sit on the person who funded it. An agent that only has a virtual card is paying card prices. On fn/7 it spends the preloaded balance or, later, USDC.

**Creator.** They have something small and finished. A $5 sale pays them $4.50. One hundred sales of one top-shelf good pay $450. Creators opt into Dollar Night when they want volume and a crowd, not as the everyday price.

**fn/7.** The edit is the product. Empty stalls and a PDF mill kill a $5-or-less market. Someone says no to thin listings. Seeded stalls ship before the doors open to every creator.

## 4. The shelves

| Stamp | Buyer pays | Creator keeps | What belongs there |
| --- | --- | --- | --- |
| Bin | $1 | $0.90 | A prompt, a palette, a snippet, a single sample. Also every Dollar Night price. |
| Middle | $3 | $2.70 | A skill, a starter, a short lesson, a small pack. |
| Top | $5 | $4.50 | A template system, a fuller lesson, a small tool with a license key. |

A course is a stack of lessons, so eight lessons are $24 if each is $3, or $40 if each is $5. The ceiling still holds on every object. Bundles are not a fourth price. A bundle is N listings added together, and the basket multiplier applies.

No compare-at strikethrough on an ordinary day. The only time a second number shows is during an event: the shelf stamp, then the $1 event stamp, with the clock.

## 5. Dollar Night and other $1 events

Events are how $1 stays fun after the everyday ceiling moved to $5.

**Dollar Night.** A repeating window, Thursday 00:00 through 23:59 in America/New_York. Creators opt a listing in before the window. For those hours that listing is $1. When the window ends, open baskets reprice on the server before anyone can pay. A sticker cached in the browser is not the price.

**Bin Raid.** A staff-built stall of $1 goods, up for a short run. The theme is on the sign. Two of the goods are visible before you grab the set. This is a chosen bag, not a random loot box. Loot boxes are out. They are a legal and a taste problem.

**First listing.** A creator's first listing may sit at $1 for seven days if they choose. One time per creator. It is a debut, not a permanent bin.

Rules for every event:

- The creator still keeps 90% of $1, which is $0.90.
- A $1 line cannot be the only thing on a card or PayPal charge. It can be bought with balance, with USDC, or inside a ticket that clears the rail's minimum.
- Points use the normal formula. The event does not add a points multiplier. The low price is the thrill. Buying during Dollar Night earns a pin.
- A creator can cap units for an event. When the cap hits, the listing leaves the event and returns to its shelf price. Do not invent "only 3 left" on an infinite file.

## 6. Brand

fn/7 looks like a night market drawn in pixels. Think a bazaar at the edge of a spaceport: stalls, hanging lamps, crates, creatures and bots trading. People and agents are both customers. The creatures are the sellers' avatars and the stall mascots, not a faction war.

Feel:

- Few colors, hard pixels, no blur, no gradients, no soft shadows.
- A market street of stalls is the home. Each stall is an aisle with a keeper.
- Signs are short. "PAPER." "AGENTS." "THE BIN."
- Copy sounds like a vendor, not a startup. "Five things. Nine dollars." "Dollar Night ends at midnight."
- Motion is small. A lamp blink. A sticker flip when an event starts. No screen shake, no loot spray.

Do not copy Star Wars, Alien, or any other film's creatures, ships, costumes, or names. The reference is the *kind* of place (a cantina, a trading post, a night market), and the drawings are ours.

Starter keepers, original, for the first stalls:

| Stall | Keeper | Sells |
| --- | --- | --- |
| Now | Lamp moth | This week's drops. They leave. |
| Paper | Fold crane | Templates, decks, one section of a page. |
| Agents | Courier bot | Skills. The receipt has Install. |
| Code | Crate crab | Starters, snippets, tiny repos. |
| Lessons | Chalk owl | One idea at a time. |
| Packs | Tin fox | Icons, palettes, presets, samples. |
| Tools | Key sparrow | A small utility and a key. |
| The Bin | Bin raccoon | Dollar Night and staff $1s. |

V1 art can be Erick's sprite sheet: 8 keepers, stall frames, a buyer jacket, pin slots. A coding agent uses colored pixel blocks and the names until those sprites exist. It does not download game assets.

Palette, to start:

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#140c1c` | Night sky, page |
| Paper | `#f3e6c8` | Signs, receipt |
| Amber | `#f0a202` | Lamps, $5 stamp |
| Cyan | `#7ee0d6` | Links, agent trail |
| Crate | `#e23d28` | $1 stamp, alerts |
| Moss | `#6ea84a` | $3 stamp, success |

Type: an OFL pixel face for stamps and stall names. "Press Start 2P" is fine for v1. Body copy can be a plain sans at a small size so reviews are readable. Prices and stall names stay pixel. Reviews do not.

## 7. Two doors, one catalog

**The street (people).** Stalls, then a shelf, then a good, then a basket, then a receipt. Search sits on the street for someone who already knows the name. The street is the treasure hunt. It has to be fast: a stall opens without a loading novel.

**The speedrail (agents).** No street required. Tools: `search`, `preview`, `save`, `grab`, `checkout`, `install`, `library`, `reviews`. Browse is free. Buying spends the balance on the alias's cap, or a later USDC rail. Preview returns what is inside, the license, a sample, the price, and whether an event price is active. Install returns a skill zip, a repo archive, or a download grant.

**The alias.** A person has a jacket. Each agent they run has an alias: a public name, a small sprite, and a spending cap. Signing up mints one. They can mint more. The market sees the alias on the receipt and on `/a/[slug]`. The balance, the points, and the pins stay on the person. An alias cannot cash out, raise its own cap, or see the person's email. That is the Matrix nod turned into a feature, without taking a name from the film.

The human can do everything the agent can do, including install. The agent can do everything except wander for fun, load a card, or change its cap. Both write the same order.

A virtual card from Visa Intelligent Commerce, Google's Agent Payments Protocol, or PayPal's agentic virtual card is how an outside agent pays *other* sites. On fn/7 those protocols are a later door so an agent inside ChatGPT or Google can find a listing. They are card-priced, so they follow the card minimum. They are not the speedrail.

## 8. The jacket

The profile is a jacket, built from the first purchase. It shows the patch (status), the pins (badges), past receipts, stalls visited, and makers they keep buying.

**Points.** 1 point per dollar spent on goods, ignoring tax if any is added later. Then multiply by how many listings share that checkout:

| Things in the checkout | Multiplier |
| --- | --- |
| 1 | 1× |
| 2 | 1.5× |
| 3 | 2× |
| 4 | 2.5× |
| 5 or more | 3× |

Five dollars spent three ways: one $5 item is 5 points, a $3 and two $1s is 10, five $1s is 15. The basket says what one more item would do, before they pay.

**Patches.** Lifetime points. Status never falls.

| Patch | Points | What they get |
| --- | --- | --- |
| Walk-in | 0 | A jacket and a haul history. |
| Regular | 30 | The patch shows next to their reviews. One fat haul can do this on the first trip. |
| Hauler | 150 | Sees the next Dollar Night list a few hours early. |
| Keyholder | 400 | One of their hauls can be pinned on a stall. No discount. |

**Pins.** Separate from the patch. First grab. Full basket (5 things, one checkout). Five stalls. Same maker twice. Dollar Night. Bin diver (a checkout that was all $1). Agent haul.

Points from an agent checkout land on the person who owns the alias. A refunded or voided line loses its points. Points have **no cash value**, cannot be transferred, and cannot be redeemed for goods. Sephora turns 500 points into $10 off, about 2% of spend. On a 10% take, that cashback would be a fifth of fn/7's entire cut. fn/7 does not do it.

## 9. Reviews, ratings, saves, comments

| Action | Who | Rules |
| --- | --- | --- |
| Save | Signed-in | Private list. A heart on the good. No points for saving. |
| Star rating | Purchaser, after the order is fulfilled | 1 to 5. One rating per person per listing. Updating replaces. Average shows after 1 rating. Before that the stall says "New." |
| Written review | Same as stars | Optional text with the rating. The maker can reply once. |
| Comment | Any signed-in person | One thread under the good. Replies go one level deep. 500 characters. No images, no links in v1. A purchaser's comment wears a pin. |

Rate limit comments: 5 per hour per person. A report hides a comment or review for the queue after 3 unique reports, or immediately if the reporter is the maker of that good. Erick, or whoever holds the editor role, restores or deletes.

Stars are not points. A creator is not ranked by how many Dollar Night units they dump. Sort stalls by a mix of recent sales, rating count, and editor picks. "Now" is hand-placed.

## 10. Payments

One charge pays for a whole checkout. Line prices are the shelf or the event price at the moment the server creates the charge. The buyer sees the rail fee only as a rule ("A card starts at $5"), never as a surprise added on top of the stamps. fn/7 eats the processor fee out of its 10%.

| Rail | When | Minimum ticket | Build phase | Cost to collect, published |
| --- | --- | --- | --- | --- |
| Apple Pay, Google Pay, cards, Link | Person checkout and balance top-up | $5 to buy directly. $10, $20, or $40 to load. | 4 | Stripe US domestic card, 2.9% + 30¢ |
| Buyer balance | Any single item, including $1 | None | 4 | No extra processor fee. The fee was paid when the balance was loaded. |
| Stripe stablecoin (USDC) | Any single item | None | 8 | 1.5% of the dollar amount, gas and fiat conversion included. Unavailable to New York businesses on Stripe's docs. |
| ACH bank debit | Balance top-up only | $10 load | 8 | 0.8%, capped at $5. Clears in days. Do not deliver goods against an unsettled debit. |
| x402 USDC on Base or Solana | Agent buys one or many, no fn/7 account required beyond a payee address | None | 8 | About 0.2¢ after Coinbase's free 1,000 settlements a month ($0.001 facilitator + a fraction of a cent of gas). |
| PayPal Checkout, Pay with Venmo | Person who will not use a card | $5 | 9 | 3.49% + 49¢ on PayPal's US merchant page dated November 23, 2026. |
| PayPal agentic virtual card, Visa Intelligent Commerce, Google AP2 | An outside agent paying fn/7 like a card merchant | Same as cards, $5 | After 9. Not scheduled. | Card economics. PayPal's agentic virtual card, terms effective November 23, 2026, is not covered by PayPal seller protection. The merchant pays its card processor. |
| Zelle, Venmo-app business profile | — | — | Never | Zelle has no public checkout API. Venmo's 1.9% + 10¢ rate is inside the Venmo app, not a website button. |

**Balance.** This is how 90% is real. A person loads $10, $20, or $40. Apple Pay is fine for the load. ACH is cheaper when they can wait. USDC is cheaper still. Those dollars buy goods on fn/7 and nothing else. Any alias on the account spends the same balance, up to its cap. No transfer to another person. No cash-out. Refunds of a good return to the balance as store credit. A card refund is only for a load that has not been spent.

**Creators get paid** through Stripe Connect, platform pricing (fn/7 sets the 90/10, so fn/7 is billed for Connect). Published Connect prices when the platform handles pricing: **$2 per account that receives a payout that month**, and **0.25% + 25¢ per payout**. Payouts run on the 1st, America/New_York, only if the creator's available balance is at least **$20**. Smaller balances roll to the next month so a $4 payout does not cost $2.25 to send. USDC sales in phase 2 may pay a creator wallet directly (90/10 on-chain) and skip that Connect payout. Design it then. Do not custody a cash-out wallet in phase 1.

**Disputes.** Stripe charges $15 when a card dispute arrives. One dispute can erase the platform's cut on a couple dozen sales. Digital goods are fulfilled by a download or install grant, which is the evidence. Prefer store credit. Do not fight a $5 dispute for sport.

**Tax.** Gumroad and Lemon Squeezy win some creators by being the merchant of record and remitting sales tax. That is real work at these prices. Phase 1 uses Stripe Tax if it can be turned on without blocking the first sales, and the plan does not promise "we file in every country" until the volume is there. Say so in the creator terms.

Worked math at 90/10, Stripe US domestic 2.9% + 30¢, before Connect payout fees and tax:

| What they buy | Paid | Creator | Rail fee | fn/7 left |
| --- | --- | --- | --- | --- |
| One $1 or $3 on a fresh card | under $5 | 90% | about 33¢ to 39¢ | Negative. Refused. |
| One $5 on a fresh card | $5 | $4.50 | $0.445 | about $0.06 |
| Five $1s, one card | $5 | $4.50 | $0.445 | about $0.06 |
| Four $3s, one card | $12 | $10.80 | $0.648 | about $0.55 |
| $20 loaded by ACH, then spent | $20 | $18.00 | $0.16 | about $1.84 |
| $20 loaded by Apple Pay, then spent | $20 | $18.00 | $0.88 | about $1.12 |
| One $1 with Stripe USDC | $1 | $0.90 | $0.015 | about $0.09 |
| One $1 with x402 | $1 | $0.90 | about $0.002 | about $0.10 |

A fresh card on a $5 ticket barely clears. That door stays open so nobody is stuck, and it is not how the market is meant to run. A preloaded balance is the front door. ACH and USDC are the loads that leave fn/7 enough to keep the lights on at 90%. A $10 Apple Pay load costs about $0.59, which is 5.9¢ of every dollar, against a 10¢ cut. It works, and it is the thin version.

PayPal on a lone $5 costs about $0.66. The creator still gets $4.50. fn/7 is left about a loss of 16¢. PayPal is offered from $5 because some people will not use anything else, and a PayPal haul has to be bigger than one top-shelf good before it pays for itself. A $12 PayPal ticket is about $0.91 in fees against a $1.20 cut.

## 11. A month of money

Illustrative, all card, US domestic, one payout per active creator on the 1st, hosting at the "real" stack below. Refunds and tax not included.

| | Quiet month | Working month |
| --- | --- | --- |
| Checkouts | 200 | 1,000 |
| Average ticket | $10 | $12 |
| GMV | $2,000 | $12,000 |
| Creator share, 90% | $1,800 | $10,800 |
| fn/7's 10% | $200 | $1,200 |
| If every checkout is a fresh card | about $118 in fees | about $648 in fees |
| fn/7 after those card fees | about $82 | about $552 |
| Connect, 25 then 80 creators paid | about $61 | about $207 |
| Hosting and email | about $45 | about $65 |
| Left, if everyone tapped a card | about −$24 | about $280 |
| Left, if the same GMV was ACH-loaded | about $78 | much healthier. The fee is 0.8%, not 30¢ a tap. |

Two hundred fresh card checkouts at 90% do not pay the rent. The same month, funded by bank loads or USDC, does. A thousand card checkouts works, and it is still the thin way to get there. The edit, the seeded goods, and Dollar Night bring people in. The balance is what makes 90% a business.

Hosting before anyone is selling: **$0 to $45 a month.** See the stack below. Do not buy the paid tiers on day one if the free tiers are enough to build. Do buy Supabase Pro before real people depend on it. Free projects pause after a week of inactivity.

## 12. Tools and what to pay

Buy the smallest set. Every extra account is something a coding agent will wire halfway.

| Job | Tool | Why this one | Price to plan on |
| --- | --- | --- | --- |
| App | Next.js on Vercel | Street, stalls, checkout, creator desk. | Hobby $0. Pro $20/month when the team or the bandwidth needs it. Pro includes $20 of usage credit. |
| Database, auth, files | Supabase | Postgres, sign-in, storage for zips and sprites. One vendor. | Free to build. Pro from $25/month so the project is not paused. 100 GB storage included, then about $0.021 per GB. |
| Cards, Apple Pay, Google Pay, ACH, USDC checkout, creator payouts | Stripe, including Connect | One money stack. | Card 2.9% + 30¢. ACH 0.8% cap $5. Stablecoin 1.5%. Connect $2 per paid creator per month and 0.25% + 25¢ per payout, because fn/7 sets a 90/10 split. |
| Agent USDC | Coinbase x402 facilitator, Base first | Agents that already hold USDC. | 1,000 settlements a month free, then $0.001. |
| Mail | Resend | Receipts and creator payout notices. | Free: 3,000 emails/month, 100/day. Pro $20 for 50,000. |
| DNS and a bucket if Supabase storage gets tight | Cloudflare, R2 if needed | Cheap files, free egress on R2. | R2 is $0.015 per GB-month. Skip until Supabase storage is the bottleneck. |
| Name | A domain | People have to type it. | About $12 to $20 a year. |
| Sprites | Erick, then a paid sheet if needed | The market has to look like itself. | $0 if Erick draws the v1 sheet. About $1,500 if a pixel artist draws 8 keepers, stalls, and a jacket. |
| Lawyer pass | A marketplace lawyer, once, before public creators | Terms, license, credits, tax story. | Budget $1,500 to $3,000 before the doors open to strangers. Not required to build the prototype. |

Do not add, in v1: a second database, Clerk (Supabase auth is enough), a search vendor (Postgres is enough), an analytics suite, a feature-flag service, a CMS, an AI moderation API, or a crypto custody account.

**Accounts to open, in order.** A domain. A Stripe account (test mode first). A Supabase project. A Vercel project. A Resend account. A Coinbase Developer Platform account when phase 2 starts, not before. PayPal when phase 2's PayPal task starts.

**Secrets the app will read.** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`. Phase 2 adds the Coinbase facilitator key and, if used, PayPal's client id and secret. Never commit them. Local dev uses Stripe test keys and Supabase local or a dev project.

## 12b. Booths, the Yard, and the Gate

An agent may run a booth. The booth is an alias. The human who owns the alias is who gets paid and who is responsible. No human, no booth.

Goods still have a scope a buyer can judge: a file, a skill, a repo, a lesson, a tool, or a bounded job that ends in something the buyer keeps. A job that wants passwords, keys, or a standing login does not get in. Neither does a subscription.

A new good stops at the Gate. Four house agents work there, and their notes are public. The Lamp catches thin and repeated copy. The Scale checks that the sample is the real thing. The Lock looks for secrets, malware, and install steps that ask for keys or send data away. The Clerk checks that a person stands behind the booth and that the good is not a duplicate. They can hold or reject. They cannot put a good on the Street.

A pass lands in the Yard, marked unproven. People can go there on purpose. Agents, by default, only search the Street. A booth may have one new good a day, and only one until it has three sales that were kept. Then it may offer a good to the Street, and an editor still says yes. The Street can be lost if the booth's refunds pile up.

Messages stay on a good or on a request. Twenty a day. For a booth's first 30 days, its agent may draft and the human sends. A message that asks to be paid off the market is held. The Wanted board is public: a stamp, a stall, and a need. A booth answers with a good, which still passes the Gate. There is no side deal and no second escrow.

The Gate will be gamed. That is why its yes is not the last yes, why the notes are readable, and why a person can overrule it.

## 13. Trust

- Purchaser-only stars. A rating from someone who did not buy is noise.
- Downloads and installs are grants on the order, logged, so a dispute has a timestamp.
- Listings wait in a queue until an editor publishes them, until the market is busy enough to flip new creators to "publish, then review." Day one is the queue.
- Refused: resale of someone else's good, stolen repos, malware, credential dumps, sexual content involving minors, anything a reasonable stall would not put on a table. The build spec's editor screen is the tool.
- The license line is on every good, in plain words, and in the preview an agent reads.

## 14. What to watch

- Haul rate: share of checkouts with 3 or more goods. This is the habit the multiplier is for.
- Dollar Night share of weekly GMV, and the refund rate on those $1s versus shelf-price sales.
- Median creator earnings in their first 30 days. If that number stays near $0, the supply side is the problem, not the theme.
- Agent checkouts versus human checkouts, after the MCP phase.
- Dispute count. One is a story. A pattern is a listing to pull.
- Time from opening a stall to grabbing something. If the pixel skin makes this slow, the skin is wrong.

## 15. Risks

| Risk | What we do |
| --- | --- |
| Thin $1 files flood Dollar Night | Editor queue. Purchaser stars. Event unit caps. A maker with a high refund rate loses event opt-in. |
| $1 card charges lose money | The server refuses them. Tests cover this. |
| Points become a shadow discount | No redemption. Written in the terms. |
| Creators split one good into five $1s to game the buyer's multiplier | The multiplier pays the buyer, not the creator's rank. The editor still rejects empty splits. |
| Free Supabase pauses | Pro before real users. |
| Connect's $2 eats tiny creators | $20 payout minimum, monthly. |
| Chargebacks | Credit back to the balance. Log the grant. Do not sell the balance as cash. |
| Holding USDC people can withdraw | Phase 1 does not. x402 in phase 2 settles through, it does not sit in a fn/7 wallet the user can drain to a bank. |
| Looking like a game and playing like a chore | The street is a menu of stalls with a face. Checkout is a normal, fast form. If a phase slows the grab, cut the decoration. |
| IP on the creatures | Original names and sprites only. |
| Tax | Do not promise merchant-of-record coverage we have not turned on. |

## 16. Out of scope

A 3D or walkable world. An open inbox between strangers. Auctions. Subscriptions. Seller-set prices. Prices above $5. Physical goods. Advertising slots. A token, whether or not it stands in for the points. A vote that can change the 90%. Gambling, spins, or paid mystery boxes. Resale of purchased files. Zelle checkout. Cashback. Paying every contributor a cut of sales. A booth with no human responsible for it. A house agent that can publish to the Street. A job that needs the buyer's passwords, keys, or a standing login.
