"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Shield, Search, FileText, CheckCircle2, Terminal as TerminalIcon } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { Terminal } from "./Terminal";

interface Step {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: React.ReactNode;
  accentColor: string;
}

const steps: Step[] = [
  {
    tag: "01",
    title: "Scope & Recon",
    subtitle: "Attack Surface Mapping & Threat Modeling",
    description:
      'We map the attack surface with your engineering leaders — identifying public assets, hidden endpoints, API keys, and defining what "adversary success" looks like before launching payloads.',
    deliverables: ["Asset inventory & shadow API mapping", "Threat model & rules of engagement", "Zero-impact testing window alignment"],
    icon: <Search size={18} />,
    accentColor: "#5B4CFF",
  },
  {
    tag: "02",
    title: "Assess & Exploit",
    subtitle: "Manual Exploitation & Privilege Escalation",
    description:
      "Deep manual testing led by certified offensive specialists, backed by proprietary exploit scripts — chaining vulnerabilities to prove real-world business impact rather than superficial scanner alerts.",
    deliverables: ["Chained exploit path validation", "Business logic flaw exploitation", "Bypass testing of WAF & MFA controls"],
    icon: <Shield size={18} />,
    accentColor: "#F0483E",
  },
  {
    tag: "03",
    title: "Report Findings",
    subtitle: "Engineering-Grade Remediation Specs",
    description:
      "Severity-rated findings according to CVSS 3.1, complete with reproducible proof-of-concept videos, code snippets, and plain-language fixes that your developers can implement immediately.",
    deliverables: ["Reproducible step-by-step PoCs", "Executive risk assessment summary", "Direct Slack/Teams triage session"],
    icon: <FileText size={18} />,
    accentColor: "#F2A930",
  },
  {
    tag: "04",
    title: "Retest & Verify",
    subtitle: "Definitive Fix Validation & Letter of Attestation",
    description:
      "Once fixes ship, our testers retest the exact findings using the same exploit vectors. We confirm true remediation and issue a tamper-evident Letter of Attestation for your auditors and enterprise clients.",
    deliverables: ["Zero-cost retesting pass", "Remediation verification certificate", "Vendor compliance attestation report"],
    icon: <CheckCircle2 size={18} />,
    accentColor: "#17B978",
  },
];

export function Approach() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 65%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) {
        setActiveStep(0);
      } else if (latest < 0.5) {
        setActiveStep(1);
      } else if (latest < 0.75) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    });
  }, [scrollYProgress]);

  return (
    <section id="approach" className="py-[96px] relative overflow-hidden" ref={containerRef}>
      {/* Background ambient glow */}
      <div
        className="absolute -right-[15%] top-[25%] w-[480px] h-[480px] rounded-full pointer-events-none opacity-15 z-0"
        style={{
          background: "radial-gradient(circle, rgba(91,76,255,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="wrap relative z-10">
        {/* Section Header */}
        <div className="flex justify-between items-end gap-8 mb-[54px] flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--indigo)]" />
              <p className="font-[family-name:var(--font-mono)] text-[14px] font-bold tracking-[0.08em] uppercase text-[var(--indigo)]">
                ENGAGEMENT METHODOLOGY
              </p>
            </div>
            <h2 className="text-[clamp(2.1rem,3.4vw,2.8rem)] font-extrabold max-w-[20ch] tracking-tight text-[var(--ink)]">
              How an engagement runs, start to retest.
            </h2>
          </div>
          <p className="max-w-[34ch] text-[17px] text-[var(--ink-soft)] leading-relaxed">
            Four disciplined stages, always in this order — no shortcuts, and the retest is always included.
          </p>
        </div>

        {/* Cinematic Scroll-Driven Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Timeline column with Tracing Beam (Left - 7 cols) */}
          <div className="lg:col-span-7 relative">
            {/* Desktop Vertical Tracing Beam driven by scroll */}
            <div className="hidden sm:block absolute left-[26px] top-[28px] bottom-[36px] w-[3px] bg-[var(--panel-line)] z-0 rounded-full overflow-hidden">
              <motion.div
                className="w-full h-full bg-gradient-to-b from-[var(--indigo)] via-[#F0483E] to-[var(--mint)] origin-top"
                style={{ scaleY }}
              />
            </div>

            <div className="space-y-6 sm:space-y-7 relative z-10">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <div
                    key={step.tag}
                    onClick={() => setActiveStep(idx)}
                    className="cursor-pointer transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Tracing Step Indicator Node */}
                      <div
                        className={`flex-none w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all duration-300 font-[family-name:var(--font-mono)] font-bold text-[14px] shadow-xs ${
                          isActive
                            ? "bg-[var(--ink)] text-white ring-4 ring-[rgba(91,76,255,0.2)] scale-105"
                            : "bg-[var(--panel)] text-[var(--ink-soft)] border border-[var(--panel-line)] hover:border-[var(--indigo)]"
                        }`}
                        style={{
                          borderColor: isActive ? step.accentColor : undefined,
                        }}
                      >
                        {step.tag}
                      </div>

                      {/* Step Details Card with scroll-driven brightness */}
                      <SpotlightCard
                        spotlightColor={`${step.accentColor}10`}
                        borderGlowColor={step.accentColor}
                        className={`flex-1 p-6 sm:p-7 rounded-[22px] border transition-all duration-300 ${
                          isActive
                            ? "bg-white border-[rgba(91,76,255,0.3)] shadow-[var(--shadow-card-hover)] opacity-100"
                            : "bg-[var(--panel)]/60 border-[var(--panel-line)] hover:bg-[var(--panel)] opacity-75 hover:opacity-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold tracking-wider uppercase"
                            style={{ color: step.accentColor }}
                          >
                            {step.subtitle}
                          </span>
                          <span className="text-[var(--ink-faint)]">
                            {step.icon}
                          </span>
                        </div>

                        <h3 className="text-[19.5px] font-extrabold text-[var(--ink)] mb-2">
                          {step.title}
                        </h3>

                        <p className="text-[15px] text-[var(--ink-soft)] leading-relaxed mb-4">
                          {step.description}
                        </p>

                        {/* Deliverables tags */}
                        <div className="pt-3 border-t border-[var(--panel-line)]/60 flex flex-wrap gap-2">
                          {step.deliverables.map((item) => (
                            <span
                              key={item}
                              className="font-[family-name:var(--font-mono)] text-[11px] py-1 px-2.5 rounded-md bg-[rgba(19,18,28,0.04)] text-[var(--ink-soft)] flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.accentColor }} />
                              {item}
                            </span>
                          ))}
                        </div>
                      </SpotlightCard>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Visual Console on Right (Desktop - 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-[90px]">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-semibold tracking-wider uppercase text-[var(--ink-faint)] flex items-center gap-1.5">
                <TerminalIcon size={14} className="text-[var(--indigo)]" />
                <span>OFFENSIVE AUDIT CONSOLE</span>
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--mint)] font-bold">
                STAGE 0{activeStep + 1} ACTIVE
              </span>
            </div>

            <Terminal
              title="bytesencrypt-soc — audit-session-04"
              className="border border-[rgba(255,255,255,0.12)] shadow-xl"
            />

            {/* Verification Guarantee Card */}
            <div className="mt-4 p-4.5 rounded-[18px] bg-[var(--panel)] border border-[var(--panel-line)] flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[rgba(23,185,120,0.12)] text-[var(--mint)] flex items-center justify-center flex-none font-bold">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h4 className="text-[14.5px] font-bold text-[var(--ink)]">
                  Retest Guaranteed Closure
                </h4>
                <p className="text-[12.5px] text-[var(--ink-soft)] leading-snug mt-0.5">
                  Every finding undergoes independent fix validation before signoff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
