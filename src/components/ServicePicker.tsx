"use client";

import { useState } from "react";

/**
 * Multi-select for invoice services. Submits one `serviceName` entry per checked
 * box; the server action joins them into the single stored string.
 */
export default function ServicePicker({
  options,
  initial = [],
}: {
  options: string[];
  /** Pre-checked values, e.g. when editing an existing invoice. */
  initial?: string[];
}) {
  const [selected, setSelected] = useState<string[]>(() =>
    initial.filter((n) => options.includes(n)),
  );
  // Anything stored that is no longer a known service goes in the free-text box.
  const [other, setOther] = useState(() =>
    initial.filter((n) => !options.includes(n)).join(", "),
  );

  const toggle = (name: string) =>
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-[13px] font-semibold">
          Services <span className="font-normal text-sage">(select one or more)</span>
        </label>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => setSelected([])}
            className="text-[12.5px] font-medium text-sage hover:text-brand"
          >
            Clear
          </button>
        )}
      </div>

      <div className="mt-1.5 max-h-56 overflow-y-auto rounded-lg border border-line bg-white p-1">
        {options.map((name) => {
          const checked = selected.includes(name);
          return (
            <label
              key={name}
              className={`flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-[13.5px] transition ${
                checked ? "bg-brand-soft/50 font-medium text-brand-dark" : "hover:bg-cream"
              }`}
            >
              <input
                type="checkbox"
                name="serviceName"
                value={name}
                checked={checked}
                onChange={() => toggle(name)}
                className="h-4 w-4 shrink-0 accent-brand"
              />
              {name}
            </label>
          );
        })}
      </div>

      <input
        type="text"
        value={other}
        onChange={(e) => setOther(e.target.value)}
        placeholder="Other service (optional)"
        className="mt-2 w-full rounded-lg border border-line bg-white px-3.5 py-2 text-[13.5px] outline-none focus:border-brand"
      />
      {/* Only submitted when filled, so it never adds an empty entry. */}
      {other.trim() && <input type="hidden" name="serviceName" value={other.trim()} />}

      <p className="mt-1.5 text-[12px] text-sage">
        {selected.length + (other.trim() ? 1 : 0) === 0
          ? "No services selected yet."
          : `${selected.length + (other.trim() ? 1 : 0)} selected: ${[...selected, other.trim()]
              .filter(Boolean)
              .join(", ")}`}
      </p>
    </div>
  );
}
