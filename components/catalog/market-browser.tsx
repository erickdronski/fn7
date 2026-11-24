"use client";

import { Suspense, useEffect, useId, useRef } from "react";
import { PixelIcon } from "@/components/ui/pixel-icon";
import {
  CATEGORIES,
  PRICE_BANDS,
  QUERY_MAX,
  SORT_LABEL,
  TYPE_LABEL,
  categoryOfType,
  filtersToQuery,
  isFiltered,
  listListings,
  parseFilters,
  priceBandLabel,
  typesIn,
  type Category,
  type Filters,
  type GoodType,
  type PriceBand,
  type Sort,
  type View,
} from "@/lib/catalog";
import { LISTINGS } from "@/lib/seed";
import { MarketResults } from "./market-results";
import { UrlWatcher, useUrlState } from "./use-url-state";

/**
 * Browse and search the sample listings. Every choice is written to the
 * page's query string, so a filtered view can be shared by its address.
 */
export function MarketBrowser() {
  const [filters, setFilters] = useUrlState<Filters>(parseFilters, filtersToQuery);
  const id = useId();
  const search = useRef<HTMLInputElement>(null);
  const view: View = filters.view ?? "grid";
  const query = filters.q ?? "";
  const results = listListings(filters);
  const types = typesIn(filters.category);
  const sorts: Sort[] = query ? ["match", "recent", "price-up", "price-down"] : ["recent", "price-up", "price-down"];
  const sort: Sort = filters.sort && sorts.includes(filters.sort) ? filters.sort : sorts[0];

  // The search box keeps its own text while someone types. When the address
  // changes from outside (a link, the back button), the box follows it.
  useEffect(() => {
    const input = search.current;
    if (input && document.activeElement !== input && input.value.trim() !== query) input.value = query;
  }, [query]);

  function update(change: Partial<Filters>) {
    const next: Filters = { ...filters, ...change };
    if (next.type && next.category && categoryOfType(next.type) !== next.category) delete next.type;
    setFilters(next);
  }

  function clear() {
    if (search.current) search.current.value = "";
    setFilters({ view: filters.view });
  }

  return (
    <div className="mb">
      <Suspense fallback={null}>
        <UrlWatcher />
      </Suspense>
      <form className="mb-controls" role="search" aria-label="Sample listings" onSubmit={(event) => event.preventDefault()}>
        <div className="field mb-search">
          <label htmlFor={`${id}-q`}>Search</label>
          <PixelIcon name="lens" size={18} className="mb-search-icon" />
          <input
            ref={search}
            id={`${id}-q`}
            name="q"
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            maxLength={QUERY_MAX}
            placeholder="Describe a task, or name a thing…"
            defaultValue={query}
            onChange={(event) => update({ q: event.target.value })}
          />
        </div>

        <div className="mb-cats" role="group" aria-label="Category">
          <button type="button" className="pick" aria-pressed={!filters.category} onClick={() => update({ category: undefined, type: undefined })}>
            All
          </button>
          {CATEGORIES.map((category: Category) => (
            <button
              key={category}
              type="button"
              className="pick"
              aria-pressed={filters.category === category}
              onClick={() => update(filters.category === category ? { category: undefined, type: undefined } : { category, type: undefined })}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-row">
          <div className="field">
            <label htmlFor={`${id}-type`}>Type</label>
            <select id={`${id}-type`} name="type" value={filters.type ?? ""} onChange={(event) => update({ type: (event.target.value || undefined) as GoodType | undefined })}>
              <option value="">Any type</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {TYPE_LABEL[type]}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor={`${id}-price`}>Price</label>
            <select id={`${id}-price`} name="price" value={filters.price ?? ""} onChange={(event) => update({ price: (event.target.value || undefined) as PriceBand | undefined })}>
              <option value="">Any price</option>
              {PRICE_BANDS.map((band) => (
                <option key={band} value={band}>
                  {priceBandLabel(band)}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor={`${id}-sort`}>Sort</label>
            <select id={`${id}-sort`} name="sort" value={sort} onChange={(event) => update({ sort: event.target.value as Sort })}>
              {sorts.map((option) => (
                <option key={option} value={option}>
                  {SORT_LABEL[option]}
                </option>
              ))}
            </select>
          </div>
          <div className="seg" role="group" aria-label="View" data-at={view === "list" ? 1 : 0}>
            <button type="button" aria-pressed={view === "grid"} onClick={() => update({ view: "grid" })}>
              <svg className="px" width="14" height="14" viewBox="0 0 7 7" aria-hidden="true" focusable="false">
                <path d="M0 0h3v3h-3zM4 0h3v3h-3zM0 4h3v3h-3zM4 4h3v3h-3z" fill="currentColor" />
              </svg>
              Grid
            </button>
            <button type="button" aria-pressed={view === "list"} onClick={() => update({ view: "list" })}>
              <svg className="px" width="14" height="14" viewBox="0 0 7 7" aria-hidden="true" focusable="false">
                <path d="M0 0h7v1h-7zM0 3h7v1h-7zM0 6h7v1h-7z" fill="currentColor" />
              </svg>
              List
            </button>
          </div>
        </div>
      </form>

      <div className="mb-head">
        <h2 className="mb-count num" aria-live="polite">
          {results.length === LISTINGS.length ? `${LISTINGS.length} sample listings` : `${results.length} of ${LISTINGS.length} sample listings`}
        </h2>
        {isFiltered(filters) ? (
          <button type="button" className="minibtn" onClick={clear}>
            Clear the filters
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <MarketResults listings={results} view={view} />
      ) : (
        <div className="mb-empty">
          <h3>No sample listing matches that.</h3>
          <p>Try fewer words or a different category. There are {LISTINGS.length} sample listings in all.</p>
          <button type="button" className="btn btn-line btn-sm" onClick={clear}>
            Show all {LISTINGS.length} listings
          </button>
        </div>
      )}
    </div>
  );
}
