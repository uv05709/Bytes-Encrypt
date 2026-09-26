"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Search, FileText, CheckCircle2, Terminal as TerminalIcon } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { EncryptedText } from "./EncryptedText";
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
    icon: <Search size={20} />,
    accentColor: "#5B4CFF",
  },
  {
    tag: "02",
    title: "Assess & Exploit",
    subtitle: "Manual Exploitation & Privilege Escalation",
    description:
      "Deep manual testing led by certified offensive specialists, backed by proprietary exploit scripts — chaining vulnerabilities to prove real-world business impact rather than superficial scanner alerts.",
    deliverables: ["Chained exploit path validation", "Business logic flaw exploitation", "Bypass testing of WAF & MFA controls"],
    icon: <Shield size={20} />,
    accentColor: "#F0483E",
  },
  {
    tag: "03",
    title: "Report Findings",
    subtitle: "Engineering-Grade Remediation Specs",
    description:
      "Severity-rated findings according to CVSS 3.1, complete with reproducible proof-of-concept videos, code snippets, and plain-language fixes that your developers can implement immediately.",
    deliverables: ["Reproducible step-by-step PoCs", "Executive risk assessment summary", "Direct Slack/Teams triage session"],
    icon: <FileText size={20} />,
    accentColor: "#F2A930",
  },
  {
    tag: "04",
    title: "Retest & Verify",
    subtitle: "Definitive Fix Validation & Letter of Attestation",
    description:
      "Once fixes ship, our testers retest the exact findings using the same exploit vectors. We confirm true remediation and issue a tamper-evident Letter of Attestation for your auditors and enterprise clients.",
    deliverables: ["Zero-cost retesting pass", "Remediation verification certificate", "Vendor compliance attestation report"],
    icon: <CheckCircle2 size={20} />,
    accentColor: "#17B978",
  },
];

export function Approach() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="approach" className="py-[96px] relative overflow-hidden" ref={containerRef}>
      {/* Background subtle mesh glow */}
      <div
        className="absolute -right-[15%] top-[20%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 z-0"
        style={{
          background: "radial-gradient(circle, rgba(91,76,255,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="wrap relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-end gap-8 mb-[60px] flex-wrap"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--indigo)]" />
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-bold tracking-[0.08em] uppercase text-[var(--indigo)]">
                <EncryptedText text="ENGAGEMENT METHODOLOGY" interval={40} />
              </p>
            </div>
            <h2 className="text-[clamp(2.1rem,3.4vw,2.8rem)] font-extrabold max-w-[20ch] tracking-tight text-[var(--ink)]">
              How an engagement runs, start to retest.
            </h2>
          </div>
          <p className="max-w-[34ch] text-[17.5px] text-[var(--ink-soft)] leading-relaxed">
            Four disciplined stages, always in this order — no shortcuts, and the retest is always included.
          </p>
        </motion.div>

        {/* Cinematic Split Layout: Tracing Beam & Timeline on Left/Center, Interactive Terminal on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Timeline column (Left - 7 cols) */}
          <div className="lg:col-span-7 relative">
            {/* Vertical Tracing Beam (Desktop) */}
            <div className="hidden sm:block absolute left-[27px] top-[24px] bottom-[40px] w-[3px] bg-[var(--panel-line)] z-0 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-[var(--indigo)] via-[#F0483E] to-[var(--mint)] rounded-full"
                initial={{ height: "0%" }}
                animate={isInView ? { height: "100%" } : { height: "0%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-6 sm:space-y-8 relative z-10">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <motion.div
                    key={step.tag}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    onClick={() => setActiveStep(idx)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Tracing Step Indicator Node */}
                      <div
                        className={`flex-none w-[54px] h-[54px] rounded-2xl flex items-center justify-center transition-all duration-300 font-[family-name:var(--font-mono)] font-bold text-[14px] shadow-sm ${
                          isActive
                            ? "bg-[var(--ink)] text-white ring-4 ring-[rgba(91,76,255,0.25)] scale-105"
                            : "bg-[var(--panel)] text-[var(--ink-soft)] border border-[var(--panel-line)] hover:border-[var(--indigo)]"
                        }`}
                        style={{
                          borderColor: isActive ? step.accentColor : undefined,
                        }}
                      >
                        {step.tag}
                      </div>

                      {/* Step Details Card */}
                      <SpotlightCard
                        spotlightColor={`${step.accentColor}12`}
                        borderGlowColor={step.accentColor}
                        className={`flex-1 p-6 sm:p-7 rounded-[22px] border transition-all duration-300 ${
                          isActive
                            ? "bg-white border-[rgba(91,76,255,0.35)] shadow-[var(--shadow-card-hover)]"
                            : "bg-[var(--panel)]/70 border-[var(--panel-line)] hover:bg-[var(--panel)]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="font-[family-name:var(--font-mono)] text-[12px] font-bold tracking-wider uppercase"
                            style={{ color: step.accentColor }}
                          >
                            {step.subtitle}
                          </span>
                          <span className="text-[var(--ink-faint)]">
                            {step.icon}
                          </span>
                        </div>

                        <h3 className="text-[20px] font-extrabold text-[var(--ink)] mb-2">
                          {step.title}
                        </h3>

                        <p className="text-[15.5px] text-[var(--ink-soft)] leading-relaxed mb-4">
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
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sticky Interactive Terminal on Right (Desktop - 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-[100px]">
            <div className="mb-4">
              <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold tracking-wider uppercase text-[var(--ink-faint)] flex items-center gap-1.5">
                <TerminalIcon size={14} className="text-[var(--indigo)]" />
                <span>OFFENSIVE TELEMETRY CONSOLE</span>
              </span>
            </div>

            <Terminal
              title="bytesencrypt-soc — audit-session-04"
              className="border border-[rgba(255,255,255,0.12)] shadow-2xl"
            />

            {/* Verification Guarantee Card */}
            <div className="mt-5 p-5 rounded-[18px] bg-[var(--panel)] border border-[var(--panel-line)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[rgba(23,185,120,0.12)] text-[var(--mint)] flex items-center justify-center flex-none font-bold">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[var(--ink)]">
                  Retest Guaranteed Closure
                </h4>
                <p className="text-[13px] text-[var(--ink-soft)] leading-snug mt-0.5">
                  We verify every patch before signing off. No finding is closed on assumptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
