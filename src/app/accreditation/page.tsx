'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Medal, Award, FileText, CheckCircle, ShieldCheck, GraduationCap, BarChart2 } from 'lucide-react';

const accreditationNav = [
  { label: 'CERTIFICATES', href: '/accreditation', active: true },
  { label: 'NAAC', href: '/accreditation/naac/certificates', active: false },
  { label: 'NIRF', href: '/accreditation/nirf/annual-submissions', active: false },
  { label: 'AISHE', href: '/accreditation/aishe/annual-submissions', active: false },
];

export default function AccreditationPage() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 200) setNavVisible(false);
      else if (y < lastScrollY) setNavVisible(true);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);



  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-12 font-sans">
      
      {/* ── Secondary Accreditation Nav ── */}
      <div className={`bg-[#123B6D] w-full shadow-md z-40 sticky transition-all duration-300 ${navVisible ? 'top-[64px] md:top-[150px] lg:top-[185px] xl:top-[195px]' : 'top-0'}`}>
        {/* Static Nav (All Screens) */}
        <div 
          className="flex w-full h-12 items-center justify-center overflow-x-auto no-scrollbar"
        >
          <div className="flex items-center h-full whitespace-nowrap border-l border-white/10">
            {accreditationNav.map((item, i) => (
              <Link key={i} href={item.href}
                className={`flex-shrink-0 h-full flex items-center px-6 md:px-8 lg:px-12 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider border-r border-white/10 ${
                  item.active ? 'bg-[#D4A017] text-white' : 'text-white/90 hover:text-white hover:bg-white/10 active:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <div className="relative py-14 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute left-8 lg:left-16 top-10 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#123B6D]/40" />)}
        </div>
        <div className="absolute right-8 lg:right-16 top-10 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#123B6D]/40" />)}
        </div>
        <div className="inline-flex items-center gap-2 bg-[#123B6D]/10 border border-[#123B6D]/20 text-[#123B6D] px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
          <Medal size={13} /> Accreditation
        </div>
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-[#123B6D] tracking-tight mb-4">
          Excellence Recognized
        </h1>
        <p className="text-gray-600 text-sm lg:text-base max-w-2xl px-4">
          Mulund College of Commerce takes pride in its consistent recognition by top national bodies, demonstrating our unwavering commitment to quality education.
        </p>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        
        {/* Card 1 */}
        <Link href="/accreditation/2b-certificate" className="bg-white rounded-3xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow group flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center mb-6 group-hover:bg-[#123B6D] transition-colors">
            <FileText className="text-[#123B6D] group-hover:text-white transition-colors" size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-3">2 B – Certificate</h2>
          <p className="text-gray-500 text-sm">View our UGC 2(f) and 12(B) recognition certificates and related documents.</p>
        </Link>

        {/* Card 2 */}
        <Link href="/accreditation/12f-certificate" className="bg-white rounded-3xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow group flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center mb-6 group-hover:bg-[#123B6D] transition-colors">
            <CheckCircle className="text-[#123B6D] group-hover:text-white transition-colors" size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-3">12 F – Certificate</h2>
          <p className="text-gray-500 text-sm">Official documentation and certification for our 12 F status.</p>
        </Link>

        {/* Card 3 */}
        <Link href="/accreditation/autonomous/grant" className="bg-white rounded-3xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow group flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center mb-6 group-hover:bg-[#123B6D] transition-colors">
            <GraduationCap className="text-[#123B6D] group-hover:text-white transition-colors" size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-3">Grant of Autonomy (Certificate)</h2>
          <p className="text-gray-500 text-sm">Details and certificate regarding our grant of autonomy.</p>
        </Link>

        {/* Card 4 */}
        <Link href="/accreditation/naac/certificates" className="bg-white rounded-3xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow group flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#D4A017]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4A017] transition-colors">
            <Award className="text-[#D4A017] group-hover:text-white transition-colors" size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-3">NAAC</h2>
          <p className="text-gray-500 text-sm">National Assessment and Accreditation Council certificates and reports.</p>
        </Link>

        {/* Card 5 */}
        <Link href="/accreditation/nirf/annual-submissions" className="bg-white rounded-3xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow group flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center mb-6 group-hover:bg-[#123B6D] transition-colors">
            <BarChart2 className="text-[#123B6D] group-hover:text-white transition-colors" size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-3">NIRF</h2>
          <p className="text-gray-500 text-sm">National Institutional Ranking Framework annual submissions and data.</p>
        </Link>

        {/* Card 6 */}
        <Link href="/accreditation/aishe/annual-submissions" className="bg-white rounded-3xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow group flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center mb-6 group-hover:bg-[#123B6D] transition-colors">
            <ShieldCheck className="text-[#123B6D] group-hover:text-white transition-colors" size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-3">AISHE</h2>
          <p className="text-gray-500 text-sm">All India Survey on Higher Education reports and data submissions.</p>
        </Link>
      </div>
    </div>
  );
}

