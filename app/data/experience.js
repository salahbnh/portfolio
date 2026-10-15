// Work history and education — mirrors the CV (public/SalahBounouh_CV.pdf).
// Keep both in sync when either changes.

export const EXPERIENCE = [
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Self-employed',
    location: 'Remote · client projects',
    period: 'Feb 2026 – Present',
    current: true,
    projects: [
      {
        name: 'ESN Resource Manager',
        summary: 'Recruitment, staffing and contract platform for an IT consulting firm.',
        highlights: [
          '15 backend modules (~100 REST endpoints), 21 Prisma/PostgreSQL models and a 34-page Next.js 15 / React 19 app.',
          'Keycloak OIDC with 4-role RBAC, audit logging and a multi-step contract approval flow (HR → Manager → Direction) with generated PDFs; documents stored in MinIO/S3.',
          '460+ backend tests (Vitest unit + Supertest integration against real PostgreSQL and S3 storage) running in GitHub Actions CI, Playwright e2e on the frontend, and AI-assisted candidate evaluation with the Claude API.',
        ],
        tools: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Next.js 15', 'React 19', 'Keycloak'],
        links: [
          { href: 'https://github.com/salahbnh/esn_backend', label: 'Backend code' },
          { href: 'https://github.com/salahbnh/esn_frontend', label: 'Frontend code' },
        ],
      },
      {
        name: 'FinanceOS',
        summary: 'Multi-tenant personal and business finance SaaS.',
        highlights: [
          '~130 REST endpoints on Java 21 / Spring Boot 3.5 with PostgreSQL, Redis and Flyway; Next.js 16 front-end.',
          'JWT auth with TOTP two-factor login, RBAC, audit logs and Stripe subscriptions with webhooks.',
          'Bank CSV import with rule + LLM transaction categorization, covered by 390+ JUnit 5 / Testcontainers tests.',
        ],
        tools: ['Java 21', 'Spring Boot 3.5', 'PostgreSQL', 'Redis', 'Flyway', 'Stripe', 'Next.js 16'],
        note: 'Private repository',
      },
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Key Object',
    location: 'Tunis',
    period: 'May 2025 – Oct 2025',
    highlights: [
      'Fine-tuned Flan-T5 with LoRA/PEFT for résumé field extraction (80%+ accuracy on skills and education), served as a REST endpoint in the ERP recruitment module.',
      'Built a Django recruitment dashboard with candidate scoring, cutting manual screening by about 60%.',
    ],
    tools: ['Python', 'Hugging Face', 'LoRA/PEFT', 'Django'],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'IPACT',
    location: 'Tunis',
    period: 'Jun 2024 – Aug 2024',
    highlights: [
      'Delivered Spring Boot + Angular project-management modules with KPI dashboards and archival workflows.',
      'Optimized MongoDB archival queries and set up Jenkins CI/CD pipelines.',
    ],
    tools: ['Spring Boot', 'Angular', 'MongoDB', 'Jenkins'],
  },
  {
    role: 'Software Developer Intern',
    company: 'Devzone International',
    location: 'Tunis',
    period: 'Jul 2023 – Aug 2023',
    highlights: [
      'Customized Odoo ERP modules in Python; handled deployments and maintenance.',
    ],
    tools: ['Python', 'Odoo'],
  },
];

export const EDUCATION = [
  {
    degree: 'Engineering Degree in Computer Science',
    detail: "Diplôme d'Ingénieur (Master's-level) · Specialization: Full-Stack Development",
    school: 'ESPRIT',
    location: 'Tunis',
    period: '2026',
  },
];
