import type { Metadata } from "next";
import { site, telHref, waHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs",
  description: `Common questions about home nursing and caregiver services in ${site.city} — response time, staff verification, night duty, pricing and replacements.`,
};

const faqs = [
  {
    q: "How quickly can a nurse arrive?",
    a: "For most requests in Indore we can place a caregiver the same day. Emergency and hospital-discharge cases are prioritised — call us rather than filling the form, and we will tell you honestly how soon someone can reach you.",
  },
  {
    q: "Is the staff verified?",
    a: "Yes. Every caregiver goes through police verification and a background check before their first duty, and we check previous employment references. You can ask to see the verification details of the person assigned to you.",
  },
  {
    q: "Do you provide caregivers at night?",
    a: "Yes. We run 12-hour night shifts and full 24-hour cover, including on Sundays and public holidays. Night duty is one of our most requested services because it is when families most need relief.",
  },
  {
    q: "What are your charges?",
    a: "Rates depend on the type of care, the shift length and the patient's condition. Use the cost calculator on this site for an indicative figure, then call us for a firm quote. We confirm the rate before the duty begins and do not add charges afterwards.",
  },
  {
    q: "Can I change the caregiver if it is not working out?",
    a: "Yes — this is our replacement guarantee. If the caregiver is not the right fit for your patient, tell us and we will send a replacement. You are not locked into a match that is not working.",
  },
  {
    q: "Do you handle emergencies?",
    a: "We take emergency and same-day placement requests 24 hours a day. For a genuine medical emergency, call an ambulance first — then call us to arrange ongoing care at home.",
  },
  {
    q: "Which areas of Indore do you cover?",
    a: `We serve all of ${site.city}, including ${site.serviceAreas.slice(0, 5).join(", ")} and surrounding localities. If you are just outside the city, call and ask — we often can still help.`,
  },
  {
    q: "Do you provide medical equipment as well?",
    a: "Yes. Oxygen concentrators, hospital beds, wheelchairs, walkers, BiPAP and CPAP machines and air mattresses are available on rent, with delivery, installation and collection included.",
  },
];

export default function FaqsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="container-page py-14">
      <h1 className="text-3xl">Frequently asked questions</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-inksoft">
        The questions families ask us most often, answered plainly.
      </p>

      <div className="mt-10 divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15.5px] font-semibold">
              {f.q}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-1 h-4 w-4 shrink-0 text-brand transition group-open:rotate-45"
                aria-hidden
              >
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-inksoft">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href={telHref()} className="btn-primary">Call {site.phoneDisplay}</a>
        <a href={waHref()} className="btn-outline">Ask on WhatsApp</a>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
