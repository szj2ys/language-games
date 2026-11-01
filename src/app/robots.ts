import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Built once into a file: the site is served as static files (Cloudflare Pages).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Search engines and AI crawlers are welcome; the notebook is personal and not indexed.
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/notebook"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
