"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Globe, Server, Cloud, Network, ShieldCheck, Activity } from "lucide-react";
import { EncryptedText } from "./EncryptedText";

interface NodeData {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  status: string;
  metric: string;
  color: string;
  badge: string;
}

const NODES: NodeData[] = [
  {
    id: "web",
    name: "WEB",
    category: "APPLICATION",
    x: 18,
    y: 32,
    icon: <Globe size={18} />,
    status: "HTTP/3 TLS 1.3",
    metric: "0 Critical Vulns",
    color: "#5B4CFF",
    badge: "443 OK",
  },
  {
    id: "api",
    name: "API",
    category: "GATEWAY",
    x: 48,
    y: 20,
    icon: <Server size={18} />,
    status: "REST & GraphQL",
    metric: "JWT Auth Verified",
    color: "#17B978",
    badge: "200 OK",
  },
  {
    id: "cloud",
    name: "CLOUD",
    category: "INFRASTRUCTURE",
    x: 82,
    y: 35,
    icon: <Cloud size={18} />,
    status: "AWS / Azure / GCP",
    metric: "IAM Hardened",
    color: "#F0483E",
    badge: "GUARDED",
  },
  {
    id: "network",
    name: "NETWORK",
    category: "PERIMETER",
    x: 28,
    y: 75,
    icon: <Network size={18} />,
    status: "Edge Firewall",
    metric: "Zero Packet Loss",
    color: "#F2A930",
    badge: "ISOLATED",
  },
  {
    id: "identity",
    name: "IDENTITY",
    category: "ZERO TRUST",
    x: 72,
    y: 78,
    icon: <ShieldCheck size={18} />,
    status: "SSO & MFA",
    metric: "Passkey Enforced",
    color: "#9E90FF",
    badge: "MFA 100%",
  },
];

const CONNECTIONS: [string, string][] = [
  ["web", "api"],
  ["api", "cloud"],
  ["web", "network"],
  ["api", "identity"],
  ["network", "identity"],
  ["cloud", "identity"],
];

export function NetworkVisualization() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const getNode = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full rounded-[24px] bg-[#0c0b14] border border-[rgba(255,255,255,0.08)] p-6 sm:p-8 mt-12 overflow-hidden shadow-[var(--shadow-elevated)] select-none"
    >
      {/* Dynamic Cursor Spotlight inside network container */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-70"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}% ${mousePos.y}%, rgba(91, 76, 255, 0.16), transparent 70%)`,
        }}
      />

      {/* Cyber Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Slow Radar Scan Sweep */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-35"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(23,185,120,0.12) 50%, transparent 100%)",
          height: "35%",
          animation: "scanSweep 5s ease-in-out infinite alternate",
        }}
      />

      {/* Header telemetry strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[rgba(255,255,255,0.06)] font-[family-name:var(--font-mono)] text-[12px]">
        <div className="flex items-center gap-2 text-[#ACAAC2]">
          <span className="w-2 h-2 rounded-full bg-[var(--mint)] animate-pulse" />
          <span className="text-white font-semibold tracking-wider">ATTACK SURFACE MESH</span>
          <span className="text-[#716F87] hidden sm:inline">—</span>
          <span className="text-[#9E90FF] hidden sm:inline">
            <EncryptedText text="TOPOLOGY: ZERO TRUST GRAPH" interval={50} revealDelay={600} />
          </span>
        </div>

        <div className="flex items-center gap-4 text-[#716F87]">
          <span className="flex items-center gap-1.5">
            <Activity size={13} className="text-[var(--mint)]" />
            <span className="text-[#D2D0E2] font-medium">5 NODES ACTIVE</span>
          </span>
          <span className="text-[10.5px] uppercase px-2 py-0.5 rounded-full bg-[rgba(91,76,255,0.12)] text-[#B9AEFF] border border-[rgba(91,76,255,0.2)]">
            SOC SIMULATION
          </span>
        </div>
      </div>

      {/* Main Interactive Network Canvas */}
      <div className="relative z-10 w-full h-[280px] sm:h-[340px] mt-4">
        {/* SVG Pathways */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B4CFF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#17B978" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#9E90FF" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glowPath">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {CONNECTIONS.map(([fromId, toId]) => {
            const from = getNode(fromId);
            const to = getNode(toId);
            const isHighlighted = activeNode === fromId || activeNode === toId;

            return (
              <g key={`${fromId}-${toId}`}>
                {/* Background base path */}
                <line
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={isHighlighted ? "url(#pathGradient)" : "rgba(255, 255, 255, 0.08)"}
                  strokeWidth={isHighlighted ? 2.5 : 1.2}
                  strokeDasharray={isHighlighted ? "none" : "4 4"}
                  className="transition-all duration-300"
                />

                {/* Animated data packet traveling between nodes */}
                <circle r={isHighlighted ? 3 : 2} fill={isHighlighted ? "#17B978" : "#9E90FF"} opacity={0.8}>
                  <animateMotion
                    path={`M ${(from.x * 6.5)},${(from.y * 3)} L ${(to.x * 6.5)},${(to.y * 3)}`}
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((node) => {
          const isSelected = activeNode === node.id;

          return (
            <div
              key={node.id}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute z-20 cursor-pointer group"
            >
              {/* Outer Pulsing Ring */}
              <div
                className="absolute -inset-2.5 rounded-full transition-all duration-500 pointer-events-none"
                style={{
                  background: isSelected
                    ? `radial-gradient(circle, ${node.color}40 0%, transparent 70%)`
                    : "transparent",
                  transform: isSelected ? "scale(1.3)" : "scale(1)",
                }}
              />

              {/* Node Core Pill / Circle */}
              <div
                className={`relative flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-300 backdrop-blur-md ${
                  isSelected
                    ? "bg-[#181628] border-white/30 shadow-[0_0_24px_rgba(91,76,255,0.4)] scale-105"
                    : "bg-[#100f1c]/90 border-white/10 hover:border-white/20 hover:scale-102"
                }`}
              >
                {/* Icon with colored bg */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-300"
                  style={{
                    backgroundColor: node.color,
                    boxShadow: isSelected ? `0 0 12px ${node.color}` : "none",
                  }}
                >
                  {node.icon}
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-[family-name:var(--font-mono)] text-[12px] font-bold text-white tracking-wider">
                      {node.name}
                    </span>
                    <span
                      className="font-[family-name:var(--font-mono)] text-[9.5px] px-1.5 py-0.2 rounded font-semibold"
                      style={{
                        backgroundColor: `${node.color}25`,
                        color: node.color,
                      }}
                    >
                      {node.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#ACAAC2] font-[family-name:var(--font-mono)] hidden sm:block">
                    {node.status}
                  </span>
                </div>
              </div>

              {/* Hover detail tooltip */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)] min-w-[170px] p-2.5 rounded-[12px] bg-[#1a182c] border border-white/15 shadow-xl text-center z-30 pointer-events-none"
                >
                  <div className="text-[11px] font-bold text-white">{node.category}</div>
                  <div className="text-[10px] text-[var(--mint)] font-[family-name:var(--font-mono)] mt-0.5">
                    {node.metric}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Status info */}
      <div className="relative z-10 pt-4 mt-2 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-between gap-4 font-[family-name:var(--font-mono)] text-[11px] text-[#716F87]">
        <div className="flex items-center gap-3">
          <span className="text-[var(--mint)]">● ENCRYPTION: AES-256-GCM</span>
          <span className="hidden sm:inline">|</span>
          <span className="text-[#ACAAC2] hidden sm:inline">RETEST VERIFICATION: AUTOMATED & MANUAL</span>
        </div>
        <div>
          <span>HOVER NODES TO INSPECT SURFACE CONNECTIONS</span>
        </div>
      </div>
    </div>
  );
}
