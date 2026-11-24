# Contributing to fn/7

Thanks for wanting to help. fn/7 is being built in the open, and the fastest way for it to get good is for people who would use it to shape it.

## Ways to help

- **Star the repo.** It tells us the work matters and helps other builders find it.
- **Give feedback.** [Share feedback](https://github.com/erickdronski/fn7/issues/new?template=feedback.yml), [suggest an idea](https://github.com/erickdronski/fn7/issues/new?template=idea.yml) or [report a bug](https://github.com/erickdronski/fn7/issues/new?template=bug.yml). Questions go in [Discussions](https://github.com/erickdronski/fn7/discussions).
- **Send a pull request.** Issues labeled `good first issue` are the best place to start. For anything larger, open an issue first so nobody builds the same thing twice.

## Before you write code

Read these. They are short for what they decide.

1. [Platform design](docs/superpowers/specs/2026-11-24-fn7-platform-design.md), especially the craft floor (4.8), motion (4.9) and the glossary (4.11).
2. [Catalog and publishing design](docs/superpowers/specs/2026-11-24-fn7-catalog-and-publishing-design.md).
3. The plan for the milestone in progress, in `docs/superpowers/plans/`.
4. [AGENTS.md](AGENTS.md), which lists the rules that are easiest to break. It applies to people as much as to coding agents.

## Set up

You need Node 22 or later and pnpm 10.

```bash
git clone https://github.com/YOUR-NAME/fn7.git
cd fn7
pnpm install
pnpm dev
```

The site runs at http://localhost:4317.

## Make a change

1. Fork the repo and create a branch from `main`.
2. If you change anything in `lib/` that encodes a rule (prices, tiers, ranks, points, facts), write the failing test first.
3. Check your work:

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build
   ```

4. Look at it. Check the pages you touched at desktop width and at 390px, with the keyboard alone, and with reduced motion turned on.
5. Open a pull request. Say what changed and why, and add a screenshot or a short clip for anything visual.

Commit messages are one plain sentence that says what the change does, such as "Add the tier ladder to the landing page."

## What gets a pull request merged

- It does one thing.
- It uses the glossary's words and takes its facts from `lib/`.
- It meets the craft floor: real labels, visible focus, every state designed, no invented numbers.
- Its motion follows the motion rules: fast, interruptible, `transform` and `opacity` only, and still usable with reduced motion.
- CI passes.

## What needs a conversation first

- A new vendor or service.
- A change to fees, price tiers, ranks or the creator share.
- A new dependency that ships to the browser.
- Anything that touches payments, authentication or the Gate's checks.

## License of contributions

By contributing, you agree that your contribution is licensed under [AGPL-3.0-or-later](LICENSE), the same license as the project. Don't contribute art that copies a film, game or studio. The project's name, wordmark and pixel art are covered separately by [brand/LICENSE.md](brand/LICENSE.md).

## The Builder badge

A merged pull request earns the Builder badge on your fn/7 profile once accounts exist. It doesn't earn a share of sales.

## Conduct

Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md).
