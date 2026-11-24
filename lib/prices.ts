/** Money rules. Every amount is integer cents. */

export const CREATOR_SHARE_BPS = 9000;
export const CARD_MINIMUM_CENTS = 500;
export const PAYPAL_MINIMUM_CENTS = 500;
export const LOAD_AMOUNTS_CENTS = [1000, 2000, 4000, 10000] as const;
export const PAYOUT_MINIMUM_CENTS = 2000;

/** The creator's share of one line. Floored, so a leftover cent stays with fn/7. */
export function creatorCut(cents: number): number {
  return Math.floor((cents * CREATOR_SHARE_BPS) / 10000);
}

const FUND_SHARE_BPS = 100;

/**
 * Where every cent of one sale goes. The creator's share is fixed first, the
 * open-source fund's is floored, and whatever is left runs the market, so the
 * three parts always add up to the price.
 */
export function splitSale(cents: number): { creator: number; market: number; fund: number } {
  const creator = creatorCut(cents);
  const fund = Math.floor((cents * FUND_SHARE_BPS) / 10000);
  return { creator, market: cents - creator - fund, fund };
}

/** What a creator keeps from a number of sales at one price. Each sale is cut on its own. */
export function earnings(cents: number, sales: number): number {
  if (!Number.isInteger(sales) || sales < 0) throw new RangeError("Sales must be a whole number, zero or more.");
  return creatorCut(cents) * sales;
}

export type Rail = "card" | "paypal" | "balance" | "usdc";

export function checkoutAllowed(rail: Rail, totalCents: number): boolean {
  if (totalCents < 100) return false;
  if (rail === "card") return totalCents >= CARD_MINIMUM_CENTS;
  if (rail === "paypal") return totalCents >= PAYPAL_MINIMUM_CENTS;
  return true;
}
