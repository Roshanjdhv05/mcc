"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Activity, Award, ChevronRight, Loader2, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface SectionData { id: string; title: string; icon: React.ElementType; }

const sections: SectionData[] = [
  { id: "avishkar", title: "Avishkar", icon: Trophy },
  { id: "shodh", title: "Shodh", icon: Activity },
  { id: "conclave", title: "PTVA's Conclave", icon: Award },
];

const SLUG_MAP: Record<string, string> = {
  avishkar: "avishkar",
  shodh: "shodh",
  conclave: "ptva-conclave",
};

type ContentMap = Record<string, any>;

function CompetitionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("avishkar");
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [contentMap, setContentMap] = useState<ContentMap>({});

  useEffect(() => {
    supabase.from('mcc_research').select('slug, content').eq('category', 'Competitions').then(({ data }) => {
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

  const handleSelect = (id: string) => { setActiveTab(id); setMobileDropdownOpen(false); router.push(`/research/competitions?tab=${id}`, { scroll: false }); };
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
              <h1 className="text-3xl md:text-5xl font-black text-white">Competitions & Events</h1>
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
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">Competitions</div>
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
                <div className="flex-1 w-full">
                  <h2 className="text-2xl md:text-4xl font-black text-gray-900">{activeSection.title}</h2>
                  <p className="text-gray-500 mt-2 font-medium">
                    {activeTab === "avishkar" && "University of Mumbai - Competition"}
                    {activeTab === "shodh" && "Inter-collegiate Research Competition"}
                    {activeTab === "conclave" && "PTVA's Inter-institutional Research Conclave"}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-10 space-y-10">
                {activeTab === "avishkar" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Trophy size={20} /> About Avishkar</div>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line mb-8">
                      {c('avishkar').about || "Initiated by the Honorable Governor of Maharashtra, Avishkar is a premier research convention designed to develop a research culture and scientific temper among students. Students from UG, PG, and PhD levels present their innovative ideas and projects at this prestigious university-level competition."}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(c('avishkar').objectives_activities || [
                        { content: "Open For: UG, PG, Post-PG & PhD Students" },
                        { content: "Frequency: Annual Event" },
                        { content: "Level: University & State Level" },
                      ]).map((item: any, i: number) => {
                        const icons = [<Users key={0} size={24} className="text-[#123B6D] mb-2" />, <Calendar key={1} size={24} className="text-[#123B6D] mb-2" />, <Award key={2} size={24} className="text-[#123B6D] mb-2" />];
                        const parts = item.content.split(':');
                        return (
                          <div key={i} className="bg-[#F8FAFC] border border-gray-100 p-5 rounded-xl">
                            {icons[i] || <Trophy size={24} className="text-[#123B6D] mb-2" />}
                            <div className="font-bold text-[#1E293B]">{parts[0]}</div>
                            {parts[1] && <div className="text-sm text-gray-500 mt-1">{parts[1].trim()}</div>}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {activeTab === "shodh" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Activity size={20} /> Inter-collegiate Research Competition</div>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line mb-8">
                      {c('shodh').about || "Shodh is an inter-collegiate research competition that provides a platform for budding researchers to showcase their talents. It encourages students from various disciplines across colleges to present their original research, engage in academic discourse, and receive valuable feedback from experts in the field."}
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-[#1E293B] mb-3">Key Highlights</h4>
                      <ul className="space-y-3 text-gray-600">
                        {(c('shodh').objectives_activities || [
                          { content: "Cross-disciplinary project presentations" },
                          { content: "Expert jury panel from academia and industry" },
                          { content: "Cash prizes and certificates for winners" },
                        ]).map((item: any, i: number) => (
                          <li key={i} className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />{item.content}</li>
                        ))}
                      </ul>
                    </div>
                  </section>
                )}

                {activeTab === "conclave" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Award size={20} /> PTVA&apos;s Inter-institutional Conclave</div>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line mb-8">
                      {c('conclave').about || "An exclusive conclave bringing together researchers, faculties, and students from all PTVA sister institutions. The event focuses on collaborative research, addressing contemporary socio-economic challenges, and fostering a strong intra-institutional research network."}
                    </p>
                    <div className="bg-[#123B6D] text-white rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 opacity-10"><Award size={120} className="transform translate-x-4 -translate-y-4" /></div>
                      <div className="relative z-10">
                        <h4 className="font-bold text-xl mb-2 text-[#D4A017]">Upcoming Conclave</h4>
                        <p className="text-white/80 mb-4">Dates and submission deadlines will be announced soon by the committee.</p>
                        <button className="bg-white text-[#123B6D] font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors">View Past Guidelines</button>
                      </div>
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

export default function CompetitionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><Loader2 className="animate-spin text-[#123B6D]" size={28} /></div>}>
      <CompetitionsContent />
    </Suspense>
  );
}
