"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, FileCode, CheckCircle2, Lock } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

interface Pillar {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  accentColor: string;
}

const pillars: Pillar[] = [
  {
    title: "Manual-first testing",
    subtitle: "Real Exploit Chains, Not Just Scanners",
    description:
      "Automated scanners find superficial CVEs. Our certified offensive engineers uncover multi-step exploit paths, authorization flaws, and business logic bugs that automated tools miss.",
    icon: <ShieldCheck size={24} />,
    badge: "HUMAN INTELLIGENCE",
    accentColor: "#F0483E",
  },
  {
    title: "Plain-language reports",
    subtitle: "Actionable Specs for Engineers",
    description:
      "Every finding includes step-by-step reproduction code, CVSS scoring, and concrete code-level remediation steps. Written for the engineers who fix the issue, not just compliance auditors.",
    icon: <FileCode size={24} />,
    badge: "ENGINEERING READY",
    accentColor: "#5B4CFF",
  },
  {
    title: "Retest included",
    subtitle: "Guaranteed Verification Protocol",
    description:
      "We never close an assessment until we independently retest every deployed fix. Our complimentary retesting pass ensures true vulnerability closure with tamper-evident attestation.",
    icon: <CheckCircle2 size={24} />,
    badge: "ASSURANCE FIRST",
    accentColor: "#17B978",
  },
];

export function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="py-[96px] relative overflow-hidden">
      {/* Subtle ambient background */}
      <div
        className="absolute left-[10%] bottom-[10%] w-[420px] h-[420px] rounded-full pointer-events-none opacity-20 z-0"
        style={{
          background: "radial-gradient(circle, rgba(23,185,120,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="wrap relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-end gap-8 mb-[54px] flex-wrap"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--coral)]" />
              <p className="font-[family-name:var(--font-mono)] text-[14px] font-bold tracking-[0.08em] uppercase text-[var(--coral)]">
                THE BYTESENCRYPT ADVANTAGE
              </p>
            </div>
            <h2 className="text-[clamp(2.1rem,3.4vw,2.8rem)] font-extrabold max-w-[20ch] tracking-tight text-[var(--ink)]">
              Clarity, not just a scan report.
            </h2>
          </div>
          <p className="max-w-[34ch] text-[17.5px] text-[var(--ink-soft)] leading-relaxed">
            Three non-negotiable principles in every engagement, regardless of company scale or scope.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.12 }}
              className="h-full"
            >
              <SpotlightCard
                tiltEffect={true}
                spotlightColor={`${pillar.accentColor}12`}
                borderGlowColor={pillar.accentColor}
                className="bg-[var(--panel)] border border-[var(--panel-line)] rounded-[22px] p-8 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 group h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-13 h-13 rounded-[16px] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-xs"
                      style={{
                        backgroundColor: `${pillar.accentColor}18`,
                        color: pillar.accentColor,
                      }}
                    >
                      {pillar.icon}
                    </div>

                    <span
                      className="font-[family-name:var(--font-mono)] text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-md"
                      style={{
                        backgroundColor: `${pillar.accentColor}15`,
                        color: pillar.accentColor,
                      }}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-[19px] font-extrabold mb-1.5 text-[var(--ink)] group-hover:text-[var(--indigo)] transition-colors duration-200">
                    {pillar.title}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--ink-faint)] uppercase tracking-wide mb-4">
                    {pillar.subtitle}
                  </p>

                  <p className="text-[15.5px] text-[var(--ink-soft)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--panel-line)]/80 flex items-center gap-2 text-[12px] font-[family-name:var(--font-mono)] text-[var(--ink-faint)]">
                  <Lock size={12} className="text-[var(--mint)]" />
                  <span>STANDARD ENGAGEMENT PROTOCOL</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
