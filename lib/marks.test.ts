import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { INSTALL_TOOLS } from "./install";
import { MARKS_ON_HOLD, canShowMark } from "./marks";

describe("third-party marks", () => {
  it("agrees with the rule recorded for every tool on the install page", () => {
    for (const tool of INSTALL_TOOLS) {
      if (!tool.brand) continue;
      assert.equal(canShowMark(tool.brand, false), tool.logo.show, `${tool.name}: ${tool.logo.rule}`);
    }
  });

  it("holds back a mark whose owner asks to be asked first", () => {
    for (const name of MARKS_ON_HOLD) assert.equal(canShowMark(name, false), false, name);
  });

  it("shows a mark whose owner allows it, and leaves the payment marks alone", () => {
    for (const name of ["cursor", "github", "visa", "stripe", "solana"]) assert.equal(canShowMark(name, false), true, name);
  });

  it("shows every mark once the maintainer turns the switch on", () => {
    for (const name of [...MARKS_ON_HOLD, "cursor", "visa"]) assert.equal(canShowMark(name, true), true, name);
  });
});
