"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Users2, Info, ChevronRight, Phone, Target, ExternalLink, Mail, FileText
} from "lucide-react";
import Link from "next/link";

const publicationsData = [
  {
    id: "pratibimb",
    title: "Pratibimb",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600 border-blue-200",
    about: "Pratibimb is the annual magazine of the BAF department, showcasing a reflection of student thoughts, research articles, and creative expressions.",
    committee: "Edited and compiled by the BAF Department Editorial Board.",
    objectives: [
      "Encourage students to articulate their thoughts on finance and accounting.",
      "Highlight departmental achievements and events.",
      "Provide a creative outlet for budding writers.",
    ],
    instagram: "https://instagram.com/",
    contact: "pratibimb@mcc.edu.in",
    contactPersons: [
      { name: "Chief Editor", phone: "+91 98765 43240" },
    ],
    pdfFiles: [
      { title: "Pratibimb Vol 1 (2022-23)", url: "#" },
      { title: "Pratibimb Vol 2 (2023-24)", url: "#" },
    ]
  },
  {
    id: "finanza",
    title: "Finanza",
    icon: BookOpen,
    color: "bg-green-100 text-green-600 border-green-200",
    about: "Finanza is a publication dedicated to financial markets, economics, and business strategies, managed by the BFM department.",
    committee: "Managed by the BFM Editorial Core Committee.",
    objectives: [
      "Analyze current market trends and economic policies.",
      "Share insights on financial management and investments.",
      "Showcase research by students and faculty.",
    ],
    instagram: "https://instagram.com/",
    contact: "finanza@mcc.edu.in",
    contactPersons: [
      { name: "Finanza Coordinator", phone: "+91 98765 43241" },
    ],
    pdfFiles: [
      { title: "Finanza Issue 1", url: "#" },
      { title: "Finanza Issue 2", url: "#" },
    ]
  },
  {
    id: "techanugraha",
    title: "Techanugraha",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-600 border-purple-200",
    about: "Techanugraha captures the latest advancements in technology, coding paradigms, and digital innovation, published by the IT/CS departments.",
    committee: "Led by the Tech Club and IT/CS faculty members.",
    objectives: [
      "Document tech events, workshops, and hackathons.",
      "Publish student projects and technical papers.",
      "Keep the student body updated on the latest tech trends.",
    ],
    instagram: "https://instagram.com/",
    contact: "techanugraha@mcc.edu.in",
    contactPersons: [
      { name: "Tech Editor", phone: "+91 98765 43242" },
    ],
    pdfFiles: [
      { title: "Techanugraha 2023", url: "#" },
      { title: "Techanugraha 2024", url: "#" },
    ]
  },
];

function StudentsPublicationsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activePubId, setActivePubId] = useState<string>(publicationsData[0].id);

  useEffect(() => {
    const pubParam = searchParams.get("publication");
    if (pubParam && publicationsData.find((p) => p.id === pubParam)) {
      setActivePubId(pubParam);
    }
  }, [searchParams]);

  const handlePubSelect = (id: string) => {
    setActivePubId(id);
    router.push(`/students-corner/Students-Publications?publication=${id}`, { scroll: false });
  };

  const activePub = publicationsData.find((p) => p.id === activePubId) ?? publicationsData[0];

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
                Students&apos; Corner
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white">
                Student&apos;s Publications
              </h1>
            </div>
            {/* No view gallery button here */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row gap-8">
        {/* SIDEBAR */}
        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">
              Categories
            </div>
            <div className="flex flex-col p-2 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {publicationsData.map((pub) => (
                <button
                  key={pub.id}
                  onClick={() => handlePubSelect(pub.id)}
                  className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${
                    activePubId === pub.id
                      ? "bg-[#123B6D] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <pub.icon
                    size={16}
                    className={activePubId === pub.id ? "text-blue-200" : "text-gray-400"}
                  />
                  <span className="truncate">{pub.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePub.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Publication Header */}
              <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${activePub.color} border`}>
                  <activePub.icon size={36} strokeWidth={2} />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                      {activePub.title}
                    </h2>
                    {/* No view gallery button here */}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {activePub.instagram && (
                      <Link
                        href={activePub.instagram}
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      >
                        <ExternalLink size={16} /> Instagram Page
                      </Link>
                    )}
                    {activePub.contact && (
                      <Link
                        href={`mailto:${activePub.contact}`}
                        className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      >
                        <Mail size={16} /> Contact Us
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Publication Details */}
              <div className="p-8 md:p-10 space-y-10">
                {/* About */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Info size={20} />
                    About
                  </div>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    {activePub.about}
                  </p>
                </section>

                {/* Committee */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Users2 size={20} />
                    Committee
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-700 leading-relaxed">
                    {activePub.committee}
                  </div>
                </section>

                {/* Objectives & Activities */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Target size={20} />
                    Objectives &amp; Activities
                  </div>
                  <ul className="space-y-3">
                    {activePub.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <ChevronRight size={14} strokeWidth={3} />
                        </div>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Publications PDFs */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <FileText size={20} />
                    Publications
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activePub.pdfFiles.map((pdf, i) => (
                      <a
                        key={i}
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-white border border-gray-200 hover:border-[#123B6D] hover:shadow-md transition-all rounded-xl p-4 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                            <FileText size={20} />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm group-hover:text-[#123B6D] transition-colors">{pdf.title}</span>
                        </div>
                        <ExternalLink size={16} className="text-gray-400 group-hover:text-[#123B6D] transition-colors" />
                      </a>
                    ))}
                  </div>
                </section>

                {/* Contact Us */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Phone size={20} />
                    Contact Us
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activePub.contactPersons.map((person, i) => (
                      <div key={i} className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4">
                        <div className="w-10 h-10 rounded-full bg-[#123B6D]/10 flex items-center justify-center shrink-0">
                          <Users2 size={18} className="text-[#123B6D]" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{person.name}</p>
                          <a
                            href={`tel:${person.phone}`}
                            className="text-[#123B6D] text-sm font-medium hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <Phone size={12} />
                            {person.phone}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function StudentsPublicationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      }
    >
      <StudentsPublicationsContent />
    </Suspense>
  );
}
