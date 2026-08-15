import "server-only";
import { site } from "./site";
import { reviews as fallbackReviews, type Review } from "./reviews";

/**
 * Fetches reviews from the Places API (New).
 *
 * The `reviews` field bills at the Enterprise + Atmosphere SKU (~$40 per 1,000
 * calls), so this is cached for 24h via Next's fetch cache — roughly 30 calls a
 * month regardless of traffic. Never call this per-request.
 *
 * Falls back to the hand-written entries in reviews.ts when the key is missing
 * or the request fails, so the page always renders.
 */

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
  relativePublishTimeDescription?: string;
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
  googleMapsUri?: string;
};

export type ReviewsResult = {
  reviews: Review[];
  rating: number;
  count: number;
  /** True only when the data came back from Google this request. */
  live: boolean;
};

const REVALIDATE_SECONDS = 60 * 60 * 24;

export async function getGoogleReviews(): Promise<ReviewsResult> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  const fallback: ReviewsResult = {
    reviews: fallbackReviews,
    rating: site.rating.value,
    count: site.rating.count,
    live: false,
  };

  if (!key || !placeId) return fallback;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`Places API ${res.status}: ${await res.text()}`);
      return fallback;
    }

    const data = (await res.json()) as PlacesResponse;
    const mapped = (data.reviews ?? [])
      .map((r): Review | null => {
        const text = (r.text?.text ?? r.originalText?.text ?? "").trim();
        const author = r.authorAttribution?.displayName?.trim();
        if (!text || !author) return null;
        return {
          author,
          rating: r.rating ?? 5,
          when: r.relativePublishTimeDescription ?? "",
          text,
          verified: true,
          photoUrl: r.authorAttribution?.photoUri,
        };
      })
      .filter((r): r is Review => r !== null);

    if (mapped.length === 0) return fallback;

    return {
      reviews: mapped,
      rating: data.rating ?? site.rating.value,
      count: data.userRatingCount ?? site.rating.count,
      live: true,
    };
  } catch (err) {
    console.error("Places API request failed:", err);
    return fallback;
  }
}
