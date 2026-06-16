import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Users, BookOpen, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Programmes | MCC Digital Experience Platform',
  description: 'Explore all academic programmes at Mulund College of Commerce.',
};

const programmes = [
  {
    code: 'FYJC', name: 'First Year Junior College', category: 'Junior College', duration: '1 Year',
    seats: 480, desc: 'Foundation year for Arts & Commerce stream students preparing for board examinations.',
    highlights: ['Commerce Stream', 'Arts Stream', 'Expert Faculty', 'Coaching Support'],
    color: 'from-blue-600 to-blue-800', href: '/programmes/jr-college',
  },
  {
    code: 'SYJC', name: 'Second Year Junior College', category: 'Junior College', duration: '1 Year',
    seats: 460, desc: 'Board examination preparation with comprehensive coaching and study materials.',
    highlights: ['Board Prep', 'Mock Tests', 'Career Guidance', 'Competitive Exams'],
    color: 'from-indigo-600 to-indigo-800', href: '/programmes/jr-college',
  },
  {
    code: 'BCom', name: 'Bachelor of Commerce', category: 'Undergraduate', duration: '3 Years',
    seats: 360, desc: 'A comprehensive UG programme covering accounting, finance, management, and economics.',
    highlights: ['Accounting & Finance', 'Business Law', 'Economics', 'Taxation'],
    color: 'from-[#123B6D] to-[#00254e]', href: '/programmes/ug/bcom',
  },
  {
    code: 'MCom', name: 'Master of Commerce', category: 'Postgraduate', duration: '2 Years',
    seats: 60, desc: 'Advanced commerce programme with research methodology and industry specializations.',
    highlights: ['Research Methods', 'Advanced Accounting', 'Financial Markets', 'Project Work'],
    color: 'from-teal-600 to-teal-800', href: '/programmes/pg/mcom',
  },
  {
    code: 'MSc IT', name: 'M.Sc. Information Technology', category: 'Postgraduate', duration: '2 Years',
    seats: 60, desc: 'Technology-focused postgraduate programme covering software, data, and IT management.',
    highlights: ['Software Development', 'Data Science', 'Cloud Computing', 'Cybersecurity'],
    color: 'from-purple-600 to-purple-800', href: '/programmes/pg/mscit',
  },
  {
    code: 'PhD', name: 'Ph.D Research Programme', category: 'Doctoral', duration: '3–5 Years',
    seats: 20, desc: 'Research-focused doctoral programme supervised by experienced faculty members.',
    highlights: ['Original Research', 'Publications', 'Conferences', 'Expert Guidance'],
    color: 'from-amber-600 to-amber-800', href: '/academics/phd',
  },
];

export default function AcademicsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-[#123B6D] pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-3">Academic Programmes</h1>
          <p className="text-white/70 max-w-2xl">
            Explore our wide range of undergraduate, postgraduate, and doctoral programmes designed for academic excellence and career success.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-10 pb-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Programmes', value: '6+', icon: BookOpen },
            { label: 'Total Seats', value: '1440+', icon: Users },
            { label: 'Faculty Members', value: '120+', icon: Award },
            { label: 'Years Established', value: '60+', icon: Clock },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#123B6D]/10 flex items-center justify-center">
                <Icon size={20} className="text-[#123B6D]" />
              </div>
              <div>
                <div className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)]">{value}</div>
                <div className="text-xs text-[#94A3B8]">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Programme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((p) => (
            <Link
              href={p.href}
              key={p.code}
              className="group bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all overflow-hidden block"
            >
              <div className={`bg-gradient-to-br ${p.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wider">{p.category}</span>
                  <span className="px-2 py-1 rounded-full bg-white/20 text-xs font-medium">{p.duration}</span>
                </div>
                <h3 className="text-2xl font-bold font-[var(--font-heading)]">{p.code}</h3>
                <p className="text-white/80 text-sm">{p.name}</p>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#64748B] leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.highlights.map((h) => (
                    <span key={h} className="px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#64748B]">{h}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#94A3B8]">
                    <span className="font-semibold text-[#1E293B]">{p.seats}</span> seats available
                  </div>
                  <div
                    className="flex items-center gap-1 text-sm font-semibold text-[#123B6D] group-hover:gap-2 transition-all"
                  >
                    View Details <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
