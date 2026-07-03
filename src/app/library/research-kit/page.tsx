'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, University, Search, Download, ShieldCheck, PenTool, Database, BookOpen, UserCheck, ChevronRight, ChevronDown, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const libraryNav = [
  { label: 'HOME', href: '/library' },
  { label: 'ABOUT US', href: '/library/about-us' },
  { label: 'WEB OPAC', href: '#' },
  { label: 'E-RESOURCES', href: '/library/e-resources' },
  { label: 'STAFF PROFILE', href: '/library/staff-profile' },
  { label: 'DOWNLOAD', href: '#' },
  { label: 'RESEARCH - KIT', active: true, href: '/library/research-kit' },
  { label: 'I. R.', href: 'https://drive.google.com/drive/folders/1bes4sOXN9ePGCVSgdTQ2ZtPg-pYQWyju?usp=drive_link' },
  { label: 'IMPORTANT LINKS', href: '/library/important-links' },
  { label: 'FEEDBACK', href: '#' },
  { label: 'CONTACT US', href: '/library/contact-us' },
];

const sidebarLinks = [
  { id: 'ugc', label: 'UGC Ph.D. REGULATIONS, 2022' },
  { id: 'review', label: 'Review of Literature and Sources' },
  { id: 'reference', label: 'Reference Management Tools' },
  { id: 'grammar', label: 'Grammar Checker Tools' },
  { id: 'plagiarism', label: 'Anti-Plagiarism Software' },
  { id: 'spss', label: 'SPSS Manual' },
];

const ResourceCard = ({ title, description, href }: { title: string; description: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex gap-4 p-5 bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-xl group transition-all"
  >
    <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 group-hover:border-green-300 transition-colors shadow-sm">
      <ExternalLink size={18} className="text-gray-400 group-hover:text-[#008e59] transition-colors" />
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-[#123B6D] text-sm group-hover:text-[#014d4e] transition-colors">{title}</h3>
      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{description}</p>
    </div>
  </a>
);

const DriveLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-6 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl group transition-all"
  >
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-green-100">
      <FileText size={24} className="text-green-600" />
    </div>
    <div className="flex-1">
      <p className="font-bold text-[#014d4e] text-base">{label}</p>
      <p className="text-gray-500 text-xs mt-0.5">Click to open in Google Drive</p>
    </div>
    <ExternalLink size={20} className="text-green-600 group-hover:text-green-800 transition-colors shrink-0" />
  </a>
);

export default function ResearchKitPage() {
  const [activeTab, setActiveTab] = useState('ugc');
  const [activeMobile, setActiveMobile] = useState<boolean>(true);
  const [showSticky, setShowSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300) {
        if (currentScrollY < lastScrollY) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
        }
      } else {
        setShowSticky(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const renderMobileDropdown = (isSticky = false) => (
    <div className={`relative ${isSticky ? '' : 'z-30'}`}>
      <button
        onClick={() => setActiveMobile(!activeMobile)}
        className={`w-full flex items-center justify-between bg-[#014d4e] text-white px-5 py-4 font-bold text-sm tracking-widest uppercase ${isSticky ? 'shadow-md' : 'rounded-t-2xl'}`}
      >
        <span>RESEARCH KIT</span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${activeMobile ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {activeMobile && (
          <motion.div
            key="cat-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`overflow-hidden absolute w-full bg-white border border-[#E2E8F0] shadow-xl ${isSticky ? 'border-t-0 rounded-b-xl' : 'border-t-0 rounded-b-2xl'} z-50`}
          >
            <div className="flex flex-col divide-y divide-[#E2E8F0] max-h-[60vh] overflow-y-auto p-2">
              {sidebarLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setActiveMobile(false);
                      setTimeout(() => {
                        const el = document.getElementById('content-area');
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 140;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }, 300);
                    }}
                    className={`flex items-center gap-3 px-3 py-3.5 rounded-lg text-sm font-semibold transition-colors text-left ${
                      isActive 
                        ? 'bg-green-50 text-[#008e59]' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#014d4e]'
                    }`}
                  >
                    <span className="flex-1 pr-2">{link.label}</span>
                    <ChevronRight size={15} className={isActive ? 'text-[#008e59]' : 'text-gray-300'} />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12 font-sans">
      {/* Secondary Library Nav */}
      <div className="bg-[#014d4e] w-full shadow-md z-40 relative">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 overflow-x-auto no-scrollbar flex items-center h-12">
          {libraryNav.map((item, i) => {
            const isExternal = item.href?.startsWith('http');
            return isExternal && !item.active ? (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 h-full flex items-center px-4 lg:px-5 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider text-white/90 hover:text-white hover:bg-white/10"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={i}
                href={item.href || '#'}
                className={`flex-shrink-0 h-full flex items-center px-4 lg:px-5 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider ${
                  item.active
                    ? 'bg-[#008e59] text-white'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* MOBILE: Categories dropdown bar */}
        <div className="lg:hidden mb-4 relative">
          {/* Fixed Sticky Categories Bar (Only shows on scroll up) */}
          <AnimatePresence>
            {showSticky && (
              <motion.div
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-20 left-0 w-full z-40 px-4"
              >
                {renderMobileDropdown(true)}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Normal In-Flow Categories Bar */}
          {renderMobileDropdown(false)}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-2 sticky top-24 self-start">
          <div className="bg-[#014d4e] text-white font-bold px-4 py-3 rounded-t-xl shadow-md">
            RESEARCH KIT
          </div>
          <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 flex flex-col p-2 gap-1">
            {sidebarLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    const el = document.getElementById('content-area');
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 140;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left leading-tight group ${
                    isActive
                      ? 'bg-green-50 text-[#008e59] border-l-4 border-[#008e59]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#014d4e] border-l-4 border-transparent'
                  }`}
                >
                  <span className="flex-1 pr-2">{link.label}</span>
                  <ChevronRight size={14} className={`shrink-0 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div id="content-area" className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px]">

            <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">
              {sidebarLinks.find(s => s.id === activeTab)?.label?.toUpperCase()}
            </h1>

            {activeTab === 'ugc' && (
              <DriveLink
                label="UGC Ph.D. Regulations, 2022 – Full Document"
                href="https://drive.google.com/file/d/1SY3II-l6U91wpirL153AJaxPOfL4ijLD/view?usp=drive_link"
              />
            )}

            {activeTab === 'review' && (
              <div className="flex flex-col gap-4">
                <ResourceCard title="Shodhganga" description="The Shodhganga@INFLIBNET Centre provides a platform for research students to deposit their Ph.D. theses." href="https://shodhganga.inflibnet.ac.in/" />
                <ResourceCard title="DOAR (Directory of Open Access Repositories)" description="You can search and browse through thousands of registered repositories." href="https://v2.sherpa.ac.uk/opendoar/" />
                <ResourceCard title="JURN" description="Search millions of free academic articles, book chapters, and theses. Covers Arts, Humanities, Business, Law, Nature, Science, and Medical subjects." href="https://www.jurn.link/#gsc.tab=0" />
                <ResourceCard title="Semantic Scholar" description="A free AI-powered research tool for scientific literature." href="https://www.semanticscholar.org/" />
                <ResourceCard title="ROAR (Registry of Open Access Repositories)" description="A searchable international database indexing the creation, location, and growth of open access institutional repositories." href="http://roar.eprints.org/" />
                <ResourceCard title="ERIC (Education Resources Information Center)" description="An online digital library of education research and information." href="https://eric.ed.gov/" />
                <ResourceCard title="DOAJ (Directory of Open Access Journals)" description="Find open-access journals and scholarly articles." href="https://doaj.org/" />
                <ResourceCard title="DOAB (Directory of Open Access Books)" description="A community-driven discovery service that indexes and provides access to scholarly, peer-reviewed open-access books." href="https://www.doabooks.org/" />
                <ResourceCard title="BASE (Bielefeld Academic Search Engine)" description="One of the world's largest academic search engines for scholarly web resources." href="https://www.base-search.net/" />
              </div>
            )}

            {activeTab === 'reference' && (
              <div className="flex flex-col gap-4">
                <ResourceCard title="EssayToolBox" description="There are lots of online tools that can improve your writing. You'll notice the difference as soon as you start relying on this writing software." href="https://studycrumb.com/tools" />
                <ResourceCard title="Zotero" description="Zotero is a free and open-source reference management software that helps users collect, organize, annotate, cite, and share research materials." href="https://www.zotero.org/" />
                <ResourceCard title="Mendeley Reference Manager" description="Mendeley Reference Manager allows users to organize and search their personal research library, annotate documents, and generate citations while writing." href="https://www.mendeley.com/download-reference-manager/windows" />
              </div>
            )}

            {activeTab === 'grammar' && (
              <div className="flex flex-col gap-4">
                <ResourceCard title="Grammarly" description="Grammarly is a powerful grammar checker that provides tools to help improve writing. It acts as a writing assistant that helps users write clearly, correctly, and confidently across various platforms." href="https://www.grammarly.com/" />
                <ResourceCard title="Ginger" description="Ginger is an AI-powered writing assistant that corrects grammar and spelling mistakes, improves writing style, and enhances creativity. It goes beyond basic grammar and spelling correction." href="https://www.gingersoftware.com/" />
                <ResourceCard title="LanguageTool" description="LanguageTool is a free and open-source grammar, style, and spell checker. It supports multiple languages and provides grammar, style, and spelling suggestions for better writing." href="https://languagetool.org/" />
              </div>
            )}

            {activeTab === 'plagiarism' && (
              <div className="flex flex-col gap-4">
                <ResourceCard title="Viper" description="Viper is an online plagiarism checker that helps students, teachers, schools, colleges, universities, and professionals check documents for plagiarism and duplicate content using a range of powerful features." href="https://www.scanmyessay.com/" />
                <ResourceCard title="Duplichecker" description="Duplichecker is an online plagiarism and content similarity detection tool that identifies plagiarism or copyright infringement in documents. Useful for writers, teachers, students, bloggers, webmasters, and other content creators." href="https://www.duplichecker.com/" />
                <ResourceCard title="SmallSEOTools – Plagiarism Checker" description="A free online plagiarism checker that scans submitted text for duplicate content. Users can paste text into the editor and check the originality of articles and documents." href="https://smallseotools.com/plagiarism-checker/" />
              </div>
            )}

            {activeTab === 'spss' && (
              <DriveLink
                label="SPSS Manual – Full Document Collection"
                href="https://drive.google.com/drive/folders/18kJNDES4t8DDpVPLR4rJEnLvlTeGsJw4?usp=drive_link"
              />
            )}

          </div>
        </div>
      </div>

      {/* Library Footer */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 mt-12">
        <div className="bg-[#014d4e] w-full rounded-xl py-4 px-6 flex items-center gap-4 text-white/90 text-sm shadow-md">
          <University size={20} className="shrink-0" />
          {/* Copyright removed */}
        </div>
      </div>
    </div>
  );
}
