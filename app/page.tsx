import { Suspense } from "react";
import { AgentStory } from "@/components/product/agent-story";
import { TierLadder } from "@/components/product/tier-ladder";
import { MarketScene } from "@/components/scene/market-scene";
import { StarButton, StarButtonFallback } from "@/components/site/star-button";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Count } from "@/components/ui/count";
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";
import { Reveal } from "@/components/ui/reveal";
import { egg } from "@/lib/eggs";
import { FACTS, SPEC_SHEET } from "@/lib/facts";
import { getRepoStats } from "@/lib/github";
import { creatorCut } from "@/lib/prices";
import { SITE } from "@/lib/site";
import Link from "next/link";

const MCP_CONFIG = `{
  "mcpServers": {
    "fn7": { "url": "https://${FACTS.host}/mcp" }
  }
}`;

const CATEGORIES: Array<{ name: string; icon: PixelIconName; types: string }> = [
  { name: "Agents", icon: "bot", types: "Skills, prompt packs, MCP servers, plugins, workflows" },
  { name: "Code", icon: "code", types: "Starters, repos, libraries, snippets, scripts" },
  { name: "Learn", icon: "book", types: "Courses, lessons, guides, recorded workshops" },
  { name: "Templates", icon: "grid", types: "Docs, decks, spreadsheets, design files, site themes" },
  { name: "Media", icon: "play", types: "Video, audio, photo sets" },
  { name: "Software", icon: "window", types: "Apps, extensions and CLIs, as readable source" },
  { name: "Assets", icon: "gem", types: "Icons, fonts, UI kits, sprites, 3D, presets" },
  { name: "Data", icon: "data", types: "Datasets, eval sets, embeddings, models in safe formats" },
];

const GATE: Array<{ icon: PixelIconName; text: string }> = [
  { icon: "lock", text: "A security scan for leaked secrets, malware and risky installs." },
  { icon: "lens", text: "A prompt-injection scan for instructions that turn an agent on its owner." },
  { icon: "sieve", text: "A quality review of the release against its own sample." },
  { icon: "shield", text: "Human review for anything that runs code or costs more than $5." },
];

const SALE = 5000;
const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

const FAQ: Array<{ q: string; a: string }> = [
  { q: "What is fn/7?", a: FACTS.definition },
  {
    q: "Can I buy or sell on it today?",
    a: "Not yet. fn/7 is being built in the open, one milestone at a time. The design is public, the code is public, and the roadmap shows what comes next. Star the repo to follow along.",
  },
  {
    q: "How much do creators keep?",
    a: `${FACTS.creatorSharePct}% of the price paid, on every sale, at every price tier and on every way to pay. fn/7 keeps 10%: ${FACTS.platformPct}% runs the market and ${FACTS.fundPct}% goes to a public open-source fund. There is no listing fee and no monthly fee.`,
  },
  {
    q: "How will agents buy things?",
    a: "Over one MCP connection, or a REST API. An agent searches by describing its task, reads a listing's permissions and track record, pays from a balance under a cap its owner set, verifies what it received and installs it. Purchases above a threshold wait for the owner's approval.",
  },
  {
    q: "How is a release checked before it goes public?",
    a: "It passes the Gate: a security scan, a prompt-injection scan and a quality review, with human review where the risk is higher. A release that passes gets an Ed25519-signed attestation, recorded in a public transparency log, which an agent can verify before installing.",
  },
  {
    q: "How will payments work?",
    a: "Cards, Apple Pay and Google Pay through Stripe, a prepaid fn/7 balance, or USDC, SOL and ETH. A card purchase starts at $5, and a balance or crypto works from $1. On-chain sales split 90/10 in one transaction, so fn/7 never holds a buyer's or a creator's coins.",
  },
  {
    q: "What are price tiers?",
    a: "Every price on fn/7 is one of twelve fixed tiers, from Free to $500. Every creator starts with Free, $1, $3 and $5. Selling well and shopping the market raises a creator's rank, and each rank unlocks higher tiers.",
  },
  {
    q: "Is it really open source?",
    a: `Yes. The code is licensed ${FACTS.license}, and anyone can read it, run it, fork it and send a pull request. The name, the wordmark and the pixel art are reserved, so a fork needs its own name and look.`,
  },
];

const jsonLd = [
  { "@context": "https://schema.org", "@type": "Organization", name: FACTS.name, alternateName: FACTS.said, url: SITE.origin, description: FACTS.definition, sameAs: [SITE.repo.url] },
  { "@context": "https://schema.org", "@type": "WebSite", name: FACTS.name, url: SITE.origin, description: FACTS.definition },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <p className="strip">
        {FACTS.status} <Link href="/open-source#roadmap">See the roadmap</Link>
      </p>

      <section className="hero" data-scene-host>
        <MarketScene />
        <div className="hero-copy wrap">
          <h1 className="display">
            The market <br />
            built for agents
          </h1>
          <p className="hero-sub">Skills, code, courses and tools, sold over one MCP connection. Creators keep 90%. Every release is scanned, reviewed and signed.</p>
          <div className="hero-cta">
            <Suspense fallback={<StarButtonFallback />}>
              <StarButton />
            </Suspense>
            <Button href="/open-source#roadmap" variant="line">
              See the roadmap
            </Button>
          </div>
        </div>
      </section>

      <section className="section" id="agents">
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
            <Button href={SITE.design.agents} variant="line">
              Read the agent design
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
            <Button href={SITE.design.publishing} variant="line">
              Read how publishing works
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section" id="payments">
        <div className="wrap split split-flip">
          <Reveal>
            <article className="receipt" aria-label="Sample receipt">
              <header>
                <h3>Receipt</h3>
                <span className="mono">ord_7F3K2</span>
              </header>
              <dl>
                <dt>Release-notes skill, 1.2.0</dt>
                <dd className="mono num">$5.00</dd>
                <dt>Paid with</dt>
                <dd>USDC on Solana</dd>
                <dt>To the creator, @courier</dt>
                <dd className="mono num">4.50 USDC</dd>
                <dt>To fn/7</dt>
                <dd className="mono num">0.50 USDC</dd>
                <dt>Transaction</dt>
                <dd className="mono">5hG7…k2Qp</dd>
                <dt>Signature</dt>
                <dd>Ed25519, verified</dd>
              </dl>
              <footer>Sample data. One transaction pays both sides.</footer>
            </article>
          </Reveal>
          <Reveal className="copy" delay={90}>
            <h2>
              <span className="lead">Payments</span>
              Pay any way. fn/7 never holds your funds.
            </h2>
            <p>Use a card, Apple Pay, Google Pay or a prepaid balance. Or pay on-chain, and the sale splits 90/10 in one transaction, straight to the creator&rsquo;s wallet.</p>
            <ul className="rails" aria-label="Ways to pay">
              {["Card", "Apple Pay", "Google Pay", "Balance", ...FACTS.coins].map((rail) => (
                <li key={rail}>{rail}</li>
              ))}
            </ul>
            <p className="note">A card purchase starts at $5. A balance or crypto works from $1.</p>
            <Button href={SITE.design.payments} variant="line">
              Read how payments work
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section" id="status">
        <div className="wrap split">
          <Reveal className="copy">
            <h2>
              <span className="lead">Rank</span>
              Start at $1. Earn your way to $500.
            </h2>
            <p>Every price is one of twelve fixed tiers. Every creator starts with Free, $1, $3 and $5. Sell well and shop the market, and your rank unlocks the higher tiers.</p>
            <p className="note">Refunded sales and your own purchases don&rsquo;t count.</p>
            <Button href={SITE.design.status} variant="line">
              Read how rank works
            </Button>
          </Reveal>
          <Reveal delay={90}>
            <TierLadder />
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
                <Reveal delay={index * 45}>
                  <a className="tile cat" href={SITE.design.whatCanBeSold} target="_blank" rel="noreferrer">
                    <PixelIcon name={category.icon} size={36} />
                    <span className="cat-name">{category.name}</span>
                    <span className="cat-types">{category.types}</span>
                  </a>
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
            {GATE.map((check, index) => (
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
            <Button href={SITE.design.gate} variant="line">
              Read how the Gate works
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
              <Link href="/open-source" className="btn btn-ink">
                See how to help
              </Link>
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
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap faq">
          <Reveal className="copy">
            <h2>Questions</h2>
          </Reveal>
          <Reveal>
            {FAQ.map((item) => (
              <details key={item.q} className="faq-item" name="faq">
                <summary>
                  {item.q}
                  <svg className="faq-mark" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M7 1.5v11M1.5 7h11" />
                  </svg>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
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
