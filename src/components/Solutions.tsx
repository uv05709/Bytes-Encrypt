"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, BookOpen, Terminal, ArrowRight } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

interface TriadItem {
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  accentColor: string;
  stats: string;
}

const triadItems: TriadItem[] = [
  {
    title: "Offensive Solutions",
    tagline: "VAPT · CLOUD · INFRASTRUCTURE",
    description:
      "Full attack surface coverage — Web/API penetration testing, threat surface monitoring, ransomware vulnerability assessments, and 24/7 incident response engineered for high-growth enterprises.",
    href: "/solutions",
    icon: <Shield size={26} />,
    accentColor: "#5B4CFF",
    stats: "10 SPECIALIZED AUDIT PRACTICES",
  },
  {
    title: "Enterprise Trainings",
    tagline: "HANDS-ON LABS & WORKSHOPS",
    description:
      "Interactive offensive security sessions with live attack environments — Ethical Hacking, SOC Level 1/2 operations, DFIR, Malware Reverse Engineering, and Red/Blue Team simulation programs.",
    icon: <BookOpen size={26} />,
    accentColor: "#17B978",
    stats: "REAL-WORLD CYBER RANGE",
  },
  {
    title: "Offensive Bootcamps",
    tagline: "CAREER ACCELERATION & LABS",
    description:
      "Intensive attack simulations, 1-on-1 industry mentorship, offensive certifications prep, and direct placement support — forged to turn security engineers into elite penetration testers.",
    icon: <Terminal size={26} />,
    accentColor: "#F2A930",
    stats: "OFFENSIVE SPECIALIZATION",
  },
];

export function Solutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[96px] relative overflow-hidden">
      <div className="wrap" ref={ref}>
        <div className="bg-[var(--surface)] rounded-[28px] p-8 sm:p-12 md:p-14 relative overflow-hidden shadow-[var(--shadow-elevated)] border border-[var(--border)]">
          {/* Mesh background */}
          <div className="absolute -inset-x-[10%] -top-[30%] h-[120%] z-0 pointer-events-none opacity-30 dark:opacity-45 mesh-bg" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Header */}
          <div className="relative z-10 text-center max-w-[640px] mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-3 bg-[var(--surface-secondary)] py-1.5 px-3.5 rounded-full border border-[var(--border)]">
              <span className="w-2 h-2 rounded-full bg-[var(--mint)]" />
              <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-semibold tracking-wider uppercase text-[var(--indigo)]">
                CAPABILITIES ARCHITECTURE
              </span>
            </div>
            <h2 className="text-[clamp(2.1rem,3.4vw,2.8rem)] font-extrabold text-[var(--ink)] tracking-tight mb-3">
              Offensive depth across three core pillars.
            </h2>
            <p className="text-[16.5px] text-[var(--ink-soft)] leading-relaxed">
              From enterprise-grade vulnerability audits to frontline security engineering and talent development.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="relative z-[2] grid grid-cols-1 md:grid-cols-3 gap-6">
            {triadItems.map((item, i) => {
              const cardContent = (
                <SpotlightCard
                  tiltEffect={true}
                  spotlightColor={`${item.accentColor}14`}
                  borderGlowColor={item.accentColor}
                  className="bg-[var(--surface-secondary)] border border-[var(--border)] rounded-[22px] p-8 text-left hover:border-[var(--indigo)] transition-all duration-300 group h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-13 h-13 rounded-[15px] text-white flex items-center justify-center shadow-md group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300"
                        style={{
                          backgroundColor: item.accentColor,
                        }}
                      >
                        {item.icon}
                      </div>

                      <span className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1 rounded bg-[var(--surface)] text-[var(--ink-faint)] border border-[var(--border)] uppercase tracking-wider font-semibold">
                        {item.stats}
                      </span>
                    </div>

                    <h3 className="text-[var(--ink)] font-extrabold text-[21px] mb-1 group-hover:text-[var(--indigo)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[var(--mint)] tracking-wider mb-4 uppercase">
                      {item.tagline}
                    </p>

                    <p className="text-[var(--ink-soft)] text-[15px] leading-[1.65]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[var(--border)] flex items-center justify-between text-[13.5px] font-bold text-[var(--ink-faint)] group-hover:text-[var(--indigo)] transition-colors">
                    <span>Explore offerings</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300 text-[var(--mint)]" />
                  </div>
                </SpotlightCard>
              );

              if (item.href) {
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="h-full"
                  >
                    <Link href={item.href} className="no-underline block h-full">
                      {cardContent}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="h-full"
                >
                  {cardContent}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
