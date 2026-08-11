'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function getSlugFromCode(code: string) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function EventsActivitiesModule({ courseCode }: { courseCode: string }) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const slug = getSlugFromCode(courseCode);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('programme', slug)
        .eq('category', 'Programme Events') // Assuming category is Programme Events
        .eq('programme_section', 'Events & Activities')
        .order('date', { ascending: false });

      if (!cancelled) {
        if (!error && data) {
          setEvents(data);
        }
        setLoading(false);
      }
    }
    
    fetchEvents();
    
    return () => { cancelled = true; };
  }, [slug]);

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
                  {event.date && (
                    <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
                      <Calendar size={14} className="text-[#123B6D]" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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
