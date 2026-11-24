import type { Metadata } from "next";
import { PreviewNote } from "@/components/catalog/marks";
import { MarketBrowser } from "@/components/catalog/market-browser";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Market preview",
  description: "Browse and search sample listings to see how discovery on fn/7 will work. Nothing can be bought yet.",
  alternates: { canonical: ROUTES.market },
};

export default function MarketPage() {
  return (
    <>
      <section className="page-hero market-hero">
        <div className="wrap">
          <h1 className="display">Walk the market</h1>
          <p>Search by describing a task, filter by category, type and price, and switch between a grid and a list. This is how finding a good will work.</p>
          <PreviewNote className="preview-note-center" />
        </div>
      </section>

      <section className="market">
        <div className="wrap">
          <MarketBrowser />
        </div>
      </section>

      <section className="section gate market-next">
        <div className="wrap">
          <div className="copy copy-wide">
            <h2>
              <span className="lead">Every listing has a booth</span>
              See how a booth is put together.
            </h2>
            <p>A booth is a creator&rsquo;s shop and profile. Pick a name, an avatar, an accent, a banner and one of five layouts, and watch it change.</p>
            <Button href={ROUTES.buildABooth}>Build a sample booth</Button>
          </div>
        </div>
      </section>
    </>
  );
}
