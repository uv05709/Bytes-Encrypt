"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { submitContactForm } from "@/app/actions";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message });
        reset();
      } else {
        setSubmitStatus({ type: "error", message: result.message });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="wrap">
        <div
          ref={ref}
          className="bg-[var(--ink)] rounded-[28px] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[var(--shadow-elevated)]"
        >
          {/* Mesh gradient */}
          <div
            className="absolute -inset-x-[10%] -top-[30%] h-[100%] z-0 pointer-events-none opacity-50 mesh-bg"
          />

          {/* Subtle inner border */}
          <div className="absolute inset-0 rounded-[28px] pointer-events-none z-[1] border border-[rgba(255,255,255,0.05)]" />

          <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-start">
            {/* Left: CTA text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <p className="font-[family-name:var(--font-mono)] text-[16.5px] font-semibold tracking-[0.08em] uppercase text-[#9E90FF] mb-4">
                Get Started
              </p>
              <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)] font-extrabold max-w-[15ch] text-white mb-4 leading-tight tracking-tight">
                Ready for your first checkup?
              </h2>
              <p className="text-[17.5px] text-[#D2D0E2] max-w-[38ch] leading-relaxed">
                Tell us what to scope — an app, a network, a cloud environment, or your whole estate.
                We&apos;ll come back with a plan and timeline, not a sales deck.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-3 mt-6">
                {["No CRM middleman", "Direct tester access", "NDA first"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11.5px] tracking-[0.05em] uppercase text-[#ACAAC2] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] py-1.5 px-3 rounded-full"
                  >
                    <CheckCircle2 size={12} className="text-[var(--mint)]" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Intake Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-[18px] p-7 backdrop-blur-md hover:border-[rgba(255,255,255,0.14)] transition-colors duration-300"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-[family-name:var(--font-mono)] text-[12.5px] tracking-[0.05em] uppercase text-[#ACAAC2] mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    {...register("name")}
                    className="w-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.05)] rounded-[10px] py-2.5 px-3.5 text-white font-[family-name:var(--font-display)] text-[15.5px] focus:border-[var(--indigo)] focus:shadow-[0_0_0_3px_rgba(91,76,255,0.15)] focus:outline-none transition-all duration-200 placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                  {errors.name && (
                    <span className="text-[13px] text-[#F0483E] mt-1 font-[family-name:var(--font-mono)] flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="font-[family-name:var(--font-mono)] text-[12.5px] tracking-[0.05em] uppercase text-[#ACAAC2] mb-1.5"
                  >
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    {...register("email")}
                    className="w-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.05)] rounded-[10px] py-2.5 px-3.5 text-white font-[family-name:var(--font-display)] text-[15.5px] focus:border-[var(--indigo)] focus:shadow-[0_0_0_3px_rgba(91,76,255,0.15)] focus:outline-none transition-all duration-200 placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                  {errors.email && (
                    <span className="text-[13px] text-[#F0483E] mt-1 font-[family-name:var(--font-mono)] flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="scope"
                    className="font-[family-name:var(--font-mono)] text-[12.5px] tracking-[0.05em] uppercase text-[#ACAAC2] mb-1.5"
                  >
                    What should we scope?
                  </label>
                  <textarea
                    id="scope"
                    rows={3}
                    placeholder="e.g. Web app + API, external network..."
                    {...register("scope")}
                    className="w-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.05)] rounded-[10px] py-2.5 px-3.5 text-white font-[family-name:var(--font-display)] text-[15.5px] focus:border-[var(--indigo)] focus:shadow-[0_0_0_3px_rgba(91,76,255,0.15)] focus:outline-none transition-all duration-200 resize-y min-h-[64px] placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                  {errors.scope && (
                    <span className="text-[13px] text-[#F0483E] mt-1 font-[family-name:var(--font-mono)] flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.scope.message}
                    </span>
                  )}
                </div>

                {submitStatus.type && (
                  <div
                    className={`p-3 rounded-[10px] text-[14px] font-semibold flex items-center gap-2 ${
                      submitStatus.type === "success"
                        ? "bg-[rgba(23,185,120,0.15)] text-[var(--mint)] border border-[var(--mint)]"
                        : "bg-[rgba(240,72,62,0.15)] text-[#F0483E] border border-[#F0483E]"
                    }`}
                  >
                    {submitStatus.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-[family-name:var(--font-display)] font-bold text-[15.5px] py-3 px-6 rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-220 hover:bg-[var(--indigo-deep)] hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(91,76,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit request
                      <Send size={15} />
                    </>
                  )}
                </button>

                <p className="font-[family-name:var(--font-mono)] text-[11.5px] text-[#ACAAC2] mt-2 text-center leading-relaxed">
                  Your request is sent straight to our team — no CRM in the middle.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
