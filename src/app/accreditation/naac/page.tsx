'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Download, ExternalLink, Medal, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const naacSidebar = [
  {
    id: '4th',
    label: '4th NAAC Cycle',
    tag: 'Upcoming',
    items: [
      { id: '4th-ssr', label: 'SSR 2026', pdf: null as string | null },
      { id: '4th-iiqa', label: 'IIQA', pdf: null as string | null },
      { id: '4th-docs', label: 'Supporting Documents', pdf: null as string | null },
    ],
  },
  {
    id: '3rd',
    label: '3rd NAAC Cycle',
    tag: 'A+ | 3.42 CGPA',
    items: [
      { id: '3rd-ssr', label: 'SSR 2016', pdf: '/accreditation/SSR, 2016.pdf' as string | null },
      { id: '3rd-naac-rec', label: 'NAAC Recommendation', pdf: null as string | null },
    ],
  },
];

export default function NaacSSRPage() {
  const [openCycles, setOpenCycles] = useState<string[]>(['4th', '3rd']);
  const [activeItem, setActiveItem] = useState<string>('4th-ssr');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleCycle = (id: string) => {
    setOpenCycles(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const allItems = naacSidebar.flatMap(c => c.items);
  const activeItemData = allItems.find(i => i.id === activeItem);
  const activeLabel = activeItemData?.label ?? 'NAAC SSR';

  const selectItem = (id: string) => {
    setActiveItem(id);
    setMobileSidebarOpen(false);
    if (window.innerWidth < 1024) {
      document.getElementById('naac-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#123B6D] to-[#1a5499] pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-xs font-semibold mb-5">
            <a href="/accreditation" className="hover:text-white transition-colors">Accreditation</a>
            <span>/</span>
            <span className="text-[#D4A017]">NAAC SSR</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#D4A017] flex items-center justify-center shadow-lg">
              <Medal size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">NAAC — Self Study Reports</h1>
              <p className="text-white/70 text-sm mt-1">Cycle-wise SSR documents, IIQA, and supporting materials</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="lg:hidden sticky z-40 top-0 bg-[#123B6D] shadow-md">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-white font-bold text-sm tracking-wide"
        >
          <span>{activeLabel}</span>
          <ChevronDown size={18} className={`transition-transform ${mobileSidebarOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {mobileSidebarOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden bg-white border-t border-[#123B6D]/20"
            >
              <div className="p-3 space-y-2 max-h-[60vh] overflow-y-auto">
                {naacSidebar.map(cycle => (
                  <div key={cycle.id}>
                    <button
                      onClick={() => toggleCycle(cycle.id)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl text-sm font-bold text-[#123B6D]"
                    >
                      <span>{cycle.label}</span>
                      <ChevronDown size={14} className={`transition-transform ${openCycles.includes(cycle.id) ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openCycles.includes(cycle.id) && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="pl-4 pt-1 space-y-1">
                            {cycle.items.map(item => (
                              <button
                                key={item.id}
                                onClick={() => selectItem(item.id)}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                                  activeItem === item.id ? 'bg-blue-50 text-[#123B6D] font-bold' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                <FileText size={13} className="shrink-0" />
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main layout */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 mt-8 mb-12 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-2 sticky self-start top-8">
          <div className="bg-[#123B6D] text-white font-bold px-4 py-3 rounded-t-xl shadow-md flex items-center gap-2">
            <Medal size={16} />
            NAAC SSR
          </div>
          <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 p-2 space-y-1">
            {naacSidebar.map(cycle => (
              <div key={cycle.id}>
                <button
                  onClick={() => toggleCycle(cycle.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-[#123B6D] hover:bg-blue-50 transition-colors"
                >
                  <span>{cycle.label}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold bg-[#D4A017]/20 text-[#D4A017] px-1.5 py-0.5 rounded-full whitespace-nowrap">{cycle.tag}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${openCycles.includes(cycle.id) ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                <AnimatePresence>
                  {openCycles.includes(cycle.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-3 pb-1 space-y-0.5">
                        {cycle.items.map(item => {
                          const isActive = activeItem === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => setActiveItem(item.id)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-colors group ${
                                isActive
                                  ? 'bg-blue-50 text-[#123B6D] font-bold border-l-4 border-[#123B6D]'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#123B6D] border-l-4 border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <FileText size={13} className="shrink-0" />
                                <span className="truncate">{item.label}</span>
                              </div>
                              <ChevronRight size={14} className={`shrink-0 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Content Pane */}
        <div id="naac-content" className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden" style={{ minHeight: 600 }}>

            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-[#123B6D]" />
                <h2 className="font-bold text-[#123B6D] text-base">{activeLabel}</h2>
              </div>
              {activeItemData?.pdf && (
                <div className="flex items-center gap-2">
                  <a href={activeItemData.pdf} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-[#123B6D] border border-[#123B6D]/20 hover:bg-[#123B6D] hover:text-white px-3 py-1.5 rounded-lg transition-all">
                    <ExternalLink size={12} /> Open
                  </a>
                  <a href={activeItemData.pdf} download
                    className="flex items-center gap-1 text-xs font-semibold bg-[#123B6D] text-white px-3 py-1.5 rounded-lg hover:bg-[#0f2f58] transition-colors">
                    <Download size={12} /> Download
                  </a>
                </div>
              )}
            </div>

            {activeItemData?.pdf ? (
              <div style={{ height: 'calc(100vh - 300px)', minHeight: 500 }}>
                <iframe
                  src={`${activeItemData.pdf}#view=FitH&toolbar=1&navpanes=0`}
                  className="w-full h-full border-none"
                  title={activeLabel}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
                  <AlertCircle size={36} className="text-amber-500" />
                </div>
                <h3 className="font-black text-[#123B6D] text-xl mb-2">Document Coming Soon</h3>
                <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                  The <strong>{activeLabel}</strong> document will be available once uploaded. Please check back later.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
