# BytesEncrypt Technologies — Frontend Replication

A high-fidelity frontend replication of [bytesencrypt.com](https://bytesencrypt.com/) built with Next.js, TypeScript, React, and Tailwind CSS.

## Technologies Used

- **Next.js 15** — React framework with App Router
- **TypeScript** — Type-safe development
- **React 19** — UI component library
- **Tailwind CSS 4** — Utility-first CSS framework
- **Framer Motion** — Animations and transitions
- **Lucide React** — Icon library
- **React Hook Form** — Form state management
- **Zod** — Schema validation
- **@hookform/resolvers** — Zod integration with React Hook Form

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout with fonts & metadata
│   ├── globals.css           # Global styles & design tokens
│   ├── actions.ts            # Server actions (contact form)
│   ├── solutions/
│   │   ├── page.tsx          # Solutions & Offerings page
│   │   └── layout.tsx        # Solutions metadata
│   ├── about/
│   │   ├── page.tsx          # About Us page
│   │   └── layout.tsx        # About metadata
│   └── blog/
│       ├── page.tsx          # Blog page (coming soon)
│       └── layout.tsx        # Blog metadata
├── components/
│   ├── Navbar.tsx            # Responsive navigation
│   ├── Hero.tsx              # Hero section with mesh gradient
│   ├── SecurityPulse.tsx     # ECG monitor visualization
│   ├── Vitals.tsx            # Attack surface ring indicators
│   ├── Solutions.tsx         # Solutions/Trainings/Bootcamps triad
│   ├── SolutionCard.tsx      # Reusable solution card
│   ├── Approach.tsx          # 4-step engagement process
│   ├── WhyUs.tsx             # Why BytesEncrypt pillars
│   ├── ContactSection.tsx    # Contact form with validation
│   ├── Footer.tsx            # Site footer
│   └── BrandLogo.tsx         # SVG brand logo
└── lib/
    └── validations.ts        # Zod form schemas
```

## Setup & Running

### Prerequisites

- Node.js 18+ installed
- npm 9+ installed

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

### Lint

```bash
npm run lint
```

## Features

- **Visual Replication** — Pixel-accurate recreation of bytesencrypt.com
- **Responsive Design** — Works across all breakpoints (320px–1920px)
- **Animations** — Framer Motion scroll reveals, ECG wave, pulse dots, ring fills
- **Form Validation** — React Hook Form + Zod with error/success/loading states
- **Server Actions** — Next.js server action for contact form
- **SEO** — Proper metadata, Open Graph tags, semantic HTML
- **Accessibility** — ARIA labels, focus states, keyboard navigation, semantic structure
- **Performance** — Server components by default, minimal client-side JS

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FCFCFA` | Page background |
| `--panel` | `#F4F4F8` | Card/section background |
| `--panel-line` | `#E6E5EF` | Borders |
| `--ink` | `#13121C` | Primary text / dark sections |
| `--ink-soft` | `#3F3D52` | Secondary text |
| `--ink-faint` | `#716F87` | Muted text |
| `--indigo` | `#5B4CFF` | Primary accent |
| `--mint` | `#17B978` | Success/monitoring |
| `--coral` | `#F0483E` | Danger/offensive |
| `--amber` | `#F2A930` | Warning/advisory |

## Fonts

- **Display**: Plus Jakarta Sans (400–800)
- **Mono**: JetBrains Mono (400–600)
