import { GAMES } from "@/content/games";
import { SOURCES, WORK_TITLE } from "@/content/sources";
import { SITE_URL } from "@/lib/site";

// Built once into a file: the site is served as static files (Cloudflare Pages).
export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Wittgenstein, played",
    "",
    "> Free browser games for learning Ludwig Wittgenstein's philosophy, in seven steps from the Tractatus to On Certainty. Each game ends with the passage it comes from and where the analogy stops. No account; progress is kept in the browser.",
    "",
    "## The path",
    ...GAMES.map((g) => {
      const s = SOURCES[g.source];
      return `- [${g.step}. ${g.title}](${SITE_URL}/play/${g.slug}): ${g.idea} You: ${g.promise} (${WORK_TITLE[s.work]} ${s.ref}).`;
    }),
    "",
    "## Reference",
    `- [Sources](${SITE_URL}/sources): every quoted passage, a plain reading, and the limits of each game's analogy.`,
  ];
  return new Response(lines.join("\n") + "\n", { headers: { "content-type": "text/plain; charset=utf-8" } });
}
