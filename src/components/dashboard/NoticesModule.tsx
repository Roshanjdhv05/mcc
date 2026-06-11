'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, Bookmark, Bell, Filter } from 'lucide-react';
import { getMockDataForCourse, Notice } from '@/lib/mockData';

const FILTERS = ['All', 'Academic', 'Examination', 'Events', 'Placement', 'Scholarship'];

export default function NoticesModule({ courseCode }: { courseCode: string }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const notices = getMockDataForCourse(courseCode, 'notices') as Notice[];
  
  const filteredNotices = notices.filter(n => {
    const matchFilter = activeFilter === 'All' || n.category === activeFilter;
    const matchSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        n.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* Search and Filter */}
      <div className="p-4 bg-white border-b border-[#E2E8F0] space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Search notices..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#123B6D]/50 focus:bg-white transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <Filter size={14} className="text-[#94A3B8] ml-1 mr-1 flex-shrink-0" />
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === f 
                  ? 'bg-[#123B6D] text-white shadow-sm' 
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {filteredNotices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-[#94A3B8]"
            >
              <Bell size={40} className="mb-4 opacity-20" />
              <p className="font-medium">No notices found</p>
            </motion.div>
          ) : (
            filteredNotices.map((notice, i) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white p-5 rounded-2xl shadow-sm border ${notice.urgent ? 'border-red-200' : 'border-[#E2E8F0]'} flex flex-col gap-3 group hover:shadow-md transition-shadow relative overflow-hidden`}
              >
                {notice.urgent && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold tracking-widest uppercase rounded-bl-xl border-b border-l border-red-100">
                    Urgent
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#123B6D]/5 text-[#123B6D] text-[10px] font-bold uppercase tracking-wider">
                    {notice.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
                  <span className="text-[#94A3B8] text-xs font-medium">{notice.date}</span>
                  {notice.isNew && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                  )}
                </div>
                
                <div>
                  <h3 className={`font-bold text-lg leading-tight mb-1 ${notice.urgent ? 'text-red-700' : 'text-[#1E293B] group-hover:text-[#123B6D] transition-colors'}`}>
                    {notice.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-snug">{notice.description}</p>
                </div>
                
                <div className="flex items-center gap-3 pt-2 mt-auto border-t border-[#F1F5F9]">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-[#123B6D] hover:bg-[#F8FAFC] rounded-lg transition-colors">
                    <Download size={16} /> Download
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#D4A017] rounded-lg transition-colors">
                    <Bookmark size={18} />
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
