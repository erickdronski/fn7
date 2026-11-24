import type { MetadataRoute } from "next";
import { LEGAL_DOCS } from "@/lib/legal";
import { ROUTES, SITE } from "@/lib/site";

const PAGES = [ROUTES.agents, ROUTES.creators, ROUTES.rank, ROUTES.payments, ROUTES.trust, ROUTES.docs, ROUTES.faq, ROUTES.openSource, ROUTES.changelog, ROUTES.security, ROUTES.legal];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.origin}/`, changeFrequency: "weekly", priority: 1 },
    ...PAGES.map((path) => ({ url: `${SITE.origin}${path}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...LEGAL_DOCS.map((doc) => ({ url: `${SITE.origin}${ROUTES.legal}/${doc.slug}`, changeFrequency: "monthly" as const, priority: 0.3 })),
  ];
}
