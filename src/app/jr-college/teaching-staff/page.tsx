'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mail, BookOpen, Clock, Info, GraduationCap, Building2, UserCircle } from 'lucide-react';
import Link from 'next/link';

const jrCollegeNav = [
  { label: 'HOME', active: false, href: '/junior-college-corner' },
  { label: "VICE PRINCIPAL'S DESK", href: '/jr-college/vice-principal' },
  { label: 'TEACHING STAFF', active: true, href: '/jr-college/teaching-staff' },
  { label: 'RESULT ANALYSIS', href: '/jr-college/result-analysis' },
  { label: 'SMAF / SCHOLARSHIP', href: '/jr-college/scholarships' },
  { label: 'NOTICE', href: '/jr-college/notice' },
  { label: 'TIMETABLE', href: '/jr-college/timetable' },
  { label: 'SPORTS', href: '/jr-college/sports' },
  { label: 'CULTURAL', href: '/jr-college/cultural' },
  { label: 'COMMITTEE', href: '/jr-college/committee' },
  { label: 'SPECIAL DAYS', href: '/jr-college/special-days' },
];

const staffData = {
  "Mathematics and Statistics": [
    {
      name: "Mr. Milind W. Patil",
      designation: "Vice Principal",
      education: "M.Sc. B.Ed. MSACIT",
      email: "mwpatil71@gmail.com",
      experience: "31 yrs",
      about: "Worked as Examiner, Moderator, Chief Moderator, Paper setter, Translator, Scrutineer, Subject Expert for HSC Board Exams, Co-author for X, XI, XII Govt Text Books of Mathematics and BOS Member at Balbharti Pune. Resource person for XI and XII New syllabuses."
    },
    {
      name: "Mr. Vilas H.Chaudhari",
      designation: "Assistant Teacher",
      education: "M. Sc. B. Ed.",
      email: "vilaschaudhari70@gmail.com",
      experience: "25 yrs",
      about: "Worked as Examiner for HSC Board Exams."
    },
    {
      name: "Mr. M. V. Lathish",
      designation: "Assistant Teacher",
      education: "M Sc B. Ed",
      email: "lathishmvm@yahoo.com",
      experience: "16 yrs",
      about: "Worked as Examiner and Moderator for HSC Board Exams."
    },
    {
      name: "Ms. Sanyuja Shreyas Kurkure",
      designation: "Assistant Teacher",
      education: "M.Sc. B.Ed",
      email: "sanyuja.kurkure@gmail.com",
      experience: "16 yrs",
      about: "Worked as Examiner and Moderator for HSC Board Exams."
    },
    {
      name: "Mr. Advay Ashok salve",
      designation: "Assistant Teacher",
      education: "M. Sc.",
      email: "advay@gmail.com",
      experience: "1 yrs",
      about: ""
    }
  ],
  "Hindi": [
    {
      name: "Mrs.Simali Sahebrao Nikalje",
      designation: "Supervisor",
      education: "M.A., B.Ed.",
      email: "snik25555@gmail.com",
      experience: "30 yrs",
      about: "Worked as Examiner and Moderator for HSC Board Exams."
    },
    {
      name: "Ms. Kalpana G.Talele",
      designation: "Assistant Teacher ( Part Time)",
      education: "M.A. B. Ed",
      email: "kalpana24talele@email.com",
      experience: "27 yrs",
      about: "Worked as Examiner and Moderator for HSC Board Exams."
    }
  ],
  "Sanskrit": [
    {
      name: "Ms. Snehal M. Koli",
      designation: "Assistant Teacher ( Part Time)",
      education: "M. A .",
      email: "snehal@gmail.com",
      experience: "9 yrs",
      about: "Worked as Examiner for HSC Board Exams."
    }
  ],
  "Physical Education": [
    {
      name: "Dr. Ramesh D. Mishra",
      designation: "Assistant Teacher",
      education: "B. Sc. M. P. Ed Ph. D (NET)",
      email: "drrdmishra69@gmail.com",
      experience: "20 yrs",
      about: "Resource person for XI and XII New syllabuses."
    }
  ],
  "Business Economics": [
    {
      name: "Mr. Kailas Baliram Ariwale",
      designation: "Assistant Teacher",
      education: "M.A.B.ED",
      email: "kbarivale@gmail.com",
      experience: "14 yrs",
      about: ""
    },
    {
      name: "Ms. Ruhi Samreen Shaikh",
      designation: "Assistant Teacher",
      education: "M.A. B.Ed",
      email: "ruhisamreenshaikh@gmail.com",
      experience: "1 yrs",
      about: "Worked as examiner for HSC Board examinations"
    },
    {
      name: "Mr. Mandar H. Bhasme",
      designation: "Assistant Teacher",
      education: "M.A. B.Ed",
      email: "mandarhbhasme@gmail.com",
      experience: "8 yrs",
      about: "Worked as examiner for HSC Board examinations"
    }
  ],
  "Marathi": [
    {
      name: "Mr. Chandrakant Anant Waghmode",
      designation: "Assistant Teacher (Part Time)",
      education: "M.A. B.Ed",
      email: "cwaghmode1972@gmail.com",
      experience: "27 yrs",
      about: "Worked as Examiner for HSC Board Exams."
    },
    {
      name: "Mr.Gaurav Sanjay Pawar",
      designation: "Assistant Teacher",
      education: "M.A. B.Ed",
      email: "gp28692@gmail.com",
      experience: "3 yrs",
      about: ""
    }
  ],
  "German": [
    {
      name: "Ms. Nivedita M. Payannavar",
      designation: "Assistant Teacher ( Part Time)",
      education: "M.Com, C2 level Language Proficiency in German language.",
      email: "nivedita@gmail.com",
      experience: "18 yrs",
      about: "Worked as Examiner, Moderator and Paper Setter for HSC Board Exams."
    }
  ],
  "English": [
    {
      name: "Mr.Sudhakar D. Gite",
      designation: "Assistant Teacher",
      education: "M.A.B.Ed",
      email: "sudhakar@gmail.com",
      experience: "29 yrs",
      about: "Worked as Examiner, Moderator, Chief Moderator and Paper setter for HSC Board Exams. Resource person for XI New syllabus."
    },
    {
      name: "Ms. Suvarna Gajendrasingh Rajput",
      designation: "Assistant Teacher",
      education: "M.A B.Ed",
      email: "sonal.rajput1223@gmail.com",
      experience: "21 yrs",
      about: "Worked as Examiner for HSC Board Exams."
    },
    {
      name: "Mr. Bhima Anant Kadali",
      designation: "Assistant Teacher",
      education: "M.A. B Ed",
      email: "bhima.kadali@gmail.com",
      experience: "17 yrs",
      about: "Worked as Examiner and Moderator for HSC Board Exams."
    }
  ],
  "French": [
    {
      name: "Ms. Manisha Dand",
      designation: "Assistant Teacher ( Part Time)",
      education: "M. Com. , DTL, B1 delf exam passed in French, Diploma in French from Alliance français institute.",
      email: "manisha@gmail.com",
      experience: "14 yrs",
      about: "Worked as Examiner for HSC Board Exams."
    }
  ],
  "Commerce": [
    {
      name: "Mrs. Leena N.Abhyankar",
      designation: "Assistant Teacher",
      education: "M.Com, B.Ed",
      email: "mnsh248@rediffmail.com",
      experience: "25 yrs",
      about: "Worked as examiner and moderator for HSC Board examinations"
    },
    {
      name: "Mr. Rupesh B. Panchal",
      designation: "Assistant Teacher",
      education: "M. Com. B. Ed.",
      email: "rupkumgofficial@gmail.com",
      experience: "15 yrs",
      about: "Worked as Examiner for HSC Board Exams."
    },
    {
      name: "Ms. Anjali Kiran Upadhye",
      designation: "Assistant Teacher",
      education: "Mcom, B.Ed, MBA, SET, MS-ACIT",
      email: "anjaliupadhye6@gmail.com",
      experience: "10 yrs",
      about: "Worked as examiner for HSC Board exanimations"
    },
    {
      name: "Mr. Mangesh Arun Meshram",
      designation: "Assistant Teacher",
      education: "Mcom, B.Ed, SET",
      email: "meshrammangesh668@gmail.com",
      experience: "1 yrs",
      about: ""
    },
    {
      name: "Mr. Sherin Thomas",
      designation: "Assistant Teacher",
      education: "M.Com, B.Ed",
      email: "sherint21@gmail.com",
      experience: "2 yrs",
      about: "Worked as examiner for HSC Board examinations"
    },
    {
      name: "Ms. Sharvari M. Khengare",
      designation: "Assistant Teacher",
      education: "M.Com, B.Ed",
      email: "sharvarikhengare2324@gmail.com",
      experience: "3 yrs",
      about: "Worked as examiner for HSC Board examinations"
    },
    {
      name: "Ms. Saraswathi N. Chettiar",
      designation: "Assistant Teacher ( Part Time)",
      education: "M.Com, B.Ed",
      email: "saraswathichettiar26@gmail.com",
      experience: "8 yrs",
      about: "Worked as examiner for HSC Board examinations"
    }
  ]
};

const subjects = Object.keys(staffData);

function FlipCard({ teacher }: { teacher: any }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full aspect-[54/86] perspective-1000 cursor-pointer max-w-[360px] mx-auto"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex flex-col items-center overflow-hidden transition-shadow duration-300">
          
          {/* Top Blue Header */}
          <div className="w-full h-[18%] bg-[#123B6D] relative flex justify-center shrink-0">
             <div className="absolute -bottom-5 w-[150%] h-[30px] bg-[#123B6D] rounded-[50%] border-b-[3px] border-[#D4A017]"></div>
             <div className="absolute top-2 w-12 h-2 bg-white rounded-full shadow-inner opacity-90"></div>
             <div className="absolute -bottom-5 z-10 w-12 h-12 bg-white rounded-full p-1 shadow-sm flex items-center justify-center border border-[#E2E8F0]">
                 <img src="/mcclogo.png" alt="MCC Logo" className="w-full h-full object-contain rounded-full" />
             </div>
          </div>
          
          {/* Profile Image */}
          <div className="relative mt-8 mb-4 z-10 w-[120px] h-[150px] rounded-lg shadow-md bg-slate-200 overflow-hidden flex items-center justify-center shrink-0 border-2 border-white">
             <img src={`/Jr. teaching staff/${teacher.name}.jpg`} alt={teacher.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
             <UserCircle size={64} className="text-slate-400 hidden absolute" />
          </div>
          
          {/* Text Details */}
          <div className="w-full flex-1 flex flex-col items-center justify-center px-4 pb-6">
            <h3 className="text-[18px] font-bold text-[#123B6D] mb-1.5 leading-tight text-center font-[var(--font-heading)]">
              {teacher.name}
            </h3>
            <p className="text-[#D4A017] text-[10px] font-bold uppercase tracking-widest mb-1.5 text-center">
              {teacher.designation}
            </p>
            <div className="text-[12px] text-gray-800 font-semibold text-center leading-tight">
              {teacher.education}
            </div>
            <div className="absolute bottom-10 w-full flex justify-center z-20 animate-bounce">
              <span className="bg-[#123B6D]/10 text-[#123B6D] text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm border border-[#123B6D]/20 shadow-sm">
                Click to flip
              </span>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="w-full h-[6%] relative overflow-hidden shrink-0 mt-auto">
             <div className="absolute top-1 w-[150%] left-1/2 -translate-x-1/2 h-[30px] bg-[#123B6D] rounded-[50%] border-t-[3px] border-[#D4A017]"></div>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full backface-hidden bg-[#123B6D] text-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.1)] p-4 rotate-y-180 flex flex-col items-center overflow-hidden">
           {/* Same hole punch on the back */}
           <div className="absolute top-2 w-12 h-2 bg-white/20 rounded-full shadow-inner"></div>
           
          <div className="flex flex-col items-center text-center mt-6 mb-3 pb-3 border-b border-white/20 w-full">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-2 shrink-0">
              <BookOpen size={18} className="text-[#D4A017]" />
            </div>
            <h3 className="font-bold text-sm leading-tight text-white/95 mb-0.5">{teacher.name}</h3>
            <p className="text-[9px] text-[#D4A017] tracking-wider uppercase font-bold">{teacher.designation}</p>
          </div>
          
          <div className="space-y-3 flex-1 w-full px-1">
            <div className="flex gap-2">
              <Mail size={12} className="text-white/60 shrink-0 mt-0.5" />
              <p className="text-xs font-medium break-all leading-tight">{teacher.email}</p>
            </div>
            <div className="flex gap-2">
              <Clock size={12} className="text-white/60 shrink-0 mt-0.5" />
              <p className="text-xs"><span className="text-white/60">Experience:</span> {teacher.experience}</p>
            </div>
            {teacher.about && (
              <div className="flex gap-2">
                <Info size={12} className="text-white/60 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-tight text-white/80 line-clamp-6">{teacher.about}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JrCollegeTeachingStaffPage() {
  const [activeSubject, setActiveSubject] = useState(subjects[0]);

  const navScrollRef = useRef<HTMLDivElement>(null);
  const subjScrollRef = useRef<HTMLDivElement>(null);
  const interactTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleInteraction = () => {
    setIsInteracting(true);
    if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
    interactTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 5000);
  };

  useEffect(() => {
    if (isInteracting) return;

    let animationFrameId: number;

    const scrollStep = () => {
      if (window.innerWidth < 1024 && navScrollRef.current) {
        const el = navScrollRef.current;
        if (el.style.scrollBehavior !== 'auto') el.style.scrollBehavior = 'auto';
        el.scrollLeft += 1;
        if (el.scrollLeft >= (el.scrollWidth + 8) / 2) {
          el.scrollLeft = 0;
        }
      }
      if (window.innerWidth < 768 && subjScrollRef.current) {
        const el = subjScrollRef.current;
        if (el.style.scrollBehavior !== 'auto') el.style.scrollBehavior = 'auto';
        el.scrollLeft += 1;
        if (el.scrollLeft >= (el.scrollWidth + 8) / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* HEADER */}
      <div className="bg-[#123B6D] pt-12 pb-24">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Building2 className="text-white w-6 h-6" />
              </div>
              <span className="text-white/80 font-semibold tracking-wider text-sm uppercase">
                Junior College Corner
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">
              Teaching Staff
            </h1>
            <p className="text-white/70 max-w-xl text-lg">
              Meet our dedicated faculty members across various departments.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12 -mt-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* NAVIGATION SIDEBAR */}
          <div className="w-full lg:w-[280px] shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-2 lg:p-4 overflow-hidden relative">
              <h2 className="hidden lg:block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">
                Quick Links
              </h2>
              
              {/* Mobile Auto-Slider */}
              <div 
                ref={navScrollRef}
                onTouchStart={handleInteraction}
                onMouseDown={handleInteraction}
                onWheel={handleInteraction}
                className="lg:hidden flex overflow-x-auto no-scrollbar gap-2 items-center"
                style={{ scrollBehavior: 'auto' }}
              >
                {[...jrCollegeNav, ...jrCollegeNav].map((link, idx) => (
                  <Link
                    key={`${link.label}-${idx}`}
                    href={link.href}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between group whitespace-nowrap shrink-0 ${
                      link.active
                        ? 'bg-[#123B6D] text-white shadow-md shadow-[#123B6D]/20'
                        : 'text-[#64748B] bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Desktop Vertical */}
              <div className="hidden lg:flex flex-col gap-2">
                {jrCollegeNav.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between group whitespace-nowrap shrink-0 ${
                      link.active
                        ? 'bg-[#123B6D] text-white shadow-md shadow-[#123B6D]/20'
                        : 'text-[#64748B] hover:bg-gray-50 hover:text-[#123B6D]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden flex flex-col md:flex-row">
            
            {/* Subjects Sidebar */}
            <div className="w-full md:w-[240px] border-b md:border-b-0 md:border-r border-[#E2E8F0] bg-gray-50/50 flex flex-col overflow-hidden relative">
              <h2 className="hidden md:block p-4 md:p-5 font-bold text-[#1E293B] border-b border-[#E2E8F0] bg-white text-sm uppercase tracking-wider shrink-0">
                Departments
              </h2>
              
              {/* Mobile Auto-Slider */}
              <div 
                ref={subjScrollRef}
                onTouchStart={handleInteraction}
                onMouseDown={handleInteraction}
                onWheel={handleInteraction}
                className="md:hidden flex overflow-x-auto no-scrollbar gap-2 p-2 items-center bg-white/60"
                style={{ scrollBehavior: 'auto' }}
              >
                {[...subjects, ...subjects].map((sub, idx) => (
                  <button
                    key={`${sub}-${idx}`}
                    onClick={() => setActiveSubject(sub)}
                    className={`text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      activeSubject === sub
                        ? 'bg-[#123B6D] text-white shadow-sm'
                        : 'text-[#64748B] bg-white border border-[#E2E8F0]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
              
              {/* Desktop Vertical */}
              <div className="hidden md:flex flex-col p-2">
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubject(sub)}
                    className={`text-left px-4 py-3 text-sm font-semibold border-b border-transparent last:border-0 rounded-none transition-colors whitespace-nowrap shrink-0 ${
                      activeSubject === sub
                        ? 'bg-[#123B6D] text-white border-l-4 border-l-[#D4A017]'
                        : 'text-[#64748B] border-[#E2E8F0] hover:bg-white hover:text-[#1E293B]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Teachers Grid */}
            <div className="flex-1 p-6 md:p-8 bg-slate-50/50">
              <div className="mb-6 flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <h3 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">
                  {activeSubject}
                </h3>
                <span className="text-sm font-medium text-[#64748B] bg-white px-3 py-1 rounded-full border border-[#E2E8F0]">
                  {staffData[activeSubject as keyof typeof staffData].length} Teachers
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {staffData[activeSubject as keyof typeof staffData].map((teacher, idx) => (
                  <FlipCard key={idx} teacher={teacher} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Global CSS for 3D Flip */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
}
