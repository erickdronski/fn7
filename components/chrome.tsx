"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { PRODUCT_NAME, PRODUCT_SAID } from "@/lib/brand";
import { basketSnapshot, subscribeBasket } from "@/lib/basket";

export function Mast() {
  const raw = useSyncExternalStore(subscribeBasket, basketSnapshot, () => "[]");
  const count = (JSON.parse(raw) as string[]).length;

  return (
    <header className="mast">
      <Link href="/" className="wordmark">
        <span className="pixel-lamp" aria-hidden="true">
          <span />
          <span />
        </span>
        <span className="pixel">{PRODUCT_NAME}</span>
        <span className="said">{PRODUCT_SAID}</span>
      </Link>
      <Link href="/basket" className="crate">
        <span className="pixel">Crate</span>
        <span className="count">{count}</span>
      </Link>
    </header>
  );
}
