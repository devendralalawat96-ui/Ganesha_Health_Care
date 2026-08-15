import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, telHref } from "@/lib/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.name} has provided trained home nursing and elderly care in ${site.city} for over ${site.stats.yearsExperience} years.`,
};

export default function AboutPage() {
  return (
    <div className="container-page py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">About us</p>
        <h1 className="mt-2 text-[clamp(28px,4vw,40px)]">{site.name}</h1>
        <p className="mt-2 font-deva text-sm text-sage" lang="hi">{site.nameHindi}</p>
        <p className="mt-3 font-deva text-[15px] font-medium text-brand" lang="sa">
          &ldquo;{site.mottoSanskrit}&rdquo;
        </p>
        <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-inksoft">
          Trained, police-verified caregivers serving families across {site.cities.length} cities
          in Madhya Pradesh — from a few hours of daily support to round-the-clock critical care.
        </p>
      </div>

      {/* Founder's message */}
      <div className="mb-12 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="grid gap-0 sm:grid-cols-[260px_1fr]">
          <div className="relative aspect-[2/3] sm:aspect-auto">
            <Image
              src={img.founderDevendra}
              alt="Devendra Lalawat, Founder & Director of Ganesha Home Health Care Services"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 260px"
              className="object-cover object-top"
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">
              Founder&apos;s message
            </p>
            <blockquote className="mt-3 text-[15px] italic leading-relaxed text-inksoft sm:text-[16px]">
              &ldquo;With a strong vision for accessible and compassionate healthcare, I founded
              Ganesha Home Health Care Services with a commitment to bringing professional
              healthcare closer to patients and their families. My approach is built on three
              core principles: Quality Care, Trust, and Compassion. We strive to deliver
              dependable home healthcare solutions that prioritize patient dignity, safety,
              comfort, and individual needs — so that patients receive professional support in
              the familiar surroundings of their own home, while families gain confidence and
              peace of mind.&rdquo;
            </blockquote>
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-brand">
              Committed to Care. Driven by Trust. Dedicated to Better Living.
            </p>
            <div className="mt-5 border-t border-line pt-4">
              <p className="font-semibold text-ink">Devendra Lalawat</p>
              <p className="text-[13px] text-sage">Founder &amp; Director, {site.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="prose-page space-y-5">
          <p>
            Ganesha Home Health Care Services began with a simple observation: most families in{" "}
            {site.city} would rather care for a parent or patient at home than in a hospital ward —
            but they do not have the training, the equipment, or the hours in the day to do it
            safely on their own.
          </p>
          <p>
            We started as a small team of nurses taking on home duty in Bajrang Nagar. Today we
            place trained caregivers across {site.city} for everything from a few hours of elderly
            support to full ICU setups at home, and we run a nursing institute that trains the next
            set of caregivers ourselves.
          </p>

          <h2 className="!mt-10 text-xl">Our mission</h2>
          <p>
            To make professional, dignified care available at home — so that recovery and old age
            happen surrounded by family instead of strangers, without compromising on clinical
            standards.
          </p>

          <h2 className="!mt-10 text-xl">Our vision</h2>
          <p>
            To be the home health care service families in central India recommend to each other,
            known for staff who are properly trained, properly verified, and genuinely kind.
          </p>

          <h2 className="!mt-10 text-xl">How we work</h2>
          <p>
            Every caregiver is background checked before placement. We match the caregiver to the
            patient&apos;s actual condition rather than sending whoever is free, and if the fit is
            not right, we replace them. Families can reach us at any hour — care does not keep
            office timings, and neither do we.
          </p>

          <figure className="not-prose mt-8 max-w-[320px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={img.realTeam}
                alt="Ganesha Home Health Care caregivers at the Indore office"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-2 text-[12px] text-sage">
              Our caregiving team at the Bajrang Nagar office, Indore
            </figcaption>
          </figure>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage">By the numbers</p>
            <dl className="mt-4 space-y-4">
              {[
                [`${site.stats.yearsExperience}+`, "Years of experience"],
                [`${site.stats.patientsServed.toLocaleString("en-IN")}+`, "Patients served"],
                [`${site.stats.caregivers}+`, "Trained caregivers"],
                [`${site.stats.citiesCovered}`, "Cities covered"],
                [`${site.rating.value} ★`, `From ${site.rating.count} Google reviews`],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-serif text-2xl text-brand">{value}</dt>
                  <dd className="text-xs text-inksoft">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="card mt-6 bg-brand-soft/40">
            <p className="font-serif text-base">Talk to us</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-inksoft">
              We are based in {site.locality} and serve all of {site.city}.
            </p>
            <a href={telHref()} className="btn-primary mt-4 w-full">
              Call {site.phoneDisplay}
            </a>
            <Link href="/contact" className="btn-outline mt-2 w-full">
              Contact details
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
