"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Heart, Music, Activity, UserPlus, BookOpen,
  Leaf, Shield, Rocket, ExternalLink, Mail, Target,
  Users2, Info, ChevronRight, Phone, Image as ImageIcon
} from "lucide-react";
import Link from "next/link";

const clubsData = [
  {
    id: "students-council",
    title: "Students' Council",
    icon: Users,
    color: "bg-blue-100 text-blue-600 border-blue-200",
    about: "The Students' Council acts as the vital link between the student body and the college administration. It represents the voice of the students, ensures a vibrant campus life, and fosters leadership among its members.",
    committee: "The committee consists of a President, Vice President, General Secretary, Joint Secretary, and Class Representatives from all departments.",
    objectives: [
      "Act as a mediator between students and the college administration.",
      "Organize core college activities and annual events.",
      "Ensure the welfare and address the grievances of students.",
      "Promote discipline and leadership qualities among students.",
    ],
    instagram: "https://instagram.com/",
    contact: "studentcouncil@mcc.edu.in",
    contactPersons: [
      { name: "Dr. Sonali Pednekar", phone: "+91 98765 43210" },
      { name: "Student Council Head", phone: "+91 98765 43211" },
    ],
  },
  {
    id: "nss",
    title: "National Service Scheme",
    icon: Heart,
    color: "bg-red-100 text-red-600 border-red-200",
    about: "The NSS unit of MCC is dedicated to community service, social awareness, and nation-building activities. It instills a strong sense of social responsibility and empathy.",
    committee: "Led by the NSS Programme Officer along with student leaders (NSS Secretaries) and dedicated volunteers.",
    objectives: [
      "Organize regular blood donation drives and health camps.",
      "Conduct rural development camps and literacy campaigns.",
      "Promote environmental awareness and sustainability.",
      "Develop the personality of students through community service.",
    ],
    instagram: "https://instagram.com/",
    contact: "nss@mcc.edu.in",
    contactPersons: [
      { name: "NSS Programme Officer", phone: "+91 98765 43212" },
      { name: "NSS Secretary", phone: "+91 98765 43213" },
    ],
  },
  {
    id: "cultural-forum",
    title: "Cultural Forum",
    icon: Music,
    color: "bg-purple-100 text-purple-600 border-purple-200",
    about: "The Cultural Forum is the heartbeat of MCC's cultural life. It provides a massive platform for students to showcase their talents in dance, music, drama, and fine arts.",
    committee: "Managed by the Cultural Chairperson, Vice-Chairpersons, and heads of various sub-committees (Dance, Fine Arts, Music, etc.).",
    objectives: [
      "Organize 'Spectrum', the annual inter-collegiate cultural fest.",
      "Discover and nurture raw talent among the student body.",
      "Participate and represent MCC in university-level cultural competitions.",
      "Celebrate diverse festivals and traditions on campus.",
    ],
    instagram: "https://instagram.com/",
    contact: "cultural@mcc.edu.in",
    contactPersons: [
      { name: "Cultural Convener", phone: "+91 98765 43214" },
      { name: "Cultural Chairperson", phone: "+91 98765 43215" },
    ],
  },
  {
    id: "sports",
    title: "Sports and Gymkhana",
    icon: Activity,
    color: "bg-green-100 text-green-600 border-green-200",
    about: "The Sports and Gymkhana committee promotes physical fitness, sportsmanship, and competitive excellence. It oversees all indoor and outdoor sporting activities on campus.",
    committee: "Headed by the Sports Director, Gymkhana Secretary, and captains of various sports teams.",
    objectives: [
      "Encourage student participation in intra-college and inter-college sports.",
      "Provide facilities and coaching for cricket, football, chess, and athletics.",
      "Organize annual sports meets and tournaments.",
      "Foster teamwork, discipline, and a healthy lifestyle.",
    ],
    instagram: "https://instagram.com/",
    contact: "sports@mcc.edu.in",
    contactPersons: [
      { name: "Sports Director", phone: "+91 98765 43216" },
      { name: "Gymkhana Secretary", phone: "+91 98765 43217" },
    ],
  },
  {
    id: "natyakarmi",
    title: "Natyakarmi (Theatre Group)",
    icon: UserPlus,
    color: "bg-orange-100 text-orange-600 border-orange-200",
    about: "Natyakarmi is MCC's premier theatre group dedicated to acting, scriptwriting, and stage production. It is highly active in the collegiate theatre circuit.",
    committee: "Directed by a core team of student directors, production heads, and lead actors.",
    objectives: [
      "Produce award-winning one-act plays and street plays.",
      "Participate in prestigious drama competitions like the INT and Youth Festival.",
      "Conduct acting, voice modulation, and stagecraft workshops.",
      "Address social issues through theatrical expression.",
    ],
    instagram: "https://instagram.com/",
    contact: "natyakarmi@mcc.edu.in",
    contactPersons: [
      { name: "Theatre Group Director", phone: "+91 98765 43218" },
      { name: "Production Head", phone: "+91 98765 43219" },
    ],
  },
  {
    id: "mvm",
    title: "Marathi Vangmay Mandal",
    icon: BookOpen,
    color: "bg-yellow-100 text-yellow-600 border-yellow-200",
    about: "The Marathi Vangmay Mandal is dedicated to celebrating, promoting, and preserving the rich heritage of Marathi literature, language, and culture among the youth.",
    committee: "Led by a faculty convener and a core student committee passionate about Marathi literature.",
    objectives: [
      "Organize literary events, poetry recitations, and debate competitions.",
      "Host guest lectures by renowned Marathi authors and personalities.",
      "Celebrate 'Marathi Bhasha Diwas' with cultural grandeur.",
      "Encourage students to read and write in Marathi.",
    ],
    instagram: "https://instagram.com/",
    contact: "mvm@mcc.edu.in",
    contactPersons: [
      { name: "Faculty Convener", phone: "+91 98765 43220" },
      { name: "MVM Student Head", phone: "+91 98765 43221" },
    ],
  },
  {
    id: "aaroh",
    title: "Aaroh (Music Club)",
    icon: Music,
    color: "bg-pink-100 text-pink-600 border-pink-200",
    about: "Aaroh is a vibrant community for singers, instrumentalists, and music enthusiasts. It provides a harmonious space for musical exploration.",
    committee: "Managed by student coordinators specializing in vocals, instruments, and audio production.",
    objectives: [
      "Host regular jamming sessions and open mic events on campus.",
      "Train students in classical, semi-classical, and contemporary music.",
      "Form the college band to perform at various fests and events.",
      "Participate in inter-collegiate singing and band competitions.",
    ],
    instagram: "https://instagram.com/",
    contact: "aaroh@mcc.edu.in",
    contactPersons: [
      { name: "Music Coordinator", phone: "+91 98765 43222" },
      { name: "Aaroh Head", phone: "+91 98765 43223" },
    ],
  },
  {
    id: "music-club",
    title: "Music Club",
    icon: Music,
    color: "bg-cyan-100 text-cyan-600 border-cyan-200",
    about: "An extension of our musical initiatives, focusing on modern music production, DJing, and electronic beats.",
    committee: "Core group of music producers and sound engineers.",
    objectives: [
      "Learn basics of digital music production and mixing.",
      "Provide sound and DJ support for college events.",
      "Collaborate with other cultural clubs for performances.",
      "Explore diverse genres of modern music.",
    ],
    instagram: "https://instagram.com/",
    contact: "music@mcc.edu.in",
    contactPersons: [
      { name: "Music Club Coordinator", phone: "+91 98765 43224" },
    ],
  },
  {
    id: "nature-club",
    title: "Nature Club",
    icon: Leaf,
    color: "bg-emerald-100 text-emerald-600 border-emerald-200",
    about: "The Nature Club advocates for environmental conservation and sustainable living practices, connecting students with nature through hands-on activities.",
    committee: "Led by eco-conscious student leaders and guided by Botany/Zoology faculty.",
    objectives: [
      "Organize tree plantation drives in and around the campus.",
      "Conduct nature trails, treks, and biodiversity walks.",
      "Run clean-up campaigns (beach clean-ups, campus drives).",
      "Host seminars on climate change, waste management, and sustainability.",
    ],
    instagram: "https://instagram.com/",
    contact: "natureclub@mcc.edu.in",
    contactPersons: [
      { name: "Nature Club Faculty", phone: "+91 98765 43225" },
      { name: "Nature Club Head", phone: "+91 98765 43226" },
    ],
  },
  {
    id: "wdc",
    title: "Women Development Cell",
    icon: Shield,
    color: "bg-rose-100 text-rose-600 border-rose-200",
    about: "The WDC is committed to empowering women, promoting gender equality, and ensuring a safe, inclusive campus environment for everyone.",
    committee: "Comprises faculty members and student representatives dedicated to gender equality.",
    objectives: [
      "Conduct workshops on self-defense, health, and hygiene.",
      "Organize seminars on women's rights, legal awareness, and gender sensitization.",
      "Provide a platform for female students to discuss issues and seek guidance.",
      "Celebrate International Women's Day with impactful events.",
    ],
    instagram: "https://instagram.com/",
    contact: "wdc@mcc.edu.in",
    contactPersons: [
      { name: "WDC Faculty Coordinator", phone: "+91 98765 43227" },
      { name: "WDC Student Head", phone: "+91 98765 43228" },
    ],
  },
  {
    id: "edc",
    title: "Entrepreneurship Development Cell",
    icon: Rocket,
    color: "bg-indigo-100 text-indigo-600 border-indigo-200",
    about: "The EDC fosters an entrepreneurial mindset among students, supporting innovation and helping turn visionary ideas into successful student startups.",
    committee: "Headed by student entrepreneurs and mentored by industry professionals.",
    objectives: [
      "Provide networking opportunities and resources for aspiring entrepreneurs.",
      "Host business plan competitions, hackathons, and pitch days.",
      "Organize guest lectures and mentorship sessions with successful founders.",
      "Facilitate skill-building workshops on finance, marketing, and leadership.",
    ],
    instagram: "https://instagram.com/",
    contact: "edc@mcc.edu.in",
    contactPersons: [
      { name: "EDC Faculty Mentor", phone: "+91 98765 43229" },
      { name: "EDC Head", phone: "+91 98765 43230" },
    ],
  },
  {
    id: "research",
    title: "Students' Research",
    icon: BookOpen,
    color: "bg-teal-100 text-teal-600 border-teal-200",
    about: "A dedicated wing that promotes a culture of research and academic inquiry among undergraduate and postgraduate students.",
    committee: "Guided by the Research Cell faculty and senior student researchers.",
    objectives: [
      "Assist students in writing and publishing research papers.",
      "Organize national and international student research conferences (e.g., Avishkar).",
      "Provide workshops on research methodology and data analysis.",
      "Encourage interdisciplinary research projects.",
    ],
    instagram: "https://instagram.com/",
    contact: "research@mcc.edu.in",
    contactPersons: [
      { name: "Research Cell Faculty", phone: "+91 98765 43231" },
      { name: "Research Head", phone: "+91 98765 43232" },
    ],
  },
];

// ─── Inner component that uses useSearchParams ─────────────────────────────
function ForumsAndClubsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeClubId, setActiveClubId] = useState<string>(clubsData[0].id);

  useEffect(() => {
    const clubParam = searchParams.get("club");
    if (clubParam && clubsData.find((c) => c.id === clubParam)) {
      setActiveClubId(clubParam);
    }
  }, [searchParams]);

  const handleClubSelect = (id: string) => {
    setActiveClubId(id);
    router.push(`/students-corner/Forums-and-Clubs?club=${id}`, { scroll: false });
  };

  const activeClub = clubsData.find((c) => c.id === activeClubId) ?? clubsData[0];

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
                Forums and Clubs
              </h1>
            </div>
            <Link
              href="/students-corner/gallery"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl text-sm font-bold transition-colors backdrop-blur-md shrink-0"
            >
              <ImageIcon size={18} /> View Gallery
            </Link>
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
              {clubsData.map((club) => (
                <button
                  key={club.id}
                  onClick={() => handleClubSelect(club.id)}
                  className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${
                    activeClubId === club.id
                      ? "bg-[#123B6D] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <club.icon
                    size={16}
                    className={activeClubId === club.id ? "text-blue-200" : "text-gray-400"}
                  />
                  <span className="truncate">{club.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeClub.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Club Header */}
              <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${activeClub.color} border`}>
                  <activeClub.icon size={36} strokeWidth={2} />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                      {activeClub.title}
                    </h2>
                    <Link
                      href={`/students-corner/gallery?department=${encodeURIComponent(activeClub.title)}`}
                      className="inline-flex items-center gap-2 bg-[#123B6D] hover:bg-[#123B6D]/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0"
                    >
                      <ImageIcon size={18} /> View Gallery
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {activeClub.instagram && (
                      <Link
                        href={activeClub.instagram}
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      >
                        <ExternalLink size={16} /> Instagram Page
                      </Link>
                    )}
                    {activeClub.contact && (
                      <Link
                        href={`mailto:${activeClub.contact}`}
                        className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      >
                        <Mail size={16} /> Contact Us
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Club Details */}
              <div className="p-8 md:p-10 space-y-10">
                {/* About */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Info size={20} />
                    About
                  </div>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    {activeClub.about}
                  </p>
                </section>

                {/* Committee */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Users2 size={20} />
                    Committee
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-700 leading-relaxed">
                    {activeClub.committee}
                  </div>
                </section>

                {/* Objectives & Activities */}
                <section>
                  <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                    <Target size={20} />
                    Objectives &amp; Activities
                  </div>
                  <ul className="space-y-3">
                    {activeClub.objectives.map((obj, i) => (
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
                    {activeClub.contactPersons.map((person, i) => (
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

// ─── Page export wrapped in Suspense (required for useSearchParams) ──────────
export default function ForumsAndClubsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      }
    >
      <ForumsAndClubsContent />
    </Suspense>
  );
}
