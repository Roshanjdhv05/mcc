'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { University, ExternalLink, BookOpen, Globe, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const libraryNav = [
  { label: 'HOME', href: '/library' },
  { label: 'ABOUT US', href: '/library/about-us' },
  { label: 'WEB OPAC', href: '#' },
  { label: 'E-RESOURCES', active: true, href: '/library/e-resources' },
  { label: 'STAFF PROFILE', href: '/library/staff-profile' },
  { label: 'DOWNLOAD', href: '#' },
  { label: 'RESEARCH - KIT', href: '/library/research-kit' },
  { label: 'I. R.', href: 'https://drive.google.com/drive/folders/1bes4sOXN9ePGCVSgdTQ2ZtPg-pYQWyju?usp=drive_link' },
  { label: 'IMPORTANT LINKS', href: '/library/important-links' },
  { label: 'FEEDBACK', href: '#' },
  { label: 'CONTACT US', href: '/library/contact-us' },
];

const sidebarLinks = [
  { id: 'main', label: 'Main e-Resources' },
  { id: 'ejournals', label: 'Open Access e-Journals' },
  { id: 'rbi', label: 'RBI Publications' },
  { id: 'ebooks', label: 'Open Source e-Books' },
  { id: 'databases', label: 'Open Source Online Databases' },
  { id: 'rare', label: 'Rare Books Collection Databases' },
  { id: 'newspapers', label: 'e-Newspapers' },
];

const data = {
  main: [
    { title: 'Parliament Library: Parliament of India', href: 'http://parliamentlibraryindia.nic.in/' },
    { title: 'N-LIST', href: 'http://nlist.inflibnet.ac.in/' },
    { title: "PTVA's YouTube Channel", href: 'https://www.youtube.com/@ParleTilakVidyalayaAssociation' },
    { title: 'e-ShodhSindhu', href: 'https://www.inflibnet.ac.in/ess/' },
    { title: 'e-Books', href: 'https://drive.google.com/drive/folders/19-iYRGgj1Du7RPza2OSMAxO7P0Upb3ZU?usp=sharing' },
    { title: 'London School of Economics Digital Library', href: 'https://digital.library.lse.ac.uk/' },
    { title: 'Indian Journal of Traditional Knowledge (IJTK)', href: 'https://nopr.niscpr.res.in/handle/123456789/43' },
    { title: 'National Digital Library of India (NDLI)', href: 'https://ndl.iitkgp.ac.in/' },
    { title: 'United Nations Digital Library (UNDL)', href: 'https://digitallibrary.un.org/?ln=en' },
    { title: 'Harvard Library', href: 'https://dash.harvard.edu/' },
    { title: 'Indian Knowledge System', href: 'https://iksindia.org/index.php' },
  ],
  ejournals: [
    { title: 'Scientific Research', href: 'https://www.scirp.org/journal/am/' },
    { title: 'Research Journals of Social Science and Management', href: 'http://www.theinternationaljournal.org/ojs/index.php?journal=tij&page=issue&op=current' },
    { title: 'Sage Journals', href: 'https://journals.sagepub.com/home/sgo' },
    { title: 'Economic and Political Weekly', href: 'https://www.epw.in/' },
    { title: 'International Journal of Economics and Finance', href: 'http://www.ccsenet.org/journal/index.php/ijef' },
    { title: 'Economics e-Journal', href: 'http://www.economics-ejournal.org/' },
    { title: 'Mathematics', href: 'http://www.rroij.com/statistics-and-mathematical-sciences.php' },
    { title: 'Journal of Brand Management', href: 'https://www.palgrave.com/in/journal/41262' },
    { title: 'Journal of Accounting & Marketing', href: 'https://www.omicsonline.org/accounting-marketing.php' },
    { title: 'Indian Law Journal', href: 'http://www.indialawjournal.org/' },
    { title: 'Environmental Studies', href: 'http://www.environmentaljournal.org/environmental-journal.shtml' },
    { title: 'Indian Journal of Finance', href: 'http://www.indianjournaloffinance.co.in/' },
    { title: 'Data Quest', href: 'https://www.dqindia.com/' },
    { title: 'Express Computers', href: 'https://www.expresscomputer.in/' },
  ],
  rbi: [
    { title: 'Weekly Statistical Supplement', href: 'https://www.rbi.org.in/scripts/BS_ViewWSS.aspx' },
    { title: 'RBI Bulletin', href: 'https://www.rbi.org.in/scripts/BS_ViewBulletin.aspx' },
    { title: 'Monetary and Credit Policy', href: 'https://rbi.org.in/Scripts/Annualpolicy.aspx' },
    { title: 'RBI Notifications', href: 'https://rbi.org.in/Scripts/NotificationUser.aspx' },
    { title: 'RBI Press Release', href: 'https://www.rbi.org.in/scripts/bs_pressreleasedisplay.aspx' },
    { title: 'RBI Speeches', href: 'https://www.rbi.org.in/scripts/bs_viewspeeches.aspx' },
    { title: 'RBI Annual Report', href: 'https://rbi.org.in/Scripts/AnnualReportMainDisplay.aspx' },
    { title: 'Credit Information Review', href: 'https://www.rbi.org.in/scripts/MonthlyPublications.aspx?head=Monetary%20and%20Credit%20Information%20Review' },
    { title: 'Report on Trend and Progress of Banking in India', href: 'https://www.rbi.org.in/scripts/AnnualPublications.aspx?head=Trend%20and%20Progress%20of%20Banking%20in%20India' },
  ],
  ebooks: [
    { title: 'ई साहित्य प्रतिष्ठान', href: 'http://www.esahity.com/' },
    { title: 'PDFDRIVE', href: 'https://www.pdfdrive.com/' },
    { title: 'India Reference Annual', href: 'https://smartprep.in/wp-content/uploads/2019/05/India-Year-Book-2019.pdf' },
    { title: 'Bookboon', href: 'https://bookboon.com/' },
    { title: 'Directory of Open Access Books (DOAB)', href: 'https://www.doabooks.org/' },
    { title: 'Springer Open Books', href: 'https://www.springeropen.com/books' },
    { title: 'OAPEN Open Access', href: 'http://www.oapen.org/home?brand=oapen' },
    { title: 'Google Books', href: 'https://books.google.co.in/?hl=en' },
    { title: 'American Library (Internet Archive)', href: 'https://archive.org/details/americana' },
    { title: 'Project Gutenberg', href: 'http://www.gutenberg.org/' },
  ],
  databases: [
    { title: 'ERIC – Journals Database', href: 'https://eric.ed.gov/' },
    { title: 'Data.gov.in', href: 'https://data.gov.in/' },
  ],
  rare: [
    { title: 'Maharashtra Rajya Sahitya Ani Sanskruti Mandal', href: 'https://sahitya.marathi.gov.in/इ-बुक-डाउनलोड/' },
    { title: 'Rare Books Society of India', href: 'https://www.rarebooksocietyofindia.org' },
    { title: 'Durmil Grantha (Rare Books Collection)', href: 'http://rmvs.maharashtra.gov.in/DurmilGrantha.html' },
  ],
  newspapersNational: [
    { title: 'THE HINDUSTAN TIMES', href: 'http://paper.hindustantimes.com/epaper/viewer.aspx' },
    { title: 'THE TIMES GROUP e-NEWSPAPER', href: 'https://epaper.timesgroup.com/TOI/TimesOfIndia/index.html?a=c#' },
    { title: 'FINANCIAL EXPRESS', href: 'http://epaper.financialexpress.com/' },
    { title: 'INDIAN EXPRESS', href: 'http://epaper.indianexpress.com/' },
    { title: 'LOKSATTA (Marathi)', href: 'https://epaper.loksatta.com/' },
    { title: 'LOKMAT (Marathi)', href: 'http://epaperlokmat.in/' },
    { title: 'SAKAL (Marathi)', href: 'http://epaper.esakal.com/FlashClient/Client_Panel.aspx#currPage=1' },
    { title: 'SAMANA (Marathi)', href: 'http://epaper.saamana.com/' },
    { title: 'NAVAKAL (Marathi)', href: 'http://www.navakal.org/' },
  ],
  newspapersInternational: [
    { title: 'NEW YORK TIMES', href: 'https://www.nytimes.com/' },
    { title: 'DAWN', href: 'https://epaper.dawn.com/' },
    { title: 'THE GUARDIAN', href: 'https://www.theguardian.com/media/free-newspapers' },
  ],
};

const ResourceList = ({ items }: { items: { title: string; href: string }[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {items.map((res, i) => (
      <a
        key={i}
        href={res.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-xl group transition-colors border border-gray-100 hover:border-green-200"
      >
        <span className="font-semibold text-sm text-gray-700 group-hover:text-[#014d4e] transition-colors line-clamp-2">
          {res.title}
        </span>
        <ExternalLink size={16} className="text-gray-400 group-hover:text-[#008e59] transition-colors shrink-0 ml-4" />
      </a>
    ))}
  </div>
);

export default function LibraryEResourcesPage() {
  const [activeTab, setActiveTab] = useState('main');
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
        <span>E-RESOURCES</span>
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
              {sidebarLinks.map((link, i) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={i}
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
                    <span className="flex-1">{link.label}</span>
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
          {libraryNav.map((item, i) => (
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
          ))}
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

        {/* Desktop Sidebar Nav */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-2 sticky top-24 self-start">
          <div className="bg-[#014d4e] text-white font-bold px-4 py-3 rounded-t-xl shadow-md">
            E-RESOURCES
          </div>
          <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 flex flex-col p-2 gap-1">
            {sidebarLinks.map((link, i) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setActiveTab(link.id);
                    const el = document.getElementById('content-area');
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 140;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left group ${
                    isActive 
                      ? 'bg-green-50 text-[#008e59] border-l-4 border-[#008e59]' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#014d4e] border-l-4 border-transparent'
                  }`}
                >
                  {link.label}
                  <ChevronRight size={16} className={isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        <div id="content-area" className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
            
            <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100 uppercase">
              {sidebarLinks.find(s => s.id === activeTab)?.label}
            </h1>

            {activeTab === 'main' && <ResourceList items={data.main} />}
            {activeTab === 'ejournals' && <ResourceList items={data.ejournals} />}
            {activeTab === 'rbi' && <ResourceList items={data.rbi} />}
            {activeTab === 'ebooks' && <ResourceList items={data.ebooks} />}
            {activeTab === 'databases' && <ResourceList items={data.databases} />}
            {activeTab === 'rare' && <ResourceList items={data.rare} />}
            
            {activeTab === 'newspapers' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-[#014d4e] mb-4">NATIONAL e-NEWSPAPER</h3>
                  <ResourceList items={data.newspapersNational} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#014d4e] mb-4">INTERNATIONAL e-NEWSPAPER</h3>
                  <ResourceList items={data.newspapersInternational} />
                </div>
              </div>
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
