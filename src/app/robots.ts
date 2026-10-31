import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://language-games.example";

export default function robots(): MetadataRoute.Robots {
  // Search engines and AI crawlers are welcome; the notebook is personal and not indexed.
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/notebook"] }],
    sitemap: `${site}/sitemap.xml`,
  };
}
