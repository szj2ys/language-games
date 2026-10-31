import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Newsreader } from "next/font/google";
import { Analytics } from "@/components/analytics";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const body = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wittgenstein, played — his philosophy in seven short games",
    template: "%s · Wittgenstein, played",
  },
  description:
    "Learn Ludwig Wittgenstein's philosophy by playing: pictures of facts, language-games, meaning as use, family resemblance, following a rule, the beetle in the box and the hinges of certainty. Free, no account.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Wittgenstein, played",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Wittgenstein, played: seven of his ideas, each one a game" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f7f2e8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
