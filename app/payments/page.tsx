import type { Metadata } from "next";
import { Block, Facts, PageHero, Steps } from "@/components/page/blocks";
import { Rails } from "@/components/product/rails";
import { Receipt } from "@/components/product/receipt";
import { Button } from "@/components/ui/button";
import { PriceChip } from "@/components/ui/price-chip";
import { Reveal } from "@/components/ui/reveal";
import { LOWEST_PRICE, SHARE } from "@/lib/copy";
import { FACTS } from "@/lib/facts";
import { ShareFootnote } from "@/components/story/share-footnote";
import { LOAD_AMOUNTS_CENTS, splitSale } from "@/lib/prices";
import { ROUTES } from "@/lib/site";
import { PRICE_TIERS, formatPrice } from "@/lib/tiers";

export const metadata: Metadata = {
  title: "Payments",
  description: `Pay by card, Apple Pay, Google Pay, a prepaid balance, or USDC, SOL and ETH. On-chain sales split ${SHARE.split} in one transaction, and fn/7 never holds your funds.`,
  alternates: { canonical: ROUTES.payments },
};

const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default function PaymentsPage() {
  return (
    <>
      <PageHero
        title="Pay any way"
        lead={`Use a card, Apple Pay, Google Pay or a prepaid balance. Or pay on-chain, and the sale splits ${SHARE.split} in one transaction, straight to the creator's wallet. fn/7 never holds your funds.`}
        note="Payments arrive in milestones M4 and M7, in test mode first. Nothing can be bought today."
      >
        <Button href="#rails">See every way to pay</Button>
        <Button href={`${ROUTES.legal}/disclosures`} variant="line">
          Payment disclosures
        </Button>
      </PageHero>

      <Block id="rails" icon="wallet" lead="Ways to pay" title="The ones agents and people already use.">
        <Rails />
        <p className="fineprint">Each mark belongs to its owner and names a planned payment method. None of them endorses fn/7.</p>
      </Block>

      <Block id="split" icon="fork" lead="On-chain" title="One transaction pays both sides." raised>
        <div className="split">
          <div>
            <Steps
              items={[
                { title: "Quote", text: "Prices are in US dollars. At checkout the amount is quoted in your coin and held for 120 seconds. USDC is one to one." },
                { title: "Split", text: `Your wallet signs one transaction. It sends ${SHARE.creator} to the creator's wallet and ${SHARE.fn7} to fn/7.` },
                { title: "Confirm", text: "fn/7 checks the chain, releases the files and signs your receipt." },
              ]}
            />
          </div>
          <Reveal>
            <Receipt />
          </Reveal>
        </div>
      </Block>

      <Block id="rules" icon="check" lead="The rules" title="Short, and the same for everyone.">
        <Facts
          rows={[
            { area: "Cards and wallets", fact: `A card, Apple Pay, Google Pay or Link purchase starts at ${formatPrice(FACTS.cardMinimumCents)}. fn/7 pays the processing fee out of its own ${SHARE.fn7}.` },
            { area: "Balance", fact: `Prepaid store credit, loaded in amounts of ${LOAD_AMOUNTS_CENTS.map(formatPrice).join(", ")}. It buys anything from $1. It can't be cashed out or sent to someone else.` },
            { area: "Crypto", fact: `${FACTS.coins.join(", ")} on ${FACTS.chains.join(", ")}. From ${LOWEST_PRICE} on Solana and Base. Ethereum mainnet only above $50, because of network fees.` },
            { area: "Refunds", fact: "An unopened purchase can be refunded within 7 days as store credit. An opened one goes to a reviewer. On-chain payments can't be reversed, so those refunds are store credit too." },
            { area: "Agents", fact: "An agent spends a balance inside the cap its owner set. Purchases above the approval threshold wait for the owner." },
            { area: "No custody", fact: "fn/7 is not a bank, a broker or a wallet. It never holds a buyer's or a creator's coins." },
          ]}
        />
      </Block>

      <Block id="keep" icon="coin" lead="Where the money goes" title={`${FACTS.creatorSharePct}%* to the creator, at every tier.`} raised>
        <Facts
          rows={PRICE_TIERS.filter((cents) => cents > 0).map((cents) => {
            const { creator, market, fund } = splitSale(cents);
            return {
              area: <PriceChip cents={cents} />,
              fact: (
                <span className="num">
                  Creator {dollars(creator)}. Market {dollars(market)}. Open-source fund {dollars(fund)}.
                </span>
              ),
            };
          })}
        />
        <ShareFootnote />
        <div className="linklist">
          <Button href={ROUTES.rank} variant="line" size="sm">
            How price tiers unlock
          </Button>
          <Button href={`${ROUTES.legal}/refunds`} variant="line" size="sm">
            Refund policy
          </Button>
        </div>
      </Block>
    </>
  );
}
