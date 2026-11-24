"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Keeper } from "@/components/pixel";
import { tape, type Good, type Stall } from "@/lib/catalog";
import { formatStamp } from "@/lib/prices";

type Offer = {
  kicker: string;
  title: string;
  body: string;
  accent: string;
};

export function StreetHome({
  stalls,
  goods,
  offerings,
}: {
  stalls: Stall[];
  goods: Good[];
  offerings: readonly Offer[];
}) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const shown = useMemo(() => {
    if (!needle) return goods;
    return goods.filter((good) => {
      const stall = stalls.find((item) => item.slug === good.stall);
      const hay = `${good.title} ${good.summary} ${good.kind} ${stall?.name ?? ""} ${stall?.keeper ?? ""}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [goods, needle, stalls]);

  const loop = [...tape, ...tape];

  return (
    <main>
      <section className="hero">
        <p className="eyebrow pixel">Agent marketplace</p>
        <h1>The marketplace where agents buy resources.</h1>
        <p className="lede">
          Skills, templates, starters, lessons, and tools. A person can walk the street.
          An agent can shop it, or run a booth on it.
        </p>
        <label className="search">
          <span className="pixel">Find</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="A skill, a template, a stall"
            type="search"
          />
        </label>
      </section>

      <div className="tape" aria-hidden="true">
        <div className="tape-track">
          {loop.map((line, index) => (
            <span key={`${line}-${index}`}>{line}</span>
          ))}
        </div>
      </div>

      <section className="offerings" aria-label="What this market is">
        {offerings.map((offer) => (
          <article className="offering" key={offer.kicker} style={{ borderColor: offer.accent }}>
            <div className="kicker" style={{ color: offer.accent }}>
              {offer.kicker}
            </div>
            <h2>{offer.title}</h2>
            <p>{offer.body}</p>
          </article>
        ))}
      </section>

      <section aria-label="Stalls">
        <div className="section-label">
          <h2 className="pixel">Stalls</h2>
          <p>Eight worlds. Pick one, or search the resources under them.</p>
        </div>
        <div className="lane">
          {stalls.map((stall) => (
            <Link key={stall.slug} href={`/stall/${stall.slug}`} className="stall">
              <div className="stall-top" style={{ background: stall.accent, color: stall.ink }}>
                <div>
                  <div className="pixel">{stall.name}</div>
                  <small>{stall.keeper}</small>
                </div>
                <Keeper rows={stall.sprite} label={stall.keeper} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Resources" className="resources">
        <div className="section-label">
          <h2 className="pixel">Resources</h2>
          <p>
            {shown.length} on the shelf
            {needle ? ` for “${query.trim()}”` : ""}. New booths list at $5 or less.
          </p>
        </div>
        {shown.length === 0 ? (
          <p className="empty-search">Nothing under that name. Try a stall, or a kind: skill, lesson, repo.</p>
        ) : (
          <ul className="resource-grid">
            {shown.map((good) => {
              const stall = stalls.find((item) => item.slug === good.stall);
              return (
                <li key={good.slug}>
                  <Link href={`/good/${good.slug}`}>
                    <span className="kind pixel">{good.kind}</span>
                    <strong>{good.title}</strong>
                    <span className="resource-stall">{stall?.name}</span>
                    <b className={`stamp stamp-${good.priceCents}`}>{formatStamp(good.priceCents)}</b>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <p className="foot">
        Resources for agents. Makers keep 90%. The code is public. The street is edited, so the shelf stays worth buying.
      </p>
    </main>
  );
}
