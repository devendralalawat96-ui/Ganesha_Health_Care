import type { Metadata } from "next";
import CostCalculator from "@/components/CostCalculator";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cost Calculator",
  description: `Estimate what home nursing or elderly care costs in ${site.city} before you call. Indicative rates by care type, shift and duration.`,
};

export default function PricingPage() {
  return (
    <div className="container-page py-14">
      <h1 className="text-3xl">What will care cost?</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-inksoft">
        Pick the type of care, the shift and how long you need it. You will get an indicative
        figure straight away — no phone call needed to find out the rough number.
      </p>

      <div className="mt-10">
        <CostCalculator />
      </div>

      <div className="mt-14 border-t border-line pt-8">
        <h2 className="text-xl">What affects the final price</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "The patient's condition and how much clinical skill the duty needs",
            "Whether the shift is day, night or full 24-hour cover",
            "How long the placement runs — longer bookings get better rates",
            "Distance from our Bajrang Nagar office within " + site.city,
            "Any equipment rented alongside the caregiver",
            "Public holidays and emergency same-day placement",
          ].map((f) => (
            <li key={f} className="flex gap-2.5 text-[14px] leading-relaxed text-inksoft">
              <span className="mt-0.5 text-brand">•</span>
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[14px] leading-relaxed text-inksoft">
          For an exact quote, call{" "}
          <a href={telHref()} className="font-semibold text-brand hover:underline">
            {site.phoneDisplay}
          </a>{" "}
          and describe the patient&apos;s situation. We will give you a firm rate before anything
          is booked.
        </p>
      </div>
    </div>
  );
}
