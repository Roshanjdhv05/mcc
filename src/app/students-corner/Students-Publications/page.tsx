"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ExternalLink, Mail, Target,
  Users2, Info, ChevronRight, Phone, Image as ImageIcon, Loader2
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
  about?: string;
  banner_image?: string;
  committee?: CommitteeMember[];
  objectives_activities?: ObjectiveBlock[];
  contact_us?: ContactPerson[];
}

function StudentsPublicationsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState<string>('');

  useEffect(() => {
    const fetchPublications = async () => {
      const { data, error } = await supabase
        .from('mcc_students_corner')
        .select('*')
        .eq('category', "Student's Publications")
        .eq('status', 'Active')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        setPublications(data as PublicationItem[]);
        const param = searchParams.get('publication');
        const initial = data.find(c => c.slug === param) ? param! : data[0].slug;
        setActiveSlug(initial);
      }
      setLoading(false);
    };
    fetchPublications();
  }, []);

  useEffect(() => {
    const param = searchParams.get('publication');
    if (param && publications.find(c => c.slug === param)) setActiveSlug(param);
  }, [searchParams, publications]);

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
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
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
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
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Info size={20} /> About</div>
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
