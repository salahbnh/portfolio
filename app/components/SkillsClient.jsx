'use client';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { STACK } from './skills/skillsData';

// Only import Three.js bundle when the skills section scrolls into view
const Skills = dynamic(() => import('./skills'), { ssr: false });

// Short caption under the heading so the #skills anchor reads meaningfully
// before (or without) the 3D scene.
const HEADLINE_STACK = ['TypeScript', 'Node.js', 'Java / Spring Boot', 'React / Next.js', 'PostgreSQL', 'Docker'];

export default function SkillsClient() {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,   // once loaded, stays loaded
    rootMargin: '200px', // start loading 200px before reaching the section
  });

  return (
    <div style={{ background: 'var(--background)' }}>
      <div ref={ref} style={{ position: 'relative', height: '100vh' }}>
        {/* Section header — server-rendered, floats over the 3D scene */}
        <div
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: 0,
            right: 0,
            padding: '0 1.5rem',
            textAlign: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            // 003 &nbsp;&nbsp; TECH STACK
          </p>
          <h2 className="text-3xl md:text-4xl font-orbitron text-gradient">
            Skills &amp; Technologies
          </h2>
          <p
            style={{
              marginTop: '0.6rem',
              fontFamily: 'var(--font-rajdhani)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'var(--text-secondary)',
              opacity: 0.85,
            }}
          >
            {HEADLINE_STACK.join(' · ')}
          </p>
        </div>

        {inView && <Skills />}
      </div>

      {/* Full stack as plain text: readable by visitors, crawlers and no-JS. */}
      <div className="container mx-auto px-6 max-w-6xl" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
        <div
          className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 rounded-xl p-6"
          style={{ background: 'rgba(13,17,23,0.6)', border: '1px solid var(--border)' }}
        >
          {STACK.map((group) => (
            <div key={group.label}>
              <h3 className="eyebrow" style={{ color: 'var(--primary-light)', marginBottom: '0.4rem' }}>
                {group.label}
              </h3>
              <ul className="flex flex-wrap" style={{ gap: '0.15rem 0.75rem' }}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: 'var(--font-rajdhani)',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      color: '#94a3b8',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
