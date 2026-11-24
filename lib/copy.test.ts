import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { LOWEST_PRICE, SHARE, STARTING_TIERS, TOP_PRICE, listOf } from "./copy";
import { FACTS } from "./facts";

describe("numbers in words", () => {
  it("joins a list the way the site writes one", () => {
    assert.equal(listOf([]), "");
    assert.equal(listOf(["a"]), "a");
    assert.equal(listOf(["a", "b"]), "a and b");
    assert.equal(listOf(["a", "b", "c"]), "a, b and c");
  });

  it("words the shares from the facts", () => {
    assert.equal(SHARE.creator, "90%");
    assert.equal(SHARE.fn7, "10%");
    assert.equal(SHARE.split, "90/10");
    assert.equal(FACTS.creatorSharePct + FACTS.platformPct + FACTS.fundPct, 100);
  });

  it("words the prices from the tiers", () => {
    assert.equal(STARTING_TIERS, "Free, $1, $3 and $5");
    assert.equal(LOWEST_PRICE, "$1");
    assert.equal(TOP_PRICE, "$500");
  });
});

/** Every .tsx file under a folder. */
function pages(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return pages(path);
    return path.endsWith(".tsx") ? [path] : [];
  });
}

/** The same text with comments blanked, so a comment may still say "90%". */
function withoutComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

describe("the Facts rule", () => {
  it("no page or component types a share of a sale", () => {
    const typed = /(?<![-\d.])\b(90|10)%|\b90\/10\b/;
    const offenders = [...pages(join(process.cwd(), "app")), ...pages(join(process.cwd(), "components"))].filter((path) => typed.test(withoutComments(readFileSync(path, "utf8")))).map((path) => path.replace(process.cwd() + "/", ""));
    assert.deepEqual(offenders, []);
  });
});
