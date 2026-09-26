"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle({
  className = "",
  showLabel = false,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full border border-[var(--panel-line)] bg-[var(--surface)] opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`group relative flex items-center justify-center gap-2 rounded-full border border-[var(--panel-line)] bg-[var(--surface)] p-2 text-[var(--ink)] transition-colors duration-200 hover:border-[var(--indigo)] hover:text-[var(--indigo)] hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)] cursor-pointer select-none ${className}`}
    >
      <div className="relative w-[18px] h-[18px] flex items-center justify-center">
        {/* Sun Icon (shown in light mode, hidden in dark mode) */}
        <Sun
          size={17}
          className={`absolute transition-all duration-300 ease-out ${
            isDark
              ? "rotate-90 scale-0 opacity-0 text-[var(--ink-faint)]"
              : "rotate-0 scale-100 opacity-100 text-[#F2A930]"
          }`}
        />

        {/* Moon Icon (shown in dark mode, hidden in light mode) */}
        <Moon
          size={16}
          className={`absolute transition-all duration-300 ease-out ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-[#9E90FF]"
              : "-rotate-90 scale-0 opacity-0 text-[var(--ink-faint)]"
          }`}
        />
      </div>

      {showLabel && (
        <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[var(--ink-soft)] group-hover:text-[var(--indigo)] transition-colors">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
