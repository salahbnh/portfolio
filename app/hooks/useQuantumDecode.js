'use client';
import { useState, useEffect, useRef } from 'react';

const CHARSET = '!@#$%^&*ABCDEFabcdef0123456789░▒▓█';

/**
 * Animates text by cycling each character through random glyphs
 * before resolving to the final character, left-to-right.
 *
 * The initial state is the real text, so the server-rendered HTML (and
 * crawlers / no-JS visitors) always get readable content. The scramble only
 * runs after mount: a wave sweeps left-to-right, each character glitching
 * briefly before settling. When `targetText` changes, characters ahead of the
 * wave keep showing the previous text, so the old string morphs into the new.
 * Users who prefer reduced motion get the final text with no animation.
 *
 * @param {string} targetText  The final string to reveal
 * @param {object} options
 * @param {number} options.startDelay       ms before animation begins (default 300)
 * @param {number} options.charDelay        ms between each char resolving (default 55)
 * @param {number} options.scrambleDuration ms each char scrambles before resolving (default 350)
 */
export function useQuantumDecode(targetText, {
  startDelay = 300,
  charDelay = 55,
  scrambleDuration = 350,
} = {}) {
  const [displayText, setDisplayText] = useState(targetText);
  const displayRef = useRef(targetText);

  useEffect(() => {
    const show = (text) => {
      displayRef.current = text;
      setDisplayText(text);
    };

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      show(targetText);
      return undefined;
    }

    // Text currently on screen when this run starts (the same string on first
    // mount, the previous value when the target changes).
    const fromText = displayRef.current;
    let rafId;
    let startTimestamp = null;

    const outerTimeout = setTimeout(() => {
      const animate = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;

        const result = targetText.split('').map((finalChar, i) => {
          const resolveAt = i * charDelay + scrambleDuration;
          if (elapsed >= resolveAt) return finalChar;
          if (elapsed < i * charDelay) return fromText[i] ?? ' ';
          if (finalChar === ' ') return ' ';
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }).join('');

        const totalDuration = (targetText.length - 1) * charDelay + scrambleDuration;
        if (elapsed < totalDuration) {
          show(result);
          rafId = requestAnimationFrame(animate);
        } else {
          show(targetText);
        }
      };

      rafId = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(outerTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [targetText, startDelay, charDelay, scrambleDuration]);

  return displayText;
}
