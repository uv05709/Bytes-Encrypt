"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Pillar {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const pillars: Pillar[] = [
  {
    title: "Manual-first testing",
    description:
      "Automated scanners find the obvious. Our testers chase the exploit paths a scanner can't see.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3 4 7v5c0 4.5 3.4 8.5 8 9 4.6-.5 8-4.5 8-9V7l-8-4Z" />
      </svg>
    ),
  },
  {
    title: "Plain-language reports",
    description:
      "Every finding is written for the engineer who has to fix it, not just the auditor who has to file it.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16M4 12h10M4 18h13" />
      </svg>
    ),
  },
  {
    title: "Retest included",
    description:
      "We don't close a finding until we've verified the fix ourselves — no separate line item for that.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
];

export function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="py-[92px]">
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-end gap-8 mb-[50px] flex-wrap"
        >
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[16.5px] font-bold tracking-[0.08em] uppercase text-[var(--coral)] mb-2">
              Why BytesEncrypt
            </p>
            <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold max-w-[20ch] tracking-tight">
              Clarity, not just a scan report
            </h2>
          </div>
          <p className="max-w-[32ch] text-[17px] text-[var(--ink-soft)]">
            Three things every engagement holds to, regardless of scope.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
              className="bg-[var(--panel)] border border-[var(--panel-line)] rounded-[16px] p-7 hover:border-[var(--indigo)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[rgba(91,76,255,0.1)] flex items-center justify-center mb-5 text-[var(--indigo)] group-hover:bg-[rgba(91,76,255,0.15)] group-hover:scale-105 transition-all duration-300">
                {pillar.icon}
              </div>
              <h4 className="text-[15.5px] font-bold mb-2 group-hover:text-[var(--indigo)] transition-colors duration-200">{pillar.title}</h4>
              <p className="text-[15px] text-[var(--ink-soft)] leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
