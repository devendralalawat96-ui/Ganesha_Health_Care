"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site, telHref } from "@/lib/site";

/** Desktop-only floating call button. WhatsApp lives in WhatsAppWidget; mobile uses MobileTabBar. */
export default function FloatingContact() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div
      className={`fixed bottom-6 right-24 z-40 hidden transition-all duration-300 sm:block ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <a
        href={telHref()}
        aria-label={`Call ${site.phoneDisplay}`}
        className="flex items-center gap-3 rounded-full bg-brand py-3 pl-3 pr-5 text-cream shadow-lg transition hover:bg-brand-dark hover:shadow-xl"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
          <path
            d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm font-semibold">Call Now</span>
      </a>
    </div>
  );
}
