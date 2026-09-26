"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { SolutionItem } from "@/lib/solutions-data";
import { SpotlightCard } from "./SpotlightCard";

function getSolutionIcon(id: string) {
  switch (id) {
    case "01":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[27px] h-[27px]">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
        </svg>
      );
    case "02":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[27px] h-[27px]">
          <rect x="7" y="2.5" width="10" height="19" rx="2" />
          <path d="M11 18.2h2" />
        </svg>
      );
    case "03":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[27px] h-[27px]">
          <circle cx="12" cy="4.5" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M12 6.5v5M12 11.5 5 16M12 11.5l7 4.5" />
        </svg>
      );
    case "04":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[27px] h-[27px]">
          <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
        </svg>
      );
    case "05":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[27px] h-[27px]">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <circle cx="8.5" cy="8.5" r="1" />
          <circle cx="15.5" cy="8.5" r="1" />
          <circle cx="8.5" cy="15.5" r="1" />
          <circle cx="15.5" cy="15.5" r="1" />
          <path d="M9.5 9.5l3.2 3.2M14.5 9.5l-3.2 3.2" />
        </svg>
      );
    case "06":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[27px] h-[27px]">
          <path d="M12 3v18M6 7l-3.5 6.5a3.5 3.5 0 0 0 7 0L6 7Zm12 0l-3.5 6.5a3.5 3.5 0 0 0 7 0L18 7ZM4.5 7h15M9 21h6" />
        </svg>
      );
    case "07":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[27px] h-[27px]">
          <path d="M12 3c4 3 7 3.6 7 3.6v5.4c0 4.4-3 7.3-7 9-4-1.7-7-4.6-7-9V6.6S8 6 12 3Z" />
          <path d="M9 12l2 2 4-4.5" />
        </svg>
      );
    case "08":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[27px] h-[27px]">
          <path d="M4 7h16M4 12h16M4 17h16" />
          <circle cx="8" cy="7" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="16" cy="12" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="10" cy="17" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "09":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[27px] h-[27px]">
          <circle cx="12" cy="7" r="3" />
          <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
          <path d="M17.5 9.5 19 11l2.2-2.2" />
        </svg>
      );
    case "10":
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[27px] h-[27px]">
          <rect x="6" y="4" width="12" height="17" rx="2" />
          <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
          <path d="M9 13l2 2 4-4.5" />
        </svg>
      );
  }
}

export function SolutionCard({
  solution,
  index,
  isInView,
}: {
  solution: SolutionItem;
  index: number;
  isInView: boolean;
}) {
  const isFeatured = solution.featured && index === 0;

  // Icon gradients
  const iconGradient = isFeatured
    ? "bg-gradient-to-br from-[#5B4CFF] to-[#7A6BFF]"
    : solution.category === "offensive"
    ? "bg-gradient-to-br from-[#F0483E] to-[#c9362c]"
    : solution.category === "assurance"
    ? "bg-gradient-to-br from-[#17B978] to-[#0f9c62]"
    : "bg-gradient-to-br from-[#F2A930] to-[#d99114]";

  const categoryColor = isFeatured
    ? "#5B4CFF"
    : solution.category === "offensive"
    ? "#F0483E"
    : solution.category === "assurance"
    ? "#17B978"
    : "#F2A930";

  // Category tag colors
  const tagClass = isFeatured
    ? "bg-[rgba(158,144,255,0.15)] text-[#B9AEFF]"
    : solution.category === "offensive"
    ? "bg-[rgba(240,72,62,0.1)] text-[#F0483E]"
    : solution.category === "assurance"
    ? "bg-[rgba(23,185,120,0.1)] text-[#17B978]"
    : "bg-[rgba(242,169,48,0.1)] text-[#F2A930]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`h-full ${isFeatured ? "md:col-span-2" : ""}`}
    >
      <SpotlightCard
        tiltEffect={true}
        spotlightColor={
          isFeatured
            ? "rgba(91, 76, 255, 0.22)"
            : `${categoryColor}15`
        }
        borderGlowColor={categoryColor}
        className="h-full group rounded-[22px] border border-[var(--panel-line)] hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-[var(--shadow-card-hover)]"
      >
        <Link
          href={`/solutions/${solution.slug}`}
          className={`block p-7 h-full flex flex-col justify-between no-underline rounded-[22px] ${
            isFeatured
              ? "bg-gradient-to-br from-[#12111d] to-[#1c1a2e] text-white"
              : "bg-[#F7F7FA] text-[#13121C]"
          }`}
        >
          <div>
            {/* Top Bar: Icon + ID + subtle category indicator */}
            <div className="flex items-start justify-between mb-5">
              <div
                className={`w-[60px] h-[60px] rounded-[16px] flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${iconGradient}`}
              >
                {getSolutionIcon(solution.id)}
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`font-[family-name:var(--font-mono)] text-[12.5px] tracking-[0.08em] font-semibold uppercase ${
                    isFeatured ? "text-[#B9AEFF]" : "text-[#716F87]"
                  }`}
                >
                  CHECK {solution.id}
                </span>
                {/* Subtle hover reveal indicator */}
                <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--mint)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  <span>AUDIT READY</span>
                </span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h3 className={`text-[19.5px] font-extrabold leading-[1.3] mb-2 ${isFeatured ? "text-white text-[23px]" : "text-[#13121C]"}`}>
              {solution.title}
              <br />
              <span className={`font-semibold ${isFeatured ? "text-[#C7C5D6] text-[18px]" : "text-[#3F3D52] text-[16px]"}`}>
                {solution.subtitle}
              </span>
            </h3>

            {/* Description */}
            <p className={`text-[15.5px] leading-[1.6] mb-5 ${isFeatured ? "text-[#C7C5D6] text-[16px]" : "text-[#3F3D52]"}`}>
              {solution.description}
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {solution.chips.map((chip) => (
                <span
                  key={chip}
                  className={`font-[family-name:var(--font-mono)] text-[11px] tracking-[0.03em] py-1.5 px-3 rounded-full ${
                    isFeatured
                      ? "bg-[rgba(255,255,255,0.08)] text-[#D2D0E2]"
                      : "bg-[rgba(19,18,28,0.05)] text-[#3F3D52]"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Card Bottom / Footer CTA */}
          <div className={`flex items-center justify-between pt-4 border-t ${isFeatured ? "border-[rgba(255,255,255,0.1)]" : "border-[#E6E5EF]"}`}>
            <span className={`font-[family-name:var(--font-mono)] text-[11.5px] font-bold tracking-[0.08em] uppercase py-1 px-3 rounded-full ${tagClass}`}>
              {solution.category}
            </span>
            <span
              className={`flex items-center gap-1.5 text-[14.5px] font-bold transition-all duration-200 ${
                isFeatured ? "text-[#B9AEFF] group-hover:text-white" : "text-[#5B4CFF] group-hover:text-[#4433E0]"
              }`}
            >
              View details
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </span>
          </div>
        </Link>
      </SpotlightCard>
    </motion.div>
  );
}
