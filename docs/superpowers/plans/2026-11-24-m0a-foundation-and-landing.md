# fn/7 M0a: Open-source repo, foundation and landing page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public repo ready for contributors, and replace the prototype with the real landing page and open-source page, built to the approved design with motion on every interactive element.

**Architecture:** One Next.js 16 app (App Router, Server Components by default, small client components for motion and the canvas scene). Facts, tiers, ranks and site links live in typed modules under `lib/` and every page reads them from there. Styling is plain global CSS in `styles/`, driven by tokens.

**Tech Stack:** Next.js 16.4, React 19.3, TypeScript, pnpm, `node:test` through `tsx`, plain CSS with custom properties, the Canvas 2D API.

**Spec:** `docs/superpowers/specs/2026-11-24-fn7-platform-design.md` (sections 4, 5.1, 5.4, 12, glossary 4.11) and `docs/superpowers/specs/2026-11-24-fn7-catalog-and-publishing-design.md` (section 14 for the milestone order).

## Global Constraints

- Read `node_modules/next/dist/docs/` before using a Next API. Data fetched on the server is cached with `'use cache'` and `cacheLife`.
- Use only the glossary's words (platform design 4.11). Retired words must not appear in product code or copy.
- One interface accent: `--cyan` `#5ef2ff`. Page background `--bg` `#03040b`. Body text `--text` `#f3f2ff`. Secondary text must hold 7:1 on `--bg`.
- Type: Geist for reading, Newsreader for the largest statements only, Geist Mono only for code, terminal output and prices.
- Motion tokens: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. Press scales to 0.97. Animate only `transform`, `opacity`, `filter` and `clip-path` (accordion height is the one exception). Never `transition: all`.
- Every interactive element has hover, press and focus-visible motion (platform design 4.9). `prefers-reduced-motion` removes movement and keeps fades.
- The craft floor (platform design 4.8) applies to every screen. No invented numbers: a count that can't be fetched is not shown.
- Nothing is for sale yet. The site says so, and no button leads to a page that doesn't exist.
- The user's email address never appears in the repo.
- Code is AGPL-3.0-or-later. Brand and art are reserved.

## Review Focus

1. GitHub's API is down or rate-limited: the star button and the open-source page render with no counts instead of failing or showing zeros.
2. `prefers-reduced-motion`: no camera descent, no parallax, no scroll entrances; the scene shows one still frame.
3. Before JavaScript runs, or without it: every word on the page is visible.
4. A 390px-wide screen: no horizontal scrolling, and the navigation still reaches every page.
5. The tab is hidden or the scene is off screen: the scene's loop stops.

---

### Task 1: Open-source repository setup

**Files:**
- Create: `LICENSE` (AGPL-3.0 text from GitHub's license API), `brand/LICENSE.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` (Contributor Covenant from GitHub's API, contact set to GitHub private reporting), `SECURITY.md`, `.github/ISSUE_TEMPLATE/{bug.yml,idea.yml,feedback.yml,config.yml}`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/workflows/ci.yml`
- Modify: `README.md` (rewrite), `AGENTS.md` (point at the specs and the glossary), `HANDOFF.md` (banner: superseded), `package.json` (`"license": "AGPL-3.0-or-later"`, `typecheck` script)

- [ ] **Step 1:** Write the files. The README covers: what fn/7 is (the answer-first definition), an honest status line, a screenshot, quick start, the roadmap table, how to contribute, the star and feedback asks, license and security.
- [ ] **Step 2:** CI runs `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` on pushes and pull requests.
- [ ] **Step 3:** Commit.

### Task 2: Rules and facts

**Files:**
- Create: `lib/tiers.ts`, `lib/facts.ts`, `lib/site.ts`, `lib/roadmap.ts`, `lib/eggs.ts`, `lib/github.ts`
- Modify: `lib/prices.ts`, `lib/points.ts`
- Test: `lib/rules.test.ts` (replaces `lib/money.test.ts`; update the `test` script)

**Interfaces (produced):**
- `PRICE_TIERS = [0, 100, 300, 500, 1000, 1500, 2000, 3500, 5000, 10000, 25000, 50000]`, `RANKS = ['node','relay','hub','core','nexus','mainframe']`, `RANK_LABEL`, `tiersForRank(rank): number[]`, `isPriceTier(cents): boolean`, `formatPrice(cents): string`, `tierTone(cents): 'free'|'coral'|'mint'|'amber'|'cyan'|'violet'|'top'`
- `creatorCut(cents)`, `checkoutAllowed(rail, cents)`, `LOAD_AMOUNTS_CENTS = [1000, 2000, 4000, 10000]`
- `multiplier(itemCount)`, `pointsFor(lineCents: number[]): number`, `levelFor(points): 1|2|3|4|5|6`
- `FACTS` (definition, `creatorSharePct: 90`, `platformPct: 9`, `fundPct: 1`, card minimum, chains, license), `SITE` (repo owner, name and URLs for stars, forks, issues, discussions, each issue template), `MILESTONES`, `EGGS`
- `parseRepoStats(json: unknown): RepoStats`, `getRepoStats(): Promise<RepoStats>` where `RepoStats = { stars: number|null; forks: number|null; openIssues: number|null }`

- [ ] **Step 1: Write the failing tests**
  - `tiersForRank('node')` and `'relay'` equal `[0,100,300,500]`; `'hub'` adds `1000,1500`; `'core'` adds `2000`; `'nexus'` adds `3500,5000`; `'mainframe'` equals `PRICE_TIERS`.
  - `formatPrice(0) === 'Free'`, `formatPrice(500) === '$5'`, `formatPrice(25000) === '$250'`.
  - `isPriceTier(400) === false`, `isPriceTier(1500) === true`.
  - `creatorCut(50000) === 45000`, `creatorCut(333) === 299`.
  - `pointsFor([500]) === 5`, `pointsFor([300,100,100]) === 10`, five 100s `=== 15`, `pointsFor([50000]) === 25` (the per-line cap), `pointsFor([]) === 0`.
  - `levelFor(29) === 1`, `30 → 2`, `150 → 3`, `400 → 4`, `1000 → 5`, `2500 → 6`.
  - `FACTS.creatorSharePct + FACTS.platformPct + FACTS.fundPct === 100`, and `FACTS.creatorSharePct * 100 === CREATOR_SHARE_BPS`.
  - `parseRepoStats({ stargazers_count: 12, forks_count: 3, open_issues_count: 4 })` returns those numbers; `parseRepoStats({})`, `parseRepoStats(null)` and `parseRepoStats({ stargazers_count: 'x' })` return all `null`.
- [ ] **Step 2:** Run `pnpm test`. Expect failures for missing modules.
- [ ] **Step 3:** Implement. `getRepoStats` uses `'use cache'` with `cacheLife('hours')`, and returns all `null` on any error or non-200.
- [ ] **Step 4:** Run `pnpm test`. Expect all passing.
- [ ] **Step 5:** Commit.

### Task 3: Foundation and motion primitives

**Files:**
- Delete: the prototype pages and components (`app/{agents,basket,booth,good,jacket,stall,wanted,yard}`, `components/*`, `lib/{basket,market,night}.ts`). `lib/catalog.ts` stays for M2.
- Create: `styles/{tokens,base,ui,motion}.css`, `components/ui/{button,price-chip,pixel-icon,reveal,copy-button,menu,accordion,count}.tsx`, `components/site/{wordmark,nav,footer,star-button,strip}.tsx`
- Modify: `app/layout.tsx`, `app/globals.css` (imports only)

**Interfaces (produced):**
- `<Button href? variant="fill|line|ghost|ink" size="md|sm">`: renders `<a>` or `<button>`; has the press highlight.
- `<PriceChip cents>`; `<PixelIcon name size>` with `PIXEL_ICONS`; `<Reveal as? delay?>` (one entrance, visible by default without JS); `<CopyButton text label>`; `<Menu label items>` (keyboard: Enter, Space, Escape, arrows); `<Accordion items>`; `<Count value>` (rolls once into view; renders nothing when `value` is `null`).
- `<StarButton />`: an async server component that reads `getRepoStats()`.

- [ ] **Step 1:** Write tokens, base and motion CSS, then the primitives.
- [ ] **Step 2:** `<html>` gets class `js` from an inline script, so entrance styles apply only when scripts run (Review Focus 3).
- [ ] **Step 3:** `pnpm lint && pnpm typecheck`. Commit.

### Task 4: The scene

**Files:**
- Create: `components/scene/engine.js` (ported from `docs/superpowers/specs/mockups/scene-v2.js`), `components/scene/market-scene.tsx`

**Interfaces (produced):** `mountScene(stage: HTMLElement, opts: { reducedMotion: boolean }): { destroy(): void; party(): void }`; `<MarketScene />`.

- [ ] **Step 1:** Port the engine: no globals, takes the stage element, returns `destroy`. The loop runs only while the stage is on screen and the tab is visible (Review Focus 5). With `reducedMotion`, draw one settled frame and stop (Review Focus 2).
- [ ] **Step 2:** `<MarketScene>` mounts after first paint, masks the scene's edges, and plays the camera descent once per session.
- [ ] **Step 3:** Verify in the browser: the loop stops when scrolled away. Commit.

### Task 5: The landing page

**Files:**
- Create: `components/landing/{hero,agents,creators,pay,status,categories,gate,open-source-band,spec-sheet,faq,closing}.tsx`, `components/product/{agent-budget-card,booth-card,receipt,split-bar,tier-ladder,mcp-config}.tsx`, `styles/landing.css`
- Modify: `app/page.tsx`

Copy comes from platform design 5.4 and `FACTS`. Until accounts and the market exist, the hero buttons are **Star on GitHub** and **See the roadmap**, and each section's button links to the matching part of the design on GitHub. The strip reads: "fn/7 is being built in the open. Nothing is for sale yet."

- [ ] **Step 1:** Build the product components with seed data, then the sections in page order. The tier ladder is a real range control.
- [ ] **Step 2:** Add `Organization`, `WebSite` and `FAQPage` JSON-LD.
- [ ] **Step 3:** Verify at 1440px and 390px (Review Focus 4), with reduced motion on, and with scripts blocked. Commit.

### Task 6: Open-source page, feedback, 404, crawler files, eggs

**Files:**
- Create: `app/open-source/page.tsx`, `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts`, `components/site/konami.tsx`

- [ ] **Step 1:** The open-source page: star with a live count, three ways to help, feedback links to each issue template and to Discussions, the roadmap from `MILESTONES`, the Builder badge, and the license split.
- [ ] **Step 2:** Eggs from `EGGS`: the 404 line, "Use the source." and the fork line, and the Konami party.
- [ ] **Step 3:** Commit.

### Task 7: Verify, preview, publish

- [ ] **Step 1:** `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all pass.
- [ ] **Step 2:** Add `.claude/launch.json` and open the preview. Check the console for errors.
- [ ] **Step 3:** Add a screenshot to the README. Push `platform-v1`. Open a pull request to `main`.
- [ ] **Step 4:** Set the repo's description, topics and homepage. Turn on Discussions and private vulnerability reporting.
