import type { Metadata } from 'next';
import { Download, Award, Star, CheckCircle, FileText, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NAAC Accreditation | MCC Digital Experience Platform',
  description: 'NAAC A+ accreditation details, criteria, and documents for Mulund College of Commerce.',
};

const criteria = [
  {
    num: 'C1', title: 'Curricular Aspects', score: 3.28,
    docs: ['Programme Outcomes & Course Outcomes', 'Academic Calendar 2024–25', 'Syllabus Revision Report', 'BOS Meeting Minutes'],
  },
  {
    num: 'C2', title: 'Teaching-Learning & Evaluation', score: 3.51,
    docs: ['Student Satisfaction Survey', 'Faculty Feedback Report', 'Teaching Methods Report', 'Assessment Reforms 2023-24'],
  },
  {
    num: 'C3', title: 'Research, Innovations & Extension', score: 3.42,
    docs: ['Research Publications 2023–24', 'Funded Projects List', 'Extension Activities Report', 'Innovation Cell Annual Report'],
  },
  {
    num: 'C4', title: 'Infrastructure & Learning Resources', score: 3.67,
    docs: ['Library Resources Report', 'Infrastructure Audit 2024', 'Lab Facilities Report', 'ICT Tools Usage Data'],
  },
  {
    num: 'C5', title: 'Student Support & Progression', score: 3.54,
    docs: ['Placement Report 2023–24', 'Scholarship Data', 'Alumni Contribution Report', 'Career Counseling Report'],
  },
  {
    num: 'C6', title: 'Governance, Leadership & Management', score: 3.38,
    docs: ['Strategic Plan 2024–29', 'Internal Audit Report', 'Faculty Welfare Policies', 'Governing Body Minutes'],
  },
  {
    num: 'C7', title: 'Institutional Values & Best Practices', score: 3.44,
    docs: ['Best Practices Report', 'Green Campus Initiatives', 'Gender Sensitization Programme', 'Community Development Activities'],
  },
];

const highlights = [
  { label: 'NAAC Grade', value: 'A+', icon: Award },
  { label: 'CGPA Score', value: '3.42', icon: Star },
  { label: 'Accreditation Cycle', value: '3rd Cycle', icon: TrendingUp },
  { label: 'Criteria Evaluated', value: '7', icon: CheckCircle },
];

export default function NAACPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#123B6D] to-[#1a5499] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4A017] text-white px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Award size={16} />
            NAAC Accredited – Grade A+
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">
            NAAC Accreditation
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            National Assessment and Accreditation Council — 3rd Cycle accreditation with A+ grade and CGPA of 3.42
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto px-4 md:px-12 mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center">
              <Icon size={24} className="text-[#D4A017] mx-auto mb-2" />
              <div className="text-3xl font-bold text-white font-[var(--font-heading)]">{value}</div>
              <div className="text-white/60 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-6 pb-20 space-y-6">
        {/* SSR Download Banner */}
        <div className="bg-[#123B6D] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h2 className="text-xl font-bold text-white font-[var(--font-heading)]">Self Study Report (SSR)</h2>
            <p className="text-white/70 text-sm mt-1">Download the complete NAAC SSR submitted for 3rd cycle accreditation.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#D4A017] text-white font-semibold rounded-xl hover:bg-[#b8891a] transition-all shrink-0">
            <Download size={16} /> Download SSR (PDF)
          </button>
        </div>

        {/* Criteria Cards */}
        <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">NAAC Criteria & Documents</h2>
        <div className="space-y-4">
          {criteria.map((c) => (
            <div key={c.num} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#123B6D] text-white font-bold text-sm flex items-center justify-center font-[var(--font-heading)]">
                    {c.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B] font-[var(--font-heading)]">{c.title}</h3>
                    <span className="text-xs text-[#64748B]">{c.docs.length} documents</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#123B6D]">{c.score}</span>
                  <div className="w-20 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#123B6D] rounded-full" style={{ width: `${(c.score / 4) * 100}%` }} />
                  </div>
                  <span className="text-xs text-[#94A3B8]">/ 4.00</span>
                </div>
              </div>
              <div className="divide-y divide-[#E2E8F0]">
                {c.docs.map((doc, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-[#94A3B8]" />
                      <span className="text-sm text-[#64748B]">{doc}</span>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-semibold text-[#123B6D] hover:text-[#0d2d54] transition-colors">
                      <Download size={12} /> PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
