import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { FACTS } from "./facts";
import { levelFor, multiplier, pointsFor } from "./points";
import { CREATOR_SHARE_BPS, LOAD_AMOUNTS_CENTS, checkoutAllowed, creatorCut } from "./prices";
import { parseRepoStats } from "./repo-stats";
import { PRICE_TIERS, RANKS, formatPrice, isPriceTier, tiersForRank } from "./tiers";

describe("price tiers", () => {
  it("starts every creator at Free, $1, $3 and $5", () => {
    assert.deepEqual(tiersForRank("node"), [0, 100, 300, 500]);
    assert.deepEqual(tiersForRank("relay"), [0, 100, 300, 500]);
  });

  it("unlocks higher tiers rank by rank, keeping the lower ones", () => {
    assert.deepEqual(tiersForRank("hub"), [0, 100, 300, 500, 1000, 1500]);
    assert.deepEqual(tiersForRank("core"), [0, 100, 300, 500, 1000, 1500, 2000]);
    assert.deepEqual(tiersForRank("nexus"), [0, 100, 300, 500, 1000, 1500, 2000, 3500, 5000]);
  });

  it("gives Mainframe every tier, up to $500", () => {
    assert.deepEqual(tiersForRank("mainframe"), [...PRICE_TIERS]);
    assert.equal(PRICE_TIERS.at(-1), 50000);
    assert.equal(RANKS.length, 6);
  });

  it("refuses a price that isn't a tier", () => {
    assert.equal(isPriceTier(400), false);
    assert.equal(isPriceTier(99), false);
    assert.equal(isPriceTier(1500), true);
    assert.equal(isPriceTier(0), true);
  });

  it("prints prices without cents, and Free as a word", () => {
    assert.equal(formatPrice(0), "Free");
    assert.equal(formatPrice(500), "$5");
    assert.equal(formatPrice(25000), "$250");
  });
});

describe("creator cut", () => {
  it("keeps 90% at every tier", () => {
    assert.equal(creatorCut(100), 90);
    assert.equal(creatorCut(500), 450);
    assert.equal(creatorCut(50000), 45000);
  });

  it("floors, so a leftover cent stays with fn/7", () => {
    assert.equal(creatorCut(333), 299);
  });
});

describe("checkout rails", () => {
  it("refuses a card under $5", () => {
    assert.equal(checkoutAllowed("card", 300), false);
    assert.equal(checkoutAllowed("card", 500), true);
  });

  it("lets a balance or USDC buy a single dollar", () => {
    assert.equal(checkoutAllowed("balance", 100), true);
    assert.equal(checkoutAllowed("usdc", 100), true);
  });

  it("offers loads of $10, $20, $40 and $100", () => {
    assert.deepEqual([...LOAD_AMOUNTS_CENTS], [1000, 2000, 4000, 10000]);
  });
});

describe("points", () => {
  it("multiplies by how many things share the cart", () => {
    assert.equal(multiplier(1), 1);
    assert.equal(multiplier(5), 3);
    assert.equal(pointsFor([500]), 5);
    assert.equal(pointsFor([300, 100, 100]), 10);
    assert.equal(pointsFor([100, 100, 100, 100, 100]), 15);
  });

  it("caps a single line at 25 points before the multiplier", () => {
    assert.equal(pointsFor([50000]), 25);
    assert.equal(pointsFor([50000, 100]), 39);
  });

  it("gives nothing for an empty cart", () => {
    assert.equal(pointsFor([]), 0);
  });

  it("names the level at the threshold, not one point early", () => {
    assert.equal(levelFor(29), 1);
    assert.equal(levelFor(30), 2);
    assert.equal(levelFor(150), 3);
    assert.equal(levelFor(400), 4);
    assert.equal(levelFor(1000), 5);
    assert.equal(levelFor(2500), 6);
  });
});

describe("facts", () => {
  it("splits every sale into exactly 100%", () => {
    assert.equal(FACTS.creatorSharePct + FACTS.platformPct + FACTS.fundPct, 100);
  });

  it("states the same creator share the money code uses", () => {
    assert.equal(FACTS.creatorSharePct * 100, CREATOR_SHARE_BPS);
  });
});

describe("repo stats", () => {
  it("reads the three counts from GitHub's response", () => {
    assert.deepEqual(parseRepoStats({ stargazers_count: 12, forks_count: 3, open_issues_count: 4 }), {
      stars: 12,
      forks: 3,
      openIssues: 4,
    });
  });

  it("shows no number when a count is missing or isn't a number", () => {
    const none = { stars: null, forks: null, openIssues: null };
    assert.deepEqual(parseRepoStats({}), none);
    assert.deepEqual(parseRepoStats(null), none);
    assert.deepEqual(parseRepoStats({ stargazers_count: "x", forks_count: -1, open_issues_count: 1.5 }), none);
  });
});
