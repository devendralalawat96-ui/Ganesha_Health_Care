import type { Metadata } from "next";
import { site, telHref, waHref } from "@/lib/site";
import { services } from "@/lib/services";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Book a Caregiver",
  description: `Request a trained, verified caregiver at home in ${site.city}. Fill the form or call ${site.phoneDisplay} — available 24×7.`,
};

const assurances = [
  { title: "We call you back", body: "Usually within a couple of hours, to understand the patient's needs." },
  { title: "Police-verified staff", body: "Every caregiver is background checked before they enter your home." },
  { title: "Replacement guarantee", body: "If the caregiver is not the right fit, we send someone else." },
  { title: "No advance payment", body: "Nothing is charged until a caregiver is confirmed and placed." },
];

export default function BookPage() {
  return (
    <div className="container-page py-11 sm:py-14">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">Book a caregiver</p>
        <h1 className="mt-2 text-[clamp(28px,4vw,40px)]">Tell us what care you need</h1>
        <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-inksoft">
          Share a few details and we will match a trained, verified caregiver — usually confirming
          the same day. In an emergency, calling is faster than the form.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={telHref()} className="btn-primary">Call {site.phoneDisplay}</a>
          <a href={waHref("Hi, I would like to book a caregiver.")} className="btn-outline">
            Book over WhatsApp
          </a>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
        <Reveal>
          <div className="card">
            <BookingForm
              services={services.map((s) => s.name)}
              email={site.bookingEmail}
            />
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:sticky lg:top-24 lg:self-start">
          <div className="card bg-brand-soft/30">
            <p className="font-serif text-base">What happens next</p>
            <ul className="mt-4 space-y-4">
              {assurances.map((a) => (
                <li key={a.title} className="flex gap-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden>
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="text-[13.5px] font-semibold">{a.title}</p>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-inksoft">{a.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage">We serve</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-inksoft">
              {site.cities.join(", ")}.
            </p>
            <p className="mt-3 text-[12.5px] text-sage">{site.hours}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
