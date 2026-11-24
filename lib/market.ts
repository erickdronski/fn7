import { creatorCut } from "./prices";
import { pointsFor } from "./points";

export const MARKET_KEY = "fn7-market";
export const MARKET_EVENT = "fn7-market";

export type OrderLine = {
  slug: string;
  title: string;
  stall: string;
  priceCents: number;
  creatorCents: number;
};

export type Order = {
  id: string;
  lines: OrderLine[];
  totalCents: number;
  points: number;
  multiplier: number;
  at: string;
};

export type Note = { slug: string; author: string; body: string; at: string };

export type Wanted = {
  id: string;
  stall: string;
  cents: 100 | 300 | 500;
  body: string;
  status: "open" | "filled";
};

export type BoothGood = {
  slug: string;
  title: string;
  summary: string;
  sample: string;
  kind: "file" | "skill" | "repo" | "lesson" | "tool";
  stall: string;
  priceCents: number;
  status: "yard" | "street";
  gate: string;
};

export type Market = {
  name: string;
  alias: string;
  balance: number;
  points: number;
  opened: string[];
  sales: number;
  buyers: number;
  pins: string[];
  orders: Order[];
  saves: string[];
  comments: Note[];
  messages: Note[];
  requests: Wanted[];
  listings: BoothGood[];
  peekNight: boolean;
};

export const emptyMarket = (): Market => ({
  name: "",
  alias: "",
  balance: 0,
  points: 0,
  opened: [],
  sales: 0,
  buyers: 0,
  pins: [],
  orders: [],
  saves: [],
  comments: [],
  messages: [],
  requests: [
    {
      id: "wanted-release",
      stall: "agents",
      cents: 300,
      body: "A skill that writes release notes from a diff, eight lines, no file paths.",
      status: "open",
    },
  ],
  listings: [],
  peekNight: false,
});

export function readMarket(): Market {
  if (typeof window === "undefined") return emptyMarket();
  try {
    const raw = window.localStorage.getItem(MARKET_KEY);
    if (!raw) return emptyMarket();
    return { ...emptyMarket(), ...JSON.parse(raw) };
  } catch {
    return emptyMarket();
  }
}

export function writeMarket(next: Market) {
  window.localStorage.setItem(MARKET_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(MARKET_EVENT));
}

export function marketSnapshot(): string {
  return JSON.stringify(readMarket());
}

export function subscribeMarket(onStoreChange: () => void) {
  window.addEventListener(MARKET_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(MARKET_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function allowedStamps(market: Market): number[] {
  const base = [100, 300, 500];
  const opened = market.opened.length;
  if (market.sales >= 100 && market.buyers >= 40 && opened >= 25) {
    return [...base, 1000, 1500, 2000, 3500, 5000];
  }
  if (market.sales >= 40 && market.buyers >= 20 && opened >= 15) {
    return [...base, 1000, 1500, 2000];
  }
  if (market.sales >= 15 && market.buyers >= 8 && opened >= 8) {
    return [...base, 1000, 1500];
  }
  return base;
}

export function boothRank(market: Market): string {
  const opened = market.opened.length;
  if (market.sales >= 100 && market.buyers >= 40 && opened >= 25) return "Channel";
  if (market.sales >= 40 && market.buyers >= 20 && opened >= 15) return "Keyholder";
  if (market.sales >= 15 && market.buyers >= 8 && opened >= 8) return "Hauler";
  if (market.sales >= 3 && opened >= 3) return "Regular";
  return "Walk-in";
}

export function gateNote(sample: string): { pass: boolean; note: string } {
  if (sample.trim().length < 40) {
    return {
      pass: false,
      note: "The Lamp held this. The sample is too thin to judge. Show a piece of the work.",
    };
  }
  return {
    pass: true,
    note: "The Scale passed the sample. The Lock found no secrets. The Clerk put it in the Yard, unproven. The Street still needs a person.",
  };
}

export function placeOrder(
  market: Market,
  lines: OrderLine[],
): { market: Market; error?: string; order?: Order } {
  const total = lines.reduce((sum, line) => sum + line.priceCents, 0);
  if (lines.length === 0) return { market, error: "The crate is empty." };
  if (market.balance < total) {
    return { market, error: `The balance needs $${(total - market.balance) / 100} more.` };
  }
  const order: Order = {
    id: `haul-${Date.now()}`,
    lines,
    totalCents: total,
    points: pointsFor(total, lines.length),
    multiplier: lines.length >= 5 ? 3 : lines.length === 4 ? 2.5 : lines.length === 3 ? 2 : lines.length === 2 ? 1.5 : 1,
    at: new Date().toISOString(),
  };
  const pins = new Set(market.pins);
  if (market.orders.length === 0) pins.add("first_grab");
  if (lines.length >= 5) pins.add("full_basket");
  if (lines.every((line) => line.priceCents === 100)) pins.add("bin_diver");
  if (lines.some((line) => line.priceCents === 100 && NIGHT_PRICE_SLUGS.has(line.slug))) pins.add("dollar_night");
  const own = new Set(market.listings.map((item) => item.slug));
  return {
    market: {
      ...market,
      balance: market.balance - total,
      points: market.points + order.points,
      orders: [order, ...market.orders],
      pins: [...pins],
      buyers: market.buyers,
      sales: market.sales + lines.filter((line) => own.has(line.slug)).length,
    },
    order,
  };
}

const NIGHT_PRICE_SLUGS = new Set(["week-stamp", "bin-prompt", "dollar-label", "alias-card"]);

export function creatorShare(cents: number): number {
  return creatorCut(cents);
}
