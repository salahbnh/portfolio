'use client';
import { CATEGORIES } from './skillsData';

// Static, dependency-free rendering of the tech stack. Shown when WebGL is
// unavailable or the 3D scene takes too long. Uses plain <img> on the tiny
// icon PNGs so it never relies on the image optimizer or the Three.js bundle.
export default function StaticSkillsFallback({ note }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '8.5rem 1.5rem 2rem',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center', maxWidth: '960px' }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.label} style={{ minWidth: '180px' }}>
            <p
              className="eyebrow"
              style={{ marginBottom: '1rem', textAlign: 'center', color: 'var(--primary)' }}
            >
              {cat.label}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  title={skill.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                    width: '64px',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    width={40}
                    height={40}
                    loading="lazy"
                    style={{ objectFit: 'contain', height: 40, width: 40 }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-rajdhani)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}
                  >
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {note && (
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.7, textAlign: 'center' }}>
          {note}
        </p>
      )}
    </div>
  );
}
