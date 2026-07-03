'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Zap, WifiOff, Smartphone } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function InstallPrompt() {
  const { isStandalone, canInstall, isDismissed, promptInstall, dismissInstall } = usePWAInstall();
  const [show, setShow] = useState(false);

  // Show the prompt if we can install, it's not dismissed, and not already standalone
  useEffect(() => {
    if (canInstall && !isDismissed && !isStandalone) {
      // Small delay for better UX (don't show immediately on load)
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [canInstall, isDismissed, isStandalone]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={() => setShow(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-0 left-0 right-0 z-[101] md:bottom-auto md:top-1/2 md:left-1/2 md:right-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl shadow-2xl p-6"
          >
            <button
              onClick={() => {
                setShow(false);
                dismissInstall();
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center mb-5 overflow-hidden">
                <img src="/mcclogo.jpg" alt="MCC Logo" className="w-16 h-16 object-contain" />
              </div>
              
              <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-2">Install MCC App</h2>
              <p className="text-sm text-slate-500 mb-6 max-w-sm">
                Get the full native experience. Install our app on your device for faster access.
              </p>

              <div className="w-full bg-slate-50 rounded-2xl p-4 mb-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Zap size={16} />
                  </div>
                  Faster Launch & Navigation
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <WifiOff size={16} />
                  </div>
                  Offline Access to Content
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Smartphone size={16} />
                  </div>
                  Native App Experience
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={() => {
                    setShow(false);
                    dismissInstall();
                  }}
                  className="flex-1 py-3.5 px-4 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    promptInstall();
                    setShow(false);
                  }}
                  className="flex-1 py-3.5 px-4 rounded-xl font-bold text-white bg-[#123B6D] hover:bg-[#0d2a4f] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                >
                  <Download size={18} />
                  Install Now
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
