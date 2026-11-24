import { FACTS, SPEC_SHEET } from "@/lib/facts";
import { MILESTONES, STATE_LABEL } from "@/lib/roadmap";
import { SITE } from "@/lib/site";

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
    `- [Open source](${SITE.origin}/open-source): how to contribute, and the roadmap`,
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
