import React from 'react';
import Link from 'next/link';

export default function DegreeCollegeAdmissionPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10 font-[var(--font-heading)]">Degree College Admission</h1>
            <div className="w-16 h-1 bg-[#D4A017] mx-auto rounded-full relative z-10"></div>
          </div>

          <div className="p-8 md:p-12 space-y-8">

            {/* General Info */}
            <div className="rounded-2xl bg-blue-50/50 border border-blue-100 p-6 md:p-8 space-y-4">
              <ul className="text-base md:text-lg text-gray-700 space-y-4 list-disc pl-6">
                <li>The admission to undergraduate and postgraduate programmes is allotted as per the guidelines of University of Mumbai. The schedule of admission is decided and declared by the University of Mumbai each year.</li>
                <li>Each student is expected to first fill up the form at the <strong>University Application Portal</strong> and then fill it up at the <strong>College Application Portal</strong>. Both the forms should be filled before the last date of application as per the schedule declared by the University of Mumbai.</li>
                <li>During the period of admission, read the detailed admission notices regularly to keep yourself updated of the admission process.</li>
              </ul>
            </div>

            {/* Tentative Schedule */}
            <div className="rounded-2xl bg-[#f0fdf4] border border-green-100 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-[#014d4e] mb-5">Tentative Application Schedule</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
                  <p className="text-sm font-bold text-[#123B6D] uppercase tracking-wider mb-1">Undergraduate Programmes</p>
                  <p className="text-2xl font-black text-[#014d4e]">May 10<sup>th</sup> – May 25<sup>th</sup></p>
                  <p className="text-xs text-gray-500 mt-1">Tentative period for application</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
                  <p className="text-sm font-bold text-[#123B6D] uppercase tracking-wider mb-1">Post Graduate Programmes</p>
                  <p className="text-2xl font-black text-[#014d4e]">May 25<sup>th</sup> – June 30<sup>th</sup></p>
                  <p className="text-xs text-gray-500 mt-1">Tentative period for application</p>
                </div>
              </div>
            </div>

            {/* Second / Third Year */}
            <div className="rounded-2xl bg-[#f0fdf4] border border-green-100 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-[#014d4e] mb-4">Direct Admissions (2nd &amp; 3rd Year / Part II PG)</h2>
              <ul className="text-base md:text-lg text-gray-700 space-y-4 list-disc pl-6">
                <li>Every year a few admissions to Second Year and Third Year of UG Programmes and Part II of PG Programmes are allotted as per the vacancies for that year.</li>
                <li>The admissions given are on merit basis to the students who meet the eligibility criteria and apply in the application window.</li>
              </ul>
            </div>

            {/* Explore Programmes CTA */}
            <div className="text-center pt-2">
              <Link
                href="/programmes"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#123B6D] text-white rounded-full font-bold text-base hover:bg-[#0e2e56] transition-colors shadow-sm"
              >
                Explore All Programmes &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
