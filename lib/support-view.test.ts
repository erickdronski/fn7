import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DonationWays } from "../components/story/donation-ways";
import { donationWays } from "./support";

const SOLANA = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU";

const render = (settings: Parameters<typeof donationWays>[0]) => renderToStaticMarkup(createElement(DonationWays, { ways: donationWays(settings) }));

describe("the donation list", () => {
  it("says 'Not open yet' for every way, with no link and no button, when nothing is set", () => {
    const html = render({});
    assert.equal(html.split("Not open yet").length - 1, 3);
    assert.ok(!html.includes("<a "), "no link");
    assert.ok(!html.includes("<button"), "no button");
  });

  it("prints a published address with a way to copy it", () => {
    const html = render({ solana: SOLANA });
    assert.ok(html.includes(SOLANA));
    assert.ok(html.includes("USDC or SOL on Solana"));
    assert.ok(html.includes("Copy address"));
    assert.equal(html.split("Not open yet").length - 1, 2);
  });

  it("links to the sponsor page only once it is set", () => {
    const html = render({ sponsors: "https://github.com/sponsors/erickdronski" });
    assert.ok(html.includes('href="https://github.com/sponsors/erickdronski"'));
    assert.equal(html.split("Not open yet").length - 1, 2);
  });

  it("never prints a value that failed its check", () => {
    const html = render({ solana: "0x" + "ab".repeat(32), sponsors: "https://evil.example/sponsors/x" });
    assert.ok(!html.includes("abab"));
    assert.ok(!html.includes("evil.example"));
    assert.equal(html.split("Not open yet").length - 1, 3);
  });
});
