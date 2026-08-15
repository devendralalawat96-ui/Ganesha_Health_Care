import type { Metadata } from "next";
import { site, telHref, waHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name} — ${site.address}. Call ${site.phoneDisplay}, available 24×7.`,
};

export default function ContactPage() {
  return (
    <div className="container-page py-14">
      <h1 className="text-3xl">Contact us</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-inksoft">
        Call any time, day or night. For non-urgent questions, WhatsApp is usually the fastest way
        to reach us.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3">
            <a href={telHref()} className="btn-primary">Call {site.phoneDisplay}</a>
            <a href={waHref()} className="btn-outline">WhatsApp Us</a>
            <a href={`mailto:${site.email}`} className="btn-outline">Email Us</a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-sage">Office address</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-inksoft">{site.address}</p>
              <p className="mt-1 text-[13px] text-sage">Plus code: {site.plusCode}</p>
            </div>

            <div>
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-sage">Business hours</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-inksoft">{site.hours}</p>
              <p className="mt-1 text-[13px] text-sage">
                Caregiving continues through nights, Sundays and public holidays.
              </p>
            </div>

            <div>
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-sage">Phone</h2>
              <p className="mt-2 text-[14.5px]">
                <a href={telHref()} className="font-semibold text-brand hover:underline">
                  {site.phoneDisplay}
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-sage">Email</h2>
              <p className="mt-2 text-[14.5px]">
                <a href={`mailto:${site.email}`} className="font-semibold text-brand hover:underline">
                  {site.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-sage">Service areas</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-inksoft">
              We serve all of {site.city}, including {site.serviceAreas.join(", ")} and nearby
              localities. If you are just outside the city, call and ask.
            </p>
          </div>
        </div>

        <aside>
          {site.mapsEmbedUrl ? (
            <iframe
              src={site.mapsEmbedUrl}
              title={`Map to ${site.name}`}
              className="h-[320px] w-full rounded-xl border border-line"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="card border-dashed">
              <p className="font-serif text-base">Map not connected</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-inksoft">
                Set <code className="rounded bg-cream px-1.5 py-0.5 text-[12.5px]">NEXT_PUBLIC_MAPS_EMBED_URL</code>{" "}
                from Google Maps → Share → Embed a map.
              </p>
            </div>
          )}

          <div className="card mt-5 bg-brand-soft/40">
            <p className="font-serif text-base">Need care urgently?</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-inksoft">
              Call us directly — the form and email are slower. We take emergency placement
              requests 24 hours a day.
            </p>
            <a href={telHref()} className="btn-primary mt-4 w-full">
              Call {site.phoneDisplay}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
