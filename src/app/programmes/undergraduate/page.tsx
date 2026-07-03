import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Users, Award, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Graduate Programmes | MCC Digital Experience Platform',
  description: 'Explore Graduate programmes offered at Mulund College of Commerce.',
};

const programmes = [
  {
    code: 'B.Com (MS)',
    full: 'Bachelor of Commerce (Management Studies)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 120,
    color: 'from-[#123B6D] to-[#1a5294]',
    description: 'A commerce degree integrated with management studies, preparing students for leadership roles in corporate and business environments.',
    tags: ['Management', 'Commerce', 'Leadership', 'Business Strategy'],
    href: '/programmes/ug/bcom',
  },
  {
    code: 'B.Com (BA)',
    full: 'Bachelor of Commerce (Business Administration)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 120,
    color: 'from-[#7c3aed] to-[#9d5cf4]',
    description: 'Combines commerce fundamentals with business administration skills to prepare students for managerial and entrepreneurial careers.',
    tags: ['Business Admin', 'Commerce', 'Entrepreneurship'],
    href: '/programmes/ug/bcom',
  },
  {
    code: 'B.A (MMC)',
    full: 'Bachelor of Arts (Multimedia and Mass Communication)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 60,
    color: 'from-[#0891b2] to-[#0ea5e9]',
    description: 'A dynamic programme covering journalism, digital media, advertising, and communication arts for the modern media landscape.',
    tags: ['Media', 'Journalism', 'Digital Content', 'Communication'],
    href: '/programmes/ug/bcom',
  },
  {
    code: 'B.Sc (CS)',
    full: 'Bachelor of Science (Computer Science)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 120,
    color: 'from-[#059669] to-[#10b981]',
    description: 'A robust programme focused on computer programming, algorithms, and software development for the tech innovators of tomorrow.',
    tags: ['Computer Science', 'Programming', 'Software', 'Algorithms'],
    href: '/programmes/ug/sct/bsc-cs',
  },
  {
    code: 'B.Sc (IT)',
    full: 'Bachelor of Science (Information Technology)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 120,
    color: 'from-[#047857] to-[#34d399]',
    description: 'Specialized in network infrastructure, database systems, and modern web technologies to build enterprise-grade IT solutions.',
    tags: ['IT', 'Networks', 'Databases', 'Web Technologies'],
    href: '/programmes/ug/sct/bsc-it',
  },
  {
    code: 'B.Sc (DS)',
    full: 'Bachelor of Science (Data Science)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 60,
    color: 'from-[#10b981] to-[#6ee7b7]',
    description: 'Designed to equip students with skills in data analytics, machine learning, and statistical modeling in a data-driven world.',
    tags: ['Data Science', 'Machine Learning', 'Analytics', 'Statistics'],
    href: '/programmes/ug/sct/bsc-ds',
  },
  {
    code: 'B.Sc (CA)',
    full: 'Bachelor of Science (Computer Applications)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 60,
    color: 'from-[#059669] to-[#047857]',
    description: 'Focuses on practical computer applications, software engineering, and systems development to solve real-world problems.',
    tags: ['Computer Applications', 'Software Engineering', 'Systems'],
    href: '/programmes/ug/sct/bsc-ca',
  },
  {
    code: 'B.Com',
    full: 'Bachelor of Commerce',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 360,
    color: 'from-[#D4A017] to-[#f59e0b]',
    description: 'A comprehensive programme covering accounting, finance, management, and economics — the gateway to a thriving commerce career.',
    tags: ['Accounting', 'Finance', 'Economics', 'Business Law'],
    href: '/programmes/ug/bcom',
  },
  {
    code: 'BAF',
    full: 'Bachelor of Commerce (Accounting & Finance)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 120,
    color: 'from-[#dc2626] to-[#ef4444]',
    description: 'Specialized programme in accounting principles, financial reporting, taxation, and auditing for aspiring finance professionals.',
    tags: ['Accounting', 'Taxation', 'Auditing', 'Finance'],
    href: '/programmes/ug/bcom',
  },
  {
    code: 'BBI',
    full: 'Bachelor of Commerce (Banking & Insurance)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 120,
    color: 'from-[#0e7490] to-[#06b6d4]',
    description: 'An industry-aligned programme preparing students for careers in banking, insurance, and financial services sectors.',
    tags: ['Banking', 'Insurance', 'Finance', 'Risk Management'],
    href: '/programmes/ug/bcom',
  },
  {
    code: 'BFM',
    full: 'Bachelor of Commerce (Financial Markets)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 60,
    color: 'from-[#d97706] to-[#f59e0b]',
    description: 'Focused on capital markets, investment banking, securities, and financial market operations for future market professionals.',
    tags: ['Stock Market', 'Investment', 'Securities', 'Capital Markets'],
    href: '/programmes/ug/bcom',
  },
  {
    code: 'BFSI',
    full: 'Bachelor of Commerce (Banking, Financial Services and Insurance)',
    level: 'GRADUATE',
    duration: '3 Years',
    seats: 60,
    color: 'from-[#4f46e5] to-[#7c3aed]',
    description: 'India\'s innovative Apprenticeship Embedded Degree Programme blending classroom education with real-world BFSI industry exposure.',
    tags: ['Apprenticeship', 'BFSI', 'Banking', 'Financial Services'],
    href: '/programmes/ug/bcom',
  },
];

const stats = [
  { icon: BookOpen, value: '9+', label: 'Programmes' },
  { icon: Users, value: '1080+', label: 'Total Seats' },
  { icon: Award, value: '50+', label: 'Faculty Members' },
  { icon: Clock, value: '3 Yrs', label: 'Programme Duration' },
];

export default function GraduatePage() {
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
            Graduate Programmes
          </h1>
          <p className="text-white/75 max-w-xl text-sm md:text-base leading-relaxed">
            Explore our range of undergraduate degree programmes in Commerce, Arts, and Technology — designed for academic excellence and career success.
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
