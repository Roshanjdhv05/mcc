'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function IOSInstallGuide() {
  const { isIOS, isStandalone, isDismissed, dismissInstall } = usePWAInstall();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if it's iOS, not in standalone (Safari browser), and not dismissed
    if (isIOS && !isStandalone && !isDismissed) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isIOS, isStandalone, isDismissed]);

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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 pb-8 md:pb-6"
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full" />
            
            <button
              onClick={() => {
                setShow(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-4 mb-6 mt-2">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                <img src="/mcclogo.png" alt="MCC Logo" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">Install MCC App</h2>
                <p className="text-sm text-slate-500">Get the native iOS experience</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="text-sm text-slate-700 font-medium pt-1">
                    Tap the <span className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 rounded mx-1 text-blue-500"><Share size={14} /></span> <b>Share</b> button at the bottom of your screen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="text-sm text-slate-700 font-medium pt-1">
                    Scroll down and tap <span className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 rounded mx-1 text-slate-700"><PlusSquare size={14} /></span> <b>Add to Home Screen</b>.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="text-sm text-slate-700 font-medium pt-1">
                    Tap <b>Add</b> in the top right corner.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShow(false);
                dismissInstall();
              }}
              className="w-full py-3.5 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Don't show this again
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
