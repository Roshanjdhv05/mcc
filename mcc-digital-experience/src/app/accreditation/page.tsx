'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Medal, ShieldCheck, FileBadge, BarChart2, FileText, ArrowRight, Award, ClipboardList } from 'lucide-react';

const certificates = [
  {
    href: '/accreditation/certificates/ugc-2f-12b',
    icon: <ShieldCheck size={24} className="text-[#123B6D]" />,
    title: 'UGC 2(f) & 12(B)',
    description: 'UGC recognition certifying eligibility for grants and degree recognition.',
  },
  {
    href: '/accreditation/certificates/autonomy',
    icon: <FileBadge size={24} className="text-[#123B6D]" />,
    title: 'Autonomy',
    description: 'Certificate of autonomous status conferred by UGC and University of Mumbai.',
  },
  {
    href: '/accreditation/certificates/naac',
    icon: <Medal size={24} className="text-[#D4A017]" />,
    title: 'NAAC Certificate',
    description: 'NAAC accreditation — Grade A+ with CGPA 3.42 in the 3rd Cycle.',
  },
  {
    href: '/accreditation/certificates/nirf',
    icon: <BarChart2 size={24} className="text-[#123B6D]" />,
    title: 'NIRF',
    description: 'National Institutional Ranking Framework annual data submissions.',
  },
  {
    href: '/accreditation/certificates/aishe',
    icon: <FileText size={24} className="text-[#123B6D]" />,
    title: 'AISHE',
    description: 'All India Survey on Higher Education annual certificates.',
  },
];

export default function AccreditationPage() {
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

        {/* About Block */}
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

        {/* ── Certificates Section ── */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-1 w-10 rounded-full bg-[#D4A017]" />
            <h2 className="text-xl font-bold text-[#123B6D] uppercase tracking-wider">Certificates</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
            {certificates.map((cert) => (
              <Link
                key={cert.href}
                href={cert.href}
                className="group bg-white rounded-2xl shadow-sm border border-[#E2E8F0] hover:shadow-lg hover:border-[#123B6D]/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col text-left w-full h-full"
              >
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#123B6D] text-sm mb-1 group-hover:text-blue-700 transition-colors">{cert.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{cert.description}</p>
                  </div>
                </div>
                <div className="px-5 pb-4 flex items-center justify-between border-t border-[#F1F5F9] pt-3">
                  <span className="text-xs font-bold text-[#123B6D] opacity-0 group-hover:opacity-100 transition-opacity">View PDF</span>
                  <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#123B6D] group-hover:text-white transition-colors">
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── NAAC + AQAR Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/accreditation/naac" className="group bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#123B6D]/30 transition-all flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center group-hover:bg-[#123B6D] transition-colors flex-shrink-0">
              <Award className="text-[#123B6D] group-hover:text-white transition-colors" size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#123B6D] mb-1">NAAC</h2>
              <p className="text-gray-500 text-sm">Self Study Reports (SSR) for all NAAC cycles with criteria-wise documents.</p>
            </div>
            <ArrowRight size={18} className="text-gray-300 group-hover:text-[#123B6D] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link href="/accreditation/aqar" className="group bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#123B6D]/30 transition-all flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center group-hover:bg-[#123B6D] transition-colors flex-shrink-0">
              <ClipboardList className="text-[#123B6D] group-hover:text-white transition-colors" size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#123B6D] mb-1">AQAR</h2>
              <p className="text-gray-500 text-sm">Annual Quality Assurance Reports with year-wise criteria documents.</p>
            </div>
            <ArrowRight size={18} className="text-gray-300 group-hover:text-[#123B6D] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

      </div>
    </div>
  );
}
