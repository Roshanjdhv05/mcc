'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users, BookOpen, UserPlus, Info,
  Activity, UserCircle,
  FileText, Award, Briefcase, Bell,
  Clock, Calendar, Trophy, Palette, Star
} from 'lucide-react';

const jrCollegeNav = [
  { label: 'HOME', active: true, href: '/junior-college-corner' },
  { label: "VICE PRINCIPAL'S DESK", href: '/jr-college/vice-principal' },
  { label: 'TEACHING STAFF', href: '/jr-college/teaching-staff' },
  { label: 'RESULT ANALYSIS', href: '/jr-college/result-analysis' },
  { label: 'SMAF / SCHOLARSHIP', href: '/jr-college/scholarships' },
  { label: 'NOTICE', href: '/jr-college/notice' },
  { label: 'TIMETABLE', href: '/jr-college/timetable' },
  { label: 'SPORTS', href: '/jr-college/sports' },
  { label: 'CULTURAL', href: '/jr-college/cultural' },
  { label: 'COMMITTEE', href: '/jr-college/committee' },
  { label: 'SPECIAL DAYS', href: '/jr-college/special-days' },
];

const highlights = [
  { icon: <Users className="w-8 h-8 text-[#014d4e]" />, title: 'Experienced Faculty', desc: 'Dedicated teaching staff guiding students through XI & XII' },
  { icon: <Trophy className="w-8 h-8 text-[#014d4e]" />, title: 'Excellent Results', desc: 'Consistent board exam performance across all streams' },
  { icon: <Palette className="w-8 h-8 text-[#014d4e]" />, title: 'Cultural Activities', desc: 'Vibrant cultural programmes and celebrations year-round' },
  { icon: <Award className="w-8 h-8 text-[#014d4e]" />, title: 'Scholarships', desc: 'SMAF, government and merit scholarships available' },
  { icon: <Activity className="w-8 h-8 text-[#014d4e]" />, title: 'Sports', desc: 'Inter-school and state level sports achievements' },
  { icon: <Star className="w-8 h-8 text-[#014d4e]" />, title: 'Special Days', desc: 'Celebrating national and academic milestones with students' },
];

const notices = [
  { title: 'XIth (FYJC) Admission Notice 2025-26', date: '10 Jun 2025', isNew: true },
  { title: 'XIIth (SYJC) Exam Timetable Released', date: '05 Jun 2025', isNew: true },
  { title: 'Scholarship Form Submission Deadline', date: '01 Jun 2025', isNew: false },
  { title: 'Inter-College Sports Meet Registration', date: '28 May 2025', isNew: false },
  { title: 'Cultural Programme – Annual Day Notice', date: '20 May 2025', isNew: false },
];

export default function JuniorCollegeCornerPage() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mobile ticker state
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  const pausedOffset = useRef(0);

  const resumeAutoScroll = useCallback(() => {
    setIsAutoScrolling(true);
  }, []);

  // Page scroll hide/show
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
    resumeTimerRef.current = setTimeout(() => {
      resumeAutoScroll();
    }, 5000);
  }, [resumeAutoScroll]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoScroll();
    isDragging.current = true;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !tickerRef.current) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    tickerRef.current.style.transform = `translateX(${pausedOffset.current + delta}px)`;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    isDragging.current = false;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    pausedOffset.current = pausedOffset.current + delta;
    scheduleResume();
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12 font-sans">

      {/* Secondary Jr. College Nav — same style as Library */}
      <div className={`bg-[#014d4e] w-full shadow-md z-40 sticky transition-all duration-300 ${navVisible ? 'top-16 md:top-[160px] lg:top-[190px] xl:top-[200px]' : 'top-0'}`}>

        {/* Desktop nav */}
        <div className="hidden md:flex justify-center max-w-[1600px] mx-auto px-4 lg:px-8 overflow-x-auto no-scrollbar items-center h-12">
          {jrCollegeNav.map((item, i) => (
            <Link
              key={i}
              href={item.href || '#'}
              className={`flex-shrink-0 h-full flex items-center px-4 lg:px-5 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider ${
                item.active
                  ? 'bg-[#008e59] text-white'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile nav - CSS ticker animation */}
        <div
          className="flex md:hidden w-full overflow-hidden h-12 items-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={tickerRef}
            className="flex items-center h-full whitespace-nowrap"
            style={{
              animation: isAutoScrolling
                ? 'libraryNavTicker 18s linear infinite'
                : 'none',
              willChange: 'transform',
            }}
          >
            {[...jrCollegeNav, ...jrCollegeNav, ...jrCollegeNav].map((item, i) => (
              <Link
                key={i}
                href={item.href || '#'}
                className={`flex-shrink-0 h-full flex items-center px-5 text-[11px] font-bold transition-colors uppercase whitespace-nowrap tracking-wider border-r border-white/10 ${
                  item.active
                    ? 'bg-[#008e59] text-white'
                    : 'text-white/90 active:text-white active:bg-white/10'
                }`}
                onClick={(e) => {
                  if (isDragging.current) e.preventDefault();
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-12 flex flex-col items-center text-center overflow-hidden">
        {/* Decorative dots */}
        <div className="absolute left-8 lg:left-16 top-12 grid grid-cols-3 gap-2 opacity-60">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#014d4e]/40" />)}
        </div>
        <div className="absolute right-8 lg:right-16 top-12 grid grid-cols-3 gap-2 opacity-60">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#014d4e]/40" />)}
        </div>

        <p className="text-[#008e59] font-bold tracking-[0.2em] text-sm uppercase mb-3 relative inline-block">
          Welcome To
        </p>
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-[#123B6D] tracking-tight mb-4">
          JUNIOR COLLEGE CORNER
        </h1>
        <p className="text-gray-600 text-sm lg:text-base max-w-2xl px-4">
          Stay updated with all Junior College announcements, exam schedules, admission details, and academic notices in one dedicated space.
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">

        {/* Left Column: Highlights */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#014d4e] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md">
            <BookOpen size={20} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">JR. COLLEGE HIGHLIGHTS</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex flex-col gap-2">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-colors border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  {h.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#014d4e] group-hover:text-[#008e59] transition-colors">{h.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Notices */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#014d4e] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md">
            <Bell size={20} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">LATEST NOTICES</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
            {notices.map((n, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#008e59] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[#014d4e] group-hover:text-[#008e59] transition-colors truncate">{n.title}</p>
                    {n.isNew && (
                      <span className="text-[10px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded-full shrink-0">NEW</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{n.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-[#014d4e] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md mt-2">
            <FileText size={20} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">QUICK LINKS</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 grid grid-cols-2 gap-3">
            {jrCollegeNav.slice(1).map((item, i) => (
              <Link
                key={i}
                href={item.href || '#'}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#014d4e]/5 hover:bg-[#014d4e]/10 text-[#014d4e] text-xs font-bold uppercase tracking-wide transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#008e59] shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Info cards */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#014d4e] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md">
            <UserCircle size={20} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">ADMISSIONS</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
            <div className="rounded-lg bg-[#f0fdf4] border border-green-100 p-4">
              <p className="text-sm font-black text-[#014d4e] mb-1">XIth (FYJC)</p>
              <p className="text-xs text-gray-600">Admissions open for 2025-26 academic year. Apply through centralised admission process.</p>
              <Link href="/jr-college/scholarships" className="mt-3 inline-block text-xs font-bold text-[#008e59] hover:underline">View Details →</Link>
            </div>
            <div className="rounded-lg bg-[#f0fdf4] border border-green-100 p-4">
              <p className="text-sm font-black text-[#014d4e] mb-1">XIIth (SYJC)</p>
              <p className="text-xs text-gray-600">Board examination preparation support, revision lectures and exam guidance available.</p>
              <Link href="/jr-college/result-analysis" className="mt-3 inline-block text-xs font-bold text-[#008e59] hover:underline">View Results →</Link>
            </div>
          </div>

          <div className="bg-[#014d4e] rounded-xl p-5 text-white text-center shadow-md">
            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <p className="font-black text-base tracking-wide">ACADEMIC YEAR</p>
            <p className="text-2xl font-black text-[#90ee90] mt-1">2025 – 26</p>
            <p className="text-xs text-white/70 mt-1">Junior College Wing</p>
          </div>
        </div>

      </div>
    </div>
  );
}
