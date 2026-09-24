# SATR — Built from the first line

**SATR** (Arabic: سطر, meaning "a line") is a modern, high-performance technology website engineered for SATR — a full-service technology partner that designs, builds, and scales websites, mobile apps, SaaS platforms, custom software, e-commerce, AI, and cloud systems.

---

## 🚀 Key Highlights & Architectural Features

- **Next.js 16 (App Router) + React 19 + TypeScript**: Modern, production-ready server and client architecture.
- **Three.js Hero 3D Line Sculpture**:
  - Glossy sky-blue CatmullRom tube curve with draw-on animation.
  - White glossy pearl riding the tip of the line.
  - Navy torus ring rotating on two axes.
  - Floating, bobbing glass spheres with realistic reflection and lighting.
  - Interactive mouse tracking and smooth idle sway.
  - Viewport observer to pause the render loop offscreen for 60fps performance.
- **Precision Design System**:
  - 85% white and pale sky mist with deep navy anchors and sky blue accents.
  - Curated glassmorphism (`rgba(255,255,255,0.66)`, `0.5px solid rgba(125,211,252,0.85)`, `blur(12px)`).
  - Modern typography: **Geist**, **IBM Plex Sans Arabic**, and **JetBrains Mono**.
- **Interactive Micro-Animations**:
  - 3D card tilt with 800px perspective on services and work cards.
  - CSS 3D Isometric Stack (Infrastructure, Code, Design) that expands from 30px to 60px/120px on hover.
  - 5 isometric 3D pillars with staggered growth and hover tooltips.
  - Live dot traveling back and forth across the division line.
  - Closing CTA with dual 3D counter-orbiting rings.
  - Giant 3D extruded `SATR` wordmark in the footer.
- **Bilingual & RTL-Ready**:
  - Seamless toggle between **English** (LTR) and **Arabic** (RTL).
  - Global `LanguageProvider` with localized copy across all components and pages.
- **Complete Page Suite**:
  - **Homepage (`/`)**: Hero, Logo marquee, What We Build, The Whole Stack, Stats band, Selected Work, How We Work, Closing CTA, Footer.
  - **Services Overview (`/services`)**: Full showcase of all 7 divisions.
  - **Division Details (`/services/[division]`)**: Dynamic pages for Web, Mobile, SaaS, Software, Commerce, AI, and Cloud.
  - **Work Showcase (`/work`)**: Portfolio grid with interactive category filters.
  - **Case Study Template (`/work/[slug]`)**: Interactive Connected System Map, Challenge, Solution, Measurable Metrics, and Interface Gallery.
  - **About (`/about`)**: The story of the name سطر, mission, values, and engineering philosophy.
  - **Start a Project (`/contact`)**: 4-step chat-style intake form with interactive chips, inline validation, and lead capture.
  - **404 Page (`not-found.tsx`)**: "This line hasn't been written yet_" with animated cursor.

---

## 🛠️ Getting Started Locally

### 1. Prerequisites
- Node.js `v18+` or `v20+` or `v24+`
- npm, yarn, or pnpm

### 2. Installation
```bash
cd satr-website
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Design Tokens & Customization

All design tokens are defined in:
- `src/lib/tokens.ts`: Central JavaScript/TypeScript token definitions for colors, typography, shadows, glassmorphism, and radii.
- `src/app/globals.css`: Tailwind CSS theme variables, keyframe animations, and utility classes.

### Primary Color Palette:
- **Deep Navy**: `#0C4A6E`
- **Deep Sky**: `#0369A1`
- **Sky Blue** (Primary Accent): `#0EA5E9`
- **Light Sky**: `#38BDF8`
- **Soft Sky**: `#7DD3FC`
- **Pale Sky**: `#BAE6FD`
- **Sky Mist**: `#E0F2FE`
- **Ice White**: `#F5FAFF` / `#F0F9FF`
- **Pure White**: `#FFFFFF`
- **Body Text**: `#3F7FA8`
- **Border**: `#D6E6F2`
- **Error**: `#B42318`

---

## 📝 Replacing Content & Placeholders

All placeholders marked in the brief are easy to replace:
1. **Client names**: Edit `src/components/ClientStrip.tsx`.
2. **Stats**: Edit `src/components/StatsBand.tsx` (`data-target` attributes and labels).
3. **Notification metrics**: Edit `src/components/FloatingNotification.tsx`.
4. **Projects & Case Studies**: Edit `src/app/work/page.tsx` and `src/app/work/[slug]/page.tsx`.
5. **Contact info & Socials**: Edit `src/components/Footer.tsx`.

---

## 🌐 Deploying to Vercel

The application is fully optimized for **Vercel** with zero extra configuration:

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Framework preset will automatically detect **Next.js**.
5. Click **"Deploy"**.

Alternatively, deploy directly via Vercel CLI:
```bash
npm install -g vercel
vercel
```

---

## 📄 License
© SATR. Built from the first line. All rights reserved.
