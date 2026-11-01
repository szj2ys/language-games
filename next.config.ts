import type { NextConfig } from "next";

// PostHog is the only third party (and only when its key is set). Next.js inlines its bootstrap scripts,
// and the pages carry JSON-LD, so scripts need 'unsafe-inline'; nothing may frame the site.
const POSTHOG = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const POSTHOG_ASSETS = POSTHOG.replace(/^(https:\/\/)(\w+)\.i\./, "$1$2-assets.i.");
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${POSTHOG_ASSETS}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${POSTHOG} ${POSTHOG_ASSETS}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");
const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// STATIC_EXPORT=1 builds plain files for Cloudflare Pages (out/): no image optimizer and no headers() there;
// the same security headers are written to out/_headers by scripts/deploy-pages.sh.
const STATIC = process.env.STATIC_EXPORT === "1";

export { SECURITY_HEADERS };

const nextConfig: NextConfig = {
  ...(STATIC ? { output: "export" as const } : {}),
  // A second build folder lets a verification server run beside one that a reviewer is using.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // AVIF first: the round pictures are the largest thing on every play page.
  images: STATIC ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  ...(STATIC
    ? {}
    : {
        async headers() {
          return [{ source: "/:path*", headers: SECURITY_HEADERS }];
        },
      }),
  // No Cache Components: every page is static anyway, and a static export needs route segment config it forbids.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
