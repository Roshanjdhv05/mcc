'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, Target, BookOpen, Users, Phone, Mail, Link2,
  ChevronRight, CheckCircle2, Building2, GraduationCap, MessageSquare, Globe
} from 'lucide-react';

const committeeMembers = [
  { name: 'Dr. Abhilasha N', role: 'Chairperson' },
  { name: 'CA Snehal Chavan', role: 'Member' },
  { name: 'Ms. Seema Attarde', role: 'Member' },
  { name: 'Ms. Alpa Katira', role: 'Member' },
  { name: 'Dr. Shweta Ghare', role: 'Member' },
  { name: 'Dr. Sneha Prajapati', role: 'Member' },
  { name: 'Dr. Deepa Nyaydhish', role: 'Member' },
  { name: 'Ms. Suvarna Sawant', role: 'Member' },
];

const recruitmentPartners = [
  'A to Z Lead Stats', 'Accenture', 'Acuite Rating', 'Asian Paint',
  'Bilivin Education', 'CAGRfunds, Wadala', 'Campgemini', 'Colgate',
  'Deloitte', 'Dow Chemicals International Pvt Ltd', 'Eclex', 'Elysium Capital',
  'Finrex', 'HR Talento', 'ICICI Bank', 'Infosys', 'IT Vedant', 'Kotak Life',
  'KPMG', 'Lab India Analytical', 'Lokmanya Cooperative Bank', 'MorningStar',
  'Nvest', 'Quantum', 'Quate Capital LLP', 'Reliable Analytical Labourities',
  'RiskIQ Company', 'Saraswath Bank', 'Sayba Spaces', 'South India Bank',
  'SP Wealth Associate Mutual Fund', 'Supremus Angel', 'Tensai Company',
  'Thomas Cook', 'Transprice Tax Advisor', 'Ttyssenkrupp', 'Upstox Securities',
  'VAT IT India Shared Services', 'WTW Global Delivery and Solutions India Pvt Ltd',
];

const careerTopics = [
  'Mock Interview',
  'Group Discussion',
  'Profile & Resume Building',
  'Aptitude Test Preparation',
  'LinkedIn Profile Development & Networking',
  'Communication & Soft Skills',
  'Presentation Skills',
  'Interview Skills & Corporate Etiquette',
  'Industry & Career Awareness',
  'Internship & Placement Readiness',
  'Higher Education & Professional Courses',
  'Digital Skills & AI for Career Development',
  'Professional Etiquette & Workplace Behaviour',
];

const missionPoints = [
  'To facilitate quality placement and internship opportunities for students.',
  'To provide comprehensive career guidance and counselling.',
  'To enhance students\' employability and professional skills.',
  'To strengthen industry–academia interaction.',
  'To create awareness about diverse career pathways, higher education and professional opportunities.',
  'To support students in becoming career-ready, confident and future-ready professionals.',
];

const tabs = ['Overview', 'Committee', 'Recruitment Partners', 'Career Guidance', 'Contact'];

export default function PlacementCellPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');

  const filteredPartners = recruitmentPartners.filter(p =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#F0F4F8] min-h-screen pb-24">

      {/* ── HERO ── */}
      <div className="bg-[#123B6D] relative overflow-hidden pt-28 pb-28">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1a5296] rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl opacity-15" />

        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Briefcase size={14} /> MCC Placement Cell
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
            Placement, Career Guidance<br className="hidden md:block" /> & Counselling
          </motion.h1>
          <div className="w-20 h-1.5 bg-[#D4A017] rounded-full mx-auto mb-5" />

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Empowering students with the knowledge, skills, confidence and professional exposure to successfully navigate their career journeys.
          </motion.p>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { value: '39+', label: 'Recruitment Partners' },
              { value: '13', label: 'Career Topics' },
              { value: '8', label: 'Committee Members' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-white/60 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── TAB NAV ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1 h-14">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 h-full px-5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === tab
                    ? 'border-[#123B6D] text-[#123B6D]'
                    : 'border-transparent text-gray-500 hover:text-[#123B6D]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-10">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'Overview' && (
          <div className="space-y-8">

            {/* About */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-10 bg-[#D4A017] rounded-full" />
                <h2 className="text-2xl font-black text-[#123B6D] uppercase tracking-wide">About the Cell</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  The Placement, Career Guidance and Counselling Cell of <strong className="text-[#123B6D]">Mulund College of Commerce (Autonomous), Mulund, Mumbai</strong>, is committed to empowering students with the knowledge, skills, confidence and professional exposure required to successfully navigate their academic and career journeys.
                </p>
                <p>
                  The Cell serves as a bridge between students, academia, industry and prospective employers, facilitating meaningful opportunities for internships, placements, career exploration and professional development. Through structured placement activities, industry interactions, career guidance sessions, counselling programmes, skill-development initiatives and recruitment drives, the Cell supports students in identifying suitable career pathways and preparing themselves for the evolving world of work.
                </p>
                <p>
                  Our initiatives extend beyond campus recruitment. Students are encouraged to develop employability skills, communication abilities, professional competencies, digital skills, leadership qualities and workplace readiness. The Cell also provides guidance on diverse career opportunities across sectors such as Banking and Financial Services, Accounting, Taxation, Consulting, Information Technology, Analytics, Marketing, Human Resources, Education and Entrepreneurship, along with opportunities for higher education and professional qualifications.
                </p>
                <p>
                  The Cell works closely with reputed organisations and industry professionals to provide students with internship opportunities, pre-placement training, industry talks, career awareness programmes, aptitude and interview preparation, resume-building sessions, counselling and campus recruitment opportunities.
                </p>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#123B6D] rounded-3xl p-8 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Target size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wide">Our Vision</h3>
                </div>
                <p className="text-white/80 leading-relaxed text-sm">
                  To create a dynamic career-support ecosystem that enables every student to make informed career decisions, develop industry-relevant competencies and confidently transition from college to career.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#123B6D]/10 rounded-xl flex items-center justify-center">
                    <BookOpen size={20} className="text-[#123B6D]" />
                  </div>
                  <h3 className="text-lg font-black text-[#123B6D] uppercase tracking-wide">Our Mission</h3>
                </div>
                <ul className="space-y-2.5">
                  {missionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 size={15} className="text-[#008e59] mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── COMMITTEE TAB ── */}
        {activeTab === 'Committee' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-10 bg-[#D4A017] rounded-full" />
                <h2 className="text-2xl font-black text-[#123B6D] uppercase tracking-wide">Committee Members</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {committeeMembers.map(({ name, role }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#123B6D]/10 flex items-center justify-center mb-3">
                      <Users size={24} className="text-[#123B6D]" />
                    </div>
                    <h3 className="font-bold text-[#123B6D] text-sm leading-snug">{name}</h3>
                    <span className={`mt-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                      role === 'Chairperson'
                        ? 'bg-[#D4A017]/20 text-[#8a6800]'
                        : 'bg-green-100 text-green-700'
                    }`}>{role}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RECRUITMENT PARTNERS TAB ── */}
        {activeTab === 'Recruitment Partners' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-10 bg-[#D4A017] rounded-full" />
                  <div>
                    <h2 className="text-2xl font-black text-[#123B6D] uppercase tracking-wide">Recruitment Partners</h2>
                    <p className="text-gray-400 text-sm mt-0.5">{filteredPartners.length} companies</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search companies…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full md:w-72 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#123B6D] transition-colors"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-[#123B6D] text-white">
                      <th className="px-5 py-4 text-left font-semibold w-20">Sl. No.</th>
                      <th className="px-5 py-4 text-left font-semibold">Name of the Company</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredPartners.map((name, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5 text-gray-400 font-medium text-center">{recruitmentPartners.indexOf(name) + 1}</td>
                        <td className="px-5 py-3.5 font-medium text-gray-800 flex items-center gap-3">
                          <Building2 size={14} className="text-[#008e59] flex-shrink-0" />
                          {name}
                        </td>
                      </tr>
                    ))}
                    {filteredPartners.length === 0 && (
                      <tr>
                        <td colSpan={2} className="px-5 py-10 text-center text-gray-400">No companies match your search.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── CAREER GUIDANCE TAB ── */}
        {activeTab === 'Career Guidance' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-10 bg-[#D4A017] rounded-full" />
                <h2 className="text-2xl font-black text-[#123B6D] uppercase tracking-wide">Career Guidance Session Topics</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {careerTopics.map((topic, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 hover:border-[#123B6D]/20 hover:shadow-sm transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#123B6D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#123B6D] font-black text-[11px]">{i + 1}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 leading-snug">{topic}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Counsellor */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-[#008e59] rounded-full" />
                <h2 className="text-2xl font-black text-[#123B6D] uppercase tracking-wide">Counsellor Details</h2>
              </div>
              <div className="flex items-center gap-5 bg-[#F8FAFC] rounded-2xl border border-gray-100 p-6 max-w-md">
                <div className="w-14 h-14 rounded-full bg-[#008e59]/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={28} className="text-[#008e59]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#123B6D] text-base">Ms. Poonam Ghadigaonkar</h3>
                  <p className="text-[#008e59] font-semibold text-sm mt-0.5">Counsellor</p>
                  <a href="mailto:gpoonam3@gmail.com" className="flex items-center gap-1.5 text-gray-500 text-xs mt-2 hover:text-[#123B6D] transition-colors">
                    <Mail size={12} /> gpoonam3@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTACT TAB ── */}
        {activeTab === 'Contact' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-10 bg-[#D4A017] rounded-full" />
                <h2 className="text-2xl font-black text-[#123B6D] uppercase tracking-wide">Placement Coordinator</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Coordinator card */}
                <div className="bg-gradient-to-br from-[#123B6D] to-[#1a5296] rounded-2xl p-8 text-white shadow-lg">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                    <Users size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-1">Dr. Abhilasha N</h3>
                  <p className="text-white/70 text-sm mb-6">Placement Coordinator &amp; Cell Chairperson</p>

                  <div className="space-y-4">
                    <a href="tel:9620925899" className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors">
                      <Phone size={16} className="text-white/70 flex-shrink-0" />
                      <span className="text-sm font-semibold">9620925899</span>
                    </a>
                    <a href="mailto:Placement@mccmulund.ac.in" className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors">
                      <Mail size={16} className="text-white/70 flex-shrink-0" />
                      <span className="text-sm font-semibold break-all">Placement@mccmulund.ac.in</span>
                    </a>
                    <a href="mailto:Placement.mcc@gmail.com" className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors">
                      <Mail size={16} className="text-white/70 flex-shrink-0" />
                      <span className="text-sm font-semibold break-all">Placement.mcc@gmail.com</span>
                    </a>
                    <a href="https://www.linkedin.com/in/abilasha2309" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors">
                      <Link2 size={16} className="text-white/70 flex-shrink-0" />
                      <span className="text-sm font-semibold">linkedin.com/in/abilasha2309</span>
                    </a>
                  </div>
                </div>

                {/* LinkedIn & quick info */}
                <div className="flex flex-col gap-5">
                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe size={20} className="text-[#0077B5]" />
                      <h4 className="font-bold text-[#123B6D] text-sm uppercase tracking-wide">Follow Us on LinkedIn</h4>
                    </div>
                    <a
                      href="https://www.linkedin.com/company/mcc-placement"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#0077B5] text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#005a8e] transition-colors"
                    >
                      <Link2 size={16} /> MCC_PLACEMENT
                    </a>
                  </div>

                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageSquare size={20} className="text-[#008e59]" />
                      <h4 className="font-bold text-[#123B6D] text-sm uppercase tracking-wide">Counsellor</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#008e59]/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap size={20} className="text-[#008e59]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#123B6D] text-sm">Ms. Poonam Ghadigaonkar</p>
                        <a href="mailto:gpoonam3@gmail.com" className="text-gray-500 text-xs hover:text-[#123B6D] transition-colors">
                          gpoonam3@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#123B6D] rounded-2xl p-6 text-white">
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Quick Navigation</h4>
                    <div className="space-y-2">
                      {tabs.filter(t => t !== 'Contact').map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className="w-full flex items-center justify-between px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-colors text-left"
                        >
                          {tab}
                          <ChevronRight size={14} className="opacity-60" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
