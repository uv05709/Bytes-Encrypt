"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SecurityPulse } from "./SecurityPulse";
import { Vitals } from "./Vitals";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-[70px] relative overflow-hidden">
      {/* Mesh gradient background */}
      <div
        className="absolute -inset-x-[10%] -top-[10%] h-[620px] z-0 pointer-events-none mesh-bg"
      />

      {/* Subtle grid overlay for depth */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(91,76,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,76,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          animation: "gridFade 1.5s ease-out forwards",
        }}
      />

      <div className="wrap relative z-[1] pb-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-mono)] text-[16.5px] font-semibold tracking-[0.08em] uppercase text-[var(--indigo)] inline-flex items-center gap-2 mb-[18px] bg-[rgba(91,76,255,0.08)] py-2 px-4 rounded-full border border-[rgba(91,76,255,0.1)]"
        >
          <span className="relative w-[7px] h-[7px] rounded-full bg-[var(--mint)]">
            <span className="absolute -inset-1 rounded-full border-[1.5px] border-[var(--mint)]" style={{ animation: "pingDot 1.8s ease-out infinite" }} />
          </span>
          Live security monitoring, plain-language reporting
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(2.6rem,5.2vw,4.4rem)] font-extrabold leading-[1.04] max-w-[16ch] tracking-tight"
        >
          A{" "}
          <span className="bg-gradient-to-r from-[#7A6BFF] via-[var(--indigo)] to-[#9E90FF] bg-clip-text text-transparent">
            health check
          </span>{" "}
          for your entire attack surface.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[19px] text-[var(--ink-soft)] max-w-[44ch] mt-6 leading-[1.7]"
        >
          BytesEncrypt Technologies is an offensive security and assurance partner. We monitor for
          the signal in the noise — testing apps, networks, cloud and people, then telling you
          exactly what to fix.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-3.5 mt-8 flex-wrap"
        >
          <Link
            href="#contact"
            className="font-[family-name:var(--font-display)] font-bold text-[15.5px] no-underline inline-flex items-center gap-2 py-3 px-[22px] rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-[220ms] hover:bg-[var(--indigo-deep)] hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(91,76,255,0.4)]"
            style={{ animation: "btnGlow 3s ease-in-out infinite" }}
          >
            Request an assessment
            <ArrowRight size={16} className="ml-0.5" />
          </Link>
          <Link
            href="/solutions"
            className="font-[family-name:var(--font-display)] font-bold text-[15.5px] no-underline inline-flex items-center gap-2 py-3 px-[22px] rounded-full bg-[var(--panel)] text-[var(--ink)] border border-[var(--panel-line)] transition-all duration-[220ms] hover:border-[var(--indigo)] hover:text-[var(--indigo)] hover:shadow-[var(--shadow-card)]"
          >
            View solutions
          </Link>
        </motion.div>

        <SecurityPulse />
        <Vitals />
      </div>
    </section>
  );
}
