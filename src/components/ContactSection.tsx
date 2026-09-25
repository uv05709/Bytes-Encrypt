"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { submitContactForm } from "@/app/actions";

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
          className="bg-[var(--ink)] rounded-[28px] p-8 sm:p-12 md:p-16 relative overflow-hidden"
        >
          {/* Mesh gradient */}
          <div
            className="absolute -inset-x-[10%] -top-[30%] h-[100%] z-0 pointer-events-none opacity-50"
            style={{
              background: `
                radial-gradient(480px 320px at 15% 20%, rgba(91,76,255,.16), transparent 65%),
                radial-gradient(420px 300px at 85% 10%, rgba(23,185,120,.14), transparent 65%),
                radial-gradient(380px 280px at 60% 60%, rgba(240,72,62,.08), transparent 65%)
              `,
              animation: "meshDrift 16s ease-in-out infinite alternate",
            }}
          />

          <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-start">
            {/* Left: CTA text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <p className="font-[family-name:var(--font-mono)] text-[16.5px] font-semibold tracking-[0.08em] uppercase text-[#9E90FF] mb-4">
                Get Started
              </p>
              <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)] font-extrabold max-w-[15ch] text-white mb-4 leading-tight">
                Ready for your first checkup?
              </h2>
              <p className="text-[17.5px] text-[#D2D0E2] max-w-[38ch] leading-relaxed">
                Tell us what to scope — an app, a network, a cloud environment, or your whole estate.
                We&apos;ll come back with a plan and timeline, not a sales deck.
              </p>
            </motion.div>

            {/* Right: Intake Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-[18px] p-7 backdrop-blur-md"
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
                    className="w-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.05)] rounded-[10px] py-2.5 px-3.5 text-white font-[family-name:var(--font-display)] text-[15.5px] focus:border-[var(--indigo)] focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <span className="text-[13px] text-[#F0483E] mt-1 font-[family-name:var(--font-mono)]">
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
                    className="w-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.05)] rounded-[10px] py-2.5 px-3.5 text-white font-[family-name:var(--font-display)] text-[15.5px] focus:border-[var(--indigo)] focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <span className="text-[13px] text-[#F0483E] mt-1 font-[family-name:var(--font-mono)]">
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
                    className="w-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.05)] rounded-[10px] py-2.5 px-3.5 text-white font-[family-name:var(--font-display)] text-[15.5px] focus:border-[var(--indigo)] focus:outline-none transition-colors resize-y min-h-[64px]"
                  />
                  {errors.scope && (
                    <span className="text-[13px] text-[#F0483E] mt-1 font-[family-name:var(--font-mono)]">
                      {errors.scope.message}
                    </span>
                  )}
                </div>

                {submitStatus.type && (
                  <div
                    className={`p-3 rounded-[10px] text-[14px] font-semibold ${
                      submitStatus.type === "success"
                        ? "bg-[rgba(23,185,120,0.15)] text-[var(--mint)] border border-[var(--mint)]"
                        : "bg-[rgba(240,72,62,0.15)] text-[#F0483E] border border-[#F0483E]"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-[family-name:var(--font-display)] font-bold text-[15.5px] py-3 px-6 rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-220 hover:bg-[var(--indigo-deep)] hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full flex items-center justify-center gap-2 mt-2 shadow-[0_0_0_0_rgba(91,76,255,0.35)] hover:shadow-[0_0_0_8px_transparent]"
                >
                  {isSubmitting ? "Submitting..." : "Submit request"}
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
