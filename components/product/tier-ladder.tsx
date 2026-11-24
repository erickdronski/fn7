"use client";

import { useId, useState, type CSSProperties } from "react";
import { PriceChip } from "@/components/ui/price-chip";
import { PRICE_TIERS, RANKS, RANK_LABEL, RANK_REQUIREMENT, tiersForRank } from "@/lib/tiers";

/**
 * Drag through the ranks and watch the price tiers unlock. This is the real
 * rule (lib/tiers.ts), not a picture of it.
 */
export function TierLadder() {
  const [index, setIndex] = useState(0);
  const id = useId();
  const rank = RANKS[index];
  const unlocked = new Set<number>(tiersForRank(rank));

  return (
    <div className="ladder">
      <div className="ladder-head">
        <label htmlFor={id} className="ladder-label">
          Rank
        </label>
        <output htmlFor={id} className="ladder-rank" key={rank}>
          {RANK_LABEL[rank]}
        </output>
      </div>
      <input
        id={id}
        className="ladder-range"
        type="range"
        min={0}
        max={RANKS.length - 1}
        step={1}
        value={index}
        onChange={(event) => setIndex(Number(event.target.value))}
        aria-valuetext={RANK_LABEL[rank]}
        style={{ "--fill": `${(index / (RANKS.length - 1)) * 100}%` } as CSSProperties}
      />
      <div className="ladder-ticks" aria-hidden="true">
        {RANKS.map((name, at) => (
          <button key={name} type="button" tabIndex={-1} className={at === index ? "is-on" : ""} onClick={() => setIndex(at)}>
            {RANK_LABEL[name]}
          </button>
        ))}
      </div>
      <p className="ladder-need">{RANK_REQUIREMENT[rank]}</p>
      <ul className="ladder-tiers" aria-label={`Price tiers unlocked at ${RANK_LABEL[rank]}`}>
        {PRICE_TIERS.map((cents, at) => (
          <li key={cents} className={unlocked.has(cents) ? "is-open" : "is-locked"} style={{ "--i": at } as CSSProperties}>
            <PriceChip cents={cents} />
            <span className="sr-only">{unlocked.has(cents) ? "unlocked" : "locked"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
