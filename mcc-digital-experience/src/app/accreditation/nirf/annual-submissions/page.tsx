'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart2, Download, ChevronLeft, Maximize2, X, ExternalLink } from 'lucide-react';

const accreditationNav = [
  { label: 'ABOUT ACCREDITATION', href: '/accreditation', active: false },
  { label: 'CERTIFICATES', href: '/accreditation/certificates', active: false },
  { label: 'NAAC', href: '/accreditation/naac/certificates', active: false },
  { label: 'NIRF', href: '/accreditation/nirf/annual-submissions', active: true },
  { label: 'AISHE', href: '/accreditation/aishe/annual-submissions', active: false },
];

const nirfSubmissions = [
  {
    year: '2024–25',
    description: 'Annual NIRF data submission for 2024–25.',
    url: '/NIRF/NIRF Report  2024-25.pdf',
    accent: '#123B6D',
  },
  {
    year: '2023–24',
    description: 'Annual NIRF data submission for 2023–24.',
    url: '/NIRF/NIRF Report  2023-24.pdf',
    accent: '#123B6D',
  },
  {
    year: '2022–23',
    description: 'Annual NIRF data submission for 2022–23.',
    url: '/NIRF/NIRF Report  2022-23.pdf',
    accent: '#123B6D',
  },
  {
    year: '2021–22',
    description: 'Annual NIRF data submission for 2021–22.',
    url: '/NIRF/NIRF Report  2021-22.pdf',
    accent: '#123B6D',
  },
  {
    year: '2020–21',
    description: 'Annual NIRF data submission for 2020–21.',
    url: '/NIRF/NIRF Report  2020-21.pdf',
    accent: '#123B6D',
  },
  {
    year: '2019–20',
    description: 'Annual NIRF data submission for 2019–20.',
    url: '/NIRF/NIRF Report  2019-20.pdf',
    accent: '#123B6D',
  },
];

export default function NirfAnnualSubmissionsPage() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url: string } | null>(null);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPdf) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedPdf]);

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


      </div>

      {/* ── Submissions ── */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 space-y-4">

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

        {/* ── PDF Certificate Cards (Interactive) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {nirfSubmissions.map((sub) => (
            <div
              key={sub.year}
              className="group bg-white rounded-2xl shadow-sm border border-[#E2E8F0] hover:shadow-lg hover:border-[#123B6D]/30 transition-all overflow-hidden flex flex-col text-left w-full"
            >
              {/* PDF Preview Thumbnail (Interactive) */}
              <div className="relative w-full bg-gray-100 overflow-hidden" style={{ height: '350px' }}>
                <iframe
                  src={`${sub.url}#view=FitH&toolbar=1&navpanes=0&scrollbar=1`}
                  className="w-full h-full"
                  title={`NIRF ${sub.year}`}
                  loading="lazy"
                />
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#123B6D] text-sm leading-tight">NIRF {sub.year}</h2>
                  <p className="text-gray-400 text-xs mt-0.5">{sub.description}</p>
                </div>
                <button
                  onClick={() => setSelectedPdf({ title: `NIRF ${sub.year}`, url: sub.url })}
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3 hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ backgroundColor: `${sub.accent}15` }}
                  title="View Fullscreen"
                >
                  <Maximize2 size={14} style={{ color: sub.accent }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full-screen PDF Modal ── */}
      {selectedPdf && (
        <div className="fixed inset-0 z-[300] flex flex-col" style={{ background: 'rgba(0,0,0,0.85)' }}>
          {/* Modal Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#123B6D] text-white shadow-lg flex-shrink-0">
            <h3 className="font-bold text-base truncate">{selectedPdf.title}</h3>
            <div className="flex items-center gap-2">
              <a
                href={selectedPdf.url}
                download
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors px-3 py-1.5 rounded-lg text-sm font-semibold"
              >
                <Download size={15} /> Download
              </a>
              <button
                onClick={() => setSelectedPdf(null)}
                className="p-2 bg-white/15 hover:bg-white/25 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src={`${selectedPdf.url}#view=FitH`}
              className="w-full h-full border-none"
              title={selectedPdf.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}


