"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ExternalLink, Mail, Target,
  Users2, Info, ChevronRight, Phone, Image as ImageIcon, Loader2, Link as LinkIcon
} from "lucide-react";
import Link from "next/link";
import { useCachedStudentsCorner } from "@/hooks/useCachedSupabase";

interface CommitteeMember { name: string; role: string; phone: string; email: string; }
interface ObjectiveBlock { type: 'paragraph' | 'point'; content: string; }
interface ContactPerson { name: string; email: string; phone: string; }

interface PublicationItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: string;
  instagram_link?: string;
  magazine_link?: string;
  about?: string;
  banner_image?: string;
  committee?: CommitteeMember[];
  objectives_activities?: ObjectiveBlock[];
  contact_us?: ContactPerson[];
}

function StudentsPublicationsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeSlug, setActiveSlug] = useState<string>('');
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const { data = [], isLoading: loading } = useCachedStudentsCorner("Student's Publications");

  const visionPublication: PublicationItem = {
    id: 'vision-magazine',
    slug: 'vision',
    name: 'College Magazine (Vision)',
    category: "Student's Publications",
    status: 'Active',
    about: "Vision is the annual magazine of Mulund College of Commerce (Autonomous), bringing together a year of learning, achievement, creativity, and experiences from across the college. Beginning with the academic year 2025–26, it has been decided that Vision will be released every year on 15th August, marking the occasion with a publication that reflects the spirit and journey of the institution.\n\nThe name Vision represents the many opinions, views, and perspectives of our students, giving them a space to write, express, question, and learn. Alongside student contributions, the magazine presents a glimpse of the year's journey through reports of college events, departmental and committee activities, result analysis, and the achievements of students and teachers.\n\nMore than a record of the year, Vision is a platform that encourages young minds to find their voice, share their ideas, and see the world through different perspectives.",
    magazine_link: "https://drive.google.com/drive/folders/15q6lsDIdoitN6yP_S0B5GDbDK_kCtRWH"
  };

  const publications: PublicationItem[] = useMemo(() => {
    const fromDB = (data as PublicationItem[]).filter((c) => c.status === 'Active');
    const hasVision = fromDB.some((p) => p.slug === 'vision');
    return hasVision ? fromDB : [...fromDB, visionPublication];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (publications.length > 0 && !activeSlug) {
      const param = searchParams.get('publication');
      const initial = publications.find((c) => c.slug === param)?.slug ?? publications[0].slug;
      setActiveSlug(initial);
    }
  }, [publications, activeSlug, searchParams]);

  useEffect(() => {
    const param = searchParams.get('publication');
    if (param && publications.find(c => c.slug === param)) setActiveSlug(param);
  }, [searchParams, publications]);

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    setMobileDropdownOpen(false);
    router.push(`/students-corner/Students-Publications?publication=${slug}`, { scroll: false });
  };

  const active = publications.find(c => c.slug === activeSlug) ?? publications[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
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
              <h1 className="text-3xl md:text-5xl font-black text-white">Student&apos;s Publications</h1>
            </div>
            <Link href="/students-corner/gallery" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl text-sm font-bold transition-colors backdrop-blur-md shrink-0">
              <ImageIcon size={18} /> View Gallery
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32 text-gray-400">
          <Loader2 className="animate-spin mr-2" size={24} /> Loading publications...
        </div>
      ) : publications.length === 0 ? (
        <div className="flex items-center justify-center py-32 text-gray-400 text-sm">No active publications found.</div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-10 flex flex-col md:flex-row gap-8">
          
          {/* ── MOBILE: Dropdown selector ───────────────── */}
          <div className="md:hidden w-full relative z-30">
            {/* Trigger */}
            <button
              onClick={() => setMobileDropdownOpen((p) => !p)}
              className="w-full flex items-center justify-between bg-[#123B6D] text-white px-5 py-4 font-bold text-sm tracking-widest uppercase rounded-t-xl"
            >
              <span className="flex items-center gap-2 min-w-0">
                <BookOpen size={16} className="shrink-0 text-blue-200" />
                <span className="truncate">{active?.name ?? 'Select a Publication'}</span>
              </span>
              <motion.span
                animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 ml-3"
              >
                <ChevronRight size={18} className="rotate-90" />
              </motion.span>
            </button>

            {/* Dropdown panel */}
            <AnimatePresence initial={false}>
              {mobileDropdownOpen && (
                <motion.div
                  key="mobile-pub-dropdown"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="overflow-hidden absolute left-0 right-0 bg-white border border-[#E2E8F0] border-t-0 rounded-b-xl shadow-xl z-50"
                >
                  <div className="flex flex-col divide-y divide-[#F1F5F9] max-h-[55vh] overflow-y-auto">
                    {publications.map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => handleSelect(p.slug)}
                        className={`flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors text-left ${
                          activeSlug === p.slug
                            ? 'bg-[#EBF3FF] text-[#123B6D]'
                            : 'text-gray-700 hover:bg-[#F8FAFC] hover:text-[#123B6D]'
                        }`}
                      >
                        <BookOpen size={15} className={`shrink-0 ${activeSlug === p.slug ? 'text-[#123B6D]' : 'text-gray-400'}`} />
                        <span className="flex-1 text-left">{p.name}</span>
                        {activeSlug === p.slug && (
                          <ChevronRight size={14} className="text-[#123B6D] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom border when closed (makes it look like a card) */}
            {!mobileDropdownOpen && (
              <div className="h-1 bg-white border border-t-0 border-[#E2E8F0] rounded-b-xl" />
            )}
          </div>

          {/* ── DESKTOP: Sidebar ──────────────────────── */}
          <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">Publications</div>
              <div className="flex flex-col p-2 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {publications.map((p) => (
                  <button key={p.slug} onClick={() => handleSelect(p.slug)}
                    className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${
                      activeSlug === p.slug ? "bg-[#123B6D] text-white shadow-md" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}>
                    <BookOpen size={16} className={activeSlug === p.slug ? "text-blue-200" : "text-gray-400"} />
                    <span className="truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {active && (
            <div className="w-full md:w-2/3 lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div key={active.slug} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  {active.banner_image && (
                    <img src={active.banner_image} alt={active.name} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 bg-amber-100 text-amber-600 border border-amber-200">
                      <BookOpen size={36} strokeWidth={2} />
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900">{active.name}</h2>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-4">
                        {active.instagram_link && (
                          <Link href={active.instagram_link} target="_blank"
                            className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                            <ExternalLink size={16} /> Instagram Page
                          </Link>
                        )}
                        {active.magazine_link && (
                          <Link href={active.magazine_link} target="_blank"
                            className="inline-flex items-center gap-2 bg-[#123B6D]/10 hover:bg-[#123B6D]/20 text-[#123B6D] px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                            <LinkIcon size={16} /> View Our Magazine from 1970 to Up-to-date
                          </Link>
                        )}
                        {active.contact_us?.[0]?.email && (
                          <Link href={`mailto:${active.contact_us[0].email}`}
                            className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                            <Mail size={16} /> Contact Us
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:p-10 space-y-10">
                    {active.about && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Info size={20} /> About Vision</div>
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line">{active.about}</p>
                      </section>
                    )}
                    {active.committee && active.committee.length > 0 && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Users2 size={20} /> Committee</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {active.committee.map((m, i) => (
                            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                              <p className="font-bold text-gray-900 text-sm">{m.name}</p>
                              {m.role && <p className="text-xs text-[#123B6D] font-semibold mt-0.5">{m.role}</p>}
                              <div className="mt-2 space-y-1">
                                {m.phone && <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#123B6D]"><Phone size={11} />{m.phone}</a>}
                                {m.email && <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#123B6D]"><Mail size={11} />{m.email}</a>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                    {active.objectives_activities && active.objectives_activities.length > 0 && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Target size={20} /> Objectives &amp; Activities</div>
                        <div className="space-y-3">
                          {active.objectives_activities.map((block, i) =>
                            block.type === 'paragraph' ? (
                              <p key={i} className="text-gray-600 leading-relaxed">{block.content}</p>
                            ) : (
                              <div key={i} className="flex items-start gap-3 text-gray-600">
                                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5"><ChevronRight size={14} strokeWidth={3} /></div>
                                <span className="leading-relaxed">{block.content}</span>
                              </div>
                            )
                          )}
                        </div>
                      </section>
                    )}
                    {active.contact_us && active.contact_us.length > 0 && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Phone size={20} /> Contact Us</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {active.contact_us.map((p, i) => (
                            <div key={i} className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4">
                              <div className="w-10 h-10 rounded-full bg-[#123B6D]/10 flex items-center justify-center shrink-0"><Users2 size={18} className="text-[#123B6D]" /></div>
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                                {p.phone && <a href={`tel:${p.phone}`} className="text-[#123B6D] text-sm font-medium hover:underline flex items-center gap-1 mt-0.5"><Phone size={12} />{p.phone}</a>}
                                {p.email && <a href={`mailto:${p.email}`} className="text-gray-500 text-xs hover:underline flex items-center gap-1 mt-0.5"><Mail size={11} />{p.email}</a>}
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

export default function StudentsPublicationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><Loader2 className="animate-spin text-[#123B6D]" size={28} /></div>}>
      <StudentsPublicationsContent />
    </Suspense>
  );
}

