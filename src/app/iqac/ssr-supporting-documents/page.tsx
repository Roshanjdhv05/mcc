'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, Download, ArrowLeft, Target } from 'lucide-react';

export default function SSRSupportingDocumentsPage() {
  const ssrDocuments = [
    { name: 'TCS NQT Paper 1', file: 'TCS-NQT-Paper-1.pdf' },
    { name: 'TCS NQT Paper 2', file: 'TCS-NQT-Paper-2.pdf' }
  ];
  const [selectedSSRDocument, setSelectedSSRDocument] = useState<{name: string, file: string} | null>(null);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#123B6D] pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <Link href="/iqac" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-full mb-2">
              <ArrowLeft size={14} /> Back to IQAC Home
            </Link>
            <div className="inline-flex items-center gap-2 bg-[#123B6D]/10 border border-white/20 text-white/80 px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
              <Target size={13} /> Internal Quality Assurance Cell
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4 mt-2">
            SSR Supporting Documents
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Access the supporting documents for the Self Study Report (SSR).
          </p>
        </div>
      </div>

      {/* ── SSR Supporting Documents ── */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-10 mb-10 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: List of Documents */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-[#1E293B]">Available Documents</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {ssrDocuments.map((doc, i) => {
                  const isSelected = selectedSSRDocument?.file === doc.file;
                  return (
                    <div 
                      key={i} 
                      onClick={() => setSelectedSSRDocument(doc)}
                      className={`px-4 py-3 flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden pr-2">
                        <FileText size={16} className={isSelected ? "text-blue-500 shrink-0" : "text-gray-400 shrink-0"} />
                        <span className={`text-sm truncate ${isSelected ? 'text-blue-700 font-semibold' : 'text-gray-600'}`}>
                          {doc.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a 
                          href={`/${doc.file}`}
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs font-semibold text-white bg-[#123B6D] hover:bg-[#0d2d54] transition-colors p-1.5 rounded"
                        >
                          <Download size={14} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: PDF Preview */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
              <div className="p-4 border-b border-gray-100 bg-[#123B6D] text-white flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText size={18} className="text-[#D4A017] shrink-0" />
                  <h3 className="font-bold truncate text-sm">
                    {selectedSSRDocument ? selectedSSRDocument.name : 'No document selected'}
                  </h3>
                </div>
                {selectedSSRDocument && (
                  <a 
                    href={`/${selectedSSRDocument.file}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors shrink-0 flex items-center gap-2"
                  >
                    Open <ArrowRight size={12} />
                  </a>
                )}
              </div>
              
              <div className="flex-1 bg-gray-100 relative">
                {selectedSSRDocument ? (
                  <iframe 
                    src={`/${selectedSSRDocument.file}#view=FitH`} 
                    className="w-full h-full border-none"
                    title={selectedSSRDocument.name}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                    <FileText size={64} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium text-gray-500 mb-2">Preview Area</p>
                    <p className="text-sm">Click on a document from the list to view it here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
