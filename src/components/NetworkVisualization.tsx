"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Globe, Server, Cloud, Network, Users } from "lucide-react";

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
    category: "APPLICATION LAYER",
    x: 18,
    y: 32,
    icon: <Globe size={16} />,
    status: "HTTPS · TLS 1.3",
    metric: "0 Critical Vulns",
    color: "#5B4CFF",
    badge: "443 OK",
  },
  {
    id: "api",
    name: "API",
    category: "GATEWAY & SERVICES",
    x: 48,
    y: 22,
    icon: <Server size={16} />,
    status: "REST · GraphQL",
    metric: "Auth Tokens Enforced",
    color: "#17B978",
    badge: "200 OK",
  },
  {
    id: "cloud",
    name: "CLOUD",
    category: "INFRASTRUCTURE",
    x: 82,
    y: 34,
    icon: <Cloud size={16} />,
    status: "AWS · Azure · GCP",
    metric: "IAM Policies Hardened",
    color: "#F0483E",
    badge: "GUARDED",
  },
  {
    id: "network",
    name: "NETWORK",
    category: "PERIMETER & EDGE",
    x: 28,
    y: 74,
    icon: <Network size={16} />,
    status: "Zero-Trust Mesh",
    metric: "Edge Inspection Active",
    color: "#F2A930",
    badge: "ISOLATED",
  },
  {
    id: "people",
    name: "PEOPLE",
    category: "HUMAN LAYER",
    x: 74,
    y: 76,
    icon: <Users size={16} />,
    status: "MFA & Phish Defense",
    metric: "Simulation Verified",
    color: "#9E90FF",
    badge: "RESILIENT",
  },
];

const CONNECTIONS: [string, string][] = [
  ["web", "api"],
  ["api", "cloud"],
  ["web", "network"],
  ["network", "people"],
  ["api", "people"],
  ["cloud", "people"],
];

export function NetworkVisualization() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    containerRef.current.style.setProperty("--net-mx", `${x}%`);
    containerRef.current.style.setProperty("--net-my", `${y}%`);
  }, []);

  const getNode = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full rounded-[22px] bg-[#0c0b15] border border-[rgba(255,255,255,0.08)] p-5 sm:p-7 mt-10 overflow-hidden shadow-[var(--shadow-elevated)] select-none"
    >
      {/* Restrained cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(400px circle at var(--net-mx, 50%) var(--net-my, 50%), rgba(91, 76, 255, 0.12), transparent 70%)`,
        }}
      />

      {/* Subtle cybersecurity grid */}
      <div
        className="absolute inset-0 z-0 opacity-12 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Subtle slow scan line */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-25"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(23,185,120,0.1) 50%, transparent 100%)",
          height: "30%",
          animation: "scanSweep 6s ease-in-out infinite alternate",
        }}
      />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[rgba(255,255,255,0.06)] font-[family-name:var(--font-mono)] text-[11.5px]">
        <div className="flex items-center gap-2 text-[#ACAAC2]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint)]" />
          <span className="text-white font-semibold tracking-wider">ATTACK-SURFACE MESH</span>
          <span className="text-[#716F87] hidden sm:inline">—</span>
          <span className="text-[#9E90FF] hidden sm:inline">FIVE MONITORED VECTORS</span>
        </div>

        <div className="flex items-center gap-3 text-[#716F87]">
          <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.04)] text-[#B9AEFF] border border-[rgba(255,255,255,0.08)]">
            SIMULATED TOPOLOGY
          </span>
        </div>
      </div>

      {/* Network Canvas */}
      <div className="relative z-10 w-full h-[250px] sm:h-[300px] mt-3">
        {/* SVG Pathways */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cyberPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B4CFF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#17B978" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#9E90FF" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {CONNECTIONS.map(([fromId, toId]) => {
            const from = getNode(fromId);
            const to = getNode(toId);
            const isHighlighted = activeNode === fromId || activeNode === toId;

            return (
              <g key={`${fromId}-${toId}`}>
                <line
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={isHighlighted ? "url(#cyberPathGrad)" : "rgba(255, 255, 255, 0.08)"}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeDasharray={isHighlighted ? "none" : "3 3"}
                  className="transition-all duration-300"
                />

                {/* Subtle telemetry packet */}
                <circle r={isHighlighted ? 2.5 : 1.8} fill={isHighlighted ? "#17B978" : "#9E90FF"} opacity={0.75}>
                  <animateMotion
                    path={`M ${(from.x * 6)},${(from.y * 2.8)} L ${(to.x * 6)},${(to.y * 2.8)}`}
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Five Specified Nodes: WEB, API, CLOUD, NETWORK, PEOPLE */}
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
              {/* Restrained pulse glow */}
              <div
                className="absolute -inset-2 rounded-full transition-all duration-500 pointer-events-none"
                style={{
                  background: isSelected
                    ? `radial-gradient(circle, ${node.color}30 0%, transparent 70%)`
                    : "transparent",
                }}
              />

              {/* Node pill */}
              <div
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 backdrop-blur-md ${
                  isSelected
                    ? "bg-[#161426] border-white/30 shadow-[0_0_18px_rgba(91,76,255,0.35)] scale-105"
                    : "bg-[#0f0e1a]/90 border-white/10 hover:border-white/20"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                  style={{
                    backgroundColor: node.color,
                  }}
                >
                  {node.icon}
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold text-white tracking-wider">
                      {node.name}
                    </span>
                    <span
                      className="font-[family-name:var(--font-mono)] text-[9px] px-1 py-0.2 rounded font-semibold"
                      style={{
                        backgroundColor: `${node.color}20`,
                        color: node.color,
                      }}
                    >
                      {node.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tiny metadata popover on hover */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)] min-w-[160px] p-2.5 rounded-[10px] bg-[#161524] border border-white/15 shadow-xl text-center z-30 pointer-events-none"
                >
                  <div className="text-[10.5px] font-bold text-white">{node.category}</div>
                  <div className="text-[9.5px] text-[var(--mint)] font-[family-name:var(--font-mono)] mt-0.5">
                    {node.metric}
                  </div>
                  <div className="text-[9px] text-[#ACAAC2] font-[family-name:var(--font-mono)]">
                    {node.status}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="relative z-10 pt-3 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between font-[family-name:var(--font-mono)] text-[10.5px] text-[#716F87]">
        <span>HOVER NODES FOR SURFACE TELEMETRY</span>
        <span className="text-[var(--mint)]">ALL CHANNELS MONITORED</span>
      </div>
    </div>
  );
}
