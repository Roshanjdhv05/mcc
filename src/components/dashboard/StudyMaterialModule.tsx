'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Bookmark, Eye, FileText, File, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { getMockDataForCourse, StudyMaterial } from '@/lib/mockData';

const TABS = ['Notes', 'PPTs', 'Books', 'Other'];

export default function StudyMaterialModule({ courseCode }: { courseCode: string }) {
  const [semester, setSemester] = useState('Sem 5');
  const [subject, setSubject] = useState('All Subjects');
  const [activeTab, setActiveTab] = useState('Notes');
  
  const materials = getMockDataForCourse(courseCode, 'materials') as StudyMaterial[];

  // Filter logic
  const filteredMaterials = materials.filter(m => {
    const matchSubject = subject === 'All Subjects' || m.subject === subject;
    
    let matchType = false;
    if (activeTab === 'Notes' && m.type === 'PDF') matchType = true;
    else if (activeTab === 'PPTs' && m.type === 'PPT') matchType = true;
    else if (activeTab === 'Books' && m.title.toLowerCase().includes('book')) matchType = true;
    else if (activeTab === 'Other') matchType = true; // Show all remaining or default
    else if (activeTab === 'Notes') matchType = true; // Fallback so mock data shows up
    
    return matchSubject && matchType;
  });

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText size={24} className="text-red-500" />;
      case 'PPT': return <ImageIcon size={24} className="text-orange-500" />;
      case 'DOC': return <File size={24} className="text-blue-500" />;
      case 'Link': return <LinkIcon size={24} className="text-emerald-500" />;
      default: return <File size={24} className="text-gray-500" />;
    }
  };

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
            <option>All Subjects</option>
            <option>Advanced Web Programming</option>
            <option>Software Project Management</option>
            <option>Mobile App Development</option>
          </select>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-[#F1F5F9] p-1 rounded-xl overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[80px] py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
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

      {/* Materials List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {filteredMaterials.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-[#94A3B8]"
            >
              <FileText size={40} className="mb-4 opacity-20" />
              <p className="font-medium">No materials found for {activeTab}</p>
            </motion.div>
          ) : (
            filteredMaterials.map((mat, i) => (
              <motion.div
                key={mat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#123B6D]/20 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {getFileIcon(mat.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#1E293B] text-sm leading-tight mb-1 truncate">{mat.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                    <span className="bg-[#F1F5F9] px-2 py-0.5 rounded-md font-medium">{mat.type}</span>
                    {mat.size && <span>{mat.size}</span>}
                    <span className="truncate">{mat.subject}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#123B6D] hover:bg-[#F8FAFC] transition-colors" title="Preview">
                    <Eye size={16} />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#123B6D]/5 text-[#123B6D] hover:bg-[#123B6D] hover:text-white transition-colors" title="Download">
                    <Download size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
