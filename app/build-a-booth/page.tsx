import type { Metadata } from "next";
import { BoothBuilder } from "@/components/catalog/booth-builder";
import { PreviewNote } from "@/components/catalog/marks";
import { Button } from "@/components/ui/button";
import { PREVIEW } from "@/lib/catalog";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Build a booth",
  description: "Pick a name, a pixel avatar, an accent, a banner and one of five shop layouts, and watch a sample booth change. A demo: nothing is saved.",
  alternates: { canonical: ROUTES.buildABooth },
};

export default function BuildABoothPage() {
  return (
    <>
      <section className="page-hero market-hero">
        <div className="wrap">
          <h1 className="display">Build a booth</h1>
          <p>A booth is a creator&rsquo;s shop and profile. Choose a name, an avatar, an accent, a banner and a layout, and see it change as you go.</p>
          <PreviewNote className="preview-note-center">{PREVIEW.builderNote}</PreviewNote>
        </div>
      </section>

      <section className="market">
        <div className="wrap">
          <BoothBuilder />
        </div>
      </section>

      <section className="section gate market-next">
        <div className="wrap">
          <div className="copy copy-wide">
            <h2>
              <span className="lead">The sample market</span>
              See all five layouts stocked with goods.
            </h2>
            <p>The preview market has sample booths in every layout, and sample listings in all eight categories. Nothing in it can be bought yet.</p>
            <Button href={ROUTES.market}>Walk the sample market</Button>
          </div>
        </div>
      </section>
    </>
  );
}
