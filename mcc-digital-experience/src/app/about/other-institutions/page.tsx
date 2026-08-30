import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen, GraduationCap, ExternalLink, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Other Institutions | PTVA | Mulund College of Commerce',
  description: 'Explore the network of schools and colleges run by the Parle Tilak Vidyalaya Association (PTVA) — the trust behind Mulund College of Commerce.',
};

const schools = [
  {
    name: 'Parle Tilak ICSE School',
    href: 'https://www.parletilakicse.com/',
    desc: 'An ICSE-affiliated school offering quality education from nursery to grade 10.',
  },
  {
    name: 'PTV English Medium Primary School',
    href: 'https://www.ptvenglishmediumprimary.com/',
    desc: 'English medium primary school providing a strong academic foundation.',
  },
  {
    name: 'PTV English Medium Secondary School',
    href: 'https://www.ptvenglishmediumsecondary.com/',
    desc: 'Secondary level English medium school under the PTVA umbrella.',
  },
  {
    name: 'Parle Tilak Vidyalaya (Marathi Medium)',
    href: 'https://www.parletilakvidyalayamm.com/',
    desc: 'The flagship Marathi medium school that gave rise to the entire PTVA network.',
  },
  {
    name: 'PTVA English Medium School, Andheri',
    href: 'https://www.ptvaenglishmediumandheri.com/',
    desc: 'English medium school located in Andheri, serving students across the region.',
  },
];

const colleges = [
  {
    name: 'M.L.Dahanukar College',
    href: 'https://mldcc.com/mldcc/',
    desc: 'Offers undergraduate programs in law and commerce under University of Mumbai.',
  },
  {
    name: 'Sathaye College',
    href: 'https://sathayecollege.edu.in/',
    desc: 'A reputed arts, science, and commerce college located in Vile Parle, Mumbai.',
  },
  {
    name: 'PTVA Institute of Management',
    href: 'https://ptvaim.ac.in/',
    desc: 'A management institute offering MBA and other postgraduate management programs.',
  },
];

export default function OtherInstitutionsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* Hero */}
      <div className="relative bg-[#123B6D] pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <ChevronRight size={12} />
            <span className="text-white">Other Institutions</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-5 uppercase tracking-widest">
            <Building2 size={13} /> PTVA Network
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Our Other Institutions
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            The Parle Tilak Vidyalaya Association (PTVA), founded in 1920, runs a wide network of schools and colleges across Mumbai dedicated to holistic education.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 -mt-20 pb-24 space-y-12">

        {/* Colleges Card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#008e59] px-8 py-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-wide uppercase">Colleges</h2>
              <p className="text-white/60 text-sm">PTVA-affiliated colleges offering higher education</p>
            </div>
          </div>

          {/* College List */}
          <div className="divide-y divide-[#E2E8F0]">
            {colleges.map(({ name, href, desc }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 px-8 py-5 hover:bg-[#F0FFF8] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#008e59]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#008e59] transition-colors">
                  <GraduationCap size={18} className="text-[#008e59] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1E293B] text-sm leading-tight mb-0.5 group-hover:text-[#008e59] group-hover:underline transition-colors">{name}</p>
                  <p className="text-gray-400 text-xs leading-snug">{desc}</p>
                </div>
                <ExternalLink size={15} className="text-gray-300 group-hover:text-[#008e59] transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Schools Card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#123B6D] px-8 py-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-wide uppercase">Schools</h2>
              <p className="text-white/60 text-sm">PTVA-affiliated schools across Mumbai</p>
            </div>
          </div>

          {/* School List */}
          <div className="divide-y divide-[#E2E8F0]">
            {schools.map(({ name, href, desc }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 px-8 py-5 hover:bg-[#F0F4FF] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#123B6D]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D] transition-colors">
                  <BookOpen size={18} className="text-[#123B6D] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#123B6D] text-sm leading-tight mb-0.5 group-hover:underline">{name}</p>
                  <p className="text-gray-400 text-xs leading-snug">{desc}</p>
                </div>
                <ExternalLink size={15} className="text-gray-300 group-hover:text-[#123B6D] transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="flex justify-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[#123B6D] font-semibold text-sm hover:underline"
          >
            <ChevronRight size={15} className="rotate-180" />
            Back to About
          </Link>
        </div>

      </div>
    </div>
  );
}
