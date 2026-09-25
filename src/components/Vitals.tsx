"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface VitalData {
  title: string;
  subtitle: string;
  color: string;
  strokeColor: string;
  dashoffset: number;
}

const vitals: VitalData[] = [
  { title: "Application", subtitle: "WEB · API · MOBILE", color: "indigo", strokeColor: "var(--indigo)", dashoffset: 24 },
  { title: "Network", subtitle: "INFRA · WI-FI · EDGE", color: "mint", strokeColor: "var(--mint)", dashoffset: 24 },
  { title: "Cloud", subtitle: "AWS · AZURE · GCP", color: "coral", strokeColor: "var(--coral)", dashoffset: 24 },
  { title: "People", subtitle: "PHISHING · SOCIAL ENG.", color: "amber", strokeColor: "var(--amber)", dashoffset: 24 },
];

function VitalRing({ strokeColor, dashoffset, isVisible }: { strokeColor: string; dashoffset: number; isVisible: boolean }) {
  return (
    <svg width="72" height="72" viewBox="0 0 80 80" className="mx-auto mb-3">
      <circle
        cx="40"
        cy="40"
        r="35"
        fill="none"
        strokeWidth="6"
        stroke="var(--panel-line)"
      />
      <circle
        cx="40"
        cy="40"
        r="35"
        fill="none"
        strokeWidth="6"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeDasharray="220"
        strokeDashoffset={isVisible ? dashoffset : 220}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
          transition: "stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </svg>
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
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-[18px] mt-14">
      {vitals.map((vital, i) => (
        <motion.div
          key={vital.title}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="bg-[var(--panel)] border border-[var(--panel-line)] rounded-[16px] py-[22px] px-[18px] text-center"
        >
          <VitalRing strokeColor={vital.strokeColor} dashoffset={vital.dashoffset} isVisible={isVisible} />
          <h4 className="text-[15.5px] font-bold mb-1">{vital.title}</h4>
          <p className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--ink-faint)]">
            {vital.subtitle}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
