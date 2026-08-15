import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms on which ${site.name} provides home health care services in ${site.city}.`,
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="text-3xl">Terms of Service</h1>
      <p className="mt-2 text-[13px] text-sage">Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>

      <div className="prose-page mt-8 space-y-5">
        <p>
          These terms apply to home health care services provided by {site.name} in {site.city}. By
          booking a caregiver with us, you agree to them.
        </p>

        <h2 className="!mt-10 text-xl">Our services</h2>
        <p>
          We place trained caregivers, nurses and attendants at your home, and rent medical
          equipment. Our staff assist with the care duties agreed at the time of booking. They work
          under the direction of the patient&apos;s treating doctor and do not diagnose conditions
          or prescribe medication.
        </p>

        <h2 className="!mt-10 text-xl">Booking and rates</h2>
        <p>
          Rates depend on the type of care, shift length, the patient&apos;s condition and location.
          We confirm the applicable rate before a duty begins. Estimates shown by the cost
          calculator on this website are indicative only and are not a quotation.
        </p>

        <h2 className="!mt-10 text-xl">Payment</h2>
        <p>
          Invoices are raised for the period of care provided and are payable as agreed at booking.
          Payments may be made by UPI or by any other method we confirm in writing.
        </p>

        <h2 className="!mt-10 text-xl">Replacement of caregivers</h2>
        <p>
          If the caregiver assigned is not a suitable fit, tell us and we will arrange a replacement
          as soon as practicable. We may also replace a caregiver where necessary for operational
          reasons, and will inform you when we do.
        </p>

        <h2 className="!mt-10 text-xl">Cancellation</h2>
        <p>
          Let us know as early as possible if you need to cancel or shorten a placement. Charges for
          duty already performed remain payable.
        </p>

        <h2 className="!mt-10 text-xl">Your responsibilities</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-inksoft">
          <li>Give us accurate information about the patient&apos;s condition and needs</li>
          <li>Provide a safe working environment for our staff at the care location</li>
          <li>Tell us promptly of any change in the patient&apos;s condition</li>
          <li>Not ask our staff to perform duties outside what was agreed</li>
        </ul>

        <h2 className="!mt-10 text-xl">Equipment on rent</h2>
        <p>
          Rented equipment remains our property. You are responsible for its safe keeping during the
          rental period, and for loss or damage beyond normal wear.
        </p>

        <h2 className="!mt-10 text-xl">Limitation of liability</h2>
        <p>
          We take reasonable care in training, verifying and placing our staff. We are not liable
          for the outcome of any medical condition, or for decisions taken by the patient&apos;s
          doctors. Nothing in these terms excludes liability that cannot be excluded by law.
        </p>

        <h2 className="!mt-10 text-xl">Governing law</h2>
        <p>
          These terms are governed by the laws of India, and disputes fall under the jurisdiction of
          the courts at Indore, Madhya Pradesh.
        </p>

        <h2 className="!mt-10 text-xl">Contact</h2>
        <p>
          {site.name}
          <br />
          {site.address}
          <br />
          Phone: {site.phoneDisplay}
        </p>
      </div>
    </div>
  );
}
