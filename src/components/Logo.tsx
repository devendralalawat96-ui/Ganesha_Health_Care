/**
 * The Ganesha mark, drawn to match the line-art logo on their printed invoice
 * pad. Uses `currentColor`, so it takes the colour of whatever it sits in.
 */
export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      role="img"
      aria-label="Ganesha Home Health Care Services"
      fill="none"
      stroke="currentColor"
      strokeWidth={4.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M50 8c-4.4 0-7.4 3.1-7.4 7 0 2.4 1.1 4.4 3 5.7" />
      <path d="M50 8c4.4 0 7.4 3.1 7.4 7 0 2.4-1.1 4.4-3 5.7" />
      <path d="M50 4.5v4" />
      <path d="M45.6 20.7c-6.6 2-11.2 7.9-11.2 15 0 4 1.4 7.6 3.8 10.4" />
      <path d="M54.4 20.7c6.6 2 11.2 7.9 11.2 15 0 4-1.4 7.6-3.8 10.4" />
      <path d="M34.4 30.5c-7.6 0-13.4 6.2-13.4 14.7 0 9.4 6.6 16.6 15.6 16.6 2.6 0 5-.6 7-1.7" />
      <path d="M65.6 30.5c7.6 0 13.4 6.2 13.4 14.7 0 9.4-6.6 16.6-15.6 16.6-2.6 0-5-.6-7-1.7" />
      <path d="M43.5 39.5h3.2M53.3 39.5h3.2" />
      <path d="M50 44c-2.6 0-4.6 2.2-4.6 5.2 0 4 2.4 6.4 2.4 10.8 0 5-3.4 8.6-3.4 14.2 0 6 4.6 10.4 10.6 10.4 5.4 0 9.4-3.8 9.4-9 0-4.4-3-7.6-7-7.6-3.4 0-5.8 2.4-5.8 5.6 0 2.6 1.8 4.4 4.2 4.4 1.9 0 3.3-1.3 3.3-3.1" />
      <path d="M43.8 55.5c-1.6 1.8-2.5 3.8-2.5 5.6" />
      <path d="M26 94c5.2-4.6 14-7.4 24-7.4S68.8 89.4 74 94" />
      <path d="M18 99.5c4.4-3 9.6-4.8 15-5.3M82 99.5c-4.4-3-9.6-4.8-15-5.3" />
      <path d="M26 100.5c6.4 4.2 14.8 6.6 24 6.6s17.6-2.4 24-6.6" />
    </svg>
  );
}
