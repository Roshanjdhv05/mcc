import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Service Portal | MCC Digital Experience Platform',
  description: 'Apply for Bonafide Certificate, Leaving Certificate, Railway Concession, and other student services.',
};

const services = [
  {
    title: 'Bonafide Certificate',
    icon: '🎓',
    desc: 'Official certification of your enrollment at MCC. Required for bank accounts, scholarships, etc.',
    time: '~2 Weeks',
    steps: ['Fill the online form', 'Take two printouts & sign', 'Visit college & pay ₹100'],
    color: 'bg-blue-50 text-blue-700',
    href: '/forms/bonafide-certificate',
  },
  {
    title: 'Character Certificate',
    icon: '⭐',
    desc: 'Certificate attesting good character and conduct during your stay at MCC.',
    time: '~2 Weeks',
    steps: ['Fill the online form', 'Take two printouts & sign', 'Visit college & pay ₹100'],
    color: 'bg-rose-50 text-rose-700',
    href: '/forms/character-certificate',
  },
  {
    title: 'Caste Validity Certificate',
    icon: '📜',
    desc: 'College caste verification record for government or professional course purposes.',
    time: '~2 Weeks',
    steps: ['Fill the online form', 'Take two printouts & sign', 'Visit college & pay ₹100'],
    color: 'bg-orange-50 text-orange-700',
    href: '/forms/caste-validity',
  },
  {
    title: 'Transfer Certificate',
    icon: '🔄',
    desc: 'Issued after completing a degree or on transfer to another institute within University of Mumbai.',
    time: '~2 Weeks',
    steps: ['Fill the online form', 'Take two printouts & sign', 'Visit college & pay ₹100'],
    color: 'bg-teal-50 text-teal-700',
    href: '/forms/transfer-certificate',
  },
  {
    title: 'Migration Certificate',
    icon: '🏛️',
    desc: 'Required when joining an institute outside the University of Mumbai affiliation.',
    time: '~2 Weeks',
    steps: ['Fill the online form', 'Take two printouts & sign', 'Visit college & pay ₹100'],
    color: 'bg-purple-50 text-purple-700',
    href: '/forms/migration-certificate',
  },
  {
    title: 'Transcript Certificate',
    icon: '📋',
    desc: 'Official academic transcript for higher education institutes, visa, or international jobs.',
    time: '~2 Weeks',
    steps: ['Fill the online form', 'Take two printouts & sign', 'Visit college & collect'],
    color: 'bg-sky-50 text-sky-700',
    href: '/forms/transcript-certificate',
  },
  {
    title: 'Duplicate Marksheet',
    icon: '📄',
    desc: 'Duplicate marksheet/grade-card when original is lost. Police FIR copy required.',
    time: '~2 Weeks',
    steps: ['File FIR at police station', 'Fill the online form', 'Visit college & pay ₹100/sheet'],
    color: 'bg-amber-50 text-amber-700',
    href: '/forms/duplicate-marksheet',
  },
  {
    title: 'Marksheet Verification',
    icon: '✅',
    desc: 'Official verification of marksheets/grade-cards for employers or institutions.',
    time: '~2 Weeks',
    steps: ['Fill the online form', 'Take two printouts & sign', 'Visit college & pay fee'],
    color: 'bg-green-50 text-green-700',
    href: '/forms/marksheet-verification',
  },
  {
    title: 'Conversion Certificate',
    icon: '🔢',
    desc: 'Conversion of grade-card marks to percentage for higher education or recruitment.',
    time: '~2 Weeks',
    steps: ['Fill the online form', 'Take two printouts & sign', 'Visit college & pay ₹100'],
    color: 'bg-fuchsia-50 text-fuchsia-700',
    href: '/forms/conversion-certificate',
  },
  {
    title: 'Form 112 Attestation (ICAI)',
    icon: '📝',
    desc: 'Attestation on ICAI Form 112 for articleship/industrial training compliance. Charges: NIL.',
    time: '~1 Week',
    steps: ['Fill the online form', 'Attach CA Inter results & Form 112', 'Visit college — NIL charges'],
    color: 'bg-teal-50 text-teal-800',
    href: '/forms/form-112-attestation',
  },
  {
    title: 'Railway Concession',
    icon: '🚂',
    desc: 'Get concession on railway season pass. Valid for local train travel in Mumbai.',
    time: '1–2 Working Days',
    steps: ['Fill form at admin office', 'Attach photo ID', 'Collect concession form'],
    color: 'bg-amber-50 text-amber-700',
    href: '/forms',
  },
  {
    title: 'Scholarship Application',
    icon: '🏆',
    desc: 'Apply for government and institutional scholarships. Multiple categories available.',
    time: 'As per scheme',
    steps: ['Check eligibility criteria', 'Gather income proof', 'Submit online application'],
    color: 'bg-green-50 text-green-700',
    href: '/forms',
  },
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
            <input
              placeholder="Enter Application ID (e.g. MCC-2024-001234)"
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm outline-none focus:border-[#4DA8DA] transition-colors"
            />
            <button className="px-6 py-2.5 bg-[#123B6D] text-white font-semibold rounded-xl text-sm hover:bg-[#0d2d54] transition-all">
              Track
            </button>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group flex flex-col"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-[#1E293B] font-[var(--font-heading)] mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-3">{s.desc}</p>
                <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-4">
                  <Clock size={12} /> {s.time}
                </div>
                <div className="space-y-1.5 mb-5 flex-1">
                  {s.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#64748B]">
                      <CheckCircle2 size={12} className="text-[#D4A017] flex-shrink-0" />
                      {step}
                    </div>
                  ))}
                </div>
                <Link
                  href={s.href}
                  className="w-full py-2.5 rounded-xl bg-[#123B6D] text-white text-xs font-semibold group-hover:bg-[#0d2d54] transition-all flex items-center justify-center gap-1"
                >
                  Apply Now <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
