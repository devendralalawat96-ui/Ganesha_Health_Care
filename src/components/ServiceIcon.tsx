const paths: Record<string, string> = {
  "baby-sitting-at-home": "M12 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-5 5.5a5 5 0 0 1 10 0V16a5 5 0 0 1-10 0v-3.5ZM4 20h16",
  "stroke-paralysis-care": "M9 4.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM7.5 7h3l2 5 4 1M8 12l-1.5 9M11 13l2 8M4 21h5",
  "newborn-care": "M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-4 4a4 4 0 0 1 8 0v3a4 4 0 0 1-8 0v-3Zm2 9h4M9 2c1-1 5-1 6 0",
  "child-care": "M12 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-4 5 4-2 4 2m-4-2v6m-3 5 3-5 3 5",
  "disabled-care": "M11 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 3v5h5l2 5m-9 1a5 5 0 1 1-3-9",
  "domestic-help": "M4 21V9l8-6 8 6v12M9 21v-6h6v6M3 9h18",
  "home-nursing-care": "M12 3v4m0 0v4m0-4h4m-4 0H8M4 21V8l8-5 8 5v13",
  "elderly-care": "M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-2 3h4l2 6h-2v7h-4v-7H8l2-6Z",
  "companion-care": "M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3 21v-4a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v4m1-7h2a3 3 0 0 1 3 3v4",
  "bedridden-patient-care": "M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2m18-2v2M7 10V7a1 1 0 0 1 1-1h3",
  "dementia-care": "M12 3a6 6 0 0 0-6 6c0 2 1 3 1 5v3h10v-3c0-2 1-3 1-5a6 6 0 0 0-6-6Zm-3 17h6",
  "parkinsons-care": "M12 3v3m4.5-1.5-2 2.5M19 9h-3m1.5 4.5-2.5-2M12 21v-3m-4.5 1.5 2-2.5M5 15h3M6.5 6.5l2.5 2",
  "patient-attendant": "M12 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-5 15v-6a5 5 0 0 1 10 0v6M9 22h6",
  "icu-setup-at-home": "M3 12h4l2-5 3 10 2-5h7",
  physiotherapy: "M9 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-2 5 3-2 4 3 3-1M7 10l-1 6 4 1 2 6m-2-7 5-1",
  "mother-and-baby-care": "M9 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 22v-6a5 5 0 0 1 10 0v6m2-7h1a3 3 0 0 1 3 3v4",
  "post-surgery-care": "M12 4v16m8-8H4M8 8l8 8m0-8-8 8",
  "tracheostomy-care": "M12 3v6m-3 0h6a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z",
  "ventilator-care": "M4 6h6v12H4zm10 0h6v12h-6zM10 12h4",
  "palliative-care": "M12 21s-7-4.5-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4.5-7 9-7 9Z",
  "medical-equipment-rental": "M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 16V6h9v10M14 9h4l3 4v3",
};

export default function ServiceIcon({ slug, className = "h-6 w-6" }: { slug: string; className?: string }) {
  const d = paths[slug] ?? paths["home-nursing-care"];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
