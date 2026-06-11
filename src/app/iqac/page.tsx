import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, FileText, Calendar, Users, Target, BarChart2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IQAC | MCC Digital Experience Platform',
  description: 'Internal Quality Assurance Cell – quality initiatives, action plans, and academic audit reports for Mulund College of Commerce.',
};

const meetings = [
  { date: 'March 2024', agenda: 'Annual Quality Review & Academic Calendar Planning', minutes: true },
  { date: 'December 2023', agenda: 'Mid-Year Progress Review & Feedback Analysis', minutes: true },
  { date: 'September 2023', agenda: 'NAAC Preparation & SSR Review', minutes: true },
  { date: 'June 2023', agenda: 'Annual Report Finalisation & Action Plan 2023-24', minutes: true },
];

const actionPlans = [
  { year: '2024–25', focus: 'Research Culture & Digital Transformation', status: 'Active', progress: 68 },
  { year: '2023–24', focus: 'Student Employability & Skill Development', status: 'Completed', progress: 100 },
  { year: '2022–23', focus: 'Faculty Development & Curriculum Reforms', status: 'Completed', progress: 100 },
  { year: '2021–22', focus: 'Post-Pandemic Academic Recovery', status: 'Completed', progress: 100 },
];

const keyInitiatives = [
  { icon: BarChart2, title: 'Academic Audit', desc: 'Annual internal academic audit across all departments to ensure quality standards.' },
  { icon: Users, title: 'Feedback Mechanism', desc: 'Student, Parent, Alumni & Employer feedback collected and analyzed every semester.' },
  { icon: Target, title: 'Outcome-Based Education', desc: 'Implementation of OBE framework with clearly defined Programme Outcomes and Course Outcomes.' },
  { icon: Calendar, title: 'Faculty Development', desc: 'Regular FDP, workshops, and training programmes organized for faculty up-skilling.' },
];

const iqacMembers = [
  { name: 'Dr. Suresh Mehta', role: 'Chairperson (Principal)', category: 'Management' },
  { name: 'Prof. Anita Sharma', role: 'IQAC Coordinator', category: 'Faculty' },
  { name: 'Dr. Rakesh Gupta', role: 'Member', category: 'Faculty' },
  { name: 'Prof. Seema Patil', role: 'Member', category: 'Faculty' },
  { name: 'Mr. Kiran Shah', role: 'External Expert', category: 'Industry' },
  { name: 'Ms. Priya Desai', role: 'Alumni Representative', category: 'Alumni' },
];

const reports = [
  { title: 'AQAR 2023–24', desc: 'Annual Quality Assurance Report for 2023-24', size: '2.4 MB' },
  { title: 'AQAR 2022–23', desc: 'Annual Quality Assurance Report for 2022-23', size: '2.1 MB' },
  { title: 'AQAR 2021–22', desc: 'Annual Quality Assurance Report for 2021-22', size: '1.8 MB' },
  { title: 'AQAR 2020–21', desc: 'Annual Quality Assurance Report for 2020-21', size: '1.6 MB' },
];

export default function IQACPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#123B6D] to-[#0d2d54] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Target size={14} />
            Internal Quality Assurance Cell
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">IQAC</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Ensuring continuous quality enhancement through systematic assessment, feedback, and implementation of best practices at Mulund College of Commerce.
          </p>

          {/* Quick links to NAAC & NIRF */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/naac" className="flex items-center gap-2 px-5 py-2.5 bg-[#D4A017] text-white rounded-xl font-semibold text-sm hover:bg-[#b8891a] transition-all">
              NAAC A+ – 3.42 CGPA <ArrowRight size={14} />
            </Link>
            <Link href="/nirf" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/30 text-white rounded-xl font-semibold text-sm hover:bg-white/20 transition-all">
              NIRF Ranking <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-6 pb-20 space-y-10">
        {/* Key Initiatives */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-5">Key IQAC Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyInitiatives.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#123B6D]/10 text-[#123B6D] flex items-center justify-center mb-3">
                  <Icon size={18} />
                </div>
                <h3 className="font-bold text-[#1E293B] font-[var(--font-heading)] mb-1">{title}</h3>
                <p className="text-sm text-[#64748B]">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Plans */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-5">Annual Action Plans</h2>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="text-left px-6 py-3 font-semibold text-[#1E293B]">Year</th>
                  <th className="text-left px-6 py-3 font-semibold text-[#1E293B]">Focus Area</th>
                  <th className="text-left px-6 py-3 font-semibold text-[#1E293B]">Status</th>
                  <th className="text-left px-6 py-3 font-semibold text-[#1E293B]">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {actionPlans.map(p => (
                  <tr key={p.year} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#123B6D]">{p.year}</td>
                    <td className="px-6 py-4 text-[#64748B]">{p.focus}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 w-40">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                          <div className="h-full bg-[#123B6D] rounded-full" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-xs text-[#64748B] w-8">{p.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Meetings & AQAR side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-4">IQAC Meetings</h2>
            <div className="space-y-3">
              {meetings.map((m, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#123B6D]/10 flex items-center justify-center shrink-0">
                      <Calendar size={15} className="text-[#123B6D]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#D4A017] mb-0.5">{m.date}</div>
                      <p className="text-sm text-[#1E293B]">{m.agenda}</p>
                    </div>
                  </div>
                  {m.minutes && (
                    <button className="shrink-0 flex items-center gap-1 text-xs font-semibold text-[#123B6D] hover:text-[#0d2d54]">
                      <Download size={12} /> Minutes
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-4">AQAR Reports</h2>
            <div className="space-y-3">
              {reports.map((r, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <FileText size={15} className="text-red-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#1E293B]">{r.title}</div>
                      <div className="text-xs text-[#64748B]">{r.desc} · {r.size}</div>
                    </div>
                  </div>
                  <button className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-[#123B6D] text-white rounded-lg text-xs font-semibold hover:bg-[#0d2d54] transition-colors">
                    <Download size={12} /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* IQAC Members */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-5">IQAC Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {iqacMembers.map((m, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#123B6D] text-white font-bold text-lg flex items-center justify-center shrink-0 font-[var(--font-heading)]">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[#1E293B] text-sm">{m.name}</div>
                  <div className="text-xs text-[#64748B]">{m.role}</div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#123B6D]/10 text-[#123B6D]">{m.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
