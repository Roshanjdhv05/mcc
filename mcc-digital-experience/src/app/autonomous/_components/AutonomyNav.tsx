'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const autonomyNav = [
  { label: 'Conferment of Autonomy (Certificate)', href: '/autonomous/Conferment-of-Autonomy' },
  { 
    label: 'Board of Studies', 
    href: '#',
    sub: [
      { label: 'Members', href: '/autonomous/bos/members' },
      { label: 'Minutes', href: '/autonomous/bos/minutes' }
    ]
  },
  { 
    label: 'Academic Council', 
    href: '#',
    sub: [
      { label: 'Members', href: '/autonomous/academic-council/members' },
      { label: 'Minutes', href: '/autonomous/academic-council/minutes' }
    ]
  },
  { 
    label: 'Finance Committee', 
    href: '#',
    sub: [
      { label: 'Members', href: '/autonomous/finance-committee/members' },
      { label: 'Minutes', href: '/autonomous/finance-committee/minutes' }
    ]
  },
  { 
    label: 'Governing Body', 
    href: '#',
    sub: [
      { label: 'Members', href: '/autonomous/governing-body/members' },
      { label: 'Minutes', href: '/autonomous/governing-body/minutes' }
    ]
  },
];

export default function AutonomyNav() {
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
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
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
      if (window.innerWidth < 1024 && scrollRef.current) {
        const el = scrollRef.current;
        if (el.style.scrollBehavior !== 'auto') el.style.scrollBehavior = 'auto';
        el.scrollLeft += 1;
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
    <div className={`bg-[#123B6D] w-full shadow-md z-40 sticky transition-all duration-300 ${navVisible ? 'top-[110px] md:top-[210px] lg:top-[240px] xl:top-[250px]' : 'top-0'}`}>
      
      {/* Desktop nav - normal */}
      <div className="hidden lg:flex justify-center max-w-[1600px] mx-auto px-8 overflow-visible items-center h-12">
        {autonomyNav.map((item, i) => {
          const isActive = pathname === item.href || (item.href !== '#' && pathname?.startsWith(item.href || ''));
          return (
            <div key={i} className="relative h-full group flex">
              <Link href={item.href}
                className={`flex-shrink-0 h-full flex items-center px-5 text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider ${
                  isActive ? 'bg-[#D4A017] text-white' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
                {item.sub && <ChevronDown size={14} className="ml-1" />}
              </Link>
              {item.sub && (
                <div className="absolute top-full left-0 hidden group-hover:block z-50 pt-1">
                  <div className="bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden py-1 min-w-[200px]">
                    {item.sub.map((subItem, j) => (
                      <Link key={j} href={subItem.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#123B6D]">
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Auto-Slider */}
      <div 
        ref={scrollRef}
        onTouchStart={handleInteraction}
        onMouseDown={handleInteraction}
        onWheel={handleInteraction}
        className="lg:hidden flex overflow-x-auto no-scrollbar items-center h-12 w-full"
        style={{ scrollBehavior: 'auto' }}
      >
        {[...autonomyNav, ...autonomyNav].map((item, i) => {
          const isActive = pathname === item.href || (item.href !== '#' && pathname?.startsWith(item.href || ''));
          return (
            <div key={i} className="flex-shrink-0 h-full relative group">
              <Link href={item.href}
                className={`h-full flex items-center px-5 text-[11px] font-bold transition-colors uppercase whitespace-nowrap tracking-wider border-r border-white/10 ${
                  isActive ? 'bg-[#D4A017] text-white' : 'text-white/90 active:text-white active:bg-white/10'
                }`}
              >
                {item.label}
                {item.sub && <ChevronDown size={12} className="ml-1" />}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
