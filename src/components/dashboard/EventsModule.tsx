'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, MapPin, ExternalLink, Image as ImageIcon, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventsModule({ courseCode, sectionName, title, icon: Icon }: { courseCode: string, sectionName: string, title: string, icon: any }) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Determine the admin code based on courseKey (copied from CourseTemplate logic)
    const getAdminCode = () => {
      const k = (courseCode || '').toUpperCase();
      if (k === 'BCOM' || k === 'B.COM') return 'B.COM';
      if (k === 'BAF') return 'BAF';
      if (k === 'BMS') return 'BMS';
      if (k === 'BFM') return 'BFM';
      if (k === 'BFSI') return 'BFSI';
      if (k === 'BBI') return 'BBI';
      if (k === 'BSC_IT' || k === 'BSC-IT') return 'BSC-IT';
      if (k === 'BSC_CS' || k === 'BSC-CS') return 'BSC-CS';
      if (k === 'BSC_DS' || k === 'BSC-DS' || k === 'DS') return 'BSC-DS';
      if (k === 'BSC_CA' || k === 'BCA') return 'BCA';
      if (k === 'BBA') return 'BBA';
      if (k === 'BAMMC') return 'BAMMC';
      return k; // fallback
    };
    const adminCode = getAdminCode();

    async function fetchEvents() {
      setLoading(true);
      const { data } = await supabase
        .from('events')
        .select('id, title, description, images, published_at, programme_section, programme, category, department')
        .eq('publish_programme', true)
        .eq('status', 'published')
        .order('published_at', { ascending: false });
        
      if (data) {
        const filtered = data
          .filter(ev => ev.programme && ev.programme.includes(adminCode))
          .map(ev => {
            let section = ev.programme_section;
            try {
              const parsed = JSON.parse(ev.programme_section);
              if (parsed && parsed[adminCode]) {
                section = parsed[adminCode];
              }
            } catch (e) {
              // Legacy string
            }
            return { ...ev, programme_section: section };
          })
          .filter(ev => ev.programme_section === sectionName);

        setEvents(filtered);
      }
      setLoading(false);
    }
    
    fetchEvents();
  }, [courseCode, sectionName]);

  if (loading) {
    return (
      <div className="w-full h-full p-8 flex flex-col items-center justify-center text-[#94A3B8]">
        <div className="w-8 h-8 border-4 border-[#123B6D] border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading {title}...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="w-full h-full p-8 flex flex-col items-center justify-center text-[#94A3B8]">
        <Icon size={48} className="mb-4 opacity-20" />
        <p className="font-medium text-lg text-[#64748B] mb-2">No {title} Found</p>
        <p className="text-sm">There are currently no {title.toLowerCase()} for {courseCode}.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#F8FAFC] overflow-y-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        <h3 className="text-xl font-bold text-[#123B6D] border-b border-[#E2E8F0] pb-4 flex items-center gap-2">
          <Icon size={24} className="text-[#3B82F6]" />
          {title}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div 
              key={event.id}
              onClick={() => { setSelectedEvent(event); setCurrentImageIndex(0); }}
              className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md hover:border-[#123B6D]/30 transition-all cursor-pointer group flex flex-col"
            >
              {/* Image Thumbnail */}
              <div className="h-48 bg-gray-100 relative overflow-hidden shrink-0">
                {event.images && event.images.length > 0 ? (
                  <>
                    <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {event.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 z-10">
                        <ImageIcon size={12} /> +{event.images.length - 1}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <Icon size={32} className="opacity-50 mb-2" />
                    <span className="text-xs font-medium">No Image</span>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-[#1E293B] text-lg leading-tight mb-2 group-hover:text-[#123B6D] transition-colors line-clamp-2">
                  {event.title}
                </h4>
                <div className="flex items-center gap-4 text-xs text-[#64748B] mb-3 font-medium">
                  {event.published_at && (
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <Calendar size={12} />
                      {new Date(event.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                  {event.description}
                </p>
                <div className="mt-auto text-[#3B82F6] text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Details <ExternalLink size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Details */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
              onClick={() => setSelectedEvent(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {selectedEvent.images && selectedEvent.images.length > 0 && (
                <div className="w-full h-64 sm:h-80 md:h-[400px] bg-black relative shrink-0 group">
                  <img src={selectedEvent.images[currentImageIndex]} alt={selectedEvent.title} className="w-full h-full object-contain" />
                  
                  {selectedEvent.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? selectedEvent.images.length - 1 : prev - 1); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === selectedEvent.images.length - 1 ? 0 : prev + 1); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 transform rotate-180"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
                        {selectedEvent.images.map((_: any, i: number) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40 cursor-pointer hover:bg-white/60'}`} onClick={() => setCurrentImageIndex(i)} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              
              <div className="p-6 md:p-10 overflow-y-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4">{selectedEvent.title}</h2>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {selectedEvent.published_at && (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] bg-blue-50 px-3 py-1 rounded-lg">
                      <Calendar size={16} />
                      {new Date(selectedEvent.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                </div>
                <div className="prose prose-slate max-w-none">
                  {selectedEvent.description.split('\n').map((p: string, i: number) => (
                    p.trim() && <p key={i} className="mb-4 text-gray-700 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
