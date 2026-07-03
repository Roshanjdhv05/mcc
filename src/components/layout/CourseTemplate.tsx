"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Clock, Calendar, Settings, Award, 
  Send, Download, CheckCircle2,
  Building2, Users, GraduationCap, FileText,
  ChevronRight, Lightbulb, Activity, MonitorSmartphone, Target,
  MessagesSquare, Briefcase
} from 'lucide-react';

interface CourseTemplateProps {
  title: string;
  description?: string;
  introductionContent?: React.ReactNode;
}

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function CourseTemplate({ title, description, introductionContent }: CourseTemplateProps) {
  const tabs = [
    'Overview',
    'Syllabus',
    'Faculty',
    'Management Club - Inspira',
    'NewsLetter',
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

  const quickActionsData = [
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
              <div className="grid grid-cols-4 md:flex md:flex-wrap gap-2 md:gap-3 pt-4 md:pt-2">
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
                  <span className="text-[9px] md:text-sm font-bold text-[#1E293B] leading-tight">Industry<br className="hidden md:block"/><span className="font-medium text-gray-500"> Oriented</span></span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center items-center justify-center text-center md:text-left gap-1 md:gap-2 bg-transparent md:bg-[#F8FAFC] border-0 md:border border-[#E2E8F0] rounded-xl px-1 md:px-4 py-1 md:py-2.5">
                  <Award className="text-[#8B5CF6] shrink-0" size={24} strokeWidth={1.5} />
                  <span className="text-[9px] md:text-sm font-bold text-[#1E293B] leading-tight">Skill<br className="hidden md:block"/><span className="font-medium text-gray-500"> Dev..</span></span>
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
        
        {/* 2. Info Strip */}
        <div className="bg-white rounded-[24px] shadow-sm border border-[#E2E8F0] px-4 md:px-8 py-5">
          {/* Mobile Grid Layout vs Desktop Flex */}
          <div className="grid grid-cols-3 gap-y-6 md:flex md:flex-wrap justify-between items-center md:gap-6">
            
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <div className="bg-transparent md:bg-[#EBF3FF] p-1 md:p-2.5 rounded-xl text-[#3B82F6]">
                <Building2 size={24} strokeWidth={1.5} />
              </div>
              <div className="text-[9px] md:text-xs text-gray-500 leading-snug"><span className="block font-bold text-[#1E293B] text-[10px] md:text-sm">Affiliated to</span> University of Mumbai</div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-gray-100"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <div className="bg-transparent md:bg-[#EBF3FF] p-1 md:p-2.5 rounded-xl text-[#3B82F6]">
                <Award size={24} strokeWidth={1.5} />
              </div>
              <div className="text-[9px] md:text-xs text-gray-500 leading-snug"><span className="block font-bold text-[#1E293B] text-[10px] md:text-sm">NAAC Accredited</span> A Grade</div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-gray-100"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <div className="bg-transparent md:bg-[#EBF3FF] p-1 md:p-2.5 rounded-xl text-[#3B82F6]">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <div className="text-[10px] md:text-sm font-bold text-[#1E293B] leading-snug">Experienced<br className="hidden md:block"/><span className="text-gray-500 font-medium"> Faculty</span></div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-gray-100"></div>
            
            {/* These drop to a new line on very small screens if we used flex, but in grid-cols-3 we need to center them below. We use col-span tricks or just let grid handle it. */}
            <div className="col-span-1 md:col-auto col-start-1 md:col-start-auto flex flex-col md:flex-row items-center justify-self-center md:justify-self-auto gap-2 md:gap-4 text-center md:text-left mt-2 md:mt-0 ml-4 md:ml-0">
              <div className="bg-transparent md:bg-[#EBF3FF] p-1 md:p-2.5 rounded-xl text-[#3B82F6]">
                <MonitorSmartphone size={24} strokeWidth={1.5} />
              </div>
              <div className="text-[10px] md:text-sm font-bold text-[#1E293B] leading-snug">Modern Labs &<br className="hidden md:block"/><span className="text-gray-500 font-medium"> Infrastructure</span></div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-gray-100"></div>
            
            <div className="col-span-2 md:col-auto flex flex-col md:flex-row items-center justify-self-start md:justify-self-auto gap-2 md:gap-4 text-center md:text-left mt-2 md:mt-0 ml-4 md:ml-0">
              <div className="bg-transparent md:bg-[#EBF3FF] p-1 md:p-2.5 rounded-xl text-[#3B82F6]">
                <Briefcase size={24} strokeWidth={1.5} />
              </div>
              <div className="text-[10px] md:text-sm font-bold text-[#1E293B] leading-snug">Placement<br className="hidden md:block"/><span className="text-gray-500 font-medium"> Assistance</span></div>
            </div>
            
          </div>
        </div>

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
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm flex flex-col h-fit">
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

              {/* Column 2: Feature Grid */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <h3 className="md:hidden text-lg font-bold text-[#1E293B] pl-2">Programme Highlights</h3>
                <div className="grid grid-cols-3 md:grid-cols-2 gap-3 md:gap-4">
                  {features.map((f, idx) => (
                    <div key={idx} className={`${f.bg} rounded-2xl md:rounded-3xl p-3 md:p-6 flex flex-col items-center justify-center text-center gap-2 md:gap-4 border border-white hover:border-${f.text.split('-')[1]}-200 transition-all duration-300 min-h-[100px] md:min-h-[160px]`}>
                      <f.icon className={f.text} size={24} />
                      <span className={`font-bold text-[9px] md:text-sm px-1 leading-tight ${f.text}`}>{f.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Quick Actions */}
              <div className="lg:col-span-3">
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
                                <item.icon className="text-[#3B82F6]" size={18} />
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

        {/* 5. Bottom Banner */}
        <div className="bg-[#FFF8E7] rounded-3xl p-6 md:p-12 flex flex-row items-center justify-between gap-4 relative overflow-hidden shadow-sm border border-[#FDE68A]">
           <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#FCD34D]/30 rounded-full blur-2xl"></div>
           
           {/* Left characters (Simulated with an emoji or icon for mobile if no image) */}
           <div className="hidden xs:flex z-10 shrink-0 mr-2 md:mr-6">
             <div className="bg-white rounded-full p-2 md:p-4 shadow-sm border border-yellow-100">
               <GraduationCap className="text-[#D4A017]" size={28} />
             </div>
           </div>
           
           <div className="relative z-10 flex-1 max-w-4xl">
             <h2 className="text-sm xs:text-base md:text-3xl font-bold text-[#1E293B] leading-tight">
               Start your journey in <br className="hidden md:block"/><span className="text-[#D4A017] hidden md:inline">Higher Education</span>
             </h2>
             <p className="hidden md:block text-gray-600 font-medium mt-2">
               Join a community of innovators, creators and future professionals at MCC.
             </p>
           </div>
           
           <div className="relative z-10 shrink-0">
              <a href="https://enrollonline.co.in/Registration/Apply/MCC" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 md:gap-2 bg-[#123B6D] hover:bg-[#0f3059] text-white px-3 py-2 md:px-8 md:py-4 rounded-lg md:rounded-full text-xs md:text-base font-bold shadow-md transition-all group">
                Apply Now <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
           </div>
        </div>

      </div>
    </div>
  );
}
