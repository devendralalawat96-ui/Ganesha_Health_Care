import type { Metadata } from "next";
import Link from "next/link";
import { site, telHref, waHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false, follow: false },
};

export default function BookingThankYouPage() {
  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6" aria-hidden>
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <h1 className="mt-6 text-[clamp(26px,4vw,34px)]">We have your request</h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-inksoft">
          Someone from our team will call you shortly to understand the patient&apos;s needs and
          confirm a caregiver. If it is urgent, calling us is the fastest way to reach someone.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={telHref()} className="btn-primary">Call {site.phoneDisplay}</a>
          <a href={waHref("Hi, I just submitted a booking request.")} className="btn-outline">
            Message on WhatsApp
          </a>
        </div>

        <p className="mt-8 text-[13.5px] text-sage">
          <Link href="/" className="font-medium text-brand hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
