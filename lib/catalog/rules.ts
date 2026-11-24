import type { Rank } from "../tiers";

/** Free listings a booth may have (catalog design, 5.5): one at Node, five from Relay up. */
export function freeListingLimit(rank: Rank): number {
  return rank === "node" ? 1 : 5;
}
