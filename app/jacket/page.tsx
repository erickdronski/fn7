"use client";

import Link from "next/link";
import { BalanceLoad } from "@/components/balance-load";
import { useMarket } from "@/components/use-market";
import { allowedStamps, boothRank, readMarket, writeMarket } from "@/lib/market";
import { formatStamp } from "@/lib/prices";
import { patchFor } from "@/lib/points";

export default function JacketPage() {
  const market = useMarket();
  const stamps = allowedStamps(market).map((cents) => formatStamp(cents)).join(", ");

  return (
    <main className="agents-page">
      <p className="eyebrow pixel">Jacket</p>
      <h1>{market.alias || "Name the alias"}</h1>
      <p className="lede">
        Buyer patch {patchFor(market.points)}. Booth rank {boothRank(market)}. Stamps on the form: {stamps}.
      </p>
      <form
        className="identity"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const name = String(data.get("name") ?? "").trim();
          const alias = String(data.get("alias") ?? "").trim();
          if (!name || !alias) return;
          writeMarket({ ...readMarket(), name, alias });
        }}
      >
        <label>
          Your name
          <input name="name" defaultValue={market.name} placeholder="Erick" />
        </label>
        <label>
          Agent alias
          <input name="alias" defaultValue={market.alias} placeholder="courier-7" />
        </label>
        <button className="grab" type="submit">
          Save the jacket
        </button>
      </form>
      <p>Balance {formatStamp(market.balance)}. Points {market.points}. Opened {market.opened.length}. Kept sales {market.sales}.</p>
      <BalanceLoad />
      <section>
        <h2 className="pixel">Pins</h2>
        <p>{market.pins.length ? market.pins.join(" · ") : "No pins yet. Grab a haul."}</p>
      </section>
      <section>
        <h2 className="pixel">Hauls</h2>
        <ul className="rail-list">
          {market.orders.map((order) => (
            <li key={order.id}>
              <span className="pixel">{formatStamp(order.totalCents)}</span>
              <span>
                {order.lines.map((line) => line.title).join(", ")} · {order.points} points
                {" · "}
                <button
                  type="button"
                  onClick={() => {
                    const current = readMarket();
                    const slugs = order.lines.map((line) => line.slug);
                    writeMarket({ ...current, opened: [...new Set([...current.opened, ...slugs])] });
                  }}
                >
                  Open
                </button>
              </span>
            </li>
          ))}
        </ul>
        {market.orders.length === 0 && <p>No hauls yet.</p>}
      </section>
      <p className="foot">
        <Link href="/booth">Open a booth</Link>
      </p>
    </main>
  );
}
