"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const credentials = [
  {
    badge: "OSCP",
    tag: "Core credential",
    title: "Offensive Security Certified Professional",
    description: "Hands-on exploitation exam — proof of practical, real-world penetration testing skill.",
  },
  {
    badge: "CISSP",
    title: "Certified Information Systems Security Professional",
    description: "(ISC)²'s benchmark credential for security leadership and architecture.",
  },
  {
    badge: "CEH",
    title: "Certified Ethical Hacker",
    description: "EC-Council credential covering the attacker mindset and methodology.",
  },
  {
    badge: "CISM",
    title: "Certified Information Security Manager",
    description: "ISACA's credential for managing and governing enterprise security programs.",
  },
  {
    badge: "CCSP",
    title: "Certified Cloud Security Professional",
    description: "(ISC)² credential focused on securing cloud architecture and workloads.",
  },
  {
    badge: "OSWE",
    title: "Offensive Security Web Expert",
    description: "Advanced, exam-based credential for white-box web application exploitation.",
  },
];

const values = [
  {
    title: "Evidence over assumption",
    description: "We don't report a finding we haven't reproduced ourselves.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
  {
    title: "Plain language",
    description: "If a report needs a glossary to be useful, we've written it wrong.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 6h16M4 12h10M4 18h13" />
      </svg>
    ),
  },
  {
    title: "No scope creep, no scope gaps",
    description: "We test exactly what we agreed to — nothing skipped, nothing snuck in.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 9h6v6H9z" />
      </svg>
    ),
  },
  {
    title: "The job isn't done at delivery",
    description: "We retest every fix before we call a finding closed.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
        <path d="M18 3v4h-4M6 21v-4h4" />
      </svg>
    ),
  },
];

const trustItems = ["Manual-first testing", "Small, senior team", "Direct access to testers"];

export default function AboutPage() {
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const credRef = useRef(null);
  const credInView = useInView(credRef, { once: true, margin: "-100px" });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Page header */}
      <section className="pt-[70px] pb-[50px] relative overflow-hidden">
        <div
          className="absolute -inset-x-[10%] -top-[10%] h-[620px] z-0 pointer-events-none mesh-bg"
        />
        <div className="wrap relative z-[1]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-mono)] text-[16.5px] font-semibold tracking-[0.08em] uppercase text-[var(--indigo)] inline-flex items-center gap-2 mb-[18px] bg-[rgba(91,76,255,0.08)] py-2 px-4 rounded-full border border-[rgba(91,76,255,0.1)]"
          >
            <span className="relative w-[7px] h-[7px] rounded-full bg-[var(--mint)]">
              <span className="absolute -inset-1 rounded-full border-[1.5px] border-[var(--mint)]" style={{ animation: "pingDot 1.8s ease-out infinite" }} />
            </span>
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2.6rem,5.2vw,4.4rem)] font-extrabold leading-[1.04] max-w-[20ch] tracking-tight"
          >
            Security testing, run by people who&apos;d rather{" "}
            <span className="bg-gradient-to-r from-[var(--indigo)] via-[#9E90FF] to-[var(--indigo)] bg-clip-text text-transparent">
              show
            </span>{" "}
            you than tell you.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[19px] text-[var(--ink-soft)] max-w-[52ch] mt-6"
          >
            BytesEncrypt Technologies is a small, deliberately hands-on offensive security practice.
            We don&apos;t sell fear — we sell proof, in the form of a working exploit and a fix that
            closes it for good.
          </motion.p>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-7"
          >
            {trustItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-[13.5px] font-semibold text-[var(--ink-soft)] bg-[var(--panel)] border border-[var(--panel-line)] py-2 px-4 rounded-full shadow-xs"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--mint)]">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-[70px]">
        <div className="wrap" ref={storyRef}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 text-[17.5px] text-[var(--ink-soft)] leading-[1.75]"
            >
              <p>
                Most security vendors are built to scale — more scanners, more junior analysts, more
                boxes ticked. BytesEncrypt was built the other way around. We stayed small on
                purpose, because the kind of testing that actually finds something worth fixing
                doesn&apos;t come from a tool running unattended overnight. It comes from someone
                who&apos;s spent years learning how systems break, sitting with your application
                until they find the seam.
              </p>
              <p>
                That&apos;s the whole premise here: fewer, deeper engagements over a long client
                list of shallow ones. When we hand you a report, every finding in it has been
                manually verified, reproduced, and written up by the person who found it — not
                summarized by whoever happened to be free that week.
              </p>
              <p>
                We work across applications, networks, cloud environments and people, because
                attackers don&apos;t respect the boundaries between those categories, and neither
                should a test that claims to be thorough.
              </p>
            </motion.div>

            {/* Quote block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-[var(--panel)] border border-[var(--panel-line)] border-l-[3px] border-l-[var(--indigo)] rounded-[12px] p-7"
            >
              <p className="text-[17.5px] font-semibold text-[var(--ink)] leading-[1.55] italic">
                &quot;A report is only as good as the person who can act on it. We write for the
                engineer, not the shelf.&quot;
              </p>
              <span className="block mt-3.5 font-[family-name:var(--font-mono)] text-[13px] tracking-[0.06em] uppercase text-[var(--ink-faint)]">
                — BytesEncrypt Technologies, Engagement Philosophy
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials section */}
      <section className="py-[70px]">
        <div className="wrap" ref={credRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={credInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-end gap-8 mb-[40px] flex-wrap"
          >
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[16.5px] font-bold tracking-[0.08em] uppercase text-[var(--indigo)] mb-2">
                Our Team
              </p>
              <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold max-w-[20ch] tracking-tight">
                Certified, not just capable
              </h2>
            </div>
            <p className="max-w-[32ch] text-[17px] text-[var(--ink-soft)]">
              Credentials our testers hold — earned through hands-on exams, not multiple-choice quizzes.
            </p>
          </motion.div>

          <div className="bg-[var(--ink)] rounded-[28px] p-8 md:p-12 relative overflow-hidden shadow-[var(--shadow-elevated)]">
            <div
              className="absolute -inset-x-[10%] -top-[30%] h-[100%] z-0 pointer-events-none opacity-45 mesh-bg"
            />
            <div className="absolute inset-0 rounded-[28px] pointer-events-none z-[1] border border-[rgba(255,255,255,0.05)]" />
            <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {credentials.map((cred, i) => (
                <motion.div
                  key={cred.badge}
                  initial={{ opacity: 0, y: 20 }}
                  animate={credInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-6 flex gap-4 items-start hover:border-[rgba(139,124,255,0.4)] hover:bg-[rgba(255,255,255,0.05)] hover:shadow-[0_8px_32px_-8px_rgba(91,76,255,0.15)] transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[var(--indigo)] to-[#7A6BFF] text-white flex items-center justify-center font-[family-name:var(--font-mono)] font-bold text-[13px] shadow-[0_10px_20px_-8px_rgba(91,76,255,0.55)] flex-none group-hover:scale-105 group-hover:-rotate-3 transition-transform">
                    {cred.badge}
                  </div>
                  <div>
                    {cred.tag && (
                      <span className="inline-block font-[family-name:var(--font-mono)] text-[9.5px] tracking-[0.06em] uppercase text-[#B9AEFF] bg-[rgba(158,144,255,0.15)] py-1 px-2.5 rounded-full mb-1.5">
                        {cred.tag}
                      </span>
                    )}
                    <h4 className="text-[16.5px] font-bold text-white mb-1">{cred.title}</h4>
                    <p className="text-[14.5px] text-[#BFBDD2] leading-[1.5]">{cred.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="relative z-[2] text-[15px] text-[#BFBDD2] mt-8 text-center leading-relaxed max-w-[70ch] mx-auto">
              Certifications represent the individual credentials held across BytesEncrypt&apos;s core testing team.
              Every engagement is staffed by or directly reviewed by an OSCP-certified lead.
            </p>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-[70px]">
        <div className="wrap" ref={valuesRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-end gap-8 mb-[40px] flex-wrap"
          >
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[16.5px] font-bold tracking-[0.08em] uppercase text-[var(--coral)] mb-2">
                What We Stand For
              </p>
              <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold max-w-[20ch] tracking-tight">
                Four things we don&apos;t compromise on
              </h2>
            </div>
            <p className="max-w-[32ch] text-[17px] text-[var(--ink-soft)]">
              Small enough to hold ourselves to these on every engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="bg-white border border-[var(--panel-line)] rounded-[16px] p-6 shadow-xs hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-[rgba(91,76,255,0.2)] transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-[var(--indigo)] to-[#7A6BFF] text-white flex items-center justify-center mb-4 shadow-[0_8px_16px_-6px_rgba(91,76,255,0.5)]">
                  {value.icon}
                </div>
                <h4 className="text-[17.5px] font-bold mb-2 text-[var(--ink)] group-hover:text-[var(--indigo)] transition-colors duration-200">{value.title}</h4>
                <p className="text-[15.5px] text-[var(--ink-soft)] leading-[1.55]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini CTA */}
      <section className="py-[60px] pb-[92px]">
        <div className="wrap">
          <div className="bg-[var(--panel)] border border-[var(--panel-line)] rounded-[20px] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-[22px] font-bold mb-2">Want to work with the team directly?</h3>
              <p className="text-[16px] text-[var(--ink-soft)] max-w-[42ch]">
                No account managers relaying findings secondhand — you talk to the person who tested
                your systems.
              </p>
            </div>
            <Link
              href="/#contact"
              className="font-[family-name:var(--font-display)] font-bold text-[15.5px] no-underline inline-flex items-center gap-2 py-3 px-[22px] rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-[220ms] hover:bg-[var(--indigo-deep)] hover:-translate-y-px flex-none"
              style={{ animation: "btnGlow 3s ease-in-out infinite" }}
            >
              Request an assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
