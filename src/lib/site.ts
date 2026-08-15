export const site = {
  name: "Ganesha Home Health Care Services",
  nameHindi: "गणेश होम हेल्थ केयर सर्विसेज",
  shortName: "Ganesha Care",
  tagline: "24×7 nursing, elderly & post-surgery care at home",
  /** Their own strapline, used on their Instagram posts. */
  motto: "Care • Comfort • Compassion",
  /** Sanskrit motto printed on all their official posters and office signage. */
  mottoSanskrit: "चिकित्सा सेवा परमो धर्मः",
  mottoSanskritGloss: "Medical service is the highest duty",
  city: "Indore",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ganeshacare.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+917974736011",
  phoneDisplay: "079747 36011",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "917974736011",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "devendralalawat96@gmail.com",
  address: "375, Bajrang Nagar, Indore, Madhya Pradesh 452011",
  /** As printed on their own invoice pad. */
  addressInvoice: "375, Bajrang Nagar Square, Indore (M.P.)",
  locality: "Bajrang Nagar",
  postalCode: "452011",
  plusCode: "PVWM+7H Indore, Madhya Pradesh",
  hours: "Open 24 hours · Caregiving available 24×7",
  rating: { value: 4.7, count: 36 },
  upiId: process.env.NEXT_PUBLIC_UPI_ID ?? "owner@upi",
  upiName: process.env.NEXT_PUBLIC_UPI_NAME ?? "Ganesha Home Health Care",
  bookingFormUrl: process.env.NEXT_PUBLIC_BOOKING_FORM_URL ?? "",
  /** Booking enquiries are emailed here via FormSubmit. */
  bookingEmail: process.env.NEXT_PUBLIC_BOOKING_EMAIL ?? "devendralalawat96@gmail.com",
  /** Google Knowledge Graph ID for the business, from their GBP share link. */
  kgmid: "/g/11tf9jrlv3",
  /** Short share link from the Google Business Profile — opens the listing. */
  gbpUrl: "https://share.google/ROSN6NOdjDtkWRZkF",
  /**
   * "Write a review" link. The writereview endpoint needs a ChIJ… Place ID, not
   * the KGMID we have, so it bounces to a sign-in page. The share link opens the
   * listing where the review button lives, which works for everyone. Replace via
   * env with the exact g.page/r/…/review URL from the GBP dashboard when handy.
   */
  gbpReviewUrl: process.env.NEXT_PUBLIC_GBP_REVIEW_URL ?? "https://share.google/ROSN6NOdjDtkWRZkF",
  mapsEmbedUrl: process.env.NEXT_PUBLIC_MAPS_EMBED_URL ?? "",
  instagram: "https://www.instagram.com/ganesha_home_health_care/",
  instagramHandle: "@ganesha_home_health_care",
  justdial: "https://jsdl.in/DT-29M6YUMEMYE",
  /** JD rating index, across 122 ratings on their listing. */
  justdialRating: { value: 4.6, count: 122 },
  /** Cities served. Addresses taken from their own branch poster. */
  cities: ["Indore", "Ujjain", "Dhar", "Khargone", "Sagar"],
  branches: [
    { city: "Indore", address: "375, Bajrang Nagar, MR-9 Road, Indore 452011", head: true },
    { city: "Ujjain", address: "Varahmihir Road, Ujjain City 456006" },
    { city: "Dhar", address: "66A B Road, Pithampur 454775" },
    { city: "Khargone", address: "Ring Road, Main Khargone 451001" },
    { city: "Sagar", address: "Shree Ram Colony, Sagar Cantt" },
  ],
  serviceAreas: [
    "Vijay Nagar",
    "Palasia",
    "Bhawarkuan",
    "Rau",
    "Sudama Nagar",
    "Annapurna",
    "Old Palasia",
    "Scheme No. 78",
  ],
  /** Figures confirmed by the owner, 2026-08-15. */
  stats: {
    yearsExperience: 9,
    patientsServed: 4500,
    caregivers: 180,
    citiesCovered: 5,
  },
};

export function telHref() {
  return `tel:${site.phone}`;
}

export function waHref(message?: string) {
  const text = message ?? `Hi, I need home care support from ${site.shortName}.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function upiHref(amount?: number, note?: string) {
  const params = new URLSearchParams({
    pa: site.upiId,
    pn: site.upiName,
    cu: "INR",
  });
  if (amount && amount > 0) params.set("am", String(amount));
  if (note) params.set("tn", note);
  return `upi://pay?${params.toString()}`;
}
