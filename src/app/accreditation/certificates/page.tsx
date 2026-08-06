'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Medal, BarChart2, ShieldCheck, X, Maximize2, Download } from 'lucide-react';

const accreditationNav = [
  { label: 'ABOUT ACCREDITATION', href: '/accreditation', active: false },
  { label: 'CERTIFICATES', href: '/accreditation/certificates', active: true },
  { label: 'NAAC', href: '/accreditation/naac/certificates', active: false },
  { label: 'NIRF', href: '/accreditation/nirf/annual-submissions', active: false },
  { label: 'AISHE', href: '/accreditation/aishe/annual-submissions', active: false },
];

const pdfCertificates = [
  {
    title: '2(f) – Certificate',
    description: 'UGC 2(f) recognition certificate',
    url: '/2F.pdf',
    accent: '#123B6D',
  },
  {
    title: '12(B) – Certificate',
    description: 'UGC 12(B) certification document',
    url: '/12b.pdf',
    accent: '#123B6D',
  },
  {
    title: 'Conferment of Autonomy',
    description: 'Certificate of autonomous status',
    url: '/Conferment of Autonomy (Grant of Autonomy).pdf',
    accent: '#123B6D',
  },
];

export default function CertificatesPage() {
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

      {/* ── PDF Certificate Cards ── */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {pdfCertificates.map((cert) => (
            <button
              key={cert.title}
              onClick={() => setSelectedPdf({ title: cert.title, url: cert.url })}
              className="group bg-white rounded-2xl shadow-sm border border-[#E2E8F0] hover:shadow-lg hover:border-[#123B6D]/30 transition-all overflow-hidden flex flex-col text-left w-full"
            >
              {/* PDF Preview Thumbnail */}
              <div className="relative w-full bg-gray-100 overflow-hidden" style={{ height: '260px' }}>
                <iframe
                  src={`${cert.url}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full pointer-events-none"
                  title={cert.title}
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#123B6D]/0 group-hover:bg-[#123B6D]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-[#123B6D] font-bold text-sm shadow-lg">
                    <Maximize2 size={16} /> View Full PDF
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#123B6D] text-sm leading-tight">{cert.title}</h2>
                  <p className="text-gray-400 text-xs mt-0.5">{cert.description}</p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                  style={{ backgroundColor: `${cert.accent}15` }}
                >
                  <Maximize2 size={14} style={{ color: cert.accent }} />
                </div>
              </div>
            </button>
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
