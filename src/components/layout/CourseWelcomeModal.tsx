'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, GraduationCap, BookOpen, Microscope,
  ChevronRight, Sparkles, ArrowRight, CheckCircle2
} from 'lucide-react';

// ─── Course catalogue ────────────────────────────────────────────────────────
interface Course {
  code: string;
  name: string;
  fullName: string;
  level: 'Junior College' | 'Under Graduate' | 'Post Graduate';
  duration: string;
  seats: number;
  tags: string[];
  href: string;
  accent: string;       // bg colour class
  iconAccent: string;   // text colour class
}

const courses: Course[] = [
  // Junior College
  {
    code: 'FYJC',
    name: 'Jr. College (Arts & Commerce)',
    fullName: 'Junior College — Arts & Commerce',
    level: 'Junior College',
    duration: '2 Years', seats: 480,
    tags: ['Arts', 'Commerce', 'Class 11–12'],
    href: '/programmes/jr-college',
    accent: 'bg-cyan-50', iconAccent: 'text-cyan-700',
  },

  // Under Graduate
  {
    code: 'BCom',
    name: 'B.Com.',
    fullName: 'Bachelor of Commerce',
    level: 'Under Graduate',
    duration: '3 Years', seats: 360,
    tags: ['Commerce', 'Finance', 'Accounting'],
    href: '/programmes/ug/bcom',
    accent: 'bg-blue-50', iconAccent: 'text-[#123B6D]',
  },
  {
    code: 'BBA',
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    level: 'Under Graduate',
    duration: '3 Years', seats: 120,
    tags: ['Management', 'Leadership', 'Business'],
    href: '/programmes/ug/bba',
    accent: 'bg-amber-50', iconAccent: 'text-amber-700',
  },
  {
    code: 'BMS',
    name: 'BMS',
    fullName: 'Bachelor of Management Studies',
    level: 'Under Graduate',
    duration: '3 Years', seats: 120,
    tags: ['Management', 'Strategy', 'Operations'],
    href: '/programmes/ug/bms',
    accent: 'bg-purple-50', iconAccent: 'text-purple-700',
  },
  {
    code: 'BCA',
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    level: 'Under Graduate',
    duration: '3 Years', seats: 60,
    tags: ['Technology', 'Programming', 'IT'],
    href: '/programmes/ug/bca',
    accent: 'bg-emerald-50', iconAccent: 'text-emerald-700',
  },
  {
    code: 'BSc IT',
    name: 'B.Sc. IT',
    fullName: 'Bachelor of Science in Information Technology',
    level: 'Under Graduate',
    duration: '3 Years', seats: 60,
    tags: ['Technology', 'Science', 'Software'],
    href: '/programmes/ug/bscit',
    accent: 'bg-teal-50', iconAccent: 'text-teal-700',
  },
  {
    code: 'DS',
    name: 'Data Science',
    fullName: 'B.Sc. Data Science',
    level: 'Under Graduate',
    duration: '3 Years', seats: 60,
    tags: ['AI', 'Analytics', 'Machine Learning'],
    href: '/programmes/ug/ds',
    accent: 'bg-rose-50', iconAccent: 'text-rose-700',
  },

  // Post Graduate
  {
    code: 'MCom',
    name: 'M.Com.',
    fullName: 'Master of Commerce',
    level: 'Post Graduate',
    duration: '2 Years', seats: 60,
    tags: ['Advanced Commerce', 'Research', 'Finance'],
    href: '/programmes/pg/mcom',
    accent: 'bg-indigo-50', iconAccent: 'text-indigo-700',
  },
  {
    code: 'MSc IT',
    name: 'M.Sc. IT',
    fullName: 'Master of Science in Information Technology',
    level: 'Post Graduate',
    duration: '2 Years', seats: 60,
    tags: ['Advanced IT', 'Research', 'Technology'],
    href: '/programmes/pg/mscit',
    accent: 'bg-sky-50', iconAccent: 'text-sky-700',
  },
];

const LEVELS = ['All', 'Junior College', 'Under Graduate', 'Post Graduate'] as const;
type Level = typeof LEVELS[number];

const levelIcon: Record<Level, React.ReactNode> = {
  All:             <Sparkles  size={15} />,
  'Junior College': <BookOpen  size={15} />,
  'Under Graduate': <GraduationCap size={15} />,
  'Post Graduate':  <Microscope size={15} />,
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function CourseWelcomeModal() {
  const router   = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [open,   setOpen]   = useState(false);
  const [query,  setQuery]  = useState('');
  const [level,  setLevel]  = useState<Level>('All');
  const [picked, setPicked] = useState<Course | null>(null);

  // Show once per browser session (no repeat on refresh after first selection)
  useEffect(() => {
    const alreadyPicked = localStorage.getItem('mcc_selected_course');
    if (!alreadyPicked) {
      // Slight delay so splash finishes first
      const t = setTimeout(() => setOpen(true), 2800);
      return () => clearTimeout(t);
    }
  }, []);

  // Auto-focus search when modal opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  const filtered = courses.filter(c => {
    const matchLevel = level === 'All' || c.level === level;
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.fullName.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q));
    return matchLevel && matchQuery;
  });

  const handleSelect = (course: Course) => {
    setPicked(course);
  };

  const handleGoToDashboard = () => {
    if (picked) {
      localStorage.setItem('mcc_selected_course', JSON.stringify({ code: picked.code, href: '/dashboard' }));
      setOpen(false);
      router.push('/dashboard');
    }
  };

  const handleChangeCourse = () => {
    setPicked(null);
  };

  const handleSkip = () => {
    localStorage.setItem('mcc_selected_course', 'skipped');
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 40 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.96,  y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-[9991] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: '#fff' }}
            >
              {picked ? (
                /* ── Success Screen ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-10 text-center"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <GraduationCap size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-2">You're all set!</h2>
                  <p className="text-[#64748B] mb-6">You have selected</p>
                  
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-6 py-4 mb-8 w-full max-w-md">
                    <p className="font-bold text-[#1E293B]">{picked.code} - {picked.fullName}</p>
                  </div>

                  <div className="text-left w-full max-w-md mb-8">
                    <p className="font-semibold text-[#1E293B] mb-4">We will personalize your experience:</p>
                    <ul className="space-y-3">
                      {[
                        'Personalized Notices',
                        'Relevant Exam Timetable',
                        'Course Specific Study Materials',
                        'Assignments & Projects',
                        'Previous Year Question Papers'
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3 text-[#64748B] text-sm">
                          <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <button
                      onClick={handleGoToDashboard}
                      className="flex-1 bg-[#123B6D] text-white py-3.5 rounded-xl font-semibold hover:bg-[#0d2d54] transition-colors shadow-lg shadow-[#123B6D]/20"
                    >
                      Go To Dashboard
                    </button>
                    <button
                      onClick={handleChangeCourse}
                      className="flex-1 bg-white border-2 border-[#E2E8F0] text-[#64748B] py-3.5 rounded-xl font-semibold hover:border-[#123B6D]/30 hover:text-[#1E293B] transition-colors"
                    >
                      Change Course
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* ── Header ── */}
                  <div
                    className="relative flex-shrink-0 px-8 pt-8 pb-6 overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #0b2848 0%, #123B6D 60%, #1a5296 100%)' }}
                  >
                    {/* Decorative blob */}
                    <div
                      className="absolute -right-16 -top-16 w-56 h-56 rounded-full opacity-20"
                      style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)' }}
                    />
                    <button
                      onClick={handleSkip}
                      className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
                      aria-label="Skip"
                    >
                      <X size={18} />
                    </button>

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse" />
                        <span className="text-white/60 text-xs tracking-widest uppercase font-medium">
                          Welcome to MCC
                        </span>
                      </div>
                      <h2
                        className="text-2xl md:text-3xl font-bold text-white mb-1"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        Choose Your Programme
                      </h2>
                      <p className="text-white/60 text-sm">
                        Select a course to get your personalised dashboard
                      </p>
                    </div>

                    {/* Search bar */}
                    <div className="relative mt-5 z-10">
                      <Search
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                      />
                      <input
                        ref={inputRef}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search by name, code or subject…"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 text-sm border border-white/20 focus:outline-none focus:border-[#D4A017]/60 focus:bg-white/15 transition-all"
                      />
                      {query && (
                        <button
                          onClick={() => setQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ── Level tabs ── */}
                  <div className="flex-shrink-0 flex gap-1 px-6 pt-4 pb-3 border-b border-[#E2E8F0] overflow-x-auto no-scrollbar">
                    {LEVELS.map(l => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          level === l
                            ? 'bg-[#123B6D] text-white shadow-sm shadow-[#123B6D]/20'
                            : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                        }`}
                      >
                        {levelIcon[l]} {l}
                      </button>
                    ))}
                  </div>

                  {/* ── Course grid ── */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {filtered.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-[#94A3B8]">
                        <Search size={40} className="mb-3 opacity-30" />
                        <p className="font-medium">No courses match "{query}"</p>
                        <button
                          onClick={() => { setQuery(''); setLevel('All'); }}
                          className="mt-3 text-sm text-[#123B6D] font-semibold hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filtered.map(course => (
                          <motion.button
                            key={course.code}
                            onClick={() => handleSelect(course)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative text-left p-5 rounded-2xl border-2 transition-all group overflow-hidden border-[#E2E8F0] hover:border-[#123B6D]/30 bg-white hover:shadow-md"
                          >
                            <div className="relative z-10 flex items-start gap-4">
                              {/* Code badge */}
                              <div
                                className={`flex-shrink-0 w-12 h-12 rounded-xl ${course.accent} flex items-center justify-center`}
                              >
                                <span className={`text-xs font-bold ${course.iconAccent} leading-tight text-center`}>
                                  {course.code.length > 4
                                    ? course.code.split(' ')[0]
                                    : course.code}
                                </span>
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-[#1E293B] text-sm leading-tight mb-0.5">
                                  {course.fullName}
                                </p>
                                <p className="text-xs text-[#94A3B8] mb-2">
                                  {course.duration} · {course.seats} seats
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {course.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B] text-[10px] font-medium"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <ChevronRight
                                size={18}
                                className="flex-shrink-0 text-[#CBD5E1] group-hover:text-[#123B6D] group-hover:translate-x-1 transition-all mt-1"
                              />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── Footer ── */}
                  <div className="flex-shrink-0 px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
                    <p className="text-xs text-[#94A3B8]">
                      You can change this later from the menu
                    </p>
                    <button
                      onClick={handleSkip}
                      className="flex items-center gap-1 text-xs font-semibold text-[#64748B] hover:text-[#123B6D] transition-colors"
                    >
                      Skip for now <ArrowRight size={13} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
