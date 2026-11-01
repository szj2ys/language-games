# Deploy acceptance: "Wittgenstein, played" on the public internet

Written by the independent acceptor before the work, 2026-11-01. The doer may not edit this file;
disagreements go in the reply, not here.

## Build verdict

**Build, as planned.** The user cannot open a localhost site; a public HTTPS URL is the
problem, and Cloudflare Pages is what the user named. The site needs no server at runtime: every
route is a page or a metadata file, progress lives in the browser, and the only third party
(PostHog) is called from the client. A static export (`output: "export"`) on the Pages free plan
is the cheapest path that solves the problem: no server, no bill, one upload. A "smaller" build
does not exist here, and Vercel (native Next.js, keeps `headers()` and AVIF image optimisation)
is not what the user asked for.

The flaw that decides success is not the upload; it is what a static export silently drops:

1. `next.config.ts` `headers()` (CSP, X-Frame-Options, nosniff, Referrer-Policy,
   Permissions-Policy) does not apply to an export. They must move to `public/_headers`.
2. `next/image` (8 files, including `getImageProps` in `src/components/game/chrome.tsx`) needs
   `images.unoptimized: true` or a custom loader in an export; the AVIF/WebP optimisation that
   `images.formats` gave the round pictures is lost. The pictures must still load and stay a
   reasonable weight on a phone.
3. `SITE_URL` defaults to `https://language-games.example`; the build must set
   `NEXT_PUBLIC_SITE_URL` to the real public origin, or canonical, OG, sitemap, robots and
   `llms.txt` advertise a dead domain.
4. `src/app/llms.txt/route.ts`, `robots.ts`, `sitemap.ts` must be statically generated, and
   `cacheComponents` / `partialPrefetching` must not break the export.
5. Reachability from the user's own network: `*.pages.dev` is a shared Cloudflare hostname and
   can be slow or blocked on some mainland-China networks. If the user reports it still does not
   open, the remedy is a custom domain on the same Pages project, not a different host.

## Done criteria

Every item is checked by the acceptor against the public URL, not localhost, a tunnel or a
preview build. Evidence is a command and its output captured in the verdict turn.

### A. Public URL

- A1. A `https://<project>.pages.dev` production URL (not a per-deployment hash URL only, not
  `localhost`, `trycloudflare.com`, ngrok or any tunnel) returns 200 over HTTPS with a valid
  certificate from a clean client: `curl -sSI https://<project>.pages.dev/`.
- A2. The deployment is a Pages **production** deployment (the project's production branch),
  so the URL stays stable after the doer's session ends.
- A3. HTTP redirects to HTTPS; no mixed-content warnings in the browser console.

### B. Every route works on phone and desktop

- B1. Each of these returns 200 with the right page (title or main heading checked, not just the
  status): `/`, `/notebook`, `/sources`, `/play/beetle`, `/play/builder`, `/play/cafe`,
  `/play/family`, `/play/hinges`, `/play/pupil`, `/play/scene`.
- B2. Deep links and reloads work: opening `/play/cafe` directly and reloading mid-round serves
  the page, not a 404 or the home page (trailing-slash handling is consistent; no redirect loop).
- B3. An unknown path (`/no-such-page`) returns the site's own not-found page with status 404.
- B4. `python e2e/play_all.py https://<project>.pages.dev` exits 0 (phone viewport).
- B5. `python e2e/play_all.py https://<project>.pages.dev --desktop` exits 0.
- B6. `python e2e/a11y.py https://<project>.pages.dev` exits 0 (no serious or critical axe issues,
  phone and desktop).
- B7. Browser console on `/` and one game page shows no errors, in particular no CSP violations
  and no failed chunk or font loads.

### C. Assets and images

- C1. Every `<img>` on `/` and on each game's first round loads (`naturalWidth > 0`), including
  the round pictures under `/art`, `og.jpg` and the favicon.
- C2. No asset request returns 4xx/5xx in the e2e runs (network log or screenshots in
  `qa/e2e` show the pictures, not broken-image icons).
- C3. Image weight stays reasonable on a phone after losing on-the-fly optimisation: report the
  total transferred bytes for `/` and `/play/cafe` on first load; a page over 3 MB is a FAIL
  unless the doer shows the localhost build was the same.

### D. Security headers (the static export drops `headers()`)

- D1. `curl -sSI` on `/`, `/play/cafe` and one static asset shows: `Content-Security-Policy`
  equal in substance to the CSP in `next.config.ts` (including `frame-ancestors 'none'`,
  `object-src 'none'`, and the PostHog hosts only if analytics is enabled),
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- D2. The headers come from a checked-in `public/_headers` (or equivalent) so a redeploy keeps
  them; the CSP is still strict enough that the e2e runs pass (no `'unsafe-eval'` added to make
  something work).
- D3. Hashed `/_next/static/*` assets are served with a long immutable cache; HTML is not cached
  immutably (a redeploy shows up on reload).

### E. SEO and sharing metadata point at the public URL

- E1. `view-source` of `/` and one game page: `<link rel="canonical">`, `og:url`, `og:image`
  and JSON-LD URLs use `https://<project>.pages.dev`, never `language-games.example` or
  `localhost`.
- E2. `/sitemap.xml` lists every page in B1 with the public origin; `/robots.txt` allows
  crawling and names that sitemap; `/llms.txt` serves as `text/plain` with public-origin links.
- E3. `grep -r "language-games.example\|localhost:3417" out/` over the deployed build output
  finds nothing.
- E4. The OG image URL returns 200 and an image content type.

### F. Cost answer is factual

- F1. The reply tells the user, in plain words, whether this costs money, citing Cloudflare's
  current Pages pricing/limits page (URL in the reply): the free plan serves static assets with
  no bandwidth or request charge, and its limits (builds per month, files per deployment, max
  file size, custom domains per project) are quoted from that page, not from memory.
- F2. The reply states what *would* start costing money (for example Pages Functions/Workers
  beyond the free daily request quota, or buying a custom domain), and that nothing in this
  deploy uses a paid feature. No payment method, plan upgrade or paid domain is added without
  the user's approval.
- F3. The out/ file count and the largest file are within the free-plan per-deployment limits
  (doer reports both numbers).

### G. No secrets in the deployed bundle

- G1. The Cloudflare token was used only through
  `python <harness>/scripts/credentials.py run CLOUDFLARE_PAGES_API_TOKEN -- ...`; it appears in
  no file in the repo, no committed config, no log under `logs/` or `planning/`, and no command
  output in the transcript.
- G2. A scan of `out/` (and of the live JS chunks fetched from the public URL) finds no API
  tokens or keys: no Cloudflare token, no `sk-`/`ghp_`/`github_pat_` patterns, no
  non-`NEXT_PUBLIC_` environment values. A PostHog project key is acceptable only because it is
  public by design; say so if present.
- G3. No source maps of server code, `.env*` files or `planning/` material are in the deployed
  output.

### H. Rollback and repeatability

- H1. The deploy is one documented command (for example an npm script or a line in README)
  that rebuilds the export with `NEXT_PUBLIC_SITE_URL` set and uploads with `wrangler pages
  deploy out --project-name <project>` through `credentials.py run`.
- H2. Rollback is stated and real: Cloudflare dashboard Pages > Deployments > previous
  deployment > "Rollback", or `wrangler pages deployment list` plus redeploying a prior build;
  full removal is deleting the Pages project. The doer names the deployment ID now live.
- H3. Local development still works: `npm run dev` on localhost:3417 is not broken by the export
  config (the export setting is either harmless in dev or scoped to the deploy build), and the
  repo's unit tests still pass.

### I. Harness gates

- I1. `launch.toml` exists in the project and `python <harness>/scripts/launch-gate.py
  D:/githubprojects/language-games` was run; the reply cites
  `.launch-gate/last.json` with its overall status. A "live" claim without it is UNVERIFIED.
- I2. Agent readiness scan after deploy: `python <harness>/scripts/agent_ready.py scan
  https://<project>.pages.dev` was run and its score reported (improving it is follow-up work,
  not a blocker for this verdict; `dnsAid` cannot pass on a shared host).
- I3. Layer 1: no ad network, ad pixel or dark pattern on the live pages
  (`launch-gate.py --only l1` PASS).

## Verdict format

`PASS` only when every item in A-H holds with evidence from the public URL, plus I1 run.
Any failed item is `FAIL`. Evidence that could not be obtained after every route was tried is
`UNVERIFIED` with `BLOCKED: <exact error>`. The verdict ends with a `Not covered:` line; known
gaps in advance: reachability from the user's own (possibly mainland-China) network and real
phone hardware, which only the user's own phone can confirm.
