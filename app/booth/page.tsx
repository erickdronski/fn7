"use client";

import Link from "next/link";
import { useState } from "react";
import { useMarket } from "@/components/use-market";
import { stalls } from "@/lib/catalog";
import { allowedStamps, gateNote, readMarket, writeMarket } from "@/lib/market";
import { formatStamp } from "@/lib/prices";

export default function BoothPage() {
  const market = useMarket();
  const stamps = allowedStamps(market);
  const [note, setNote] = useState("");
  const yardCount = market.listings.filter((item) => item.status === "yard").length;

  return (
    <main className="agents-page">
      <p className="eyebrow pixel">Booth</p>
      <h1>List a resource</h1>
      <p className="lede">
        Rank {market.alias || "unnamed"}. The form only shows stamps you have earned. A new good stops at the Gate, then waits in the Yard.
      </p>
      <form
        className="identity"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const title = String(data.get("title") ?? "").trim();
          const sample = String(data.get("sample") ?? "").trim();
          const summary = String(data.get("summary") ?? "").trim();
          const stall = String(data.get("stall") ?? "agents");
          const kind = String(data.get("kind") ?? "skill") as "file" | "skill" | "repo" | "lesson" | "tool";
          const priceCents = Number(data.get("price"));
          if (!title || !summary || !sample) return;
          if (!market.alias) {
            setNote("Name an alias on the jacket before the booth can list.");
            return;
          }
          if (yardCount >= 1 && market.sales < 3) {
            setNote("A new booth lists one good at a time. Sell or wait.");
            return;
          }
          const verdict = gateNote(sample);
          if (!verdict.pass) {
            setNote(verdict.note);
            return;
          }
          const current = readMarket();
          writeMarket({
            ...current,
            listings: [
              {
                slug: `booth-${Date.now()}`,
                title,
                summary,
                sample,
                kind,
                stall,
                priceCents,
                status: "yard",
                gate: verdict.note,
              },
              ...current.listings,
            ],
          });
          setNote(verdict.note);
          event.currentTarget.reset();
        }}
      >
        <label>
          Title
          <input name="title" placeholder="Release notes from a diff" />
        </label>
        <label>
          What it is
          <input name="summary" placeholder="One sentence a buyer can use" />
        </label>
        <label>
          Sample of the work
          <textarea name="sample" rows={4} placeholder="Show a piece of the work, not a promise." />
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
          Kind
          <select name="kind">
            <option value="skill">skill</option>
            <option value="file">file</option>
            <option value="repo">repo</option>
            <option value="lesson">lesson</option>
            <option value="tool">tool</option>
          </select>
        </label>
        <label>
          Stamp
          <select name="price">
            {stamps.map((cents) => (
              <option key={cents} value={cents}>
                {formatStamp(cents)}
              </option>
            ))}
          </select>
        </label>
        <button className="grab" type="submit">
          Send to the Gate
        </button>
      </form>
      {note && <p className="sample">{note}</p>}
      <p className="foot">
        <Link href="/yard">See the Yard</Link>
      </p>
    </main>
  );
}
