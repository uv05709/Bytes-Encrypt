"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const INITIAL_HEX_1 = "7F 3A 91 0C 42 8D 11";
const INITIAL_HEX_2 = "29 8A 3F 91 72 00 4C";
const TARGET_WORD = "SECURITY";
const HEX_CHARS = "0123456789ABCDEF";

export function SignatureEncryptedSignal({ className = "" }: { className?: string }) {
  const [line1, setLine1] = useState(INITIAL_HEX_1);
  const [line2, setLine2] = useState(INITIAL_HEX_2);
  const [resolvedWord, setResolvedWord] = useState("");
  const [phase, setPhase] = useState<"idle" | "scrambling" | "resolved">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  const resolveWord = useCallback(() => {
    let charIndex = 0;
    const resolveInterval = setInterval(() => {
      charIndex++;
      setResolvedWord(TARGET_WORD.slice(0, charIndex));
      if (charIndex >= TARGET_WORD.length) {
        clearInterval(resolveInterval);
        setPhase("resolved");
      }
    }, 90);
  }, []);

  const startSequence = useCallback(() => {
    setPhase("scrambling");

    let counter = 0;
    const scrambleInterval = setInterval(() => {
      const randHex = (len: number) =>
        Array.from({ length: len }, () =>
          HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]
        ).join("");

      setLine1(
        `${randHex(2)} ${randHex(2)} ${randHex(2)} ${randHex(2)} ${randHex(2)} ${randHex(2)} ${randHex(2)}`
      );
      setLine2(
        `${randHex(2)} ${randHex(2)} ${randHex(2)} ${randHex(2)} ${randHex(2)} ${randHex(2)} ${randHex(2)}`
      );

      counter++;
      if (counter > 12) {
        clearInterval(scrambleInterval);
        resolveWord();
      }
    }, 70);
  }, [resolveWord]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          const timeout = setTimeout(startSequence, 400);
          observer.disconnect();
          return () => clearTimeout(timeout);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [startSequence]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-col sm:flex-row items-start sm:items-center gap-3.5 py-2.5 px-4 rounded-[14px] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-card)] font-[family-name:var(--font-mono)] ${className}`}
    >
      <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] text-[var(--mint)] uppercase flex-none">
        <span className="w-2 h-2 rounded-full bg-[var(--mint)] animate-pulse" />
        <span>ENCRYPTED SIGNAL</span>
      </div>

      <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />

      {/* Scramble and Resolve Area */}
      <div className="flex items-center gap-3">
        {phase !== "resolved" ? (
          <div className="text-[12px] tracking-wider font-medium leading-tight">
            <span className="text-[var(--indigo)] font-semibold">{line1}</span>
            <span className="text-[var(--ink-faint)] mx-1.5">/</span>
            <span className="text-[var(--ink-soft)]">{line2}</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-[12.5px] font-extrabold tracking-[0.2em] text-white bg-[var(--indigo)] px-2.5 py-0.5 rounded shadow-xs">
              {resolvedWord}
            </span>
          </motion.div>
        )}

        <div className="h-4 w-px bg-[var(--border)] hidden md:block" />

        <span className="text-[12px] text-[var(--ink-faint)] font-normal tracking-normal hidden md:inline">
          &ldquo;We find the signal in the noise.&rdquo;
        </span>
      </div>
    </div>
  );
}
