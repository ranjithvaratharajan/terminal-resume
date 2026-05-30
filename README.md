# Ranjith Varatharajan — Interactive Resume

> A premium, typography-first interactive resume built with Next.js, TypeScript, Tailwind CSS, GSAP, and Framer Motion.

![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)

## ✨ Features

- **Typography-First Design** — Clean, editorial layout optimized for readability
- **Smooth Animations** — GSAP ScrollTrigger reveals, character staggers, Framer Motion transitions
- **ATS Optimized** — Semantic HTML, JSON-LD schema, proper heading hierarchy, machine-readable content
- **Fully Responsive** — Mobile-first design with fluid typography
- **Accessible** — Focus management, reduced motion support, screen reader friendly
- **Fast** — Static export, optimized fonts, minimal JavaScript
- **SEO Ready** — Open Graph, Twitter Cards, structured data, canonical URLs

## 🚀 Quick Start

1. **Install dependencies**
    ```bash
    npm install
    ```

2. **Run locally**
    ```bash
    npm run dev
    ```
    Navigate to `http://localhost:3000/`

3. **Build for production**
    ```bash
    npm run build
    ```
    Static output will be in the `out/` directory.

## 📝 Customization

All resume data lives in `src/lib/resume-data.ts`. Edit this single file to update:
- Personal information
- Work experience
- Projects
- Skills
- Education
- Testimonials

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
│   ├── page.tsx            # Main page (server component)
│   └── globals.css         # Design system
├── components/
│   ├── layout/             # Header, Footer, ScrollProgress, SmoothScroll
│   ├── sections/           # Hero, Summary, Experience, Projects, Skills, etc.
│   └── ui/                 # MagneticButton, SectionHeader, AnimatedCounter
└── lib/
    ├── resume-data.ts      # All resume content (typed)
    └── animations.ts       # GSAP animation hooks
```

## 🚢 Deployment

Uses **GitHub Actions** for automated deployment via FTP:

1. Push to `master` branch
2. GitHub Action builds the Next.js project
3. Uploads static `out/` directory to hosting

### Setup
1. Get your FTP credentials
2. Add GitHub secrets: `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger |
| Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Fonts | Inter + JetBrains Mono |

---
*Designed and built as a premium digital resume.*
