'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const libraryNavLinks = [
  { label: 'HOME', href: '/library' },
  { label: 'ABOUT US', href: '/library/about-us' },
  { label: 'WEB OPAC', href: '#' },
  { label: 'E-RESOURCES', href: '/library/e-resources' },
  { label: 'STAFF PROFILE', href: '/library/staff-profile' },
  { label: 'DOWNLOAD', href: '#' },
  { label: 'RESEARCH - KIT', href: '/library/research-kit' },
  { label: 'I. R.', href: 'https://drive.google.com/drive/folders/1bes4sOXN9ePGCVSgdTQ2ZtPg-pYQWyju?usp=drive_link' },
  { label: 'IMPORTANT LINKS', href: '/library/important-links' },
  { label: 'FEEDBACK', href: '#' },
  { label: 'CONTACT US', href: '/library/contact-us' },
];

export default function LibraryNav() {
  const pathname = usePathname();
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const interactTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleInteraction = () => {
    setIsInteracting(true);
    if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
    interactTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isInteracting) return;

    let animationFrameId: number;

    const scrollStep = () => {
      if (window.innerWidth < 768 && scrollRef.current) {
        const el = scrollRef.current;
        if (el.style.scrollBehavior !== 'auto') el.style.scrollBehavior = 'auto';
        el.scrollLeft += 1;
        // The array is mapped twice. Total scrollWidth = 2 * halfWidth.
        if (el.scrollLeft >= (el.scrollWidth) / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  return (
    <div className={`bg-[#014d4e] w-full shadow-md z-50 sticky transition-all duration-300 ${navVisible ? 'top-16 md:top-[160px] lg:top-[190px] xl:top-[200px]' : 'top-0'}`}>
      {/* Desktop nav - normal overflow-x-auto */}
      <div className="hidden md:flex justify-center max-w-[1600px] mx-auto px-4 lg:px-8 overflow-x-auto no-scrollbar items-center h-12">
        {libraryNavLinks.map((item, i) => {
          const isActive = pathname === item.href || (item.href !== '#' && pathname?.startsWith(item.href || ''));
          return (
            <Link
              key={i}
              href={item.href || '#'}
              className={`flex-shrink-0 h-full flex items-center px-4 lg:px-5 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider ${
                isActive
                  ? 'bg-[#008e59] text-white'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Auto-Slider */}
      <div 
        ref={scrollRef}
        onTouchStart={handleInteraction}
        onMouseDown={handleInteraction}
        onWheel={handleInteraction}
        className="md:hidden flex overflow-x-auto no-scrollbar items-center h-12 w-full"
        style={{ scrollBehavior: 'auto' }}
      >
        {[...libraryNavLinks, ...libraryNavLinks].map((item, i) => {
          const isActive = pathname === item.href || (item.href !== '#' && pathname?.startsWith(item.href || ''));
          return (
            <Link
              key={i}
              href={item.href || '#'}
              className={`flex-shrink-0 h-full flex items-center px-5 text-[11px] font-bold transition-colors uppercase whitespace-nowrap tracking-wider border-r border-white/10 ${
                isActive
                  ? 'bg-[#008e59] text-white'
                  : 'text-white/90 active:text-white active:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
