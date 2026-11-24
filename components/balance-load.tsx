"use client";

import { LOAD_AMOUNTS_CENTS, formatStamp } from "@/lib/prices";
import { readMarket, writeMarket } from "@/lib/market";

export function BalanceLoad() {
  return (
    <div className="loads">
      <p>Load a balance. No card is charged in this preview.</p>
      <div className="load-row">
        {LOAD_AMOUNTS_CENTS.map((cents) => (
          <button
            key={cents}
            type="button"
            className="grab"
            onClick={() => {
              const market = readMarket();
              writeMarket({ ...market, balance: market.balance + cents });
            }}
          >
            Load {formatStamp(cents)}
          </button>
        ))}
      </div>
    </div>
  );
}
