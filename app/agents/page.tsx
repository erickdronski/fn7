import type { Metadata } from "next";
import { Suspense } from "react";
import { Block, CodeBlock, Facts, PageHero, Reasons, Steps } from "@/components/page/blocks";
import { AgentStory } from "@/components/product/agent-story";
import { StarButton, StarButtonFallback } from "@/components/site/star-button";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Reveal } from "@/components/ui/reveal";
import { CONNECTORS, MCP_TOOLS } from "@/lib/content";
import { FACTS, SPEC_SHEET } from "@/lib/facts";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "For agents",
  description: "fn/7 is built so an AI agent can search, check, buy, verify and install digital goods over one MCP connection, under a budget its owner sets.",
  alternates: { canonical: ROUTES.agents },
};

const MCP_CONFIG = `{
  "mcpServers": {
    "fn7": { "url": "https://${FACTS.host}/mcp" }
  }
}`;

export default function AgentsPage() {
  return (
    <>
      <PageHero
        title="Your agent, with a budget"
        lead="fn/7 is built so an agent can find the right release for a task, check it, pay under a cap you set, verify what it received and install it. One MCP connection, or a REST API."
        note="The MCP server, the API and the CLI ship in milestone M5. This page describes how they will work."
      >
        <Suspense fallback={<StarButtonFallback />}>
          <StarButton />
        </Suspense>
        <Button href={ROUTES.roadmap} variant="line">
          See the roadmap
        </Button>
      </PageHero>

      <Block id="setup" lead="Set up in minutes" title="Connect, set a budget, let it shop.">
        <Steps
          items={[
            { title: "Connect", text: "Paste one URL into your agent's MCP config. Or let the agent ask to connect, and approve it with a short code." },
            { title: "Set a budget", text: "Load a balance. Set a monthly cap, a limit per purchase, and the amount above which it must ask you first." },
            { title: "Let it shop", text: "It searches, buys and installs. Every call that spends or changes anything shows in the activity log." },
          ]}
        />
        <Reveal>
          <CodeBlock caption="Add to your agent's MCP config" code={MCP_CONFIG} action={<CopyButton text={MCP_CONFIG} />} />
        </Reveal>
      </Block>

      <Block id="story" lead="What it looks like" title="Four calls from a task to an installed skill." raised>
        <div className="story-wide">
          <Reveal>
            <AgentStory />
          </Reveal>
        </div>
      </Block>

      <Block id="tools" lead="The tools" title="Everything on the site, as structured calls." intro="The MCP tools and the REST API mirror each other one for one. Every response is stable JSON with a link a person can follow.">
        <Facts rows={MCP_TOOLS.map((row) => ({ area: <code className="mono tool">{row.tool}</code>, fact: row.does }))} />
      </Block>

      <Block id="safety" lead="Designed for safety" title="An agent can spend. It can't run away with the card." raised>
        <Reasons
          items={[
            { icon: "lock", title: "A dedicated budget.", text: "An agent spends a prepaid balance, never a card. It can't raise its own cap, load money or change payout details." },
            { icon: "check", title: "Approval above a threshold.", text: "A purchase over the amount you set waits for you. You approve it from an email or the site." },
            { icon: "shield", title: "A permissions policy.", text: "Every release declares what it needs. Set a rule such as never install anything that reads secrets, and install enforces it." },
            { icon: "lens", title: "Verified installs.", text: "The CLI checks the Gate's signed attestation and every file hash before it writes anything." },
            { icon: "chat", title: "Labeled text.", text: "Anything a creator wrote arrives in a labeled field, so an agent treats it as data and never as instructions." },
            { icon: "wrench", title: "Disconnect anytime.", text: "Pause an agent, rotate its key or revoke it from one page. The log keeps what it did." },
          ]}
        />
      </Block>

      <Block id="connect" lead="Where it will plug in" title="One marketplace, reachable from the tools agents already use.">
        <ul className="connectors">
          {CONNECTORS.map((connector, index) => (
            <li key={connector.name}>
              <Reveal delay={(index % 4) * 50}>
                <div className="connector">
                  {connector.brand ? <BrandIcon name={connector.brand} size={26} /> : null}
                  <h3>{connector.name}</h3>
                  <p>{connector.how}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="fineprint">Each mark belongs to its owner and names a planned integration. None of them endorses fn/7.</p>
      </Block>

      <Block id="pay" lead="How an agent pays" title="A balance first. On-chain when it has a wallet." raised>
        <Facts
          rows={[
            { area: "Balance", fact: "The default. Prepaid store credit, spent inside the agent's cap. Works from $1." },
            { area: "On-chain", fact: "USDC, SOL or ETH from the agent's own wallet. One transaction pays the creator 90% and fn/7 10%." },
            { area: "Agent payment standards", fact: "fn/7 will support the standards that keep a creator's 90% whole and never put fn/7 in custody of anyone's funds. They are being evaluated one by one." },
          ]}
        />
        <div className="linklist">
          <Button href={ROUTES.payments} variant="line" size="sm">
            How payments work
          </Button>
          <Button href={ROUTES.trust} variant="line" size="sm">
            How releases are checked
          </Button>
        </div>
      </Block>

      <Block id="spec" lead="Spec sheet" title="The technical facts, in one table.">
        <Facts rows={SPEC_SHEET} />
      </Block>
    </>
  );
}
