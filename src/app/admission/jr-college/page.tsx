import React from 'react';
import Link from 'next/link';

export default function JrCollegeAdmissionPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 md:py-20 font-sans">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="mb-6">
          <Link href="/admission" className="text-[#123B6D] font-semibold hover:underline flex items-center gap-1">
            &larr; Back to Admission
          </Link>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#123B6D] px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10 font-[var(--font-heading)]">Junior College Admission</h1>
            <div className="w-16 h-1 bg-[#D4A017] mx-auto rounded-full relative z-10"></div>
          </div>
          
          <div className="p-8 md:p-12 space-y-8">
            <div className="rounded-2xl bg-[#f0fdf4] border border-green-100 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-[#014d4e] mb-4">Class XI (FYJC) Admission</h2>
              <ul className="text-base md:text-lg text-gray-700 space-y-4 list-disc pl-6">
                <li>Allotted by the Centralised Online Admission Process of the Government of Maharashtra. After the declaration of Class X results, the students are expected to immediately apply to this website <a href="https://mahafyjcadmissions.in/" target="_blank" rel="noopener noreferrer" className="text-[#008e59] font-bold hover:underline">mahafyjcadmissions.in</a>.</li>
                <li>Entire timeline, eligibility and documentation of class XI is decided by the government and communicated through the website of the CAP process.</li>
                <li>Once the Mulund College of Commerce is allotted to any candidate under the CAP round, the candidate is expected to immediately visit the college website, read the relevant notices, make online application at the college application portal and complete the document submission &amp; fee payment part, before the given deadline.</li>
                <li>The elective subjects (Maths/Secretarial practice or Languages) in the FYJC are allotted as per the merit and preference, after the admission is secured in the college.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#f0fdf4] border border-green-100 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-[#014d4e] mb-4">Class XII (SYJC) Admission</h2>
              <ul className="text-base md:text-lg text-gray-700 space-y-4 list-disc pl-6">
                <li>A few admissions to Class XII are given to outside students every year, the notice of which is put up in the month of April or May.</li>
                <li>The admission is confirmed at the college level by following the guidelines of the education department.</li>
                <li>Seats are made available as per the vacancy for that year.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
