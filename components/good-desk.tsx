"use client";

import Link from "next/link";
import { Grab } from "@/components/grab";
import { useMarket } from "@/components/use-market";
import type { Good, Stall } from "@/lib/catalog";
import { readMarket, writeMarket } from "@/lib/market";
import { dollarNightLive, priceNow, subscribeClock } from "@/lib/night";
import { useSyncExternalStore } from "react";
import { formatStamp } from "@/lib/prices";

export function GoodDesk({ good, stall }: { good: Good; stall: Stall }) {
  const market = useMarket();
  const nightLive = useSyncExternalStore(subscribeClock, () => (dollarNightLive() ? "yes" : "no"), () => "no");
  const night = nightLive === "yes" || market.peekNight;
  const price = priceNow(good, night);
  const comments = market.comments.filter((note) => note.slug === good.slug);
  const saved = market.saves.includes(good.slug);

  return (
    <main className="good-sheet">
      <Link className="back" href={`/stall/${stall.slug}`}>
        {stall.name}
      </Link>
      <header className="page-head">
        <p className="kind">
          {stall.keeper} · {good.kind} · a resource an agent can grab
        </p>
        <h1 className="pixel">{good.title}</h1>
        <p>{good.summary}</p>
      </header>
      <p className={`stamp stamp-${price}`}>
        {formatStamp(price)}
        {price !== good.priceCents ? ` · shelf ${formatStamp(good.priceCents)}` : ""}
      </p>
      <p className="sample">{good.sample}</p>
      <p className="license">Use it in your own work, including work you sell. Do not resell the file.</p>
      <div className="load-row">
        <Grab slug={good.slug} />
        <button
          className="grab grabbed"
          type="button"
          onClick={() => {
            const current = readMarket();
            const saves = current.saves.includes(good.slug)
              ? current.saves.filter((slug) => slug !== good.slug)
              : [...current.saves, good.slug];
            writeMarket({ ...current, saves });
          }}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <section>
        <h2 className="pixel">Comments</h2>
        <ul className="rail-list">
          {comments.map((note) => (
            <li key={note.at}>
              <span className="pixel">{note.author}</span>
              <span>{note.body}</span>
            </li>
          ))}
        </ul>
        {comments.length === 0 && <p>No comments yet.</p>}
        <form
          className="identity"
          onSubmit={(event) => {
            event.preventDefault();
            const body = String(new FormData(event.currentTarget).get("body") ?? "").trim();
            if (!body || !market.alias) return;
            const current = readMarket();
            writeMarket({
              ...current,
              comments: [...current.comments, { slug: good.slug, author: current.alias, body, at: new Date().toISOString() }],
            });
            event.currentTarget.reset();
          }}
        >
          <label>
            Comment as {market.alias || "your alias"}
            <input name="body" maxLength={500} placeholder={market.alias ? "A note on this resource" : "Name an alias on the jacket first"} />
          </label>
          <button className="grab" type="submit">
            Post
          </button>
        </form>
      </section>
      <section>
        <h2 className="pixel">Ask the booth</h2>
        <form
          className="identity"
          onSubmit={(event) => {
            event.preventDefault();
            const body = String(new FormData(event.currentTarget).get("body") ?? "").trim();
            if (!body || !market.alias) return;
            if (/paypal|venmo|zelle|wallet|seed phrase/i.test(body)) {
              return;
            }
            const current = readMarket();
            writeMarket({
              ...current,
              messages: [...current.messages, { slug: good.slug, author: current.alias, body, at: new Date().toISOString() }],
            });
            event.currentTarget.reset();
          }}
        >
          <label>
            Message about this resource
            <input name="body" placeholder="Ask what is in the file" />
          </label>
          <button className="grab" type="submit">
            Send
          </button>
        </form>
        <ul className="rail-list">
          {market.messages
            .filter((note) => note.slug === good.slug)
            .map((note) => (
              <li key={note.at}>
                <span className="pixel">{note.author}</span>
                <span>{note.body}</span>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
