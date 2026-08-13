'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, FileText, Loader2, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ExamDocument {
  id: string;
  title: string;
  category: string;
  file_url: string;
  schedule_time: string;
  created_at: string;
}

const COURSE_CODE_MAP: Record<string, string> = {
  // Junior College
  '11th':      'jr-college',
  '12th':      'jr-college',
  // UG
  'bcom':      'BCOM',
  'BCom':      'BCOM',
  'B.Com':     'BCOM',
  'BBA':       'BCOM.BA',
  'BMS':       'BCOM.MS',
  'BCA':       'BSC.CA',
  'BSc IT':    'BSCIT',
  'BSc CS':    'BSCCS',
  'DS':        'BSCDS',
  'BAF':       'BAF',
  'BFM':       'BFM',
  'BBI':       'BBI',
  'BAMMC':     'BAMMC',
  // PG
  'MCom':      'MCOM',
  'M.Com':     'MCOM',
  'MSc IT':    'MSCIT',
  'MSc Finance':'MSCFINANCE',
  'PhD Programme': 'PhD Programme',
};

function normaliseCourseCode(code: string): string {
  if (COURSE_CODE_MAP[code]) return COURSE_CODE_MAP[code];
  const lower = code.toLowerCase().replace(/[\s.]/g, '');
  const found = Object.entries(COURSE_CODE_MAP).find(
    ([k]) => k.toLowerCase().replace(/[\s.]/g, '') === lower
  );
  return found ? found[1] : code.toUpperCase();
}

export default function TimetableModule({ courseCode }: { courseCode: string }) {
  const [month, setMonth] = useState('All');
  const [documents, setDocuments] = useState<ExamDocument[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      const dbCourseId = normaliseCourseCode(courseCode);
      const { data, error } = await supabase
        .from('examination_documents')
        .select('*')
        .in('category', ['Time Table Regular Exam', 'Time Table ATKT Exam'])
        .contains('courses', [dbCourseId])
        .order('schedule_time', { ascending: false });

      if (data && !error) {
        setDocuments(data as ExamDocument[]);
      }
      setLoading(false);
    };
    fetchExams();
  }, [courseCode]);

  const filteredDocs = documents.filter(doc => {
    if (month === 'All') return true;
    const date = new Date(doc.schedule_time);
    const docMonth = date.toLocaleString('default', { month: 'long' });
    return docMonth === month;
  });

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* Filters */}
      <div className="p-4 bg-white border-b border-[#E2E8F0] flex gap-3">
        <select 
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] font-semibold text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#123B6D]/50"
        >
          <option value="All">All Months</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div className="p-4 flex items-center justify-between">
        <h3 className="font-bold text-[#1E293B] flex items-center gap-2">
          <CalendarDays size={18} className="text-[#D4A017]" />
          Upcoming Exams
        </h3>
      </div>

      {/* Timetable List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#94A3B8]">
            <Loader2 size={40} className="mb-4 animate-spin text-[#123B6D]" />
            <p className="font-medium">Loading timetables...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#94A3B8]">
            <CalendarDays size={40} className="mb-4 opacity-20" />
            <p className="font-medium text-center px-4">
              {month === 'All' ? 'No timetables uploaded yet.' : `No timetables found for ${month}.`}
            </p>
          </div>
        ) : (
          filteredDocs.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-2xl shadow-sm border p-4 flex gap-4 ${i === 0 ? 'border-[#4DA8DA] shadow-[#4DA8DA]/10 relative overflow-hidden' : 'border-[#E2E8F0]'}`}
            >
              {i === 0 && (
                <div className="absolute top-0 left-0 w-1 h-full bg-[#4DA8DA]" />
              )}
              
              <div className="flex flex-col items-center justify-center min-w-[60px] bg-[#F8FAFC] rounded-xl p-2 border border-[#E2E8F0]">
                <FileText className="text-[#123B6D] mb-1" size={20} />
                <span className="text-[#64748B] text-[10px] font-semibold uppercase text-center">PDF</span>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-bold text-[#1E293B] mb-1 leading-tight line-clamp-2">{doc.title}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-[#64748B]">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-md font-medium">
                      {doc.category.replace('Time Table ', '')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    {new Date(doc.schedule_time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <a 
                  href={doc.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#123B6D]/5 hover:bg-[#123B6D]/10 text-[#123B6D] p-2.5 rounded-xl transition-colors"
                  title="View/Download Document"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
