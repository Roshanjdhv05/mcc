'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Globe, Building2, Calendar, 
  Target, Eye, Flag, CheckCircle2, Download, 
  Home, UserPlus, FileText, Trophy, BookOpen, Image as ImageIcon, MapPin, Mail,
  ChevronRight, GraduationCap, Briefcase
} from 'lucide-react';
import Link from 'next/link';

const wallOfFameStudents = [
  { 
    name: 'Alumni Name', 
    initials: 'AN',
    course: 'B.Com (Honours)',
    batch: 'Class of 2018',
    role: 'Senior Financial Analyst',
    company: 'Deloitte India',
    linkedin: '#',
    description: 'Leading cross-functional finance teams and driving strategic insights across global markets with over 6 years...',
  },
  { 
    name: 'Priya Patel', 
    initials: 'PP',
    course: 'B.Sc. IT',
    batch: 'Class of 2019',
    role: 'Software Engineer',
    company: 'Microsoft',
    linkedin: '#',
    description: 'Developing scalable cloud solutions and mentoring junior developers in the Azure team.',
  },
  { 
    name: 'Amit Kumar', 
    initials: 'AK',
    course: 'BMS',
    batch: 'Class of 2020',
    role: 'Marketing Manager',
    company: 'Unilever',
    linkedin: '#',
    description: 'Spearheading national marketing campaigns and driving brand growth in the FMCG sector.',
  },
  { 
    name: 'Sneha Rao', 
    initials: 'SR',
    course: 'B.Com (Accounting)',
    batch: 'Class of 2021',
    role: 'Audit Associate',
    company: 'KPMG',
    linkedin: '#',
    description: 'Conducting comprehensive financial audits and ensuring compliance for Fortune 500 clients.',
  },
];

export default function AlumniPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Users, value: '15,000+', label: 'Alumni' },
    { icon: Globe, value: '50+', label: 'Countries' },
    { icon: Building2, value: '300+', label: 'Companies' },
    { icon: Calendar, value: '1970', label: 'Legacy', prefix: 'Since' },
  ];



  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 mt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Section 1: About Alumni Association */}
              <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-10 items-stretch">

                {/* Left Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg h-[320px] lg:h-auto border border-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80" 
                    alt="Campus" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right: About Text & Mission/Vision/Objectives */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-4xl font-bold text-[#123B6D] mb-5">About Alumni Association</h2>
                  <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                    The MCC Alumni Association is a vibrant community of former students, working together to support the college and each other. We believe in giving back, sharing knowledge, and creating opportunities that make a difference.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 text-[#123B6D] font-bold mb-3">
                        <div className="bg-blue-50 p-2.5 rounded-xl">
                          <Target size={22} />
                        </div>
                        <h3 className="text-lg">Our Mission</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        To connect, engage and empower alumni to contribute to the growth of the college and society.
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 text-[#123B6D] font-bold mb-3">
                        <div className="bg-blue-50 p-2.5 rounded-xl">
                          <Eye size={22} />
                        </div>
                        <h3 className="text-lg">Our Vision</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        To be a globally connected alumni network that inspires lifelong relationships and creates impact.
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 text-[#123B6D] font-bold mb-3">
                        <div className="bg-blue-50 p-2.5 rounded-xl">
                          <Flag size={22} />
                        </div>
                        <h3 className="text-lg">Our Objectives</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Foster networking, encourage mentorship, promote collaboration and support alma mater.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Wall of Fame / Alumni Cards */}
              <div className="mt-16">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Wall of Fame</h2>
                    <p className="text-sm text-[#64748B] mt-1">Celebrating our outstanding achievers and prominent alumni</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pb-8">
                  {wallOfFameStudents.map((student, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-full hover:shadow-md transition-shadow">
                      {/* Top Section */}
                      <div className="flex gap-4 mb-5">
                        <div className="w-24 h-24 rounded-2xl bg-[#185392] text-white flex items-center justify-center text-3xl font-bold shrink-0">
                          {student.initials}
                        </div>
                        <div className="flex flex-col gap-1.5 pt-1">
                          <h3 className="font-bold text-[#123B6D] text-lg leading-tight">{student.name}</h3>
                          <div className="flex items-center gap-2 text-[13px] text-gray-600">
                            <GraduationCap size={14} className="text-[#D4A017] shrink-0" />
                            <span>{student.course}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[13px] text-gray-600">
                            <Calendar size={14} className="text-blue-400 shrink-0" />
                            <span>{student.batch}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-700">
                            <Briefcase size={14} className="text-emerald-500 shrink-0" />
                            <span>{student.role}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[13px] text-gray-500">
                            <Building2 size={14} className="text-gray-400 shrink-0" />
                            <span>{student.company}</span>
                          </div>
                        </div>
                      </div>

                      {/* LinkedIn Button */}
                      <a href={student.linkedin} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-blue-200 bg-blue-50/50 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors mb-4">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        View on LinkedIn
                      </a>

                      {/* Description Box */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex-1">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {student.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


            </motion.div>
          )}

          {activeTab !== 'overview' && (
            <motion.div
              key="other"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-20 text-center min-h-[400px] flex flex-col items-center justify-center"
            >
              <h2 className="text-3xl font-bold text-[#123B6D] mb-4 capitalize">{activeTab.replace('-', ' ')}</h2>
              <p className="text-gray-500 max-w-lg mx-auto">This section is currently under development. Please check back later for updates regarding the alumni {activeTab.replace('-', ' ')}.</p>
              {activeTab === 'hall-of-fame' && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
                  {['2015-2025', '2005-2015', '1995-2005', '1986-1995', '1973-1985'].map(batch => (
                     <div key={batch} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-[#123B6D] transition-colors">
                       <span className="font-bold text-[#123B6D]">{batch}</span>
                     </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
