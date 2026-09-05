'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { useCachedProgrammeEvents } from '@/hooks/useCachedSupabase';

function getAdminCode(courseCode: string): string {
  const k = (courseCode || '').toUpperCase();
  if (k === 'BCOM' || k === 'B.COM') return 'B.COM';
  if (k === 'BAF') return 'BAF';
  if (k === 'BMS') return 'BMS';
  if (k === 'BFM') return 'BFM';
  if (k === 'BFSI') return 'BFSI';
  if (k === 'BBI') return 'BBI';
  if (k === 'BCOM-BA') return 'BCOM-BA';
  if (k === 'BCOM-MS') return 'BCOM-MS';
  if (k === 'BSC_IT' || k === 'BSC-IT') return 'BSC-IT';
  if (k === 'BSC_CS' || k === 'BSC-CS') return 'BSC-CS';
  if (k === 'BSC_DS' || k === 'BSC-DS' || k === 'DS' || k === 'BSC-DS') return 'BSC-DS';
  if (k === 'BSC_CA' || k === 'BCA') return 'BCA';
  if (k === 'BBA') return 'BBA';
  if (k === 'BAMMC') return 'BAMMC';
  // PG programmes
  if (k === 'MCOM-AA') return 'MCom-AA';
  if (k === 'MCOM-BM') return 'MCom-BM';
  if (k === 'MCOM-BF') return 'MCom-BF';
  if (k === 'MSC-IT') return 'MSc-IT';
  if (k === 'MSC-FINANCE') return 'MSc-Finance';
  return k;
}

export default function EventsActivitiesModule({ courseCode }: { courseCode: string }) {
  const adminCode = getAdminCode(courseCode);
  const { data: events = [], isLoading: loading } = useCachedProgrammeEvents(adminCode, 'Events & Activities');

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#123B6D] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[#64748B] text-sm">Loading events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] items-center justify-center p-6 text-center">
        <Calendar size={40} className="mx-auto mb-3 text-[#94A3B8] opacity-50" />
        <h4 className="font-bold text-[#1E293B] mb-2">No Events Found</h4>
        <p className="text-sm text-[#64748B]">There are currently no events or activities to display.</p>
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden"
            >
              {event.image && (
                <div className="w-full h-40 bg-slate-100 overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-[#1E293B] text-lg mb-2">{event.title}</h3>
                {event.description && (
                  <p className="text-sm text-[#64748B] mb-4 line-clamp-3">
                    {event.description}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#1E293B]">
                  {(event.event_date || event.date) && (
                    <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
                      <Calendar size={14} className="text-[#123B6D]" />
                      <span>{new Date(event.event_date || event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
                      <MapPin size={14} className="text-[#123B6D]" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
