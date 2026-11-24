import type { Metadata } from "next";
import { Block, CodeBlock, Facts, PageHero, TileLinks } from "@/components/page/blocks";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { MCP_TOOLS } from "@/lib/content";
import { ROUTES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description: "How fn/7 works: the package format, the agent tools, publishing, payments and trust, with links to the full design.",
  alternates: { canonical: ROUTES.docs },
};

const MANIFEST = `{
  "spec": "fn7/1",
  "slug": "release-notes-skill",
  "type": "skill",
  "title": "Release-notes skill",
  "summary": "Writes release notes from a git diff in eight lines.",
  "version": "1.2.0",
  "category": "agents",
  "price_cents": 500,
  "license": "fn7-standard-1",
  "access": ["install", "download"],
  "entry": "SKILL.md",
  "compat": { "clients": ["claude-code", "cursor"] },
  "permissions": { "network": false, "secrets": [], "shell": ["git"], "writes": ["."] },
  "made": "with-ai"
}`;

export default function DocsPage() {
  return (
    <>
      <PageHero
        title="Docs"
        lead="fn/7 is being built in the open, so the most complete documentation today is the design itself. These pages explain each part in plain words, and the two design documents hold every detail."
      >
        <Button href={SITE.design.platform}>Platform design</Button>
        <Button href={SITE.design.catalog} variant="line">
          Catalog and publishing design
        </Button>
      </PageHero>

      <Block id="start" lead="Start here" title="Each part of fn/7, explained.">
        <TileLinks
          items={[
            { icon: "bot", title: "For agents", text: "Connecting, budgets, the tools, safety, and where fn/7 will plug in.", href: ROUTES.agents },
            { icon: "gem", title: "For creators", text: "Publishing, the eight categories, what you keep and how you're paid.", href: ROUTES.creators },
            { icon: "star", title: "Earned pricing", text: "How rank unlocks price tiers, and why a price is proof.", href: ROUTES.rank },
            { icon: "key", title: "Payments", text: "Every way to pay, the on-chain split and the rules.", href: ROUTES.payments },
            { icon: "shield", title: "Trust and the Gate", text: "The checks, permissions, attestations and what's still exposed.", href: ROUTES.trust },
            { icon: "code", title: "Open source", text: "The roadmap, how to contribute and the license.", href: ROUTES.openSource },
          ]}
        />
      </Block>

      <Block id="package" lead="The package" title="fn7.json describes any digital good." intro="One open file says what a release is, what is in it, how it installs, which permissions it needs, its license and its price tier. The schema will be published, so other tools and markets can read fn/7 packages." raised>
        <Reveal>
          <CodeBlock caption="fn7.json for a skill" code={MANIFEST} />
        </Reveal>
        <Facts
          rows={[
            { area: "Name", fact: <code className="mono tool">fn7:@courier/release-notes-skill@1.2.0</code> },
            { area: "Frozen per release", fact: "Files, version, permissions, install paths and license. A change is a new release through the Gate." },
            { area: "Editable on the listing", fact: "Title, summary, description, media and price tier. Every edit is screened before it shows." },
          ]}
        />
      </Block>

      <Block id="tools" lead="Agent tools" title="The MCP tools, which the REST API mirrors.">
        <Facts rows={MCP_TOOLS.map((row) => ({ area: <code className="mono tool">{row.tool}</code>, fact: row.does }))} />
      </Block>

      <Block id="more" lead="Also here" title="Reference and status." raised>
        <div className="linklist">
          <Button href={ROUTES.faq} variant="line" size="sm">
            Questions
          </Button>
          <Button href={ROUTES.changelog} variant="line" size="sm">
            Changelog
          </Button>
          <Button href={ROUTES.security} variant="line" size="sm">
            Security
          </Button>
          <Button href={ROUTES.legal} variant="line" size="sm">
            Legal
          </Button>
          <Button href="/llms.txt" variant="line" size="sm">
            llms.txt
          </Button>
          <Button href={SITE.repo.url} variant="line" size="sm">
            Source code
          </Button>
        </div>
      </Block>
    </>
  );
}
