import type { Metadata } from "next";
import { Suspense } from "react";
import { StarButton, StarButtonFallback } from "@/components/site/star-button";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { Reveal } from "@/components/ui/reveal";
import { EGGS, EGGS_ENABLED, egg } from "@/lib/eggs";
import { FACTS } from "@/lib/facts";
import { MILESTONES, STATE_LABEL } from "@/lib/roadmap";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Open source",
  description: `fn/7 is built in the open under ${FACTS.license}. Star the repo, share feedback, or send a pull request.`,
  alternates: { canonical: "/open-source" },
};

export default function OpenSource() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="display">{egg("useTheSource", "Open source")}</h1>
          <p>fn/7 is built in the open under {FACTS.license}. Every line is public, the design is public, and the roadmap is below. Here is how to help.</p>
          <div className="hero-cta">
            <Suspense fallback={<StarButtonFallback />}>
              <StarButton />
            </Suspense>
            <Button href={SITE.repo.url} variant="line">
              Read the code
            </Button>
          </div>
        </div>
      </section>

      <section className="section" id="help" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ul className="ways">
            <li>
              <Reveal>
                <a className="tile way" href={SITE.repo.url} target="_blank" rel="noreferrer">
                  <PixelIcon name="star" size={36} />
                  <h3>Star the repo</h3>
                  <p>If you want this to exist, a star is the simplest way to say so. It also helps other builders find it.</p>
                </a>
              </Reveal>
            </li>
            <li>
              <Reveal delay={60}>
                <a className="tile way" href={SITE.repo.feedback} target="_blank" rel="noreferrer">
                  <PixelIcon name="chat" size={36} />
                  <h3>Tell us what you think</h3>
                  <p>What works, what doesn&rsquo;t, and what would make you list something, buy something or connect an agent.</p>
                </a>
              </Reveal>
            </li>
            <li>
              <Reveal delay={120}>
                <a className="tile way" href={SITE.repo.fork} target="_blank" rel="noreferrer">
                  <PixelIcon name="fork" size={36} />
                  <h3>Fork it and send a pull request</h3>
                  <p>Start with a good first issue. A merged pull request earns the Builder badge once accounts exist.</p>
                  {EGGS_ENABLED ? <p className="way-egg">{EGGS.fork.line}</p> : null}
                </a>
              </Reveal>
            </li>
          </ul>
          <div className="linklist">
            <Button href={SITE.repo.contributing} variant="line" size="sm">
              Contributing guide
            </Button>
            <Button href={SITE.repo.goodFirstIssues} variant="line" size="sm">
              Good first issues
            </Button>
            <Button href={SITE.repo.idea} variant="line" size="sm">
              Suggest an idea
            </Button>
            <Button href={SITE.repo.bug} variant="line" size="sm">
              Report a bug
            </Button>
            <Button href={SITE.repo.discussions} variant="line" size="sm">
              Discussions
            </Button>
            <Button href={SITE.repo.security} variant="line" size="sm">
              Report a vulnerability
            </Button>
          </div>
        </div>
      </section>

      <section className="section gate" id="roadmap">
        <div className="wrap">
          <Reveal className="copy copy-wide">
            <h2>
              <span className="lead">Roadmap</span>
              Eleven milestones, built in order.
            </h2>
            <p>Each one ends with its tests passing, every screen checked at desktop and phone width, and a craft review. Payments run in test mode until launch.</p>
          </Reveal>
          <ol className="road">
            {MILESTONES.map((milestone) => (
              <li key={milestone.id}>
                <span className="road-id">{milestone.id}</span>
                <div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.summary}</p>
                </div>
                <span className={`state state-${milestone.state}`}>{STATE_LABEL[milestone.state]}</span>
              </li>
            ))}
          </ol>
          <div className="linklist">
            <Button href={SITE.design.platform} variant="line" size="sm">
              Platform design
            </Button>
            <Button href={SITE.design.catalog} variant="line" size="sm">
              Catalog and publishing design
            </Button>
          </div>
        </div>
      </section>

      <section className="section" id="license">
        <div className="wrap split">
          <Reveal className="copy">
            <h2>
              <span className="lead">License</span>
              The code is open. The name is not.
            </h2>
          </Reveal>
          <Reveal className="copy" delay={90}>
            <p>The code is licensed {FACTS.license}. You can run it, change it, and host your own market. If you host a changed version, you publish your changes.</p>
            <p>The name fn/7, the wordmark and the pixel art are reserved. A fork can set its own fees and its own rules. It needs its own name and its own look.</p>
            <p>
              {FACTS.fundPct}% of every sale on the official market will go to a public open-source fund, with its ledger published here.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
