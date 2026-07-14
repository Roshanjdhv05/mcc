'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Download, FileText, Calendar, Users, Target, BarChart2, Shield, Star, Leaf, BookOpen, Mic, GraduationCap, Accessibility, ArrowRight } from 'lucide-react';

const iqacNav = [
  { label: 'HOME', active: true, href: '/iqac' },
  { label: 'ABOUT THE IQAC', href: '/iqac#about' },
  { label: 'QUALITY POLICY', href: '/iqac#quality-policy' },
  { label: 'MEMBERS (YEAR WISE)', href: '/iqac#members' },
  { label: 'MINUTES OF THE MEETING', href: '/iqac#minutes' },
  { label: 'BEST PRACTICES', href: '/iqac#best-practices' },
  { label: 'INSTITUTIONAL DISTINCTIVENESS', href: '/iqac#distinctiveness' },
  { label: 'ANNUAL REPORTS', href: '/iqac#annual-reports' },
  { label: 'AQAR', href: '/iqac#aqar' },
  { label: 'ACADEMIC CALENDAR', href: '/iqac#academic-calendar' },
  { label: 'TILAK SMRUTI VYAKHYAN', href: '/iqac#tilak-lecture' },
  { label: 'BAPAT MEMORIAL LECTURE', href: '/iqac#bapat-lecture' },
  { label: 'DEEKSHARAMBH', href: '/iqac#deeksharambh' },
  { label: 'DISABILITY SENSITISATION', href: '/iqac#disability' },
  { label: 'ENVIRONMENTAL COMMITMENTS', href: '/iqac#environment' },
];

const meetings = [
  { date: 'March 2024', agenda: 'Annual Quality Review & Academic Calendar Planning', minutes: true },
  { date: 'December 2023', agenda: 'Mid-Year Progress Review & Feedback Analysis', minutes: true },
  { date: 'September 2023', agenda: 'NAAC Preparation & SSR Review', minutes: true },
  { date: 'June 2023', agenda: 'Annual Report Finalisation & Action Plan 2023-24', minutes: true },
];

const reports = [
  { title: 'AQAR 2023–24', desc: 'Annual Quality Assurance Report for 2023-24', size: '2.4 MB' },
  { title: 'AQAR 2022–23', desc: 'Annual Quality Assurance Report for 2022-23', size: '2.1 MB' },
  { title: 'AQAR 2021–22', desc: 'Annual Quality Assurance Report for 2021-22', size: '1.8 MB' },
  { title: 'AQAR 2020–21', desc: 'Annual Quality Assurance Report for 2020-21', size: '1.6 MB' },
];

const iqacMembers = [
  { name: 'Dr. Suresh Mehta', role: 'Chairperson (Principal)', category: 'Management' },
  { name: 'Prof. Anita Sharma', role: 'IQAC Coordinator', category: 'Faculty' },
  { name: 'Dr. Rakesh Gupta', role: 'Member', category: 'Faculty' },
  { name: 'Prof. Seema Patil', role: 'Member', category: 'Faculty' },
  { name: 'Mr. Kiran Shah', role: 'External Expert', category: 'Industry' },
  { name: 'Ms. Priya Desai', role: 'Alumni Representative', category: 'Alumni' },
];

const quickLinks = [
  { icon: <Shield className="w-5 h-5" />, label: 'Quality Policy', href: '/iqac#quality-policy' },
  { icon: <Users className="w-5 h-5" />, label: 'Members (Year Wise)', href: '/iqac#members' },
  { icon: <FileText className="w-5 h-5" />, label: 'Minutes of the Meeting', href: '/iqac#minutes' },
  { icon: <Star className="w-5 h-5" />, label: 'Best Practices', href: '/iqac#best-practices' },
  { icon: <BarChart2 className="w-5 h-5" />, label: 'Institutional Distinctiveness', href: '/iqac#distinctiveness' },
  { icon: <BookOpen className="w-5 h-5" />, label: 'Annual Reports', href: '/iqac#annual-reports' },
  { icon: <Download className="w-5 h-5" />, label: 'AQAR', href: '/iqac#aqar' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Academic Calendar', href: '/iqac#academic-calendar' },
  { icon: <Mic className="w-5 h-5" />, label: 'Tilak Smruti Vyakhyan', href: '/iqac#tilak-lecture' },
  { icon: <Mic className="w-5 h-5" />, label: 'Bapat Memorial Lecture', href: '/iqac#bapat-lecture' },
  { icon: <GraduationCap className="w-5 h-5" />, label: 'Deeksharambh', href: '/iqac#deeksharambh' },
  { icon: <Accessibility className="w-5 h-5" />, label: 'Disability Sensitisation', href: '/iqac#disability' },
  { icon: <Leaf className="w-5 h-5" />, label: 'Environmental Commitments', href: '/iqac#environment' },
];

export default function IQACPage() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mobile ticker state
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  const pausedOffset = useRef(0);

  const resumeAutoScroll = useCallback(() => setIsAutoScrolling(true), []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 200) setNavVisible(false);
      else if (y < lastScrollY) setNavVisible(true);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const pauseAutoScroll = useCallback(() => {
    if (tickerRef.current) {
      const matrix = new DOMMatrixReadOnly(window.getComputedStyle(tickerRef.current).transform);
      pausedOffset.current = matrix.m41;
    }
    setIsAutoScrolling(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(resumeAutoScroll, 5000);
  }, [resumeAutoScroll]);

  useEffect(() => () => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); }, []);

  // Native smooth auto-scroll for nav
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    
    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      if (scrollContainerRef.current && !isPaused) {
        // Scroll speed: roughly 30 pixels per second
        scrollContainerRef.current.scrollLeft += (30 * delta) / 1000;
        
        // Infinite loop: if we scrolled past half, reset to 0
        // (We render 4 copies, so halfway is seamless)
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
    <div className="bg-[#F8FAFC] min-h-screen pb-12 font-sans">

      {/* ── Secondary IQAC Nav (Library-style) ── */}
      <div className={`bg-[#123B6D] w-full shadow-md z-40 sticky transition-all duration-300 ${navVisible ? 'top-[64px] md:top-[150px] lg:top-[185px] xl:top-[195px]' : 'top-0'}`}>

        {/* Continuous Native Scroll Nav (All Screens) */}
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
                  item.active ? 'bg-[#D4A017] text-white' : 'text-white/90 hover:text-white hover:bg-white/10 active:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <div id="about" className="relative py-14 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute left-8 lg:left-16 top-10 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#123B6D]/40" />)}
        </div>
        <div className="absolute right-8 lg:right-16 top-10 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#123B6D]/40" />)}
        </div>
        <div className="inline-flex items-center gap-2 bg-[#123B6D]/10 border border-[#123B6D]/20 text-[#123B6D] px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
          <Target size={13} /> Internal Quality Assurance Cell
        </div>
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-[#123B6D] tracking-tight mb-4">
          IQAC
        </h1>
        <p className="text-gray-600 text-sm lg:text-base max-w-2xl px-4">
          Ensuring continuous quality enhancement through systematic assessment, feedback, and implementation of best practices at Mulund College of Commerce.
        </p>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">

        {/* Left: Quick Links */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#123B6D] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md">
            <Target size={18} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">QUICK NAVIGATION</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex flex-col gap-1">
            {quickLinks.map((ql, i) => (
              <Link key={i} href={ql.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#123B6D]/5 text-[#123B6D] text-xs font-semibold uppercase tracking-wide transition-colors group">
                <span className="text-[#D4A017] group-hover:text-[#123B6D] transition-colors shrink-0">{ql.icon}</span>
                {ql.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Middle: Meetings + AQAR */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          {/* Meetings */}
          <div id="minutes" className="bg-[#123B6D] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md">
            <Calendar size={18} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">MINUTES OF THE MEETING</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
            {meetings.map((m, i) => (
              <div key={i} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#123B6D]/10 flex items-center justify-center shrink-0">
                    <Calendar size={14} className="text-[#123B6D]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#D4A017]">{m.date}</p>
                    <p className="text-xs text-gray-700 mt-0.5">{m.agenda}</p>
                  </div>
                </div>
                {m.minutes && (
                  <button className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-[#123B6D] text-white rounded-lg text-[10px] font-bold hover:bg-[#0d2d54] transition-colors">
                    <Download size={10} /> PDF
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* AQAR */}
          <div id="aqar" className="bg-[#123B6D] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md mt-2">
            <FileText size={18} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">ANNUAL QUALITY ASSURANCE REPORTS (AQAR)</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
            {reports.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <FileText size={14} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#123B6D]">{r.title}</p>
                    <p className="text-[11px] text-gray-500">{r.desc} · {r.size}</p>
                  </div>
                </div>
                <button className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-[#123B6D] text-white rounded-lg text-[10px] font-bold hover:bg-[#0d2d54] transition-colors">
                  <Download size={10} /> Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Members + Lecture Series */}
        <div className="lg:col-span-4 flex flex-col gap-4">

          {/* Members */}
          <div id="members" className="bg-[#123B6D] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md">
            <Users size={18} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">IQAC MEMBERS</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
            {iqacMembers.map((m, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#123B6D] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#123B6D]">{m.name}</p>
                  <p className="text-[11px] text-gray-500">{m.role}</p>
                  <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#123B6D]/10 text-[#123B6D]">{m.category}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Lecture Series */}
          <div id="tilak-lecture" className="bg-[#123B6D] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md mt-2">
            <Mic size={18} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">LECTURE SERIES</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex flex-col gap-3">
            <div className="rounded-lg bg-[#123B6D]/5 border border-[#123B6D]/10 p-3">
              <p className="text-xs font-black text-[#123B6D] mb-1">Lokmanya Tilak Memorial Lecture Series</p>
              <p className="text-[11px] text-gray-500 mb-2">Tilak Smruti Vyakhyan — Annual memorial lecture honouring Lokmanya Tilak</p>
              <div className="flex gap-2">
                <Link href="/iqac#tilak-lecture" className="text-[10px] font-bold text-[#123B6D] hover:underline">About →</Link>
                <Link href="/iqac#tilak-lecture" className="text-[10px] font-bold text-[#123B6D] hover:underline">Lectures Organised →</Link>
              </div>
            </div>
            <div id="bapat-lecture" className="rounded-lg bg-[#123B6D]/5 border border-[#123B6D]/10 p-3">
              <p className="text-xs font-black text-[#123B6D] mb-1">Principal B. G. Bapat Memorial Lecture Series</p>
              <p className="text-[11px] text-gray-500 mb-2">Annual lecture series in memory of Principal B. G. Bapat</p>
              <div className="flex gap-2">
                <Link href="/iqac#bapat-lecture" className="text-[10px] font-bold text-[#123B6D] hover:underline">About →</Link>
                <Link href="/iqac#bapat-lecture" className="text-[10px] font-bold text-[#123B6D] hover:underline">Lectures Organised →</Link>
              </div>
            </div>
          </div>

          {/* Other Sections */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 grid grid-cols-1 gap-2">
            {[
              { id: 'deeksharambh', icon: <GraduationCap className="w-4 h-4" />, label: 'Deeksharambh (Orientation of Learners)', color: 'text-purple-600 bg-purple-50' },
              { id: 'disability', icon: <Accessibility className="w-4 h-4" />, label: 'Disability Sensitisation', color: 'text-orange-600 bg-orange-50' },
              { id: 'environment', icon: <Leaf className="w-4 h-4" />, label: 'Environmental Commitments', color: 'text-green-600 bg-green-50' },
              { id: 'best-practices', icon: <Star className="w-4 h-4" />, label: 'Best Practices', color: 'text-yellow-600 bg-yellow-50' },
              { id: 'distinctiveness', icon: <BarChart2 className="w-4 h-4" />, label: 'Institutional Distinctiveness', color: 'text-blue-600 bg-blue-50' },
              { id: 'academic-calendar', icon: <Calendar className="w-4 h-4" />, label: 'Academic Calendar', color: 'text-teal-600 bg-teal-50' },
            ].map((s, i) => (
              <Link key={i} href={`/iqac#${s.id}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#123B6D]/5 transition-colors group">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>{s.icon}</div>
                <span className="text-xs font-semibold text-[#123B6D] group-hover:text-[#0d2d54]">{s.label}</span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
