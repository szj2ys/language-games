import Link from "next/link";
import { cn } from "@/lib/utils";

/** The wordmark: "played" in the one accent colour, as in the design. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-heading font-medium tracking-tight", className)}>
      Wittgenstein, <em className="text-vermilion">played</em>
    </span>
  );
}

const NAV = [
  { href: "/#path", label: "The path" },
  { href: "/sources", label: "Sources" },
  { href: "/notebook", label: "Notebook" },
];

/** Header for the reading pages (home, sources, notebook). Game pages have their own compact header. */
export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-b border-border px-4 py-3 sm:py-4">
      <Link href="/" className="text-[22px] whitespace-nowrap sm:text-[26px]" aria-label="Wittgenstein, played: home">
        <Wordmark />
      </Link>
      <nav aria-label="Site">
        <ul className="flex items-center gap-1 sm:gap-4">
          {NAV.map((n) => (
            <li key={n.href} className={n.href === "/#path" ? "hidden sm:block" : undefined}>
              <Link
                href={n.href}
                className="inline-flex min-h-11 items-center px-1.5 text-[15px] hover:underline underline-offset-4 sm:text-base"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
