'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Home, Archive, Image as ImageIcon, Trash2, RefreshCw,
  CheckCircle, Clock, AlertTriangle, ChevronDown, ChevronUp, Eye, Plus, X, UploadCloud, Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type HomeEvent = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  images: string[];
  published_at: string;
  publish_home: boolean;
  status: string;
};

const CATEGORIES = [
  'Events & Activities', 'Festivals', 'Publication',
  'Industrial Visits', 'Cultural', 'Sports', 'NSS', 'Academic', 'Workshop', 'Seminar',
];

function getDaysAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

async function uploadFile(file: File, bucket: string, folder: string): Promise<string | null> {
  const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error || !data) { console.error(error); return null; }
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
}

function EventCard({
  event,
  isArchived,
  onRemoveFromHome,
  onRestoreToHome,
}: {
  event: HomeEvent;
  isArchived: boolean;
  onRemoveFromHome: (id: string) => void;
  onRestoreToHome: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const daysAgo = getDaysAgo(event.published_at);
  const daysLeft = 90 - daysAgo;

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${isArchived ? 'border-gray-200 opacity-80' : 'border-[#E2E8F0]'}`}>
      <div className="flex items-start gap-4 p-4">
        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
          {event.images && event.images[0] ? (
            <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon size={24} className="text-gray-300" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-bold text-gray-900 text-sm truncate">{event.title}</h4>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {event.category && (
                  <span className="px-2 py-0.5 bg-[#123B6D]/10 text-[#123B6D] text-[10px] font-bold rounded-full uppercase">
                    {event.category}
                  </span>
                )}
                {event.department && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-full">
                    {event.department}
                  </span>
                )}
              </div>
            </div>

            {/* Status badge */}
            {isArchived ? (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full flex-shrink-0">
                <Archive size={11} /> Archived
              </span>
            ) : (
              <span className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                daysLeft <= 10 ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                <Clock size={11} />
                {daysLeft <= 0 ? 'Expiring soon' : `${daysLeft}d left`}
              </span>
            )}
          </div>

          <p className="text-[11px] text-gray-400 mt-1.5">
            Published: {new Date(event.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            {' '}· {daysAgo} day{daysAgo !== 1 ? 's' : ''} ago
          </p>

          {event.images && event.images.length > 0 && (
            <p className="text-[11px] text-gray-400 mt-0.5">
              {event.images.length} image{event.images.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Expandable image strip */}
      {event.images && event.images.length > 0 && (
        <div className="px-4 pb-2">
          <button
            onClick={() => setExpanded(v => !v)}
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 font-semibold transition-colors"
          >
            <Eye size={12} /> Preview images {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          {expanded && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {event.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${event.title} ${idx + 1}`}
                  className="h-16 w-24 object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100 flex-wrap">
        {!isArchived ? (
          <button
            onClick={() => onRemoveFromHome(event.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
          >
            <Home size={13} /> Remove from Homepage
          </button>
        ) : (
          <button
            onClick={() => onRestoreToHome(event.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <CheckCircle size={13} /> Restore to Homepage
          </button>
        )}

      </div>
    </div>
  );
}

export default function HomeEventsManager() {
  const [events, setEvents] = useState<HomeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [uploads, setUploads] = useState<{name: string, url: string}[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('id, title, description, category, department, images, published_at, publish_home, status')
      .eq('publish_home', true)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (!error && data) setEvents(data as HomeEvent[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const showMsg = (type: 'success' | 'error', text: string) => {
    setActionMsg({ type, text });
    setTimeout(() => setActionMsg(null), 3500);
  };

  const handleRemoveFromHome = async (id: string) => {
    const { error } = await supabase.from('events').update({ publish_home: false }).eq('id', id);
    if (error) showMsg('error', 'Failed to update event.');
    else { showMsg('success', 'Event removed from homepage.'); fetchEvents(); }
  };

  const handleRestoreToHome = async (id: string) => {
    const { error } = await supabase.from('events').update({ publish_home: true }).eq('id', id);
    if (error) showMsg('error', 'Failed to restore event.');
    else { showMsg('success', 'Event restored to homepage.'); fetchEvents(); }
  };



  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, 'event-images', 'events');
      if (url) setUploads(prev => [...prev, { name: file.name, url }]);
      else showMsg('error', `Failed to upload ${file.name}`);
    }
    setUploading(false);
    e.target.value = '';
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category) {
      showMsg('error', 'Title and Category are required');
      return;
    }
    setSaving(true);
    const imageUrls = uploads.map(u => u.url);

    const payload = {
      title: title.trim(),
      description: '',
      category,
      department: null,
      programme: null,
      programme_section: null,
      images: imageUrls,
      videos: [],
      documents: [],
      publish_gallery: false,
      publish_home: true,
      publish_calendar: false,
      publish_programme: false,
      status: 'published',
      published_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('events').insert([payload]);
    if (error) {
      showMsg('error', error.message);
    } else {
      showMsg('success', 'Event published to homepage!');
      setShowUploadForm(false);
      setTitle(''); setCategory(''); setUploads([]);
      fetchEvents();
    }
    setSaving(false);
  };

  const activeEvents = events.filter(e => new Date(e.published_at) >= ninetyDaysAgo);
  const archivedEvents = events.filter(e => new Date(e.published_at) < ninetyDaysAgo);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Homepage Latest Events</h2>
          <p className="text-sm text-gray-500">Manage events shown in the "Latest Events" section. Events auto-archive after 90 days.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchEvents}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          {!showUploadForm ? (
            <button
              onClick={() => setShowUploadForm(true)}
              className="flex items-center gap-2 bg-[#123B6D] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm"
            >
              <Plus size={16} /> Add Homepage Event
            </button>
          ) : (
            <button
              onClick={() => setShowUploadForm(false)}
              className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors shadow-sm"
            >
              <X size={16} /> Close Form
            </button>
          )}
        </div>
      </div>

      {/* Action message */}
      {actionMsg && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${
          actionMsg.type === 'success'
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {actionMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {actionMsg.text}
        </div>
      )}

      {/* Upload Form */}
      {showUploadForm && (
        <div className="mb-8 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Upload Event to Homepage</h3>
          <form onSubmit={handlePublish} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Event Title <span className="text-red-500">*</span></label>
                <input
                  type="text" required value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Science Exhibition 2026"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                <select
                  required value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white"
                >
                  <option value="">Select Category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Event Images (Optional)</label>
              <div className="flex gap-4 items-start">
                <button
                  type="button" onClick={() => imageRef.current?.click()} disabled={uploading}
                  className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#123B6D] hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  {uploading ? <Loader2 size={24} className="animate-spin text-gray-400" /> : <UploadCloud size={24} className="text-gray-400" />}
                  <span className="text-xs font-semibold text-gray-500 mt-2">{uploading ? 'Uploading...' : 'Upload Image'}</span>
                </button>
                <input type="file" accept="image/*" multiple ref={imageRef} className="hidden" onChange={handleImageUpload} />
                
                {uploads.length > 0 && (
                  <div className="flex flex-wrap gap-3 flex-1">
                    {uploads.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img.url} alt="upload" className="w-32 h-32 object-cover rounded-xl border border-gray-200" />
                        <button
                          type="button" onClick={() => setUploads(uploads.filter((_, idx) => idx !== i))}
                          className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="submit" disabled={saving || uploading}
                className="flex items-center gap-2 bg-[#123B6D] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors disabled:opacity-70 shadow-sm"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Home size={16} />}
                Publish to Homepage
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#123B6D]" />
        </div>
      ) : (
        <>
          {/* ── CURRENTLY LIVE ── */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <h3 className="font-bold text-gray-800 text-base">Currently Live</h3>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                {activeEvents.length} event{activeEvents.length !== 1 ? 's' : ''}
              </span>
              <span className="text-xs text-gray-400 ml-1">· published within 90 days · visible on homepage</span>
            </div>

            {activeEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-12 flex flex-col items-center gap-3">
                <Home size={36} className="text-gray-200" />
                <p className="text-gray-400 font-semibold text-sm">No active events on homepage</p>
                <p className="text-gray-400 text-xs">Publish a new event to show it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {activeEvents.map(ev => (
                  <EventCard
                    key={ev.id}
                    event={ev}
                    isArchived={false}
                    onRemoveFromHome={handleRemoveFromHome}
                    onRestoreToHome={handleRestoreToHome}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── ARCHIVED ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Archive size={16} className="text-gray-400" />
              <h3 className="font-bold text-gray-800 text-base">Archived</h3>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
                {archivedEvents.length} event{archivedEvents.length !== 1 ? 's' : ''}
              </span>
              <span className="text-xs text-gray-400 ml-1">· older than 90 days · hidden from homepage</span>
            </div>

            {archivedEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-10 flex flex-col items-center gap-3">
                <Archive size={32} className="text-gray-200" />
                <p className="text-gray-400 font-semibold text-sm">No archived events yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {archivedEvents.map(ev => (
                  <EventCard
                    key={ev.id}
                    event={ev}
                    isArchived={true}
                    onRemoveFromHome={handleRemoveFromHome}
                    onRestoreToHome={handleRestoreToHome}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
