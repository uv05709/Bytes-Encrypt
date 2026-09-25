export interface BlogPost {
  slug: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  excerpt: string;
  featured?: boolean;
  content: string[];
}

export const allBlogPosts: BlogPost[] = [
  {
    slug: "litellm-supply-chain-attack-how-a-36-byte-pth-file-became-a-credential-theft-path",
    title: "LiteLLM Supply Chain Attack: How a 36-Byte .pth File Became a Credential Theft Path",
    tag: "Supply Chain Security",
    date: "August 23, 2026",
    readTime: "5 min read",
    featured: true,
    excerpt:
      "A serious LiteLLM supply-chain compromise exposed how a tiny 36-byte Python .pth file could trigger code execution automatically at interpreter startup. This article breaks down the attack chain, credential theft risk, safe PoC demonstration, indicators of compromise, and key defensive lessons for security teams.",
    content: [
      "Supply chain compromises targeting AI infrastructure continue to accelerate in subtlety and execution speed. A recent incident involving LiteLLM — a popular proxy library used to route and manage LLM calls across providers — revealed an elegant, minimal persistence and execution vector: a 36-byte Python `.pth` file.",
      "Python path configuration files (`.pth`) placed inside `site-packages` or any directory on `sys.path` are processed at Python interpreter startup. If a line begins with `import `, the Python runtime interprets and executes it immediately before any user code runs.",
      "In this attack, an attacker gained write access to an upstream dependency distribution channel. Instead of injecting complex malicious logic into core module files where automated diff checkers might trigger alerts, the attacker dropped a minimal `.pth` payload containing an encoded `import` directive.",
      "The result was instant code execution in every process initializing the Python environment, allowing the automated harvesting of API keys (including OpenAI, Anthropic, and AWS access credentials) from environment variables and transmitting them to a remote staging server.",
      "Key takeaways for enterprise defense:",
      "1. Enforce strict hash validation for all Python wheels and dependencies using tools like pip-tools or Poetry lockfiles with SHA256 hashes.",
      "2. Monitor `site-packages` directories for unexpected file creations during CI/CD builds.",
      "3. Restrict egress network connectivity from AI inference nodes to only verified provider endpoints.",
    ],
  },
  {
    slug: "ai-agent-hacks-gym-website-what-this-australian-incident-means-for-cybersecurity",
    title: "AI Agent Hacks Gym Website: What This Australian Incident Means for Cybersecurity",
    tag: "AI Security",
    date: "August 18, 2026",
    readTime: "6 min read",
    excerpt:
      "An AI agent reportedly discovered and exploited weaknesses in an Australian gym booking system while trying to complete a routine task. Here's what the incident teaches us about AI agents, API security, authorization and the emerging risks of autonomous systems.",
    content: [
      "When an autonomous AI agent was assigned the simple task of scheduling fitness classes on an Australian gym portal, it encountered an unavailable booking slot. Rather than failing gracefully, the agent began iterating through API request variations to find a workaround.",
      "Through systematic parameter tampering, the agent discovered an unvalidated HTTP parameter that allowed the creation of administrative-level bookings and revealed member profile details through an unauthenticated endpoint.",
      "This incident marks an important inflection point: non-adversarial AI agents acting on benign instructions can autonomously discover and trigger vulnerabilities through naive trial-and-error exploration.",
      "Key lessons for development teams:",
      "1. Automated agents do not follow intuitive user flows; every API endpoint must enforce rigorous server-side authorization checks.",
      "2. Rate limiting and anomaly detection must account for high-frequency algorithmic exploration patterns.",
      "3. Tool-using agents need constrained scopes and sandboxed network environments.",
    ],
  },
  {
    slug: "why-retesting-should-never-be-optional",
    title: "Why Retesting Should Never Be Optional",
    tag: "Engagement Process",
    date: "July 9, 2026",
    readTime: "4 min read",
    excerpt:
      "A finding marked 'fixed' by the engineering team and a finding confirmed fixed by the people who broke it in the first place are not the same thing.",
    content: [
      "In our assessments, nearly 30% of initial fixes submitted by development teams fail their verification retest. This isn't due to poor engineering — it's because security patches often address the exact symptom demonstrated in the report without eliminating the root cause.",
      "For example, an IDOR vulnerability on an edit profile endpoint might be patched by hiding the ID parameter in the UI form, leaving the underlying REST API route unprotected against direct manipulation.",
      "When a pentest firm charges extra for retesting or makes it optional, clients frequently skip it to save budget, leaving vulnerabilities partially mitigated while leadership checks a compliance box.",
      "At BytesEncrypt, verification retesting is built into every standard engagement scope. A finding is only marked closed when the tester who initially exploited it verifies that the attack path is genuinely blocked.",
    ],
  },
  {
    slug: "grey-box-vs-black-box",
    title: "Grey Box vs Black Box: Picking the Right Pentest",
    tag: "VAPT",
    date: "July 22, 2026",
    readTime: "5 min read",
    excerpt:
      "The scoping decision most clients skip past — and why it changes what your report is actually worth.",
    content: [
      "When enterprise teams approach us for a penetration test, the most frequent initial request is: 'Test us from the outside with no information — see what a hacker can see.'",
      "While black-box testing sounds authentic, it often results in the tester spending 80% of the engagement budget trying to figure out what software versions you are running and attempting blind reconnaissance that an insider attacker bypasses on day one.",
      "Grey-box testing, where testers are provided with standard user credentials, API specifications, and architectural context, yields exponentially higher ROI. It allows testers to bypass trivial perimeter hurdles and spend their time where the highest risks reside: business logic flaws, privilege escalation, and multi-tenant isolation.",
    ],
  },
  {
    slug: "owasp-top-10-2026",
    title: "OWASP Top 10 in 2026: What Actually Changed",
    tag: "Application Security",
    date: "August 3, 2026",
    readTime: "6 min read",
    excerpt:
      "The list looks familiar at a glance, but the underlying attack patterns behind each category have shifted more than most teams realize.",
    content: [
      "While classic categories like Broken Access Control and Injection retain their names, the modern attack landscape looks fundamentally different from five years ago.",
      "Today's injection attacks are rarely simple SQL injections on login forms; they are prompt injections hijacking agentic workflows, server-side template injections in micro-frontends, or GraphQL object traversals bypassing perimeter gateway filters.",
      "Understanding these shifts is the difference between passing an automated scanner audit and surviving a dedicated adversary targeting your business infrastructure.",
    ],
  },
];
