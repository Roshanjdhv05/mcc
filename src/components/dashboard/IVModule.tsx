'use client';

import { motion } from 'framer-motion';
import { Briefcase, Building, MapPin, Calendar } from 'lucide-react';
import { useProgramme } from '@/hooks/useProgramme';

function getSlugFromCode(code: string) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function IVModule({ courseCode }: { courseCode: string }) {
  const slug = getSlugFromCode(courseCode);
  const { data: programme, loading } = useProgramme(slug);

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#123B6D] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[#64748B] text-sm">Loading industrial visits...</p>
      </div>
    );
  }

  const visits = programme?.industrial_visits || [];

  if (visits.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] items-center justify-center p-6 text-center">
        <Briefcase size={40} className="mx-auto mb-3 text-[#94A3B8] opacity-50" />
        <h4 className="font-bold text-[#1E293B] mb-2">No Industrial Visits Found</h4>
        <p className="text-sm text-[#64748B]">Industrial visits for this programme have not been added yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {visits.map((visit, i) => (
          <motion.div
            key={visit.id || i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden"
          >
            {visit.image && (
              <div className="w-full h-40 bg-slate-100 overflow-hidden relative">
                <img src={visit.image} alt={visit.company_name} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B] text-lg leading-tight">{visit.company_name}</h3>
                  {visit.visit_date && (
                    <p className="text-sm text-[#64748B] flex items-center gap-1 mt-1">
                      <Calendar size={13} />
                      {visit.visit_date}
                    </p>
                  )}
                </div>
              </div>

              {visit.description && (
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {visit.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
