import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Users, BookOpen, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Programmes | MCC Digital Experience Platform',
  description: 'Explore all academic programmes at Mulund College of Commerce.',
};

const allProgrammes = [
  // --- UNDERGRADUATE (matches nav dropdown order) ---
  {
    code: 'B.Com', name: 'Bachelor of Commerce', category: 'Undergraduate', duration: '3 Years', seats: 600, time: '7:15 am to 10:40 am',
    highlights: ['Accounting', 'Finance', 'Economics', 'Business Law'],
    color: 'from-[#D4A017] to-[#f59e0b]', href: '/programmes/ug/bcom',
  },
  {
    code: 'BAF', name: 'Bachelor of Commerce (Accounting & Finance)', category: 'Undergraduate', duration: '3 Years', seats: 120, time: '7:15 am to 11:40 am',
    highlights: ['Accounting', 'Taxation', 'Auditing', 'Finance'],
    color: 'from-[#dc2626] to-[#ef4444]', href: '/programmes/ug/baf',
  },
  {
    code: 'BBI', name: 'Bachelor of Commerce (Banking & Insurance)', category: 'Undergraduate', duration: '3 Years', seats: 160, time: '7:15 am to 11:40 am',
    highlights: ['Banking', 'Insurance', 'Finance', 'Risk Management'],
    color: 'from-[#0e7490] to-[#06b6d4]', href: '/programmes/ug/bbi',
  },
  {
    code: 'BFM', name: 'Bachelor of Commerce (Financial Markets)', category: 'Undergraduate', duration: '3 Years', seats: 60, time: '12:00 pm to 4:30 pm',
    highlights: ['Stock Market', 'Investment', 'Securities', 'Capital Markets'],
    color: 'from-[#d97706] to-[#f59e0b]', href: '/programmes/ug/bfm',
  },
  {
    code: 'BMS', name: 'Bachelor of Commerce (Management Studies)', category: 'Undergraduate', duration: '3 Years', seats: 120, time: '12:00 pm to 4:30 pm',
    highlights: ['Management', 'Commerce', 'Leadership', 'Business Strategy'],
    color: 'from-[#123B6D] to-[#1a5294]', href: '/programmes/ug/bcom-ms',
  },
  {
    code: 'BBA', name: 'Bachelor of Commerce (Business Administration)', category: 'Undergraduate', duration: '3 Years', seats: 60, time: '12:00 pm to 4:30 pm',
    highlights: ['Business Admin', 'Commerce', 'Entrepreneurship'],
    color: 'from-[#7c3aed] to-[#9d5cf4]', href: '/programmes/ug/bba',
  },
  {
    code: 'BA-MMC', name: 'Bachelor of Arts (Multimedia and Mass Communication)', category: 'Undergraduate', duration: '3 Years', seats: 60, time: '12:00 pm to 4:30 pm',
    highlights: ['Media', 'Journalism', 'Digital Content', 'Communication'],
    color: 'from-[#0891b2] to-[#0ea5e9]', href: '/programmes/ug/bammc',
  },
  {
    code: 'B.Sc (CS)', name: 'Bachelor of Science (Computer Science)', category: 'Undergraduate', duration: '3 Years', seats: 120, time: '7:15 am to 11:40 am',
    highlights: ['Computer Science', 'Programming', 'Software', 'Algorithms'],
    color: 'from-[#059669] to-[#10b981]', href: '/programmes/ug/sct/bsc-cs',
  },
  {
    code: 'B.Sc (IT)', name: 'Bachelor of Science (Information Technology)', category: 'Undergraduate', duration: '3 Years', seats: 120, time: '10:40 am to 4:15 pm',
    highlights: ['IT', 'Networks', 'Databases', 'Web Technologies'],
    color: 'from-[#047857] to-[#34d399]', href: '/programmes/ug/sct/bsc-it',
  },
  {
    code: 'B.Sc (CA)', name: 'Bachelor of Science (Computer Applications)', category: 'Undergraduate', duration: '3 Years', seats: 60, time: '2:05 pm to 8:10 pm',
    highlights: ['Computer Applications', 'Software Engineering', 'Systems'],
    color: 'from-[#059669] to-[#047857]', href: '/programmes/ug/sct/bsc-ca',
  },
  {
    code: 'B.Sc (DS)', name: 'Bachelor of Science (Data Science)', category: 'Undergraduate', duration: '3 Years', seats: 60, time: '2:05 pm to 8:10 pm',
    highlights: ['Data Science', 'Machine Learning', 'Analytics', 'Statistics'],
    color: 'from-[#10b981] to-[#6ee7b7]', href: '/programmes/ug/sct/bsc-ds',
  },
  {
    code: 'B.Com BFSI', name: 'Bachelor of Commerce (Banking, Financial Services & Insurance)', category: 'Undergraduate', duration: '3 Years', seats: 60, time: '',
    highlights: ['Apprenticeship', 'BFSI', 'Banking', 'Financial Services'],
    color: 'from-[#4f46e5] to-[#7c3aed]', href: '/programmes/ug/bfsi',
  },

  // --- POSTGRADUATE (matches nav dropdown order) ---
  {
    code: 'M.Com (AA)', name: 'Master of Commerce (Advanced Accountancy)', category: 'Postgraduate', duration: '2 Years', seats: 80, time: '5:30 pm to 8:30 pm',
    highlights: ['Accountancy', 'Taxation', 'Auditing'],
    color: 'from-[#dc2626] to-[#ef4444]', href: '/programmes/pg/mcom-aa',
  },
  {
    code: 'M.Com (BM)', name: 'Master of Commerce (Business Management)', category: 'Postgraduate', duration: '2 Years', seats: 60, time: '5:30 pm to 8:30 pm',
    highlights: ['Business Management', 'Leadership', 'Strategy'],
    color: 'from-[#7c3aed] to-[#9d5cf4]', href: '/programmes/pg/mcom-bm',
  },
  {
    code: 'M.Com (BF)', name: 'Master of Commerce (Banking & Finance)', category: 'Postgraduate', duration: '2 Years', seats: 60, time: '5:30 pm to 8:30 pm',
    highlights: ['Banking', 'Finance', 'Financial Markets'],
    color: 'from-[#0e7490] to-[#06b6d4]', href: '/programmes/pg/mcom-bf',
  },
  {
    code: 'M.Sc (IT)', name: 'Master of Science (Information Technology)', category: 'Postgraduate', duration: '2 Years', seats: 60, time: '',
    highlights: ['Software Development', 'Data Science', 'Cloud Computing', 'Cybersecurity'],
    color: 'from-purple-600 to-purple-800', href: '/programmes/pg/mscit',
  },
  {
    code: 'M.Sc (Finance)', name: 'Master of Science in Finance', category: 'Postgraduate', duration: '2 Years', seats: 30, time: '',
    highlights: ['Finance', 'Analytics', 'Corporate Finance', 'Econometrics'],
    color: 'from-[#d97706] to-[#f59e0b]', href: '/programmes/pg/msf',
  },

  // --- PhD ---
  {
    code: 'Ph.D', name: 'Ph.D in Business Economics', category: 'Doctoral', duration: '3–5 Years', seats: 20, time: '',
    highlights: ['Original Research', 'Publications', 'Conferences', 'Expert Guidance'],
    color: 'from-amber-600 to-amber-800', href: '/programmes/phd/be',
  },
];

export default function AcademicsPage() {
  const categories = ['Undergraduate', 'Postgraduate', 'Doctoral'];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-[#123B6D] pt-14 pb-24">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">Academic Programmes</h1>
          <p className="text-white/80 text-lg max-w-3xl">
            Explore our comprehensive range of programmes designed to foster academic excellence, industry readiness, and future leaders.
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 -mt-12 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 relative z-10">
          {[
            { label: 'Total Programmes', value: '18+', icon: BookOpen },
            { label: 'Total Seats', value: '2600+', icon: Users },
            { label: 'Faculty Members', value: '120+', icon: Award },
            { label: 'Years Established', value: '50+', icon: Clock },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-md p-3 sm:p-4 md:p-6 flex items-center gap-2 sm:gap-3 md:gap-5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-[#123B6D]/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#123B6D]" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] leading-none mb-1 truncate">{value}</div>
                <div className="text-[10px] sm:text-xs md:text-sm font-medium text-[#64748B] leading-tight truncate">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Programmes grouped by category */}
        {categories.map(cat => {
          const catProgrammes = allProgrammes.filter(p => p.category === cat);
          if (catProgrammes.length === 0) return null;

          return (
            <div key={cat} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] font-[var(--font-heading)]">{cat} Programmes</h2>
                <div className="h-px bg-[#E2E8F0] flex-1 mt-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {catProgrammes.map((p) => (
                  <Link
                    href={p.href}
                    key={p.code}
                    className="group bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col h-full"
                  >
                    <div className={`bg-gradient-to-br ${p.color} px-6 pt-6 pb-8 text-white relative`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">{p.category}</span>
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold">{p.duration}</span>
                      </div>
                      <h3 className="text-3xl font-bold font-[var(--font-heading)] mb-1 leading-none">{p.code}</h3>
                      <p className="text-white/90 text-sm font-medium leading-snug">{p.name}</p>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {p.highlights.map((h) => (
                          <span key={h} className="px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[11px] font-semibold text-[#475569]">{h}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                        <div className="flex flex-col gap-1">
                          <div className="text-xs font-semibold text-[#64748B]">
                            <span className="text-[#0F172A]">{p.seats}</span> seats
                          </div>
                          {p.time && (
                            <div className="text-[11px] font-medium text-[#64748B] flex items-center gap-1">
                              <Clock size={12} /> {p.time}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-bold text-[#123B6D] group-hover:gap-2.5 transition-all">
                          View Details <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
