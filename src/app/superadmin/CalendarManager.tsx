'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CalendarDays, Save, MapPin, Clock, FileText, Loader2, ListTree } from 'lucide-react';
import { CALENDAR_CATEGORIES } from '@/lib/noticeTypes';
import MainCalendarGrid from '@/components/calendar/MainCalendarGrid';

export default function CalendarManager() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Academic');
  const [venue, setVenue] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) {
      setError('Title and Date are required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const payload = {
        title: `Calendar Event: ${title.trim()}`,
        description: 'Auto-generated academic calendar event.',
        is_general: true,
        categories: ['Academics'],
        departments: [],
        courses: [],
        semesters: [],
        schedule_time: new Date().toISOString(),
        expiry_time: null,
        attachments: [],
        publish_calendar: true,
        is_calendar_only: true, // Hide from notice board
        calendar_title: title.trim(),
        calendar_category: category,
        calendar_date: date,
        calendar_venue: venue.trim() || null,
        calendar_time: time.trim() || null,
      };

      const { error: dbError } = await supabase.from('notices').insert([payload]);

      if (dbError) throw dbError;

      setSuccess(true);
      // Reset form
      setTitle('');
      setDate('');
      setCategory('Academic');
      setVenue('');
      setTime('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create calendar event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Academic Calendar Management</h2>
        <p className="text-sm text-gray-500">Add events directly to the college academic calendar.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Form Column */}
        <div className="xl:col-span-1 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-[#123B6D] mb-5 flex items-center gap-2">
            <CalendarDays size={18} /> New Calendar Event
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-200">
                Event successfully added to calendar! The preview will update shortly.
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                <FileText size={12} /> Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mid-term Examinations"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <ListTree size={12} /> Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
                >
                  {CALENDAR_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                <MapPin size={12} /> Venue <span className="text-slate-400 font-normal normal-case">(Optional)</span>
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Seminar Hall"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                <Clock size={12} /> Time <span className="text-slate-400 font-normal normal-case">(Optional)</span>
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 10:00 AM - 1:00 PM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#123B6D] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm disabled:opacity-50 mt-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {loading ? 'Publishing...' : 'Publish to Calendar'}
            </button>
          </form>
        </div>

        {/* Preview Column */}
        <div className="xl:col-span-2">
          <h3 className="font-bold text-[#123B6D] mb-5 px-1 flex items-center gap-2">
            Calendar Preview
            <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Click any date with an event to manage it</span>
          </h3>
          <div className="origin-top">
            <MainCalendarGrid isAdmin={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
