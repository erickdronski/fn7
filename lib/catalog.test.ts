import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  BUILDER_DEFAULTS,
  BUILDER_SHELF,
  PREVIEW,
  aliasFromName,
  bannerArt,
  builderQuery,
  coverArt,
  filtersToQuery,
  formatBytes,
  formatDay,
  freeListingLimit,
  getBooth,
  getListing,
  installCommand,
  listListings,
  listingsForBooth,
  parseBuilder,
  parseFilters,
  permissionWords,
  permissionsLine,
  priceBandOf,
  releaseName,
  searchListings,
  shopOrder,
  typesIn,
} from "./catalog";
import { AVATARS, AVATAR_LABEL, AVATAR_NAMES, AVATAR_SIZE } from "./catalog/avatars";
import { BANNERS } from "./catalog/booth";
import { MILESTONES } from "./roadmap";
import { BOOTHS, LISTINGS, type Listing } from "./seed";
import { tiersForRank } from "./tiers";

const slugs = (listings: Listing[]) => listings.map((listing) => listing.slug);

function fixture(over: Partial<Listing> & { slug: string }): Listing {
  return {
    title: "Untitled",
    summary: "A plain summary.",
    description: "A plain description.",
    category: "Code",
    type: "snippet",
    booth: "courier",
    priceCents: 300,
    version: "1.0.0",
    license: "standard",
    access: ["download"],
    worksWith: [],
    permissions: { network: false, secrets: [], shell: [], writes: [] },
    made: "by-hand",
    whatYouGet: [],
    sample: "",
    files: [],
    updated: "2026-11-01",
    ...over,
  };
}

const SHELF: Listing[] = [
  fixture({ slug: "diff-notes", title: "Release notes from a diff", summary: "Writes notes from git.", category: "Agents", type: "skill", priceCents: 500, updated: "2026-11-10" }),
  fixture({ slug: "queue", title: "Retry queue", summary: "A job queue with retries and release hooks.", category: "Code", type: "library", priceCents: 1000, updated: "2026-11-12", booth: "cratecrab" }),
  fixture({ slug: "icons", title: "Pixel icons", summary: "An icon set on one grid.", category: "Assets", type: "icons", priceCents: 0, updated: "2026-10-02", booth: "tinfox" }),
  fixture({ slug: "evals", title: "Tool-call eval set", summary: "Graded tasks for agents.", category: "Data", type: "eval-set", priceCents: 10000, updated: "2026-11-20", booth: "tallyworks" }),
];

describe("looking things up", () => {
  it("finds a listing by its slug, and nothing for a slug that isn't there", () => {
    assert.equal(getListing("release-notes-skill")?.title, "Release-notes skill");
    assert.equal(getListing("no-such-listing"), undefined);
    assert.equal(getListing("queue", SHELF)?.type, "library");
  });

  it("finds a booth by alias, with or without the @, in any case", () => {
    assert.equal(getBooth("courier")?.name, "Courier");
    assert.equal(getBooth("@Courier")?.alias, "courier");
    assert.equal(getBooth("nobody"), undefined);
  });

  it("lists a booth's listings in the order the booth arranged them", () => {
    const own = listingsForBooth("chalkowl");
    assert.ok(own.length >= 2);
    assert.ok(own.every((listing) => listing.booth === "chalkowl"));
    assert.deepEqual(slugs(own), slugs(LISTINGS.filter((listing) => listing.booth === "chalkowl")));
  });
});

describe("listing with filters", () => {
  it("returns everything, most recently updated first, when nothing is filtered", () => {
    assert.deepEqual(slugs(listListings({}, SHELF)), ["evals", "queue", "diff-notes", "icons"]);
    assert.equal(listListings().length, LISTINGS.length);
  });

  it("never changes the list it was given", () => {
    const before = slugs(SHELF);
    listListings({ sort: "price-up" }, SHELF);
    assert.deepEqual(slugs(SHELF), before);
  });

  it("filters by category, by type and by booth", () => {
    assert.deepEqual(slugs(listListings({ category: "Assets" }, SHELF)), ["icons"]);
    assert.deepEqual(slugs(listListings({ type: "library" }, SHELF)), ["queue"]);
    assert.deepEqual(slugs(listListings({ booth: "tallyworks" }, SHELF)), ["evals"]);
  });

  it("filters by price band", () => {
    assert.deepEqual(slugs(listListings({ price: "free" }, SHELF)), ["icons"]);
    assert.deepEqual(slugs(listListings({ price: "low" }, SHELF)), ["diff-notes"]);
    assert.deepEqual(slugs(listListings({ price: "mid" }, SHELF)), ["queue"]);
    assert.deepEqual(slugs(listListings({ price: "high" }, SHELF)), ["evals"]);
  });

  it("puts every price tier in exactly one band", () => {
    assert.equal(priceBandOf(0), "free");
    assert.equal(priceBandOf(100), "low");
    assert.equal(priceBandOf(500), "low");
    assert.equal(priceBandOf(1000), "mid");
    assert.equal(priceBandOf(2000), "mid");
    assert.equal(priceBandOf(3500), "high");
    assert.equal(priceBandOf(50000), "high");
  });

  it("combines filters, and returns nothing when they can't all hold", () => {
    assert.deepEqual(slugs(listListings({ category: "Code", price: "mid" }, SHELF)), ["queue"]);
    assert.deepEqual(listListings({ category: "Code", price: "free" }, SHELF), []);
  });

  it("sorts by price in either direction, breaking ties by date", () => {
    assert.deepEqual(slugs(listListings({ sort: "price-up" }, SHELF)), ["icons", "diff-notes", "queue", "evals"]);
    assert.deepEqual(slugs(listListings({ sort: "price-down" }, SHELF)), ["evals", "queue", "diff-notes", "icons"]);
  });

  it("names the types on offer in a category, in the catalog's order", () => {
    assert.deepEqual(typesIn("Data", SHELF), ["eval-set"]);
    assert.deepEqual(typesIn(undefined, SHELF), ["skill", "library", "icons", "eval-set"]);
  });
});

describe("search", () => {
  it("matches words in the title, summary, type and category", () => {
    assert.deepEqual(slugs(searchListings("retry", SHELF)), ["queue"]);
    assert.deepEqual(slugs(searchListings("grid", SHELF)), ["icons"]);
    assert.deepEqual(slugs(searchListings("eval set", SHELF)), ["evals"]);
    assert.deepEqual(slugs(searchListings("assets", SHELF)), ["icons"]);
  });

  it("ignores case, extra spaces and punctuation", () => {
    assert.deepEqual(slugs(searchListings("  RETRY,   Queue! ", SHELF)), ["queue"]);
  });

  it("needs every word to match somewhere", () => {
    assert.deepEqual(slugs(searchListings("release notes", SHELF)), ["diff-notes"]);
    assert.deepEqual(searchListings("release icons", SHELF), []);
  });

  it("ranks a title match above a summary match", () => {
    assert.deepEqual(slugs(searchListings("release", SHELF)), ["diff-notes", "queue"]);
  });

  it("returns everything for an empty query", () => {
    assert.equal(searchListings("   ", SHELF).length, SHELF.length);
  });

  it("works together with the filters", () => {
    assert.deepEqual(slugs(listListings({ q: "release", category: "Code" }, SHELF)), ["queue"]);
    assert.deepEqual(slugs(listListings({ q: "release", sort: "price-down" }, SHELF)), ["queue", "diff-notes"]);
  });

  it("finds the sample skill by describing the task", () => {
    assert.equal(searchListings("release notes git diff")[0]?.slug, "release-notes-skill");
  });
});

describe("filters in the URL", () => {
  it("reads filters from a query string and drops what it doesn't know", () => {
    const filters = parseFilters(new URLSearchParams("q=git+diff&category=Agents&type=skill&price=low&sort=price-up&view=list&x=1"));
    assert.deepEqual(filters, { q: "git diff", category: "Agents", type: "skill", price: "low", sort: "price-up", view: "list" });
    assert.deepEqual(parseFilters(new URLSearchParams("category=Hats&type=hat&price=cheap&sort=random&view=wall")), {});
  });

  it("drops a type that isn't in the chosen category", () => {
    assert.deepEqual(parseFilters(new URLSearchParams("category=Data&type=skill")), { category: "Data" });
  });

  it("writes only the filters that are set, so a plain market has a plain address", () => {
    assert.equal(filtersToQuery({}), "");
    assert.equal(filtersToQuery({ view: "grid", sort: "recent" }), "");
    assert.equal(filtersToQuery({ q: "git diff", category: "Agents", view: "list" }), "q=git+diff&category=Agents&view=list");
  });

  it("round-trips", () => {
    const query = "q=eval&category=Data&type=eval-set&price=high&sort=price-down&view=list";
    assert.equal(filtersToQuery(parseFilters(new URLSearchParams(query))), query);
  });
});

describe("permissions in plain words", () => {
  it("says what a good needs and what it never touches", () => {
    assert.equal(permissionsLine({ network: false, secrets: [], shell: ["git"], writes: [] }), "Needs git. No network. No secrets.");
  });

  it("names hosts, secrets and folders when they are declared", () => {
    assert.equal(
      permissionsLine({ network: ["api.github.com"], secrets: ["GH_TOKEN"], shell: ["git", "gh"], writes: ["docs/incidents"] }),
      "Needs git and gh. Contacts api.github.com. Reads GH_TOKEN. Writes to docs/incidents.",
    );
  });

  it("calls the install folder by name, and joins three things with commas", () => {
    assert.deepEqual(permissionWords({ network: false, secrets: ["A", "B", "C"], shell: [], writes: ["."] }), [
      "Runs no commands.",
      "No network.",
      "Reads A, B and C.",
      "Writes to its own folder.",
    ]);
  });
});

describe("names an agent can use", () => {
  it("builds the release name and the install command from the listing", () => {
    const listing = getListing("release-notes-skill");
    assert.ok(listing);
    assert.equal(releaseName(listing), "fn7:@courier/release-notes-skill@1.2.0");
    assert.equal(installCommand(listing), "fn7 add @courier/release-notes-skill");
  });
});

describe("the free tier", () => {
  it("lets a Node booth list one free good, and every higher rank five", () => {
    assert.equal(freeListingLimit("node"), 1);
    assert.equal(freeListingLimit("relay"), 5);
    assert.equal(freeListingLimit("mainframe"), 5);
  });
});

describe("generated covers", () => {
  it("draws the same cover for the same listing, every time", () => {
    assert.deepEqual(coverArt("release-notes-skill", "skill"), coverArt("release-notes-skill", "skill"));
  });

  it("draws a different cover for a different listing", () => {
    const first = JSON.stringify(coverArt("release-notes-skill", "skill"));
    assert.notEqual(first, JSON.stringify(coverArt("incident-notes-skill", "skill")));
    assert.notEqual(first, JSON.stringify(coverArt("release-notes-skill", "dataset")));
  });

  it("gives every sample listing a cover with something on it, inside the grid", () => {
    for (const listing of LISTINGS) {
      const art = coverArt(listing.slug, listing.type);
      assert.equal(art.width / art.height, 16 / 10, listing.slug);
      const drawn = art.layers.filter((layer) => layer.tone !== "dim");
      assert.ok(drawn.length >= 1 && drawn.some((layer) => layer.d.length > 0), `${listing.slug} is blank`);
      for (const layer of art.layers) {
        for (const [, x, y, run] of layer.d.matchAll(/M(\d+) (\d+)h(\d+)v1h-\d+z/g)) {
          assert.ok(Number(x) + Number(run) <= art.width && Number(y) < art.height, `${listing.slug} draws outside the grid`);
        }
        assert.equal(layer.d.replace(/M\d+ \d+h\d+v1h-\d+z/g, ""), "", `${listing.slug} has a malformed path`);
      }
    }
  });

  it("draws every banner backdrop the same way each time, and no two alike", () => {
    const drawn = BANNERS.map((banner) => JSON.stringify(bannerArt(banner)));
    assert.equal(new Set(drawn).size, BANNERS.length);
    assert.deepEqual(BANNERS.map((banner) => JSON.stringify(bannerArt(banner))), drawn);
  });
});

describe("a booth's shop order", () => {
  it("puts featured listings first, in the order the booth featured them", () => {
    const booth = getBooth("courier");
    assert.ok(booth);
    const order = slugs(shopOrder(booth));
    assert.deepEqual(order.slice(0, booth.featured.length), booth.featured);
    assert.equal(order.length, listingsForBooth("courier").length);
    assert.equal(new Set(order).size, order.length);
  });

  it("keeps a path in the order the creator set, because the order is the point", () => {
    const booth = BOOTHS.find((item) => item.layout === "path");
    assert.ok(booth);
    assert.deepEqual(slugs(shopOrder(booth)), slugs(listingsForBooth(booth.alias)));
  });
});

describe("the booth builder's address", () => {
  it("starts from the defaults", () => {
    assert.deepEqual(parseBuilder(new URLSearchParams("")), BUILDER_DEFAULTS);
    assert.equal(builderQuery(BUILDER_DEFAULTS), "");
  });

  it("reads choices from the address and ignores ones that don't exist", () => {
    const state = parseBuilder(new URLSearchParams("name=Night+Owl&avatar=owl&accent=amber&banner=stars&layout=path"));
    assert.deepEqual(state, { name: "Night Owl", avatar: "owl", accent: "amber", banner: "stars", layout: "path" });
    assert.deepEqual(parseBuilder(new URLSearchParams("avatar=dragon&accent=beige&banner=beach&layout=pile")), BUILDER_DEFAULTS);
  });

  it("keeps a name short and free of markup", () => {
    const state = parseBuilder(new URLSearchParams({ name: `  <b>Very</b>   long ${"x".repeat(80)}` }));
    assert.ok(state.name.length <= 32);
    assert.doesNotMatch(state.name, /[<>]/);
    assert.ok(state.name.startsWith("bVery/b long"));
  });

  it("round-trips, writing only what differs from the defaults", () => {
    const query = "name=Night+Owl&avatar=owl&layout=path";
    assert.equal(builderQuery(parseBuilder(new URLSearchParams(query))), query);
  });

  it("makes an alias from a name", () => {
    assert.equal(aliasFromName("Night Owl"), "nightowl");
    assert.equal(aliasFromName("Crate Crab Labs!"), "cratecrablabs");
    assert.equal(aliasFromName("  "), "yourbooth");
  });
});

describe("pixel avatars", () => {
  it("draws every avatar on the same square grid, in the four sprite tones", () => {
    assert.ok(AVATAR_NAMES.length >= 6);
    for (const name of AVATAR_NAMES) {
      assert.equal(AVATARS[name].length, AVATAR_SIZE, name);
      for (const row of AVATARS[name]) assert.match(row, new RegExp(`^[.asld]{${AVATAR_SIZE}}$`), `${name}: ${row}`);
      assert.ok(AVATAR_LABEL[name], name);
    }
  });

  it("draws no two avatars alike", () => {
    assert.equal(new Set(AVATAR_NAMES.map((name) => AVATARS[name].join("/"))).size, AVATAR_NAMES.length);
  });
});

describe("what the preview says about itself", () => {
  it("says, on the buy button, that buying opens in milestone M4", () => {
    assert.equal(PREVIEW.buyLabel, "Buying opens in milestone M4");
    assert.equal(MILESTONES.find((item) => item.id === "M4")?.title, "Buying");
  });

  it("says plainly that the listings are samples and nothing can be bought", () => {
    assert.match(PREVIEW.note, /sample/);
    assert.match(PREVIEW.note, /Nothing can be bought yet/);
    assert.match(PREVIEW.note, /milestone M4/);
    assert.match(PREVIEW.cannotBuy, /Nothing can be bought yet/);
    assert.match(PREVIEW.builderNote, /samples/);
    assert.match(PREVIEW.builderNote, /nothing can be bought yet/);
  });

  it("names milestones that are on the roadmap", () => {
    const ids = MILESTONES.map((item) => item.id);
    for (const id of [PREVIEW.buyingMilestone, PREVIEW.accountsMilestone, PREVIEW.agentsMilestone]) assert.ok(ids.includes(id), id);
  });

  it("stocks the booth builder with sample listings a Node booth could sell", () => {
    for (const slug of BUILDER_SHELF) {
      const listing = getListing(slug);
      assert.ok(listing, slug);
      assert.ok(tiersForRank("node").includes(listing.priceCents), `${slug} costs ${listing.priceCents}`);
    }
  });
});

describe("small formats", () => {
  it("prints file sizes in the unit a person would use", () => {
    assert.equal(formatBytes(640), "640 B");
    assert.equal(formatBytes(4210), "4.1 KB");
    assert.equal(formatBytes(1_048_576), "1.0 MB");
    assert.equal(formatBytes(22_400_000), "21 MB");
    assert.equal(formatBytes(1_610_612_736), "1.5 GB");
  });

  it("prints a date the same way on every machine", () => {
    assert.equal(formatDay("2026-11-12"), "12 Nov 2026");
    assert.equal(formatDay("2026-01-03"), "3 Jan 2026");
  });
});
