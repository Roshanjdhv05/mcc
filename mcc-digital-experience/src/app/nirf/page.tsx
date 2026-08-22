import type { Metadata } from 'next';
import { Download, TrendingUp, BarChart2, Users, BookOpen, DollarSign, Star, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NIRF Ranking | MCC Digital Experience Platform',
  description: 'NIRF Ranking data and parameters for Mulund College of Commerce.',
};

const nirfParams = [
  {
    id: 'SS', title: 'Teaching, Learning & Resources', icon: BookOpen, score: 36.82,
    subParams: [
      { name: 'Student Strength', value: '2,850' },
      { name: 'Faculty Strength (Full-time)', value: '68' },
      { name: 'Faculty with PhD', value: '42%' },
      { name: 'Financial Resources & Utilization', value: '₹4.2 Cr' },
    ]
  },
  {
    id: 'RPC', title: 'Research and Professional Practice', icon: BarChart2, score: 11.24,
    subParams: [
      { name: 'Publications (Scopus/WoS)', value: '24' },
      { name: 'Patents Granted', value: '2' },
      { name: 'Projects & Consultancies', value: '8' },
      { name: 'Total Research Grants', value: '₹18.5 L' },
    ]
  },
  {
    id: 'GO', title: 'Graduation Outcomes', icon: TrendingUp, score: 18.91,
    subParams: [
      { name: 'PhD/Post-doctoral Enrolment', value: '—' },
      { name: 'Students Placed', value: '78%' },
      { name: 'Higher Studies Enrolled', value: '22%' },
      { name: 'Median Salary (₹)', value: '3.8 LPA' },
    ]
  },
  {
    id: 'OI', title: 'Outreach & Inclusivity', icon: Users, score: 15.60,
    subParams: [
      { name: 'Women Students (%)', value: '54%' },
      { name: 'EWS/SC/ST/OBC Students', value: '48%' },
      { name: 'PwD Students', value: '1.2%' },
      { name: 'Economically Challenged', value: '31%' },
    ]
  },
  {
    id: 'PR', title: 'Perception', icon: Star, score: 17.43,
    subParams: [
      { name: 'Peer Perception Score', value: '62/100' },
      { name: 'Academic Reputation', value: 'High' },
      { name: 'Employer Reputation', value: 'Good' },
      { name: 'Public Visibility', value: 'Strong' },
    ]
  },
];

const yearlyRankings = [
  { year: '2024', rank: 'Ranked (College)', score: 100.00 },
  { year: '2023', rank: 'Ranked (College)', score: 98.5 },
  { year: '2022', rank: 'Ranked (College)', score: 95.2 },
  { year: '2021', rank: 'Ranked (College)', score: 91.8 },
];

export default function NIRFPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a5499] to-[#0d2d54] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <Globe size={16} />
            National Institutional Ranking Framework
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">
            NIRF Ranking
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            India's Ministry of Education NIRF ranking methodology and MCC's performance across all parameters
          </p>
        </div>

        {/* Summary Stats */}
        <div className="max-w-4xl mx-auto px-4 md:px-12 mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Overall Score', value: '100.0', sub: 'out of 100' },
            { label: 'Category', value: 'College', sub: 'NIRF 2024' },
            { label: 'Students Enrolled', value: '2,850+', sub: 'Academic Year 24-25' },
            { label: 'Faculty Count', value: '68', sub: 'Full-time faculty' },
          ].map(s => (
            <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-white font-[var(--font-heading)]">{s.value}</div>
              <div className="text-white/50 text-xs mt-1">{s.sub}</div>
              <div className="text-white/80 text-xs font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-6 pb-20 space-y-8">
        {/* Download Banner */}
        <div className="bg-[#123B6D] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h2 className="text-xl font-bold text-white font-[var(--font-heading)]">NIRF Data Submissions</h2>
            <p className="text-white/70 text-sm mt-1">Download the official NIRF data submission reports for all years.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#D4A017] text-white font-semibold rounded-xl hover:bg-[#b8891a] transition-all shrink-0">
            <Download size={16} /> Download NIRF Report
          </button>
        </div>

        {/* Year-wise Rankings */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-4">Year-wise Performance</h2>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="text-left px-6 py-3 font-semibold text-[#1E293B]">Year</th>
                  <th className="text-left px-6 py-3 font-semibold text-[#1E293B]">Category</th>
                  <th className="text-left px-6 py-3 font-semibold text-[#1E293B]">Score</th>
                  <th className="text-left px-6 py-3 font-semibold text-[#1E293B]">Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {yearlyRankings.map(r => (
                  <tr key={r.year} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#123B6D]">{r.year}</td>
                    <td className="px-6 py-4 text-[#64748B]">{r.rank}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#1E293B]">{r.score}</span>
                        <div className="w-24 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                          <div className="h-full bg-[#123B6D] rounded-full" style={{ width: `${r.score}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1 text-xs font-semibold text-[#123B6D] hover:text-[#0d2d54] transition-colors">
                        <Download size={12} /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NIRF Parameters */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-4">Ranking Parameters</h2>
          <div className="space-y-4">
            {nirfParams.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#123B6D]/10 text-[#123B6D] flex items-center justify-center">
                      <p.icon size={18} />
                    </div>
                    <h3 className="font-bold text-[#1E293B] font-[var(--font-heading)]">{p.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <span className="text-lg font-bold text-[#123B6D]">{p.score}</span>
                      <span className="text-xs text-[#94A3B8]"> / 100</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[#E2E8F0]">
                  {p.subParams.map((sp, i) => (
                    <div key={i} className="p-4">
                      <div className="text-lg font-bold text-[#1E293B]">{sp.value}</div>
                      <div className="text-xs text-[#94A3B8] mt-0.5">{sp.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
