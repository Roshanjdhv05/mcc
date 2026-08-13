'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LibraryNav from '@/components/library/LibraryNav';

const sidebarLinks = [
  { id: 'mission', label: 'LIBRARY MISSION' },
  { id: 'intro', label: 'LIBRARY INTRODUCTION' },
  { id: 'committee', label: 'LIBRARY ADVISORY COMMITTEE' },
  { id: 'collections', label: 'TOTAL LIBRARY COLLECTION' },
  { id: 'print', label: 'SUBSCRIBE PRINT JOURNALS' },
  { id: 'news', label: 'SUBSCRIBE NEWS PAPERS' },
  { id: 'sections', label: 'SECTION IN THE LIBRARY' },
  { id: 'services', label: 'LIBRARY SERVICES AND FACILITIES' },
  { id: 'rules', label: 'LIBRARY RULES AND REGULATIONS' },
  { id: 'timing', label: 'LIBRARY TIMING SCHEDULE' },
];

export default function LibraryAboutPage() {
  const [activeTab, setActiveTab] = useState('mission');
  const [activeMobile, setActiveMobile] = useState<boolean>(true);
  const [showSticky, setShowSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setShowSticky(false);
      } else if (currentScrollY < lastScrollY) {
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
      <LibraryNav />

      {/* Main Content Area */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* MOBILE: Categories dropdown bar */}
        <div className="lg:hidden mb-4 relative">
          <AnimatePresence>
            {showSticky && (
              <motion.div
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-28 left-0 w-full z-30 px-4"
              >
                {renderMobileDropdown(true)}
              </motion.div>
            )}
          </AnimatePresence>
          {renderMobileDropdown(false)}
        </div>

        {/* Desktop Sidebar Nav */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-2 sticky top-24 self-start">
          <div className="bg-[#014d4e] text-white font-bold px-4 py-3 rounded-t-xl shadow-md">
            ABOUT US
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
            
            {activeTab === 'mission' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">LIBRARY MISSION</h1>
                <div className="prose max-w-none text-gray-700 text-lg leading-relaxed flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="font-semibold text-[#014d4e] mb-4">|| आ नो भद्रा: क्रतवो यन्तु विश्वत: ||</p>
                  <p className="italic text-gray-600">Let noble thoughts come to us from all sides.</p>
                </div>
              </>
            )}

            {activeTab === 'intro' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">LIBRARY INTRODUCTION</h1>
                <div className="prose max-w-none text-gray-700 space-y-4 text-sm leading-relaxed">
                  <p>
                    Established in 1970, the Library of <strong className="text-[#014d4e]">Parle Tilak Vidyalaya Association's Mulund College of Commerce</strong> has been an integral part of the institution's academic journey for over five decades. Since its inception, the library has been committed to supporting teaching, learning, research, and lifelong learning by providing quality information resources and modern library services.
                  </p>
                  <p>
                    The college was inaugurated on <strong className="text-[#014d4e]">31st May 1970</strong> by <strong className="text-[#014d4e]">Shri M. A. Vairale</strong>, the then Maharashtra Minister for Building, Communication and Tourism. The foundation of the library was laid by the first Librarian, <strong className="text-[#014d4e]">Mr. P. R. Bhurke</strong>, who systematically organized and developed the newly established library into a valuable academic resource under the esteemed leadership of Founder Principal Mr.B.G.Bapat.
                  </p>
                  <p>
                    Today, the library has evolved into a modern knowledge and learning centre that seamlessly integrates traditional resources with digital technologies. It houses a rich collection of books, journals, reference materials, and electronic resources while offering innovative, technology-enabled services to meet the diverse academic and research needs of students, faculty members, and researchers.
                  </p>
                  <p>
                    The library continuously strives to promote reading, research, and academic excellence through a wide range of user-centric services and initiatives, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Digitization of the College Magazine covering the last 55 years.</li>
                    <li>University of Mumbai Ph.D. Research Centre for Business Economics located within the library.</li>
                    <li>DrillBit Plagiarism Detection Software for research support.</li>
                    <li>QR Code-based access to previous years' university question papers.</li>
                    <li>Fully automated library management using <strong className="text-[#014d4e]">KOHA Open Source Integrated Library System</strong>.</li>
                    <li>Automated library attendant system for faculty members and students.</li>
                    <li>Subscription to the <strong className="text-[#014d4e]">J-Gate</strong> database for scholarly resources.</li>
                    <li>QR Code-based Audio Library for visually challenged users in collaboration with <strong className="text-[#014d4e]">Team Vision Foundation</strong>.</li>
                    <li>Institutional Repository comprising audio and video lectures delivered by faculty members.</li>
                    <li>Periodical Contents Service for keeping users updated with current literature.</li>
                    <li>Special assistance and information support for students participating in inter-collegiate competitions.</li>
                    <li>Annual organization of <strong className="text-[#014d4e]">Wachan Prerana Din</strong> and <strong className="text-[#014d4e]">Wachan Pandharvada</strong> as per the Government of Maharashtra's reading promotion initiatives.</li>
                    <li>Book Bank Scheme for economically deserving students.</li>
                    <li>Availability of old syllabus documents for alumni and students seeking admission abroad.</li>
                    <li>Efficient book circulation and reference services to support academic and research activities.</li>
                  </ul>
                  <p className="mt-4">
                    With a strong commitment to innovation, accessibility, and academic excellence, the Mulund College of Commerce Library continues to transform itself into a vibrant knowledge hub, empowering learners, educators, and researchers through quality resources, technology-enabled services, and a culture of reading and lifelong learning.
                  </p>
                </div>
              </>
            )}

            {activeTab === 'committee' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">LIBRARY ADVISORY COMMITTEE</h1>
                <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 overflow-hidden">
                  <ul className="space-y-4 text-sm text-gray-700">
                    <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-3">
                      <span className="font-semibold text-[#123B6D]">Dr. Minal Mapuskar (Principal)</span>
                      <span className="text-[#008e59] font-medium">President</span>
                    </li>
                    <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-3">
                      <span className="font-semibold text-[#123B6D]">Dr. Pramila D’souza (Assistant Professor)</span>
                      <span className="text-[#008e59] font-medium">Chairperson</span>
                    </li>
                    <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-3">
                      <span className="font-semibold text-[#123B6D]">Mr. Amey Ranade (I/C Librarian)</span>
                      <span className="text-[#008e59] font-medium">Secretary</span>
                    </li>
                    <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-3">
                      <span className="font-semibold text-[#123B6D]">Dr. Vaishnavi Assar (Assistant Professor)</span>
                      <span className="text-gray-600 font-medium">Member</span>
                    </li>
                    <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-3">
                      <span className="font-semibold text-[#123B6D]">Ms. Swapna Acharya (Assistant Professor)</span>
                      <span className="text-gray-600 font-medium">Member</span>
                    </li>
                    <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-3">
                      <span className="font-semibold text-[#123B6D]">Mr. B. A. Kadali (Junior College Teacher)</span>
                      <span className="text-gray-600 font-medium">Member</span>
                    </li>
                    <li className="flex flex-col md:flex-row md:items-center justify-between">
                      <span className="font-semibold text-[#123B6D]">Mrs. N. M. Payannavar (Junior College Teacher)</span>
                      <span className="text-gray-600 font-medium">Member</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'collections' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">TOTAL LIBRARY COLLECTION</h1>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse rounded-xl overflow-hidden shadow-sm">
                    <thead className="bg-[#014d4e] text-white">
                      <tr>
                        <th className="px-6 py-4 font-semibold w-24 text-center">SR. NO.</th>
                        <th className="px-6 py-4 font-semibold">TYPE OF COLLECTION</th>
                        <th className="px-6 py-4 font-semibold text-right">TITLE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { no: 1, type: "ARTICLES", title: "52045" },
                        { no: 2, type: "AUDIO CASSETTE", title: "46" },
                        { no: 3, type: "BOOKS", title: "84086" },
                        { no: 4, type: "BOUND VOLUME", title: "811" },
                        { no: 5, type: "COMPACT DISK", title: "609" },
                        { no: 6, type: "PROJECT REPORT", title: "507" },
                        { no: 7, type: "VIDEO CASSETTE", title: "110" },
                      ].map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-center text-gray-500 font-medium">{item.no}</td>
                          <td className="px-6 py-4 font-medium text-gray-700">{item.type}</td>
                          <td className="px-6 py-4 text-right text-[#008e59] font-bold">{item.title}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                      <tr>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4 font-bold text-gray-800 uppercase text-right">Total</td>
                        <td className="px-6 py-4 font-bold text-[#008e59] text-right text-lg">138214</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'print' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">SUBSCRIBE PRINT JOURNALS</h1>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse rounded-xl overflow-hidden shadow-sm">
                    <thead className="bg-[#014d4e] text-white">
                      <tr>
                        <th className="px-6 py-4 font-semibold w-24 text-center">SR. NO.</th>
                        <th className="px-6 py-4 font-semibold">TITLE OF PRINT JOURNAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        "AMC Indian Journal of Entrepreneurship", "Arthashastra Indian Journal of Economics & Research", "Bharatiya Shikshan", "Case Folio", "Chronicle", "Competition Success Review (English)", "Digit", "Down To Earth", "Economic and Political Weekly", "Effective Executive", "Electronics For You", "Employment News", "Frontline", "Indian Journal of Finance", "Indian Journal of Marketing", "Indian Journal of Research in Capital Markets", "Journal of Accounting Research & Auditing", "Journal of Bank Management", "Journal of Brand Management", "Journal of Corporat Governance", "Journal of Information Technology", "Journal of Knowledge Management", "Journal of Soft Skill", "Lalit Masik", "Law Review", "Library Herald", "Pc Quest", "Prabandhan : Indian Journal of Management", "Sampada", "Saptahik Sadhana", "Saptahik Sakal", "Southern Economist", "Sport Star", "Udyojak", "University News", "Yojana"
                      ].map((title, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3 text-center text-gray-500 font-medium border-r border-gray-100">{idx + 1}</td>
                          <td className="px-6 py-3 font-medium text-gray-700">{title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'news' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">SUBSCRIBE NEWS PAPERS</h1>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse rounded-xl overflow-hidden shadow-sm">
                    <thead className="bg-[#014d4e] text-white">
                      <tr>
                        <th className="px-6 py-4 font-semibold w-24 text-center">SR. NO.</th>
                        <th className="px-6 py-4 font-semibold">NAME OF NEWS PAPER</th>
                        <th className="px-6 py-4 font-semibold text-right">LANGUAGE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { title: "ECONOMIC TIMES", lang: "English" },
                        { title: "FINANCIAL EXPRESS", lang: "English" },
                        { title: "INDIAN EXPRESS", lang: "English" },
                        { title: "HINDUSTAN TIMES", lang: "English" },
                        { title: "MINT", lang: "English" },
                        { title: "THE HINDU", lang: "English" },
                        { title: "TIMES OF INDIA", lang: "English" },
                        { title: "LOKSATTA", lang: "Marathi" },
                        { title: "MAHARASHTRA TIMES", lang: "Marathi" },
                        { title: "LOKMAT", lang: "Marathi" },
                        { title: "SAKAL", lang: "Marathi" },
                        { title: "NAVBHARAT TIMES", lang: "Hindi" },
                      ].map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3 text-center text-gray-500 font-medium border-r border-gray-100">{idx + 1}</td>
                          <td className="px-6 py-3 font-semibold text-gray-700">{item.title}</td>
                          <td className="px-6 py-3 text-right text-gray-500 italic">{item.lang}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                      <li>Processing Section</li>
                      <li>Research Section</li>
                      <li>UGC Section</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#014d4e] mb-4">Open Access Library</h3>
                    <ul className="space-y-2 text-gray-700 list-disc list-inside">
                      <li>Multi-Purpose Reading Hall</li>
                      <li>Stack Room</li>
                      <li>OPAC Section</li>
                      <li>Issue-Return Section</li>
                    </ul>
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
                      <li>Daily Home lending</li>
                      <li>Free Internet Service</li>
                      <li>Non-text book Service</li>
                      <li>On-line journals facility</li>
                      <li>Reference book Service</li>
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
                      <li>Open Access Library</li>
                      <li>Career corner</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'rules' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">LIBRARY RULES AND REGULATIONS</h1>
                <div className="prose max-w-none text-gray-700 text-sm">
                  <ul className="space-y-2 list-disc list-outside pl-5">
                    <li>Every student entering the library premises should carry a valid Identity Card.</li>
                    <li>The Identity Card must be produced whenever requested by the library staff.</li>
                    <li>Every student and teacher entering the library must scan their ID card barcode using the Library Attendance Tracking System.</li>
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
                      <ul className="list-[circle] list-inside ml-6 mt-1 space-y-1">
                        <li>₹100 for the Identity Card</li>
                        <li>₹100 for the Reader's Ticket</li>
                      </ul>
                    </li>
                    <li>A copy of the Police Complaint must be submitted.</li>
                    <li>Students requiring reference material or information should approach the Librarian.</li>
                    <li>Students must read and strictly follow all instructions displayed on the Library Notice Board.</li>
                    <li>Any violation of library rules will be reported to the Principal for appropriate disciplinary action.</li>
                    <li>Use of Electronic devices such as mobile phones, iPods, and music players are only educational purpose inside the library.</li>
                    <li>For any issue regarding library services or facilities, students should immediately contact the Librarian.</li>
                  </ul>
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
            
          </div>
        </div>

      </div>


    </div>
  );
}
