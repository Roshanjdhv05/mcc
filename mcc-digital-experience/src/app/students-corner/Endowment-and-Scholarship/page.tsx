"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award, ExternalLink, Mail, Info,
  Users2, ChevronRight, Phone, Loader2,
  GraduationCap, BookOpen
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface ScholarshipItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: string;
  about?: string;
  banner_image?: string;
  link?: string;
  eligibility?: string;
  how_to_apply?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  display_order?: number;
}

const STATIC_SCHOLARSHIPS: ScholarshipItem[] = [
  {
    id: 'ad-oak',
    slug: 'ad-oak-scholarship',
    name: 'A.D Oak Scholarship',
    category: 'Endowment and Scholarship',
    status: 'Active',
    about:
      "The A.D Oak Scholarship is an endowment scholarship instituted in memory of a distinguished alumnus/benefactor of Mulund College of Commerce. It is awarded annually to meritorious students who have demonstrated academic excellence and financial need. This scholarship honours the legacy of A.D Oak by enabling deserving students to pursue higher education without financial barriers.\n\nThe scholarship aims to encourage students to strive for excellence and recognizes their hard work and dedication to their studies.",
    eligibility:
      "• Students enrolled in UG or PG programmes at Mulund College of Commerce.\n• Minimum 60% marks in the previous academic year.\n• Preference given to students from economically weaker sections.",
    how_to_apply:
      "Students must submit an application form along with the required documents (marksheets, income certificate, etc.) to the College Office during the application window announced at the start of each academic year.",
  },
  {
    id: 'endowment-prizes',
    slug: 'endowment-prizes',
    name: 'Endowment Prizes',
    category: 'Endowment and Scholarship',
    status: 'Active',
    about:
      "Mulund College of Commerce offers a range of Endowment Prizes instituted by generous donors, alumni, and well-wishers of the institution. These prizes are awarded to students who excel in academics, extra-curricular activities, sports, and social initiatives.\n\nEndowment prizes are a long-standing tradition at MCC, recognizing and rewarding students who bring honour to the institution through their achievements. These prizes serve as a motivation for students to perform to the best of their abilities.",
    eligibility:
      "• Open to all students of Mulund College of Commerce.\n• Specific eligibility criteria vary by individual endowment prize.\n• Prizes are awarded at the Annual Prize Distribution ceremony.",
    how_to_apply:
      "Selection for Endowment Prizes is done by the college committee based on academic records and achievements. No separate application is required for most prizes. Students excelling in their respective fields are automatically considered.",
  },
  {
    id: 'government-scholarship',
    slug: 'government-scholarship',
    name: 'Government Scholarship',
    category: 'Endowment and Scholarship',
    status: 'Active',
    about:
      "The Government of Maharashtra offers several scholarship schemes to support students from various categories including SC, ST, OBC, SBC, VJNT, Minority communities, and economically weaker sections. Mulund College of Commerce actively assists students in availing themselves of these government scholarship schemes.\n\nScholarships are processed through the MahaDBT (Maharashtra Direct Benefit Transfer) portal and the State Scholarship Portal. The College Scholarship Cell provides guidance and assistance to students for their scholarship applications.",
    eligibility:
      "• Must be an Indian citizen and a resident of Maharashtra.\n• Must belong to SC / ST / OBC / SBC / VJNT / Minority / EWS category as applicable.\n• Must be admitted to a recognised college and pursuing a government-approved course.\n• Income and caste certificates from competent authority are mandatory.",
    how_to_apply:
      "Applications are submitted online through the MahaDBT portal (mahadbt.maharashtra.gov.in) or the State Scholarship Portal (scholarships.gov.in). The College Scholarship Cell assists students with document verification and online submission. Students must apply within the deadlines announced each academic year.",
    link: "https://mahadbt.maharashtra.gov.in",
  },
];

function EndowmentScholarshipContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeSlug, setActiveSlug] = useState<string>('');
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [dbItems, setDbItems] = useState<ScholarshipItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from('endowment_scholarships')
          .select('*')
          .eq('status', 'Active')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          setDbItems(data);
        }
      } catch (_) {
        // fallback to static data
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const scholarships: ScholarshipItem[] = useMemo(() => {
    if (dbItems.length > 0) return dbItems;
    return STATIC_SCHOLARSHIPS;
  }, [dbItems]);

  useEffect(() => {
    if (scholarships.length > 0 && !activeSlug) {
      const param = searchParams.get('scholarship');
      const initial = scholarships.find((c) => c.slug === param)?.slug ?? scholarships[0].slug;
      setActiveSlug(initial);
    }
  }, [scholarships, activeSlug, searchParams]);

  useEffect(() => {
    const param = searchParams.get('scholarship');
    if (param && scholarships.find(c => c.slug === param)) setActiveSlug(param);
  }, [searchParams, scholarships]);

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    setMobileDropdownOpen(false);
    router.push(`/students-corner/Endowment-and-Scholarship?scholarship=${slug}`, { scroll: false });
  };

  const active = scholarships.find(c => c.slug === activeSlug) ?? scholarships[0];

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
              <h1 className="text-3xl md:text-5xl font-black text-white">Endowment &amp; Scholarship</h1>
              <p className="text-white/60 text-sm mt-2">Supporting student excellence through financial recognition and awards.</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32 text-gray-400">
          <Loader2 className="animate-spin mr-2" size={24} /> Loading...
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-10 flex flex-col md:flex-row gap-8">

          {/* Mobile Dropdown */}
          <div className="md:hidden w-full relative z-30">
            <button
              onClick={() => setMobileDropdownOpen((p) => !p)}
              className="w-full flex items-center justify-between bg-[#123B6D] text-white px-5 py-4 font-bold text-sm tracking-widest uppercase rounded-t-xl"
            >
              <span className="flex items-center gap-2 min-w-0">
                <Award size={16} className="shrink-0 text-blue-200" />
                <span className="truncate">{active?.name ?? 'Select'}</span>
              </span>
              <motion.span animate={{ rotate: mobileDropdownOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 ml-3">
                <ChevronRight size={18} className="rotate-90" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {mobileDropdownOpen && (
                <motion.div key="dropdown" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                  className="overflow-hidden absolute left-0 right-0 bg-white border border-[#E2E8F0] border-t-0 rounded-b-xl shadow-xl z-50">
                  <div className="flex flex-col divide-y divide-[#F1F5F9] max-h-[55vh] overflow-y-auto">
                    {scholarships.map((s) => (
                      <button key={s.slug} onClick={() => handleSelect(s.slug)}
                        className={`flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-left ${activeSlug === s.slug ? 'bg-[#EBF3FF] text-[#123B6D]' : 'text-gray-700 hover:bg-[#F8FAFC]'}`}>
                        <Award size={15} className={`shrink-0 ${activeSlug === s.slug ? 'text-[#123B6D]' : 'text-gray-400'}`} />
                        <span className="flex-1">{s.name}</span>
                        {activeSlug === s.slug && <ChevronRight size={14} className="text-[#123B6D] shrink-0" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!mobileDropdownOpen && <div className="h-1 bg-white border border-t-0 border-[#E2E8F0] rounded-b-xl" />}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm uppercase tracking-wide">Scholarships &amp; Prizes</div>
              <div className="flex flex-col p-2 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                {scholarships.map((s) => (
                  <button key={s.slug} onClick={() => handleSelect(s.slug)}
                    className={`text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm ${activeSlug === s.slug ? "bg-[#123B6D] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
                    <Award size={16} className={activeSlug === s.slug ? "text-blue-200" : "text-gray-400"} />
                    <span className="truncate">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          {active && (
            <div className="w-full md:w-2/3 lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div key={active.slug} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  {active.banner_image && <img src={active.banner_image} alt={active.name} className="w-full h-48 object-cover" />}
                  <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 bg-amber-100 text-amber-600 border border-amber-200">
                      <Award size={36} strokeWidth={2} />
                    </div>
                    <div className="flex-1 w-full">
                      <h2 className="text-3xl md:text-4xl font-black text-gray-900">{active.name}</h2>
                      <div className="flex flex-wrap gap-3 mt-4">
                        {active.link && (
                          <Link href={active.link} target="_blank"
                            className="inline-flex items-center gap-2 bg-[#123B6D]/10 hover:bg-[#123B6D]/20 text-[#123B6D] px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                            <ExternalLink size={16} /> Apply / Visit Portal
                          </Link>
                        )}
                        {active.contact_email && (
                          <Link href={`mailto:${active.contact_email}`}
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
                        <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">{active.about}</p>
                      </section>
                    )}
                    {active.eligibility && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><GraduationCap size={20} /> Eligibility Criteria</div>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{active.eligibility}</p>
                      </section>
                    )}
                    {active.how_to_apply && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><BookOpen size={20} /> How to Apply</div>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{active.how_to_apply}</p>
                      </section>
                    )}
                    {(active.contact_name || active.contact_email || active.contact_phone) && (
                      <section>
                        <div className="flex items-center gap-2 text-[#123B6D] font-bold text-lg mb-4"><Phone size={20} /> Contact</div>
                        <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 max-w-sm">
                          <div className="w-10 h-10 rounded-full bg-[#123B6D]/10 flex items-center justify-center shrink-0"><Users2 size={18} className="text-[#123B6D]" /></div>
                          <div>
                            {active.contact_name && <p className="font-bold text-gray-900 text-sm">{active.contact_name}</p>}
                            {active.contact_phone && <a href={`tel:${active.contact_phone}`} className="text-[#123B6D] text-sm font-medium hover:underline flex items-center gap-1 mt-0.5"><Phone size={12} />{active.contact_phone}</a>}
                            {active.contact_email && <a href={`mailto:${active.contact_email}`} className="text-gray-500 text-xs hover:underline flex items-center gap-1 mt-0.5"><Mail size={11} />{active.contact_email}</a>}
                          </div>
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

export default function EndowmentScholarshipPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><Loader2 className="animate-spin text-[#123B6D]" size={28} /></div>}>
      <EndowmentScholarshipContent />
    </Suspense>
  );
}
