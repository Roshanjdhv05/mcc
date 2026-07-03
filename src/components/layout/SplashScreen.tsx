'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar over 2.2 s
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        // Brief pause at 100 % then hide
        setTimeout(() => setVisible(false), 300);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#0b2848' }}
        >
          {/* Animated background blobs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(77,168,218,0.18) 0%, transparent 70%)',
              top: '-150px',
              right: '-150px',
            }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212,160,23,0.15) 0%, transparent 70%)',
              bottom: '-120px',
              left: '-100px',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 1 }}
          />

          {/* Centre content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center">

            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              {/* Outer ring pulse */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#D4A017]/40"
                animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
              />
              {/* Second ring pulse with delay */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#4DA8DA]/30"
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut', delay: 0.6 }}
              />
              {/* Logo container – no clipping */}
              <div className="flex items-center justify-center drop-shadow-2xl">
                <img
                  src="/mcclogo.jpg"
                  alt="MCC Logo"
                  className="w-40 h-40 object-contain"
                />
              </div>
            </motion.div>

            {/* College name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1
                className="text-3xl md:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.01em' }}
              >
                Mulund College
                <br />
                <span style={{ color: '#D4A017' }}>of Commerce</span>
              </h1>
              <p className="mt-2 text-sm text-white/50 tracking-widest uppercase">
                Autonomous · Est. 1964
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="w-64 md:w-80"
            >
              <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #4DA8DA, #D4A017)',
                    boxShadow: '0 0 12px rgba(212,160,23,0.6)',
                  }}
                />
              </div>
              <p className="mt-3 text-xs text-white/30 text-center tracking-widest">
                Loading experience…
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
