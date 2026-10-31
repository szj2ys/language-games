import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 px-6">
      <p className="font-heading text-vermilion">Philosophical Investigations §309</p>
      <h1 className="font-heading text-4xl font-medium">This page is a fly-bottle.</h1>
      <p className="text-[17px] leading-relaxed">
        “What is your aim in philosophy?—To shew the fly the way out of the fly-bottle.” The page you wanted is not here. The way out:
      </p>
      <Link href="/" className="self-start rounded-lg bg-vermilion px-5 py-3 text-lg font-bold text-primary-foreground">
        Back to the path
      </Link>
    </main>
  );
}
