import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/TrustStrip";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import ServiceIcon from "@/components/ServiceIcon";
import ReviewCarousel from "@/components/ReviewCarousel";
import ServiceScroller from "@/components/ServiceScroller";
import { getGoogleReviews } from "@/lib/google-reviews";
import { allVerified } from "@/lib/reviews";
import { site, telHref, waHref } from "@/lib/site";
import { services } from "@/lib/services";
import { img, serviceImage } from "@/lib/images";

const reasons = [
  { title: "Police-verified staff", body: "Every caregiver is background checked before they enter your home." },
  { title: "Experienced nurses", body: "Trained in clinical procedures, not just general assistance." },
  { title: "24×7 support", body: "Someone answers the phone at any hour, including nights and holidays." },
  { title: "Emergency service", body: "Same-day caregiver placement when the situation cannot wait." },
  { title: "Replacement guarantee", body: "If a caregiver is not the right fit, we send a replacement." },
  { title: "Male & female caregivers", body: "Choose the caregiver gender your family is comfortable with." },
];

const steps = [
  { n: "01", title: "Tell us the situation", body: "Call or WhatsApp us with the patient's condition, location and how soon you need help." },
  { n: "02", title: "We match a caregiver", body: "We pick someone trained for that specific need — not simply whoever is free." },
  { n: "03", title: "Care begins at home", body: "The caregiver arrives on schedule. If the fit is wrong, we replace them." },
];

export default async function HomePage() {
  const { reviews, rating, count } = await getGoogleReviews();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <Reveal>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brand">
              {site.motto}
            </p>

            <p className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="font-deva text-[clamp(18px,2.4vw,23px)] font-medium text-brand" lang="sa">
                &ldquo;{site.mottoSanskrit}&rdquo;
              </span>
              <span className="text-[12.5px] text-sage">{site.mottoSanskritGloss}</span>
            </p>

            <h1 className="mt-4 text-[clamp(34px,5.8vw,54px)] font-bold leading-[1.05]">
              Quality Care
              <br />
              Right at Home <span aria-hidden>💚</span>
            </h1>

            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-inksoft">
              Professional nursing and caregiving services for your loved ones. Because every
              life deserves care and dignity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={telHref()} className="btn-primary shadow-sm">
                Call Now
              </a>
              <a href={waHref()} className="btn-outline">WhatsApp Us</a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-white/60 p-5 sm:flex sm:flex-wrap sm:gap-x-8">
              {[
                { label: "Police Verified\nStaff", icon: "shield" },
                { label: "24/7\nAvailable", icon: "clock" },
                { label: "Care at\nHome", icon: "home" },
                { label: "Compassionate\nCare", icon: "heart" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-brand">
                    {item.icon === "shield" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5.5 w-5.5" aria-hidden>
                        <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.icon === "clock" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5.5 w-5.5" aria-hidden>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.icon === "home" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5.5 w-5.5" aria-hidden>
                        <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.5 10v9a1 1 0 0 0 1 1H17.5a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.5 20v-4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V20" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.icon === "heart" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5.5 w-5.5" aria-hidden>
                        <path d="M12 21s-6.5-5.1-6.5-10a6.5 6.5 0 1 1 13 0c0 4.9-6.5 10-6.5 10Z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <p className="whitespace-pre-line text-[15px] font-semibold leading-tight text-ink">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/5]">
              <Image
                src={img.hero}
                alt="A trained caregiver supporting an elderly patient at home"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-5 -left-4 max-w-[240px] rounded-2xl border border-line bg-white/95 p-4 shadow-lg backdrop-blur sm:-left-6">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft text-brand">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-[13px] font-semibold leading-tight">Police-verified</p>
                  <p className="text-[11.5px] text-sage">Every caregiver, before duty</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom info strip */}
        <div className="border-t border-line bg-brand-soft/40">
          <div className="container-page grid grid-cols-2 gap-x-6 gap-y-5 py-6 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            <a href={telHref()} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-cream">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-[14px] text-inksoft">Call Us</span>
                <span className="block text-[16px] font-semibold">{site.phoneDisplay}</span>
              </span>
            </a>

            <span className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-cream">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M12 21s-6.5-5.1-6.5-10a6.5 6.5 0 1 1 13 0c0 4.9-6.5 10-6.5 10Z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="11" r="2.4" />
                </svg>
              </span>
              <span>
                <span className="block text-[14px] text-inksoft">Serving</span>
                <span className="block text-[16px] font-semibold">{site.city} &amp; Nearby Areas</span>
              </span>
            </span>

            <span className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-cream">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-[14px] text-inksoft">Trusted by</span>
                <span className="block text-[16px] font-semibold">
                  <CountUp to={site.stats.patientsServed} suffix="+" /> Happy Families
                </span>
              </span>
            </span>

            <span className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-cream">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-[14px] text-inksoft">24x7 Support</span>
                <span className="block text-[16px] font-semibold">Always Here for You</span>
              </span>
            </span>

            <span className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-cream text-[15px] font-bold">
                {rating}★
              </span>
              <span>
                <span className="block text-[14px] text-inksoft">Google Rating</span>
                <span className="block text-[16px] font-semibold">{count} Reviews</span>
              </span>
            </span>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Services */}
      <section className="container-page py-11 sm:py-14 lg:py-20">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">What we do</p>
              <h2 className="mt-2 text-[clamp(24px,3.2vw,32px)]">Care for every situation</h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-inksoft">
                From a few hours of daily support to round-the-clock critical care — every service
                is delivered by trained, verified staff at your home.
              </p>
            </div>
            <Link href="/services" className="hidden shrink-0 text-sm font-semibold text-brand hover:underline sm:block">
              View all {services.length} →
            </Link>
          </div>
        </Reveal>

        {/* Mobile: swipeable cards + collapsible list */}
        <div className="mt-8 lg:hidden">
          <ServiceScroller
            featured={services.slice(0, 6)}
            rest={services.slice(6)}
            imageFor={Object.fromEntries(services.map((s) => [s.slug, serviceImage(s.slug)]))}
          />
        </div>

        <div className="mt-10 hidden gap-4 lg:grid lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <Link
                href={`/services/${s.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:border-brand hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={serviceImage(s.slug)}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
                    <ServiceIcon slug={s.slug} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-[16.5px] font-semibold">{s.name}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-inksoft">{s.short}</p>
                  <span className="mt-3 inline-block text-[13px] font-semibold text-brand">
                    Learn more →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Compact icon list for the rest — desktop only */}
        <Reveal>
          <div className="mt-6 hidden gap-2 lg:grid lg:grid-cols-3">
            {services.slice(6).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 transition hover:border-brand hover:bg-brand-soft/30"
              >
                <span className="text-brand">
                  <ServiceIcon slug={s.slug} className="h-5 w-5" />
                </span>
                <span className="text-[14px] font-medium">{s.name}</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-white py-11 sm:py-14 lg:py-20">
        <div className="container-page">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">How it works</p>
            <h2 className="mt-2 text-[clamp(24px,3.2vw,32px)]">Care arranged in three steps</h2>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="relative">
                  <span className="font-serif text-4xl text-brand/25">{s.n}</span>
                  <h3 className="mt-2 text-[17px] font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-inksoft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us + image */}
      <section className="container-page py-11 sm:py-14 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto aspect-[4/3] max-w-[420px] overflow-hidden rounded-3xl lg:aspect-[3/4] lg:max-w-none">
              <Image
                src={img.realCaregiverClient}
                alt="A Ganesha caregiver with an elderly client"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">Why families trust us</p>
            <h2 className="mt-2 text-[clamp(24px,3.2vw,32px)]">
              Choosing a caregiver is a question of trust
            </h2>
            <div className="mt-7 grid gap-x-5 gap-y-3.5 sm:grid-cols-2 sm:gap-y-5">
              {reasons.map((r, i) => (
                <div key={r.title} className="flex gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden>
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <h3 className="text-[14.5px] font-semibold">{r.title}</h3>
                    {/* Only the first three carry a description on mobile — keeps the
                        section from running past a screen on a phone. */}
                    <p
                      className={`mt-1 text-[13px] leading-relaxed text-inksoft ${
                        i > 2 ? "hidden sm:block" : ""
                      }`}
                    >
                      {r.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/why-choose-us" className="mt-7 inline-block text-sm font-semibold text-brand hover:underline">
              More reasons to trust us →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-line bg-white py-11 sm:py-14 lg:py-20">
        <div className="container-page">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">Testimonials</p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[clamp(24px,3.2vw,32px)]">What families say</h2>
              <div className="flex flex-wrap items-center gap-2.5">

              <a
                href={site.gbpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 transition hover:border-brand hover:shadow-sm"
              >
                <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden>
                  <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.6 7l-.1.3 6.7 5.2.5.1c4.3-4 6.5-9.8 6.5-15.9Z" />
                  <path fill="#34A853" d="M24 46c6.1 0 11.2-2 14.9-5.5l-7.1-5.5c-1.9 1.3-4.4 2.2-7.8 2.2-6 0-11-3.9-12.8-9.3l-.3.1-6.9 5.4-.1.3C7.6 40.9 15.2 46 24 46Z" />
                  <path fill="#FBBC05" d="M11.2 27.9c-.5-1.4-.8-3-.8-4.6s.3-3.2.7-4.6v-.4l-7-5.4-.2.1A22 22 0 0 0 2 23.3c0 3.5.9 6.9 2.3 9.9l6.9-5.3Z" />
                  <path fill="#EA4335" d="M24 9.5c4.3 0 7.2 1.8 8.8 3.4l6.4-6.2C35.2 3.2 30.1 1 24 1 15.2 1 7.6 6.1 4.2 13.4l6.9 5.4C13 13.4 18 9.5 24 9.5Z" />
                </svg>
                <span className="text-[14px] font-bold text-ink">{rating}</span>
                <span className="flex gap-0.5" aria-hidden>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "fill-[#FBBC04]" : "fill-line"}`}>
                      <path d="m12 17.3-6.2 3.7 1.7-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.5 4.8 1.7 7z" />
                    </svg>
                  ))}
                </span>
                <span className="text-[12.5px] text-sage group-hover:text-brand">
                  {count} reviews
                </span>
              </a>
              <a
                href={site.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 transition hover:border-brand hover:shadow-sm"
              >
                <span className="grid h-5 w-5 place-items-center rounded bg-[#1B8B3A] text-[10px] font-bold text-white">
                  JD
                </span>
                <span className="text-[14px] font-bold text-ink">{site.justdialRating.value}</span>
                <span className="text-[12.5px] text-sage group-hover:text-brand">
                  {site.justdialRating.count} ratings
                </span>
              </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-8">
            <ReviewCarousel reviews={reviews} showGoogleBranding={allVerified} />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-line bg-white px-6 py-5 text-center">
            <p className="text-[14px] text-inksoft">
              Cared for someone in your family? A review helps other families find us.
            </p>
            <a
              href={site.gbpReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13.5px] font-semibold text-ink transition hover:border-brand hover:text-brand"
            >
              <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden>
                <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.6 7l-.1.3 6.7 5.2.5.1c4.3-4 6.5-9.8 6.5-15.9Z" />
                <path fill="#34A853" d="M24 46c6.1 0 11.2-2 14.9-5.5l-7.1-5.5c-1.9 1.3-4.4 2.2-7.8 2.2-6 0-11-3.9-12.8-9.3l-.3.1-6.9 5.4-.1.3C7.6 40.9 15.2 46 24 46Z" />
                <path fill="#FBBC05" d="M11.2 27.9c-.5-1.4-.8-3-.8-4.6s.3-3.2.7-4.6v-.4l-7-5.4-.2.1A22 22 0 0 0 2 23.3c0 3.5.9 6.9 2.3 9.9l6.9-5.3Z" />
                <path fill="#EA4335" d="M24 9.5c4.3 0 7.2 1.8 8.8 3.4l6.4-6.2C35.2 3.2 30.1 1 24 1 15.2 1 7.6 6.1 4.2 13.4l6.9 5.4C13 13.4 18 9.5 24 9.5Z" />
              </svg>
              Write a review on Google
            </a>
          </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page py-11 sm:py-14 lg:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand px-8 py-14 text-center text-cream sm:px-12">
            <div className="absolute inset-0 opacity-15">
              <Image src={img.nurse} alt="" fill sizes="100vw" className="object-cover" />
            </div>
            <div className="relative">
              <h2 className="text-[clamp(24px,3.4vw,34px)] text-cream">Not sure which service you need?</h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-cream/85">
                Tell us about the patient and we will recommend the right level of care — with an
                honest estimate before you commit to anything.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={telHref()} className="btn bg-cream text-brand hover:bg-white">
                  Call {site.phoneDisplay}
                </a>
                <a href={waHref()} className="btn border border-cream/40 text-cream hover:bg-white/10">
                  WhatsApp Us
                </a>
                <Link href="/book" className="btn border border-cream/40 text-cream hover:bg-white/10">
                  Book a Caregiver
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
