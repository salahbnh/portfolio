'use client';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { BriefcaseIcon, AcademicCapIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { EXPERIENCE, EDUCATION } from '../../data/experience';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

// ─── Small building blocks ─────────────────────────────────────────────────────
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

function Meta({ children }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-rajdhani)',
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
      }}
    >
      {children}
    </p>
  );
}

function Highlights({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm leading-relaxed"
          style={{ color: '#94a3b8', fontFamily: 'var(--font-space)' }}
        >
          <span
            aria-hidden="true"
            className="hex-clip shrink-0"
            style={{ width: 7, height: 7, marginTop: '0.55rem', background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Panel({ children, highlighted = false, className = '' }) {
  return (
    <div
      className={`card-scan relative rounded-xl overflow-hidden ${className}`}
      style={{
        background: 'rgba(13,17,23,0.78)',
        border: `1px solid ${highlighted ? 'var(--border-active)' : 'var(--border)'}`,
        boxShadow: highlighted ? '0 0 32px rgba(37,99,235,0.12)' : 'none',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-active)';
        e.currentTarget.style.boxShadow = '0 0 28px var(--glow-blue)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = highlighted ? 'var(--border-active)' : 'var(--border)';
        e.currentTarget.style.boxShadow = highlighted ? '0 0 32px rgba(37,99,235,0.12)' : 'none';
      }}
    >
      {children}
    </div>
  );
}

// Hex node that sits on the timeline rail.
function TimelineNode({ active }) {
  return (
    <span
      aria-hidden="true"
      className="hex-clip absolute"
      style={{
        left: 'calc(-1.75rem - 6.5px)',
        top: '1.6rem',
        width: 14,
        height: 14,
        background: active ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'var(--surface-elevated)',
        boxShadow: active ? '0 0 12px var(--glow-blue)' : 'none',
        outline: active ? 'none' : '1px solid var(--border-active)',
      }}
    />
  );
}

// ─── Freelance sub-project ─────────────────────────────────────────────────────
function SubProject({ project }) {
  return (
    <div
      className="rounded-lg p-4 sm:p-5 space-y-3 h-full flex flex-col"
      style={{ background: 'rgba(5,7,15,0.55)', border: '1px solid var(--border)' }}
    >
      <div>
        <h4 className="text-base font-orbitron" style={{ color: 'var(--text-primary)' }}>{project.name}</h4>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-space)' }}>
          {project.summary}
        </p>
      </div>
      <Highlights items={project.highlights} />
      <div className="flex flex-wrap gap-2 pt-1">
        {project.tools.map((tool) => <TechTag key={tool} tool={tool} />)}
      </div>
      <div className="mt-auto pt-2 flex flex-wrap gap-x-6 gap-y-2">
        {project.links?.length ? (
          project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 cursor-pointer"
            style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--primary-light)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--primary-light)'; }}
          >
            <FaGithub aria-hidden="true" /> {link.label}
          </a>
          ))
        ) : project.note ? (
          <span
            className="inline-flex items-center gap-2"
            style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}
          >
            <LockClosedIcon className="w-4 h-4" aria-hidden="true" /> {project.note}
          </span>
        ) : null}
      </div>
    </div>
  );
}

// ─── Role cards ────────────────────────────────────────────────────────────────
function RoleHeader({ job }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
      <div>
        <h3 className="text-lg md:text-xl font-orbitron" style={{ color: 'var(--text-primary)' }}>{job.role}</h3>
        <Meta>{job.company} · {job.location}</Meta>
      </div>
      <span
        className="shrink-0 self-start"
        style={{
          fontFamily: 'var(--font-rajdhani)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          padding: '3px 12px',
          borderRadius: '999px',
          color: job.current ? '#4ade80' : 'var(--text-secondary)',
          background: job.current ? 'rgba(74,222,128,0.08)' : 'rgba(37,99,235,0.07)',
          border: `1px solid ${job.current ? 'rgba(74,222,128,0.25)' : 'var(--border)'}`,
        }}
      >
        {job.period.toUpperCase()}
      </span>
    </div>
  );
}

function FeaturedRole({ job }) {
  return (
    <Panel highlighted className="p-5 sm:p-7 space-y-5">
      <RoleHeader job={job} />
      <div className="grid lg:grid-cols-2 gap-4">
        {job.projects.map((project) => <SubProject key={project.name} project={project} />)}
      </div>
    </Panel>
  );
}

function Role({ job }) {
  return (
    <Panel className="p-5 sm:p-6 space-y-4">
      <RoleHeader job={job} />
      <Highlights items={job.highlights} />
      <div className="flex flex-wrap gap-2">
        {job.tools.map((tool) => <TechTag key={tool} tool={tool} />)}
      </div>
    </Panel>
  );
}

function SubHeading({ Icon, children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="hex-clip flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          background: 'linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.18))',
          border: '1px solid rgba(37,99,235,0.28)',
        }}
      >
        <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} aria-hidden="true" />
      </span>
      <h3 className="text-xl md:text-2xl font-orbitron" style={{ color: 'var(--text-primary)' }}>{children}</h3>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section className="relative overflow-hidden py-24" style={{ background: 'var(--background)' }}>
      {/* Blue ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          right: '10%',
          width: '26rem',
          height: '26rem',
          background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-3">// 002 &nbsp;&nbsp; CAREER</p>
          <h2 className="text-4xl md:text-5xl font-orbitron text-gradient">Experience &amp; Education</h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
            Remote freelance work on production business platforms, plus three engineering internships in Tunis.
          </p>
        </motion.div>

        {/* Experience timeline */}
        <SubHeading Icon={BriefcaseIcon}>Experience</SubHeading>
        <ol
          className="relative space-y-6 ml-4 sm:ml-6"
          style={{ paddingLeft: '1.75rem' }}
        >
          {/* Gradient rail */}
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0"
            style={{ left: 0, width: 1, background: 'linear-gradient(to bottom, var(--primary), var(--accent), transparent)' }}
          />
          {EXPERIENCE.map((job, i) => (
            <motion.li
              key={`${job.company}-${job.period}`}
              {...reveal}
              transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.06 }}
              className="relative"
            >
              <TimelineNode active={job.current} />
              {job.projects ? <FeaturedRole job={job} /> : <Role job={job} />}
            </motion.li>
          ))}
        </ol>

        {/* Education */}
        <div className="mt-16">
          <SubHeading Icon={AcademicCapIcon}>Education</SubHeading>
          {EDUCATION.map((edu) => (
            <motion.div key={edu.degree} {...reveal} transition={{ duration: 0.5 }}>
              <Panel className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="text-lg md:text-xl font-orbitron" style={{ color: 'var(--text-primary)' }}>{edu.degree}</h4>
                    <Meta>{edu.school} · {edu.location}</Meta>
                    <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space)' }}>{edu.detail}</p>
                  </div>
                  <span
                    className="shrink-0 self-start"
                    style={{
                      fontFamily: 'var(--font-rajdhani)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      padding: '3px 12px',
                      borderRadius: '999px',
                      color: 'var(--text-secondary)',
                      background: 'rgba(37,99,235,0.07)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {edu.period}
                  </span>
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
