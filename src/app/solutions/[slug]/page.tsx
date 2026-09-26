import Link from "next/link";
import { notFound } from "next/navigation";
import { allSolutions } from "@/lib/solutions-data";

export function generateStaticParams() {
  return allSolutions.map((s) => ({
    slug: s.slug,
  }));
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = allSolutions.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  const categoryTagClass =
    solution.category === "offensive"
      ? "bg-[rgba(240,72,62,0.1)] text-[#F0483E]"
      : solution.category === "assurance"
      ? "bg-[rgba(23,185,120,0.1)] text-[#17B978]"
      : "bg-[rgba(242,169,48,0.1)] text-[#F2A930]";

  return (
    <>
      {/* Page Header */}
      <section className="pt-[70px] pb-[50px] relative overflow-hidden">
        <div
          className="absolute -inset-x-[10%] -top-[10%] h-[620px] z-0 pointer-events-none mesh-bg"
        />
        <div className="wrap relative z-[1]">
          {/* Breadcrumb */}
          <div className="font-[family-name:var(--font-mono)] text-[14px] text-[var(--ink-faint)] mb-4">
            <Link href="/solutions" className="text-[var(--indigo)] hover:underline no-underline">
              Solutions
            </Link>{" "}
            / {solution.title} {solution.subtitle}
          </div>

          {/* Tag pill */}
          <span
            className={`font-[family-name:var(--font-mono)] text-[13px] tracking-[0.08em] uppercase py-1.5 px-4 rounded-full inline-block font-semibold ${categoryTagClass}`}
          >
            {solution.category} &middot; CHECK {solution.id}
          </span>

          {/* Title */}
          <h1 className="text-[clamp(2.4rem,4.8vw,4rem)] font-extrabold leading-[1.08] mt-4 mb-4 flex flex-wrap items-center gap-4 tracking-tight">
            <span className="w-14 h-14 rounded-[16px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-xs flex-none text-[var(--indigo)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
              </svg>
            </span>
            <span>
              {solution.title} <span className="font-semibold text-[var(--ink-soft)] text-[0.8em]">{solution.subtitle}</span>
            </span>
          </h1>

          {/* Subtitle description */}
          <p className="text-[19px] text-[var(--ink-soft)] max-w-[56ch] leading-relaxed">
            {solution.description}
          </p>
        </div>
      </section>

      {/* Main Grid: Left Overview / Right Interactive Widget */}
      <section className="py-[70px] pt-4">
        <div className="wrap grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-start">
          {/* Left Column: Overview & What's included */}
          <div>
            <h2 className="text-[21px] font-extrabold mb-4">Overview</h2>
            {solution.overview.map((para, i) => (
              <p key={i} className="text-[17px] text-[var(--ink-soft)] leading-[1.75] mb-4">
                {para}
              </p>
            ))}

            <h3 className="text-[18px] font-bold mt-8 mb-4">What&apos;s included</h3>
            <ul className="space-y-3.5 list-none p-0 m-0">
              {solution.whatsIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[16px] text-[var(--ink-soft)] leading-[1.5]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--mint)] flex-none mt-0.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Category-specific Interactive Widget */}
          <div>
            {solution.category === "offensive" && solution.terminalData && (
              <div className="bg-[#0D0C14] text-white rounded-[18px] p-6 shadow-[var(--shadow-elevated)] border border-[rgba(255,255,255,0.08)] relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute inset-0 rounded-[18px] pointer-events-none z-0 border border-[rgba(255,255,255,0.05)]" />
                {/* Console header */}
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[rgba(255,255,255,0.08)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F0483E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F2A930]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#17B978]" />
                  <span className="font-[family-name:var(--font-mono)] text-[12.5px] text-[#ACAAC2] ml-2">
                    {solution.terminalData.user}
                  </span>
                </div>

                {/* Console lines */}
                <div className="font-[family-name:var(--font-mono)] text-[14.5px] flex flex-col gap-2.5">
                  {solution.terminalData.lines.map((line, i) => (
                    <div key={i} className="text-[#8FF0B0] flex items-start gap-2">
                      {line.prompt && <span className="text-[#9E90FF] font-bold">{line.prompt}</span>}
                      <span>{line.output}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1 text-[#8FF0B0]">
                    <span>&nbsp;</span>
                    <span className="inline-block w-[7px] h-[14px] bg-[#8FF0B0] animate-[cursorBlink_1s_step-end_infinite]" />
                  </div>
                </div>
              </div>
            )}

            {solution.category === "assurance" && solution.scanData && (
              <div className="bg-[var(--panel)] border border-[var(--panel-line)] rounded-[18px] p-7 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--indigo)] to-transparent animate-scanSweep" />
                <div className="font-[family-name:var(--font-mono)] text-[12.5px] font-bold tracking-[0.06em] uppercase text-[var(--ink-faint)] mb-5">
                  SCANNING — {solution.title}
                </div>
                <div className="flex flex-col gap-4">
                  {solution.scanData.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[15.5px] text-[var(--ink-soft)]">
                      <span className="w-6 h-6 rounded-full border border-[var(--mint)] bg-[rgba(23,185,120,0.1)] text-[var(--mint)] flex items-center justify-center flex-none">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {solution.category === "advisory" && solution.coverageData && (
              <div className="bg-[var(--panel)] border border-[var(--panel-line)] rounded-[18px] p-6 shadow-sm">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {solution.coverageData.map((cov, i) => (
                    <div key={i} className="bg-[var(--surface)] border border-[var(--panel-line)] rounded-[14px] p-4 flex flex-col items-center">
                      <svg width="60" height="60" viewBox="0 0 80 80" className="mb-2">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#E6E5EF" strokeWidth="6" />
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          fill="none"
                          stroke={cov.color === "mint" ? "var(--mint)" : cov.color === "coral" ? "var(--coral)" : "var(--indigo)"}
                          strokeWidth="6"
                          strokeDasharray="213"
                          strokeDashoffset="35"
                          strokeLinecap="round"
                          transform="rotate(-90 40 40)"
                        />
                      </svg>
                      <h4 className="text-[14px] font-bold text-[var(--ink)] mb-0.5">{cov.label}</h4>
                      <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-faint)] uppercase tracking-[0.04em]">
                        {cov.sub}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--ink-faint)] text-center mt-5">
                  Three-pillar coverage for enterprise resilience
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mini CTA */}
      <section className="py-[60px] pb-[92px]">
        <div className="wrap">
          <div className="bg-[var(--panel)] border border-[var(--panel-line)] rounded-[20px] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-[22px] font-bold mb-2">Ready to scope a {solution.title} engagement?</h3>
              <p className="text-[16px] text-[var(--ink-soft)] max-w-[42ch]">
                Tell us your environment and timeline — we&apos;ll come back with a clear plan, not a sales deck.
              </p>
            </div>
            <Link
              href="/#contact"
              className="font-[family-name:var(--font-display)] font-bold text-[15.5px] no-underline inline-flex items-center gap-2 py-3 px-[22px] rounded-full bg-[var(--indigo)] text-white border border-transparent transition-all duration-[220ms] hover:bg-[var(--indigo-deep)] hover:-translate-y-px hover:shadow-[0_8px_24px_-6px_rgba(91,76,255,0.4)] flex-none"
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
