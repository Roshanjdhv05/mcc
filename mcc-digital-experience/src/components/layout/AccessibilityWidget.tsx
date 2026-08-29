'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Accessibility, 
  X, 
  Contrast, 
  Link as LinkIcon, 
  Palette, 
  Image as ImageIcon, 
  MousePointer2, 
  Type, 
  Minus, 
  Plus, 
  RotateCcw,
  AlignJustify,
  MoveVertical,
  Activity,
  Keyboard,
  Volume2,
  VolumeX,
  Settings2
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'mcc_a11y_prefs';

type A11ySettings = {
  highContrast: boolean;
  highlightLinks: boolean;
  invertColors: boolean;
  grayscale: boolean;
  fontSize: number; 
  textSpacing: boolean;
  lineHeight: boolean;
  hideImages: boolean;
  bigCursor: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
  keyboardNav: boolean;
  voiceOver: boolean;
  speechSpeed: number;
  speechVoice: string;
};

const defaultSettings: A11ySettings = {
  highContrast: false, highlightLinks: false, invertColors: false, grayscale: false,
  fontSize: 0, textSpacing: false, lineHeight: false, hideImages: false,
  bigCursor: false, underlineLinks: false, reduceMotion: false, keyboardNav: false,
  voiceOver: false, speechSpeed: 1, speechVoice: ''
};

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Load from local storage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (e) {
        console.error('Failed to parse accessibility settings', e);
      }
    }
  }, []);

  // Fetch Speech Voices
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  // Voice Over Logic (Hover / Touch to Speech)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Stop speech immediately when disabled or route changes
    if (!settings.voiceOver) {
      window.speechSynthesis.cancel();
      document.querySelectorAll('.voice-over-active').forEach(el => el.classList.remove('voice-over-active'));
      return;
    }

    let hoverTimer: NodeJS.Timeout | null = null;
    let currentTarget: HTMLElement | null = null;

    const speak = (el: HTMLElement) => {
      // Validate element has meaningful text and is not structural
      const text = el.innerText?.trim() || el.textContent?.trim();
      const ignoreTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH', 'IFRAME', 'IMG'];
      
      if (!text || ignoreTags.includes(el.tagName) || el.getAttribute('aria-hidden') === 'true') {
        return;
      }

      // Avoid reading the entire page body/main/header wrapper at once
      if (['BODY', 'MAIN', 'HEADER', 'FOOTER', 'SECTION', 'UL'].includes(el.tagName)) {
         return;
      }

      // Stop previous
      window.speechSynthesis.cancel();
      document.querySelectorAll('.voice-over-active').forEach(e => e.classList.remove('voice-over-active'));

      // Highlight active element
      el.classList.add('voice-over-active');
      currentTarget = el;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = settings.speechSpeed;
      if (settings.speechVoice) {
        const selectedVoice = voices.find(v => v.name === settings.speechVoice);
        if (selectedVoice) utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        el.classList.remove('voice-over-active');
        if (currentTarget === el) currentTarget = null;
      };

      utterance.onerror = () => {
        el.classList.remove('voice-over-active');
      };

      window.speechSynthesis.speak(utterance);
    };

    const handleMouseEnter = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      // Start 400ms delay timer
      hoverTimer = setTimeout(() => {
        speak(target);
      }, 400);
    };

    const handleMouseLeave = (e: MouseEvent | TouchEvent) => {
      if (hoverTimer) clearTimeout(hoverTimer);
      // We don't cancel speech immediately on mouse leave to let them listen, 
      // but if they hover something else, it will cancel then.
    };

    document.body.addEventListener('mouseover', handleMouseEnter);
    document.body.addEventListener('mouseout', handleMouseLeave);
    document.body.addEventListener('touchstart', handleMouseEnter, { passive: true });

    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      document.body.removeEventListener('mouseover', handleMouseEnter);
      document.body.removeEventListener('mouseout', handleMouseLeave);
      document.body.removeEventListener('touchstart', handleMouseEnter);
      window.speechSynthesis.cancel();
      document.querySelectorAll('.voice-over-active').forEach(e => e.classList.remove('voice-over-active'));
    };
  }, [settings.voiceOver, settings.speechSpeed, settings.speechVoice, voices]);

  // Cancel speech on page navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
       window.speechSynthesis.cancel();
    }
  }, [pathname]);

  // Apply visual settings via dynamic style tag
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    const styleId = 'a11y-styles';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    let css = `
      .voice-over-active {
        outline: 3px dashed #F59E0B !important;
        outline-offset: 2px !important;
        background-color: rgba(245, 158, 11, 0.1) !important;
        border-radius: 4px !important;
        box-shadow: 0 0 0 4px rgba(255,255,255,0.7) !important;
      }
    `;

    if (settings.highContrast) {
      css += `* { background-color: #000 !important; color: #fff !important; border-color: #fff !important; }`;
    }
    if (settings.highlightLinks) {
      css += `a, a * { background-color: #ff0 !important; color: #000 !important; font-weight: bold !important; text-decoration: underline !important; }`;
    }
    if (settings.invertColors) {
      css += `html { filter: invert(100%) hue-rotate(180deg) !important; } img, video { filter: invert(100%) hue-rotate(180deg) !important; }`;
    }
    if (settings.grayscale) {
      css += `html { filter: grayscale(100%) !important; }`;
    }
    if (settings.textSpacing) {
      css += `* { letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }`;
    }
    if (settings.lineHeight) {
      css += `* { line-height: 1.5 !important; }`;
    }
    if (settings.hideImages) {
      css += `img, video, iframe, svg { visibility: hidden !important; }`;
    }
    if (settings.bigCursor) {
      css += `* { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="black" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 3 10.42 21 13.9 14 21 14 3 3"/></svg>'), auto !important; }`;
    }
    if (settings.underlineLinks) {
      css += `a { text-decoration: underline !important; }`;
    }
    if (settings.reduceMotion) {
      css += `* { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }`;
    }
    if (settings.keyboardNav) {
      css += `*:focus, *:focus-visible { outline: 3px solid #123B6D !important; outline-offset: 2px !important; }`;
    }
    if (settings.fontSize !== 0) {
      const scale = 1 + (settings.fontSize * 0.1);
      css += `html { font-size: calc(16px * ${scale}) !important; }`;
    }

    styleEl.innerHTML = css;
    document.documentElement.classList.toggle('a11y-keyboard-nav', settings.keyboardNav);
  }, [settings, mounted]);

  // Handlers
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleSetting = (key: keyof A11ySettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof A11ySettings] }));
  };

  const setSetting = (key: keyof A11ySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const adjustFontSize = (delta: number) => {
    setSettings(prev => ({ ...prev, fontSize: Math.max(-2, Math.min(5, prev.fontSize + delta)) }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility Tools"
        title="Accessibility Tools"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200 text-sm font-semibold
          ${open
            ? 'bg-[#123B6D] text-white border-[#123B6D] shadow-md'
            : 'bg-white/80 text-[#123B6D] border-[#CBD5E1] hover:bg-[#123B6D]/10 hover:border-[#123B6D]/40'
          }`}
      >
        <Accessibility size={15} strokeWidth={2} />
        <span className="hidden sm:inline max-w-[100px] truncate">Accessibility</span>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden z-[9999] origin-top-right flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#123B6D] to-[#1a4d8f] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-white">
                <Accessibility size={16} />
                <span className="text-[13px] font-bold tracking-wide">
                  Accessibility Tools
                </span>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Content area - scrollable */}
            <div className="overflow-y-auto p-4 space-y-5">
              
              {/* Voice Over Section */}
              <section className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {settings.voiceOver ? <Volume2 size={18} className="text-[#123B6D]" /> : <VolumeX size={18} className="text-slate-400" />}
                    <div>
                      <h3 className="text-xs font-bold text-[#1E293B]">Voice Over (Beta)</h3>
                      <p className="text-[10px] text-slate-500">Hover or tap text to read aloud</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleSetting('voiceOver')}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${settings.voiceOver ? 'bg-[#123B6D]' : 'bg-slate-300'}`}
                  >
                    <span className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.voiceOver ? 'translate-x-2' : '-translate-x-2'}`} />
                  </button>
                </div>

                <AnimatePresence>
                  {settings.voiceOver && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-slate-200 pt-3 space-y-3"
                    >
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1.5"><Settings2 size={12}/> Speech Speed</label>
                        <select 
                          value={settings.speechSpeed} 
                          onChange={(e) => setSetting('speechSpeed', parseFloat(e.target.value))}
                          className="w-full text-xs p-1.5 border border-slate-200 rounded-md bg-white outline-none focus:border-[#123B6D]"
                        >
                          <option value={0.5}>0.5x Slow</option>
                          <option value={0.75}>0.75x</option>
                          <option value={1}>1x Normal</option>
                          <option value={1.25}>1.25x</option>
                          <option value={1.5}>1.5x Fast</option>
                          <option value={2}>2x Very Fast</option>
                        </select>
                      </div>
                      
                      {voices.length > 0 && (
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1.5"><Volume2 size={12}/> Voice</label>
                          <select 
                            value={settings.speechVoice} 
                            onChange={(e) => setSetting('speechVoice', e.target.value)}
                            className="w-full text-xs p-1.5 border border-slate-200 rounded-md bg-white outline-none focus:border-[#123B6D]"
                          >
                            <option value="">Default Browser Voice</option>
                            {voices.slice(0, 15).map(v => (
                              <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* Color Contrast */}
              <section>
                <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">Color & Contrast</h3>
                <div className="grid grid-cols-2 gap-2">
                  <SettingToggle icon={<Contrast size={16} />} label="High Contrast" active={settings.highContrast} onClick={() => toggleSetting('highContrast')} />
                  <SettingToggle icon={<LinkIcon size={16} />} label="Highlight Links" active={settings.highlightLinks} onClick={() => toggleSetting('highlightLinks')} />
                  <SettingToggle icon={<Palette size={16} />} label="Invert Colors" active={settings.invertColors} onClick={() => toggleSetting('invertColors')} />
                  <SettingToggle icon={<Palette size={16} className="opacity-50" />} label="Grayscale" active={settings.grayscale} onClick={() => toggleSetting('grayscale')} />
                </div>
              </section>

              {/* Text Adjustments */}
              <section>
                <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">Text Adjustments</h3>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-2 mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-[#1E293B]">
                    <Type size={16} className="text-[#64748B]" />
                    <span className="font-medium">Font Size</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
                    <button onClick={() => adjustFontSize(-1)} disabled={settings.fontSize <= -2} className="p-1.5 text-slate-500 hover:text-[#123B6D] hover:bg-slate-50 rounded-md transition-colors disabled:opacity-50"><Minus size={14} /></button>
                    <span className="text-xs font-bold w-6 text-center text-[#1E293B]">{settings.fontSize === 0 ? '0' : settings.fontSize > 0 ? `+${settings.fontSize}` : settings.fontSize}</span>
                    <button onClick={() => adjustFontSize(1)} disabled={settings.fontSize >= 5} className="p-1.5 text-slate-500 hover:text-[#123B6D] hover:bg-slate-50 rounded-md transition-colors disabled:opacity-50"><Plus size={14} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <SettingToggle icon={<AlignJustify size={16} />} label="Text Spacing" active={settings.textSpacing} onClick={() => toggleSetting('textSpacing')} />
                  <SettingToggle icon={<MoveVertical size={16} />} label="Line Height" active={settings.lineHeight} onClick={() => toggleSetting('lineHeight')} />
                </div>
              </section>

              {/* Other Controls */}
              <section>
                <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">Other Controls</h3>
                <div className="grid grid-cols-2 gap-2">
                  <SettingToggle icon={<ImageIcon size={16} />} label="Hide Images" active={settings.hideImages} onClick={() => toggleSetting('hideImages')} />
                  <SettingToggle icon={<MousePointer2 size={16} />} label="Big Cursor" active={settings.bigCursor} onClick={() => toggleSetting('bigCursor')} />
                  <SettingToggle icon={<LinkIcon size={16} className="underline" />} label="Underline Links" active={settings.underlineLinks} onClick={() => toggleSetting('underlineLinks')} />
                  <SettingToggle icon={<Activity size={16} />} label="Reduce Motion" active={settings.reduceMotion} onClick={() => toggleSetting('reduceMotion')} />
                  <SettingToggle icon={<Keyboard size={16} />} label="Keyboard Nav" active={settings.keyboardNav} onClick={() => toggleSetting('keyboardNav')} title="Enhances focus outlines for keyboard navigation" />
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[#F1F5F9] bg-slate-50 shrink-0">
              <button
                onClick={resetSettings}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#CBD5E1] rounded-xl text-sm font-semibold text-[#475569] hover:bg-slate-100 hover:text-[#1E293B] transition-colors"
              >
                <RotateCcw size={14} />
                Reset All Settings
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingToggle({ icon, label, active, onClick, title }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void; title?: string; }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 text-center gap-1.5
        ${active 
          ? 'bg-[#EBF3FF] border-[#123B6D] text-[#123B6D] shadow-sm ring-1 ring-[#123B6D]/20' 
          : 'bg-white border-slate-200 text-[#475569] hover:bg-slate-50 hover:border-slate-300'
        }`}
      aria-pressed={active}
    >
      <div className={active ? 'text-[#123B6D]' : 'text-[#64748B]'}>{icon}</div>
      <span className="text-[11px] font-semibold leading-tight">{label}</span>
    </button>
  );
}
