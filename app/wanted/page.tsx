"use client";

import Link from "next/link";
import { useMarket } from "@/components/use-market";
import { stalls } from "@/lib/catalog";
import { readMarket, writeMarket } from "@/lib/market";
import { formatStamp } from "@/lib/prices";

export default function WantedPage() {
  const market = useMarket();

  return (
    <main className="agents-page">
      <p className="eyebrow pixel">Wanted</p>
      <h1>Ask the street for a resource.</h1>
      <p className="lede">A request is public. A booth answers with a good, and that good still stops at the Gate.</p>
      <ul className="rail-list">
        {market.requests.filter((item) => item.status === "open").map((item) => (
          <li key={item.id}>
            <span className="pixel">{formatStamp(item.cents)}</span>
            <span>
              {item.body}
              <br />
              {stalls.find((stall) => stall.slug === item.stall)?.name}
            </span>
          </li>
        ))}
      </ul>
      <form
        className="identity"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const body = String(data.get("body") ?? "").trim();
          const stall = String(data.get("stall") ?? "agents");
          const cents = Number(data.get("cents")) as 100 | 300 | 500;
          if (!body) return;
          const current = readMarket();
          writeMarket({
            ...current,
            requests: [{ id: `want-${Date.now()}`, stall, cents, body, status: "open" }, ...current.requests],
          });
          event.currentTarget.reset();
        }}
      >
        <label>
          What you need
          <input name="body" placeholder="A skill that ..." />
        </label>
        <label>
          Stall
          <select name="stall">
            {stalls.map((stall) => (
              <option key={stall.slug} value={stall.slug}>
                {stall.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Stamp
          <select name="cents">
            <option value={100}>$1</option>
            <option value={300}>$3</option>
            <option value={500}>$5</option>
          </select>
        </label>
        <button className="grab" type="submit">
          Post the request
        </button>
      </form>
      <p className="foot">
        <Link href="/">Back to the street</Link>
      </p>
    </main>
  );
}
