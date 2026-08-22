"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, ShieldAlert, FileSearch, ChevronRight, Loader2, Download, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface SectionData { id: string; title: string; icon: React.ElementType; }

const sections: SectionData[] = [
  { id: "research-policy", title: "Research Policy", icon: FileCheck },
  { id: "plagiarism-policy", title: "Plagiarism Policy", icon: ShieldAlert },
  { id: "application-check", title: "Application for Plagiarism Check", icon: FileSearch },
];

const SLUG_MAP: Record<string, string> = {
  "research-policy": "research-policy",
  "plagiarism-policy": "plagiarism-policy",
  "application-check": "application-plagiarism-check",
};

type ContentMap = Record<string, any>;

function PoliciesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("research-policy");
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [contentMap, setContentMap] = useState<ContentMap>({});

  useEffect(() => {
    supabase.from('mcc_research').select('slug, content').eq('category', 'Policies').then(({ data }) => {
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

  const handleSelect = (id: string) => { setActiveTab(id); setMobileDropdownOpen(false); router.push(`/research/policies?tab=${id}`, { scroll: false }); };
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
              <h1 className="text-3xl md:text-5xl font-black text-white">Research Policies</h1>
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
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">Policies</div>
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
                {/* Research Policy */}
                {activeTab === "research-policy" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Info size={20} /> About the Policy</div>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line mb-8">
                      {c('research-policy').about || "Our Research Policy provides a framework for conducting ethical, high-quality research. It outlines the responsibilities of researchers, support systems provided by the institution, and guidelines for publications and intellectual property."}
                    </p>
                    {(c('research-policy').important_documents || [{ title: "Research Policy Document", url: "" }]).map((doc: any, i: number) => (
                      <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><FileCheck size={24} /></div>
                          <div><p className="font-bold text-[#1E293B]">{doc.title}</p><p className="text-sm text-gray-500">PDF Document</p></div>
                        </div>
                        {doc.url ? (
                          <a href={doc.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#123B6D] hover:bg-[#0D2A4F] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"><Download size={16} /> Download</a>
                        ) : (
                          <button disabled className="flex items-center gap-2 bg-gray-200 text-gray-400 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-not-allowed"><Download size={16} /> Not Uploaded</button>
                        )}
                      </div>
                    ))}
                  </section>
                )}

                {/* Plagiarism Policy */}
                {activeTab === "plagiarism-policy" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><ShieldAlert size={20} /> Academic Integrity</div>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line mb-8">
                      {c('plagiarism-policy').about || "The Plagiarism Policy strictly prohibits the unauthorized use of another's ideas, words, or data without proper attribution. All research submitted must pass stringent similarity checks using university-approved software."}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {(c('plagiarism-policy').objectives_activities || [
                        { content: "Zero Tolerance: Strict disciplinary action against intentional academic misconduct." },
                        { content: "Permissible Limit: Similarity index must be below 10% excluding standard exclusions." },
                      ]).map((item: any, i: number) => (
                        <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex items-start gap-4">
                          <div className={`mt-1 ${i === 0 ? "text-red-500" : "text-green-600"}`}>{i === 0 ? <ShieldAlert size={20} /> : <CheckCircle2 size={20} />}</div>
                          <div>
                            <p className="font-bold text-[#1E293B] mb-1">{item.content.split(':')[0]}</p>
                            <p className="text-sm text-gray-600">{item.content.split(':')[1]?.trim()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {(c('plagiarism-policy').important_documents || [{ title: "Plagiarism Policy Document", url: "" }]).map((doc: any, i: number) => (
                      <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><ShieldAlert size={24} /></div>
                          <div><p className="font-bold text-[#1E293B]">{doc.title}</p><p className="text-sm text-gray-500">PDF Document</p></div>
                        </div>
                        {doc.url ? (
                          <a href={doc.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#123B6D] hover:bg-[#0D2A4F] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"><Download size={16} /> Download</a>
                        ) : (
                          <button disabled className="flex items-center gap-2 bg-gray-200 text-gray-400 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-not-allowed"><Download size={16} /> Not Uploaded</button>
                        )}
                      </div>
                    ))}
                  </section>
                )}

                {/* Application Check */}
                {activeTab === "application-check" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><FileSearch size={20} /> How to Apply for a Check</div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {c('application-check').about || "To request a formal plagiarism check for your thesis, dissertation, or research paper, please fill out the application form and submit it to the Research Committee office along with your document in digital format."}
                      </p>
                      <ul className="mt-4 space-y-3 text-gray-600">
                        {(c('application-check').objectives_activities || [
                          { content: "Download the Application Form below." },
                          { content: "Fill it completely and get it signed by your assigned Research Guide." },
                          { content: "Submit the soft copy of your document (Word/PDF without bibliography/references) via email to the library." },
                        ]).map((step: any, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5"><span className="text-sm font-bold">{i + 1}</span></div>
                            <span>{step.content}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {(c('application-check').important_documents || [{ title: "Application Form", url: "" }]).map((doc: any, i: number) => (
                      <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><FileSearch size={24} /></div>
                          <div><p className="font-bold text-[#1E293B]">{doc.title}</p><p className="text-sm text-gray-500">PDF Document</p></div>
                        </div>
                        {doc.url ? (
                          <a href={doc.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#123B6D] hover:bg-[#0D2A4F] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"><Download size={16} /> Download</a>
                        ) : (
                          <button disabled className="flex items-center gap-2 bg-gray-200 text-gray-400 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-not-allowed"><Download size={16} /> Not Uploaded</button>
                        )}
                      </div>
                    ))}
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

export default function PoliciesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><Loader2 className="animate-spin text-[#123B6D]" size={28} /></div>}>
      <PoliciesContent />
    </Suspense>
  );
}
