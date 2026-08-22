import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Target, BookOpen, Users, ChevronRight, Building2,
  GraduationCap, FileText, Landmark, Star, Calendar, UserCheck, ShieldCheck
} from 'lucide-react';

// Custom LayoutGrid icon (not available in this lucide version)
function LayoutGrid(props: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <rect width="7" height="7" x="3" y="3" rx="1"/>
      <rect width="7" height="7" x="14" y="3" rx="1"/>
      <rect width="7" height="7" x="14" y="14" rx="1"/>
      <rect width="7" height="7" x="3" y="14" rx="1"/>
    </svg>
  );
}

export const metadata: Metadata = {
  title: 'About MCC | Mulund College of Commerce',
  description: 'Learn about Mulund College of Commerce — vision, mission, history, leadership, committees, and more.',
};

const quickLinks = [
  { label: 'Vision & Mission', href: '/about/vision-mission', icon: Target, desc: 'Our guiding principles and long-term goals.' },
  { label: 'PTVA Trust', href: '/about/ptva-trust', icon: Landmark, desc: 'The founding body behind MCC since 1920.' },
  { label: 'Board of Trustees', href: '/about/board-of-trustees', icon: Users, desc: 'Meet the leadership of PTVA Trust.' },
  { label: 'Our Milestones', href: '/about/milestones', icon: Calendar, desc: 'Key achievements across 50+ years.' },
  { label: 'Organogram', href: '/about/organogram', icon: LayoutGrid, desc: 'Organizational hierarchy of the college.' },
  { label: 'Code of Conduct', href: '/about/code-of-conduct', icon: ShieldCheck, desc: 'Rules and ethics for our community.' },
  { label: 'Other Institutions', href: '/about/other-institutions', icon: Building2, desc: 'Other institutions under PTVA Trust.' },
  { label: "Principal's Desk", href: '/principal', icon: GraduationCap, desc: 'Message from Dr. Sonali Mahajan.' },
  { label: "Vice Principal's Desk (Degree College)", href: '/vice-principal-degree', icon: UserCheck, desc: 'Message from the Vice Principal (Degree).' },
  { label: "Vice Principal's Desk (Junior College)", href: '/vice-principal-junior', icon: UserCheck, desc: 'Message from the Vice Principal (Junior).' },
  { label: 'CDC Members', href: '/about/cdc-members', icon: FileText, desc: 'Year-wise list of CDC members.' },
  { label: 'CDC Minutes', href: '/about/cdc-minutes', icon: FileText, desc: 'Minutes of CDC meetings.' },
  { label: 'Special Lectures', href: '/about/special-lectures', icon: Star, desc: 'Tilak Smruti Vyakhyan & B.G. Bapat Memorial Lecture.' },
];



const recentMilestones = [
  { year: '2024', event: 'B.Com BFSI Program Introduced' },
  { year: '2023', event: 'NEP 2020 Implemented, BCA & BBA Launched' },
  { year: '2022', event: 'B.Sc. Data Science & M.Sc. Finance Added' },
  { year: '2021', event: 'Conferred Academic Autonomy by UGC; NAAC Grade A' },
  { year: '2019', event: 'Golden Jubilee Celebrations' },
  { year: '2016', event: 'NAAC Re-accredited with A Grade' },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative bg-[#123B6D] pt-14 pb-32">
        <div className="absolute inset-0 opacity-20">
          <img src="/banner1.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-5 uppercase tracking-widest">
            <Users size={13} /> About MCC
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-[var(--font-heading)] mb-4 leading-tight">
            About Mulund<br className="hidden md:block" /> College of Commerce
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            Established in 1970 by Parle Tilak Vidyalaya Association, MCC (Autonomous) has been a beacon of academic excellence in Mumbai for over 55 years.
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 -mt-20 pb-20 space-y-16">

        {/* ── About MCC ── */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-10 bg-[#D4A017] rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-black text-[#123B6D] font-[var(--font-heading)] uppercase tracking-wide">
              Welcome to Mulund College of Commerce
            </h2>
          </div>
          <p className="text-[#64748B] leading-relaxed text-lg">
            Mulund College of Commerce (MCC), established in 1970, is a prominent institution located in the Mulund suburb of Mumbai, India. Managed by the Parle Tilak Vidyalay Association, the college offers a range of undergraduate and postgraduate programs across disciplines such as commerce, science, management, and media studies.
          </p>
        </div>

        {/* ── Quick Links Grid ── */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-6">Explore All Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {quickLinks.map(({ label, href, icon: Icon, desc }) => (
              <Link
                key={label}
                href={href}
                className="group bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 hover:border-[#123B6D]/30 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#123B6D]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D] transition-colors">
                  <Icon size={18} className="text-[#123B6D] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-[#123B6D] text-sm leading-tight mb-1">{label}</p>
                  <p className="text-gray-400 text-xs leading-snug">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Recent Milestones ── */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-8 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Recent Milestones</h2>
              <p className="text-gray-500 text-sm mt-1">A brief look at our journey of excellence.</p>
            </div>
            <Link href="/about/milestones" className="hidden md:inline-flex items-center gap-1 text-sm text-[#123B6D] font-semibold hover:underline">
              View all milestones <ChevronRight size={15} />
            </Link>
          </div>
          <div className="divide-y divide-[#E2E8F0]">
            {recentMilestones.map((m) => (
              <div key={m.year} className="flex items-center gap-5 px-8 py-4 hover:bg-[#F8FAFC] transition-colors">
                <span className="text-[#D4A017] font-black text-lg w-12 flex-shrink-0 font-[var(--font-heading)]">{m.year}</span>
                <span className="text-[#1E293B] text-sm">{m.event}</span>
              </div>
            ))}
          </div>
          <div className="p-5 text-center md:hidden">
            <Link href="/about/milestones" className="text-sm text-[#123B6D] font-semibold hover:underline inline-flex items-center gap-1">
              View all milestones <ChevronRight size={15} />
            </Link>
          </div>
        </div>



        {/* ── Our Other Institutions ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-10 bg-[#D4A017] rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-black text-[#123B6D] font-[var(--font-heading)] uppercase tracking-wide">
              Our Other Institutions
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6">Explore the other schools and colleges run by the Parle Tilak Vidyalaya Association.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Schools */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div className="bg-[#123B6D] px-6 py-4 flex items-center gap-3">
                <BookOpen size={18} className="text-white/80" />
                <h3 className="font-bold text-white text-sm tracking-widest uppercase">Schools</h3>
              </div>
              <div className="flex flex-col divide-y divide-[#E2E8F0]">
                {[
                  { label: 'Parle Tilak ICSE School', href: 'https://www.parletilakicse.com/' },
                  { label: 'PTV English Medium Primary', href: 'https://www.ptvenglishmediumprimary.com/' },
                  { label: 'PTV English Medium Secondary', href: 'https://www.ptvenglishmediumsecondary.com/' },
                  { label: 'Parle Tilak Vidyalaya (Marathi Medium)', href: 'https://www.parletilakvidyalayamm.com/' },
                  { label: 'PTVA English Medium Andheri', href: 'https://www.ptvaenglishmediumandheri.com/' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-6 py-4 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="text-sm font-semibold text-[#1E293B] group-hover:text-[#123B6D] transition-colors">{label}</span>
                    <ChevronRight size={15} className="text-gray-300 group-hover:text-[#123B6D] transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Colleges */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div className="bg-[#008e59] px-6 py-4 flex items-center gap-3">
                <GraduationCap size={18} className="text-white/80" />
                <h3 className="font-bold text-white text-sm tracking-widest uppercase">Colleges</h3>
              </div>
              <div className="flex flex-col divide-y divide-[#E2E8F0]">
                {[
                  { label: 'MLDCC – Mulund Law, Degree & Commerce College', href: 'https://mldcc.com/mldcc/' },
                  { label: 'Sathaye College', href: 'https://sathayecollege.edu.in/' },
                  { label: 'PTVA Institute of Management', href: 'https://ptvaim.ac.in/' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-6 py-4 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="text-sm font-semibold text-[#1E293B] group-hover:text-[#008e59] transition-colors">{label}</span>
                    <ChevronRight size={15} className="text-gray-300 group-hover:text-[#008e59] transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
