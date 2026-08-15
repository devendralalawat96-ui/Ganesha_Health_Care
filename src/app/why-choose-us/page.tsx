import type { Metadata } from "next";
import Link from "next/link";
import { site, telHref, waHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description: `Police-verified staff, experienced nurses, 24×7 emergency service and a replacement guarantee — why families in ${site.city} trust ${site.shortName}.`,
};

const reasons = [
  {
    title: "Police-verified staff",
    body: "You are letting someone into your home, often to care for a parent who cannot advocate for themselves. Every caregiver we place has been through police verification before their first duty.",
  },
  {
    title: "Experienced nurses",
    body: "Our nurses are trained in real clinical procedures — IV drips, catheter care, wound dressing, tracheostomy suction — not just general assistance.",
  },
  {
    title: "Background checked",
    body: "Beyond police verification, we check previous employment and references so you know the history of the person on duty.",
  },
  {
    title: "24×7 support",
    body: "Someone answers the phone at any hour. Deterioration and discharge do not wait for office timings, and neither does our line.",
  },
  {
    title: "Emergency service",
    body: "Same-day caregiver placement when a hospital discharge or a sudden change at home cannot wait for a scheduled appointment.",
  },
  {
    title: "Affordable pricing",
    body: "Clear rates quoted before the duty starts. You will know what a shift costs before you commit, with no charges added afterwards.",
  },
  {
    title: "Female & male caregivers available",
    body: "Many families have a firm preference about the caregiver's gender, particularly for bathing and personal care. You choose.",
  },
  {
    title: "Replacement guarantee",
    body: "If the caregiver is not the right fit for your patient, tell us and we send a replacement. You are not locked into a bad match.",
  },
  {
    title: "On-time service",
    body: "Shift handovers happen on schedule. A caregiver who arrives late leaves a patient unattended, and we treat that as a serious failure.",
  },
];

export default function WhyChooseUsPage() {
  return (
    <div className="container-page py-14">
      <h1 className="text-3xl">Why families in {site.city} choose us</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-inksoft">
        Choosing a home caregiver is a question of trust before it is a question of price. Here is
        what we hold ourselves to.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <div key={r.title}>
            <h2 className="text-[15.5px] font-semibold">{r.title}</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-inksoft">{r.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-brand px-8 py-10 text-center text-cream">
        <h2 className="text-2xl text-cream">Ready to arrange care?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cream/80">
          Tell us about the patient and we will recommend the right level of care with an honest
          estimate.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
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
  );
}
