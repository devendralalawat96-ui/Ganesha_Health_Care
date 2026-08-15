import type { Metadata } from "next";
import { Inter, Fraunces, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileTabBar from "@/components/MobileTabBar";
import FloatingContact from "@/components/FloatingContact";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Home Nursing & Elderly Care in ${site.city}`,
    template: `%s | ${site.shortName}`,
  },
  description:
    `Trained, police-verified nurses and caregivers at home in ${site.city}. 24×7 elderly care, post-surgery care, ICU setup at home and more. Call ${site.phoneDisplay}.`,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
// Devanagari for the Sanskrit motto and the Hindi business name.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-deva",
  display: "swap",
});

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  additionalType: "https://schema.org/MedicalBusiness",
  name: site.name,
  alternateName: site.nameHindi,
  url: site.url,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "375, Bajrang Nagar",
    addressLocality: site.city,
    addressRegion: "Madhya Pradesh",
    postalCode: site.postalCode,
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
  },
  areaServed: site.cities.map((name) => ({ "@type": "City", name })),
  sameAs: [site.instagram, site.gbpUrl, site.justdial],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${fraunces.variable} ${devanagari.variable}`}
    >
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileTabBar />
        <FloatingContact />
        <WhatsAppWidget />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
