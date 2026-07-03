"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, Building2, Users, Star, Grid3x3 } from "lucide-react";
import Link from "next/link";

const academicYears = ["2025-2026", "2024-2025", "2023-2024", "2022-2023", "2021-2022"];

type Event = {
  id: number;
  name: string;
  shortName: string;
  day: string;
  month: string;
  year: string;
  description: string;
  image: string;
};

const eventsByYear: Record<string, Event[]> = {
  "2025-2026": [
    { id: 1, name: "Friendship Day", shortName: "Friendship Day", day: "04", month: "Aug 2025", year: "2025", description: "A celebration of friendship, unity, and memories shared across the campus.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Teacher's Day", shortName: "Teacher's Day", day: "05", month: "Sep 2025", year: "2025", description: "A tribute to the guidance, inspiration, and support of our beloved faculty.", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Social Cause Event – Spectrum x Leo Club", shortName: "Social Cause Event", day: "02", month: "Oct 2025", year: "2025", description: "MCC joins hands with Leo Club to create meaningful social impact.", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "शुभारंभ (Subharambh)", shortName: "Subharambh", day: "25", month: "Oct 2025", year: "2025", description: "The auspicious inauguration ceremony marking the start of our cultural journey.", image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "Pre-Theme Reveal Events", shortName: "Pre-Theme Reveal", day: "14", month: "Nov 2025", year: "2025", description: "Teaser events and mystery activities leading up to the grand theme reveal.", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "Theme Reveal – Reevan 2025", shortName: "Theme Reveal", day: "10", month: "Dec 2025", year: "2025", description: "The grand unveiling of Spectrum 2025's theme in a spectacular showcase.", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop" },
    { id: 7, name: "Induction Ceremony 2025", shortName: "Induction Ceremony", day: "26", month: "Jan 2026", year: "2026", description: "Welcoming the newest members of the MCC family with pride and promise.", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop" },
    { id: 8, name: "Spectrum Day 1", shortName: "Spectrum Day 1", day: "08", month: "Mar 2026", year: "2026", description: "The grand opener to Spectrum – a cultural extravaganza of talent and creativity.", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" },
    { id: 9, name: "Spectrum Day 2", shortName: "Spectrum Day 2", day: "09", month: "Mar 2026", year: "2026", description: "Day 2 brings electrifying performances, dance battles, and creative arts.", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop" },
    { id: 10, name: "Spectrum Day 3", shortName: "Spectrum Day 3", day: "10", month: "Mar 2026", year: "2026", description: "Inter-collegiate competitions and celebrity appearances take center stage.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop" },
    { id: 11, name: "Spectrum Day 4", shortName: "Spectrum Day 4", day: "11", month: "Mar 2026", year: "2026", description: "The grand finale – closing ceremony, prizes, and memories for a lifetime.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop" },
  ],
  "2024-2025": [
    { id: 1, name: "Friendship Day", shortName: "Friendship Day", day: "04", month: "Aug 2024", year: "2024", description: "A celebration of friendship, unity, and memories shared across the campus.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Teacher's Day", shortName: "Teacher's Day", day: "05", month: "Sep 2024", year: "2024", description: "A tribute to the guidance, inspiration, and support of our beloved faculty.", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Social Cause Event", shortName: "Social Cause Event", day: "12", month: "Oct 2024", year: "2024", description: "MCC joins hands with partner clubs to create meaningful social impact.", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "Spectrum Day 1", shortName: "Spectrum Day 1", day: "08", month: "Feb 2025", year: "2025", description: "The grand opener to Spectrum – a cultural extravaganza.", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "Spectrum Day 2", shortName: "Spectrum Day 2", day: "09", month: "Feb 2025", year: "2025", description: "Day 2 brings electrifying performances and creative arts.", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "Spectrum Day 3", shortName: "Spectrum Day 3", day: "10", month: "Feb 2025", year: "2025", description: "Inter-collegiate competitions take center stage.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop" },
    { id: 7, name: "Spectrum Day 4", shortName: "Spectrum Day 4", day: "11", month: "Feb 2025", year: "2025", description: "The grand finale – closing ceremony and prizes.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop" },
  ],
  "2023-2024": [
    { id: 1, name: "Friendship Day", shortName: "Friendship Day", day: "04", month: "Aug 2023", year: "2023", description: "A celebration of friendship, unity, and memories shared across the campus.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Teacher's Day", shortName: "Teacher's Day", day: "05", month: "Sep 2023", year: "2023", description: "A tribute to the guidance, inspiration, and support of our beloved faculty.", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Spectrum Day 1", shortName: "Spectrum Day 1", day: "15", month: "Mar 2024", year: "2024", description: "The grand opener to Spectrum – a cultural extravaganza.", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "Spectrum Day 2", shortName: "Spectrum Day 2", day: "16", month: "Mar 2024", year: "2024", description: "Day 2 brings electrifying performances and creative arts.", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "Spectrum Day 3", shortName: "Spectrum Day 3", day: "17", month: "Mar 2024", year: "2024", description: "Inter-collegiate competitions take center stage.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "Spectrum Day 4", shortName: "Spectrum Day 4", day: "18", month: "Mar 2024", year: "2024", description: "The grand finale – closing ceremony and prizes.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop" },
  ],
  "2022-2023": [
    { id: 1, name: "Friendship Day", shortName: "Friendship Day", day: "04", month: "Aug 2022", year: "2022", description: "A celebration of friendship, unity, and memories shared across the campus.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Teacher's Day", shortName: "Teacher's Day", day: "05", month: "Sep 2022", year: "2022", description: "A tribute to the guidance, inspiration, and support of our beloved faculty.", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Spectrum Day 1", shortName: "Spectrum Day 1", day: "20", month: "Mar 2023", year: "2023", description: "The grand opener to Spectrum – a cultural extravaganza.", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "Spectrum Day 2", shortName: "Spectrum Day 2", day: "21", month: "Mar 2023", year: "2023", description: "Day 2 brings electrifying performances and creative arts.", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "Spectrum Day 3", shortName: "Spectrum Day 3", day: "22", month: "Mar 2023", year: "2023", description: "Inter-collegiate competitions take center stage.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "Spectrum Day 4", shortName: "Spectrum Day 4", day: "23", month: "Mar 2023", year: "2023", description: "The grand finale – closing ceremony and prizes.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop" },
  ],
  "2021-2022": [
    { id: 1, name: "Friendship Day", shortName: "Friendship Day", day: "15", month: "Aug 2021", year: "2021", description: "A celebration of friendship, unity, and memories shared across the campus.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Teacher's Day", shortName: "Teacher's Day", day: "05", month: "Sep 2021", year: "2021", description: "A tribute to the guidance, inspiration, and support of our beloved faculty.", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Social Cause Event", shortName: "Social Cause Event", day: "02", month: "Oct 2021", year: "2021", description: "MCC joins hands with NGOs to create meaningful impact.", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "Diwali Celebration", shortName: "Diwali Celebration", day: "25", month: "Oct 2021", year: "2021", description: "Spreading joy, lights, and positivity with the MCC family.", image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "Photography Competition", shortName: "Photography Competition", day: "14", month: "Nov 2021", year: "2021", description: "Capturing moments, perspectives, and stories through the lens.", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "Talent Reveal – 2022", shortName: "Talent Reveal", day: "10", month: "Dec 2021", year: "2021", description: "A platform for students to showcase their extraordinary talents.", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop" },
    { id: 7, name: "Republic Day Celebration", shortName: "Republic Day", day: "26", month: "Jan 2022", year: "2022", description: "Honoring the spirit of our nation with pride and unity.", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop" },
    { id: 8, name: "Spectrum Day 1", shortName: "Spectrum Day 1", day: "08", month: "Mar 2022", year: "2022", description: "The grand opener to Spectrum – a cultural extravaganza.", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" },
  ],
};

const VISIBLE_INITIAL = 8;

export default function CulturalCommitteePage() {
  const [activeYear, setActiveYear] = useState("2025-2026");
  const [showAll, setShowAll] = useState(false);

  const events = eventsByYear[activeYear] || [];
  const visibleEvents = showAll ? events : events.slice(0, VISIBLE_INITIAL);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ===== HERO SECTION ===== */}
      <div className="relative h-[520px] md:h-[580px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop"
          alt="MCC Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B3E]/90 via-[#0D1B3E]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/60 via-transparent to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-8">

            {/* Left Text Block */}
            <div className="flex-1 text-white max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
                <Building2 size={13} className="text-blue-300" />
                MCC Cultural Committee
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-2">
                Where Culture
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-1">
                Comes Alive
              </h1>
              {/* Yellow accent line */}
              <div className="w-16 h-1.5 bg-yellow-400 rounded-full mt-3 mb-6"></div>

              <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-md mb-8">
                Celebrating creativity, talent, and the vibrant spirit of MCC Autonomous through unforgettable cultural events and initiatives.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Users, value: "11+", label: "Annual Events" },
                  { icon: Star, value: "5", label: "Student Groups" },
                  { icon: Building2, value: "1000+", label: "Students Engaged" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
                    <stat.icon size={20} className="text-blue-300 shrink-0" />
                    <div>
                      <div className="text-white font-black text-lg leading-none">{stat.value}</div>
                      <div className="text-white/60 text-[10px] font-medium leading-tight mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Academic Year Selector Card */}
            <div className="hidden md:block shrink-0">
              <div className="bg-white rounded-3xl shadow-2xl p-6 min-w-[200px]">
                <p className="text-[#123B6D] text-xs font-bold uppercase tracking-widest mb-4">Academic Year</p>
                <div className="flex flex-col gap-2">
                  {academicYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => { setActiveYear(year); setShowAll(false); }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        activeYear === year
                          ? "bg-[#123B6D] text-white shadow-md"
                          : "text-[#4A5568] border border-gray-200 hover:border-[#123B6D] hover:text-[#123B6D]"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== MOBILE YEAR SELECTOR ===== */}
      <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-20 shadow-sm">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {academicYears.map((year) => (
            <button
              key={year}
              onClick={() => { setActiveYear(year); setShowAll(false); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeYear === year ? "bg-[#123B6D] text-white shadow" : "bg-gray-100 text-gray-500"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* ===== CULTURAL ACTIVITIES SECTION ===== */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#123B6D] text-sm font-semibold mb-2">
              <Building2 size={16} className="text-[#123B6D]" />
              {activeYear} Academic Year
            </div>
            {/* Blue underline accent under heading */}
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E]">Cultural Activities</h2>
              <div className="w-16 h-1 bg-[#123B6D] rounded-full mt-2"></div>
            </div>
            <p className="text-gray-500 text-sm mt-3">Explore the vibrant legacy of events that defined our cultural year.</p>
          </div>
          <button className="self-start md:self-auto flex items-center gap-2 border border-[#E2E8F0] hover:border-[#123B6D] text-[#123B6D] px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            <Calendar size={16} /> View Calendar
          </button>
        </div>

        {/* ===== EVENT CARDS GRID ===== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {visibleEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.35 }}
                className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                {/* Image with date badge */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  {/* Date badge — top left */}
                  <div className="absolute top-3 left-3 bg-white rounded-xl px-3 py-2 shadow-md text-center min-w-[60px]">
                    <div className="text-[#123B6D] text-2xl font-black leading-none">{event.day}</div>
                    <div className="text-gray-400 text-[9px] font-semibold uppercase tracking-wide mt-0.5">{event.month}</div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-[#0D1B3E] font-black text-sm leading-snug mb-1.5 group-hover:text-[#123B6D] transition-colors">
                    {event.shortName}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      href="/cultural-committee"
                      className="text-[#123B6D] text-xs font-bold hover:underline flex items-center gap-1 group/link"
                    >
                      View Details <ChevronRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                    <button className="w-7 h-7 rounded-full border border-gray-200 hover:border-[#123B6D] hover:bg-[#123B6D] flex items-center justify-center group/btn transition-all">
                      <ChevronRight size={13} className="text-gray-400 group-hover/btn:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ===== VIEW ALL BUTTON ===== */}
        {events.length > VISIBLE_INITIAL && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 border border-gray-200 hover:border-[#123B6D] hover:text-[#123B6D] text-gray-600 px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Grid3x3 size={16} />
              {showAll ? "Show Less" : "View All Activities"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
