"use client";

import { useEffect, useState } from "react";
import { type Review, avatarColor } from "@/lib/reviews";

function Stars({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`${size} ${i <= rating ? "fill-[#FBBC04]" : "fill-line"}`} aria-hidden>
          <path d="m12 17.3-6.2 3.7 1.7-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.5 4.8 1.7 7z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleG({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.6 7l-.1.3 6.7 5.2.5.1c4.3-4 6.5-9.8 6.5-15.9Z" />
      <path fill="#34A853" d="M24 46c6.1 0 11.2-2 14.9-5.5l-7.1-5.5c-1.9 1.3-4.4 2.2-7.8 2.2-6 0-11-3.9-12.8-9.3l-.3.1-6.9 5.4-.1.3C7.6 40.9 15.2 46 24 46Z" />
      <path fill="#FBBC05" d="M11.2 27.9c-.5-1.4-.8-3-.8-4.6s.3-3.2.7-4.6v-.4l-7-5.4-.2.1A22 22 0 0 0 2 23.3c0 3.5.9 6.9 2.3 9.9l6.9-5.3Z" />
      <path fill="#EA4335" d="M24 9.5c4.3 0 7.2 1.8 8.8 3.4l6.4-6.2C35.2 3.2 30.1 1 24 1 15.2 1 7.6 6.1 4.2 13.4l6.9 5.4C13 13.4 18 9.5 24 9.5Z" />
    </svg>
  );
}

function Card({ r, verified }: { r: Review; verified: boolean }) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(18,36,30,.04),0_8px_24px_-12px_rgba(18,36,30,.12)] sm:p-8">
      {/* Accent rail */}
      <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand to-brand-bright" aria-hidden />

      {/* Oversized quote mark */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="absolute right-6 top-5 h-14 w-14 text-brand/[0.07]" aria-hidden>
        <path d="M9.5 5C6.5 6.5 5 9 5 12h3a2.5 2.5 0 1 1 0 5A3.5 3.5 0 0 1 4.5 13.5C4.5 9 6.5 6 9.5 5Zm10 0C16.5 6.5 15 9 15 12h3a2.5 2.5 0 1 1 0 5 3.5 3.5 0 0 1-3.5-3.5C14.5 9 16.5 6 19.5 5Z" />
      </svg>

      <Stars rating={r.rating} size="h-[18px] w-[18px]" />

      <blockquote className="relative mt-4 flex-1 text-[15.5px] leading-[1.7] text-inksoft sm:text-[16px]">
        {r.text}
      </blockquote>

      {r.ownerReply && (
        <div className="relative mt-4 rounded-xl border-l-2 border-brand bg-cream/70 px-4 py-3">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-brand">
            Response from the owner
          </p>
          <p className="mt-1 text-[13.5px] leading-relaxed text-inksoft">{r.ownerReply}</p>
        </div>
      )}

      <footer className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        {r.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.photoUrl} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" loading="lazy" />
        ) : (
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[15px] font-semibold text-white"
            style={{ background: avatarColor(r.author) }}
            aria-hidden
          >
            {r.author.trim().charAt(0).toUpperCase()}
          </span>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-[14.5px] font-semibold text-ink">{r.author}</p>
          {r.when && <p className="text-[12.5px] text-sage">{r.when}</p>}
        </div>

        {verified && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-cream px-2.5 py-1">
            <GoogleG className="h-3.5 w-3.5" />
            <span className="text-[11.5px] font-medium text-inksoft">Google</span>
          </span>
        )}
      </footer>
    </article>
  );
}

export default function ReviewCarousel({
  reviews,
  showGoogleBranding,
}: {
  reviews: Review[];
  showGoogleBranding: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Cards shown at once — must match the w-full / sm:w-1/2 / lg:w-1/3 classes below.
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const read = () =>
      setPerView(window.matchMedia("(min-width: 1024px)").matches ? 3 : window.matchMedia("(min-width: 640px)").matches ? 2 : 1);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const pages = Math.max(1, Math.ceil(reviews.length / perView));

  // Keep the current page in range when the viewport changes.
  useEffect(() => {
    setIndex((i) => Math.min(i, pages - 1));
  }, [pages]);

  useEffect(() => {
    if (paused || pages < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % pages), 7000);
    return () => clearInterval(id);
  }, [paused, pages]);

  const go = (n: number) => setIndex((n + pages) % pages);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex items-stretch transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          // each "page" is perView cards wide, so 100% steps one full page
        >
          {reviews.map((r) => (
            <div
              key={r.text}
              className="w-full shrink-0 px-1 pb-2 sm:w-1/2 lg:w-1/3"
              aria-hidden={undefined}
            >
              <Card r={r} verified={showGoogleBranding && r.verified} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Reviews page ${i + 1} of ${pages}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-7 bg-brand" : "w-1.5 bg-line hover:bg-sage"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous reviews"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-inksoft transition hover:border-brand hover:text-brand"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next reviews"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-inksoft transition hover:border-brand hover:text-brand"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
