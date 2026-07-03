'use client';

import React, { useState, useEffect } from 'react';
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
  heroImage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HeroIcon: React.ElementType<any>;
  heroLabel: string;
  categories: CategoryItem[];
  data: Record<string, DataItem[]>;
}

function CardGrid({ items }: { items: DataItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow relative group"
        >
          <div className="flex items-start gap-4">
            <div className="bg-[#EBF3FF] p-3 rounded-full text-[#123B6D] shrink-0">
              <item.icon size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1E293B] text-sm leading-snug">{item.title}</h3>
              {item.description && (
                <p className="text-xs text-gray-500 mt-1 leading-tight">{item.description}</p>
              )}
              {item.links.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {item.links.map((link, lidx) => (
                    <li
                      key={lidx}
                      className="text-xs font-semibold text-gray-600 hover:text-[#123B6D] cursor-pointer flex items-center gap-1.5 before:content-['•'] before:text-[#D4A017] before:mr-0.5"
                    >
                      {link.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <Link
            href="#"
            className="absolute bottom-4 right-4 text-[#123B6D] bg-[#EBF3FF] p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={14} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function CornerPageLayout({
  title,
  subtitle,
  heroImage,
  HeroIcon,
  heroLabel,
  categories,
  data,
}: Props) {
  const [activeDesktop, setActiveDesktop] = useState(categories[0].id);
  const [activeMobile, setActiveMobile] = useState<string | null>('__open__');
  const [showSticky, setShowSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // 400 is roughly past the hero section
      if (currentScrollY > 400) {
        if (currentScrollY < lastScrollY) {
          setShowSticky(true); // scrolling up
        } else {
          setShowSticky(false); // scrolling down
        }
      } else {
        setShowSticky(false); // at top
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToCategory = (id: string) => {
    setActiveDesktop(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderMobileDropdown = (isSticky = false) => (
    <div className={`relative ${isSticky ? '' : 'z-30'}`}>
      <button
        onClick={() => setActiveMobile(activeMobile === '__open__' ? null : '__open__')}
        className={`w-full flex items-center justify-between bg-[#123B6D] text-white px-5 py-4 font-bold text-sm tracking-widest uppercase ${isSticky ? 'shadow-md' : 'rounded-t-2xl'}`}
      >
        <span>CATEGORIES</span>
        <ChevronDown
          size={20}
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`overflow-hidden absolute w-full bg-white border border-[#E2E8F0] shadow-xl ${isSticky ? 'border-t-0 rounded-b-xl' : 'border-t-0 rounded-b-2xl'} z-50`}
          >
            <div className="flex flex-col divide-y divide-[#E2E8F0] max-h-[60vh] overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveMobile(null);
                    setTimeout(() => {
                      const el = document.getElementById(`mob-${cat.id}`);
                      if (el) {
                        // Custom offset calculation for scrolling
                        const y = el.getBoundingClientRect().top + window.scrollY - 140; // 80(navbar) + 60(sticky bar)
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }, 300);
                  }}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-[#EBF3FF] hover:text-[#123B6D] transition-colors text-left"
                >
                  <cat.icon size={17} className="shrink-0 text-[#123B6D]" />
                  <span className="flex-1">{cat.label}</span>
                  <ChevronRight size={15} className="text-gray-300" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const toggleMobile = (id: string) => {
    setActiveMobile((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#F4F8FF] to-white pb-8 md:pb-24 relative overflow-hidden">
        <div
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-[#EBF3FF] rounded-full blur-3xl opacity-60 -z-10 transform -rotate-12"
        />
        <div
          className="absolute top-[10%] right-[-5%] w-[40%] h-[120%] bg-[#E8F0FE] rounded-[100px] blur-3xl opacity-60 -z-10 transform rotate-45"
        />
        <div
          className="absolute top-12 left-12 w-32 h-32 opacity-20"
          style={{ backgroundImage: 'radial-gradient(#123B6D 2px, transparent 2px)', backgroundSize: '16px 16px' }}
        />
        <div
          className="absolute bottom-12 right-12 w-48 h-32 opacity-20"
          style={{ backgroundImage: 'radial-gradient(#123B6D 2px, transparent 2px)', backgroundSize: '16px 16px' }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-12 pt-24 md:pt-32 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-[54px] font-bold text-[#123B6D] leading-tight mb-4 font-[var(--font-heading)]">
              {title}
            </h1>
            <div className="w-16 h-1 bg-[#D4A017] mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed">{subtitle}</p>
          </div>

          {/* Desktop Hero Image */}
          <div className="hidden md:flex relative w-full justify-end items-center h-[380px]">
            <div className="relative w-[340px] h-[340px] lg:w-[380px] lg:h-[380px] ml-auto">
              <div
                className="absolute inset-[-15px] bg-[#D4A017] -z-10 transition-transform duration-700 hover:scale-105"
                style={{ borderRadius: '35% 65% 55% 45% / 45% 45% 65% 65%' }}
              />
              <div
                className="absolute inset-0 bg-[#123B6D] overflow-hidden"
                style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
              >
                <img
                  src={heroImage}
                  alt={title}
                  className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute top-[20%] -left-8 bg-white rounded-full p-4 shadow-2xl flex flex-col items-center justify-center w-[100px] h-[100px] border-4 border-[#F8FAFC]">
                <HeroIcon size={34} className="text-[#123B6D]" />
                <span className="text-[#1E293B] font-extrabold text-[10px] text-center leading-tight mt-1">
                  {heroLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 pb-24 relative">

        {/* ── MOBILE: Categories dropdown bar + full content ── */}
        <div className="lg:hidden mb-8">
          
          {/* Fixed Sticky Categories Bar (Only shows on scroll up) */}
          <AnimatePresence>
            {showSticky && (
              <motion.div
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-20 left-0 w-full z-40 px-4"
              >
                {renderMobileDropdown(true)}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Normal In-Flow Categories Bar */}
          {renderMobileDropdown(false)}

          {/* Full content sections - always visible */}
          <div className="mt-6 space-y-10">
            {categories.map((cat) => (
              <div key={cat.id} id={`mob-${cat.id}`} className="scroll-mt-28">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200">
                  <div className="bg-[#EBF3FF] p-2 rounded-lg text-[#123B6D]">
                    <cat.icon size={18} />
                  </div>
                  <h2 className="text-base font-bold text-[#123B6D] uppercase">{cat.label}</h2>
                </div>
                <CardGrid items={data[cat.id] ?? []} />
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: Sidebar + scrollable content ── */}
        <div className="hidden lg:flex gap-8">
          {/* Sidebar */}
          <div className="w-[260px] shrink-0 sticky top-24 self-start z-20">
            <div className="bg-[#123B6D] text-white rounded-t-xl py-4 text-center font-bold text-sm tracking-widest uppercase">
              CATEGORIES
            </div>
            <div className="bg-white rounded-b-xl border border-t-0 border-[#E2E8F0] shadow-sm flex flex-col p-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors text-left ${
                    activeDesktop === cat.id
                      ? 'bg-[#EBF3FF] text-[#123B6D]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <cat.icon size={18} />
                  <span className="flex-1">{cat.label}</span>
                  <ChevronRight size={16} className="opacity-40 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-12 pb-24">
            {categories.map((cat) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200">
                  <div className="bg-[#EBF3FF] p-2 rounded-lg text-[#123B6D]">
                    <cat.icon size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-[#123B6D] uppercase">{cat.label}</h2>
                </div>
                <CardGrid items={data[cat.id] ?? []} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
