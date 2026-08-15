"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useState } from "react";
import { site, telHref, waHref } from "@/lib/site";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/institute", label: "Nursing Institute" },
  { href: "/caregivers", label: "Our Caregivers" },
  { href: "/pricing", label: "Cost Calculator" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/95 backdrop-blur">
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9 shrink-0 text-brand" />
          <span className="leading-tight">
            <span className="block font-serif text-[15px] font-medium">{site.shortName}</span>
            <span className="block text-[11px] text-sage">{site.city} · 24×7</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-inksoft hover:text-brand">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a href={telHref()} className="btn-outline !px-4 !py-2">
            Call Now
          </a>
          <a href={waHref()} className="btn-primary !px-4 !py-2">
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-line p-2 lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-cream lg:hidden">
          <nav className="container-page flex flex-col py-2" aria-label="Mobile">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-sm font-medium text-inksoft last:border-0"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
