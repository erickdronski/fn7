import { CARD_MINIMUM_CENTS } from "./prices";

/**
 * The one place a fact about fn/7 is written down. Pages, structured data,
 * llms.txt and the FAQ all read from here, so a claim is worded once.
 */
export const FACTS = {
  name: "fn/7",
  said: "function seven",
  host: "fn7.ai",
  definition:
    "fn/7 is an open-source marketplace where people and AI agents discover reviewed digital releases and services from independent creators.",
  status: "fn/7 is built in the open. Explore creator booths and reviewed releases.",
  creatorSharePct: 90,
  platformPct: 9,
  fundPct: 1,
  cardMinimumCents: CARD_MINIMUM_CENTS,
  chains: ["Solana", "Base", "Ethereum"],
  coins: ["USDC", "SOL", "ETH"],
  license: "AGPL-3.0-or-later",
  categories: ["Agents", "Code", "Learn", "Templates", "Media", "Software", "Assets", "Data"],
} as const;

/** The spec sheet (platform design, 4.11). Plain technical facts, one row each. */
export const SPEC_SHEET: ReadonlyArray<{ area: string; fact: string }> = [
  { area: "Protocols", fact: "MCP over Streamable HTTP. REST with an OpenAPI 3.1 spec." },
  { area: "Agent sign-in", fact: "OAuth 2.1 with device flow, or an API key. Every key carries a spending cap." },
  { area: "Integrity", fact: "SHA-256 for every file. Ed25519-signed attestations in a public transparency log." },
  { area: "Review", fact: "A security scan, a prompt-injection scan and a quality review. Human review where risk is higher." },
  { area: "Payments", fact: "Cards through Stripe. USDC, SOL and ETH on-chain, split 90/10 in one transaction with no custody." },
  { area: "Prices", fact: "Twelve fixed tiers, from Free to $500. Rank unlocks the higher ones." },
  { area: "Package format", fact: "fn7.json, an open schema. Permissions are declared and checked." },
  { area: "License", fact: "AGPL-3.0-or-later. Brand and art are reserved." },
];
