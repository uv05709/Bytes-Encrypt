"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderGlowColor?: string;
  tiltEffect?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(91, 76, 255, 0.12)",
  borderGlowColor = "rgba(91, 76, 255, 0.35)",
  tiltEffect = false,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isTouchOrMobile, setIsTouchOrMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768;
      setIsTouchOrMobile(isTouch);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchOrMobile || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPosition({ x, y });
      setOpacity(1);

      if (tiltEffect) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Subtle tilt clamp to +/- 4 degrees max for subtle, professional motion
        const rotateX = ((y - centerY) / centerY) * -3.8;
        const rotateY = ((x - centerX) / centerX) * 3.8;
        setTilt({ rotateX, rotateY });
      }
    },
    [isTouchOrMobile, tiltEffect]
  );

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
    if (tiltEffect) {
      setTilt({ rotateX: 0, rotateY: 0 });
    }
  }, [tiltEffect]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[20px] transition-transform duration-200 ease-out ${className}`}
      style={{
        transform:
          tiltEffect && !isTouchOrMobile && opacity > 0
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
            : undefined,
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {/* Outer Border Highlight following cursor */}
      {!isTouchOrMobile && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[20px] transition-opacity duration-300 z-10"
          style={{
            opacity,
            background: `radial-gradient(380px circle at ${position.x}px ${position.y}px, ${borderGlowColor}, transparent 65%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1.2px",
          }}
        />
      )}

      {/* Surface Spotlight */}
      {!isTouchOrMobile && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-[1] w-full h-full">{children}</div>
    </div>
  );
}

export function HeroSpotlight({
  className = "",
  fill = "rgba(91, 76, 255, 0.16)",
}: {
  className?: string;
  fill?: string;
}) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!mousePos) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 hidden md:block ${className}`}
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${fill}, transparent 80%)`,
      }}
    />
  );
}
