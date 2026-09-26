"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Terminal as TerminalIcon, RotateCcw, Check, Copy } from "lucide-react";

interface TerminalLine {
  text: string;
  type: "command" | "info" | "success" | "warn";
  delay?: number;
}

const defaultLines: TerminalLine[] = [
  { text: "bytesencrypt@security:~$ scan --target application --mode offensive", type: "command" },
  { text: "[+] Initializing reconnaissance & perimeter telemetry...", type: "info" },
  { text: "[+] Mapping attack surface (Web, APIs, Cloud infrastructure)...", type: "info" },
  { text: "[+] Enumerating exposed endpoints & shadow assets...", type: "info" },
  { text: "[+] Testing authentication barriers & session handling...", type: "info" },
  { text: "[+] Analyzing security controls against active exploits...", type: "info" },
  { text: "[✓] Assessment initialized — manual verification protocol engaged", type: "success" },
];

export function Terminal({
  title = "bytesencrypt-cli — soc-agent-01",
  lines = defaultLines,
  className = "",
}: {
  title?: string;
  lines?: TerminalLine[];
  className?: string;
}) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  const startTypewriter = useCallback(() => {
    setVisibleLines(0);
    setIsRunning(true);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setVisibleLines(current);
      if (current >= lines.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 450);
  }, [lines.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          const timeout = setTimeout(startTypewriter, 300);
          observer.disconnect();
          return () => clearTimeout(timeout);
        }
      },
      { threshold: 0.25 }
    );

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => observer.disconnect();
  }, [startTypewriter]);

  const handleCopy = () => {
    const textContent = lines.map((l) => l.text).join("\n");
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={terminalRef}
      className={`rounded-[16px] bg-[#0d0c14] border border-[rgba(255,255,255,0.08)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden font-[family-name:var(--font-mono)] text-[13px] text-[#D2D0E2] transition-all duration-300 ${className}`}
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.06)] select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 inline-block" />
          <span className="text-[11.5px] text-[#716F87] ml-2 flex items-center gap-1.5 font-medium">
            <TerminalIcon size={12} className="text-[#9E90FF]" />
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={startTypewriter}
            disabled={isRunning}
            title="Replay sequence"
            className="p-1 rounded text-[#716F87] hover:text-[#9E90FF] hover:bg-[rgba(255,255,255,0.05)] transition-colors disabled:opacity-40"
            aria-label="Re-run terminal commands"
          >
            <RotateCcw size={13} className={isRunning ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleCopy}
            title="Copy output"
            className="p-1 rounded text-[#716F87] hover:text-[#9E90FF] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            aria-label="Copy terminal log"
          >
            {copied ? <Check size={13} className="text-[var(--mint)]" /> : <Copy size={13} />}
          </button>
          <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-[rgba(23,185,120,0.12)] text-[var(--mint)] border border-[rgba(23,185,120,0.2)]">
            LIVE
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 min-h-[220px] overflow-x-auto space-y-2 leading-relaxed">
        {lines.slice(0, visibleLines).map((line, idx) => {
          if (line.type === "command") {
            return (
              <div key={idx} className="text-white font-semibold flex items-center gap-2">
                <span className="text-[var(--mint)] select-none">❯</span>
                <span>{line.text}</span>
              </div>
            );
          }
          if (line.type === "success") {
            return (
              <div key={idx} className="text-[var(--mint)] font-medium">
                {line.text}
              </div>
            );
          }
          return (
            <div key={idx} className="text-[#ACAAC2]">
              {line.text}
            </div>
          );
        })}

        {isRunning && (
          <div className="inline-block w-2 h-4 bg-[var(--mint)] animate-pulse align-middle ml-1" />
        )}

        {!isRunning && visibleLines >= lines.length && (
          <div className="flex items-center gap-2 pt-2 text-[#716F87]">
            <span className="text-[var(--mint)] select-none">❯</span>
            <span className="inline-block w-2 h-3.5 bg-[var(--mint)] opacity-75" style={{ animation: "cursorBlink 1s infinite" }} />
          </div>
        )}
      </div>
    </div>
  );
}
