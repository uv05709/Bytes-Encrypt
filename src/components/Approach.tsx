"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Scope & Recon",
    description:
      'We map the attack surface with you — assets, entry points, and what "success" looks like for an attacker.',
  },
  {
    title: "Assess & Exploit",
    description:
      "Manual testing led by our team, backed by tooling — chasing real exploit paths, not just scanner output.",
  },
  {
    title: "Report Findings",
    description:
      "Severity-rated findings with reproduction steps and remediation guidance your engineers can use.",
  },
  {
    title: "Retest & Verify",
    description:
      "Once fixes ship, we retest the same findings and confirm closure before the file is closed.",
  },
];

export function Approach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="py-[92px]">
      <div className="wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-end gap-8 mb-[50px] flex-wrap"
        >
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[16.5px] font-bold tracking-[0.08em] uppercase text-[var(--indigo)] mb-2">
              Our Approach
            </p>
            <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold max-w-[20ch]">
              How an engagement runs, start to retest
            </h2>
          </div>
          <p className="max-w-[32ch] text-[17px] text-[var(--ink-soft)]">
            Four stages, always in this order — no shortcuts on the retest.
          </p>
        </motion.div>

        {/* Stepper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-[14px] left-0 right-0 h-[3px] bg-[var(--panel-line)]">
            <div
              className="h-full bg-[var(--indigo)] rounded-full"
              style={{
                width: isInView ? "100%" : "0%",
                transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                className="relative pt-10 md:pt-10"
              >
                {/* Dot */}
                <span className="absolute top-0 md:top-0 left-0 w-[28px] h-[28px] rounded-full border-[3px] border-[var(--indigo)] bg-[var(--bg)] z-[2] flex items-center justify-center">
                  <span className="w-[10px] h-[10px] rounded-full bg-[var(--indigo)]" />
                </span>

                {/* Mobile connecting line */}
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute top-[28px] left-[13px] w-[3px] h-[calc(100%+32px)] bg-[var(--panel-line)]">
                    <div
                      className="w-full bg-[var(--indigo)] rounded-full"
                      style={{
                        height: isInView ? "100%" : "0%",
                        transition: `height 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + i * 0.2}s`,
                      }}
                    />
                  </div>
                )}

                <h3 className="text-[17px] font-bold mb-2">{step.title}</h3>
                <p className="text-[15px] text-[var(--ink-soft)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
