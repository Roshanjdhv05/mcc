'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart2, Download, ChevronLeft, FileText, Calendar, ExternalLink } from 'lucide-react';

const accreditationNav = [
  { label: 'CERTIFICATES', href: '/accreditation', active: false },
  { label: 'NAAC', href: '/accreditation/naac/certificates', active: false },
  { label: 'NIRF', href: '/accreditation/nirf/annual-submissions', active: true },
  { label: 'AISHE', href: '/accreditation/aishe/annual-submissions', active: false },
];

const nirfSubmissions = [
  {
    year: '2024–25',
    category: 'College',
    status: 'Submitted',
    description: 'Annual NIRF data submission for the academic year 2024–25.',
  },
  {
    year: '2023–24',
    category: 'College',
    status: 'Submitted',
    description: 'Annual NIRF data submission for the academic year 2023–24.',
  },
  {
    year: '2022–23',
    category: 'College',
    status: 'Submitted',
    description: 'Annual NIRF data submission for the academic year 2022–23.',
  },
  {
    year: '2021–22',
    category: 'College',
    status: 'Submitted',
    description: 'Annual NIRF data submission for the academic year 2021–22.',
  },
];

export default function NirfAnnualSubmissionsPage() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        <div className="flex w-full h-12 items-center justify-center overflow-x-auto no-scrollbar">
          <div className="flex items-center h-full whitespace-nowrap border-l border-white/10">
            {accreditationNav.map((item, i) => (
              <Link key={i} href={item.href}
                className={`flex-shrink-0 h-full flex items-center px-6 md:px-8 lg:px-12 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider border-r border-white/10 ${
                  item.active ? 'bg-[#D4A017] text-white' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hero / Header ── */}
      <div className="relative py-10 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute left-8 lg:left-16 top-8 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#123B6D]/40" />)}
        </div>
        <div className="absolute right-8 lg:right-16 top-8 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#123B6D]/40" />)}
        </div>

        <div className="inline-flex items-center gap-2 bg-[#123B6D]/10 border border-[#123B6D]/20 text-[#123B6D] px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
          <BarChart2 size={13} /> NIRF
        </div>
        <h1 className="text-3xl lg:text-4xl font-black text-[#123B6D] tracking-tight mb-2">
          NIRF Annual Submissions
        </h1>
        <p className="text-gray-500 text-sm max-w-xl px-4 mb-6">
          National Institutional Ranking Framework annual data submissions by Mulund College of Commerce.
        </p>

        <Link
          href="/accreditation"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#123B6D]/30 text-[#123B6D] text-sm font-semibold hover:bg-[#123B6D]/5 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Certificates
        </Link>
      </div>

      {/* ── Submissions List ── */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-4">

        {/* Info Banner */}
        <div className="bg-[#123B6D] rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg mb-6">
          <div>
            <h2 className="text-base font-bold text-white">NIRF Data Portal</h2>
            <p className="text-white/70 text-sm mt-0.5">View MCC's official NIRF submissions on the Ministry of Education portal.</p>
          </div>
          <a
            href="https://www.nirfindia.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#D4A017] text-white font-semibold rounded-xl hover:bg-[#b8891a] transition-all shrink-0 text-sm"
          >
            <ExternalLink size={15} /> Visit NIRF Portal
          </a>
        </div>

        {/* Yearly Submissions */}
        {nirfSubmissions.map((sub, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#123B6D]/10 flex items-center justify-center flex-shrink-0">
                <Calendar size={22} className="text-[#123B6D]" />
              </div>
              <div>
                <h3 className="font-bold text-[#123B6D] text-base">{sub.year}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{sub.category} · {sub.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-16 sm:ml-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                {sub.status}
              </span>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-[#123B6D] hover:text-[#0e2f57] border border-[#123B6D]/20 px-3 py-1.5 rounded-lg hover:bg-[#123B6D]/5 transition-colors">
                <FileText size={13} /> View Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
