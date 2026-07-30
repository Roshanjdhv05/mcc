"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Users, Scale, Heart, Briefcase, BookOpen, UserPlus, FileText,
  Users2, Info, ChevronRight, Phone, Mail, Target, ExternalLink
} from "lucide-react";
import Link from "next/link";

const statutoryBodiesData = [
  {
    id: "grievance-cell",
    title: "Grievance Cell",
    icon: Scale,
    color: "bg-red-100 text-red-600 border-red-200",
    about: "The Grievance Redressal Cell attempts to address genuine problems and complaints of students. Students are encouraged to use the suggestion boxes placed on the campus to express constructive suggestions and grievances.",
    committee: "Led by the Principal and senior faculty members appointed as Grievance Officers.",
    objectives: [
      "To ensure a fair, impartial, and consistent mechanism for redressal of varied issues.",
      "To uphold the dignity of the College by ensuring strife-free atmosphere.",
      "To encourage students to express their grievances freely and frankly without fear.",
    ],
    email: "grievance@mcc.edu.in",
    contactPersons: [
      { name: "Grievance Officer", phone: "+91 98765 43250" },
    ],
    pdfFiles: [
      { title: "Grievance Redressal Policy", url: "#" },
    ]
  },
  {
    id: "icc",
    title: "Internal Complaint Committee",
    icon: Shield,
    color: "bg-purple-100 text-purple-600 border-purple-200",
    about: "The Internal Complaint Committee (ICC) is constituted in accordance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.",
    committee: "Presiding Officer, Faculty Representatives, Non-Teaching Representatives, Student Representatives, and an External NGO member.",
    objectives: [
      "To prevent sexual harassment of women at the workplace/college.",
      "To create awareness among students and staff about the POSH Act.",
      "To provide a safe environment that is free from sexual harassment.",
    ],
    email: "icc@mcc.edu.in",
    contactPersons: [
      { name: "ICC Presiding Officer", phone: "+91 98765 43251" },
    ],
    pdfFiles: [
      { title: "ICC Guidelines & Act", url: "#" },
    ]
  },
  {
    id: "anti-ragging",
    title: "Anti-Ragging Committee",
    icon: Shield,
    color: "bg-blue-100 text-blue-600 border-blue-200",
    about: "The Anti-Ragging Committee ensures compliance with the provisions of regulations as well as the provisions of any law for the time being in force concerning ragging.",
    committee: "Principal, Faculty Members, Civil & Police Administration Representatives, NGO, Parents, and Students.",
    objectives: [
      "To keep a continuous watch and vigil over ragging so as to prevent its occurrence.",
      "To promptly deal with incidents of ragging brought to our notice.",
      "To foster a culture of respect and harmony among students.",
    ],
    email: "antiragging@mcc.edu.in",
    contactPersons: [
      { name: "Anti-Ragging Nodal Officer", phone: "+91 98765 43252" },
    ],
    pdfFiles: [
      { title: "UGC Anti-Ragging Guidelines", url: "#" },
      { title: "Anti-Ragging Undertaking", url: "#" },
    ]
  },
  {
    id: "counselling",
    title: "Counselling Cell",
    icon: Heart,
    color: "bg-pink-100 text-pink-600 border-pink-200",
    about: "The Counselling Cell offers a safe, confidential space for students to discuss their personal, academic, and psychological challenges with professional counselors.",
    committee: "Qualified Professional Counselors and dedicated faculty members.",
    objectives: [
      "To help students navigate stress, anxiety, and depression.",
      "To provide career guidance and academic counseling.",
      "To conduct workshops on mental health awareness.",
    ],
    email: "counsellor@mcc.edu.in",
    contactPersons: [
      { name: "College Counsellor", phone: "+91 98765 43253" },
    ],
    pdfFiles: []
  },
  {
    id: "career-katta",
    title: "Career Katta",
    icon: Briefcase,
    color: "bg-indigo-100 text-indigo-600 border-indigo-200",
    about: "An initiative by the Government of Maharashtra to provide value-added courses, competitive exam coaching, and career guidance to students at a nominal cost.",
    committee: "Nodal Officer appointed by the college in coordination with Govt. of Maharashtra.",
    objectives: [
      "To provide IAS/IPS/MPSC coaching on campus.",
      "To develop entrepreneurial skills.",
      "To enhance employability through skill development programs.",
    ],
    email: "careerkatta@mcc.edu.in",
    contactPersons: [
      { name: "Career Katta Coordinator", phone: "+91 98765 43254" },
    ],
    pdfFiles: [
      { title: "Career Katta Information Brochure", url: "#" },
    ]
  },
  {
    id: "special-cell",
    title: "Special Cell",
    icon: Users,
    color: "bg-orange-100 text-orange-600 border-orange-200",
    about: "The Special Cell is established to ensure the effective implementation of the reservation policies for SC/ST/OBC/Minority students as per the government guidelines.",
    committee: "Liaison Officer and dedicated faculty members from reserved categories.",
    objectives: [
      "To guide students from weaker sections regarding scholarships and freeships.",
      "To resolve grievances related to discrimination.",
      "To ensure equal opportunities in admissions and placements.",
    ],
    email: "specialcell@mcc.edu.in",
    contactPersons: [
      { name: "Liaison Officer", phone: "+91 98765 43255" },
    ],
    pdfFiles: [
      { title: "Govt. Resolution on Reservations", url: "#" },
    ]
  },
  {
    id: "remedial-coaching",
    title: "Remedial Coaching Cell",
    icon: BookOpen,
    color: "bg-teal-100 text-teal-600 border-teal-200",
    about: "The Remedial Coaching Cell provides additional academic support to students who are academically weaker or belong to marginalized backgrounds.",
    committee: "Coordinators from various academic departments.",
    objectives: [
      "To improve the academic skills and linguistic proficiency of students.",
      "To reduce the dropout rate.",
      "To help students clear their backlog examinations.",
    ],
    email: "remedial@mcc.edu.in",
    contactPersons: [
      { name: "Remedial Coaching Coordinator", phone: "+91 98765 43256" },
    ],
    pdfFiles: [
      { title: "Remedial Class Schedule", url: "#" },
    ]
  }
];

function StatutoryBodiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeBodyId, setActiveBodyId] = useState<string>(statutoryBodiesData[0].id);

  useEffect(() => {
    const bodyParam = searchParams.get("body");
    if (bodyParam && statutoryBodiesData.find((b) => b.id === bodyParam)) {
      setActiveBodyId(bodyParam);
    }
  }, [searchParams]);

  const handleBodySelect = (id: string) => {
    setActiveBodyId(id);
    router.push(`/statutory-bodies?body=${id}`, { scroll: false });
  };

  const activeBody = statutoryBodiesData.find((b) => b.id === activeBodyId) ?? statutoryBodiesData[0];

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
                About Us
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white">
                Statutory Bodies
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row gap-8">
        {/* SIDEBAR */}
        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">
              Committees &amp; Cells
            </div>
            <div className="flex flex-col p-2 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {statutoryBodiesData.map((body) => (
                <button
                  key={body.id}
                  onClick={() => handleBodySelect(body.id)}
                  className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${
                    activeBodyId === body.id
                      ? "bg-[#123B6D] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <body.icon
                    size={16}
                    className={activeBodyId === body.id ? "text-blue-200" : "text-gray-400"}
                  />
                  <span className="truncate">{body.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBody.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${activeBody.color} border`}>
                  <activeBody.icon size={36} strokeWidth={2} />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                      {activeBody.title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {activeBody.email && (
                      <Link
                        href={`mailto:${activeBody.email}`}
                        className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      >
                        <Mail size={16} /> Contact Email
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-8 md:p-10 space-y-10">
                {/* About */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Info size={20} />
                    About
                  </div>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    {activeBody.about}
                  </p>
                </section>

                {/* Committee */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Users2 size={20} />
                    Committee Composition
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-700 leading-relaxed">
                    {activeBody.committee}
                  </div>
                </section>

                {/* Objectives */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Target size={20} />
                    Key Objectives
                  </div>
                  <ul className="space-y-3">
                    {activeBody.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <ChevronRight size={14} strokeWidth={3} />
                        </div>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Documents / PDFs */}
                {activeBody.pdfFiles && activeBody.pdfFiles.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                      <FileText size={20} />
                      Important Documents
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeBody.pdfFiles.map((pdf, i) => (
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
                )}

                {/* Contact Us */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Phone size={20} />
                    Contact Person
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeBody.contactPersons.map((person, i) => (
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

export default function StatutoryBodiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      }
    >
      <StatutoryBodiesContent />
    </Suspense>
  );
}
