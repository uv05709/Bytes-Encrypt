import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { allBlogPosts } from "@/lib/blog-data";

export function generateStaticParams() {
  return allBlogPosts.map((p) => ({
    slug: p.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="pt-[70px] pb-[50px] relative overflow-hidden">
        <div
          className="absolute -inset-x-[10%] -top-[10%] h-[620px] z-0 pointer-events-none mesh-bg"
        />
        <div className="wrap relative z-[1]">
          <Link
            href="/blog"
            className="font-[family-name:var(--font-mono)] text-[13.5px] uppercase tracking-[0.06em] text-[var(--indigo)] hover:underline inline-flex items-center gap-2 mb-6 no-underline font-semibold"
          >
            <ArrowLeft size={16} /> Back to all posts
          </Link>

          <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-[0.06em] text-[var(--ink-faint)] mb-4">
            <span className="bg-[var(--surface-secondary)] border border-[var(--panel-line)] text-[var(--indigo)] font-bold py-1 px-3 rounded-full">
              {post.tag}
            </span>
            <span>&middot;</span>
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-[clamp(2.2rem,4.4vw,3.6rem)] font-extrabold leading-[1.12] max-w-[24ch] text-[var(--ink)] mb-6 tracking-tight">
            {post.title}
          </h1>

          <p className="text-[20px] text-[var(--ink-soft)] max-w-[50ch] leading-relaxed border-l-2 border-[var(--indigo)] pl-4 italic">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Post body */}
      <section className="py-[60px] pt-4">
        <div className="wrap max-w-[800px]">
          <div className="prose max-w-none text-[17.5px] text-[var(--ink-soft)] leading-[1.8] space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-14 p-8 bg-[var(--panel)] border border-[var(--panel-line)] rounded-[20px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-[19px] font-bold text-[var(--ink)] mb-1">
                Concerned about similar attack paths?
              </h3>
              <p className="text-[15px] text-[var(--ink-soft)]">
                Our team can scope a targeted assessment for your environment.
              </p>
            </div>
            <Link
              href="/#contact"
              className="font-[family-name:var(--font-display)] font-bold text-[14.5px] py-2.5 px-5 rounded-full bg-[var(--indigo)] text-white hover:bg-[var(--indigo-deep)] hover:shadow-[0_8px_24px_-6px_rgba(91,76,255,0.4)] transition-all flex-none no-underline"
            >
              Request an assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
