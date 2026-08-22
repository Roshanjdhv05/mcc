'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Trash2, RefreshCw, Image as ImageIcon, ChevronDown, ChevronUp,
  Eye, AlertTriangle, CheckCircle, Loader2, Home, BookOpen
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string | null;
  images: string[];
  published_at: string;
  publish_gallery: boolean;
  publish_home: boolean;
  status: string;
};

interface EventsListProps {
  refreshKey?: number;
}

function EventRow({ event, onDelete }: { event: Event; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(event.id);
    setDeleting(false);
    setConfirmDelete(false);
  };

  return (
    <div className="border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-4 p-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
          {event.images && event.images[0] ? (
            <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon size={20} className="text-gray-300" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-bold text-gray-900 text-sm truncate">{event.title}</h4>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {event.category && (
                  <span className="px-2 py-0.5 bg-[#123B6D]/10 text-[#123B6D] text-[10px] font-bold rounded-full uppercase">{event.category}</span>
                )}
                {event.department && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-full">{event.department}</span>
                )}
                {event.publish_home && (
                  <span className="flex items-center gap-0.5 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                    <Home size={9} /> Homepage
                  </span>
                )}
                {event.publish_gallery && (
                  <span className="flex items-center gap-0.5 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full">
                    <BookOpen size={9} /> Gallery
                  </span>
                )}
              </div>
            </div>
            <span className="text-[11px] text-gray-400 flex-shrink-0 whitespace-nowrap">
              {new Date(event.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          {event.description && <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">{event.description}</p>}
          {event.images && event.images.length > 0 && (
            <button onClick={() => setExpanded(v => !v)}
              className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 font-semibold transition-colors mt-1.5">
              <Eye size={11} /> {event.images.length} image{event.images.length !== 1 ? 's' : ''}
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
          )}
        </div>
      </div>

      {expanded && event.images && event.images.length > 0 && (
        <div className="px-4 pb-3 flex gap-2 flex-wrap">
          {event.images.map((img, idx) => (
            <img key={idx} src={img} alt={`${event.title} ${idx + 1}`}
              className="h-16 w-24 object-cover rounded-lg border border-gray-200" />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 px-4 pb-3">
        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors">
            <Trash2 size={12} /> Delete
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-red-600 font-semibold">Delete this event?</span>
            <button onClick={handleDelete} disabled={deleting}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-60">
              {deleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
              {deleting ? 'Deleting...' : 'Confirm'}
            </button>
            <button onClick={() => setConfirmDelete(false)}
              className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventsList({ refreshKey = 0 }: EventsListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('id, title, description, category, department, images, published_at, publish_gallery, publish_home, status')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (!error && data) setEvents(data as Event[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents, refreshKey]);

  const showMsg = (type: 'success' | 'error', text: string) => {
    setActionMsg({ type, text });
    setTimeout(() => setActionMsg(null), 3500);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) showMsg('error', 'Failed to delete event.');
    else { showMsg('success', 'Event deleted successfully.'); fetchEvents(); }
  };

  return (
    <div>
      {actionMsg && (
        <div className={`mx-4 mt-4 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${
          actionMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {actionMsg.type === 'success' ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
          {actionMsg.text}
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="text-xs text-gray-500 font-semibold">
          {loading ? 'Loading...' : `${events.length} event${events.length !== 1 ? 's' : ''} published`}
        </span>
        <button onClick={fetchEvents}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors">
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#123B6D]" />
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <ImageIcon size={40} className="text-gray-200" />
          <p className="text-gray-400 font-semibold text-sm">No events published yet</p>
          <p className="text-gray-400 text-xs">Use "Publish New Event" to add your first event.</p>
        </div>
      ) : (
        <div>{events.map(ev => <EventRow key={ev.id} event={ev} onDelete={handleDelete} />)}</div>
      )}
    </div>
  );
}
