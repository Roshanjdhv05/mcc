import React from 'react';
import Link from 'next/link';

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 md:py-20 font-sans">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#123B6D] px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10 font-[var(--font-heading)]">Admission</h1>
            <div className="w-16 h-1 bg-[#D4A017] mx-auto rounded-full relative z-10"></div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="prose max-w-none text-gray-700 text-lg leading-relaxed mb-10 space-y-6">
              <p>
                The Admissions to Junior College (Class XI &amp; XII) as well to Degree programmes (Under-Graduation and Post Graduation) are conducted with absolute transparency, fairness and in adherence to all the guidelines and rules of the Government of Maharashtra and the University of Mumbai. We do not expect any form of capitation fee and/or donation. If you suspect any malpractice in the admission process, kindly inform the principal at the earliest.
              </p>
              <p className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 text-[#123B6D]">
                For admission to PhD Programme, visit the <Link href="/research" className="font-bold underline hover:text-[#D4A017] transition-colors">Research Section</Link> of the website.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
              <Link 
                href="/admission/jr-college" 
                className="group flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-100 rounded-2xl hover:border-[#123B6D] hover:shadow-lg transition-all text-center"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#123B6D] transition-colors">
                  <svg className="w-8 h-8 text-[#123B6D] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#123B6D] transition-colors">Junior College</h3>
                <p className="text-sm text-gray-500 mt-2">Class XI &amp; XII Admissions</p>
              </Link>

              <Link 
                href="/admission/degree-college" 
                className="group flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-100 rounded-2xl hover:border-[#123B6D] hover:shadow-lg transition-all text-center"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#123B6D] transition-colors">
                  <svg className="w-8 h-8 text-[#123B6D] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#123B6D] transition-colors">Degree College</h3>
                <p className="text-sm text-gray-500 mt-2">UG &amp; PG Programmes</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
