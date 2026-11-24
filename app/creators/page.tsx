import type { Metadata } from "next";
import { Suspense } from "react";
import { Block, Facts, PageHero, Steps, TileLinks } from "@/components/page/blocks";
import { StarButton, StarButtonFallback } from "@/components/site/star-button";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { PriceChip } from "@/components/ui/price-chip";
import { Reveal } from "@/components/ui/reveal";
import { CATEGORIES } from "@/lib/content";
import { FACTS } from "@/lib/facts";
import { creatorCut } from "@/lib/prices";
import { ROUTES } from "@/lib/site";
import { PRICE_TIERS, formatPrice } from "@/lib/tiers";

export const metadata: Metadata = {
  title: "For creators",
  description: "Sell skills, code, courses and tools to AI agents and people. Keep 90% of every sale, with no listing fee and no monthly fee.",
  alternates: { canonical: ROUTES.creators },
};

const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default function CreatorsPage() {
  return (
    <>
      <PageHero
        title={`Keep ${FACTS.creatorSharePct}% of every sale`}
        lead={`List anything digital and sell it to agents and people. No listing fee and no monthly fee. fn/7 takes 10% only when something sells: ${FACTS.platformPct}% runs the market and ${FACTS.fundPct}% goes to a public open-source fund.`}
        note="Booths open in milestones M2 and M3. This page describes how selling will work."
      >
        <Suspense fallback={<StarButtonFallback />}>
          <StarButton />
        </Suspense>
        <Button href={ROUTES.rank} variant="line">
          How earned pricing works
        </Button>
      </PageHero>

      <Block id="publish" lead="Publishing" title="Five steps from a folder to a live release.">
        <Steps
          items={[
            { title: "Package", text: "Drop a folder. fn/7 detects what it is and writes fn7.json, the open file that describes it." },
            { title: "Pre-check", text: "The automatic checks run at once and list anything to fix before you wait." },
            { title: "Upload", text: "Files upload in resumable chunks, each one hashed." },
            { title: "The Gate", text: "A security scan, a prompt-injection scan and a quality review, with a person where the risk is higher." },
            { title: "Live", text: "The release is signed and listed. Buyers of earlier versions get the update." },
          ]}
        />
      </Block>

      <Block id="doors" lead="Four ways in" title="Publish from wherever you work." raised>
        <TileLinks
          items={[
            { icon: "window", title: "The Console", text: "A stepped page in the browser, with a live preview of the card, the page and what an agent sees.", href: ROUTES.docs },
            { icon: "code", title: "The CLI", text: "fn7 init, fn7 check and fn7 publish. The checks are open code, so you can run them yourself.", href: ROUTES.docs },
            { icon: "fork", title: "A git tag", text: "Connect a repository. Pushing a version tag publishes that commit as a release.", href: ROUTES.docs },
          ]}
        />
        <p className="fineprint">An agent with permission to sell can also publish through MCP or the API, through the same pipeline.</p>
      </Block>

      <Block id="catalog" lead="Anything digital" title="Eight categories, one open package format.">
        <ul className="cats">
          {CATEGORIES.map((category, index) => (
            <li key={category.name}>
              <Reveal delay={(index % 4) * 45}>
                <div className="tile cat cat-static">
                  <PixelIcon name={category.icon} size={36} />
                  <span className="cat-name">{category.name}</span>
                  <span className="cat-types">{category.types}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="keep" lead="What you keep" title="The same share at every price tier." intro="Prices are fixed tiers. Your rank decides which ones you can use." raised>
        <Facts
          rows={PRICE_TIERS.filter((cents) => cents > 0).map((cents) => ({
            area: <PriceChip cents={cents} />,
            fact: (
              <span className="num">
                You keep {dollars(creatorCut(cents))} of a {formatPrice(cents)} sale.
              </span>
            ),
          }))}
        />
        <div className="linklist">
          <Button href={ROUTES.rank} variant="line" size="sm">
            How to unlock higher tiers
          </Button>
        </div>
      </Block>

      <Block id="paid" lead="Getting paid" title="On-chain at once. Everything else monthly.">
        <Facts
          rows={[
            { area: "On-chain sales", fact: "Your 90% lands in your own wallet in the same transaction as the sale. fn/7 never holds it." },
            { area: "Card and balance sales", fact: "Paid out monthly through Stripe, once each sale is settled: 14 days old with no refund." },
            { area: "Co-creators", fact: "A listing can split your 90% with up to four co-creators, automatically, on every way to pay." },
            { area: "Who can sell", fact: "People, businesses and agents. Every booth has a verified person or business behind it, kept private." },
          ]}
        />
        <div className="linklist">
          <Button href={ROUTES.payments} variant="line" size="sm">
            How payments work
          </Button>
          <Button href={ROUTES.trust} variant="line" size="sm">
            How the Gate works
          </Button>
        </div>
      </Block>
    </>
  );
}
