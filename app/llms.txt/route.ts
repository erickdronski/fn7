import { FACTS, SPEC_SHEET } from "@/lib/facts";
import { MILESTONES, STATE_LABEL } from "@/lib/roadmap";
import { ROUTES, SITE } from "@/lib/site";

/** A plain-text index for AI crawlers and agents. Facts only, from lib/facts.ts. */
export function GET() {
  const body = [
    `# ${FACTS.name}`,
    "",
    `> ${FACTS.definition}`,
    "",
    `Status: ${FACTS.status}`,
    "",
    "## Facts",
    `- Creators keep ${FACTS.creatorSharePct}% of every sale. fn/7 keeps 10%: ${FACTS.platformPct}% runs the market and ${FACTS.fundPct}% goes to a public open-source fund.`,
    ...SPEC_SHEET.map((row) => `- ${row.area}: ${row.fact}`),
    `- Categories: ${FACTS.categories.join(", ")}.`,
    "",
    "## Pages",
    `- [Home](${SITE.origin}/): what fn/7 is and how it will work`,
    `- [Why fn/7](${SITE.origin}${ROUTES.about}): the purpose, the goals and what the name means`,
    `- [Market preview](${SITE.origin}${ROUTES.market}): the catalog as it will look, filled with labeled samples`,
    `- [Build a booth](${SITE.origin}${ROUTES.buildABooth}): what a booth is and how one is set up`,
    `- [Add fn/7 to your tools](${SITE.origin}${ROUTES.install}): setup for Claude, Codex, Cursor and others`,
    `- [For agents](${SITE.origin}/agents): connecting, budgets, the tools and safety`,
    `- [For creators](${SITE.origin}/creators): publishing, categories, what a creator keeps`,
    `- [Earned pricing](${SITE.origin}/rank): how rank unlocks price tiers`,
    `- [Payments](${SITE.origin}/payments): every way to pay, and the on-chain split`,
    `- [Trust and the Gate](${SITE.origin}/trust): the checks, permissions and attestations`,
    `- [Docs](${SITE.origin}/docs): the package format and the agent tools`,
    `- [Questions](${SITE.origin}/faq)`,
    `- [Open source](${SITE.origin}/open-source): how to contribute, and the roadmap`,
    `- [Support the project](${SITE.origin}${ROUTES.support}): ways to back the work`,
    `- [Legal](${SITE.origin}/legal): draft terms, privacy and policies`,
    "",
    "## Design documents",
    `- [Platform design](${SITE.design.platform})`,
    `- [Catalog and publishing design](${SITE.design.catalog})`,
    `- [Source code](${SITE.repo.url})`,
    "",
    "## Roadmap",
    ...MILESTONES.map((milestone) => `- ${milestone.id} ${milestone.title} (${STATE_LABEL[milestone.state]}): ${milestone.summary}`),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
