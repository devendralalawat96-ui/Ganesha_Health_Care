import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/services";
import { site, telHref } from "@/lib/site";
import { serviceImage } from "@/lib/images";
import ServiceIcon from "@/components/ServiceIcon";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Services",
  description: `Home nursing, elderly care, bedridden patient care, ICU setup at home, physiotherapy and medical equipment rental in ${site.city}.`,
};

export default function ServicesPage() {
  return (
    <div className="container-page py-14">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">What we do</p>
        <h1 className="mt-2 text-[clamp(28px,4vw,40px)]">Our Services</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-inksoft">
          Every service below is delivered at your home by trained, police-verified staff. Not sure
          which one fits? Call us on{" "}
          <a href={telHref()} className="font-semibold text-brand hover:underline">
            {site.phoneDisplay}
          </a>{" "}
          and we will help you decide.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 70}>
            <Link
              href={`/services/${s.slug}`}
              className="group block h-full overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:border-brand hover:shadow-lg"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={serviceImage(s.slug)}
                  alt={`${s.name} in ${site.city}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-xl bg-white/95 text-brand backdrop-blur">
                  <ServiceIcon slug={s.slug} className="h-5 w-5" />
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-[16px] font-semibold">{s.name}</h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-inksoft">{s.short}</p>
                <span className="mt-3 inline-block text-[13px] font-semibold text-brand">
                  Learn more →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
