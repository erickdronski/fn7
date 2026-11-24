import type { Metadata } from "next";
import { Block, Facts, PageHero, Points, Steps } from "@/components/page/blocks";
import { Button } from "@/components/ui/button";
import { ROUTES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description: "How to report a vulnerability in fn/7, what is in scope, and where the project stands before launch.",
  alternates: { canonical: ROUTES.security },
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        title="Security"
        lead="If you find a vulnerability, report it privately. Every report is read. You'll get a reply, and credit in the fix if you want it."
        note="fn/7 is before launch. No payments are live, and there is no bug bounty yet."
      >
        <Button href={SITE.repo.security}>Report a vulnerability</Button>
        <Button href={ROUTES.trust} variant="line">
          How releases are checked
        </Button>
      </PageHero>

      <Block id="report" icon="chat" lead="Reporting" title="Three steps, all private.">
        <Steps
          items={[
            { title: "Open the Security tab", text: "On the GitHub repository, choose Security, then Report a vulnerability." },
            { title: "Describe it", text: "What you found, how to reproduce it, and what an attacker could do with it." },
            { title: "Wait for a reply", text: "Please don't open a public issue or share details until it's fixed." },
          ]}
        />
      </Block>

      <Block id="scope" icon="lens" lead="Scope" title="What counts, and what doesn't." raised>
        <Facts
          rows={[
            { area: "In scope", fact: "This repository's code. The official site, once it is live. The fn7.json package format and the Gate's checks, including ways to get a hostile package past them." },
            { area: "In scope later", fact: "The MCP server, the REST API, the fn7 CLI and the on-chain splitter contract, once each exists." },
            { area: "Out of scope", fact: "Forks and mirrors run by other people. Denial of service by volume. Social engineering of maintainers. Findings that need an already compromised device or account." },
          ]}
        />
      </Block>

      <Block id="practice" icon="shield" lead="How fn/7 is built to be safe" title="Layers, not one wall.">
        <Points
          items={[
            "A verified person or business answers for every booth.",
            "Every release declares its permissions, and the Gate checks the files against them.",
            "Uploaded files are handled in a sealed sandbox that holds no database, payment or signing keys.",
            "No uploaded file is ever served from the site's own address or run as a page.",
            "fn/7 never holds a buyer's or a creator's coins. On-chain payments go straight to the creator.",
            "Before real money moves, the plan requires an outside penetration test and a smart-contract audit.",
          ]}
        />
      </Block>
    </>
  );
}
