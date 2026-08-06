"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ExternalLink, Mail, Target,
  Users2, Info, ChevronRight, Phone, Image as ImageIcon, Loader2
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ─── Types matching Supabase schema ─────────────────────────────────────────
interface CommitteeMember { name: string; role: string; phone: string; email: string; }
interface ObjectiveBlock { type: 'paragraph' | 'point'; content: string; }
interface ContactPerson { name: string; email: string; phone: string; }

interface ClubItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: string;
  instagram_link?: string;
  about?: string;
  banner_image?: string;
  committee?: CommitteeMember[];
  objectives_activities?: ObjectiveBlock[];
  contact_us?: ContactPerson[];
}

// ─── Inner component that uses useSearchParams ────────────────────────────────
function ForumsAndClubsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [clubs, setClubs] = useState<ClubItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState<string>('');

  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase
        .from('mcc_students_corner')
        .select('*')
        .eq('category', 'Forums and Clubs')
        .eq('status', 'Active')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        setClubs(data as ClubItem[]);
        const param = searchParams.get('club');
        const initial = data.find(c => c.slug === param) ? param! : data[0].slug;
        setActiveSlug(initial);
      }
      setLoading(false);
    };
    fetchClubs();
  }, []);

  useEffect(() => {
    const param = searchParams.get('club');
    if (param && clubs.find(c => c.slug === param)) {
      setActiveSlug(param);
    }
  }, [searchParams, clubs]);

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    router.push(`/students-corner/Forums-and-Clubs?club=${slug}`, { scroll: false });
  };

  const activeClub = clubs.find(c => c.slug === activeSlug) ?? clubs[0];

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

      {loading ? (
        <div className="flex items-center justify-center py-32 text-gray-400">
          <Loader2 className="animate-spin mr-2" size={24} /> Loading clubs...
        </div>
      ) : clubs.length === 0 ? (
        <div className="flex items-center justify-center py-32 text-gray-400 text-sm">No active forums or clubs found.</div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row gap-8">
          {/* SIDEBAR */}
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">
                Forums &amp; Clubs
              </div>
              <div className="flex flex-col p-2 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {clubs.map((club) => (
                  <button
                    key={club.slug}
                    onClick={() => handleSelect(club.slug)}
                    className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${
                      activeSlug === club.slug
                        ? "bg-[#123B6D] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Users size={16} className={activeSlug === club.slug ? "text-blue-200" : "text-gray-400"} />
                    <span className="truncate">{club.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          {activeClub && (
            <div className="w-full md:w-2/3 lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClub.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Banner */}
                  {activeClub.banner_image && (
                    <img src={activeClub.banner_image} alt={activeClub.name} className="w-full h-48 object-cover" />
                  )}

                  {/* Club Header */}
                  <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 bg-blue-100 text-blue-600 border border-blue-200">
                      <Users size={36} strokeWidth={2} />
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                          {activeClub.name}
                        </h2>
                        <Link
                          href={`/students-corner/gallery?department=${encodeURIComponent(activeClub.name)}`}
                          className="inline-flex items-center gap-2 bg-[#123B6D] hover:bg-[#123B6D]/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0"
                        >
                          <ImageIcon size={18} /> View Gallery
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-4">
                        {activeClub.instagram_link && (
                          <Link
                            href={activeClub.instagram_link}
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                          >
                            <ExternalLink size={16} /> Instagram Page
                          </Link>
                        )}
                        {activeClub.contact_us && activeClub.contact_us[0]?.email && (
                          <Link
                            href={`mailto:${activeClub.contact_us[0].email}`}
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
                    {activeClub.about && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                          <Info size={20} /> About
                        </div>
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
                          {activeClub.about}
                        </p>
                      </section>
                    )}

                    {/* Committee */}
                    {activeClub.committee && activeClub.committee.length > 0 && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                          <Users2 size={20} /> Committee
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {activeClub.committee.map((member, i) => (
                            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                              <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                              {member.role && <p className="text-xs text-[#123B6D] font-semibold mt-0.5">{member.role}</p>}
                              <div className="mt-2 space-y-1">
                                {member.phone && (
                                  <a href={`tel:${member.phone}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#123B6D]">
                                    <Phone size={11} /> {member.phone}
                                  </a>
                                )}
                                {member.email && (
                                  <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#123B6D]">
                                    <Mail size={11} /> {member.email}
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Objectives & Activities */}
                    {activeClub.objectives_activities && activeClub.objectives_activities.length > 0 && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                          <Target size={20} /> Objectives &amp; Activities
                        </div>
                        <div className="space-y-3">
                          {activeClub.objectives_activities.map((block, i) =>
                            block.type === 'paragraph' ? (
                              <p key={i} className="text-gray-600 leading-relaxed">{block.content}</p>
                            ) : (
                              <div key={i} className="flex items-start gap-3 text-gray-600">
                                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                                  <ChevronRight size={14} strokeWidth={3} />
                                </div>
                                <span className="leading-relaxed">{block.content}</span>
                              </div>
                            )
                          )}
                        </div>
                      </section>
                    )}

                    {/* Contact Us */}
                    {activeClub.contact_us && activeClub.contact_us.length > 0 && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                          <Phone size={20} /> Contact Us
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {activeClub.contact_us.map((person, i) => (
                            <div key={i} className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4">
                              <div className="w-10 h-10 rounded-full bg-[#123B6D]/10 flex items-center justify-center shrink-0">
                                <Users2 size={18} className="text-[#123B6D]" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{person.name}</p>
                                {person.phone && (
                                  <a href={`tel:${person.phone}`} className="text-[#123B6D] text-sm font-medium hover:underline flex items-center gap-1 mt-0.5">
                                    <Phone size={12} /> {person.phone}
                                  </a>
                                )}
                                {person.email && (
                                  <a href={`mailto:${person.email}`} className="text-gray-500 text-xs hover:underline flex items-center gap-1 mt-0.5">
                                    <Mail size={11} /> {person.email}
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Page export wrapped in Suspense (required for useSearchParams) ──────────
export default function ForumsAndClubsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <Loader2 className="animate-spin text-[#123B6D]" size={28} />
        </div>
      }
    >
      <ForumsAndClubsContent />
    </Suspense>
  );
}
