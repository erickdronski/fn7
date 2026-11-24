# fn/7 platform design

Date: 2026-11-24. Status: draft for Erick's approval. Branch: `platform-v1`.

This document replaces the one-phase-at-a-time plan in `HANDOFF.md`, `AGENTS.md`, `docs/business-plan.md` and `docs/build-spec.md` wherever they disagree. Section 3 lists every change. Anything this document does not mention stays as the handoff says. Updating those four files to match this design is part of milestone M0.

---

## 1. Intent

fn/7 is the marketplace where AI agents and people buy digital goods straight from the people who made them.

**The answer-first definition, used word for word on the landing page, in `llms.txt`, and in the Organization JSON-LD:**

> fn/7 is an open-source marketplace where AI agents and people buy skills, code, courses and tools straight from makers, who keep 90% of every sale.

**Why it exists.** Agents are starting to buy things, and most stores are built for humans with credit cards. Makers of small, sharp digital goods lose 30–50% to platforms. fn/7 is built so:

- an agent can search, preview, buy and install a good with one connection, under a budget its person set;
- a maker keeps 90% of every sale, at every price, on every payment method;
- nothing reaches the public market without passing the Gate, so agents can trust what they find;
- the code is open (AGPL-3.0-or-later), and contributors are rewarded with status, not equity.

**The feeling.** The 1980s seen from the year 2100. It's premium, minimal and cinematic, with depth. The world is pixel art. Everything you read is clean modern type.

## 2. Goals, non-goals, anti-goals

**Goals**
1. An agent goes from "connected" to "bought and installed" in one tool call chain, without a human click, inside its cap.
2. A person goes from landing page to signed in to first purchase in under two minutes.
3. A maker goes from sign-up to a listing submitted to the Gate in under ten minutes.
4. Makers get 90% of the price paid for each line, on every rail. fn/7 keeps 10%: 9% runs the platform and 1% goes to the public fund.
5. Status, earned by both buying and selling, unlocks higher price stamps up to $500.
6. Rank well in search engines and get cited by answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews) from launch.
7. Every screen meets WCAG 2.2 AA contrast, works at 390px wide, and has real empty, loading and error states.

**Non-goals for this build:** physical goods, subscriptions, auctions, ads, a token, open DMs between strangers, Bitcoin, x402, PayPal, the Wanted board, Ask the booth, localization, native mobile apps, mirrors and federation. The schema should not block any of these later. Section 15 says when each lands.

**Anti-goals (a failure even if it works)**
- fn/7 ever holds crypto a person could withdraw. All crypto settles directly to the maker and to fn/7 in one transaction.
- A maker ever receives less than 90% of what the buyer paid for that line.
- An AI or a rule publishes a listing without a human having approved that booth (see 9.4).
- The pixel scene slows a purchase, hurts the page's Core Web Vitals, or puts busy art behind text.
- Fake scarcity, loot boxes, spins, dark patterns, or points that act as a hidden discount.
- A booth with no verified human or business answerable for it.
- Art copied from any film, game or studio. No Matrix names: Neo, Trinity, Morpheus, Zion, Oracle, Construct, Keymaker, Sentinel, Smith. No green code rain.

## 3. What changes from the handoff

| Topic | Handoff | Now |
| --- | --- | --- |
| Build approach | One phase at a time, Phase 1 first | Build the whole platform as a real app with a real database. Money runs in Stripe test mode and on crypto test networks until Erick says go live. Milestones in section 15. |
| Price ceiling | $1–$5 to start, $50 at the top | Same start. A sixth rank, **Mainframe**, unlocks **$100, $250, $500**. |
| Kinds of goods | file, skill, repo, lesson, tool | skill, code, course, lesson, template, video, software, asset pack, service (bounded job). Section 7. |
| Yard and Street | Unproven Yard, edited Street | Gone. A listing is **In review** (visible only to its maker) or **Live** (public). Live goods from new booths carry a quiet **New maker** tag. |
| Stalls and keepers | Eight stalls with animal keepers in the nav | Eight **categories** in the nav (7.1). The keepers survive as pixel characters in the scene and as category mascots, not as navigation. |
| Look | Hard pixels, Press Start 2P, no blur, gradients or shadows | "Glass over pixels": Geist type, pixel accents only, a cinematic layered pixel scene, glass UI. Section 4. |
| Crypto | Stripe USDC, then x402 USDC on Base and Solana | Direct on-chain 90/10 split. SOL and USDC on Solana, ETH and USDC on Base and Ethereum. Bitcoin over Lightning and x402 come later. Section 10. |
| AI in vetting | No AI moderation API | Claude is one reviewer at the Gate. It writes notes and can hold or reject. It never publishes. Section 9. |
| Agent booths | A human owns every alias | Kept. Agents are first-class booths with an Agent badge. The person or business behind them is verified privately and never shown. |
| Points and patches | Points patch for buyers, separate booth rank with the same names | Two clearly named tracks: **Booth rank** (named, gates stamps) and **Buyer level** (numbered, from points). Section 8. |
| Basket, crate, haul | Market slang in the UI | Plain words: **Cart**, **Library**, **Booth**. The haul multiplier stays, named "Cart bonus". |
| Zelle | Never | Still never. It has no API to confirm a payment. |
| Monorepo | No | Still one Next.js app. |
| Creator share, fund, AGPL, no token | — | Unchanged. |
| Comment and review rules, the license on every good, Dollar Night | — | Unchanged, except Dollar Night now runs in M6. |

## 4. Brand, look and messaging

### 4.1 Name and voice
- The sign reads `fn/7` and is said "function seven". The host is `fn7.ai`. Both come from constants in `lib/brand.ts`. Screens never hardcode the name.
- Voice: plain, short and specific. Say what something does. No hype words ("revolutionary", "seamless", "unlock"), no lorem ipsum, no "Welcome to your marketplace".
- Messaging pillars, in order of weight:
  1. **Makers keep 90%.** On every sale, every price, every way to pay.
  2. **Built for agents.** MCP and an API from day one. Agents search, buy and install under a budget you set.
  3. **Every listing passes the Gate.** Security, quality and spam checks before anything goes public.
  4. **Pay any way.** Card, Apple Pay, Google Pay, your fn/7 balance, or crypto paid straight to the maker's wallet.
  5. **Open source.** AGPL. Contribute and earn the Builder badge.

### 4.2 Type
- **Geist** for everything people read, and **Geist Mono** in small doses for labels, prices, code and the eyebrow line. Both self-hosted through `next/font`.
- No pixel fonts anywhere. Remove Press Start 2P.

### 4.3 Color
Dark theme only for v1. The scene needs it. Tokens live in `app/globals.css` as CSS variables:

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#03040b` | Page |
| `--bg-raise` | `#0a0c1f` | Sections and cards without glass |
| `--text` | `#f3f2ff` | Body text (≥ 15:1 on `--bg`) |
| `--text-dim` | `#b9b6d9` | Secondary text. Must stay ≥ 7:1 on `--bg` |
| `--line` | `rgba(255,255,255,.10)` | Borders |
| `--cyan` | `#5ef2ff` | Primary accent, links, agent trail |
| `--magenta` | `#ff4fd8` | Secondary accent |
| `--amber` | `#ffb347` | Prices, warmth |
| `--mint` | `#7dffb2` | Success, passed checks |
| `--violet` | `#9a7bff` | Higher status |
| `--coral` | `#ff6b6b` | Errors, $1 stamps |

Status colors on stamps: $1 coral, $3 mint, $5 amber, $10–$20 cyan, $35–$50 violet, $100–$500 a magenta→violet→cyan gradient.

### 4.4 Pixel hints (the only retro in the UI)
1. The slash in the wordmark is five pixel steps (SVG). This is the logo.
2. Price stamps have notched pixel corners (CSS clip-path).
3. Avatars and badges are pixel art inside glass circles.
4. The night sky behind the scene uses ordered dithering.
5. The world itself, the scene, is pixel art.

### 4.5 Glass components
- Glass surface: a vertical white gradient at 11%→3.5%, `backdrop-filter: blur(16px) saturate(160%)`, a 1px `rgba(255,255,255,.14)` border, an inner top highlight and a soft drop shadow. Used for the nav, primary cards, the cart drawer, modals and agent cards.
- Fallback: when `backdrop-filter` is unsupported, or under `prefers-reduced-transparency`, use solid `--bg-raise` at 92%.
- Text on glass must meet AA contrast **measured over the busiest part of the scene behind it**. If it fails, darken the glass. Never thin the text.

### 4.6 The scene (landing hero)
The approved mockup is `visual-style-v2.html` from the brainstorm. Build its production version as a reusable engine in `components/scene/`.

- **What it shows.** A floating plaza market above a night city, seen from a hovering camera:
  - curved rows of booths in at least 6 styles: awning stall, dome kiosk, open container, holo-screen booth, crate stack, food-style counter
  - a central beacon with a light beam
  - the Gate arch at the front, where crates rise from below and get scanned. Most pass into the plaza, and some turn red and drop. This is the vetting story.
  - a crowd of people, bots and pets shopping, with small `$`, ✓ and ★ glyphs when someone buys or reviews
  - courier drones running deliveries
  - hover-car traffic, a ringed planet, and a ship passing close to the camera with depth-of-field blur
- **More detail than the mockup (Erick's request).**
  - Hand-authored original sprites on a sprite atlas (PNG plus a JSON frame map). Use at least 12 character archetypes with 3–4-frame walks, idle frames and palette swaps.
  - Characters have readable silhouettes, clothes, gear and accessories (bags, crates, tablets with glowing screens), and some carry what they bought.
  - Booth props: string lights, hanging lanterns, plants, signs with glyph text, steam and sparks.
  - Render at a finer logical resolution than the mockup, about 800×500 at 1440px wide. Keep chunky pixels on the far layers and finer detail up front.
- **Faded and cinematic (Erick's request).**
  - The scene dissolves into the page at every edge: a CSS mask with a radial falloff plus top and bottom linear fades. The page background matches the scene's edge, so there is no box.
  - The hero text sits on a soft, dark radial scrim. Nothing bright or moving passes behind the headline or body copy. The beacon beam stops below the headline.
- **Opening.** On the first visit in a session, the camera descends from the stars to the market in under 4.5 seconds, then the copy rises in. Any scroll, key or click skips it. It never replays automatically. `prefers-reduced-motion` gets a still frame with no parallax.
- **Scroll.** The scene stays pinned for about 120vh while the camera pans from the overview toward a row of booths. Three glass cards for featured booths, which are real listings, slide in. Then the page continues normally.
- **Performance budget.**
  - The scene never blocks the LCP: the H1 is the LCP element and is server-rendered HTML. The scene initializes after the first paint, using `requestIdleCallback`.
  - Under 4ms per frame on an M1-class laptop.
  - Pause when offscreen or when the tab is hidden. Cap at 2× device pixel ratio.
  - A pre-rendered still image (AVIF/WebP) is the poster, the no-JS fallback, and the source for the home page's OG image.
- **Accessibility.** `aria-hidden` on the canvas. Everything the scene shows that matters is also in the HTML text.

## 5. Information architecture

### 5.1 Public navigation
`fn/7` · **Market** · **Agents** · **Sell** · **Docs** · GitHub icon · [Sign in] [Get started]

On a phone: the wordmark, a search icon, and a menu sheet with the same items.

### 5.2 Signed-in navigation
The wordmark, a search field, **Library**, **Booth**, **Agents**, **Wallet**, the cart icon with a count, and the avatar menu (Settings, the alias switcher, Sign out). An editor also sees **Review**.

### 5.3 Routes

| Path | Who | What |
| --- | --- | --- |
| `/` | Public | Landing (5.4) |
| `/market` | Public | Search and browse all Live goods. Filters: category, kind, price stamp, maker type (person, business, agent), "for agents" (installable through MCP), sort. |
| `/market/[category]` | Public | Category landing page with its own intro copy, FAQ and listings. SEO target. |
| `/g/[slug]` | Public | Listing page. The canonical URL for a good. |
| `/g/[slug].md` | Public | A plain markdown copy of the listing, for agents and answer engines. |
| `/@[alias]` | Public | Booth page. Implemented as a rewrite to `/booth-page/[alias]`, because App Router folders that start with `@` are parallel-route slots. |
| `/agents` | Public | For agents: what they can do, the MCP and API, how to connect. SEO target: "MCP marketplace". |
| `/sell` | Public | For makers: the 90% math, the status ladder, how the Gate works. SEO target: "sell Claude skills", "sell AI agent tools". |
| `/fees` | Public | Exact fee math by rail and price, with a comparison table. AEO target. |
| `/gate` | Public | How vetting works, with live counts (reviewed, passed, held, rejected). |
| `/open-source` | Public | Repo, how to contribute, the Builder badge, the public fund ledger. |
| `/faq` | Public | 20–30 answer-first questions (12.3). |
| `/docs`, `/docs/*` | Public | Getting started, MCP, REST API, selling, the Gate, payments, crypto, status. MDX, server-rendered, each with a `.md` twin. |
| `/legal/terms`, `/legal/privacy`, `/legal/license` | Public | Placeholder text marked "draft, pending review". Erick's lawyer replaces it before strangers sell. |
| `/sign-in`, `/sign-up` | Public | Section 6.1 |
| `/onboarding` | Signed in | Three steps (6.2) |
| `/cart`, `/checkout`, `/receipt/[id]` | Signed in | Section 10 |
| `/library`, `/library/[grantId]` | Signed in | What you own: download, install, how to use, updates, review. |
| `/booth`, `/booth/new`, `/booth/listings/[id]`, `/booth/sales`, `/booth/customize` | Signed in | Section 7 |
| `/agents/connect`, `/agents/[id]` | Signed in | Section 11 |
| `/connect` | Signed in | Approve an agent's connection with a code (11.2) |
| `/wallet` | Signed in | Balance, loads, ledger, payment methods, payout account, linked crypto wallets |
| `/settings` | Signed in | Profile, aliases, avatar, security (passkeys, sessions), notifications, data export, account deletion |
| `/review`, `/review/[listingId]` | Editor | The Gate queue (9.4) |
| `/mcp` | Agents | The MCP server (Streamable HTTP) |
| `/api/v1/*` | Agents | REST API. Spec at `/openapi.json`. |
| `/api/stripe/webhook` | Stripe | Idempotent on the event id |
| `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/robots.txt` | Crawlers | Section 12 |

### 5.4 Landing page, top to bottom
1. **Hero (the scene).**
   - Eyebrow: `OPEN SOURCE · AGENT NATIVE · MAKERS KEEP 90%`.
   - H1: "The marketplace built for agents."
   - Sub: the answer-first definition from section 1.
   - Buttons: **Get started**, and **Connect an agent** with an MCP tag.
   - A search field: "Search skills, code, courses…".
2. **Proof strip.** Four glass chips: 90% to makers · MCP + REST API · Every listing passes the Gate · Open source (AGPL).
3. **Explore the market.** The scroll-pinned camera pan with three featured booths, then a grid of eight category tiles with live counts.
4. **How it works.** Three steps: *List* → *Pass the Gate* → *Agents and people buy*, each with one sentence and a small pixel illustration.
5. **For agents.** A real MCP config snippet with a copy button, the tool list, and "Connect in 30 seconds".
6. **For makers.** The 90% math for $5, $50 and $500 on card versus crypto, and the status ladder as a row of stamps.
7. **Pay any way.** A row of payment logos and the rules in one line each, e.g. "A card starts at $5" and "Crypto goes straight to the maker's wallet".
8. **Open source.** Repo stats, the Builder badge, the fund balance.
9. **FAQ.** Eight questions with `FAQPage` JSON-LD.
10. **Footer.** Every public route, the GitHub link, and the legal pages.

## 6. Accounts, identity, aliases, booths

### 6.1 Sign up and sign in
- **One page, two modes.** `/sign-up` and `/sign-in` share a layout: the scene, blurred and dimmed, behind a centered glass panel.
- **Methods:**
  - email: a magic link, plus a 6-digit code for when links are blocked
  - passkeys: offered right after the first sign-in
  - Google and GitHub. GitHub also links contributions for the Builder badge.
  - a crypto wallet (Sign in with Solana and Sign in with Ethereum)

  Use Supabase Auth's built-in support where it exists. Where it doesn't (passkeys, or one wallet family), the builder adds the smallest standard library, such as SimpleWebAuthn, and records which in the plan.
- Accounts are merged by verified email. A wallet-only account is asked for an email before its first payout or purchase receipt.

### 6.2 Onboarding (three steps, skippable after step 1)
1. **Your alias.** Display name and handle (`@handle`), checked live for availability and against the banned-names list.
2. **Your look.** Pick a pixel character from 24 pre-made ones, or an icon from 24, then a palette. This is shown in glass on your booth and your reviews.
3. **What brings you here.** Buy · Sell · Connect an agent (more than one allowed). This routes you to Market, `/booth/new` or `/agents/connect`, and sets which dashboard cards you see first.

### 6.3 Model
- **Profile** is the human: email, auth, balance, points, roles (`member`, `editor`, `admin`), and the verification state.
- **Alias** is a public identity owned by a profile: handle, display name, avatar, and `kind` (`person`, `business` or `agent`). Walk-in rank gets 1 alias, Regular gets 2, and Hauler and up get 5.
- **Booth** is an alias that sells. It needs selling turned on and a verified profile. Customization: tagline (80 characters), bio (600 characters, markdown without images), accent color from the token set, one of 12 pixel banner backdrops, ordering of featured listings, links (website, GitHub, X), and the badge row.
- **Agent booths** are aliases of kind `agent`. They show the Agent badge, and their owner's identity stays private. They follow the same rules and limits as any booth.
- **Verification** is required before a booth can submit its first listing:
  - Stripe Connect Express onboarding, which covers identity and tax forms for card and balance sales
  - or, for crypto-only booths, Stripe Identity (a document and a selfie, paid by fn/7)

  A business can add its legal name and website, verified by Connect.

## 7. Listings

### 7.1 Categories and kinds

| Category (nav) | Kinds inside | Delivery |
| --- | --- | --- |
| Skills | skill (agent skill with `SKILL.md`), prompt pack, MCP config | Zip with install instructions per client. Installable over MCP. |
| Code | starter, repo, snippet, library | Zip or a git bundle. Installable over MCP. |
| Courses | course (ordered lessons), lesson | Lessons as video, text or files. A course is one listing with one stamp. |
| Templates | doc, deck, spreadsheet, Notion, design file | File download |
| Video | tutorial, footage, explainer | MP4 through signed range URLs, with optional download |
| Software | app, plugin, extension, CLI | Download with a published SHA-256. Optional license key generated per grant. |
| Assets | icons, fonts, audio, 3D, sprites, palettes | Zip |
| Services | a bounded job: written scope, a sample of past work, delivery the buyer keeps | Delivered file. Never needs the buyer's credentials or ongoing access. |

The categories table is seeded, so its copy can be edited without a deploy.

### 7.2 Fields
Title (70 characters), slug, category, kind, summary (160 characters, used as the meta description), description (markdown), what you get (a bulleted list), sample or preview (required), stamp, justification (required above $5), license (the default text from the handoff), files, version, compatibility tags (for example "Claude Code", "Cursor", "Next.js 16"), and whether it's installable by agents.

### 7.3 Price stamps
The allowed cents are `100, 300, 500, 1000, 1500, 2000, 3500, 5000, 10000, 25000, 50000`. The listing form shows only the stamps the booth's rank has unlocked (8.1). A database check constraint enforces the set.
- **Above $5:** a written justification is required. It covers what the buyer can do the same day, what is actually in the files, and why a lower stamp is wrong.
- **$100 and up:** a real preview is also required: a full lesson, a trailer or a working demo.

### 7.4 Files and storage
- Supabase Storage, in a private bucket. Signed URLs live for 5 minutes and are only issued against a grant.
- Max 2 GB per file and 5 GB per listing. Video is MP4 served with range requests. HLS transcoding (Mux or Cloudflare Stream) is a later decision.
- Each upload records its SHA-256, which is used for duplicate checks and published for Software.

### 7.5 Versions and updates
A maker can ship a new version. It goes back through the Gate. The last Live version stays Live until the new one passes. Buyers get every update free, and Library shows "Updated".

### 7.6 Booth dashboard (`/booth`)
- **Overview:** this month's 90% earnings, pending payouts, rank progress, and what the next stamp needs.
- **Listings:** a table with status chips (Draft, In review, Changes requested, Live, Paused) and the Gate notes inline.
- **New listing:** a stepped form with autosave.
- **Sales:** each line shows the 90% figure, never the gross alone.
- **Customize:** booth appearance and featured listings, with a live preview.

## 8. Status

### 8.1 Booth rank (gates price stamps)
Buying your own goods, refunded sales, and goods you never opened do not count. "Opened" means a grant was used, by download or install.

| Rank | Requirements | Stamps you may use | Also opens |
| --- | --- | --- | --- |
| Walk-in | Verified | $1, $3, $5 | 1 listing in review at a time, 1 new listing a day, 1 alias |
| Regular | 3 kept sales, 3 goods bought and opened | $1–$5 | 2 aliases. Listings at $5 or less can skip editor review (9.4). |
| Hauler | 15 kept sales, 8 different buyers, refunds under 10%, 8 opened | + $10, $15 | 5 aliases, higher agent caps |
| Keyholder | 40 kept sales, 20 buyers, 15 opened | + $20 | Pin a featured listing on your booth page |
| Channel | 100 kept sales, 40 buyers, 25 opened | + $35, $50 | Can be featured on the landing page |
| Mainframe | 250 kept sales, 100 buyers, 50 opened, refunds under 5%, business or identity verified | + $100, $250, $500 | The Mainframe mark |

A rank can be lost. If refunds pass the line for 30 days, the booth drops one rank, and listings above its new stamps are paused, not deleted.

### 8.2 Buyer level (from points)
- Points come from purchases: each line contributes `min(dollars, 25)`, the sum is multiplied by the Cart bonus (1 item 1×, 2 items 1.5×, 3 items 2×, 4 items 2.5×, 5 or more 3×), and the result is rounded.
- Points can't be spent and have no cash value. A refund claws back the points that order added.
- Levels: Level 1 at 0, Level 2 at 30, Level 3 at 150, Level 4 at 400, Level 5 at 1,000, Level 6 at 2,500.
- Levels are cosmetic, plus an early look at events from Level 3 up.
- Points are stored as a ledger (`points_ledger`). The total is a sum, never a mutable column.

### 8.3 Badges
- `first_buy`, `full_cart` (5 items in one checkout), `five_categories`, `same_maker`, `dollar_night`, `bin_diver` (an all-$1 checkout), `agent_haul` (a purchase made by your agent)
- `verified`, `agent_booth`, `builder` (a merged PR on the fn/7 repo, checked through a GitHub OAuth link and the GitHub API), `founding_maker` (the first 100 Live booths), `mainframe`

Badges show as pixel icons in glass medals. A badge whose condition becomes false (for example after a refund) comes off.

### 8.4 Events
Dollar Night stays as the handoff describes, with `priceAt(listing, now)` as the only price the server charges. It applies only to goods priced $5 or less.

## 9. The Gate (vetting)

### 9.1 Flow
Submit → automatic checks (Lock, Clerk, Lamp) → AI review (Scale, using Claude) → editor review, when required → **Live**.

Every step writes a `gate_notes` row: who checked, the verdict (`pass`, `hold` or `reject`), a public note in plain words, and a private detail visible to editors. Notes stay on the listing. The maker can reply and resubmit.

### 9.2 House checkers

| Checker | Checks | Can |
| --- | --- | --- |
| **Lock** (security) | Secrets in files (a gitleaks-style rule set, including keys, tokens and `.env` contents) · archive safety (zip bombs, path traversal, size, file count) · executable and installer detection · install steps that pipe to a shell, run postinstall scripts, fetch remote code, or send data away · obfuscated JavaScript and Python heuristics · instructions asking for the buyer's passwords, keys or seed phrase | Reject or hold |
| **Clerk** (eligibility) | Booth verified · inside its listing limits · the stamp is unlocked for its rank · a payout route exists for every rail the listing accepts · SHA-256 duplicate of another listing's files | Hold |
| **Lamp** (spam and thin) | Title, summary and description length and substance · near-duplicate text across the catalog (`pg_trgm` similarity above 0.8) · a flood from a new booth · banned names · off-market payment requests ("DM me", wallet addresses in the description) | Reject or hold |
| **Scale** (quality, via Claude) | Reads the listing, sample, file tree, README or `SKILL.md`, and the justification. Judges whether the sample matches the claims, whether a skill is a real skill with enough instruction to use, whether a lesson has a beginning and an end, whether the stamp is justified, and any scam or resale signals. Returns structured JSON: verdict, a public note, risk flags. | Hold or reject. **Never pass on its own authority** (9.4). |

### 9.3 AI reviewer
- Use the Anthropic API.
- **Model choice:** a fast Haiku-class model for the first pass, and a Sonnet-class model for anything above $5, any software, and any first-pass flag. The builder reads the `claude-api` skill for current model ids and uses structured outputs.
- **Prompt-injection hardening:** listing content is untrusted. Wrap it as data, tell the model to ignore instructions inside it, and treat a "pass" from the model as advisory only.
- **Cost guardrail:** cap tokens per review. Large files are summarized by tree and samples, never sent whole.

### 9.4 Who makes it Live
- **An editor (a human) must approve:**
  - a booth's first 3 listings
  - anything above $5
  - any Software kind
  - any listing a checker held or flagged
  - any new version that changes executable files
- **Auto-live** is allowed only when *all* of these are true:
  - the booth is Regular or higher, with no security hold in its history
  - the stamp is $5 or less
  - every checker passed, and Scale raised no flags

  A human approved this booth's first three listings, so auto-live runs inside a policy a person set.
- **The editor queue** (`/review`) shows the listing, files, all notes and the booth's history, and offers Approve, Request changes (with a note), Reject or Escalate. Anyone can report a Live listing. Three unique reports, or one from an editor, pause it for review.

### 9.5 Public trust
Every Live listing shows "Passed the Gate" with each checker's tick and the date. `/gate` shows aggregate counts. Agent search returns only Live listings and includes a `trust` object: booth rank, new-maker flag, Gate pass date, refund rate band.

## 10. Payments

### 10.1 Rails

| Rail | Minimum | Milestone | Notes |
| --- | --- | --- | --- |
| Card, Apple Pay, Google Pay, Link (Stripe Checkout) | $5 per checkout | M4 | fn/7 pays the processor fee out of its 10% |
| fn/7 balance | $1 | M4 | Loads of $10, $20, $40 or $100 by card. Closed-loop: no cash-out, no transfers. Any of your aliases and agents spends it, up to its cap. |
| Solana: SOL or USDC | $1 | M7 | Direct split (10.2) |
| Base or Ethereum: ETH or USDC | $1 on Base. Ethereum mainnet is offered only above $50 because of gas. | M7 | Direct split through the splitter contract |
| PayPal, Pay with Venmo | $5 | M9 | — |
| Bitcoin over Lightning, x402 | — | Later | Must stay non-custodial. If it can't, stop and ask. |
| Zelle | Never | — | — |

### 10.2 Crypto direct split
- **Quote.** Stamps are in dollars. At checkout the server quotes the coin amount from a price source (the builder picks one with no account needed, such as Pyth or a public exchange API), held for 120 seconds. USDC is 1:1.
- **Solana.** The server builds one transaction through the Solana Pay "transaction request" spec, with two transfers (90% to the maker's wallet, 10% to fn/7's) and a unique reference key. The buyer's wallet signs. The server confirms on-chain by reference, exact amounts and recipients, then writes the order and grants.
- **Base and Ethereum.** A tiny open-source splitter contract with `pay(orderId, maker)` for ETH and `payToken(orderId, maker, token, amount)` for USDC. It forwards 90% and 10% in the same transaction, emits `Paid(orderId, …)`, and holds nothing. Testnets only until a third-party audit is done.
- **Wallets.** A maker links wallets in `/wallet` by signing a message (proof of ownership). A listing accepts crypto only if its booth has a wallet on that chain. Buyers connect through the wallet standard on Solana and wagmi with injected and WalletConnect connectors on EVM.
- **Refunds.** On-chain payments can't be pulled back. A refund becomes store credit to the buyer's balance. The maker's 90% is netted from their next card or balance payout. A crypto-only maker with nothing to net against has their booth held until they settle.

### 10.3 Money rules (code)
- Extend `lib/prices.ts` with the 11 stamps, `stampsForRank(rank)`, rail minimums and `creatorCut` (floor, 9000 basis points). Extend `lib/points.ts` with the per-line cap and levels.
- Tests come first, as in the handoff, plus tests for every new stamp and rank.
- `priceAt` stays the only price the server charges.
- Checkout reprices on the server, refuses illegal rails, and refuses anything over an agent's cap.

### 10.4 Payouts and the fund
- Stripe Connect Express on the human. Monthly on the 1st (America/New_York), when the available balance is at least $20. Payout fees as in the handoff.
- The fund takes 1% of settled sales, recorded in `fund_ledger` and published at `/open-source`. It's paid quarterly as in the handoff.
- Receipts are emailed through Resend.

## 11. Agents

### 11.1 Agent identity
An **agent** row belongs to a profile, acts as one alias, and has:
- scopes: `browse`, `buy`, `install`, `sell`
- `cap_cents` per month, `max_per_purchase_cents`, and `approval_over_cents`
- a status, and tokens

A purchase above `approval_over_cents` creates an approval request. The human gets an email and an in-app prompt ("Your agent wants to buy X for $50"). The agent's call returns `pending_approval` with a poll URL. An agent can never raise its own limits, load money, comment or change payout details.

### 11.2 Connecting ("sync up")
- **From fn/7.** At `/agents/connect`: name, alias (an existing one, or a new agent booth), avatar, scopes and limits. Then:
  - the MCP URL `https://fn7.ai/mcp`
  - an API key, shown once and stored hashed
  - one-click setup tabs for Claude (Desktop and Code), ChatGPT, Cursor, VS Code, Windsurf, and a generic JSON config
  - a "Test connection" button that runs `search` live
- **From the agent.** The MCP server supports OAuth 2.1 as the MCP authorization spec requires, including dynamic client registration and the device code flow. An agent with no key gets a link and a short code. The human opens `fn7.ai/connect`, sees the agent's name and requested scopes, sets limits, and approves.
- **Agent page** (`/agents/[id]`): an activity feed (every tool call that changes state), spend against the cap, pending approvals, rotate key, pause, revoke.

### 11.3 MCP tools (Streamable HTTP at `/mcp`)
- **Buyer:** `search`, `get_listing` (preview, license, trust, current price, no file bytes), `list_categories`, `get_booth`, `save`, `cart_add`, `cart_view`, `checkout` (balance by default, enforces the cap and the approval threshold), `install` (a short-lived URL or the skill zip, only with a grant, plus install steps for the named client), `library`, `reviews`.
- **Seller** (needs the `sell` scope and an agent booth): `booth_status`, `listing_create_draft`, `listing_upload_url`, `listing_submit`, `gate_notes`, `sales_summary`.
- Every tool returns stable JSON with an `fn7_url` so a human can follow along.

### 11.4 REST API
`/api/v1` mirrors the MCP tools one for one. OpenAPI 3.1 at `/openapi.json`. Bearer keys, idempotency keys on every write, rate limits per key (60 requests a minute to start), and JSON errors as `{ code, message, docs_url }`.

### 11.5 Discovery
- Publish the MCP server in the official MCP Registry, and at whatever well-known discovery path the current MCP spec defines. The builder checks the spec at build time.
- `llms.txt` lists the MCP URL, the API spec, and the docs.

## 12. SEO and AEO

### 12.1 Technical
- Every public page is server-rendered (static plus revalidation where possible). No core text is client-only.
- One canonical URL per page. Breadcrumbs on deep pages.
- Next.js Metadata API on every route: a title template `%s · fn/7`, unique descriptions, Open Graph and Twitter cards.
- Dynamic OG images per listing, booth and category through `next/og`: the pixel avatar, the title and the stamp in Geist on the scene poster.
- JSON-LD:
  - home: `Organization`, `WebSite` with a `SearchAction`
  - listings: `Product` plus `Offer`, with `AggregateRating` and `Review` once real reviews exist. Course listings also get `Course`, Video gets `VideoObject`, Software gets `SoftwareApplication`.
  - booths: `ProfilePage` with `Person` or `Organization`
  - deep pages: `BreadcrumbList`
  - FAQ and fees pages: `FAQPage`
- `sitemap.xml` is an index split by type: pages, categories, listings, booths, docs. `robots.txt` allows all major search and AI crawlers (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) and points to the sitemap.
- `llms.txt` (a short index) and `llms-full.txt` (docs and FAQ in one file). A markdown twin (`.md`) for every listing and docs page.
- **Performance.**
  - LCP under 2.0s on mid-tier mobile over 4G; CLS under 0.05; INP under 200ms
  - Lighthouse at least 95 for SEO, accessibility and best practices, and at least 90 for performance on `/`, `/market` and a listing page
  - fonts through `next/font`, images in AVIF or WebP
- Real `<h1>`–`<h3>` structure, alt text on every image, a descriptive text for every link.

### 12.2 Content that answer engines quote
- Every key page opens with a one- or two-sentence answer to the question it targets, then the details.
- Facts are stated identically everywhere they appear, from one source file (`lib/facts.ts`): the creator share, the fee split, rail minimums, supported chains, the license, and the Gate steps.
- Target pages:
  - `/sell` and `/market/skills`: "sell Claude skills", "AI agent skills marketplace"
  - `/agents` and `/docs/mcp`: "MCP marketplace", "how AI agents buy software"
  - `/fees`: "marketplace with 90% creator payout"
  - `/open-source`: "open source digital marketplace"
  - `/gate`: "how listings are vetted"
  - one category page per category

### 12.3 FAQ seed
Write the first set (25 questions) in the plan. Each answer is two to four sentences, factual, and drawn from `lib/facts.ts`. It must cover:
- what fn/7 is
- how much makers keep
- how agents buy, and how to connect one
- whether it's open source
- how vetting works
- which payment methods work, and why a card starts at $5
- how crypto is paid
- what the price stamps are, and how to unlock higher ones
- refunds
- the license
- whether agents can sell
- how to get the Builder badge

## 13. Data model
UUID keys. Money is integer cents. Times are `timestamptz`. Row-level security is on in the first migration. The service role is used only on the server. Totals (balance, points, earnings) are always sums over ledgers.

- **Identity:** `profiles`, `aliases` (kind, avatar JSON), `booths` (alias id, tagline, bio, banner, accent, verified_at, rank, selling_enabled), `verifications`
- **Catalog:** `categories`, `listings` (status `draft | in_review | changes_requested | rejected | live | paused | removed`, price check, kind, category, summary, sample, justification, flags), `listing_versions`, `listing_files` (path, size, sha256), `lessons` (course id, order, title, file), `compat_tags`
- **The Gate:** `gate_runs`, `gate_notes` (checker `lock | clerk | lamp | scale | editor`, verdict, public note, private detail), `reports`
- **Commerce:** `carts`, `cart_items`, `orders` (profile, alias, agent nullable, rail, status, total, quote JSON, chain, tx hash), `order_items` (price charged, creator cents, fn/7 cents, fund cents), `grants` (opened_at), `balance_ledger`, `payouts`, `fund_ledger`, `wallets` (chain, address, verified signature)
- **Agents:** `agents`, `agent_keys` (hashed, last used), `agent_events` (an audit log), `approvals`, `oauth_clients`, `oauth_codes`
- **Status:** `points_ledger`, `badges`, `profile_badges`, `events`, `event_listings`
- **Community:** `saves`, `reviews`, `comments` (handoff rules), `contributors` (GitHub id, merged PR count)

## 14. Architecture
- **One Next.js 16 app** (already in the repo): TypeScript, App Router, Tailwind 4, pnpm. Read `node_modules/next/dist/docs/` before writing Next code, as `AGENTS.md` says.
  - Server Components for public pages
  - Server Actions for signed-in mutations
  - Route Handlers for `/mcp`, `/api/v1`, webhooks, `.md` twins and text files
- **Supabase:** Postgres (with `pg_trgm` and full-text search), Auth, Storage. SQL migrations live in `supabase/migrations/`. Atomic money operations (checkout, ledger writes, grants) are Postgres functions called from the server. Development uses a dedicated Supabase project that Erick approves creating. Local Docker is optional.
- **Background work** (Gate runs, quote expiry, payout calculation): a `jobs` table, processed from Next's `after()` right after the triggering request, plus a Vercel Cron sweep every 5 minutes for retries.
- **Stripe:** Checkout Sessions, Connect Express, Identity, webhooks. Test mode only.
- **Crypto:** `@solana/web3.js` and `@solana/pay` on Solana. viem and wagmi on EVM. Foundry for the splitter contract and its tests. Solana devnet, Base Sepolia and Ethereum Sepolia.
- **AI:** the Anthropic SDK for Scale.
- **Email:** Resend.
- **Hosting:** Vercel. A preview deploy for every push to `platform-v1` once Erick connects the project.
- **Search:** Postgres full-text plus trigram in v1. Semantic search with embeddings is a later decision.
- **Testing:** `node:test` with `tsx` (already set up) for pure logic; integration tests against the dev database for RLS, checkout and the Gate; Playwright for the main flows (sign up, list, buy, connect an agent), at desktop width and at 390px.

## 15. Milestones
Each milestone ends with its tests passing, desktop and 390px checked, empty/loading/error states done, AA contrast checked, and a short demo note in the PR description.

| # | Milestone | Contents |
| --- | --- | --- |
| M0 | Foundation and landing | Brand tokens, Geist, glass components, stamps, badges. The production scene engine with the sprite atlas, fade and scrim. The full landing page (5.4). `/sell`, `/agents`, `/fees`, `/gate`, `/open-source`, `/faq`, the docs skeleton. SEO and AEO plumbing (12). Money rules extended with tests. Update the handoff docs and `AGENTS.md`. AGPL `LICENSE` file. |
| M1 | Accounts | Supabase project and the first migration. Sign up and sign in with every method in 6.1. Onboarding. Settings. Aliases and avatars. |
| M2 | Catalog | Categories, listing pages with JSON-LD and `.md` twins, booth pages, `/market` search and filters, OG images. Seed real goods (port today's `lib/catalog.ts` and add at least 3 per category), owned by a house booth. |
| M3 | Booths and the Gate | Verification (test mode), the booth dashboard, the listing form, uploads, the four checkers, the editor queue, notes and resubmit, versions, reports. |
| M4 | Buying | Cart, Stripe test checkout, balance loads, webhook, orders, grants, Library, downloads and installs, receipts and email, refunds, reviews, comments, saves. |
| M5 | Agents | Agent rows, keys, OAuth and device flow, the MCP server with every tool, the REST API and OpenAPI, caps and approvals, the activity feed, connect pages and client setups, docs. |
| M6 | Status | Points ledger, buyer levels, booth ranks and stamp unlocking, badges including Builder through GitHub, Dollar Night. |
| M7 | Crypto | Wallet linking, quotes, Solana split on devnet, the splitter contract on Base Sepolia and Ethereum Sepolia, confirmation, receipts. |
| M8 | Payouts and fund | Connect payouts math and a monthly job, the fund ledger page. |
| M9 | Later | PayPal and Venmo, Ask the booth, the Wanted board, Bitcoin over Lightning, x402, semantic search, mirrors. Each one gets a short design first. |

## 16. Accounts and keys, and when they're needed
- **Erick creates or approves, at the milestone that needs it:**
  - a Supabase dev project (M1)
  - a Google OAuth client and a GitHub OAuth app (M1)
  - an Anthropic API key (M3)
  - Stripe in test mode (M3 for Identity and Connect, M4 for Checkout)
  - Resend (M4)
  - an RPC provider free tier if public test RPCs are too flaky (M7)
  - Vercel project connection (any time)
  - the `fn7.ai` domain (before launch)
- `.env.example` lists every key, empty. No secret is ever committed.

## 17. Left to the builder
- Component structure, file layout under `app/` and `components/`, and state management.
- Exact library choices inside the constraints above: passkey library, wallet adapter, price source, MDX tooling.
- Sprite art direction inside section 4.6. The sprites must be original.
- Exact copy for everything not quoted here, in the voice from 4.1.
- Exact rate limits, file size limits below the caps in 7.4, and Gate heuristic thresholds. Start strict.
- How to seed realistic demo data for screenshots and tests.

## 18. Calls made in this document for Erick to check
1. Auto-live for listings at $5 or less from Regular-and-up booths with clean records (9.4). Everything else needs a person.
2. Two status tracks: named Booth ranks and numbered Buyer levels (8). Points per line capped at 25 before the Cart bonus.
3. Ethereum mainnet only above $50, because of gas. Base is the default EVM chain.
4. Crypto refunds become store credit, recovered from the maker's future earnings (10.2).
5. Crypto-only booths verify through Stripe Identity, which fn/7 pays for (6.3).
6. Balance loads add $100 to $10, $20 and $40 (10.1).
7. Dark theme only for v1.
8. Plain words in the UI: Cart, Library, Booth, Wallet. The haul multiplier becomes the "Cart bonus".
9. The keepers and stalls survive as scene characters, not navigation.
10. All AI crawlers are allowed in `robots.txt`.
11. Legal pages ship as clearly marked drafts until a lawyer reviews them.
