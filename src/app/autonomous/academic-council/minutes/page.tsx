'use client';

import { useState } from 'react';
import { FileText, Eye, ChevronRight, Download, BookOpen } from 'lucide-react';

const bodyData = {
  id: 'academic-council',
  title: 'Academic Council',
  icon: BookOpen,
  color: '#D4A017',
  data: {
    '2021-22': [
      '13-04-2022.pdf',
      '30-10-2021.pdf',
      'LIST OF CERTIFICATE COURSES 30-10-2021.pdf'
    ],
    '2022-23': [
      '15-10-2022.pdf',
      '27-05-2023.pdf',
      '29-04-2023.pdf'
    ],
    '2023-24': [
      '10-04-2024.pdf',
      '26-10-2023.pdf'
    ],
    '2024-25': [
      '07-12-2024.pdf',
      '22-04-2025.pdf',
      'Research Promotion and Research Commitee 07-12-2024.pdf'
    ],
    '2025-26': [
      '14-11-2025.pdf',
      '20-04-2026.pdf'
    ]
  }
};

export default function AcademicCouncilMinutesPage() {
  const [selectedPdf, setSelectedPdf] = useState<{ name: string, url: string } | null>(null);

  const years = Object.keys(bodyData.data).sort((a, b) => b.localeCompare(a));

  const getPdfUrl = (year: string, filename: string) => {
    return `/ACADEMIC COUNCIL/${year}/${filename}`;
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#123B6D] pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-4">
            Autonomous · Academic Council
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">
            Minutes of the Academic Council
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Archive of official minutes and reports from the Academic Council meetings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of Files (NAAC Page style) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] flex items-center gap-3">
              <bodyData.icon className="text-[#D4A017]" size={28} />
              Meeting Archives
            </h2>
            
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              {years.map((year) => (
                <div key={year} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-[#E2E8F0] bg-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-[#1E293B] font-[var(--font-heading)]">Academic Year {year}</h3>
                    <span className="text-xs font-semibold bg-white border border-gray-200 px-3 py-1 rounded-full text-[#64748B]">
                      {bodyData.data[year as keyof typeof bodyData.data].length} Files
                    </span>
                  </div>
                  <div className="divide-y divide-[#E2E8F0]">
                    {bodyData.data[year as keyof typeof bodyData.data].map((file, i) => {
                      const fileUrl = getPdfUrl(year, file);
                      const isSelected = selectedPdf?.url === fileUrl;
                      
                      return (
                        <div 
                          key={i} 
                          onClick={() => setSelectedPdf({ name: file, url: fileUrl })}
                          className={`px-4 py-3 flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-[#F8FAFC] border-l-4 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileText size={16} className={isSelected ? "text-blue-500 shrink-0" : "text-[#94A3B8] shrink-0"} />
                            <span className={`text-sm truncate ${isSelected ? 'text-blue-700 font-semibold' : 'text-[#64748B]'}`}>
                              {file.replace('.pdf', '')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-4">
                            <button className="flex items-center gap-1 text-xs font-semibold text-[#123B6D] hover:text-[#D4A017] transition-colors p-1.5 rounded bg-gray-100 hover:bg-gray-200">
                              <Eye size={14} /> Preview
                            </button>
                            <a 
                              href={fileUrl}
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
              ))}
            </div>
          </div>

          {/* Right Column: Live PDF Preview */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-md overflow-hidden flex flex-col h-[700px]">
              <div className="p-4 border-b border-[#E2E8F0] bg-[#123B6D] text-white flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText size={18} className="text-[#D4A017] shrink-0" />
                  <h3 className="font-bold truncate">
                    {selectedPdf ? selectedPdf.name : 'Select a document to preview'}
                  </h3>
                </div>
                {selectedPdf && (
                  <a 
                    href={selectedPdf.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors shrink-0 flex items-center gap-2"
                  >
                    Open in New Tab <ChevronRight size={12} />
                  </a>
                )}
              </div>
              
              <div className="flex-1 bg-gray-100 relative">
                {selectedPdf ? (
                  <iframe 
                    src={`${selectedPdf.url}#view=FitH`} 
                    className="w-full h-full border-none"
                    title={selectedPdf.name}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[#94A3B8] p-8 text-center">
                    <FileText size={64} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium text-[#64748B] mb-2">No Document Selected</p>
                    <p className="text-sm">Click on any file from the list to view its contents here.</p>
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
