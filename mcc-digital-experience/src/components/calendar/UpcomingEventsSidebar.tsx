'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, Clock, Loader2 } from 'lucide-react';
import { useCachedNotices } from '@/hooks/useCachedSupabase';

// Category → color mapping
const TYPE_STYLES: Record<string, { bg: string; text: string; dayBg: string }> = {
  Academic:    { bg: 'bg-blue-100',   text: 'text-blue-700',   dayBg: 'bg-blue-600' },
  Examination: { bg: 'bg-orange-100', text: 'text-orange-700', dayBg: 'bg-orange-500' },
  Holiday:     { bg: 'bg-green-100',  text: 'text-green-700',  dayBg: 'bg-green-500' },
  Seminar:     { bg: 'bg-purple-100', text: 'text-purple-700', dayBg: 'bg-purple-500' },
  Workshop:    { bg: 'bg-pink-100',   text: 'text-pink-700',   dayBg: 'bg-pink-500' },
  Sports:      { bg: 'bg-red-100',    text: 'text-red-700',    dayBg: 'bg-red-500' },
  Cultural:    { bg: 'bg-yellow-100', text: 'text-yellow-700', dayBg: 'bg-yellow-500' },
  NSS:         { bg: 'bg-teal-100',   text: 'text-teal-700',   dayBg: 'bg-teal-500' },
  NCC:         { bg: 'bg-slate-100',  text: 'text-slate-700',  dayBg: 'bg-slate-500' },
  Event:       { bg: 'bg-indigo-100', text: 'text-indigo-700', dayBg: 'bg-indigo-500' },
};

const SHORT_MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;      // ISO date string
  type: string;
  venue?: string | null;
  time?: string | null;
}

export default function UpcomingEventsSidebar() {
  const { data: notices = [], isLoading: loading } = useCachedNotices();

  const today = new Date().toISOString().split('T')[0];
  
  const upcomingEvents: UpcomingEvent[] = (notices || [])
    .filter((n: any) => n.publish_calendar && n.calendar_date && n.calendar_date >= today)
    .sort((a: any, b: any) => a.calendar_date.localeCompare(b.calendar_date))
    .slice(0, 6)
    .map((n: any) => ({
      id: n.id,
      title: n.calendar_title || 'Untitled Event',
      date: n.calendar_date,
      type: n.calendar_category || 'Event',
      venue: n.calendar_venue,
      time: n.calendar_time,
    }));

  return (
    <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0">
      {/* Search & Filter */}
      <div className="flex gap-2 mb-5">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] transition-all"
          />
          <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          Filter
        </button>
      </div>

      {/* Upcoming Events List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
            <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">Upcoming Events</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">{upcomingEvents.length} events</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10 gap-2 text-slate-400">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Loading events…</span>
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center px-4">
            <CalendarDays size={32} className="text-slate-200 mb-3" />
            <p className="text-sm font-semibold text-slate-400">No upcoming events</p>
            <p className="text-xs text-slate-300 mt-1">Events published via the Notice system will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {upcomingEvents.map((ev) => {
              const d = new Date(ev.date);
              const day   = String(d.getUTCDate()).padStart(2, '0');
              const month = SHORT_MONTHS[d.getUTCMonth()];
              const styles = TYPE_STYLES[ev.type] ?? TYPE_STYLES['Event'];
              return (
                <div key={ev.id} className="flex gap-3 p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  {/* Date Badge */}
                  <div className={`${styles.dayBg} text-white rounded-xl w-12 h-12 flex flex-col items-center justify-center flex-shrink-0 shadow-sm`}>
                    <span className="text-lg font-black leading-none">{day}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-90">{month}</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 leading-tight mb-1 group-hover:text-[#123B6D] transition-colors line-clamp-2">{ev.title}</h4>
                    {ev.venue && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                        <MapPin size={10} className="flex-shrink-0" />
                        <span className="truncate">{ev.venue}</span>
                      </div>
                    )}
                    {ev.time && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                        <Clock size={10} className="flex-shrink-0" />
                        <span>{ev.time}</span>
                      </div>
                    )}
                    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.bg} ${styles.text}`}>
                      {ev.type}
                    </span>
                  </div>

                  <ArrowRight size={14} className="text-slate-300 group-hover:text-[#123B6D] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
