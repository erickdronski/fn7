import { AVATARS } from "./catalog/avatars";
import type { Accent, Banner, BoothKind, Layout } from "./catalog/booth";
import type { AccessMode, Category, ClientId, GoodType, License, Made, Permissions } from "./catalog/types";
import type { PriceTier, Rank } from "./tiers";

/**
 * Sample data for the market preview. None of these booths or goods exist:
 * they stand in so the pages can be browsed before accounts and publishing
 * are built. There are no reviews, ratings, sales or buyer counts here,
 * because any such number would be invented.
 */

export type Booth = {
  alias: string;
  name: string;
  kind: BoothKind;
  rank: Rank;
  tagline: string;
  bio: string;
  /** The name of a color token in app/globals.css. */
  accent: Accent;
  layout: Layout;
  banner: Banner;
  /** Pixel avatar, as sprite rows (lib/catalog/avatars.ts). */
  avatar: readonly string[];
  /** Up to three of the booth's own listings, shown first. */
  featured: string[];
};

export type ListingFile = { path: string; bytes: number };

export type Listing = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: Category;
  type: GoodType;
  /** The alias of the booth that sells it. */
  booth: string;
  priceCents: PriceTier;
  version: string;
  license: License;
  access: AccessMode[];
  worksWith: ClientId[];
  permissions: Permissions;
  made: Made;
  whatYouGet: string[];
  /** A piece of the work itself, shown as the preview. */
  sample: string;
  files: ListingFile[];
  /** The day of the latest release, as YYYY-MM-DD. */
  updated: string;
};

/** A good that runs nothing, contacts nothing, reads no secrets and writes nowhere. */
const NOTHING: Permissions = { network: false, secrets: [], shell: [], writes: [] };

export const BOOTHS: Booth[] = [
  {
    alias: "courier",
    name: "Courier",
    kind: "agent",
    rank: "hub",
    tagline: "Skills for shipping code.",
    bio: "Courier is an agent booth run by a two-person release team. It publishes the skills, rules and servers it uses on its own pull requests, each one small enough to read before you install it.",
    accent: "cyan",
    layout: "list",
    banner: "circuit",
    avatar: AVATARS.bot,
    featured: ["release-notes-skill", "postgres-readonly-mcp"],
  },
  {
    alias: "cratecrab",
    name: "Crate Crab Labs",
    kind: "business",
    rank: "nexus",
    tagline: "Starters and tools you can read end to end.",
    bio: "A three-person shop that sells the code it would otherwise rewrite for every client. Everything ships as source with tests, and nothing phones home.",
    accent: "coral",
    layout: "showcase",
    banner: "grid",
    avatar: AVATARS.crab,
    featured: ["billing-ready-starter", "logfold-cli"],
  },
  {
    alias: "chalkowl",
    name: "Chalk Owl",
    kind: "person",
    rank: "core",
    tagline: "Short courses on building with agents.",
    bio: "A former platform engineer who teaches one idea at a time. Start with the free lesson and take the rest in order: each one builds on the last.",
    accent: "amber",
    layout: "path",
    banner: "stars",
    avatar: AVATARS.owl,
    featured: ["mcp-server-weekend"],
  },
  {
    alias: "foldcrane",
    name: "Fold Crane",
    kind: "person",
    rank: "node",
    tagline: "Templates that fit on one page.",
    bio: "A product writer with a new booth. Each template is the short version of a document that usually runs to twenty pages.",
    accent: "mint",
    layout: "shelf",
    banner: "waves",
    avatar: AVATARS.crane,
    featured: ["one-page-launch-plan"],
  },
  {
    alias: "tinfox",
    name: "Tin Fox",
    kind: "person",
    rank: "relay",
    tagline: "Pixel icons, palettes and loops.",
    bio: "An illustrator who draws on a twelve-pixel grid. Icons, sprites and background loops, all drawn by hand and all on the same grid, so they sit well together.",
    accent: "magenta",
    layout: "gallery",
    banner: "skyline",
    avatar: AVATARS.fox,
    featured: ["pixel-icons-240", "terminal-loops"],
  },
  {
    alias: "tallyworks",
    name: "Tally Works",
    kind: "business",
    rank: "mainframe",
    tagline: "Eval sets and data with a paper trail.",
    bio: "A data team that writes down where every row came from. Each release ships with a data card: the schema, the source, the license of the source, and a statement that it holds no personal data.",
    accent: "violet",
    layout: "shelf",
    banner: "rain",
    avatar: AVATARS.stack,
    featured: ["tool-call-eval-set", "cli-errors-knowledge-base"],
  },
];

export const LISTINGS: Listing[] = [
  // ---------- Agents: @courier ----------
  {
    slug: "release-notes-skill",
    title: "Release-notes skill",
    summary: "Writes release notes from a git diff in eight lines.",
    description:
      "Point it at two tags and it reads the diff, groups the changes by what a user can now do, and writes notes a person would send. It leaves out file paths, refactors and dependency bumps, and stops at eight lines unless you ask for more.",
    category: "Agents",
    type: "skill",
    booth: "courier",
    priceCents: 500,
    version: "1.2.0",
    license: "standard",
    access: ["install", "download"],
    worksWith: ["claude-code", "cursor"],
    permissions: { network: false, secrets: [], shell: ["git"], writes: [] },
    made: "with-ai",
    whatYouGet: [
      "SKILL.md, with the full instructions",
      "A sample run on a real open-source diff",
      "Install paths for Claude Code and Cursor",
      "Every later release of this listing",
    ],
    sample:
      "# Release notes\n\nRead the diff between the two refs.\nName what a user can do now that they couldn't before.\nLeave out file paths, refactors and dependency bumps.\nOne line per change. Stop at eight lines.",
    files: [
      { path: "SKILL.md", bytes: 4210 },
      { path: "SAMPLE.md", bytes: 1890 },
      { path: "fn7.json", bytes: 1180 },
      { path: "LICENSE.md", bytes: 640 },
    ],
    updated: "2026-11-12",
  },
  {
    slug: "postgres-readonly-mcp",
    title: "Read-only Postgres MCP server",
    summary: "An MCP server, as source, that lets an agent query Postgres and cannot write to it.",
    description:
      "Three tools: list the tables, describe one, and run a SELECT. Every query runs inside a read-only transaction with a row limit and a time limit, so a confused agent can't change or drain the database. It is 400 lines of TypeScript you can read in one sitting.",
    category: "Agents",
    type: "mcp-server",
    booth: "courier",
    priceCents: 1500,
    version: "0.9.2",
    license: "open",
    access: ["install", "download"],
    worksWith: ["mcp", "claude", "cursor"],
    permissions: { network: ["the host in DATABASE_URL"], secrets: ["DATABASE_URL"], shell: ["node"], writes: [] },
    made: "with-ai",
    whatYouGet: [
      "The server source in TypeScript, with tests",
      "Config snippets for three MCP clients",
      "A SQL script that creates a read-only role",
      "MIT license: change it and ship it",
    ],
    sample:
      'tool: query\ninput: { "sql": "select id, status from orders limit 5" }\n\nRuns inside: BEGIN TRANSACTION READ ONLY\nRow limit: 200. Time limit: 5 seconds.\nAnything that isn\'t a single SELECT is refused before it reaches the database.',
    files: [
      { path: "src/server.ts", bytes: 9840 },
      { path: "src/guard.ts", bytes: 3120 },
      { path: "test/guard.test.ts", bytes: 4470 },
      { path: "sql/readonly-role.sql", bytes: 720 },
      { path: "README.md", bytes: 5230 },
      { path: "fn7.json", bytes: 1420 },
    ],
    updated: "2026-11-19",
  },
  {
    slug: "pr-review-rules",
    title: "Pull-request review rules",
    summary: "A rules file that makes an agent review a diff the way a careful colleague would.",
    description:
      "Forty rules in plain sentences, grouped by what goes wrong most: missing tests, silent behavior changes, error handling and naming. The agent quotes the line, says what it would change and why, and never comments on formatting a linter already covers.",
    category: "Agents",
    type: "rules-file",
    booth: "courier",
    priceCents: 300,
    version: "2.0.1",
    license: "standard",
    access: ["install", "download"],
    worksWith: ["cursor", "claude-code", "windsurf", "copilot"],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: [
      "One rules file, in the format each client reads",
      "A shorter variant for small pull requests",
      "Notes on which rules to delete for your stack",
    ],
    sample:
      "## Tests\n\nIf a change alters behavior and no test changes with it, say so first.\nQuote the line. Say what you would change, and why, in one sentence each.\nDo not comment on formatting. The linter owns that.",
    files: [
      { path: "rules/review.md", bytes: 6120 },
      { path: "rules/review-short.md", bytes: 2240 },
      { path: "NOTES.md", bytes: 1810 },
      { path: "fn7.json", bytes: 1090 },
    ],
    updated: "2026-10-28",
  },
  {
    slug: "incident-notes-skill",
    title: "Incident-notes skill",
    summary: "Drafts a blameless incident write-up from a timeline, the linked pull requests and the fix.",
    description:
      "Give it an issue number. It reads the timeline and the pull requests that closed it, then writes what happened, what the impact was, why it happened and what changes. It names systems, never people, and marks every guess as a guess.",
    category: "Agents",
    type: "skill",
    booth: "courier",
    priceCents: 500,
    version: "1.1.0",
    license: "standard",
    access: ["install", "download"],
    worksWith: ["claude-code"],
    permissions: { network: ["api.github.com"], secrets: ["GH_TOKEN"], shell: ["git", "gh"], writes: ["docs/incidents"] },
    made: "by-agent",
    whatYouGet: [
      "SKILL.md and the write-up template it fills in",
      "Two sample write-ups from public incidents",
      "A checklist for the person who reviews the draft",
    ],
    sample:
      "# What happened\n\nBetween 14:02 and 14:31 UTC, checkout returned errors for card payments.\n\n# Why\n\nA config change shortened a timeout. (Confirmed in the linked pull request.)\nThe retry policy then tripled the load. (A guess: no metric covers it.)",
    files: [
      { path: "SKILL.md", bytes: 5360 },
      { path: "templates/write-up.md", bytes: 1480 },
      { path: "samples/checkout-errors.md", bytes: 3940 },
      { path: "samples/slow-search.md", bytes: 3510 },
      { path: "fn7.json", bytes: 1310 },
    ],
    updated: "2026-11-05",
  },
  {
    slug: "commit-message-prompts",
    title: "Commit-message prompt pack",
    summary: "Six prompts that turn a staged diff into a commit message in your project's own style.",
    description:
      "Each prompt reads the staged diff and the last twenty commit subjects, so the message matches how the project already writes them. There is one prompt each for a fix, a feature, a refactor, a revert, a dependency bump and a docs change.",
    category: "Agents",
    type: "prompt-pack",
    booth: "courier",
    priceCents: 0,
    version: "1.0.0",
    license: "open",
    access: ["install", "download"],
    worksWith: ["claude-code", "cursor", "codex"],
    permissions: { network: false, secrets: [], shell: ["git"], writes: [] },
    made: "by-agent",
    whatYouGet: ["Six prompts as Markdown files", "A one-page guide to choosing between them", "CC BY 4.0 license"],
    sample:
      "Read the staged diff and the last twenty commit subjects.\nWrite one subject line in the same style, 60 characters at most.\nSay what changed for the person using the code, not which files moved.\nAdd a body only if the reason isn't obvious from the diff.",
    files: [
      { path: "prompts/fix.md", bytes: 880 },
      { path: "prompts/feature.md", bytes: 910 },
      { path: "prompts/refactor.md", bytes: 860 },
      { path: "prompts/revert.md", bytes: 640 },
      { path: "prompts/bump.md", bytes: 590 },
      { path: "prompts/docs.md", bytes: 610 },
      { path: "GUIDE.md", bytes: 1720 },
    ],
    updated: "2026-10-09",
  },

  // ---------- Code and Software: @cratecrab ----------
  {
    slug: "billing-ready-starter",
    title: "Billing-ready SaaS starter",
    summary: "A Next.js and Postgres starter with accounts, teams and Stripe billing wired and tested.",
    description:
      "The parts every SaaS rebuilds: sign-in, teams with roles, plans, a customer portal and the webhooks that keep them in step. Billing runs against Stripe's test mode out of the box, and the test suite covers upgrades, downgrades, failed payments and cancellations.",
    category: "Code",
    type: "starter",
    booth: "cratecrab",
    priceCents: 3500,
    version: "3.1.0",
    license: "standard",
    access: ["download", "install"],
    worksWith: ["claude-code", "cursor"],
    permissions: { network: ["api.stripe.com"], secrets: ["STRIPE_SECRET_KEY", "DATABASE_URL"], shell: ["pnpm"], writes: ["."] },
    made: "by-hand",
    whatYouGet: [
      "The full source: 140 files of TypeScript",
      "A test suite for every billing state change",
      "An AGENTS.md so a coding agent can find its way around",
      "A written guide to going live, step by step",
      "Every later release of this listing",
    ],
    sample:
      "test('a failed renewal moves the team to past_due, not canceled', async () => {\n  const team = await teamOnPlan('pro');\n  await stripe.failNextInvoice(team);\n  await deliverWebhooks();\n  expect(await statusOf(team)).toBe('past_due');\n});",
    files: [
      { path: "app/", bytes: 412_000 },
      { path: "lib/billing/", bytes: 96_400 },
      { path: "test/billing/", bytes: 71_200 },
      { path: "db/migrations/", bytes: 18_900 },
      { path: "AGENTS.md", bytes: 3_860 },
      { path: "GOING-LIVE.md", bytes: 9_120 },
      { path: "fn7.json", bytes: 1_640 },
    ],
    updated: "2026-11-21",
  },
  {
    slug: "retry-queue",
    title: "Retry queue",
    summary: "A 300-line TypeScript job queue with retries, backoff and a dead-letter list. No dependencies.",
    description:
      "A queue small enough to read before you trust it. Jobs retry with exponential backoff and jitter, give up after a limit you set, and land in a dead-letter list you can inspect and replay. It stores its state in Postgres through one table.",
    category: "Code",
    type: "library",
    booth: "cratecrab",
    priceCents: 1000,
    version: "2.4.0",
    license: "open",
    access: ["download", "install"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["The library source and its types", "A test suite that covers every retry path", "One migration file", "Apache-2.0 license"],
    sample:
      "const queue = createQueue(db, { retries: 5, backoff: 'exponential' });\n\nqueue.on('send-receipt', async (job) => {\n  await mail.send(job.data.to, receipt(job.data.order));\n});\n\nawait queue.add('send-receipt', { to, order });",
    files: [
      { path: "src/queue.ts", bytes: 8_940 },
      { path: "src/backoff.ts", bytes: 1_260 },
      { path: "test/queue.test.ts", bytes: 11_300 },
      { path: "migrations/001-jobs.sql", bytes: 980 },
      { path: "README.md", bytes: 4_410 },
    ],
    updated: "2026-11-02",
  },
  {
    slug: "session-check-snippet",
    title: "Session check in ten lines",
    summary: "One function that checks a session and redirects, with the three tests that usually get skipped.",
    description:
      "No provider is baked in: you bring the session, and the function decides whether to let the request through. The tests cover an expired session, a tampered cookie and a redirect loop, which are the three cases that break in production.",
    category: "Code",
    type: "snippet",
    booth: "cratecrab",
    priceCents: 300,
    version: "1.0.2",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["One file of TypeScript", "Three tests", "A short note on where to call it"],
    sample:
      "export async function requireSession(request: Request) {\n  const session = await readSession(request);\n  if (!session || session.expiresAt < Date.now()) {\n    return redirect(signInUrl(request));\n  }\n  return session;\n}",
    files: [
      { path: "require-session.ts", bytes: 620 },
      { path: "require-session.test.ts", bytes: 1_940 },
      { path: "README.md", bytes: 1_100 },
    ],
    updated: "2026-10-14",
  },
  {
    slug: "logfold-cli",
    title: "logfold",
    summary: "A CLI that folds repeated log lines into one line with a count, so the odd line stands out.",
    description:
      "Pipe a log into it. Lines that differ only by an id, a number or a time are folded together and counted, and whatever is left is the part worth reading. It ships as readable TypeScript source, with no network access and nothing to install beyond Node.",
    category: "Software",
    type: "cli",
    booth: "cratecrab",
    priceCents: 1000,
    version: "1.3.1",
    license: "standard",
    access: ["download", "key"],
    worksWith: [],
    permissions: { network: false, secrets: [], shell: ["node"], writes: [] },
    made: "by-hand",
    whatYouGet: ["The CLI as TypeScript source", "A license key for one person", "Patterns for six common log formats", "SHA-256 checksums for every file"],
    sample:
      "$ kubectl logs api | logfold\n\n 4,812x  GET /health 200 <n>ms\n   311x  cache miss key=<id>\n     1x  error: connection reset by peer (upstream=billing)\n     1x  retrying in <n>ms",
    files: [
      { path: "src/cli.ts", bytes: 5_210 },
      { path: "src/fold.ts", bytes: 7_480 },
      { path: "patterns/", bytes: 6_300 },
      { path: "test/fold.test.ts", bytes: 9_050 },
      { path: "README.md", bytes: 3_720 },
    ],
    updated: "2026-11-15",
  },
  {
    slug: "tab-shelf-extension",
    title: "Tab Shelf",
    summary: "A browser extension, as readable source, that parks a window's tabs on a named shelf.",
    description:
      "One click moves every tab in a window onto a shelf with a name, and one click brings them back. Shelves are stored in the browser's own storage, and the extension asks for no network access at all. You load it from the source folder.",
    category: "Software",
    type: "extension",
    booth: "cratecrab",
    priceCents: 500,
    version: "0.8.0",
    license: "personal",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "with-ai",
    whatYouGet: ["The extension source: nine files", "Steps for loading it in Chrome and Firefox", "The manifest, with every browser permission explained"],
    sample:
      'manifest.json\n\n"permissions": ["tabs", "storage"]\n"host_permissions": []\n\ntabs: to read the titles and addresses of the tabs you park.\nstorage: to keep your shelves on this computer. Nothing leaves it.',
    files: [
      { path: "manifest.json", bytes: 740 },
      { path: "src/shelf.js", bytes: 4_380 },
      { path: "src/popup.html", bytes: 1_920 },
      { path: "src/popup.css", bytes: 2_260 },
      { path: "README.md", bytes: 2_840 },
    ],
    updated: "2026-10-21",
  },
  {
    slug: "invoice-desk",
    title: "Invoice Desk",
    summary: "A self-hosted invoicing app, as source: clients, invoices, PDF export and a SQLite file you own.",
    description:
      "An invoicing app for one small business, built to be run by the person who uses it. Your data is a single SQLite file in a folder you choose. It makes no network requests, so it works on a laptop with the wifi off.",
    category: "Software",
    type: "app",
    booth: "cratecrab",
    priceCents: 5000,
    version: "2.0.0",
    license: "standard",
    access: ["download", "key"],
    worksWith: [],
    permissions: { network: false, secrets: [], shell: ["pnpm"], writes: ["data"] },
    made: "by-hand",
    whatYouGet: [
      "The full source, with tests",
      "A license key for one business",
      "Three invoice layouts you can edit as HTML",
      "A backup script and a restore script",
      "Every later release of this listing",
    ],
    sample:
      "Invoice 2026-041\n\nDesign review, 6 hours at 140.00       840.00\nPrototype, fixed price                 2,400.00\n\nSubtotal                               3,240.00\nTax, 20%                                 648.00\nTotal due by 14 Dec 2026               3,888.00",
    files: [
      { path: "app/", bytes: 284_000 },
      { path: "layouts/", bytes: 22_600 },
      { path: "scripts/backup.sh", bytes: 1_140 },
      { path: "scripts/restore.sh", bytes: 1_020 },
      { path: "test/", bytes: 58_300 },
      { path: "README.md", bytes: 6_480 },
    ],
    updated: "2026-11-08",
  },

  // ---------- Learn: @chalkowl, in the order they are meant to be taken ----------
  {
    slug: "first-eval-lesson",
    title: "Write your first eval",
    summary: "A free 20-minute lesson: turn one bug report into a test your agent has to pass.",
    description:
      "Start with a real failure: an agent that answered the wrong question. In twenty minutes you write the case, a grader and a pass mark, then run it. By the end you have one eval you understand completely, which is the right size to start with.",
    category: "Learn",
    type: "lesson",
    booth: "chalkowl",
    priceCents: 0,
    version: "1.0.0",
    license: "open",
    access: ["view"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["One 20-minute video, with captions", "The written version of the lesson", "The eval file you build, to compare with yours"],
    sample:
      "1. The bug report (2 min)\n2. Writing the case down (4 min)\n3. A grader that can't be flattered (6 min)\n4. Choosing a pass mark (3 min)\n5. Running it, and reading the failure (5 min)",
    files: [
      { path: "lesson.mp4", bytes: 148_000_000 },
      { path: "lesson.vtt", bytes: 21_400 },
      { path: "lesson.md", bytes: 9_860 },
      { path: "eval/first.yaml", bytes: 1_230 },
    ],
    updated: "2026-10-02",
  },
  {
    slug: "prompt-caching-guide",
    title: "A field guide to prompt caching",
    summary: "Forty pages on what to cache, where the breakpoints go and how to measure the saving.",
    description:
      "Caching is easy to switch on and easy to get wrong. This guide covers how to order a prompt so the stable part comes first, where to put breakpoints, what silently breaks a cache, and how to read the usage numbers to check that it worked.",
    category: "Learn",
    type: "guide",
    booth: "chalkowl",
    priceCents: 1000,
    version: "1.1.0",
    license: "personal",
    access: ["view", "download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["A 40-page guide, as PDF and EPUB", "Six worked examples, before and after", "A one-page checklist"],
    sample:
      "Chapter 2: Order is everything\n\nA cache matches from the first token. Put what never changes first:\nthe system prompt, then the tools, then the documents.\nPut what changes every turn last. One early edit throws the rest away.",
    files: [
      { path: "guide.pdf", bytes: 3_420_000 },
      { path: "guide.epub", bytes: 1_180_000 },
      { path: "examples/", bytes: 46_200 },
      { path: "checklist.pdf", bytes: 212_000 },
    ],
    updated: "2026-10-30",
  },
  {
    slug: "least-privilege-workshop",
    title: "Workshop: least-privilege agents",
    summary: "A recorded 90-minute workshop on giving an agent the narrowest permissions that still work.",
    description:
      "A working session, recorded. You take an agent that can do everything and cut it down: read-only credentials, an allow-list for the shell, a spending cap, and approvals for anything that can't be undone. Each cut is tested to make sure the job still gets done.",
    category: "Learn",
    type: "workshop",
    booth: "chalkowl",
    priceCents: 1500,
    version: "1.0.0",
    license: "standard",
    access: ["view", "download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["The 90-minute recording, in four parts, with captions", "The slides", "The starting repo and the finished one", "A permissions worksheet to fill in for your own agent"],
    sample:
      "Part 1: What can it reach today? (20 min)\nPart 2: Read-only by default (25 min)\nPart 3: The shell allow-list (25 min)\nPart 4: Approvals for what can't be undone (20 min)",
    files: [
      { path: "part-1.mp4", bytes: 310_000_000 },
      { path: "part-2.mp4", bytes: 388_000_000 },
      { path: "part-3.mp4", bytes: 402_000_000 },
      { path: "part-4.mp4", bytes: 296_000_000 },
      { path: "slides.pdf", bytes: 8_600_000 },
      { path: "worksheet.pdf", bytes: 164_000 },
    ],
    updated: "2026-11-10",
  },
  {
    slug: "mcp-server-weekend",
    title: "Build an MCP server in a weekend",
    summary: "Nine lessons that take you from an empty folder to a tested MCP server with OAuth.",
    description:
      "A course with one project. You build a real server: tools with typed inputs, errors an agent can recover from, sign-in with OAuth 2.1, and a test for every tool. Each lesson ends with something that runs, and the first two are free to watch.",
    category: "Learn",
    type: "course",
    booth: "chalkowl",
    priceCents: 2000,
    version: "1.4.0",
    license: "standard",
    access: ["view", "download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: [
      "Nine video lessons, with captions and transcripts",
      "The project repo, with a branch for each lesson",
      "A written reference for the parts of the protocol you use",
      "Every later release of this listing",
    ],
    sample:
      "1. What a tool call is (9 min, free)\n2. Your first tool, over stdio (14 min, free)\n3. Inputs an agent can't get wrong (17 min)\n4. Errors worth reading (12 min)\n5. Streamable HTTP (21 min)\n6. Sign-in with OAuth 2.1 (26 min)\n7. Testing every tool (19 min)\n8. Rate limits and caps (15 min)\n9. Shipping it (11 min)",
    files: [
      { path: "lessons/", bytes: 1_610_000_000 },
      { path: "captions/", bytes: 196_000 },
      { path: "repo.tar.gz", bytes: 486_000 },
      { path: "reference.pdf", bytes: 2_240_000 },
    ],
    updated: "2026-11-17",
  },

  // ---------- Templates: @foldcrane ----------
  {
    slug: "one-page-launch-plan",
    title: "One-page launch plan",
    summary: "A launch plan that fits on one page: the promise, the proof, the date and who does what.",
    description:
      "A plan people will read because it is one page. It has four boxes and a table: what you are promising, how you will prove it, the date, the risks, and a row for each task with one name beside it. A filled-in example is included.",
    category: "Templates",
    type: "doc",
    booth: "foldcrane",
    priceCents: 300,
    version: "1.2.0",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["The template, as DOCX and Markdown", "A filled-in example", "A half-page guide to cutting a plan down"],
    sample:
      "The promise: in one sentence, what can a customer do on launch day?\nThe proof: what will you show that makes it believable?\nThe date: one day, not a quarter.\nWho does what: one task per row, one name per task.",
    files: [
      { path: "launch-plan.docx", bytes: 38_400 },
      { path: "launch-plan.md", bytes: 2_180 },
      { path: "example.pdf", bytes: 126_000 },
      { path: "guide.md", bytes: 1_640 },
    ],
    updated: "2026-11-03",
  },
  {
    slug: "twelve-slide-pitch-deck",
    title: "Twelve-slide pitch deck",
    summary: "Twelve slides in the order an investor reads them, with speaker notes of one line each.",
    description:
      "Problem, who has it, what you built, why now, how it makes money, what you have shown so far, the team and the ask. Each slide has one sentence of guidance and room for one chart. It comes in a plain layout that survives being forwarded.",
    category: "Templates",
    type: "deck",
    booth: "foldcrane",
    priceCents: 500,
    version: "2.0.0",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["The deck, as PPTX and Keynote", "Speaker notes for every slide", "A PDF of the deck with a made-up company filled in"],
    sample:
      "Slide 3: What you built\n\nOne sentence. One picture of the product in use.\nIf you need two sentences, the product isn't the problem: the sentence is.\n\nSpeaker note: say what it does, then stop.",
    files: [
      { path: "pitch-deck.pptx", bytes: 1_840_000 },
      { path: "pitch-deck.key", bytes: 2_260_000 },
      { path: "example.pdf", bytes: 940_000 },
    ],
    updated: "2026-10-18",
  },
  {
    slug: "runway-spreadsheet",
    title: "Runway spreadsheet",
    summary: "Type in cash, costs and revenue, and see the month the money runs out under three plans.",
    description:
      "One sheet for inputs and one for the answer. You enter the cash in the bank, monthly costs, and what you expect to earn, and it shows the runway for a careful plan, an expected plan and a hopeful one. Every formula is visible and none is hidden.",
    category: "Templates",
    type: "spreadsheet",
    booth: "foldcrane",
    priceCents: 500,
    version: "1.3.0",
    license: "personal",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["The spreadsheet, as XLSX and ODS", "A version with sample figures filled in", "A page that explains each formula"],
    sample:
      "Month      Cash in    Cash out   Balance    Runway\nJan 2027   12,000     31,500     168,500    8.6 months\nFeb 2027   13,200     31,500     150,200    8.2 months\nMar 2027   14,500     33,000     131,700    7.1 months",
    files: [
      { path: "runway.xlsx", bytes: 64_200 },
      { path: "runway.ods", bytes: 51_800 },
      { path: "runway-sample.xlsx", bytes: 66_900 },
      { path: "formulas.md", bytes: 3_020 },
    ],
    updated: "2026-11-11",
  },
  {
    slug: "changelog-site-theme",
    title: "Changelog site theme",
    summary: "A static theme for a public changelog: dated entries, an RSS feed and no JavaScript.",
    description:
      "Write each entry as a Markdown file and the theme builds a page with a date, a title and the changes. It makes an RSS feed and a JSON feed, loads in one request, and reads well on a phone. Colors and type are set by eight variables.",
    category: "Templates",
    type: "site-theme",
    booth: "foldcrane",
    priceCents: 0,
    version: "1.0.1",
    license: "open",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "with-ai",
    whatYouGet: ["The theme: templates, one stylesheet and a build script", "Three example entries", "MIT license"],
    sample:
      "---\ndate: 2026-11-20\ntitle: Faster search\n---\n\n- Search results now appear as you type.\n- Fixed: a filter could be lost when you went back a page.",
    files: [
      { path: "templates/", bytes: 7_400 },
      { path: "theme.css", bytes: 5_120 },
      { path: "build.mjs", bytes: 3_660 },
      { path: "entries/", bytes: 1_480 },
      { path: "README.md", bytes: 2_390 },
    ],
    updated: "2026-10-25",
  },

  // ---------- Assets and Media: @tinfox ----------
  {
    slug: "pixel-icons-240",
    title: "240 pixel icons",
    summary: "A 12-pixel icon set in SVG and PNG, drawn on one grid at one weight.",
    description:
      "Interface icons for products that want a little pixel character without looking like a game. Every icon is drawn on the same twelve-by-twelve grid, takes its color from the text around it, and stays sharp at 12, 24 and 36 pixels.",
    category: "Assets",
    type: "icons",
    booth: "tinfox",
    priceCents: 500,
    version: "3.0.0",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["240 icons as SVG", "PNG exports at three sizes", "A contact sheet, and a list of names with keywords", "Every later release of this listing"],
    sample:
      "arrow-up  arrow-down  arrow-left  arrow-right\nbell  bolt  book  box  bug  calendar  cart  check\nchip  clock  cloud  code  coin  copy  crate  cursor\ndisk  door  download  eye  file  filter  flag  folder",
    files: [
      { path: "svg/", bytes: 186_000 },
      { path: "png/12/", bytes: 98_000 },
      { path: "png/24/", bytes: 142_000 },
      { path: "png/36/", bytes: 204_000 },
      { path: "contact-sheet.png", bytes: 88_400 },
      { path: "names.csv", bytes: 9_300 },
    ],
    updated: "2026-11-14",
  },
  {
    slug: "terminal-loops",
    title: "Terminal loops",
    summary: "Twelve seamless 10-second loops of abstract pixel terminals, for behind a talk or a stream.",
    description:
      "Slow, dark and quiet on purpose, so they sit behind text without fighting it. Each loop is ten seconds and joins itself with no visible cut. They are drawn frame by frame, and none of them shows real code or readable words.",
    category: "Media",
    type: "video",
    booth: "tinfox",
    priceCents: 500,
    version: "1.0.0",
    license: "standard",
    access: ["view", "download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["Twelve loops as MP4, at 1080p and 4K", "A poster frame for each", "A 60-second trailer of all twelve"],
    sample:
      "01 Slow cursor     02 Falling columns   03 Scanline drift\n04 Status blocks   05 Ticker             06 Graph breathing\n07 Rain on glass   08 Signal bars        09 Idle prompt\n10 Night build     11 Packet lights      12 Quiet grid",
    files: [
      { path: "1080p/", bytes: 412_000_000 },
      { path: "4k/", bytes: 1_380_000_000 },
      { path: "posters/", bytes: 6_200_000 },
      { path: "trailer.mp4", bytes: 38_000_000 },
    ],
    updated: "2026-11-06",
  },
  {
    slug: "market-sprite-sheet",
    title: "Market sprite sheet",
    summary: "Booths, crates, signs and eight walking characters at 16 pixels, with a tile map to start from.",
    description:
      "Everything needed to draw a small night market in a game or on a landing page. The characters walk in four directions with four frames each, and the booths are built from parts, so you can make your own. All of it is original art.",
    category: "Assets",
    type: "sprites",
    booth: "tinfox",
    priceCents: 300,
    version: "1.2.0",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["One sprite sheet as PNG, and the layered source file", "A JSON atlas with a name for every frame", "A sample tile map"],
    sample:
      '{ "frames": {\n    "walker-1/down/0": { "x": 0,  "y": 0, "w": 16, "h": 16 },\n    "walker-1/down/1": { "x": 16, "y": 0, "w": 16, "h": 16 },\n    "booth/awning/left": { "x": 0, "y": 128, "w": 16, "h": 16 }\n} }',
    files: [
      { path: "market.png", bytes: 46_800 },
      { path: "market.aseprite", bytes: 212_000 },
      { path: "atlas.json", bytes: 18_600 },
      { path: "sample-map.json", bytes: 7_240 },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "focus-room-tones",
    title: "Room tones for focus",
    summary: "Four 10-minute recordings of quiet rooms, with no music and no voices, for working to.",
    description:
      "A library at closing time, a server room, rain on a skylight and a train at night. Each one is a plain field recording, levelled so nothing jumps out, and cut to loop without a seam. There is a 30-second preview of each.",
    category: "Media",
    type: "audio",
    booth: "tinfox",
    priceCents: 300,
    version: "1.1.0",
    license: "personal",
    access: ["view", "download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["Four recordings as FLAC and MP3", "A looping version of each", "Notes on where and how each one was recorded"],
    sample:
      "1. Library, closing time (10:00)\n2. Server room, row C (10:00)\n3. Rain on a skylight (10:00)\n4. Night train, window seat (10:00)\n\nRecorded in stereo at 48 kHz. No music, no voices, no sudden sounds.",
    files: [
      { path: "flac/", bytes: 388_000_000 },
      { path: "mp3/", bytes: 96_000_000 },
      { path: "loops/", bytes: 204_000_000 },
      { path: "notes.md", bytes: 2_860 },
    ],
    updated: "2026-10-27",
  },
  {
    slug: "workbench-photo-set",
    title: "Workbench photo set",
    summary: "Thirty photos of keyboards, cables and notebooks on a dark desk, shot for article headers.",
    description:
      "Header images for technical writing that aren't a stock photo of a person pointing at a screen. Every photo has empty space on one side for a title. There are no logos, no screens with readable text and no people.",
    category: "Media",
    type: "photo-set",
    booth: "tinfox",
    priceCents: 500,
    version: "1.0.0",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["Thirty photos as JPEG, 6000 pixels wide", "Web-sized copies at 2400 pixels", "A contact sheet"],
    sample:
      "01 Keyboard, top down, space on the right\n02 Coiled cable on a notebook\n03 Three keycaps and a puller\n04 Soldering iron, cold, on its stand\n05 Open notebook, blank page, pen across it",
    files: [
      { path: "full/", bytes: 486_000_000 },
      { path: "web/", bytes: 74_000_000 },
      { path: "contact-sheet.jpg", bytes: 1_920_000 },
    ],
    updated: "2026-11-01",
  },
  {
    slug: "night-market-palette",
    title: "Night market palette",
    summary: "Eleven colors for dark interfaces, with every text and background pair checked to AA.",
    description:
      "Two near-blacks, three text tones and six accents, picked to work together on a dark page. The palette comes with a table of every text and background pair and its contrast ratio, so you know which pairs are safe before you use them.",
    category: "Assets",
    type: "palette",
    booth: "tinfox",
    priceCents: 100,
    version: "1.0.0",
    license: "open",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: ["The palette as CSS variables, JSON and ASE", "A contrast table for every pair", "CC BY 4.0 license"],
    sample:
      ":root {\n  --ink: #03040b;\n  --raise: #0a0c1f;\n  --text: #f3f2ff;\n  --signal: #5ef2ff;\n  --ember: #ffb347;\n}",
    files: [
      { path: "palette.css", bytes: 720 },
      { path: "palette.json", bytes: 940 },
      { path: "palette.ase", bytes: 1_360 },
      { path: "contrast.md", bytes: 3_180 },
    ],
    updated: "2026-10-05",
  },
  {
    slug: "mono-ui-kit",
    title: "Mono UI kit",
    summary: "Buttons, inputs, tables and a modal in one typeface and two weights, as a design file and CSS.",
    description:
      "A small kit for tools that should look calm. It has eighteen components, every state drawn, and the same components written as plain CSS with no build step. It is free while it is below version 1.",
    category: "Assets",
    type: "ui-kit",
    booth: "tinfox",
    priceCents: 0,
    version: "0.9.0",
    license: "open",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "with-ai",
    whatYouGet: ["The design file, with components and states", "One stylesheet, with no dependencies", "An HTML page that shows every component", "MIT license"],
    sample:
      ".button {\n  min-height: 40px;\n  padding: 0 16px;\n  border: 1px solid currentColor;\n  font: 500 14px/1 var(--mono);\n}\n.button:active { transform: scale(0.97); }",
    files: [
      { path: "mono-kit.fig", bytes: 2_840_000 },
      { path: "mono.css", bytes: 14_200 },
      { path: "index.html", bytes: 9_600 },
      { path: "README.md", bytes: 2_050 },
    ],
    updated: "2026-10-16",
  },

  // ---------- Data: @tallyworks ----------
  {
    slug: "tool-call-eval-set",
    title: "Tool-call eval set",
    summary: "600 graded tasks that check an agent picks the right tool, passes the right arguments and stops.",
    description:
      "Each task gives a request and a set of tools, and grades three things separately: the tool chosen, the arguments passed, and whether the agent stopped when it was done. Every task was written and checked by a person. It holds no personal data, and the tool definitions are synthetic.",
    category: "Data",
    type: "eval-set",
    booth: "tallyworks",
    priceCents: 10000,
    version: "2.1.0",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "by-hand",
    whatYouGet: [
      "600 tasks as JSONL, with graders",
      "A runner script for any chat API with tool use",
      "A data card: schema, how tasks were written, known gaps",
      "Every later release of this listing",
    ],
    sample:
      '{"id": "t-0142", "request": "Cancel my 3pm and tell Sam.",\n "tools": ["calendar.find", "calendar.cancel", "message.send"],\n "expect": [{"tool": "calendar.find"}, {"tool": "calendar.cancel"},\n            {"tool": "message.send", "args": {"to": "Sam"}}],\n "stop_after": 3}',
    files: [
      { path: "tasks.jsonl", bytes: 1_840_000 },
      { path: "graders/", bytes: 42_600 },
      { path: "run.py", bytes: 6_900 },
      { path: "DATA-CARD.md", bytes: 8_120 },
    ],
    updated: "2026-11-20",
  },
  {
    slug: "cli-errors-knowledge-base",
    title: "CLI error knowledge base",
    summary: "Error messages from 40 open-source command-line tools, each paired with its documented fix.",
    description:
      "A knowledge base for agents that work in a shell. Each entry holds an error message, the tool and version it comes from, the cause and the fix, taken from that tool's own documentation with a link to the page. It comes as text and as embeddings. The sources are all openly licensed, and it holds no personal data.",
    category: "Data",
    type: "embeddings",
    booth: "tallyworks",
    priceCents: 25000,
    version: "1.0.0",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "with-ai",
    whatYouGet: [
      "Every entry as Parquet, with its source link",
      "Embeddings in two sizes, as safetensors",
      "A data card: sources, licenses and how entries were checked",
      "A small retrieval example",
    ],
    sample:
      'tool: git 2.47\nerror: "fatal: refusing to merge unrelated histories"\ncause: The two branches share no common commit.\nfix: Pass --allow-unrelated-histories if you do mean to join them.\nsource: git-scm.com/docs/git-merge',
    files: [
      { path: "entries.parquet", bytes: 18_400_000 },
      { path: "embeddings-384.safetensors", bytes: 61_000_000 },
      { path: "embeddings-1024.safetensors", bytes: 163_000_000 },
      { path: "DATA-CARD.md", bytes: 11_300 },
      { path: "example/retrieve.py", bytes: 2_480 },
    ],
    updated: "2026-11-18",
  },
  {
    slug: "synthetic-support-tickets",
    title: "Synthetic support tickets",
    summary: "4,000 generated support tickets, each with an intent, a priority and a resolution.",
    description:
      "Tickets for testing a support agent without touching real customers. Every ticket was generated, then sampled and checked by a person. No ticket is based on a real conversation, and the set holds no personal data: names, emails and order numbers are made up.",
    category: "Data",
    type: "dataset",
    booth: "tallyworks",
    priceCents: 3500,
    version: "1.2.0",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "with-ai",
    whatYouGet: ["4,000 tickets as CSV and JSONL", "A split into train, validation and test", "A data card: how tickets were generated and checked"],
    sample:
      'id,intent,priority,subject,resolution\n1,refund,high,"Charged twice for one order","Refunded the second charge"\n2,login,low,"Reset link never arrives","Corrected a typo in the address on file"\n3,shipping,medium,"Tracking has not moved in 6 days","Reshipped the order"',
    files: [
      { path: "tickets.csv", bytes: 5_260_000 },
      { path: "tickets.jsonl", bytes: 7_140_000 },
      { path: "splits/", bytes: 12_400_000 },
      { path: "DATA-CARD.md", bytes: 6_740 },
    ],
    updated: "2026-10-29",
  },
  {
    slug: "intent-router-model",
    title: "Intent router",
    summary: "A 22 MB ONNX classifier that sorts a message into one of 14 support intents, on a CPU.",
    description:
      "A small model for the first step of a support flow: deciding what a message is about before a larger model reads it. It was trained only on the synthetic tickets sold in this booth, so no personal data went into it. It ships as ONNX, with the label list and a test set.",
    category: "Data",
    type: "model",
    booth: "tallyworks",
    priceCents: 5000,
    version: "1.1.0",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: NOTHING,
    made: "with-ai",
    whatYouGet: ["The model as ONNX", "The label list and the tokenizer files", "A held-out test set and a script that scores it", "A model card: training data, limits and known failures"],
    sample:
      '> "I was charged twice for the same order"\n  refund         0.93\n  billing-other  0.04\n  shipping       0.01\n\n> "where do I change my email"\n  account        0.88\n  login          0.09',
    files: [
      { path: "intent-router.onnx", bytes: 22_400_000 },
      { path: "tokenizer.json", bytes: 712_000 },
      { path: "labels.json", bytes: 420 },
      { path: "test.jsonl", bytes: 318_000 },
      { path: "score.py", bytes: 1_960 },
      { path: "MODEL-CARD.md", bytes: 5_480 },
    ],
    updated: "2026-11-13",
  },
];
