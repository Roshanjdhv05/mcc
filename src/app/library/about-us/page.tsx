'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { University, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const libraryNav = [
  { label: 'HOME', href: '/library' },
  { label: 'ABOUT US', active: true, href: '/library/about-us' },
  { label: 'WEB OPAC', href: '#' },
  { label: 'E-RESOURCES', href: '/library/e-resources' },
  { label: 'STAFF PROFILE', href: '/library/staff-profile' },
  { label: 'DOWNLOAD', href: '#' },
  { label: 'RESEARCH - KIT', href: '/library/research-kit' },
  { label: 'I. R.', href: 'https://drive.google.com/drive/folders/1bes4sOXN9ePGCVSgdTQ2ZtPg-pYQWyju?usp=drive_link' },
  { label: 'IMPORTANT LINKS', href: '/library/important-links' },
  { label: 'FEEDBACK', href: '#' },
  { label: 'CONTACT US', href: '/library/contact-us' },
];

const sidebarLinks = [
  { id: 'intro', label: 'LIBRARY INTRODUCTION' },
  { id: 'committee', label: 'LIBRARY ADVISORY COMMITTEE', href: 'https://drive.google.com/open?id=1nMV5bLbt7bKSCbyDi1NHP6UVBncSN4wL', external: true },
  { id: 'collections', label: 'LIBRARY COLLECTIONS', href: 'https://drive.google.com/open?id=1aGJ2RoQOOgTnX4AKujBJbh2L6sygE-IS', external: true },
  { id: 'print', label: 'SUBSCRIBE PRINT JOURNALS', href: 'https://drive.google.com/open?id=1ofo5BRQW8Na_TPgojst5kL1zlgnILC7_', external: true },
  { id: 'news', label: 'SUBSCRIBE NEWSPAPERS', href: 'https://drive.google.com/open?id=1VKYrUVzUC9ErkhAlnLzS_hL-wmdQSUFg', external: true },
  { id: 'sections', label: 'SECTION IN THE LIBRARY' },
  { id: 'services', label: 'LIBRARY SERVICES AND FACILITIES' },
  { id: 'rules', label: 'LIBRARY RULES AND REGULATIONS' },
  { id: 'timing', label: 'LIBRARY TIMING SCHEDULE' },
];

export default function LibraryAboutPage() {
  const [activeTab, setActiveTab] = useState('intro');
  const [activeMobile, setActiveMobile] = useState<boolean>(true);
  const [showSticky, setShowSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setNavVisible(false);
        setShowSticky(false);
      } else if (currentScrollY < lastScrollY) {
        setNavVisible(true);
        if (currentScrollY > 300) setShowSticky(true);
      }
      if (currentScrollY <= 300) setShowSticky(false);
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
        <span>ABOUT US</span>
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
                if (link.external) {
                  return (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-3.5 rounded-lg text-sm font-semibold transition-colors text-gray-600 hover:bg-gray-50 hover:text-[#014d4e]"
                    >
                      {link.label}
                      <ChevronRight size={15} className="text-gray-300" />
                    </a>
                  );
                }

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
      <div className={`bg-[#014d4e] w-full shadow-md z-40 sticky transition-all duration-300 ${navVisible ? 'top-16 md:top-[160px] lg:top-[190px] xl:top-[200px]' : 'top-0'}`}>
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
            ABOUT US
          </div>
          <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 flex flex-col p-2 gap-1">
            {sidebarLinks.map((link, i) => {
              if (link.external) {
                return (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-gray-600 hover:bg-gray-50 hover:text-[#014d4e] border-l-4 border-transparent"
                  >
                    {link.label}
                    <ChevronRight size={16} className="opacity-0 hover:opacity-100" />
                  </a>
                );
              }

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
            
            {activeTab === 'intro' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">LIBRARY INTRODUCTION</h1>
                <div className="prose max-w-none text-gray-700 space-y-4 text-sm leading-relaxed">
                  <p>
                    Parle Tilak Vidyalaya Association’s Mulund College of Commerce and Library was established in the year 1970. Shri. M. A. Vairale, Maharashtra Minister for Building Communication and Tourism inaugurated the college on 31st May 1970. Our first Librarian Mr. P. R. Bhurke organized and maintained the newly established library. In the year 1976 – 77 our college library was conducted the first book exhibition in the specious library reading hall. Mr. Ashok Kumar (Dada Muni) Famous cine actor of Indian film industry has visited our book exhibition.
                  </p>
                  <p>
                    Dr. Shekhar Dongre Librarian purchased the first library software LMS (Library Management Software) for library automation. In the month of August 1997 the first library book was issued to the student through the library software. M. C. C. Library also started the facility of computerized journal content in 1997. Mulund College of Commerce library was the first library who has started such innovative type of facility for our students and teachers. Total 23 computers, 3 printers, 1 Reprographic machine, 1 LCD projector, 1 CD and VCD player, 2 Philips audio systems, 1 LED TV for digitize notices, and 1 CRT TV, 2 globe and 1 printer cum scanner, fax machine, 1 Artis portable speaker system are used in the library to control the flow of information. Apart from Library Software, library uses "Library Users Tracking System" to track the flow of library users in the library.
                  </p>
                  <p>
                    Currently M. C. C. library started to record the subject wise audio lectures for students. Student can access these audio lectures from any remote place.
                  </p>
                </div>
              </>
            )}

            {activeTab === 'sections' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">SECTION IN THE LIBRARY</h1>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div>
                    <h3 className="text-lg font-bold text-[#014d4e] mb-4">Main Library</h3>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                      <li>Main Reading Hall</li>
                      <li>Issue-Return Section</li>
                      <li>OPAC Section</li>
                      <li>Internet Section</li>
                      <li>Reference and Periodicals Section</li>
                      <li>Career Corner Section</li>
                      <li>Bound Volumes Section</li>
                      <li>M.Com Accountancy Section</li>
                      <li>MCCE Section</li>
                      <li>Processing Section</li>
                      <li>Research Section</li>
                      <li>UGC Section</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#014d4e] mb-4">Open Access Library</h3>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                      <li>Multi Purpose Reading Hall</li>
                      <li>Stack Room</li>
                      <li>OPAC Section</li>
                      <li>Issue-Return Section</li>
                      <li>Reprography Section</li>
                      <li>Language Lab</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'rules' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">LIBRARY RULES AND REGULATIONS</h1>
                <div className="prose max-w-none text-gray-700 text-sm">
                  <ol className="space-y-2 list-decimal list-inside pl-2">
                    <li>Every student entering the library premises should carry a valid Identity Card.</li>
                    <li>The Identity Card must be produced whenever requested by the library staff.</li>
                    <li>Every student and teacher entering the library must scan their ID Card barcode using the Library Attendance Tracking System.</li>
                    <li>Identity Cards and Reader's Tickets are non-transferable.</li>
                    <li>Students must handle books and other reading materials responsibly.</li>
                    <li>Defacing or tearing book pages will be treated as misconduct and strict action will be taken.</li>
                    <li>Students should inspect books carefully before borrowing them.</li>
                    <li>Borrowers are responsible for any damage or mutilation noticed when returning a book.</li>
                    <li>Only one book is issued per Reader's Ticket for a period of seven days.</li>
                    <li>Reference books, journals, and periodicals are not available for home lending.</li>
                    <li>Books must be returned on or before the due date.</li>
                    <li>A fine of ₹2 per day will be charged for overdue books.</li>
                    <li>If the due date falls on a holiday, the book must be returned on the next working day.</li>
                    <li>If books are not returned immediately after the holiday, the fine will be calculated from the original due date until the return date.</li>
                    <li>Books may be re-issued if there is no demand from other users.</li>
                    <li>Lost books must be replaced, and an additional fine will also be charged.</li>
                    <li>If an Identity Card or Reader's Ticket is lost, a duplicate will be issued after payment of:
                      <ul className="list-[lower-alpha] list-inside ml-6 mt-1 space-y-1">
                        <li>₹100 for the Identity Card</li>
                        <li>₹100 for the Reader's Ticket</li>
                        <li>A copy of the Police Complaint must be submitted.</li>
                      </ul>
                    </li>
                    <li>Students requiring reference material or information should approach the Librarian.</li>
                    <li>Students must read and strictly follow all instructions displayed on the Library Notice Board.</li>
                    <li>Any violation of library rules will be reported to the Principal for appropriate disciplinary action.</li>
                    <li>Electronic devices such as mobile phones, iPods, and music players are strictly prohibited inside the library.</li>
                    <li>For any issue regarding library services or facilities, students should immediately contact the Librarian.</li>
                  </ol>
                </div>
              </>
            )}

            {activeTab === 'timing' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">LIBRARY TIMING SCHEDULE</h1>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="text-[#014d4e] font-bold mb-2">Working Days</h3>
                    <p className="text-gray-700">Monday to Saturday (Except Holidays)</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="text-[#014d4e] font-bold mb-2">Library Timing</h3>
                    <p className="text-gray-700">07:30 AM – 07:30 PM (On all working days)</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="text-[#014d4e] font-bold mb-2">Issue Return Counter Timings</h3>
                    <p className="text-gray-700">08:00 AM – 07:00 PM</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="text-[#014d4e] font-bold mb-2">Reading Room Timings</h3>
                    <p className="text-gray-700">07:30 AM – 07:30 PM</p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'services' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">LIBRARY SERVICES AND FACILITIES</h1>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div>
                    <h3 className="text-lg font-bold text-[#014d4e] mb-4">LIBRARY SERVICES</h3>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                      <li>CD ROM lending service</li>
                      <li>Current awareness service</li>
                      <li>Daily Home lending</li>
                      <li>Free Internet Service</li>
                      <li>Non-text book Service</li>
                      <li>On-line journals facility</li>
                      <li>Reference book Service</li>
                      <li>Referral service</li>
                      <li>Reprographic Service</li>
                      <li>Scholar card facility</li>
                      <li>Selective dissemination of information service</li>
                      <li>Study section Service</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#014d4e] mb-4">LIBRARY FACILITIES</h3>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                      <li>Specious Reading hall</li>
                      <li>Multipurpose open access reading hall</li>
                      <li>Book bank facility</li>
                      <li>Periodical section</li>
                      <li>Language lab</li>
                      <li>Open Access Library</li>
                      <li>Book claim facility</li>
                      <li>Inter library loan facility</li>
                      <li>On-line journals facility</li>
                      <li>Career corner</li>
                      <li>E Book Reader Facility</li>
                    </ul>
                  </div>
                </div>
              </>
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
