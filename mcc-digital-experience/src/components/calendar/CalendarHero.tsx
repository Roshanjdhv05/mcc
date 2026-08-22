'use client';

import React from 'react';
import { Calendar, Download, ChevronLeft, ChevronRight, CalendarDays, BookOpen, FileText, LayoutGrid } from 'lucide-react';

export default function CalendarHero() {
  return (
    <div className="relative w-full bg-[#0F172A] pt-12 pb-20 overflow-hidden text-white font-sans">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 right-0 w-[600px] h-[600px] border border-white/5 rounded-full translate-x-1/3" />
        <div className="absolute top-20 right-0 w-[450px] h-[450px] border border-white/5 rounded-full translate-x-1/4" />
        <div className="absolute top-32 right-0 w-[300px] h-[300px] border border-white/5 rounded-full translate-x-1/6" />
        <div className="absolute top-10 left-10 opacity-20 grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-[#D4A017]/40 bg-[#D4A017]/10 text-[#D4A017] px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">
            <Calendar size={13} />
            MCC's Calendar
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black leading-tight">
            Academic Events{' '}
            <span className="text-[#D4A017]">Calendar</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
