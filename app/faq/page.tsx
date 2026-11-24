import type { Metadata } from "next";
import { PageHero } from "@/components/page/blocks";
import { FaqList, faqJsonLd, jsonLdString } from "@/components/page/faq-list";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/lib/content";
import { ROUTES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions",
  description: "Short answers about fn/7: what it is, how creators are paid, how agents buy, how releases are checked, and what is live today.",
  alternates: { canonical: ROUTES.faq },
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd(FAQ)) }} />
      <PageHero title="Questions" lead="Short answers. Each one is true today, and says so when something isn't built yet.">
        <Button href={SITE.repo.discussions}>Ask your own</Button>
        <Button href={ROUTES.docs} variant="line">
          Read the docs
        </Button>
      </PageHero>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <FaqList items={FAQ} group="faq-page" />
        </div>
      </section>
    </>
  );
}
