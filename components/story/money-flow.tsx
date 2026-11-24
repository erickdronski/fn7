"use client";

import { useEffect, useRef, useState } from "react";
import { splitSale } from "@/lib/prices";

const SALE_CENTS = 5000;
const COINS = 100;
const COIN_CENTS = SALE_CENTS / COINS;
const COIN_GAP_MS = 55;
const HOLD_MS = 2600;

const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

/**
 * One $50 sale, paid out coin by coin: 100 coins of 50 cents. Ninety land
 * with the creator, nine with the market and one with the open-source fund,
 * which is the real split (lib/prices.ts). Without JavaScript, or with
 * reduced motion, it shows the finished totals.
 */
export function MoneyFlow() {
  const split = splitSale(SALE_CENTS);
  const totals = [split.creator, split.market, split.fund];

  const root = useRef<HTMLDivElement>(null);
  const source = useRef<HTMLSpanElement>(null);
  const rows = useRef<Array<HTMLSpanElement | null>>([]);
  const [landed, setLanded] = useState<number[]>(totals);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let timer = 0;
    let sent = 0;
    const coins = new Set<HTMLElement>();

    // Which pot each of the 100 coins lands in: 90, 9 and 1, spread evenly.
    const potFor = (index: number) => (index === 49 ? 2 : index % 10 === 9 ? 1 : 0);

    const send = () => {
      if (!visible || document.hidden) return;
      if (sent === 0) setLanded([0, 0, 0]);
      const from = source.current?.getBoundingClientRect();
      const pot = potFor(sent);
      const to = rows.current[pot]?.getBoundingClientRect();
      const box = host.getBoundingClientRect();
      if (from && to) {
        const coin = document.createElement("span");
        coin.className = `flow-coin flow-coin-${pot}`;
        coin.textContent = "$";
        coin.style.left = `${from.left - box.left + from.width / 2 - 9}px`;
        coin.style.top = `${from.top - box.top + from.height / 2 - 9}px`;
        host.appendChild(coin);
        coins.add(coin);
        const dx = to.left - from.left - from.width / 2 - 14;
        const dy = to.top - from.top + to.height / 2 - from.height / 2;
        const lift = -18 - (sent % 5) * 6;
        const flight = coin.animate(
          [
            { transform: "translate(0, 0) scale(0.6)", opacity: 0 },
            { transform: `translate(${dx * 0.45}px, ${dy * 0.45 + lift}px) scale(1)`, opacity: 1, offset: 0.45 },
            { transform: `translate(${dx}px, ${dy}px) scale(0.7)`, opacity: 0.2 },
          ],
          { duration: 720, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
        );
        flight.onfinish = () => {
          coin.remove();
          coins.delete(coin);
          setLanded((was) => was.map((cents, at) => (at === pot ? Math.min(totals[at], cents + COIN_CENTS) : cents)));
        };
      }
      sent += 1;
      if (sent >= COINS) {
        sent = 0;
        timer = window.setTimeout(send, HOLD_MS);
      } else {
        timer = window.setTimeout(send, COIN_GAP_MS);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const was = visible;
        visible = entry.isIntersecting;
        if (visible && !was) timer = window.setTimeout(send, 400);
        if (!visible) window.clearTimeout(timer);
      },
      { threshold: 0.35 },
    );
    observer.observe(host);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      coins.forEach((coin) => coin.remove());
    };
    // The totals are constants derived from module-level values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labels = ["You keep", "Runs the market", "Open-source fund"];

  return (
    <div className="flow" ref={root}>
      <div className="flow-source">
        <span className="flow-pile mono num" ref={source}>
          {dollars(SALE_CENTS)}
        </span>
        <span className="flow-caption">One $50 sale, coin by coin</span>
      </div>
      <dl className="flow-pots">
        {labels.map((label, at) => (
          <div key={label} className={`flow-pot flow-pot-${at}`}>
            <dt>
              <span
                className="flow-dot"
                ref={(element) => {
                  rows.current[at] = element;
                }}
              />
              {label}
            </dt>
            <dd className="mono num">{dollars(landed[at])}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
