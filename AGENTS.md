# Agent rules

Read these before writing product code:

1. [Platform design](docs/superpowers/specs/2026-11-24-fn7-platform-design.md)
2. [Catalog and publishing design](docs/superpowers/specs/2026-11-24-fn7-catalog-and-publishing-design.md)
3. The current plan in `docs/superpowers/plans/`

`HANDOFF.md`, `docs/business-plan.md` and `docs/build-spec.md` are the earlier plan. Where they disagree with the two designs, the designs win.

## Rules that are easy to break

- **Words.** Use the glossary in the platform design, section 4.11. Its retired words must not appear in the product, the docs or the API.
- **Facts.** Numbers and claims come from `lib/facts.ts`, `lib/tiers.ts` and `lib/prices.ts`. Never type a fee, a tier or a share into a page.
- **Money.** A creator keeps 90% of the price paid for a line, floored. Never less. No token, and no vote that can change the 90%.
- **Honesty.** No invented number, rating, testimonial or logo. A count that can't be fetched is not shown. No button leads to a page that doesn't exist.
- **Craft.** Every screen meets the craft floor (platform design, 4.8) and the motion rules (4.9), at desktop width and at 390px, with reduced motion respected.
- **Art.** Original pixel art only. Pop-culture references are short winks in our own words, registered in `lib/eggs.ts`.
- **Tests.** Anything in `lib/` that encodes a rule gets its failing test first.
- **Vendors.** Don't add a service the designs don't name. Open an issue first.
- **Secrets.** Never commit one. `.env.example` lists the names with empty values.
- **License.** Code is AGPL-3.0-or-later. Brand and art are reserved (`brand/LICENSE.md`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
