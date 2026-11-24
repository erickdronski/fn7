import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Search and AI crawlers are all welcome (platform design, section 12). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.origin}/sitemap.xml`,
    host: SITE.origin,
  };
}
