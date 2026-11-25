import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { boothHref, editionHref, marketOrigin, marketPageSize, publicAssetHref, publicListings, publicServices } from "@/lib/public-market";

export const metadata: Metadata = { title: "Marketplace", alternates: { canonical: marketOrigin + "/market" } };
type Params = Promise<Record<string, string | string[] | undefined>>;
async function Results({ params }: { params: Params }) {
  await connection();
  const { q, offset, view } = await params;
  const services = view === "services";
  const result = await (services ? publicServices({ q, offset }) : publicListings({ q, offset })).catch(() => null);
  const query = typeof q === "string" ? q : "";
  const pageHref = (next: number) => {
    const search = new URLSearchParams({ offset: String(next) });
    if (services) search.set("view", "services");
    if (query) search.set("q", query);
    return "/market?" + search;
  };
  return <>
    <nav className="linklist" aria-label="Marketplace catalog"><Link href="/market">Releases</Link><Link href="/market?view=services">Services</Link></nav>
    <form action="/market" method="get" role="search">
      {services && <input type="hidden" name="view" value="services" />}
      <label>Search {services ? "services" : "releases"} <input type="search" name="q" maxLength={160} defaultValue={query} /></label> <button type="submit">Search</button>
    </form>
    {!result ? <p role="status">The catalog is unavailable. Check the search address or try again later.</p> :
      result.items.length ? <ul>{result.items.map(item => {
        const booth = boothHref(item.handle)!;
        if ("description" in item) return <li key={item.id}><h2><a href={booth + "#services"}>{item.title}</a></h2><p>{item.description}</p><a href={booth}>@{item.handle}</a></li>;
        const cover = publicAssetHref(item.cover);
        return <li key={item.id}>{cover && <Image src={cover} alt="" width={160} height={100} unoptimized />}
          <h2><a href={editionHref(item.id)!}>{item.title}</a></h2><p>{item.summary}</p>
          <p>{item.price === 0 ? "Free" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price / 100)} · <a href={booth}>@{item.handle}</a></p>
        </li>;
      })}</ul> : <p>{query || offset ? "No results on this page." : "No published offerings yet."}</p>}
    {result && <nav className="linklist" aria-label="Catalog pages">
      {Number(offset) > 0 && <Link href={pageHref(Math.max(0, Number(offset) - marketPageSize))}>Previous page</Link>}
      {result.nextOffset !== null && <Link href={pageHref(result.nextOffset)}>Next page</Link>}
    </nav>}
  </>;
}
export default function MarketPage({ searchParams }: { searchParams: Params }) {
  return <section className="wrap section"><h1 className="display">Marketplace</h1>
    <p>Discover reviewed releases and services from independent creators.</p>
    <div className="linklist"><a href={marketOrigin + "/booths"}>Find creator booths</a><a href={marketOrigin + "/account/seller"}>Open your booth</a></div>
    <Suspense fallback={<p role="status">Loading listings…</p>}><Results params={searchParams} /></Suspense>
  </section>;
}
