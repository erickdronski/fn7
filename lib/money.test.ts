import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkoutAllowed, creatorCut, formatStamp } from "./prices";
import { multiplier, patchFor, pointsFor } from "./points";

describe("creator cut", () => {
  it("keeps 90% and floors", () => {
    assert.equal(creatorCut(100), 90);
    assert.equal(creatorCut(300), 270);
    assert.equal(creatorCut(500), 450);
  });
});

describe("stamps", () => {
  it("prints without cents", () => {
    assert.equal(formatStamp(100), "$1");
    assert.equal(formatStamp(300), "$3");
    assert.equal(formatStamp(500), "$5");
  });
});

describe("checkout rails", () => {
  it("refuses a card under $5", () => {
    assert.equal(checkoutAllowed("card", 100), false);
    assert.equal(checkoutAllowed("card", 300), false);
    assert.equal(checkoutAllowed("card", 500), true);
  });

  it("lets a balance buy a single dollar", () => {
    assert.equal(checkoutAllowed("balance", 100), true);
    assert.equal(checkoutAllowed("usdc", 100), true);
  });
});

describe("points", () => {
  it("multiplies by how many things share the crate", () => {
    assert.equal(multiplier(1), 1);
    assert.equal(multiplier(5), 3);
    assert.equal(pointsFor(500, 1), 5);
    assert.equal(pointsFor(500, 3), 10);
    assert.equal(pointsFor(500, 5), 15);
  });

  it("names the patch at the threshold, not one point early", () => {
    assert.equal(patchFor(29), "Walk-in");
    assert.equal(patchFor(30), "Regular");
    assert.equal(patchFor(150), "Hauler");
    assert.equal(patchFor(400), "Keyholder");
  });
});
