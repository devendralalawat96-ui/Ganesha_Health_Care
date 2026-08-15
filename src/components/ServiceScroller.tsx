"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import type { Service } from "@/lib/services";

/**
 * Mobile-only: featured services swipe horizontally, the rest collapse behind a
 * toggle. Keeps the homepage from becoming a 4-screen wall of stacked cards.
 * Desktop renders the full grid from page.tsx instead.
 */
export default function ServiceScroller({
  featured,
  rest,
  imageFor,
}: {
  featured: Service[];
  rest: Service[];
  imageFor: Record<string, string>;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {featured.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="w-[78%] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={imageFor[s.slug]}
                alt=""
                fill
                sizes="80vw"
                className="object-cover"
              />
              <span className="absolute bottom-2.5 left-2.5 grid h-9 w-9 place-items-center rounded-xl bg-white/95 text-brand backdrop-blur">
                <ServiceIcon slug={s.slug} className="h-4.5 w-4.5" />
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-[15.5px] font-semibold">{s.name}</h3>
              <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-inksoft">{s.short}</p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-1 flex items-center gap-1.5 text-[12px] text-sage">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Swipe for more
      </p>

      {expanded && (
        <ul className="mt-4 grid gap-2">
          {rest.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3"
              >
                <span className="text-brand">
                  <ServiceIcon slug={s.slug} className="h-5 w-5" />
                </span>
                <span className="text-[14px] font-medium">{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-brand px-4 py-3 text-[14px] font-semibold text-brand"
      >
        {expanded ? "Show fewer" : `Show all ${featured.length + rest.length} services`}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
