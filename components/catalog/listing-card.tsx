import Link from "next/link";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { PriceChip } from "@/components/ui/price-chip";
import { TYPE_LABEL, formatDay, type Accent } from "@/lib/catalog";
import type { Booth, Listing } from "@/lib/seed";
import { boothHref, listingHref } from "@/lib/site";
import { RankMark, WorksWith, categoryIcon } from "./marks";
import { GeneratedCover } from "./pixel-art";

type CardProps = {
  listing: Listing;
  /** The accent the cover is drawn in. */
  accent: Accent;
  /** Pass the booth to show who sells it. Left out inside a booth's own shop. */
  booth?: Booth;
  featured?: boolean;
  /** `feature` is the large card a showcase opens with. `wall` is the image-first card of a gallery. */
  variant?: "card" | "feature" | "wall";
  /** The cover's shape on a gallery wall. */
  shape?: "wide" | "square" | "tall";
};

/**
 * The listing card (catalog design, 7.1): cover, type mark, title, the booth
 * and its rank, the price, and at most two "works with" chips. The title is
 * the link, stretched over the whole card; the booth name is its own link.
 */
export function ListingCard({ listing, accent, booth, featured = false, variant = "card", shape = "wide" }: CardProps) {
  return (
    <article className={`tile lcard lcard-${variant}`}>
      <GeneratedCover slug={listing.slug} type={listing.type} accent={accent} className={variant === "wall" ? `cover-${shape}` : undefined} />
      <div className="lcard-body">
        <p className="lcard-type">
          <PixelIcon name={categoryIcon(listing.category)} size={14} />
          {TYPE_LABEL[listing.type]}
          {featured ? <span className="tag tag-on">Featured</span> : null}
        </p>
        <h3 className="lcard-title">
          <Link className="lcard-link" href={listingHref(listing.slug)}>
            {listing.title}
          </Link>
        </h3>
        {variant === "wall" ? null : <p className="lcard-sum">{listing.summary}</p>}
        {variant === "feature" ? <p className="lcard-more">{listing.description}</p> : null}
        {booth ? (
          <p className="lcard-by">
            <Link className="link lcard-booth" href={boothHref(booth.alias)}>
              {booth.name}
            </Link>
            <RankMark rank={booth.rank} />
          </p>
        ) : null}
        <div className="lcard-foot">
          <PriceChip cents={listing.priceCents} />
          <span className="tag">Sample</span>
          {variant === "wall" ? null : <WorksWith clients={listing.worksWith} limit={2} />}
        </div>
      </div>
    </article>
  );
}

/**
 * The dense row (catalog design, 7.1): the same listing for people who
 * compare, with its type, version and last update in columns.
 */
export function ListingRow({ listing, accent, booth, featured = false }: Omit<CardProps, "variant" | "shape">) {
  return (
    <article className="tile lrow">
      <GeneratedCover slug={listing.slug} type={listing.type} accent={accent} className="lrow-cover" />
      <div className="lrow-main">
        <h3 className="lrow-title">
          <Link className="lcard-link" href={listingHref(listing.slug)}>
            {listing.title}
          </Link>
          {featured ? <span className="tag tag-on">Featured</span> : null}
        </h3>
        <p className="lrow-sum">{listing.summary}</p>
      </div>
      <dl className="lrow-meta">
        <div className="lrow-type">
          <dt className="sr-only">Type</dt>
          <dd>{TYPE_LABEL[listing.type]}</dd>
        </div>
        {booth ? (
          <div className="lrow-booth">
            <dt className="sr-only">Booth</dt>
            <dd>
              <Link className="link lcard-booth" href={boothHref(booth.alias)}>
                {booth.name}
              </Link>
            </dd>
          </div>
        ) : null}
        <div className="lrow-version">
          <dt className="sr-only">Version</dt>
          <dd className="mono num">{listing.version}</dd>
        </div>
        <div className="lrow-date">
          <dt className="sr-only">Updated</dt>
          <dd className="num">{formatDay(listing.updated)}</dd>
        </div>
      </dl>
      <PriceChip cents={listing.priceCents} className="lrow-price" />
    </article>
  );
}
