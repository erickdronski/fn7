import type { BrandName } from "@/components/ui/brand-icon";
import type { PixelIconName } from "@/components/ui/pixel-icon";
import { FACTS } from "./facts";

/** Shared page content. Facts come from lib/facts.ts and lib/tiers.ts; this file holds the words around them. */

export const CATEGORIES: Array<{ name: string; icon: PixelIconName; types: string }> = [
  { name: "Agents", icon: "bot", types: "Skills, prompt packs, MCP servers, plugins, workflows" },
  { name: "Code", icon: "code", types: "Starters, repos, libraries, snippets, scripts" },
  { name: "Learn", icon: "book", types: "Courses, lessons, guides, recorded workshops" },
  { name: "Templates", icon: "grid", types: "Docs, decks, spreadsheets, design files, site themes" },
  { name: "Media", icon: "play", types: "Video, audio, photo sets" },
  { name: "Software", icon: "window", types: "Apps, extensions and CLIs, as readable source" },
  { name: "Assets", icon: "gem", types: "Icons, fonts, UI kits, sprites, 3D, presets" },
  { name: "Data", icon: "data", types: "Datasets, eval sets, embeddings, models in safe formats" },
];

export const GATE_CHECKS: Array<{ icon: PixelIconName; name: string; text: string }> = [
  { icon: "lock", name: "Security scan", text: "A security scan for leaked secrets, malware and risky installs." },
  { icon: "lens", name: "Prompt-injection scan", text: "A prompt-injection scan for instructions that turn an agent on its owner." },
  { icon: "sieve", name: "Quality review", text: "A quality review of the release against its own sample." },
  { icon: "shield", name: "Human review", text: "Human review for anything that runs code or costs more than $5." },
];

export const RANK_REASONS: Array<{ icon: PixelIconName; title: string; text: string }> = [
  {
    icon: "shield",
    title: "Buyers and agents can trust a price.",
    text: "A $500 tier can only come from a creator with 250 settled sales to 100 different buyers. An agent reads that rank as data before it spends.",
  },
  {
    icon: "lock",
    title: "Abuse can't start expensive.",
    text: "A new account can't list a $500 file on day one. Reaching a high tier takes real sales that weren't refunded, which is slow and costly to fake.",
  },
  {
    icon: "star",
    title: "Creators get a path to grow.",
    text: "Start small, prove the work, and raise the tier. Status and income rise together, and the booth grows with them.",
  },
];

export type Rail = { name: string; brand?: BrandName; note: string; when: "At launch" | "Later" };

export const RAILS: Rail[] = [
  { name: "Visa", brand: "visa", note: "Through Stripe. From $5.", when: "At launch" },
  { name: "Mastercard", brand: "mastercard", note: "Through Stripe. From $5.", when: "At launch" },
  { name: "Apple Pay", brand: "applepay", note: "Through Stripe. From $5.", when: "At launch" },
  { name: "Google Pay", brand: "googlepay", note: "Through Stripe. From $5.", when: "At launch" },
  { name: "Link", brand: "stripe", note: "Stripe's saved-payment wallet. From $5.", when: "At launch" },
  { name: "fn/7 balance", note: "Prepaid store credit. From $1.", when: "At launch" },
  { name: "USDC", note: "On Solana and Base. Split on-chain. From $1.", when: "At launch" },
  { name: "Solana", brand: "solana", note: "SOL. Split on-chain. From $1.", when: "At launch" },
  { name: "Ethereum", brand: "ethereum", note: "ETH on Base. Mainnet above $50.", when: "At launch" },
  { name: "Coinbase", brand: "coinbase", note: "Pay from a Coinbase wallet. Agent payments over x402, on Solana first.", when: "Later" },
  { name: "PayPal", brand: "paypal", note: "PayPal and Venmo. From $5.", when: "Later" },
  { name: "Bitcoin", brand: "bitcoin", note: "Over Lightning, once the split can stay non-custodial.", when: "Later" },
];

/** `icon` is fn/7's own, shown where the tool's mark is held back (lib/marks.ts). */
export type Connector = { name: string; brand?: BrandName; icon: PixelIconName; how: string };

/** Where fn/7 will plug in. All of these ship with or after the agent milestone (M5). */
export const CONNECTORS: Connector[] = [
  { name: "Any MCP client", icon: "plug", brand: "mcp", how: "The remote MCP server, with OAuth 2.1" },
  { name: "Claude", icon: "chat", brand: "claude", how: "A plugin for Claude Code. A read-only connector for the directory, which doesn't allow connectors that move money." },
  { name: "Cursor", icon: "window", brand: "cursor", how: "MCP server, with one-click setup" },
  { name: "Windsurf", icon: "window", brand: "windsurf", how: "MCP server, with one-click setup" },
  { name: "GitHub Copilot", icon: "code", brand: "copilot", how: "MCP server in VS Code" },
  { name: "Gemini", icon: "star", brand: "gemini", how: "MCP server" },
  { name: "Terminal", icon: "window", brand: "npm", how: "The fn7 CLI: search, add, publish, and a local MCP mode" },
  { name: "GitHub", icon: "fork", brand: "github", how: "Publish a release from a git tag" },
  { name: "LangChain", icon: "wrench", brand: "langchain", how: "Tools generated from the OpenAPI spec" },
  { name: "Zapier", icon: "bolt", brand: "zapier", how: "Triggers for sales, releases and reviews" },
  { name: "n8n", icon: "grid", brand: "n8n", how: "Nodes for the REST API and webhooks" },
  { name: "Discord", icon: "chat", brand: "discord", how: "Sale and release notices for a creator's server" },
];

export const MCP_TOOLS: Array<{ tool: string; does: string }> = [
  { tool: "search", does: "Find releases by keywords or by describing a task. Filter by category, price, permissions and client." },
  { tool: "get_listing", does: "Everything on a listing as data: contents, sample, permissions, license, track record and the Gate's attestation." },
  { tool: "cart_add, cart_view", does: "Collect several releases before paying." },
  { tool: "checkout", does: "Pay from the balance, inside the agent's cap. Purchases over the approval threshold wait for the owner." },
  { tool: "install", does: "Receive the files, the attestation, every file hash and the steps for the named client." },
  { tool: "library, updates", does: "What the owner already has, and which releases have new versions." },
  { tool: "verify_receipt", does: "Check a signed receipt." },
  { tool: "report_outcome", does: "Say whether an installed release worked, on which client and version." },
  { tool: "listing_create_draft, listing_submit, gate_notes", does: "For an agent that sells: publish a release and read the Gate's findings." },
];

export const FAQ: Array<{ q: string; a: string }> = [
  { q: "What is fn/7?", a: FACTS.definition },
  {
    q: "Can I buy or sell on it today?",
    a: "Not yet. fn/7 is being built in the open, one milestone at a time. The design is public, the code is public, and the roadmap shows what comes next. Star the repo to follow along.",
  },
  {
    q: "How much do creators keep?",
    a: `${FACTS.creatorSharePct}% of the price paid, on every sale, at every price tier and on every way to pay. fn/7 keeps 10%: ${FACTS.platformPct}% runs the market and ${FACTS.fundPct}% goes to a public open-source fund. There is no listing fee and no monthly fee.`,
  },
  {
    q: "What is earned pricing?",
    a: "Every price on fn/7 is one of twelve fixed tiers, from Free to $500, and a creator can't type a price. Everyone starts with Free, $1, $3 and $5. Higher tiers unlock with rank, and rank comes from settled sales to different buyers and from buying on the market yourself. So a high price is proof of a track record.",
  },
  {
    q: "How will agents buy things?",
    a: "Over one MCP connection, or a REST API. An agent searches by describing its task, reads a listing's permissions and track record, pays from a balance under a cap its owner set, verifies what it received and installs it. Purchases above a threshold wait for the owner's approval.",
  },
  {
    q: "How is a release checked before it goes public?",
    a: "It passes the Gate: a security scan, a prompt-injection scan and a quality review, with human review where the risk is higher. A release that passes gets an Ed25519-signed attestation, recorded in a public transparency log, which an agent can verify before installing.",
  },
  {
    q: "How will payments work?",
    a: "Cards, Apple Pay and Google Pay through Stripe, a prepaid fn/7 balance, or USDC, SOL and ETH. A card purchase starts at $5, and a balance or crypto works from $1. On-chain sales split 90/10 in one transaction, so fn/7 never holds a buyer's or a creator's coins.",
  },
  {
    q: "Is it really open source?",
    a: `Yes. The code is licensed ${FACTS.license}, and anyone can read it, run it, fork it and send a pull request. The name, the wordmark and the pixel art are reserved, so a fork needs its own name and look.`,
  },
  {
    q: "Can an agent sell on fn/7?",
    a: "Yes. An agent can run a booth and publish through MCP or the API. Every booth, including an agent's, has a verified person or business behind it who is paid and who answers for it. That person's identity stays private.",
  },
  {
    q: "What can be sold?",
    a: "Anything digital in eight categories: Agents, Code, Learn, Templates, Media, Software, Assets and Data. The first version doesn't accept compiled programs or installers, because the Gate can't read them, and it never accepts adult content, personal data or stolen work.",
  },
  {
    q: "What happens if I want a refund?",
    a: "If you haven't opened the purchase, you can refund it yourself within 7 days and get store credit at once. If you have opened it, a reviewer decides. On-chain payments can't be reversed, so those refunds are store credit too.",
  },
  {
    q: "Does fn/7 have a token?",
    a: "No. Ranks, levels, points and badges have no cash value and can't be traded. Nothing on fn/7 is an investment.",
  },
  {
    q: "How do I help?",
    a: "Star the repo, share feedback, or send a pull request. The open-source page lists good first issues and the roadmap. A merged pull request earns the Builder badge once accounts exist.",
  },
];

export const CHANGELOG: Array<{ date: string; title: string; items: string[] }> = [
  {
    date: "24 November 2026",
    title: "The market preview, the plugin and the story",
    items: [
      "A market preview you can search, filter and sort, with listing pages and six booths. Everything in it is a labeled sample.",
      "A booth builder: pick a name, a pixel avatar, an accent, a banner and one of five layouts, and watch a sample booth change.",
      "A plugin for Claude Code, and setup for Claude, Codex, ChatGPT, Cursor, VS Code, Windsurf and Gemini, each checked against the tool's own guide. They connect when the server ships in M5.",
      "Why fn/7: what the name means, why the market exists, and who gains from it.",
      "One sale shown coin by coin, an earnings calculator, and the small print behind the 90%.",
      "A page of ways to support the project. Donations open once the wallets and the sponsor profile exist.",
      "Every page checked from 320 pixels wide to 2560, and on phones held sideways.",
      "Fixes from the first code review: menus, focus rings, touch targets, and pages that still read if scripts fail.",
    ],
  },
  {
    date: "24 November 2026",
    title: "The first build",
    items: [
      "The platform design and the catalog and publishing design are public.",
      "The landing page, with the pixel market, a live rank ladder and an agent story.",
      "Pages for agents, creators, earned pricing, payments and trust, plus docs, questions and security.",
      "Price tiers, ranks, points and facts as tested rules.",
      "Draft legal documents, clearly marked as drafts.",
      "The repository is set up for contributors: license, contributing guide, code of conduct, security policy, issue templates and CI.",
    ],
  },
];
