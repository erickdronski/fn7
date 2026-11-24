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

export type Rail = "card" | "paypal" | "balance" | "usdc";

export function checkoutAllowed(rail: Rail, totalCents: number): boolean {
  if (totalCents < 100) return false;
  if (rail === "card") return totalCents >= CARD_MINIMUM_CENTS;
  if (rail === "paypal") return totalCents >= PAYPAL_MINIMUM_CENTS;
  return true;
}
