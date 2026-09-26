"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from DOM class set by head script, default to "dark"
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "dark";
  });

  const applyTheme = useCallback((newTheme: Theme, triggerTransition = true) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("bytesencrypt-theme", newTheme);
    } catch {
      // Ignore localStorage restrictions
    }

    if (triggerTransition) {
      document.documentElement.classList.add("theme-transitioning");
    }

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }

    if (triggerTransition) {
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 350);
    }
  }, []);

  useEffect(() => {
    // Listen to OS preference changes if no manual preference is stored
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("bytesencrypt-theme");
      } catch {
        stored = null;
      }
      if (!stored) {
        const newTheme = e.matches ? "dark" : "light";
        applyTheme(newTheme, false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: (t) => applyTheme(t, true) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

