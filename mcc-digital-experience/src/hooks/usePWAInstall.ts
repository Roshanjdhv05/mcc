'use client';

import { useState, useEffect } from 'react';

// Extend the Window interface to support the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function usePWAInstall() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Detect if running in standalone (already installed)
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
        || ('standalone' in navigator && (navigator as any).standalone === true);
      setIsStandalone(isStandaloneMode);
    };
    checkStandalone();
    
    // Listen for changes in display mode (e.g. user just installed it)
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkStandalone);

    // 2. Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 3. Listen for Android/Desktop install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. Check localStorage for permanent dismissal
    const dismissed = localStorage.getItem('pwa_install_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', checkStandalone);
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the PWA install prompt');
      } else {
        console.log('User dismissed the PWA install prompt');
      }
      setDeferredPrompt(null);
    }
  };

  const dismissInstall = () => {
    localStorage.setItem('pwa_install_dismissed', 'true');
    setIsDismissed(true);
  };

  return {
    isIOS,
    isStandalone,
    canInstall: !!deferredPrompt,
    isDismissed,
    promptInstall,
    dismissInstall,
  };
}
