'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Medal, BarChart2, ShieldCheck, X, Maximize2, Download } from 'lucide-react';

const accreditationNav = [
  { label: 'ABOUT ACCREDITATION', href: '/accreditation', active: true },
  { label: 'CERTIFICATES', href: '/accreditation/certificates', active: false },
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
  {
    title: 'NAAC Accreditation',
    description: 'NAAC accreditation certificates',
    url: '/NACC ACCREDITATION CERTIFICATES.pdf',
    accent: '#D4A017',
  },
];

export default function AccreditationPage() {
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

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-10 space-y-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-[#E2E8F0] space-y-6">
           <h2 className="text-2xl lg:text-3xl font-bold text-[#123B6D]">About Our Accreditations</h2>
           <p className="text-gray-600 leading-relaxed text-lg">
             Accreditation is a mark of quality assurance and institutional excellence. Over the years, Mulund College of Commerce has consistently achieved outstanding grades and recognition from various statutory and accrediting bodies. These accolades are a testament to our continuous pursuit of academic rigor, holistic student development, and robust infrastructural facilities.
           </p>
           <p className="text-gray-600 leading-relaxed text-lg">
             Our institution is proudly recognized by the University Grants Commission (UGC) under Section 2(f) and 12(B) of the UGC Act. Furthermore, we have successfully undergone multiple cycles of assessment and accreditation by the National Assessment and Accreditation Council (NAAC), achieving commendable grades that reflect our dedication to educational excellence.
           </p>
           <p className="text-gray-600 leading-relaxed text-lg">
             We also actively participate in the National Institutional Ranking Framework (NIRF) and submit our data annually to the All India Survey on Higher Education (AISHE). These participations ensure transparency, accountability, and continuous improvement in our educational practices.
           </p>
        </div>

        {/* ── PDF Certificate Cards (Interactive) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {pdfCertificates.map((cert) => (
            <div
              key={cert.title}
              className="group bg-white rounded-2xl shadow-sm border border-[#E2E8F0] hover:shadow-lg hover:border-[#123B6D]/30 transition-all overflow-hidden flex flex-col text-left w-full"
            >
              {/* PDF Preview Thumbnail (Interactive) */}
              <div className="relative w-full bg-gray-100 overflow-hidden" style={{ height: '350px' }}>
                <iframe
                  src={`${cert.url}#view=FitH&toolbar=1&navpanes=0&scrollbar=1`}
                  className="w-full h-full"
                  title={cert.title}
                  loading="lazy"
                />
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#123B6D] text-sm leading-tight">{cert.title}</h2>
                  <p className="text-gray-400 text-xs mt-0.5">{cert.description}</p>
                </div>
                <button
                  onClick={() => setSelectedPdf({ title: cert.title, url: cert.url })}
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3 hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ backgroundColor: `${cert.accent}15` }}
                  title="View Fullscreen"
                >
                  <Maximize2 size={14} style={{ color: cert.accent }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Other Links Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Link href="/accreditation/nirf/annual-submissions" className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow group flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center group-hover:bg-[#123B6D] transition-colors flex-shrink-0">
              <BarChart2 className="text-[#123B6D] group-hover:text-white transition-colors" size={28} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#123B6D] font-[var(--font-heading)] mb-1">NIRF</h2>
              <p className="text-gray-500 text-sm">National Institutional Ranking Framework annual submissions and data.</p>
            </div>
          </Link>
          <Link href="/accreditation/aishe/annual-submissions" className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow group flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center group-hover:bg-[#123B6D] transition-colors flex-shrink-0">
              <ShieldCheck className="text-[#123B6D] group-hover:text-white transition-colors" size={28} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#123B6D] font-[var(--font-heading)] mb-1">AISHE</h2>
              <p className="text-gray-500 text-sm">All India Survey on Higher Education reports and data submissions.</p>
            </div>
          </Link>
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
