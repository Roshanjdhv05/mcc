'use client';

import { useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';

interface CertPageProps {
  title: string;
  subtitle: string;
  pdfs: { label: string; url: string }[];
}

export default function CertificatePdfPage({ title, subtitle, pdfs }: CertPageProps) {
  const [activePdf, setActivePdf] = useState(pdfs[0]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-10 font-sans">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#123B6D] to-[#1a5499] pt-20 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-xs font-semibold mb-6">
            <a href="/accreditation" className="hover:text-white transition-colors">Accreditation</a>
            <span>/</span>
            <span className="text-white">Certificates</span>
            <span>/</span>
            <span className="text-[#D4A017]">{title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">{title}</h1>
          <p className="text-white/70 text-base">{subtitle}</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8 flex flex-col gap-6">

        {/* Tab selector (only if multiple PDFs) */}
        {pdfs.length > 1 && (
          <div className="flex gap-3 flex-wrap">
            {pdfs.map((p) => (
              <button
                key={p.url}
                onClick={() => setActivePdf(p)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  activePdf.url === p.url
                    ? 'bg-[#123B6D] text-white shadow-md'
                    : 'bg-white border border-[#E2E8F0] text-gray-600 hover:border-[#123B6D]/40'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* Viewer Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 280px)', minHeight: 600 }}>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-sm font-bold text-gray-700">{activePdf.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={activePdf.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#123B6D] border border-[#123B6D]/20 hover:bg-[#123B6D] hover:text-white px-3 py-1.5 rounded-lg transition-all"
              >
                <ExternalLink size={13} /> Open in Tab
              </a>
              <a
                href={activePdf.url}
                download
                className="flex items-center gap-1.5 text-xs font-semibold bg-[#123B6D] text-white px-3 py-1.5 rounded-lg hover:bg-[#0f2f58] transition-colors"
              >
                <Download size={13} /> Download
              </a>
            </div>
          </div>
          {/* iframe */}
          <div className="flex-1">
            <iframe
              src={`${activePdf.url}#view=FitH&toolbar=1&navpanes=0`}
              className="w-full h-full border-none"
              title={activePdf.label}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
