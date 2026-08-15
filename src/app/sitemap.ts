import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { landingPages } from "@/lib/landing";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/book", priority: 0.9 },
    { path: "/pricing", priority: 0.8 },
    { path: "/caregivers", priority: 0.7 },
    { path: "/institute", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/why-choose-us", priority: 0.6 },
    { path: "/testimonials", priority: 0.6 },
    { path: "/faqs", priority: 0.6 },
    { path: "/blog", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/disclaimer", priority: 0.3 },
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...landingPages.map((l) => ({
      url: `${site.url}/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
