import type { Metadata } from "next";
import { Block, CodeBlock, Facts, PageHero, Points, Reasons } from "@/components/page/blocks";
import { TierLadder } from "@/components/product/tier-ladder";
import { Button } from "@/components/ui/button";
import { PriceChip } from "@/components/ui/price-chip";
import { Reveal } from "@/components/ui/reveal";
import { RANK_REASONS } from "@/lib/content";
import { LEVEL_THRESHOLDS, POINTS_PER_LINE_CAP } from "@/lib/points";
import { ROUTES } from "@/lib/site";
import { RANKS, RANK_LABEL, RANK_REQUIREMENT, newTiersAtRank } from "@/lib/tiers";

export const metadata: Metadata = {
  title: "Earned pricing",
  description: "On fn/7 a creator can't type a price. Rank unlocks higher price tiers, so a high price is proof of a track record.",
  alternates: { canonical: ROUTES.rank },
};

const TRUST_JSON = `"trust": {
  "rank": "hub",
  "settled_sales_band": "15+",
  "refund_band": "low",
  "new_creator": false,
  "gate_passed_at": "2026-11-12"
}`;

const BOOTHS = ["A crate and a lamp", "An awning over a counter", "A lit sign and shelves", "A second level", "Holo screens and a drone pad", "A tower with its own beacon"];

export default function RankPage() {
  return (
    <>
      <PageHero
        title="A price is proof"
        lead="On fn/7 you can't type a price. Every creator starts at Free, $1, $3 and $5, and higher price tiers unlock with rank. Rank comes from settled sales to real buyers, and from buying on the market yourself."
      >
        <Button href="#ladder">See the ladder</Button>
        <Button href={ROUTES.creators} variant="line">
          For creators
        </Button>
      </PageHero>

      <Block id="why" lead="Why it works this way" title="Three problems, one mechanism." intro="Open marketplaces fill with overpriced junk because anyone can charge anything on day one. Earned pricing ties what you can charge to what you have already delivered.">
        <Reasons items={RANK_REASONS} />
      </Block>

      <Block id="ladder" lead="The ladder" title="Six ranks. Twelve price tiers." intro="Drag through the ranks to see which tiers each one unlocks. Lower tiers always stay open." raised>
        <div className="split ladder-split">
          <Reveal>
            <TierLadder />
          </Reveal>
          <Facts
            rows={RANKS.map((rank, index) => ({
              area: RANK_LABEL[rank],
              fact: (
                <>
                  <span className="rank-need">{RANK_REQUIREMENT[rank]}</span>
                  <span className="rank-chips">
                    {newTiersAtRank(rank).map((cents) => (
                      <PriceChip key={cents} cents={cents} />
                    ))}
                  </span>
                  <span className="rank-booth">Pixel booth: {BOOTHS[index].toLowerCase()}.</span>
                </>
              ),
            }))}
          />
        </div>
      </Block>

      <Block id="rules" lead="What counts" title="Both tracks have to move." intro="Selling a lot without ever buying doesn't unlock a higher tier, and neither does spending a lot. A creator has to shop the market and be shopped.">
        <Points
          items={[
            "A sale counts once it is settled: 14 days old with no refund.",
            "Buyers have to be different people. Ten sales to one buyer count as one buyer.",
            "Each rank also needs goods you bought and opened yourself.",
            "Your own purchases never count, and neither do refunded sales or free listings.",
            "Rank belongs to the person. Every booth and alias you own shares it.",
            "Rank can be lost. If refunds pass the limit for 30 days, a creator drops one rank, and listings above the new ceiling are paused, not deleted.",
            "Above $5 a listing needs a written reason for its tier. At $100 and up it also needs a real preview, and a person reviews it.",
          ]}
        />
      </Block>

      <Block id="agents" lead="For agents" title="Rank is data an agent can read." intro="Every search result and listing carries a trust object. An agent, or its owner's policy, can require a minimum rank before spending." raised>
        <Reveal>
          <CodeBlock caption="Part of a search result" code={TRUST_JSON} />
        </Reveal>
      </Block>

      <Block id="levels" lead="Buyers level up too" title="Points for buying. No cash value.">
        <Facts
          rows={[
            { area: "How points work", fact: `Each item in a checkout counts its dollars, up to ${POINTS_PER_LINE_CAP} points an item. More items in one cart multiply the total, up to 3 times at five items.` },
            ...LEVEL_THRESHOLDS.map((points, index) => ({ area: `Level ${index + 1}`, fact: index === 0 ? "Where everyone starts." : `${points.toLocaleString("en-US")} points.` })),
            { area: "What points can't do", fact: "They can't be spent, sold or transferred. A refund takes back the points that purchase earned." },
          ]}
        />
      </Block>
    </>
  );
}
