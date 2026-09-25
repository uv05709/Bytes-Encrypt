export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  chips: string[];
  category: "offensive" | "assurance" | "advisory";
  featured?: boolean;
  overview: string[];
  whatsIncluded: string[];
  terminalData?: {
    user: string;
    lines: { prompt?: string; output?: string }[];
  };
  scanData?: string[];
  coverageData?: { label: string; sub: string; color: string; offset: number }[];
}

export const allSolutions: SolutionItem[] = [
  {
    id: "01",
    slug: "web-api-vapt",
    title: "Web & API VAPT",
    subtitle: "(Grey Box)",
    featured: true,
    description: "Comprehensive vulnerability assessment for web applications and APIs, simulating an attacker with partial insider knowledge.",
    chips: ["OWASP Top 10", "Business logic testing"],
    category: "offensive",
    overview: [
      "Grey-box testing sits between a blind external attack and a full source-code review: our tester gets a standard user account, the same as any customer or employee would have, and works from there. That mirrors the most common real-world scenario — an attacker who has phished a low-level credential or signed up for a free account.",
      "We cover the OWASP Top 10 as a baseline, then go further into business-logic flaws that automated scanners consistently miss — the kind of bugs that only show up when someone tries to break the workflow on purpose.",
    ],
    whatsIncluded: [
      "Authentication, session management & access-control testing",
      "API-specific checks — broken object-level authorization, mass assignment, rate limiting",
      "Business-logic abuse testing (price manipulation, workflow bypass)",
      "Manual verification of every automated finding before it reaches your report",
    ],
    terminalData: {
      user: "root@bytesencrypt: web-api-vapt",
      lines: [
        { prompt: "$", output: "recon target.com/api" },
        { output: "> 42 endpoints discovered" },
        { prompt: "$", output: "test IDOR --endpoint /users/{id}" },
        { output: "> object-level auth bypass confirmed" },
        { output: "> severity: HIGH — logged for triage" },
      ],
    },
  },
  {
    id: "02",
    slug: "mobile-app-vapt",
    title: "Mobile App VAPT",
    subtitle: "(Android / iOS)",
    description: "In-depth security testing for mobile platforms covering static analysis, dynamic analysis, and runtime behaviour.",
    chips: ["Static + dynamic analysis", "Runtime instrumentation"],
    category: "offensive",
    overview: [
      "Mobile apps present a dual attack surface: the client application running on an untrusted device, and the backend APIs it communicates with. We test both.",
      "Using dynamic instrumentation with Frida and static bytecode decompilation, we identify insecure data storage, weak cryptographic implementations, certificate pinning bypasses, and unauthorized background transmissions.",
    ],
    whatsIncluded: [
      "Reverse engineering and code tampering resistance tests",
      "Insecure local data storage (SQLite, Keystore/Keychain, shared preferences)",
      "SSL/TLS certificate pinning implementation & bypass validation",
      "Deep-link exploitation and IPC vulnerability assessment",
    ],
    terminalData: {
      user: "root@bytesencrypt: mobile-vapt",
      lines: [
        { prompt: "$", output: "frida -U -f com.target.app -l bypass_pinning.js" },
        { output: "> TLS certificate pinning disabled" },
        { prompt: "$", output: "dump-keystore --alias session_token" },
        { output: "> extracted unencrypted bearer token" },
        { output: "> severity: CRITICAL — stored credentials exposed" },
      ],
    },
  },
  {
    id: "03",
    slug: "infra-network-vapt",
    title: "Infra & Network VAPT",
    subtitle: "Wi-Fi Security",
    description: "Testing internal and external networks and wireless infrastructure against unauthorized access attempts.",
    chips: ["Internal + external", "Wi-Fi security"],
    category: "offensive",
    overview: [
      "Your perimeter is only as strong as its least-monitored egress point. Our network assessments simulate external adversaries seeking unauthorized entry, followed by internal pivot scenarios simulating an assumed breach.",
      "We audit perimeter firewalls, routing protocols, VPN concentrators, Wi-Fi security (WPA2/WPA3 enterprise), and rogue access points.",
    ],
    whatsIncluded: [
      "External perimeter reconnaissance and service fingerprinting",
      "Vulnerability validation on firewalls, routers, and edge gateways",
      "Internal network segregation and lateral movement testing",
      "Wireless security assessment, rogue AP detection & evil twin resistance",
    ],
    terminalData: {
      user: "root@bytesencrypt: net-recon",
      lines: [
        { prompt: "$", output: "nmap -sS -sV -p- 192.168.10.0/24" },
        { output: "> 12 open ports, outdated SSL VPN detected" },
        { prompt: "$", output: "exploit/cve-2024-gateway-rce --target edge01" },
        { output: "> shell established, administrative access granted" },
        { output: "> severity: HIGH — perimeter pivot viable" },
      ],
    },
  },
  {
    id: "04",
    slug: "secure-code-review",
    title: "Secure Code Review",
    subtitle: "(White Box)",
    description: "Line-by-line analysis of source code to identify security flaws early in the software development lifecycle.",
    chips: ["Manual line-by-line", "Dependency risk"],
    category: "assurance",
    overview: [
      "Automated SAST scanners report dozens of false positives while completely missing intricate business logic defects. Our white-box review involves experienced application security engineers reading the actual code.",
      "We trace data flows from untrusted inputs to critical sinks, inspect authentication and cryptographic logic, and evaluate open-source dependency vulnerabilities.",
    ],
    whatsIncluded: [
      "Manual line-by-line inspection of high-risk business logic components",
      "Input validation, sanitation, and output encoding verification",
      "Cryptographic primitives and key-handling audit",
      "Third-party library / Software Bill of Materials (SBOM) dependency triage",
    ],
    scanData: [
      "Data-flow analysis verified from HTTP handlers to SQL sinks",
      "Custom JWT signing key extraction check completed",
      "Hardcoded API secrets & credentials scan — passed",
      "Third-party dependencies vetted against CVE databases",
    ],
  },
  {
    id: "05",
    slug: "ai-security-testing",
    title: "AI Security",
    subtitle: "Testing",
    description: "Assessing LLM vulnerabilities, prompt injection risks, and ensuring secure AI implementation.",
    chips: ["Prompt injection", "Guardrail bypass"],
    category: "offensive",
    overview: [
      "Deploying LLMs and autonomous AI agents introduces novel vulnerability classes — from direct and indirect prompt injection to insecure tool execution and training data leakage.",
      "We systematically stress-test your AI guardrails, test for prompt injection jailbreaks, check agent permissions, and evaluate RAG data segregation.",
    ],
    whatsIncluded: [
      "Direct and indirect prompt injection resistance testing",
      "System prompt leakage and instruction override evaluation",
      "Autonomous agent tool/function-calling permission boundary checks",
      "RAG document store authorization and cross-tenant leakage validation",
    ],
    terminalData: {
      user: "root@bytesencrypt: ai-eval",
      lines: [
        { prompt: "$", output: "inject-prompt --target /api/v1/chat --vector indirect_rag" },
        { output: "> system instructions bypassed via poisoned doc" },
        { prompt: "$", output: "eval tool_permissions --agent assistant" },
        { output: "> unauthorized database write allowed" },
        { output: "> severity: CRITICAL — guardrail bypass executed" },
      ],
    },
  },
  {
    id: "06",
    slug: "cyber-risk-advisory",
    title: "Cyber Risk",
    subtitle: "Advisory Services",
    description: "Strategic guidance to protect systems, networks, and data from evolving cyber threats.",
    chips: ["Risk register", "Roadmap planning"],
    category: "advisory",
    overview: [
      "Not every security problem is solved by a test. Sometimes what a team needs is help deciding what to fix first, how to explain risk to a board, or which tooling is actually worth the budget. That’s the advisory side of what we do.",
      "We work alongside your team over time — building and maintaining a risk register, helping plan the security roadmap, and translating technical risk into language that lands with executives and budget-holders.",
    ],
    whatsIncluded: [
      "Risk register development & ongoing maintenance",
      "Security roadmap & investment prioritization",
      "Board & executive risk reporting support",
      "Vendor & security tooling evaluation",
    ],
    coverageData: [
      { label: "People", sub: "ORG · AWARENESS", color: "indigo", offset: 24 },
      { label: "Process", sub: "POLICY · WORKFLOW", color: "mint", offset: 24 },
      { label: "Technology", sub: "STACK · INFRA", color: "coral", offset: 24 },
    ],
  },
  {
    id: "07",
    slug: "cloud-security-assessment",
    title: "Cloud Security",
    subtitle: "Assessment",
    description: "Evaluating configuration and security posture of cloud environments — AWS, Azure and GCP.",
    chips: ["IAM review", "AWS · Azure · GCP"],
    category: "assurance",
    overview: [
      "Cloud breaches are rarely a zero-day — they're a storage bucket left public, an IAM role with far more permission than it needs, or a security group open to the world by accident. We review your configuration against exactly those patterns.",
      "The result is a prioritized list of misconfigurations, each with the specific resource, the risk it creates, and the fix — not a generic best-practices checklist.",
    ],
    whatsIncluded: [
      "IAM policy review for over-permissioning",
      "Storage bucket / blob exposure checks",
      "Network security group & firewall rule audit",
      "Logging & monitoring coverage verification",
    ],
    scanData: [
      "IAM policies reviewed for over-permissioning",
      "Storage buckets checked for public exposure",
      "Security groups and open ports audited",
      "CloudTrail & centralized logging verified",
    ],
  },
  {
    id: "08",
    slug: "secure-config-review",
    title: "Secure Config Review",
    subtitle: "(Devices / Firewalls)",
    description: "Hardening network devices and firewalls by auditing configurations against best practices.",
    chips: ["Firewall rules", "Hardening benchmarks"],
    category: "assurance",
    overview: [
      "Over time, network configurations accumulate technical debt: legacy firewall rules left open for testing, default credentials on auxiliary management switches, and misconfigured SSL decryption policies.",
      "Our team performs a thorough audit of your device rulesets and firmware baselines against CIS benchmarks and vendor best practices.",
    ],
    whatsIncluded: [
      "Firewall rule base review & unused rule identification",
      "Network switch and router hardening inspection",
      "Administrative interface access-control evaluation",
      "VPN gateway configuration and cipher suite audit",
    ],
    scanData: [
      "Legacy permissive 'ANY/ANY' rules triaged",
      "Administrative SSH & HTTPS restricted to management VLAN",
      "Strong cryptographic suites enforced across VPN tunnels",
      "Firmware patch status cross-referenced with vendor advisories",
    ],
  },
  {
    id: "09",
    slug: "red-team-assessment",
    title: "Red Team Assessment",
    subtitle: "(Social Engineering)",
    description: "Simulated real-world attacks including phishing and physical breach attempts to test defenses.",
    chips: ["Phishing simulation", "Physical access"],
    category: "offensive",
    overview: [
      "A red team engagement doesn't focus on discovering all vulnerabilities; it tests whether an adversary can achieve specific high-impact objectives — like exfiltrating sensitive customer data or gaining domain controller dominion.",
      "We operate under strict rules of engagement, utilizing spear-phishing campaigns, credential harvesting, physical intrusion techniques, and covert C2 infrastructure.",
    ],
    whatsIncluded: [
      "Targeted spear-phishing and social engineering simulation",
      "Assumed-breach persistence and covert lateral movement",
      "Defensive blue team / SOC detection capability assessment",
      "Comprehensive timeline mapping: attacker actions vs defender telemetry",
    ],
    terminalData: {
      user: "root@bytesencrypt: redteam",
      lines: [
        { prompt: "$", output: "campaign launch --template hr_update --target finance_dept" },
        { output: "> 3 credentials captured, 1 payload executed" },
        { prompt: "$", output: "beacon connect 10.0.4.12 --covert" },
        { output: "> established internal C2 communication channel" },
        { output: "> severity: HIGH — initial foothold established undetected" },
      ],
    },
  },
  {
    id: "10",
    slug: "gap-assessment",
    title: "Gap Assessment",
    subtitle: "(CMA / Audits)",
    description: "Evaluating cyber maturity, IAM, and compliance gaps to ensure regulatory adherence.",
    chips: ["Framework mapping", "Audit-ready"],
    category: "advisory",
    overview: [
      "Preparing for an external regulatory audit or seeking to elevate your security posture to standard frameworks? Our gap assessment clarifies where your current controls fall short.",
      "We evaluate your policies, technical controls, and operational workflows against standards like ISO 27001, SOC 2, HIPAA, and regional requirements.",
    ],
    whatsIncluded: [
      "Security framework control alignment & maturity rating",
      "IAM governance and privilege escalation gap analysis",
      "Third-party vendor risk management review",
      "Actionable remediation roadmap mapped to audit deadlines",
    ],
    coverageData: [
      { label: "Policy", sub: "GOVERNANCE · COMPLIANCE", color: "indigo", offset: 24 },
      { label: "Controls", sub: "TECHNICAL IMPLEMENTATION", color: "mint", offset: 24 },
      { label: "Audit", sub: "EVIDENCE & READINESS", color: "amber", offset: 24 },
    ],
  },
];
