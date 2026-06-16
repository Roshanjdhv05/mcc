'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Counter from '@/components/ui/Counter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StudentsWorkSection from '@/components/ui/StudentsWorkSection';
import StatsStrip from '@/components/ui/StatsStrip';
import {
  Bell, Search, Download, ChevronRight, Quote,
  Users, BookOpen, Briefcase, Megaphone, ClipboardCheck,
  PenLine, LibraryBig, HeadphonesIcon, FileText, ShieldCheck, Image,
  Bot, CalendarDays, ArrowRight, LayoutDashboard
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

const notices = [
  { tag: 'Urgent', tagColor: 'bg-red-100 text-red-700', time: '2 hours ago', title: 'Final Semester Timetable – Dec 2024', desc: 'The final semester examination timetable for all UG courses has been released.', action: 'Download PDF', icon: Download },
  { tag: 'Admissions', tagColor: 'bg-blue-100 text-blue-700', time: '1 day ago', title: 'FYJC Second Merit List Instructions', desc: 'Students listed in the second merit list are required to submit original documents by Friday.', action: 'Read More', icon: ChevronRight },
  { tag: 'Event', tagColor: 'bg-amber-100 text-amber-700', time: '3 days ago', title: 'Annual Cultural Fest – AURA 2024', desc: 'Join us for the grandest celebration of talent and art. Registration for competitions now open.', action: 'Register Now', icon: ChevronRight },
];

const events = [
  { month: 'OCT', day: '12', title: 'Inter-collegiate Tech Meet', time: '10:00 AM • Main Auditorium', accent: 'bg-blue-50 text-[#123B6D]' },
  { month: 'OCT', day: '15', title: 'Career Counseling Workshop', time: '02:00 PM • Seminar Hall 1', accent: 'bg-amber-50 text-amber-700' },
  { month: 'OCT', day: '18', title: 'Alumni Networking Brunch', time: '11:00 AM • College Lawns', accent: 'bg-cyan-50 text-cyan-700' },
];

const news = [
  {
    tag: 'SPORTS', title: 'MCC wins Zonal Badminton Championship',
    desc: 'Our students showcased exceptional skill at the Mumbai University Zonal meet, securing first place.',
    img: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&q=80',
  },
  {
    tag: 'ACADEMICS', title: 'New Entrepreneurship Cell Launched',
    desc: 'The E-Cell aims to nurture startup ideas by providing mentorship and funding opportunities.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
  },
  {
    tag: 'PLACEMENTS', title: 'Google & Deloitte lead Placement Drive \'24',
    desc: 'This year\'s placement season started with a record-breaking 300+ students placed in the first week.',
    img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80',
  },
];

const programmes = [
  { code: 'FYJC', name: 'Junior College', desc: 'Arts & Commerce streams for Class 11–12', seats: 480, duration: '2 Years' },
  { code: 'BCom', name: 'Bachelor of Commerce', desc: 'Comprehensive commerce education with specializations', seats: 360, duration: '3 Years' },
  { code: 'MCom', name: 'Master of Commerce', desc: 'Advanced commerce with research methodology', seats: 60, duration: '2 Years' },
  { code: 'MSc', name: 'M.Sc. Information Technology', desc: 'Technology-focused master\'s programme', seats: 60, duration: '2 Years' },
];

const testimonials = [
  { name: 'Priya Sharma', course: 'BCom 2023', quote: 'MCC gave me more than a degree — it gave me the confidence to lead. The faculty, events, and environment shaped who I am today.', avatar: 'P' },
  { name: 'Rahul Mehta', course: 'MCom 2022', quote: 'The autonomous curriculum at MCC is a game-changer. The research projects and industry exposure helped me land my dream job at KPMG.', avatar: 'R' },
  { name: 'Sneha Joshi', course: 'FYJC 2021', quote: 'As a FYJC student, the supportive teachers and well-equipped labs made studying enjoyable. I cleared my board exams with distinction!', avatar: 'S' },
];

const heroBanners = [
  {
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80",
    badge: "Admissions 2024–25 Open Now",
    title: <>Welcome to <span className="text-[#D4A017]">Mulund College</span> of Commerce</>,
    desc: "An autonomous institution dedicated to academic excellence, innovation, and holistic student development since 1964."
  },
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80",
    badge: "A Legacy of Excellence",
    title: <>Empowering the <span className="text-[#D4A017]">Leaders</span> of Tomorrow</>,
    desc: "Discover a vibrant campus life, world-class faculty, and outstanding placement opportunities that shape your future."
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80",
    badge: "Join Our Community",
    title: <>Your Journey to <span className="text-[#D4A017]">Success</span> Starts Here</>,
    desc: "Join thousands of successful alumni who have made their mark across the globe. Experience the MCC difference."
  }
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 md:pb-0">
      {/* ── HERO ── */}
      <section className="relative h-[75vh] min-h-[520px] flex items-center overflow-hidden bg-black">
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
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#123B6D]/85 via-[#123B6D]/60 to-[#123B6D]/20 z-10" />
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
                    href="/academics"
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

        {/* ── LATEST NOTICES ── */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Latest Notices</h2>
            <Link href="/notices" className="text-sm font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-2 no-scrollbar">
            {notices.map((n, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(18,59,109,0.1)' }}
                className="flex-shrink-0 w-80 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${n.tagColor}`}>{n.tag}</span>
                  <span className="text-[#94A3B8] text-xs">{n.time}</span>
                </div>
                <h3 className="font-semibold text-[#1E293B] mb-2 font-[var(--font-heading)]">{n.title}</h3>
                <p className="text-sm text-[#64748B] line-clamp-2 mb-4">{n.desc}</p>
                <button className="text-[#123B6D] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  {n.action} <n.icon size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── AI ASSISTANT + STATS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Card */}
          <ScrollReveal className="md:col-span-2">
            <div className="relative bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 overflow-hidden h-full min-h-[280px] flex flex-col justify-between">
              <div className="absolute -right-10 -top-10 w-64 h-64 bg-[#D4A017]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#123B6D] text-white flex items-center justify-center">
                    <Bot size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">MCC Intelligence</h2>
                </div>
                <p className="text-[#64748B] max-w-lg mb-8 leading-relaxed">
                  Get instant answers about attendance, exam schedules, library dues, and more. Your personal academic co-pilot is ready.
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
          </ScrollReveal>

          {/* Stats Cards */}
          <ScrollReveal className="space-y-4">
            {[
              { label: 'Total Students', target: 15000, suffix: '+', bg: 'bg-[#123B6D]', icon: Users },
              { label: 'Courses Offered', target: 48, suffix: '', bg: 'bg-[#D4A017]', icon: BookOpen },
              { label: "Placements '24", target: 920, suffix: '+', bg: 'bg-[#00405b]', icon: Briefcase },
            ].map(({ label, target, suffix, bg, icon: Icon }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.02 }}
                className={`${bg} text-white p-5 rounded-2xl flex items-center justify-between`}
              >
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">{label}</p>
                  <p className="text-2xl font-bold font-[var(--font-heading)]">
                    <Counter target={target} suffix={suffix} />
                  </p>
                </div>
                <Icon size={32} className="opacity-30" />
              </motion.div>
            ))}
          </ScrollReveal>
        </div>

        {/* ── UPCOMING EVENTS + PRINCIPAL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Events */}
          <ScrollReveal className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 h-full">
              <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-6 flex items-center gap-2">
                <CalendarDays size={22} className="text-[#D4A017]" /> Upcoming Events
              </h2>
              <div className="space-y-5">
                {events.map((ev, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${ev.accent} bg-opacity-20 flex flex-col items-center justify-center`}>
                      <span className="text-[10px] font-bold uppercase">{ev.month}</span>
                      <span className="text-xl font-bold leading-tight">{ev.day}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#1E293B]">{ev.title}</p>
                      <p className="text-xs text-[#94A3B8] mt-0.5">{ev.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full py-3 rounded-full border border-[#E2E8F0] text-sm font-semibold text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
                View Full Calendar
              </button>
            </div>
          </ScrollReveal>

          {/* Principal's Message */}
          <ScrollReveal className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col md:flex-row h-full">
              <div className="md:w-2/5 relative h-64 md:h-auto flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&q=80"
                  alt="Principal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <Quote size={40} className="text-[#D4A017] mb-4" />
                <h3 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-4 italic">
                  "Empowering minds, creating leaders."
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                  At Mulund College of Commerce, we strive to provide an environment that fosters intellectual curiosity and personal growth.
                  Our autonomous status allows us to craft a curriculum that meets global standards while nurturing local talent.
                </p>
                <div>
                  <p className="font-bold text-[#123B6D]">Dr. Sonali Mahajan</p>
                  <p className="text-xs text-[#94A3B8]">Principal, MCC (Autonomous)</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── FEATURED PROGRAMMES ── */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Featured Programmes</h2>
            <Link href="/academics" className="text-sm font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programmes.map((p, i) => (
              <motion.div
                key={p.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(18,59,109,0.12)' }}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-6 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#123B6D]/10 text-[#123B6D] font-bold text-lg font-[var(--font-heading)] flex items-center justify-center mb-4 group-hover:bg-[#123B6D] group-hover:text-white transition-all">
                  {p.code.slice(0, 2)}
                </div>
                <h3 className="font-bold text-[#1E293B] mb-1 font-[var(--font-heading)]">{p.code}</h3>
                <p className="text-sm font-medium text-[#123B6D] mb-2">{p.name}</p>
                <p className="text-xs text-[#64748B] mb-4">{p.desc}</p>
                <div className="flex gap-3 text-xs text-[#94A3B8]">
                  <span>{p.duration}</span>
                  <span>•</span>
                  <span>{p.seats} seats</span>
                </div>
                <Link href="/academics" className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#123B6D] group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── NEWS ── */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Featured News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="group cursor-pointer"
              >
                <div className="relative h-52 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={n.img}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#123B6D]">
                      {n.tag}
                    </span>
                  </div>
                </div>
                <h4 className="font-bold text-[#1E293B] font-[var(--font-heading)] group-hover:text-[#123B6D] transition-colors mb-2">{n.title}</h4>
                <p className="text-sm text-[#64748B]">{n.desc}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── STUDENTS WORK ── */}
        <StudentsWorkSection />

        {/* ── TESTIMONIALS ── */}
        <ScrollReveal>
          <div className="bg-[#123B6D] rounded-3xl p-10">
            <h2 className="text-2xl font-bold text-white font-[var(--font-heading)] text-center mb-10">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
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
