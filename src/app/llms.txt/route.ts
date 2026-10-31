import { GAMES } from "@/content/games";
import { SOURCES, WORK_TITLE } from "@/content/sources";
import { SITE_URL } from "@/lib/site";

export function GET() {
  const lines = [
    "# Language Games",
    "",
    "> Free browser games for intermediate learners of English, built on Ludwig Wittgenstein's idea of language-games. No account; progress is kept in the browser.",
    "",
    "## Games",
    ...GAMES.map((g) => {
      const s = SOURCES[g.source];
      return `- [${g.title}](${SITE_URL}/play/${g.slug}): ${g.promise} English: ${g.english}. Idea: ${g.idea} (${WORK_TITLE[s.work]} ${s.ref}).`;
    }),
    "",
    "## Reference",
    `- [Sources](${SITE_URL}/sources): every quoted passage, a plain-English reading, and the limits of each game's analogy.`,
  ];
  return new Response(lines.join("\n") + "\n", { headers: { "content-type": "text/plain; charset=utf-8" } });
}
