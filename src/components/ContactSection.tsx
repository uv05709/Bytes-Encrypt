"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { submitContactForm } from "@/app/actions";
import { Send, CheckCircle2, AlertCircle, Lock, Radio, KeyRound } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [submissionPhase, setSubmissionPhase] = useState<
    "idle" | "connecting" | "validating" | "handshake" | "received" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmissionPhase("connecting");

      const validatingTimer = setTimeout(() => {
        setSubmissionPhase("validating");
      }, 500);

      const result = await submitContactForm(data);
      clearTimeout(validatingTimer);

      if (result.success) {
        setSubmissionPhase("handshake");
        setTimeout(() => {
          setSubmissionPhase("received");
          setStatusMessage(result.message);
          reset();
        }, 600);
      } else {
        setSubmissionPhase("error");
        setStatusMessage(result.message || "Failed to establish channel.");
      }
    } catch {
      setSubmissionPhase("error");
      setStatusMessage("Something went wrong establishing the secure channel.");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="wrap">
        <div
          ref={ref}
          className="bg-[var(--surface)] rounded-[28px] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[var(--shadow-elevated)] border border-[var(--border)]"
        >
          {/* Mesh gradient background */}
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

          <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">
            {/* Left: Security Briefing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 mb-4 bg-[var(--surface-secondary)] py-1.5 px-3.5 rounded-full border border-[var(--border)]">
                <Lock size={13} className="text-[var(--indigo)]" />
                <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold tracking-wider uppercase text-[var(--indigo)]">
                  ENCRYPTED INTAKE PIPELINE
                </span>
              </div>

              <h2 className="text-[clamp(2.1rem,3.6vw,2.9rem)] font-extrabold max-w-[15ch] text-[var(--ink)] mb-5 leading-tight tracking-tight">
                Establish a secure channel.
              </h2>

              <p className="text-[17px] text-[var(--ink-soft)] max-w-[40ch] leading-relaxed mb-8">
                Tell us what to scope — an application, cloud infrastructure, or your entire attack surface.
                You connect directly with certified offensive security engineers, not sales reps.
              </p>

              {/* Security Protocol Chips */}
              <div className="space-y-3 mb-8">
                {[
                  { title: "Direct Tester Engagement", desc: "No CRM or account managers filtering your requirements" },
                  { title: "Zero-Knowledge Mutual NDA", desc: "All scoping details protected under strict bilateral confidentiality" },
                  { title: "Transparent Retesting", desc: "Comprehensive fix validation included with every assessment" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 p-3.5 rounded-[14px] bg-[var(--surface-secondary)] border border-[var(--border)]"
                  >
                    <CheckCircle2 size={18} className="text-[var(--mint)] flex-none mt-0.5" />
                    <div>
                      <h4 className="text-[14.5px] font-bold text-[var(--ink)]">{item.title}</h4>
                      <p className="text-[12.5px] text-[var(--ink-soft)] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-[12px] font-[family-name:var(--font-mono)] text-[var(--ink-faint)]">
                <Radio size={14} className="text-[var(--mint)] animate-pulse" />
                <span>CHANNEL STATUS: READY TO HANDSHAKE</span>
              </div>
            </motion.div>

            {/* Right: The Secure Channel Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <SpotlightCard
                spotlightColor="rgba(91, 76, 255, 0.12)"
                borderGlowColor="var(--indigo)"
                className="bg-[var(--surface-secondary)] border border-[var(--border)] rounded-[22px] p-7 sm:p-8 backdrop-blur-md"
              >
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <KeyRound size={16} className="text-[var(--mint)]" />
                    <span className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[var(--ink)] tracking-wider">
                      ESTABLISH SECURE CHANNEL
                    </span>
                  </div>
                  <span className="text-[11px] font-[family-name:var(--font-mono)] px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--mint)] border border-[var(--border)] font-semibold">
                    TLS 1.3
                  </span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                  {/* Name field */}
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-1.5">
                      <label
                        htmlFor="name"
                        className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.05em] uppercase text-[var(--ink-soft)] font-semibold"
                      >
                        Full Name &amp; Title
                      </label>
                      {dirtyFields.name && !errors.name && (
                        <span className="text-[11px] font-[family-name:var(--font-mono)] text-[var(--mint)] flex items-center gap-1 font-semibold">
                          <CheckCircle2 size={11} /> VALID
                        </span>
                      )}
                    </div>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Alex Mercer, VP Engineering"
                      {...register("name")}
                      className={`w-full border rounded-[12px] py-3 px-4 text-[var(--ink)] font-[family-name:var(--font-display)] text-[15px] bg-[var(--surface)] transition-all duration-200 placeholder:text-[var(--ink-faint)] focus:outline-none ${
                        errors.name
                          ? "border-[var(--coral)] shadow-[0_0_0_3px_rgba(240,72,62,0.15)]"
                          : "border-[var(--border)] focus:border-[var(--indigo)] focus:shadow-[0_0_0_3px_var(--indigo-glow)]"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[12.5px] text-[var(--coral)] mt-1.5 font-[family-name:var(--font-mono)] flex items-center gap-1.5 font-medium">
                        <AlertCircle size={12} />
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Work Email field */}
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-1.5">
                      <label
                        htmlFor="email"
                        className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.05em] uppercase text-[var(--ink-soft)] font-semibold"
                      >
                        Corporate Email
                      </label>
                      {dirtyFields.email && !errors.email && (
                        <span className="text-[11px] font-[family-name:var(--font-mono)] text-[var(--mint)] flex items-center gap-1 font-semibold">
                          <CheckCircle2 size={11} /> VALID
                        </span>
                      )}
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="alex@company.com"
                      {...register("email")}
                      className={`w-full border rounded-[12px] py-3 px-4 text-[var(--ink)] font-[family-name:var(--font-display)] text-[15px] bg-[var(--surface)] transition-all duration-200 placeholder:text-[var(--ink-faint)] focus:outline-none ${
                        errors.email
                          ? "border-[var(--coral)] shadow-[0_0_0_3px_rgba(240,72,62,0.15)]"
                          : "border-[var(--border)] focus:border-[var(--indigo)] focus:shadow-[0_0_0_3px_var(--indigo-glow)]"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[12.5px] text-[var(--coral)] mt-1.5 font-[family-name:var(--font-mono)] flex items-center gap-1.5 font-medium">
                        <AlertCircle size={12} />
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Scope details */}
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-1.5">
                      <label
                        htmlFor="scope"
                        className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.05em] uppercase text-[var(--ink-soft)] font-semibold"
                      >
                        Scope Target &amp; Timeline
                      </label>
                      {dirtyFields.scope && !errors.scope && (
                        <span className="text-[11px] font-[family-name:var(--font-mono)] text-[var(--mint)] flex items-center gap-1 font-semibold">
                          <CheckCircle2 size={11} /> VALID
                        </span>
                      )}
                    </div>
                    <textarea
                      id="scope"
                      rows={3}
                      placeholder="e.g. Next.js Web App + GraphQL API, AWS cloud architecture, SOC 2 compliance readiness..."
                      {...register("scope")}
                      className={`w-full border rounded-[12px] py-3 px-4 text-[var(--ink)] font-[family-name:var(--font-display)] text-[15px] bg-[var(--surface)] transition-all duration-200 resize-y min-h-[75px] placeholder:text-[var(--ink-faint)] focus:outline-none ${
                        errors.scope
                          ? "border-[var(--coral)] shadow-[0_0_0_3px_rgba(240,72,62,0.15)]"
                          : "border-[var(--border)] focus:border-[var(--indigo)] focus:shadow-[0_0_0_3px_var(--indigo-glow)]"
                      }`}
                    />
                    {errors.scope && (
                      <span className="text-[12.5px] text-[var(--coral)] mt-1.5 font-[family-name:var(--font-mono)] flex items-center gap-1.5 font-medium">
                        <AlertCircle size={12} />
                        {errors.scope.message}
                      </span>
                    )}
                  </div>

                  {/* Success State Notification (Only upon real submission success) */}
                  {submissionPhase === "received" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-[12px] bg-[rgba(23,185,120,0.12)] text-[var(--mint)] border border-[var(--mint)] font-[family-name:var(--font-mono)] text-[13.5px] flex items-center gap-2.5"
                    >
                      <CheckCircle2 size={18} className="flex-none" />
                      <div>
                        <div className="font-bold tracking-wider">REQUEST RECEIVED ✓</div>
                        <div className="text-[12px] opacity-90">{statusMessage}</div>
                      </div>
                    </motion.div>
                  )}

                  {/* Error State Notification */}
                  {submissionPhase === "error" && (
                    <div className="p-3.5 rounded-[12px] bg-[rgba(240,72,62,0.12)] text-[var(--coral)] border border-[var(--coral)] font-[family-name:var(--font-mono)] text-[13px] flex items-center gap-2">
                      <AlertCircle size={16} />
                      {statusMessage}
                    </div>
                  )}

                  {/* Submit Button with Phase State Machine */}
                  <button
                    type="submit"
                    disabled={isSubmitting || submissionPhase === "connecting" || submissionPhase === "validating" || submissionPhase === "handshake"}
                    className="font-[family-name:var(--font-display)] font-bold text-[15.5px] py-3.5 px-6 rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-200 hover:bg-[var(--indigo-deep)] hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(91,76,255,0.45)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer w-full flex items-center justify-center gap-2.5 mt-2"
                  >
                    {submissionPhase === "connecting" ? (
                      <span className="flex items-center gap-2 font-[family-name:var(--font-mono)] tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        CONNECTING...
                      </span>
                    ) : submissionPhase === "validating" ? (
                      <span className="flex items-center gap-2 font-[family-name:var(--font-mono)] tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[var(--amber)] animate-ping" />
                        VALIDATING REQUEST...
                      </span>
                    ) : submissionPhase === "handshake" ? (
                      <span className="flex items-center gap-2 font-[family-name:var(--font-mono)] tracking-wider text-[var(--mint)]">
                        <span className="w-2 h-2 rounded-full bg-[var(--mint)] animate-pulse" />
                        SECURE CHANNEL...
                      </span>
                    ) : submissionPhase === "received" ? (
                      <span className="flex items-center gap-2 font-[family-name:var(--font-mono)] tracking-wider text-[var(--mint)]">
                        REQUEST RECEIVED ✓
                      </span>
                    ) : (
                      <>
                        Establish Channel
                        <Send size={15} />
                      </>
                    )}
                  </button>

                  <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-faint)] text-center leading-relaxed mt-1">
                    Direct cryptographic payload dispatch. Guaranteed response within 24 hours.
                  </p>
                </form>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
