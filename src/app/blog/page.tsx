import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Care Guides & Blog",
  description: `Practical home care guidance from ${site.shortName} — elderly care, bed sore prevention, stroke recovery, diabetes and dementia care at home.`,
};

export default function BlogPage() {
  return (
    <div className="container-page py-14">
      <h1 className="text-3xl">Care guides</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-inksoft">
        Practical guidance for families caring for someone at home, written from what we see on
        duty every day.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card transition hover:border-brand hover:shadow-sm">
            <h2 className="text-[16.5px] font-semibold leading-snug">{p.title}</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-inksoft">{p.excerpt}</p>
            <span className="mt-3 inline-block text-[12.5px] text-sage">{p.readMinutes} min read</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
