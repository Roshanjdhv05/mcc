"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Target, FileText, ChevronRight, Loader2, Info, Users2, FileArchive, Download
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface SectionData {
  id: string;
  title: string;
  icon: React.ElementType;
}

const sections: SectionData[] = [
  { id: "objective", title: "Objective", icon: Target },
  { id: "committee", title: "Committee", icon: Users },
  { id: "reports", title: "Annual Reports", icon: FileText },
];

// Slug map: section id → DB slug
const SLUG_MAP: Record<string, string> = {
  objective: "objective",
  committee: "committee-members",
  reports: "annual-reports",
};

type ContentMap = Record<string, any>;

function AboutResearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>("objective");
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [contentMap, setContentMap] = useState<ContentMap>({});

  useEffect(() => {
    supabase.from('mcc_research')
      .select('slug, content')
      .eq('category', 'About & Committee')
      .then(({ data }) => {
        if (data) {
          const map: ContentMap = {};
          data.forEach(item => { map[item.slug] = item.content || {}; });
          setContentMap(map);
        }
      });
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && sections.find((s) => s.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setMobileDropdownOpen(false);
    router.push(`/research/about?tab=${id}`, { scroll: false });
  };

  const activeSection = sections.find((s) => s.id === activeTab) || sections[0];
  const ActiveIcon = activeSection.icon;

  // Get DB content for a section by its local id
  const c = (id: string) => contentMap[SLUG_MAP[id]] || {};

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#0D1B3E] pt-12 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-200 mb-4 uppercase tracking-wider">
                Research
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white">
                About & Committee
              </h1>
            </div>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl text-sm font-bold transition-colors backdrop-blur-md shrink-0"
            >
              Back to Research
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-10 flex flex-col md:flex-row gap-8">
        {/* ── MOBILE: Dropdown selector ───────────────── */}
        <div className="md:hidden w-full relative z-30">
          <button
            onClick={() => setMobileDropdownOpen((p) => !p)}
            className="w-full flex items-center justify-between bg-[#123B6D] text-white px-5 py-4 font-bold text-sm tracking-widest uppercase rounded-t-xl"
          >
            <span className="flex items-center gap-2 min-w-0">
              <ActiveIcon size={16} className="shrink-0 text-blue-200" />
              <span className="truncate">{activeSection.title}</span>
            </span>
            <motion.span animate={{ rotate: mobileDropdownOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 ml-3">
              <ChevronRight size={18} className="rotate-90" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {mobileDropdownOpen && (
              <motion.div key="mobile-section-dropdown" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }} className="overflow-hidden absolute left-0 right-0 bg-white border border-[#E2E8F0] border-t-0 rounded-b-xl shadow-xl z-50">
                <div className="flex flex-col divide-y divide-[#F1F5F9]">
                  {sections.map((section) => {
                    const SectionIcon = section.icon;
                    return (
                      <button key={section.id} onClick={() => handleSelect(section.id)} className={`flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors text-left ${activeTab === section.id ? "bg-[#EBF3FF] text-[#123B6D]" : "text-gray-700 hover:bg-[#F8FAFC] hover:text-[#123B6D]"}`}>
                        <SectionIcon size={15} className={`shrink-0 ${activeTab === section.id ? "text-[#123B6D]" : "text-gray-400"}`} />
                        <span className="flex-1 text-left">{section.title}</span>
                        {activeTab === section.id && <ChevronRight size={14} className="text-[#123B6D] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!mobileDropdownOpen && <div className="h-1 bg-white border border-t-0 border-[#E2E8F0] rounded-b-xl" />}
        </div>

        {/* ── DESKTOP: Sidebar ──────────────────────── */}
        <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">About & Committee</div>
            <div className="flex flex-col p-2">
              {sections.map((section) => {
                const SectionIcon = section.icon;
                return (
                  <button key={section.id} onClick={() => handleSelect(section.id)} className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${activeTab === section.id ? "bg-[#123B6D] text-white shadow-md" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                    <SectionIcon size={16} className={activeTab === section.id ? "text-blue-200" : "text-gray-400"} />
                    <span className="truncate">{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="p-6 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 bg-blue-100 text-blue-600 border border-blue-200">
                  <ActiveIcon size={32} strokeWidth={2} />
                </div>
                <div className="flex-1 w-full">
                  <h2 className="text-2xl md:text-4xl font-black text-gray-900">{activeSection.title}</h2>
                </div>
              </div>

              <div className="p-6 md:p-10 space-y-10">
                {/* ── Objective ── */}
                {activeTab === "objective" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                      <Info size={20} /> About our Objective
                    </div>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
                      {c('objective').about || "Goals and primary objectives driving research within the institution.\nWe aim to foster a culture of innovation, critical thinking, and advanced research methodologies among students and faculty members alike. Our primary objective is to contribute to global knowledge while addressing local and national challenges through rigorous academic inquiry."}
                    </p>
                  </section>
                )}

                {/* ── Committee ── */}
                {activeTab === "committee" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                      <Users2 size={20} /> {c('committee').about || "Research Assessment, Promotion & Ethics Committee 2026-27"}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(c('committee').committee || [
                        { name: "Dr. Rajashri Deshpande", role: "Chairperson" },
                        { name: "Dr. Arjun Lakhe", role: "Member" },
                        { name: "Dr. Shayeree Ghosh", role: "Member" },
                        { name: "Dr. Jyotika Chheda", role: "Member" },
                        { name: "Dr. Knachana Sattur", role: "Member" },
                        { name: "Dr. Sandhya Pandey", role: "Member" },
                      ]).map((member: any, i: number) => (
                        <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                          <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                          <p className="text-xs text-[#123B6D] font-semibold mt-0.5">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* ── Reports ── */}
                {activeTab === "reports" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                      <FileArchive size={20} /> Archive of Annual Reports
                    </div>
                    <div className="space-y-4">
                      {(c('reports').important_documents || [
                        { title: "Annual Research Report", year: "2024-2025" },
                        { title: "Annual Research Report", year: "2023-2024" },
                        { title: "Annual Research Report", year: "2022-2023" },
                      ]).map((doc: any, i: number) => (
                        <div key={i} className={`flex items-center justify-between bg-white border border-gray-200 hover:border-[#123B6D] transition-colors rounded-xl p-5 group ${doc.url ? 'cursor-pointer' : ''}`}>
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                              <FileText size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm group-hover:text-[#123B6D]">{doc.title}</p>
                              {doc.year && <p className="text-xs text-gray-500">Academic Year {doc.year}</p>}
                            </div>
                          </div>
                          {doc.url ? (
                            <a href={doc.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#123B6D] text-sm font-semibold hover:underline">
                              <Download size={15} /> Download
                            </a>
                          ) : (
                            <ChevronRight size={18} className="text-gray-300 group-hover:text-[#123B6D]" />
                          )}
                        </div>
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

export default function AboutResearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><Loader2 className="animate-spin text-[#123B6D]" size={28} /></div>}>
      <AboutResearchContent />
    </Suspense>
  );
}
