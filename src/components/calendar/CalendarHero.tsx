'use client';

import React from 'react';
import { Calendar, Download, ChevronLeft, ChevronRight, CalendarDays, BookOpen, FileText, LayoutGrid } from 'lucide-react';

export default function CalendarHero() {
  return (
    <div className="relative w-full bg-[#0F172A] pt-24 pb-44 overflow-hidden text-white font-sans">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 right-0 w-[600px] h-[600px] border border-white/5 rounded-full translate-x-1/3" />
        <div className="absolute top-20 right-0 w-[450px] h-[450px] border border-white/5 rounded-full translate-x-1/4" />
        <div className="absolute top-32 right-0 w-[300px] h-[300px] border border-white/5 rounded-full translate-x-1/6" />
        <div className="absolute bottom-16 right-[30%] opacity-20 grid grid-cols-5 gap-2">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white" />
          ))}
        </div>
        <div className="absolute top-20 left-10 opacity-20 grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">

        {/* Left: Content */}
        <div className="flex-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 border border-[#D4A017]/40 bg-[#D4A017]/10 text-[#D4A017] px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">
            <Calendar size={13} />
            Academic Calendar
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight">
            Academic Events{' '}
            <span className="text-[#D4A017]">Calendar</span>
          </h1>

          <p className="text-base lg:text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">
            Stay updated with lectures, examinations, holidays, seminars, workshops, cultural events and important academic schedules throughout the year.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-[#D4A017] hover:bg-[#B8860B] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#D4A017]/20 hover:shadow-xl hover:shadow-[#D4A017]/30 hover:-translate-y-0.5">
              <LayoutGrid size={17} /> View Upcoming Events
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5">
              <Download size={17} /> Download Calendar (PDF)
            </button>
          </div>
        </div>

        {/* Right: Mini Calendar Widget */}
        <div className="w-full max-w-[380px] bg-white text-slate-800 rounded-3xl p-5 shadow-2xl shadow-black/40 relative z-20 flex-shrink-0">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-5 px-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <h3 className="font-black text-base text-slate-800 tracking-tight">May 2025</h3>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
            {['S','M','T','W','T','F','S'].map((d, i) => <div key={i}>{d}</div>)}
          </div>

          {/* Date Grid — May 2025 */}
          <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold text-slate-600">
            {/* Prev month */}
            {['27','28','29','30'].map(d => <div key={d} className="text-slate-300 py-1">{d}</div>)}
            {/* May dates */}
            <div className="py-1">1<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-blue-500"/><span className="w-1 h-1 rounded-full bg-orange-500"/></div></div>
            <div className="py-1">2<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-green-500"/><span className="w-1 h-1 rounded-full bg-purple-500"/></div></div>
            <div className="py-1">3</div>
            <div className="py-1">4<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-blue-500"/></div></div>
            <div className="py-1">5</div>
            <div className="py-1">6<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-blue-500"/><span className="w-1 h-1 rounded-full bg-orange-500"/></div></div>
            <div className="py-1">7</div>
            <div className="py-1">8</div>
            <div className="py-1">9<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-purple-500"/></div></div>
            <div className="py-1">10</div>
            <div className="py-1">11</div>
            <div className="py-1">12</div>
            <div className="py-1">13<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-pink-500"/><span className="w-1 h-1 rounded-full bg-red-500"/></div></div>
            <div className="py-1">14</div>
            <div className="flex justify-center"><div className="w-7 h-7 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center shadow-md text-xs font-black">15</div></div>
            <div className="py-1">16</div>
            <div className="py-1">17<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-blue-500"/></div></div>
            <div className="py-1">18<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-orange-500"/></div></div>
            <div className="py-1">19<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-blue-500"/></div></div>
            <div className="py-1">20</div>
            <div className="py-1">21<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-blue-500"/><span className="w-1 h-1 rounded-full bg-purple-500"/></div></div>
            <div className="py-1">22</div>
            <div className="py-1">23<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-orange-500"/></div></div>
            <div className="py-1">24</div>
            <div className="py-1">25</div>
            <div className="py-1">26<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-green-500"/></div></div>
            <div className="py-1">27<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-blue-500"/><span className="w-1 h-1 rounded-full bg-purple-500"/></div></div>
            <div className="py-1">28</div>
            <div className="py-1">29<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-orange-500"/></div></div>
            <div className="py-1">30<div className="flex justify-center gap-0.5 mt-0.5"><span className="w-1 h-1 rounded-full bg-blue-500"/><span className="w-1 h-1 rounded-full bg-pink-500"/></div></div>
            <div className="py-1 text-slate-300">31</div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-4 border-t border-slate-100 mt-4 pt-4 gap-2">
            {[
              { icon: <CalendarDays size={14} className="text-blue-500" />, value: '18', label: 'Events this Month', color: 'text-blue-500' },
              { icon: <Calendar size={14} className="text-green-500" />, value: '6', label: 'Holidays', color: 'text-green-500' },
              { icon: <FileText size={14} className="text-orange-500" />, value: '4', label: 'Examinations', color: 'text-orange-500' },
              { icon: <BookOpen size={14} className="text-purple-500" />, value: '7', label: 'Seminars', color: 'text-purple-500' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-1">{s.icon}</div>
                <span className="text-sm font-black text-slate-800 leading-none">{s.value}</span>
                <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wide mt-1 leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
