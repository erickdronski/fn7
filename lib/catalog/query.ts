import { BOOTHS, LISTINGS, type Booth, type Listing } from "../seed";
import { formatPrice } from "../tiers";
import { CATEGORIES, CATEGORY_TYPES, TYPE_LABEL, categoryOfType, isCategory, isGoodType, type Category, type GoodType } from "./types";

/**
 * Queries over the catalog. Pure functions: each takes the list it reads
 * as its last argument and defaults to the sample data, so the pages and
 * the tests call the same code.
 */

export type PriceBand = "free" | "low" | "mid" | "high";

const BAND_RANGE: Record<PriceBand, [min: number, max: number]> = {
  free: [0, 0],
  low: [100, 500],
  mid: [1000, 2000],
  high: [3500, Number.POSITIVE_INFINITY],
};

export const PRICE_BANDS = Object.keys(BAND_RANGE) as PriceBand[];

export function priceBandOf(cents: number): PriceBand {
  return PRICE_BANDS.find((band) => cents >= BAND_RANGE[band][0] && cents <= BAND_RANGE[band][1]) ?? "high";
}

export function priceBandLabel(band: PriceBand): string {
  const [min, max] = BAND_RANGE[band];
  if (min === max) return formatPrice(min);
  return Number.isFinite(max) ? `${formatPrice(min)} to ${formatPrice(max)}` : `${formatPrice(min)} and up`;
}

export const SORTS = ["match", "recent", "price-up", "price-down"] as const;
export type Sort = (typeof SORTS)[number];

export const SORT_LABEL: Record<Sort, string> = {
  match: "Best match",
  recent: "Recently updated",
  "price-up": "Price, low to high",
  "price-down": "Price, high to low",
};

export const VIEWS = ["grid", "list"] as const;
export type View = (typeof VIEWS)[number];

export type Filters = {
  q?: string;
  category?: Category;
  type?: GoodType;
  price?: PriceBand;
  booth?: string;
  sort?: Sort;
  view?: View;
};

export function getListing(slug: string, listings: readonly Listing[] = LISTINGS): Listing | undefined {
  return listings.find((listing) => listing.slug === slug);
}

export function getBooth(alias: string, booths: readonly Booth[] = BOOTHS): Booth | undefined {
  const wanted = alias.replace(/^@/, "").toLowerCase();
  return booths.find((booth) => booth.alias === wanted);
}

/** A booth's listings, in the order the booth arranged them. */
export function listingsForBooth(alias: string, listings: readonly Listing[] = LISTINGS): Listing[] {
  return listings.filter((listing) => listing.booth === alias);
}

/**
 * The order a booth's shop shows its listings: featured ones first. A path
 * keeps the creator's own order, because there the order is the point.
 */
export function shopOrder(booth: Booth, listings: readonly Listing[] = LISTINGS): Listing[] {
  const own = listingsForBooth(booth.alias, listings);
  if (booth.layout === "path") return own;
  const featured = booth.featured.flatMap((slug) => own.filter((listing) => listing.slug === slug));
  return [...featured, ...own.filter((listing) => !booth.featured.includes(listing.slug))];
}

function byRecent(a: Listing, b: Listing): number {
  return a.updated < b.updated ? 1 : a.updated > b.updated ? -1 : 0;
}

export function searchWords(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/**
 * Search by words across the title, summary, type and category. Every word
 * has to match somewhere. A match in the title counts most, so it ranks first.
 */
export function searchListings(query: string, listings: readonly Listing[] = LISTINGS): Listing[] {
  const words = searchWords(query);
  if (words.length === 0) return [...listings];
  const scored: Array<{ listing: Listing; score: number }> = [];
  for (const listing of listings) {
    const fields: Array<[text: string, weight: number]> = [
      [listing.title.toLowerCase(), 8],
      [`${TYPE_LABEL[listing.type]} ${listing.type}`.toLowerCase(), 4],
      [listing.category.toLowerCase(), 3],
      [listing.summary.toLowerCase(), 1],
    ];
    let score = 0;
    let matchedAll = true;
    for (const word of words) {
      const best = Math.max(0, ...fields.filter(([text]) => text.includes(word)).map(([, weight]) => weight));
      if (best === 0) {
        matchedAll = false;
        break;
      }
      score += best;
    }
    if (matchedAll) scored.push({ listing, score });
  }
  return scored.sort((a, b) => b.score - a.score || byRecent(a.listing, b.listing)).map((entry) => entry.listing);
}

/** Listings that pass every filter that is set, in the chosen order. Never changes the list it was given. */
export function listListings(filters: Filters = {}, listings: readonly Listing[] = LISTINGS): Listing[] {
  const searching = searchWords(filters.q ?? "").length > 0;
  const found = searching ? searchListings(filters.q ?? "", listings) : [...listings].sort(byRecent);
  const kept = found.filter(
    (listing) =>
      (!filters.category || listing.category === filters.category) &&
      (!filters.type || listing.type === filters.type) &&
      (!filters.price || priceBandOf(listing.priceCents) === filters.price) &&
      (!filters.booth || listing.booth === filters.booth),
  );
  const sort = filters.sort ?? "match";
  if (sort === "recent") return kept.sort(byRecent);
  if (sort === "price-up") return kept.sort((a, b) => a.priceCents - b.priceCents || byRecent(a, b));
  if (sort === "price-down") return kept.sort((a, b) => b.priceCents - a.priceCents || byRecent(a, b));
  return kept;
}

/** The types on offer, in the catalog's own order, optionally inside one category. */
export function typesIn(category?: Category, listings: readonly Listing[] = LISTINGS): GoodType[] {
  const present = new Set(listings.map((listing) => listing.type));
  const order: readonly GoodType[] = category ? CATEGORY_TYPES[category] : CATEGORIES.flatMap((name) => CATEGORY_TYPES[name] as readonly GoodType[]);
  return order.filter((type) => present.has(type));
}

type Params = { get(name: string): string | null };

function oneOf<T extends string>(value: string | null, allowed: readonly T[]): T | undefined {
  return value !== null && (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

export const QUERY_MAX = 80;

/** Reads filters from a query string. Anything it doesn't recognize is dropped. */
export function parseFilters(params: Params): Filters {
  const filters: Filters = {};
  const q = (params.get("q") ?? "").replace(/\s+/g, " ").trim().slice(0, QUERY_MAX);
  if (q) filters.q = q;
  const category = params.get("category");
  if (category !== null && isCategory(category)) filters.category = category;
  const type = params.get("type");
  if (type !== null && isGoodType(type) && (!filters.category || categoryOfType(type) === filters.category)) filters.type = type;
  const price = oneOf(params.get("price"), PRICE_BANDS);
  if (price) filters.price = price;
  const booth = params.get("booth");
  if (booth !== null && /^[a-z0-9]{3,24}$/.test(booth)) filters.booth = booth;
  const sort = oneOf(params.get("sort"), SORTS);
  if (sort) filters.sort = sort;
  const view = oneOf(params.get("view"), VIEWS);
  if (view) filters.view = view;
  return filters;
}

/** The query string for a set of filters. Defaults are left out, so a plain market has a plain address. */
export function filtersToQuery(filters: Filters): string {
  const params = new URLSearchParams();
  const q = (filters.q ?? "").replace(/\s+/g, " ").trim();
  if (q) params.set("q", q);
  if (filters.category) params.set("category", filters.category);
  if (filters.type) params.set("type", filters.type);
  if (filters.price) params.set("price", filters.price);
  if (filters.booth) params.set("booth", filters.booth);
  const sortIsDefault = !filters.sort || filters.sort === "match" || (filters.sort === "recent" && !q);
  if (filters.sort && !sortIsDefault) params.set("sort", filters.sort);
  if (filters.view && filters.view !== "grid") params.set("view", filters.view);
  return params.toString();
}

/** True when anything narrows the list (the view and the sort don't). */
export function isFiltered(filters: Filters): boolean {
  return Boolean(filters.q || filters.category || filters.type || filters.price || filters.booth);
}
