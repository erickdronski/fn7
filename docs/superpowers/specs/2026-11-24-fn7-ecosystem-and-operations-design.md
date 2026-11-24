# fn/7 ecosystem and operations design

Date: 2026-11-24. Status: draft for Erick's approval. Branch: `platform-v1`.

The third design document, beside the [platform design](2026-11-24-fn7-platform-design.md) and the [catalog and publishing design](2026-11-24-fn7-catalog-and-publishing-design.md). It maps every way a person or an agent reaches fn/7, every way money can move, how the operator gets paid and manages funds, and where fn/7 stands on a token. A research brief on the current agent-payment standards is being written to `docs/superpowers/research/2026-11-24-agent-commerce-landscape.md`. Where this document and that brief disagree on a fact about an outside standard, the brief wins, because it was checked against live sources.

---

## 1. Intent

Erick's brief: everything a person or an agent could need, reachable from their chat sessions, AI models, platforms and other booths. A full MCP server, API, terminal, plugins and connectors. Every serious way an agent can pay. A way for the operator to be paid on every rail, with wallets he controls.

**The rule that keeps this buildable:** one core, thin adapters. Everything fn/7 can do is one versioned API. The MCP server, the CLI, the SDKs, the plugins and the connectors are generated from it or wrap it. Nothing exists in only one of them.

## 2. Every way in

### 2.1 For agents

| Surface | What it is | Milestone |
| --- | --- | --- |
| **Remote MCP server** | `https://fn7.ai/mcp`, Streamable HTTP, OAuth 2.1 with dynamic client registration and device flow. The tools in the platform design, 11.3, and the catalog design, section 9. | M5 |
| **Local MCP mode** | `fn7 mcp`. The CLI as a local MCP server that passes calls through and does verified installs on the machine. | M5 |
| **REST API** | `/api/v1`, mirroring the MCP tools one for one. OpenAPI 3.1 at `/openapi.json`. Idempotency keys, stable error codes, rate limits per key. | M5 |
| **Sandbox** | Test keys (`fn7_test_…`) against a seeded catalog where nothing costs money. Every example in the docs runs against it. | M5 |
| **Webhooks** | Signed events a creator's or an owner's server can receive: release passed or held, sale, refund, review, payout, approval needed, agent over cap. | M5 |
| **Plain-text twins** | `llms.txt`, a `.md` copy of every listing, booth and docs page, and structured data on every page. | M0 to M2 |
| **Well-known files** | The signed catalog, fn/7's public keys, `security.txt`, and whatever discovery file the current MCP specification defines. | M3 to M10 |
| **Agent-to-agent** | An agent card for a hosted fn/7 "shopkeeper" that another agent can ask to find and compare releases. Read-only at first. | Later |

### 2.2 For the tools people already use

| Surface | What it is | Milestone |
| --- | --- | --- |
| **`fn7` CLI** | `npx fn7`: `search`, `add`, `list`, `update`, `init`, `check`, `publish`, `status`, `login`, `mcp`. Homebrew later. | M5 |
| **SDKs** | TypeScript and Python clients generated from the OpenAPI spec, published to npm and PyPI. | M5 |
| **Claude** | A listing in Claude's connector directory, and a Claude Code plugin with the MCP server, a skill for shopping well, and commands for search and install. | M5, after the server is stable |
| **ChatGPT** | A connector or app built on the same MCP server. | After M5 |
| **Cursor, Windsurf, VS Code, Gemini, Copilot** | One-click install links for the MCP server, and a listing wherever each has a directory. | After M5 |
| **The official MCP Registry** | A published server entry, so any client that reads the registry can find fn/7. | M5 |
| **Agent frameworks** | Thin tool packages for LangChain, the Vercel AI SDK, the OpenAI Agents SDK and others, generated from the OpenAPI spec. | After M5 |
| **GitHub** | A GitHub App that publishes a release from a version tag, and an Action that runs `fn7 check` in a creator's CI. | M10 |
| **Automation** | Zapier, Make and n8n connectors built on the webhooks and the API. | After M10 |
| **Chat** | Discord and Slack apps that post a creator's sales and releases to a channel. | After M10 |

### 2.3 For people

| Surface | What it is | Milestone |
| --- | --- | --- |
| **The site** | Everything, at desktop and phone width. Installable as a web app. | M0 onward |
| **The command palette** | ⌘K: search, jump anywhere, run an action. | M2 |
| **Email** | Receipts, a weekly digest of updates to what you own, approvals for an agent's purchase. | M4 |
| **Embeds** | A "Buy on fn/7" button and a booth card a creator can put on their own site, and share images for every listing and booth. | M2 for images, later for embeds |
| **Feeds** | JSON and RSS feeds per category and per booth. | M5 |

### 2.4 Between booths

Following a booth, co-creator splits, and collections all exist in the catalog design. Two more come later, each with its own design: **referrals** (a creator or an agent that sends a buyer earns a share the seller chose to offer, out of the seller's 90%) and **remix licenses** (a listing built on another pays its source automatically).

## 3. What a person or an agent can need

A checklist the build is measured against. Each line names where it is designed.

| Need | Person | Agent | Designed in |
| --- | --- | --- | --- |
| Find it | Search, browse, collections, follows | `search` by task, filters, saved searches | Catalog 9 |
| Judge it before buying | Preview, reviews, rank, the Gate's result | `get_listing`: contents, permissions, trust, attestation | Catalog 9.4 |
| Try it | The Free tier, free samples, preview lessons | The same, through `install` on a free release | Catalog 5.5 |
| Pay | Card, wallets, balance, crypto | Balance inside a cap, crypto, agent payment standards | Platform 10, section 4 here |
| Stay in control | Approvals, caps, a permissions policy | Reads its own limits; can't raise them | Platform 11 |
| Receive it | The Library, players, downloads | `install` with files, hashes and steps for its client | Catalog 7.3, 9.5 |
| Trust what arrived | "Passed the Gate", signed receipt | Verify the attestation and every hash | Catalog 11.4 |
| Keep it current | "Updated" in the Library, a weekly email | `updates` | Catalog 6.6 |
| Undo it | Refund within 7 days if unopened | The owner refunds; an agent can ask | Platform 10.5 |
| Say how it went | Reviews, questions | `report_outcome` | Catalog 9.4 |
| Report a problem | Report button, private security report | The same through the API | Catalog 11 |
| Sell | The Console | Seller tools over MCP and the API | Catalog 6 |
| Work as a team | **New: organizations** (section 6) | Many agents under one budget | Here |

## 4. Every way to pay

### 4.1 The rule for adding a rail

fn/7 accepts a way to pay only if all four hold:
1. The creator still receives 90% of the price paid.
2. fn/7 never holds crypto that belongs to someone else.
3. There is a defined path for a refund and for a dispute.
4. Nothing about it weakens the Gate or an owner's cap.

### 4.2 The rails

| Rail | For | Who holds the money in between | Status |
| --- | --- | --- | --- |
| Cards, Apple Pay, Google Pay, Link | People | Stripe, then the creator's Stripe account | M4 |
| fn/7 balance | People and their agents | Stripe (it is prepaid store credit) | M4 |
| USDC, SOL, ETH with an on-chain split | People and agents with a wallet | Nobody. One transaction pays everyone. | M7 |
| Coinbase wallets and onramp | People funding USDC; agents with Coinbase wallets | Nobody on fn/7's side | With M7, through standard wallet connections |
| **x402** | Agents paying per request with stablecoins, with no fn/7 account | To be confirmed: the split has to stay in one settlement | After M7, once the research brief confirms how |
| **Agent checkout standards** (the Agentic Commerce Protocol, the Agent Payments Protocol, and the card networks' agent tokens) | Agents shopping from inside a chat product | Stripe or the card network, the same as a card | After M5, in the order the research brief recommends |
| PayPal and Venmo | People | PayPal | Later |
| Shop Pay | People | Only if it is offered to stores that aren't on Shopify | Not planned until confirmed |
| Bitcoin over Lightning | People and agents | Only if the split can stay non-custodial | Later |

An agent paying through a chat product's checkout is, to fn/7, a card payment with extra proof of what the user approved. That proof maps onto fn/7's own approvals: the mandate is stored with the order.

### 4.3 What fn/7 exposes so others can sell fn/7 listings

- A **product feed** of every Live listing in the formats the agent checkout standards ask for, generated from the catalog.
- **Checkout endpoints** that take a cart, reprice it on the server, and return an order.
- The same permissions, trust and attestation data an fn/7 agent gets, so a chat product can show why a release is safe.

## 5. How the operator gets paid

### 5.1 Where fn/7's 10% lands

| Rail | Where the 10% goes | How Erick reaches it |
| --- | --- | --- |
| Cards, wallets, balance | It stays in fn/7's Stripe account when each sale is transferred to the creator | Stripe pays out to the business bank account on a schedule |
| On-chain | The split pays three ways in the same transaction: 90% to the creator, 9% to the operator treasury, 1% to the open-source fund | Two multisig wallets he controls |
| PayPal, later | fn/7's PayPal business account | Withdrawal to the bank |

Paying the fund its 1% on-chain, directly, makes the public fund ledger checkable by anyone.

### 5.2 The wallets

- **Two treasuries per chain:** operator and open-source fund. On Base and Ethereum, a Safe. On Solana, a Squads multisig.
- **Two of three signers,** each a hardware wallet. Erick holds two and keeps one backup somewhere else, or names a second person he trusts.
- **The app never holds a key to these wallets.** It only knows their public addresses, which live in configuration and are shown on the open-source page.
- **fn/7's signing key** for attestations and receipts is a different thing. It is an Ed25519 key in a key management service, and it can't move money.
- **Getting dollars out:** treasury to a business account at an exchange, then to the bank. An accountant sets up the bookkeeping.

**Erick creates these himself.** Wallets, seed phrases, the exchange account, the Stripe account and the bank account are his to create, and no seed phrase or private key is ever typed into a chat, a repository or the app. The build gives him a checklist and a place to paste the public addresses.

### 5.3 Before real money

- A **legal entity** owns the Stripe account, the trademark and the treasuries. A lawyer picks the form.
- **Stripe Connect** is opened in the entity's name, in test mode until launch.
- The **smart-contract audit** and the **penetration test** are done.
- The **legal drafts** on the site are reviewed and put in force.

### 5.4 The operator console (`/operator`, M8)

For the operator only.
- Revenue by rail: gross, creators' share, processing fees, net.
- Creator payouts pending and sent.
- The fund ledger.
- Treasury balances, read from the chains. Read-only.
- Refunds, disputes and holds.
- The Gate: queue length, pass, hold and reject rates, time to review.
- Growth: accounts, booths, Live listings, connected agents, sales.

## 6. Organizations (new, later)

For teams and companies running many agents.
- One organization, many people, many agents, one balance.
- Budgets per agent and per team. Approval rules by amount and by category.
- Allow-lists: only certain creators, categories or licenses.
- A shared Library, so a release bought once is installed everywhere it is licensed for.
- Invoices, spend reports and exports. Single sign-on later.

## 7. The token question

Erick raised launching a token for marketing, so people can invest and earn notoriety. **The recommendation is not to, at least for now.** This is a judgment about the product and its risks, not legal or investment advice.

- **A token people buy to invest in the project is likely to be treated as a security.** Selling one without the right legal structure can bring regulators, and it can cost the Stripe account and the listings in other companies' directories.
- **It contradicts the pitch.** fn/7's message is that it is precise, checkable and trustworthy. A token launch reads as speculation to exactly the developers and companies it needs.
- **The earlier decision stands in the designs:** no token, and no vote that can change the 90%.
- **It isn't needed.** Payments work without one, and status already has a mechanism in rank.

What gives the same things, safely:
- **Notoriety:** the Genesis badge for the first 100 booths, the Builder badge for contributors, and a public supporters list.
- **Backing the project:** GitHub Sponsors or Open Collective, where support is a gift and nobody is promised a return.
- **Investment:** if Erick wants investors, that is an ordinary funding round, with a lawyer.

If a token ever returns, it should be because the product needs one for something it can't do otherwise, and only with a securities lawyer involved before anything is designed.

## 8. Reliability and versioning

- The API and the MCP tools are versioned. A breaking change ships as a new version, and the old one keeps working for a stated period.
- Every write accepts an idempotency key. Every error has a stable code and a link to its doc.
- A public status page and changelog. An incident gets a written summary.
- Backups with point-in-time recovery, and a tested restore.
- An audit log for every operator, reviewer and agent action that changes anything.

## 9. Where this lands in the build

Added to the milestone table in the catalog design, section 14.

| Milestone | Adds |
| --- | --- |
| M5 | Sandbox keys, webhooks, SDKs, the MCP Registry entry, feeds |
| After M5 | Connector and directory listings, the Claude Code plugin, framework tool packages |
| M7 | The three-way on-chain split (creator, operator, fund), Coinbase wallet and onramp support |
| M8 | The operator console, treasury addresses, payout bookkeeping |
| After M8 | x402, then the agent checkout standards, in the order the research brief recommends |
| Later | Organizations, referrals, remix licenses, the agent-to-agent shopkeeper, automation and chat connectors |

## 10. Calls made in this document for Erick to check

1. No token, with the reasons in section 7.
2. The on-chain split pays three ways, so the fund's 1% goes straight to its own wallet.
3. Treasury wallets are multisigs with hardware signers, created by Erick. The app only ever knows their public addresses.
4. A rail is added only if it passes the four tests in 4.1.
5. Outside agent payment standards come after fn/7's own MCP server and API work, in the order the research recommends.
6. Shop Pay is not planned unless it is confirmed to be available to stores outside Shopify.
7. Organizations, referrals and remix licenses are new, and come later with their own designs.
8. A sandbox with test keys ships with the API.
