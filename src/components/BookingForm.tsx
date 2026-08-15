"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Native booking form styled to match the site. Posts to FormSubmit, which
 * emails the enquiry — no backend, no third-party iframe.
 *
 * Set NEXT_PUBLIC_BOOKING_EMAIL to the address that should receive bookings.
 */
export default function BookingForm({
  services,
  email,
}: {
  services: string[];
  email: string;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const [live, setLive] = useState(false);

  const toggle = (name: string) =>
    setPicked((p) => (p.includes(name) ? p.filter((n) => n !== name) : [...p, name]));

  const field =
    "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[15px] outline-none transition focus:border-brand";
  const label = "text-[12.5px] font-semibold uppercase tracking-[0.06em] text-sage";

  return (
    <form
      action={`https://formsubmit.co/${email}`}
      method="POST"
      className="space-y-6"
      onSubmit={() => setLive(true)}
    >
      {/* FormSubmit configuration */}
      <input type="hidden" name="_subject" value="New caregiver booking — website" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={`${site.url}/book/thank-you`} />
      {/* Honeypot: bots fill this, humans never see it. */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="patientName" className={label}>Patient&apos;s name</label>
          <input id="patientName" name="Patient name" required className={field} placeholder="Full name" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Contact number</label>
          <input
            id="phone"
            name="Contact number"
            required
            type="tel"
            inputMode="tel"
            pattern="[0-9+ ]{10,15}"
            className={field}
            placeholder="10-digit mobile"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="age" className={label}>
            Patient&apos;s age <span className="font-normal normal-case text-sage">(optional)</span>
          </label>
          <input id="age" name="Patient age" inputMode="numeric" className={field} placeholder="e.g. 72" />
        </div>
        <div>
          <label htmlFor="area" className={label}>Area / locality</label>
          <input id="area" name="Area" required className={field} placeholder="e.g. Vijay Nagar, Indore" />
        </div>
      </div>

      <fieldset>
        <legend className={label}>Care needed</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {services.map((s) => {
            const on = picked.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggle(s)}
                aria-pressed={on}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition ${
                  on
                    ? "border-brand bg-brand text-cream"
                    : "border-line bg-white text-inksoft hover:border-brand hover:text-brand"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        {picked.map((s) => (
          <input key={s} type="hidden" name="Services" value={s} />
        ))}
        <p className="mt-2 text-[12.5px] text-sage">
          {picked.length === 0
            ? "Tap all that apply — or leave blank and we will advise."
            : `${picked.length} selected`}
        </p>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className={label}>Care should start</label>
          <input id="startDate" name="Start date" type="date" required className={field} />
        </div>
        <div>
          <label htmlFor="duration" className={label}>Duration</label>
          <select id="duration" name="Duration" defaultValue="" className={field}>
            <option value="">Select</option>
            <option>A few hours a day</option>
            <option>12-hour shift</option>
            <option>24-hour / live-in</option>
            <option>Night duty only</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={label}>
          Patient&apos;s condition{" "}
          <span className="font-normal normal-case text-sage">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="Condition / notes"
          rows={4}
          className={field}
          placeholder="Anything that helps us match the right caregiver — mobility, medical condition, language preference, male or female caregiver."
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={live} className="btn-primary disabled:opacity-60">
          {live ? "Sending…" : "Request a caregiver"}
        </button>
        <p className="text-[13px] text-sage">
          Urgent? Call{" "}
          <a href={`tel:${site.phone}`} className="font-semibold text-brand hover:underline">
            {site.phoneDisplay}
          </a>{" "}
          — 24×7.
        </p>
      </div>
    </form>
  );
}
