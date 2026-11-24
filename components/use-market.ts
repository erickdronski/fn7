"use client";

import { useSyncExternalStore } from "react";
import { emptyMarket, marketSnapshot, subscribeMarket, type Market } from "@/lib/market";

export function useMarket(): Market {
  const raw = useSyncExternalStore(subscribeMarket, marketSnapshot, () => JSON.stringify(emptyMarket()));
  return JSON.parse(raw) as Market;
}
