"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { allBlogPosts } from "@/lib/blog-data";

export default function BlogPage() {
  const featured = allBlogPosts[0];
  const posts = allBlogPosts;

  return (
    <>
      {/* Page header */}
      <section className="pt-[70px] pb-[50px] relative overflow-hidden">
        <div
          className="absolute -inset-x-[10%] -top-[10%] h-[620px] z-0 pointer-events-none mesh-bg"
        />
        <div className="wrap relative z-[1]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-mono)] text-[16.5px] font-semibold tracking-[0.08em] uppercase text-[var(--indigo)] inline-flex items-center gap-2 mb-[18px] bg-[rgba(91,76,255,0.08)] py-2 px-4 rounded-full border border-[rgba(91,76,255,0.1)]"
          >
            <span className="relative w-[7px] h-[7px] rounded-full bg-[var(--mint)]">
              <span className="absolute -inset-1 rounded-full border-[1.5px] border-[var(--mint)]" style={{ animation: "pingDot 1.8s ease-out infinite" }} />
            </span>
            Blog
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2.6rem,5.2vw,4.4rem)] font-extrabold leading-[1.04] max-w-[20ch] tracking-tight"
          >
            Notes from{" "}
            <span className="bg-gradient-to-r from-[var(--indigo)] via-[#9E90FF] to-[var(--indigo)] bg-clip-text text-transparent">
              engagements
            </span>
            , not a content calendar.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[19px] text-[var(--ink-soft)] max-w-[54ch] mt-6"
          >
            Notes on VAPT, application security, and how we run engagements — from the BytesEncrypt Technologies team.
          </motion.p>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-6 pt-0">
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#100F1C] dark:bg-[#0C0B16] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 md:p-11 relative overflow-hidden text-white shadow-[var(--shadow-elevated)]"
          >
            {/* Inner border glow */}
            <div className="absolute inset-0 rounded-[24px] pointer-events-none z-[1] border border-[rgba(255,255,255,0.05)]" />
            {/* Mesh */}
            <div
              className="absolute -inset-x-[10%] -top-[30%] h-[100%] z-0 pointer-events-none opacity-50 mesh-bg"
            />
            <div className="relative z-[2] max-w-[68ch]">
              <div className="flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[12.5px] uppercase tracking-[0.06em] text-[#BFBDD2] mb-3.5">
                <span>{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#BFBDD2]" />
                <span>{featured.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-[#BFBDD2]" />
                <span className="text-[#B9AEFF] font-semibold">{featured.tag}</span>
              </div>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-[1.25] mb-4 text-white">
                {featured.title}
              </h2>
              <p className="text-[16.5px] text-[#D2D0E2] leading-[1.65] mb-6">
                {featured.excerpt}
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="font-[family-name:var(--font-display)] font-bold text-[15.5px] no-underline inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[var(--indigo)] text-white hover:bg-[var(--indigo-deep)] hover:-translate-y-px transition-all shadow-[0_0_0_0_rgba(91,76,255,0.35)]"
                style={{ animation: "btnGlow 3s ease-in-out infinite" }}
              >
                Read the post
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All posts grid */}
      <section className="py-[70px] pt-10">
        <div className="wrap">
          <div className="flex justify-between items-end gap-8 mb-[36px] flex-wrap">
            <div>
              <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold tracking-tight">All posts</h2>
            </div>
            <p className="max-w-[34ch] text-[17px] text-[var(--ink-soft)]">
              New posts as engagements turn up something worth sharing — check back regularly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[var(--panel)] border border-[var(--panel-line)] rounded-[18px] overflow-hidden flex flex-col justify-between hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 hover:border-[rgba(91,76,255,0.2)] transition-all duration-300 group"
              >
                <Link href={`/blog/${post.slug}`} className="no-underline flex flex-col h-full justify-between">
                  <div className="p-6 pb-2">
                    <span className="font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.08em] bg-[var(--surface-secondary)] text-[var(--indigo)] border border-[var(--panel-line)] font-bold py-1 px-3 rounded-full inline-block mb-3.5 shadow-xs">
                      {post.tag}
                    </span>
                    <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.06em] text-[var(--ink-faint)] mb-3">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--ink-faint)]" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-[19px] font-extrabold leading-[1.32] text-[var(--ink)] mb-3 group-hover:text-[var(--indigo)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[15px] text-[var(--ink-soft)] leading-[1.6]">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="p-6 pt-4 mt-auto flex items-center gap-2 text-[14.5px] font-bold text-[var(--indigo)] group-hover:text-[var(--indigo-deep)]">
                    Read post
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
