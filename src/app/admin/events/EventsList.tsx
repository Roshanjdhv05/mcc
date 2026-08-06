'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  Globe, Home, BookOpen, Trash2, Eye, Calendar,
  Loader2, LayoutGrid, AlertCircle, Pencil
} from 'lucide-react';
import EventEditModal from './EventEditModal';

type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string | null;
  publish_gallery: boolean;
  publish_home: boolean;
  publish_calendar: boolean;
  publish_programme: boolean;
  programme: string | null;
  programme_section: string | null;
  calendar_date: string | null;
  calendar_type: string | null;
  status: string;
  published_at: string;
  images: string[];
  documents: string[];
};

const CATEGORY_COLORS: Record<string, string> = {
  'Events & Activities': 'bg-blue-100 text-blue-700',
  'Festivals':           'bg-purple-100 text-purple-700',
  'Publication':         'bg-amber-100 text-amber-700',
  'Industrial Visits':   'bg-teal-100 text-teal-700',
  'Cultural':            'bg-pink-100 text-pink-700',
  'Sports':              'bg-red-100 text-red-700',
  'NSS':                 'bg-green-100 text-green-700',
  'Academic':            'bg-indigo-100 text-indigo-700',
};

export default function EventsList({ refreshKey }: { refreshKey: number }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('id, title, description, category, department, publish_gallery, publish_home, publish_calendar, publish_programme, programme, programme_section, calendar_date, calendar_type, status, published_at, images, documents')
      .order('published_at', { ascending: false });
    if (!error && data) setEvents(data as Event[]);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, [refreshKey]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    setDeleting(id);
    await supabase.from('events').delete().eq('id', id);
    setEvents(prev => prev.filter(e => e.id !== id));
    setDeleting(null);
  };

  const handleToggleStatus = async (id: string, current: string) => {
    const next = current === 'published' ? 'archived' : 'published';
    await supabase.from('events').update({ status: next }).eq('id', id);
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: next } : e));
  };

  if (loading) return (
    <div className="flex items-center justify-center py-16 text-gray-400">
      <Loader2 size={22} className="animate-spin mr-2" /> Loading events...
    </div>
  );

  if (events.length === 0) return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
      <LayoutGrid size={36} className="opacity-30" />
      <p className="text-sm font-medium">No events published yet.</p>
    </div>
  );

  return (
    <>
      {/* Edit Modal */}
      {editingEvent && (
        <EventEditModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSaved={() => { setEditingEvent(null); fetchEvents(); }}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Event</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Category</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Published To</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {events.map(ev => (
              <tr key={ev.id} className="hover:bg-gray-50/60 transition-colors">
                {/* Title + thumbnail */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {ev.images?.[0] ? (
                      <img src={ev.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <AlertCircle size={16} className="text-gray-300" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 truncate max-w-[200px]">{ev.title}</p>
                      {ev.department && <p className="text-xs text-gray-400 mt-0.5">{ev.department}</p>}
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[ev.category] || 'bg-gray-100 text-gray-600'}`}>
                    {ev.category}
                  </span>
                </td>

                {/* Publish targets icons */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <span title="Events Gallery" className={`w-7 h-7 rounded-lg flex items-center justify-center ${ev.publish_gallery ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-300'}`}>
                      <Globe size={13} />
                    </span>
                    <span title="Homepage Latest" className={`w-7 h-7 rounded-lg flex items-center justify-center ${ev.publish_home ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-300'}`}>
                      <Home size={13} />
                    </span>
                    <span title="Programme Pages" className={`w-7 h-7 rounded-lg flex items-center justify-center ${ev.publish_programme ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-300'}`}>
                      <BookOpen size={13} />
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-xs text-gray-500">
                  {ev.calendar_date ? (
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(ev.calendar_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  ) : (
                    <span className="text-gray-300">
                      {new Date(ev.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleStatus(ev.id, ev.status)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                      ev.status === 'published'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {ev.status}
                  </button>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {/* Edit */}
                    <button
                      onClick={() => setEditingEvent(ev)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    {/* Preview */}
                    <Link
                      href={`/students-corner/gallery`}
                      target="_blank"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#123B6D] hover:bg-blue-50 transition-colors"
                      title="Preview"
                    >
                      <Eye size={15} />
                    </Link>
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(ev.id)}
                      disabled={deleting === ev.id}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                      title="Delete"
                    >
                      {deleting === ev.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
