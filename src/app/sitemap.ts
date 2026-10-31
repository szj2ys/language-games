import type { MetadataRoute } from "next";
import { GAMES } from "@/content/games";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://language-games.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site}/`, changeFrequency: "monthly", priority: 1 },
    ...GAMES.map((g) => ({ url: `${site}/play/${g.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site}/sources`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
