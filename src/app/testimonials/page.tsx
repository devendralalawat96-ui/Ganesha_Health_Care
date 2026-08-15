import type { Metadata } from "next";
import { site, telHref } from "@/lib/site";
import ReviewCarousel from "@/components/ReviewCarousel";
import { getGoogleReviews } from "@/lib/google-reviews";
import { allVerified } from "@/lib/reviews";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Read what families in ${site.city} say about ${site.shortName} — rated ${site.rating.value} stars from ${site.rating.count} Google reviews.`,
};

export default async function TestimonialsPage() {
  const { reviews, rating, count } = await getGoogleReviews();

  return (
    <div className="container-page py-14">
      <h1 className="text-3xl">What families say</h1>
      <div className="mt-4 flex items-center gap-2 text-[15px]">
        <span className="font-semibold text-ink">{rating} ★</span>
        <span className="text-sage">from {count} Google reviews</span>
      </div>

      <Reveal className="mt-10">
        <ReviewCarousel reviews={reviews} showGoogleBranding={allVerified} />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-line bg-white px-6 py-5 text-center">
          <p className="text-[14px] text-inksoft">
            Cared for someone in your family? A review helps other families find us.
          </p>
          <a
            href={site.gbpReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13.5px] font-semibold text-ink transition hover:border-brand hover:text-brand"
          >
            <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden>
              <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.6 7l-.1.3 6.7 5.2.5.1c4.3-4 6.5-9.8 6.5-15.9Z" />
              <path fill="#34A853" d="M24 46c6.1 0 11.2-2 14.9-5.5l-7.1-5.5c-1.9 1.3-4.4 2.2-7.8 2.2-6 0-11-3.9-12.8-9.3l-.3.1-6.9 5.4-.1.3C7.6 40.9 15.2 46 24 46Z" />
              <path fill="#FBBC05" d="M11.2 27.9c-.5-1.4-.8-3-.8-4.6s.3-3.2.7-4.6v-.4l-7-5.4-.2.1A22 22 0 0 0 2 23.3c0 3.5.9 6.9 2.3 9.9l6.9-5.3Z" />
              <path fill="#EA4335" d="M24 9.5c4.3 0 7.2 1.8 8.8 3.4l6.4-6.2C35.2 3.2 30.1 1 24 1 15.2 1 7.6 6.1 4.2 13.4l6.9 5.4C13 13.4 18 9.5 24 9.5Z" />
            </svg>
            Write a review on Google
          </a>
        </div>
      </Reveal>

      <p className="mt-6 text-[12.5px] leading-relaxed text-sage">
        Written accounts shared by families we have cared for. Names are withheld at their request.
      </p>

      <div className="mt-12 card bg-brand-soft/40">
        <h2 className="font-serif text-xl">Read our Google reviews</h2>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-inksoft">
          Our full, unedited review history lives on our Google Business Profile — including the
          {" "}{site.rating.count} ratings that make up our {site.rating.value}-star average.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {site.gbpReviewUrl ? (
            <a href={site.gbpReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Leave a Google review
            </a>
          ) : (
            <span className="text-[13px] text-sage">
              Set NEXT_PUBLIC_GBP_REVIEW_URL to link the Google review form here.
            </span>
          )}
          <a href={telHref()} className="btn-outline">
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
