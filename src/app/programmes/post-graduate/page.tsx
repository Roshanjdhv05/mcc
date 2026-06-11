import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post Graduate Programmes | MCC Digital Experience Platform',
  description: 'Postgraduate degree programmes offered at Mulund College of Commerce.',
};

export default function PostGraduatePage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-6">Post Graduate</h1>
        <p className="text-lg text-[#64748B] mb-12 max-w-3xl">
          Advance your academic and professional journey with our postgraduate programmes including M.Com and M.Sc. IT.
        </p>
        
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8">
          <p className="text-[#64748B] italic">Programme details and course structures will be updated here shortly.</p>
        </div>
      </div>
    </div>
  );
}
