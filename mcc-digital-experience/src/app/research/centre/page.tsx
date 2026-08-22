"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Library, Users, GraduationCap, Award, FileText, ChevronRight, Loader2, Info, Building2, BookOpen, Download
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface SectionData {
  id: string;
  title: string;
  icon: React.ElementType;
}

const sections: SectionData[] = [
  { id: "recognition", title: "Research Centre Recognition", icon: Building2 },
  { id: "guides", title: "Research Guides", icon: Users },
  { id: "scholars", title: "Research Scholars", icon: GraduationCap },
  { id: "thesis", title: "Awarded Thesis", icon: Award },
  { id: "application", title: "Application Process", icon: FileText },
];

const SLUG_MAP: Record<string, string> = {
  recognition: "research-centre-recognition",
  guides: "research-guides",
  scholars: "research-scholars",
  thesis: "awarded-thesis",
  application: "application-process",
};

const DEFAULT_SCHOLARS = [
  { guide: 'Dr. Parvathi Venkatesh', name: 'Dr. Shivaji Pawar', topic: 'Towards a Sustainable Society: The Role of the Self-help Group as a Catalyst for Economic Stability with special reference to SHGs in Maharashtra.', status: 'Awarded' },
  { guide: 'Dr. Parvathi Venkatesh', name: 'Dr. Vijayalaxmi Kannan', topic: 'Mapping of Customer Experience and its impact on Customer Lifetime Value: A study of Agglomerated Retail Stores in Thane and Mulund Cities', status: 'Awarded' },
  { guide: 'Dr. Parvathi Venkatesh', name: 'Dr. Sulbha Dey', topic: 'Impact of Green Policies and Practices on Economic Performance of Green Organized Retailers in Mumbai in 2020', status: 'Awarded' },
  { guide: 'Dr. Parvathi Venkatesh', name: 'Mrs. Riya Dhamapurkar', topic: 'An Assessment of Revenue and Expenditure Pattern of Municipal Corporation in Maharashtra.', status: 'Thesis submitted' },
  { guide: 'Dr. Shivaji Pawar', name: 'Dr. Shilpi Deepak Jawake', topic: 'A study of consumer buying intention of Green Product in FMCG sector', status: 'Awarded' },
  { guide: 'Dr. Shivaji Pawar', name: 'Dr. Chetan Mahesh Panchal', topic: 'A Study on Socio-Economic Condition of Fishermen in Mumbai Metropolitan Region', status: 'Awarded' },
  { guide: 'Dr. Shivaji Pawar', name: 'Ms. Pradnya Uddhav Rao Garad', topic: 'Impact Of Bank Merger on Customers and Employees in Thane Region', status: 'Thesis submitted' },
  { guide: 'Dr. Shivaji Pawar', name: 'Ms. Shrusti Desai', topic: "A Critical Appraisal of Mumbai Suburban Railway's SDG-13 Initiatives.", status: 'Work in Progress' },
  { guide: 'Dr. Shivaji Pawar', name: 'Ms. Esha Jhaveri', topic: 'An Analysis of Financial Inclusion and Economic Mobility of Gig Workers in the Mumbai Region', status: 'Work in Progress' },
  { guide: 'Dr. Shivaji Pawar', name: 'Ms. Snehal Pandurang Chavan', topic: 'An Evaluation of the Impact of Farmer Producer Organizations on Socio-Economic Empowerment', status: 'Work in Progress' },
  { guide: 'Dr. Shivaji Pawar', name: 'Ms. Gopika M .Pal', topic: 'Measuring the Level of Socio-Economic Vulnerability of Construction Workers in the Unorganised Sector in Thane District', status: 'Work in Progress' }
];

const statusColor = (status: string) => {
  if (status === 'Awarded') return 'bg-green-100 text-green-700';
  if (status === 'Thesis submitted') return 'bg-blue-100 text-blue-700';
  return 'bg-amber-100 text-amber-700';
};

type ContentMap = Record<string, any>;

function CentreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("recognition");
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [contentMap, setContentMap] = useState<ContentMap>({});

  useEffect(() => {
    supabase.from('mcc_research')
      .select('slug, content')
      .eq('category', 'Research Centre')
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
    if (tab && sections.find((s) => s.id === tab)) setActiveTab(tab);
  }, [searchParams]);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setMobileDropdownOpen(false);
    router.push(`/research/centre?tab=${id}`, { scroll: false });
  };

  const activeSection = sections.find((s) => s.id === activeTab) || sections[0];
  const ActiveIcon = activeSection.icon;
  const c = (id: string) => contentMap[SLUG_MAP[id]] || {};

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="bg-[#0D1B3E] pt-12 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-200 mb-4 uppercase tracking-wider">Research</div>
              <h1 className="text-3xl md:text-5xl font-black text-white">Research Centre</h1>
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

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">Research Centre</div>
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

        {/* Main Content */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 bg-blue-100 text-blue-600 border border-blue-200">
                  <ActiveIcon size={32} strokeWidth={2} />
                </div>
                <div className="flex-1 w-full">
                  <h2 className="text-2xl md:text-4xl font-black text-gray-900">{activeSection.title}</h2>
                </div>
              </div>

              <div className="p-6 md:p-10 space-y-10">
                {/* Recognition */}
                {activeTab === "recognition" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Building2 size={20} /> About the Centre</div>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line mb-8">
                      {c('recognition').about || "The Research Centre for PhD in Commerce specializes in Business Economics, fostering a culture of innovation and scholarly inquiry. Established in 2014, our center aims to contribute significantly to research and academic advancement."}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {(c('recognition').stats || [
                        { label: "Established", value: "2014" },
                        { label: "Guides", value: "2" },
                        { label: "Students", value: "11" },
                        { label: "PhD Awarded", value: "5" },
                      ]).map((stat: any, i: number) => (
                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 p-4 rounded-xl">
                          <div className="text-2xl font-bold text-[#1E293B]">{stat.value}</div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Guides */}
                {activeTab === "guides" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Users size={20} /> Authorized Research Guides</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(c('guides').committee || [
                        { name: "Dr. Parvathi Venkatesh", role: "Research Guide" },
                        { name: "Dr. Shivaji Pawar", role: "Research Guide" },
                      ]).map((guide: any, i: number) => (
                        <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-xl px-6 py-5 font-semibold text-[#1E293B] flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#123B6D]/10 text-[#123B6D] flex items-center justify-center"><Users size={20} /></div>
                          <span className="text-lg">{guide.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Scholars / Thesis */}
                {(activeTab === "scholars" || activeTab === "thesis") && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-6">
                      <BookOpen size={20} /> {activeTab === "scholars" ? "Current Scholars & Candidates" : "Awarded & Submitted Thesis"}
                    </div>
                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#F8FAFC] text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                            <th className="px-6 py-4 font-bold">Student Name</th>
                            <th className="px-6 py-4 font-bold">Guide</th>
                            <th className="px-6 py-4 font-bold min-w-[300px]">Topic of Research</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-[14px]">
                          {(c(activeTab).scholars || DEFAULT_SCHOLARS.filter(s => activeTab === "thesis" ? s.status !== "Work in Progress" : true))
                            .map((student: any, idx: number) => (
                            <tr key={idx} className="hover:bg-[#F8FAFC]/50 transition-colors">
                              <td className="px-6 py-4 font-semibold text-[#1E293B] whitespace-nowrap">{student.name}</td>
                              <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">{student.guide}</td>
                              <td className="px-6 py-4 text-gray-600 leading-relaxed">{student.topic}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${statusColor(student.status)}`}>
                                  {student.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

                {/* Application */}
                {activeTab === "application" && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Info size={20} /> Application Process</div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {c('application').about || "To apply for a PhD program at the Research Centre, candidates must follow the University of Mumbai guidelines. Please ensure you have cleared PET or hold an M.Phil/NET/SET qualification."}
                      </p>
                      <ul className="mt-4 space-y-3 text-gray-600">
                        {(c('application').objectives_activities || [
                          { content: "Check eligibility according to university standards." },
                          { content: "Prepare a preliminary research proposal." },
                          { content: "Submit the application form along with required documents to the center." },
                          { content: "Attend the interview/presentation session scheduled by the committee." },
                        ]).map((step: any, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-sm font-bold">{i + 1}</span>
                            </div>
                            <span>{step.content}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {c('application').important_documents?.filter((d: any) => d.url).map((doc: any, i: number) => (
                      <div key={i} className="mt-6 bg-[#F8FAFC] border border-gray-100 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><FileText size={24} /></div>
                          <div><p className="font-bold text-[#1E293B]">{doc.title}</p></div>
                        </div>
                        <a href={doc.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#123B6D] hover:bg-[#0D2A4F] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                          <Download size={16} /> Download
                        </a>
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

export default function CentrePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><Loader2 className="animate-spin text-[#123B6D]" size={28} /></div>}>
      <CentreContent />
    </Suspense>
  );
}
