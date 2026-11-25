import assert from "node:assert/strict";
import { it } from "node:test";
import { publicListings, publicServices, editionHref, boothHref, publicAssetHref } from "./public-market";

const id = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const base = "https://official.example";
it("reads the two deployed publication endpoints using the public request alone", async () => {
  const calls: string[] = [];
  const send = async (url: URL, init: RequestInit) => {
    calls.push(url.pathname);
    assert.equal(url.origin, base); assert.equal(url.searchParams.get("q"), "tool");
    assert.equal(init.credentials, "omit"); assert.equal(init.redirect, "manual");
    if (url.pathname === "/api/releases") return Response.json({ schemaVersion: 1, releases: [{
      release_id: id, slug: "toolkit", creator_alias: "studio", title: "Toolkit", summary: "Guide to tools", type: "guide", price_cents: 500, version: "1.0.0", cover_image_id: id,
    }], nextOffset: null });
    return Response.json({ schemaVersion: 1, source: "published", services: [{
      id, creatorAlias: "studio", creator_text: { title: "Build review", description: "A design review" }, boothUrl: "https://unrelated.invalid", email: "private@example.org",
    }], nextOffset: null });
  };
  const listings = await publicListings({ q: "tool" }, base, send);
  assert.equal(listings.items[0].title, "Toolkit");
  assert.equal(publicAssetHref(id, base), base + "/media/creator/" + id + ".png");
  const services = await publicServices({ q: "tool" }, base, send);
  assert.ok(!JSON.stringify(services).includes("unrelated.invalid")); assert.ok(!JSON.stringify(services).includes("@example.org"));
  assert.equal(boothHref("studio", base), base + "/store/studio");
  assert.equal(editionHref(id, base), base + "/releases?release=" + id);
  assert.deepEqual(calls, ["/api/releases", "/api/v1/services"]);
});
it("keeps zero listings distinct from an unavailable or corrupt source", async () => {
  assert.deepEqual(await publicListings({}, base, async () => Response.json({ schemaVersion: 1, releases: [], nextOffset: null })), { items: [], nextOffset: null });
  await assert.rejects(publicListings({}, base, async () => new Response(null, { status: 503 })));
  await assert.rejects(publicServices({}, base, async () => Response.json({ schemaVersion: 1, source: "sample", services: [], nextOffset: null })));
  await assert.rejects(publicListings({}, base, async () => Response.json({ schemaVersion: 1, releases: [{}], nextOffset: null })));
  await assert.rejects(publicListings({ offset: "-1" }, base, async () => assert.fail()));
  await assert.rejects(publicListings({ q: ["x","y"] }, base, async () => assert.fail()));
  assert.equal(boothHref("//other.invalid", base), null); assert.equal(editionHref("old-fixture", base), null); assert.equal(publicAssetHref("../other", base), null);
});
