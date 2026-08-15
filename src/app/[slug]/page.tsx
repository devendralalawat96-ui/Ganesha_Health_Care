import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { landingPages, getLanding } from "@/lib/landing";
import { getService } from "@/lib/services";
import { site, telHref, waHref } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return landingPages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const landing = getLanding(slug);
  if (!landing) return {};

  return {
    title: landing.title,
    description: landing.description,
    alternates: { canonical: `/${landing.slug}` },
  };
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const landing = getLanding(slug);
  if (!landing) notFound();

  const service = getService(landing.relatedService);
  const city = landing.city ?? site.city;
  const address = landing.address ?? site.address;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: landing.h1,
    description: landing.description,
    areaServed: { "@type": "City", name: city },
    provider: {
      "@type": "MedicalBusiness",
      name: site.name,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: city,
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
    },
  };

  return (
    <div className="container-page py-14">
      <h1 className="max-w-3xl text-3xl leading-tight">{landing.h1}</h1>
      <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-inksoft">{landing.intro}</p>

      <div className="mt-7 flex flex-wrap gap-3">
        <a href={telHref()} className="btn-primary">Call {site.phoneDisplay}</a>
        <a href={waHref(`Hi, I am looking for ${landing.h1.toLowerCase()}.`)} className="btn-outline">
          WhatsApp Us
        </a>
        <Link href="/book" className="btn-outline">Book a Caregiver</Link>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[13.5px]">
        <span className="font-semibold text-ink">{site.rating.value} ★</span>
        <span className="text-sage">from {site.rating.count} Google reviews · Available 24×7</span>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="text-xl">What we provide</h2>
          <ul className="mt-4 space-y-2.5">
            {landing.points.map((p) => (
              <li key={p} className="flex gap-3 text-[14.5px] leading-relaxed text-inksoft">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden>
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl">Why families in {city} choose us</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {[
              ["Police-verified staff", "Every caregiver is background checked before their first duty."],
              ["24×7 availability", "Someone answers the phone at any hour, including nights and holidays."],
              ["Replacement guarantee", "If the caregiver is not the right fit, we send a replacement."],
              ["Honest pricing", "The rate is confirmed before the duty begins, with nothing added later."],
            ].map(([title, body]) => (
              <div key={title}>
                <h3 className="text-[15px] font-semibold">{title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-inksoft">{body}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-xl">Areas we cover in {city}</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-inksoft">
            {landing.city
              ? `${city} and all surrounding localities.`
              : `${site.serviceAreas.join(", ")} and all surrounding localities.`}{" "}
            Our {landing.city ? `${city} branch` : "office"} is at {address}.
          </p>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card bg-brand-soft/40">
            <p className="font-serif text-lg">Talk to us today</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-inksoft">
              Describe the patient&apos;s situation and we will recommend the right level of care
              with an honest estimate.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a href={telHref()} className="btn-primary">Call {site.phoneDisplay}</a>
              <a href={waHref()} className="btn-outline">WhatsApp Us</a>
              <Link href="/pricing" className="btn-outline">Estimate the cost</Link>
            </div>
          </div>

          {service && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-sage">Full service details</p>
              <Link href={`/services/${service.slug}`} className="card mt-3 block transition hover:border-brand">
                <h3 className="text-[15px] font-semibold">{service.name}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-inksoft">{service.short}</p>
              </Link>
            </div>
          )}
        </aside>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
