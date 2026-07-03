'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Globe, Building2, Calendar, 
  Target, Eye, Flag, CheckCircle2, Download, 
  Home, UserPlus, FileText, Trophy, BookOpen, Image as ImageIcon, MapPin, Mail,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function AlumniPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Users, value: '15,000+', label: 'Alumni' },
    { icon: Globe, value: '50+', label: 'Countries' },
    { icon: Building2, value: '300+', label: 'Companies' },
    { icon: Calendar, value: '1970', label: 'Legacy', prefix: 'Since' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'register', label: 'Register', icon: UserPlus },
    { id: 'certificate', label: 'Certificate', icon: FileText },
    { id: 'hall-of-fame', label: 'Hall of Fame', icon: Trophy },
    { id: 'directory', label: 'Alumni Directory', icon: BookOpen },
    { id: 'stories', label: 'Stories', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'map', label: 'Alumni Map', icon: MapPin },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* ── HERO SECTION ── */}
      <section className="relative bg-white pt-24 md:pt-32 pb-16 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="flex-1 z-10 w-full lg:pr-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              {/* Dot pattern decorative */}
              <div className="absolute -top-6 -left-8 w-16 h-24 opacity-30 flex flex-wrap gap-2" style={{ backgroundImage: 'radial-gradient(#CBD5E1 2px, transparent 2px)', backgroundSize: '12px 12px' }} />
              
              <h1 className="text-5xl md:text-6xl font-bold text-[#123B6D] mb-4 relative z-10 font-[var(--font-heading)] tracking-tight">
                Alumni
              </h1>
              <div className="w-16 h-1.5 bg-[#D4A017] mb-6 rounded-full" />
              
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-lg leading-snug">
                Reconnecting with our past,<br/>
                <span className="text-gray-500">inspiring the future.</span>
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 md:gap-10 mb-10">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="text-[#123B6D]">
                      <stat.icon size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      {stat.prefix && <div className="text-xs text-gray-500 font-semibold">{stat.prefix}</div>}
                      <div className="font-bold text-xl text-[#1E293B] leading-none">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="bg-[#123B6D] hover:bg-[#0F305A] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-900/20">
                  Join Alumni Network
                </button>
                <button className="bg-white hover:bg-slate-50 text-[#123B6D] border-2 border-[#123B6D] px-8 py-2.5 rounded-lg font-semibold transition-colors">
                  Register Now
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Image Collage / Arc */}
          <div className="flex-1 relative w-full h-[400px] lg:h-[500px] hidden md:block">
            {/* The blue and gold arc background */}
            <div className="absolute top-0 right-[-10%] bottom-0 w-[120%] bg-[#123B6D] rounded-l-full overflow-hidden border-l-[12px] border-[#D4A017] shadow-2xl">
              
              {/* Collage Grid */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2 pl-24">
                <div className="col-span-2 row-span-1 bg-gray-200 overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80" alt="Alumni Large Group" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="col-span-1 row-span-1 bg-gray-300 overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80" alt="Alumni Meet" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <h3 className="text-white font-bold text-lg drop-shadow-md">ALUMNI MEET 2024</h3>
                    <p className="text-white text-xs drop-shadow-md">Reconnect. Share. Inspire.</p>
                  </div>
                </div>
                <div className="col-span-1 row-span-1 bg-gray-400 overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80" alt="College Building" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Circular Badge */}
            <div className="absolute top-1/2 left-[5%] -translate-y-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-xl border-[6px] border-[#F8FAFC] z-20">
              <Users size={32} className="text-[#123B6D] mb-1" />
              <span className="font-bold text-[#123B6D] text-sm leading-tight text-center">MCC<br/>ALUMNI</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION BAR ── */}
      <div className="bg-[#123B6D] sticky top-[80px] z-40 shadow-md overflow-x-auto no-scrollbar">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-1.5 py-4 px-4 min-w-[100px] transition-all relative ${
                activeTab === tab.id ? 'text-[#D4A017]' : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
              <span className="text-xs font-semibold tracking-wide whitespace-nowrap">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4A017]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

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
              {/* Section 1: About & At a Glance */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_300px] xl:grid-cols-[1fr_2fr_350px] gap-8">
                
                {/* Left Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg h-[300px] lg:h-auto border border-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80" 
                    alt="Campus" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Center: About Text & Mission/Vision */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-[#123B6D] mb-4">About Alumni Association</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    The MCC Alumni Association is a vibrant community of former students, working together to support the college and each other. We believe in giving back, sharing knowledge, and creating opportunities that make a difference.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-[#123B6D] font-bold mb-2">
                        <Target size={20} />
                        <h3>Our Mission</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        To connect, engage and empower alumni to contribute to the growth of the college and society.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[#123B6D] font-bold mb-2">
                        <Eye size={20} />
                        <h3>Our Vision</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        To be a globally connected alumni network that inspires lifelong relationships and creates impact.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[#123B6D] font-bold mb-2">
                        <Flag size={20} />
                        <h3>Our Objectives</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Foster networking, encourage mentorship, promote collaboration and support alma mater.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Alumni At A Glance Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 self-start">
                  <h3 className="text-xl font-bold text-[#123B6D] mb-6">Alumni At A Glance</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-lg text-[#123B6D]">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">15,000+</div>
                        <div className="text-sm text-gray-500">Global Alumni</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-lg text-[#123B6D]">
                        <Globe size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">50+</div>
                        <div className="text-sm text-gray-500">Countries</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-lg text-[#123B6D]">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">300+</div>
                        <div className="text-sm text-gray-500">Top Companies</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-lg text-[#123B6D]">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">100+</div>
                        <div className="text-sm text-gray-500">Annual Events</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 p-2.5 rounded-lg text-[#123B6D]">
                        <Trophy size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">1000+</div>
                        <div className="text-sm text-gray-500">Success Stories</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <hr className="border-gray-200" />

              {/* Section 2: Registration & Benefits */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_300px] xl:grid-cols-[1fr_2fr_350px] gap-8 items-start">
                
                {/* Left: Benefits */}
                <div>
                  <h2 className="text-2xl font-bold text-[#123B6D] mb-2">Become a Part of Our Alumni Family</h2>
                  <p className="text-sm text-gray-500 mb-6">Stay connected. Grow together. Give back.</p>
                  
                  <h4 className="font-bold text-[#123B6D] mb-4">Benefits of Joining</h4>
                  <ul className="space-y-3">
                    {[
                      'Strong Professional Network',
                      'Career Opportunities & Referrals',
                      'Mentorship & Guidance',
                      'Invitations to Events',
                      'Alumni Newsletter',
                      'Lifelong Connections'
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <CheckCircle2 size={16} className="text-[#123B6D] shrink-0" fill="#EBF3FF" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Center: Registration Process Timeline */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm relative w-full overflow-x-auto">
                  <h3 className="text-xl font-bold text-[#123B6D] mb-8 text-center md:text-left">Registration Process</h3>
                  
                  <div className="flex items-center justify-between min-w-[600px] mb-10 px-4">
                    {/* Steps */}
                    {[
                      { num: 1, title: 'Fill Registration', subtitle: 'Form', icon: UserPlus },
                      { num: 2, title: 'Submit & Verify', subtitle: 'Details', icon: FileText },
                      { num: 3, title: 'Approval from', subtitle: 'Alumni Office', icon: CheckCircle2 },
                      { num: 4, title: 'Welcome to', subtitle: 'MCC Alumni', icon: Users },
                    ].map((step, index) => (
                      <React.Fragment key={step.num}>
                        <div className="flex flex-col items-center relative z-10 w-24 text-center">
                          <div className="w-6 h-6 bg-[#123B6D] text-white rounded-full flex items-center justify-center text-xs font-bold mb-2 border-2 border-white shadow-sm z-20 absolute -top-3">
                            {step.num}
                          </div>
                          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#123B6D] mb-3 border-2 border-blue-100">
                            <step.icon size={24} />
                          </div>
                          <span className="text-xs font-semibold text-[#123B6D] leading-tight">{step.title}</span>
                          <span className="text-xs text-gray-500">{step.subtitle}</span>
                        </div>
                        {index < 3 && (
                          <div className="flex-1 h-px bg-gray-300 relative mx-2">
                            <ChevronRight size={16} className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <button className="flex items-center gap-2 bg-[#123B6D] hover:bg-[#0F305A] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm shadow-md">
                      <UserPlus size={18} />
                      Register Now
                    </button>
                    <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-[#123B6D] border border-gray-300 px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm shadow-sm">
                      <Download size={18} />
                      Download Registration Form
                    </button>
                  </div>
                </div>

                {/* Right: Stay Connected */}
                <div className="lg:pl-8 lg:border-l border-gray-200 self-stretch flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-[#123B6D] mb-2">Stay Connected</h3>
                  <div className="w-10 h-1 bg-[#D4A017] mb-4" />
                  <p className="text-sm text-gray-600 mb-6">
                    Follow our social media handles and never miss an update.
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  </div>
                  
                  {/* Decorative dots */}
                  <div className="mt-8 flex justify-end opacity-20">
                    <div className="w-16 h-16 flex flex-wrap gap-2" style={{ backgroundImage: 'radial-gradient(#123B6D 2px, transparent 2px)', backgroundSize: '12px 12px' }} />
                  </div>
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
