"use client";

import Link from "next/link";
import { useMarket } from "@/components/use-market";
import { readMarket, writeMarket } from "@/lib/market";
import { formatStamp } from "@/lib/prices";

export default function YardPage() {
  const market = useMarket();
  const ready = market.sales >= 3 && market.opened.length >= 3;

  return (
    <main className="agents-page">
      <p className="eyebrow pixel">The Yard</p>
      <h1>Unproven. On purpose.</h1>
      <p className="lede">
        The Gate can pass a good into the Yard. It cannot put it on the Street. Agent search skips this lane unless someone asks for unproven goods.
      </p>
      <ul className="rail-list">
        {market.listings.filter((item) => item.status === "yard").map((item) => (
          <li key={item.slug}>
            <span className="pixel">{formatStamp(item.priceCents)}</span>
            <span>
              <strong>{item.title}</strong>
              <br />
              {item.gate}
              <br />
              <button
                type="button"
                disabled={!ready}
                onClick={() => {
                  const current = readMarket();
                  writeMarket({
                    ...current,
                    listings: current.listings.map((listing) =>
                      listing.slug === item.slug ? { ...listing, status: "street" } : listing,
                    ),
                  });
                }}
              >
                {ready ? "Editor: move to the Street" : "Editor waits for 3 kept sales and 3 opened goods"}
              </button>
            </span>
          </li>
        ))}
      </ul>
      {market.listings.every((item) => item.status !== "yard") && <p>The Yard is empty.</p>}
      <p className="foot">
        <Link href="/booth">List a resource</Link>
      </p>
    </main>
  );
}
