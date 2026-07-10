import type { Metadata } from 'next';
import { ShieldAlert, AlertTriangle, Ban, UserX, Clock, PhoneCall } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Anti-Ragging Cell | MCC Digital Experience Platform',
  description: 'Anti-Ragging warning and policy at Mulund College of Commerce as per The Maharashtra Prohibition of Ragging Act, 1999.',
};

const sections = [
  {
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    title: 'Definition of Ragging',
    content: `Ragging means display of disorderly conduct, doing of any act which causes or is likely to cause physical or psychological harm or raise apprehension or fear or shame or embarrassment to a student in any educational institution and includes:`,
    bullets: [
      'Teasing, abusing, threatening or playing practical jokes on, or causing hurt to students.',
      'Asking a student to do any act or perform something which such student will not, in the ordinary course, be willing to do.',
    ],
  },
  {
    icon: Ban,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    title: 'Prohibition of Ragging',
    content: 'Ragging within or outside of any educational institution is prohibited.',
    bullets: [],
  },
  {
    icon: ShieldAlert,
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    title: 'Penalty of Ragging',
    content: 'Whoever directly or indirectly commits, participates in, abets or propagates ragging within or outside any educational institution, shall, on conviction, be punished with:',
    bullets: [
      'Imprisonment for a term which may extend to two years.',
      'A fine which may extend to ten thousand rupees.',
    ],
  },
  {
    icon: UserX,
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    title: 'Dismissal of Student',
    content: 'Any student convicted of an offence under Section 4 of the Act shall be:',
    bullets: [
      'Dismissed from the educational institution.',
      'Not admitted in any other educational institution for a period of five years from the date of order of such dismissal.',
    ],
  },
  {
    icon: Clock,
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'Suspension of Student',
    content: 'Whenever any student or, as the case may be, the parent or guardian, or a teacher of an educational institution complains, in writing, of ragging to the head of the educational institution:',
    bullets: [
      'The head of the institution shall, within seven days of receipt of the complaint, enquire into the matter.',
      'If prima facie found true, the accused student shall be suspended immediately.',
      'The complaint shall be forwarded to the police station having jurisdiction over the area.',
      'Where enquiry finds no substance in the complaint, the head shall intimate this in writing to the complainant.',
      'The decision of the head of the educational institution shall be final.',
    ],
  },
];

export default function AntiRaggingPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* Hero Banner */}
      <div className="relative bg-[#7B0000] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#fff_0px,#fff_1px,transparent_1px,transparent_12px)]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-14 md:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/30 mb-6">
            <ShieldAlert size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-3 uppercase tracking-wide">
            Anti Ragging Warning
          </h1>
          <p className="text-white/80 text-base md:text-lg font-medium">
            THE MAHARASHTRA PROHIBITION OF RAGGING ACT, 1999 — MAHARASHTRA ACT NO. XXXIII OF 1999
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-6">

        {sections.map(({ icon: Icon, color, bg, border, title, content, bullets }) => (
          <div key={title} className={`${bg} border ${border} rounded-2xl p-6 md:p-8`}>
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border ${border}`}>
                <Icon size={22} className={color} />
              </div>
              <div className="flex-1">
                <h2 className={`text-lg md:text-xl font-bold font-[var(--font-heading)] mb-3 ${color}`}>
                  {title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-[15px] mb-3">{content}</p>
                {bullets.length > 0 && (
                  <ul className="space-y-2">
                    {bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-[15px]">
                        <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${color.replace('text-', 'bg-')}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Important Note */}
        <div className="bg-[#123B6D] rounded-2xl p-6 md:p-8 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
            <PhoneCall size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg font-[var(--font-heading)] mb-2">Important Note</h2>
            <p className="text-white/85 text-[15px] leading-relaxed">
              The student(s) should report the incident of ragging (if any) to the <strong className="text-white">Principal immediately</strong>, so that the necessary steps can be initiated in the matter.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
