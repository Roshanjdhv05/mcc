import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, FileText, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admissions Portal | MCC Digital Experience Platform',
  description: 'Apply to Mulund College of Commerce. Check eligibility, merit lists, and admission process.',
};

const steps = [
  { num: '01', title: 'Check Eligibility', desc: 'Review the minimum qualification criteria for your chosen programme.' },
  { num: '02', title: 'Register Online', desc: 'Create an account on the MCC portal and fill out the application form.' },
  { num: '03', title: 'Document Upload', desc: 'Upload all required documents — marksheets, ID proof, category certificate.' },
  { num: '04', title: 'Merit List', desc: 'Check the published merit list. Shortlisted students will receive notification.' },
  { num: '05', title: 'Confirm Admission', desc: 'Pay admission fees and confirm your seat within the specified deadline.' },
  { num: '06', title: 'Welcome!', desc: 'Collect your ID card and join orientation week. Welcome to MCC!' },
];

const faqs = [
  { q: 'What is the eligibility for BCom?', a: 'A minimum of 45% marks in HSC (10+2) with Commerce/Science stream from a recognized board.' },
  { q: 'When does the admission process begin?', a: 'Typically in June every year following HSC/SSC results. Merit lists are published online.' },
  { q: 'Is there a management quota?', a: 'Yes, a small percentage of seats are available under management quota. Contact the office for details.' },
  { q: 'Are reservations applicable?', a: 'Yes, Government of Maharashtra reservation norms are followed for all programmes.' },
];

export default function AdmissionsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#123B6D] pt-10 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4A017] blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A017]/20 text-[#D4A017] text-sm font-semibold mb-5 border border-[#D4A017]/30">
            Admissions Open 2024–25
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4 max-w-2xl">
            Begin Your Journey at MCC
          </h1>
          <p className="text-white/75 text-lg max-w-xl mb-8">
            Join thousands of students who have built successful careers from Mulund College of Commerce.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="px-7 py-3.5 bg-[#D4A017] text-white font-semibold rounded-xl hover:bg-[#b8891a] transition-all shadow-lg">
              Apply Online
            </a>
            <a href="#" className="px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all">
              Download Prospectus
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 -mt-10 pb-16 space-y-16">
        {/* Merit List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'FYJC Merit List', status: 'Published', badge: 'bg-green-100 text-green-700' },
            { title: 'BCom Merit List', status: 'Published', badge: 'bg-green-100 text-green-700' },
            { title: 'MCom Merit List', status: 'Coming Soon', badge: 'bg-amber-100 text-amber-700' },
          ].map((m) => (
            <div key={m.title} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#1E293B] font-[var(--font-heading)]">{m.title}</p>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mt-2 inline-block ${m.badge}`}>{m.status}</span>
              </div>
              <button className="w-10 h-10 rounded-xl bg-[#123B6D]/10 flex items-center justify-center text-[#123B6D] hover:bg-[#123B6D] hover:text-white transition-all">
                <FileText size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Admission Process */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-8">Admission Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#123B6D] text-white font-bold text-sm flex items-center justify-center mb-4 font-[var(--font-heading)]">
                  {s.num}
                </div>
                <h3 className="font-bold text-[#1E293B] mb-2 font-[var(--font-heading)]">{s.title}</h3>
                <p className="text-sm text-[#64748B]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-6">Eligibility Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { prog: 'FYJC (Commerce)', crit: 'SSC (10th) pass from any recognized board. Minimum 35%.' },
              { prog: 'B.Com', crit: 'HSC (12th) with Commerce/Science stream. Min 45% aggregate.' },
              { prog: 'M.Com', crit: 'B.Com or equivalent degree with minimum 45% marks.' },
              { prog: 'M.Sc. IT', crit: 'BSc IT / BCA / B.E. Computer with minimum 45% marks.' },
            ].map((e) => (
              <div key={e.prog} className="flex gap-3">
                <CheckCircle2 size={20} className="text-[#D4A017] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1E293B] mb-1">{e.prog}</p>
                  <p className="text-sm text-[#64748B]">{e.crit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle size={20} className="text-[#4DA8DA] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E293B] mb-2">{f.q}</p>
                    <p className="text-sm text-[#64748B]">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
