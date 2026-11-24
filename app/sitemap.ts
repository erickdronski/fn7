import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.origin}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.origin}/open-source`, changeFrequency: "weekly", priority: 0.8 },
  ];
}
