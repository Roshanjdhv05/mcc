'use client';
import { Users, BookOpen, Briefcase, ShieldCheck } from 'lucide-react';
import Counter from '@/components/ui/Counter';

const stats = [
  { label: 'Qualified Teachers', target: 90, suffix: '+', icon: Users },
  { label: 'Students', target: 6400, suffix: '+', icon: BookOpen },
  { label: 'Programs', target: 18, suffix: '', icon: Briefcase },
  { label: 'Years of Excellence', target: 55, suffix: '+', icon: ShieldCheck },
];

export default function StatsStrip() {
  return (
    <>
      <style>{`
        @keyframes statsMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-stats-marquee {
          display: flex;
          width: max-content;
          animation: statsMarquee 12s linear infinite;
        }
        .animate-stats-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Mobile View: Small Compact Blue Strip with Right-to-Left Continuous Marquee ── */}
      <section className="md:hidden bg-[#123B6D] py-2 overflow-hidden border-y border-[#1E4A84] shadow-sm">
        <div className="animate-stats-marquee">
          {[...stats, ...stats].map(({ label, target, suffix, icon: Icon }, i) => (
            <div 
              key={`${label}-${i}`} 
              className="flex items-center gap-2 px-4 shrink-0 border-r border-white/15"
            >
              <Icon className="text-[#D4A017] w-4 h-4 shrink-0" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-bold text-white font-[var(--font-heading)] whitespace-nowrap">
                  <Counter target={target} suffix={suffix} />
                </span>
                <span className="text-[10px] text-white/85 font-semibold uppercase tracking-wider whitespace-nowrap">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Desktop View: Full 4-Column Strip ── */}
      <section className="hidden md:block bg-[#123B6D] py-5 overflow-hidden border-y border-[#1E4A84]">
        <div className="max-w-7xl mx-auto px-12 relative">
          <div className="grid grid-cols-4 gap-6 text-center">
            {stats.map(({ label, target, suffix, icon: Icon }) => (
              <div key={label} className="text-center px-2 py-0">
                <Icon className="text-[#D4A017] mx-auto mb-2 w-7 h-7" />
                <div className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)]">
                  <Counter target={target} suffix={suffix} />
                </div>
                <div className="text-white/80 text-sm mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


