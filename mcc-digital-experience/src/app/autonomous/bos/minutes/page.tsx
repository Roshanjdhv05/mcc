'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FileText, Eye, ChevronRight, Download, BookOpen, Search, ExternalLink, Filter } from 'lucide-react';
import { bosMinutesCategories, BOSMinutesCategory, BOSMinutesFile } from '@/lib/bosMinutesData';

export default function BOSMinutesPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(bosMinutesCategories[0]?.id || '');
  const [selectedPdf, setSelectedPdf] = useState<BOSMinutesFile | null>(
    bosMinutesCategories[0]?.pdfs[0] || null
  );
  const [searchQuery, setSearchQuery] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const interactTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleInteraction = () => {
    setIsInteracting(true);
    if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
    interactTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 5000);
  };

  useEffect(() => {
    if (isInteracting) return;
    let animationFrameId: number;
    const scrollStep = () => {
      if (window.innerWidth < 1024 && scrollRef.current) {
        const el = scrollRef.current;
        if (el.style.scrollBehavior !== 'auto') el.style.scrollBehavior = 'auto';
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };
    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  const activeCategory = bosMinutesCategories.find(c => c.id === activeCategoryId) || bosMinutesCategories[0];

  // Filter categories / PDFs by search query if user searches
  const filteredCategories = bosMinutesCategories.map(cat => {
    if (!searchQuery.trim()) return cat;
    const q = searchQuery.toLowerCase();
    const matchingPdfs = cat.pdfs.filter(
      p => p.title.toLowerCase().includes(q) || p.fileName.toLowerCase().includes(q) || cat.category.toLowerCase().includes(q)
    );
    return {
      ...cat,
      pdfs: matchingPdfs
    };
  }).filter(cat => cat.pdfs.length > 0);

  const currentCategoryDisplay = filteredCategories.find(c => c.id === activeCategoryId) || filteredCategories[0] || activeCategory;

  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    const targetCat = bosMinutesCategories.find(c => c.id === catId);
    if (targetCat && targetCat.pdfs.length > 0) {
      setSelectedPdf(targetCat.pdfs[0]);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header / Hero Section */}
      <div className="bg-[#123B6D] pt-28 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-4">
            Autonomous HEI · Board of Studies
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-3">
            Board of Studies (BOS) Minutes
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Official archives of Board of Studies meeting minutes across departments at Mulund College of Commerce (Autonomous).
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              placeholder="Search minutes by title or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Sidebar: Categories Navigation */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-4 lg:sticky lg:top-24">
              <div className="flex items-center justify-between px-2 pt-2 pb-3 border-b border-gray-100 mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Filter size={14} className="text-[#123B6D]" /> Departments ({filteredCategories.length})
                </span>
              </div>

              {/* Desktop Category List */}
              <div className="hidden lg:flex flex-col gap-1.5 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredCategories.map(cat => {
                  const isActive = activeCategoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200 text-left w-full
                        ${isActive
                          ? 'bg-blue-50 border-blue-200 shadow-sm'
                          : 'bg-white border-transparent hover:bg-gray-50'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${isActive ? 'bg-[#123B6D] text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>
                        <BookOpen size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className={`font-semibold text-xs leading-tight block truncate ${isActive ? 'text-[#123B6D]' : 'text-gray-700'}`}>
                          {cat.category}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {cat.pdfs.length} {cat.pdfs.length === 1 ? 'file' : 'files'}
                        </span>
                      </div>
                      {isActive && <ChevronRight size={14} className="ml-auto text-[#123B6D] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Category Slider */}
              <div 
                ref={scrollRef}
                onTouchStart={handleInteraction}
                onMouseDown={handleInteraction}
                onWheel={handleInteraction}
                className="flex lg:hidden flex-row gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-1"
                style={{ scrollBehavior: 'auto' }}
              >
                {filteredCategories.map((cat, idx) => {
                  const isActive = activeCategoryId === cat.id;
                  return (
                    <button
                      key={`${cat.id}-${idx}`}
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all duration-200 text-left shrink-0
                        ${isActive
                          ? 'bg-blue-50 border-blue-200 shadow-sm'
                          : 'bg-white border-transparent hover:bg-gray-50'
                        }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${isActive ? 'bg-[#123B6D] text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <BookOpen size={14} />
                      </div>
                      <span className={`font-semibold text-xs leading-tight whitespace-nowrap ${isActive ? 'text-[#123B6D]' : 'text-gray-700'}`}>
                        {cat.category} ({cat.pdfs.length})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Main Content: Files List & Preview */}
          <div className="flex-1 min-w-0">
            {currentCategoryDisplay ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* PDF Files List */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden p-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Department / Council</span>
                        <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)]">
                          {currentCategoryDisplay.category}
                        </h2>
                      </div>
                      <span className="text-xs font-semibold bg-blue-50 text-[#123B6D] border border-blue-100 px-3 py-1 rounded-full">
                        {currentCategoryDisplay.pdfs.length} Documents
                      </span>
                    </div>

                    <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1 custom-scrollbar">
                      {currentCategoryDisplay.pdfs.map((pdf, idx) => {
                        const isSelected = selectedPdf?.url === pdf.url;
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedPdf(pdf)}
                            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-3
                              ${isSelected
                                ? 'bg-blue-50/70 border-blue-300 shadow-sm'
                                : 'bg-gray-50/60 border-gray-100 hover:bg-gray-100/70 hover:border-gray-200'
                              }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? 'bg-[#123B6D] text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-200'}`}>
                                <FileText size={18} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className={`text-sm font-semibold leading-snug break-words ${isSelected ? 'text-[#123B6D]' : 'text-gray-800'}`}>
                                  {pdf.title}
                                </h3>
                                <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                                  {pdf.fileName}
                                </p>
                              </div>
                            </div>

                            {/* Action Buttons: View in new page & Download */}
                            <div className="flex items-center gap-2 pt-2 border-t border-gray-200/60 mt-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPdf(pdf);
                                }}
                                className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl transition-all ${
                                  isSelected
                                    ? 'bg-[#123B6D] text-white shadow-sm'
                                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                                }`}
                              >
                                <Eye size={13} /> Quick Preview
                              </button>

                              <a
                                href={pdf.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-white text-[#123B6D] border border-blue-200 hover:bg-blue-50 transition-colors"
                                title="View in new page"
                              >
                                <ExternalLink size={13} /> View
                              </a>

                              <a
                                href={pdf.url}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                                title="Download PDF"
                              >
                                <Download size={13} /> Download
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* PDF Viewer Side Panel */}
                <div className="lg:col-span-6 sticky top-24">
                  <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-md overflow-hidden flex flex-col h-[720px]">
                    <div className="p-4 border-b border-[#E2E8F0] bg-[#123B6D] text-[#ffffff] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText size={18} className="text-[#D4A017] shrink-0" />
                        <h3 className="font-bold text-sm truncate text-white">
                          {selectedPdf ? selectedPdf.title : 'Select a document'}
                        </h3>
                      </div>

                      {selectedPdf && (
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={selectedPdf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 border border-white/10"
                          >
                            <ExternalLink size={12} /> View
                          </a>
                          <a
                            href={selectedPdf.url}
                            download
                            className="text-xs font-semibold bg-[#D4A017] hover:bg-[#b88a14] text-slate-900 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                          >
                            <Download size={12} /> Download
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 bg-gray-100 relative">
                      {selectedPdf ? (
                        <iframe
                          src={`${selectedPdf.url}#view=FitH`}
                          className="w-full h-full border-none"
                          title={selectedPdf.title}
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#94A3B8] p-8 text-center">
                          <FileText size={64} className="mb-4 opacity-20" />
                          <p className="text-lg font-medium text-[#64748B] mb-2">No Document Selected</p>
                          <p className="text-sm">Click on any file from the list to preview its content here.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0]">
                <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-bold text-gray-700 mb-1">No Minutes Found</h3>
                <p className="text-sm text-gray-500">Try searching with a different keyword.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
