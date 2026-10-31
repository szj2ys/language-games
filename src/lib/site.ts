/** The public origin for canonical URLs, Open Graph, the sitemap and robots.txt. Set NEXT_PUBLIC_SITE_URL when deploying. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://language-games.example").replace(/\/$/, "");
