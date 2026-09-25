import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/#approach", label: "Approach" },
  { href: "/#why", label: "Why Us" },
  { href: "/#contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61593238796805",
    label: "Facebook",
    title: "BytesEncrypt on Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.6 14.24 3.6c-2.4 0-4.05 1.47-4.05 4.17V9.9H7.5V13h2.7v8h3.3Z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/bytes_encrypt",
    label: "X (Twitter)",
    title: "BytesEncrypt on X",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l7.5 9.5M20 4l-7.5 9.5M4 20l7.5-9.5M20 20l-7.5-9.5" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/bytesencrypt",
    label: "LinkedIn",
    title: "BytesEncrypt on LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.5 9h3v11h-3V9Zm6.2 0h2.9v1.6h.04c.4-.76 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V20h-3v-5.6c0-1.35-.02-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v5.7h-3V9Z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/bytesencryptofficial",
    label: "Instagram",
    title: "BytesEncrypt on Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white pt-16 pb-8">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.2fr] gap-10 md:gap-16 pb-10 border-b border-[rgba(255,255,255,0.08)]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 no-underline mb-4">
              <BrandLogo footer />
              <span className="font-[family-name:var(--font-display)] font-extrabold text-[20.5px] text-white tracking-[-0.01em] leading-none">
                BytesEncrypt
                <small className="block font-[family-name:var(--font-mono)] font-normal text-[11px] tracking-[0.14em] text-[#716F87] mt-1 uppercase">
                  Technologies Pvt Ltd
                </small>
              </span>
            </Link>
            <p className="text-[15px] text-[#ACAAC2] leading-relaxed max-w-[42ch] mb-5">
              Offensive security and assurance partner for enterprises — VAPT, red teaming, code
              review, cloud security and cyber risk advisory.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  title={social.title}
                  target="_blank"
                  rel="noopener"
                  className="w-9 h-9 rounded-[10px] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#ACAAC2] hover:text-[var(--indigo)] hover:border-[var(--indigo)] transition-colors"
                >
                  <div className="w-[18px] h-[18px]">{social.icon}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h5 className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#ACAAC2] mb-4">
              Company
            </h5>
            <div className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[15px] text-[#ACAAC2] no-underline hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h5 className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#ACAAC2] mb-4">
              Contact
            </h5>
            <div className="flex flex-col gap-3">
              <p className="text-[15px] text-[#ACAAC2] flex items-start gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-1 flex-none">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                Email: contact@bytesencrypt.com
              </p>
              <p className="text-[15px] text-[#ACAAC2] flex items-start gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-1 flex-none">
                  <path d="M4 5c0 8.3 6.7 15 15 15l2.5-3.5-5-2-1.5 2A12 12 0 0 1 7.5 9l2-1.5-2-5L4 5Z" />
                </svg>
                Phone: +91 9113962011
              </p>
              <p className="text-[15px] text-[#ACAAC2] flex items-start gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-1 flex-none">
                  <path d="M12 21s7-6.1 7-11.3A7 7 0 0 0 5 9.7C5 14.9 12 21 12 21Z" />
                  <circle cx="12" cy="9.5" r="2.3" />
                </svg>
                Kalyan Nagar, Bangalore, KAR-560043
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <span className="text-[13px] text-[#716F87]">
            © BytesEncrypt Technologies Pvt Ltd — 2026 — Confidential
          </span>
          <div className="flex gap-6">
            <Link href="/#approach" className="text-[13px] text-[#716F87] no-underline hover:text-white transition-colors">
              Approach
            </Link>
            <Link href="/#why" className="text-[13px] text-[#716F87] no-underline hover:text-white transition-colors">
              Why Us
            </Link>
            <Link href="/#contact" className="text-[13px] text-[#716F87] no-underline hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
