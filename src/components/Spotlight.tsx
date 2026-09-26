"use client";

import React, { useRef, useEffect } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderGlowColor?: string;
  tiltEffect?: boolean;
}

/**
 * High-performance SpotlightCard utilizing CSS Custom Properties (--mouse-x, --mouse-y)
 * for smooth cursor tracking with ZERO React re-renders during mouse move.
 * Automatically disabled on touch devices and for users with prefers-reduced-motion.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(91, 76, 255, 0.08)",
  borderGlowColor = "rgba(91, 76, 255, 0.35)",
  tiltEffect = false,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Check media queries for touch or reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchOrMobile =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;

    if (prefersReducedMotion || isTouchOrMobile) return;

    let frameId: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        card.style.setProperty("--spotlight-opacity", "1");

        if (tiltEffect) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          // Very subtle restrained tilt: max +/- 2.5 degrees
          const rotateX = ((y - centerY) / centerY) * -2.5;
          const rotateY = ((x - centerX) / centerX) * 2.5;
          card.style.setProperty(
            "--card-transform",
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          );
        }
      });
    };

    const handlePointerLeave = () => {
      card.style.setProperty("--spotlight-opacity", "0");
      if (tiltEffect) {
        card.style.setProperty("--card-transform", "perspective(1000px) rotateX(0deg) rotateY(0deg)");
      }
    };

    card.addEventListener("pointermove", handlePointerMove, { passive: true });
    card.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [tiltEffect]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-[20px] transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: "var(--card-transform, none)",
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {/* Outer Border Highlight via CSS Variables */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[20px] transition-opacity duration-300 z-10"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background: `radial-gradient(350px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), ${borderGlowColor}, transparent 65%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Surface Spotlight via CSS Variables */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background: `radial-gradient(400px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), ${spotlightColor}, transparent 70%)`,
        }}
      />

      <div className="relative z-[1] w-full h-full">{children}</div>
    </div>
  );
}

export function HeroSpotlight({
  className = "",
  fill = "rgba(91, 76, 255, 0.12)",
}: {
  className?: string;
  fill?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let frameId: number | null = null;
    const handleMove = (e: MouseEvent) => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.setProperty("--hx", `${e.clientX}px`);
          containerRef.current.style.setProperty("--hy", `${e.clientY}px`);
        }
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 hidden md:block ${className}`}
      style={{
        background: `radial-gradient(600px circle at var(--hx, 50vw) var(--hy, 30vh), ${fill}, transparent 80%)`,
      }}
    />
  );
}
