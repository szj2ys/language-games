import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Search engines and AI crawlers are welcome; the notebook is personal and not indexed.
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/notebook"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
