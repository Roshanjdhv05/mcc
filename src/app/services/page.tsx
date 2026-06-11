import type { Metadata } from 'next';
import { Search, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Service Portal | MCC Digital Experience Platform',
  description: 'Apply for Bonafide Certificate, Leaving Certificate, Railway Concession, and other student services.',
};

const services = [
  { title: 'Bonafide Certificate', icon: '🎓', desc: 'Official certification of your enrollment at MCC. Required for bank accounts, scholarships, etc.', time: '3–5 Working Days', steps: ['Submit application online', 'Pay processing fee (₹50)', 'Collect from admin office'], color: 'bg-blue-50 text-blue-700' },
  { title: 'Leaving Certificate', icon: '📄', desc: 'Certificate issued on departure from the college after completing your programme.', time: '5–7 Working Days', steps: ['Clear all dues', 'Submit application with NOC', 'Collect after verification'], color: 'bg-teal-50 text-teal-700' },
  { title: 'Railway Concession', icon: '🚂', desc: 'Get concession on railway season pass. Valid for local train travel in Mumbai.', time: '1–2 Working Days', steps: ['Fill online form', 'Attach photo ID', 'Collect concession form'], color: 'bg-amber-50 text-amber-700' },
  { title: 'Bus Pass', icon: '🚌', desc: 'BEST/MSRTC bus pass facility for eligible students with address proof.', time: '2–3 Working Days', steps: ['Submit address proof', 'Fill bus pass form', 'College stamp & signature'], color: 'bg-purple-50 text-purple-700' },
  { title: 'Scholarship Application', icon: '🏆', desc: 'Apply for government and institutional scholarships. Multiple categories available.', time: 'As per scheme', steps: ['Check eligibility criteria', 'Gather income proof', 'Submit online application'], color: 'bg-green-50 text-green-700' },
  { title: 'Character Certificate', icon: '⭐', desc: 'Certificate attesting good character and conduct during your stay at MCC.', time: '3–5 Working Days', steps: ['Submit application', 'Get faculty recommendation', 'Collect from admin'], color: 'bg-rose-50 text-rose-700' },
  { title: 'Library NOC', icon: '📚', desc: 'No Objection Certificate from the library for leaving college or for visa purposes.', time: '1–2 Working Days', steps: ['Return all library books', 'Clear dues if any', 'Collect NOC from library'], color: 'bg-cyan-50 text-cyan-700' },
  { title: 'Photocopy Request', icon: '📋', desc: 'Request photocopies of your evaluated exam answer books for review.', time: '7–10 Working Days', steps: ['Pay per-page fee', 'Submit exam seat details', 'Collect copies from exam office'], color: 'bg-indigo-50 text-indigo-700' },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-[#123B6D] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)] mb-2">Student Service Portal</h1>
          <p className="text-white/70 mb-6">Apply for certificates, concessions, and other student services online</p>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 max-w-lg border border-white/20">
            <Search size={18} className="text-white/60" />
            <input placeholder="Search services..." className="bg-transparent text-white placeholder-white/50 outline-none flex-1 text-sm" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-8 pb-16">
        {/* Application Status */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-8">
          <h2 className="font-bold text-[#123B6D] font-[var(--font-heading)] mb-4">Track Your Application</h2>
          <div className="flex gap-3">
            <input placeholder="Enter Application ID (e.g. MCC-2024-001234)" className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm outline-none focus:border-[#4DA8DA] transition-colors" />
            <button className="px-6 py-2.5 bg-[#123B6D] text-white font-semibold rounded-xl text-sm hover:bg-[#0d2d54] transition-all">Track</button>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group">
              <div className="p-6">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-[#1E293B] font-[var(--font-heading)] mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-3">{s.desc}</p>
                <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-4">
                  <Clock size={12} /> {s.time}
                </div>
                <div className="space-y-1.5 mb-5">
                  {s.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#64748B]">
                      <CheckCircle2 size={12} className="text-[#D4A017] flex-shrink-0" />
                      {step}
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 rounded-xl bg-[#123B6D] text-white text-xs font-semibold group-hover:bg-[#0d2d54] transition-all flex items-center justify-center gap-1">
                  Apply Now <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
