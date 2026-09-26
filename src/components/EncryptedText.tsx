"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const CYBER_CHARS = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*<>{}[]";

interface EncryptedTextProps {
  text: string;
  className?: string;
  revealedClassName?: string;
  interval?: number;
  revealDelay?: number;
  triggerOnHover?: boolean;
}

export function EncryptedText({
  text,
  className = "",
  revealedClassName = "",
  interval = 40,
  revealDelay = 400,
  triggerOnHover = false,
}: EncryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isResolved, setIsResolved] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLSpanElement>(null);

  const startScramble = useCallback(() => {
    let iteration = 0;
    setIsResolved(false);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        setIsResolved(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2.2;
    }, interval);
  }, [text, interval]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timeout = setTimeout(startScramble, revealDelay);
          observer.disconnect();
          return () => clearTimeout(timeout);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startScramble, revealDelay]);

  return (
    <span
      ref={elementRef}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      className={`font-[family-name:var(--font-mono)] transition-colors duration-200 select-none ${
        isResolved ? revealedClassName : className
      }`}
      aria-label={text}
    >
      {displayText}
    </span>
  );
}
