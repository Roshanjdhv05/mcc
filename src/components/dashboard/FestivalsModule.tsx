'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function getSlugFromCode(code: string) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function FestivalsModule({ courseCode }: { courseCode: string }) {
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
        .eq('category', 'Programme Events')
        .eq('programme_section', 'Festivals')
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
        <div className="w-8 h-8 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[#64748B] text-sm">Loading festivals...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] items-center justify-center p-6 text-center">
        <Sparkles size={40} className="mx-auto mb-3 text-[#D4A017] opacity-50" />
        <h4 className="font-bold text-[#1E293B] mb-2">No Festivals Found</h4>
        <p className="text-sm text-[#64748B]">Festivals for this programme will appear here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {events.map((event, i) => (
            <motion.div
              key={event.id || i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md transition-all flex flex-col h-full"
            >
              {event.image ? (
                <div className="w-full h-32 bg-slate-100 overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ) : (
                <div className="w-full h-32 bg-gradient-to-tr from-[#123B6D] to-[#2E5E99] flex items-center justify-center">
                  <Sparkles size={32} className="text-white/30" />
                </div>
              )}
              
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-[#1E293B] text-lg mb-2 line-clamp-1">{event.title}</h3>
                {event.description && (
                  <p className="text-sm text-[#64748B] mb-4 line-clamp-2 flex-1">
                    {event.description}
                  </p>
                )}
                
                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[#F1F5F9] text-xs font-semibold text-[#64748B]">
                  {event.date && (
                    <div className="flex items-center gap-1">
                      <Calendar size={13} className="text-[#D4A017]" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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
