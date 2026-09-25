"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TriadItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

const triadItems: TriadItem[] = [
  {
    title: "Solutions",
    description:
      "Complete security coverage — VAPT audits, threat monitoring, ransomware prevention, cloud security & 24/7 incident response engineered for enterprises.",
    href: "/solutions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <circle cx="10" cy="8" r="3.2" />
        <path d="M4.5 20c0-3.6 2.5-6.2 5.5-6.2M17.5 8.5a2.6 2.6 0 1 1 0 5.2M15 20v-2.2a2.8 2.8 0 0 1 2.5-2.8 2.8 2.8 0 0 1 2.5 2.8V20l-2.5 1.4L15 20Z" />
      </svg>
    ),
  },
  {
    title: "Trainings",
    description:
      "Hands-on cybersecurity sessions with labs — Ethical Hacking, SOC, DFIR, Malware Analysis, Network Defense and Red/Blue Team practical programs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M2 8 12 4l10 4-10 4L2 8Z" />
        <path d="M6 10v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" />
        <path d="M21 8v6" />
      </svg>
    ),
  },
  {
    title: "Bootcamps",
    description:
      "Real attack labs, mentorship, certifications and job assistance — designed to turn learners into cyber professionals ready for industry challenges.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M2 20h20M9 10.5 7 12l2 1.5M15 10.5 17 12l-2 1.5" />
      </svg>
    ),
  },
];

export function Solutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[92px]">
      <div className="wrap" ref={ref}>
        <div className="bg-[var(--ink)] rounded-[28px] p-8 md:p-14 relative overflow-hidden">
          {/* Mesh background */}
          <div
            className="absolute -inset-x-[10%] -top-[30%] h-[100%] z-0 pointer-events-none opacity-45"
            style={{
              background: `
                radial-gradient(480px 320px at 15% 20%, rgba(91,76,255,.16), transparent 65%),
                radial-gradient(420px 300px at 85% 10%, rgba(23,185,120,.14), transparent 65%),
                radial-gradient(380px 280px at 60% 60%, rgba(240,72,62,.08), transparent 65%)
              `,
              animation: "meshDrift 16s ease-in-out infinite alternate",
            }}
          />

          <div className="relative z-[1] grid grid-cols-1 md:grid-cols-3 gap-5">
            {triadItems.map((item, i) => {
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-9 text-center hover:border-[rgba(139,124,255,0.4)] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 group h-full flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-[var(--indigo)] to-[#7A6BFF] text-white flex items-center justify-center mx-auto mb-5 shadow-[0_10px_22px_-8px_rgba(91,76,255,0.55)] group-hover:scale-105 group-hover:-rotate-3 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-[var(--mint)] font-extrabold text-[20.5px] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#D2D0E2] text-[15.5px] leading-[1.65]">
                    {item.description}
                  </p>
                </motion.div>
              );

              if (item.href) {
                return (
                  <Link key={item.title} href={item.href} className="no-underline block h-full">
                    {content}
                  </Link>
                );
              }
              return (
                <div key={item.title} className="h-full">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
