# Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

My personal portfolio — a single-page Next.js site with an interactive 3D experience, smooth scroll animations, and a working contact form.

🔗 **Live:** [salahbounouh.com](https://salahbounouh.com)

> **Stack:** Next.js 15 (App Router) · React 19 · React Three Fiber + Drei · Framer Motion · Tailwind CSS v4 · Nodemailer

## Highlights

- **3D skills "solar system"** — an interactive orbit of technology logos built with React Three Fiber and Drei, with a custom GLSL fresnel-glow core, starfield/nebula background, and category constellations. Adapts across performance tiers (high → mid → low → static fallback) based on device capability, with icons packed into a single WebP atlas for fast loading.
- **Animated hero** — Three.js canvas overlays (geometric background + quantum particles).
- **Scroll reveals** — section animations via Framer Motion (`whileInView`).
- **Lazy loading** — heavy sections are dynamically imported; the WebGL skills scene is client-only (`ssr: false`) and idle-prefetched.
- **Contact form** — submits to a Next.js API route that sends email via Nodemailer (Gmail SMTP).

## Sections

`Home` · `Projects` · `Experience` · `Skills` (3D) · `Services` · `Contact`

## Tech Stack

| Area | Technologies |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| 3D / Graphics | React Three Fiber, Drei, custom GLSL shaders |
| Animation | Framer Motion |
| Styling | Tailwind CSS v4 |
| Fonts | Geist, Orbitron, Space Grotesk (next/font) |
| Email | Nodemailer (Gmail SMTP) |

## Getting Started

```bash
git clone https://github.com/salahbnh/portfolio.git
cd portfolio
npm install
cp .env.local.example .env.local   # set EMAIL_USER, EMAIL_PASS, YOUR_EMAIL
npm run dev                         # http://localhost:3000
```

---

Built by [Salah Bounouh](https://github.com/salahbnh) · [Portfolio](https://salahbounouh.com) · [LinkedIn](https://www.linkedin.com/in/salah-bounouh-1426ba27b/)
