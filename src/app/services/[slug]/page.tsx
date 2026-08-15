import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { site, telHref, waHref } from "@/lib/site";
import { serviceImage } from "@/lib/images";
import ShareButtons from "@/components/ShareButtons";
import ServiceIcon from "@/components/ServiceIcon";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: `${service.name} in ${site.city}`,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const message = `Hi, I need ${service.name} in ${site.city}. Please share the details.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.short,
    areaServed: { "@type": "City", name: site.city },
    provider: { "@type": "MedicalBusiness", name: site.name, telephone: site.phone },
  };

  return (
    <div className="container-page py-14">
      <nav className="text-[13px] text-sage" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="px-1.5">/</span>
        <Link href="/services" className="hover:text-brand">Services</Link>
        <span className="px-1.5">/</span>
        <span className="text-inksoft">{service.name}</span>
      </nav>

      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_320px]">
        <article>
          <div className="relative mb-8 aspect-[16/7] overflow-hidden rounded-2xl">
            <Image
              src={serviceImage(service.slug)}
              alt={`${service.name} in ${site.city}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-xl bg-white/95 text-brand backdrop-blur">
              <ServiceIcon slug={service.slug} className="h-5 w-5" />
            </span>
          </div>

          <h1 className="text-3xl">{service.name} in {site.city}</h1>
          <p className="mt-4 text-[15.5px] leading-relaxed text-inksoft">{service.intro}</p>

          <h2 className="mt-10 text-xl">What this service includes</h2>
          <ul className="mt-4 space-y-2.5">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-3 text-[14.5px] leading-relaxed text-inksoft">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden>
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl">Who this is for</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-inksoft">{service.goodFor}</p>

          <div className="mt-10 border-t border-line pt-6">
            <ShareButtons title={`${service.name} — ${site.name}`} path={`/services/${service.slug}`} />
          </div>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card bg-brand-soft/40">
            <p className="font-serif text-lg">Arrange {service.name.toLowerCase()}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-inksoft">
              Speak to us about the patient&apos;s condition and we will confirm a caregiver and an
              honest estimate.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a href={telHref()} className="btn-primary">Call {site.phoneDisplay}</a>
              <a href={waHref(message)} className="btn-outline">WhatsApp Us</a>
              <Link href="/book" className="btn-outline">Book a Caregiver</Link>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-sage">
              Available 24×7 across {site.city}, including nights and holidays.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage">Related services</p>
            <ul className="mt-3 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/services/${r.slug}`} className="text-sm text-inksoft hover:text-brand">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
