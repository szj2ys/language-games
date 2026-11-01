import type { MetadataRoute } from "next";
import { GAMES } from "@/content/games";
import { SITE_URL } from "@/lib/site";

// Built once into a file: the site is served as static files (Cloudflare Pages).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    ...GAMES.map((g) => ({ url: `${SITE_URL}/play/${g.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/sources`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
