'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export const iqacNav = [
  { label: 'HOME', href: '/iqac' },
  { label: 'ABOUT THE IQAC', href: '/iqac/information-and-policies?tab=about' },
  { label: 'QUALITY POLICY', href: '/iqac/information-and-policies?tab=quality-policy' },
  { label: 'MEMBERS (YEAR WISE)', href: '/iqac/information-and-policies?tab=members' },
  { label: 'MINUTES OF THE MEETING', href: '/iqac/information-and-policies?tab=minutes' },
  { label: 'BEST PRACTICES', href: '/iqac/information-and-policies?tab=best-practices' },
  { label: 'INSTITUTIONAL DISTINCTIVENESS', href: '/iqac/information-and-policies?tab=distinctiveness' },
  { label: 'ANNUAL REPORTS', href: '/iqac/reports-and-initiatives?tab=annual-reports' },
  { label: 'ACADEMIC CALENDAR', href: '/iqac/reports-and-initiatives?tab=academic-calendar' },
  { label: 'TILAK SMRUTI VYAKHYAN', href: '/about/tilak-lecture' },
  { label: 'BAPAT MEMORIAL LECTURE', href: '/about/bg-bapat-lecture' },
  { label: 'DEEKSHARAMBH', href: '/iqac/reports-and-initiatives?tab=deeksharambh' },
  { label: 'DISABILITY SENSITISATION', href: '/iqac/reports-and-initiatives?tab=disability' },
  { label: 'ENVIRONMENTAL COMMITMENTS', href: '/iqac/reports-and-initiatives?tab=environment' },
];

export default function IQACNav() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeHref, setActiveHref] = useState('/iqac');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 200) setNavVisible(false);
      else if (y < lastScrollY) setNavVisible(true);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const updateActiveNav = () => {
      const currentPath = window.location.pathname;
      const currentHash = window.location.hash;
      setActiveHref(`${currentPath}${currentHash}`);
    };
    
    updateActiveNav();
    window.addEventListener('hashchange', updateActiveNav);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', updateActiveNav);
    };
  }, [lastScrollY]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    
    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      if (scrollContainerRef.current && !isPaused) {
        scrollContainerRef.current.scrollLeft += (30 * delta) / 1000;
        if (scrollContainerRef.current.scrollLeft >= scrollContainerRef.current.scrollWidth / 2) {
          scrollContainerRef.current.scrollLeft -= scrollContainerRef.current.scrollWidth / 2;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <div className={`bg-[#123B6D] w-full shadow-md z-40 sticky transition-all duration-300 ${navVisible ? 'top-[110px] md:top-[210px] lg:top-[240px] xl:top-[250px]' : 'top-0'}`}>
      <div 
        className="flex w-full overflow-hidden h-12 items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div 
          ref={scrollContainerRef} 
          className="flex items-center h-full whitespace-nowrap overflow-x-auto no-scrollbar w-full"
          style={{ scrollBehavior: 'auto' }}
        >
          {[...iqacNav, ...iqacNav, ...iqacNav, ...iqacNav].map((item, i) => (
            <Link key={i} href={item.href}
              className={`flex-shrink-0 h-full flex items-center px-6 md:px-8 lg:px-12 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider border-r border-white/10 ${
                activeHref === item.href ? 'bg-[#D4A017] text-white' : 'text-white/90 hover:text-white hover:bg-white/10 active:bg-white/10'
              }`}
              onClick={() => setActiveHref(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
