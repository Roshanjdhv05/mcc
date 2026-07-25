'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Calendar, BookOpen, Book, FileText, Target,
  ClipboardList, BarChart, UserCheck, FileSignature, Coins, Bot,
  ChevronLeft, LogOut
} from 'lucide-react';

import NoticesModule from '@/components/dashboard/NoticesModule';
import TimetableModule from '@/components/dashboard/TimetableModule';
import SyllabusModule from '@/components/dashboard/SyllabusModule';
import StudyMaterialModule from '@/components/dashboard/StudyMaterialModule';
import CourseWelcomeModal from '@/components/layout/CourseWelcomeModal';

const GRID_ITEMS = [
  { id: 'notices',     title: 'Notices',        icon: Bell,          desc: 'College & Dept updates',      color: 'bg-blue-50 text-[#123B6D]',    newUpdates: true  },
  { id: 'timetable',  title: 'Exam Timetable',  icon: Calendar,      desc: 'Schedules & dates',           color: 'bg-amber-50 text-amber-600',   newUpdates: false },
  { id: 'syllabus',   title: 'Syllabus',        icon: BookOpen,      desc: 'Curriculum details',          color: 'bg-emerald-50 text-emerald-600',newUpdates: false },
  { id: 'materials',  title: 'Study Material',  icon: Book,          desc: 'Notes & resources',           color: 'bg-purple-50 text-purple-600', newUpdates: true  },
  { id: 'papers',     title: 'Previous Papers', icon: FileText,      desc: 'Past question papers',        color: 'bg-orange-50 text-orange-600', newUpdates: false },
  { id: 'projects',   title: 'Project Papers',  icon: Target,        desc: 'Guidelines & submissions',    color: 'bg-rose-50 text-rose-600',     newUpdates: false },
  { id: 'assignments',title: 'Assignments',     icon: ClipboardList, desc: 'Pending tasks',               color: 'bg-cyan-50 text-cyan-600',     newUpdates: true  },
  { id: 'results',    title: 'Results',         icon: BarChart,      desc: 'Marks & grades',              color: 'bg-indigo-50 text-indigo-600', newUpdates: false },
  { id: 'attendance', title: 'Attendance',      icon: UserCheck,     desc: 'Monthly tracker',             color: 'bg-teal-50 text-teal-600',     newUpdates: false },
  { id: 'forms',      title: 'Forms',           icon: FileSignature, desc: 'Applications & certs',        color: 'bg-gray-100 text-gray-600',    newUpdates: false },
  { id: 'scholarships',title:'Scholarships',    icon: Coins,         desc: 'Financial aid',               color: 'bg-yellow-50 text-yellow-600', newUpdates: false },
  { id: 'ai',         title: 'AI Assistant',    icon: Bot,           desc: 'Course specific help',        color: 'bg-[#123B6D] text-white',      newUpdates: false },
];

// ── Inner component — uses useSearchParams (must be inside Suspense) ──────────
function DashboardInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const courseParam  = searchParams.get('course');

  const [course,       setCourse]       = useState<{ code: string; href: string } | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [isLoaded,     setIsLoaded]     = useState(false);

  useEffect(() => {
    if (courseParam) {
      // URL has the course — treat it as source of truth
      const courseData = { code: decodeURIComponent(courseParam), href: '/dashboard' };
      localStorage.setItem('mcc_selected_course', JSON.stringify(courseData));
      setCourse(courseData);
      setIsLoaded(true);
      return;
    }

    // No URL param — check localStorage and redirect so course appears in URL
    const stored = localStorage.getItem('mcc_selected_course');
    if (stored && stored !== 'skipped') {
      try {
        const parsed = JSON.parse(stored);
        router.replace(`/dashboard?course=${encodeURIComponent(parsed.code)}`);
        return; // wait for the redirect to re-render with the param
      } catch {
        // ignore parse errors
      }
    }

    // Nothing stored — show the selection modal
    setIsLoaded(true);
  }, [courseParam, router]);

  const handleLogout = () => {
    localStorage.removeItem('mcc_selected_course');
    setCourse(null);
    router.push('/dashboard');
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#123B6D] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[#64748B]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // ── No course selected — show welcome modal ────────────────────────────────
  if (!course) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <CourseWelcomeModal
          forceOpen={true}
          onSelect={(c) => {
            if (c) {
              setCourse(c);
              router.replace(`/dashboard?course=${encodeURIComponent(c.code)}`);
            } else {
              router.push('/');
            }
          }}
        />
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">

      {/* Header */}
      <div className="bg-[#123B6D] px-6 pt-8 pb-12 rounded-b-[40px] shadow-sm relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#D4A017]/20 rounded-full blur-2xl" />
        <div className="absolute left-10 -bottom-10 w-32 h-32 bg-[#4DA8DA]/20 rounded-full blur-xl" />

        {/* Top row: profile only */}
        <div className="relative z-10 flex items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden p-1">
              <div className="w-full h-full bg-[#E2E8F0] rounded-full flex items-center justify-center text-[#123B6D] font-bold">
                ST
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm">Welcome back,</p>
              <h1 className="text-xl font-bold text-white leading-tight font-[var(--font-heading)]">Student</h1>
            </div>
          </div>
        </div>

        {/* Course card + Change Course button */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#D4A017] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner">
              {course.code.slice(0, 3).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-semibold leading-tight">{course.code}</p>
              <p className="text-white/70 text-xs">Personalized Workspace</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Change Course</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-20">
        <AnimatePresence mode="wait">
          {!activeModule ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {GRID_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-[#E2E8F0] hover:border-[#123B6D]/20 hover:shadow-md transition-all text-left group relative overflow-hidden"
                  >
                    {item.newUpdates && (
                      <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm" />
                    )}
                    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon size={22} />
                    </div>
                    <h3 className="font-bold text-[#1E293B] text-sm md:text-base mb-1 group-hover:text-[#123B6D] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] md:text-xs text-[#64748B] leading-snug">
                      {item.desc}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="module"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden min-h-[60vh]"
            >
              {/* Module header */}
              <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center gap-4 bg-[#F8FAFC]">
                <button
                  onClick={() => setActiveModule(null)}
                  className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#123B6D] hover:border-[#123B6D]/30 transition-all shadow-sm"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-2">
                  {(() => {
                    const mod  = GRID_ITEMS.find(m => m.id === activeModule);
                    const Icon = mod?.icon || FileText;
                    return (
                      <>
                        <Icon size={20} className="text-[#123B6D]" />
                        <h2 className="font-bold text-[#1E293B] font-[var(--font-heading)] text-lg">
                          {mod?.title}
                        </h2>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Module content */}
              <div className="h-[calc(60vh-64px)] sm:h-[calc(70vh-64px)] overflow-hidden">
                {activeModule === 'notices'    && <NoticesModule      courseCode={course.code} />}
                {activeModule === 'timetable'  && <TimetableModule    courseCode={course.code} />}
                {activeModule === 'syllabus'   && <SyllabusModule     courseCode={course.code} />}
                {activeModule === 'materials'  && <StudyMaterialModule courseCode={course.code} />}

                {!['notices','timetable','syllabus','materials'].includes(activeModule) && (
                  <div className="w-full h-full p-8 flex flex-col items-center justify-center text-[#94A3B8] border-2 border-dashed border-[#E2E8F0] rounded-2xl m-4"
                    style={{ width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)' }}>
                    <p className="font-medium text-lg text-[#64748B] mb-2">
                      {GRID_ITEMS.find(m => m.id === activeModule)?.title} Module
                    </p>
                    <p className="text-sm">Content personalized for {course.code} will appear here.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Page export — wraps inner component in Suspense (required for useSearchParams) ──
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#123B6D] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[#64748B]">Loading your dashboard...</p>
          </div>
        </div>
      }
    >
      <DashboardInner />
    </Suspense>
  );
}
