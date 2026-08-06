"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Users, Scale, Heart, Briefcase, BookOpen, FileText,
  Users2, Info, ChevronRight, Phone, Mail, Target, ExternalLink,
  Link as LinkIcon, Brain, ShieldCheck, MessageCircleWarning,
  BookMarked, AlertCircle, Loader2,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ─── Types matching Supabase schema ───────────────────────────────────────────
interface CommitteeMember {
  name: string;
  role: string;
  phone: string;
  email: string;
}

interface ObjectiveBlock {
  type: "paragraph" | "point";
  content: string;
}

interface ImportantDocument {
  title: string;
  pdf_url: string;
}

interface ContactPerson {
  name: string;
  email: string;
  phone: string;
}

interface StatutoryBody {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  cell_type: string;
  status: string;
  display_order: number;
  about: string | null;
  instagram_link: string | null;
  banner_image: string | null;
  committee: CommitteeMember[];
  objectives: ObjectiveBlock[];
  important_documents: ImportantDocument[];
  contact_us: ContactPerson[];
}

// ─── Slug → icon/color map ─────────────────────────────────────────────────
const SLUG_META: Record<string, { icon: React.ElementType; color: string }> = {
  "grievance-cell":               { icon: Scale,                color: "bg-red-100 text-red-600 border-red-200" },
  "internal-complaint-committee": { icon: MessageCircleWarning, color: "bg-purple-100 text-purple-600 border-purple-200" },
  "anti-ragging-committee":       { icon: ShieldCheck,          color: "bg-blue-100 text-blue-600 border-blue-200" },
  "counselling-cell":             { icon: Brain,                color: "bg-pink-100 text-pink-600 border-pink-200" },
  "career-katta":                 { icon: Briefcase,            color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
  "special-cell":                 { icon: Users,                color: "bg-orange-100 text-orange-600 border-orange-200" },
  "remedial-coaching-cell":       { icon: BookMarked,           color: "bg-teal-100 text-teal-600 border-teal-200" },
};
const DEFAULT_META = { icon: Shield, color: "bg-gray-100 text-gray-600 border-gray-200" };

function getMeta(slug: string) {
  return SLUG_META[slug] ?? DEFAULT_META;
}

// ─── Loading skeleton ──────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0D1B3E] pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-6 w-24 bg-white/10 rounded-full mb-4 animate-pulse" />
          <div className="h-12 w-64 bg-white/10 rounded-xl animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex gap-8">
        <div className="w-1/4 space-y-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 p-10 space-y-6">
          <div className="h-10 w-1/2 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ─── Main content ──────────────────────────────────────────────────────────
function StatutoryBodiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [bodies, setBodies] = useState<StatutoryBody[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string>("");

  // Fetch from Supabase
  useEffect(() => {
    async function fetchBodies() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from("mcc_statutory_bodies")
        .select("*")
        .eq("status", "Active")
        .order("display_order", { ascending: true });

      if (err) {
        setError(err.message);
      } else if (data && data.length > 0) {
        setBodies(data as StatutoryBody[]);
        const param = searchParams.get("body");
        const found = param && data.find((b: StatutoryBody) => b.slug === param);
        setActiveSlug(found ? param! : data[0].slug);
      }
      setLoading(false);
    }
    fetchBodies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync active from URL changes
  useEffect(() => {
    const param = searchParams.get("body");
    if (param && bodies.find((b) => b.slug === param)) {
      setActiveSlug(param);
    }
  }, [searchParams, bodies]);

  const handleBodySelect = (slug: string) => {
    setActiveSlug(slug);
    router.push(`/statutory-bodies?body=${slug}`, { scroll: false });
  };

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-sm font-semibold">
          <AlertCircle size={18} /> Failed to load: {error}
        </div>
      </div>
    );
  }

  if (bodies.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-gray-400 text-sm">No statutory bodies found.</p>
      </div>
    );
  }

  const activeBody = bodies.find((b) => b.slug === activeSlug) ?? bodies[0];
  const { icon: ActiveIcon, color: activeColor } = getMeta(activeBody.slug);

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
              {bodies.map((body) => {
                const { icon: Icon } = getMeta(body.slug);
                return (
                  <button
                    key={body.slug}
                    onClick={() => handleBodySelect(body.slug)}
                    className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${
                      activeSlug === body.slug
                        ? "bg-[#123B6D] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={activeSlug === body.slug ? "text-blue-200" : "text-gray-400"}
                    />
                    <span className="truncate">{body.name}</span>
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
              key={activeBody.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Banner image */}
              {activeBody.banner_image && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={activeBody.banner_image}
                    alt={activeBody.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Header */}
              <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 border ${activeColor}`}>
                  <ActiveIcon size={36} strokeWidth={2} />
                </div>
                <div className="flex-1 w-full">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                    {activeBody.title || activeBody.name}
                  </h2>
                  <span className="inline-block mt-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {activeBody.cell_type}
                  </span>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {activeBody.contact_us?.[0]?.email && (
                      <Link
                        href={`mailto:${activeBody.contact_us[0].email}`}
                        className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      >
                        <Mail size={16} /> Contact Email
                      </Link>
                    )}
                    {activeBody.instagram_link && (
                      <a
                        href={activeBody.instagram_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      >
                        <LinkIcon size={16} /> Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-8 md:p-10 space-y-10">

                {/* About */}
                {activeBody.about && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                      <Info size={20} /> About
                    </div>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
                      {activeBody.about}
                    </p>
                  </section>
                )}

                {/* Committee */}
                {activeBody.committee && activeBody.committee.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                      <Users2 size={20} /> Committee Members
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeBody.committee.map((m, i) => (
                        <div key={i} className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4">
                          <div className="w-10 h-10 rounded-full bg-[#123B6D]/10 flex items-center justify-center shrink-0">
                            <Users2 size={18} className="text-[#123B6D]" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 text-sm">{m.name}</p>
                            <p className="text-xs text-[#123B6D] font-semibold mt-0.5">{m.role}</p>
                            {m.phone && (
                              <a href={`tel:${m.phone}`} className="text-gray-500 text-xs hover:text-[#123B6D] flex items-center gap-1 mt-1">
                                <Phone size={10} /> {m.phone}
                              </a>
                            )}
                            {m.email && (
                              <a href={`mailto:${m.email}`} className="text-gray-500 text-xs hover:text-[#123B6D] flex items-center gap-1 mt-0.5">
                                <Mail size={10} /> {m.email}
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Objectives */}
                {activeBody.objectives && activeBody.objectives.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                      <Target size={20} /> Objectives
                    </div>
                    <div className="space-y-3">
                      {activeBody.objectives.map((obj, i) =>
                        obj.type === "point" ? (
                          <div key={i} className="flex items-start gap-3 text-gray-600">
                            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                              <ChevronRight size={14} strokeWidth={3} />
                            </div>
                            <span className="leading-relaxed">{obj.content}</span>
                          </div>
                        ) : (
                          <p key={i} className="text-gray-600 leading-relaxed whitespace-pre-line pl-3 border-l-2 border-[#123B6D]/20">
                            {obj.content}
                          </p>
                        )
                      )}
                    </div>
                  </section>
                )}

                {/* Important Documents */}
                {activeBody.important_documents && activeBody.important_documents.filter(d => d.title).length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                      <FileText size={20} /> Important Documents
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeBody.important_documents.filter(d => d.title).map((doc, i) => (
                        <a
                          key={i}
                          href={doc.pdf_url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between bg-white border border-gray-200 hover:border-[#123B6D] hover:shadow-md transition-all rounded-xl p-4 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                              <FileText size={20} />
                            </div>
                            <span className="font-semibold text-gray-800 text-sm group-hover:text-[#123B6D] transition-colors">
                              {doc.title}
                            </span>
                          </div>
                          <ExternalLink size={16} className="text-gray-400 group-hover:text-[#123B6D] transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {/* Contact Us */}
                {activeBody.contact_us && activeBody.contact_us.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4">
                      <Phone size={20} /> Contact Us
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeBody.contact_us.map((person, i) => (
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
                              <a href={`mailto:${person.email}`} className="text-gray-500 text-xs hover:text-[#123B6D] flex items-center gap-1 mt-0.5">
                                <Mail size={12} /> {person.email}
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
      </div>
    </div>
  );
}

export default function StatutoryBodiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <Loader2 className="animate-spin text-[#123B6D]" size={32} />
        </div>
      }
    >
      <StatutoryBodiesContent />
    </Suspense>
  );
}
