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
      { label: 'Vision and Mission', href: '/about/vision' },
      { label: 'College Management', href: '/about/management' },
      { label: "Principal's Message", href: '/about/principal' },
      { label: 'Organogram', href: '/about/organogram' },
      { label: 'Milestones', href: '/about/milestones' },
      { label: 'Code of Conduct', href: '/about/conduct' },
      { label: 'Statuatory Bodies', href: '/about/statuatory' },
      { label: 'Activity Committees', href: '/about/committees' },
    ]
  },
  {
    label: 'Programmes', href: '#', sub: [
      { label: 'Jr College', href: '/programmes/jr-college' },
      { label: 'Sr College', href: '/programmes/sr-college' },
      {
        label: 'Under Graduate', href: '#', sub: [
          { label: 'B.Com', href: '/programmes/ug/bcom' },
          { label: 'BBA', href: '/programmes/ug/bba' },
          { label: 'BCA', href: '/programmes/ug/bca' },
          { label: 'DS', href: '/programmes/ug/ds' },
          { label: 'BSc IT', href: '/programmes/ug/bscit' },
          { label: 'BMS', href: '/programmes/ug/bms' },
        ]
      },
      {
        label: 'Post Graduate', href: '#', sub: [
          { label: 'MSc IT', href: '/programmes/pg/mscit' },
          { label: 'MCom', href: '/programmes/pg/mcom' },
        ]
      },
    ]
  },
  {
    label: 'Academics', href: '#', sub: [
      { label: 'Examination Hub', href: '/examination' },
      { label: 'Library', href: '/library' },
    ]
  },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Notices', href: '/notices' },
  {
    label: 'More', href: '#', sub: [
      { label: 'Research', href: '/research' },
      { label: "Student's Work", href: '/students-work' },
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
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

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
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-12 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#123B6D] flex items-center justify-center text-white font-bold text-lg font-[var(--font-heading)]">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-[#123B6D] font-bold text-sm leading-tight font-[var(--font-heading)]">MCC Autonomous</span>
              <span className="text-[#64748B] text-[10px] leading-tight">Mulund College of Commerce</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.sub ? (
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#1E293B] hover:text-[#123B6D] rounded-lg hover:bg-[#123B6D]/5 transition-all"
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="relative px-3 py-2 text-sm font-medium text-[#1E293B] hover:text-[#123B6D] rounded-lg hover:bg-[#123B6D]/5 transition-all group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A017] group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                )}
                {link.sub && (
                  <div
                    className="absolute top-full left-0 min-w-[200px] pt-2 hidden group-hover:block"
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    <div className="bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-xl py-2">
                      {link.sub.map((s) => (
                        s.sub ? (
                          <div key={s.label} className="relative w-full group/nested">
                            <div className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#1E293B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors cursor-default">
                              {s.label}
                              <ChevronDown size={14} className="-rotate-90 text-[#94A3B8]" />
                            </div>
                            <div className="absolute top-0 left-full hidden group-hover/nested:block min-w-[200px] pl-1">
                              <div className="bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden py-1">
                                {s.sub.map(ss => (
                                  <Link key={ss.href} href={ss.href} className="block px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors">
                                    {ss.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={s.href}
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
            <Link href="/admissions" className="hidden md:flex ml-2 px-4 py-2 bg-[#123B6D] text-white text-sm font-semibold rounded-xl hover:bg-[#0d2d54] transition-all hover:shadow-lg hover:shadow-[#123B6D]/20">
              Apply Now
            </Link>
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
                  <div className="w-8 h-8 rounded-full bg-[#123B6D] flex items-center justify-center text-white font-bold text-sm font-[var(--font-heading)]">
                    M
                  </div>
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
                      className="w-full flex items-center justify-between px-4 py-3 text-[#1E293B] font-medium rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                      onClick={() => setMobileOpenDrop(mobileOpenDrop === link.label ? null : link.label)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${mobileOpenDrop === link.label ? 'rotate-180' : ''}`}
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
                        <div className="ml-4 space-y-1 py-1">
                          {link.sub.map((s) => (
                            s.sub ? (
                              <div key={s.label}>
                                <button
                                  className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-[#123B6D] hover:bg-[#123B6D]/5 rounded-xl transition-colors"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setNestedMobileDrop(nestedMobileDrop === s.label ? null : s.label);
                                  }}
                                >
                                  <span>{s.label}</span>
                                  <ChevronDown size={14} className={`transition-transform duration-200 ${nestedMobileDrop === s.label ? 'rotate-180' : ''}`} />
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
                                        {s.sub.map(ss => (
                                          <Link
                                            key={ss.href}
                                            href={ss.href}
                                            className="block px-4 py-2 text-sm text-[#64748B] rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                                            onClick={() => setMobileOpen(false)}
                                          >
                                            {ss.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ) : (
                              <Link
                                key={s.href}
                                href={s.href}
                                className="block px-4 py-2 text-sm text-[#64748B] rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                                onClick={() => setMobileOpen(false)}
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
              <div className="pt-4 border-t border-[#E2E8F0]">
                <Link
                  href="/admissions"
                  className="block w-full text-center py-3 bg-[#123B6D] text-white font-semibold rounded-xl hover:bg-[#0d2d54] transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  Apply Now
                </Link>
              </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
