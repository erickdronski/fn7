"use client";

import Link from "next/link";
import { useState } from "react";
import { useSyncExternalStore } from "react";
import { BalanceLoad } from "@/components/balance-load";
import { useMarket } from "@/components/use-market";
import { basketSnapshot, dropSlug, subscribeBasket, writeBasket } from "@/lib/basket";
import { goodBySlug, stallBySlug } from "@/lib/catalog";
import { placeOrder, readMarket, writeMarket, type OrderLine } from "@/lib/market";
import { dollarNightLive, priceNow, subscribeClock } from "@/lib/night";
import { formatStamp } from "@/lib/prices";
import { multiplier, pointsFor } from "@/lib/points";

export function CrateView() {
  const raw = useSyncExternalStore(subscribeBasket, basketSnapshot, () => "[]");
  const market = useMarket();
  const nightLive = useSyncExternalStore(subscribeClock, () => (dollarNightLive() ? "yes" : "no"), () => "no");
  const night = nightLive === "yes" || market.peekNight;
  const [notice, setNotice] = useState("");
  const slugs = JSON.parse(raw) as string[];
  const lines = slugs
    .map((slug) => {
      const listed = market.listings.find((item) => item.slug === slug);
      const catalogued = goodBySlug(slug);
      const good = listed
        ? { slug: listed.slug, title: listed.title, stall: listed.stall, priceCents: listed.priceCents }
        : catalogued;
      return good;
    })
    .filter((good) => good !== undefined);

  const priced = lines.map((good) => ({ ...good, priceCents: priceNow(good, night) }));
  const total = priced.reduce((sum, good) => sum + good.priceCents, 0);
  const count = priced.length;

  if (count === 0 && !notice) {
    return (
      <section className="crate-empty">
        <h1 className="pixel">The crate is empty</h1>
        <p>The stalls are still up. Balance {formatStamp(market.balance)}.</p>
        <BalanceLoad />
        <Link href="/">Back to the street</Link>
      </section>
    );
  }

  function pay() {
    const orderLines: OrderLine[] = priced.map((good) => ({
      slug: good.slug,
      title: good.title,
      stall: good.stall,
      priceCents: good.priceCents,
      creatorCents: Math.floor(good.priceCents * 0.9),
    }));
    const result = placeOrder(readMarket(), orderLines);
    if (result.error || !result.order) {
      setNotice(result.error ?? "The haul did not go through.");
      return;
    }
    writeMarket(result.market);
    writeBasket([]);
    const n = result.order.lines.length;
    setNotice(`${n} ${n === 1 ? "thing" : "things"}. ${formatStamp(result.order.totalCents)}. ${result.order.multiplier}×. ${result.order.points} ${result.order.points === 1 ? "point" : "points"}.`);
  }

  return (
    <section className="crate-sheet">
      <h1 className="pixel">
        {count === 0 ? "Haul in" : `${count} ${count === 1 ? "thing" : "things"}. ${formatStamp(total)}.`}
      </h1>
      {count > 0 && (
        <p className="haul-math">
          {multiplier(count)}× · {pointsFor(total, count)} points · Balance {formatStamp(market.balance)}
          {count < 5 ? ` · Add one for ${multiplier(count + 1)}×` : " · Full haul"}
        </p>
      )}
      <ul className="crate-list">
        {priced.map((good) => {
          const stall = stallBySlug(good.stall);
          return (
            <li key={good.slug}>
              <Link href={`/good/${good.slug}`}>{good.title}</Link>
              <span>{stall?.name ?? "Booth"}</span>
              <b>{formatStamp(good.priceCents)}</b>
              <button
                type="button"
                onClick={() => {
                  dropSlug(good.slug);
                }}
              >
                Put back
              </button>
            </li>
          );
        })}
      </ul>
      {notice && <p className="sample">{notice}</p>}
      {count > 0 && (
        <button className="grab" type="button" onClick={pay}>
          Spend the balance
        </button>
      )}
      <BalanceLoad />
      <p className="pay-later">A card starts at $5. This preview spends a balance you load here. No card is charged.</p>
    </section>
  );
}
