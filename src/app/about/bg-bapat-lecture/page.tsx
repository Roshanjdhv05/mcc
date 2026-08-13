import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, ChevronRight, Calendar, User, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'B.G. Bapat Memorial Lecture | About MCC | Mulund College of Commerce',
  description: 'The prestigious annual Dr. B.G. Bapat Memorial Lecture series at MCC — honouring the legacy of Dr. B.G. Bapat by bringing renowned experts and economists to inspire our community.',
};

const bapatEditions = [
  {
    edition: '6th',
    topic: "India's Growth Amidst Trump Turmoil",
    speaker: 'Dr. Ajit Ranade',
    speakerDesc: 'Former Vice Chancellor, Gokhale Institute of Politics and Economics; Ex-Group Executive President & Chief Economist, Aditya Birla Group',
    date: '11th March 2025',
    chair: 'Principal Dr. Sonali Pednekar & Vice Principal Dr. Shivaji Pawar',
    venue: 'MCC Campus',
    description:
      'The 6th Dr. B. G. Bapat Memorial Lecture on "India\'s Growth Amidst Trump Turmoil" was delivered by Dr. Ajit Ranade, former Vice Chancellor of Gokhale Institute of Politics and Economics and ex-Group Executive President and Chief Economist of Aditya Birla Group, on 11th March 2025. The lecture was chaired by Principal Dr. Sonali Pednekar and Vice Principal Dr. Shivaji Pawar. Dr. Ranade shared insightful perspectives on India\'s growth amidst global economic turmoil, providing a comprehensive overview of the challenges and opportunities facing the Indian economy.',
  },
];

const accent = '#D4A017';
const accentLight = '#FFFBEB';

export default function BgBapatLecturePage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative pt-14 pb-32" style={{ backgroundColor: '#1A1200' }}>
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
          <div
            className="inline-flex items-center gap-2 border text-xs font-bold mb-5 uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{ backgroundColor: accent + '25', borderColor: accent + '60', color: accent }}
          >
            <Star size={13} /> Special Lectures
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white font-[var(--font-heading)] mb-4 leading-tight">
            Dr. B.G. Bapat<br className="hidden md:block" /> Memorial Lecture
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            An annual lecture series honouring the legacy of Dr. B.G. Bapat — bringing eminent economists,
            policy makers, and thought leaders to foster intellectual dialogue and inspire our community.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-12 -mt-20 pb-24">

        {/* Series Card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden mb-10">
          <div className="px-8 py-6 flex items-center gap-4" style={{ backgroundColor: accent }}>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Star size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white font-[var(--font-heading)] uppercase tracking-wide">
                B.G. Bapat Memorial Lecture
              </h2>
              <p className="text-white/70 text-sm mt-0.5">Annual Lecture Series</p>
            </div>
          </div>

          {/* About the series */}
          <div className="p-8 md:p-10 border-b border-[#E2E8F0]">
            <p className="text-[#475569] leading-relaxed">
              The Dr. B.G. Bapat Memorial Lecture is a prestigious annual lecture series organised by Mulund College
              of Commerce to honour the memory of Dr. B.G. Bapat — an eminent scholar, economist, and educator whose
              contributions to commerce education in Maharashtra remain unparalleled. Each year, a distinguished
              personality is invited to share insights on contemporary economic, financial, or policy issues, carrying
              forward Dr. Bapat&apos;s vision of academic excellence and civic engagement.
            </p>
          </div>

          {/* Editions */}
          <div className="divide-y divide-[#E2E8F0]">
            {bapatEditions.map((edition) => (
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
                  style={{ backgroundColor: accentLight, borderColor: accent + '40' }}
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
            className="inline-flex items-center gap-2 font-semibold hover:underline text-sm"
            style={{ color: accent }}
          >
            <ChevronRight size={14} className="rotate-180" />
            View All Special Lectures
          </Link>
        </div>
      </div>
    </div>
  );
}
