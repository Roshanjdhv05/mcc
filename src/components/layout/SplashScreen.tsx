'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wiping, setWiping] = useState(false);
  const [holeRadius, setHoleRadius] = useState(0);
  const [contentFaded, setContentFaded] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Progress bar animation
  useEffect(() => {
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Fade out content first, then start circle wipe
        setTimeout(() => {
          setContentFaded(true);
          setTimeout(() => setWiping(true), 250);
        }, 150);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Growing hole animation when wiping starts
  useEffect(() => {
    if (!wiping) return;

    const maxRadius = Math.ceil(
      Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2))
    );
    const duration = 800; // ms
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease in-out quad
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setHoleRadius(eased * maxRadius);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Done — unmount splash
        setTimeout(() => setVisible(false), 50);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [wiping]);

  if (!visible) return null;

  // CSS mask: transparent circle (hole) revealing page behind, black everywhere else
  const maskValue = `radial-gradient(circle at 50% 50%, transparent 0px, transparent ${holeRadius}px, black ${holeRadius}px, black 100%)`;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">

      {/* ── Blue gradient overlay with the growing hole ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #dceefb 0%, #c3ddf5 35%, #a8cce8 65%, #8db8d8 100%)',
          maskImage: wiping ? maskValue : 'none',
          WebkitMaskImage: wiping ? maskValue : 'none',
        }}
      />

      {/* ── Inner glow (on overlay, fades when wiping) ── */}
      {!wiping && (
        <div
          className="absolute pointer-events-none"
          style={{
            width: '70vw',
            height: '70vw',
            maxWidth: '700px',
            maxHeight: '700px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
          }}
        />
      )}

      {/* ── Center content (logo + name + tagline) — fades out before wipe ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={{ opacity: contentFaded ? 0 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center text-center px-8" style={{ gap: '18px' }}>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.2, 0.64, 1] }}
          >
            <img
              src="/mcclogo.jpg"
              alt="MCC Logo"
              className="object-contain"
              style={{ width: '150px', height: '150px' }}
            />
          </motion.div>

          {/* College Name */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="flex flex-col items-center"
            style={{ gap: '2px' }}
          >
            <h1
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(26px, 5vw, 40px)',
                fontWeight: '700',
                color: '#1a2e52',
                lineHeight: '1.15',
                margin: 0,
              }}
            >
              Mulund College
            </h1>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(26px, 5vw, 40px)',
                fontWeight: '700',
                color: '#b8821a',
                lineHeight: '1.15',
                margin: 0,
              }}
            >
              of Commerce
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.18em',
              color: '#2c4a7a',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Autonomous&nbsp;•&nbsp;Est. 1970
          </motion.p>

        </div>
      </motion.div>

      {/* ── Progress bar — pinned at bottom, always above overlay ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: contentFaded ? 0 : 1 }}
        transition={{ delay: 0.65, duration: contentFaded ? 0.2 : 0.4 }}
        className="absolute bottom-16 left-1/2 flex flex-col items-center"
        style={{ transform: 'translateX(-50%)', width: 'clamp(220px, 40vw, 320px)', zIndex: 10 }}
      >
        <div
          style={{
            height: '3px',
            width: '100%',
            borderRadius: '999px',
            backgroundColor: 'rgba(255,255,255,0.45)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #1a2e52 0%, #2c6fad 100%)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
        <p
          style={{
            marginTop: '10px',
            fontSize: '12px',
            color: '#4a6fa5',
            letterSpacing: '0.04em',
            textAlign: 'center',
          }}
        >
          Loading experience...
        </p>
      </motion.div>

    </div>
  );
}
