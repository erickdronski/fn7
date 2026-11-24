# Agent commerce landscape, late 2026

Date: 2026-11-24. Research for sections 10 and 11 of the [platform design](../specs/2026-11-24-fn7-platform-design.md). Sources are official docs and spec repos read today unless marked. "Not verified" means no primary source confirmed it. "Custody" means fn/7 itself holding customer funds.

## 1. x402

- **What and who.** An open protocol that uses HTTP 402 so a client can pay for a request in stablecoins. Started at Coinbase, now governed by the x402 Foundation under the Linux Foundation (April 2026).
- **Status.** Spec v2. Schemes: `exact`, `upto`, `batch-settlement`, `auth-capture`. Transports: HTTP, MCP, A2A. Coinbase's CDP facilitator settles on Base, Polygon, Arbitrum, Monad, World and Solana, for any ERC-20 or SPL token. Payments are final and refunds are manual.
- **Splits.** On Solana, yes. `extra.splits` pays the main recipient and up to eight others in one atomic transaction. In the spec since 26 October 2026. SDK code merged 24 November 2026. A facilitator must advertise `maxSplits`. Whether CDP's does is not verified. On EVM, no: `payTo` is a single address.
- **fn/7 builds.** A 402 answer on `checkout` over HTTP and MCP, Solana first, with the creator as `payTo` and fn/7's 10% as a split. Confirm on-chain, then grant.
- **Custody and fees.** None for fn/7. CDP: 1,000 settlements a month free, then $0.001 each. It pays the gas.
- Sources: [Solana exact scheme](https://github.com/x402-foundation/x402/blob/main/specs/schemes/exact/scheme_exact_svm.md), [CDP x402 FAQ](https://docs.cdp.coinbase.com/x402/support/faq)

## 2. Agent Payments Protocol (AP2)

- **What and who.** An open protocol that proves a user authorized an agent's purchase, using signed "mandates". Created by Google, donated to the FIDO Alliance in April 2026.
- **Status.** v0.2.0, released 28 April 2026. Two mandates, Checkout and Payment. Each is open (limits set ahead) or closed (one final cart). Cards first. No commercial launch date found.
- **fn/7 builds.** Nothing standalone. As the merchant: sign the cart, verify the Checkout Mandate, pass the Payment Mandate to the processor. It arrives through UCP.
- **Custody and fees.** None. No fees published.
- Sources: [ap2-protocol.org](https://ap2-protocol.org/), [AP2 releases](https://github.com/google-agentic-commerce/AP2/releases)

## 3. ACP, ChatGPT checkout, shared payment tokens

- **What and who.** The Agentic Commerce Protocol is an open spec from OpenAI and Stripe that lets an agent drive a merchant's checkout. Latest stable version 2026-04-17, labeled beta.
- **Status.** OpenAI pulled back general Instant Checkout in March 2026 (press reports quoting OpenAI). Its plugin rules now call it a beta for "select marketplace partners". Today's merchant path: a product feed through Business Hub (US), ChatGPT Wallet (pays on your existing checkout page with a network token, no integration), and plugins (MCP server plus skills).
- **What a merchant implements.** ACP checkout endpoints, acceptance of a delegated payment token, and a product feed.
- **Digital goods.** ChatGPT plugins may sell physical goods only. Digital content, tokens and credits are barred. Users may still use what they already own.
- **Shared payment tokens (SPT).** Stripe's scoped grant of a buyer's payment method. The seller passes it into a normal PaymentIntent. Works with Connect direct, destination, and separate charges. US, Canada and select European countries. Preview terms.
- **fn/7 builds.** Accept SPTs in `checkout` (item 8). A ChatGPT plugin for search, library and install only, with buying on fn7.ai. No ACP endpoints yet.
- **Custody and fees.** None for fn/7. Current OpenAI fees are not published.
- Sources: [OpenAI plugin guidelines](https://developers.openai.com/apps-sdk/app-submission-guidelines), [OpenAI commerce docs](https://developers.openai.com/commerce), [Stripe SPT](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens), [MacRumors, 25 March 2026](https://www.macrumors.com/2026/03/25/chatgpt-revamps-shopping-features/)

## 4. Universal Commerce Protocol (UCP)

- **What and who.** It exists. An open standard for agent to merchant commerce: catalog, cart, checkout, identity, orders. Co-developed by Google and Shopify. Stripe says it sits on the Tech Council.
- **Status.** Version 2026-08-25. Google AI Mode and Gemini use it (waitlist through Merchant Center). Microsoft Copilot Checkout asks for a "UCP-compliant feed" (US, English, onboarding through Stripe or PayPal). Whether those surfaces accept digital goods is not stated.
- **fn/7 builds.** A profile at `/.well-known/ucp`. The checkout capability over the REST or MCP binding, mapped to the existing tools. A payment handler, such as Stripe's. Signature checks on calling platforms.
- **Custody and fees.** None. fn/7 stays merchant of record. No protocol fees.
- Sources: [UCP spec](https://ucp.dev/latest/specification/overview/), [Google UCP guide](https://developers.google.com/merchant/ucp), [Microsoft agentic commerce](https://about.ads.microsoft.com/en/solutions/technology/agentic-commerce)

## 5. Visa and Mastercard

- **What and who.** Card network programs for agent payments with tokenized cards and for recognizing trusted agents: Visa Intelligent Commerce with the Trusted Agent Protocol, and Mastercard Agent Pay.
- **Status.** Early. On 17 November 2026 Visa widened its Agentic Ready program to acquirers, PSPs and merchants, with over 140 participants including Stripe and PayPal. Most are testing. Mastercard announced Agent Connect and Agent Suite for Merchants in September 2026 (via search, page blocked).
- **fn/7 builds.** Nothing for payment. Agent tokens arrive as ordinary network tokens through Stripe. Optional: verify signed agent requests (RFC 9421) at the CDN so real agents are not blocked.
- **Custody and fees.** None. Nothing published beyond card fees.
- Sources: [Visa Trusted Agent Protocol](https://developer.visa.com/capabilities/trusted-agent-protocol/overview), [Visa, 17 November 2026](https://investor.visa.com/news/news-details/2026/Visa-Expands-Agentic-Ready-to-Help-Scale-Trusted-AI-Commerce-Globally/default.aspx)

## 6. PayPal

- **What and who.** PayPal's agentic commerce services: Store Sync (catalog to AI surfaces) and Agent Ready (payments inside AI assistants).
- **Status.** Access by request form. Store Sync is reported as physical goods, US buyers and USD only, no digital goods (via search, page not opened).
- **fn/7 builds.** Nothing now. Plain PayPal and Venmo stay "Later".
- **Custody and fees.** None. Not published.
- Sources: [PayPal agentic commerce services](https://developer.paypal.com/agentic-commerce-services/about), [Store Sync overview](https://developer.paypal.com/store-sync/overview)

## 7. Coinbase

- **Buyer side.** Coinbase for Agents and Wallet MCP give an agent a wallet with a rolling 24-hour budget that pays x402 endpoints. Payments MCP is being folded into Wallet MCP. AgentKit and Agentic Wallets came first.
- **Merchant side.** The CDP facilitator, and the Bazaar, a public catalog of x402 resources that agents search over MCP. Coinbase Commerce closed on 31 March 2026. Its replacement, Coinbase Business, is custodial and limited to the US and Singapore (via search, page blocked). Onramp turns card, Apple Pay or bank money into USDC in any wallet. Fees not verified.
- **fn/7 builds.** x402 (item 1) plus a Bazaar declaration. Not Coinbase Business: custodial, no split.
- **Custody and fees.** None with x402. Coinbase Business fee not verified.
- Sources: [x402 Bazaar](https://docs.cdp.coinbase.com/x402/bazaar), [Onramp](https://docs.cdp.coinbase.com/onramp/introduction/welcome), [Wallet MCP](https://docs.cdp.coinbase.com/agentic-wallet/welcome), [Commerce to Business](https://help.coinbase.com/transitioning-from-coinbase-commerce-to-coinbase-business)

## 8. Stripe

- **Link Agent Wallet.** An agent asks the user's Link account to approve a spend and gets a one-time credential. US and Canadian customers.
- **Machine payments.** Pay-per-request endpoints that settle to the Stripe balance in fiat. MPP (item 10) takes cards through SPTs (minimum $0.50) and USDC on Tempo or Solana (minimum $0.01). x402 takes USDC on Base through the CDP facilitator. Connect platforms can use every charge type. Stablecoins: US businesses except New York, elsewhere on request.
- **Monetize your MCP server.** An experimental Stripe guide: a tool returns a payment link, the agent pays over MPP, a browser falls back to checkout. Digital goods are named.
- **Agentic Commerce Suite.** Stripe-run catalog and checkout for agents. Connect platforms: US, waitlist.
- **Agent Toolkit.** Now a plugin, MCP server and skills for building on Stripe. Not a payment rail.
- **fn/7 builds.** One MPP endpoint behind `checkout`, charging through the existing Connect setup so the 90/10 split is an application fee. A Stripe profile and a Stripe Directory listing (preview).
- **Custody and fees.** Stripe holds funds, fn/7 does not. Cards 2.9% + 30¢. Stablecoins: promotional 0.8% through 1 January 2027. Connect from 0.25%. Confirm before use.
- Sources: [Machine payments](https://docs.stripe.com/payments/machine), [Monetize your MCP server](https://docs.stripe.com/agentic-commerce/monetize-mcp), [Stripe pricing](https://stripe.com/pricing)

## 9. Shop Pay

- **Can a non-Shopify site accept it?** Yes, through the Shop Pay Commerce Component (Shop Pay Wallet API), and through the `dev.shopify.shop_pay` UCP handler after registering for a `shop_id`.
- **Terms.** A new Shopify store, Shopify Payments sign-up, and your own PCI DSS scope. Shopify processes the payment through Shopify Payments. Shopify's Spring 2026 Edition reportedly opened this to brands on any platform. Fees, digital goods and marketplace rules: not verified.
- **fn/7.** Skip. Money would settle to fn/7's Shopify Payments account, outside Stripe Connect, so fn/7 would hold the creators' share until it paid them. My reading, not a Shopify statement.
- Sources: [Shop Pay Wallet API](https://shopify.dev/docs/api/commerce-components/pay), [Shop Pay UCP handler](https://shopify.dev/ucp/shop-pay-handler/2026-08-25/spec.md)

## 10. Others

- **Machine Payments Protocol (MPP), missing from the list.** From Stripe and Tempo, on an IETF draft. HTTP 402 like x402, but multi-rail: Tempo, Stripe cards, Solana, Lightning, Visa cards. On Tempo one charge can split to 1 to 10 extra recipients atomically. See item 8.
- **Skyfire.** Agent identity tokens (KYA) plus payment by tokenized card or USDC. Merchant integration not verified.
- **Crossmint.** Agent Commerce Toolkit (October 2026). Its agents pay with Visa and Mastercard agent cards, SPTs, or non-custodial wallets over x402 and MPP. Nothing extra.
- **Circle.** Nanopayments on Gateway: x402-compatible, gas-free USDC from $0.000001, buyers pre-fund a Gateway wallet. Below fn/7's $1 floor.
- **Nekuda, Payman.** Buyer-side wallet tooling. Nothing to build.
- Sources: [MPP splits](https://mpp.dev/guides/split-payments), [MPP payment methods](https://mpp.dev/payment-methods), [Crossmint](https://docs.crossmint.com/agents/how-agents-pay), [Circle Nanopayments](https://developers.circle.com/gateway/nanopayments)

## 11. Discovery and distribution

- **MCP Registry.** Still preview. Publish a `server.json` with `mcp-publisher`, namespace proven by DNS or GitHub. Aggregators read it, hosts do not. Also publish a Server Card (SEP-2127, final) at `/mcp/server-card` and an AI Catalog at `/.well-known/ai-catalog.json`.
- **Claude.** Submit at claude.ai/directory/manage on any paid plan. Needs a remote HTTPS server, OAuth 2.0, a title and a read-only or destructive hint on every tool, docs and a privacy policy. Scanned, then listed as Community. Connectors that "transfer money, cryptocurrency, or other financial assets" are not accepted. Whether a capped balance `checkout` passes is not verified. Ask mcp-review@anthropic.com. Adding fn/7 by URL needs no listing.
- **ChatGPT.** A plugin through the Plugins dashboard: verified organization, domain check, test cases, video, review. No digital goods sales (item 3).
- **Gemini.** No public submission path found for the consumer app (not verified). Reach is through UCP.
- **Microsoft.** A Microsoft 365 Copilot connector through Partner Center. Tools must be read-only, and each tenant's admin approves.
- **A2A.** v1.0 since March 2026, under the Linux Foundation. Publish `/.well-known/agent-card.json`. No official registry.
- Sources: [MCP Registry](https://modelcontextprotocol.io/registry/about), [Server Cards](https://modelcontextprotocol.io/seps/2127-mcp-server-cards), [Claude review criteria](https://claude.com/docs/connectors/building/review-criteria), [ChatGPT plugin submission](https://developers.openai.com/plugins/deploy/submission), [Copilot connectors](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/submit-federated-connector), [A2A discovery](https://a2a-protocol.org/latest/topics/agent-discovery/)

## What this means for fn/7

Recommended order:

1. **Keep card checkout friendly to agents (M4).** ChatGPT Wallet, Link Agent Wallet and card network agent tokens all pay through ordinary Stripe checkout. No new work.
2. **Stripe SPTs over MPP on the existing Connect setup.** One endpoint gives agents a native way to pay by card, and the split stays inside Connect.
3. **Discovery.** MCP Registry, Server Card, AI Catalog, A2A agent card, Stripe Directory, and a Claude listing once the money rule is cleared. Cheap.
4. **x402 on Solana with native splits (M7).** It keeps the non-custodial 90/10 rule in one transaction. The feature is weeks old, so check the facilitator's `maxSplits` first.
5. **UCP profile and the Google and Microsoft waitlists.** The large surfaces converged here, but entry is gated and digital goods are unconfirmed.
6. **AP2, only as part of UCP.** It arrives with UCP checkouts.
7. **x402 on Base.** No native split. Wait, or route through Stripe, which holds the funds while Connect splits.
8. **A read-only ChatGPT plugin and Copilot connector.** Search and library only: those stores block digital goods sales or write tools.

Skip: ACP checkout endpoints, Shop Pay, Coinbase Business, PayPal Store Sync, Circle Nanopayments, and direct work with Visa, Mastercard, Skyfire, Nekuda or Payman.
