'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'HOME',       href: '#home' },
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'SKILLS',     href: '#skills' },
  { label: 'SERVICES',   href: '#services' },
  { label: 'CONTACT',    href: '#contact' },
];

function NavLink({ label, href, active }) {
  return (
    <a
      href={href}
      className="relative group cursor-pointer"
      style={{
        fontFamily: 'var(--font-rajdhani)',
        fontSize: '0.9rem',
        fontWeight: 600,
        letterSpacing: '0.18em',
        color: active ? 'var(--primary)' : '#cbd5e1',
        transition: 'color 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#cbd5e1'; }}
    >
      {label}
      {/* Hover sweep underline */}
      <span
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          height: '1px',
          width: '0%',
          background: 'linear-gradient(to right, var(--primary), var(--accent))',
          transition: 'width 0.25s ease',
        }}
        className="group-hover:!w-full"
      />
      {active && (
        <motion.span
          layoutId="nav-active-bar"
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(to right, var(--primary), var(--accent))',
          }}
        />
      )}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen]           = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        // A thin band across the middle of the viewport: works for sections
        // taller than the screen, where a ratio threshold would never be hit.
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,7,15,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(37,99,235,0.1)' : '1px solid transparent',
        transition: 'background 0.35s, backdrop-filter 0.35s, border-color 0.35s',
      }}
    >
      {/* Brand */}
      <a href="#home" style={{ textDecoration: 'none', cursor: 'pointer' }}>
        <span
          style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: '1.15rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.5))',
          }}
        >
          SB
        </span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-5 lg:gap-8">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.href}
            {...link}
            active={activeSection === link.href.slice(1)}
          />
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden cursor-pointer"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle navigation menu"
        style={{ background: 'none', border: 'none', padding: '8px' }}
      >
        <div style={{ width: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[
            menuOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none',
            null,
            menuOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none',
          ].map((transform, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                height: '1px',
                background: (menuOpen && i !== 1) ? 'var(--primary)' : 'var(--text-muted)',
                transform: transform || 'none',
                opacity: i === 1 && menuOpen ? 0 : 1,
                transition: 'transform 0.25s, opacity 0.2s, background 0.2s',
              }}
            />
          ))}
        </div>
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              background: 'rgba(5,7,15,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(37,99,235,0.12)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-rajdhani)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: activeSection === link.href.slice(1) ? 'var(--primary)' : '#cbd5e1',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
