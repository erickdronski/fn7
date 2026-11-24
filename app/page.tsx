import Link from "next/link";
import { Suspense } from "react";
import { Reasons } from "@/components/page/blocks";
import { FaqList, faqJsonLd, jsonLdString } from "@/components/page/faq-list";
import { AgentStory } from "@/components/product/agent-story";
import { Rails } from "@/components/product/rails";
import { Receipt } from "@/components/product/receipt";
import { TierLadder } from "@/components/product/tier-ladder";
import { MarketScene } from "@/components/scene/market-scene";
import { StarButton, StarButtonFallback } from "@/components/site/star-button";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Count } from "@/components/ui/count";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { Reveal } from "@/components/ui/reveal";
import { CATEGORIES, FAQ, GATE_CHECKS, RANK_REASONS } from "@/lib/content";
import { egg } from "@/lib/eggs";
import { FACTS, SPEC_SHEET } from "@/lib/facts";
import { getRepoStats } from "@/lib/github";
import { creatorCut } from "@/lib/prices";
import { ROUTES, SITE } from "@/lib/site";

const MCP_CONFIG = `{
  "mcpServers": {
    "fn7": { "url": "https://${FACTS.host}/mcp" }
  }
}`;

const SALE = 5000;
const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;
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
          <dd>
            <Count value={figure.value} />
          </dd>
          <dt>{figure.label}</dt>
        </div>
      ))}
    </dl>
  );
}

export default function Home() {
  const creator = creatorCut(SALE);
  const fund = (SALE * FACTS.fundPct) / 100;
  const platform = SALE - creator - fund;

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
          <p className="hero-sub">Skills, code, courses and tools, sold over one MCP connection. Creators keep 90% and earn their way from $1 to $500. Every release is scanned, reviewed and signed.</p>
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

      <section className="section" id="rank">
        <div className="wrap">
          <Reveal className="copy copy-wide">
            <h2>
              <span className="lead">Earned pricing</span>
              On fn/7, a price is proof.
            </h2>
            <p>
              You can&rsquo;t type a price here. Every creator starts at Free, $1, $3 and $5, and higher price tiers unlock with rank. Rank comes from settled sales to real buyers, and from buying on the market yourself. A $500
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
              <span className="lead">Built for agents</span>
              Search, buy and install over one connection.
            </h2>
            <p>Connect any agent over MCP or the REST API. It shops under a budget you set, reads what a release needs before it buys, and verifies what it receives.</p>
            <figure className="code">
              <figcaption>
                <span>Add to your agent&rsquo;s MCP config</span>
                <CopyButton text={MCP_CONFIG} />
              </figcaption>
              <pre className="mono">{MCP_CONFIG}</pre>
            </figure>
            <p className="note">The server ships in milestone M5. The address is reserved.</p>
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
              {FACTS.creatorSharePct}%
            </p>
          </Reveal>
          <Reveal className="copy" delay={90}>
            <h2>
              <span className="lead">For creators</span>
              Keep {FACTS.creatorSharePct}% of every sale.
            </h2>
            <p>
              No listing fee and no monthly fee. fn/7 takes 10% only when something sells: {FACTS.platformPct}% runs the market and {FACTS.fundPct}% goes to a public open-source fund.
            </p>
            <div className="sale">
              <p className="sale-head">
                <span>One $50 sale</span>
                <span className="mono num">{dollars(SALE)}</span>
              </p>
              <div className="sale-bar" aria-hidden="true">
                <i style={{ flexGrow: FACTS.creatorSharePct }} />
                <i style={{ flexGrow: FACTS.platformPct }} />
                <i style={{ flexGrow: FACTS.fundPct }} />
              </div>
              <dl className="sale-legend">
                <dt>You keep</dt>
                <dd className="mono num">{dollars(creator)}</dd>
                <dt>Runs the market</dt>
                <dd className="mono num">{dollars(platform)}</dd>
                <dt>Open-source fund</dt>
                <dd className="mono num">{dollars(fund)}</dd>
              </dl>
            </div>
            <p className="note">{egg("neverChanges", "The split is the same at every price.")}</p>
            <Button href={ROUTES.creators} variant="line">
              See how selling works
            </Button>
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
              <span className="lead">Payments</span>
              Pay any way. fn/7 never holds your funds.
            </h2>
            <p>Use a card, Apple Pay, Google Pay or a prepaid balance. Or pay on-chain, and the sale splits 90/10 in one transaction, straight to the creator&rsquo;s wallet.</p>
            <Rails compact />
            <p className="note">A card purchase starts at $5. A balance or crypto works from $1.</p>
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
              <span className="lead">Anything digital</span>
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
            <p>Nothing goes public until it passes the Gate. Agents only ever see releases that passed.</p>
          </Reveal>
          <ul className="gate-grid">
            {GATE_CHECKS.map((check, index) => (
              <li key={check.icon}>
                <Reveal delay={index * 60}>
                  <PixelIcon name={check.icon} size={84} />
                  <p>{check.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="gate-foot">
            <p>A release that passes gets an Ed25519-signed attestation in a public transparency log.</p>
            <Button href={ROUTES.trust} variant="line">
              See how the Gate works
            </Button>
          </Reveal>
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
              <span className="lead">Spec sheet</span>
              The technical facts, in one table.
            </h2>
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
