'use client';
import { motion } from 'framer-motion';
import {
  ServerStackIcon,
  GlobeAmericasIcon,
  ServerIcon,
  CommandLineIcon,
  SparklesIcon ,
  CubeIcon,
} from '@heroicons/react/24/outline';

const services = [
  { title: 'Backend Development',  desc: 'Architecting reliable server-side applications with Node.js, TypeScript, and Spring Boot, with a focus on scalable APIs and clean architecture.',                                                     Icon: ServerStackIcon  },
  { title: 'Frontend Engineering', desc: 'Building responsive web applications with React, Next.js, Angular, animations, and interactive 3D experiences with Three.js.',                                                 Icon: GlobeAmericasIcon },
  { title: 'Game Development',     desc: 'Creating 3D game environments and gameplay systems using Unity, C#, physics, and AI-driven game mechanics.',                                                            Icon: CubeIcon          },
  { title: 'API Architecture',     desc: 'Designing secure REST APIs with JWT authentication, validation, caching, background processing, and third-party integrations.',                                                         Icon: ServerIcon        },
  { title: 'AI & Machine Learning', desc: 'Integrating AI into real-world applications using Hugging Face, FLAN-T5, LoRA/PEFT, and generative AI APIs.',                                                     Icon: SparklesIcon    },
  { title: 'DevOps & Cloud', desc: 'Containerizing applications with Docker and automating build, test, and deployment workflows through CI/CD pipelines.',                                                  Icon: CommandLineIcon   },
];

function ServiceCard({ service, index }) {
  const { title, desc, Icon } = service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.09, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="card-scan relative rounded-xl p-6 overflow-hidden group cursor-default"
        style={{
          background: 'rgba(13,17,23,0.78)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          height: '100%',
          transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-active)';
          e.currentTarget.style.boxShadow   = '0 0 28px var(--glow-blue)';
          e.currentTarget.style.transform   = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow   = 'none';
          e.currentTarget.style.transform   = 'translateY(0)';
        }}
      >
        {/* Hex icon container */}
        <div
          className="hex-clip mb-5 flex items-center justify-center"
          style={{
            width: 52,
            height: 52,
            background: 'linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.18))',
            border: '1px solid rgba(37,99,235,0.28)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(30deg)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(0deg)'; }}
        >
          <Icon
            className="w-6 h-6 transition-colors duration-200"
            style={{ color: 'var(--primary)' }}
          />
        </div>

        <h3
          className="text-lg font-orbitron mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space)' }}
        >
          {desc}
        </p>

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
          style={{
            background: 'linear-gradient(225deg, rgba(37,99,235,0.07) 0%, transparent 60%)',
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{ background: 'var(--background)' }}
    >
      {/* Hex grid bg */}
      <div className="absolute inset-0 hex-bg pointer-events-none" style={{ opacity: 0.25 }} />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-3">// 004 &nbsp;&nbsp; WHAT I DO</p>
          <h2 className="text-4xl md:text-5xl font-orbitron text-gradient">Technical Services</h2>
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
            Transforming complex requirements into elegant technical solutions
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
