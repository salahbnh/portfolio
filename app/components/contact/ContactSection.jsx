'use client';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';
import Socials from './Socials';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const CONTACT_EMAIL = 'bounhsalah@gmail.com';

export default function ContactSection() {
  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{ background: 'var(--background)' }}
    >
      {/* Violet ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          left: '20%',
          width: '28rem',
          height: '28rem',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
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
          <p className="eyebrow mb-3">// 004 &nbsp;&nbsp; GET IN TOUCH</p>
          <h2 className="text-4xl md:text-5xl font-orbitron text-gradient">Contact</h2>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left — CTA + socials */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3
              className="text-2xl md:text-3xl font-orbitron leading-snug"
              style={{ color: 'var(--text-primary)' }}
            >
              Let's Build Something{' '}
              <span className="text-gradient">Great</span>
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space)' }}>
              Whether it's a production web app, a 3D interactive experience, or an architecture consultation — I'm ready to collaborate.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space)' }}>
              Based in Tunisia (UTC+1) · open to remote roles · comfortable with EU and US hours.
            </p>

            {/* Direct email */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-3 cursor-pointer"
              style={{
                fontFamily: 'var(--font-rajdhani)',
                fontSize: '1.05rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <FaEnvelope aria-hidden="true" style={{ color: 'var(--primary)' }} />
              {CONTACT_EMAIL}
            </a>

            {/* Animated signal wave */}
            <svg width="130" height="32" viewBox="0 0 130 32" fill="none" style={{ opacity: 0.45 }}>
              <defs>
                <linearGradient id="wave-grad" x1="0" y1="0" x2="130" y2="0">
                  <stop offset="0%"   stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0 16 Q10 4 20 16 Q30 28 40 16 Q50 4 60 16 Q70 28 80 16 Q90 4 100 16 Q110 28 120 16 Q125 10 130 16"
                stroke="url(#wave-grad)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="240"
                animate={{ strokeDashoffset: [240, 0, -240] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              />
            </svg>

            {/* Social links */}
            <div className="flex gap-4">
              <Socials icon={<FaGithub />}   label="GitHub"   href="https://github.com/salahbnh" />
              <Socials icon={<FaLinkedin />} label="LinkedIn" href="https://www.linkedin.com/in/salah-bounouh-1426ba27b/" />
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
