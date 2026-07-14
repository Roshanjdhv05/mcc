'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, ChevronRight, ChevronDown, ExternalLink, BookOpen, Users, DollarSign, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const autonomyNav = [
  { label: 'Grant of Autonomy (Certificate)', href: '/accreditation/autonomous/grant' },
  { label: 'Board of Studies', href: '/accreditation/autonomous/bos/members' },
  { label: 'Academic Council', href: '/accreditation/autonomous/academic-council/members' },
  { label: 'Finance Committee', href: '/accreditation/autonomous/finance-committee/members' },
  { label: 'Governing Body', href: '/accreditation/autonomous/governing-body/members' },
];

const sidebarLinks = [
  { id: 'grant',            label: 'GRANT OF AUTONOMY (CERTIFICATE)' },
  { id: 'bos-members',     label: 'BOARD OF STUDIES – MEMBERS' },
  { id: 'bos-minutes',     label: 'BOARD OF STUDIES – MINUTES',           href: '/accreditation/autonomous/bos/minutes',                external: true },
  { id: 'academic-members',label: 'ACADEMIC COUNCIL – MEMBERS' },
  { id: 'academic-minutes',label: 'ACADEMIC COUNCIL – MINUTES',           href: '/accreditation/autonomous/academic-council/minutes',   external: true },
  { id: 'finance-members', label: 'FINANCE COMMITTEE – MEMBERS' },
  { id: 'finance-minutes', label: 'FINANCE COMMITTEE – MINUTES',          href: '/accreditation/autonomous/finance-committee/minutes',  external: true },
  { id: 'governing-members',label: 'GOVERNING BODY – MEMBERS' },
  { id: 'governing-minutes',label: 'GOVERNING BODY – MINUTES',            href: '/accreditation/autonomous/governing-body/minutes',     external: true },
];

// Sub-page cards for committee member sections
const committeeCards = [
  {
    id: 'bos-members',
    title: 'Board of Studies',
    icon: <BookOpen size={28} />,
    description: 'The Board of Studies designs and reviews curriculum for each subject/department at Mulund College of Commerce (Autonomous).',
    href: '/accreditation/autonomous/bos/members',
    details: [
      'Responsible for framing the syllabus for each programme.',
      'Includes faculty members, external experts, industry representatives, and meritorious alumni.',
      'One member nominated by the Vice-Chancellor from recommendations by the Principal.',
      'Meets periodically to update and revise the curriculum to meet industry and academic standards.',
    ],
  },
  {
    id: 'academic-members',
    title: 'Academic Council',
    icon: <GraduationCap size={28} />,
    description: 'The Academic Council is the highest academic body of the college, responsible for overall academic policies and quality standards.',
    href: '/accreditation/autonomous/academic-council/members',
    details: [
      'Approves syllabi and schemes of examination proposed by Boards of Studies.',
      'Monitors and evaluates the academic performance of the institution.',
      'Oversees the conduct of examinations and declaration of results.',
      'Recommends institution-level academic policies to the Governing Body.',
    ],
  },
  {
    id: 'finance-members',
    title: 'Finance Committee',
    icon: <DollarSign size={28} />,
    description: 'The Finance Committee oversees all financial matters of the college and ensures responsible and transparent utilization of funds.',
    href: '/accreditation/autonomous/finance-committee/members',
    details: [
      'Prepares the annual budget of the college.',
      'Examines the accounts of the institution.',
      'Suggests measures to generate additional resources.',
      'Oversees all financial transactions and approvals.',
    ],
  },
  {
    id: 'governing-members',
    title: 'Governing Body',
    icon: <Shield size={28} />,
    description: 'The Governing Body is the apex authority responsible for the overall management, policy-making, and administration of the college.',
    href: '/accreditation/autonomous/governing-body/members',
    details: [
      'Approves the annual budget and major financial decisions.',
      'Appoints the Principal and senior administrative staff.',
      'Ratifies policies recommended by Academic Council.',
      'Ensures accountability and transparency in institutional governance.',
    ],
  },
];

export default function AutonomousHEIPage() {
  const [activeTab, setActiveTab] = useState('grant');
  const [activeMobile, setActiveMobile] = useState<boolean>(false);
  const [showSticky, setShowSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300) {
        setShowSticky(currentScrollY < lastScrollY);
      } else {
        setShowSticky(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const currentLabel = sidebarLinks.find(l => l.id === activeTab)?.label ?? 'AUTONOMOUS HEI';

  const scrollToContent = () => {
    setTimeout(() => {
      const el = document.getElementById('content-area');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' });
    }, 300);
  };

  const renderMobileDropdown = (isSticky = false) => (
    <div className={`relative ${isSticky ? '' : 'z-30'}`}>
      <button
        onClick={() => setActiveMobile(!activeMobile)}
        className={`w-full flex items-center justify-between bg-[#123B6D] text-white px-5 py-4 font-bold text-sm tracking-widest uppercase ${isSticky ? 'shadow-md' : 'rounded-t-2xl'}`}
      >
        <span>{currentLabel}</span>
        <ChevronDown size={20} className={`transition-transform duration-300 ${activeMobile ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {activeMobile && (
          <motion.div
            key="dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`overflow-hidden absolute w-full bg-white border border-[#E2E8F0] shadow-xl ${isSticky ? 'border-t-0 rounded-b-xl' : 'border-t-0 rounded-b-2xl'} z-50`}
          >
            <div className="flex flex-col divide-y divide-[#E2E8F0] max-h-[60vh] overflow-y-auto p-2">
              {sidebarLinks.map((link, i) => {
                if (link.external) {
                  return (
                    <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-3.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#123B6D]">
                      {link.label}
                      <ExternalLink size={14} className="text-gray-400" />
                    </a>
                  );
                }
                const isActive = activeTab === link.id;
                return (
                  <button key={i} onClick={() => {
                    setActiveTab(link.id);
                    setActiveMobile(false);
                    scrollToContent();
                  }}
                    className={`flex items-center gap-3 px-3 py-3.5 rounded-lg text-sm font-semibold text-left ${isActive ? 'bg-blue-50 text-[#123B6D]' : 'text-gray-600 hover:bg-gray-50 hover:text-[#123B6D]'}`}
                  >
                    <span className="flex-1">{link.label}</span>
                    <ChevronRight size={15} className={isActive ? 'text-[#123B6D]' : 'text-gray-300'} />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // The committee card for a given tab
  const activeCard = committeeCards.find(c => c.id === activeTab);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12 font-sans">
      {/* ── Secondary Accreditation Nav ── */}
      <div className="bg-[#123B6D] w-full shadow-md z-40 sticky top-[64px] md:top-[150px] lg:top-[185px] xl:top-[195px]">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 overflow-x-auto no-scrollbar flex items-center h-12">
          {autonomyNav.map((item, i) => (
            <Link key={i} href={item.href}
              className={`flex-shrink-0 h-full flex items-center px-4 lg:px-5 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider ${
                (item as any).active ? 'bg-[#D4A017] text-white' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* MOBILE: Dropdown */}
        <div className="lg:hidden mb-4 relative">
          <AnimatePresence>
            {showSticky && (
              <motion.div initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-20 left-0 w-full z-40 px-4"
              >
                {renderMobileDropdown(true)}
              </motion.div>
            )}
          </AnimatePresence>
          {renderMobileDropdown(false)}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-2 sticky top-24 self-start">
          <div className="bg-[#123B6D] text-white font-bold px-4 py-3 rounded-t-xl shadow-md flex items-center gap-2">
            <GraduationCap size={18} />
            AUTONOMOUS HEI
          </div>
          <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 flex flex-col p-2 gap-1">
            {sidebarLinks.map((link, i) => {
              if (link.external) {
                return (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-[#123B6D] border-l-4 border-transparent italic">
                    {link.label}
                    <ExternalLink size={13} className="text-gray-400 shrink-0" />
                  </a>
                );
              }
              const isActive = activeTab === link.id;
              return (
                <button key={i} onClick={() => {
                  setActiveTab(link.id);
                  const el = document.getElementById('content-area');
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' });
                }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-left group ${
                    isActive
                      ? 'bg-blue-50 text-[#123B6D] border-l-4 border-[#123B6D]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#123B6D] border-l-4 border-transparent'
                  }`}
                >
                  {link.label}
                  <ChevronRight size={16} className={isActive ? 'opacity-100 text-[#123B6D]' : 'opacity-0 group-hover:opacity-100'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Panel */}
        <div id="content-area" className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px]">

            {/* ── Grant of Autonomy ── */}
            {activeTab === 'grant' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">GRANT OF AUTONOMY (CERTIFICATE)</h1>
                <div className="prose max-w-none text-gray-700 space-y-4 text-sm leading-relaxed">
                  <p>
                    Mulund College of Commerce has been granted Autonomous status by the University of Mumbai and the
                    University Grants Commission (UGC), recognizing the college's consistent academic excellence, quality
                    of education, and commitment to holistic student development.
                  </p>
                  <p>
                    This autonomous status empowers the college to design its own curriculum, conduct examinations, and
                    award degrees under the affiliation of the University of Mumbai — enabling a more industry-relevant,
                    flexible, and student-centered education system.
                  </p>
                  <div className="mt-8 grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Curriculum Design', desc: 'Freedom to design and update curriculum independently.' },
                      { label: 'Conduct Examinations', desc: 'Conduct internal and semester-end examinations autonomously.' },
                      { label: 'Award Degrees', desc: 'Degrees awarded under University of Mumbai affiliation.' },
                      { label: 'Quality Assurance', desc: 'Rigorous IQAC-driven quality monitoring system.' },
                    ].map((item, i) => (
                      <div key={i} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                        <p className="font-bold text-[#123B6D] text-sm mb-1">{item.label}</p>
                        <p className="text-gray-500 text-xs">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <a href="#" className="inline-flex items-center gap-2 bg-[#123B6D] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#0f2f58] transition-colors">
                      <ExternalLink size={16} /> View Autonomy Certificate (PDF)
                    </a>
                  </div>
                </div>
              </>
            )}

            {/* ── Committee Member Tabs ── */}
            {activeCard && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">{currentLabel}</h1>

                {/* Description card */}
                <div className="flex items-start gap-5 bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#123B6D] text-white flex items-center justify-center shrink-0 shadow-md">
                    {activeCard.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#123B6D] mb-1">{activeCard.title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{activeCard.description}</p>
                  </div>
                </div>

                {/* Key responsibilities */}
                <h3 className="font-bold text-gray-700 text-sm mb-4 uppercase tracking-wider">Key Responsibilities</h3>
                <ul className="space-y-3 mb-8">
                  {activeCard.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] flex items-center justify-center mt-0.5 font-bold text-xs">{i + 1}</span>
                      {d}
                    </li>
                  ))}
                </ul>

                {/* Link to full members page */}
                <div className="border-t border-gray-100 pt-6 flex items-center gap-4">
                  <Link href={activeCard.href}
                    className="inline-flex items-center gap-2 bg-[#123B6D] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#0f2f58] transition-colors">
                    <Users size={16} /> View Full Year-Wise Members List
                  </Link>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
