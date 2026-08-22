'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { getMockDataForCourse, SyllabusUnit } from '@/lib/mockData';

export default function SyllabusModule({ courseCode }: { courseCode: string }) {
  const [semester, setSemester] = useState('Sem 5');
  const [subject, setSubject] = useState('Advanced Web Programming');
  const [activeTab, setActiveTab] = useState('Unit Wise');
  
  const syllabus = getMockDataForCourse(courseCode, 'syllabus') as SyllabusUnit[];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* Filters */}
      <div className="p-4 bg-white border-b border-[#E2E8F0] space-y-3">
        <div className="flex gap-3">
          <select 
            value={semester}
            onChange={e => setSemester(e.target.value)}
            className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] font-semibold text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#123B6D]/50"
          >
            <option>Sem 4</option>
            <option>Sem 5</option>
            <option>Sem 6</option>
          </select>
          <select 
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="flex-[2] bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] font-semibold text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#123B6D]/50"
          >
            <option>Advanced Web Programming</option>
            <option>Software Project Management</option>
            <option>Mobile App Development</option>
          </select>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-[#F1F5F9] p-1 rounded-xl">
          {['Overview', 'Unit Wise', 'Resources'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab 
                  ? 'bg-white text-[#123B6D] shadow-sm' 
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E2E8F0]">
              <h3 className="font-bold text-[#1E293B] mb-2">{subject}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                This course covers advanced concepts in web development including modern frameworks, state management, and server-side integration.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider mb-1">Subject Code</p>
                  <p className="font-semibold text-[#1E293B]">{courseCode}-AWP-501</p>
                </div>
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider mb-1">Credits</p>
                  <p className="font-semibold text-[#1E293B]">4 Credits</p>
                </div>
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider mb-1">Faculty</p>
                  <p className="font-semibold text-[#1E293B]">Prof. Rahul Desai</p>
                </div>
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-wider mb-1">Marks</p>
                  <p className="font-semibold text-[#1E293B]">100 (60 + 40)</p>
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#123B6D] text-white rounded-xl font-semibold hover:bg-[#0d2d54] transition-colors shadow-sm">
                <Download size={18} /> Download Full Syllabus
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'Unit Wise' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {syllabus.length === 0 ? (
              <div className="text-center py-10 text-[#94A3B8]">
                <Layers size={40} className="mx-auto mb-3 opacity-20" />
                <p>No units found for this subject.</p>
              </div>
            ) : (
              syllabus.map((unit, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-[#E2E8F0]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#123B6D]/10 text-[#123B6D] font-bold rounded-xl flex items-center justify-center font-[var(--font-heading)]">
                      {unit.unit}
                    </div>
                    <h4 className="font-bold text-[#1E293B] text-lg leading-tight">{unit.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {unit.topics.map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#64748B]">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </motion.div>
        )}

        {activeTab === 'Resources' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-5 rounded-2xl shadow-sm border border-[#E2E8F0] text-center py-10">
            <BookOpen size={40} className="mx-auto mb-3 text-[#D4A017] opacity-50" />
            <h4 className="font-bold text-[#1E293B] mb-2">Recommended Books</h4>
            <p className="text-sm text-[#64748B]">Check the Study Material module for e-books and notes provided by faculty.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
