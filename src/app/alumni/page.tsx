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

const illustriousAlumni = [
  { 
    name: 'Mandar Phadke',
    course: 'BCOM',
    batch: 'Class of 2008',
    role: 'CFO - Copper',
    company: 'Hinduja Indus, Mumbai',
    linkedin: '#',
    description: 'AIR 1 - CA Final (All India Rank 1)',
    image: '/illustrate alumini/Mandar Dixit.png',
  },
  { 
    name: 'Amit Gupta',
    course: 'BCOM',
    batch: 'Class of 2022',
    role: 'Actuarial',
    company: 'SBI Life Insurance, Mumbai',
    linkedin: '#',
    description: 'Cleared 10/13 Actuarial Exams',
    image: '/illustrate alumini/Amit Gupta.jpg',
  },
  { 
    name: 'Aastha V Doshi',
    course: 'BCOM',
    batch: 'Class of 2022',
    role: 'CA / CS',
    company: 'Alpha Alternates, Mumbai',
    linkedin: '#',
    description: 'AIR 3 - CS (All India Rank 3 in CS)',
    image: '/illustrate alumini/Aastha Dedhiya.png',
  },
  { 
    name: 'Sreejesh Pillai',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Senior Analyst',
    company: 'Citigroup Global, BKC - Mumbai',
    linkedin: '#',
    description: 'AIR 37 - CA (Final)',
    image: '/illustrate alumini/Sreejesh Pillai.jpg',
  },
  { 
    name: 'Kriti Singhi',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Associate',
    company: 'ENK Capital, Mumbai',
    linkedin: '#',
    description: 'AIR 37 - CA (Final)',
    image: '/illustrate alumini/Kriti Singhvi.jpeg',
  },
  { 
    name: 'Parth Gupta',
    course: 'BCOM',
    batch: 'Class of 2021',
    role: 'Junior Associate',
    company: 'McKinsey and Company, Mumbai',
    linkedin: '#',
    description: 'AIR 8 - CA (Final)',
    image: '/illustrate alumini/Parth Gupta.jpg',
  },
  { 
    name: 'Sohan Manjrekar',
    course: 'BCOM',
    batch: 'Class of 2025',
    role: 'Professional',
    company: 'CA Finalist',
    linkedin: '#',
    description: 'AIR 3 - CA (Final)',
    image: '/illustrate alumini/Sohan Manjrekar.jpg',
  },
  { 
    name: 'Shweta S Marathe',
    course: 'BCOM',
    batch: 'Class of 2017',
    role: 'Judicial Trainee',
    company: 'High Court',
    linkedin: '#',
    description: 'AIR 17 - CS',
    image: '/illustrate alumini/SHWETA MARATHE.jpeg',
  },
  { 
    name: 'Rutuja Satam',
    course: 'BCOM',
    batch: 'Class of 2017',
    role: 'Manager',
    company: 'Sec Restaurant',
    linkedin: '#',
    description: 'AIR 5 - CS',
    image: '/illustrate alumini/Rutuja Satam.JPG',
  },
  { 
    name: 'Ameya Joshi',
    course: 'BCOM',
    batch: 'Class of 2017',
    role: 'Program Manager',
    company: 'Williamsburg, VA',
    linkedin: '#',
    description: 'MBA, International Professional',
    image: '/illustrate alumini/Ameya Joshi.jpeg',
  },
  { 
    name: 'Anurag Dhage',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Management Consultant',
    company: 'Mumbai, India',
    linkedin: '#',
    description: 'IIM Kozhikode',
    image: '/illustrate alumini/Anurag Dhage.jpg',
  },
  { 
    name: 'Aishwarya Rajaraman',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Deputy Manager Trust',
    company: 'Mumbai, India',
    linkedin: '#',
    description: 'IIM Ahmedabad',
    image: '/illustrate alumini/Aishwarya Rajaraman.png',
  },
  { 
    name: 'Hariharan Ram',
    course: 'BCOM',
    batch: 'Class of 2008',
    role: 'Assistant Professor',
    company: 'Frankfurt',
    linkedin: '#',
    description: 'US CMA',
    image: '/illustrate alumini/Hariharan R..png',
  },
  { 
    name: 'Rahul Yogesh Pai',
    course: 'BCOM',
    batch: 'Class of 2024',
    role: 'Credit Analyst',
    company: 'Kotak Mahindra, Mumbai',
    linkedin: '#',
    description: 'AIR 40 - CA',
    image: '/illustrate alumini/Rahul Pai.jpg',
  },
  { 
    name: 'Supriya Patil',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Associate Vice President',
    company: 'Tata Capital, Mumbai',
    linkedin: '#',
    description: 'CFA Level 3',
    image: '/illustrate alumini/Supriya Patil.jpeg',
  },
  { 
    name: 'Preethi Shekar',
    course: 'BCOM',
    batch: 'Class of 2018',
    role: 'Director',
    company: 'Deloitte Haskins, Mumbai',
    linkedin: '#',
    description: 'Outstanding Professional Achievement',
    image: '/illustrate alumini/preethi shekar.jpeg',
  },
  { 
    name: 'Nidhi Savla',
    course: 'BCOM',
    batch: 'Class of 2025',
    role: 'Associate',
    company: 'EY, Mumbai',
    linkedin: '#',
    description: 'AIR 40 - CA',
    image: '/illustrate alumini/NIDHI SAVLA.png',
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
                    <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Illustrious Alumni</h2>
                    <p className="text-sm text-[#64748B] mt-1">Celebrating our outstanding achievers and prominent alumni</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pb-8">
                  {illustriousAlumni.map((student, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-full hover:shadow-md transition-shadow">
                      {/* Top Section */}
                      <div className="flex gap-4 mb-5">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-50">
                          <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
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
