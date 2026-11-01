import { SITE_URL } from "@/lib/site";

// Built once into a file: the site is served as static files (Cloudflare Pages).
export const dynamic = "force-static";

// A handler, not robots.ts: Next's robots type has no Content-Signal line.
// Search engines and AI assistants are welcome; training is not; the notebook is personal and not indexed.
export function GET() {
  const lines = [
    "User-Agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "Allow: /",
    "Disallow: /notebook",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ];
  return new Response(lines.join("\n") + "\n", { headers: { "content-type": "text/plain; charset=utf-8" } });
}
