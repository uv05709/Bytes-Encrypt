"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { EncryptedText } from "./EncryptedText";

const messages = [
  "SCANNING SURFACE — CHECKING OPEN PORTS & ENDPOINTS...",
  "TRACING EXPLOIT PATH — ANALYZING ZERO-DAY VECTOR...",
  "ANOMALY MITIGATED — PERIMETER FIREWALL RECONFIGURED",
  "GENERATING ACTIONABLE REMEDIATION GUIDANCE FOR ENGINEERS...",
  "RETEST CYCLE SCHEDULED — COMPREHENSIVE FIX VALIDATION",
];

const ecgPath =
  "M0,45 H60 L70,10 L80,80 L95,45 H150 L158,38 L166,45 H200 H260 L270,10 L280,80 L295,45 H350 L358,38 L366,45 H400 H460 L470,10 L480,80 L495,45 H550 L558,38 L566,45 H600 H660 L670,10 L680,80 L695,45 H750 L758,38 L766,45 H800";

const exploitLabels = [
  { x: 70, text: "' OR 1=1 --", sev: "HIGH" },
  { x: 270, text: "; whoami", sev: "CRIT" },
  { x: 470, text: "/../etc/passwd", sev: "HIGH" },
  { x: 670, text: "eval() / SSRF", sev: "MED" },
];

function EcgSvg() {
  return (
    <svg viewBox="0 -16 800 106" preserveAspectRatio="none" className="h-full w-1/2 flex-none">
      <path d={ecgPath} fill="none" stroke="#17B978" strokeWidth="2.2" opacity="0.9" />
      {/* Outer glow stroke */}
      <path d={ecgPath} fill="none" stroke="#17B978" strokeWidth="6" opacity="0.16" />
      {exploitLabels.map((label) => (
        <g key={label.x}>
          <text
            x={label.x}
            y={-2}
            textAnchor="middle"
            fontFamily="var(--font-mono), JetBrains Mono, monospace"
            fontSize="10.5"
            fontWeight="bold"
            fill="#F0483E"
          >
            {label.text}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function SecurityPulse() {
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerOpacity, setTickerOpacity] = useState(1);
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOpacity(0);
      setTimeout(() => {
        setTickerIdx((prev) => (prev + 1) % messages.length);
        setTickerOpacity(1);
      }, 250);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-12 bg-[#0d0c16] rounded-[22px] py-[22px] relative overflow-hidden shadow-[var(--shadow-elevated)] border border-[rgba(255,255,255,0.08)]"
    >
      {/* Ambient background glow */}
      <div
        className="absolute -inset-[2px] rounded-[24px] pointer-events-none z-0 opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(91,76,255,0.15), transparent 50%, rgba(23,185,120,0.1))",
        }}
      />

      {/* Cyber grid subtle overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Vertical Scanning laser line */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-25"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(23,185,120,0.4) 50%, transparent 100%)",
          height: "30%",
          animation: "scanSweep 3.2s ease-in-out infinite alternate",
        }}
      />

      {/* Header bar */}
      <div className="relative z-[2] flex flex-wrap justify-between items-center gap-3 px-5 sm:px-7 pb-4 border-b border-[rgba(255,255,255,0.06)] font-[family-name:var(--font-mono)] text-[12.5px] text-[#ACAAC2]">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 text-white font-semibold">
            <Radio size={14} className="text-[var(--mint)] animate-pulse" />
            <span>SECURITY PULSE</span>
          </span>
          <span className="text-[#716F87] hidden sm:inline">•</span>
          <span className="text-[#9E90FF] hidden md:inline">
            <EncryptedText text="TELEMETRY FEED v2.4" interval={40} />
          </span>
        </div>

        {/* Telemetry info chips */}
        <div className="flex items-center gap-3 flex-wrap">
          {timestamp && (
            <span className="text-[11px] text-[#716F87] hidden lg:inline">
              SYS: {timestamp}
            </span>
          )}
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(23,185,120,0.1)] border border-[rgba(23,185,120,0.25)] text-[var(--mint)] text-[11px] font-semibold">
            <span className="relative w-[6px] h-[6px] rounded-full bg-[var(--mint)]">
              <span
                className="absolute -inset-0.5 rounded-full bg-[var(--mint)] opacity-50"
                style={{ animation: "pingDot 2s ease-out infinite" }}
              />
            </span>
            ACTIVE MONITORING
          </span>
        </div>
      </div>

      {/* ECG waveform display */}
      <div className="relative z-[2] w-full overflow-hidden h-[86px] my-1">
        <div
          className="flex w-[200%] h-full"
          style={{ animation: "ecgScroll 6.2s linear infinite" }}
        >
          <EcgSvg />
          <EcgSvg />
        </div>
      </div>

      {/* Footer bar with live ticker & clear simulation disclaimer */}
      <div className="relative z-[2] px-5 sm:px-7 pt-3 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-[family-name:var(--font-mono)]">
        <div className="flex items-center gap-2 min-h-[20px]">
          <span className="text-[var(--indigo)] font-bold text-xs select-none">❯</span>
          <p
            className="text-[13.5px] text-[var(--mint)] font-medium transition-opacity duration-300"
            style={{ opacity: tickerOpacity }}
          >
            {messages[tickerIdx]}
          </p>
        </div>

        {/* Mandatory Illustrative Data Notice */}
        <div className="flex items-center gap-1.5 text-[10.5px] text-[#716F87] uppercase tracking-wider bg-[rgba(255,255,255,0.03)] px-2.5 py-1 rounded border border-[rgba(255,255,255,0.06)] self-start sm:self-auto">
          <span>* Illustrative Demo Feed</span>
        </div>
      </div>
    </motion.div>
  );
}
