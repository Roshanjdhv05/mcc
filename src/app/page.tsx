'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Counter from '@/components/ui/Counter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { supabase } from '@/lib/supabase';
import type { Notice } from '@/lib/noticeTypes';
import StudentsWorkSection from '@/components/ui/StudentsWorkSection';
import StatsStrip from '@/components/ui/StatsStrip';
import {
  Bell, Search, Download, ChevronRight, Quote,
  Users, BookOpen, Briefcase, Megaphone, ClipboardCheck,
  PenLine, LibraryBig, HeadphonesIcon, FileText, ShieldCheck, Image,
  Bot, CalendarDays, ArrowRight, LayoutDashboard,
  Lightbulb, Activity, MonitorSmartphone, Target, MessagesSquare,
  Train, ArrowRightLeft, Copy, Stamp, LogOut, Award, Shield, CheckCircle2, Globe, X
} from 'lucide-react';

const quickLinks = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, bg: 'bg-indigo-50', iconColor: 'text-indigo-600', hiddenMobile: true },
  { label: 'Notices', href: '/notices', icon: Megaphone, bg: 'bg-blue-50', iconColor: 'text-[#123B6D]' },
  { label: 'Admissions', href: '/admissions', icon: ClipboardCheck, bg: 'bg-teal-50', iconColor: 'text-teal-600' },
  { label: 'Exams', href: '/examination', icon: PenLine, bg: 'bg-amber-50', iconColor: 'text-amber-600' },
  { label: 'Library', href: '/library', icon: LibraryBig, bg: 'bg-blue-50', iconColor: 'text-[#123B6D]' },
  { label: 'Services', href: '/services', icon: HeadphonesIcon, bg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
  { label: 'Forms', href: '/forms', icon: FileText, bg: 'bg-gray-100', iconColor: 'text-gray-600' },
  { label: 'NAAC', href: '/iqac', icon: ShieldCheck, bg: 'bg-amber-50', iconColor: 'text-amber-700' },
  { label: 'Gallery', href: '/gallery', icon: Image, bg: 'bg-blue-50', iconColor: 'text-[#4DA8DA]' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Admissions:     'bg-blue-100 text-blue-700',
  Examinations:   'bg-purple-100 text-purple-700',
  Academics:      'bg-indigo-100 text-indigo-700',
  Scholarships:   'bg-green-100 text-green-700',
  Events:         'bg-amber-100 text-amber-700',
  Sports:         'bg-orange-100 text-orange-700',
  Cultural:       'bg-pink-100 text-pink-700',
  Placement:      'bg-teal-100 text-teal-700',
  Library:        'bg-cyan-100 text-cyan-700',
  Administration: 'bg-gray-100 text-gray-700',
};

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  return d > 0 ? `${d} day${d > 1 ? 's' : ''} ago` : h > 0 ? `${h}h ago` : 'Just now';
};

const events = [
  { month: 'OCT', day: '12', title: 'Inter-collegiate Tech Meet', time: '10:00 AM • Main Auditorium', accent: 'bg-blue-50 text-[#123B6D]' },
  { month: 'OCT', day: '15', title: 'Career Counseling Workshop', time: '02:00 PM • Seminar Hall 1', accent: 'bg-amber-50 text-amber-700' },
  { month: 'OCT', day: '18', title: 'Alumni Networking Brunch', time: '11:00 AM • College Lawns', accent: 'bg-cyan-50 text-cyan-700' },
];

const culturalEvents = [
  {
    tag: 'AUG 2025', title: 'Friendship Day',
    desc: 'A celebration of friendship, unity, and memories shared across the campus with games and t-shirt signing.',
    img: '/2025 - 2026/Friendship Day (1).jpg',
  },
  {
    tag: 'SEP 2025', title: "Teacher's Day",
    desc: 'A heartfelt tribute to the guidance, inspiration, and unwavering support of our beloved faculty.',
    img: '/2025 - 2026/Teachers Day (1).jpg',
  },
  {
    tag: 'OCT 2025', title: 'Spectrum x Leo Club – Social Cause',
    desc: 'MCC joins hands with Leo Club to create meaningful social impact for specially abled children.',
    img: '/2025 - 2026/Social Cause Event (1).jpg',
  },
  {
    tag: 'OCT 2025', title: 'हे Subharambh',
    desc: 'A vibrant Garba evening on the college turf with the special appearance of Abhijeet Khandkekar.',
    img: '/2025 - 2026/हे Subharambh (1).jpg',
  },
  {
    tag: 'NOV 2025', title: 'Pre-Theme Reveal Events',
    desc: 'Campus Fit Clash, Fusion on Hands, and Mic Drop Mania — building anticipation for the grand reveal.',
    img: '/2025 - 2026/Pre-Theme Reveal Events (1).jpg',
  },
  {
    tag: 'DEC 2025', title: 'Theme Reveal – Reevan 2025',
    desc: 'The grand unveiling of “Reevan – The End is the Beginning” with Ayesha Khan and a spectacular flashmob.',
    img: '/2025 - 2026/Theme Reveal – Reevan 2025 (1).jpg',
  },
  {
    tag: 'JAN 2026', title: 'Induction Ceremony 2025',
    desc: 'Electrifying flashmob, badge distribution, and inspiring speeches marking new leadership journeys.',
    img: '/2025 - 2026/Induction Ceremony 2025 (1).jpg',
  },
  {
    tag: 'MAR 2026', title: 'Spectrum Day 1',
    desc: 'Natarang, Neon Cricket, Mr & Ms Spectrum, Otaku Carnival and more in a power-packed opening day.',
    img: '/2025 - 2026/Spectrum Day 1 (1).jfif',
  },
  {
    tag: 'MAR 2026', title: 'Spectrum Day 2',
    desc: 'Kurukshetra, Bollyverse, Sursargam and high-intensity esports clashes keeping the campus buzzing.',
    img: '/2025 - 2026/Spectrum Day 2 (1).jfif',
  },
  {
    tag: 'MAR 2026', title: 'Spectrum Day 3',
    desc: 'Poetic Arena, Sunao Dil Se, Rangmanch and intense competitions advancing to final rounds.',
    img: '/2025 - 2026/Spectrum Day 3 (1).jpeg',
  },
  {
    tag: 'MAR 2026', title: 'Spectrum Day 4 – Grand Finale',
    desc: 'Taste Roulette, Escape Room and an electrifying DJ Night closing the curtains on Spectrum 2026.',
    img: '/2025 - 2026/Spectrum Day 4 (1).jpeg',
  },
];

const programmes = [
  { code: 'BCom', name: 'Bachelor of Commerce', desc: 'Comprehensive commerce education with specializations', seats: 360, duration: '3 Years', type: 'UG' },
  { code: 'BMS', name: 'Bachelor of Management Studies', desc: 'Leadership & management principles', seats: 120, duration: '3 Years', type: 'UG' },
  { code: 'BSc IT', name: 'B.Sc. Information Technology', desc: 'IT and software development focus', seats: 120, duration: '3 Years', type: 'UG' },
  { code: 'BAF', name: 'B.Com. (Accounting & Finance)', desc: 'Advanced accounting & finance', seats: 120, duration: '3 Years', type: 'UG' },
  { code: 'MCom', name: 'Master of Commerce', desc: 'Advanced commerce & business research', seats: 60, duration: '2 Years', type: 'PG' },
  { code: 'MSc IT', name: 'M.Sc. Information Technology', desc: 'Advanced tech and software eng', seats: 60, duration: '2 Years', type: 'PG' },
  { code: 'PhD', name: 'Ph.D. in Commerce', desc: 'Doctoral research in commerce & management', seats: 10, duration: '3-5 Years', type: 'PHD' },
];

const testimonials = [
  { name: 'Priya Sharma', course: 'BCom 2023', quote: 'MCC gave me more than a degree — it gave me the confidence to lead. The faculty, events, and environment shaped who I am today.', avatar: 'P' },
  { name: 'Rahul Mehta', course: 'MCom 2022', quote: 'The autonomous curriculum at MCC is a game-changer. The research projects and industry exposure helped me land my dream job at KPMG.', avatar: 'R' },
  { name: 'Sneha Joshi', course: 'FYJC 2021', quote: 'As a FYJC student, the supportive teachers and well-equipped labs made studying enjoyable. I cleared my board exams with distinction!', avatar: 'S' },
];

const heroBanners = [
  {
    image: "/banner1.png",
    fit: 'object-cover' as const,
    badge: "Welcome to MCC",
    title: <>Welcome to <span className="text-[#D4A017]">Mulund College</span> of Commerce</>,
    desc: "An autonomous institution dedicated to academic excellence, innovation, and holistic student development since 1970."
  },
  {
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80",
    fit: 'object-cover' as const,
    badge: "Admissions 2024–25 Open Now",
    title: <>Admissions <span className="text-[#D4A017]">2024–25</span> Now Open</>,
    desc: "An autonomous institution dedicated to academic excellence, innovation, and holistic student development since 1970."
  },
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80",
    fit: 'object-cover' as const,
    badge: "A Legacy of Excellence",
    title: <>Empowering the <span className="text-[#D4A017]">Leaders</span> of Tomorrow</>,
    desc: "Discover a vibrant campus life, world-class faculty, and outstanding placement opportunities that shape your future."
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80",
    fit: 'object-cover' as const,
    badge: "Join Our Community",
    title: <>Your Journey to <span className="text-[#D4A017]">Success</span> Starts Here</>,
    desc: "Join thousands of successful alumni who have made their mark across the globe. Experience the MCC difference."
  }
];

const adminServices = [
  { icon: Train, label: 'Railway Concession', desc: 'Local train season pass concession for students.' },
  { icon: FileText, label: 'Bonafide Certificate', desc: 'Proof of enrollment for bank accounts, visa, etc.' },
  { icon: ArrowRightLeft, label: 'Transfer Certificate', desc: 'For progression to other Higher Educational Institutions.' },
  { icon: LogOut, label: 'Leaving Certificate', desc: 'Issued on departure. Required for admission elsewhere.' },
  { icon: Globe, label: 'Migration Certificate', desc: 'For students migrating to another Board or institution.' },
  { icon: FileText, label: 'Transcript', desc: 'Official transcript for Foreign Universities or Employment.' },
  { icon: Shield, label: 'Character Certificate', desc: 'Certificate attesting good character and conduct.' },
  { icon: CheckCircle2, label: 'Marksheet Verification', desc: 'Official verification of mark sheets issued by the college.' },
  { icon: Stamp, label: 'Caste Validity', desc: 'Verification of caste certificate validity.' },
  { icon: Award, label: 'Scholarships', desc: 'Apply for government and institutional scholarship schemes.' },
  { icon: Copy, label: 'Duplicate Marksheet', desc: 'Request a duplicate mark sheet in case of loss or damage.' }
];

// ─── events data (same as full calendar page) ───────────────────────────────
const CALENDAR_EVENTS = [
  { date: '2026-07-01', title: 'Semester Start', type: 'Academic' },
  { date: '2026-07-03', title: 'Induction', type: 'Academic' },
  { date: '2026-07-05', title: 'Bakri Eid', type: 'Holiday' },
  { date: '2026-07-07', title: 'Guest Lecture', type: 'Seminar' },
  { date: '2026-07-10', title: 'Career Talk', type: 'Seminar' },
  { date: '2026-07-14', title: 'Internal Test', type: 'Examination' },
  { date: '2026-07-15', title: 'Annual Day', type: 'Cultural' },
  { date: '2026-07-17', title: 'Sports Day', type: 'Sports' },
  { date: '2026-07-18', title: 'Camp', type: 'NSS' },
  { date: '2026-07-21', title: 'Faculty Session', type: 'Academic' },
  { date: '2026-07-22', title: 'Digital Skills', type: 'Workshop' },
  { date: '2026-07-24', title: 'Unit Test', type: 'Examination' },
  { date: '2026-07-26', title: 'NCC Parade', type: 'NCC' },
  { date: '2026-07-28', title: 'Research Talk', type: 'Seminar' },
  { date: '2026-07-28', title: 'Workshop Session', type: 'Workshop' },
  { date: '2026-07-29', title: 'Spectrum Pre-Event', type: 'Event' },
  { date: '2026-07-31', title: 'End of Month', type: 'Cultural' },
];

const EVENT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Academic:    { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500' },
  Examination: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  Holiday:     { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500' },
  Seminar:     { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  Workshop:    { bg: 'bg-pink-100',   text: 'text-pink-700',   dot: 'bg-pink-500' },
  Sports:      { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500' },
  Cultural:    { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  NSS:         { bg: 'bg-teal-100',   text: 'text-teal-700',   dot: 'bg-teal-500' },
  NCC:         { bg: 'bg-slate-100',  text: 'text-slate-600',  dot: 'bg-slate-400' },
  Event:       { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
};

const ALL_FILTERS = ['All', 'Academic', 'Examination', 'Holiday', 'Seminar', 'Workshop', 'Sports', 'Cultural', 'NSS', 'NCC', 'Event'];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

function HomepageCalendar() {
  const today = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1-based
  const [filter, setFilter] = useState('All');
  const [selectedDayEvents, setSelectedDayEvents] = useState<{ day: number; events: any[] } | null>(null);
  const [liveCalEvents, setLiveCalEvents] = useState<{ date: string; title: string; type: string }[]>([]);

  // Fetch calendar events from Supabase
  useEffect(() => {
    supabase
      .from('events')
      .select('title, calendar_date, calendar_type')
      .eq('publish_calendar', true)
      .eq('status', 'published')
      .not('calendar_date', 'is', null)
      .then(({ data }) => {
        if (data) {
          setLiveCalEvents(data.map((e: any) => ({
            date: e.calendar_date,
            title: e.title,
            type: e.calendar_type || 'Event',
          })));
        }
      });
  }, []);

  const allCalendarEvents = useMemo(
    () => [...CALENDAR_EVENTS, ...liveCalEvents],
    [liveCalEvents]
  );

  const daysInMonth   = new Date(year, month, 0).getDate();
  const startDayIndex = new Date(year, month - 1, 1).getDay();

  const eventsForMonth = allCalendarEvents.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month && (filter === 'All' || e.type === filter);
  });

  const eventsForDay = (day: number) =>
    eventsForMonth.filter(e => new Date(e.date).getDate() === day);

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear();

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 12) { setMonth(1); setYear(y => y + 1); } else setMonth(m => m + 1); };
  const goToday   = () => { setYear(today.getFullYear()); setMonth(today.getMonth() + 1); };

  const cells: (number | null)[] = [
    ...Array(startDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-4 md:p-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#123B6D] text-white flex items-center justify-center">
            <CalendarDays size={18} />
          </div>
          <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)]">Academic Calendar</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="w-8 h-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] transition-colors">
            <ChevronRight size={16} className="rotate-180" />
          </button>
          <span className="font-bold text-[#1E293B] text-sm px-3 py-1.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] min-w-[120px] text-center">
            {MONTH_NAMES[month - 1]} {year}
          </span>
          <button onClick={nextMonth} className="w-8 h-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] transition-colors">
            <ChevronRight size={16} />
          </button>
          <button onClick={goToday} className="px-3 py-1.5 bg-[#123B6D] text-white text-xs font-bold rounded-lg hover:bg-[#0f2d58] transition-colors">
            Today
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {ALL_FILTERS.map(f => {
          const colors = EVENT_COLORS[f];
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                f === 'All'
                  ? isActive ? 'bg-[#123B6D] text-white border-[#123B6D]' : 'bg-white text-[#123B6D] border-[#E2E8F0] hover:bg-[#EBF3FF]'
                  : isActive ? `${colors.bg} ${colors.text} border-transparent` : 'bg-white text-gray-600 border-[#E2E8F0] hover:bg-gray-50'
              }`}
            >
              {f !== 'All' && <span className={`w-2 h-2 rounded-full ${EVENT_COLORS[f].dot}`} />}
              {f}
            </button>
          );
        })}
      </div>

      {/* Calendar Grid */}
      <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7">
          {DAY_NAMES.map(d => (
            <div key={d} className="py-2 text-center text-[10px] md:text-xs font-bold text-[#64748B] bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="min-h-[72px] md:min-h-[90px] border-b border-r border-[#F1F5F9] bg-[#FAFBFC]" />;
            }
            const dayEvents = eventsForDay(day);
            const todayCell = isToday(day);
            const visible = dayEvents.slice(0, 1);
            const moreCount = dayEvents.length - 1;
            return (
              <div
                key={day}
                onClick={() => setSelectedDayEvents({ day, events: dayEvents })}
                className={`min-h-[72px] md:min-h-[90px] border-b border-r border-[#F1F5F9] p-1 md:p-1.5 flex flex-col gap-0.5 transition-colors hover:bg-blue-50/50 cursor-pointer ${
                  todayCell ? 'bg-[#EBF3FF]' : ''
                }`}
              >
                <span className={`text-xs md:text-sm font-bold self-start w-6 h-6 flex items-center justify-center rounded-full ${
                  todayCell ? 'bg-[#123B6D] text-white' : 'text-[#1E293B]'
                }`}>
                  {day}
                </span>
                {visible.map((ev, i) => {
                  const c = EVENT_COLORS[ev.type];
                  return (
                    <div key={i} className={`${c.bg} ${c.text} text-[9px] md:text-[10px] font-semibold px-1 py-0.5 rounded truncate leading-tight`}>
                      {ev.title}
                    </div>
                  );
                })}
                {moreCount > 0 && (
                  <div className="text-[9px] md:text-[10px] text-gray-500 font-semibold px-1">+{moreCount} More</div>
                )}
                {dayEvents.length > 0 && (
                  <div className="flex gap-0.5 mt-auto px-0.5 pb-0.5">
                    {dayEvents.map((ev, i) => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full ${EVENT_COLORS[ev.type].dot}`} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-4 flex justify-end">
        <Link href="/students-corner/event-calendar" className="flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] hover:gap-2.5 transition-all">
          View Full Calendar <ArrowRight size={15} />
        </Link>
      </div>

      <AnimatePresence>
        {selectedDayEvents && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#123B6D]/40 backdrop-blur-sm"
            onClick={() => setSelectedDayEvents(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#E2E8F0]"
            >
              <div className="bg-[#123B6D] p-5 flex items-center justify-between text-white">
                <div>
                  <h3 className="font-bold text-lg font-[var(--font-heading)]">
                    {selectedDayEvents.day} {MONTH_NAMES[month - 1]} {year}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {selectedDayEvents.events.length} {selectedDayEvents.events.length === 1 ? 'Event' : 'Events'} Scheduled
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDayEvents(null)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5 max-h-[60vh] overflow-y-auto">
                {selectedDayEvents.events.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDayEvents.events.map((ev, i) => {
                      const c = EVENT_COLORS[ev.type];
                      return (
                        <div key={i} className="p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm flex items-start gap-3">
                          <div className={`mt-1 w-2.5 h-2.5 rounded-full ${c.dot} flex-shrink-0`} />
                          <div>
                            <h4 className="font-bold text-[#1E293B]">{ev.title}</h4>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${c.bg} ${c.text}`}>
                              {ev.type}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                      <CalendarDays size={24} className="text-gray-400" />
                    </div>
                    <p className="text-[#64748B] font-medium">No events scheduled for this day.</p>
                  </div>
                )}
              </div>
              {selectedDayEvents.events.length > 0 && (
                <div className="p-4 border-t border-[#E2E8F0] bg-gray-50 flex justify-end">
                  <Link
                    href="/students-corner/event-calendar"
                    className="px-5 py-2.5 bg-[#123B6D] text-white rounded-xl text-sm font-semibold hover:bg-[#0f2d58] transition-colors"
                  >
                    View All Events
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function useMarqueeScroll(speed: number = 1, direction: 'x' | 'y' = 'x') {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const isInteracting = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHovered.current && !isInteracting.current) {
        if (direction === 'x') {
          el.scrollLeft += speed * (delta / 16);
          // Loop logic for duplicated content
          if (speed > 0 && el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft -= el.scrollWidth / 2;
          } else if (speed < 0 && el.scrollLeft <= 0) {
            el.scrollLeft += el.scrollWidth / 2;
          }
        } else {
          el.scrollTop += speed * (delta / 16);
          if (speed > 0 && el.scrollTop >= el.scrollHeight / 2) {
            el.scrollTop -= el.scrollHeight / 2;
          } else if (speed < 0 && el.scrollTop <= 0) {
            el.scrollTop += el.scrollHeight / 2;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const pauseScroll = () => { isHovered.current = true; };
    const resumeScroll = () => { isHovered.current = false; };
    const handleInteractStart = () => { isInteracting.current = true; };
    const handleInteractEnd = () => { 
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isInteracting.current = false;
      }, 1500); // Resume 1.5s after interaction ends
    };

    el.addEventListener('mouseenter', pauseScroll);
    el.addEventListener('mouseleave', resumeScroll);
    el.addEventListener('touchstart', handleInteractStart, { passive: true });
    el.addEventListener('touchend', handleInteractEnd);
    el.addEventListener('wheel', handleInteractStart, { passive: true });
    el.addEventListener('wheel', handleInteractEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      el.removeEventListener('mouseenter', pauseScroll);
      el.removeEventListener('mouseleave', resumeScroll);
      el.removeEventListener('touchstart', handleInteractStart);
      el.removeEventListener('touchend', handleInteractEnd);
      el.removeEventListener('wheel', handleInteractStart);
      el.removeEventListener('wheel', handleInteractEnd);
    };
  }, [speed, direction]);

  return containerRef;
}

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [notices, setNotices] = useState<Notice[]>([]);
  const alumniScrollRef = useRef<HTMLDivElement>(null);

  const latestEventsRef = useMarqueeScroll(1);
  const latestNoticesRef = useMarqueeScroll(0.8, 'y');
  const programmesRef = useMarqueeScroll(1.2);
  const adminServicesRef = useMarqueeScroll(-1);
  const culturalRef = useMarqueeScroll(1);

  useEffect(() => {
    async function fetchNotices() {
      const now = new Date().toISOString();
      const { data } = await supabase
        .from('notices')
        .select('*')
        .lte('schedule_time', now)
        .gte('expiry_time', now)
        .order('schedule_time', { ascending: false })
        .limit(10);
      
      if (data) {
        setNotices(data as Notice[]);
      }
    }
    fetchNotices();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (alumniScrollRef.current && window.innerWidth < 768) {
        const { scrollLeft: aLeft, scrollWidth: aWidth, clientWidth: aClient } = alumniScrollRef.current;
        if (aLeft + aClient >= aWidth - 10) {
          alumniScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          alumniScrollRef.current.scrollBy({ left: aClient, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 md:pb-0">
      {/* ── HERO ── */}
      <section className="relative h-[80vh] min-h-[520px] flex items-center overflow-hidden bg-[#0a1a2e]">
        <div className="absolute inset-0">
          <AnimatePresence>
            <motion.img
              key={currentBanner}
              src={heroBanners[currentBanner].image}
              alt="MCC Campus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className={`absolute inset-0 w-full h-full ${heroBanners[currentBanner].fit}`}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        {/* Floating background shapes */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-[#D4A017]/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#4DA8DA]/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 2 }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-3xl flex flex-col mr-auto items-start text-left"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/30">
                <span className="w-2 h-2 bg-[#D4A017] rounded-full animate-pulse" />
                {heroBanners[currentBanner].badge}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight font-[var(--font-heading)]">
                {heroBanners[currentBanner].title}
              </h1>
              <p className="text-white/85 text-lg md:text-xl mb-8 leading-relaxed">
                {heroBanners[currentBanner].desc}
              </p>
              <div className="flex flex-wrap gap-4 justify-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/admissions"
                    className="px-8 py-3.5 bg-[#D4A017] text-white font-semibold rounded-xl hover:bg-[#b8891a] transition-all shadow-lg shadow-[#D4A017]/30 flex items-center gap-2"
                  >
                    Apply Now <ArrowRight size={18} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/programmes"
                    className="px-8 py-3.5 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/40 hover:bg-white/25 transition-all flex items-center gap-2"
                  >
                    Explore Programmes
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── STATISTICS STRIP ── */}
      <StatsStrip />

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 space-y-16">

        {/* ── QUICK ACCESS ── */}
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-6">Quick Access</h2>
          <div className="grid grid-cols-4 md:grid-cols-9 gap-3 md:gap-4">
            {quickLinks.map(({ label, href, icon: Icon, bg, iconColor, hiddenMobile }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className={hiddenMobile ? 'hidden md:block' : ''}>
                <Link
                  href={href}
                  className="group flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#123B6D]/20 hover:-translate-y-1 transition-all"
                >
                  <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl ${bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className={iconColor} />
                  </div>
                  <span className="text-[11px] md:text-xs font-semibold text-[#1E293B] text-center leading-tight">{label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── LATEST IN MCC ── */}
        <ScrollReveal>
          {/* Section Title */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Latest in MCC</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 items-stretch">

            {/* ── LEFT: Latest Events (horizontal scroll left) ── */}
            <div className="flex-1 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <h3 className="text-base font-bold text-[#123B6D] font-[var(--font-heading)]">Latest Events</h3>
                <Link href="/students-corner/cultural-forum" className="text-xs font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ArrowRight size={12} />
                </Link>
              </div>

              <div className="overflow-hidden w-full group pb-5 px-2">
                <div ref={latestEventsRef} className="flex gap-4 overflow-x-auto no-scrollbar w-full cursor-grab active:cursor-grabbing">
                  {[...culturalEvents, ...culturalEvents].map((ev, i) => (
                    <Link
                      key={i}
                      href="/students-corner/cultural-forum"
                      className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] xl:w-[360px] group/card rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] hover:shadow-[0_12px_30px_rgba(18,59,109,0.12)] hover:-translate-y-1.5 transition-all duration-300"
                    >
                      <div className="relative h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden">
                        <img
                          src={ev.img}
                          alt={ev.title}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-[#123B6D] uppercase tracking-wide">
                          {ev.tag}
                        </span>
                      </div>
                      <div className="p-3 sm:p-4">
                        <h4 className="font-bold text-[#1E293B] text-sm sm:text-base leading-snug line-clamp-2 font-[var(--font-heading)]">{ev.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Latest Notices (scroll upward) ── */}
            <div className="w-full lg:w-[340px] xl:w-[380px] bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
                <h3 className="text-base font-bold text-[#123B6D] font-[var(--font-heading)]">Latest Notices</h3>
                <Link href="/notices" className="text-xs font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ArrowRight size={12} />
                </Link>
              </div>

              {/* Fixed height scroll-up container */}
              <div className="h-[300px] relative overflow-hidden group">
                <div ref={latestNoticesRef} className="overflow-y-auto no-scrollbar h-full px-4 pb-4 cursor-grab active:cursor-grabbing">
                  <div className="flex flex-col gap-3">
                    {(notices.length > 0 ? [...notices, ...notices] : [
                      { id: 1, title: 'Semester Start — July 2026', description: 'All UG and PG programmes commence from 1st July 2026.', categories: ['Academics'], is_general: false, schedule_time: new Date().toISOString(), expiry_time: '' },
                      { id: 2, title: 'Internal Test Schedule Released', description: 'Refer to the notice board for subject-wise internal test dates.', categories: ['Examinations'], is_general: true, schedule_time: new Date(Date.now() - 86400000).toISOString(), expiry_time: '' },
                      { id: 3, title: 'Sports Day Registration Open', description: 'Students can register for Sports Day events at the college office.', categories: ['Sports'], is_general: false, schedule_time: new Date(Date.now() - 2 * 86400000).toISOString(), expiry_time: '' },
                      { id: 4, title: 'Scholarship Applications Invited', description: 'EBC and government scholarships — apply before 31st July.', categories: ['Scholarships'], is_general: true, schedule_time: new Date(Date.now() - 3 * 86400000).toISOString(), expiry_time: '' },
                    ] as any[]).map((n: any, i: number) => {
                      const primaryCat = n.categories?.[0] || 'Administration';
                      const colorClass = CATEGORY_COLORS[primaryCat] || 'bg-gray-100 text-gray-700';
                      return (
                        <Link
                          key={`${n.id || i}-${i}`}
                          href="/notices"
                          className="flex-shrink-0 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-white hover:shadow-md hover:border-[#123B6D]/20 transition-all duration-200 group/card"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {n.is_general && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#123B6D] text-white">General</span>
                            )}
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colorClass}`}>{primaryCat}</span>
                            <span className="text-[#94A3B8] text-[10px] ml-auto">{timeAgo(n.schedule_time)}</span>
                          </div>
                          <h4 className="font-semibold text-[#1E293B] text-sm leading-snug line-clamp-2 font-[var(--font-heading)] group-hover/card:text-[#123B6D] transition-colors">{n.title}</h4>
                          <p className="text-xs text-[#64748B] mt-1 line-clamp-1">{n.description}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                {/* Fade mask top & bottom */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
              </div>
            </div>

          </div>
        </ScrollReveal>


        {/* ── AI ASSISTANT ── */}
        <ScrollReveal>
          <div className="relative bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 overflow-hidden min-h-[280px] flex flex-col justify-between">
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-[#D4A017]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#123B6D] text-white flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <h2 className="text-3xl font-bold text-[#123B6D] font-[var(--font-heading)]">Welcome to Mulund College of Commerce</h2>
              </div>
              <p className="text-[#64748B] max-w-3xl mb-8 leading-relaxed">
                Mulund College of Commerce (MCC), established in 1970, is a prominent institution located in the Mulund suburb of Mumbai, India. Managed by the Parle Tilak Vidyalay Association, the college offers a range of undergraduate and postgraduate programs across disciplines such as commerce, science, management, and media studies.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-7 py-3 bg-[#123B6D] text-white rounded-full font-semibold text-sm hover:bg-[#0d2d54] transition-all shadow-lg shadow-[#123B6D]/20"
              >
                Chat Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-7 py-3 border border-[#123B6D] text-[#123B6D] rounded-full font-semibold text-sm hover:bg-[#123B6D]/5 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </ScrollReveal>        {/* ── ACADEMIC CALENDAR ── */}
        <ScrollReveal>
          <HomepageCalendar />
        </ScrollReveal>

        {/* ── PRINCIPAL'S MESSAGE ── */}
        <div className="w-full">
          <ScrollReveal>
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-80 md:h-auto flex-shrink-0">
                <img
                  src="/Dr. Minal Mapuskar (Principal).jpeg"
                  alt="Dr. Minal Mapuskar - Principal"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center md:w-2/3">
                <Quote size={40} className="text-[#D4A017] mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-6 italic leading-snug">
                  “Welcome to Mulund College of Commerce – Empowering Minds & Shaping Futures”
                </h3>
                <div className="text-base text-[#64748B] leading-relaxed mb-8 space-y-4">
                  <p>
                    We believe education is the most powerful tool for transformation. Our mission is to nurture not just brilliant students, but brilliant human beings, fostering critical thinking, creativity, and character. At Mulund College, where we blend academic rigor with compassion to prepare the student for the challenges of tomorrow.
                  </p>
                  <p>
                    We provide a platform that empowers young minds to discover their dormant talents and achieve all-around excellence. Through dedicated mentoring, state-of-the-art facilities, and a supportive environment, we shape responsible citizens ready to lead.
                  </p>
                  <Link href="/principal" className="text-[#123B6D] font-semibold hover:underline mt-2 inline-block">Read more...</Link>
                </div>
                <div>
                  <p className="font-bold text-[#123B6D] text-lg">Dr. Minal Mapuskar</p>
                  <p className="text-sm text-[#94A3B8] font-medium">Principal, MCC</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>


        {/* ── FEATURED PROGRAMMES ── */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Featured Programmes</h2>
            <Link href="/programmes" className="text-sm font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-hidden w-full group relative">
            <div ref={programmesRef} className="flex gap-5 overflow-x-auto no-scrollbar w-full pb-4 pt-2 cursor-grab active:cursor-grabbing">
              {[...programmes, ...programmes].map((p, i) => (
                <div
                  key={`${p.code}-${i}`}
                  className="w-[280px] sm:w-[320px] flex-shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-6 cursor-pointer group/card hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(18,59,109,0.12)] transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#123B6D]/10 text-[#123B6D] font-bold text-lg font-[var(--font-heading)] flex items-center justify-center group-hover/card:bg-[#123B6D] group-hover/card:text-white transition-all">
                      {p.type}
                    </div>
                  </div>
                  <h3 className="font-bold text-[#1E293B] mb-1 font-[var(--font-heading)] truncate">{p.name}</h3>
                  <p className="text-sm font-medium text-[#123B6D] mb-2">{p.code}</p>
                  <p className="text-xs text-[#64748B] mb-4 h-8 line-clamp-2">{p.desc}</p>
                  <div className="flex gap-3 text-xs text-[#94A3B8]">
                    <span>{p.duration}</span>
                    <span>•</span>
                    <span>{p.seats} seats</span>
                  </div>
                  <Link href="/programmes" className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#123B6D] group-hover/card:gap-2 transition-all">
                    Learn More <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-12 mb-6">
              <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Administrative Services</h2>
              <Link href="/administrative-service" className="text-sm font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div ref={adminServicesRef} className="flex gap-5 overflow-x-auto no-scrollbar w-full pb-4 pt-2 cursor-grab active:cursor-grabbing">
              {[...adminServices, ...adminServices].map((s, i) => (
                <div
                  key={`${s.label}-${i}`}
                  className="w-[280px] sm:w-[320px] flex-shrink-0 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-6 cursor-pointer group/card hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(18,59,109,0.12)] hover:bg-white hover:border-[#123B6D]/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] text-[#D4A017] flex items-center justify-center mb-4 group-hover/card:bg-[#D4A017] group-hover/card:text-white group-hover/card:border-transparent transition-all">
                    <s.icon size={22} />
                  </div>
                  <h3 className="font-bold text-[#1E293B] mb-2 font-[var(--font-heading)]">{s.label}</h3>
                  <p className="text-xs text-[#64748B] line-clamp-3">{s.desc}</p>
                  <Link href="/administrative-service" className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#D4A017] group-hover/card:gap-2 transition-all">
                    Access Service <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── CULTURAL COMMITTEE ── */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Cultural Committee</h2>
              <p className="text-sm text-[#64748B] mt-1">Celebrating creativity & talent at MCC — 2025–26 Academic Year</p>
            </div>
            <Link href="/students-corner/gallery?department=Cultural+Forum" className="flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] hover:underline">
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="overflow-hidden w-full group relative">
            <div ref={culturalRef} className="flex gap-5 overflow-x-auto no-scrollbar w-full pb-4 pt-2 cursor-grab active:cursor-grabbing">
              {[...culturalEvents, ...culturalEvents].map((n, i) => (
                <Link
                  key={i}
                  href="/students-corner/gallery?department=Cultural+Forum"
                  className="w-[280px] sm:w-[320px] flex-shrink-0 group/card flex flex-col rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={n.img}
                      alt={n.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#123B6D] tracking-wide shadow-sm">
                        {n.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-bold text-[#1E293B] group-hover/card:text-[#123B6D] transition-colors mb-2 text-lg leading-tight">{n.title}</h4>
                    <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3 mb-4">{n.desc}</p>
                    <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] group-hover/card:gap-2 transition-all">
                      View Details <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── STUDENTS WORK ── */}
        <StudentsWorkSection />

        {/* ── TESTIMONIALS ── */}
        <ScrollReveal>
          <div className="bg-[#123B6D] rounded-3xl p-10">
            <h2 className="text-2xl font-bold text-white font-[var(--font-heading)] text-center mb-10">What Our Alumni Say</h2>
            <div 
              ref={alumniScrollRef}
              className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory md:snap-none no-scrollbar pb-4"
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="flex-shrink-0 w-full md:w-auto snap-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Quote size={28} className="text-[#D4A017] mb-4" />
                  <p className="text-white/90 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D4A017] flex items-center justify-center text-white font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{t.name}</p>
                      <p className="text-white/60 text-xs">{t.course}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
