"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { SolutionCard } from "@/components/SolutionCard";
import { allSolutions } from "@/lib/solutions-data";

const filters = [
  { key: "all", label: "All practices" },
  { key: "offensive", label: "Offensive" },
  { key: "assurance", label: "Assurance" },
  { key: "advisory", label: "Advisory" },
];

const trustItems = [
  "Manual-first testing",
  "Severity-rated findings",
  "Retest included",
  "Plain-language reports",
];

export default function SolutionsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const filtered = activeFilter === "all"
    ? allSolutions
    : allSolutions.filter((s) => s.category === activeFilter);

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
            Solutions &amp; Offerings
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2.6rem,5.2vw,4.4rem)] font-extrabold leading-[1.04] max-w-[16ch] tracking-tight"
          >
            Ten checks across your{" "}
            <span className="bg-gradient-to-r from-[var(--indigo)] via-[#9E90FF] to-[var(--indigo)] bg-clip-text text-transparent">
              attack surface
            </span>
            .
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[19px] text-[var(--ink-soft)] max-w-[52ch] mt-6"
          >
            Every engagement is filed under one of three practices — offensive testing, assurance review, or advisory. Filter below to find what fits your scope.
          </motion.p>
        </div>
      </section>

      {/* Solutions grid section */}
      <section className="py-[92px] pt-4" ref={ref}>
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-end gap-8 mb-[36px] flex-wrap"
          >
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[16.5px] font-bold tracking-[0.08em] uppercase text-[var(--coral)] mb-2">
                Solutions &amp; Offerings
              </p>
              <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold max-w-[20ch] tracking-tight">
                Ten checks across your attack surface
              </h2>
            </div>
            <p className="max-w-[32ch] text-[17px] text-[var(--ink-soft)]">
              Filed under three practices — offensive testing, assurance review, or advisory. Filter by what you need.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap mb-7">
            {filters.map((f) => {
              const isActive = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`font-[family-name:var(--font-display)] font-semibold text-[15px] py-2 px-5 rounded-full border transition-all duration-180 cursor-pointer ${
                    isActive
                      ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-sm"
                      : "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Trust strip pill badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            {trustItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-[13.5px] font-semibold text-[var(--ink-soft)] bg-[var(--panel)] border border-[var(--panel-line)] py-2 px-4 rounded-full shadow-xs"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--mint)]">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {item}
              </div>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((solution, i) => (
              <SolutionCard key={solution.id} solution={solution} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </section>

      {/* Mini CTA */}
      <section className="py-[60px] pb-[92px]">
        <div className="wrap">
          <div className="bg-[var(--panel)] border border-[var(--panel-line)] rounded-[20px] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-[22px] font-bold mb-2">Ready to scope your assessment?</h3>
              <p className="text-[16px] text-[var(--ink-soft)] max-w-[42ch]">
                Tell us what needs testing and we&apos;ll come back with a plan and timeline — not a sales deck.
              </p>
            </div>
            <Link
              href="/#contact"
              className="font-[family-name:var(--font-display)] font-bold text-[15.5px] no-underline inline-flex items-center gap-2 py-3 px-[22px] rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-[220ms] hover:bg-[var(--indigo-deep)] hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(91,76,255,0.4)] flex-none"
              style={{ animation: "btnGlow 3s ease-in-out infinite" }}
            >
              Request an assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
