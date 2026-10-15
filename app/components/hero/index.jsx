'use client';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StarField from './StarField';
import Magnetic from './Magnetic';
import { useQuantumDecode } from '../../hooks/useQuantumDecode';

const TAGS = ['Web Development', 'Software Architecture', 'REST APIs'];
const ROLES = [
  'Full-Stack Software Engineer',
  'Node.js · Spring Boot · Next.js',
];

function HexTag({ label }) {
  return (
    <span
      className="relative inline-block px-5 py-1.5 text-sm cursor-default select-none"
      style={{ fontFamily: 'var(--font-rajdhani)', letterSpacing: '0.1em', transition: 'transform 0.2s ease', display: 'inline-block' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <span
        className="absolute inset-0"
        style={{
          border: '1px solid rgba(37,99,235,0.35)',
          clipPath: 'polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)',
          background: 'rgba(37,99,235,0.06)',
          transition: 'border-color 0.2s, background 0.2s',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </span>
  );
}

// Subtitle that re-scrambles into a new role every few seconds.
function RotatingSubtitle() {
  const [i, setI] = useState(0);
  const text = useQuantumDecode(ROLES[i], {
    startDelay: i === 0 ? 600 : 0,
    charDelay: 28,
    scrambleDuration: 200,
  });

  useEffect(() => {
    const t = setTimeout(() => setI((p) => (p + 1) % ROLES.length), i === 0 ? 4400 : 2900);
    return () => clearTimeout(t);
  }, [i]);

  return <>{text}</>;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const headingDecoded = useQuantumDecode("Hello, I'm Salah Bounouh", { startDelay: 200, charDelay: 55, scrambleDuration: 320 });

  // Pointer/scroll/tilt parallax → drives CSS vars the layers read via calc().
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const target = { px: 0, py: 0, mx: el.clientWidth / 2, my: el.clientHeight * 0.4 };

    const apply = () => {
      el.style.setProperty('--px', String(target.px));
      el.style.setProperty('--py', String(target.py));
      el.style.setProperty('--mx', `${target.mx}px`);
      el.style.setProperty('--my', `${target.my}px`);
      raf = 0;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      target.mx = e.clientX - r.left;
      target.my = e.clientY - r.top;
      schedule();
    };
    const onTilt = (ev) => {
      if (ev.gamma == null) return;
      target.px = Math.max(-1, Math.min(1, ev.gamma / 30));
      target.py = Math.max(-1, Math.min(1, (ev.beta - 45) / 30));
      schedule();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('deviceorientation', onTilt, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('deviceorientation', onTilt);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen relative overflow-hidden"
      style={{ '--px': 0, '--py': 0, '--mx': '50%', '--my': '40%' }}
    >
      {/* Hex grid layer — parallaxes opposite the cursor (deep background) */}
      <div
        className="absolute inset-0 hex-bg pointer-events-none"
        style={{
          zIndex: 0,
          transform: 'translate3d(calc(var(--px) * -10px), calc(var(--py) * -10px), 0) scale(1.06)',
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* Canvas 2D starfield (handles its own internal parallax) */}
      <StarField />

      {/* Ambient radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(5,15,40,0.82) 0%, rgba(5,7,15,0.65) 55%, transparent 100%)',
          transform: 'translate3d(calc(var(--px) * -6px), calc(var(--py) * -6px), 0)',
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(420px circle at var(--mx) var(--my), rgba(59,130,246,0.10), transparent 70%)',
        }}
      />

      {/* Content */}
      <div
        className="relative h-full flex items-center justify-center text-center px-4"
        style={{ zIndex: 2 }}
      >
        <div
          className="max-w-4xl mx-auto mt-16 space-y-6"
          style={{
            transform: 'translate3d(calc(var(--px) * 12px), calc(var(--py) * 12px), 0)',
            transition: 'transform 0.2s ease-out',
          }}
        >

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="flex justify-center"
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-rajdhani)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#4ade80',
                background: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.25)',
                borderRadius: '999px',
                padding: '4px 14px',
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                animation: 'neon-pulse-green 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              OPEN TO REMOTE ROLES · UTC+1
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="eyebrow"
          >
            // 000 &nbsp;&nbsp; WELCOME
          </motion.p>

          {/* Main heading — quantum decoded, with a one-time sheen sweep */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl leading-tight"
            style={{
              fontFamily: 'var(--font-orbitron)',
              color: 'var(--text-primary)',
              minHeight: '3.5rem',
              fontWeight: 700,
            }}
          >
            <span className="hero-sheen" style={{ display: 'inline-block' }}>
              {headingDecoded}
            </span>
          </h1>

          {/* Subtitle — decodes, then rotates through roles */}
          <p
            className="text-xl md:text-2xl text-gradient"
            style={{
              fontFamily: 'var(--font-orbitron)',
              minHeight: '2rem',
              fontWeight: 600,
            }}
          >
            <RotatingSubtitle />
          </p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space)' }}
          >
            Computer Science Engineer with hands-on experience building backend and full-stack applications using Node.js/TypeScript and Java/Spring Boot.
            Experienced with REST APIs, Docker, CI/CD and AI integration, with internship experience delivering business software and recruitment automation.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {TAGS.map((tag) => <HexTag key={tag} label={tag} />)}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="relative inline-block px-10 py-4 cursor-pointer"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.18em',
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.14), rgba(124,58,237,0.14))',
                  border: '1px solid rgba(37,99,235,0.4)',
                  clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0% 50%)',
                  color: 'var(--text-primary)',
                  transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37,99,235,0.28), rgba(124,58,237,0.28))';
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.7)';
                  e.currentTarget.style.boxShadow = '0 0 28px rgba(37,99,235,0.3), 0 0 60px rgba(124,58,237,0.15)';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37,99,235,0.14), rgba(124,58,237,0.14))';
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              >
                SEE MY WORK
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="/SalahBounouh_CV.pdf"
                download
                className="relative inline-block px-10 py-4 cursor-pointer"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.18em',
                  textDecoration: 'none',
                  background: 'transparent',
                  border: '1px solid rgba(37,99,235,0.3)',
                  clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0% 50%)',
                  color: 'var(--text-secondary)',
                  transition: 'border-color 0.25s, color 0.25s, box-shadow 0.25s, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.6)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.boxShadow = '0 0 18px rgba(37,99,235,0.2)';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              >
                DOWNLOAD CV
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 2 }}
      >
        <span className="eyebrow" style={{ fontSize: '0.65rem' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, var(--primary), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
