import { getBooth, type View } from "@/lib/catalog";
import type { Listing } from "@/lib/seed";
import { ListingCard, ListingRow } from "./listing-card";

/** The market's results, as a grid of cards or a list of dense rows. */
export function MarketResults({ listings, view }: { listings: Listing[]; view: View }) {
  const Item = view === "list" ? ListingRow : ListingCard;
  return (
    <ul className={view === "list" ? "lrows" : "lgrid"}>
      {listings.map((listing) => {
        const booth = getBooth(listing.booth);
        if (!booth) return null;
        return (
          <li key={listing.slug}>
            <Item listing={listing} accent={booth.accent} booth={booth} />
          </li>
        );
      })}
    </ul>
  );
}
