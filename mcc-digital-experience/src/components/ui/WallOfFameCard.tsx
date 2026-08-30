import React from 'react';
import { Activity, Calendar } from 'lucide-react';

export interface WallOfFameCardProps {
  item: {
    id: string;
    student_name: string | null;
    description: string | null;
    category: string;
    image_url: string;
    achievement_date?: string | null;
  };
  layout?: 'grid' | 'list';
}

const CATEGORY_ICONS: Record<string, string> = {
  'Professional Courses': '📚',
  'Culturals': '🎭',
  'Sports': '⚽',
  'Research': '🔬',
  'Entrepreneurship': '💡',
  'Academics': '🎓',
};

// Corner ornament SVG – decorative filigree-style
const CornerOrnament = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2 L2 16 M2 2 L16 2" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 2 L10 10" stroke="#D4A017" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    <circle cx="2" cy="2" r="1.5" fill="#D4A017"/>
    <circle cx="10" cy="2" r="1" fill="#D4A017" opacity="0.5"/>
    <circle cx="2" cy="10" r="1" fill="#D4A017" opacity="0.5"/>
  </svg>
);

export default function WallOfFameCard({ item, layout = 'grid' }: WallOfFameCardProps) {
  const formattedDate = item.achievement_date
    ? new Date(item.achievement_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const icon = CATEGORY_ICONS[item.category] || '🏅';

  if (layout === 'list') {
    return (
      <div className="relative flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-gray-100">
        {/* Corner ornaments */}
        <CornerOrnament className="absolute top-2 left-2 w-7 h-7 z-20" />
        <CornerOrnament className="absolute top-2 right-2 w-7 h-7 z-20 rotate-90" />
        <CornerOrnament className="absolute bottom-2 left-2 w-7 h-7 z-20 -rotate-90" />
        <CornerOrnament className="absolute bottom-2 right-2 w-7 h-7 z-20 rotate-180" />

        <div className="relative sm:w-44 flex-shrink-0" style={{ minHeight: 180 }}>
          {item.image_url ? (
            <img src={item.image_url} alt={item.student_name || ''} className="w-full h-full object-cover object-top absolute inset-0" />
          ) : (
            <div className="w-full h-full bg-[#123B6D] flex items-center justify-center absolute inset-0">
              <Activity size={40} className="text-[#D4A017]" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        </div>

        <div className="flex flex-col justify-center px-6 py-4 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-5 bg-[#D4A017]" />
            <p className="text-[9px] font-black tracking-[0.25em] uppercase text-[#D4A017]">Wall of Fame</p>
            <div className="h-px w-5 bg-[#D4A017]" />
          </div>
          {item.student_name && (
            <h3 className="text-xl font-black text-[#1E293B] leading-tight mb-0.5">{item.student_name}</h3>
          )}
          {item.description && (
            <p className="text-[#64748B] font-bold text-xs mb-2 line-clamp-2">{item.description}</p>
          )}
          <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-[11px] font-bold text-white mb-3"
            style={{ background: 'linear-gradient(90deg, #0d2a4f, #123B6D)' }}>
            <span>{icon}</span> {item.category}
          </span>
          {formattedDate && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] mb-3">
              <Calendar size={11} className="text-[#D4A017]" />
              <span>{formattedDate}</span>
            </div>
          )}
          <div className="pt-2 border-t border-gray-100">
            <p className="italic text-[#1E293B] text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Congratulations</p>
            <p className="italic text-[#64748B] text-[11px]" style={{ fontFamily: 'Georgia, serif' }}>on this outstanding achievement!</p>
          </div>
        </div>
      </div>
    );
  }

  // ── GRID CARD ──
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ border: '1px solid rgba(212,160,23,0.2)' }}
    >
      {/* ── Corner ornaments ── */}
      <CornerOrnament className="absolute top-2 left-2 w-7 h-7 z-20 pointer-events-none" />
      <CornerOrnament className="absolute top-2 right-2 w-7 h-7 z-20 rotate-90 pointer-events-none" />
      <CornerOrnament className="absolute bottom-2 left-2 w-7 h-7 z-20 -rotate-90 pointer-events-none" />
      <CornerOrnament className="absolute bottom-2 right-2 w-7 h-7 z-20 rotate-180 pointer-events-none" />

      {/* ── TOP: Circular Portrait Image ── */}
      <div className="relative w-full flex justify-center pt-8 pb-2">
        <div 
          className="relative w-36 h-36 rounded-full overflow-hidden shadow-lg z-10"
          style={{ 
            border: '4px solid white',
            boxShadow: '0 8px 24px rgba(212,160,23,0.25), 0 0 0 2px #D4A017' 
          }}
        >
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.student_name || 'Achievement'}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0d2a4f] to-[#123B6D] flex items-center justify-center">
              <Activity size={40} className="text-[#D4A017] opacity-60" />
            </div>
          )}
        </div>

        {/* College logo positioned on the edge of the circle */}
        <div className="absolute top-6 right-1/2 translate-x-[4.5rem] w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden border border-gray-200 z-20">
          <img src="/logo.png" alt="MCC" className="w-5 h-5 object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
      </div>

      {/* ── BOTTOM: Content ── */}
      <div className="flex flex-col items-center px-4 pb-4 pt-1 relative z-10">

        {/* WALL OF FAME label */}
        <div className="flex items-center gap-1.5 mb-1.5 w-full justify-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4A017]" />
          <p className="text-[8px] font-black tracking-[0.3em] uppercase text-[#D4A017] whitespace-nowrap">
            Wall of Fame
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4A017]" />
        </div>

        {/* Name */}
        {item.student_name ? (
          <h3 className="text-[#1E293B] text-base font-black text-center leading-tight mb-0.5">
            {item.student_name}
          </h3>
        ) : (
          <h3 className="text-[#1E293B] text-base font-black text-center mb-0.5">Achievement</h3>
        )}

        {/* Description */}
        {item.description && (
          <p className="text-[#64748B] text-[11px] font-bold text-center line-clamp-2 mb-2 px-1">
            {item.description}
          </p>
        )}

        {/* Category pill */}
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm mb-2.5"
          style={{ background: 'linear-gradient(90deg, #0d2a4f 0%, #123B6D 100%)' }}
        >
          <span>{icon}</span>
          {item.category}
        </span>

        {/* Date */}
        {formattedDate && (
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#64748B] mb-2.5 w-full">
            <Calendar size={10} className="text-[#D4A017]" />
            <span>{formattedDate}</span>
          </div>
        )}

        {/* Divider */}
        <div className="w-full border-t border-gray-100 mb-2" />

        {/* Congratulations */}
        <div className="flex flex-col items-center w-full text-center">
          <p
            className="italic text-[#1E293B] text-xs font-semibold leading-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Congratulations
          </p>
          <p
            className="italic text-[#64748B] text-[11px] leading-snug"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            on this outstanding achievement!
          </p>
        </div>
      </div>
    </div>
  );
}
