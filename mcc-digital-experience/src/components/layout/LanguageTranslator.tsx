'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Languages, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
];

const STORAGE_KEY = 'mcc_lang_pref';

function triggerGoogleTranslate(langCode: string) {
  if (langCode === 'en') {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
  } else {
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
  }

  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
    return;
  }

  window.location.reload();
}

export default function LanguageTranslator() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('en');
  const [mounted, setMounted] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) || 'en';
    setActiveLang(saved);
    document.documentElement.lang = saved;

    if (!document.getElementById('google_translate_element')) {
      const el = document.createElement('div');
      el.id = 'google_translate_element';
      el.style.display = 'none';
      document.body.appendChild(el);
    }

    (window as any).googleTranslateElementInit = function () {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,mr,hi,gu,ta,te,kn,ml,bn',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }

    if (saved && saved !== 'en') {
      const poll = setInterval(() => {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
          clearInterval(poll);
          select.value = saved;
          select.dispatchEvent(new Event('change'));
        }
      }, 500);
      setTimeout(() => clearInterval(poll), 8000);
    }
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (code: string) => {
    setActiveLang(code);
    localStorage.setItem(STORAGE_KEY, code);
    document.documentElement.lang = code;
    setOpen(false);
    triggerGoogleTranslate(code);
  };

  const currentLang = LANGUAGES.find((l) => l.code === activeLang) ?? LANGUAGES[0];

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Select language"
        title="Select language"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200 text-sm font-semibold
          ${open
            ? 'bg-[#123B6D] text-white border-[#123B6D] shadow-md'
            : 'bg-white/80 text-[#123B6D] border-[#CBD5E1] hover:bg-[#123B6D]/10 hover:border-[#123B6D]/40'
          }`}
      >
        <Languages size={15} strokeWidth={2} />
        <span className="hidden sm:inline max-w-[80px] truncate">{currentLang.native}</span>
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden z-[9999] origin-top-right"
          >
            <div className="px-4 py-2.5 bg-gradient-to-r from-[#123B6D] to-[#1a4d8f] flex items-center gap-2">
              <Languages size={13} className="text-white/80" />
              <span className="text-white text-[11px] font-bold tracking-wide uppercase">
                Select Language
              </span>
            </div>
            <div className="py-1.5 max-h-72 overflow-y-auto">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors duration-150
                    ${activeLang === lang.code
                      ? 'bg-[#EBF3FF] text-[#123B6D]'
                      : 'text-[#1E293B] hover:bg-slate-50'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-semibold leading-tight">{lang.native}</span>
                      <span className="text-[10px] text-[#64748B] leading-tight">{lang.label}</span>
                    </div>
                  </div>
                  {activeLang === lang.code && (
                    <Check size={13} className="text-[#123B6D] shrink-0" strokeWidth={2.5} />
                  )}
                </button>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-[#F1F5F9] bg-slate-50">
              <p className="text-[9px] text-[#94A3B8] text-center leading-tight">
                Powered by Google Translate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}