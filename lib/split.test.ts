import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { FACTS } from "./facts";
import { creatorCut, earnings, splitSale } from "./prices";
import { PRICE_TIERS, rankForTier } from "./tiers";

describe("the split of one sale", () => {
  it("pays $45.00, $4.50 and $0.50 on a $50 sale", () => {
    assert.deepEqual(splitSale(5000), { creator: 4500, market: 450, fund: 50 });
  });

  it("pays 90 cents, 9 cents and 1 cent on a $1 sale", () => {
    assert.deepEqual(splitSale(100), { creator: 90, market: 9, fund: 1 });
  });

  it("adds up to the price at every tier and at awkward amounts", () => {
    for (const cents of [...PRICE_TIERS, 1, 7, 33, 199, 333, 49999]) {
      const parts = splitSale(cents);
      assert.equal(parts.creator + parts.market + parts.fund, cents, `${cents} cents`);
    }
  });

  it("never pays the creator less than the creator cut, whatever is left over", () => {
    for (const cents of [1, 7, 33, 199, 333, 49999]) {
      assert.equal(splitSale(cents).creator, creatorCut(cents));
      assert.ok(splitSale(cents).market >= 0 && splitSale(cents).fund >= 0);
    }
  });

  it("matches the shares the site states", () => {
    const parts = splitSale(10000);
    assert.deepEqual([parts.creator, parts.market, parts.fund], [FACTS.creatorSharePct * 100, FACTS.platformPct * 100, FACTS.fundPct * 100]);
  });
});

describe("earnings", () => {
  it("is the creator cut of one sale, times the number of sales", () => {
    assert.equal(earnings(2000, 40), 72000);
  });

  it("is nothing for a Free release, and nothing for no sales", () => {
    assert.equal(earnings(0, 500), 0);
    assert.equal(earnings(5000, 0), 0);
  });

  it("refuses a negative or fractional number of sales", () => {
    assert.throws(() => earnings(500, -1), /whole number/);
    assert.throws(() => earnings(500, 1.5), /whole number/);
  });
});

describe("the rank a price tier needs", () => {
  it("opens Free, $1, $3 and $5 to a new booth", () => {
    for (const cents of [0, 100, 300, 500]) assert.equal(rankForTier(cents), "node");
  });

  it("names the first rank that unlocks each higher tier", () => {
    assert.equal(rankForTier(1000), "hub");
    assert.equal(rankForTier(1500), "hub");
    assert.equal(rankForTier(2000), "core");
    assert.equal(rankForTier(3500), "nexus");
    assert.equal(rankForTier(5000), "nexus");
    assert.equal(rankForTier(10000), "mainframe");
    assert.equal(rankForTier(50000), "mainframe");
  });

  it("refuses a price that isn't a tier", () => {
    assert.throws(() => rankForTier(1234), /not a price tier/);
  });
});
