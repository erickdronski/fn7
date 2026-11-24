/** Price tiers and creator ranks. A price on fn/7 is always one of these tiers. */

export const PRICE_TIERS = [0, 100, 300, 500, 1000, 1500, 2000, 3500, 5000, 10000, 25000, 50000] as const;
export type PriceTier = (typeof PRICE_TIERS)[number];

export const RANKS = ["node", "relay", "hub", "core", "nexus", "mainframe"] as const;
export type Rank = (typeof RANKS)[number];

export const RANK_LABEL: Record<Rank, string> = {
  node: "Node",
  relay: "Relay",
  hub: "Hub",
  core: "Core",
  nexus: "Nexus",
  mainframe: "Mainframe",
};

/** The highest tier each rank may list at. Lower tiers stay unlocked. */
const RANK_CEILING: Record<Rank, PriceTier> = {
  node: 500,
  relay: 500,
  hub: 1500,
  core: 2000,
  nexus: 5000,
  mainframe: 50000,
};

/** What a creator must have done to hold each rank (platform design, 8.1). */
export const RANK_REQUIREMENT: Record<Rank, string> = {
  node: "Open a booth.",
  relay: "3 settled sales, and 3 goods bought and opened.",
  hub: "15 settled sales to 8 buyers, refunds under 10%, and 8 goods opened.",
  core: "40 settled sales to 20 buyers, and 15 goods opened.",
  nexus: "100 settled sales to 40 buyers, and 25 goods opened.",
  mainframe: "250 settled sales to 100 buyers, refunds under 5%, 50 goods opened, and a verified business or identity.",
};

export function tiersForRank(rank: Rank): PriceTier[] {
  return PRICE_TIERS.filter((cents) => cents <= RANK_CEILING[rank]);
}

/** The tiers a rank adds over the rank below it. */
export function newTiersAtRank(rank: Rank): PriceTier[] {
  const index = RANKS.indexOf(rank);
  if (index === 0) return tiersForRank(rank);
  const below = RANK_CEILING[RANKS[index - 1]];
  return PRICE_TIERS.filter((cents) => cents > below && cents <= RANK_CEILING[rank]);
}

/** The first rank that may list at a tier. */
export function rankForTier(cents: number): Rank {
  if (!isPriceTier(cents)) throw new RangeError(`${cents} cents is not a price tier.`);
  return RANKS.find((rank) => cents <= RANK_CEILING[rank]) ?? "mainframe";
}

export function isPriceTier(cents: number): cents is PriceTier {
  return (PRICE_TIERS as readonly number[]).includes(cents);
}

export function formatPrice(cents: number): string {
  return cents === 0 ? "Free" : "$" + cents / 100;
}

export type TierTone = "free" | "coral" | "mint" | "amber" | "cyan" | "violet" | "top";

/** The color family of a price chip (platform design, 4.3). */
export function tierTone(cents: number): TierTone {
  if (cents === 0) return "free";
  if (cents === 100) return "coral";
  if (cents === 300) return "mint";
  if (cents === 500) return "amber";
  if (cents <= 2000) return "cyan";
  if (cents <= 5000) return "violet";
  return "top";
}
