'use client';

import React from 'react';
import { ArrowRight, CalendarDays, MapPin, Clock } from 'lucide-react';

const upcomingEvents = [
  {
    day: '18', month: 'MAY', dayBg: 'bg-blue-600',
    title: 'Orientation Programme',
    location: 'Hall A, Main Building',
    time: '09:30 AM – 11:30 AM',
    type: 'Academic', typeBg: 'bg-blue-100', typeColor: 'text-blue-700',
  },
  {
    day: '20', month: 'MAY', dayBg: 'bg-orange-500',
    title: 'Semester Examination',
    location: 'Commerce Block',
    time: '10:00 AM – 01:00 PM',
    type: 'Examination', typeBg: 'bg-orange-100', typeColor: 'text-orange-700',
  },
  {
    day: '23', month: 'MAY', dayBg: 'bg-yellow-500',
    title: 'Cultural Fest',
    location: 'Auditorium',
    time: '02:00 PM – 06:00 PM',
    type: 'Cultural', typeBg: 'bg-yellow-100', typeColor: 'text-yellow-700',
  },
  {
    day: '25', month: 'MAY', dayBg: 'bg-red-500',
    title: 'Sports Competition',
    location: 'College Ground',
    time: '08:00 AM – 01:00 PM',
    type: 'Sports', typeBg: 'bg-red-100', typeColor: 'text-red-700',
  },
  {
    day: '28', month: 'MAY', dayBg: 'bg-pink-500',
    title: 'Workshop on AI Tools',
    location: 'Seminar Hall',
    time: '11:00 AM – 01:00 PM',
    type: 'Workshop', typeBg: 'bg-pink-100', typeColor: 'text-pink-700',
  },
];

export default function UpcomingEventsSidebar() {
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
          <button className="text-xs font-bold text-[#123B6D] hover:underline">View All</button>
        </div>

        <div className="divide-y divide-slate-100">
          {upcomingEvents.map((ev, i) => (
            <div key={i} className="flex gap-3 p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
              {/* Date Badge */}
              <div className={`${ev.dayBg} text-white rounded-xl w-12 h-12 flex flex-col items-center justify-center flex-shrink-0 shadow-sm`}>
                <span className="text-lg font-black leading-none">{ev.day}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider opacity-90">{ev.month}</span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-slate-800 leading-tight mb-1 group-hover:text-[#123B6D] transition-colors">{ev.title}</h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                  <MapPin size={10} className="flex-shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                  <Clock size={10} className="flex-shrink-0" />
                  <span>{ev.time}</span>
                </div>
                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${ev.typeBg} ${ev.typeColor}`}>
                  {ev.type}
                </span>
              </div>

              <ArrowRight size={14} className="text-slate-300 group-hover:text-[#123B6D] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
