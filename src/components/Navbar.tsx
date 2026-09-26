"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowRight, Shield } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--panel-line)] shadow-[0_2px_12px_rgba(0,0,0,0.04)] py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="flex items-center justify-between px-6 sm:px-8 max-w-[var(--container)] mx-auto relative gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline group flex-none">
          <BrandLogo />
          <span className="font-[family-name:var(--font-display)] font-extrabold text-[20px] text-[var(--ink)] tracking-[-0.01em] leading-none group-hover:text-[var(--indigo)] transition-colors duration-200">
            BytesEncrypt
            <small className="block font-[family-name:var(--font-mono)] font-normal text-[10.5px] tracking-[0.14em] text-[var(--ink-faint)] mt-1 uppercase">
              Technologies Pvt Ltd
            </small>
          </span>
        </Link>

        {/* Mobile controls: Theme toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-[40px] h-[40px] bg-[var(--surface)] border border-[var(--panel-line)] rounded-[10px] cursor-pointer text-[var(--ink)] p-0 hover:border-[var(--indigo)] hover:text-[var(--indigo)] transition-colors duration-200"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-5 items-center" aria-label="Main Navigation">
          {/* Nav links pill */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--panel-line)]">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-[family-name:var(--font-display)] font-semibold text-[14.5px] no-underline px-4 py-1.5 rounded-full transition-all duration-200 relative ${
                    isActive
                      ? "text-[var(--indigo)] bg-[var(--surface)] shadow-xs font-bold"
                      : "text-[var(--ink-soft)] hover:text-[var(--indigo)] hover:bg-[var(--surface)]/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Compact Theme Toggle */}
          <ThemeToggle />

          {/* Primary CTA */}
          <Link
            href="/#contact"
            className="font-[family-name:var(--font-display)] font-bold text-[14.5px] no-underline inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-200 hover:bg-[var(--indigo-deep)] hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(91,76,255,0.4)] flex-none"
          >
            <Shield size={14} />
            <span>Request Assessment</span>
            <ArrowRight size={14} />
          </Link>
        </nav>

        {/* Mobile nav Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 bg-[var(--surface)]/95 backdrop-blur-2xl border-b border-[var(--panel-line)] flex flex-col py-6 px-6 gap-3 shadow-2xl z-50"
            >
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-[family-name:var(--font-display)] font-semibold text-[16px] no-underline transition-colors duration-200 py-2.5 px-3.5 rounded-xl flex items-center justify-between ${
                      isActive
                        ? "text-[var(--indigo)] bg-[rgba(91,76,255,0.08)] font-bold"
                        : "text-[var(--ink-soft)] hover:text-[var(--indigo)] hover:bg-[var(--surface-secondary)]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--indigo)]" />}
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-[var(--panel-line)] flex flex-col gap-3">
                <ThemeToggle showLabel className="w-full justify-start px-4 py-2.5 rounded-xl" />

                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="font-[family-name:var(--font-display)] font-bold text-[15px] no-underline inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-200 hover:bg-[var(--indigo-deep)] shadow-md"
                >
                  <Shield size={16} />
                  <span>Request Assessment</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
