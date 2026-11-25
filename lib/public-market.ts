/** A read-only client for the published FN/7 discovery API. */
export const marketOrigin = "https://fn7-platform-preview.esdronski.workers.dev";
export const marketPageSize = 12;
const uuid = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
const handle = /^[a-z0-9]{3,24}$/;
type FetchPage = (url: URL, init: RequestInit) => Promise<Response>;
type Search = { q?: unknown; offset?: unknown };
type Listing = { id: string; handle: string; title: string; summary: string; format: string; price: number; cover: string | null };
type Service = { id: string; handle: string; title: string; description: string };
function object(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function requiredText(value: unknown): value is string { return typeof value === "string" && Boolean(value.trim()); }

export function editionHref(id: string, origin = marketOrigin) { return uuid.test(id) ? origin + "/releases?release=" + id : null; }
export function boothHref(alias: string, origin = marketOrigin) { return handle.test(alias) ? origin + "/store/" + alias : null; }
export function publicAssetHref(id: string | null, origin = marketOrigin) { return id && uuid.test(id) ? origin + "/media/creator/" + id + ".png" : null; }

async function read(path: string, query: Search, origin: string, send: FetchPage) {
  const base = new URL(origin);
  if (base.protocol !== "https:" || base.origin !== origin) throw new Error("Invalid catalog origin.");
  const url = new URL(path, base);
  const offset = query.offset ?? "0";
  if (typeof offset !== "string" || !/^(0|[1-9][0-9]{0,4}|100000)$/.test(offset)) throw new Error("Invalid result offset.");
  if (query.q !== undefined && (typeof query.q !== "string" || query.q.length > 160 || /\p{Cc}/u.test(query.q))) throw new Error("Invalid search.");
  if (typeof query.q === "string" && query.q.trim()) url.searchParams.set("q", query.q.trim());
  url.searchParams.set("offset", offset); url.searchParams.set("limit", String(marketPageSize));
  const response = await send(url, { cache: "no-store", credentials: "omit", redirect: "manual", signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error("Catalog unavailable.");
  const page: unknown = await response.json();
  if (!object(page) || page.schemaVersion !== 1 || !(page.nextOffset === null || page.nextOffset === Number(offset) + marketPageSize)) throw new Error("Invalid catalog page.");
  return { page, nextOffset: page.nextOffset as number | null };
}

export async function publicListings(query: Search, origin = marketOrigin, send: FetchPage = fetch) {
  const { page, nextOffset } = await read("/api/releases", query, origin, send);
  if (!Array.isArray(page.releases) || page.releases.length > marketPageSize) throw new Error("Invalid release page.");
  const items: Listing[] = page.releases.map((row: unknown) => {
    if (!object(row) || typeof row.release_id !== "string" || !uuid.test(row.release_id) ||
        typeof row.creator_alias !== "string" || !handle.test(row.creator_alias) || !requiredText(row.title) ||
        !requiredText(row.summary) || (row.type !== "doc" && row.type !== "guide") || typeof row.price_cents !== "number" ||
        !Number.isSafeInteger(row.price_cents) || row.price_cents < 0) throw new Error("Invalid release record.");
    return { id: row.release_id, handle: row.creator_alias, title: row.title, summary: row.summary, format: row.type,
      price: row.price_cents, cover: typeof row.cover_image_id === "string" && uuid.test(row.cover_image_id) ? row.cover_image_id : null };
  });
  return { items, nextOffset };
}

export async function publicServices(query: Search, origin = marketOrigin, send: FetchPage = fetch) {
  const { page, nextOffset } = await read("/api/v1/services", query, origin, send);
  if (page.source !== "published" || !Array.isArray(page.services) || page.services.length > marketPageSize) throw new Error("Invalid service page.");
  const items: Service[] = page.services.map((row: unknown) => {
    if (!object(row) || typeof row.id !== "string" || !uuid.test(row.id) || typeof row.creatorAlias !== "string" ||
        !handle.test(row.creatorAlias) || !object(row.creator_text) || !requiredText(row.creator_text.title) ||
        !requiredText(row.creator_text.description)) throw new Error("Invalid service record.");
    return { id: row.id, handle: row.creatorAlias, title: row.creator_text.title, description: row.creator_text.description };
  });
  return { items, nextOffset };
}
