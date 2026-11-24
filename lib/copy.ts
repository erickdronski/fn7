import { FACTS } from "./facts";
import { PRICE_TIERS, formatPrice, tiersForRank } from "./tiers";

/**
 * Shares and prices, worded once. Pages write these instead of typing a
 * number, so a figure on the site can't drift from the rule that sets it.
 */

/** "a, b and c". */
export function listOf(items: readonly string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const FN7_SHARE_PCT = FACTS.platformPct + FACTS.fundPct;

export const SHARE = {
  /** What the creator keeps: "90%". */
  creator: `${FACTS.creatorSharePct}%`,
  /** What fn/7 keeps, the market's part and the fund's together: "10%". */
  fn7: `${FN7_SHARE_PCT}%`,
  /** "90/10". */
  split: `${FACTS.creatorSharePct}/${FN7_SHARE_PCT}`,
} as const;

/** The tiers every new booth can use: "Free, $1, $3 and $5". */
export const STARTING_TIERS = listOf(tiersForRank("node").map(formatPrice));

/** The lowest price that isn't Free: "$1". */
export const LOWEST_PRICE = formatPrice(PRICE_TIERS[1]);

/** The highest tier: "$500". */
export const TOP_PRICE = formatPrice(PRICE_TIERS[PRICE_TIERS.length - 1]);
