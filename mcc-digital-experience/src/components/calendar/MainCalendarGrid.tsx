'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, X, MapPin, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Event = {
  id?: string;
  month: number; // 1-12
  date: number;
  type: string;
  label: string;
  venue?: string;
  time?: string;
};

const eventTypes: Record<string, { color: string; bg: string; dot: string; border: string; label: string }> = {
  Academic:    { color: 'text-blue-700',   bg: 'bg-blue-100',   dot: 'bg-blue-500',   border: 'border-blue-400',   label: 'Academic' },
  Examination: { color: 'text-orange-700', bg: 'bg-orange-100', dot: 'bg-orange-500', border: 'border-orange-400', label: 'Examination' },
  Holiday:     { color: 'text-green-700',  bg: 'bg-green-100',  dot: 'bg-green-500',  border: 'border-green-400',  label: 'Holiday' },
  Seminar:     { color: 'text-purple-700', bg: 'bg-purple-100', dot: 'bg-purple-500', border: 'border-purple-400', label: 'Seminar' },
  Workshop:    { color: 'text-pink-700',   bg: 'bg-pink-100',   dot: 'bg-pink-500',   border: 'border-pink-400',   label: 'Workshop' },
  Sports:      { color: 'text-red-700',    bg: 'bg-red-100',    dot: 'bg-red-500',    border: 'border-red-400',    label: 'Sports' },
  Cultural:    { color: 'text-yellow-700', bg: 'bg-yellow-100', dot: 'bg-yellow-500', border: 'border-yellow-400', label: 'Cultural' },
  NSS:         { color: 'text-teal-700',   bg: 'bg-teal-100',   dot: 'bg-teal-500',   border: 'border-teal-400',   label: 'NSS' },
  NCC:         { color: 'text-slate-700',  bg: 'bg-slate-200',  dot: 'bg-slate-500',  border: 'border-slate-400',  label: 'NCC' },
  Event:       { color: 'text-indigo-700', bg: 'bg-indigo-100', dot: 'bg-indigo-500', border: 'border-indigo-400', label: 'Event' },
};

const filterColors: Record<string, string> = {
  All:         'bg-[#123B6D] text-white border-[#123B6D]',
  Academic:    'bg-blue-500 text-white border-blue-500',
  Examination: 'bg-orange-500 text-white border-orange-500',
  Holiday:     'bg-green-500 text-white border-green-500',
  Seminar:     'bg-purple-500 text-white border-purple-500',
  Workshop:    'bg-pink-500 text-white border-pink-500',
  Sports:      'bg-red-500 text-white border-red-500',
  Cultural:    'bg-yellow-500 text-white border-yellow-500',
  NSS:         'bg-teal-500 text-white border-teal-500',
  NCC:         'bg-slate-500 text-white border-slate-500',
  Event:       'bg-indigo-500 text-white border-indigo-500',
};

const filterInactive: Record<string, string> = {
  All:         'bg-white text-slate-700 border-slate-200 hover:border-[#123B6D]',
  Academic:    'bg-white text-blue-700 border-blue-200 hover:bg-blue-50',
  Examination: 'bg-white text-orange-700 border-orange-200 hover:bg-orange-50',
  Holiday:     'bg-white text-green-700 border-green-200 hover:bg-green-50',
  Seminar:     'bg-white text-purple-700 border-purple-200 hover:bg-purple-50',
  Workshop:    'bg-white text-pink-700 border-pink-200 hover:bg-pink-50',
  Sports:      'bg-white text-red-700 border-red-200 hover:bg-red-50',
  Cultural:    'bg-white text-yellow-700 border-yellow-200 hover:bg-yellow-50',
  NSS:         'bg-white text-teal-700 border-teal-200 hover:bg-teal-50',
  NCC:         'bg-white text-slate-700 border-slate-200 hover:bg-slate-100',
  Event:       'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50',
};

const filterDots: Record<string, string> = {
  Academic: 'bg-blue-500', Examination: 'bg-orange-500', Holiday: 'bg-green-500',
  Seminar: 'bg-purple-500', Workshop: 'bg-pink-500', Sports: 'bg-red-500',
  Cultural: 'bg-yellow-500', NSS: 'bg-teal-500', NCC: 'bg-slate-500', Event: 'bg-indigo-500',
};

const filters = ['All', 'Academic', 'Examination', 'Holiday', 'Seminar', 'Workshop', 'Sports', 'Cultural', 'NSS', 'NCC', 'Event'];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Demo events — month is 1-indexed
const events: Event[] = [
  // Month 5 (May) - multiple types
  { month: 5, date: 1,  type: 'Academic',    label: 'Orientation' },
  { month: 5, date: 1,  type: 'Seminar',     label: 'Open Seminar' },
  { month: 5, date: 4,  type: 'Academic',    label: 'Guest Lecture' },
  { month: 5, date: 6,  type: 'Academic',    label: 'Workshop' },
  { month: 5, date: 6,  type: 'Examination', label: 'Mid-Sem' },
  { month: 5, date: 9,  type: 'Seminar',     label: 'Career Talk' },
  { month: 5, date: 11, type: 'Holiday',     label: 'Holiday' },
  { month: 5, date: 13, type: 'Academic',    label: 'Alumni Meet' },
  { month: 5, date: 13, type: 'Cultural',    label: 'Cultural Fest' },
  { month: 5, date: 15, type: 'Academic',    label: 'Lecture' },
  { month: 5, date: 15, type: 'Examination', label: 'Exam' },
  { month: 5, date: 15, type: 'Workshop',    label: 'Workshop' },
  { month: 5, date: 17, type: 'Academic',    label: 'Class' },
  { month: 5, date: 18, type: 'Examination', label: 'Sem Exam' },
  { month: 5, date: 19, type: 'Academic',    label: 'Project' },
  { month: 5, date: 21, type: 'Academic',    label: 'Lab' },
  { month: 5, date: 21, type: 'Seminar',     label: 'Seminar' },
  { month: 5, date: 22, type: 'Seminar',     label: 'Research' },
  { month: 5, date: 23, type: 'Academic',    label: 'Lecture' },
  { month: 5, date: 23, type: 'Cultural',    label: 'Event' },
  { month: 5, date: 23, type: 'Workshop',    label: 'Workshop' },
  { month: 5, date: 23, type: 'Sports',      label: 'Match' },
  { month: 5, date: 23, type: 'NSS',         label: 'Drive' },
  { month: 5, date: 26, type: 'Holiday',     label: 'Holiday' },
  { month: 5, date: 27, type: 'Academic',    label: 'Internal Exam' },
  { month: 5, date: 27, type: 'Seminar',     label: 'Talk' },
  { month: 5, date: 29, type: 'Academic',    label: 'Review' },
  { month: 5, date: 29, type: 'Workshop',    label: 'Digital' },
  { month: 5, date: 30, type: 'Academic',    label: 'Lecture' },
  { month: 5, date: 30, type: 'Cultural',    label: 'Music' },
  // Month 7 (July) - current month for demo
  { month: 7, date: 1,  type: 'Academic',    label: 'Semester Start' },
  { month: 7, date: 3,  type: 'Workshop',    label: 'Induction' },
  { month: 7, date: 5,  type: 'Holiday',     label: 'Bakri Eid' },
  { month: 7, date: 7,  type: 'Academic',    label: 'Guest Lecture' },
  { month: 7, date: 10, type: 'Seminar',     label: 'Career Talk' },
  { month: 7, date: 14, type: 'Examination', label: 'Internal Test' },
  { month: 7, date: 15, type: 'Cultural',    label: 'Annual Day' },
  { month: 7, date: 17, type: 'Sports',      label: 'Sports Day' },
  { month: 7, date: 18, type: 'NSS',         label: 'Camp' },
  { month: 7, date: 21, type: 'Academic',    label: 'Faculty Session' },
  { month: 7, date: 22, type: 'Workshop',    label: 'Digital Skills' },
  { month: 7, date: 24, type: 'Examination', label: 'Unit Test' },
  { month: 7, date: 26, type: 'NCC',         label: 'NCC Parade' },
  { month: 7, date: 28, type: 'Academic',    label: 'Research Talk' },
  { month: 7, date: 28, type: 'Holiday',     label: 'Holiday' },
  { month: 7, date: 31, type: 'Seminar',     label: 'End of Month' },
  // Month 8 (August)
  { month: 8, date: 1,  type: 'Workshop',    label: 'Tech Workshop' },
  { month: 8, date: 5,  type: 'Academic',    label: 'Lecture' },
  { month: 8, date: 9,  type: 'Cultural',    label: 'Janmashtami' },
  { month: 8, date: 15, type: 'Holiday',     label: 'Independence Day' },
  { month: 8, date: 20, type: 'Examination', label: 'Test 1' },
  { month: 8, date: 22, type: 'Sports',      label: 'Tournament' },
];

const YEAR_RANGE = Array.from({ length: 11 }, (_, i) => 2020 + i); // 2020–2030

export default function MainCalendarGrid({ isAdmin = false }: { isAdmin?: boolean }) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // 1-indexed
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState<number | null>(today.getDate());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const yearRef = useRef<HTMLDivElement>(null);
  const [liveEvents, setLiveEvents] = useState<Event[]>([]);

  // Popup state
  const [popup, setPopup] = useState<{ day: number; events: Event[] } | null>(null);

  // Fetch notice-calendar events from Supabase
  const fetchNoticeCalEvents = async () => {
    const { data } = await supabase
      .from('notices')
      .select('id, calendar_title, calendar_date, calendar_category, calendar_venue, calendar_time')
      .eq('publish_calendar', true)
      .not('calendar_date', 'is', null);
    if (data) {
      setLiveEvents(data.map((n: any) => {
        const d = new Date(n.calendar_date);
        return {
          id: n.id,
          month: d.getMonth() + 1,
          date: d.getDate(),
          type: n.calendar_category || 'Event',
          label: n.calendar_title || 'Event',
          venue: n.calendar_venue,
          time: n.calendar_time,
        };
      }));
    }
  };

  useEffect(() => {
    fetchNoticeCalEvents();
  }, []);

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event from the calendar?')) return;
    await supabase.from('notices').delete().eq('id', id);
    // Refresh the events or filter them out locally
    setLiveEvents(prev => prev.filter(e => e.id !== id));
    // Also remove from popup if currently viewing
    setPopup(prev => prev ? { ...prev, events: prev.events.filter(e => e.id !== id) } : null);
  };

  // Close year picker on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (yearRef.current && !yearRef.current.contains(e.target as Node)) {
        setShowYearPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const goToPrevMonth = () => {
    if (currentMonth === 1) { setCurrentMonth(12); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    if (currentMonth === 12) { setCurrentMonth(1); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
    setSelectedDate(today.getDate());
  };

  // Get events for current month — merge hardcoded + live
  const allEvents = useMemo(() => [...events, ...liveEvents], [liveEvents]);
  const monthEvents = allEvents.filter(e => e.month === currentMonth);
  const filteredEvents = monthEvents.filter(e => activeFilter === 'All' || e.type === activeFilter);
  const getEventsForDate = (date: number) => filteredEvents.filter(e => e.date === date);

  // Build calendar grid
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0=Sun

  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const isCurrentMonth = currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear();

  return (
    <div className="flex-1 min-w-0">
      {/* ── Calendar Header Controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2">
          <CalendarDays size={20} className="text-[#123B6D]" />
          <span className="font-black text-slate-800 text-lg">MCC's Calendar</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Prev month */}
          <button
            onClick={goToPrevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Month + Year display */}
          <div className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 min-w-[130px] text-center bg-white">
            {MONTHS[currentMonth - 1]} {currentYear}
          </div>

          {/* Next month */}
          <button
            onClick={goToNextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <ChevronRight size={16} />
          </button>

          {/* Today */}
          <button
            onClick={goToToday}
            className="px-3 py-1.5 border border-[#123B6D] bg-[#123B6D] text-white rounded-lg text-sm font-bold hover:bg-[#0f3059] transition-colors"
          >
            Today
          </button>

          {/* Year picker */}
          <div className="relative" ref={yearRef}>
            <button
              onClick={() => setShowYearPicker(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {currentYear}
              <ChevronLeft size={12} className={`transition-transform ${showYearPicker ? 'rotate-90' : 'rotate-[-90deg]'}`} />
            </button>
            {showYearPicker && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden w-36">
                {YEAR_RANGE.map(y => (
                  <button
                    key={y}
                    onClick={() => { setCurrentYear(y); setShowYearPicker(false); setSelectedDate(null); }}
                    className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${
                      y === currentYear
                        ? 'bg-[#123B6D] text-white'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Filter Pills ── */}
      <div className="flex flex-wrap gap-2 mb-5">
        {filters.map(f => {
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                isActive ? filterColors[f] : filterInactive[f]
              }`}
            >
              {f !== 'All' && (
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? 'bg-white' : filterDots[f]}`} />
              )}
              {f}
            </button>
          );
        })}
      </div>

      {/* ── Calendar Grid ── */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
            <div key={d} className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest py-3 border-r last:border-r-0 border-slate-200">
              {d}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b last:border-b-0 border-slate-100">
            {week.map((day, di) => {
              const dayEvents = day ? getEventsForDate(day) : [];
              const allDayEvents = day ? monthEvents.filter(e => e.date === day) : [];
              const isToday = isCurrentMonth && day === today.getDate();
              const isSelected = day === selectedDate;
              const displayEvents = dayEvents.slice(0, 1);
              const extra = dayEvents.length - 1;
              // All unique event types for this day (for dots)
              const dotTypes = [...new Set(allDayEvents.map(e => e.type))].slice(0, 4);

              return (
                <div
                  key={di}
                  onClick={() => {
                    if (!day) return;
                    setSelectedDate(day);
                    // Get ALL events for this day (unfiltered by type filter) for the popup
                    const dayAllEvents = allEvents.filter(e => e.month === currentMonth && e.date === day);
                    if (dayAllEvents.length > 0) {
                      setPopup({ day, events: dayAllEvents });
                    }
                  }}
                  className={`min-h-[90px] p-2 border-r last:border-r-0 border-slate-100 relative transition-colors ${
                    !day
                      ? 'bg-slate-50/70 cursor-default'
                      : isToday
                        ? 'bg-blue-50 cursor-pointer'
                        : isSelected
                          ? 'bg-indigo-50/60 cursor-pointer'
                          : 'hover:bg-slate-50 cursor-pointer'
                  }`}
                >
                  {day && (
                    <>
                      {/* Date Number */}
                      <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-black mb-1 transition-all ${
                        isToday
                          ? 'bg-[#123B6D] text-white shadow-lg ring-2 ring-[#123B6D]/30'
                          : isSelected
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'text-slate-700 hover:bg-slate-100'
                      }`}>
                        {day}
                      </div>

                      {/* Event Chips */}
                      <div className="space-y-0.5">
                        {displayEvents.map((ev, ei) => {
                          const style = eventTypes[ev.type];
                          return (
                            <div key={ei} className={`${style.bg} ${style.color} text-[9px] font-bold rounded px-1 py-0.5 truncate leading-tight`}>
                              {ev.label}
                            </div>
                          );
                        })}
                        {extra > 0 && (
                          <div className="text-[9px] font-bold text-[#123B6D] bg-blue-50 border border-blue-200 rounded px-1 py-0.5">
                            +{extra} More
                          </div>
                        )}
                      </div>

                      {/* Colored Dots for all event types */}
                      {dotTypes.length > 0 && (
                        <div className="flex gap-0.5 mt-1.5 flex-wrap">
                          {dotTypes.map((type, ti) => (
                            <span
                              key={ti}
                              title={type}
                              className={`w-2 h-2 rounded-full ${eventTypes[type]?.dot} flex-shrink-0`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* No Events State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm font-medium mt-4">
          No {activeFilter === 'All' ? '' : activeFilter} events found for {MONTHS[currentMonth - 1]} {currentYear}.
        </div>
      )}

      {/* ── Date Event Popup Modal ── */}
      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setPopup(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#123B6D] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">{MONTHS[currentMonth - 1]} {currentYear}</p>
                <h3 className="text-white text-2xl font-black mt-0.5">
                  {String(popup.day).padStart(2, '0')} {SHORT_MONTHS[currentMonth - 1]}
                </h3>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-2xl px-4 py-2">
                  <span className="text-white font-black text-lg">{popup.events.length}</span>
                  <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wide">Event{popup.events.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={() => setPopup(null)}
                className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Events List */}
            <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto">
              {popup.events.map((ev, i) => {
                const style = eventTypes[ev.type] ?? eventTypes['Event'];
                return (
                  <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                    {/* Colour strip */}
                    <div className={`w-1 self-stretch rounded-full ${style.dot} flex-shrink-0`} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-bold text-sm text-slate-800 leading-tight">{ev.label}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${style.bg} ${style.color}`}>
                          {ev.type}
                        </span>
                      </div>
                      {(ev as any).venue && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
                          <MapPin size={10} className="flex-shrink-0" />
                          <span>{(ev as any).venue}</span>
                        </div>
                      )}
                      {(ev as any).time && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock size={10} className="flex-shrink-0" />
                          <span>{(ev as any).time}</span>
                        </div>
                      )}
                    </div>

                    {isAdmin && ev.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(ev.id!);
                        }}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        title="Delete Event"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setPopup(null)}
                className="w-full py-2.5 bg-[#123B6D] text-white rounded-xl text-sm font-bold hover:bg-[#0f3059] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
