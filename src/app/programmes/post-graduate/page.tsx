import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Users, Award, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Post Graduate Programmes | MCC Digital Experience Platform',
  description: 'Postgraduate degree programmes offered at Mulund College of Commerce.',
};

const programmes = [
  {
    code: 'M.Com (AA)',
    full: 'Master of Commerce (Advanced Accountancy)',
    level: 'POST GRADUATE',
    duration: '2 Years',
    seats: 60,
    color: 'from-[#dc2626] to-[#ef4444]',
    description: 'Advanced studies in accountancy, taxation, and auditing, preparing students for high-level roles in finance and accounting.',
    tags: ['Accountancy', 'Taxation', 'Auditing'],
    href: '/programmes/pg/mcom-aa',
  },
  {
    code: 'M.Com (BM)',
    full: 'Master of Commerce (Business Management)',
    level: 'POST GRADUATE',
    duration: '2 Years',
    seats: 60,
    color: 'from-[#7c3aed] to-[#9d5cf4]',
    description: 'Focuses on strategic management, organizational behavior, and leadership skills for future business leaders and entrepreneurs.',
    tags: ['Business Management', 'Leadership', 'Strategy'],
    href: '/programmes/pg/mcom-bm',
  },
  {
    code: 'M.Com (BF)',
    full: 'Master of Commerce (Banking & Finance)',
    level: 'POST GRADUATE',
    duration: '2 Years',
    seats: 60,
    color: 'from-[#0e7490] to-[#06b6d4]',
    description: 'Specialized postgraduate programme covering advanced concepts in banking, financial markets, and investment management.',
    tags: ['Banking', 'Finance', 'Financial Markets'],
    href: '/programmes/pg/mcom-bf',
  },
  {
    code: 'MSF',
    full: 'Master of Science in Finance',
    level: 'POST GRADUATE',
    duration: '2 Years',
    seats: 60,
    color: 'from-[#d97706] to-[#f59e0b]',
    description: 'An advanced programme offering deep insights into financial analytics, corporate finance, and global financial systems.',
    tags: ['Finance', 'Analytics', 'Corporate Finance'],
    href: '/programmes/pg/msf',
  },
  {
    code: 'M.Sc. (IT)',
    full: 'Master of Science (Information Technology)',
    level: 'POST GRADUATE',
    duration: '2 Years',
    seats: 60,
    color: 'from-[#059669] to-[#10b981]',
    description: 'Advanced studies in software development, data science, networking, and modern IT infrastructure to build tech experts.',
    tags: ['IT', 'Software', 'Networking', 'Data Science'],
    href: '/programmes/pg/msc-it',
  },
];

const stats = [
  { icon: BookOpen, value: '5+', label: 'Programmes' },
  { icon: Users, value: '300+', label: 'Total Seats' },
  { icon: Award, value: '20+', label: 'Faculty Members' },
  { icon: Clock, value: '2 Yrs', label: 'Programme Duration' },
];

export default function PostGraduatePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">

      {/* Hero Header */}
      <div className="bg-[#123B6D] pt-14 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <span className="inline-block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Mulund College of Commerce</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4 max-w-2xl">
            Post Graduate Programmes
          </h1>
          <p className="text-white/75 max-w-xl text-sm md:text-base leading-relaxed">
            Advance your academic and professional journey with our postgraduate programmes including M.Com and M.Sc. IT.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-14 relative z-20">

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm px-5 py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#123B6D]/10 flex items-center justify-center text-[#123B6D] shrink-0">
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-[#123B6D]">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Programme Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Coloured card header */}
              <div className={`bg-gradient-to-br ${prog.color} px-6 pt-6 pb-8 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-start justify-between mb-3">
                  <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">{prog.level}</span>
                  <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">{prog.duration}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{prog.code}</h2>
                <p className="text-white/80 text-sm mt-1 leading-snug">{prog.full}</p>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{prog.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {prog.tags.map((tag, ti) => (
                    <span key={ti} className="bg-gray-100 text-gray-600 text-[11px] font-medium px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-[#123B6D] text-xs font-semibold">{prog.seats} seats available</span>
                  <Link
                    href={prog.href}
                    className="flex items-center gap-1.5 text-sm font-bold text-[#123B6D] hover:gap-2.5 transition-all duration-200 group"
                  >
                    View Details
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
