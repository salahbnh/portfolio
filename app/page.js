import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/hero/index';
import Footer from './components/footer';
import dynamic from 'next/dynamic';
import SkillsClient from './components/SkillsClient';

const Spinner = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: 24, height: 24,
      border: '2px solid var(--primary)',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  </div>
);

const Projects       = dynamic(() => import('./components/Project'),                  { loading: () => <Spinner /> });
const Experience     = dynamic(() => import('./components/experience'),               { loading: () => <Spinner /> });
const ServicesSection = dynamic(() => import('./components/services'),                { loading: () => <Spinner /> });
const ContactSection  = dynamic(() => import('./components/contact/ContactSection'),  { loading: () => <Spinner /> });

export default function Home() {
  return (
    <main>
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="skills">
        <SkillsClient />
      </section>
      <section id="services">
        <ServicesSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </main>
  );
}
