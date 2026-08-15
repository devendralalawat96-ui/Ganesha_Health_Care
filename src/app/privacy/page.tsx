import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the personal and health information you share with us.`,
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="text-3xl">Privacy Policy</h1>
      <p className="mt-2 text-[13px] text-sage">Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>

      <div className="prose-page mt-8 space-y-5">
        <p>
          {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides home health care services in{" "}
          {site.city}. This policy explains what information we collect when you contact us or use
          this website, and how we handle it.
        </p>

        <h2 className="!mt-10 text-xl">Information we collect</h2>
        <p>
          When you enquire by phone, WhatsApp, or through our booking form, we collect the name and
          contact details you provide, the address where care is needed, and details about the
          patient&apos;s condition and care requirements. We collect this only because it is
          necessary to arrange appropriate care.
        </p>
        <p>
          This website does not run advertising trackers. Basic technical information such as your
          browser type and pages visited may be processed by our hosting provider to keep the site
          running and secure.
        </p>

        <h2 className="!mt-10 text-xl">Health information</h2>
        <p>
          Details about a patient&apos;s medical condition are sensitive personal data. We use them
          solely to match a suitably trained caregiver and to brief that caregiver on the duty.
          They are shared only with the staff assigned to your case and, where relevant, with the
          treating doctor you ask us to coordinate with.
        </p>

        <h2 className="!mt-10 text-xl">How we use your information</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-inksoft">
          <li>To respond to your enquiry and arrange the care requested</li>
          <li>To brief and assign the caregiver placed with you</li>
          <li>To raise invoices and maintain payment records</li>
          <li>To contact you about an ongoing placement</li>
        </ul>
        <p>
          We do not sell your information, and we do not share it with third parties for marketing.
        </p>

        <h2 className="!mt-10 text-xl">Third-party services</h2>
        <p>
          Our booking form is hosted on Google Forms, and enquiries you send by WhatsApp are carried
          over WhatsApp&apos;s own infrastructure. Information you submit through those channels is
          also handled under their respective privacy policies.
        </p>

        <h2 className="!mt-10 text-xl">Retention</h2>
        <p>
          We keep enquiry and care records for as long as needed to provide the service and to meet
          our accounting and legal obligations, after which they are deleted.
        </p>

        <h2 className="!mt-10 text-xl">Your rights</h2>
        <p>
          You can ask us what information we hold about you, request that we correct it, or ask us
          to delete it where we are not required to keep it. Contact us at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand hover:underline">
            {site.email}
          </a>{" "}
          or call {site.phoneDisplay}.
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
