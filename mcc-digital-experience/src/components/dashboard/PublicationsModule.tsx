'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useCachedProgrammeEvents } from '@/hooks/useCachedSupabase';

function getSlugFromCode(code: string) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function PublicationsModule({ courseCode }: { courseCode: string }) {
  const slug = getSlugFromCode(courseCode);
  const { data: events = [], isLoading: loading } = useCachedProgrammeEvents(slug, 'Publications');

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#123B6D] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[#64748B] text-sm">Loading publications...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] items-center justify-center p-6 text-center">
        <BookOpen size={40} className="mx-auto mb-3 text-[#94A3B8] opacity-50" />
        <h4 className="font-bold text-[#1E293B] mb-2">No Publications Found</h4>
        <p className="text-sm text-[#64748B]">Publications for this programme will appear here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {events.map((event, i) => (
            <motion.div
              key={event.id || i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 flex gap-4 hover:shadow-md transition-shadow"
            >
              {event.image ? (
                <div className="w-24 h-32 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-[#E2E8F0]">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-24 h-32 flex-shrink-0 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8]">
                  <BookOpen size={24} />
                </div>
              )}
              
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-[#1E293B] text-base mb-1 leading-tight">{event.title}</h3>
                {event.date && (
                  <p className="text-[11px] text-[#94A3B8] font-bold uppercase tracking-wide mb-2">
                    Published: {new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                )}
                
                {event.description && (
                  <p className="text-sm text-[#64748B] line-clamp-3">
                    {event.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
