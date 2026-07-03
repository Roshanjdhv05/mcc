'use client';
import { Users, BookOpen, Briefcase, ShieldCheck } from 'lucide-react';
import Counter from '@/components/ui/Counter';

const stats = [
  { label: 'Qualified Teachers', target: 51, suffix: '', icon: Users },
  { label: 'Students', target: 6306, suffix: '', icon: BookOpen },
  { label: 'Programs', target: 18, suffix: '', icon: Briefcase },
  { label: 'Years of Excellence', target: 55, suffix: '+', icon: ShieldCheck },
];

export default function StatsStrip() {
  return (
    <section className="bg-[#123B6D] py-6 md:py-10 overflow-hidden border-y border-[#1E4A84]">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mobile-marquee {
          animation: marquee 10s linear infinite;
        }
        @media (min-width: 768px) {
          .mobile-marquee {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-0 md:px-12 relative">
        <div className="flex w-max md:w-full md:grid md:grid-cols-4 md:gap-6 mobile-marquee">
          {[...stats, ...stats].map(({ label, target, suffix, icon: Icon }, i) => (
            <div 
              key={`${label}-${i}`} 
              className={`text-center flex-[0_0_50vw] md:flex-none md:w-auto px-2 md:px-0 py-2 md:py-0 ${i >= 4 ? 'md:hidden' : ''}`}
            >
              <Icon className="text-[#D4A017] mx-auto mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7" />
              <div className="text-2xl md:text-4xl font-bold text-white font-[var(--font-heading)]">
                <Counter target={target} suffix={suffix} />
              </div>
              <div className="text-white/80 text-[11px] md:text-sm mt-0.5 md:mt-1 uppercase tracking-wider md:normal-case md:tracking-normal font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
