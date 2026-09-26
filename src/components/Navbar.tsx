"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { Menu, X } from "lucide-react";

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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
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
          ? "bg-[rgba(252,252,250,0.78)] backdrop-blur-xl border-b border-[rgba(230,229,239,0.6)] shadow-[0_1px_8px_rgba(19,18,28,0.04)]"
          : "bg-[rgba(252,252,250,0.92)] backdrop-blur-[10px] border-b border-[var(--panel-line)]"
      }`}
    >
      <div className="flex items-center justify-between py-4 px-8 max-w-[var(--container)] mx-auto relative gap-4">
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <BrandLogo />
          <span className="font-[family-name:var(--font-display)] font-extrabold text-[20.5px] text-[var(--ink)] tracking-[-0.01em] leading-none group-hover:text-[var(--indigo)] transition-colors duration-200">
            BytesEncrypt
            <small className="block font-[family-name:var(--font-mono)] font-normal text-[11px] tracking-[0.14em] text-[var(--ink-faint)] mt-1 uppercase">
              Technologies Pvt Ltd
            </small>
          </span>
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-[42px] h-[42px] bg-transparent border border-[var(--panel-line)] rounded-[10px] cursor-pointer text-[var(--ink)] p-0 hover:border-[var(--indigo)] hover:text-[var(--indigo)] transition-colors duration-200"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-[30px] items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-[family-name:var(--font-display)] font-semibold text-[15.5px] no-underline transition-colors duration-200 relative ${
                  isActive
                    ? "text-[var(--indigo)]"
                    : "text-[var(--ink-soft)] hover:text-[var(--indigo)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-[18px] h-[2px] bg-[var(--indigo)] rounded-full" />
                )}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="font-[family-name:var(--font-display)] font-bold text-[15.5px] no-underline inline-flex items-center gap-2 py-3 px-[22px] rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-[220ms] hover:bg-[var(--indigo-deep)] hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(91,76,255,0.4)]"
            style={{ animation: "btnGlow 3s ease-in-out infinite" }}
          >
            Request Assessment
          </Link>
        </nav>

        {/* Mobile nav */}
        {isOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-[rgba(252,252,250,0.96)] backdrop-blur-xl border-b border-[var(--panel-line)] flex flex-col py-6 px-8 gap-4 shadow-[var(--shadow-elevated)] z-50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-[family-name:var(--font-display)] font-semibold text-[15.5px] no-underline transition-colors duration-200 py-2 ${
                    isActive ? "text-[var(--indigo)]" : "text-[var(--ink-soft)] hover:text-[var(--indigo)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="font-[family-name:var(--font-display)] font-bold text-[15.5px] no-underline inline-flex items-center justify-center gap-2 py-3 px-[22px] rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-[220ms] hover:bg-[var(--indigo-deep)] mt-2"
            >
              Request Assessment
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
