"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Calendar, Map, GraduationCap, Accessibility, Leaf, ChevronRight, Loader2, ArrowRight, FileText, Download, ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface SectionData {
  id: string;
  title: string;
  icon: React.ElementType;
}

const sections: SectionData[] = [
  { id: "annual-reports", title: "Annual Reports", icon: BookOpen },
  { id: "academic-calendar", title: "Academic Calendar", icon: Calendar },
  { id: "perspective-plan", title: "Perspective Plan", icon: Map },
  { id: "deeksharambh", title: "Deeksharambh", icon: GraduationCap },
  { id: "disability", title: "Disability Sensitisation", icon: Accessibility },
  { id: "environment", title: "Environmental Commitments", icon: Leaf },
];

const annualReports = [
  { title: 'Annual Report 2023–24', desc: 'Comprehensive report on academic and administrative performance for the year 2023-24', file: 'Annual_Report_23_24.pdf' },
  { title: 'Annual Report 2022–23', desc: 'Comprehensive report on academic and administrative performance for the year 2022-23', file: 'Annual_Report_22_23.pdf' },
  { title: 'Annual Report 2021–22', desc: 'Comprehensive report on academic and administrative performance for the year 2021-22', file: 'Annual_Report_21_22.pdf' },
];

function ReportsInitiativesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>("annual-reports");
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && sections.find((s) => s.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setMobileDropdownOpen(false);
    router.push(`/iqac/reports-and-initiatives?tab=${id}`, { scroll: false });
  };

  const activeSection = sections.find((s) => s.id === activeTab) || sections[0];
  const ActiveIcon = activeSection.icon;

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
                Reports & Initiatives
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
              Reports & Initiatives
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
                
                {activeTab === "annual-reports" && (
                  <div className="space-y-6">
                    <p className="text-gray-600 mb-8">
                      Download and view the Annual Reports detailing the college's academic, co-curricular, and administrative achievements over the years.
                    </p>
                    <div className="grid gap-4">
                      {annualReports.map((report, i) => (
                        <div key={i} className="flex items-start sm:items-center justify-between gap-4 p-4 md:p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                              <FileText size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#1E293B] text-lg">{report.title}</h4>
                              <p className="text-sm text-gray-500 mt-1">{report.desc}</p>
                            </div>
                          </div>
                          <button className="shrink-0 flex items-center gap-2 bg-[#123B6D] hover:bg-[#0f2e56] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                            <Download size={16} /> <span className="hidden sm:inline">Download</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "academic-calendar" && (
                  <div className="bg-blue-50/50 rounded-xl p-8 border border-blue-100 text-center">
                    <Calendar className="w-16 h-16 text-[#D4A017] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#123B6D] mb-4">Academic Calendar</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      The academic calendar for the upcoming session will be updated here shortly.
                    </p>
                  </div>
                )}

                {activeTab === "perspective-plan" && (
                  <div className="bg-blue-50/50 rounded-xl p-8 border border-blue-100 text-center">
                    <Map className="w-16 h-16 text-[#D4A017] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#123B6D] mb-4">Perspective Plan</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      The institutional perspective plan for long-term growth and quality enhancement is being documented and will be available soon.
                    </p>
                  </div>
                )}

                {activeTab === "deeksharambh" && (
                  <div className="bg-blue-50/50 rounded-xl p-8 border border-blue-100 text-center">
                    <GraduationCap className="w-16 h-16 text-[#D4A017] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#123B6D] mb-4">Deeksharambh</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Information regarding the Student Induction Programme (Deeksharambh) will be provided here.
                    </p>
                  </div>
                )}

                {activeTab === "disability" && (
                  <div className="bg-blue-50/50 rounded-xl p-8 border border-blue-100 text-center">
                    <Accessibility className="w-16 h-16 text-[#D4A017] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#123B6D] mb-4">Disability Sensitisation</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Details on our initiatives and policies promoting an inclusive environment for differently-abled individuals.
                    </p>
                  </div>
                )}

                {activeTab === "environment" && (
                  <div className="bg-blue-50/50 rounded-xl p-8 border border-blue-100 text-center">
                    <Leaf className="w-16 h-16 text-[#D4A017] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#123B6D] mb-4">Environmental Commitments</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Our green campus initiatives, sustainability goals, and environmental commitments are documented here.
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

export default function ReportsInitiativesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <Loader2 className="animate-spin text-[#123B6D]" size={28} />
        </div>
      }
    >
      <ReportsInitiativesContent />
    </Suspense>
  );
}
