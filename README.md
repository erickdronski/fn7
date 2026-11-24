# fn/7

fn/7 is an open-source marketplace where AI agents and people buy skills, code, courses and tools straight from creators, who keep 90% of every sale.

> **Status: in open development.** Nothing is for sale yet. The design is written and the first pages are built. The marketplace itself is being built here, in public, one milestone at a time. See the [roadmap](#roadmap).

## What it will do

- **Agents shop it directly.** One MCP connection, or a REST API with an OpenAPI spec. An agent searches by task, checks a listing before buying, pays under a budget its owner set, verifies what it received and installs it.
- **Creators keep 90%.** On every sale, at every price, on every way to pay. fn/7 keeps 10%: 9% runs the market and 1% goes to a public open-source fund.
- **Every release is scanned, reviewed and signed.** A security scan, a prompt-injection scan and a quality review, with human review where the risk is higher. A release that passes gets an Ed25519-signed attestation in a public transparency log.
- **Anything digital.** Skills, MCP servers, code, courses, templates, video, audio, design assets, datasets and models, all described by one open package format, `fn7.json`.
- **Pay any way.** Cards, Apple Pay and Google Pay through Stripe, a prepaid balance, or USDC, SOL and ETH. On-chain sales split 90/10 in one transaction, and fn/7 never holds anyone's coins.
- **Status you earn.** Prices are fixed tiers from Free to $500. Selling well and shopping the market unlocks the higher tiers.

The full design is in two documents:

- [Platform design](docs/superpowers/specs/2026-11-24-fn7-platform-design.md): brand, look, motion, accounts, payments, the Gate, agents and search.
- [Catalog and publishing design](docs/superpowers/specs/2026-11-24-fn7-catalog-and-publishing-design.md): what can be sold, packaging, publishing, discovery, trust and the build order.

## Roadmap

| | Milestone | State |
| --- | --- | --- |
| M0 | Foundation, landing page, open-source setup | Building |
| M1 | Accounts: sign-in, aliases, pixel avatars | Next |
| M2 | Catalog: listings, booths, the market, search | Planned |
| M3 | Publishing and the Gate: the Console, `fn7.json`, scans, attestations | Planned |
| M4 | Buying: cart, checkout in test mode, the Library, receipts | Planned |
| M5 | Agents: the MCP server, the REST API, the `fn7` CLI | Planned |
| M6 | Status and play: ranks, levels, badges, missions | Planned |
| M7 | Crypto: the on-chain 90/10 split on test networks | Planned |
| M8 | Payouts, the open-source fund, co-creator splits | Planned |
| M9 | Follows, the feed and prepaid passes | Planned |
| M10 | Publishing from git, and the signed public catalog | Planned |

## Run it

You need Node 22 or later and pnpm 10.

```bash
pnpm install
pnpm dev
```

The dev server listens on http://localhost:4317.

```bash
pnpm lint
pnpm typecheck
pnpm test
```

## Where things are

| Path | What lives there |
| --- | --- |
| `app/` | Pages and routes (Next.js App Router) |
| `components/` | Interface, landing sections and the pixel market scene |
| `lib/` | The rules: price tiers, ranks, points, facts, links. Tested. |
| `styles/` | Design tokens, motion and component styles |
| `docs/superpowers/specs/` | The two design documents and the approved mockups |
| `docs/superpowers/plans/` | The build plan for the milestone in progress |

## Help build it

**Star the repo.** If you want this to exist, a star is the simplest way to say so, and it helps other builders find it.

**Tell us what you think.** Feedback shapes what gets built next.

- [Share feedback](https://github.com/erickdronski/fn7/issues/new?template=feedback.yml)
- [Suggest an idea](https://github.com/erickdronski/fn7/issues/new?template=idea.yml)
- [Report a bug](https://github.com/erickdronski/fn7/issues/new?template=bug.yml)
- [Ask a question or start a discussion](https://github.com/erickdronski/fn7/discussions)

**Send a pull request.** Start with [CONTRIBUTING.md](CONTRIBUTING.md). A merged pull request earns the Builder badge once accounts exist.

Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Found a vulnerability? Report it privately. [SECURITY.md](SECURITY.md) says how.

## License

The code is licensed under [AGPL-3.0-or-later](LICENSE). The name, the wordmark and the pixel art are not part of that license. See [brand/LICENSE.md](brand/LICENSE.md).

A fork may run its own market and set its own fees. It may not call itself fn/7.
