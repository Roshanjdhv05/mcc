"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Calendar, Settings, Award, 
  Send, Download, CheckCircle2,
  Building2, Users, GraduationCap, FileText,
  ChevronRight, ChevronLeft, Lightbulb, Activity, MonitorSmartphone, Target,
  MessagesSquare, Briefcase, UserCircle, BookOpen, Star, Trophy, MapPin,
  X, ArrowRight
} from 'lucide-react';
import CourseFeeStructure from '@/components/ui/CourseFeeStructure';
import ProgramStructureNEP from '@/components/ui/ProgramStructureNEP';
import { supabase } from '@/lib/supabase';
import { useProgramme } from '@/hooks/useProgramme';

interface PGCourseTemplateProps {
  title: string;
  shortInfo?: string;
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
            {member.education && (
              <div className="text-[10px] text-gray-600 font-medium text-center leading-tight mt-1.5 px-2 line-clamp-2">
                {member.education}
              </div>
            )}
            {member.teachingExp && (
              <div className="text-[10px] text-[#D4A017] font-bold text-center leading-tight mt-1 px-2">
                Exp: {member.teachingExp}
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

export default function PGCourseTemplate({ title, shortInfo, fundingType, introductionContent, syllabusContent, quickActionsData: customQuickActionsData, courseKey, facultyData, festivals, publication }: PGCourseTemplateProps) {
  const cleanName = (name: string) => name.replace(/ \(Col\)/g, '');
  const festivalTabName = festivals ? cleanName(festivals) : null;
  const publicationTabName = publication ? cleanName(publication) : null;

  // Derive the programme code from the title or courseKey for Supabase filtering
  const programmeCode = courseKey || title.split('(')[1]?.replace(')', '').trim() || title;

  const [programmeEvents, setProgrammeEvents] = useState<{id: string; title: string; description: string; images: string[]; published_at: string; programme_section: string; category: string; department: string}[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<typeof programmeEvents[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [dbProgramme, setDbProgramme] = useState<any>(null);
  const [activitiesIntros, setActivitiesIntros] = useState<{title: string; intro: string}[]>([]);
  const [openIntroIndex, setOpenIntroIndex] = useState<number | null>(0);

  const slugMap: Record<string, string> = {
    'BCOM': 'bcom', 'BAF': 'baf', 'BBI': 'bbi', 'BFM': 'bfm', 'BMS': 'bcom-ms', 'BBA': 'bcom-ba', 
    'BAMMC': 'bammc', 'BSC_IT': 'bsc-it', 'BCA': 'bca', 'BSC_DS': 'bsc-ds', 'BSC_CS': 'bsc-cs', 
    'DS': 'bsc-ds'
  };
  const targetSlug = courseKey ? (slugMap[courseKey.toUpperCase()] || courseKey.toLowerCase()) : '';
  const { data: progData, loading: progLoading } = useProgramme(targetSlug);

  useEffect(() => {
    // Determine the admin code based on courseKey or title
    const getAdminCode = () => {
      const t = (title || '').toLowerCase();
      const k = (courseKey || '').toUpperCase();
      
      if (k === 'BCOM') return 'B.COM';
      if (k === 'BAF' || t.includes('accounting')) return 'BAF';
      if (k === 'BMS' || t.includes('management studies')) return 'BMS';
      if (k === 'BFM' || t.includes('financial markets')) return 'BFM';
      if (k === 'BFSI' || t.includes('bfsi')) return 'BFSI';
      if (k === 'BBI' || t.includes('banking')) return 'BBI';
      if (k === 'BSC_IT' || t.includes('information technology')) return 'BSC-IT';
      if (k === 'BSC_CS' || t.includes('computer science')) return 'BSC-CS';
      if (k === 'BSC_DS' || t.includes('data science')) return 'BSC-DS';
      if (k === 'BSC_CA' || k === 'BCA' || t.includes('computer applications') || t.includes('bca')) return 'BCA';
      if (k === 'BBA' || t.includes('bba')) return 'BBA';
      if (k === 'BAMMC' || t.includes('mass media')) return 'BAMMC';
      if (t.includes('commerce')) return 'B.COM';
      if (t.includes('sct')) return 'SCT';
      return title.split(' ')[0]; // fallback
    };
    const adminCode = getAdminCode();

    async function fetchProgrammeEvents() {
      const { data } = await supabase
        .from('events')
        .select('id, title, description, images, published_at, programme_section, programme, category, department')
        .eq('publish_programme', true)
        .eq('status', 'published')
        .order('published_at', { ascending: false });
        
      if (data) {
        const filtered = data
          .filter(ev => ev.programme && ev.programme.includes(adminCode))
          .map(ev => {
            let section = ev.programme_section;
            try {
              const parsed = JSON.parse(ev.programme_section);
              if (parsed && parsed[adminCode]) {
                section = parsed[adminCode];
              }
            } catch (e) {
              // Legacy string
            }
            return { ...ev, programme_section: section };
          });
        setProgrammeEvents(filtered);
      }
    }
    async function fetchProgrammeData() {
      if (!courseKey) return;
      const { data } = await supabase
        .from('programmes')
        .select('*')
        .eq('course_key', courseKey)
        .single();
      if (data) {
        setDbProgramme(data);
      }
    }

    async function fetchActivitiesIntros() {
      if (!targetSlug) return;
      // Fetch directly from mcc_programmes -> program_overview to get activities_intros
      const { data: prog } = await supabase
        .from('mcc_programmes')
        .select('id')
        .eq('slug', targetSlug)
        .single();
      if (!prog) return;
      const { data: ov } = await supabase
        .from('program_overview')
        .select('activities_intros')
        .eq('programme_id', prog.id)
        .single();
      if (ov?.activities_intros && Array.isArray(ov.activities_intros) && ov.activities_intros.length > 0) {
        setActivitiesIntros(ov.activities_intros);
      }
    }
    
    fetchProgrammeEvents();
    fetchProgrammeData();
    fetchActivitiesIntros();
  }, [festivals, courseKey, title]);

  const tabs = [
    'Overview',
    'Structure',
    'Syllabus',
    'Faculty',
    'Illustrious Alumni',
    'Events & Activities',
    ...(festivalTabName ? [festivalTabName] : []),
    ...(publicationTabName ? [publicationTabName] : []),
    'Industrial Visits'
  ];
  
  const activeFestivalsTab = progData?.festivals_tab_name || dbProgramme?.festivals_tab_name || festivalTabName;
  const activePublicationTab = progData?.publication_tab_name || dbProgramme?.publication_tab_name || publicationTabName;

  if (activeFestivalsTab && !tabs.includes(activeFestivalsTab)) {
    tabs.push(activeFestivalsTab);
  }
  if (activePublicationTab && !tabs.includes(activePublicationTab)) {
    tabs.push(activePublicationTab);
  }

  // To ensure uniqueness:
  const uniqueTabs = Array.from(new Set(tabs));

  // Handle active tab state
  const [activeTab, setActiveTab] = useState(uniqueTabs[0]);
  const [isReadMore, setIsReadMore] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const tab = uniqueTabs.find(t => slugify(t) === hash);
      if (tab) setActiveTab(tab);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${slugify(tab)}`);
  };

  let finalQuickActionsData = customQuickActionsData || [
    { title: 'Eligibility', icon: Users, info: '10+2 from a recognized board with minimum 50% aggregate marks.' },
    { title: 'Fee Structure', icon: Award, info: '₹35,000 - ₹50,000 per year depending on the specific programme.' },
    { title: 'Timing', icon: Clock, info: 'Morning Session: 7:00 AM to 12:00 PM. Practical slots may vary.' },
    { title: 'Number of Seats', icon: Users, info: '60 to 120 seats per division (subject to university approval).' },
    { title: 'Programme Design', icon: FileText, info: '3-year full-time undergraduate programme divided into 6 semesters.' }
  ];

  if (progData?.snapshot) {
    const sn = progData.snapshot;
    const snItems = [
      ...(sn.duration ? [{ title: 'Programme Design', icon: FileText, info: `${sn.duration}${sn.semesters ? `, ${sn.semesters} Semesters` : ''}` }] : []),
      ...(sn.timing ? [{ title: 'Timing', icon: Clock, info: sn.timing }] : []),
      ...(sn.intake ? [{ title: 'Intake Capacity', icon: Users, info: `${sn.intake} Seats` }] : []),
      ...(sn.mode ? [{ title: 'Mode', icon: FileText, info: sn.mode }] : []),
    ];
    if (snItems.length > 0) {
      finalQuickActionsData = snItems;
    }
  } else if (dbProgramme?.programme_snapshot && dbProgramme.programme_snapshot.length > 0) {
    finalQuickActionsData = dbProgramme.programme_snapshot;
  }

  const timingInfoStr = finalQuickActionsData.find((q: any) => q.title.toLowerCase().includes('timing') || q.title.toLowerCase().includes('time'))?.info || '07:15 a.m. - 10:51 a.m.';
  const seatsInfoStr = finalQuickActionsData.find((q: any) => q.title.toLowerCase().includes('intake') || q.title.toLowerCase().includes('seat'))?.info || '600 Seats';
  
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
                  Postgraduate Programme
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
                  {progData?.name || dbProgramme?.title || title}
                </h1>
                {(progData?.overview?.description || dbProgramme?.short_info || shortInfo) && (
                  <p className="mt-3 text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-xl">
                    {progData?.overview?.description || dbProgramme?.short_info || shortInfo}
                  </p>
                )}
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

            {/* Right Visual — Programme Snapshot Infographic (Desktop Only) */}
            <div className="hidden lg:flex flex-1 relative w-full justify-center items-center h-[550px]">
              {/* Title */}
              <div className="absolute top-0 w-full flex items-center justify-center gap-4 z-10">
                <div className="h-px bg-[#D4A017] w-16" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                <h3 className="text-sm font-bold tracking-widest text-[#123B6D] uppercase">Programme Snapshot</h3>
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                <div className="h-px bg-[#D4A017] w-16" />
              </div>

              <div className="relative w-[500px] h-[500px] flex items-center justify-center mt-8">
                {/* Central Circle */}
                <div className="absolute z-20 w-[220px] h-[220px] bg-white rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center border-4 border-gray-50/50">
                  <GraduationCap size={40} className="text-[#123B6D] mb-2" strokeWidth={1.5} />
                  <h2 className="text-4xl font-bold text-[#123B6D] text-center px-4 leading-none font-[var(--font-heading)]">
                    {courseKey ? courseKey.replace('_', '.') : title.split(' ')[0]}
                  </h2>
                  <div className="w-8 h-0.5 bg-[#F59E0B] mt-3"></div>
                </div>

                {/* Rotating Ring */}
                <div className="absolute w-full h-full flex items-center justify-center [animation:spin_40s_linear_infinite]">
                  <div className="absolute w-[360px] h-[360px] rounded-full border border-gray-200 z-0" />
                  <div className="absolute top-[25%] left-[19%] w-2.5 h-2.5 rounded-full bg-[#3B82F6] z-10"></div>
                  <div className="absolute top-[25%] right-[19%] w-2.5 h-2.5 rounded-full bg-[#F59E0B] z-10"></div>
                  <div className="absolute bottom-[25%] left-[19%] w-2.5 h-2.5 rounded-full bg-[#10B981] z-10"></div>
                  <div className="absolute bottom-[25%] right-[19%] w-2.5 h-2.5 rounded-full bg-[#8B5CF6] z-10"></div>

                  {/* Satellite 1: Duration */}
                  <div className="absolute top-[5%] left-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[130px] h-[130px] bg-white rounded-full shadow-lg border border-[#3B82F6]/30 flex flex-col items-center justify-center relative">
                      <Clock size={24} className="text-[#3B82F6] mb-1" strokeWidth={2} />
                      <span className="text-4xl font-bold text-[#123B6D] leading-none mb-1 font-[var(--font-heading)]">
                        {progData?.snapshot?.duration?.match(/\d+/)?.[0] || '3'}
                      </span>
                      <span className="text-[9px] font-bold tracking-widest text-[#1E293B] uppercase">Years</span>
                      <div className="absolute -bottom-3 bg-[#3B82F6] text-white text-[9px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase shadow-md">Duration</div>
                    </div>
                  </div>

                  {/* Satellite 2: Semesters */}
                  <div className="absolute top-[5%] right-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[130px] h-[130px] bg-white rounded-full shadow-lg border border-[#F59E0B]/30 flex flex-col items-center justify-center relative">
                      <Building2 size={24} className="text-[#F59E0B] mb-1" strokeWidth={2} />
                      <span className="text-4xl font-bold text-[#123B6D] leading-none mb-1 font-[var(--font-heading)]">
                        {progData?.snapshot?.semesters || 6}
                      </span>
                      <span className="text-[9px] font-bold tracking-widest text-[#1E293B] uppercase">Semesters</span>
                      <div className="absolute -bottom-3 bg-[#F59E0B] text-white text-[9px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase shadow-md">Structure</div>
                    </div>
                  </div>

                  {/* Satellite 3: Seats */}
                  <div className="absolute bottom-[5%] left-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[140px] h-[140px] bg-white rounded-full shadow-lg border border-[#10B981]/30 flex flex-col items-center justify-center relative">
                      <Users size={24} className="text-[#10B981] mb-1" strokeWidth={2} />
                      <span className="text-4xl font-bold text-[#123B6D] leading-none mb-1 font-[var(--font-heading)]">
                        {seatCount}
                      </span>
                      <span className="text-[9px] font-bold tracking-widest text-[#1E293B] uppercase">Seats</span>
                      <div className="absolute -bottom-3 bg-[#10B981] text-white text-[9px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase shadow-md">Capacity</div>
                    </div>
                  </div>

                  {/* Satellite 4: Timings */}
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
                        <span className="text-xl font-bold text-[#123B6D] leading-none mt-2 font-[var(--font-heading)]">{startT}</span>
                      )}
                      <div className="absolute -bottom-3 bg-[#8B5CF6] text-white text-[9px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase shadow-md">Timings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-4 md:-mt-8 relative z-20 flex flex-col gap-6 md:gap-8 pb-24">
        
        {/* Tabs Navigation */}
        <div className="w-full overflow-x-auto scrollbar-hide py-1">
          <div className="flex items-center gap-2 min-w-max border-b border-[#E2E8F0] pb-2 md:pb-4">
            {uniqueTabs.map((tab) => (
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

        {/* Tab Content */}
        <div>
          {activeTab === 'Overview' ? (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E2E8F0] shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] mb-6 flex items-center gap-3">
                <BookOpen size={28} className="text-[#3B82F6]" />
                Programme Overview
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-[#123B6D] prose-a:text-[#3B82F6]">
                {progData?.overview?.long_description ? (
                  progData.overview.long_description.split('\n').map((p: string, i: number) => p.trim() ? <p key={i} className="mb-4">{p}</p> : null)
                ) : progData?.overview?.description ? (
                  <p className="mb-4">{progData.overview.description}</p>
                ) : dbProgramme?.overview_content && dbProgramme.overview_content.length > 0 ? (
                  dbProgramme.overview_content.map((p: string, i: number) => (
                    <p key={i} className="mb-4">{p}</p>
                  ))
                ) : introductionContent ? (
                  introductionContent
                ) : (
                  <p>Programme details will be updated here shortly.</p>
                )}
              </div>

            </div>
          ) : activeTab === 'Structure' ? (
            <div className="bg-white rounded-3xl p-6 md:p-12 border border-[#E2E8F0] shadow-sm">
              {(() => {
                const sems = progData?.semesters;
                if (sems && sems.length > 0) {
                  return (
                    <div className="space-y-8">
                      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Programme Structure</h3>
                      {sems.map((sem: any) => (
                        <div key={sem.id || sem.semester_number} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-6">
                          <div className="bg-[#FFF8E7] px-4 py-3 border-b border-[#E2E8F0] flex justify-between items-center">
                            <h4 className="font-bold text-[#D4A017]">Semester {sem.semester_number}</h4>
                            {sem.syllabus_pdf && <a href={sem.syllabus_pdf} target="_blank" rel="noreferrer" className="text-xs text-[#123B6D] font-bold hover:underline">Download PDF</a>}
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                              <thead className="bg-[#F8FAFC] text-[#123B6D]">
                                <tr>
                                  <th className="p-3 border w-12 text-center">#</th>
                                  <th className="p-3 border">Subject Name</th>
                                  <th className="p-3 border w-28">Code</th>
                                  <th className="p-3 border w-28">Type</th>
                                  <th className="p-3 border w-20 text-center">Credits</th>
                                </tr>
                              </thead>
                              <tbody>
                                {sem.subjects?.map((sub: any, i: number) => (
                                  <tr key={i} className={sub.is_elective ? "bg-[#EBF3FF] hover:bg-[#EBF3FF]/80" : "hover:bg-gray-50"}>
                                    <td className="p-3 border text-center text-gray-500 font-medium text-xs">{i + 1}</td>
                                    <td className="p-3 border font-medium text-gray-900">
                                      {sub.subject_name}
                                      {sub.is_elective && <span className="inline-block ml-2 px-1.5 py-0.5 bg-blue-100 text-[#3B82F6] text-[10px] font-bold uppercase rounded">Elective</span>}
                                    </td>
                                    <td className="p-3 border text-gray-500 text-xs">{sub.subject_code || '—'}</td>
                                    <td className="p-3 border text-gray-600 text-xs">{sub.subject_type || '—'}</td>
                                    <td className="p-3 border text-center font-semibold">{sub.credits || '—'}</td>
                                  </tr>
                                ))}
                                {(!sem.subjects || sem.subjects.length === 0) && (
                                  <tr><td colSpan={5} className="p-6 text-center text-gray-500 text-sm">Subjects to be announced</td></tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                return syllabusContent;
              })()}
            </div>
            ) : activeTab === 'Faculty' ? (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E2E8F0] shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] mb-8 flex items-center gap-3">
                <Users size={28} className="text-[#3B82F6]" />
                Faculty Members
              </h2>
              {(() => {
                // Prefer Supabase data, fallback to hardcoded props
                const dynamicFaculty = progData?.faculty && progData.faculty.length > 0
                  ? progData.faculty.map((f: any) => ({
                      srNo: f.sr_no, name: f.name, designation: f.designation,
                      additionalRole: f.additional_role, department: f.department,
                      education: f.education, teachingExp: f.teaching_exp,
                      email: f.email, image: f.image
                    }))
                  : null;
                const finalFacultyData = dynamicFaculty || (dbProgramme?.faculty_data?.length > 0 ? dbProgramme.faculty_data : facultyData);

                if (!finalFacultyData || finalFacultyData.length === 0) return (
                  <div className="py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Users size={40} className="text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">Faculty details are being updated.</p>
                  </div>
                );

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {finalFacultyData.map((member: any, index: number) => (
                       <FacultyFlipCard key={member.id || `faculty-${index}`} member={member} programmeName={title} />
                    ))}
                  </div>
                );
              })()}
            </div>
          ) : activeTab === 'Illustrious Alumni' ? (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E2E8F0] shadow-sm">
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
              {(() => {
                const alumniList = progData?.alumni && progData.alumni.length > 0 ? progData.alumni : [];
                if (alumniList.length === 0) return (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Trophy size={48} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-semibold">Alumni details are being updated.</p>
                    <p className="text-gray-400 text-sm mt-1">Check back soon or contact us at <span className="text-[#3B82F6] font-semibold">alumni@mccmulund.ac.in</span></p>
                  </div>
                );
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {alumniList.map((alumni: any, idx: number) => (
                      <div key={idx} className="group relative bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#D4A017] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#D4A017] to-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex gap-4 p-4">
                          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#123B6D] to-[#1e5ba8] flex items-center justify-center shrink-0 overflow-hidden shadow-md">
                            {alumni.image ? (
                              <img src={alumni.image} alt={alumni.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-white font-bold text-2xl">{alumni.initials || alumni.name?.charAt(0)}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center gap-[3px]">
                            <h3 className="font-bold text-[#123B6D] text-sm leading-snug truncate">{alumni.name}</h3>
                            <div className="flex items-center gap-1">
                              <GraduationCap size={11} className="text-[#D4A017] shrink-0" />
                              <span className="text-[11px] text-[#475569] font-medium truncate">{alumni.programme_name}</span>
                            </div>
                            {alumni.year && <div className="flex items-center gap-1">
                              <Calendar size={11} className="text-[#3B82F6] shrink-0" />
                              <span className="text-[11px] text-[#475569]">Class of {alumni.year}</span>
                            </div>}
                            {alumni.designation && <div className="flex items-center gap-1">
                              <Briefcase size={11} className="text-[#10B981] shrink-0" />
                              <span className="text-[11px] text-gray-700 font-semibold leading-tight line-clamp-1">{alumni.designation}</span>
                            </div>}
                            {alumni.organisation && <div className="flex items-center gap-1">
                              <Building2 size={11} className="text-gray-400 shrink-0" />
                              <span className="text-[11px] text-gray-500 truncate">{alumni.organisation}</span>
                            </div>}
                          </div>
                        </div>
                        {alumni.linkedin && alumni.linkedin !== '#' && (
                          <div className="px-4 pb-3">
                            <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-1.5 rounded-lg bg-[#0077B5]/10 hover:bg-[#0077B5] text-[#0077B5] hover:text-white text-[11px] font-semibold transition-all duration-200 border border-[#0077B5]/30">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                              View on LinkedIn
                            </a>
                          </div>
                        )}
                        {alumni.about && (
                          <div className="mx-4 mb-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2.5">
                            <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">{alumni.about}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()}

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
          ) : activeTab === 'Events & Activities' ? (
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm">
              {(() => {
                // Match by category OR programme_section for broader compatibility
                const allActivities = programmeEvents.filter(
                  ev => ev.category === 'Events & Activities' ||
                        ev.programme_section === 'Events & Activities'
                );
                
                // Legacy fallback if no intro blocks are available
                const introEvent = allActivities.find(ev => ev.category === 'Events & Activities' && ev.title === 'Activities Intro');
                const legacyIntroText = introEvent ? introEvent.description : `Events, workshops and activities from ${title}`;
                
                const eventsActivities = allActivities.filter(ev => !(ev.category === 'Events & Activities' && ev.title === 'Activities Intro'));
                // Use directly-fetched activitiesIntros (most reliable), then fall back to progData / dbProgramme
                const intros = activitiesIntros.length > 0
                  ? activitiesIntros
                  : (progData?.overview?.activities_intros || dbProgramme?.overview?.activities_intros || []);

                return (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] mb-6">Events &amp; Activities</h2>
                      {intros.length > 0 ? (
                        <div className="space-y-3">
                          {intros.map((introBlock: any, i: number) => {
                            const isOpen = openIntroIndex === i;
                            return (
                              <div
                                key={i}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                  isOpen
                                    ? 'border-[#123B6D]/30 shadow-md bg-white'
                                    : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#123B6D]/20 hover:bg-white'
                                }`}
                              >
                                {/* Accordion Header */}
                                <button
                                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
                                  onClick={() => setOpenIntroIndex(isOpen ? null : i)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                                      isOpen ? 'bg-[#123B6D] text-white' : 'bg-[#EBF3FF] text-[#123B6D]'
                                    }`}>
                                      <span className="text-xs font-black">{i + 1}</span>
                                    </div>
                                    <span className={`font-bold text-base md:text-lg transition-colors duration-200 ${
                                      isOpen ? 'text-[#123B6D]' : 'text-[#1E293B] group-hover:text-[#123B6D]'
                                    }`}>
                                      {introBlock.title || `Introduction ${i + 1}`}
                                    </span>
                                  </div>
                                  <div className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                    isOpen
                                      ? 'bg-[#123B6D] border-[#123B6D] rotate-180'
                                      : 'bg-white border-[#E2E8F0] rotate-0 group-hover:border-[#123B6D]/40'
                                  }`}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <path d="M2 4L6 8L10 4" stroke={isOpen ? '#fff' : '#123B6D'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                </button>

                                {/* Accordion Body */}
                                <div
                                  className="overflow-hidden transition-all duration-500 ease-in-out"
                                  style={{ maxHeight: isOpen ? '600px' : '0px', opacity: isOpen ? 1 : 0 }}
                                >
                                  <div className="px-5 pb-5">
                                    <div className="border-t border-[#E2E8F0] pt-4">
                                      <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                                        {introBlock.intro}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-base leading-relaxed max-w-4xl">{legacyIntroText}</p>
                      )}
                    </div>
                    {eventsActivities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventsActivities.map(ev => (
                      <div
                        key={ev.id}
                        onClick={() => { setSelectedEvent(ev); setCurrentImageIndex(0); }}
                        className="group/card flex flex-col rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      >
                        <div className="relative h-56 overflow-hidden">
                          {ev.images && ev.images[0] ? (
                            <img src={ev.images[0]} alt={ev.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#123B6D]/10 to-[#D4A017]/10 flex items-center justify-center">
                              <Award className="text-[#D4A017]" size={48} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#123B6D] tracking-wide shadow-sm">
                              {new Date(ev.published_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h4 className="font-bold text-[#1E293B] group-hover/card:text-[#123B6D] transition-colors mb-2 text-lg leading-tight">{ev.title}</h4>
                          <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3 flex-1 mb-4">{ev.description}</p>
                          <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] group-hover/card:gap-2 transition-all">
                            View Details <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Award className="text-[#D4A017] mb-4" size={48} />
                    <h3 className="text-lg font-bold text-[#123B6D] mb-1">Events &amp; Activities</h3>
                    <p className="text-gray-500 text-sm">Event photos &amp; highlights will appear here once published by admin.</p>
                  </div>
                )}
                </>
              );
              })()}

              {/* Modal */}
              <AnimatePresence>
                {selectedEvent && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => setSelectedEvent(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="relative w-full max-w-5xl lg:max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
                      <button onClick={() => setSelectedEvent(null)}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors md:text-gray-500 md:bg-gray-100 md:hover:bg-gray-200">
                        <X size={20} />
                      </button>
                      <div className="w-full md:w-1/2 lg:w-[55%] relative bg-gray-900 min-h-[260px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.img key={currentImageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                            src={selectedEvent.images?.[currentImageIndex] || ''} alt={selectedEvent.title}
                            className="absolute inset-0 w-full h-full object-contain bg-black/50" />
                        </AnimatePresence>
                        {selectedEvent.images && selectedEvent.images.length > 1 && (
                          <>
                            <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length); }}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center"><ChevronLeft size={18} /></button>
                            <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length); }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center"><ChevronRight size={18} /></button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                              {selectedEvent.images.map((_, idx) => (
                                <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                  className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="w-full md:w-1/2 lg:w-[45%] p-6 md:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedEvent.category && <span className="px-3 py-1 rounded-full bg-[#123B6D]/10 text-xs font-bold uppercase text-[#123B6D]">{selectedEvent.category}</span>}
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black text-[#0D1B3E] mb-4">{selectedEvent.title}</h2>
                        <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm mb-6 pb-6 border-b border-gray-100">
                          <Calendar size={18} className="text-[#123B6D]" />
                          {new Date(selectedEvent.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{selectedEvent.description}</p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          ) : activeTab === activeFestivalsTab && (dbProgramme?.festivals_tab_name || festivals) ? (
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm">
              {(() => {
                const festivalEvents = programmeEvents.filter(
                  ev => ev.programme_section === activeFestivalsTab ||
                        (ev.programme_section || '').includes(activeFestivalsTab || '')
                );
                
                const introEvent = festivalEvents.find(ev => ev.category === 'Festivals' && ev.title === 'Festival Intro');
                const introText = introEvent ? introEvent.description : `Events & highlights from ${activeFestivalsTab}`;
                const displayEvents = festivalEvents.filter(ev => !(ev.category === 'Festivals' && ev.title === 'Festival Intro'));

                return (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] mb-3">{activeFestivalsTab}</h2>
                      <p className="text-gray-600 text-base leading-relaxed max-w-4xl">{introText}</p>
                    </div>
                    {displayEvents.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayEvents.map(ev => (
                    <div
                      key={ev.id}
                      onClick={() => { setSelectedEvent(ev); setCurrentImageIndex(0); }}
                      className="group/card flex flex-col rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative h-56 overflow-hidden">
                        {ev.images && ev.images[0] ? (
                          <img src={ev.images[0]} alt={ev.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#123B6D]/10 to-[#D4A017]/10 flex items-center justify-center">
                            <Award className="text-[#D4A017]" size={48} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#123B6D] tracking-wide shadow-sm">
                            {new Date(ev.published_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="font-bold text-[#1E293B] group-hover/card:text-[#123B6D] transition-colors mb-2 text-lg leading-tight">{ev.title}</h4>
                        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3 flex-1 mb-4">{ev.description}</p>
                        <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] group-hover/card:gap-2 transition-all">
                          View Details <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Award className="text-[#D4A017] mb-4" size={48} />
                        <h3 className="text-lg font-bold text-[#123B6D] mb-1">{activeFestivalsTab}</h3>
                        <p className="text-gray-500 text-sm">Event photos &amp; highlights will appear here once published by admin.</p>
                      </div>
                    )}
                  </>
                );
              })()}

              {/* ── MODAL ── */}
              <AnimatePresence>
                {selectedEvent && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => setSelectedEvent(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="relative w-full max-w-5xl lg:max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
                      <button onClick={() => setSelectedEvent(null)}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors md:text-gray-500 md:bg-gray-100 md:hover:bg-gray-200">
                        <X size={20} />
                      </button>
                      {/* Image panel */}
                      <div className="w-full md:w-1/2 lg:w-[55%] relative bg-gray-900 min-h-[260px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.img key={currentImageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                            src={selectedEvent.images?.[currentImageIndex] || ''} alt={selectedEvent.title}
                            className="absolute inset-0 w-full h-full object-contain bg-black/50" />
                        </AnimatePresence>
                        {selectedEvent.images && selectedEvent.images.length > 1 && (
                          <>
                            <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length); }}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center"><ChevronLeft size={18} /></button>
                            <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length); }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center"><ChevronRight size={18} /></button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                              {selectedEvent.images.map((_, idx) => (
                                <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                  className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      {/* Info panel */}
                      <div className="w-full md:w-1/2 lg:w-[45%] p-6 md:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedEvent.programme_section && <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-semibold text-gray-700">{selectedEvent.programme_section}</span>}
                          {selectedEvent.category && <span className="px-3 py-1 rounded-full bg-[#123B6D]/10 text-xs font-bold uppercase text-[#123B6D]">{selectedEvent.category}</span>}
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black text-[#0D1B3E] mb-4">{selectedEvent.title}</h2>
                        <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm mb-6 pb-6 border-b border-gray-100">
                          <Calendar size={18} className="text-[#123B6D]" />
                          {new Date(selectedEvent.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{selectedEvent.description}</p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          ) : activeTab === 'Industrial Visits' ? (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                  <Building2 className="text-[#123B6D]" size={20} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#123B6D]">Industrial Visits</h2>
                  <p className="text-sm text-[#64748B]">Real-world exposure beyond the classroom</p>
                </div>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-[#123B6D] to-[#D4A017] rounded-full mb-8" />
              {(() => {
                const visitList = progData?.industrial_visits && progData.industrial_visits.length > 0 ? progData.industrial_visits : [];
                if (visitList.length === 0) return (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Building2 size={48} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-semibold">Industrial visit details are being updated.</p>
                  </div>
                );
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visitList.map((visit: any, idx: number) => (
                      <div key={idx} className="group bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#123B6D] hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {visit.image ? (
                          <div className="h-44 overflow-hidden">
                            <img src={visit.image} alt={visit.company_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="h-44 bg-gradient-to-br from-[#123B6D]/10 to-[#D4A017]/10 flex items-center justify-center">
                            <Building2 size={48} className="text-[#123B6D]/30" />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-bold text-[#123B6D] text-base mb-1">{visit.company_name}</h3>
                          {visit.visit_date && <p className="text-xs text-[#D4A017] font-semibold mb-2">{visit.visit_date}</p>}
                          {visit.description && <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{visit.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          ) : activeTab === activePublicationTab && (dbProgramme?.publication_tab_name || publication) ? (
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm">
              {(() => {
                const publicationEvents = programmeEvents.filter(
                  ev => ev.programme_section === activePublicationTab ||
                        (ev.programme_section || '').includes(activePublicationTab || '')
                );
                
                const introEvent = publicationEvents.find(ev => ev.category === 'Publication' && ev.title === 'Publication Intro');
                const introText = introEvent ? introEvent.description : `Publications & articles from ${activePublicationTab}`;
                const displayEvents = publicationEvents.filter(ev => !(ev.category === 'Publication' && ev.title === 'Publication Intro'));

                return (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] mb-3">{activePublicationTab}</h2>
                      <p className="text-gray-600 text-base leading-relaxed max-w-4xl">{introText}</p>
                    </div>
                    {displayEvents.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayEvents.map(ev => (
                    <div
                      key={ev.id}
                      onClick={() => { setSelectedEvent(ev); setCurrentImageIndex(0); }}
                      className="group/card flex flex-col rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative h-56 overflow-hidden">
                        {ev.images && ev.images[0] ? (
                          <img src={ev.images[0]} alt={ev.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#123B6D]/10 to-[#D4A017]/10 flex items-center justify-center">
                            <BookOpen className="text-[#D4A017]" size={48} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#123B6D] tracking-wide shadow-sm">
                            {new Date(ev.published_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="font-bold text-[#1E293B] group-hover/card:text-[#123B6D] transition-colors mb-2 text-lg leading-tight">{ev.title}</h4>
                        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3 flex-1 mb-4">{ev.description}</p>
                        <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] group-hover/card:gap-2 transition-all">
                          View Details <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <BookOpen className="text-[#3B82F6] mb-4" size={48} />
                        <h3 className="text-lg font-bold text-[#123B6D] mb-1">{activePublicationTab}</h3>
                        <p className="text-gray-500 text-sm">Publications will appear here once published by admin.</p>
                      </div>
                    )}
                  </>
                );
              })()}
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
