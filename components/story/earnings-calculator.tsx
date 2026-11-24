"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { earnings, splitSale } from "@/lib/prices";
import { ROUTES } from "@/lib/site";
import { PRICE_TIERS, RANK_LABEL, formatPrice, rankForTier, tierTone } from "@/lib/tiers";

const PAID_TIERS = PRICE_TIERS.filter((cents) => cents > 0);
const SALES_STOPS = [1, 5, 10, 25, 50, 100, 250, 500, 1000] as const;
const MAX_COINS = 16;

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const count = new Intl.NumberFormat("en-US");

/** How tall the coin stack stands: one coin per third of a power of ten. */
function coinsFor(cents: number): number {
  const dollars = cents / 100;
  if (dollars < 1) return 1;
  return Math.min(MAX_COINS, 1 + Math.round(Math.log10(dollars) * 3));
}

/** Rolls a shown amount toward its target. Jumps straight there under reduced motion. */
function useRolled(target: number): number {
  const [shown, setShown] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    const start = from.current;
    if (start === target) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const began = performance.now();
    let frame = window.requestAnimationFrame(function tick(now: number) {
      const progress = still ? 1 : Math.min(1, (now - began) / 420);
      const value = Math.round(start + (target - start) * (1 - Math.pow(1 - progress, 4)));
      from.current = value;
      setShown(value);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [target]);

  return shown;
}

/**
 * Pick a price tier and a number of sales; see what the creator keeps. Every
 * figure comes from lib/prices.ts, so it is the same arithmetic checkout will
 * use. It is arithmetic, not a forecast, and it says so.
 */
export function EarningsCalculator() {
  const [tier, setTier] = useState<number>(2000);
  const [stop, setStop] = useState(5);
  const name = useId();
  const sales = SALES_STOPS[stop];

  const kept = earnings(tier, sales);
  const one = splitSale(tier);
  const paid = tier * sales;
  const rolled = useRolled(kept);
  const coins = coinsFor(kept);
  const rank = rankForTier(tier);

  return (
    <div className="calc">
      <div className="calc-controls">
        <fieldset className="calc-field">
          <legend>Price of one release</legend>
          <div className="calc-tiers">
            {PAID_TIERS.map((cents) => (
              <label key={cents} className={`calc-tier chip-${tierTone(cents)}`} data-on={cents === tier}>
                <input type="radio" className="sr-only" name={name} value={cents} checked={cents === tier} onChange={() => setTier(cents)} />
                <span className="mono">{formatPrice(cents)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="calc-field">
          <label htmlFor={`${name}-sales`}>
            Sales <span className="calc-value num">{count.format(sales)}</span>
          </label>
          <input
            id={`${name}-sales`}
            className="calc-range"
            type="range"
            min={0}
            max={SALES_STOPS.length - 1}
            step={1}
            value={stop}
            onChange={(event) => setStop(Number(event.target.value))}
            aria-valuetext={`${count.format(sales)} ${sales === 1 ? "sale" : "sales"}`}
          />
          <div className="calc-scale num" aria-hidden="true">
            <span>{SALES_STOPS[0]}</span>
            <span>{count.format(SALES_STOPS[SALES_STOPS.length - 1])}</span>
          </div>
        </div>

        <p className="calc-rank">
          A {formatPrice(tier)} release needs the <Link href={`${ROUTES.rank}#ladder`}>{RANK_LABEL[rank]} rank</Link>.
        </p>
      </div>

      <div className="calc-result">
        <div className="calc-keep">
          <p className="calc-keep-label">
            <PixelIcon name="coin" size={22} />
            You keep
          </p>
          <p className="calc-figure display num" aria-hidden="true">
            {money.format(rolled / 100)}
          </p>
          <output className="sr-only" htmlFor={`${name}-sales`} aria-live="polite">
            You keep {money.format(kept / 100)} from {count.format(sales)} {sales === 1 ? "sale" : "sales"} at {formatPrice(tier)}.
          </output>
          <dl className="calc-lines num">
            <div>
              <dt>Buyers pay</dt>
              <dd>{money.format(paid / 100)}</dd>
            </div>
            <div>
              <dt>Runs the market</dt>
              <dd>{money.format((one.market * sales) / 100)}</dd>
            </div>
            <div>
              <dt>Open-source fund</dt>
              <dd>{money.format((one.fund * sales) / 100)}</dd>
            </div>
          </dl>
        </div>
        <div className="calc-stack" aria-hidden="true">
          {Array.from({ length: coins }, (_, index) => (
            <span key={index} className="calc-coin" />
          ))}
        </div>
        <p className="calc-caveat">Arithmetic, not a forecast. What sells is up to buyers.</p>
      </div>
    </div>
  );
}
