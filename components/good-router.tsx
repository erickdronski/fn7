"use client";

import { GoodDesk } from "@/components/good-desk";
import { useMarket } from "@/components/use-market";
import { goodBySlug, stallBySlug, type Good } from "@/lib/catalog";
import Link from "next/link";

export function GoodRouter({ slug }: { slug: string }) {
  const market = useMarket();
  const catalogued = goodBySlug(slug);
  const listed = market.listings.find((item) => item.slug === slug);
  const good: Good | undefined = catalogued ?? (listed
    ? {
        slug: listed.slug,
        title: listed.title,
        summary: listed.summary,
        sample: listed.sample,
        kind: listed.kind,
        priceCents: listed.priceCents as 100 | 300 | 500,
        stall: listed.stall,
      }
    : undefined);
  const stall = good ? stallBySlug(good.stall) : undefined;

  if (!good || !stall) {
    return (
      <main className="missing">
        <h1 className="pixel">That resource left</h1>
        <Link href="/">Back to the street</Link>
      </main>
    );
  }

  return (
    <>
      {listed && <p className="night-banner">{listed.status === "yard" ? "Yard. Unproven." : "On the Street."} {listed.gate}</p>}
      <GoodDesk good={good} stall={stall} />
    </>
  );
}
