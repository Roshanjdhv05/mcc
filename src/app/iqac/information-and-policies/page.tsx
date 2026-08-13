"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info, Shield, Users, Calendar, Star, BarChart2, ChevronRight, Loader2, FileText, Download, ArrowRight, Eye, ArrowLeft, Target
} from "lucide-react";
import Link from "next/link";

interface SectionData {
  id: string;
  title: string;
  icon: React.ElementType;
}

const sections: SectionData[] = [
  { id: "about", title: "About the IQAC", icon: Info },
  { id: "quality-policy", title: "Quality Policy", icon: Shield },
  { id: "members", title: "IQAC Composition", icon: Users },
  { id: "minutes", title: "Minutes of the Meeting", icon: Calendar },
  { id: "best-practices", title: "Best Practices", icon: Star },
  { id: "distinctiveness", title: "Institutional Distinctiveness", icon: BarChart2 },
];

const policies = [
  { title: 'Accessibility for Persons with Disability', file: 'Accessibility for Persons with Disability.pdf' },
  { title: 'Co-Curricular Policy', file: 'Co-Curricular policy.pdf' },
  { title: 'Community Engagement Policy', file: 'Community Engagement policy.pdf' },
  { title: 'Entrepreneurship Development', file: 'ENTREPRENEURSHIP DEVELOPMENT.pdf' },
  { title: 'Field Projects Policy', file: 'Field Projects policy.pdf' },
  { title: 'Grievance Redressal Committee', file: 'Grievance Redressal Committee.pdf' },
  { title: 'Gymkhana Policy', file: 'Gymkhana Policy.pdf' },
  { title: 'IT Policy', file: 'IT Policy.pdf' },
  { title: 'Institutional Social Responsibility', file: 'Institutional Social Responsibility.pdf' },
  { title: 'Learners’ Attendance', file: 'Learners’ Attendance.pdf' },
  { title: 'Library Policy', file: 'Library Policy.pdf' },
  { title: 'On-the-Job Training (OJT) Policy', file: 'On-the-Job Training (0JT) Policy.pdf' },
  { title: 'Placement and Career Counselling', file: 'PLACEMENT AND CAREER  COUNSELLING.pdf' },
  { title: 'Policy Framework', file: 'Policy Framework.pdf' },
  { title: 'Policy for Co-Curricular Courses', file: 'Policy for Co-Curricular Courses.pdf' },
  { title: 'Policy for Field Projects', file: 'Policy for Field Projects.pdf' },
  { title: 'Promotion, Progression and Development of Women in the Campus', file: 'Promotion, Progression and Development of Women in the campus..pdf' },
  { title: 'Publications', file: 'Publications.pdf' },
  { title: 'Purchase and Procurement', file: 'Purchase and  Procurement.pdf' },
  { title: 'Quality Enhancement', file: 'Quality Enhancement.pdf' },
  { title: 'Remedial Coaching', file: 'Remedial Coaching.pdf' },
  { title: 'Research Promotion', file: 'Research Promotion.pdf' },
  { title: 'Students Council', file: 'STUDENTS COUNCIL.pdf' },
  { title: 'Safety Policy', file: 'Safety Policy.pdf' },
  { title: 'Pandemic Policy', file: 'pandemic policy.pdf' },
];

const iqacMinutesData = {
  data: {
    '2021-22': ['03rd Aug , 2021.pdf', '21st April, 2022.pdf', 'code of Conduct, 21-4-2022.pdf', 'Outline of Previous Cycles 03-08-2021.pdf'],
    '2022-23': ['21st & 28th April 2023.pdf'],
    '2023-24': ['06th Nov 2023.pdf', '09th Mar 2024.pdf', '19th April 2024.pdf', '22nd july 2023.pdf'],
    '2024-25': ['10th Dec, 2024.pdf', '11th April, 2025.pdf', '21st Feb, 2025.pdf', '23rd Aug Result analysis.pdf', '23rd Aug, 2024.pdf'],
    '2025-26': ['13th Dec, 2025.pdf', '25th April, 2026.pdf', '26th Sept, 2025.pdf', '27th Feb, 2026.pdf']
  }
};

const iqacMembers = [
  { name: 'Dr. Suresh Mehta', role: 'Chairperson (Principal)', category: 'Management' },
  { name: 'Prof. Anita Sharma', role: 'IQAC Coordinator', category: 'Faculty' },
  { name: 'Dr. Rakesh Gupta', role: 'Member', category: 'Faculty' },
  { name: 'Prof. Seema Patil', role: 'Member', category: 'Faculty' },
  { name: 'Mr. Kiran Shah', role: 'External Expert', category: 'Industry' },
  { name: 'Ms. Priya Desai', role: 'Alumni Representative', category: 'Alumni' },
];

function InfoPoliciesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>("about");
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<{title: string, file: string} | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<{ name: string, url: string } | null>(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && sections.find((s) => s.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setMobileDropdownOpen(false);
    router.push(`/iqac/information-and-policies?tab=${id}`, { scroll: false });
  };

  const activeSection = sections.find((s) => s.id === activeTab) || sections[0];
  const ActiveIcon = activeSection.icon;

  const minuteYears = Object.keys(iqacMinutesData.data).sort((a, b) => b.localeCompare(a));
  const getPdfUrl = (year: string, filename: string) => `/IQAC/${year}/${filename}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#123B6D] pt-12 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-200 mb-4 uppercase tracking-wider">
                IQAC
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white">
                Information & Policies
              </h1>
            </div>
            <Link
              href="/iqac"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl text-sm font-bold transition-colors backdrop-blur-md shrink-0"
            >
              Back to IQAC Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-6 md:py-10 flex flex-col md:flex-row gap-8">
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
            <motion.span
              animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="shrink-0 ml-3"
            >
              <ChevronRight size={18} className="rotate-90" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {mobileDropdownOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="overflow-hidden absolute left-0 right-0 bg-white border border-[#E2E8F0] border-t-0 rounded-b-xl shadow-xl z-50"
              >
                <div className="flex flex-col divide-y divide-[#F1F5F9]">
                  {sections.map((section) => {
                    const SectionIcon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleSelect(section.id)}
                        className={`flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors text-left ${
                          activeTab === section.id
                            ? "bg-[#EBF3FF] text-[#123B6D]"
                            : "text-gray-700 hover:bg-[#F8FAFC] hover:text-[#123B6D]"
                        }`}
                      >
                        <SectionIcon
                          size={15}
                          className={`shrink-0 ${
                            activeTab === section.id ? "text-[#123B6D]" : "text-gray-400"
                          }`}
                        />
                        <span className="flex-1 text-left">{section.title}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── DESKTOP: Sidebar ──────────────────────── */}
        <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">
              Information & Policies
            </div>
            <div className="flex flex-col p-2">
              {sections.map((section) => {
                const SectionIcon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSelect(section.id)}
                    className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${
                      activeTab === section.id
                        ? "bg-[#123B6D] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <SectionIcon
                      size={16}
                      className={activeTab === section.id ? "text-blue-200" : "text-gray-400"}
                    />
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
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 bg-blue-100 text-blue-600 border border-blue-200">
                  <ActiveIcon size={32} strokeWidth={2} />
                </div>
                <div className="flex-1 w-full">
                  <h2 className="text-2xl md:text-4xl font-black text-gray-900">
                    {activeSection.title}
                  </h2>
                </div>
              </div>

              {/* Dynamic Details based on activeTab */}
              <div className="p-6 md:p-10">
                
                {activeTab === "about" && (
                  <div className="space-y-10">
                    <p className="text-gray-700 leading-relaxed text-justify text-[15px]">
                      Internal Quality Assurance Cell (IQAC) is a significant administrative body that is responsible for quality matters. It is the prime responsibility of IQAC to initiate, plan and supervise various necessary activities to increase the quality of the education imparted in a higher education institution. IQAC facilitates the creation of a learner-centric environment conducive for quality education, and it arranges for feedback responses from students, parents and other stakeholders on quality-related institutional processes.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Vision */}
                      <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-[#123B6D] flex items-center justify-center text-white shrink-0">
                            <Target size={20} />
                          </div>
                          <h3 className="text-xl font-bold text-[#123B6D]">Vision</h3>
                        </div>
                        <p className="text-gray-700 italic border-l-4 border-[#D4A017] pl-4 text-sm leading-relaxed">
                          "To build and ensure a quality culture aimed at all round excellence at the institutional level."
                        </p>
                      </div>

                      {/* Mission */}
                      <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-[#123B6D] flex items-center justify-center text-white shrink-0">
                            <Target size={20} />
                          </div>
                          <h3 className="text-xl font-bold text-[#123B6D]">Mission</h3>
                        </div>
                        <div className="space-y-3 text-gray-700 italic border-l-4 border-[#D4A017] pl-4 text-sm leading-relaxed">
                          <p>"To channelize and systematize the efforts and measures of an institution towards academic excellence."</p>
                          <p>"To be the driving force for ushering in quality to remove deficiencies and enhance quality."</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-10">
                        <div>
                          <h3 className="text-lg font-bold text-[#123B6D] mb-5 flex items-center gap-2">
                            <div className="w-6 h-6 rounded flex items-center justify-center bg-[#D4A017]/20 text-[#D4A017]">
                              <Target size={14} />
                            </div> 
                            Goal
                          </h3>
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                              <span className="text-gray-700 text-sm leading-relaxed">To develop a quality system for conscious, consistent and catalytic programmed action to improve the academic and administrative performance of the Institution.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                              <span className="text-gray-700 text-sm leading-relaxed">To promote measures for institutional functioning towards quality enhancement through internationalization of quality culture and institutionalization of best practices.</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-bold text-[#123B6D] mb-5 flex items-center gap-2">
                            <div className="w-6 h-6 rounded flex items-center justify-center bg-[#D4A017]/20 text-[#D4A017]">
                              <Target size={14} />
                            </div> 
                            Purpose
                          </h3>
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                              <span className="text-gray-700 text-sm leading-relaxed">Improvement in all operations of the Institution.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                              <span className="text-gray-700 text-sm leading-relaxed">Networking with the stakeholders of the Institution.</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-[#123B6D] mb-5 flex items-center gap-2">
                          <div className="w-6 h-6 rounded flex items-center justify-center bg-[#D4A017]/20 text-[#D4A017]">
                            <Target size={14} />
                          </div> 
                          Objectives
                        </h3>
                        <ul className="space-y-4">
                          {[
                            "Develop mechanism for improvements in academic and administrative performance.",
                            "Promote quality culture in all facets of Institution's functioning.",
                            "To facilitate the integration of the various activities of the institution and institutionalize the best practices.",
                            "To provide a sound basis for decision making imbibing all the dimensions of service quality to improve institutional functioning.",
                            "To act as a change agent in the Institution.",
                            "To coordinate and improve internal communication to facilitate greater policy implementation and quality assurance towards its stakeholders."
                          ].map((obj, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                              <span className="text-gray-700 text-sm leading-relaxed">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "quality-policy" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: List of Policies */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h3 className="font-bold text-[#1E293B]">Available Policies</h3>
                        </div>
                        <div className="divide-y divide-gray-100 max-h-[700px] overflow-y-auto">
                          {policies.map((policy, i) => {
                            const isSelected = selectedPolicy?.file === policy.file;
                            return (
                              <div 
                                key={i} 
                                onClick={() => setSelectedPolicy(policy)}
                                className={`px-4 py-3 flex items-center justify-between transition-colors cursor-pointer ${
                                  isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-3 overflow-hidden pr-2">
                                  <FileText size={16} className={isSelected ? "text-blue-500 shrink-0" : "text-gray-400 shrink-0"} />
                                  <span className={`text-sm truncate ${isSelected ? 'text-blue-700 font-semibold' : 'text-gray-600'}`}>
                                    {policy.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <a 
                                    href={`/policies/${policy.file}`}
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
                    <div className="lg:col-span-7">
                      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
                        <div className="p-4 border-b border-gray-100 bg-[#123B6D] text-white flex items-center justify-between">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText size={18} className="text-[#D4A017] shrink-0" />
                            <h3 className="font-bold truncate text-sm">
                              {selectedPolicy ? selectedPolicy.title : 'No policy selected'}
                            </h3>
                          </div>
                          {selectedPolicy && (
                            <a 
                              href={`/policies/${selectedPolicy.file}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors shrink-0 flex items-center gap-2"
                            >
                              Open <ArrowRight size={12} />
                            </a>
                          )}
                        </div>
                        
                        <div className="flex-1 bg-gray-100 relative">
                          {selectedPolicy ? (
                            <iframe 
                              src={`/policies/${selectedPolicy.file}#view=FitH`} 
                              className="w-full h-full border-none"
                              title={selectedPolicy.title}
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                              <FileText size={64} className="mb-4 opacity-20" />
                              <p className="text-lg font-medium text-gray-500 mb-2">Preview Area</p>
                              <p className="text-sm">Click on a policy from the list to view it here.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "members" && (
                  <div>
                    <h3 className="text-xl font-bold text-[#123B6D] mb-6">IQAC Composition</h3>
                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#F8FAFC] text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                            <th className="px-6 py-4 font-bold">Name</th>
                            <th className="px-6 py-4 font-bold">Role</th>
                            <th className="px-6 py-4 font-bold">Category</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-[14px]">
                          {iqacMembers.map((member, idx) => (
                            <tr key={idx} className="hover:bg-[#F8FAFC]/50 transition-colors">
                              <td className="px-6 py-4 font-semibold text-[#1E293B] whitespace-nowrap">
                                {member.name}
                              </td>
                              <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                                {member.role}
                              </td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-blue-100 text-blue-700">
                                  {member.category}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "minutes" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: List of Files */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                        {minuteYears.map((year) => (
                          <div key={year} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-[#E2E8F0] bg-gray-50 flex items-center justify-between">
                              <h3 className="font-bold text-[#1E293B] font-[var(--font-heading)]">Academic Year {year}</h3>
                              <span className="text-xs font-semibold bg-white border border-gray-200 px-3 py-1 rounded-full text-[#64748B]">
                                {iqacMinutesData.data[year as keyof typeof iqacMinutesData.data].length} Files
                              </span>
                            </div>
                            <div className="divide-y divide-[#E2E8F0]">
                              {iqacMinutesData.data[year as keyof typeof iqacMinutesData.data].map((file, i) => {
                                const fileUrl = getPdfUrl(year, file);
                                const isSelected = selectedMinute?.url === fileUrl;
                                
                                return (
                                  <div 
                                    key={i} 
                                    onClick={() => setSelectedMinute({ name: file, url: fileUrl })}
                                    className={`px-4 py-3 flex items-center justify-between transition-colors cursor-pointer ${
                                      isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-[#F8FAFC] border-l-4 border-transparent'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 overflow-hidden pr-2">
                                      <FileText size={16} className={isSelected ? "text-blue-500 shrink-0" : "text-[#94A3B8] shrink-0"} />
                                      <span className={`text-sm truncate ${isSelected ? 'text-blue-700 font-semibold' : 'text-[#64748B]'}`}>
                                        {file.replace('.pdf', '')}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <button className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#123B6D] hover:text-[#D4A017] transition-colors p-1.5 rounded bg-gray-100 hover:bg-gray-200">
                                        <Eye size={14} />
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
                    <div className="lg:col-span-7">
                      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-md overflow-hidden flex flex-col h-[700px]">
                        <div className="p-4 border-b border-[#E2E8F0] bg-[#123B6D] text-white flex items-center justify-between">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText size={18} className="text-[#D4A017] shrink-0" />
                            <h3 className="font-bold truncate text-sm md:text-base">
                              {selectedMinute ? selectedMinute.name : 'Select a document to preview'}
                            </h3>
                          </div>
                          {selectedMinute && (
                            <a 
                              href={selectedMinute.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors shrink-0 flex items-center gap-2"
                            >
                              Open <ChevronRight size={12} className="hidden sm:block" />
                            </a>
                          )}
                        </div>
                        
                        <div className="flex-1 bg-gray-100 relative">
                          {selectedMinute ? (
                            <iframe 
                              src={`${selectedMinute.url}#view=FitH`} 
                              className="w-full h-full border-none"
                              title={selectedMinute.name}
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
                )}

                {activeTab === "best-practices" && (
                  <div className="bg-blue-50/50 rounded-xl p-8 border border-blue-100 text-center">
                    <Star className="w-16 h-16 text-[#D4A017] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#123B6D] mb-4">Best Practices</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Information regarding the Best Practices adopted by the institution will be updated soon.
                    </p>
                  </div>
                )}

                {activeTab === "distinctiveness" && (
                  <div className="bg-blue-50/50 rounded-xl p-8 border border-blue-100 text-center">
                    <BarChart2 className="w-16 h-16 text-[#D4A017] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#123B6D] mb-4">Institutional Distinctiveness</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Details regarding Institutional Distinctiveness will be made available shortly.
                    </p>
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function InfoPoliciesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <Loader2 className="animate-spin text-[#123B6D]" size={28} />
        </div>
      }
    >
      <InfoPoliciesContent />
    </Suspense>
  );
}
