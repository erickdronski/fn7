"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { basketSnapshot, dropSlug, subscribeBasket } from "@/lib/basket";
import { goodBySlug, stallBySlug } from "@/lib/catalog";
import { formatStamp } from "@/lib/prices";
import { multiplier, pointsFor } from "@/lib/points";

export function CrateView() {
  const raw = useSyncExternalStore(subscribeBasket, basketSnapshot, () => "[]");
  const lines = (JSON.parse(raw) as string[])
    .map((slug) => goodBySlug(slug))
    .filter((good) => good !== undefined);

  const total = lines.reduce((sum, good) => sum + good.priceCents, 0);
  const count = lines.length;
  const points = pointsFor(total, count);

  if (count === 0) {
    return (
      <section className="crate-empty">
        <h1 className="pixel">The crate is empty</h1>
        <p>The stalls are still up.</p>
        <Link href="/">Back to the street</Link>
      </section>
    );
  }

  return (
    <section className="crate-sheet">
      <h1 className="pixel">
        {count} {count === 1 ? "thing" : "things"}. {formatStamp(total)}.
      </h1>
      <p className="haul-math">
        {multiplier(count)}× · {points} {points === 1 ? "point" : "points"}
        {count < 5 ? ` · Add one for ${multiplier(count + 1)}×` : " · Full haul"}
      </p>
      <ul className="crate-list">
        {lines.map((good) => {
          const stall = stallBySlug(good.stall);
          return (
            <li key={good.slug}>
              <Link href={`/good/${good.slug}`}>{good.title}</Link>
              <span>{stall?.name}</span>
              <b className={`stamp stamp-${good.priceCents}`}>{formatStamp(good.priceCents)}</b>
              <button type="button" onClick={() => dropSlug(good.slug)}>
                Put back
              </button>
            </li>
          );
        })}
      </ul>
      <p className="pay-later">Paying comes later. The crate just counts the haul.</p>
    </section>
  );
}
