'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Counter from '@/components/ui/Counter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { supabase } from '@/lib/supabase';
import type { Notice } from '@/lib/noticeTypes';
import StatsStrip from '@/components/ui/StatsStrip';
import {
  Bell, Search, Download, ChevronRight, Quote,
  Users, BookOpen, Briefcase, Megaphone, ClipboardCheck,
  PenLine, LibraryBig, HeadphonesIcon, FileText, ShieldCheck, Image,
  Bot, CalendarDays, ArrowRight, LayoutDashboard,
  Lightbulb, Activity, MonitorSmartphone, Target, MessagesSquare,
  Train, ArrowRightLeft, Copy, Stamp, LogOut, Award, Shield, CheckCircle2, Globe, X,
  GraduationCap, Calendar, Building2
} from 'lucide-react';

const quickLinks = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, bg: 'bg-indigo-50', iconColor: 'text-indigo-600', hiddenMobile: true },
  { label: 'Notices', href: '/notices', icon: Megaphone, bg: 'bg-blue-50', iconColor: 'text-[#123B6D]' },
  { label: 'Admissions', href: '/admission', icon: ClipboardCheck, bg: 'bg-teal-50', iconColor: 'text-teal-600' },
  { label: 'Exams', href: '/examination', icon: PenLine, bg: 'bg-amber-50', iconColor: 'text-amber-600' },
  { label: 'Library', href: '/library', icon: LibraryBig, bg: 'bg-blue-50', iconColor: 'text-[#123B6D]' },
  { label: 'Services', href: '/services', icon: HeadphonesIcon, bg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
  { label: 'Students Corner', href: '/students-corner', icon: Users, bg: 'bg-gray-100', iconColor: 'text-gray-600' },
  { label: 'Placement', href: '/placement-portal', icon: Briefcase, bg: 'bg-amber-50', iconColor: 'text-amber-700' },
  { label: 'Gallery', href: '/students-corner/gallery', icon: Image, bg: 'bg-blue-50', iconColor: 'text-[#4DA8DA]' },
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

const culturalEvents: Array<{ tag: string; title: string; desc: string; img: string; date?: string | null }> = [
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
  // Commerce
  { code: 'B.Com', name: 'Bachelor of Commerce', desc: 'Comprehensive commerce education with specializations', seats: 600, duration: '3 Years', type: 'UG', time: '7:15 AM – 10:40 AM', color: 'from-[#B45309] to-[#D97706]', href: '/programmes/ug/bcom' },
  { code: 'BAF', name: 'B.Com. (Accounting & Finance)', desc: 'Advanced accounting, taxation & auditing skills', seats: 120, duration: '3 Years', type: 'UG', time: '7:15 AM – 11:40 AM', color: 'from-[#D97706] to-[#F59E0B]', href: '/programmes/ug/baf' },
  { code: 'BBI', name: 'B.Com. (Banking & Insurance)', desc: 'Banking, insurance & risk management', seats: 160, duration: '3 Years', type: 'UG', time: '7:15 AM – 11:40 AM', color: 'from-[#F59E0B] to-[#FCD34D]', href: '/programmes/ug/bbi' },
  { code: 'BFM', name: 'B.Com. (Financial Markets)', desc: 'Stock markets, investment & capital markets', seats: 60, duration: '3 Years', type: 'UG', time: '12:00 PM – 4:30 PM', color: 'from-[#92400E] to-[#B45309]', href: '/programmes/ug/bfm' },
  // Business & Management
  { code: 'BMS', name: 'B.Com. (Management Studies)', desc: 'Leadership, management & business strategy', seats: 120, duration: '3 Years', type: 'UG', time: '12:00 PM – 4:30 PM', color: 'from-[#0D2A4F] to-[#123B6D]', href: '/programmes/ug/bcom-ms' },
  { code: 'BBA', name: 'B.Com. (Business Administration)', desc: 'Business admin, commerce & entrepreneurship', seats: 60, duration: '3 Years', type: 'UG', time: '12:00 PM – 4:30 PM', color: 'from-[#123B6D] to-[#1D4E96]', href: '/programmes/ug/bba' },
  // Science
  { code: 'B.Sc (CS)', name: 'B.Sc. (Computer Science)', desc: 'Programming, algorithms & software development', seats: 120, duration: '3 Years', type: 'UG', time: '7:15 AM – 11:40 AM', color: 'from-[#065F46] to-[#047857]', href: '/programmes/ug/sct/bsc-cs' },
  { code: 'B.Sc (IT)', name: 'B.Sc. (Information Technology)', desc: 'Networks, databases & web technologies', seats: 120, duration: '3 Years', type: 'UG', time: '10:40 AM – 4:15 PM', color: 'from-[#047857] to-[#059669]', href: '/programmes/ug/sct/bsc-it' },
  { code: 'B.Sc (CA)', name: 'B.Sc. (Computer Applications)', desc: 'Computer applications & software engineering', seats: 60, duration: '3 Years', type: 'UG', time: '2:05 PM – 8:10 PM', color: 'from-[#059669] to-[#10B981]', href: '/programmes/ug/sct/bsc-ca' },
  { code: 'B.Sc (DS)', name: 'B.Sc. (Data Science)', desc: 'Data science, ML, analytics & statistics', seats: 60, duration: '3 Years', type: 'UG', time: '2:05 PM – 8:10 PM', color: 'from-[#10B981] to-[#34D399]', href: '/programmes/ug/sct/bsc-ds' },
  // Arts
  { code: 'BA-MMC', name: 'BA (Multimedia & Mass Communication)', desc: 'Media, journalism, digital content & communication', seats: 60, duration: '3 Years', type: 'UG', time: '12:00 PM – 4:30 PM', color: 'from-[#0E7490] to-[#0891B2]', href: '/programmes/ug/bammc' },
  // Apprenticeship
  { code: 'BFSI', name: 'B.Com. BFSI', desc: 'Banking, financial services & insurance apprenticeship', seats: 60, duration: '3 Years', type: 'UG', time: '', color: 'from-[#3730A3] to-[#4F46E5]', href: '/programmes/ug/bfsi' },
  // PG Commerce
  { code: 'M.Com (AA)', name: 'M.Com. (Advanced Accountancy)', desc: 'Advanced accountancy, taxation & auditing', seats: 80, duration: '2 Years', type: 'PG', time: '5:30 PM – 8:30 PM', color: 'from-[#9F1239] to-[#BE123C]', href: '/programmes/pg/mcom-aa' },
  { code: 'M.Com (BM)', name: 'M.Com. (Business Management)', desc: 'Business management, leadership & strategy', seats: 60, duration: '2 Years', type: 'PG', time: '5:30 PM – 8:30 PM', color: 'from-[#BE123C] to-[#E11D48]', href: '/programmes/pg/mcom-bm' },
  { code: 'M.Com (BF)', name: 'M.Com. (Banking & Finance)', desc: 'Banking, finance & financial markets', seats: 60, duration: '2 Years', type: 'PG', time: '5:30 PM – 8:30 PM', color: 'from-[#E11D48] to-[#F43F5E]', href: '/programmes/pg/mcom-bf' },
  // PG Science
  { code: 'M.Sc (IT)', name: 'M.Sc. (Information Technology)', desc: 'Advanced software dev, data science & cloud', seats: 60, duration: '2 Years', type: 'PG', time: '', color: 'from-[#5B21B6] to-[#7C3AED]', href: '/programmes/pg/mscit' },
  { code: 'M.Sc (Finance)', name: 'M.Sc. (Finance)', desc: 'Finance, analytics & corporate finance', seats: 30, duration: '2 Years', type: 'PG', time: '', color: 'from-[#7C3AED] to-[#8B5CF6]', href: '/programmes/pg/msf' },
  // PhD
  { code: 'Ph.D', name: 'Ph.D. in Business Economics', desc: 'Doctoral research in commerce & management', seats: 20, duration: '3–5 Years', type: 'PHD', time: '', color: 'from-[#78350F] to-[#92400E]', href: '/programmes/phd/be' },
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
    title: <>Welcome to <span className="text-[#D4A017]">Mulund College of Commerce</span></>,
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

const wallOfFameStudents = [
  { name: 'Rohan Sharma', rank: 'AIR 12', course: 'CA Final 2024', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
  { name: 'Priya Patel', rank: 'AIR 5', course: 'CMA Final', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80' },
  { name: 'Amit Kumar', rank: 'AIR 18', course: 'CS Professional', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
  { name: 'Sneha Rao', rank: 'AIR 2', course: 'CA Inter 2025', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' },
];

const illustriousAlumni = [
  { 
    name: 'Mandar Phadke',
    course: 'BCOM',
    batch: 'Class of 2008',
    role: 'CFO - Copper',
    company: 'Hinduja Indus, Mumbai',
    linkedin: '#',
    description: 'AIR 1 - CA Final (All India Rank 1)',
    image: '/illustrate alumini/Mandar Dixit.png',
  },
  { 
    name: 'Amit Gupta',
    course: 'BCOM',
    batch: 'Class of 2022',
    role: 'Actuarial',
    company: 'SBI Life Insurance, Mumbai',
    linkedin: '#',
    description: 'Cleared 10/13 Actuarial Exams',
    image: '/illustrate alumini/Amit Gupta.jpg',
  },
  { 
    name: 'Aastha V Doshi',
    course: 'BCOM',
    batch: 'Class of 2022',
    role: 'CA / CS',
    company: 'Alpha Alternates, Mumbai',
    linkedin: '#',
    description: 'AIR 3 - CS (All India Rank 3 in CS)',
    image: '/illustrate alumini/Aastha Dedhiya.png',
  },
  { 
    name: 'Sreejesh Pillai',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Senior Analyst',
    company: 'Citigroup Global, BKC - Mumbai',
    linkedin: '#',
    description: 'AIR 37 - CA (Final)',
    image: '/illustrate alumini/Sreejesh Pillai.jpg',
  },
  { 
    name: 'Kriti Singhi',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Associate',
    company: 'ENK Capital, Mumbai',
    linkedin: '#',
    description: 'AIR 37 - CA (Final)',
    image: '/illustrate alumini/Kriti Singhvi.jpeg',
  },
  { 
    name: 'Parth Gupta',
    course: 'BCOM',
    batch: 'Class of 2021',
    role: 'Junior Associate',
    company: 'McKinsey and Company, Mumbai',
    linkedin: '#',
    description: 'AIR 8 - CA (Final)',
    image: '/illustrate alumini/Parth Gupta.jpg',
  },
  { 
    name: 'Sohan Manjrekar',
    course: 'BCOM',
    batch: 'Class of 2025',
    role: 'Professional',
    company: 'CA Finalist',
    linkedin: '#',
    description: 'AIR 3 - CA (Final)',
    image: '/illustrate alumini/Sohan Manjrekar.jpg',
  },
  { 
    name: 'Shweta S Marathe',
    course: 'BCOM',
    batch: 'Class of 2017',
    role: 'Judicial Trainee',
    company: 'High Court',
    linkedin: '#',
    description: 'AIR 17 - CS',
    image: '/illustrate alumini/SHWETA MARATHE.jpeg',
  },
  { 
    name: 'Rutuja Satam',
    course: 'BCOM',
    batch: 'Class of 2017',
    role: 'Manager',
    company: 'Sec Restaurant',
    linkedin: '#',
    description: 'AIR 5 - CS',
    image: '/illustrate alumini/Rutuja Satam.JPG',
  },
  { 
    name: 'Ameya Joshi',
    course: 'BCOM',
    batch: 'Class of 2017',
    role: 'Program Manager',
    company: 'Williamsburg, VA',
    linkedin: '#',
    description: 'MBA, International Professional',
    image: '/illustrate alumini/Ameya Joshi.jpeg',
  },
  { 
    name: 'Anurag Dhage',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Management Consultant',
    company: 'Mumbai, India',
    linkedin: '#',
    description: 'IIM Kozhikode',
    image: '/illustrate alumini/Anurag Dhage.jpg',
  },
  { 
    name: 'Aishwarya Rajaraman',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Deputy Manager Trust',
    company: 'Mumbai, India',
    linkedin: '#',
    description: 'IIM Ahmedabad',
    image: '/illustrate alumini/Aishwarya Rajaraman.png',
  },
  { 
    name: 'Hariharan Ram',
    course: 'BCOM',
    batch: 'Class of 2008',
    role: 'Assistant Professor',
    company: 'Frankfurt',
    linkedin: '#',
    description: 'US CMA',
    image: '/illustrate alumini/Hariharan R..png',
  },
  { 
    name: 'Rahul Yogesh Pai',
    course: 'BCOM',
    batch: 'Class of 2024',
    role: 'Credit Analyst',
    company: 'Kotak Mahindra, Mumbai',
    linkedin: '#',
    description: 'AIR 40 - CA',
    image: '/illustrate alumini/Rahul Pai.jpg',
  },
  { 
    name: 'Supriya Patil',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Associate Vice President',
    company: 'Tata Capital, Mumbai',
    linkedin: '#',
    description: 'CFA Level 3',
    image: '/illustrate alumini/Supriya Patil.jpeg',
  },
  { 
    name: 'Preethi Shekar',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Director',
    company: 'Deloitte Haskins, Mumbai',
    linkedin: '#',
    description: 'Outstanding Professional Achievement',
    image: '/illustrate alumini/preethi shekar.jpeg',
  },
  { 
    name: 'Nidhi Savla',
    course: 'BCOM',
    batch: 'Class of 2025',
    role: 'Associate',
    company: 'EY, Mumbai',
    linkedin: '#',
    description: 'AIR 40 - CA',
    image: '/illustrate alumini/NIDHI SAVLA.png',
  },
];


function HomepageCalendar() {
  const today = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1-based
  const [filter, setFilter] = useState('All');
  const [selectedDayEvents, setSelectedDayEvents] = useState<{ day: number; events: any[] } | null>(null);
  const [liveCalEvents, setLiveCalEvents] = useState<{ date: string; title: string; type: string }[]>([]);

  // Fetch calendar events from Supabase (events table)
  useEffect(() => {
    const fetchAll = async () => {
      // 1. From events table
      const { data: evData } = await supabase
        .from('events')
        .select('title, calendar_date, calendar_type')
        .eq('publish_calendar', true)
        .eq('status', 'published')
        .not('calendar_date', 'is', null);

      // 2. From notices table (calendar-tagged notices)
      const { data: noticeData } = await supabase
        .from('notices')
        .select('calendar_title, calendar_date, calendar_category, calendar_venue, calendar_time')
        .eq('publish_calendar', true)
        .not('calendar_date', 'is', null);

      const merged: { date: string; title: string; type: string; venue?: string; time?: string }[] = [];
      if (evData) {
        evData.forEach((e: any) => merged.push({ date: e.calendar_date, title: e.title, type: e.calendar_type || 'Event' }));
      }
      if (noticeData) {
        noticeData.forEach((n: any) => merged.push({
          date: n.calendar_date,
          title: n.calendar_title,
          type: n.calendar_category || 'Event',
          venue: n.calendar_venue,
          time: n.calendar_time,
        }));
      }
      setLiveCalEvents(merged);
    };
    fetchAll();
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
    let currentScroll = direction === 'x' ? el.scrollLeft : el.scrollTop;

    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHovered.current && !isInteracting.current) {
        if (direction === 'x') {
          currentScroll += speed * (delta / 16);
          // Loop logic for duplicated content
          if (speed > 0 && currentScroll >= el.scrollWidth / 2) {
            currentScroll -= el.scrollWidth / 2;
          } else if (speed < 0 && currentScroll <= 0) {
            currentScroll += el.scrollWidth / 2;
          }
          el.scrollLeft = currentScroll;
        } else {
          currentScroll += speed * (delta / 16);
          if (speed > 0 && currentScroll >= el.scrollHeight / 2) {
            currentScroll -= el.scrollHeight / 2;
          } else if (speed < 0 && currentScroll <= 0) {
            currentScroll += el.scrollHeight / 2;
          }
          el.scrollTop = currentScroll;
        }
      } else {
        // Sync our internal counter if user manually scrolls
        currentScroll = direction === 'x' ? el.scrollLeft : el.scrollTop;
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
  const [liveBanners, setLiveBanners] = useState<{
    image: string;
    fit: 'object-cover';
    badge: string;
    title: React.ReactNode;
    desc: string;
    keepOverlay?: boolean;
    buttonText?: string;
    buttonLink?: string;
  }[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [liveEvents, setLiveEvents] = useState<{title: string; tag: string; desc: string; img: string; date?: string | null}[]>([]);
  const [liveCulturalEvents, setLiveCulturalEvents] = useState<{title: string; tag: string; desc: string; img: string; date?: string | null}[]>([]);
  const alumniScrollRef = useRef<HTMLDivElement>(null);
  const illustriousScrollRef = useRef<HTMLDivElement>(null);
  const adminServicesAutoRef = useRef<HTMLDivElement>(null);

  const latestEventsRef = useMarqueeScroll(1);
  const latestNoticesRef = useMarqueeScroll(0.8, 'y');
  const programmesRef = useMarqueeScroll(-1.2);
  const culturalRef = useMarqueeScroll(1);

  // Admin Services: auto-slide right-to-left, one card every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      const el = adminServicesAutoRef.current;
      if (!el) return;
      const cardWidth = (el.firstElementChild as HTMLElement)?.offsetWidth || 320;
      const gap = 20; // gap-5 = 1.25rem = 20px
      const scrollAmount = cardWidth + gap;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (illustriousScrollRef.current) {
        const { scrollLeft: aLeft, scrollWidth: aWidth, clientWidth: aClient } = illustriousScrollRef.current;
        if (aLeft + aClient >= aWidth - 10) {
          illustriousScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by the width of one card (plus gap). For simplicity, scrolling by client width / 3 on desktop works,
          // but scrolling by client width is also fine. To scroll one card at a time smoothly:
          // A single card is roughly clientWidth / 3 on large screens. 
          // Let's scroll by the width of one card if possible, otherwise client width.
          const cardWidth = illustriousScrollRef.current.firstElementChild?.clientWidth || aClient;
          // Add gap of 24px (gap-6 is 1.5rem = 24px)
          const scrollAmount = cardWidth + 24;
          illustriousScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchBanners() {
      const now = new Date().toISOString();
      const { data } = await supabase
        .from('home_banners')
        .select('*')
        .or(`expiry_date.is.null,expiry_date.gte.${now}`)
        .order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setLiveBanners(data.map((b: any) => ({
          image: b.image_url,
          fit: 'object-cover' as const,
          badge: b.title,
          title: b.title,
          desc: b.short_info || '',
          keepOverlay: b.keep_black_overlay,
          buttonText: b.button_text || null,
          buttonLink: b.button_link || null,
        })));
      }
    }
    fetchBanners();
  }, []);

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
    async function fetchLiveEvents() {
      // Only show events published in the last 90 days on homepage
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      const { data } = await supabase
        .from('events')
        .select('title, description, category, images, published_at, calendar_date')
        .eq('publish_home', true)
        .eq('status', 'published')
        .gte('published_at', ninetyDaysAgo.toISOString())
        .order('published_at', { ascending: false })
        .limit(12);
      if (data && data.length > 0) {
        const formatted = data.map((e: { title: string; description: string; category: string; images: string[]; published_at: string; calendar_date: string | null }) => ({
          title: e.title,
          tag: e.category || 'Event',
          desc: e.description || '',
          img: (e.images && e.images[0]) || '/2025 - 2026/Friendship Day (1).jpg',
          date: e.calendar_date,
        }));
        setLiveEvents(formatted);
      }
    }
    fetchLiveEvents();
  }, []);

  // ── Fetch live Cultural Committee events (last 90 days, auto-vanish after)
  // Matches: publish_home=true AND (category contains 'cultural' OR department = 'Cultural Forum')
  useEffect(() => {
    async function fetchLiveCulturalEvents() {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      const { data } = await supabase
        .from('events')
        .select('title, description, category, department, images, published_at, calendar_date')
        .eq('publish_gallery', true)
        .eq('status', 'published')
        .gte('published_at', ninetyDaysAgo.toISOString())
        .order('published_at', { ascending: false })
        .limit(12);
      if (data && data.length > 0) {
        const formatted = data.map((e: { title: string; description: string; category: string; department: string; images: string[]; published_at: string; calendar_date: string | null }) => ({
          title: e.title,
          tag: e.category || 'Cultural',
          desc: e.description || '',
          img: (e.images && e.images[0]) || '/2025 - 2026/Friendship Day (1).jpg',
          date: e.calendar_date,
        }));
        setLiveCulturalEvents(formatted);
      }
    }
    fetchLiveCulturalEvents();
  }, []);

  // Merge: new live events (front) + permanent hardcoded (back), dedup by title
  const mergedCulturalEvents = [
    ...liveCulturalEvents,
    ...culturalEvents.filter(
      (ce) => !liveCulturalEvents.some((le) => le.title.toLowerCase() === ce.title.toLowerCase())
    ),
  ];

  // Use live events if available, else fall back to hardcoded
  const displayEvents = liveEvents.length > 0 ? liveEvents : culturalEvents;
  const hasEnoughEvents = displayEvents.length >= 3;

  const demoNotices = [
    { id: 1, title: 'Semester Start — July 2026', description: 'All UG and PG programmes commence from 1st July 2026.', categories: ['Academics'], is_general: false, schedule_time: new Date().toISOString(), expiry_time: '' },
    { id: 2, title: 'Internal Test Schedule Released', description: 'Refer to the notice board for subject-wise internal test dates.', categories: ['Examinations'], is_general: true, schedule_time: new Date(Date.now() - 86400000).toISOString(), expiry_time: '' },
    { id: 3, title: 'Sports Day Registration Open', description: 'Students can register for Sports Day events at the college office.', categories: ['Sports'], is_general: false, schedule_time: new Date(Date.now() - 2 * 86400000).toISOString(), expiry_time: '' },
    { id: 4, title: 'Scholarship Applications Invited', description: 'EBC and government scholarships — apply before 31st July.', categories: ['Scholarships'], is_general: true, schedule_time: new Date(Date.now() - 3 * 86400000).toISOString(), expiry_time: '' },
  ];
  const displayNotices = notices.length > 0 ? notices : demoNotices;
  const hasEnoughNotices = displayNotices.length >= 4;

  // Always show the default welcome banner first, then append live DB banners after it
  const defaultBanner = {
    ...heroBanners[0],
    keepOverlay: true,
    buttonText: null as string | null,
    buttonLink: null as string | null,
  };
  const displayBanners = [defaultBanner, ...liveBanners];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % displayBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayBanners.length]);

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
              src={displayBanners[currentBanner % displayBanners.length]?.image}
              alt="MCC Campus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className={`absolute inset-0 w-full h-full ${displayBanners[currentBanner % displayBanners.length]?.fit}`}
            />
          </AnimatePresence>
          {displayBanners[currentBanner % displayBanners.length]?.keepOverlay !== false && (
            <div className="absolute inset-0 bg-black/40 z-10" />
          )}
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
                {displayBanners[currentBanner % displayBanners.length]?.badge}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight font-[var(--font-heading)]">
                {displayBanners[currentBanner % displayBanners.length]?.title}
              </h1>
              <p className="text-white/85 text-lg md:text-xl mb-8 leading-relaxed">
                {displayBanners[currentBanner % displayBanners.length]?.desc}
              </p>
              <div className="flex flex-wrap gap-4 justify-start">
                {/* Dynamic CTA button if set, else show default buttons ONLY on the first banner */}
                {displayBanners[currentBanner % displayBanners.length]?.buttonText && displayBanners[currentBanner % displayBanners.length]?.buttonLink ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={displayBanners[currentBanner % displayBanners.length]!.buttonLink!}
                      className="px-8 py-3.5 bg-[#D4A017] text-white font-semibold rounded-xl hover:bg-[#b8891a] transition-all shadow-lg shadow-[#D4A017]/30 flex items-center gap-2"
                    >
                      {displayBanners[currentBanner % displayBanners.length]!.buttonText} <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                ) : (currentBanner % displayBanners.length === 0) ? (
                  <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="#"
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
                  </>
                ) : null}
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
                <Link href="/students-corner/gallery" className="text-xs font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ArrowRight size={12} />
                </Link>
              </div>

              <div className="overflow-hidden w-full group pb-5 px-2">
                <div ref={hasEnoughEvents ? latestEventsRef : null} className={`flex gap-4 overflow-x-auto no-scrollbar w-full ${hasEnoughEvents ? 'cursor-grab active:cursor-grabbing' : ''}`}>
                  {(hasEnoughEvents ? [...displayEvents, ...displayEvents] : displayEvents).map((ev, i) => (
                    <Link
                      key={i}
                      href="/students-corner/gallery"
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
                      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
                        <h4 className="font-bold text-[#1E293B] text-sm sm:text-base leading-snug line-clamp-2 font-[var(--font-heading)]">{ev.title}</h4>
                        {ev.date && (
                          <div className="text-xs font-semibold text-[#64748B] mt-2 flex items-center gap-1.5">
                            <Calendar size={13} className="text-[#123B6D]" /> 
                            {new Date(ev.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        )}
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

              {/* Infinite upward scroll container */}
              <div className="h-[300px] relative overflow-hidden group">
                <style>{`
                  @keyframes noticesScrollUp {
                    0%   { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                  }
                  .notices-marquee {
                    animation: noticesScrollUp 18s linear infinite;
                  }
                  .notices-marquee:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                <div className={`${hasEnoughNotices ? 'notices-marquee' : ''} flex flex-col gap-3 px-4 pb-4`}>
                  {/* Render items twice for seamless loop if there are enough notices */}
                  {(hasEnoughNotices ? [...displayNotices, ...displayNotices] : displayNotices).map((n: any, i: number) => {
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
                {/* Fade mask top & bottom */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
              </div>
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


        {/* ── ACADEMIC CALENDAR ── */}
        <ScrollReveal>
          <HomepageCalendar />
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
              {[...mergedCulturalEvents, ...mergedCulturalEvents].map((n, i) => (
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
                    {n.date && (
                      <div className="text-xs font-semibold text-[#64748B] mb-2 flex items-center gap-1.5">
                        <Calendar size={13} className="text-[#123B6D]" /> 
                        {new Date(n.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    )}
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
                <Link
                  key={`${p.code}-${i}`}
                  href={p.href}
                  className="w-[260px] sm:w-[300px] flex-shrink-0 bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden cursor-pointer group/card hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(18,59,109,0.15)] transition-all duration-300 flex flex-col"
                >
                  {/* Coloured Header */}
                  <div className={`bg-gradient-to-br ${p.color} px-5 pt-5 pb-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{p.type}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">{p.duration}</span>
                    </div>
                    <h3 className="font-black text-xl leading-tight font-[var(--font-heading)]">{p.code}</h3>
                    <p className="text-white/85 text-xs font-medium mt-1 leading-snug line-clamp-2">{p.name}</p>
                  </div>
                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-[#64748B] mb-4 line-clamp-2 flex-1">{p.desc}</p>
                    <div className="flex flex-col gap-1.5 text-xs text-[#94A3B8] border-t border-[#F1F5F9] pt-3">
                      <div className="flex items-center gap-1.5">
                        <Users size={11} className="shrink-0" />
                        <span className="font-semibold text-[#64748B]">{p.seats} seats</span>
                      </div>
                      {p.time && (
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={11} className="shrink-0" />
                          <span>{p.time}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#123B6D] group-hover/card:gap-2 transition-all">
                      Learn More <ArrowRight size={11} className="group-hover/card:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between mt-12 mb-6">
              <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Administrative Services</h2>
              <Link href="/administrative-service" className="text-sm font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div ref={adminServicesAutoRef} className="flex gap-5 overflow-x-auto no-scrollbar w-full pb-4 pt-2">
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

        {/* ── ILLUSTRIOUS ALUMNI ── */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Illustrious Alumni</h2>
              <p className="text-sm text-[#64748B] mt-1">Celebrating our prominent alumni and their career achievements</p>
            </div>
            <Link href="/alumni" className="text-sm font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div ref={illustriousScrollRef} className="flex gap-6 w-full overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing">
            {illustriousAlumni.map((student, i) => (
              <div key={i} className="flex-shrink-0 w-[calc(100vw-3rem)] sm:w-[calc(50vw-2rem)] lg:w-[calc(33.333%-1rem)] h-[440px] snap-center bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all">
                {/* Top Section */}
                <div className="flex gap-4 sm:gap-6 mb-5">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-gray-200 shadow-sm bg-gray-50">
                    <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1 justify-center flex-1">
                    <h3 className="font-bold text-[#123B6D] text-lg leading-tight">{student.name}</h3>
                    <div className="flex items-start gap-2 text-[13px] text-gray-600">
                      <GraduationCap size={14} className="text-[#D4A017] shrink-0 mt-0.5" />
                      <span className="leading-snug">{student.course}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[13px] text-gray-600">
                      <Calendar size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{student.batch}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[13px] font-semibold text-gray-700">
                      <Briefcase size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{student.role}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[13px] text-gray-500">
                      <Building2 size={14} className="text-gray-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{student.company}</span>
                    </div>
                  </div>
                </div>

                {/* LinkedIn Button */}
                <a href={student.linkedin} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-blue-200 bg-blue-50/50 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors mb-4 shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  View on LinkedIn
                </a>

                {/* Description Box */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex-1 overflow-y-auto no-scrollbar">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {student.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        <ScrollReveal>
          <div className="bg-[#123B6D] rounded-3xl p-10">
            <h2 className="text-2xl font-bold text-white font-[var(--font-heading)] text-center mb-10">Testimonial</h2>
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
