"use client";

import { useState } from "react";
import { inr } from "@/lib/format";
import { site, waHref } from "@/lib/site";

const careTypes = [
  { id: "attendant", label: "Patient Attendant", day: 900, night: 1000 },
  { id: "elderly", label: "Elderly / Companion Care", day: 1000, night: 1100 },
  { id: "bedridden", label: "Bedridden Patient Care", day: 1200, night: 1300 },
  { id: "nurse", label: "Home Nursing (trained nurse)", day: 1600, night: 1800 },
  { id: "critical", label: "ICU / Ventilator Care", day: 2500, night: 2700 },
];

const shifts = [
  { id: "12day", label: "12 hours (day)", key: "day" as const, multiplier: 1 },
  { id: "12night", label: "12 hours (night)", key: "night" as const, multiplier: 1 },
  { id: "24", label: "24 hours (full day)", key: "day" as const, multiplier: 1.8 },
];

export default function CostCalculator() {
  const [careId, setCareId] = useState(careTypes[1].id);
  const [shiftId, setShiftId] = useState(shifts[0].id);
  const [days, setDays] = useState(30);

  const care = careTypes.find((c) => c.id === careId)!;
  const shift = shifts.find((s) => s.id === shiftId)!;

  const perDay = Math.round(care[shift.key] * shift.multiplier);
  const total = perDay * days;

  const message = `Hi, I used the cost calculator on your website.
Care type: ${care.label}
Shift: ${shift.label}
Duration: ${days} days
Estimated: ${inr(perDay)}/day (about ${inr(total)} total)
Please confirm the actual rate.`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        <fieldset>
          <legend className="text-[13.5px] font-semibold">Type of care</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {careTypes.map((c) => (
              <label
                key={c.id}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-3 text-[13.5px] transition ${
                  careId === c.id ? "border-brand bg-brand-soft/50 font-semibold text-brand-dark" : "border-line bg-white text-inksoft"
                }`}
              >
                <input
                  type="radio"
                  name="care"
                  value={c.id}
                  checked={careId === c.id}
                  onChange={() => setCareId(c.id)}
                  className="accent-brand"
                />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[13.5px] font-semibold">Shift</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {shifts.map((s) => (
              <label
                key={s.id}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-3 text-[13.5px] transition ${
                  shiftId === s.id ? "border-brand bg-brand-soft/50 font-semibold text-brand-dark" : "border-line bg-white text-inksoft"
                }`}
              >
                <input
                  type="radio"
                  name="shift"
                  value={s.id}
                  checked={shiftId === s.id}
                  onChange={() => setShiftId(s.id)}
                  className="accent-brand"
                />
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="days" className="text-[13.5px] font-semibold">
            Duration: {days} {days === 1 ? "day" : "days"}
          </label>
          <input
            id="days"
            type="range"
            min={1}
            max={90}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="mt-3 w-full accent-brand"
          />
          <div className="mt-1 flex justify-between text-[11.5px] text-sage">
            <span>1 day</span>
            <span>90 days</span>
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card bg-brand-soft/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-sage">Estimated cost</p>
          <p className="mt-3 font-serif text-3xl text-brand">{inr(perDay)}</p>
          <p className="text-xs text-inksoft">per day</p>

          <div className="mt-5 border-t border-line pt-4">
            <p className="font-serif text-xl text-ink">{inr(total)}</p>
            <p className="text-xs text-inksoft">
              for {days} {days === 1 ? "day" : "days"}
            </p>
          </div>

          <a href={waHref(message)} className="btn-primary mt-5 w-full">
            Confirm this on WhatsApp
          </a>
          <p className="mt-3 text-[11.5px] leading-relaxed text-sage">
            Indicative only. Final rates depend on the patient&apos;s condition and location within{" "}
            {site.city}. Nothing is charged until you confirm.
          </p>
        </div>
      </aside>
    </div>
  );
}
