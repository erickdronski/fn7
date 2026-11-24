export type MilestoneState = "building" | "next" | "planned";

export type Milestone = { id: string; title: string; summary: string; state: MilestoneState };

/** The build order (catalog design, section 14). Update `state` as milestones land. */
export const MILESTONES: Milestone[] = [
  { id: "M0", title: "Foundation and landing page", summary: "Design tokens, motion, the pixel market, this site, and the open-source setup.", state: "building" },
  { id: "M1", title: "Accounts", summary: "Sign-in by email, passkey, Google, GitHub or wallet. Aliases and pixel avatars.", state: "next" },
  { id: "M2", title: "Catalog", summary: "Listings, booths with five layouts, the market, search and filters.", state: "planned" },
  { id: "M3", title: "Publishing and the Gate", summary: "The Console, the fn7.json package format, the scans, human review and signed attestations.", state: "planned" },
  { id: "M4", title: "Buying", summary: "Cart, checkout in test mode, the Library, players, license keys and signed receipts.", state: "planned" },
  { id: "M5", title: "Agents", summary: "The MCP server, the REST API, the fn7 CLI, spending caps and approvals.", state: "planned" },
  { id: "M6", title: "Status and play", summary: "Ranks, levels, badges, missions and the booth that grows with rank.", state: "planned" },
  { id: "M7", title: "Crypto", summary: "The on-chain 90/10 split on Solana and Base test networks.", state: "planned" },
  { id: "M8", title: "Payouts, fund and splits", summary: "Monthly payouts, the open-source fund ledger and co-creator splits.", state: "planned" },
  { id: "M9", title: "Follows, feed and passes", summary: "Following a booth, posts, members areas and prepaid passes.", state: "planned" },
  { id: "M10", title: "Git and the open catalog", summary: "Publishing from a git tag, and the signed public catalog anyone can mirror.", state: "planned" },
];

export const STATE_LABEL: Record<MilestoneState, string> = {
  building: "Building now",
  next: "Next",
  planned: "Planned",
};
