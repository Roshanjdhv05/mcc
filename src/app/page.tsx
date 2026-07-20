'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Counter from '@/components/ui/Counter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StudentsWorkSection from '@/components/ui/StudentsWorkSection';
import StatsStrip from '@/components/ui/StatsStrip';
import {
  Bell, Search, Download, ChevronRight, Quote,
  Users, BookOpen, Briefcase, Megaphone, ClipboardCheck,
  PenLine, LibraryBig, HeadphonesIcon, FileText, ShieldCheck, Image,
  Bot, CalendarDays, ArrowRight, LayoutDashboard,
  Lightbulb, Activity, MonitorSmartphone, Target, MessagesSquare,
  Train, ArrowRightLeft, Copy, Stamp, LogOut, Award, Shield, CheckCircle2, Globe
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

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const alumniScrollRef = useRef<HTMLDivElement>(null);

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
            <Link href="/academics" className="text-sm font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-hidden w-full group relative">
            {/* Gradient masks for smooth fading at edges */}
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
            
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
            
            <div className="flex gap-5 animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused] w-max pb-4 pt-2">
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
                  <Link href="/academics" className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#123B6D] group-hover/card:gap-2 transition-all">
                    Learn More <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 mb-2">
              <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A017] inline-block" />
                Administrative Services
              </span>
              <Link href="/administrative-service" className="text-xs font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight size={12} />
              </Link>
            </div>

            <style>{`
              @keyframes marquee-reverse {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
              }
            `}</style>

            <div className="flex gap-5 animate-[marquee-reverse_30s_linear_infinite] group-hover:[animation-play-state:paused] w-max pb-4 pt-2">
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
            <Link href="/students-corner/cultural-forum" className="flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] hover:underline">
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="overflow-hidden w-full group relative">
            {/* Gradient fade masks */}
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

            <style>{`
              @keyframes home-cultural-marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
            `}</style>

            <div className="flex gap-5 animate-[home-cultural-marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] w-max pb-4 pt-2">
              {[...culturalEvents, ...culturalEvents].map((n, i) => (
                <Link
                  key={i}
                  href="/students-corner/cultural-forum"
                  className="w-[280px] sm:w-[300px] flex-shrink-0 group/card flex flex-col rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm hover:shadow-[0_20px_40px_rgba(18,59,109,0.12)] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={n.img}
                      alt={n.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#123B6D] uppercase tracking-wide">
                        {n.tag}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-bold text-[#1E293B] font-[var(--font-heading)] group-hover/card:text-[#123B6D] transition-colors mb-1.5 text-sm leading-snug">{n.title}</h4>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">{n.desc}</p>
                    <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#123B6D] group-hover/card:gap-1.5 transition-all">
                      View Details <ArrowRight size={12} />
                    </span>
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
