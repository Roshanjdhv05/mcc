'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Layers, CheckCircle2 } from 'lucide-react';
import { useProgramme } from '@/hooks/useProgramme';

function getSlugFromCode(code: string) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function StructureModule({ courseCode }: { courseCode: string }) {
  const slug = getSlugFromCode(courseCode);
  const { data: programme, loading } = useProgramme(slug);

  const [activeSemester, setActiveSemester] = useState<number | null>(null);

  // Default to first semester if data loads and no semester is selected
  useMemo(() => {
    if (programme?.semesters && programme.semesters.length > 0 && activeSemester === null) {
      setActiveSemester(programme.semesters[0].semester_number);
    }
  }, [programme, activeSemester]);

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#123B6D] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[#64748B] text-sm">Loading structure...</p>
      </div>
    );
  }

  if (!programme || !programme.semesters || programme.semesters.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] items-center justify-center p-6 text-center">
        <Layers size={40} className="mx-auto mb-3 text-[#94A3B8] opacity-50" />
        <h4 className="font-bold text-[#1E293B] mb-2">No Structure Available</h4>
        <p className="text-sm text-[#64748B]">Curriculum structure for this programme has not been added yet.</p>
      </div>
    );
  }

  const selectedSemester = programme.semesters.find(s => s.semester_number === activeSemester) || programme.semesters[0];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Semester Tabs */}
      <div className="p-4 bg-white border-b border-[#E2E8F0] overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {programme.semesters.map((sem) => (
            <button
              key={sem.semester_number}
              onClick={() => setActiveSemester(sem.semester_number)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                activeSemester === sem.semester_number 
                  ? 'bg-[#123B6D] text-white shadow-sm' 
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#1E293B]'
              }`}
            >
              Semester {sem.semester_number}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {selectedSemester && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            
            {selectedSemester.syllabus_pdf && (
              <div className="flex justify-end mb-4">
                <a 
                  href={selectedSemester.syllabus_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] text-[#123B6D] text-sm rounded-xl font-semibold hover:bg-[#F8FAFC] transition-colors shadow-sm"
                >
                  <Download size={16} /> Download Syllabus
                </a>
              </div>
            )}

            {selectedSemester.subjects && selectedSemester.subjects.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                        <th className="py-3 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Subject Code</th>
                        <th className="py-3 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Subject Name</th>
                        <th className="py-3 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider text-center">Type</th>
                        <th className="py-3 px-4 text-xs font-bold text-[#64748B] uppercase tracking-wider text-center">Credits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSemester.subjects.map((sub, i) => (
                        <tr key={i} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]/50 transition-colors">
                          <td className="py-4 px-4 text-sm font-medium text-[#1E293B]">
                            {sub.subject_code || '-'}
                          </td>
                          <td className="py-4 px-4 text-sm text-[#1E293B] font-semibold">
                            {sub.subject_name}
                          </td>
                          <td className="py-4 px-4 text-sm text-center">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              sub.is_elective 
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {sub.is_elective ? 'Elective' : 'Core'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-center font-bold text-[#1E293B]">
                            {sub.credits || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E2E8F0] text-center">
                <p className="text-[#64748B]">No subjects found for this semester.</p>
              </div>
            )}
            
          </motion.div>
        )}
      </div>
    </div>
  );
}
