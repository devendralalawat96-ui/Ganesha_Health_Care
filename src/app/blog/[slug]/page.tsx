import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/blog";
import { site, telHref } from "@/lib/site";
import ShareButtons from "@/components/ShareButtons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="container-page py-14">
      <nav className="text-[13px] text-sage" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="px-1.5">/</span>
        <Link href="/blog" className="hover:text-brand">Care guides</Link>
      </nav>

      <article className="mt-6 max-w-3xl">
        <h1 className="text-3xl leading-tight">{post.title}</h1>
        <p className="mt-2 text-[13px] text-sage">{post.readMinutes} min read</p>
        <p className="mt-5 text-[16px] leading-relaxed text-inksoft">{post.excerpt}</p>

        {post.sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="text-xl">{s.heading}</h2>
            {s.body.map((para) => (
              <p key={para} className="mt-3 text-[15px] leading-relaxed text-inksoft">
                {para}
              </p>
            ))}
          </section>
        ))}

        <div className="mt-12 card bg-brand-soft/40">
          <p className="font-serif text-lg">Need help with this at home?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-inksoft">
            Our trained caregivers handle this daily across {site.city}. Call us to talk through
            what your family needs.
          </p>
          <a href={telHref()} className="btn-primary mt-4">
            Call {site.phoneDisplay}
          </a>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <ShareButtons title={post.title} path={`/blog/${post.slug}`} />
        </div>
      </article>

      <div className="mt-14 border-t border-line pt-8">
        <h2 className="text-xl">More care guides</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card transition hover:border-brand">
              <h3 className="text-[15px] font-semibold leading-snug">{p.title}</h3>
              <span className="mt-2 inline-block text-[12.5px] text-sage">{p.readMinutes} min read</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
