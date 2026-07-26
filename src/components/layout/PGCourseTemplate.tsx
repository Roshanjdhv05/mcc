"use client";

import React, { useState, useEffect } from 'react';
import {
  Clock, Award, Send, Download, CheckCircle2,
  Users, GraduationCap, FileText, BookOpen,
  UserCircle, Calendar, Building2, ChevronRight,
  Mail, Phone, Briefcase
} from 'lucide-react';

interface Coordinator {
  name: string;
  designation: string | React.ReactNode;
  email?: string;
  phone?: string;
  education?: string;
  experience?: string;
  image?: string;
}

interface PGCourseTemplateProps {
  title: string;
  description?: string;
  introductionContent?: React.ReactNode;
  syllabusContent?: React.ReactNode;
  coordinators?: Coordinator[];
  quickActionsData?: { title: string; icon: any; info: string }[];
  duration?: string;
  seats?: string;
  timing?: string;
  eligibility?: string;
}

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function PGCourseTemplate({
  title,
  description,
  introductionContent,
  syllabusContent,
  coordinators = [],
  quickActionsData: customQuickActionsData,
  duration = '2 Years',
  seats = '60',
  timing = '5:30 PM – 8:30 PM',
  eligibility = 'B.Com from any recognised University.',
}: PGCourseTemplateProps) {
  const tabs = ['About', 'Structure', 'Syllabus', 'Events & Activities'];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isReadMore, setIsReadMore] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const tab = tabs.find((t) => slugify(t) === hash);
      if (tab) setActiveTab(tab);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${slugify(tab)}`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">

      {/* ── Hero ── */}
      <div className="bg-white pb-8 md:pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[#EBF3FF] rounded-full blur-3xl opacity-40 -z-10" />

        <div className="max-w-7xl mx-auto px-4 md:px-12 pt-6 md:pt-8 flex flex-col gap-4 md:gap-8 relative">

          {/* Breadcrumb */}
          <div className="text-[10px] md:text-sm text-gray-500 font-medium tracking-wide w-full truncate">
            Home <span className="mx-1 md:mx-2">{'>'}</span> Programmes <span className="mx-1 md:mx-2">{'>'}</span> Postgraduate <span className="mx-1 md:mx-2">{'>'}</span> <span className="text-[#123B6D]">{title}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center w-full gap-6 md:gap-12">

            {/* Left Content */}
            <div className="flex-1 space-y-4 md:space-y-6 z-10 relative">

              {/* Badge */}
              <div className="inline-block bg-[#EBF3FF] text-[#123B6D] text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-wider">
                Postgraduate Programme
              </div>

              {/* Title */}
              <h1 className="text-2xl xs:text-3xl md:text-5xl lg:text-[54px] font-bold text-[#123B6D] leading-tight font-[var(--font-heading)]">
                {title}
              </h1>

              <p className="text-gray-600 text-xs md:text-lg max-w-xl leading-relaxed mt-2 md:mt-4">
                {description || 'A rigorous postgraduate programme designed to develop advanced expertise in commerce and management.'}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-4 md:hidden gap-2 pt-4">
                <div className="flex flex-col items-center text-center gap-1">
                  <Clock className="text-[#3B82F6]" size={22} strokeWidth={1.5} />
                  <span className="text-[9px] font-bold text-[#1E293B] leading-tight">{duration}<br /><span className="font-medium text-gray-500">Duration</span></span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <Calendar className="text-[#10B981]" size={22} strokeWidth={1.5} />
                  <span className="text-[9px] font-bold text-[#1E293B] leading-tight">4<br /><span className="font-medium text-gray-500">Semesters</span></span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <Users className="text-[#8B5CF6]" size={22} strokeWidth={1.5} />
                  <span className="text-[9px] font-bold text-[#1E293B] leading-tight">{seats}<br /><span className="font-medium text-gray-500">Seats</span></span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <Building2 className="text-[#F59E0B]" size={22} strokeWidth={1.5} />
                  <span className="text-[9px] font-bold text-[#1E293B] leading-tight">Evening<br /><span className="font-medium text-gray-500">Session</span></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row gap-3 pt-4 w-full">
                <a
                  href="https://enrollonline.co.in/Registration/Apply/MCC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#123B6D] hover:bg-[#0f3059] text-white px-4 md:px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all shadow-md"
                >
                  <Send size={16} /> Apply Now
                </a>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] hover:border-[#123B6D] text-[#1E293B] px-4 md:px-8 py-3 rounded-full text-sm md:text-base font-bold transition-colors">
                  <Download size={16} /> <span className="hidden xs:inline">Download</span> Brochure
                </button>
              </div>
            </div>

            {/* Right Visual (Desktop) */}
            <div className="hidden lg:flex flex-1 relative w-full justify-center items-center h-[400px]">
              <div className="absolute top-0 w-full flex items-center justify-center gap-4 z-10">
                <div className="h-px bg-[#D4A017] w-16" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                <h3 className="text-sm font-bold tracking-widest text-[#123B6D] uppercase">Programme Snapshot</h3>
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                <div className="h-px bg-[#D4A017] w-16" />
              </div>

              <div className="relative w-[360px] h-[360px] flex items-center justify-center mt-8">
                {/* Central Circle */}
                <div className="absolute z-20 w-[150px] h-[150px] bg-white rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center border-4 border-gray-50/50">
                  <GraduationCap size={28} className="text-[#123B6D] mb-2" strokeWidth={1.5} />
                  <h2 className="text-2xl font-bold text-[#123B6D] text-center px-4 leading-none font-[var(--font-heading)]">
                    {title.split(' ')[0]}
                  </h2>
                  <div className="w-6 h-0.5 bg-[#F59E0B] mt-2" />
                </div>

                {/* Rotating Ring */}
                <div className="absolute w-full h-full flex items-center justify-center [animation:spin_40s_linear_infinite]">
                  <div className="absolute w-[270px] h-[270px] rounded-full border border-gray-200 z-0" />

                  {/* Satellite 1: Duration */}
                  <div className="absolute top-[5%] left-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[90px] h-[90px] bg-white rounded-full shadow-lg border border-[#3B82F6]/30 flex flex-col items-center justify-center relative">
                      <Clock size={16} className="text-[#3B82F6] mb-1" strokeWidth={2} />
                      <span className="text-2xl font-bold text-[#123B6D] leading-none mb-1 font-[var(--font-heading)]">2</span>
                      <span className="text-[7px] font-bold tracking-widest text-[#1E293B] uppercase">Years</span>
                      <div className="absolute -bottom-3 bg-[#3B82F6] text-white text-[7px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase shadow-md">
                        Duration
                      </div>
                    </div>
                  </div>

                  {/* Satellite 2: Semesters */}
                  <div className="absolute top-[5%] right-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[90px] h-[90px] bg-white rounded-full shadow-lg border border-[#F59E0B]/30 flex flex-col items-center justify-center relative">
                      <Building2 size={16} className="text-[#F59E0B] mb-1" strokeWidth={2} />
                      <span className="text-2xl font-bold text-[#123B6D] leading-none mb-1 font-[var(--font-heading)]">4</span>
                      <span className="text-[7px] font-bold tracking-widest text-[#1E293B] uppercase">Semesters</span>
                      <div className="absolute -bottom-3 bg-[#F59E0B] text-white text-[7px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase shadow-md">
                        Structure
                      </div>
                    </div>
                  </div>

                  {/* Satellite 3: Seats */}
                  <div className="absolute bottom-[5%] left-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[98px] h-[98px] bg-white rounded-full shadow-lg border border-[#10B981]/30 flex flex-col items-center justify-center relative">
                      <Users size={16} className="text-[#10B981] mb-1" strokeWidth={2} />
                      <span className="text-2xl font-bold text-[#123B6D] leading-none mb-1 font-[var(--font-heading)]">{seats}</span>
                      <span className="text-[7px] font-bold tracking-widest text-[#1E293B] uppercase">Seats</span>
                      <div className="absolute -bottom-3 bg-[#10B981] text-white text-[7px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase shadow-md">
                        Capacity
                      </div>
                    </div>
                  </div>

                  {/* Satellite 4: Timing */}
                  <div className="absolute bottom-[5%] right-[5%] z-30 flex flex-col items-center [animation:spin_40s_linear_infinite_reverse]">
                    <div className="w-[98px] h-[98px] bg-white rounded-full shadow-lg border border-[#8B5CF6]/30 flex flex-col items-center justify-center relative">
                      <Calendar size={16} className="text-[#8B5CF6] mb-1" strokeWidth={2} />
                      <span className="text-[10px] font-bold text-[#123B6D] leading-snug text-center px-2 font-[var(--font-heading)]">Time</span>
                      <span className="text-[7px] font-bold text-gray-500 text-center px-1">{timing}</span>
                      <div className="absolute -bottom-3 bg-[#8B5CF6] text-white text-[7px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase shadow-md">
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

      {/* ── Content Area ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-4 md:-mt-8 relative z-20 flex flex-col gap-6 md:gap-8 pb-24">

        {/* Quick Info Cards */}
        {customQuickActionsData && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {customQuickActionsData.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EBF3FF] flex items-center justify-center">
                  {typeof item.icon === 'function' ? <item.icon size={16} className="text-[#123B6D]" /> : item.icon}
                </div>
                <p className="text-[10px] md:text-xs font-bold text-[#64748B] uppercase tracking-wider">{item.title}</p>
                <p className="text-xs md:text-sm font-semibold text-[#1E293B] leading-snug">{item.info}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs Navigation */}
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

        {/* Tab Content */}
        <div>
          {activeTab === 'About' ? (
            <div className="grid grid-cols-1 gap-6 md:gap-8">

              {/* About / Introduction */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm">
                <h2 className="text-lg md:text-xl font-bold text-[#1E293B] mb-4">About the Programme</h2>
                <div className="relative">
                  <div className={`prose prose-sm text-gray-600 transition-all duration-500 overflow-hidden text-xs md:text-sm ${!isReadMore ? 'max-h-[160px] md:max-h-[200px]' : 'max-h-[2000px]'}`}>
                    {introductionContent || <p>{description}</p>}
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
              </div>

              {/* Co-ordinator Details */}
              {coordinators.length > 0 && (
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] flex items-center justify-center">
                      <Users className="text-[#123B6D]" size={20} />
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-[#123B6D]">Programme Co-ordinator(s)</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {coordinators.map((coord, idx) => (
                      <div key={idx} className="flex items-start gap-4 bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0]">
                        <div className="w-14 h-14 rounded-xl bg-[#EBF3FF] flex items-center justify-center shrink-0 overflow-hidden">
                          {coord.image
                            ? <img src={coord.image} alt={coord.name} className="w-full h-full object-cover" />
                            : <UserCircle size={32} className="text-[#123B6D]" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#123B6D] text-sm leading-tight">{coord.name}</h3>
                          <p className="text-[#D4A017] text-[11px] font-bold uppercase tracking-wider mt-0.5">{coord.designation}</p>
                          {coord.education && (
                            <p className="text-gray-500 text-[11px] mt-1 leading-snug">{coord.education}</p>
                          )}
                          {coord.email && (
                            <a href={`mailto:${coord.email}`} className="flex items-center gap-1 text-[#3B82F6] text-[11px] mt-1 hover:underline truncate">
                              <Mail size={10} /> {coord.email}
                            </a>
                          )}
                          {coord.phone && (
                            <a href={`tel:${coord.phone}`} className="flex items-center gap-1 text-gray-500 text-[11px] mt-0.5 hover:underline">
                              <Phone size={10} /> {coord.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

          ) : activeTab === 'Events & Activities' ? (
            <div className="bg-white rounded-3xl p-12 border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-[#EBF3FF] flex items-center justify-center mb-4">
                <Award className="text-[#D4A017]" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#123B6D] mb-2">Events & Activities</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-sm">
                Events and activity details for this programme are being compiled and will be available shortly.
              </p>
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
