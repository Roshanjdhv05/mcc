'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'IQAC', href: '#', sub: [
      { label: 'IQAC', href: '/iqac' },
      { label: 'NAAC', href: '/naac' },
      { label: 'NIRF', href: '/nirf' },
    ]
  },
  {
    label: 'About Us', href: '#', sub: [
      { label: 'Vision-Mission', href: '/about/vision-mission' },
      { label: 'PTVA Trust', href: '/about/ptva-trust' },
      { label: 'Board of Trustees', href: '/about/board-of-trustees' },
      { label: "Principal's Desk", href: '/principal' },
      { label: 'Organogram', href: '/about/organogram' },
      { label: 'Code of Conduct', href: '/about/code-of-conduct' },
      { 
        label: 'College Development Committee', href: '/about/college-development-committee', sub: [
          { label: 'Members (Year Wise)', href: '/about/cdc-members' },
          { label: 'Minutes of the meeting', href: '/about/cdc-minutes' }
        ]
      },
      { label: 'Our Other Institutions', href: '/about/other-institutions' },
    ]
  },
  {
    label: 'Programmes', href: '#', sub: [
      {
        label: 'Under Graduate', href: '/programmes/undergraduate', sub: [
          { label: 'B.Com (MS)', href: '/programmes/ug/bcom-ms' },
          { label: 'B.Com (BA)', href: '/programmes/ug/bcom-ba' },
          { label: 'B.A (MMC)', href: '/programmes/ug/ba-mmc' },
          { 
            label: 'SCT', href: '/programmes/ug/sct', sub: [
              { label: 'B.Sc (CS)', href: '/programmes/ug/sct/bsc-cs' },
              { label: 'B.Sc (IT)', href: '/programmes/ug/sct/bsc-it' },
              { label: 'B.Sc. (DS)', href: '/programmes/ug/sct/bsc-ds' },
              { label: 'B.Sc. (CA)', href: '/programmes/ug/sct/bsc-ca' },
            ] 
          },
          { label: 'B.Com', href: '/programmes/ug/bcom' },
          { label: 'BAF', href: '/programmes/ug/baf' },
          { label: 'BBI', href: '/programmes/ug/bbi' },
          { label: 'BFM', href: '/programmes/ug/bfm' },
          { label: 'BFSI', href: '/programmes/ug/bfsi' },
        ]
      },
      {
        label: 'Post Graduate', href: '/programmes/post-graduate', sub: [
          { label: 'M.Com (AA)', href: '/programmes/pg/mcom-aa' },
          { label: 'M.Com (BM)', href: '/programmes/pg/mcom-bm' },
          { label: 'M.Com (BF)', href: '/programmes/pg/mcom-bf' },
          { label: 'MSF', href: '/programmes/pg/msf' },
          { label: 'M.Sc. (IT)', href: '/programmes/pg/msc-it' },
        ]
      },
      {
        label: 'PHD Programmes', href: '/programmes/phd', sub: [
          { label: 'PhD (BE)', href: '/programmes/phd/be' }
        ]
      },
    ]
  },
  {
    label: 'Jr. College', href: '#', sub: [
      { label: 'Teaching Staff', href: '/jr-college/teaching-staff' },
      { label: 'Result Analysis', href: '/jr-college/result-analysis' },
      { label: 'SMAF/Scholarship/Freeship', href: '/jr-college/scholarships' },
      { label: 'Notice', href: '/jr-college/notice' },
      { label: 'Timetable', href: '/jr-college/timetable' },
      { label: 'Sports', href: '/jr-college/sports' },
      { label: 'Cultural', href: '/jr-college/cultural' },
      { label: 'Committee', href: '/jr-college/committee' },
      { label: 'Special Days', href: '/jr-college/special-days' },
    ]
  },
  { label: 'Cultural Committee', href: '/cultural-committee' },
  {
    label: 'Accreditation & Rankings', href: '#', sub: [
      { label: '2 B – Certificate', href: '/accreditation/2b-certificate' },
      { label: '12 F – Certificate', href: '/accreditation/12f-certificate' },
      { 
        label: 'NAAC', href: '#', sub: [
          { label: 'Certificates of Accreditations', href: '/accreditation/naac/certificates' }
        ]
      },
      {
        label: 'NIRF', href: '#', sub: [
          { label: 'Annual Submissions', href: '/accreditation/nirf/annual-submissions' }
        ]
      },
      {
        label: 'AISHE', href: '#', sub: [
          { label: 'Annual Submissions', href: '/accreditation/aishe/annual-submissions' }
        ]
      },
      {
        label: 'Autonomous HEI', href: '#', sub: [
          { label: 'Grant of Autonomy (Certificate)', href: '/accreditation/autonomous/grant' },
          {
            label: 'Board of Studies', href: '#', sub: [
              { label: 'Members (Year Wise)', href: '/accreditation/autonomous/bos/members' },
              { label: 'Minutes of the meeting', href: '/accreditation/autonomous/bos/minutes' }
            ]
          },
          {
            label: 'Academic Council', href: '#', sub: [
              { label: 'Members (Year Wise)', href: '/accreditation/autonomous/academic-council/members' },
              { label: 'Minutes of the meeting', href: '/accreditation/autonomous/academic-council/minutes' }
            ]
          },
          {
            label: 'Finance Committee', href: '#', sub: [
              { label: 'Members (Year Wise)', href: '/accreditation/autonomous/finance-committee/members' },
              { label: 'Minutes of the meeting', href: '/accreditation/autonomous/finance-committee/minutes' }
            ]
          },
          {
            label: 'Governing Body', href: '#', sub: [
              { label: 'Members (Year Wise)', href: '/accreditation/autonomous/governing-body/members' },
              { label: 'Minutes of the meeting', href: '/accreditation/autonomous/governing-body/minutes' }
            ]
          }
        ]
      }
    ]
  },
  { label: 'Library', href: '/library' },
  {
    label: 'More', href: '#', sub: [
      { label: "Students' Corner", href: '/students-corner' },
      { label: "Junior College Corner", href: '/junior-college-corner' },
      {
        label: 'College Festivals & Event', href: '#', sub: [
          { label: 'Spectrum', href: '/festivals/spectrum' },
          { label: 'Inspira (Department of Management Studies)', href: '/festivals/inspira' },
          { label: 'Technobeat (Department of Science and Computer Technology)', href: '/festivals/technobeat' },
          { label: 'Maths’ Wonder (Computer Science)', href: '/festivals/maths-wonder' },
          { label: 'Oikonomania (Economics Club)', href: '/festivals/oikonomania' },
          { label: 'Quantomania (Department of Mathematics)', href: '/festivals/quantomania' },
          { label: 'Commerce Festival', href: '/festivals/commerce' },
          { label: 'Accountancy Festival', href: '/festivals/accountancy' },
          { label: 'My Marathi, Mai Marathi', href: '/festivals/marathi' },
          { label: 'Rasikotsav', href: '/festivals/rasikotsav' },
          { label: 'Annual Day', href: '/festivals/annual-day' },
        ]
      },
      { label: 'Research', href: '/research' },
      {
        label: "Students' Achievements", href: '#', sub: [
          {
            label: 'Professional Courses', href: '/achievements/professional-courses', sub: [
              { label: 'About', href: '/achievements/professional-courses/about' },
              { label: 'All India Rank Holders', href: '/achievements/professional-courses/rank-holders' },
            ]
          },
          { label: 'Cultural', href: '/achievements/cultural' },
          { label: 'Youth Festival', href: '/achievements/youth-festival' },
          { label: 'Theatre (Natyakarmi)', href: '/achievements/theatre' },
          { label: 'Sports', href: '/achievements/sports' },
          { label: 'Research', href: '/achievements/research' },
          { label: 'Entrepreneurship', href: '/achievements/entrepreneurship' },
        ]
      },
      { label: 'Placement Portal', href: '/placement-portal' },
      { label: 'Alumni', href: '/alumni' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Contact', href: '/contact' },
    ]
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileOpenDrop, setMobileOpenDrop] = useState<string | null>(null);
  const [nestedMobileDrop, setNestedMobileDrop] = useState<string | null>(null);
  const [nestedMobileDrop3, setNestedMobileDrop3] = useState<string | null>(null);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const [menuDirection, setMenuDirection] = useState<Record<string, 'left' | 'right'>>({});

  const handleMenuEnter = (e: React.MouseEvent, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.right + 220 > window.innerWidth) {
      setMenuDirection(prev => ({ ...prev, [id]: 'left' }));
    } else {
      setMenuDirection(prev => ({ ...prev, [id]: 'right' }));
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-md border-b border-white/30'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 h-20 gap-2 lg:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 lg:gap-3 shrink-0">
            <img src="/mcclogo.jpg" alt="MCC Logo" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain" />
            <div className="flex flex-col items-start justify-center text-left">
              <span className="text-[#123B6D] font-semibold text-[8px] sm:text-[9px] md:text-[11px] leading-tight font-[var(--font-heading)] whitespace-nowrap">Parle Tilak Vidyalaya Association's</span>
              <span className="text-[#123B6D] font-bold text-[9px] sm:text-[11px] md:text-[13px] leading-tight font-[var(--font-heading)] whitespace-nowrap uppercase">Mulund College of Commerce</span>
              <span className="text-[#123B6D] font-semibold text-[8px] sm:text-[9px] md:text-[11px] leading-tight font-[var(--font-heading)] whitespace-nowrap">(Autonomous)</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group shrink-0" onMouseEnter={(e) => handleMenuEnter(e, link.label)}>
                {link.sub ? (
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-medium text-[#1E293B] hover:text-[#123B6D] rounded-lg hover:bg-[#123B6D]/5 transition-all whitespace-nowrap"
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="relative px-2 xl:px-3 py-2 text-sm font-medium text-[#1E293B] hover:text-[#123B6D] rounded-lg hover:bg-[#123B6D]/5 transition-all group whitespace-nowrap"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A017] group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                )}
                {link.sub && (
                  <div
                    className={`absolute top-full pt-2 hidden group-hover:block min-w-[200px] ${menuDirection[link.label] === 'left' ? 'right-0' : 'left-0'}`}
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    <div className="bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-xl py-2">
                      {link.sub.map((s) => (
                        s.sub ? (
                          <div key={s.label} className="relative w-full group/nested" onMouseEnter={(e) => handleMenuEnter(e, s.label)}>
                            <Link href={s.href} className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#1E293B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors cursor-pointer">
                              {s.label}
                              <ChevronDown size={14} className={`text-[#94A3B8] transition-transform ${menuDirection[s.label] === 'left' ? 'rotate-90' : '-rotate-90'}`} />
                            </Link>
                            <div className={`absolute top-0 hidden group-hover/nested:block min-w-[200px] ${menuDirection[s.label] === 'left' ? 'right-full pr-1' : 'left-full pl-1'}`}>
                              <div className="bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-xl py-1">
                                {s.sub.map((ss, idx) => (
                                  ss.sub ? (
                                    <div key={ss.label + idx} className="relative w-full group/nested-3" onMouseEnter={(e) => handleMenuEnter(e, ss.label)}>
                                      <Link href={ss.href} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors cursor-pointer">
                                        {ss.label}
                                        <ChevronDown size={14} className={`text-[#94A3B8] transition-transform ${menuDirection[ss.label] === 'left' ? 'rotate-90' : '-rotate-90'}`} />
                                      </Link>
                                      <div className={`absolute top-0 hidden group-hover/nested-3:block min-w-[200px] z-10 ${menuDirection[ss.label] === 'left' ? 'right-full pr-1' : 'left-full pl-1'}`}>
                                        <div className="bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden py-1">
                                          {ss.sub.map((sss, sssIdx) => (
                                            <Link key={sss.label + sssIdx} href={sss.href} className="block px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors">
                                              {sss.label}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <Link key={ss.label + idx} href={ss.href} className="block px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors">
                                      {ss.label}
                                    </Link>
                                  )
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={s.label}
                            href={s.href}
                            className="flex items-center px-4 py-3 text-sm text-[#1E293B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                          >
                            {s.label}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link href="/search" className="w-9 h-9 rounded-full flex items-center justify-center text-[#123B6D] hover:bg-[#123B6D]/10 transition-colors">
              <Search size={18} />
            </Link>
            <div className="relative">
              <button 
                className={`w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors relative ${hasUnread ? '' : 'text-[#123B6D]'}`}
                onClick={() => {
                  setNoticesOpen(!noticesOpen);
                  if(hasUnread) setHasUnread(false);
                }}
              >
                <motion.div
                  animate={hasUnread ? { 
                    rotate: [0, -20, 20, -20, 20, 0], 
                    color: ['#ef4444', '#eab308', '#ef4444'] 
                  } : { color: 'currentColor' }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  style={{ transformOrigin: "top center" }}
                >
                  <Bell size={18} />
                </motion.div>
                {hasUnread && (
                  <span className="absolute top-[6px] right-[6px] w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              <AnimatePresence>
                {noticesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full -right-12 sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden z-50 origin-top-right"
                  >
                    <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50">
                      <h3 className="font-bold text-[#1E293B] text-sm">Notifications</h3>
                      <Link href="/notices" onClick={() => setNoticesOpen(false)} className="text-xs text-[#123B6D] font-semibold hover:underline">
                        View All
                      </Link>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                      {[
                        { id: 1, title: 'Final Semester Timetable Released', time: '2 hours ago', unread: true },
                        { id: 2, title: 'Holiday declared on Friday due to heavy rains', time: '1 day ago', unread: false },
                        { id: 3, title: 'Admissions Open for 2024-25', time: '2 days ago', unread: false },
                        { id: 4, title: 'New Scholarship Guidelines Uploaded', time: '4 days ago', unread: false },
                      ].map((n) => (
                        <Link 
                          href="/notices" 
                          key={n.id} 
                          onClick={() => setNoticesOpen(false)}
                          className={`block p-4 border-b border-[#E2E8F0] hover:bg-slate-50 transition-colors ${n.unread ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <p className="text-sm font-semibold text-[#1E293B] mb-1 leading-tight">{n.title}</p>
                            {n.unread && <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0 animate-pulse" />}
                          </div>
                          <p className="text-xs text-[#64748B]">{n.time}</p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#123B6D] hover:bg-[#123B6D]/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-[60] bg-white shadow-2xl overflow-y-auto flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <img src="/mcclogo.jpg" alt="MCC Logo" className="w-12 h-12 object-contain" />
                  <span className="text-[#123B6D] font-bold text-sm">Menu</span>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E293B] hover:bg-[#123B6D]/5"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.sub ? (
                    <button
                      className="flex items-center w-full px-4 py-3 text-[#1E293B] font-medium rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors text-left"
                      onClick={() => setMobileOpenDrop(mobileOpenDrop === link.label ? null : link.label)}
                    >
                      <span className="flex-1 text-left">{link.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 shrink-0 ${mobileOpenDrop === link.label ? 'rotate-180 text-[#123B6D]' : ''}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-[#1E293B] font-medium rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                  <AnimatePresence>
                    {link.sub && mobileOpenDrop === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 space-y-1 py-1 border-l-2 border-[#EBF3FF] pl-2">
                          {link.sub.map((s) => (
                            s.sub ? (
                              <div key={s.label}>
                                <button
                                  className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-[#123B6D] hover:bg-[#123B6D]/5 rounded-xl transition-colors text-left"
                                  onClick={() => setNestedMobileDrop(nestedMobileDrop === s.label ? null : s.label)}
                                >
                                  <span className="flex-1 text-left">{s.label}</span>
                                  <ChevronDown size={14} className={`transition-transform duration-200 shrink-0 ${nestedMobileDrop === s.label ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                  {nestedMobileDrop === s.label && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="ml-4 space-y-1 py-1 border-l-2 border-[#E2E8F0] pl-2">
                                        {s.sub.map((ss, idx) => (
                                          ss.sub ? (
                                            <div key={ss.label + idx}>
                                              <button
                                                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-[#64748B] hover:bg-[#123B6D]/5 rounded-xl transition-colors text-left"
                                                onClick={() => setNestedMobileDrop3(nestedMobileDrop3 === ss.label ? null : ss.label)}
                                              >
                                                <span className="flex-1 text-left">{ss.label}</span>
                                                <ChevronDown size={14} className={`transition-transform duration-200 shrink-0 ${nestedMobileDrop3 === ss.label ? 'rotate-180' : ''}`} />
                                              </button>
                                              <AnimatePresence>
                                                {nestedMobileDrop3 === ss.label && (
                                                  <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                  >
                                                    <div className="ml-4 space-y-1 py-1 border-l-2 border-[#E2E8F0] pl-2">
                                                      {ss.sub.map((sss, sssIdx) => (
                                                        <Link
                                                          key={sss.label + sssIdx}
                                                          href={sss.href}
                                                          className="block px-4 py-2 text-sm text-[#64748B] rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                                                          onClick={() => { setMobileOpen(false); setMobileOpenDrop(null); setNestedMobileDrop(null); setNestedMobileDrop3(null); }}
                                                        >
                                                          {sss.label}
                                                        </Link>
                                                      ))}
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          ) : (
                                            <Link
                                              key={ss.label + idx}
                                              href={ss.href}
                                              className="block px-4 py-2 text-sm text-[#64748B] rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                                              onClick={() => { setMobileOpen(false); setMobileOpenDrop(null); setNestedMobileDrop(null); setNestedMobileDrop3(null); }}
                                            >
                                              {ss.label}
                                            </Link>
                                          )
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ) : (
                              <Link
                                key={s.label}
                                href={s.href}
                                className="block px-4 py-2 text-sm text-[#64748B] rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                                onClick={() => { setMobileOpen(false); setMobileOpenDrop(null); setNestedMobileDrop(null); setNestedMobileDrop3(null); }}
                              >
                                {s.label}
                              </Link>
                            )
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
