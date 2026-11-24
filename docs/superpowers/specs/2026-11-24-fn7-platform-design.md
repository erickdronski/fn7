# fn/7 platform design

Date: 2026-11-24. Status: draft for Erick's approval, revision 2. Revision 2 adds the Robinhood-style page structure, the craft and motion rules, the easter eggs, and answers to the reviewer's questions. Branch: `platform-v1`.

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

**Non-goals for this build:** services (bounded jobs), compiled software binaries, makers outside the US, physical goods, subscriptions, auctions, ads, a token, open DMs between strangers, Bitcoin, x402, PayPal, the Wanted board, Ask the booth, localization, native mobile apps, mirrors and federation. The schema should not block any of these later. Section 15 says when each lands.

**Anti-goals (a failure even if it works)**
- fn/7 ever holds crypto a person could withdraw. All crypto settles directly to the maker and to fn/7 in one transaction.
- A maker ever receives less than 90% of what the buyer paid for that line.
- An AI or a rule publishes a listing without a human having approved that booth (see 9.4).
- The pixel scene slows a purchase, hurts the page's Core Web Vitals, or puts busy art behind text.
- Fake scarcity, loot boxes, spins, dark patterns, or points that act as a hidden discount.
- A booth with no verified human or business answerable for it.
- Names, logos, art or character likenesses taken from any film, game or studio. Pop-culture references are winks in fn/7's own words and its own art (4.10). The names the handoff bans stay banned for anything fn/7 names itself.
- A page that reads as machine-made: any of the tells in 4.8.
- An invented number, rating, testimonial, logo wall or customer count, anywhere.

## 3. What changes from the handoff

| Topic | Handoff | Now |
| --- | --- | --- |
| Build approach | One phase at a time, Phase 1 first | Build the whole platform as a real app with a real database. Money runs in Stripe test mode and on crypto test networks until Erick says go live. Milestones in section 15. |
| Price ceiling | $1–$5 to start, $50 at the top | Same start. A sixth rank, **Mainframe**, unlocks **$100, $250, $500**. |
| Kinds of goods | file, skill, repo, lesson, tool | skill, code, course, lesson, template, video, software, asset pack. Services wait until M9. Section 7. |
| Film and game references | No film, game or studio creatures | Easter eggs are allowed as winks: a short line or a piece of original art, never a franchise's names, logos or characters. Section 4.10. |
| Yard and Street | Unproven Yard, edited Street | Gone. A listing is **In review** (visible only to its maker) or **Live** (public). Live goods from new booths carry a quiet **New maker** tag. |
| Stalls and keepers | Eight stalls with animal keepers in the nav | Seven **categories** (7.1). The keepers survive as pixel characters in the scene and as category mascots, not as navigation. |
| Look | Hard pixels, Press Start 2P, no blur, gradients or shadows | A flat near-black page, clean type, one accent color, one message per screen, and a cinematic pixel scene. Pixels are accents only, and glass is rare. Section 4. |
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
- **Geist** for everything people read.
- **A serif display face** (Newsreader in the mockup) for the few biggest statements only: the landing hero, the closing call to action, page heroes and the sign-up panel. One CSS variable switches these back to Geist.
- **Geist Mono** only where mono is the material: code, terminal output and price stamps. Never for labels.
- All self-hosted through `next/font`. No pixel fonts anywhere. Remove Press Start 2P.

### 4.3 Color
Dark theme only for v1. The scene needs it. Tokens live in `app/globals.css` as CSS variables:

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#03040b` | Page |
| `--bg-raise` | `#0a0c1f` | Sections and cards without glass |
| `--text` | `#f3f2ff` | Body text (≥ 15:1 on `--bg`) |
| `--text-dim` | `#b9b6d9` | Secondary text. Must stay ≥ 7:1 on `--bg` |
| `--line` | `rgba(255,255,255,.10)` | Borders |
| `--cyan` | `#5ef2ff` | The one interface accent: primary buttons, links, the highlighted line of a section headline |
| `--magenta` | `#ff4fd8` | The scene and the top stamps only |
| `--amber` | `#ffb347` | Prices, warmth |
| `--mint` | `#7dffb2` | Success, passed checks |
| `--violet` | `#9a7bff` | Higher status |
| `--coral` | `#ff6b6b` | Errors, $1 stamps |

**One accent in the interface.** Cyan is the only accent in page chrome. The other hues appear only in the pixel scene, on price stamps and badges, and as status (mint for success, coral for errors). Sections have flat backgrounds: no gradient washes.

Status colors on stamps: $1 coral, $3 mint, $5 amber, $10–$20 cyan, $35–$50 violet, $100–$500 a magenta→violet→cyan gradient.

### 4.4 Pixel hints (the only retro in the UI)
1. The slash in the wordmark is five pixel steps (SVG). This is the logo.
2. Price stamps have notched pixel corners (CSS clip-path).
3. Avatars and badges are pixel art inside glass circles.
4. The night sky behind the scene uses ordered dithering.
5. The world itself, the scene, is pixel art.

### 4.5 Glass components
- Glass is rare. Use it only where a surface really floats over the scene or over scrolling content: the nav once the page scrolls, the cart drawer, modals and the command palette. Every other surface is solid, with layered shadows (4.8).
- Glass surface: a vertical white gradient at 11%→3.5%, `backdrop-filter: blur(16px) saturate(160%)`, a 1px `rgba(255,255,255,.14)` border, an inner top highlight and a soft drop shadow.
- Fallback: when `backdrop-filter` is unsupported, or under `prefers-reduced-transparency`, use solid `--bg-raise` at 92%.
- Text on glass must meet AA contrast **measured over the busiest part of the scene behind it**. If it fails, darken the glass. Never thin the text.

### 4.6 The scene (landing hero)
The approved mockups are in `docs/superpowers/specs/mockups/`: `visual-style-v2.html` is the scene and `landing-v3.html` is the page it sits in. Build its production version as a reusable engine in `components/scene/`.

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
  - The headline, sentence and buttons sit on clean near-black above the market, over a soft dark scrim. Only faint stars pass behind them. The market itself starts below the buttons, and the beacon beam stops below the headline.
- **Opening.** The text is there from the first frame. On the first visit in a session, the camera descends from the stars to the market behind it in under 4 seconds. Any scroll, key or click skips it. It never replays automatically. `prefers-reduced-motion` gets a still frame with no parallax.
- **Scroll.** Scrolling is native and never hijacked. As the hero leaves, the camera eases toward a row of booths, and a later section picks up that close-up with three featured booths, which are real listings (5.4).
- **Hidden details.** The scene carries several of the easter eggs in 4.10. All of them are original art.
- **Performance budget.**
  - The scene never blocks the LCP: the H1 is the LCP element and is server-rendered HTML. The scene initializes after the first paint, using `requestIdleCallback`.
  - Under 4ms per frame on an M1-class laptop.
  - Pause when offscreen or when the tab is hidden. Cap at 2× device pixel ratio.
  - A pre-rendered still image (AVIF/WebP) is the poster, the no-JS fallback, and the source for the home page's OG image.
- **Accessibility.** `aria-hidden` on the canvas. Everything the scene shows that matters is also in the HTML text.

### 4.7 Page rhythm
The structure follows what Robinhood's site does well, in fn/7's own voice and art. The approved mockup is `landing-v3.html`.

- **One message per screen.** Each section has one short headline, one or two sentences, one button and one large visual, with generous empty space. The hero headline is seven words or fewer.
- **Two-tone section headlines.** The first line is in the accent color and names the audience or idea ("Built for agents"). The second line, in white, makes the claim ("Search, buy and install over one connection.").
- **One full-width accent band** per page at most. On the landing page it's the open-source section.
- **Trust as a 2×2 grid:** four pixel line icons with one sentence each (the Gate).
- **A closing call to action** in the display face, then a full footer with every public route.
- **Vary the composition.** No two neighboring sections use the same layout, and "text beside a card" appears at most twice on a page. Other shapes to use: a full-width close-up of the scene, one enormous figure ("90%") set as type, a control the visitor can drag (the stamp ladder), a real code block.
- **Show the real thing.** Section visuals are the product's real components with real seeded data (the actual agent budget card, booth card, listing card and receipt), or the pixel world. Never a drawn browser or terminal window, and never a picture of a UI that doesn't exist.

### 4.8 The craft floor
Erick's bar is "no AI slop". These rules are drawn from the design references he named: Emil Kowalski's design-engineering skills, Vercel's Web Interface Guidelines, Jakub Krehel's "Make interfaces feel better", Hallmark, and Anthropic's frontend-design skill. They were read as reference, and none is installed as a dependency. Every screen is reviewed against this list before its milestone closes.

**Never ship**
- A purple-to-blue gradient, gradient text, or a glow used as decoration.
- A card inside a card, or the same three-card row repeated down a page.
- A drawn browser or OS window, a decorative status dot, or an emoji used as an icon.
- A label in tracked capitals, an "eyebrow" line over a headline, or a string of facts joined by middle dots.
- An invented number, rating, testimonial or logo wall. A fact that isn't true yet is left out.
- Grey text that fails AA contrast, or any text over busy art.
- `transition: all`, an animated `width`, `height`, `top` or `left`, `outline: none` without a replacement, or a `<div>` with a click handler.
- A generic button label where a specific one fits: "Pay $5", "Connect an agent" and "Submit to the Gate", not "Continue" or "Submit".

**Always**
- Nested corners are concentric: outer radius = inner radius + padding.
- Shadows show elevation (layered and transparent). Borders show structure and state.
- Headings use `text-wrap: balance`, body text uses `text-wrap: pretty`, and every changing number uses `tabular-nums`.
- Text is antialiased, with real typographic characters (… and curly quotes).
- Every control has all its states designed: rest, hover, focus-visible, active, disabled, loading, error and success.
- Hit areas are at least 44×44px on touch and 40×40px on desktop.
- Hover and active states increase contrast. Focus rings are always visible for keyboard users.
- The URL holds state: filters, tabs, pagination and open panels are links that can be shared.
- Destructive actions ask first or offer undo.
- Forms have real labels, the right input types and `autocomplete`, never block paste, and show errors beside the field with the fix.
- Skeletons mirror the content they stand in for. Empty states say what belongs there and offer the next step.
- Icons are one set with one stroke weight, colored by `currentColor`.
- Two type families plus mono (4.2). One primary button style, one container width, and one radius per nesting level across the site.
- `color-scheme: dark` on the root, and a matching `theme-color`.

### 4.9 Motion and navigation
Motion should feel physical and fast, and be rare enough to mean something.

- **Should it move at all?** Decide by how often a person sees it.
  - Hundreds of times a day (keyboard shortcuts, the command palette): no animation.
  - Tens of times a day (hover, moving through a list): instant, or a color change of 150ms or less.
  - Occasionally (modals, drawers, toasts, menus): a standard transition.
  - Rarely (a first visit, a first sale, a new rank): room for delight.
- **Tokens,** defined once in `app/globals.css`:
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for anything entering or leaving
  - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for things moving on screen
  - `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` for sheets and drawers
  - durations: press 120–160ms, tooltips 150ms, menus 180–220ms, modals and drawers 300–450ms. Apart from those last two, interface motion stays under 300ms.
- **Rules.**
  - Never ease-in. Never start from `scale(0)`: enter from `scale(0.96)` with opacity 0.
  - Animate only `transform`, `opacity`, `filter` and `clip-path`.
  - Pressable things scale to 0.97 on press.
  - Popovers and menus grow from the control that opened them.
  - State changes use CSS transitions, so they can be interrupted. Gestures (dragging a drawer, swiping to dismiss) use springs and keep their velocity.
  - Group entrances stagger by 30–80ms and never block input. Exits are quicker and smaller than entrances.
  - Hover motion runs only on devices that hover.
  - `prefers-reduced-motion` keeps fades and color changes, and removes movement, parallax and the scene's camera moves.
  - Motion is never the only signal: every animated change also has a color, icon or text cue.
- **Navigation.**
  - Routes are prefetched, so a click feels instant.
  - Shared elements carry across pages through the View Transitions API: a listing card's art and title become the listing page's header, and a booth avatar becomes the booth page's.
  - Adding to the cart, saving and reviewing update at once and reconcile after.
  - Scroll position is restored on back.
  - Scrolling is always native. Nothing hijacks it, and there is no custom cursor.
  - **Command palette (⌘K):** search listings, booths and docs, jump to any page, and run actions (connect an agent, start a listing, copy the MCP URL). It opens with no animation.
- **Signature moments,** where the craft is spent:
  1. The hero camera descent (4.6).
  2. The camera easing into a booth as the hero scrolls away.
  3. The market noticing the visitor: characters near the pointer turn toward it.
  4. The receipt: the price stamp presses onto the paper, once.
  5. The Gate: on a listing's status page, the four checks tick through in order as they finish.
  6. A new rank: the new stamps slide into the ladder, once.
  7. Product stories on the landing page: the real components played through a short scripted sequence (an agent searches, buys and installs), with pause and replay controls and a still for reduced motion.

### 4.10 Easter eggs
fn/7 is a love letter to the tech and tech-dystopia stories its audience grew up on: Terminator, The Matrix, Star Wars, Star Trek, Blade Runner, Tron, RoboCop, 2001, WarGames, the Hitchhiker's Guide, cyberpunk games and old computers. The references are sprinkled, hidden or in passing, and never in the way.

**Rules**
1. **Winks, not assets.** A reference is a short line in passing or a piece of original art. Never a franchise's name, logo, music, character likeness or screen-accurate art. Pixel characters stay original designs.
2. **Plain first.** Anything a person must understand (prices, payments, security, errors that need action, legal) says the plain thing first. The wink is the second line, a tooltip or a detail.
3. **Never in facts.** Nothing an agent reads as data carries a joke: MCP and API responses, JSON-LD, `llms.txt`, the docs and the FAQ stay literal.
4. **Never required.** No feature depends on finding one.
5. **One registry.** Every egg is an entry in `lib/eggs.ts`: its id, where it lives, its trigger, the line or art, and what it nods to. One flag turns them all off. Erick's lawyer reviews the list along with the legal pages.
6. **Found eggs are kept.** Finding one while signed in records it. Finding ten earns a hidden badge, "Egg hunter".

**The first set.** These are proposals; Erick edits them freely.

| Where | The egg | Nods to |
| --- | --- | --- |
| A skill installs into an agent | Toast: "Installed. Your agent knows kung fu." | The Matrix |
| The plaza scene | A white pixel rabbit crosses now and then. Clicking it opens a hidden page. | The Matrix |
| 404 page | "This is not the listing you're looking for." | Star Wars |
| `/open-source` | "Use the source." On the fork link: "May the fork be with you." | Star Wars |
| The Lock flags malware | Note heading: "It's a trap." | Star Wars |
| The Lock finds leaked keys | Note heading: "Too many secrets." | Sneakers |
| Sign out | "Signed out. You'll be back." | Terminator |
| Deleting a listing | Second line of the confirmation: "Hasta la vista, listing." | Terminator |
| `/sell` footer | "No fate but what we make." | Terminator |
| Final checkout step | Button tooltip: "Make it so." | Star Trek |
| File upload | "Beam it up." | Star Trek |
| Receipts | A stardate under the real date. | Star Trek |
| A payout is sent | "Live long and prosper." | Star Trek |
| An agent hits its cap | Second line: "I'm afraid I can't do that." | 2001 |
| A rooftop in the scene | A black monolith. It hums on hover. | 2001 |
| Dollar Night banner | Second line: "I'd buy that for a dollar." | RoboCop |
| An agent's limits panel | Subtitle: "Prime directives". A fourth row reads "Classified". | RoboCop, Star Trek |
| An agent's connection test passes | "Interlinked." | Blade Runner 2049 |
| Identity verification | "Our Voight-Kampff test is shorter." | Blade Runner |
| A booth counter in the scene | A tiny origami unicorn. Now and then it rains. | Blade Runner |
| Response header on `/mcp` | `X-Greeting: Greetings, program.` | Tron |
| End of the changelog | "End of line." | Tron |
| 500 page | "Don't panic." in large, friendly letters. | The Hitchhiker's Guide |
| A booth's 42nd sale | A hidden badge, "The answer". | The Hitchhiker's Guide |
| 401 and 403 pages | "Ah ah ah. You didn't say the magic word." | Jurassic Park |
| An idle terminal on `/agents` | "Shall we play a game?" | WarGames |
| A hover car in the scene | At full speed it leaves two trails of fire. | Back to the Future |
| Pausing an agent | "Wake me when you need me." | Halo |
| Onboarding, the connect step | "It's dangerous to go alone. Take an agent." | The Legend of Zelda |
| Characters in the scene | A "!" pops over one when the pointer startles it. | Metal Gear Solid |
| A first sale | "This was a triumph." | Portal |
| An empty search | "In space, no one can hear you search." | Alien |
| The pay button, on hover | "Shut up and take my money." | Futurama |
| A failed upload | Actions labeled "Abort, Retry, Fail?" | MS-DOS |
| The loading bar | A light that sweeps side to side. | Knight Rider |
| Typing the Konami code | The whole market throws a short street party. | Konami |
| `/fees` | "The 90% never changes." | Fallout |
| Sign-in greeting | "Hello, friend." | Mr. Robot |

## 5. Information architecture

### 5.1 Public navigation
The wordmark, then **Market**, **Agents**, **Sell**, **Open source** and **Docs**. On the right, an outlined **Log in** and a filled **Sign up**. The bar is solid near-black with a hairline under it, and turns to glass once the page scrolls. ⌘K opens the command palette (4.9).

The landing page alone carries one thin accent-colored announcement strip under the bar. At launch it reads: "Founding makers: the first 100 booths earn the Founding Maker badge."

On a phone: the wordmark, a search icon, and a menu sheet with the same items.

### 5.2 Signed-in navigation
The wordmark, a search field, **Library**, **Booth**, **Agents**, **Wallet**, the cart icon with a count, and the avatar menu (Settings, the alias switcher, Sign out). An editor also sees **Review**. ⌘K opens the command palette.

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
The approved structure is `landing-v3.html`. Section visuals follow 4.7: real components and the pixel world, in varied layouts.

1. **Hero.**
   - H1 in the display face: "The market built for agents".
   - One sentence: "Buy and sell skills, code, courses and tools on fn/7. AI agents shop it over one connection. Makers keep 90%. Prices start at $1."
   - Two buttons: **Browse the market** (filled) and **Connect an agent** (outlined).
   - The scene fades in beneath the buttons (4.6).
   - The answer-first definition from section 1 appears word for word in the footer and in the page's structured data.
2. **Built for agents.** "Search, buy and install over one connection." A product story (4.9) played with the real agent budget card and activity list, beside a real MCP config block that can be copied. Button: **Connect an agent**.
3. **For makers.** "Keep 90% of every sale." An enormous "90%" set as type, with the split of one $50 sale beneath it ($45.00 to the maker, $4.50 to run the market, $0.50 to the public fund) and a real booth card. Button: **Open a booth**.
4. **Pay any way.** A real receipt beside the on-chain split of a 5.00 USDC sale: 4.50 to the maker's wallet and 0.50 to fn/7, in one transaction. One line of rules: "A card purchase starts at $5. Your balance and crypto work from $1." Button: **How payments work**.
5. **Status.** "Start at $1. Earn your way to $500." The rank ladder as a control the visitor can drag through, with stamps unlocking as they go. Button: **See how status works**.
6. **The market, up close.** A full-width close-up of the scene with three featured booths, and the seven category links with live counts. Every listing shown is real.
7. **The Gate.** "Every listing passes the Gate." The 2×2 grid: scanned for leaked secrets and malware; checked against its own sample; screened for spam and copies; approved by a person when it counts.
8. **Open source.** The accent band. "Open source, built in public." Three links: read the code, pick a first issue, see the public fund. Button: **View on GitHub**.
9. **FAQ.** Eight questions with `FAQPage` JSON-LD.
10. **Closing.** In the display face: "The market is open." Button: **Create an account**.
11. **Footer.** Every public route, GitHub, the legal pages, and the answer-first definition.

## 6. Accounts, identity, aliases, booths

### 6.1 Sign up and sign in
- **Layout.** A split screen, as in `landing-v3.html`. On the left, a statement in the display face and a pixel line drawing of a booth that gains a part with each step. On the right, the form.
- **One question per step,** with a progress bar and a specific button: email, then the 6-digit code, then the three onboarding steps (6.2). Sign-in is a single panel.
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
| Software | app, plugin, extension, CLI | Source, scripts and packages a reviewer can read. No compiled binaries in v1, because the Gate can't inspect them without a malware-scanning vendor. Download with a published SHA-256. Optional license key generated per grant. |
| Assets | icons, fonts, audio, 3D, sprites, palettes | Zip |

The categories table is seeded, so its copy can be edited without a deploy.

Services (bounded jobs) wait until M9. They need a brief at checkout, delivery deadlines and held payouts, and those get their own design first.

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
Buying your own goods, refunded sales, and goods you never opened do not count. "Opened" means a grant was used, by download or install. A sale is "kept" once 14 days pass without a refund (10.5).

Rank belongs to the person, not the alias. Every alias and booth a profile owns shares one rank, and purchases by any of its aliases or agents count toward it. Someone who never sells is a Walk-in for alias and agent limits. Verification is only needed to list.

| Rank | Requirements | Stamps you may use | Also opens |
| --- | --- | --- | --- |
| Walk-in | None to buy. Verified to list. | $1, $3, $5 | 1 listing in review at a time, 1 new listing a day, 1 alias |
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
- **One maker per payment.** A crypto payment pays exactly one maker. A cart with goods from several makers settles as one payment per maker, signed in turn, and the Cart bonus counts the whole checkout.
- **Crypto-only booths.** A booth with a wallet and no Stripe payout account can only be paid in crypto. Its listings say "Crypto only" and can't be bought with a card or a balance. Agent search marks them `payable: false` for an agent that spends a balance.
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

### 10.5 Refunds, disputes, tax and where makers can be
- **Refunds.**
  - Not opened yet: the buyer can refund it themselves within 7 days. It comes back as store credit at once.
  - Already opened: the buyer files a request with a reason. The maker can respond, and an editor decides.
  - A refund reverses the maker's 90% for that line, the fund's 1%, and the points and badges the sale earned.
- **When a sale is "kept".** 14 days after the sale with no refund. Earnings from card and balance sales become payable then.
- **Card disputes.** fn/7 submits the grant log as evidence. If the dispute is lost, the maker's 90% for that line is reversed and fn/7 absorbs the dispute fee.
- **Where makers can be.** US-based makers only at launch (Stripe Connect, US). Buyers can be anywhere Stripe and the chains reach.
- **Sales tax.** Stamps exclude tax. When Stripe Tax is switched on, tax is added on top at checkout and never comes out of the maker's 90%. It stays off in test mode, and Erick's lawyer confirms the approach before launch.

## 11. Agents

### 11.1 Agent identity
An **agent** row belongs to a profile, acts as one alias, and has:
- scopes: `browse`, `buy`, `install`, `sell`
- `cap_cents` per month, `max_per_purchase_cents`, and `approval_over_cents`
- a status, and tokens

A purchase above `approval_over_cents` creates an approval request. The human gets an email and an in-app prompt ("Your agent wants to buy X for $50"). The agent's call returns `pending_approval` with a poll URL. An agent can never raise its own limits, load money, comment or change payout details.

### 11.2 Connecting ("sync up")
The public `/agents` page has three beats: **Bring your agent** (what it can do, with the product story from 4.9), **Set up in minutes** (01 paste one URL into your agent's MCP config, 02 load a balance and set a cap, 03 let it shop), and **Designed for safety** (a dedicated budget, a notice on every purchase, disconnect anytime).

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

- **Identity:** `profiles` (rank), `aliases` (kind, avatar JSON), `booths` (alias id, tagline, bio, banner, accent, verified_at, selling_enabled), `verifications`
- **Catalog:** `categories`, `listings` (status `draft | in_review | changes_requested | rejected | live | paused | removed`, price check, kind, category, summary, sample, justification, flags), `listing_versions`, `listing_files` (path, size, sha256), `lessons` (course id, order, title, file), `compat_tags`
- **The Gate:** `gate_runs`, `gate_notes` (checker `lock | clerk | lamp | scale | editor`, verdict, public note, private detail), `reports`
- **Commerce:** `carts`, `cart_items`, `orders` (profile, alias, agent nullable, rail, status, total, quote JSON, chain, tx hash), `order_items` (price charged, creator cents, fn/7 cents, fund cents), `grants` (opened_at), `balance_ledger`, `payouts`, `fund_ledger`, `wallets` (chain, address, verified signature)
- **Agents:** `agents`, `agent_keys` (hashed, last used), `agent_events` (an audit log), `approvals`, `oauth_clients`, `oauth_codes`
- **Status:** `points_ledger`, `badges`, `profile_badges`, `events`, `event_listings`
- **Community:** `saves`, `reviews`, `comments` (handoff rules), `contributors` (GitHub id, merged PR count), `egg_finds` (profile, egg id)

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
- **Motion:** CSS transitions and the Web Animations API first. The `motion` library for springs, gestures and layout animation. The View Transitions API for page-to-page continuity, through whatever Next 16 supports (check its docs). No scroll-hijacking library.
- **Design review:** build every screen with Anthropic's frontend-design skill, then review it against 4.8 and 4.9 before the milestone closes.
- **Art and brand license:** the code is AGPL. The name, wordmark, sprites and scene art are not under the open license. They live in `brand/` and `public/art/` with their own `LICENSE`: all rights reserved for now, and Erick can open them later.
- **Sprites:** drawn in this repo as original pixel art for launch, and loaded through an atlas so an artist's sheet can replace them later without code changes.
- **Testing:** `node:test` with `tsx` (already set up) for pure logic; integration tests against the dev database for RLS, checkout and the Gate; Playwright for the main flows (sign up, list, buy, connect an agent), at desktop width and at 390px.

## 15. Milestones
Each milestone ends with its tests passing, desktop and 390px checked, empty/loading/error states done, AA contrast checked, a craft review against 4.8 and 4.9, and a short demo note in the PR description.

| # | Milestone | Contents |
| --- | --- | --- |
| M0 | Foundation and landing | Brand tokens, Geist, glass components, stamps, badges. The production scene engine with the sprite atlas, fade and scrim. The full landing page (5.4). `/sell`, `/agents`, `/fees`, `/gate`, `/open-source`, `/faq`, the docs skeleton. SEO and AEO plumbing (12). Money rules extended with tests. Update the handoff docs and `AGENTS.md`. AGPL `LICENSE` file and the separate art license. Motion tokens, the command palette shell, and the egg registry with the first eggs that live on M0 pages. |
| M1 | Accounts | Supabase project and the first migration. Sign up and sign in with every method in 6.1. Onboarding. Settings. Aliases and avatars. |
| M2 | Catalog | Categories, listing pages with JSON-LD and `.md` twins, booth pages, `/market` search and filters, OG images. Seed real goods (port today's `lib/catalog.ts` and add at least 3 per category), owned by a house booth. |
| M3 | Booths and the Gate | Verification (test mode), the booth dashboard, the listing form, uploads, the four checkers, the editor queue, notes and resubmit, versions, reports. |
| M4 | Buying | Cart, Stripe test checkout, balance loads, webhook, orders, grants, Library, downloads and installs, receipts and email, refunds, reviews, comments, saves. |
| M5 | Agents | Agent rows, keys, OAuth and device flow, the MCP server with every tool, the REST API and OpenAPI, caps and approvals, the activity feed, connect pages and client setups, docs. |
| M6 | Status | Points ledger, buyer levels, booth ranks and stamp unlocking, badges including Builder through GitHub, Dollar Night. |
| M7 | Crypto | Wallet linking, quotes, Solana split on devnet, the splitter contract on Base Sepolia and Ethereum Sepolia, confirmation, receipts. |
| M8 | Payouts and fund | Connect payouts math and a monthly job, the fund ledger page. |
| M9 | Later | Services, PayPal and Venmo, Ask the booth, the Wanted board, Bitcoin over Lightning, x402, semantic search, mirrors. Each one gets a short design first. |

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
12. Display headlines use a serif face, and one variable switches them to Geist (4.2). Erick saw both in the mockup and hasn't picked yet.
13. Cyan stays as the single interface accent. Gradient washes and most glass are gone (4.3, 4.5, 4.8).
14. The hero buttons say "Browse the market" and "Connect an agent", and the closing line is "The market is open." (5.4). "The first market built for agents" was dropped because it can't be proven.
15. Services wait until M9 (7.1).
16. Refunds: self-serve within 7 days if unopened, an editor decides if opened, and a sale is kept after 14 days (10.5).
17. US-based makers only at launch. Tax goes on top and never comes out of the 90% (10.5).
18. The name, wordmark and art are not under the open license (14).
19. Rank belongs to the person and is shared across their aliases (8.1).
20. One maker per crypto payment, and crypto-only booths can't be bought with a balance (10.2).
21. No compiled binaries in v1 (7.1).
22. Launch sprites are drawn in this repo, and an artist's sheet can replace them later (14).
23. The first easter-egg set (4.10). The lawyer reviews it with the legal pages.
24. The design references were read and distilled into 4.8 and 4.9. None is installed.
