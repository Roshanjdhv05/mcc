import type { Metadata } from 'next';
import { Download, Search, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Smart Forms Center | MCC Digital Experience Platform',
  description: 'Download and submit all college forms — admission, examination, scholarship, certificates.',
};

const categories = ['All', 'Admission', 'Examination', 'Scholarship', 'Certificate', 'Concession'];

const forms = [
  { cat: 'Admission', title: 'FYJC Admission Form 2024–25', desc: 'Application form for First Year Junior College admissions', updated: 'Jun 1, 2024', size: '245 KB' },
  { cat: 'Examination', title: 'ATKT Examination Form', desc: 'Allowed to Keep Terms examination application form', updated: 'May 15, 2024', size: '180 KB' },
  { cat: 'Scholarship', title: 'EBC Scholarship Application', desc: 'Economically Backward Class scholarship form', updated: 'Jun 5, 2024', size: '320 KB' },
  { cat: 'Certificate', title: 'Bonafide Certificate Request', desc: 'Application for enrollment verification certificate', updated: 'Jan 10, 2024', size: '120 KB' },
  { cat: 'Concession', title: 'Railway Concession Form', desc: 'Application for student railway concession pass', updated: 'Apr 1, 2024', size: '95 KB' },
  { cat: 'Certificate', title: 'Character Certificate Request', desc: 'Application for good conduct certificate', updated: 'Jan 10, 2024', size: '110 KB' },
  { cat: 'Examination', title: 'Revaluation Application Form', desc: 'Form to request re-evaluation of exam paper', updated: 'May 20, 2024', size: '145 KB' },
  { cat: 'Scholarship', title: 'Merit Scholarship Form', desc: 'Institutional merit scholarship application', updated: 'Jun 10, 2024', size: '280 KB' },
];

const catColors: Record<string, string> = {
  Admission: 'bg-blue-100 text-blue-700',
  Examination: 'bg-purple-100 text-purple-700',
  Scholarship: 'bg-green-100 text-green-700',
  Certificate: 'bg-amber-100 text-amber-700',
  Concession: 'bg-teal-100 text-teal-700',
};

export default function FormsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-[#123B6D] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)] mb-2">Smart Forms Center</h1>
          <p className="text-white/70">All college forms in one place. Search, filter and download.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-8 pb-16 space-y-6">
        {/* Search & Filter */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-4 flex gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <Search size={16} className="text-[#94A3B8]" />
            <input placeholder="Search forms..." className="bg-transparent flex-1 text-sm outline-none placeholder-[#94A3B8]" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC]">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c, i) => (
            <button key={c} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? 'bg-[#123B6D] text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#123B6D] hover:text-[#123B6D]'}`}>{c}</button>
          ))}
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forms.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center flex-shrink-0 text-2xl">
                📄
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${catColors[f.cat]}`}>{f.cat}</span>
                </div>
                <h3 className="font-semibold text-[#1E293B] text-sm font-[var(--font-heading)]">{f.title}</h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">{f.updated} · {f.size}</p>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#123B6D]/10 text-[#123B6D] text-xs font-semibold hover:bg-[#123B6D] hover:text-white transition-all flex-shrink-0">
                <Download size={14} /> PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
