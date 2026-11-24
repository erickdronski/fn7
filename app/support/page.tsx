import type { Metadata } from "next";
import { Suspense } from "react";
import { Block, PageHero, Points } from "@/components/page/blocks";
import { StarButton, StarButtonFallback } from "@/components/site/star-button";
import { DonationWays } from "@/components/story/donation-ways";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { Reveal } from "@/components/ui/reveal";
import { donationWays } from "@/lib/support";
import { ROUTES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Back the project",
  description: "Ways to support fn/7: star the repository, contribute, give feedback, and donate once the project's sponsor page and wallets are open.",
  alternates: { canonical: ROUTES.support },
};

/** Public values only, set by the maintainer at build time. See .env.example. */
const WAYS = donationWays({
  sponsors: process.env.NEXT_PUBLIC_DONATE_SPONSORS_URL,
  collective: process.env.NEXT_PUBLIC_DONATE_COLLECTIVE_URL,
  solana: process.env.NEXT_PUBLIC_DONATE_SOLANA,
  base: process.env.NEXT_PUBLIC_DONATE_BASE,
});

export default function SupportPage() {
  return (
    <>
      <PageHero
        title="Back the project"
        lead="fn/7 is open source and built in public. If you want it to exist, here is how to help. A donation is a gift to the project. It isn't an investment, and it buys no share of anything."
      >
        <Suspense fallback={<StarButtonFallback />}>
          <StarButton />
        </Suspense>
        <Button href={ROUTES.openSource} variant="line">
          See how to contribute
        </Button>
      </PageHero>

      <Block id="ways" icon="star" lead="Today" title="Three ways that cost nothing.">
        <ul className="backing">
          <li>
            <Reveal>
              <div className="back">
                <PixelIcon name="star" size={36} />
                <h3>Star the repository</h3>
                <p>The simplest signal that the work matters. It also helps other builders find it.</p>
                <Button href={SITE.repo.url} size="sm">
                  Open GitHub
                </Button>
              </div>
            </Reveal>
          </li>
          <li>
            <Reveal delay={70}>
              <div className="back">
                <PixelIcon name="chat" size={36} />
                <h3>Tell us what you think</h3>
                <p>What you would sell, what you would buy, and what would stop you. Feedback decides what gets built next.</p>
                <Button href={SITE.repo.feedback} variant="line" size="sm">
                  Share feedback
                </Button>
              </div>
            </Reveal>
          </li>
          <li>
            <Reveal delay={140}>
              <div className="back">
                <PixelIcon name="fork" size={36} />
                <h3>Send a pull request</h3>
                <p>Start with a good first issue. A merged pull request earns the Builder badge once accounts exist.</p>
                <Button href={SITE.repo.goodFirstIssues} variant="line" size="sm">
                  Good first issues
                </Button>
              </div>
            </Reveal>
          </li>
        </ul>
      </Block>

      <Block id="donate" icon="heart" lead="Donations" title="Give money, if you want to." intro="Each way opens when it is ready to receive a gift safely. Nothing here is live until it says so." raised>
        <DonationWays ways={WAYS} />
      </Block>

      <Block id="use" icon="coin" lead="Where it goes" title="What a donation pays for.">
        <Points
          items={[
            "Hosting, the database and the sandbox that checks uploaded files.",
            "The outside security test and the smart-contract audit that have to happen before real money moves.",
            "Legal review of the terms, the privacy policy and the takedown process.",
            "Original pixel art for the market.",
          ]}
        />
        <p className="fineprint">Separately, once the market is live, 1% of every sale goes to a public open-source fund with a published ledger. That fund pays for the tools the market stands on, not for fn/7 itself.</p>
      </Block>
    </>
  );
}
