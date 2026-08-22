'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LibraryNav from '@/components/library/LibraryNav';

const sidebarLinks = [
  { id: 'librarian', label: 'LIBRARIAN PROFILE' },
  { id: 'clerk', label: 'LIBRARY CLERK' },
  { id: 'attendant', label: 'LIBRARY ATTENDANT PROFILE' },
];

const StaffCard = ({ name, designation, qualification, category, imageSrc }: {
  name: string;
  designation: string;
  qualification: string;
  category?: string;
  imageSrc?: string;
}) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
    {/* Photo */}
    <div className="w-32 h-36 rounded-xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center mb-4 overflow-hidden shadow-sm">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          width={128}
          height={144}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <>
          <User size={40} className="text-gray-400" />
          <span className="text-[10px] text-gray-400 mt-1 px-2 text-center leading-tight">{name}</span>
        </>
      )}
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
                <h1 className="text-2xl font-bold text-[#123B6D] mb-8 pb-2 border-b-2 border-gray-100">I/C LIBRARIAN</h1>
                <div className="flex justify-center">
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 flex flex-col items-center text-center max-w-xs w-full">
                    <div className="w-40 h-44 rounded-xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center mb-4 overflow-hidden shadow-sm">
                      <Image
                        src="/library photos/Mr. Amey Ranade.jpeg"
                        alt="Mr. Amey P. Ranade"
                        width={160}
                        height={176}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <h3 className="font-bold text-[#123B6D] text-lg mt-2">Mr. Amey P. Ranade</h3>
                    <p className="text-[#008e59] font-semibold text-sm mt-1">I/C Librarian</p>
                    <p className="text-gray-500 text-xs mt-1">MLISc, UGC-NET, PG Diploma in Journalism &amp; Mass Communication</p>
                    <p className="text-gray-400 text-xs mt-2 italic">Mulund College of Commerce</p>
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
                      imageSrc="/library photos/MR. RAKESH GOSAVI.png"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#014d4e] mb-4 flex items-center gap-2">
                    <span className="w-2 h-5 bg-blue-500 rounded-full inline-block"></span>
                    Self-Finance Library Staff
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StaffCard
                      name="Mr. Prashant Dattatray Kamble"
                      designation="Library Clerk"
                      qualification="B.A., MLISc., UGC-NET"
                      category="Self-Finance Library Staff"
                      imageSrc="/library photos/MR. PRASHANT KAMBLE.png"
                    />
                    <StaffCard
                      name="Mr. Vinay V. Satpurkar"
                      designation="Library Clerk"
                      qualification="H.S.C."
                      category="Self-Finance Library Staff"
                      imageSrc="/library photos/MR. VINAY SATPURKAR.png"
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
                    <StaffCard
                      name="Mr. Ghanshyam Patil"
                      designation="Library Attendant"
                      qualification="H.S.C."
                      category="Aided Library Staff"
                      imageSrc="/library photos/MR. GHANSHYAM PATIL.png"
                    />
                    <StaffCard
                      name="Mr. Vijaysing Patil"
                      designation="Library Attendant"
                      qualification="B.Com."
                      category="Aided Library Staff"
                      imageSrc="/library photos/MR. VIJAYSING TANSING PATIL.png"
                    />
                    <StaffCard
                      name="Mr. Sachin Kamble"
                      designation="Library Attendant"
                      qualification="B.A., MLISc., UGC-NET"
                      category="Aided Library Staff"
                      imageSrc="/library photos/MR. SACHIN KAMBLE.png"
                    />
                    <StaffCard
                      name="Mr. Dipak Chougule"
                      designation="Library Attendant"
                      qualification="H.S.C."
                      category="Aided Library Staff"
                      imageSrc="/library photos/Mr. Dipak Chougule.jpg"
                    />
                    <StaffCard
                      name="Mrs. Suvarna Bhangre"
                      designation="Library Attendant"
                      qualification=""
                      category="Aided Library Staff"
                      imageSrc="/library photos/SUVARNA BHANGRE.jpeg"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#014d4e] mb-4 flex items-center gap-2">
                    <span className="w-2 h-5 bg-blue-500 rounded-full inline-block"></span>
                    Self-Finance Library Staff
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StaffCard
                      name="Mr. Santosh Shinde"
                      designation="Library Peon"
                      qualification="S.S.C."
                      category="Self-Finance Library Staff"
                      imageSrc="/library photos/MR. SANTOSH SHINDE.png"
                    />
                    <StaffCard
                      name="Mr. Nilesh Moyanak"
                      designation="Library Peon"
                      qualification="H.S.C."
                      category="Self-Finance Library Staff"
                      imageSrc="/library photos/MR. NILESH MOYANAK.png"
                    />
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
