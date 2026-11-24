import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ACCENTS, BANNERS, LAYOUTS } from "./catalog/booth";
import { freeListingLimit } from "./catalog/rules";
import { CATEGORIES, CATEGORY_TYPES, CLIENTS } from "./catalog/types";
import { AVATAR_SIZE } from "./catalog/avatars";
import { BOOTHS, LISTINGS } from "./seed";
import { RANKS, tiersForRank } from "./tiers";

const boothOf = (alias: string) => BOOTHS.find((booth) => booth.alias === alias);

describe("sample booths", () => {
  it("has six booths, each with its own alias", () => {
    assert.equal(BOOTHS.length, 6);
    assert.equal(new Set(BOOTHS.map((booth) => booth.alias)).size, BOOTHS.length);
  });

  it("writes every alias the way a URL carries it", () => {
    for (const booth of BOOTHS) assert.match(booth.alias, /^[a-z0-9]{3,24}$/, booth.alias);
  });

  it("gives every booth a real rank, accent, layout and banner", () => {
    for (const booth of BOOTHS) {
      assert.ok(RANKS.includes(booth.rank), `${booth.alias} rank`);
      assert.ok(ACCENTS.includes(booth.accent), `${booth.alias} accent`);
      assert.ok(LAYOUTS.includes(booth.layout), `${booth.alias} layout`);
      assert.ok(BANNERS.includes(booth.banner), `${booth.alias} banner`);
      assert.ok(["person", "business", "agent"].includes(booth.kind), `${booth.alias} kind`);
      assert.ok(booth.name && booth.tagline && booth.bio, `${booth.alias} words`);
    }
  });

  it("shows each of the five shop layouts at least once", () => {
    assert.deepEqual([...new Set(BOOTHS.map((booth) => booth.layout))].sort(), [...LAYOUTS].sort());
  });

  it("draws every avatar on the same square grid, in the four sprite tones", () => {
    for (const booth of BOOTHS) {
      assert.equal(booth.avatar.length, AVATAR_SIZE, `${booth.alias} rows`);
      for (const row of booth.avatar) assert.match(row, new RegExp(`^[.asld]{${AVATAR_SIZE}}$`), `${booth.alias}: ${row}`);
    }
  });

  it("features one to three listings, all of them the booth's own", () => {
    for (const booth of BOOTHS) {
      assert.ok(booth.featured.length >= 1 && booth.featured.length <= 3, `${booth.alias} featured count`);
      assert.equal(new Set(booth.featured).size, booth.featured.length, `${booth.alias} repeats a featured listing`);
      for (const slug of booth.featured) {
        const listing = LISTINGS.find((item) => item.slug === slug);
        assert.ok(listing, `${booth.alias} features ${slug}, which doesn't exist`);
        assert.equal(listing.booth, booth.alias, `${slug} belongs to another booth`);
      }
    }
  });

  it("gives every booth something on its shelf", () => {
    for (const booth of BOOTHS) assert.ok(LISTINGS.some((listing) => listing.booth === booth.alias), booth.alias);
  });
});

describe("sample listings", () => {
  it("has 24 to 30 listings, each with its own slug", () => {
    assert.ok(LISTINGS.length >= 24 && LISTINGS.length <= 30, String(LISTINGS.length));
    assert.equal(new Set(LISTINGS.map((listing) => listing.slug)).size, LISTINGS.length);
  });

  it("writes every slug the way a URL carries it", () => {
    for (const listing of LISTINGS) assert.match(listing.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, listing.slug);
  });

  it("puts every listing in a booth that exists", () => {
    for (const listing of LISTINGS) assert.ok(boothOf(listing.booth), `${listing.slug} is in @${listing.booth}`);
  });

  it("prices every listing at a tier its booth's rank has unlocked", () => {
    for (const listing of LISTINGS) {
      const booth = boothOf(listing.booth);
      assert.ok(booth);
      assert.ok(
        tiersForRank(booth.rank).includes(listing.priceCents),
        `${listing.slug} costs ${listing.priceCents}, which ${booth.rank} can't charge`,
      );
    }
  });

  it("covers all eight categories, with at least two listings in each", () => {
    assert.equal(CATEGORIES.length, 8);
    for (const category of CATEGORIES) {
      const count = LISTINGS.filter((listing) => listing.category === category).length;
      assert.ok(count >= 2, `${category} has ${count}`);
    }
  });

  it("gives every listing a type that belongs to its category", () => {
    for (const listing of LISTINGS) {
      assert.ok((CATEGORY_TYPES[listing.category] as readonly string[]).includes(listing.type), `${listing.slug}: ${listing.type} in ${listing.category}`);
    }
  });

  it("includes a few free listings, inside each rank's free limit", () => {
    const free = LISTINGS.filter((listing) => listing.priceCents === 0);
    assert.ok(free.length >= 3, `${free.length} free listings`);
    for (const booth of BOOTHS) {
      const count = free.filter((listing) => listing.booth === booth.alias).length;
      assert.ok(count <= freeListingLimit(booth.rank), `@${booth.alias} has ${count} free listings`);
    }
  });

  it("carries no review, rating, sales count or buyer count", () => {
    const banned = /review|rating|stars|sales|sold|buyers|downloads|installs|worked/i;
    for (const listing of LISTINGS) {
      for (const key of Object.keys(listing)) assert.doesNotMatch(key, banned, `${listing.slug}.${key}`);
    }
    for (const booth of BOOTHS) {
      for (const key of Object.keys(booth)) assert.doesNotMatch(key, banned, `@${booth.alias}.${key}`);
    }
  });

  it("fills in every field a listing page shows", () => {
    for (const listing of LISTINGS) {
      const at = listing.slug;
      assert.ok(listing.title.length > 2 && listing.title.length <= 48, `${at} title`);
      assert.ok(listing.summary.length > 20 && listing.summary.length <= 140, `${at} summary is ${listing.summary.length} long`);
      assert.ok(listing.description.length > 80, `${at} description`);
      assert.match(listing.version, /^\d+\.\d+\.\d+$/, `${at} version`);
      assert.ok(["standard", "personal", "open"].includes(listing.license), `${at} license`);
      assert.ok(["by-hand", "with-ai", "by-agent"].includes(listing.made), `${at} made`);
      assert.ok(listing.access.length >= 1, `${at} access`);
      assert.ok(listing.whatYouGet.length >= 3, `${at} what you get`);
      assert.ok(listing.sample.length > 40, `${at} sample`);
      assert.ok(listing.files.length >= 2, `${at} files`);
      for (const file of listing.files) {
        assert.ok(file.path.length > 0 && !file.path.startsWith("/"), `${at} file path ${file.path}`);
        assert.ok(Number.isInteger(file.bytes) && file.bytes > 0, `${at} file size ${file.path}`);
      }
      assert.equal(new Set(listing.files.map((file) => file.path)).size, listing.files.length, `${at} repeats a file`);
    }
  });

  it("dates every release on a real day, no later than the day this preview was built", () => {
    for (const listing of LISTINGS) {
      assert.match(listing.updated, /^\d{4}-\d{2}-\d{2}$/, listing.slug);
      const day = new Date(`${listing.updated}T00:00:00Z`);
      assert.equal(day.toISOString().slice(0, 10), listing.updated, listing.slug);
      assert.ok(listing.updated <= "2026-11-24", `${listing.slug} is dated ${listing.updated}`);
    }
  });

  it("names only clients the catalog knows", () => {
    for (const listing of LISTINGS) {
      for (const client of listing.worksWith) assert.ok(client in CLIENTS, `${listing.slug} works with ${client}`);
    }
  });

  it("declares permissions in the manifest's shape", () => {
    for (const listing of LISTINGS) {
      const { network, secrets, shell, writes } = listing.permissions;
      assert.ok(network === false || (Array.isArray(network) && network.length > 0), `${listing.slug} network`);
      for (const list of [secrets, shell, writes]) assert.ok(Array.isArray(list), `${listing.slug} permissions`);
    }
  });

  it("doesn't let blocked formats onto the shelf", () => {
    const blocked = /\.(exe|dmg|app|msi|deb|apk|wasm|iso|pkl|joblib|docm|xlsm|pptm|lnk)$/i;
    for (const listing of LISTINGS) {
      for (const file of listing.files) assert.doesNotMatch(file.path, blocked, `${listing.slug}: ${file.path}`);
    }
  });
});

describe("the words in the sample data", () => {
  it("uses the glossary, never a retired word", () => {
    const retired = /\b(makers?|stamps?|stalls?|sellers?|editors?|studios?|dashboards?|quests?|capabilit(y|ies))\b/i;
    const text = JSON.stringify({ BOOTHS, LISTINGS });
    const hit = text.match(retired);
    assert.equal(hit, null, hit ? `found "${hit[0]}"` : "");
  });

  it("joins nothing with a middle dot and uses no emoji", () => {
    const text = JSON.stringify({ BOOTHS, LISTINGS });
    for (const code of [0xb7, 0x2022, 0x2219]) assert.ok(!text.includes(String.fromCharCode(code)), `found U+${code.toString(16)}`);
    assert.doesNotMatch(text, /\p{Extended_Pictographic}/u);
  });
});
