'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function InstallFloatingButton() {
  const { isStandalone, canInstall, isDismissed, promptInstall } = usePWAInstall();
  const [bounce, setBounce] = useState(false);

  // Periodic bounce animation to draw attention
  useEffect(() => {
    if (canInstall && !isStandalone && !isDismissed) {
      const interval = setInterval(() => {
        setBounce(true);
        setTimeout(() => setBounce(false), 1000);
      }, 15000); // Bounce every 15 seconds
      
      return () => clearInterval(interval);
    }
  }, [canInstall, isStandalone, isDismissed]);

  // Don't show if installed, permanently dismissed, or cannot install (e.g. iOS where we use a bottom sheet instead, or Safari desktop)
  // Actually on iOS `canInstall` is false, so this button will only show on Android/Desktop Chrome where `canInstall` is true.
  if (!canInstall || isStandalone || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: bounce ? [0, -15, 0, -8, 0] : 0 
        }}
        transition={{ 
          y: { duration: 0.8, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 260, damping: 20 }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={promptInstall}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#123B6D] text-white rounded-full shadow-lg shadow-blue-900/30 flex items-center justify-center group"
        aria-label="Install App"
      >
        <Download size={24} className="group-hover:-translate-y-1 transition-transform" />
        
        {/* Tooltip on hover (desktop only) */}
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap hidden md:block">
          Install App
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
        </span>
      </motion.button>
    </AnimatePresence>
  );
}
