'use client';
import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.error('Service Worker registration failed:', err);
      });
    }

    // Check if the event was already captured by the early script in layout.tsx
    if (typeof window !== 'undefined' && (window as any).deferredPWAEvent) {
      setDeferredPrompt((window as any).deferredPWAEvent);
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPWAEvent = e;
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      (window as any).deferredPWAEvent = null;
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("App installation is not available right now. Please ensure you have placed 'icon.png' in the public folder and are using a supported browser!");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  // Show the banner unless user explicitly dismisses it
  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        exit={{ y: -100, x: "-50%", opacity: 0 }}
        className="fixed top-6 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-xl bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-2xl p-3 md:p-4 flex items-center justify-between gap-2 md:gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#123B6D] text-white flex flex-shrink-0 items-center justify-center font-bold font-[var(--font-heading)]">
            M
          </div>
          <div className="hidden sm:block">
            <h4 className="text-sm font-bold text-[#1E293B]">Install MCC App</h4>
            <p className="text-xs text-[#64748B]">Add to home screen for quick access</p>
          </div>
          <div className="sm:hidden">
            <h4 className="text-sm font-bold text-[#1E293B]">MCC App</h4>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 bg-[#D4A017] text-white text-sm font-bold rounded-xl hover:bg-[#b8891a] transition-all shadow-md shadow-[#D4A017]/20 flex items-center gap-1.5"
          >
            <Download size={16} />
            Install
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
