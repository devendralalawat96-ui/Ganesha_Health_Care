import Link from "next/link";
import { site, telHref, waHref } from "@/lib/site";
import { services } from "@/lib/services";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-lg">{site.name}</p>
          <p className="mt-1 font-deva text-sm text-sage" lang="hi">{site.nameHindi}</p>
          <p className="mt-2 font-deva text-[14px] font-medium text-brand" lang="sa">
            &ldquo;{site.mottoSanskrit}&rdquo;
          </p>
          <p className="text-[12px] text-sage">{site.mottoSanskritGloss}</p>
          <p className="mt-3 text-sm leading-relaxed text-inksoft">{site.address}</p>
          <p className="mt-3 text-sm text-inksoft">
            <a href={telHref()} className="font-semibold text-brand hover:underline">
              {site.phoneDisplay}
            </a>
          </p>
          <p className="mt-1 text-sm text-sage">{site.hours}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sage">Popular Services</p>
          <ul className="mt-3 space-y-2">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-inksoft hover:text-brand">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sage">Company</p>
          <ul className="mt-3 space-y-2">
            {[
              { href: "/about", label: "About Us" },
              { href: "/why-choose-us", label: "Why Choose Us" },
              { href: "/caregivers", label: "Our Caregivers" },
              { href: "/institute", label: "Nursing Institute" },
              { href: "/testimonials", label: "Testimonials" },
              { href: "/faqs", label: "FAQs" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-inksoft hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sage">Get Care Today</p>
          <div className="mt-3 flex flex-col gap-2">
            <a href={telHref()} className="btn-primary">
              Call {site.phoneDisplay}
            </a>
            <a href={waHref()} className="btn-outline">
              Chat on WhatsApp
            </a>
            <Link href="/book" className="btn-outline">
              Book a Caregiver
            </Link>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-inksoft transition hover:text-brand"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
            {site.instagramHandle}
          </a>
          <a
            href={site.justdial}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-inksoft transition hover:text-brand"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden>
              <path d="M12 21s-6.5-5.1-6.5-10a6.5 6.5 0 1 1 13 0c0 4.9-6.5 10-6.5 10Z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="11" r="2.4" />
            </svg>
            Find us on JustDial
          </a>
          <p className="mt-4 text-xs leading-relaxed text-sage">
            Serving {site.serviceAreas.slice(0, 4).join(", ")} and all of {site.city}.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-sage">
            Also covering {site.cities.filter((c) => c !== site.city).join(", ")}.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-sage sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <nav className="flex gap-4" aria-label="Legal">
            <Link href="/privacy" className="hover:text-brand">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand">Terms</Link>
            <Link href="/disclaimer" className="hover:text-brand">Disclaimer</Link>
          </nav>
        </div>
      </div>

      <div className="h-16 sm:hidden" />
    </footer>
  );
}
