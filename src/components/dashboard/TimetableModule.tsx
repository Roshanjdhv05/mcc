'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CalendarDays, Clock, MapPin } from 'lucide-react';
import { getMockDataForCourse, TimetableEntry } from '@/lib/mockData';

export default function TimetableModule({ courseCode }: { courseCode: string }) {
  const [semester, setSemester] = useState('Sem 5');
  const [month, setMonth] = useState('November');
  
  const timetable = getMockDataForCourse(courseCode, 'timetable') as TimetableEntry[];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* Filters */}
      <div className="p-4 bg-white border-b border-[#E2E8F0] flex gap-3">
        <select 
          value={semester}
          onChange={e => setSemester(e.target.value)}
          className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] font-semibold text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#123B6D]/50"
        >
          <option>Sem 1</option>
          <option>Sem 2</option>
          <option>Sem 3</option>
          <option>Sem 4</option>
          <option>Sem 5</option>
          <option>Sem 6</option>
        </select>
        
        <select 
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] font-semibold text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#123B6D]/50"
        >
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>

      <div className="p-4 flex items-center justify-between">
        <h3 className="font-bold text-[#1E293B] flex items-center gap-2">
          <CalendarDays size={18} className="text-[#D4A017]" />
          Upcoming Exams
        </h3>
        <button className="text-xs font-semibold bg-[#123B6D]/10 text-[#123B6D] px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#123B6D]/20 transition-colors">
          <Download size={14} /> PDF
        </button>
      </div>

      {/* Timetable List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {timetable.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#94A3B8]">
            <CalendarDays size={40} className="mb-4 opacity-20" />
            <p className="font-medium">No exams scheduled for {month}</p>
          </div>
        ) : (
          timetable.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-2xl shadow-sm border p-4 flex gap-4 ${i === 0 ? 'border-[#4DA8DA] shadow-[#4DA8DA]/10 relative overflow-hidden' : 'border-[#E2E8F0]'}`}
            >
              {i === 0 && (
                <div className="absolute top-0 left-0 w-1 h-full bg-[#4DA8DA]" />
              )}
              
              <div className="flex flex-col items-center justify-center min-w-[60px] bg-[#F8FAFC] rounded-xl p-2 border border-[#E2E8F0]">
                <span className="text-[#D4A017] text-[10px] font-bold uppercase tracking-wider">{entry.date.split(' ')[1]}</span>
                <span className="text-2xl font-bold text-[#123B6D] leading-none my-1">{entry.date.split(' ')[0]}</span>
                <span className="text-[#64748B] text-[10px] font-semibold uppercase">{entry.day.slice(0,3)}</span>
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-[#1E293B] mb-2">{entry.subject}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-[#64748B]">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#4DA8DA]" /> {entry.time}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-rose-500" /> {entry.venue}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
