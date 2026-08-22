'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LinkItem {
  label: string;
  href?: string;
}

export interface DataItem {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ElementType<any>;
  description?: string;
  links: LinkItem[];
}

export interface CategoryItem {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ElementType<any>;
}

interface Props {
  title: string;
  subtitle: string;
  heroImage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HeroIcon?: React.ElementType<any>;
  heroLabel?: string;
  categories: CategoryItem[];
  data: Record<string, DataItem[]>;
}

/* ─── Card grid ─────────────────────────────────────────────── */
function CardGrid({ items }: { items: DataItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((item, idx) => {
        const firstLink = item.links[0];
        return (
          <Link
            key={idx}
            href={firstLink?.href ?? '#'}
            className="group bg-white border border-[#E8EFF8] rounded-2xl p-4 flex items-center gap-3.5 hover:shadow-md hover:border-[#123B6D]/20 transition-all duration-200"
          >
            {/* Icon circle */}
            <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] flex items-center justify-center shrink-0 group-hover:bg-[#123B6D] transition-colors duration-200">
              <item.icon size={18} className="text-[#123B6D] group-hover:text-white transition-colors duration-200" />
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#1E293B] text-base leading-snug line-clamp-2 group-hover:text-[#123B6D] transition-colors">
                {item.title}
              </p>
              {item.links.length > 0 && (
                <p className="text-sm text-[#D4A017] font-semibold mt-0.5 flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] inline-block" />
                  {firstLink?.label ?? 'View Details'}
                </p>
              )}
            </div>
            <ChevronRight size={14} className="text-gray-300 group-hover:text-[#123B6D] transition-colors shrink-0" />
          </Link>
        );
      })}
    </div>
  );
}

/* ─── Section header ────────────────────────────────────────── */
function SectionHeader({
  cat,
  viewAllHref,
}: {
  cat: CategoryItem;
  viewAllHref?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div className="bg-[#EBF3FF] p-1.5 rounded-lg text-[#123B6D]">
          <cat.icon size={16} />
        </div>
        <h2 className="text-base font-black text-[#123B6D] uppercase tracking-widest">
          {cat.label}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-xs font-semibold text-[#123B6D] hover:text-[#D4A017] transition-colors"
        >
          View All <ChevronRight size={13} />
        </Link>
      )}
    </div>
  );
}

/* ─── Main layout ───────────────────────────────────────────── */
function CornerPageLayoutInner({
  title,
  subtitle,
  categories,
  data,
  HeroIcon,
}: Props) {
  const [activeDesktop, setActiveDesktop] = useState(categories[0].id);
  const [activeMobile, setActiveMobile] = useState<string | null>('__open__');
  const [showSticky, setShowSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  /* Observe which section is in view — only update sidebar highlight, no URL changes */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    categories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { 
          if (entry.isIntersecting) {
            setActiveDesktop(cat.id); 
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  /* Scroll to show sticky bar */
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowSticky(y > 200 && y < lastScrollY);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToCategory = (id: string) => {
    setActiveDesktop(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  /* Mobile dropdown */
  const renderMobileDropdown = (isSticky = false) => (
    <div className={`relative ${isSticky ? '' : 'z-30'}`}>
      <button
        onClick={() => setActiveMobile(activeMobile === '__open__' ? null : '__open__')}
        className={`w-full flex items-center justify-between bg-[#123B6D] text-white px-5 py-3.5 font-bold text-xs tracking-widest uppercase ${isSticky ? 'shadow-md' : 'rounded-t-xl'}`}
      >
        <span>CATEGORIES</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${activeMobile === '__open__' ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {activeMobile === '__open__' && (
          <motion.div
            key="cat-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className={`overflow-hidden absolute w-full bg-white border border-[#E2E8F0] shadow-xl ${
              isSticky ? 'border-t-0 rounded-b-xl' : 'border-t-0 rounded-b-xl'
            } z-50`}
          >
            <div className="flex flex-col divide-y divide-[#E2E8F0]">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveMobile(null);
                    setTimeout(() => {
                      const el = document.getElementById(`mob-${cat.id}`) || document.getElementById(cat.id);
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 140;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }, 300);
                  }}
                  className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-[#EBF3FF] hover:text-[#123B6D] transition-colors text-left"
                >
                  <cat.icon size={16} className="shrink-0 text-[#123B6D]" />
                  <span className="flex-1">{cat.label}</span>
                  <ChevronRight size={14} className="text-gray-300" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-[#F4F7FB] min-h-screen font-sans">

      {/* ── Compact header bar ─────────────────────────────── */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-8 md:py-10 flex flex-col items-center text-center gap-2">
          {HeroIcon && (
            <div className="w-14 h-14 rounded-xl bg-[#EBF3FF] flex items-center justify-center mb-2">
              <HeroIcon size={28} className="text-[#123B6D]" />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-black text-[#123B6D] tracking-tight">
            {title}
          </h1>
          <div className="w-12 h-1 bg-[#D4A017] rounded-full" />
          <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed mt-1">{subtitle}</p>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-8 pb-24">

        {/* Mobile sticky nav */}
        <AnimatePresence>
          {showSticky && (
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-16 left-0 w-full z-40 px-4 lg:hidden"
            >
              {renderMobileDropdown(true)}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MOBILE layout ──────────────────────────────────── */}
        <div className="lg:hidden mb-8">
          {renderMobileDropdown(false)}
          <div className="mt-6 space-y-10">
            {categories.map((cat) => (
              <div key={cat.id} id={`mob-${cat.id}`} className="scroll-mt-28">
                <SectionHeader cat={cat} />
                <CardGrid items={data[cat.id] ?? []} />
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP layout: Sidebar + Content ──────────────── */}
        <div className="hidden lg:flex gap-7" ref={contentRef}>

          {/* Sidebar */}
          <div className="w-[220px] shrink-0 sticky top-24 self-start h-fit">
            <div className="bg-[#123B6D] text-white rounded-t-xl py-3 text-center font-bold text-[11px] tracking-widest uppercase">
              CATEGORIES
            </div>
            <div className="bg-white rounded-b-xl border border-t-0 border-[#E2E8F0] shadow-sm flex flex-col overflow-hidden">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 text-sm font-semibold transition-all duration-150 text-left border-b border-[#F1F5F9] last:border-b-0 ${
                    activeDesktop === cat.id
                      ? 'bg-[#EBF3FF] text-[#123B6D]'
                      : 'text-gray-600 hover:bg-[#F8FAFC] hover:text-[#123B6D]'
                  }`}
                >
                  <cat.icon size={18} className="shrink-0" />
                  <span className="flex-1 text-sm">{cat.label}</span>
                  <ChevronRight size={14} className={`shrink-0 transition-opacity ${activeDesktop === cat.id ? 'opacity-100 text-[#123B6D]' : 'opacity-30'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Content sections */}
          <div className="flex-1 space-y-10 pb-16 min-w-0">
            {categories.map((cat) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-28">
                {/* Divider line */}
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-px flex-1 bg-[#E2E8F0]" />
                </div>
                <SectionHeader cat={cat} />
                <CardGrid items={data[cat.id] ?? []} />
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CornerPageLayout(props: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
      <CornerPageLayoutInner {...props} />
    </Suspense>
  );
}
