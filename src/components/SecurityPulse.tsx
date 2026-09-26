"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";

const simulatedEvents = [
  "SIMULATED SCAN: Inspecting external web perimeter & open endpoints...",
  "SIMULATED TRACE: Evaluating potential exploit path along API gateway...",
  "SIMULATED EVENT: Anomaly mitigated — synthetic firewall rule engaged",
  "SIMULATED REPORT: Generating plain-language remediation specs for engineering",
  "SIMULATED VERIFICATION: Automated retest benchmark scheduled",
];

const ecgPath =
  "M0,45 H60 L70,10 L80,80 L95,45 H150 L158,38 L166,45 H200 H260 L270,10 L280,80 L295,45 H350 L358,38 L366,45 H400 H460 L470,10 L480,80 L495,45 H550 L558,38 L566,45 H600 H660 L670,10 L680,80 L695,45 H750 L758,38 L766,45 H800";

const testPayloads = [
  { x: 70, text: "' OR 1=1 --" },
  { x: 270, text: "; whoami" },
  { x: 470, text: "/../etc/passwd" },
  { x: 670, text: "eval() / SSRF" },
];

function EcgSvg() {
  return (
    <svg viewBox="0 -16 800 106" preserveAspectRatio="none" className="h-full w-1/2 flex-none">
      <path d={ecgPath} fill="none" stroke="var(--mint)" strokeWidth="2.2" opacity="0.9" />
      {/* Subtle glow stroke */}
      <path d={ecgPath} fill="none" stroke="var(--mint)" strokeWidth="5" opacity="0.16" />
      {testPayloads.map((payload) => (
        <text
          key={payload.x}
          x={payload.x}
          y={-2}
          textAnchor="middle"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          fontSize="10"
          fontWeight="bold"
          fill="var(--coral)"
        >
          {payload.text}
        </text>
      ))}
    </svg>
  );
}

export function SecurityPulse() {
  const [eventIdx, setEventIdx] = useState(0);
  const [tickerOpacity, setTickerOpacity] = useState(1);
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOpacity(0);
      setTimeout(() => {
        setEventIdx((prev) => (prev + 1) % simulatedEvents.length);
        setTickerOpacity(1);
      }, 250);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="mt-12 bg-[var(--surface)] rounded-[22px] py-[22px] relative overflow-hidden shadow-[var(--shadow-elevated)] border border-[var(--border)]"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute -inset-[2px] rounded-[24px] pointer-events-none z-0 opacity-20 dark:opacity-30"
        style={{
          background:
            "linear-gradient(135deg, var(--indigo-glow), transparent 50%, var(--shadow-glow-mint))",
        }}
      />

      {/* Cyber grid subtle overlay */}
      <div
        className="absolute inset-0 z-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Vertical scan line */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-15 dark:opacity-20"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(23,185,120,0.25) 50%, transparent 100%)",
          height: "30%",
          animation: "scanSweep 3.5s ease-in-out infinite alternate",
        }}
      />

      {/* Header bar */}
      <div className="relative z-[2] flex flex-wrap justify-between items-center gap-3 px-5 sm:px-7 pb-4 border-b border-[var(--border)] font-[family-name:var(--font-mono)] text-[12px] text-[var(--ink-soft)]">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 text-[var(--ink)] font-semibold tracking-wider">
            <Radio size={14} className="text-[var(--mint)] animate-pulse" />
            <span>SECURITY PULSE</span>
          </span>
          <span className="text-[var(--ink-faint)] hidden sm:inline">•</span>
          <span className="text-[var(--ink-faint)] text-[11px] hidden sm:inline">
            ATTACK SURFACE TELEMETRY
          </span>
        </div>

        {/* Status + Clearly Labeled Demo Badge */}
        <div className="flex items-center gap-3 flex-wrap">
          {timestamp && (
            <span className="text-[11px] text-[var(--ink-faint)] hidden lg:inline">
              SYS: {timestamp}
            </span>
          )}
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--mint)] text-[11px] font-semibold">
            <span className="relative w-[6px] h-[6px] rounded-full bg-[var(--mint)]">
              <span
                className="absolute -inset-0.5 rounded-full bg-[var(--mint)] opacity-50"
                style={{ animation: "pingDot 2s ease-out infinite" }}
              />
            </span>
            ACTIVE EMULATION
          </span>
          <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--indigo)] border border-[var(--border)] font-semibold">
            DEMO DATA
          </span>
        </div>
      </div>

      {/* ECG waveform */}
      <div className="relative z-[2] w-full overflow-hidden h-[84px] my-1">
        <div
          className="flex w-[200%] h-full"
          style={{ animation: "ecgScroll 6.2s linear infinite" }}
        >
          <EcgSvg />
          <EcgSvg />
        </div>
      </div>

      {/* Status ticker & explicit illustrative note */}
      <div className="relative z-[2] px-5 sm:px-7 pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-[family-name:var(--font-mono)]">
        <div className="flex items-center gap-2 min-h-[20px]">
          <span className="text-[var(--indigo)] font-bold text-xs select-none">❯</span>
          <p
            className="text-[13px] text-[var(--mint)] font-medium transition-opacity duration-300"
            style={{ opacity: tickerOpacity }}
          >
            {simulatedEvents[eventIdx]}
          </p>
        </div>

        {/* Clear illustrative communication */}
        <div className="text-[10px] text-[var(--ink-faint)] tracking-wider uppercase bg-[var(--surface-secondary)] px-2.5 py-0.5 rounded border border-[var(--border)] self-start sm:self-auto font-medium">
          * Illustrative Simulation Feed
        </div>
      </div>
    </motion.div>
  );
}
