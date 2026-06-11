import type { Metadata } from 'next';
import { Search, Filter, Download, Bookmark, Bell, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Notice Board | MCC Digital Experience Platform',
  description: 'Latest notices, circulars, and announcements from Mulund College of Commerce.',
};

const notices = [
  { tag: 'Urgent', tagColor: 'bg-red-100 text-red-700', date: 'Jun 10, 2024', title: 'Final Semester Timetable – Dec 2024', dept: 'Examination', desc: 'The final semester examination timetable for all undergraduate and postgraduate courses has been released. Students are advised to download and keep a copy.' },
  { tag: 'Admissions', tagColor: 'bg-blue-100 text-blue-700', date: 'Jun 9, 2024', title: 'FYJC Second Merit List Instructions', dept: 'Admissions', desc: 'Students listed in the second merit list are required to submit their original documents and pay fees by Friday, June 14.' },
  { tag: 'Scholarship', tagColor: 'bg-green-100 text-green-700', date: 'Jun 8, 2024', title: 'EBC Scholarship Applications Open', dept: 'Welfare', desc: 'Economically Backward Class scholarship applications are now open. Eligible students must apply before July 31.' },
  { tag: 'Event', tagColor: 'bg-amber-100 text-amber-700', date: 'Jun 7, 2024', title: 'Annual Cultural Fest – AURA 2024', dept: 'Cultural', desc: 'Join us for the grandest celebration of talent and art. Registration for competitions is now open. Last date: June 20.' },
  { tag: 'Examination', tagColor: 'bg-purple-100 text-purple-700', date: 'Jun 6, 2024', title: 'ATKT Examination Form Submission', dept: 'Examination', desc: 'Students appearing for ATKT examinations must submit forms through the college office. Forms available at the examination section.' },
  { tag: 'Library', tagColor: 'bg-teal-100 text-teal-700', date: 'Jun 5, 2024', title: 'New E-Resources Activated in Library', dept: 'Library', desc: 'Students can now access JSTOR, EBSCO, and other premium databases through the digital library portal using their student credentials.' },
];

const filters = ['All', 'Urgent', 'Admissions', 'Examination', 'Scholarship', 'Event', 'Library'];

export default function NoticesPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-[#123B6D] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)] mb-2">Notice Board</h1>
          <p className="text-white/70">Stay updated with latest circulars, notices, and announcements</p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 -mt-8">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-4 mb-6 flex gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <Search size={18} className="text-[#94A3B8]" />
            <input placeholder="Search notices, circulars..." className="bg-transparent flex-1 text-sm outline-none text-[#1E293B] placeholder-[#94A3B8]" />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === 0 ? 'bg-[#123B6D] text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#123B6D] hover:text-[#123B6D]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
          {notices.map((n, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${n.tagColor}`}>{n.tag}</span>
                  <span className="text-xs text-[#94A3B8]">{n.dept}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#123B6D] transition-colors">
                    <Bookmark size={16} />
                  </button>
                  <span className="text-xs text-[#94A3B8]">{n.date}</span>
                </div>
              </div>
              <h3 className="font-bold text-[#1E293B] font-[var(--font-heading)] mb-2">{n.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-4">{n.desc}</p>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] hover:gap-2.5 transition-all">
                  <Download size={14} /> Download
                </button>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#123B6D] transition-colors">
                  Read More <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
