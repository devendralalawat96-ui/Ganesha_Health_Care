const badges = [
  "Police-verified staff",
  "24×7 availability",
  "Replacement guarantee",
  "Male & female caregivers",
];

export default function TrustStrip() {
  return (
    <div className="border-y border-line bg-brand-soft/60">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2.5">
        {badges.map((b) => (
          <span key={b} className="flex items-center gap-1.5 text-[12.5px] font-medium text-brand-dark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5" aria-hidden>
              <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
