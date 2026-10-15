'use client';

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Services',   href: '#services' },
  { label: 'Contact',    href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        padding: '1.75rem 0',
        background: '#030507',
      }}
    >
      {/* Gradient divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, var(--primary), var(--accent), transparent)',
        }}
      />

      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
        className="md:flex-row md:justify-between"
      >
        {/* Brand */}
        <span
          style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: '1rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          SB
        </span>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-rajdhani)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                textDecoration: 'none',
                transition: 'color 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p
          style={{
            fontFamily: 'var(--font-rajdhani)',
            fontSize: '0.78rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: '#94a3b8',
          }}
        >
          © {new Date().getFullYear()} SALAH BOUNOUH
        </p>
      </div>
    </footer>
  );
}
