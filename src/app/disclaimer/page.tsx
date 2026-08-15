import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Medical and content disclaimer for ${site.name}.`,
};

export default function DisclaimerPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="text-3xl">Disclaimer</h1>
      <p className="mt-2 text-[13px] text-sage">Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>

      <div className="prose-page mt-8 space-y-5">
        <h2 className="text-xl">Not medical advice</h2>
        <p>
          The care guides and other information on this website are general guidance for families
          caring for someone at home. They are not medical advice and are not a substitute for
          consulting a qualified doctor.
        </p>
        <p>
          Always follow the instructions of the patient&apos;s treating physician. Never delay
          seeking medical attention because of something you have read here. In an emergency, call
          an ambulance or go to the nearest hospital immediately.
        </p>

        <h2 className="!mt-10 text-xl">Scope of our staff&apos;s role</h2>
        <p>
          Our caregivers, attendants and nurses carry out care duties under the direction of the
          patient&apos;s treating doctor. They do not diagnose conditions, prescribe medication, or
          alter a prescribed treatment plan.
        </p>

        <h2 className="!mt-10 text-xl">Pricing estimates</h2>
        <p>
          Figures produced by the cost calculator on this website are indicative only. They are not
          a quotation and do not create any obligation on either side. Actual rates are confirmed
          before a duty begins.
        </p>

        <h2 className="!mt-10 text-xl">Accuracy of information</h2>
        <p>
          We make reasonable efforts to keep this website accurate and current, but we do not
          warrant that all content is complete or error-free. Service details, course information
          and availability may change without notice.
        </p>

        <h2 className="!mt-10 text-xl">External links</h2>
        <p>
          This website may link to third-party sites such as Google Forms, Google Maps and WhatsApp.
          We are not responsible for the content or practices of those services.
        </p>

        <h2 className="!mt-10 text-xl">Contact</h2>
        <p>
          Questions about this disclaimer can be directed to {site.name}, {site.address}, or by
          phone on {site.phoneDisplay}.
        </p>
      </div>
    </div>
  );
}
