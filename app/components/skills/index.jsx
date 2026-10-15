'use client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

const loadScene = () => import('./SkillsScene');
const SkillsScene = dynamic(loadScene, { ssr: false });

export default function Skills() {
  // `triggerOnce` + `rootMargin` mounts the scene ~one screen early and keeps it
  // mounted (we never tear down the GL context on scroll-away).
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '700px 0px', triggerOnce: true });

  // Warm the 3D chunk on idle, AFTER the hero has had the network to itself.
  useEffect(() => {
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = ric(() => loadScene());
    return () => cancel(id);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--background)',
      }}
    >
      {/* Section header — CSS transitions only, no Framer Motion on absolute elements */}
      <div
        style={{
          position: 'absolute',
          top: '2.5rem',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          // 003 &nbsp;&nbsp; TECH STACK
        </p>
        <h2 className="text-3xl md:text-4xl font-orbitron text-gradient">
          Skills &amp; Technologies
        </h2>
      </div>

      {/* Solar System canvas — CSS opacity, no Framer Motion */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: inView ? 1 : 0,
          transition: 'opacity 1.2s ease 0.2s',
        }}
      >
        {inView && <SkillsScene />}
      </div>
    </section>
  );
}
