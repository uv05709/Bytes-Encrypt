"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "./SpotlightCard";
import { AppWindow, Network, Cloud, Users } from "lucide-react";

interface VitalData {
  title: string;
  subtitle: string;
  targetPercent: number;
  colorName: string;
  strokeColor: string;
  dashoffset: number;
  icon: React.ReactNode;
}

const vitals: VitalData[] = [
  {
    title: "Application",
    subtitle: "WEB · API · MOBILE",
    targetPercent: 98,
    colorName: "indigo",
    strokeColor: "#5B4CFF",
    dashoffset: 18,
    icon: <AppWindow size={16} />,
  },
  {
    title: "Network",
    subtitle: "INFRA · WI-FI · EDGE",
    targetPercent: 96,
    colorName: "mint",
    strokeColor: "#17B978",
    dashoffset: 24,
    icon: <Network size={16} />,
  },
  {
    title: "Cloud",
    subtitle: "AWS · AZURE · GCP",
    targetPercent: 99,
    colorName: "coral",
    strokeColor: "#F0483E",
    dashoffset: 12,
    icon: <Cloud size={16} />,
  },
  {
    title: "People",
    subtitle: "PHISHING · SOCIAL ENG.",
    targetPercent: 92,
    colorName: "amber",
    strokeColor: "#F2A930",
    dashoffset: 32,
    icon: <Users size={16} />,
  },
];

function AnimatedCounter({ target, isVisible }: { target: number; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1200;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span>{count}%</span>;
}

function VitalRing({
  strokeColor,
  dashoffset,
  isVisible,
  targetPercent,
}: {
  strokeColor: string;
  dashoffset: number;
  isVisible: boolean;
  targetPercent: number;
}) {
  return (
    <div className="relative w-[82px] h-[82px] mx-auto mb-3.5 flex items-center justify-center">
      <svg width="82" height="82" viewBox="0 0 80 80" className="rotate-[-90deg]">
        {/* Background track */}
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          strokeWidth="6"
          stroke="var(--panel-line)"
        />
        {/* Glow halo */}
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          strokeWidth="12"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeDasharray="213"
          strokeDashoffset={isVisible ? dashoffset : 213}
          opacity="0.18"
          style={{
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {/* Active colored ring */}
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          strokeWidth="6"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeDasharray="213"
          strokeDashoffset={isVisible ? dashoffset : 213}
          style={{
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>

      {/* Central percentage counter */}
      <div className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-mono)] text-[15px] font-bold text-[var(--ink)]">
        <AnimatedCounter target={targetPercent} isVisible={isVisible} />
      </div>
    </div>
  );
}

export function Vitals() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-[18px] mt-12">
      {vitals.map((vital, i) => (
        <motion.div
          key={vital.title}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="h-full"
        >
          <SpotlightCard
            tiltEffect={true}
            spotlightColor={
              vital.colorName === "indigo"
                ? "rgba(91, 76, 255, 0.08)"
                : vital.colorName === "mint"
                ? "rgba(23, 185, 120, 0.08)"
                : vital.colorName === "coral"
                ? "rgba(240, 72, 62, 0.08)"
                : "rgba(242, 169, 48, 0.08)"
            }
            borderGlowColor={vital.strokeColor}
            className="bg-[var(--panel)] border border-[var(--panel-line)] rounded-[18px] py-[24px] px-[16px] text-center hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 group h-full flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(19,18,28,0.04)] text-[var(--ink-soft)] text-xs mb-3 font-[family-name:var(--font-mono)] group-hover:bg-[rgba(91,76,255,0.08)] group-hover:text-[var(--indigo)] transition-colors">
                <span className="text-[var(--indigo)]">{vital.icon}</span>
                <span>HEALTH SCORE</span>
              </div>

              <VitalRing
                strokeColor={vital.strokeColor}
                dashoffset={vital.dashoffset}
                isVisible={isVisible}
                targetPercent={vital.targetPercent}
              />

              <h4 className="text-[16px] font-bold mb-1 text-[var(--ink)] group-hover:text-[var(--indigo)] transition-colors duration-200">
                {vital.title}
              </h4>
            </div>

            <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--ink-faint)] tracking-wider mt-2 uppercase">
              {vital.subtitle}
            </p>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
}
