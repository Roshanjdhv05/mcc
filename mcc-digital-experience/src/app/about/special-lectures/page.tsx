import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, ChevronRight, Calendar, User, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Special Lectures | About MCC | Mulund College of Commerce',
  description: 'Prestigious annual lecture series at MCC — Tilak Smruti Vyakhyan and B.G. Bapat Memorial Lecture.',
};

const lectures = [
  {
    seriesTitle: 'Tilak Smruti Vyakhyan',
    accent: '#123B6D',
    accentLight: '#EEF4FF',
    editions: [
      {
        edition: '6th',
        topic: 'Mobilising People to Impact Public Health',
        speaker: 'Padma Shri Dr. Raman Gangakhedkar',
        speakerDesc: 'Renowned public health expert and epidemiologist; former Head of Epidemiology and Communicable Diseases, Indian Council of Medical Research (ICMR)',
        date: 'Saturday, 27th July 2024',
        chair: 'Principal Dr. Sonali Pednekar',
        venue: 'MCC Auditorium',
        description:
          'The 6th Tilak Smruti Vyakhyan was delivered by Padma Shri Dr. Raman Gangakhedkar on the theme of "Mobilising People to Impact Public Health." Dr. Gangakhedkar shared his wide-ranging expertise on community engagement and public health initiatives. The event brought together individuals passionate about creating positive change in society, echoing the ideals and principles of Lokmanya Bal Gangadhar Tilak.',
      },
    ],
  },
  {
    seriesTitle: 'B.G. Bapat Memorial Lecture',
    accent: '#D4A017',
    accentLight: '#FFFBEB',
    editions: [
      {
        edition: '6th',
        topic: "India's Growth Amidst Trump Turmoil",
        speaker: 'Dr. Ajit Ranade',
        speakerDesc: 'Former Vice Chancellor, Gokhale Institute of Politics and Economics; Ex-Group Executive President & Chief Economist, Aditya Birla Group',
        date: '11th March 2025',
        chair: 'Principal Dr. Sonali Pednekar & Vice Principal Dr. Shivaji Pawar',
        venue: 'MCC Campus',
        description:
          'The 6th Dr. B. G. Bapat Memorial Lecture featured Dr. Ajit Ranade, who delivered insightful perspectives on India\'s economic growth amidst global turmoil. He provided a comprehensive overview of the challenges and opportunities facing the Indian economy in the context of shifting global trade dynamics, offering a balanced and expert analysis of India\'s macroeconomic trajectory.',
      },
    ],
  },
];

export default function SpecialLecturesPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative bg-[#123B6D] pt-10 pb-20">
        <div className="absolute inset-0 opacity-10">
          <img src="/college_campus_hero.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 md:px-12">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ChevronRight size={14} className="rotate-180" /> About MCC
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-5 uppercase tracking-widest">
            <Star size={13} /> Special Lectures
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white font-[var(--font-heading)] mb-2 leading-tight">
            Annual Memorial<br className="hidden md:block" /> Lecture Series
          </h1>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-12 -mt-20 pb-24 space-y-14">
        {lectures.map((series) => (
          <div key={series.seriesTitle}>
            {/* Series Header */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden">
              <div
                className="px-8 py-6 flex items-center gap-4"
                style={{ backgroundColor: series.accent }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Star size={22} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-white font-[var(--font-heading)] uppercase tracking-wide">
                    {series.seriesTitle}
                  </h2>
                  <p className="text-white/70 text-sm mt-0.5">Annual Lecture Series</p>
                </div>
              </div>

              {/* Editions */}
              <div className="divide-y divide-[#E2E8F0]">
                {series.editions.map((edition) => (
                  <div key={edition.edition} className="p-8 md:p-10">
                    {/* Edition badge + topic */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{ backgroundColor: series.accentLight, color: series.accent }}
                      >
                        {edition.edition} Edition
                      </span>
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-bold mb-1 leading-snug"
                      style={{ color: series.accent }}
                    >
                      &ldquo;{edition.topic}&rdquo;
                    </h3>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#64748B] mt-4 mb-6 font-medium">
                      <span className="flex items-center gap-1.5">
                        <User size={14} className="flex-shrink-0" style={{ color: series.accent }} />
                        {edition.speaker}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="flex-shrink-0" style={{ color: series.accent }} />
                        {edition.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="flex-shrink-0" style={{ color: series.accent }} />
                        {edition.venue}
                      </span>
                    </div>

                    {/* Speaker info card */}
                    <div
                      className="rounded-2xl p-5 mb-6 border"
                      style={{ backgroundColor: series.accentLight, borderColor: series.accent + '30' }}
                    >
                      <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: series.accent }}>
                        About the Speaker
                      </p>
                      <p className="font-bold text-[#1E293B] text-sm">{edition.speaker}</p>
                      <p className="text-[#64748B] text-sm mt-1">{edition.speakerDesc}</p>
                    </div>

                    {/* Description */}
                    <p className="text-[#475569] leading-relaxed">{edition.description}</p>

                    {/* Chair */}
                    <div className="mt-6 pt-5 border-t border-[#E2E8F0]">
                      <p className="text-xs text-[#94A3B8] font-semibold uppercase tracking-widest">
                        Chaired by
                      </p>
                      <p className="text-[#1E293B] font-semibold text-sm mt-1">{edition.chair}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
