'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Medal, Download, X, ChevronLeft } from 'lucide-react';

const accreditationNav = [
  { label: 'CERTIFICATES', href: '/accreditation', active: false },
  { label: 'NAAC', href: '/accreditation/naac/certificates', active: false },
  { label: 'NIRF', href: '/accreditation/nirf/annual-submissions', active: false },
  { label: 'AISHE', href: '/accreditation/aishe/annual-submissions', active: false },
];

export default function TwoBCertificatePage() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [pdfError, setPdfError] = useState(false);

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
          <Medal size={13} /> UGC Recognition
        </div>
        <h1 className="text-3xl lg:text-4xl font-black text-[#123B6D] tracking-tight mb-2">
          2(f) Certificate
        </h1>
        <p className="text-gray-500 text-sm max-w-xl px-4 mb-6">
          University Grants Commission recognition under Section 2(f) of the UGC Act.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/accreditation"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#123B6D]/30 text-[#123B6D] text-sm font-semibold hover:bg-[#123B6D]/5 transition-colors"
          >
            <ChevronLeft size={16} /> Back to Certificates
          </Link>
          <a
            href="/2F.pdf"
            download
            className="flex items-center gap-2 bg-[#123B6D] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0e2f57] transition-colors"
          >
            <Download size={16} /> Download PDF
          </a>
        </div>
      </div>

      {/* ── PDF Viewer ── */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] overflow-hidden" style={{ height: '80vh' }}>
          {!pdfError ? (
            <iframe
              src="/2F.pdf#view=FitH&toolbar=1&navpanes=0"
              className="w-full h-full border-none"
              title="UGC 2(f) Certificate"
              onError={() => setPdfError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500">
              <X size={48} className="text-gray-300" />
              <p className="font-semibold text-lg">Unable to display PDF</p>
              <p className="text-sm text-gray-400">Please download the file to view it.</p>
              <a
                href="/2F.pdf"
                download
                className="flex items-center gap-2 bg-[#123B6D] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0e2f57] transition-colors"
              >
                <Download size={16} /> Download 2(f) Certificate
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
