"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Users, FileStack, Link as LinkIcon, ChevronRight, Loader2, Info, ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface SectionData { id: string; title: string; icon: React.ElementType; }

const sections: SectionData[] = [
  { id: "journal-about", title: "About the Journal", icon: BookOpen },
  { id: "journal-board", title: "Board of Editors", icon: Users },
  { id: "journal-issues", title: "Volume and Issues", icon: FileStack },
  { id: "resources", title: "Resources", icon: LinkIcon },
];

const SLUG_MAP: Record<string, string> = {
  "journal-about": "about-journal",
  "journal-board": "board-of-editors",
  "journal-issues": "volume-and-issues",
  "resources": "resources",
};

type ContentMap = Record<string, any>;

function PublicationsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("journal-about");
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [contentMap, setContentMap] = useState<ContentMap>({});

  useEffect(() => {
    supabase.from('mcc_research').select('slug, content').eq('category', 'Research Journal').then(({ data }) => {
      if (data) {
        const map: ContentMap = {};
        data.forEach(item => { map[item.slug] = item.content || {}; });
        setContentMap(map);
      }
    });
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && sections.find((s) => s.id === tab)) setActiveTab(tab);
  }, [searchParams]);

  const handleSelect = (id: string) => { setActiveTab(id); setMobileDropdownOpen(false); router.push(`/research/publications?tab=${id}`, { scroll: false }); };
  const activeSection = sections.find((s) => s.id === activeTab) || sections[0];
  const ActiveIcon = activeSection.icon;
  const c = (id: string) => contentMap[SLUG_MAP[id]] || {};

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="bg-[#0D1B3E] pt-12 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/4" /></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-200 mb-4 uppercase tracking-wider">Research</div>
              <h1 className="text-3xl md:text-5xl font-black text-white">Publications & Resources</h1>
            </div>
            <Link href="/research" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl text-sm font-bold transition-colors backdrop-blur-md shrink-0">Back to Research</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-10 flex flex-col md:flex-row gap-8">
        {/* Mobile dropdown */}
        <div className="md:hidden w-full relative z-30">
          <button onClick={() => setMobileDropdownOpen((p) => !p)} className="w-full flex items-center justify-between bg-[#123B6D] text-white px-5 py-4 font-bold text-sm tracking-widest uppercase rounded-t-xl">
            <span className="flex items-center gap-2 min-w-0"><ActiveIcon size={16} className="shrink-0 text-blue-200" /><span className="truncate">{activeSection.title}</span></span>
            <motion.span animate={{ rotate: mobileDropdownOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 ml-3"><ChevronRight size={18} className="rotate-90" /></motion.span>
          </button>
          <AnimatePresence initial={false}>
            {mobileDropdownOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }} className="overflow-hidden absolute left-0 right-0 bg-white border border-[#E2E8F0] border-t-0 rounded-b-xl shadow-xl z-50">
                <div className="flex flex-col divide-y divide-[#F1F5F9]">
                  {sections.map((section) => { const SectionIcon = section.icon; return (
                    <button key={section.id} onClick={() => handleSelect(section.id)} className={`flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors text-left ${activeTab === section.id ? "bg-[#EBF3FF] text-[#123B6D]" : "text-gray-700 hover:bg-[#F8FAFC] hover:text-[#123B6D]"}`}>
                      <SectionIcon size={15} className={`shrink-0 ${activeTab === section.id ? "text-[#123B6D]" : "text-gray-400"}`} />
                      <span className="flex-1 text-left">{section.title}</span>
                      {activeTab === section.id && <ChevronRight size={14} className="text-[#123B6D] shrink-0" />}
                    </button>
                  ); })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!mobileDropdownOpen && <div className="h-1 bg-white border border-t-0 border-[#E2E8F0] rounded-b-xl" />}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">Publications</div>
            <div className="flex flex-col p-2">
              {sections.map((section) => { const SectionIcon = section.icon; return (
                <button key={section.id} onClick={() => handleSelect(section.id)} className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${activeTab === section.id ? "bg-[#123B6D] text-white shadow-md" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                  <SectionIcon size={16} className={activeTab === section.id ? "text-blue-200" : "text-gray-400"} />
                  <span className="truncate">{section.title}</span>
                </button>
              ); })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 bg-blue-100 text-blue-600 border border-blue-200"><ActiveIcon size={32} strokeWidth={2} /></div>
                <div className="flex-1 w-full"><h2 className="text-2xl md:text-4xl font-black text-gray-900">{activeSection.title}</h2></div>
              </div>

              <div className="p-6 md:p-10 space-y-10">
                {/* Journal About */}
                {activeTab === "journal-about" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Info size={20} /> About the Journal</div>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line mb-8">
                      {c('journal-about').about || "The MCC Research Journal is a peer-reviewed, bi-annual academic journal dedicated to publishing high-quality research papers, review articles, and case studies across multidisciplinary domains."}
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-[#1E293B] mb-3">Key Information</h4>
                      <ul className="space-y-3 text-gray-600">
                        {(c('journal-about').objectives_activities || [
                          { content: "Frequency: Bi-annual" },
                          { content: "Format: Print & Online" },
                          { content: "Peer Review: Double-blind" },
                          { content: "ISSN: XXXX-XXXX" },
                        ]).map((item: any, i: number) => {
                          const parts = item.content.split(':');
                          return (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                              {parts.length > 1 ? (
                                <span><strong>{parts[0]}:</strong> {parts.slice(1).join(':')}</span>
                              ) : (
                                <span>{item.content}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </section>
                )}

                {/* Journal Board */}
                {activeTab === "journal-board" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Users size={20} /> Board of Editors</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(c('journal-board').committee || [
                        { name: "Dr. Rajashri Deshpande", role: "Chief Editor" },
                        { name: "Dr. Arjun Lakhe", role: "Co-Editor" },
                        { name: "Dr. Shayeree Ghosh", role: "Associate Editor" },
                        { name: "Dr. Jyotika Chheda", role: "Associate Editor" },
                      ]).map((member: any, i: number) => (
                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-xl px-6 py-5">
                          <p className="font-bold text-[#1E293B]">{member.name}</p>
                          <p className="text-sm text-[#123B6D] font-semibold mt-1">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Journal Issues */}
                {activeTab === "journal-issues" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-6"><FileStack size={20} /> Volume and Issues</div>
                    <div className="space-y-4">
                      {(c('journal-issues').volumes || [
                        { title: "Volume 5, Issue 2", date: "December 2024" },
                        { title: "Volume 5, Issue 1", date: "June 2024" },
                        { title: "Volume 4, Issue 2", date: "December 2023" },
                        { title: "Volume 4, Issue 1", date: "June 2023" },
                      ]).map((issue: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 hover:border-[#123B6D] transition-colors rounded-xl p-5 cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#EBF3FF] text-[#123B6D] flex items-center justify-center group-hover:bg-[#123B6D] group-hover:text-white transition-colors"><BookOpen size={20} /></div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm group-hover:text-[#123B6D]">{issue.title}</p>
                              <p className="text-xs text-gray-500">{issue.date}</p>
                            </div>
                          </div>
                          {issue.url ? (
                            <a href={issue.url} target="_blank" rel="noreferrer" className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-[#123B6D] opacity-0 group-hover:opacity-100 transition-opacity">Read</span>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-[#123B6D]" />
                            </a>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-[#123B6D] opacity-0 group-hover:opacity-100 transition-opacity">Read</span>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-[#123B6D]" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Resources */}
                {activeTab === "resources" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><LinkIcon size={20} /> External Links & Templates</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(c('resources').important_documents || [
                        { title: "Paper Submission Template", url: "" },
                        { title: "UGC CARE List", url: "https://ugccare.unipune.ac.in/" },
                      ]).map((doc: any, i: number) => (
                        <a key={i} href={doc.url || "#"} className="flex flex-col gap-2 bg-gray-50 hover:bg-[#F8FAFC] border border-gray-200 hover:border-[#123B6D] transition-colors rounded-xl p-5 group">
                          <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                              {i === 0 ? <Download size={16} /> : <LinkIcon size={16} />}
                            </div>
                            <ExternalLink size={16} className="text-gray-400 group-hover:text-[#123B6D]" />
                          </div>
                          <h4 className="font-bold text-[#1E293B] mt-2 group-hover:text-[#123B6D] transition-colors">{doc.title}</h4>
                          <p className="text-xs text-gray-500">{doc.url || "Document link pending"}</p>
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function PublicationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><Loader2 className="animate-spin text-[#123B6D]" size={28} /></div>}>
      <PublicationsContent />
    </Suspense>
  );
}
