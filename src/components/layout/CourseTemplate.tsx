"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Clock, Calendar, Settings, Award, 
  Send, Download, CheckCircle2,
  Building2, Users, GraduationCap, FileText,
  ChevronRight, Lightbulb, Activity, MonitorSmartphone, Target,
  MessagesSquare, Briefcase, UserCircle, BookOpen, Star, Trophy, MapPin
} from 'lucide-react';
import CourseFeeStructure from '@/components/ui/CourseFeeStructure';
import ProgramStructureNEP from '@/components/ui/ProgramStructureNEP';

interface CourseTemplateProps {
  title: string;
  fundingType?: 'Aided' | 'Self Financing' | string;
  introductionContent?: React.ReactNode;
  syllabusContent?: React.ReactNode;
  quickActionsData?: { title: string; icon: any; info: string }[];
  courseKey?: string;
  category?: string;
  facultyData?: { srNo: number; name: string; additionalRole: string; designation: string; email?: string; education?: string; teachingExp?: string; image?: string; department?: string }[];
  festivals?: string;
  publication?: string;
}

function FacultyFlipCard({ member, programmeName }: { member: any, programmeName?: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full aspect-[54/86] perspective-1000 cursor-pointer max-w-[320px] mx-auto"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* FRONT */}
        <div 
          className="absolute w-full h-full bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex flex-col items-center overflow-hidden transition-shadow duration-300"
          style={{ backfaceVisibility: 'hidden' }}
        >
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
             {/* Actual Image with fallback */}
             <img src={member.image || `/teaching staff/${member.name}.jpg`} alt={member.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
             <UserCircle size={64} className="text-slate-400 hidden absolute" />
          </div>
          
          {/* Text Details */}
          <div className="w-full flex-1 flex flex-col items-center justify-center px-4 pb-6">
            <h3 className="text-[18px] font-bold text-[#123B6D] mb-1.5 leading-tight text-center font-[var(--font-heading)]">
              {member.name}
            </h3>
            <p className="text-[#D4A017] text-[10px] font-bold uppercase tracking-widest mb-1.5 text-center">
              {member.designation}
            </p>
            {member.additionalRole && member.additionalRole !== '—' && (
              <div className="text-[12px] text-gray-800 font-semibold text-center leading-tight">
                {member.additionalRole}
              </div>
            )}
            {member.department && (
              <div className="text-[12px] text-[#123B6D] font-bold text-center leading-tight mt-1 px-2">
                Dept: {member.department}
              </div>
            )}
            {programmeName && (
              <div className="text-[11px] text-[#64748B] font-medium text-center leading-tight mt-1.5 px-2">
                {programmeName}
              </div>
            )}
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
        <div 
          className="absolute w-full h-full bg-[#123B6D] text-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.1)] p-4 flex flex-col items-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
           <div className="absolute top-2 w-12 h-2 bg-white/20 rounded-full shadow-inner"></div>
           
          <div className="flex flex-col items-center text-center mt-6 mb-3 pb-3 border-b border-white/20 w-full">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 shrink-0">
              <BookOpen size={20} className="text-[#D4A017]" />
            </div>
            <h3 className="font-bold text-[16px] leading-tight text-white/95 mb-0.5">{member.name}</h3>
            <p className="text-[11px] text-[#D4A017] tracking-wider uppercase font-bold">{member.designation}</p>
          </div>
          
          <div className="space-y-3 flex-1 w-full px-2 overflow-y-auto">
             {member.additionalRole && member.additionalRole !== '—' && (
               <div className="flex items-start gap-3">
                 <span className="text-[#D4A017] text-[11px] font-bold uppercase tracking-wider shrink-0 mt-0.5 w-14">Role</span>
                 <span className="text-[13px] text-white/85 leading-snug">{member.additionalRole}</span>
               </div>
             )}
             {member.education && (
               <div className="flex items-start gap-3">
                 <span className="text-[#D4A017] text-[11px] font-bold uppercase tracking-wider shrink-0 mt-0.5 w-14">Edu.</span>
                 <span className="text-[13px] text-white/85 leading-snug">{member.education}</span>
               </div>
             )}
             {member.email && (
               <div className="flex items-start gap-3">
                 <span className="text-[#D4A017] text-[11px] font-bold uppercase tracking-wider shrink-0 mt-0.5 w-14">Email</span>
                 <span className="text-[12px] text-white/75 leading-snug break-all">{member.email}</span>
               </div>
             )}
             {member.teachingExp && (
               <div className="flex items-start gap-3">
                 <span className="text-[#D4A017] text-[11px] font-bold uppercase tracking-wider shrink-0 mt-0.5 w-14">Exp.</span>
                 <span className="text-[13px] text-white/85 leading-snug">{member.teachingExp}</span>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function CourseTemplate({ title, fundingType, introductionContent, syllabusContent, quickActionsData: customQuickActionsData, courseKey, facultyData, festivals, publication }: CourseTemplateProps) {
  const tabs = [
    'Overview',
    'Structure',
    'Syllabus',
    'Faculty',
    'Illustrious Alumni',
    'Events & Activities',
    ...(festivals ? ['Festivals'] : []),
    ...(publication ? ['Publication'] : []),
    'Industrial Visits'
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isReadMore, setIsReadMore] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const tab = tabs.find(t => slugify(t) === hash);
      if (tab) setActiveTab(tab);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${slugify(tab)}`);
  };

  // Features for the grid (using generic placeholders for consistent UI)
  const features = [
    { icon: Lightbulb, title: 'Creative Learning Environment', bg: 'bg-blue-50', text: 'text-blue-600' },
    { icon: Activity, title: 'Practical Exposure', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { icon: Briefcase, title: 'Internship Opportunities', bg: 'bg-orange-50', text: 'text-orange-600' },
    { icon: MonitorSmartphone, title: 'Digital Media Skills', bg: 'bg-pink-50', text: 'text-pink-600' },
    { icon: MessagesSquare, title: 'Communication Excellence', bg: 'bg-purple-50', text: 'text-purple-600' },
    { icon: Target, title: 'Career Guidance', bg: 'bg-indigo-50', text: 'text-indigo-600' },
  ];

  const quickActionsData = customQuickActionsData || [
    { title: 'Eligibility', icon: Users, info: '10+2 from a recognized board with minimum 50% aggregate marks.' },
    { title: 'Fee Structure', icon: Award, info: '₹35,000 - ₹50,000 per year depending on the specific programme.' },
    { title: 'Timing', icon: Clock, info: 'Morning Session: 7:00 AM to 12:00 PM. Practical slots may vary.' },
    { title: 'Number of Seats', icon: Users, info: '60 to 120 seats per division (subject to university approval).' },
    { title: 'Programme Design', icon: FileText, info: '3-year full-time undergraduate programme divided into 6 semesters.' }
  ];

  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const toggleFlip = (idx: number) => {
    setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const timingInfoStr = quickActionsData.find(q => q.title.toLowerCase().includes('timing') || q.title.toLowerCase().includes('time'))?.info || '07:15 a.m. - 10:51 a.m.';
  const seatsInfoStr = quickActionsData.find(q => q.title.toLowerCase().includes('intake') || q.title.toLowerCase().includes('seat'))?.info || '600 Seats';
  
  const seatMatch = seatsInfoStr.match(/(\d+)/);
  const seatCount = seatMatch ? seatMatch[1] : "TBD";

  const timingMatch = timingInfoStr.match(/([\d:]+)\s*(AM|PM|a\.m\.|p\.m\.)?\s*(?:to|-|–)\s*([\d:]+)\s*(AM|PM|a\.m\.|p\.m\.)?/i);
  let startT = timingInfoStr, startP = "", endT = "", endP = "";
  if (timingMatch) {
     startT = timingMatch[1];
     startP = timingMatch[2] || '';
     endT = timingMatch[3];
     endP = timingMatch[4] || '';
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* 1. Hero Section */}
      <div className="bg-white pb-8 md:pb-16 relative overflow-hidden">
        {/* Soft background blob */}
        <div className="absolute top-0 right-0 w-full h-full bg-[#EBF3FF] rounded-full blur-3xl opacity-40 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 pt-6 md:pt-8 flex flex-col gap-4 md:gap-8 relative">
          
          {/* Breadcrumb - Absolute on Mobile, static on Desktop */}
          <div className="text-[10px] md:text-sm text-gray-500 font-medium tracking-wide w-full truncate">
            Home <span className="mx-1 md:mx-2">{'>'}</span> Programmes <span className="mx-1 md:mx-2">{'>'}</span> <span className="text-[#123B6D]">{title}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start w-full gap-6 md:gap-12">
            
            {/* Left Content */}
            <div className="flex-1 space-y-4 md:space-y-6 z-10 relative">
              
              {/* Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-block bg-[#EBF3FF] text-[#123B6D] text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-wider">
                  Undergraduate Programme
                </div>
                {fundingType && (
                  <div className={`inline-block text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-wider ${
                    fundingType === 'Aided' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {fundingType}
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="relative mt-2">
                <h1 className="text-2xl xs:text-3xl md:text-5xl lg:text-[54px] font-bold text-[#123B6D] leading-tight font-[var(--font-heading)]">
                  {title}
                </h1>
              </div>

              {/* Badges Row - 4 columns on mobile, hidden on desktop since we have floating cards */}
              <div className="grid grid-cols-4 md:hidden gap-2 md:gap-3 pt-4 md:pt-2 overflow-x-auto scrollbar-hide">
                <div className="flex flex-col md:flex-row md:items-center items-center justify-center text-center md:text-left gap-1 md:gap-2 bg-transparent md:bg-[#F8FAFC] border-0 md:border border-[#E2E8F0] rounded-xl px-1 md:px-4 py-1 md:py-2.5">
                  <Clock className="text-[#3B82F6] shrink-0" size={24} strokeWidth={1.5} />
                  <span className="text-[9px] md:text-sm font-bold text-[#1E293B] leading-tight">3 Years<br className="hidden md:block"/><span className="font-medium text-gray-500"> Duration</span></span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center items-center justify-center text-center md:text-left gap-1 md:gap-2 bg-transparent md:bg-[#F8FAFC] border-0 md:border border-[#E2E8F0] rounded-xl px-1 md:px-4 py-1 md:py-2.5">
                  <Calendar className="text-[#10B981] shrink-0" size={24} strokeWidth={1.5} />
                  <span className="text-[9px] md:text-sm font-bold text-[#1E293B] leading-tight">6<br className="hidden md:block"/><span className="font-medium text-gray-500"> Semesters</span></span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center items-center justify-center text-center md:text-left gap-1 md:gap-2 bg-transparent md:bg-[#F8FAFC] border-0 md:border border-[#E2E8F0] rounded-xl px-1 md:px-4 py-1 md:py-2.5">
                  <Settings className="text-[#F59E0B] shrink-0" size={24} strokeWidth={1.5} />
                  <span className="text-[9px] md:text-sm font-bold text-[#1E293B] leading-tight">{quickActionsData.find(q => q.title.toLowerCase().includes('timing') || q.title.toLowerCase().includes('time'))?.info || '07:15 a.m. – 10:51 a.m.'}<br className="hidden md:block"/><span className="font-medium text-gray-500"> Timings</span></span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center items-center justify-center text-center md:text-left gap-1 md:gap-2 bg-transparent md:bg-[#F8FAFC] border-0 md:border border-[#E2E8F0] rounded-xl px-1 md:px-4 py-1 md:py-2.5">
                  <Award className="text-[#8B5CF6] shrink-0" size={24} strokeWidth={1.5} />
                  <span className="text-[9px] md:text-sm font-bold text-[#1E293B] leading-tight">{quickActionsData.find(q => q.title.toLowerCase().includes('intake') || q.title.toLowerCase().includes('seat'))?.info || '600 Seats'}<br className="hidden md:block"/><span className="font-medium text-gray-500"> Intake</span></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row gap-3 pt-4 w-full">
                <a href="https://enrollonline.co.in/Registration/Apply/MCC" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#123B6D] hover:bg-[#0f3059] text-white px-4 md:px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all shadow-md">
                  <Send size={16} /> Apply Now
                </a>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] hover:border-[#123B6D] text-[#1E293B] px-4 md:px-8 py-3 rounded-full text-sm md:text-base font-bold transition-colors">
                  <Download size={16} /> <span className="hidden xs:inline">Download</span> Brochure
                </button>
              </div>
            </div>

            {/* Right Visual Image / Floating Cards (Desktop Only) */}
            <div className="hidden lg:flex flex-1 relative w-full justify-center items-center h-[550px]">
              
              {/* Header Title for Infographic */}
              <div className="absolute top-0 w-full flex items-center justify-center gap-4 z-10">
                 <div className="h-px bg-[#D4A017] w-16"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]"></div>
                 <h3 className="text-sm font-bold tracking-widest text-[#123B6D] uppercase">Programme Snapshot</h3>
                 <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]"></div>
                 <div className="h-px bg-[#D4A017] w-16"></div>
              </div>

              <div className="relative w-[500px] h-[500px] flex items-center justify-center mt-8">
                
                {/* Central Circle (Static) */}
                <div className="absolute z-20 w-[220px] h-[220px] bg-white rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center border-4 border-gray-50/50">
                  <GraduationCap size={40} className="text-[#123B6D] mb-2" strokeWidth={1.5} />
                  <h2 className="text-4xl font-bold text-[#123B6D] text-center px-4 leading-none font-[var(--font-heading)]">
                    {title.split(' ')[0]}
                  </h2>
                  <div className="w-8 h-0.5 bg-[#F59E0B] mt-3"></div>
                </div>

                {/* Rotating Wrapper */}
                <div className="absolute w-full h-full flex items-center justify-center [animation:spin_40s_linear_infinite]">
                  
                  {/* Connecting Ring */}
                  <div className="absolute w-[360px] h-[360px] rounded-full border border-gray-200 z-0"></div>
                  
                  {/* Colored dots on the ring */}
                  <div className="absolute top-[25%] left-[19%] w-2.5 h-2.5 rounded-full bg-[#3B82F6] z-10"></div>
                  <div className="absolute top-[25%] right-[19%] w-2.5 h-2.5 rounded-full bg-[#F59E0B] z-10"></div>
                  <div className="absolute bottom-[25%] left-[19%] w-2.5 h-2.5 rounded-full bg-[#10B981] z-10"></div>
                  <div className="absolute bottom-[25%] right-[19%] w-2.5 h-2.5 rounded-full bg-[#8B5CF6] z-10"></div>

                  {/* Satellite 1: Top Left (Duration) */}
                  <div className="absolute top-[5%] left-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[130px] h-[130px] bg-white rounded-full shadow-lg border border-[#3B82F6]/30 flex flex-col items-center justify-center relative">
                      <Clock size={24} className="text-[#3B82F6] mb-1" strokeWidth={2} />
                      <span className="text-4xl font-bold text-[#123B6D] leading-none mb-1 font-[var(--font-heading)]">3</span>
                      <span className="text-[9px] font-bold tracking-widest text-[#1E293B] uppercase">Years</span>
                      <div className="absolute -bottom-3 bg-[#3B82F6] text-white text-[9px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase shadow-md">
                        Duration
                      </div>
                    </div>
                  </div>

                  {/* Satellite 2: Top Right (Structure) */}
                  <div className="absolute top-[5%] right-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[130px] h-[130px] bg-white rounded-full shadow-lg border border-[#F59E0B]/30 flex flex-col items-center justify-center relative">
                      <Building2 size={24} className="text-[#F59E0B] mb-1" strokeWidth={2} />
                      <span className="text-4xl font-bold text-[#123B6D] leading-none mb-1 font-[var(--font-heading)]">6</span>
                      <span className="text-[9px] font-bold tracking-widest text-[#1E293B] uppercase">Semesters</span>
                      <div className="absolute -bottom-3 bg-[#F59E0B] text-white text-[9px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase shadow-md">
                        Structure
                      </div>
                    </div>
                  </div>

                  {/* Satellite 3: Bottom Left (Capacity) */}
                  <div className="absolute bottom-[5%] left-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[140px] h-[140px] bg-white rounded-full shadow-lg border border-[#10B981]/30 flex flex-col items-center justify-center relative">
                      <Users size={24} className="text-[#10B981] mb-1" strokeWidth={2} />
                      <span className="text-4xl font-bold text-[#123B6D] leading-none mb-1 font-[var(--font-heading)]">{seatCount}</span>
                      <span className="text-[9px] font-bold tracking-widest text-[#1E293B] uppercase">Seats</span>
                      <div className="absolute -bottom-3 bg-[#10B981] text-white text-[9px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase shadow-md">
                        Capacity
                      </div>
                    </div>
                  </div>

                  {/* Satellite 4: Bottom Right (Timings) */}
                  <div className="absolute bottom-[5%] right-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[140px] h-[140px] bg-white rounded-full shadow-lg border border-[#8B5CF6]/30 flex flex-col items-center justify-center relative px-2">
                      <Calendar size={24} className="text-[#8B5CF6] mb-1 shrink-0" strokeWidth={2} />
                      {endT ? (
                        <>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-xl font-bold text-[#123B6D] leading-none font-[var(--font-heading)]">{startT}</span>
                            <span className="text-[8px] font-bold text-[#1E293B] uppercase">{startP}</span>
                          </div>
                          <div className="w-6 h-px bg-gray-200 my-1"></div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-[#123B6D] leading-none font-[var(--font-heading)]">{endT}</span>
                            <span className="text-[8px] font-bold text-[#1E293B] uppercase">{endP}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center font-bold text-[#123B6D] text-sm px-2 leading-snug">{timingInfoStr}</div>
                      )}
                      <div className="absolute -bottom-3 bg-[#8B5CF6] text-white text-[9px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase shadow-md">
                        Timings
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-4 md:-mt-8 relative z-20 flex flex-col gap-6 md:gap-8 pb-24">
        

        {/* 3. Tabs Navigation */}
        <div className="w-full overflow-x-auto scrollbar-hide py-1">
          <div className="flex items-center gap-2 min-w-max border-b border-[#E2E8F0] pb-2 md:pb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[#123B6D] text-white shadow-md'
                    : 'text-[#64748B] hover:text-[#123B6D] hover:bg-white border border-transparent hover:border-[#E2E8F0]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Tab Content */}
        <div>
          {activeTab === 'Overview' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              
              {/* Column 1: About */}
              <div className="lg:col-span-12 bg-white rounded-3xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm flex flex-col h-fit">
                <h2 className="text-lg md:text-xl font-bold text-[#1E293B] mb-4">About the Programme</h2>
                <div className="relative">
                  <div className={`prose prose-sm text-gray-600 transition-all duration-500 overflow-hidden text-xs md:text-sm ${!isReadMore ? 'max-h-[160px] md:max-h-[200px]' : 'max-h-[1500px]'}`}>
                    {introductionContent || <p>{description || 'Programme details will be updated here shortly.'}</p>}
                  </div>
                  {!isReadMore && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                  )}
                </div>
                
                <button 
                  onClick={() => setIsReadMore(!isReadMore)}
                  className="text-[#3B82F6] font-bold text-xs md:text-sm text-left hover:underline w-fit mt-2 z-10"
                >
                  {isReadMore ? 'Read Less' : 'Read More...'}
                </button>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <ul className="space-y-3">
                    {[
                      'Strong industry exposure',
                      'Practical learning approach',
                      'Creative & innovative environment',
                      'Career opportunities in emerging fields'
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm font-medium text-gray-700">
                        <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>



            </div>
          ) : activeTab === 'Structure' && syllabusContent ? (
            <div className="bg-white rounded-3xl p-6 md:p-12 border border-[#E2E8F0] shadow-sm">
              {syllabusContent}
            </div>
          ) : activeTab === 'Syllabus' ? (
            <div className="bg-white rounded-3xl p-12 border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-[#EBF3FF] flex items-center justify-center mb-4">
                <FileText className="text-[#123B6D]" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#123B6D] mb-2">Syllabus</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-sm">
                The detailed syllabus for this programme is being updated. Please check back shortly or contact the department for more information.
              </p>
            </div>
          ) : activeTab === 'Faculty' && facultyData && facultyData.length > 0 ? (
            <div className="bg-white rounded-3xl p-6 md:p-12 border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] flex items-center justify-center">
                  <Users className="text-[#123B6D]" size={20} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#123B6D]">Faculty Members</h2>
                  <p className="text-sm text-[#64748B]">{title}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {facultyData.map((member) => (
                  <FacultyFlipCard key={member.srNo} member={member} programmeName={title} />
                ))}
              </div>
            </div>
          ) : activeTab === 'Illustrious Alumni' ? (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E2E8F0] shadow-sm">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] flex items-center justify-center">
                  <Trophy className="text-[#D4A017]" size={20} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#123B6D]">Illustrious Alumni</h2>
                  <p className="text-sm text-[#64748B]">Proud achievers who walked these halls</p>
                </div>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-[#D4A017] to-[#123B6D] rounded-full mb-8" />

              {/* Alumni Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[
                  { name: 'Alumni Name', batch: 'Batch Year', role: 'Current Designation', org: 'Organisation', field: 'Industry / Domain', initials: 'AN' },
                  { name: 'Alumni Name', batch: 'Batch Year', role: 'Current Designation', org: 'Organisation', field: 'Industry / Domain', initials: 'AN' },
                  { name: 'Alumni Name', batch: 'Batch Year', role: 'Current Designation', org: 'Organisation', field: 'Industry / Domain', initials: 'AN' },
                  { name: 'Alumni Name', batch: 'Batch Year', role: 'Current Designation', org: 'Organisation', field: 'Industry / Domain', initials: 'AN' },
                  { name: 'Alumni Name', batch: 'Batch Year', role: 'Current Designation', org: 'Organisation', field: 'Industry / Domain', initials: 'AN' },
                  { name: 'Alumni Name', batch: 'Batch Year', role: 'Current Designation', org: 'Organisation', field: 'Industry / Domain', initials: 'AN' },
                ].map((alumni, idx) => (
                  <div key={idx} className="group relative bg-gradient-to-br from-[#F8FAFC] to-[#EBF3FF] rounded-2xl p-5 border border-[#E2E8F0] hover:border-[#D4A017] hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Gold accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A017] to-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#123B6D] to-[#1e5ba8] flex items-center justify-center shrink-0 shadow-md">
                        <span className="text-white font-bold text-lg">{alumni.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#123B6D] text-sm leading-tight mb-0.5">{alumni.name}</h3>
                        <div className="flex items-center gap-1 mb-1">
                          <Star size={10} className="text-[#D4A017] fill-[#D4A017]" />
                          <span className="text-[10px] font-semibold text-[#D4A017] uppercase tracking-wider">{alumni.batch}</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-700 leading-tight">{alumni.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin size={10} className="text-gray-400 shrink-0" />
                          <p className="text-[11px] text-gray-500 truncate">{alumni.org}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider bg-[#EBF3FF] px-2 py-1 rounded-full">{alumni.field}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom note */}
              <div className="mt-8 bg-[#FFF8E7] border border-[#F59E0B]/30 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D4A017]/10 flex items-center justify-center shrink-0">
                  <Star className="text-[#D4A017]" size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1E293B]">Are you a proud MCC alumnus?</p>
                  <p className="text-xs text-gray-500 mt-0.5">We would love to feature your success story. Contact us at <span className="text-[#3B82F6] font-semibold">alumni@mccmulund.ac.in</span></p>
                </div>
              </div>
            </div>
          ) : activeTab === 'Festivals' && festivals ? (
            <div className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm text-center min-h-[250px] flex flex-col items-center justify-center">
              <Award className="text-[#D4A017] mb-4" size={48} />
              <h2 className="text-xl md:text-2xl font-bold text-[#123B6D] mb-2">Programme Festivals</h2>
              <p className="text-gray-600 text-lg font-medium">{festivals}</p>
            </div>
          ) : activeTab === 'Publication' && publication ? (
            <div className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm text-center min-h-[250px] flex flex-col items-center justify-center">
              <BookOpen className="text-[#3B82F6] mb-4" size={48} />
              <h2 className="text-xl md:text-2xl font-bold text-[#123B6D] mb-2">Programme Publication</h2>
              <p className="text-gray-600 text-lg font-medium">{publication}</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center text-center min-h-[250px]">
              <FileText className="text-gray-200 mb-4" size={48} />
              <h3 className="text-lg md:text-xl font-bold text-gray-400 mb-2">Content Unavailable</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-sm">
                Detailed information for <strong>{activeTab}</strong> is currently being compiled and will be available shortly.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
