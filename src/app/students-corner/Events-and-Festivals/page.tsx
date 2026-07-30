"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music, Rocket, Activity, Users, Compass, ExternalLink, Mail, Target,
  Users2, Info, ChevronRight, Phone, Image as ImageIcon, Calendar
} from "lucide-react";
import Link from "next/link";

const eventsData = [
  {
    id: "spectrum",
    title: "Spectrum",
    icon: Music,
    color: "bg-purple-100 text-purple-600 border-purple-200",
    about: "Spectrum is the flagship inter-collegiate cultural festival of MCC. It brings together students from colleges across the state to compete, celebrate, and showcase their talents in performing arts, fine arts, and literary events.",
    committee: "Organized by the Cultural Forum and a dedicated Spectrum Core Committee comprising student heads from various departments.",
    objectives: [
      "Provide a massive platform for creative expression.",
      "Foster a spirit of healthy competition and camaraderie.",
      "Manage a large-scale event, building leadership and organizational skills.",
      "Celebrate the diverse talents of the youth.",
    ],
    instagram: "https://instagram.com/",
    contact: "spectrum@mcc.edu.in",
    contactPersons: [
      { name: "Spectrum Chairperson", phone: "+91 98765 43233" },
      { name: "Events Head", phone: "+91 98765 43234" },
    ],
  },
  {
    id: "inspira",
    title: "Inspira",
    icon: Rocket,
    color: "bg-blue-100 text-blue-600 border-blue-200",
    about: "Inspira is the premier management festival organized by the B.M.S department. It focuses on business acumen, leadership challenges, and corporate simulations.",
    committee: "Managed by the BMS student council and faculty coordinators.",
    objectives: [
      "Bridge the gap between theoretical knowledge and practical business scenarios.",
      "Host mock stock exchanges, business plan pitches, and marketing debates.",
      "Invite industry leaders for keynote sessions.",
    ],
    instagram: "https://instagram.com/",
    contact: "inspira@mcc.edu.in",
    contactPersons: [
      { name: "Inspira Coordinator", phone: "+91 98765 43235" },
    ],
  },
  {
    id: "hackathon",
    title: "Hack-A-Thon",
    icon: Activity,
    color: "bg-green-100 text-green-600 border-green-200",
    about: "An annual 24-hour coding marathon where tech enthusiasts gather to solve real-world problems using innovative software solutions.",
    committee: "Organized by the IT and CS departments along with the Tech Club.",
    objectives: [
      "Promote coding, problem-solving, and logical thinking.",
      "Develop innovative tech prototypes.",
      "Encourage teamwork under high-pressure scenarios.",
    ],
    instagram: "https://instagram.com/",
    contact: "hackathon@mcc.edu.in",
    contactPersons: [
      { name: "Tech Head", phone: "+91 98765 43236" },
    ],
  },
  {
    id: "emporio",
    title: "Emporio",
    icon: Users,
    color: "bg-orange-100 text-orange-600 border-orange-200",
    about: "Emporio is the flagship commerce and economics festival organized by the B.Com department. It features intellectually stimulating competitions related to finance and trade.",
    committee: "Led by the Commerce Association of MCC.",
    objectives: [
      "Host events on financial literacy and economic policies.",
      "Organize trade fairs and entrepreneurial stalls on campus.",
      "Enhance practical understanding of commerce.",
    ],
    instagram: "https://instagram.com/",
    contact: "emporio@mcc.edu.in",
    contactPersons: [
      { name: "Emporio Secretary", phone: "+91 98765 43237" },
    ],
  },
  {
    id: "quantomania",
    title: "Quantomania",
    icon: Activity,
    color: "bg-red-100 text-red-600 border-red-200",
    about: "A specialized event focusing on quantitative finance, mathematics, and statistics, bringing out the best analytical minds.",
    committee: "Organized by the Mathematics and Statistics departments.",
    objectives: [
      "Test analytical and logical reasoning skills.",
      "Host quizzes and puzzle-solving marathons.",
      "Promote the fun side of mathematics.",
    ],
    instagram: "https://instagram.com/",
    contact: "quantomania@mcc.edu.in",
    contactPersons: [
      { name: "Quantomania Coordinator", phone: "+91 98765 43238" },
    ],
  },
  {
    id: "manthan",
    title: "Manthan",
    icon: Compass,
    color: "bg-teal-100 text-teal-600 border-teal-200",
    about: "Manthan is a unique socio-cultural event that encourages debate, discussion, and awareness on pressing social issues.",
    committee: "Organized jointly by the Humanities departments and NSS.",
    objectives: [
      "Host panel discussions and youth parliaments.",
      "Create awareness through street plays and poster making.",
      "Encourage critical thinking on social justice.",
    ],
    instagram: "https://instagram.com/",
    contact: "manthan@mcc.edu.in",
    contactPersons: [
      { name: "Manthan Convener", phone: "+91 98765 43239" },
    ],
  },
];

function EventsAndFestivalsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeEventId, setActiveEventId] = useState<string>(eventsData[0].id);

  useEffect(() => {
    const eventParam = searchParams.get("event");
    if (eventParam && eventsData.find((e) => e.id === eventParam)) {
      setActiveEventId(eventParam);
    }
  }, [searchParams]);

  const handleEventSelect = (id: string) => {
    setActiveEventId(id);
    router.push(`/students-corner/Events-and-Festivals?event=${id}`, { scroll: false });
  };

  const activeEvent = eventsData.find((e) => e.id === activeEventId) ?? eventsData[0];

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
                Events &amp; Festivals
              </h1>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/students-corner/gallery"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl text-sm font-bold transition-colors backdrop-blur-md"
              >
                <ImageIcon size={18} /> View Gallery
              </Link>
              <Link
                href="/students-corner/event-calendar"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl text-sm font-bold transition-colors backdrop-blur-md"
              >
                <Calendar size={18} /> View Calendar
              </Link>
            </div>
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
              {eventsData.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => handleEventSelect(ev.id)}
                  className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${
                    activeEventId === ev.id
                      ? "bg-[#123B6D] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <ev.icon
                    size={16}
                    className={activeEventId === ev.id ? "text-blue-200" : "text-gray-400"}
                  />
                  <span className="truncate">{ev.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Event Header */}
              <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${activeEvent.color} border`}>
                  <activeEvent.icon size={36} strokeWidth={2} />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                      {activeEvent.title}
                    </h2>
                    <Link
                      href={`/students-corner/gallery?department=${encodeURIComponent(activeEvent.title)}`}
                      className="inline-flex items-center gap-2 bg-[#123B6D] hover:bg-[#123B6D]/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0"
                    >
                      <ImageIcon size={18} /> View Gallery
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {activeEvent.instagram && (
                      <Link
                        href={activeEvent.instagram}
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      >
                        <ExternalLink size={16} /> Instagram Page
                      </Link>
                    )}
                    {activeEvent.contact && (
                      <Link
                        href={`mailto:${activeEvent.contact}`}
                        className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      >
                        <Mail size={16} /> Contact Us
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-8 md:p-10 space-y-10">
                {/* About */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Info size={20} />
                    About
                  </div>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    {activeEvent.about}
                  </p>
                </section>

                {/* Committee */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Users2 size={20} />
                    Committee
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-700 leading-relaxed">
                    {activeEvent.committee}
                  </div>
                </section>

                {/* Objectives & Activities */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Target size={20} />
                    Objectives &amp; Activities
                  </div>
                  <ul className="space-y-3">
                    {activeEvent.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <ChevronRight size={14} strokeWidth={3} />
                        </div>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Contact Us */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Phone size={20} />
                    Contact Us
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeEvent.contactPersons.map((person, i) => (
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

export default function EventsAndFestivalsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      }
    >
      <EventsAndFestivalsContent />
    </Suspense>
  );
}
