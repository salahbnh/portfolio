// One-time build artifact generator for the social preview image and favicon.
// Renders with Next's bundled @vercel/og (satori + resvg) using the site fonts,
// fetched from Google Fonts at run time. Re-run with
// `node scripts/generate-og-image.mjs` whenever the name/title/colors change.
//
//   - public/og.png   1200×630 Open Graph / Twitter card
//   - app/icon.png    256×256 "SB" monogram favicon (picked up by Next)

import { createElement as h } from 'react';
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFile } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Site palette (app/globals.css)
const C = {
  background: '#05070f',
  surface: '#0d1117',
  primary: '#2563eb',
  primaryLight: '#3b82f6',
  accent: '#7c3aed',
  textPrimary: '#e0f2fe',
  textSecondary: '#7dd3fc',
  muted: '#94a3b8',
  green: '#4ade80',
};

// An old UA makes the Google Fonts CSS API return plain TTF URLs.
async function loadFont(family, weight) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}`,
    { headers: { 'User-Agent': 'Mozilla/4.0' } },
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\)/)?.[1];
  if (!url) throw new Error(`Could not resolve font ${family} ${weight}`);
  return { name: family, weight, style: 'normal', data: await fetch(url).then((r) => r.arrayBuffer()) };
}

// Flat-sided hexagon in px (satori resolves % clip-path coordinates oddly).
const hex = (w, h) => `polygon(${w / 4}px 0px, ${(w * 3) / 4}px 0px, ${w}px ${h / 2}px, ${(w * 3) / 4}px ${h}px, ${w / 4}px ${h}px, 0px ${h / 2}px)`;

function OgImage() {
  const tag = (label) => h('div', {
    key: label,
    style: {
      display: 'flex',
      padding: '8px 22px',
      border: `1px solid rgba(37,99,235,0.45)`,
      background: 'rgba(37,99,235,0.10)',
      color: C.textSecondary,
      fontFamily: 'Rajdhani',
      fontSize: 26,
      letterSpacing: 2,
      borderRadius: 6,
    },
  }, label);

  return h('div', {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 90px',
      background: `radial-gradient(ellipse 80% 70% at 30% 40%, #0b1a3d 0%, ${C.background} 70%)`,
      position: 'relative',
    },
  },
    // Gradient rail across the top
    h('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})` } }),
    // Monogram hex in the corner
    h('div', {
      style: {
        position: 'absolute', top: 70, right: 90, width: 120, height: 104, display: 'flex',
        alignItems: 'center', justifyContent: 'center', clipPath: hex(120, 104),
        background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
        fontFamily: 'Orbitron', fontSize: 44, color: C.textPrimary,
      },
    }, 'SB'),
    // Availability pill
    h('div', {
      style: {
        display: 'flex', alignItems: 'center', alignSelf: 'flex-start', gap: 12, padding: '8px 22px',
        borderRadius: 999, border: '1px solid rgba(74,222,128,0.35)', background: 'rgba(74,222,128,0.08)',
        color: C.green, fontFamily: 'Rajdhani', fontSize: 26, letterSpacing: 4,
      },
    },
      h('div', { style: { width: 12, height: 12, borderRadius: 999, background: C.green } }),
      'OPEN TO REMOTE ROLES',
    ),
    h('div', {
      style: { display: 'flex', marginTop: 34, fontFamily: 'Orbitron', fontSize: 80, color: C.textPrimary, letterSpacing: 1 },
    }, 'Salah Bounouh'),
    h('div', {
      style: {
        display: 'flex', marginTop: 14, fontFamily: 'Orbitron', fontSize: 40,
        backgroundImage: `linear-gradient(90deg, ${C.primaryLight}, ${C.accent})`,
        backgroundClip: 'text', color: 'transparent',
      },
    }, 'Full-Stack Software Engineer'),
    h('div', {
      style: { display: 'flex', marginTop: 22, fontFamily: 'Space Grotesk', fontSize: 28, color: C.muted },
    }, 'Node.js / TypeScript · Java / Spring Boot · Next.js'),
    h('div', { style: { display: 'flex', gap: 16, marginTop: 40 } },
      ['Tunisia · UTC+1', 'EU & US hours', 'salahbounouh.com'].map(tag)),
  );
}

function Icon() {
  return h('div', {
    style: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' },
  },
    h('div', {
      style: {
        position: 'absolute', left: 0, top: 17, width: 256, height: 222, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: hex(256, 222),
        background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
        fontFamily: 'Orbitron', fontSize: 104, color: C.textPrimary, letterSpacing: -2,
      },
    }, 'SB'),
  );
}

async function render(element, width, height, fonts, outPath) {
  const res = new ImageResponse(element, { width, height, fonts });
  await writeFile(outPath, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${outPath}`);
}

async function run() {
  const fonts = await Promise.all([
    loadFont('Orbitron', 800),
    loadFont('Rajdhani', 600),
    loadFont('Space Grotesk', 400),
  ]);
  await render(OgImage(), 1200, 630, fonts, join(ROOT, 'public', 'og.png'));
  await render(Icon(), 256, 256, fonts.slice(0, 1), join(ROOT, 'app', 'icon.png'));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
