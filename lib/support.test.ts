import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { baseAddress, collectiveUrl, donationWays, solanaAddress, sponsorsUrl } from "./support";

const SOLANA = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU";
const BASE = "0x52908400098527886E0F7030069857D2E4169EE7";

describe("donations", () => {
  it("shows every way as not open when nothing is set", () => {
    const ways = donationWays({});
    assert.equal(ways.length, 3);
    assert.ok(ways.every((way) => !way.open));
  });

  it("opens GitHub Sponsors only for a github.com/sponsors address", () => {
    assert.equal(sponsorsUrl("https://github.com/sponsors/erickdronski"), "https://github.com/sponsors/erickdronski");
    for (const bad of ["http://github.com/sponsors/x", "https://github.com/x", "https://evil.example/sponsors/x", "javascript:alert(1)", "https://github.com/sponsors/", " ", undefined]) {
      assert.equal(sponsorsUrl(bad), null, String(bad));
    }
  });

  it("opens Open Collective only for an opencollective.com address", () => {
    assert.equal(collectiveUrl("https://opencollective.com/fn7"), "https://opencollective.com/fn7");
    for (const bad of ["https://opencollective.com/", "https://opencollective.evil.example/fn7", "opencollective.com/fn7", undefined]) {
      assert.equal(collectiveUrl(bad), null, String(bad));
    }
  });

  it("publishes a Solana address only when it is base58 of the right length", () => {
    assert.equal(solanaAddress(SOLANA), SOLANA);
    assert.equal(solanaAddress(` ${SOLANA}\n`), SOLANA);
    for (const bad of ["", "0x52908400098527886E0F7030069857D2E4169EE7", "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAs0", "short", undefined]) {
      assert.equal(solanaAddress(bad), null, String(bad));
    }
  });

  it("publishes a Base address only when it is 0x and forty hex digits", () => {
    assert.equal(baseAddress(BASE), BASE);
    for (const bad of ["", "52908400098527886E0F7030069857D2E4169EE7", "0x5290840009852788", "0xZZ908400098527886E0F7030069857D2E4169EE7", undefined]) {
      assert.equal(baseAddress(bad), null, String(bad));
    }
  });

  it("refuses anything shaped like a private key", () => {
    const evmPrivateKey = "0x" + "ab".repeat(32);
    const solanaSecretKey = "5".repeat(88);
    const seedPhrase = "legal winner thank year wave sausage worth useful legal winner thank yellow";
    assert.equal(baseAddress(evmPrivateKey), null);
    assert.equal(solanaAddress(solanaSecretKey), null);
    assert.equal(solanaAddress(seedPhrase), null);
    assert.equal(baseAddress(seedPhrase), null);
  });

  it("opens the wallet way with only the chains that have a valid address", () => {
    const wallet = donationWays({ solana: SOLANA, base: "not an address" }).find((way) => way.kind === "address");
    assert.ok(wallet && wallet.kind === "address");
    assert.equal(wallet.open, true);
    assert.deepEqual(wallet.chains, [{ chain: "Solana", coins: "USDC or SOL", address: SOLANA }]);
  });

  it("opens a link way with its address", () => {
    const sponsors = donationWays({ sponsors: "https://github.com/sponsors/erickdronski" }).find((way) => way.kind === "link" && way.name === "GitHub Sponsors");
    assert.ok(sponsors && sponsors.kind === "link");
    assert.equal(sponsors.open, true);
    assert.equal(sponsors.href, "https://github.com/sponsors/erickdronski");
  });
});
