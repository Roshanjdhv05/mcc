'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { University, User, GraduationCap, Calendar, BookOpen, Clock, Users, Database, Shield, PenTool, ExternalLink, Mail, Phone, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const libraryNav = [
  { label: 'HOME', href: '/library' },
  { label: 'ABOUT US', href: '/library/about-us' },
  { label: 'WEB OPAC', href: '#' },
  { label: 'E-RESOURCES', href: '/library/e-resources' },
  { label: 'STAFF PROFILE', active: true, href: '/library/staff-profile' },
  { label: 'DOWNLOAD', href: '#' },
  { label: 'RESEARCH - KIT', href: '/library/research-kit' },
  { label: 'I. R.', href: 'https://drive.google.com/drive/folders/1bes4sOXN9ePGCVSgdTQ2ZtPg-pYQWyju?usp=drive_link' },
  { label: 'IMPORTANT LINKS', href: '/library/important-links' },
  { label: 'FEEDBACK', href: '#' },
  { label: 'CONTACT US', href: '/library/contact-us' },
];

const sidebarLinks = [
  { id: 'librarian', label: 'LIBRARIAN PROFILE' },
  { id: 'asst-librarian', label: 'ASST. LIBRARIAN PROFILE' },
  { id: 'clerk', label: 'LIBRARY CLERK' },
  { id: 'attendant', label: 'LIBRARY ATTENDANT PROFILE' },
];

const StaffCard = ({ name, designation, qualification, category, imagePlaceholder }: {
  name: string;
  designation: string;
  qualification: string;
  category?: string;
  imagePlaceholder: string;
}) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
    {/* Image Placeholder */}
    <div className="w-32 h-36 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center mb-4 overflow-hidden">
      <User size={40} className="text-gray-400" />
      <span className="text-[10px] text-gray-400 mt-1 px-2 text-center leading-tight">{imagePlaceholder}</span>
    </div>
    {category && (
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide mb-2 ${
        category === 'Aided Library Staff' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-blue-100 text-blue-700'
      }`}>{category}</span>
    )}
    <h3 className="font-bold text-[#123B6D] text-base">{name}</h3>
    <p className="text-[#008e59] font-semibold text-sm mt-1">{designation}</p>
    <p className="text-gray-500 text-xs mt-1 leading-snug">{qualification}</p>
  </div>
);

export default function StaffProfilePage() {
  const [activeTab, setActiveTab] = useState('librarian');
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
        <span>STAFF PROFILE</span>
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

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-2 sticky top-24 self-start">
          <div className="bg-[#014d4e] text-white font-bold px-4 py-3 rounded-t-xl shadow-md">
            STAFF PROFILE
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

        {/* Content */}
        <div id="content-area" className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px]">

            {/* LIBRARIAN */}
            {activeTab === 'librarian' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-8 pb-2 border-b-2 border-gray-100">LIBRARIAN PROFILE</h1>
                <div className="flex justify-center">
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 flex flex-col items-center text-center max-w-xs w-full">
                    <div className="w-40 h-44 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center mb-4">
                      <User size={48} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400 mt-2">Librarian Photo</span>
                    </div>
                    <h3 className="font-bold text-[#123B6D] text-lg mt-2">Librarian</h3>
                    <p className="text-[#008e59] font-semibold text-sm mt-1">Mulund College of Commerce</p>
                    <p className="text-gray-400 text-xs mt-2 italic">Profile details to be updated</p>
                  </div>
                </div>
              </>
            )}

            {/* ASSISTANT LIBRARIAN */}
            {activeTab === 'asst-librarian' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-8 pb-2 border-b-2 border-gray-100">ASSISTANT LIBRARIAN PROFILE</h1>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center">
                    <StaffCard
                      name="Mr. Amey P. Ranade"
                      designation="Assistant Librarian"
                      qualification="MLISc, UGC-NET, PG Diploma in Journalism & Mass Communication"
                      imagePlaceholder="AMEY P. RANADE"
                    />
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-[#014d4e] font-bold text-lg mb-4">Professional Profile</h3>
                    <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
                      <li>Assistant Librarian, Mulund College of Commerce, Mulund.</li>
                      <li>Completed Master of Library and Information Science (MLISc) in June 2007 from Karmaveer Bhaurao Patil College, Pune.</li>
                      <li>Completed Bachelor of Arts (B.A.) in June 2002 from Ramnarain Ruia College, Mumbai.</li>
                      <li>Presented research papers at various national conferences.</li>
                      <li>Visiting faculty for Library and Information Science courses at Bharati Vidyapeeth.</li>
                      <li>Graded Casual Announcer at Prasar Bharati – All India Radio, Mumbai.</li>
                      <li>Compered various concerts and stage shows across India.</li>
                    </ol>
                  </div>
                </div>
              </>
            )}

            {/* LIBRARY CLERK */}
            {activeTab === 'clerk' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-8 pb-2 border-b-2 border-gray-100">LIBRARY CLERK</h1>

                <div className="mb-8">
                  <h2 className="text-lg font-bold text-[#014d4e] mb-4 flex items-center gap-2">
                    <span className="w-2 h-5 bg-green-500 rounded-full inline-block"></span>
                    Aided Library Staff
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StaffCard
                      name="Mr. Rakesh Gosavi"
                      designation="Library Clerk"
                      qualification="B.Com., Certificate Course in Library & Information Science"
                      category="Aided Library Staff"
                      imagePlaceholder="RAKESH GOSAVI"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#014d4e] mb-4 flex items-center gap-2">
                    <span className="w-2 h-5 bg-blue-500 rounded-full inline-block"></span>
                    Unaided Library Staff
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StaffCard
                      name="Mr. Prashant Dattatray Kamble"
                      designation="Library Clerk"
                      qualification="B.A., MLISc., UGC-NET"
                      category="Unaided Library Staff"
                      imagePlaceholder="PRASHANT D. KAMBLE"
                    />
                    <StaffCard
                      name="Mr. Vinay V. Satpurkar"
                      designation="Library Clerk"
                      qualification="H.S.C."
                      category="Unaided Library Staff"
                      imagePlaceholder="VINAY V. SATPURKAR"
                    />
                  </div>
                </div>
              </>
            )}

            {/* LIBRARY ATTENDANT */}
            {activeTab === 'attendant' && (
              <>
                <h1 className="text-2xl font-bold text-[#123B6D] mb-8 pb-2 border-b-2 border-gray-100">LIBRARY ATTENDANT PROFILE</h1>

                <div className="mb-8">
                  <h2 className="text-lg font-bold text-[#014d4e] mb-4 flex items-center gap-2">
                    <span className="w-2 h-5 bg-green-500 rounded-full inline-block"></span>
                    Aided Library Staff
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StaffCard name="Mr. Subhash Mahadev Nagrikar" designation="Library Attendant" qualification="S.S.C." category="Aided Library Staff" imagePlaceholder="SUBHASH M. NAGRIKAR" />
                    <StaffCard name="Mr. Ghanshyam Patil" designation="Library Attendant" qualification="H.S.C." category="Aided Library Staff" imagePlaceholder="GHANSHYAM PATIL" />
                    <StaffCard name="Mr. Vijaysing Patil" designation="Library Attendant" qualification="B.Com." category="Aided Library Staff" imagePlaceholder="VIJAYSING PATIL" />
                    <StaffCard name="Mr. Sachin Kamble" designation="Library Attendant" qualification="B.A., MLISc., UGC-NET" category="Aided Library Staff" imagePlaceholder="SACHIN KAMBLE" />
                    <StaffCard name="Mr. Dipak Chougule" designation="Library Attendant" qualification="H.S.C." category="Aided Library Staff" imagePlaceholder="DIPAK CHOUGULE" />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#014d4e] mb-4 flex items-center gap-2">
                    <span className="w-2 h-5 bg-blue-500 rounded-full inline-block"></span>
                    Unaided Library Staff
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StaffCard name="Mr. Santosh Shinde" designation="Library Peon" qualification="S.S.C." category="Unaided Library Staff" imagePlaceholder="SANTOSH SHINDE" />
                    <StaffCard name="Mr. Nilesh Moyanak" designation="Library Peon" qualification="H.S.C." category="Unaided Library Staff" imagePlaceholder="NILESH MOYANAK" />
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
