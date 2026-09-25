# BytesEncrypt Technologies

> **Offensive Security and Assurance Partner for Enterprises**  
> VAPT, Red Teaming, Secure Code Review, Cloud Security, and Cyber Risk Advisory.

---

## Overview

BytesEncrypt Technologies is a security testing practice engineered for enterprise resilience. We provide manual-first offensive testing, vulnerability assessments, architecture reviews, and plain-language reporting for applications, networks, cloud estates, and personnel.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

---

## Architecture & Routes

```
src/
├── app/
│   ├── page.tsx                      # Homepage (Hero, Pulse, Triad, Approach, Why Us, CTA)
│   ├── layout.tsx                    # Root layout, typography, metadata
│   ├── globals.css                   # Design tokens, CSS variables, keyframe animations
│   ├── actions.ts                    # Contact intake server action
│   ├── solutions/
│   │   ├── page.tsx                  # Solutions directory (10 checks, filter bar, trust strip)
│   │   ├── layout.tsx                # Solutions metadata
│   │   └── [slug]/
│   │       └── page.tsx              # Dynamic service pages (Attack console, scan sweeps, coverage rings)
│   ├── about/
│   │   ├── page.tsx                  # About Us (Philosophy, credentials, values)
│   │   └── layout.tsx                # About metadata
│   └── blog/
│       ├── page.tsx                  # Engineering field notes & security articles
│       ├── layout.tsx                # Blog metadata
│       └── [slug]/
│           └── page.tsx              # Full article reader
├── components/
│   ├── Navbar.tsx                    # Responsive navigation header
│   ├── Hero.tsx                      # Hero banner with radial mesh
│   ├── SecurityPulse.tsx             # Real-time SVG pulse ECG monitor
│   ├── Vitals.tsx                    # Attack surface health rings
│   ├── Solutions.tsx                 # Triad panel (Solutions / Trainings / Bootcamps)
│   ├── SolutionCard.tsx              # Category-coded solution cards
│   ├── Approach.tsx                  # 4-stage engagement stepper
│   ├── WhyUs.tsx                     # Core pillars
│   ├── ContactSection.tsx            # Scoping intake form with validation
│   ├── Footer.tsx                    # Complete footer & company links
│   └── BrandLogo.tsx                 # SVG brand mark
└── lib/
    ├── solutions-data.ts             # 10 service specifications & interactive widget payloads
    ├── blog-data.ts                  # Security research articles & field notes
    └── validations.ts                # Form schemas & validation rules
```

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm 9+

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create an optimized production build:

```bash
npm run build
npm start
```

### Quality Assurance

```bash
npm run lint
```

---

## Contact & Security Scoping

- **Email**: [contact@bytesencrypt.com](mailto:contact@bytesencrypt.com)
- **Phone**: +91 9113962011
- **Headquarters**: Kalyan Nagar, Bangalore, KAR-560043

---

## License

&copy; 2026 BytesEncrypt Technologies Pvt Ltd. All rights reserved.
