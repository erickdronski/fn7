import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { BUILD_MENU, HOW_MENU, NAV_GROUPS, NAV_LINKS, RESOURCES_MENU, ROUTES, isExternal } from "./site";

const APP = join(process.cwd(), "app");

/** The page file a route resolves to. A hash is a place on a page, not a page. */
function pageFile(route: string): string {
  const path = route.split("#")[0];
  return join(APP, path, "page.tsx");
}

describe("routes", () => {
  it("every route has a page, so no link leads nowhere", () => {
    const missing = Object.entries(ROUTES)
      .filter(([, route]) => !existsSync(pageFile(route)))
      .map(([name, route]) => `${name} → ${route}`);
    assert.deepEqual(missing, []);
  });

  it("every internal navigation link points at a known route", () => {
    const known = new Set<string>(Object.values(ROUTES));
    const unknown = [...NAV_LINKS, ...HOW_MENU, ...RESOURCES_MENU, ...BUILD_MENU].filter((link) => !isExternal(link.href) && !known.has(link.href)).map((link) => link.href);
    assert.deepEqual(unknown, []);
  });

  it("the small-screen sheet carries every link the bar and its menus do", () => {
    const sheet = NAV_GROUPS.flatMap((group) => group.links.map((link) => link.href)).sort();
    const bar = [...NAV_LINKS, ...HOW_MENU, ...RESOURCES_MENU, ...BUILD_MENU].map((link) => link.href).sort();
    assert.deepEqual(sheet, bar);
  });

  it("no two navigation links share an address", () => {
    const hrefs = NAV_GROUPS.flatMap((group) => group.links.map((link) => link.href));
    assert.equal(new Set(hrefs).size, hrefs.length);
  });
});
