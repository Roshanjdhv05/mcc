'use client';

import React from 'react';
import { MapPin, Clock, ArrowRight, Printer, Download, RefreshCw, Share2, CalendarDays } from 'lucide-react';

const timelineEvents = [
  {
    day: '24', month: 'MAY', dayBg: 'bg-blue-600',
    title: 'Guest Lecture',
    subtitle: 'Business Management',
    time: '11:00 AM – 12:30 PM',
    location: 'Seminar Hall',
    type: 'Academic', typeBg: 'bg-blue-100', typeColor: 'text-blue-700',
    action: 'Register',
  },
  {
    day: '27', month: 'MAY', dayBg: 'bg-orange-500',
    title: 'Internal Examination',
    subtitle: 'FY B.Com',
    time: '10:00 AM – 01:00 PM',
    location: 'Classrooms',
    type: 'Examination', typeBg: 'bg-orange-100', typeColor: 'text-orange-700',
    action: 'View Details',
  },
  {
    day: '30', month: 'MAY', dayBg: 'bg-pink-500',
    title: 'Workshop',
    subtitle: 'Digital Marketing',
    time: '02:00 PM – 04:30 PM',
    location: 'Lab 3',
    type: 'Workshop', typeBg: 'bg-pink-100', typeColor: 'text-pink-700',
    action: 'Register',
  },
  {
    day: '02', month: 'JUN', dayBg: 'bg-yellow-500',
    title: 'Cultural Event',
    subtitle: 'Music Competition',
    time: '10:00 AM – 01:00 PM',
    location: 'Auditorium',
    type: 'Cultural', typeBg: 'bg-yellow-100', typeColor: 'text-yellow-700',
    action: 'View Details',
  },
  {
    day: '05', month: 'JUN', dayBg: 'bg-green-500',
    title: 'College Holiday',
    subtitle: 'Environment Day',
    time: 'Full Day',
    location: '—',
    type: 'Holiday', typeBg: 'bg-green-100', typeColor: 'text-green-700',
    action: 'View Calendar',
  },
];

const quickActions = [
  { icon: <CalendarDays size={14} />, label: "Today's Events" },
  { icon: <Printer size={14} />, label: 'Print Calendar' },
  { icon: <Download size={14} />, label: 'Download PDF' },
  { icon: <RefreshCw size={14} />, label: 'Sync Calendar' },
  { icon: <Share2 size={14} />, label: 'Share Calendar' },
];

const legend = [
  { dot: 'bg-blue-500', label: 'Academic' },
  { dot: 'bg-orange-500', label: 'Examination' },
  { dot: 'bg-green-500', label: 'Holiday' },
  { dot: 'bg-purple-500', label: 'Seminar' },
  { dot: 'bg-pink-500', label: 'Workshop' },
  { dot: 'bg-red-500', label: 'Sports' },
  { dot: 'bg-yellow-500', label: 'Cultural' },
  { dot: 'bg-teal-500', label: 'NSS' },
  { dot: 'bg-slate-500', label: 'NCC' },
  { dot: 'bg-rose-700', label: 'Important' },
];

export default function EventsTimeline() {
  return (
    <div className="mt-10">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-[#D4A017] w-12" />
        <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider">Upcoming Events Timeline</h2>
        <div className="h-px bg-[#D4A017] flex-1" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Timeline Cards */}
        <div className="flex-1 overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-max lg:min-w-0 lg:grid lg:grid-cols-5">
            {timelineEvents.map((ev, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-4 w-[200px] lg:w-auto flex flex-col gap-2">
                {/* Date Badge */}
                <div className={`${ev.dayBg} text-white rounded-xl px-3 py-2 flex items-center gap-2 mb-1 w-fit`}>
                  <span className="text-xl font-black leading-none">{ev.day}</span>
                  <span className="text-[10px] font-bold uppercase opacity-90 leading-tight">{ev.month}</span>
                </div>

                <h4 className="font-black text-sm text-slate-800 leading-tight">{ev.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{ev.subtitle}</p>

                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock size={10} className="flex-shrink-0" />
                  {ev.time}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin size={10} className="flex-shrink-0" />
                  {ev.location}
                </div>

                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${ev.typeBg} ${ev.typeColor}`}>
                  {ev.type}
                </span>

                <button className="flex items-center gap-1 text-xs font-bold text-[#123B6D] hover:text-[#0f3059] transition-colors mt-auto pt-1">
                  {ev.action} <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="w-full lg:w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {quickActions.map((a, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#123B6D] border-b last:border-b-0 border-slate-100 transition-colors text-left"
              >
                <span className="text-slate-400">{a.icon}</span>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 py-4 border-t border-slate-100">
        {legend.map((l, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-full ${l.dot}`} />
            <span className="text-xs font-semibold text-slate-600">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
