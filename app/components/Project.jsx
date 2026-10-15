'use client';
import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// ─── Data ──────────────────────────────────────────────────────────────────────
// Full-stack work first. `link` = live site, `repo` = public GitHub repo; either
// may be null. `keyTools` are the 3–4 tools shown on the card itself.
const GITHUB = 'https://github.com/salahbnh';

const projects = [
  {
    title: "NexusAI — AI SaaS Template",
    image: "/ai-saas.webp",
    summary: "AI SaaS template with multi-model chat, image generation, Stripe billing and an admin panel.",
    description: "A commercial-grade SaaS template that gives developers a complete AI-powered web application out of the box. Includes a marketing site, authentication, subscription billing, admin panel, and multiple AI tools — all wired together and ready to deploy. Features multi-model AI chat with conversation history, AI Writer with 8 content templates, AI Image generator (DALL-E 3) with gallery, subscription billing with 3 tiers via Stripe, rate limiting, usage quotas, plan-based model access, and an admin panel with user management.",
    tools: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "Neon Postgres", "Clerk", "Stripe", "Vercel AI SDK", "OpenAI", "Groq", "Anthropic", "Upstash Redis", "shadcn/ui"],
    keyTools: ["Next.js 14", "TypeScript", "Prisma", "Stripe"],
    link: "https://ai-saas-phi-nine.vercel.app/",
    repo: `${GITHUB}/ai_saas`,
  },
  {
    title: "Sassify — SaaS Template",
    image: "/sassify.webp",
    summary: "Full-stack SaaS template with an animated landing page, Clerk auth, MDX blog/docs and Stripe billing.",
    description: "Sassify is a production-ready, full-stack SaaS template built with Next.js 14 App Router. It ships with a fully animated dark-first landing page — hero, features, pricing, testimonials, FAQ, and more — powered by Framer Motion and GSAP scroll animations with Lenis smooth scroll. The design language is modern dark cinema with glass morphism, fluid gradients, and micro-interactions throughout. Beyond the landing page, it includes a complete multi-page application: dashboard, auth flows (Clerk), blog and docs powered by MDX, and a settings/billing area. Payments are handled via Stripe with checkout and webhooks, data persistence via Prisma + Postgres, and transactional emails via Resend and React Email. The UI is built on shadcn/ui with a custom component library of 20+ reusable primitives. Dark/light mode is supported out of the box.",
    tools: ["Next.js 14", "TypeScript", "Tailwind CSS", "shadcn/ui", "Clerk", "Stripe", "Prisma", "Resend", "React Email", "Framer Motion", "GSAP", "Lenis", "Drei", "MDX", "next-themes", "Lucide React"],
    keyTools: ["Next.js 14", "TypeScript", "Prisma", "Stripe"],
    link: "https://sassify-alpha.vercel.app/",
    repo: `${GITHUB}/Sassify`,
  },
  {
    title: "E-commerce Dashboard",
    video: "/ecommerce-aymen.mp4",
    videoWebm: "/ecommerce-aymen.webm",
    poster: "/ecommerce-aymen-poster.webp",
    summary: "E-commerce REST API with Stripe payments, Redis caching and a React admin dashboard.",
    description: "An e-commerce platform with a production-ready backend: all CRUD operations and REST APIs for admin and client flows using Node.js and Express, following a layered architecture (routes → controllers → services/models). Features Stripe payment integration, admin statistics/metrics for inventory monitoring, and Redis-based caching. The admin dashboard is built with React.js. Everything is fully containerized with Docker.",
    tools: ["Node.js", "Express.js", "MongoDB", "React.js", "Redis", "Stripe", "Docker"],
    keyTools: ["Node.js", "Express.js", "MongoDB", "Redis"],
    link: null,
    repo: `${GITHUB}/ecommerce-rest-api`,
  },
  {
    title: "MedVR",
    image: "/medvr.webp",
    summary: "Clinic management platform with appointment booking, medical folders and real-time notifications.",
    description: "A modern clinic management platform that connects patients and doctors. It supports appointment booking, medical folder management, real-time notifications, and online payments. Built with React, Node.js, MongoDB, and Socket.IO.",
    tools: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
    keyTools: ["React", "Node.js", "MongoDB", "Socket.IO"],
    link: "https://my-app-kappa-gules-18.vercel.app/",
    repo: `${GITHUB}/MedVR`,
  },
  {
    title: "Imaginify — AI Image Platform",
    video: "/Imaginfy.mp4",
    videoWebm: "/Imaginfy.webm",
    poster: "/Imaginfy-poster.webp",
    summary: "Text-to-image platform with multiple models, AI image editing, upscaling and a community feed.",
    description: "Imaginify is a website for generating images from text prompts, with multiple model choices: SDXL (v1.0, v0.9, v1.6) and DALL·E. It also supports AI image editing: upload an input image and describe the changes in a text prompt. Users can also upscale any given image. A community \"Explore\" section shows the images other users chose to publish, with the publisher's name, the prompt and the generation settings to inspire others, and users can like each other's images.",
    tools: ["Next.js", "Firebase", "Stripe", "Stable Diffusion APIs", "DALL·E API"],
    keyTools: ["Next.js", "Firebase", "Stripe", "Stable Diffusion APIs"],
    link: null,
    repo: null,
  },
  {
    title: "Spicy Barbershop",
    image: "/barber.webp",
    summary: "Barbershop website for browsing services, checking availability and booking appointments online.",
    description: "A modern and stylish website for a barbershop, allowing users to browse services, check availability, and book appointments online. Built with Next.js and deployed on Vercel.",
    tools: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    keyTools: ["Next.js", "React", "Tailwind CSS"],
    link: "https://spicy-barbershop.vercel.app/",
    repo: null,
  },
  {
    title: "AI Parking with ML-Agents",
    video: "/Ai_Parking.mp4",
    videoWebm: "/Ai_Parking.webm",
    poster: "/Ai_Parking-poster.webp",
    summary: "Reinforcement-learning agent in Unity that learns to park a car without collisions.",
    description: "An AI-powered Unity project utilizing reinforcement learning with Unity ML-Agents to train a virtual car to master parking skills. The agent learns optimal parking strategies through trial and error, improving its performance over time while avoiding collisions and adhering to realistic driving behavior.",
    tools: ["Unity Engine", "Unity ML-Agents Toolkit", "TensorFlow", "Python", "C#", "ONNX", "PyTorch", "TensorBoard"],
    keyTools: ["Unity ML-Agents Toolkit", "Python", "C#", "PyTorch"],
    link: null,
    repo: `${GITHUB}/AI_Parking`,
  },
  {
    title: "Triple Pendulum Simulation",
    video: "/TripplePendulum.mp4",
    videoWebm: "/TripplePendulum.webm",
    poster: "/TripplePendulum-poster.webp",
    summary: "Chaotic triple-pendulum simulation with custom, research-based physics in Unity and C#.",
    description: "A Unity 3D project simulating a triple pendulum system using custom-built physics in C#. The simulation is based on mathematical models and scientific papers, bypassing Unity's built-in physics. Spheres represent the pendulum masses, and the system demonstrates chaotic behavior with sensitive dependence on initial conditions, leading to unpredictable motion dynamics.",
    tools: ["Unity 3D", "C#", "Research-Driven Mathematical Physics"],
    keyTools: ["Unity 3D", "C#"],
    link: null,
    repo: null,
  },
];

// ─── Tilt hook ─────────────────────────────────────────────────────────────────
function useTilt() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    const y = ((e.clientX - rect.left) / rect.width  - 0.5) *  10;
    setTilt({ x, y });
  }, []);

  const onMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return { ref, tilt, onMouseMove, onMouseLeave };
}

// ─── Shared card shell ─────────────────────────────────────────────────────────
// The whole card is clickable with the mouse; keyboard and screen-reader users
// get a real <button> (the title, see CardBody) whose click bubbles up here.
function CardShell({ tilt, onMouseMove, onMouseLeave, cardRef, children, onClick }) {
  return (
    <motion.div
      ref={cardRef}
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="h-full"
      style={{ cursor: 'pointer' }}
    >
      <div
        className="h-full"
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          className="card-scan group relative rounded-xl p-4 h-full overflow-hidden flex flex-col"
          style={{
            background: 'rgba(13,17,23,0.8)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-active)';
            e.currentTarget.style.boxShadow   = '0 0 28px var(--glow-blue), 0 8px 32px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow   = 'none';
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tech tag ──────────────────────────────────────────────────────────────────
function TechTag({ tool }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-rajdhani)',
        fontSize: '0.7rem',
        letterSpacing: '0.08em',
        padding: '3px 10px',
        border: '1px solid var(--border)',
        background: 'rgba(37,99,235,0.07)',
        color: 'var(--text-secondary)',
        clipPath: 'polygon(6px 0%, calc(100% - 6px) 0%, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0% 50%)',
        display: 'inline-block',
      }}
    >
      {tool}
    </span>
  );
}

// ─── Media badge ───────────────────────────────────────────────────────────────
function MediaBadge({ label }) {
  return (
    <span
      className="absolute bottom-2 left-2"
      style={{
        fontFamily: 'var(--font-rajdhani)',
        fontSize: '0.65rem',
        letterSpacing: '0.12em',
        padding: '3px 8px',
        background: 'rgba(5,7,15,0.85)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        backdropFilter: 'blur(6px)',
      }}
    >
      {label}
    </span>
  );
}

// ─── Play overlay ──────────────────────────────────────────────────────────────
function PlayOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(5,7,15,0.75)',
          border: '1px solid var(--border-active)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <svg className="w-5 h-5 ml-0.5" fill="var(--primary)" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

// ─── Looping preview video (plays only while on-screen) ──────────────────────────
function PreviewVideo({ project, badge }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg"
        poster={project.poster}
        preload="metadata"
        muted
        loop
        playsInline
        autoPlay
      >
        {project.videoWebm && <source src={project.videoWebm} type="video/webm" />}
        <source src={project.video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 rounded-lg" style={{ background: 'rgba(5,7,15,0.18)', transition: 'background 0.2s' }} />
      <MediaBadge label={badge} />
      <PlayOverlay />
    </div>
  );
}

// ─── Card pieces ───────────────────────────────────────────────────────────────
// Icon-only shortcut in the card corner: live site if there is one, else repo.
function CardLink({ project }) {
  const href = project.link || project.repo;
  if (!href) return null;
  const isRepo = !project.link;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isRepo ? `${project.title} source code on GitHub` : `Open ${project.title} live site`}
      onClick={(e) => e.stopPropagation()}
      className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer"
      style={{ background: 'rgba(5,7,15,0.8)', border: '1px solid var(--border-active)', backdropFilter: 'blur(4px)' }}
    >
      {isRepo
        ? <FaGithub className="w-4 h-4" style={{ color: 'var(--primary)' }} aria-hidden="true" />
        : <ArrowTopRightOnSquareIcon className="w-4 h-4" style={{ color: 'var(--primary)' }} aria-hidden="true" />}
    </a>
  );
}

function CardBody({ project }) {
  return (
    <div className="mt-4 flex flex-col gap-3 flex-1">
      <h3 className="text-lg font-orbitron" style={{ color: 'var(--text-primary)' }}>
        <button
          type="button"
          aria-haspopup="dialog"
          className="text-left cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', outlineColor: 'var(--primary)' }}
        >
          {project.title}
        </button>
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#94a3b8', fontFamily: 'var(--font-space)' }}>
        {project.summary}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto pt-1">
        {project.keyTools.map((tool) => <TechTag key={tool} tool={tool} />)}
      </div>
    </div>
  );
}

// ─── Card variants ─────────────────────────────────────────────────────────────
const ProjectVideoCard = memo(function ProjectVideoCard({ project, onClick }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = useTilt();
  return (
    <CardShell tilt={tilt} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} cardRef={ref} onClick={onClick}>
      <CardLink project={project} />
      <PreviewVideo project={project} badge={project.badge || 'DEMO VIDEO'} />
      <CardBody project={project} />
    </CardShell>
  );
});

const ProjectLinkCard = memo(function ProjectLinkCard({ project, onClick }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = useTilt();
  return (
    <CardShell tilt={tilt} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} cardRef={ref} onClick={onClick}>
      <CardLink project={project} />
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image src={project.image} alt={project.title} fill sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw" style={{ objectFit: 'cover' }} className="rounded-lg" />
        <div className="absolute inset-0 rounded-lg" style={{ background: 'rgba(5,7,15,0.1)', transition: 'background 0.2s' }} />
      </div>
      <CardBody project={project} />
    </CardShell>
  );
});

// ─── Modal shell ───────────────────────────────────────────────────────────────
function ModalLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 cursor-pointer"
      style={{
        fontFamily: 'var(--font-rajdhani)',
        fontSize: '0.8rem',
        letterSpacing: '0.14em',
        padding: '8px 18px',
        border: '1px solid var(--border-active)',
        color: 'var(--primary)',
        background: 'rgba(37,99,235,0.08)',
        transition: 'background 0.2s, box-shadow 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.16)'; e.currentTarget.style.boxShadow = '0 0 16px var(--glow-blue)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {children}
    </a>
  );
}

function ModalShell({ project, onClose, children }) {
  const closeRef = useRef(null);
  const titleId = 'project-modal-title';

  // Escape closes; focus moves into the dialog and returns to the card after.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(5,7,15,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden rounded-2xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-active)', boxShadow: '0 0 60px var(--glow-blue)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 pb-0">
          <h2 id={titleId} className="text-lg sm:text-2xl lg:text-3xl font-orbitron" style={{ color: 'var(--primary)' }}>
            {project.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="shrink-0 cursor-pointer"
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}>
            <XMarkIcon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 pt-4">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-start">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              {children}
            </div>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space)' }}>
                {project.description}
              </p>
              <div className="space-y-2">
                <h3 className="text-sm font-orbitron" style={{ color: 'var(--text-secondary)' }}>TECHNOLOGIES USED</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => <TechTag key={tool} tool={tool} />)}
                </div>
              </div>
              {(project.link || project.repo) && (
                <div className="flex flex-wrap gap-3">
                  {project.link && (
                    <ModalLink href={project.link}>
                      VISIT PROJECT <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden="true" />
                    </ModalLink>
                  )}
                  {project.repo && (
                    <ModalLink href={project.repo}>
                      <FaGithub className="w-4 h-4" aria-hidden="true" /> VIEW CODE
                    </ModalLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Modal variants ────────────────────────────────────────────────────────────
function ProjectVideoModal({ project, onClose }) {
  if (!project) return null;
  return (
    <ModalShell project={project} onClose={onClose}>
      <video
        className="w-full h-full object-contain rounded-xl"
        poster={project.poster}
        controls
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        {project.videoWebm && <source src={project.videoWebm} type="video/webm" />}
        <source src={project.video} type="video/mp4" />
      </video>
    </ModalShell>
  );
}

function ProjectImageModal({ project, onClose }) {
  if (!project) return null;
  return (
    <ModalShell project={project} onClose={onClose}>
      <Image src={project.image} alt={project.title} fill sizes="(max-width:768px) 100vw,50vw" style={{ objectFit: 'cover' }} className="rounded-xl" />
    </ModalShell>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section className="relative overflow-hidden py-24" style={{ background: 'var(--background)' }}>
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-3">// 001 &nbsp;&nbsp; SELECTED WORK</p>
          <h2 className="text-4xl md:text-5xl font-orbitron text-gradient">My Projects</h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
            Full-stack SaaS and web platforms built with Next.js, Node.js and Stripe, plus AI and Unity simulation work.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden:  { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => {
            if (project.video) {
              return <ProjectVideoCard key={project.title} project={project} onClick={() => setSelectedProject(project)} />;
            } else {
              return <ProjectLinkCard  key={project.title} project={project} onClick={() => setSelectedProject(project)} />;
            }
          })}
        </motion.div>

        {/* Modals */}
        <AnimatePresence>
          {selectedProject && (
            selectedProject.video ? <ProjectVideoModal project={selectedProject} onClose={closeModal} /> :
                                    <ProjectImageModal project={selectedProject} onClose={closeModal} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
