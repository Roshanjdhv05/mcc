"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Clock, Calendar, Settings, Award, 
  Send, Download, CheckCircle2,
  Building2, Users, GraduationCap, FileText,
  ChevronRight, Lightbulb, Activity, MonitorSmartphone, Target,
  MessagesSquare, Briefcase, UserCircle, BookOpen
} from 'lucide-react';
import CourseFeeStructure from '@/components/ui/CourseFeeStructure';

interface CourseTemplateProps {
  title: string;
  description?: string;
  introductionContent?: React.ReactNode;
  syllabusContent?: React.ReactNode;
  quickActionsData?: { title: string; icon: any; info: string }[];
  courseKey?: string;
  category?: string;
  facultyData?: { srNo: number; name: string; additionalRole: string; designation: string; email?: string; education?: string; teachingExp?: string }[];
}

function FacultyFlipCard({ member }: { member: any }) {
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
             <img src={`/teaching staff/${member.name}.jpg`} alt={member.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
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
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-2 shrink-0">
              <BookOpen size={18} className="text-[#D4A017]" />
            </div>
            <h3 className="font-bold text-sm leading-tight text-white/95 mb-0.5">{member.name}</h3>
            <p className="text-[9px] text-[#D4A017] tracking-wider uppercase font-bold">{member.designation}</p>
          </div>
          
          <div className="space-y-2 flex-1 w-full px-1 overflow-y-auto">
             {member.additionalRole && member.additionalRole !== '—' && (
               <div className="flex items-start gap-2">
                 <span className="text-[#D4A017] text-[9px] font-bold uppercase tracking-wider shrink-0 mt-0.5 w-12">Role</span>
                 <span className="text-[11px] text-white/85 leading-snug">{member.additionalRole}</span>
               </div>
             )}
             {member.education && (
               <div className="flex items-start gap-2">
                 <span className="text-[#D4A017] text-[9px] font-bold uppercase tracking-wider shrink-0 mt-0.5 w-12">Edu.</span>
                 <span className="text-[11px] text-white/85 leading-snug">{member.education}</span>
               </div>
             )}
             {member.email && (
               <div className="flex items-start gap-2">
                 <span className="text-[#D4A017] text-[9px] font-bold uppercase tracking-wider shrink-0 mt-0.5 w-12">Email</span>
                 <span className="text-[10px] text-white/75 leading-snug break-all">{member.email}</span>
               </div>
             )}
             {member.teachingExp && (
               <div className="flex items-start gap-2">
                 <span className="text-[#D4A017] text-[9px] font-bold uppercase tracking-wider shrink-0 mt-0.5 w-12">Exp.</span>
                 <span className="text-[11px] text-white/85 leading-snug">{member.teachingExp}</span>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function CourseTemplate({ title, description, introductionContent, syllabusContent, quickActionsData: customQuickActionsData, courseKey, facultyData }: CourseTemplateProps) {
  const tabs = [
    'Overview',
    'Syllabus',
    'Faculty',
    'Management Club - Inspira',
    'Activity',
    'Result & Prize Distribution',
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

          <div className="flex flex-col md:flex-row items-center w-full gap-6 md:gap-12">
            
            {/* Left Content */}
            <div className="flex-1 space-y-4 md:space-y-6 z-10 relative">
              
              {/* Badge */}
              <div className="inline-block bg-[#EBF3FF] text-[#123B6D] text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-wider">
                Undergraduate Programme
              </div>

              {/* Title & Floating Image for Mobile */}
              <div className="relative">
                {/* Mobile Floating Image */}
                <div className="md:hidden absolute top-0 right-[-10px] w-[140px] h-[140px] xs:w-[160px] xs:h-[160px] z-10 pointer-events-none">
                  {/* Decorative Accent */}
                  <div 
                    className="absolute inset-[-6px] bg-[#D4A017] -z-10"
                    style={{ borderRadius: '35% 65% 55% 45% / 45% 45% 65% 65%' }}
                  ></div>
                  <div 
                    className="absolute inset-0 bg-[#123B6D] overflow-hidden"
                    style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop" 
                      alt="College"
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>
                </div>

                <h1 className="text-2xl xs:text-3xl md:text-5xl lg:text-[54px] font-bold text-[#123B6D] leading-tight font-[var(--font-heading)] md:pr-0 pr-[140px] xs:pr-[160px]">
                  {title}
                </h1>
              </div>
              
              <p className="text-gray-600 text-xs md:text-lg max-w-xl leading-relaxed mt-2 md:mt-4">
                {description || 'A dynamic undergraduate program that blends creativity, media technology, and communication skills for a future in the digital world.'}
              </p>

              {/* Badges Row - 4 columns on mobile, auto on desktop */}
              <div className="grid grid-cols-4 md:flex md:flex-nowrap gap-2 md:gap-3 pt-4 md:pt-2 overflow-x-auto scrollbar-hide">
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
                  <span className="text-[9px] md:text-sm font-bold text-[#1E293B] leading-tight">07:15 a.m.<br className="hidden md:block"/><span className="font-medium text-gray-500"> – 10:51 a.m.</span><br className="hidden md:block"/><span className="font-normal text-[8px] md:text-xs text-gray-400">(Practicals till 12:30)</span></span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center items-center justify-center text-center md:text-left gap-1 md:gap-2 bg-transparent md:bg-[#F8FAFC] border-0 md:border border-[#E2E8F0] rounded-xl px-1 md:px-4 py-1 md:py-2.5">
                  <Award className="text-[#8B5CF6] shrink-0" size={24} strokeWidth={1.5} />
                  <span className="text-[9px] md:text-sm font-bold text-[#1E293B] leading-tight">600 Seats<br className="hidden md:block"/><span className="font-medium text-gray-500"> Intake</span><br className="hidden md:block"/><span className="font-normal text-[8px] md:text-xs text-gray-400">(Govt. Aided)</span></span>
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

            {/* Right Visual Image (Desktop Only) */}
            <div className="hidden md:flex flex-1 relative w-full justify-end items-center h-[450px]">
              <div className="relative w-[380px] h-[380px] lg:w-[420px] lg:h-[420px] ml-auto">
                <div className="absolute inset-[-15px] bg-[#D4A017] -z-10 transition-transform duration-700 hover:scale-105" style={{ borderRadius: '35% 65% 55% 45% / 45% 45% 65% 65%' }}></div>
                <div className="absolute inset-0 bg-[#123B6D] overflow-hidden" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
                  <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop" alt="College Campus" className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700"/>
                </div>
                <div className="absolute top-[20%] -left-8 bg-white rounded-full p-4 shadow-2xl flex flex-col items-center justify-center w-[120px] h-[120px] border-4 border-[#F8FAFC]">
                  <GraduationCap className="text-[#123B6D] mb-1" size={36} />
                  <span className="text-[#1E293B] font-extrabold text-sm text-center leading-tight">MCC<br/>Autonomous</span>
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
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm flex flex-col h-fit">
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



              {/* Column 3: Quick Actions */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-3xl p-6 md:p-6 border border-[#E2E8F0] shadow-sm h-full">
                  <h3 className="font-bold text-[#1E293B] mb-4 text-lg">Quick Actions</h3>
                  <div className="flex flex-col gap-3" style={{ perspective: '1000px' }}>
                    {quickActionsData.map((item, idx) => {
                      const isFlipped = flippedCards[idx];
                      return (
                        <div 
                          key={idx} 
                          onClick={() => toggleFlip(idx)}
                          className="relative w-full h-[64px] cursor-pointer group"
                        >
                          <div 
                            className="w-full h-full transition-transform duration-500 ease-in-out"
                            style={{ 
                              transformStyle: 'preserve-3d', 
                              transform: isFlipped ? 'rotateX(-180deg)' : 'rotateX(0deg)' 
                            }}
                          >
                            {/* Front of card */}
                            <div 
                              className="absolute inset-0 flex items-center justify-between bg-[#F8FAFC] px-4 py-3 rounded-xl border border-transparent group-hover:border-[#3B82F6]/30 group-hover:bg-[#EBF3FF] transition-all"
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              <div className="flex items-center gap-3">
                                {React.isValidElement(item.icon) ? item.icon : React.createElement(item.icon as any, { className: "text-[#3B82F6]", size: 18 })}
                                <span className="text-xs md:text-sm font-bold text-[#1E293B]">{item.title}</span>
                              </div>
                              <ChevronRight className="text-gray-400 group-hover:rotate-90 transition-transform" size={14} />
                            </div>
                            
                            {/* Back of card */}
                            <div 
                              className="absolute inset-0 flex items-center justify-center bg-[#123B6D] px-3 py-2 rounded-xl shadow-inner"
                              style={{ 
                                backfaceVisibility: 'hidden', 
                                transform: 'rotateX(180deg)' 
                              }}
                            >
                              <p className="text-[10px] md:text-xs text-white leading-tight font-medium text-center">
                                {item.info}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          ) : activeTab === 'Syllabus' && syllabusContent ? (
            <div className="bg-white rounded-3xl p-6 md:p-12 border border-[#E2E8F0] shadow-sm">
              {syllabusContent}
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
                  <FacultyFlipCard key={member.srNo} member={member} />
                ))}
              </div>
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
