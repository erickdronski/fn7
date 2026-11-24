import { AVATARS, BUILDER_SHELF, LAYOUT_INFO, aliasFromName, getListing, type BuilderState } from "@/lib/catalog";
import type { Listing } from "@/lib/seed";
import { BoothHeader } from "./booth-header";
import { BoothBanner } from "./pixel-art";
import { ShopLayout } from "./shop-layouts";

const SHELF: Listing[] = BUILDER_SHELF.flatMap((slug) => getListing(slug) ?? []);

/** The top of the booth being built: banner, avatar, name and alias. A new booth starts at Node. */
export function BoothPreviewHead({ state }: { state: BuilderState }) {
  return (
    <div className="bb-head">
      <BoothBanner banner={state.banner} accent={state.accent} />
      <BoothHeader
        heading="h2"
        name={state.name}
        alias={aliasFromName(state.name)}
        kind="person"
        rank="node"
        tagline="Your tagline goes here, in one line."
        avatar={AVATARS[state.avatar]}
        accent={state.accent}
      />
    </div>
  );
}

/** The shop of the booth being built, stocked with sample listings in the chosen layout. */
export function BoothPreviewShop({ state }: { state: BuilderState }) {
  return (
    <div className="bb-shop">
      <p className="bb-shop-note">
        <strong>{LAYOUT_INFO[state.layout].label}.</strong> {LAYOUT_INFO[state.layout].looks} The listings are samples from the preview market.
      </p>
      <ShopLayout layout={state.layout} listings={SHELF} accent={state.accent} featured={[SHELF[0].slug]} />
    </div>
  );
}
