import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, ChevronRight, Calendar, User, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tilak Smruti Vyakhyan | About MCC | Mulund College of Commerce',
  description: 'The prestigious annual Tilak Smruti Vyakhyan lecture series at MCC — honouring the legacy of Lokmanya Bal Gangadhar Tilak by bringing renowned scholars and experts to inspire our community.',
};

const tilakEditions = [
  {
    edition: '6th',
    topic: 'Mobilising People to Impact Public Health',
    speaker: 'Padma Shri Dr. Raman Gangakhedkar',
    speakerDesc: 'Renowned public health expert and epidemiologist; former Head of Epidemiology and Communicable Diseases at the Indian Council of Medical Research (ICMR)',
    date: 'Saturday, 27th July 2024',
    chair: 'Principal Dr. Sonali Pednekar',
    venue: 'MCC Auditorium',
    description:
      'The 6th Tilak Smruti Vyakhyan on \'Mobilising People to Impact Public Health\' was delivered by Padma Shri Dr. Raman Gangakhedkar, a renowned public health expert and epidemiologist, on Saturday, 27th July 2024. The lecture was chaired by Principal Dr. Sonali Pednekar. Dr. Gangakhedkar, former Head of Epidemiology and Communicable Diseases at the Indian Council of Medical Research, shared his expertise on mobilising people to impact public health. The event, held at the auditorium, brought together individuals passionate about creating positive change in society, echoing the ideals and principles of Lokmanya Bal Gangadhar Tilak.',
  },
];

const accent = '#123B6D';
const accentLight = '#EEF4FF';

export default function TilakLecturePage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative bg-[#123B6D] pt-14 pb-32">
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
          <h1 className="text-4xl md:text-5xl font-black text-white font-[var(--font-heading)] mb-4 leading-tight">
            Tilak Smruti<br className="hidden md:block" /> Vyakhyan
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            An annual lecture series honouring the legacy of Lokmanya Bal Gangadhar Tilak — bringing
            renowned scholars and experts to inspire our community and ignite public discourse.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-12 -mt-20 pb-24">

        {/* About the Series */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden mb-10">
          <div className="px-8 py-6 flex items-center gap-4" style={{ backgroundColor: accent }}>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Star size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white font-[var(--font-heading)] uppercase tracking-wide">
                Tilak Smruti Vyakhyan
              </h2>
              <p className="text-white/70 text-sm mt-0.5">Annual Lecture Series</p>
            </div>
          </div>
          <div className="p-8 md:p-10 border-b border-[#E2E8F0]">
            <p className="text-[#475569] leading-relaxed">
              The Tilak Smruti Vyakhyan is a prestigious annual lecture series organised by Mulund College of Commerce
              in honour of Lokmanya Bal Gangadhar Tilak — patriot, social reformer, and champion of education. Each
              year, a distinguished scholar, expert, or public figure is invited to deliver an address on a subject of
              contemporary relevance, keeping alive the spirit of intellectual enquiry and civic engagement that Tilak
              embodied.
            </p>
          </div>

          {/* Editions */}
          <div className="divide-y divide-[#E2E8F0]">
            {tilakEditions.map((edition) => (
              <div key={edition.edition} className="p-8 md:p-10">
                {/* Edition badge */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ backgroundColor: accentLight, color: accent }}
                  >
                    {edition.edition} Edition
                  </span>
                </div>

                <h3
                  className="text-xl md:text-2xl font-bold mb-1 leading-snug"
                  style={{ color: accent }}
                >
                  &ldquo;{edition.topic}&rdquo;
                </h3>

                {/* Meta row */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#64748B] mt-4 mb-6 font-medium">
                  <span className="flex items-center gap-1.5">
                    <User size={14} className="flex-shrink-0" style={{ color: accent }} />
                    {edition.speaker}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="flex-shrink-0" style={{ color: accent }} />
                    {edition.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="flex-shrink-0" style={{ color: accent }} />
                    {edition.venue}
                  </span>
                </div>

                {/* Speaker info card */}
                <div
                  className="rounded-2xl p-5 mb-6 border"
                  style={{ backgroundColor: accentLight, borderColor: accent + '30' }}
                >
                  <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: accent }}>
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

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/about/special-lectures"
            className="inline-flex items-center gap-2 text-[#123B6D] font-semibold hover:underline text-sm"
          >
            <ChevronRight size={14} className="rotate-180" />
            View All Special Lectures
          </Link>
        </div>
      </div>
    </div>
  );
}
