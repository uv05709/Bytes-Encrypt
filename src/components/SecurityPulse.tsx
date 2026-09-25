"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const messages = [
  "SCANNING SURFACE...",
  "TRACING EXPLOIT PATH...",
  "ANOMALY CONFIRMED — HIGH SEVERITY",
  "GENERATING REMEDIATION STEPS",
  "RETEST SCHEDULED",
];

const ecgPath =
  "M0,45 H60 L70,10 L80,80 L95,45 H150 L158,38 L166,45 H200 H260 L270,10 L280,80 L295,45 H350 L358,38 L366,45 H400 H460 L470,10 L480,80 L495,45 H550 L558,38 L566,45 H600 H660 L670,10 L680,80 L695,45 H750 L758,38 L766,45 H800";

const exploitLabels = [
  { x: 70, text: "' OR 1=1 --" },
  { x: 270, text: "; whoami" },
  { x: 470, text: "/../etc/passwd" },
  { x: 670, text: "eval()" },
];

function EcgSvg() {
  return (
    <svg viewBox="0 -16 800 106" preserveAspectRatio="none" className="h-full w-1/2 flex-none">
      <path d={ecgPath} fill="none" stroke="#17B978" strokeWidth="2" />
      {exploitLabels.map((label) => (
        <text
          key={label.x}
          x={label.x}
          y={-4}
          textAnchor="middle"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          fontSize="11"
          fill="#F0483E"
        >
          {label.text}
        </text>
      ))}
    </svg>
  );
}

export function SecurityPulse() {
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerOpacity, setTickerOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOpacity(0);
      setTimeout(() => {
        setTickerIdx((prev) => (prev + 1) % messages.length);
        setTickerOpacity(1);
      }, 250);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-14 bg-[var(--ink)] rounded-[20px] py-[26px] relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-[26px] pb-[18px] font-[family-name:var(--font-mono)] text-[13px] tracking-[0.08em] uppercase text-[#ACAAC2]">
        <span>Security Pulse — Live Feed</span>
        <span>
          <b className="text-[var(--mint)] font-semibold">● </b>Monitoring
        </span>
      </div>

      {/* ECG wave */}
      <div className="w-full overflow-hidden h-[90px] relative">
        <div
          className="flex w-[200%] h-full"
          style={{ animation: "ecgScroll 6.4s linear infinite" }}
        >
          <EcgSvg />
          <EcgSvg />
        </div>
      </div>

      {/* Ticker */}
      <p
        className="px-[26px] pt-4 font-[family-name:var(--font-mono)] text-[14px] text-[var(--mint)] min-h-[18px] transition-opacity duration-300"
        style={{ opacity: tickerOpacity }}
      >
        {messages[tickerIdx]}
      </p>
    </motion.div>
  );
}
