import type { Accent, Layout } from "@/lib/catalog";
import type { Listing } from "@/lib/seed";
import { ListingCard, ListingRow } from "./listing-card";

type ShopProps = {
  /** The booth's listings, already in shop order. */
  listings: Listing[];
  accent: Accent;
  /** Slugs the booth features. */
  featured?: readonly string[];
};

const isFeatured = (props: ShopProps, listing: Listing) => Boolean(props.featured?.includes(listing.slug));

/** Shelf, the default: a grid of covers. */
export function ShelfLayout(props: ShopProps) {
  return (
    <ul className="lgrid">
      {props.listings.map((listing) => (
        <li key={listing.slug}>
          <ListingCard listing={listing} accent={props.accent} featured={isFeatured(props, listing)} />
        </li>
      ))}
    </ul>
  );
}

/** Showcase: one featured listing large, then the grid. */
export function ShowcaseLayout(props: ShopProps) {
  const [first, ...rest] = props.listings;
  if (!first) return null;
  return (
    <div className="showcase">
      <ListingCard listing={first} accent={props.accent} featured={isFeatured(props, first)} variant="feature" />
      <ShelfLayout {...props} listings={rest} />
    </div>
  );
}

/** List: dense rows with the version and the last update. */
export function ListLayout(props: ShopProps) {
  return (
    <ul className="lrows">
      {props.listings.map((listing) => (
        <li key={listing.slug}>
          <ListingRow listing={listing} accent={props.accent} featured={isFeatured(props, listing)} />
        </li>
      ))}
    </ul>
  );
}

/** Path: listings in a numbered order, with a line between them. */
export function PathLayout(props: ShopProps) {
  return (
    <ol className="lpath">
      {props.listings.map((listing, index) => (
        <li key={listing.slug}>
          <span className="lpath-n mono num" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <ListingRow listing={listing} accent={props.accent} featured={isFeatured(props, listing)} />
        </li>
      ))}
    </ol>
  );
}

const WALL_SHAPES = ["tall", "wide", "square", "wide", "square", "tall"] as const;

/** Gallery: a wall of images in mixed shapes. */
export function GalleryLayout(props: ShopProps) {
  return (
    <ul className="lwall">
      {props.listings.map((listing, index) => (
        <li key={listing.slug}>
          <ListingCard listing={listing} accent={props.accent} featured={isFeatured(props, listing)} variant="wall" shape={WALL_SHAPES[index % WALL_SHAPES.length]} />
        </li>
      ))}
    </ul>
  );
}

const SHOP_LAYOUTS: Record<Layout, (props: ShopProps) => React.ReactNode> = {
  shelf: ShelfLayout,
  showcase: ShowcaseLayout,
  list: ListLayout,
  path: PathLayout,
  gallery: GalleryLayout,
};

/** A booth's shop in the layout its creator chose. All five use the same card and row. */
export function ShopLayout({ layout, ...props }: ShopProps & { layout: Layout }) {
  const Chosen = SHOP_LAYOUTS[layout];
  return <Chosen {...props} />;
}
