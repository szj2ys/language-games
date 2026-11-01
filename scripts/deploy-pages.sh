#!/bin/bash
# Build the site as static files and publish them to Cloudflare Pages (free plan).
#   bash scripts/deploy-pages.sh            production: https://wittgenstein-played.pages.dev
#   bash scripts/deploy-pages.sh preview    a preview deployment on its own URL
# Needs CLOUDFLARE_API_TOKEN (Pages: Edit) and CLOUDFLARE_ACCOUNT_ID in the environment.
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT=wittgenstein-played
SITE_URL=${NEXT_PUBLIC_SITE_URL:-https://$PROJECT.pages.dev}
BRANCH=main
[ "${1:-}" = preview ] && BRANCH=preview

rm -rf out
STATIC_EXPORT=1 NEXT_PUBLIC_SITE_URL="$SITE_URL" npx next build

# A static export ignores headers() in next.config.ts: write the same security headers for Pages.
node --experimental-strip-types --no-warnings -e '
import("./next.config.ts").then(({ SECURITY_HEADERS }) => {
  const lines = ["/*", ...SECURITY_HEADERS.map((h) => `  ${h.key}: ${h.value}`), "",
    "/", "  Link: </llms.txt>; rel=\"describedby\"; type=\"text/plain\"", "", "/_next/static/*", "  Cache-Control: public, max-age=31536000, immutable", ""];
  require("node:fs").writeFileSync("out/_headers", lines.join("\n"));
});'

# Which commit is live: the launch gate compares this with HEAD.
git rev-parse HEAD > out/version.txt

# Nothing secret may ship: the build has no server, so any key in out/ would be public.
if grep -rIlE "(sk-[A-Za-z0-9]{20,}|CLOUDFLARE_API_TOKEN|BEGIN [A-Z ]*PRIVATE KEY)" out; then
  echo "refusing to deploy: something that looks like a secret is in out/" >&2
  exit 1
fi

npx wrangler pages project list 2>/dev/null | grep -q "$PROJECT" || npx wrangler pages project create "$PROJECT" --production-branch main --force
npx wrangler pages deploy out --project-name "$PROJECT" --branch "$BRANCH" --commit-dirty=true
