import type { MetadataRoute } from "next";
import { LEGAL_DOCS } from "@/lib/legal";
import { ROUTES, SITE } from "@/lib/site";

/** Every page in ROUTES, once. A hash is a place on a page, and home is listed on its own. */
const PAGES = [...new Set(Object.values(ROUTES).map((route) => route.split("#")[0]))].filter((path) => path !== ROUTES.home);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.origin}/`, changeFrequency: "weekly", priority: 1 },
    ...PAGES.map((path) => ({ url: `${SITE.origin}${path}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...LEGAL_DOCS.map((doc) => ({ url: `${SITE.origin}${ROUTES.legal}/${doc.slug}`, changeFrequency: "monthly" as const, priority: 0.3 })),
  ];
}
