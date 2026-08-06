'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Download, FileText, Calendar, Users, Target, BarChart2, Shield, Star, Leaf, BookOpen, Mic, GraduationCap, Accessibility, ArrowRight } from 'lucide-react';


const meetings = [
  { date: 'March 2024', agenda: 'Annual Quality Review & Academic Calendar Planning', minutes: true },
  { date: 'December 2023', agenda: 'Mid-Year Progress Review & Feedback Analysis', minutes: true },
  { date: 'September 2023', agenda: 'NAAC Preparation & SSR Review', minutes: true },
  { date: 'June 2023', agenda: 'Annual Report Finalisation & Action Plan 2023-24', minutes: true },
];

const reports = [
  { title: 'AQAR 2023–24', desc: 'Annual Quality Assurance Report for 2023-24', size: '2.4 MB' },
  { title: 'AQAR 2022–23', desc: 'Annual Quality Assurance Report for 2022-23', size: '2.1 MB' },
  { title: 'AQAR 2021–22', desc: 'Annual Quality Assurance Report for 2021-22', size: '1.8 MB' },
  { title: 'AQAR 2020–21', desc: 'Annual Quality Assurance Report for 2020-21', size: '1.6 MB' },
];

const iqacMembers = [
  { name: 'Dr. Suresh Mehta', role: 'Chairperson (Principal)', category: 'Management' },
  { name: 'Prof. Anita Sharma', role: 'IQAC Coordinator', category: 'Faculty' },
  { name: 'Dr. Rakesh Gupta', role: 'Member', category: 'Faculty' },
  { name: 'Prof. Seema Patil', role: 'Member', category: 'Faculty' },
  { name: 'Mr. Kiran Shah', role: 'External Expert', category: 'Industry' },
  { name: 'Ms. Priya Desai', role: 'Alumni Representative', category: 'Alumni' },
];

const quickLinks = [
  { icon: <Shield className="w-5 h-5" />, label: 'Quality Policy', href: '/iqac/quality-policy' },
  { icon: <Users className="w-5 h-5" />, label: 'Members (Year Wise)', href: '/iqac#members' },
  { icon: <FileText className="w-5 h-5" />, label: 'Minutes of the Meeting', href: '/iqac/minutes' },
  { icon: <Star className="w-5 h-5" />, label: 'Best Practices', href: '/iqac#best-practices' },
  { icon: <BarChart2 className="w-5 h-5" />, label: 'Institutional Distinctiveness', href: '/iqac#distinctiveness' },
  { icon: <BookOpen className="w-5 h-5" />, label: 'Annual Reports', href: '/iqac#annual-reports' },
  { icon: <Download className="w-5 h-5" />, label: 'AQAR', href: '/iqac#aqar' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Academic Calendar', href: '/iqac#academic-calendar' },
  { icon: <Mic className="w-5 h-5" />, label: 'Tilak Smruti Vyakhyan', href: '/about/tilak-lecture' },
  { icon: <Mic className="w-5 h-5" />, label: 'Bapat Memorial Lecture', href: '/about/bg-bapat-lecture' },
  { icon: <GraduationCap className="w-5 h-5" />, label: 'Deeksharambh', href: '/iqac#deeksharambh' },
  { icon: <Accessibility className="w-5 h-5" />, label: 'Disability Sensitisation', href: '/iqac#disability' },
  { icon: <Leaf className="w-5 h-5" />, label: 'Environmental Commitments', href: '/iqac#environment' },
];

export default function IQACPage() {
  // Mobile ticker state
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  const pausedOffset = useRef(0);

  const resumeAutoScroll = useCallback(() => setIsAutoScrolling(true), []);

  const pauseAutoScroll = useCallback(() => {
    if (tickerRef.current) {
      const matrix = new DOMMatrixReadOnly(window.getComputedStyle(tickerRef.current).transform);
      pausedOffset.current = matrix.m41;
    }
    setIsAutoScrolling(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(resumeAutoScroll, 5000);
  }, [resumeAutoScroll]);

  useEffect(() => () => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-12 font-sans">


      {/* ── Hero ── */}
      <div id="about" className="relative py-14 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute left-8 lg:left-16 top-10 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#123B6D]/40" />)}
        </div>
        <div className="absolute right-8 lg:right-16 top-10 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#123B6D]/40" />)}
        </div>
        <div className="inline-flex items-center gap-2 bg-[#123B6D]/10 border border-[#123B6D]/20 text-[#123B6D] px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
          <Target size={13} /> Internal Quality Assurance Cell
        </div>
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-[#123B6D] tracking-tight mb-4">
          IQAC
        </h1>
        <p className="text-gray-600 text-sm lg:text-base max-w-2xl px-4">
          Ensuring continuous quality enhancement through systematic assessment, feedback, and implementation of best practices at Mulund College of Commerce.
        </p>
      </div>

      {/* ── About IQAC Details ── */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-2 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <p className="text-gray-700 leading-relaxed mb-10 text-justify text-[15px]">
            Internal Quality Assurance Cell (IQAC) is a significant administrative body that is responsible for quality matters. It is the prime responsibility of IQAC to initiate, plan and supervise various necessary activities to increase the quality of the education imparted in a higher education institution. IQAC facilitates the creation of a learner-centric environment conducive for quality education, and it arranges for feedback responses from students, parents and other stakeholders on quality-related institutional processes.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Vision */}
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#123B6D] flex items-center justify-center text-white shrink-0">
                  <Target size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#123B6D]">Vision</h3>
              </div>
              <p className="text-gray-700 italic border-l-4 border-[#D4A017] pl-4 text-sm leading-relaxed">
                "To build and ensure a quality culture aimed at all round excellence at the institutional level."
              </p>
            </div>

            {/* Mission */}
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#123B6D] flex items-center justify-center text-white shrink-0">
                  <Target size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#123B6D]">Mission</h3>
              </div>
              <div className="space-y-3 text-gray-700 italic border-l-4 border-[#D4A017] pl-4 text-sm leading-relaxed">
                <p>"To channelize and systematize the efforts and measures of an institution towards academic excellence."</p>
                <p>"To be the driving force for ushering in quality to remove deficiencies and enhance quality."</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Goal & Purpose */}
            <div className="space-y-10">
              <div>
                <h3 className="text-lg font-bold text-[#123B6D] mb-5 flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-[#D4A017]/20 text-[#D4A017]">
                    <Target size={14} />
                  </div> 
                  Goal
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span className="text-gray-700 text-sm leading-relaxed">To develop a quality system for conscious, consistent and catalytic programmed action to improve the academic and administrative performance of the Institution.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span className="text-gray-700 text-sm leading-relaxed">To promote measures for institutional functioning towards quality enhancement through internationalization of quality culture and institutionalization of best practices.</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-[#123B6D] mb-5 flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-[#D4A017]/20 text-[#D4A017]">
                    <Target size={14} />
                  </div> 
                  Purpose
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span className="text-gray-700 text-sm leading-relaxed">Improvement in all operations of the Institution.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span className="text-gray-700 text-sm leading-relaxed">Networking with the stakeholders of the Institution.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Objectives */}
            <div>
              <h3 className="text-lg font-bold text-[#123B6D] mb-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded flex items-center justify-center bg-[#D4A017]/20 text-[#D4A017]">
                  <Target size={14} />
                </div> 
                Objectives
              </h3>
              <ul className="space-y-4">
                {[
                  "Develop mechanism for improvements in academic and administrative performance.",
                  "Promote quality culture in all facets of Institution's functioning.",
                  "To facilitate the integration of the various activities of the institution and institutionalize the best practices.",
                  "To provide a sound basis for decision making imbibing all the dimensions of service quality to improve institutional functioning.",
                  "To act as a change agent in the Institution.",
                  "To coordinate and improve internal communication to facilitate greater policy implementation and quality assurance towards its stakeholders."
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
