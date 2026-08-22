'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const jrCollegeNavLinks = [
  { label: 'HOME', href: '/junior-college-corner' },
  { label: 'TEACHING STAFF', href: '/jr-college/teaching-staff' },
  { label: 'RESULT ANALYSIS', href: '/jr-college/result-analysis' },
  { label: 'SMAF / SCHOLARSHIP', href: '/jr-college/scholarships' },
  { label: 'NOTICE', href: '/jr-college/notice' },
];

export default function JrCollegeNav() {
  const pathname = usePathname();
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  const pausedOffset = useRef(0);

  const resumeAutoScroll = useCallback(() => { setIsAutoScrolling(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const cy = window.scrollY;
      if (cy > lastScrollY && cy > 200) setNavVisible(false);
      else if (cy < lastScrollY) setNavVisible(true);
      setLastScrollY(cy);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const pauseAutoScroll = useCallback(() => {
    if (tickerRef.current) {
      const style = window.getComputedStyle(tickerRef.current);
      const matrix = new DOMMatrixReadOnly(style.transform);
      pausedOffset.current = matrix.m41;
    }
    setIsAutoScrolling(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => resumeAutoScroll(), 5000);
  }, [resumeAutoScroll]);

  useEffect(() => () => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoScroll(); isDragging.current = true; touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !tickerRef.current) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    tickerRef.current.style.transform = `translateX(${pausedOffset.current + delta}px)`;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    isDragging.current = false;
    pausedOffset.current += e.changedTouches[0].clientX - touchStartX.current;
    scheduleResume();
  };

  return (
    <div className={`bg-[#014d4e] w-full shadow-md z-40 sticky transition-all duration-300 ${navVisible ? 'top-16 md:top-[160px] lg:top-[190px] xl:top-[200px]' : 'top-0'}`}>
      <div className="hidden md:flex justify-center max-w-[1600px] mx-auto px-4 lg:px-8 overflow-x-auto no-scrollbar items-center h-12">
        {jrCollegeNavLinks.map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <Link key={i} href={item.href || '#'}
              className={`flex-shrink-0 h-full flex items-center px-4 lg:px-5 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider ${isActive ? 'bg-[#008e59] text-white' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="flex md:hidden w-full overflow-hidden h-12 items-center"
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div ref={tickerRef} className="flex items-center h-full whitespace-nowrap"
          style={{ animation: isAutoScrolling ? 'libraryNavTicker 18s linear infinite' : 'none', willChange: 'transform' }}>
          {[...jrCollegeNavLinks, ...jrCollegeNavLinks, ...jrCollegeNavLinks].map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link key={i} href={item.href || '#'}
                className={`flex-shrink-0 h-full flex items-center px-5 text-[11px] font-bold transition-colors uppercase whitespace-nowrap tracking-wider border-r border-white/10 ${isActive ? 'bg-[#008e59] text-white' : 'text-white/90 active:text-white active:bg-white/10'}`}
                onClick={(e) => { if (isDragging.current) e.preventDefault(); }}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
