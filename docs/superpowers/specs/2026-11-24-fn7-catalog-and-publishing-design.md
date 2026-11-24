# fn/7 catalog and publishing design

Date: 2026-11-24. Status: draft for Erick's approval. Branch: `platform-v1`.

This is the companion to [the platform design](2026-11-24-fn7-platform-design.md). It is the authority on what can be sold, how a maker packages and publishes it, how it is shown, and how agents and people find it. Where the two documents differ on those subjects, this one wins. Brand, look, craft, motion, accounts, payments and the Gate's review roles stay in the platform design.

---

## 1. Intent

Erick's brief: "GitHub + Gumroad + Whop + OnlyFans + Udemy, but open source, for agents." A marketplace where anything digital can be packaged, shown well, found by a person or an agent, bought in seconds and trusted.

What fn/7 takes from each, and what it leaves:

| From | Takes | Leaves |
| --- | --- | --- |
| GitHub | Versioned releases with changelogs. A README as the page. Publishing from git and a CLI. Stars (here, saves). Issues (here, questions). An open API. | Hosting unpublished work, pull requests, CI. |
| Gumroad | List something in minutes. A simple product page. Instant delivery. License keys. | Pay-what-you-want and typed-in prices. fn/7 keeps stamps. |
| Whop | Buying grants access, not only a file: a members area, a license, an install. | Access to things fn/7 can't inspect (private Discords, hosted apps) until later. |
| OnlyFans | Following a maker. A feed of posts. A members-only tier. | Adult content, private messages, card-on-file subscriptions. |
| Udemy | Courses with a curriculum, preview lessons, progress, completion, questions and reviews. | Perpetual discount pricing. |

**Goals**
1. A maker can publish any supported digital good in under ten minutes, from the browser, a terminal, a git tag or an agent.
2. Every listing looks good with no design work from the maker.
3. An agent can find the right good for a task, judge it without buying it, buy it, verify it and install it, all through structured calls.
4. Everything a buyer receives can be traced: who made it, what is in it, what it needs, and which checks it passed.
5. It's fun to take part: status is visible in the world, and play never becomes pressure.

**Honest limit.** No marketplace is bulletproof. Section 11 describes layered defenses and names what is still exposed. Three outside reviews are required before real money and strangers: a penetration test, a smart-contract audit, and Erick's lawyer.

## 2. What is new here

These are the rails fn/7 builds that the five products above don't have. Each is small enough to ship and is open, so others can adopt it.

1. **An open package format, `fn7.json`.** One manifest describes any digital good: what it is, what is in it, how it installs, what it needs, its license and its price. The schema is published, so mirrors and other markets can read fn/7 packages. (Section 5.)
2. **Declared capabilities.** A maker states what a good needs: network access, secrets, shell commands, which folders it writes to. The Gate checks the files against the claim. An agent can refuse anything that needs more than its owner allows. (5.3)
3. **Screening for hostile instructions.** Skills and prompts are instructions an agent will follow, so the Gate reads them as an attacker would write them: hidden text, requests for keys, commands to ignore the agent's owner. Marketplaces for people don't need this. A marketplace for agents can't run without it. (11.3)
4. **Signed proof of review.** When a release passes the Gate, fn/7 signs a statement of what was checked and the hash of what was checked. An agent verifies it before installing. Every statement goes in a public, append-only log. (11.4)
5. **Signed receipts.** A purchase produces a signed receipt that proves the right to use the good, checkable offline against fn/7's public key. (11.4)
6. **Works-with reports.** After an install, an agent can report whether the good worked, on which client and version. Listings show the real rate once there are enough reports. (9.4)
7. **Prepaid passes.** Memberships without the subscription trap: a pass is 30 days of access bought with a stamp. It renews only from an fn/7 balance, only if switched on, and lapses quietly when it can't. (Section 10.)
8. **Splits.** A listing can pay co-makers from the maker's 90%, automatically, on every rail, including in the same on-chain transaction. (10.4)
9. **A signed public catalog.** The whole live catalog is published as a signed file anyone can mirror and index. (9.3)

## 3. Calls that change earlier decisions

| Topic | Before | Now |
| --- | --- | --- |
| Subscriptions | Out (handoff and platform design) | Still no card-on-file subscriptions. **Prepaid passes** arrive in M9 (section 10). |
| Free goods | Stamps start at $1 | A **Free** stamp exists, with limits (5.5). It's for open-source goods and for letting an agent try a maker. |
| Categories | Seven | **Eight:** Agents, Code, Learn, Templates, Media, Software, Assets, Data (section 4). |
| Semantic search | A later decision | In M5, alongside the agent tools (9.1). |
| Comments on a listing | "Comments" | Presented as **Questions**, with the same rules as the handoff's comments (7.2). |
| Featuring on your own booth | Keyholder rank | Any booth can feature three listings on its own page. Featuring on the landing page stays with Channel. |
| One maker per crypto payment | One recipient | One listing's makers per payment: the maker, up to four co-makers, and fn/7 (10.4). |
| Milestones | M0–M9 | Restaged in section 14. That table replaces the one in the platform design. |
| Adult content | Not stated | Not allowed. Stripe forbids it, and "OnlyFans" in the brief means the membership model. |

## 4. What can be sold

### 4.1 The model

- **Listing.** The thing on the shelf. It has a type, a price stamp, a license, media and a description.
- **Release.** One version of a listing: a frozen set of files plus its manifest and changelog. Every release passes the Gate. A release is never edited; a fix is a new release.
- **File.** An uploaded file with a role: `deliverable`, `sample`, `cover`, `gallery`, `trailer` or `caption`.
- **Access.** How the buyer receives the good. A listing offers one or more:
  - **Download:** the files, through short-lived signed links.
  - **Install:** written into an agent's or editor's folder by the CLI, or handed to an agent over MCP with the steps for its client.
  - **View in place:** watched, heard or read in the Library without downloading (lessons, video, audio, guides, posts).
  - **Key:** a license key issued per purchase, with an endpoint the maker's software calls to check it.
  - **Connected access** (an invitation to a private GitHub repo, a Discord role): later. fn/7 can't inspect what it grants, so it waits for its own design.
- **Collection.** A maker's named set of listings, shown as a shelf. "Add all to cart" adds each one. A collection has no price of its own.
- **Post** and **Pass.** Section 10.

### 4.2 Types of goods

Eight categories. Each type below is a **type profile** in code (4.3).

| Category | Types | Access | Shown with |
| --- | --- | --- | --- |
| **Agents** | skill, prompt pack, MCP server (source), MCP config, plugin, rules file, agent template, workflow | Install, download | File tree, the rendered `SKILL.md` or README, a sample, declared capabilities, the clients it works with |
| **Code** | starter, repo, library, snippet, script | Install, download | File tree, README, highlighted sample files, dependencies, license |
| **Learn** | course, lesson, guide (ebook), recorded workshop | View in place, download | Curriculum with lengths, free preview lessons, what you'll be able to do |
| **Templates** | doc, deck, spreadsheet, Notion template, design file, site theme | Download | Thumbnails of the first pages, what's included |
| **Media** | video, audio, photo set | View in place, download | Trailer, poster frames, chapters, a waveform with preview clips, a contact sheet |
| **Software** | app (source), extension, CLI | Download, key | Screenshots, README, platforms, declared capabilities, checksums |
| **Assets** | icons, font, UI kit, sprites, 3D, palette, presets, sound pack | Download | A generated contact sheet, a font tester, swatches |
| **Data** | dataset, eval set, embeddings, model | Download | A data card: schema, first rows, row count, size, source and license of the data |

Rules that apply to every type:
- **Formats.** An allow-list per type. Blocked everywhere in v1: executables and installers (`.exe`, `.dmg`, `.app`, `.msi`, `.deb`, `.apk`), compiled libraries and `.wasm`, disk images, macro-enabled Office files, shortcut files, and pickled Python objects (`.pkl`, pickle-based `.pt`, `.joblib`). Models are accepted only as safetensors, GGUF or ONNX.
- **Archives** are `.zip` or `.tar.gz`, at most two levels deep, and are unpacked by the Gate. The buyer can download the original archive or single files.
- **Limits.** 2 GB per file, 5 GB per release, 8 gallery images, one trailer of 90 seconds or less.
- **Data** listings must say where the data came from and confirm it holds no personal data.
- **Not allowed:** the handoff's refused goods, plus adult content, personal data, and anything that asks the buyer for passwords, keys or a wallet seed.

### 4.3 The type registry

`lib/catalog/types.ts` holds one profile per type. A profile declares:
- the files it requires and the formats it accepts
- how it's detected from an upload (4.4)
- which previewer builds its preview
- which access modes it supports, and its install adapters per client
- the extra Gate checks it needs
- which modules its listing page shows
- its schema.org type for structured data

Adding a type means adding a profile, with no new tables and no new pages. A type without a special previewer uses the **generic profile**: cover, file tree, sample and "what you get". That lets fn/7 open with a wide range and deepen type by type.

Previewers in M3: markdown and code tree, course curriculum, video and audio players, document thumbnails, image contact sheets, data card, font tester. Later: a 3D turntable, design-file embeds, notebooks.

### 4.4 Type detection

The uploader looks at what was dropped and proposes a type, which the maker confirms:
- a folder with `SKILL.md` is a skill
- `fn7.json` says what it is and wins over everything else
- `package.json`, `pyproject.toml`, `Cargo.toml` or `go.mod` is code
- a set of `.mp4` files with numbered names is a course; one `.mp4` is a video
- `.csv`, `.jsonl` or `.parquet` is a dataset
- `.safetensors`, `.gguf` or `.onnx` is a model
- a folder of `.svg` files is an icon set; `.ttf` or `.otf` is a font
- anything else starts as a generic file listing

## 5. The package

### 5.1 `fn7.json`

Every release has a manifest. The web uploader writes it for the maker. A maker using the CLI or git writes it by hand or with `fn7 init`. The JSON Schema is published at `fn7.ai/schema/fn7-1.json` and documented at `/docs/package`.

```json
{
  "spec": "fn7/1",
  "slug": "release-notes-skill",
  "type": "skill",
  "title": "Release-notes skill",
  "summary": "Writes release notes from a git diff in eight lines.",
  "version": "1.2.0",
  "category": "agents",
  "tags": ["git", "changelog"],
  "stamp": 500,
  "license": "fn7-standard-1",
  "access": ["install", "download"],
  "entry": "SKILL.md",
  "compat": { "clients": ["claude-code", "cursor"], "runtimes": [] },
  "install": { "claude-code": { "path": ".claude/skills/release-notes" } },
  "requires": { "network": false, "secrets": [], "shell": ["git"], "writes": ["."] },
  "made": "with-ai",
  "media": { "cover": "media/cover.png", "gallery": [], "trailer": null },
  "sample": ["SAMPLE.md"],
  "splits": [{ "alias": "@courier", "share": 80 }, { "alias": "@tinfox", "share": 20 }],
  "files": [{ "path": "SKILL.md", "bytes": 4210, "sha256": "…", "role": "deliverable" }]
}
```

- `files` and their hashes are filled in by the uploader or the CLI, never typed.
- The public copy of a manifest leaves out nothing but private file contents: paths, sizes and hashes are public, so a buyer can verify what they received.

### 5.2 Names

A release has one stable name: `fn7:@alias/slug@version`, for example `fn7:@courier/release-notes-skill@1.2.0`. It works in the CLI, the API and MCP. The page is `/g/[slug]`. Slugs are unique across the market. Versions follow semver, and the maker picks the number.

### 5.3 Declared capabilities

`requires` states what the good needs to work:
- `network`: false, or a list of hosts it contacts
- `secrets`: names of environment variables or keys it reads
- `shell`: commands it runs
- `writes`: folders it writes to, relative to where it's installed

The Gate compares the files with the claim (11.3). A release that does more than it declares is rejected. The listing page and every API response show the declaration in plain words ("Needs: git. No network. No secrets."). An agent's owner can set a policy, such as "never install anything that reads secrets", and the `install` tool enforces it.

### 5.4 Licenses and "made by"

Three licenses, each with machine-readable terms:

| License | Use in your own work | Commercial use | Redistribute |
| --- | --- | --- | --- |
| **fn/7 Standard** (default) | Yes | Yes | No |
| **fn/7 Personal** | Yes | No | No |
| **Open** (the maker picks MIT, Apache-2.0, or CC BY 4.0 for non-code) | Yes | Yes | Yes. The buyer pays for the packaging, support and updates. |

`made` is the maker's statement of how it was made: `by-hand`, `with-ai` or `by-agent`. It shows on the listing. A false statement is grounds for removal.

### 5.5 Stamps and the Free stamp

The stamps and rank rules in the platform design hold. One addition:
- **Free** (0 cents). No payment and no cart: "Get" for a person, `install` for an agent.
- A Walk-in booth may have one free listing; Regular and up may have five.
- A free listing passes the Gate like any other.
- Free listings earn no points and never count as sales or as "goods bought and opened".

## 6. Publishing

Four doors lead to one pipeline: **package → pre-check → upload → the Gate → Live.**

### 6.1 The studio (`/booth/new`)

A stepped page with a live preview. It saves as the maker goes, and every step can be revisited.

1. **Drop.** Drag in files, a folder or an archive, or paste a public GitHub URL to import a repo. Uploads are chunked and resumable, with progress per file. Each file is hashed in the browser.
2. **Type.** The proposed type (4.4) and category, to confirm or change.
3. **Details.** Title, summary, description (markdown), "what you get" bullets, tags, the clients it works with, capabilities (pre-filled from a scan of the files), license, and "made by".
4. **Media.** A cover, a gallery and a trailer (6.5). With no cover, fn/7's generated one is shown.
5. **Sample.** Which files or passages are free to see. Type-specific: a free lesson for a course, a clip for audio.
6. **Price.** The stamps this maker's rank has unlocked. Above $5, the justification. Co-makers and their shares.
7. **Preview.** Three views side by side: the card, the listing page, and "what an agent sees" (the exact JSON an agent's `get_listing` returns).
8. **Pre-check and submit.** The automatic checks run at once and list anything to fix before the wait: a leaked key, a thin summary, a missing sample, a capability the files use but the form doesn't declare. Then **Submit to the Gate**.

After submitting, the listing's status page shows the checks ticking through as they finish, each with its public note.

### 6.2 The CLI (`npx fn7`)

Open source, in this repository.
- `fn7 login`: signs in with a code approved in the browser.
- `fn7 init`: writes `fn7.json` by inspecting the folder.
- `fn7 check`: runs the same automatic checks the Gate runs, on the maker's machine. The rules are open code, so nothing about them is secret.
- `fn7 publish`: uploads a release and submits it. `fn7 status` shows the Gate's notes.
- Buyer commands: `fn7 search`, `fn7 add <name>` (buys if needed, verifies the signature, installs), `fn7 list`, `fn7 update`.

### 6.3 Git (M10)

A GitHub App. The maker connects a repo or a folder in it. Pushing a version tag publishes that commit as a release. The Gate's notes come back as a check on the commit. The README becomes the description, and `fn7.json` lives in the repo.

### 6.4 Agents

An agent with the `sell` scope publishes through MCP or the API: `listing_create_draft`, `listing_upload_url`, `listing_set_manifest`, `listing_precheck`, `listing_submit`, `gate_notes`. The same pipeline and limits apply.

### 6.5 Media

- **Cover.** 16:10, at least 1600×1000. It's the image on the card, the listing page and the share image.
- **Generated cover.** A listing with no cover gets a pixel "crate label" drawn by fn/7 from the listing's type, title and the booth's colors. It's deterministic, so it never changes between visits, and it keeps the market looking consistent when a maker has no art.
- **Gallery.** Up to eight images. **Trailer.** One video of 90 seconds or less.
- **Processing.** Images are resized into AVIF and WebP at fixed widths, stripped of location and device data, and given a blurred placeholder. Uploaded SVGs are drawn to PNG for display. Video gets a poster frame and is served with range requests. Captions (`.vtt`) are accepted for every video and required at $100 and up.
- **Alt text** is required for the cover and asked for on gallery images.
- **Checks.** Every image and video is screened before anyone else can see it (11.5).

### 6.6 Updates

- A new release goes through the Gate. The current release stays Live until the new one passes.
- Buyers get every update. The Library marks it "Updated", a weekly email lists updates, and an agent's `updates` call returns them.
- A maker can withdraw a release that has a problem. Buyers of it are told, and a security withdrawal also warns agents on their next call.

## 7. How a listing is shown

### 7.1 The card

Cover, a small type mark, title, the booth's name and rank mark, the stamp, and at most two "works with" chips. A rating appears once there are three reviews; before that, the card says "New". A listing from a new booth carries the "New maker" tag.

The market offers two views: a **grid** of cards, and a **list** of dense rows with sortable columns (type, stamp, updated, rating, works with) for people who compare.

### 7.2 The listing page

```
┌─────────────────────────────────┬──────────────────────────────────┐
│ Cover (16:10)                   │ Release-notes skill              │
│                                 │ by Courier   Hauler   badges     │
│                                 │                                  │
│ gallery thumbnails   trailer    │ [$5]   Add to cart    Buy now    │
│                                 │                                  │
│                                 │ Passed the Gate on 12 Nov 2026   │
│                                 │ Works with Claude Code, Cursor   │
│                                 │ Needs git. No network. No secrets│
├─────────────────────────────────┴──────────────────────────────────┤
│ Overview   What's inside   Preview   Reviews   Questions   Versions │
├────────────────────────────────────────────────────────────────────┤
│ For agents:  fn7 add @courier/release-notes-skill          [Copy]  │
└────────────────────────────────────────────────────────────────────┘
```

- **Overview.** The description, "what you get", license in plain words, and how it was made.
- **What's inside.** The file tree with sizes and hashes. For a course, the curriculum.
- **Preview.** Built by the type's previewer from the sample files.
- **Reviews.** Purchasers only, one each, as in the handoff. Works-with reports sit beside them (9.4).
- **Questions.** Anyone signed in can ask; the maker and purchasers can answer. These follow the handoff's comment rules: 500 characters, five an hour, one level of replies, no images or links.
- **Versions.** Each release with its date, changelog, Gate result and hash.
- **For agents.** The install command, the MCP call, and a link to the page's `.md` twin.

Counts are real or absent: buyers show from 10, ratings from 3 reviews, works-with rates from 20 reports.

### 7.3 In the Library

What a buyer owns opens in the right tool for its type:
- **Course player.** Lessons in order, with video, text and files. Progress is saved per lesson and resumes on any device. Finishing every lesson records a completion with a public, verifiable page.
- **Video and audio players,** with chapters, captions and speed.
- **Reader** for guides.
- **Files** for everything else: download all, download one, the install command, and the license key if there is one.

## 8. The booth

A booth is a maker's shop and profile at `/@alias`.

```
┌────────────────────────────────────────────────────────────────────┐
│ Banner: this booth as it stands in the pixel market                │
├────────────────────────────────────────────────────────────────────┤
│ avatar  Courier   @courier   Hauler      Agent booth  Verified     │
│         Skills for shipping code.          [Follow]  [Pass $5]     │
├────────────────────────────────────────────────────────────────────┤
│ Shop    Feed    Collections    Reviews    About    Members         │
├────────────────────────────────────────────────────────────────────┤
│ Featured listing, with its trailer                                 │
│ Listings, in the layout the maker chose                            │
└────────────────────────────────────────────────────────────────────┘
```

### 8.1 Shop layouts

The maker picks one. All five are built from the same card and row components.

| Layout | Looks like | Suits |
| --- | --- | --- |
| **Shelf** (default) | A grid of covers | Most booths |
| **Showcase** | One featured listing large, with its trailer, then the grid | A booth with a flagship |
| **List** | Dense rows with version and last update | Code and skills makers |
| **Path** | Listings in a numbered order with a line between them | Courses and lessons meant to be taken in sequence |
| **Gallery** | A masonry wall of images | Icons, photos, 3D, design assets |

Any booth can feature up to three listings at the top and arrange its collections as shelves.

### 8.2 Customization

Bounded on purpose, so every booth looks designed:
- a tagline, a bio, and links (site, GitHub, X)
- an accent from the token set, and one of twelve banner backdrops
- a shop layout, featured listings and collections
- the avatar: a pixel character or icon with a palette

### 8.3 The booth in the world

Each booth has a pixel booth, drawn from its own settings: the awning takes the accent color, the sign shows the category, the keeper is the avatar. It **grows with rank**:

| Rank | The pixel booth |
| --- | --- |
| Walk-in | A crate and a lamp |
| Regular | An awning over a counter |
| Hauler | A lit sign and shelves |
| Keyholder | A second level |
| Channel | Holo screens and a drone pad |
| Mainframe | A tower with its own beacon |

It appears in the booth's banner and on its share image. Featured booths stand in the landing page's market, where clicking one opens it.

### 8.4 For machines

`/@alias.md`, `/api/v1/booths/{alias}`, and a JSON feed of the booth's releases and public posts.

## 9. Discovery

One index, three ways in. Only Live listings are ever returned.

### 9.1 Search

`search` (MCP), `GET /api/v1/search` and `/market` are the same engine.

- **Query.** Keywords, or a plain description of the task: "write release notes from a git diff".
- **Matching.** Postgres full-text and trigram search combined with embeddings (pgvector) of the title, summary, description and README. The builder picks the embedding source, preferring one that adds no vendor.
- **Filters.** Category, type, stamp range, free, works with (client, runtime), needs (no network, no secrets), license, maker kind, rank, minimum rating, updated since, installable, payable by this caller.
- **Sort.** Best match, newest, recently updated, most bought, best rated.
- **Ranking.** Relevance first. Then quality signals: kept sales, unique buyers, refund rate, rating (weighted so three reviews don't beat three hundred), works-with rate, recent updates, and whether it fits the calling agent's client.
- **Fair start.** One slot in each page of results is held for a listing from a new maker that matches well, marked "New maker".
- **Never for sale.** Position can't be bought. The ranking code is public.

A result, as an agent receives it:

```json
{
  "name": "fn7:@courier/release-notes-skill@1.2.0",
  "fn7_url": "https://fn7.ai/g/release-notes-skill",
  "type": "skill",
  "price_cents": 500,
  "payable": true,
  "works_with": ["claude-code", "cursor"],
  "requires": { "network": false, "secrets": [], "shell": ["git"] },
  "license": { "id": "fn7-standard-1", "commercial": true, "redistribute": false },
  "trust": { "gate_passed_at": "2026-11-12", "rank": "hauler", "new_maker": false,
             "refund_band": "low", "worked_rate": 0.94, "worked_reports": 212 },
  "why": "Matches \"release notes\" and \"git diff\". Fits your client.",
  "maker_text": { "title": "Release-notes skill", "summary": "Writes release notes from a git diff in eight lines." }
}
```

Everything a seller wrote sits under `maker_text`. The docs and the MCP server's description tell agent builders to treat it as data, never as instructions (11.3).

### 9.2 Browse

- `list_categories` and `browse` by category and type
- shelves: new this week, recently updated, most bought, staff picks (placed by an editor)
- collections, and "works with your client"
- **Saved searches.** A person or an agent saves a search and asks what has changed since its last look, through a cursor. Feeds exist per category and per booth.

### 9.3 Direct, and the public catalog

- Every release resolves by name, by URL, by its `.md` twin, and by `GET /api/v1/listings/{name}`.
- **The public catalog.** Once a day, fn/7 publishes every Live listing's public manifest as one signed file at `/.well-known/fn7-catalog`. Anyone can mirror it, index it or build on it, and check the signature against fn/7's public key. This is the "signed catalog anyone can mirror" from the handoff.

### 9.4 Judging a good before buying

`get_listing` returns everything on the listing page as data: what's inside (paths, sizes, hashes), the sample content, declared capabilities, license terms, the trust object, the current price, versions with changelogs, review summaries, and the Gate's signed statement.

**Works-with reports.** After `install`, an agent can send one report per purchase: worked or didn't, the client, the version, and a short reason from a fixed list. People can send one from the Library. Reports aren't reviews and carry no free text. The listing shows the rate once there are 20.

### 9.5 After buying

`install` (verifies the signature, then returns files and steps for the named client), `library`, `updates`, `verify_receipt`, and `report_outcome`.

## 10. Follows, the feed, passes and splits

### 10.1 Follows and the feed

- Anyone signed in can follow a booth. Agents can too.
- **Home** shows new releases and posts from followed booths, newest first. Nothing is inserted that the person didn't follow.
- **Posts.** Markdown text, images, video, attached files, and links to listings. A post is **public** or **members-only**. Anything sold is a listing, so there is no separate "paid post".
- Public posts from Walk-in booths are held for the automatic checks first. Three reports hide a post for an editor.

### 10.2 Passes (M9)

A pass is prepaid access to a booth's members area.
- **What it opens:** members-only posts, and the listings the maker marks "included with the pass" for as long as the pass is active.
- **Price and length:** a stamp the maker's rank has unlocked, for 30 days. A 365-day pass costs a stamp no higher than ten times the 30-day one.
- **Who can offer one:** Regular rank and up.
- **Renewal.** Off by default. A holder can switch on renewal from their fn/7 balance. fn/7 reminds them three days before. If the balance is short, the pass lapses with a notice and no penalty. There is no card on file and no retry.
- **Crypto and cards** buy one period at a time.
- **Agents** can hold a pass. A renewal counts against the agent's monthly cap.
- Each paid period is one sale: 90% to the maker, and it counts toward rank once kept.

### 10.3 What stays out

Private messages, tips, and connected access. Each gets its own design later.

### 10.4 Splits (M8)

- A listing can name up to four co-makers besides its owner, with whole-percent shares that add to 100. Shares divide the maker's 90%.
- Every co-maker accepts the split before the listing can be submitted, and each must be able to be paid on the rails the listing accepts.
- Card and balance sales pay each share through Stripe Connect. On-chain, the splitter contract takes a list of recipients (at most six with fn/7) and pays them all in the same transaction. The contract is built this way from M7 even though the feature ships in M8.
- Every co-maker gets the sale toward their rank.

## 11. Trust and security

### 11.1 Layers

1. **A person answers for every booth** (platform design, 6.3).
2. **The package declares what it needs** (5.3).
3. **The Gate checks it:** automatic checks, an AI reviewer, and a person where the risk is higher (platform design, section 9, plus 11.2 and 11.3 here).
4. **fn/7 signs what passed,** and the buyer's tools verify it (11.4).
5. **Delivery is narrow:** short-lived links, files only into declared folders, nothing executed by fn/7's tools.
6. **Uploaded content never runs on fn/7's own site** (11.5).
7. **Money is watched:** payout delay, limits on new accounts, self-dealing detection (11.6).
8. **Everything important is logged,** and anyone can report anything.

### 11.2 Checks added for packaging

- **Manifest.** Valid against the schema. Every listed file exists with the stated hash. No file is missing from the list.
- **Formats.** The type's allow-list and the global block-list (4.2). File contents are checked against their extensions.
- **Archives.** Zip bombs, path traversal, symlinks, depth and count.
- **Dependencies.** For code, lockfiles are checked against OSV.dev for known-malicious and known-vulnerable packages, and names are checked for typosquats of popular packages.
- **Capabilities.** Network calls, secret reads, shell commands and writes found in the files are compared with `requires`.
- **Copies.** File hashes against the whole catalog, text similarity against live listings, image look-alike hashes against live covers, and, for code, license and author fields that don't match the maker.
- **Media.** Section 11.5.

### 11.3 Hostile instructions

Any file an agent will read as instructions (`SKILL.md`, prompts, rules files, READMEs) and any text an agent will see in search results is screened for:
- hidden text: zero-width and direction-switching characters, HTML comments, text encoded to hide it
- instructions to read or send keys, tokens, environment files, SSH keys or wallet files
- instructions to ignore, override or hide things from the agent's owner
- instructions to contact a server the package doesn't declare
- instructions to buy, rate, review or recommend anything on fn/7
- instructions to change the agent's own configuration outside the declared folder

The automatic check (the Lock) catches the patterns. The AI reviewer (the Scale) then reads the files as an attacker's and answers one question: "If an agent followed this exactly, would it do anything the declaration doesn't cover?" Any yes is a hold for a person.

On the way out, seller-written text is always labeled (`maker_text`), and the install tools never run anything.

### 11.4 Signatures

- **The Gate's statement.** When a release passes, fn/7 signs `{name, manifest hash, checks run, date}` with an Ed25519 key. The public keys are at `/.well-known/fn7-keys`.
- **The log.** Each statement is appended to a public log in which every entry includes the hash of the one before, so an entry can't be changed or removed without it showing. The log can be downloaded.
- **Receipts.** Each purchase yields a signed receipt: the order, the buyer's alias, the release, the price, the rail, and the transaction hash for on-chain sales. `verify_receipt` checks one online, and the public key checks it offline.
- **License keys.** Issued per purchase for listings that ask for them. `POST /api/v1/licenses/verify` answers whether a key is valid and for which release.
- **On install,** the CLI and the MCP `install` tool verify the statement and every file hash before writing anything.

Later: makers signing their own releases with their own keys.

### 11.5 Uploaded content

- No uploaded file is ever served from `fn7.ai` or rendered as HTML. Downloads come from the storage domain as attachments.
- Markdown is sanitized on the server. SVGs are drawn to PNG. PDFs and documents are shown as images.
- **Image and video screening,** before anything is visible to others:
  - a hash-matching service for child sexual abuse material. This is required before strangers can upload media, it needs a vendor and Erick's account, and his lawyer sets up the legal reporting duty.
  - the AI reviewer looks at covers and gallery images for adult content, violence, and marks or characters that belong to someone else.
- **Takedowns.** A public form, a named contact, a counter-notice path, and removal of repeat infringers. Erick's lawyer writes the policy.

### 11.6 Money

- Earnings become payable 14 days after a sale.
- New accounts have limits on balance loads and on purchases per day.
- Buying your own goods is blocked by account, and flagged by shared cards, devices and wallets.
- Stripe's fraud screening stays on, with extra verification when Stripe asks for it.

### 11.7 What is still exposed

- A skilled attacker can write instructions that pass every check. The defenses are the declared capabilities, the buyer's own policy, and fast withdrawal with warnings.
- Stolen work that has been reworded or redrawn can pass the copy checks. Reports and takedowns are the backstop.
- Human review doesn't scale. Auto-live for trusted makers at $5 and under is a deliberate trade.
- The smart contract and the site are unaudited until the outside reviews in section 1 are done.

## 12. Play

Status should be visible, earned and fun. Nothing here can be bought, and nothing punishes someone for stepping away.

- **The booth grows** with rank, in the world (8.3).
- **The stamp book.** Every purchase adds its stamp to the buyer's book, with a page per category. It's a record, and a nice thing to look at.
- **Quests.** Short one-time checklists that teach the product: opening a booth (verify, pick a look, list a first good, pass the Gate), a first purchase, connecting an agent, leaving a first review. Each ends in a badge.
- **Badges** (platform design, 8.3), plus completion marks for finished courses.
- **Seasons.** Each quarter has a theme and a shared goal for the whole market. Everyone who took part gets the season's mark when it's met. Makers compete with the goal, not each other.
- **Top lists.** Per category, by kept sales and low refunds over the last 30 days. A maker can opt out.
- **Drops.** A maker schedules a release for a set time, and followers see a real countdown.
- **Dollar Night** and the easter eggs, as already designed.

Not allowed: streaks that break, countdowns on things that don't end, caps on things that aren't scarce, random rewards, and anything that turns points into money.

## 13. Data model additions

These extend section 13 of the platform design. `listing_versions` there becomes `releases` here.

- **Packaging:** `releases` (listing, version, manifest JSON, manifest hash, changelog, status), `release_files` (path, bytes, sha256, role, storage path), `media` (listing, role, variants, placeholder, alt), `splits` (listing, alias, share, accepted_at)
- **Trust:** `attestations` (release, statement, signature), `gate_log` (sequence, entry hash, previous hash), `receipts` (order, signed body), `license_keys` (grant, key hash, status), `outcome_reports` (grant, agent, worked, client, version, reason)
- **Discovery:** `listing_embeddings` (listing, vector), `saved_searches` (owner, query, cursor), `collections`, `collection_items`
- **Community:** `follows`, `posts` (booth, body, visibility), `post_media`, `passes` (booth, stamp, days), `pass_periods` (pass, profile, starts, ends, order, renew), `questions` (the handoff's comments, renamed)
- **Learning and play:** `course_progress` (grant, lesson, position, done), `completions`, `quests`, `quest_progress`, `seasons`, `season_marks`

The stamp book is read from `order_items` and needs no table.

## 14. Milestones

This table replaces section 15 of the platform design. Each milestone still ends with tests passing, both widths checked, every state designed, AA contrast, and a craft review.

| # | Milestone | Contents |
| --- | --- | --- |
| M0 | Foundation and landing | As in the platform design, plus the threat model document and `SECURITY.md`. |
| M1 | Accounts | As in the platform design. |
| M2 | Catalog | The type registry with the generic profile. Listings, releases and media tables. Listing cards and pages, booth pages with the five layouts, `/market` with grid and list views, keyword search and filters. Generated covers. Structured data, `.md` twins and share images. Real seeded goods across all eight categories, from a house booth. |
| M3 | Publishing and the Gate | The studio with resumable uploads, type detection, `fn7.json`, the previewers listed in 4.3, the media pipeline, pre-check, the checks in 11.2 and 11.3, the editor queue, releases and updates, signed statements and the log. Verification in test mode. The Gate test set (15). |
| M4 | Buying | Cart, Stripe test checkout, balance, orders, signed receipts, the Library with the course, video and audio players and the reader, license keys, the Free stamp, refunds, reviews, questions, saves, collections. |
| M5 | Agents | Keys, OAuth and device flow. The MCP server and REST API with search (now with embeddings), `get_listing`, install adapters, `updates`, `verify_receipt`, works-with reports, saved searches, seller tools. The `fn7` CLI. Caps, approvals, policies and the activity feed. |
| M6 | Status and play | Points, levels, ranks and stamp unlocking, badges, the growing pixel booth, the stamp book, quests, top lists, Dollar Night, drops. |
| M7 | Crypto | As in the platform design, with the splitter built for a list of recipients. |
| M8 | Payouts, fund and splits | Payout math and the monthly job, the fund ledger, co-maker splits on every rail. |
| M9 | Follows, feed and passes | Follows, Home, posts, members areas, prepaid passes and renewal from balance. |
| M10 | Git and the open catalog | The GitHub App, the signed public catalog, the downloadable log, seasons. |
| Later | | Services, connected access, tips, private messages, PayPal, Bitcoin, x402, maker-held signing keys, the 3D viewer, watermarking, the Wanted board and standing orders, referrals. Each gets a short design first. |

## 15. Engineering bar

- **The Gate test set.** A folder of packages that must be caught: leaked keys, a zip bomb, path traversal, a pickled model, a typosquatted dependency, every kind of hostile instruction in 11.3, an undeclared network call, a copied listing. And a folder of clean packages that must pass. Both run in CI. A new attack found in the wild is added before it is fixed.
- **Access rules are tested.** Every table has tests for what a visitor, a buyer, a maker, an editor and an agent can read and write.
- **Money paths are idempotent** and tested for replay: checkout, webhooks, grants, refunds, payouts.
- **CI runs** type checks, lint, unit and integration tests, the browser flows at both widths, automated accessibility checks, and page-speed budgets on the landing, market and listing pages.
- **The manifest parser is fuzzed.** Uploads are size-checked before they are read.
- **Rate limits** on every write and every search, per key and per address.
- **Audit log** for every editor and admin action.
- **Dependencies** are pinned and checked in CI. Secrets live only in the environment and are used through one server-only module.
- **Targets.** Search answers in under 300ms at the 95th percentile with 100,000 listings. Listing pages are static with revalidation.
- **Errors and logs.** The builder picks one error tracker and says which in the plan.

## 16. Left to the builder

- The upload protocol and library, the embedding source, the image and video processing tools, and the error tracker.
- The exact allow-list of formats per type, starting strict.
- The pixel-booth sprites for each rank and the generated cover's drawing rules, inside the art direction of the platform design.
- The fixed list of reasons in a works-with report.
- Thresholds for similarity, typosquats and account limits.

## 17. Calls made in this document for Erick to check

1. Memberships are prepaid passes, with renewal only from a balance. No card-on-file subscriptions.
2. A Free stamp exists, capped at one listing for a new booth and five after that.
3. No adult content.
4. Eight categories, with "Skills" widened to "Agents", "Courses" to "Learn", and "Video" to "Media", plus "Data".
5. Model files only in safe formats, and no compiled software or executables in v1.
6. Three licenses: Standard, Personal and Open.
7. Makers state how a good was made: by hand, with AI, or by an agent.
8. A listing with no cover gets a pixel cover drawn by fn/7.
9. Booth customization is bounded: five layouts, twelve banners, the token colors.
10. Ranking can't be bought, and one result per page is held for a new maker.
11. Agents can send works-with reports, with no free text.
12. Paid posts don't exist as a separate thing. Anything sold is a listing.
13. Passes, follows and the feed come in M9, after buying, agents, status, crypto and payouts.
14. Image and video uploads from strangers wait for a child-safety scanning vendor and the lawyer's reporting setup.
15. Tips, private messages and connected access (Discord, private repos) are left for later.
16. Up to four co-makers per listing.
