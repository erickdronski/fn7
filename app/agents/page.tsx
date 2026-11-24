import type { Metadata } from "next";
import { Suspense } from "react";
import { Block, CodeBlock, Facts, PageHero, Reasons, Steps } from "@/components/page/blocks";
import { AgentStory } from "@/components/product/agent-story";
import { StarButton, StarButtonFallback } from "@/components/site/star-button";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { Reveal } from "@/components/ui/reveal";
import { CONNECTORS, MCP_TOOLS } from "@/lib/content";
import { LOWEST_PRICE, SHARE } from "@/lib/copy";
import { FACTS, SPEC_SHEET } from "@/lib/facts";
import { canShowMark } from "@/lib/marks";
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

      <Block id="setup" icon="plug" lead="Set up in minutes" title="Connect, set a budget, let it shop.">
        <Steps
          items={[
            { title: "Connect", text: "Paste one URL into your agent's MCP config. Or let the agent ask to connect, and approve it with a short code." },
            { title: "Set a budget", text: "Load a balance. Set a monthly cap, a limit per purchase, and the amount above which it must ask you first." },
            { title: "Let it shop", text: "It searches, buys and installs. Every call that spends or changes anything shows in the activity log." },
          ]}
        />
        <Reveal>
          <CodeBlock caption="What your agent's MCP config will look like" code={MCP_CONFIG} />
        </Reveal>
      </Block>

      <Block id="story" icon="play" lead="What it looks like" title="Four calls from a task to an installed skill." raised>
        <div className="story-wide">
          <Reveal>
            <AgentStory />
          </Reveal>
        </div>
      </Block>

      <Block id="tools" icon="wrench" lead="The tools" title="Everything on the site, as structured calls." intro="The MCP tools and the REST API mirror each other one for one. Every response is stable JSON with a link a person can follow.">
        <Facts rows={MCP_TOOLS.map((row) => ({ area: <code className="mono tool">{row.tool}</code>, fact: row.does }))} />
      </Block>

      <Block id="safety" icon="lock" lead="Designed for safety" title="An agent can spend. It can't run away with the card." raised>
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

      <Block id="connect" icon="grid" lead="Where it will plug in" title="One marketplace, reachable from the tools agents already use.">
        <ul className="connectors">
          {CONNECTORS.map((connector, index) => (
            <li key={connector.name}>
              <Reveal delay={(index % 4) * 50}>
                <div className="connector">
                  {connector.brand && canShowMark(connector.brand) ? <BrandIcon name={connector.brand} size={26} /> : <PixelIcon name={connector.icon} size={26} />}
                  <h3>{connector.name}</h3>
                  <p>{connector.how}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="fineprint">Each name and mark belongs to its owner and names a planned integration. None of them endorses fn/7.</p>
      </Block>

      <Block id="pay" icon="wallet" lead="How an agent pays" title="A balance first. On-chain when it has a wallet." raised>
        <Facts
          rows={[
            { area: "Balance", fact: `The default. Prepaid store credit, spent inside the agent's cap. Works from ${LOWEST_PRICE}.` },
            { area: "On-chain", fact: `USDC, SOL or ETH from the agent's own wallet. One transaction pays the creator ${SHARE.creator} and fn/7 ${SHARE.fn7}.` },
            { area: "Agent wallets", fact: "An agent paying through a wallet its owner approved, such as a chat product's wallet or a card network's agent token, arrives as an ordinary card payment." },
            { area: "Agent payment standards", fact: `Planned in this order: Stripe's shared payment tokens, then x402 on Solana. fn/7 adds a standard only if the creator's ${SHARE.creator} holds and fn/7 never holds anyone's funds.` },
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

      <Block id="spec" icon="code" lead="Spec sheet" title="What fn/7 is being built to, in one table." intro="Each row is a design decision. None of it is live yet.">
        <Facts rows={SPEC_SHEET} />
      </Block>
    </>
  );
}
