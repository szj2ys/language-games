"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STONES = ["block", "pillar", "slab", "beam"] as const;

/** The first call of Slab!, playable on the landing page: the product, not a description of it. */
export function HomeDemo() {
  const [picked, setPicked] = useState<(typeof STONES)[number] | null>(null);
  const right = picked === "slab";
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-paper-deep">
        <Image src="/art/builder/site.webp" alt="" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        <div className="absolute bottom-[3%] left-[36%] h-[64%] w-[22%]">
          <Image src="/art/builder/builder-call.webp" alt="" fill sizes="160px" className="object-contain object-bottom" />
        </div>
        {right && (
          <div className="absolute bottom-[4%] left-[58%] h-[12%] w-[14%]">
            <Image src="/art/builder/slab.webp" alt="" fill sizes="80px" className="object-contain object-bottom" />
          </div>
        )}
        <p
          className="absolute top-[6%] left-[28%] rounded-2xl border border-ink/15 bg-card px-3 py-1 font-heading text-[clamp(20px,5vw,30px)] font-semibold shadow-sm"
          aria-live="polite"
        >
          {right ? "Good." : picked ? "No — slab!" : "Slab!"}
        </p>
      </div>
      {right ? (
        <div className="flex flex-col gap-2 rounded-xl bg-sage/15 p-3">
          <p className="text-[16px]">
            You just played Wittgenstein&apos;s first language-game: one word, and an action that gives it its meaning (
            <em>Philosophical Investigations</em> §2).
          </p>
          <Link href="/play/builder" className={cn(buttonVariants({ size: "lg" }), "h-12 self-start px-5 text-lg")}>
            Keep playing Slab! <ArrowRight className="size-5" aria-hidden />
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-1.5 text-[16px] font-bold">The builder calls. Bring him what he asks for:</p>
          <div className="grid grid-cols-4 gap-2" role="group" aria-label="Stones">
            {STONES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setPicked(s)}
                aria-pressed={picked === s}
                className={cn(
                  "flex min-h-20 flex-col items-center justify-center rounded-xl border-2 bg-card px-1 py-1.5 hover:border-ink/30",
                  picked === s ? "border-terracotta" : "border-border",
                )}
              >
                <span className="relative h-10 w-14">
                  <Image src={`/art/builder/${s}.webp`} alt="" fill sizes="60px" className="object-contain" />
                </span>
                <span className="text-[15px] font-bold">{s}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
