// Shared skill data.
//
// FRONTEND / BACKEND / TOOLS feed the 3D SolarSystem scene and the static
// fallback. Every entry needs an icon packed into /skills-atlas.webp (see
// scripts/generate-skills-atlas.mjs), so only skills with a logo live here.
// `level` (0..1) only drives node size/glow in the 3D scene.
//
// STACK is the full, server-rendered text list shown under the scene (and
// read by crawlers). It mirrors the Skills section of the CV.
export const FRONTEND = [
  { name: 'React',      icon: '/reactsjs.png',  level: 0.95 },
  { name: 'Next.js',    icon: '/nextjs.png',    level: 0.9 },
  { name: 'TypeScript', icon: '/typescript.png',level: 0.8 },
  { name: 'JavaScript', icon: '/js.png',        level: 0.95 },
];

export const BACKEND = [
  { name: 'Node.js',    icon: '/nodejs.png',    level: 0.85 },
  { name: 'Java',       icon: '/java.png',      level: 0.75 },
  { name: 'Spring Boot', icon: '/springboot.png', level: 0.7 },
  { name: 'Firebase',   icon: '/firebase.png',  level: 0.8 },
];

export const TOOLS = [
  { name: 'MongoDB', icon: '/mongodb.png', level: 0.8 },
  { name: 'SQL',     icon: '/sql.png',     level: 0.8 },
  { name: 'Git',     icon: '/git.png',     level: 0.9 },
  { name: 'Unity',   icon: '/unity.png',   level: 0.7 },
  { name: 'C',       icon: '/c.png',       level: 0.65 },
  { name: 'C#',      icon: '/c-sharp.png', level: 0.7 },
  { name: 'C++',     icon: '/c++.png',     level: 0.65 },
];

export const CATEGORIES = [
  { label: 'FRONTEND', skills: FRONTEND },
  { label: 'BACKEND',  skills: BACKEND },
  { label: 'TOOLS',    skills: TOOLS },
];

export const ALL_ICONS = [...FRONTEND, ...BACKEND, ...TOOLS].map((s) => s.icon);

export const STACK = [
  { label: 'Languages',       items: ['TypeScript', 'JavaScript', 'Java 21', 'Python', 'SQL'] },
  { label: 'Backend',         items: ['Node.js', 'NestJS', 'Express', 'Spring Boot 3', 'Django'] },
  { label: 'Frontend',        items: ['React 19', 'Next.js', 'Angular', 'TanStack Query', 'Tailwind CSS'] },
  { label: 'Data',            items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma', 'Flyway'] },
  { label: 'Auth & Payments', items: ['Keycloak / OIDC', 'JWT', 'RBAC', 'Stripe'] },
  { label: 'Testing',         items: ['Vitest', 'JUnit 5', 'Testcontainers', 'Playwright'] },
  { label: 'DevOps',          items: ['Docker', 'GitHub Actions', 'Jenkins'] },
  { label: 'AI',              items: ['Claude & OpenAI APIs', 'Hugging Face', 'LoRA / PEFT'] },
];
