export type Review = {
  author: string;
  rating: number;
  /** e.g. "8 months ago" — shown as-is, like Google does. */
  when: string;
  text: string;
  /** True only for real Google reviews (live from the API, or copied verbatim). */
  verified: boolean;
  /** Reviewer's Google avatar, when the API supplies one. */
  photoUrl?: string;
  /** The business's public reply on the Google listing, if there is one. */
  ownerReply?: string;
};

/**
 * Real Google reviews, copied verbatim from the business's listing.
 *
 * Do not paraphrase, reword or invent entries here — these render with the
 * Google mark, so anything in this list is presented to families as a genuine
 * verified review. Only add text that actually appears on the listing.
 *
 * Listing: https://www.google.com/search?kgmid=/g/11tf9jrlv3
 */
export const reviews: Review[] = [
  {
    author: "Jayesh Jaiswal",
    rating: 5,
    when: "8 months ago",
    text: "Perfect Home Health Care & Nursing Service in Indore. The nurse was very professional, polite and well-trained. I booked a caretaker for my father and the experience was great. Very responsible and caring staff.",
    verified: true,
  },
  {
    author: "Kshama Baghel",
    rating: 5,
    when: "a month ago",
    text: "I had a great experience with ganesha home health care services. the caregiver was punctual polite and took Excellent care of my mother. their service is professional and reliable. highly recommend",
    verified: true,
  },
  {
    author: "Deepak Giri",
    rating: 5,
    when: "8 months ago",
    text: "The caretaker understands the needs of elderly people very well. They are calm, polite, and handle tasks like meals, medicines, and mobility support with care. Their presence has really provided us peace of mind.",
    verified: true,
  },
  {
    author: "Taniya Tiwari",
    rating: 5,
    when: "8 months ago",
    text: "“The mother and baby care service is outstanding. The nurse handle newborns very safely Ganesha home health care service is best home health care service in Indore”",
    verified: true,
  },
  {
    author: "Satyam Ku",
    rating: 5,
    when: "a month ago",
    text: "They provide good services in indore we took service last one year sonal is very young and super active care giver and team also well managed highly recommend in Indore",
    verified: true,
  },
  {
    author: "Research Intensify",
    rating: 5,
    when: "8 months ago",
    text: "Professional team, verified staff and genuine service. Bahut saare agencies try kiye , but Ganesha Home Health Care is the best in Indore.",
    verified: true,
  },
  {
    author: "Rishabh Bhawsar",
    rating: 5,
    when: "8 months ago",
    text: "The best home care experience we ever had. The team truly cares about the patient's well-being Ganesha home health care service is best home health care service in indore",
    verified: true,
  },
  {
    author: "Sivani Malviya",
    rating: 5,
    when: "a month ago",
    text: "Reliable and trustworthy care taker service good behaviour timely support and attentive care. Satisfied",
    verified: true,
  },
  {
    author: "Ankuuu Bachhane",
    rating: 5,
    when: "a month ago",
    text: "Very satisfied with the home nursing services highly recommend",
    verified: true,
    ownerReply:
      "We sincerely appreciate your kind words. Thank you for choosing Ganesha Home Health Care Services. Your support means a lot to our team.",
  },
  {
    author: "Antima kushwaha",
    rating: 5,
    when: "8 months ago",
    text: "Highly recommended in indore",
    verified: true,
    ownerReply: "Thanks a lot 🙏",
  },
  {
    author: "Pulkit Baraskar",
    rating: 5,
    when: "2 years ago",
    text: "Good services",
    verified: true,
  },
];

/** True only when every review is real, which turns on the Google branding. */
export const allVerified = reviews.every((r) => r.verified);

/** Deterministic avatar colour per author, in the Google palette. */
const avatarColors = ["#1A73E8", "#D93025", "#188038", "#E37400", "#9334E6", "#12B5CB"];

export function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return avatarColors[h % avatarColors.length];
}
