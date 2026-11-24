import Link from "next/link";
import { Suspense } from "react";
import { Lead, Reasons } from "@/components/page/blocks";
import { FaqList, faqJsonLd, jsonLdString } from "@/components/page/faq-list";
import { AgentStory } from "@/components/product/agent-story";
import { Rails } from "@/components/product/rails";
import { Receipt } from "@/components/product/receipt";
import { TierLadder } from "@/components/product/tier-ladder";
import { MarketScene } from "@/components/scene/market-scene";
import { EveryoneWins } from "@/components/story/everyone-wins";
import { MoneyFlow } from "@/components/story/money-flow";
import { ShareFootnote } from "@/components/story/share-footnote";
import { Ticker } from "@/components/story/ticker";
import { StarButton, StarButtonFallback } from "@/components/site/star-button";
import { Button } from "@/components/ui/button";
import { Count } from "@/components/ui/count";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { Reveal } from "@/components/ui/reveal";
import { CATEGORIES, FAQ, GATE_CHECKS, RANK_REASONS } from "@/lib/content";
import { LOWEST_PRICE, SHARE, STARTING_TIERS, TOP_PRICE } from "@/lib/copy";
import { egg } from "@/lib/eggs";
import { FACTS, SPEC_SHEET } from "@/lib/facts";
import { getRepoStats } from "@/lib/github";
import { ROUTES, SITE } from "@/lib/site";
import { formatPrice } from "@/lib/tiers";

const MCP_CONFIG = `{
  "mcpServers": {
    "fn7": { "url": "https://${FACTS.host}/mcp" }
  }
}`;

const HOME_FAQ = FAQ.slice(0, 8);

const jsonLd = [
  { "@context": "https://schema.org", "@type": "Organization", name: FACTS.name, alternateName: FACTS.said, url: SITE.origin, description: FACTS.definition, sameAs: [SITE.repo.url] },
  { "@context": "https://schema.org", "@type": "WebSite", name: FACTS.name, url: SITE.origin, description: FACTS.definition },
  faqJsonLd(HOME_FAQ),
];

async function RepoFigures() {
  const stats = await getRepoStats();
  const figures = [
    { label: "stars", value: stats.stars },
    { label: "forks", value: stats.forks },
    { label: "open issues", value: stats.openIssues },
  ].filter((figure) => figure.value !== null && figure.value > 0);
  if (figures.length === 0) return null;
  return (
    <dl className="band-figures">
      {figures.map((figure) => (
        <div key={figure.label}>
          <dt>{figure.label}</dt>
          <dd>
            <Count value={figure.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />

      <p className="strip">
        {FACTS.status} <Link href={ROUTES.roadmap}>See the roadmap</Link>
      </p>

      <section className="hero" data-scene-host>
        <MarketScene />
        <div className="hero-copy wrap">
          <h1 className="display">
            The market <br />
            built for agents
          </h1>
          <p className="hero-sub">Skills, code, courses and tools, sold over one MCP connection. Creators keep {SHARE.creator} and earn their way from {LOWEST_PRICE} to {TOP_PRICE}. Every release is scanned, reviewed and signed.</p>
          <div className="hero-cta">
            <Suspense fallback={<StarButtonFallback />}>
              <StarButton />
            </Suspense>
            <Button href={ROUTES.rank} variant="line">
              How earned pricing works
            </Button>
          </div>
        </div>
      </section>

      <section className="section gate" id="purpose">
        <div className="wrap">
          <Reveal className="copy copy-wide">
            <h2>
              <Lead icon="lens">Why fn/7 exists</Lead>
              Agents need tools, knowledge and data. This is where they get them.
            </h2>
          </Reveal>
          <Reveal>
            <div className="purpose" style={{ marginTop: 28 }}>
              <p>An agent that needs a skill, a dataset, a template or a lesson has had nowhere to go. It searches the open web and hopes.</p>
              <p>fn/7 is the market it can search, trust and pay in. The people who make those goods keep {FACTS.creatorSharePct}% of every sale.</p>
            </div>
          </Reveal>
          <Ticker />
          <div className="linklist">
            <Button href={ROUTES.about} variant="line">
              Why it&rsquo;s called fn/7
            </Button>
          </div>
        </div>
      </section>

      <section className="section" id="rank">
        <div className="wrap">
          <Reveal className="copy copy-wide">
            <h2>
              <Lead icon="star">Earned pricing</Lead>
              On fn/7, a price is proof.
            </h2>
            <p>
              You can&rsquo;t type a price here. Every creator starts at {STARTING_TIERS}, and higher price tiers unlock with rank. Rank comes from settled sales to real buyers, and from buying on the market yourself. A $500
              release can only come from a creator with 250 settled sales to 100 different buyers.
            </p>
          </Reveal>
          <div className="rank-feature">
            <Reveal>
              <TierLadder />
            </Reveal>
            <Reasons items={RANK_REASONS} />
          </div>
          <div className="linklist">
            <Button href={ROUTES.rank}>See how rank works</Button>
            <Button href={ROUTES.creators} variant="line">
              For creators
            </Button>
          </div>
        </div>
      </section>

      <section className="section gate" id="agents">
        <div className="wrap split">
          <Reveal className="copy">
            <h2>
              <Lead icon="bot">Built for agents</Lead>
              Search, buy and install over one connection.
            </h2>
            <p>Connect any agent over MCP or the REST API. It shops under a budget you set, reads what a release needs before it buys, and verifies what it receives.</p>
            <figure className="code">
              <figcaption>
                <span>What your agent&rsquo;s MCP config will look like</span>
              </figcaption>
              <pre className="mono">{MCP_CONFIG}</pre>
            </figure>
            <p className="note">The server ships in milestone M5. It isn&rsquo;t live yet.</p>
            <Button href={ROUTES.agents} variant="line">
              See how agents use fn/7
            </Button>
          </Reveal>
          <Reveal delay={90}>
            <AgentStory />
          </Reveal>
        </div>
      </section>

      <section className="section" id="creators">
        <div className="wrap figure-split">
          <Reveal>
            <p className="figure display num" aria-hidden="true">
              <Count value={FACTS.creatorSharePct} />%<sup>*</sup>
            </p>
          </Reveal>
          <Reveal className="copy" delay={90}>
            <h2>
              <Lead icon="gem">For creators</Lead>
              Keep {FACTS.creatorSharePct}%<span className="star-mark">*</span> of every sale.
            </h2>
            <p>
              No listing fee and no monthly fee. fn/7 takes {SHARE.fn7} only when something sells: {FACTS.platformPct}% runs the market and {FACTS.fundPct}% goes to a public open-source fund.
            </p>
            <MoneyFlow />
            <p className="note">{egg("neverChanges", "The split is the same at every price.")}</p>
            <Button href={ROUTES.creators} variant="line">
              See how selling works
            </Button>
            <ShareFootnote />
          </Reveal>
        </div>
      </section>

      <section className="section gate" id="payments">
        <div className="wrap split split-flip">
          <Reveal>
            <Receipt />
          </Reveal>
          <Reveal className="copy" delay={90}>
            <h2>
              <Lead icon="wallet">Payments</Lead>
              Pay any way. fn/7 never holds your funds.
            </h2>
            <p>Use a card, Apple Pay, Google Pay or a prepaid balance. Or pay on-chain, and the sale splits {SHARE.split} in one transaction, straight to the creator&rsquo;s wallet.</p>
            <Rails compact />
            <p className="note">A card purchase starts at {formatPrice(FACTS.cardMinimumCents)}. A balance or crypto works from {LOWEST_PRICE}.</p>
            <Button href={ROUTES.payments} variant="line">
              See every way to pay
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section" id="catalog">
        <div className="wrap">
          <Reveal className="copy copy-wide">
            <h2>
              <Lead icon="grid">Anything digital</Lead>
              Eight categories, one open package format.
            </h2>
            <p>Every release is described by fn7.json: what it is, what is in it, how it installs and which permissions it needs.</p>
          </Reveal>
          <ul className="cats">
            {CATEGORIES.map((category, index) => (
              <li key={category.name}>
                <Reveal delay={(index % 4) * 45}>
                  <Link className="tile cat" href={`${ROUTES.creators}#catalog`}>
                    <PixelIcon name={category.icon} size={36} />
                    <span className="cat-name">{category.name}</span>
                    <span className="cat-types">{category.types}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section gate" id="gate">
        <div className="wrap">
          <Reveal className="copy copy-center">
            <h2>Every release is scanned, reviewed and signed</h2>
            <p>Nothing will go public until it passes the Gate. Agents will only ever see releases that passed.</p>
          </Reveal>
          <ul className="gate-grid">
            {GATE_CHECKS.map((check, index) => (
              <li key={check.icon}>
                <Reveal delay={index * 60}>
                  <span className="scan">
                    <PixelIcon name={check.icon} size={84} />
                  </span>
                  <p>{check.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="gate-foot">
            <p>A release that passes will get an Ed25519-signed attestation in a public transparency log. The Gate ships in milestone M3.</p>
            <Button href={ROUTES.trust} variant="line">
              See how the Gate works
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section" id="wins">
        <div className="wrap">
          <Reveal className="copy copy-wide">
            <h2>
              <Lead icon="check">Who gains</Lead>
              It only works if everyone wins.
            </h2>
            <p>What each side gets once the market opens.</p>
          </Reveal>
          <EveryoneWins />
        </div>
      </section>

      <section className="band" id="open-source">
        <div className="wrap">
          <Reveal>
            <h2>Open source, built in public</h2>
            <p>Read the code, send a pull request, tell us what to build next.</p>
            <Suspense fallback={null}>
              <RepoFigures />
            </Suspense>
            <div className="band-cta">
              <Suspense fallback={<StarButtonFallback variant="ink" />}>
                <StarButton variant="ink" />
              </Suspense>
              <Button href={ROUTES.openSource} variant="ink">
                See how to help
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="spec">
        <div className="wrap">
          <Reveal className="copy copy-wide">
            <h2>
              <Lead icon="code">Spec sheet</Lead>
              What fn/7 is being built to, in one table.
            </h2>
            <p>Each row is a design decision. None of it is live yet.</p>
          </Reveal>
          <Reveal>
            <table className="spec">
              <tbody>
                {SPEC_SHEET.map((row) => (
                  <tr key={row.area}>
                    <th scope="row">{row.area}</th>
                    <td>{row.fact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <div className="linklist">
            <Button href={ROUTES.docs} variant="line" size="sm">
              Read the docs
            </Button>
          </div>
        </div>
      </section>

      <section className="section gate" id="faq">
        <div className="wrap faq">
          <Reveal className="copy">
            <h2>Questions</h2>
            <Button href={ROUTES.faq} variant="line">
              See all questions
            </Button>
          </Reveal>
          <Reveal>
            <FaqList items={HOME_FAQ} />
          </Reveal>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <Reveal>
            <h2 className="display">Help build the market</h2>
            <div className="hero-cta">
              <Suspense fallback={<StarButtonFallback />}>
                <StarButton />
              </Suspense>
              <Button href={SITE.repo.feedback} variant="line">
                Share feedback
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
