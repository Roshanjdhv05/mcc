'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { qk, cacheLog } from '@/lib/cache';
import {
  Upload, X, Bell, Image as ImageIcon, CheckSquare, Square,
  Calendar, Clock, Archive, Trash2, RefreshCw, ExternalLink,
  FileText, Image as Img, FileIcon, Search, LayoutGrid, List,
  AlertCircle, Plus, Eye, Edit2
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────

interface JrNotice {
  id: string;
  title: string;
  description: string;
  category: string;
  show_on_home: boolean;
  show_on_notice_page: boolean;
  attachments: { name: string; url: string; type: string }[];
  schedule_time: string;
  expiry_time: string | null;
  created_at: string;
}

interface JrGalleryEvent {
  id: string;
  title: string;
  description: string;
  full_description: string;
  category: string;
  department: string;
  event_date: string;
  show_in_students_corner: boolean;
  images: string[];
  created_at: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const CATEGORY_NOTICE_COLORS: Record<string, string> = {
  Sports:         'bg-green-50 text-green-700 border-green-200',
  Examinations:   'bg-red-50 text-red-700 border-red-200',
  Cultural:       'bg-purple-50 text-purple-700 border-purple-200',
  'Special Days': 'bg-amber-50 text-amber-700 border-amber-200',
};

function AttachmentBadge({ type, name, url }: { type: string; name: string; url: string }) {
  const icon =
    type === 'pdf' ? <FileText size={12} /> :
    ['png', 'jpg', 'jpeg', 'webp'].includes(type) ? <Img size={12} /> :
    <FileIcon size={12} />;
  return (
    <a href={url} target="_blank" rel="noreferrer"
      className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-medium transition-colors">
      {icon}
      <span className="max-w-[100px] truncate">{name}</span>
      <ExternalLink size={10} className="text-slate-400" />
    </a>
  );
}

// ─── Notice Card ────────────────────────────────────────────────────────────

function NoticeCard({ notice, onDelete }: { notice: JrNotice; onDelete: (id: string) => void }) {
  const now = new Date();
  const scheduled = new Date(notice.schedule_time);
  const expired = notice.expiry_time ? new Date(notice.expiry_time) < now : false;
  const isScheduled = scheduled > now;

  return (
    <div className={`bg-white border rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-3 ${expired ? 'border-gray-200 opacity-70' : 'border-[#E2E8F0] hover:border-[#123B6D]/30'}`}>
      <div className="flex flex-wrap items-center gap-1.5">
        {expired && (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            <Archive size={9} /> Archived
          </span>
        )}
        {isScheduled && !expired && (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
            <Clock size={9} /> Scheduled
          </span>
        )}
        {!isScheduled && !expired && (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
            <Eye size={9} /> Active
          </span>
        )}
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${CATEGORY_NOTICE_COLORS[notice.category] || 'bg-blue-50 text-blue-700 border-blue-200'}`}>
          {notice.category}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-[#1E293B] text-sm leading-snug mb-1">{notice.title}</h3>
        {notice.description && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{notice.description}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 text-[11px] text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar size={11} />
          {new Date(notice.schedule_time).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
        {notice.expiry_time && (
          <span className="flex items-center gap-1 text-orange-500">
            <Clock size={11} />
            Expires: {new Date(notice.expiry_time).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        )}
      </div>

      <div className="flex gap-2 text-[10px]">
        {notice.show_on_home && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">Home</span>}
        {notice.show_on_notice_page && <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">Notice Page</span>}
      </div>

      {notice.attachments?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {notice.attachments.map((a, i) => <AttachmentBadge key={i} {...a} />)}
        </div>
      )}

      <button
        onClick={() => onDelete(notice.id)}
        className="mt-1 w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
      >
        <Trash2 size={13} /> Delete Notice
      </button>
    </div>
  );
}

// ─── Gallery Card ───────────────────────────────────────────────────────────

function GalleryCard({ event, onDelete }: { event: JrGalleryEvent; onDelete: (id: string) => void }) {
  const cover = event.images?.[0];
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#123B6D]/30 hover:shadow-md transition-all flex flex-col">
      <div className="relative h-36 bg-gray-100">
        {cover ? (
          <img src={cover} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ImageIcon size={32} />
          </div>
        )}
        {event.images?.length > 1 && (
          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            +{event.images.length - 1} more
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {event.category && <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">{event.category}</span>}
          {event.department && <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">{event.department}</span>}
          {event.show_in_students_corner && <span className="text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">Students Corner</span>}
        </div>
        <h3 className="font-bold text-[#1E293B] text-sm leading-snug flex-1">{event.title}</h3>
        {event.description && <p className="text-xs text-gray-500 line-clamp-2">{event.description}</p>}
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <Calendar size={11} />
          {new Date(event.event_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </div>
        <button
          onClick={() => onDelete(event.id)}
          className="mt-1 w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
        >
          <Trash2 size={13} /> Delete Event
        </button>
      </div>
    </div>
  );
}

// ─── Notice List Section ────────────────────────────────────────────────────

function NoticeListSection() {
  const qc = useQueryClient();
  const [notices, setNotices] = useState<JrNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'active' | 'scheduled' | 'archive'>('active');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const fetchNotices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('jr_college_notices')
      .select('*')
      .order('schedule_time', { ascending: false });
    if (data) setNotices(data as JrNotice[]);
    setLoading(false);
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notice?')) return;
    await supabase.from('jr_college_notices').delete().eq('id', id);
    cacheLog('INVALIDATED', 'jr_college_notices', 'delete action');
    qc.invalidateQueries({ queryKey: qk.jrNotices() });
    qc.invalidateQueries({ queryKey: qk.notices() });
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const now = new Date();
  const classify = (n: JrNotice) => {
    const scheduled = new Date(n.schedule_time);
    const expired = n.expiry_time ? new Date(n.expiry_time) < now : false;
    return { expired, isScheduled: scheduled > now };
  };

  const counts = {
    active:    notices.filter(n => { const { expired, isScheduled } = classify(n); return !expired && !isScheduled; }).length,
    scheduled: notices.filter(n => classify(n).isScheduled).length,
    archive:   notices.filter(n => classify(n).expired).length,
  };

  const filtered = notices.filter(n => {
    const { expired, isScheduled } = classify(n);
    if (view === 'active'    && (expired || isScheduled)) return false;
    if (view === 'scheduled' && !isScheduled)             return false;
    if (view === 'archive'   && !expired)                 return false;
    if (search && !n.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2">
          <Bell size={18} className="text-[#123B6D]" /> Published Notices
        </h2>
        <button onClick={fetchNotices} className="flex items-center gap-1.5 text-gray-500 hover:text-[#123B6D] text-sm font-medium">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 items-center">
        {([
          { key: 'active',    label: 'Active',    icon: <Eye size={13} />,     count: counts.active    },
          { key: 'scheduled', label: 'Scheduled', icon: <Clock size={13} />,   count: counts.scheduled },
          { key: 'archive',   label: 'Archive',   icon: <Archive size={13} />, count: counts.archive   },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setView(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === t.key ? 'bg-[#123B6D] text-white shadow-sm' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#123B6D]/30'}`}>
            {t.icon} {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${view === t.key ? 'bg-white/20' : 'bg-gray-200 text-gray-500'}`}>{t.count}</span>
          </button>
        ))}
        <div className="ml-auto flex gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
          <button onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#123B6D] text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
            <LayoutGrid size={15} />
          </button>
          <button onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#123B6D] text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
            <List size={15} />
          </button>
        </div>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search notices..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <RefreshCw size={22} className="animate-spin mr-2" /> Loading notices...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-gray-400">
          <Bell size={40} className="mx-auto mb-3 opacity-20" />
          <p className="font-medium">No {view} notices found.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(n => <NoticeCard key={n.id} notice={n} onDelete={handleDelete} />)}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(n => (
            <div key={n.id} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:border-[#123B6D]/20 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#EBF3FF] flex items-center justify-center text-[#123B6D] flex-shrink-0">
                  <Bell size={15} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-800 truncate">{n.title}</p>
                  <p className="text-[11px] text-gray-400">
                    {new Date(n.schedule_time).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    {n.expiry_time && ` · Expires ${new Date(n.expiry_time).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${CATEGORY_NOTICE_COLORS[n.category] || 'bg-gray-100 text-gray-500 border-gray-200'}`}>{n.category}</span>
                <button onClick={() => handleDelete(n.id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Gallery List Section ───────────────────────────────────────────────────

function GalleryListSection() {
  const qc = useQueryClient();
  const [events, setEvents] = useState<JrGalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('jr_college_events')
      .select('*')
      .order('event_date', { ascending: false });
    if (data) setEvents(data as JrGalleryEvent[]);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this gallery event?')) return;
    await supabase.from('jr_college_events').delete().eq('id', id);
    cacheLog('INVALIDATED', 'jr_college_events', 'delete action');
    qc.invalidateQueries({ queryKey: qk.jrGallery() });
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Extract unique categories from loaded events
  const allCategories = Array.from(new Set(events.map(e => e.category).filter(Boolean)));

  const filtered = events.filter(e => {
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory && e.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2">
          <ImageIcon size={18} className="text-[#123B6D]" /> Gallery Events
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={fetchEvents} className="flex items-center gap-1.5 text-gray-500 hover:text-[#123B6D] text-sm font-medium">
            <RefreshCw size={14} /> Refresh
          </button>
          <div className="flex gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
            <button onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#123B6D] text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
              <LayoutGrid size={15} />
            </button>
            <button onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#123B6D] text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]" />
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] min-w-[160px]">
          <option value="">All Categories</option>
          {allCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <RefreshCw size={22} className="animate-spin mr-2" /> Loading events...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-gray-400">
          <ImageIcon size={40} className="mx-auto mb-3 opacity-20" />
          <p className="font-medium">No gallery events found.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(e => <GalleryCard key={e.id} event={e} onDelete={handleDelete} />)}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(e => (
            <div key={e.id} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:border-[#123B6D]/20 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                  {e.images?.[0] ? (
                    <img src={e.images[0]} alt={e.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={16} /></div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-800 truncate">{e.title}</p>
                  <p className="text-[11px] text-gray-400">
                    {new Date(e.event_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    {e.category && ` · ${e.category}`}
                    {e.images?.length ? ` · ${e.images.length} image${e.images.length > 1 ? 's' : ''}` : ''}
                  </p>
                </div>
              </div>
              <button onClick={() => handleDelete(e.id)} className="ml-3 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Notice Upload Form ─────────────────────────────────────────────────────

function NoticeUploadForm() {
  const qc = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Sports');
  const [showHome, setShowHome] = useState(true);
  const [showNotice, setShowNotice] = useState(true);
  const [scheduleTime, setScheduleTime] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [attachments, setAttachments] = useState<{ name: string; url: string; type: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [showForm, setShowForm] = useState(false);

  const categories = ['Sports', 'Examinations', 'Cultural', 'Special Days'];

  const handleOpen = () => {
    if (!scheduleTime) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      setScheduleTime(now.toISOString().slice(0, 16));
    }
    setShowForm(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setMsg(null);
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop() || '';
      const path = `jr-notices/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const { data, error } = await supabase.storage.from('notice-attachments').upload(path, file);
      if (error) {
        setMsg({ type: 'error', text: `Upload failed: ${error.message}` });
      } else if (data) {
        const { data: urlData } = supabase.storage.from('notice-attachments').getPublicUrl(path);
        setAttachments(prev => [...prev, { name: file.name, url: urlData.publicUrl, type: ext.toLowerCase() }]);
      }
    }
    setUploading(false);
  };

  const removeAttachment = (idx: number) => setAttachments(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setMsg({ type: 'error', text: 'Title is required' }); return; }
    setSaving(true);
    setMsg(null);

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const finalSchedule = scheduleTime || now.toISOString().slice(0, 16);

    const payload = {
      title,
      description,
      category,
      show_on_home: showHome,
      show_on_notice_page: showNotice,
      attachments,
      schedule_time: new Date(finalSchedule).toISOString(),
      expiry_time: expiryTime ? new Date(expiryTime).toISOString() : null,
    };

    const { error } = await supabase.from('jr_college_notices').insert([payload]);
    if (error) {
      setMsg({ type: 'error', text: error.message });
    } else {
      cacheLog('INVALIDATED', 'jr_college_notices', 'save action');
      qc.invalidateQueries({ queryKey: qk.jrNotices() });
      qc.invalidateQueries({ queryKey: qk.notices() });

      setMsg({ type: 'success', text: 'Notice published successfully!' });
      setTitle(''); setDescription(''); setAttachments([]); setExpiryTime('');
      const t = new Date();
      t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
      setScheduleTime(t.toISOString().slice(0, 16));
      setTimeout(() => { setShowForm(false); setMsg(null); }, 1500);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      {!showForm ? (
        <button onClick={handleOpen}
          className="flex items-center gap-2 bg-[#123B6D] hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">
          <Plus size={16} /> Add New Notice
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0D1B3E] flex items-center gap-2">
              <Bell size={18} className="text-[#123B6D]" /> Add Jr College Notice
            </h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
              <X size={20} />
            </button>
          </div>

          {msg && (
            <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              <AlertCircle size={16} /> {msg.text}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title <span className="text-red-500">*</span></label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm"
              placeholder="Notice Title" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm resize-none"
              placeholder="Notice Details" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm bg-white">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Schedule & Expiry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Calendar size={14} className="text-[#123B6D]" /> Schedule Time
              </label>
              <input type="datetime-local" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm bg-white text-gray-700" />
              <p className="text-[11px] text-gray-400 mt-1">Set a future date to schedule this notice.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Clock size={14} className="text-orange-500" /> Expiry Date & Time
              </label>
              <input type="datetime-local" value={expiryTime} onChange={e => setExpiryTime(e.target.value)}
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 text-sm bg-white text-gray-700" />
              <p className="text-[11px] text-gray-400 mt-1">After this time the notice moves to Archive.</p>
            </div>
          </div>

          {/* Display destinations */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
            <label className="block text-sm font-bold text-gray-700">Display Destinations</label>
            <div className="flex flex-col sm:flex-row gap-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <button type="button" onClick={() => setShowHome(!showHome)}>
                  {showHome ? <CheckSquare className="text-[#123B6D]" size={20} /> : <Square className="text-gray-400" size={20} />}
                </button>
                <span className="text-sm text-gray-700 font-medium">Jr College Home Page</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <button type="button" onClick={() => setShowNotice(!showNotice)}>
                  {showNotice ? <CheckSquare className="text-[#123B6D]" size={20} /> : <Square className="text-gray-400" size={20} />}
                </button>
                <span className="text-sm text-gray-700 font-medium">Jr College Notice Page</span>
              </label>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Attachments (PDF, Images)</label>
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#123B6D] transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="jr-file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#123B6D] hover:text-blue-800">
                    <span>Upload files</span>
                    <input id="jr-file-upload" type="file" multiple className="sr-only" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>
            {uploading && <p className="text-sm text-blue-600 mt-2 font-medium">Uploading...</p>}
            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                    <span className="text-sm text-gray-700 font-medium truncate flex-1">{file.name}</span>
                    <button type="button" onClick={() => removeAttachment(idx)} className="text-gray-400 hover:text-red-500 ml-2"><X size={16} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)}
              className="px-6 py-3 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="bg-[#123B6D] hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50">
              {saving ? 'Publishing...' : 'Publish Notice'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── Gallery Upload Form ─────────────────────────────────────────────────────

// ─── JR Gallery departments (must match frontend tabs) ──────────────────────
const JR_GALLERY_DEPARTMENTS = [
  'Hindi',
  'Mathematics',
  'Marathi',
  'Commerce',
  'French',
  'Viksit Bharat Buildathon',
  'Tarang',
];

function GalleryUploadForm() {
  const qc = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [showStudentsCorner, setShowStudentsCorner] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setMsg(null);
    for (const file of Array.from(files)) {
      const path = `jr-gallery/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const { data, error } = await supabase.storage.from('event-images').upload(path, file);
      if (error) {
        setMsg({ type: 'error', text: `Image upload failed: ${error.message}` });
      } else if (data) {
        const { data: urlData } = supabase.storage.from('event-images').getPublicUrl(path);
        setImages(prev => [...prev, urlData.publicUrl]);
      }
    }
    setUploading(false);
  };

  const removeImage = (idx: number) => setImages(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !eventDate || !department) { setMsg({ type: 'error', text: 'Title, Department, and Date are required' }); return; }
    setSaving(true);
    setMsg(null);

    const payload = {
      title, description, full_description: fullDescription,
      category, department, event_date: eventDate,
      show_in_students_corner: showStudentsCorner, images,
    };

    const { error } = await supabase.from('jr_college_events').insert([payload]);
    if (error) {
      setMsg({ type: 'error', text: error.message });
    } else {
      cacheLog('INVALIDATED', 'jr_college_events', 'save action');
      qc.invalidateQueries({ queryKey: qk.jrGallery() });

      setMsg({ type: 'success', text: 'Gallery event published successfully!' });
      setTitle(''); setDescription(''); setFullDescription(''); setImages([]);
      setCategory(''); setDepartment(''); setEventDate('');
      setTimeout(() => { setShowForm(false); setMsg(null); }, 1500);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      {!showForm ? (
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#123B6D] hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">
          <Plus size={16} /> Add New Gallery Event
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0D1B3E] flex items-center gap-2">
              <ImageIcon size={18} className="text-[#123B6D]" /> Add Gallery Event
            </h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
              <X size={20} />
            </button>
          </div>

          {msg && (
            <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              <AlertCircle size={16} /> {msg.text}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Title <span className="text-red-500">*</span></label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm"
              placeholder="Event Title" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <input type="text" value={category} onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm"
                placeholder="e.g. Workshop" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department <span className="text-red-500">*</span></label>
              <div className="relative">
                <select value={department} onChange={e => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm bg-white appearance-none" required>
                  <option value="">Select department...</option>
                  {JR_GALLERY_DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date <span className="text-red-500">*</span></label>
              <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm bg-white text-gray-700" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Short Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm resize-none"
              placeholder="Brief summary for cards" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Description</label>
            <textarea value={fullDescription} onChange={e => setFullDescription(e.target.value)} rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm resize-none"
              placeholder="Detailed description for modal" />
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <button type="button" onClick={() => setShowStudentsCorner(!showStudentsCorner)}>
                {showStudentsCorner ? <CheckSquare className="text-[#123B6D]" size={20} /> : <Square className="text-gray-400" size={20} />}
              </button>
              <span className="text-sm text-gray-700 font-bold">Also show in Students Corner Event Gallery</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Images</label>
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#123B6D] transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="jr-image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#123B6D] hover:text-blue-800">
                    <span>Upload images</span>
                    <input id="jr-image-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
              </div>
            </div>
            {uploading && <p className="text-sm text-blue-600 mt-2 font-medium">Uploading images...</p>}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((url, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video">
                    <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)}
              className="px-6 py-3 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="bg-[#123B6D] hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50">
              {saving ? 'Saving Event...' : 'Publish Gallery Event'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── Root Component ─────────────────────────────────────────────────────────

export default function JrCollegeManager() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const activeTab = tabParam === 'jr-college-notices' ? 'notices' : 
                    tabParam === 'jr-college-gallery' ? 'gallery' : 'home';

  const setActiveTab = (tab: 'home' | 'notices' | 'gallery') => {
    if (tab === 'home') {
      router.push('/superadmin?tab=jr-college');
    } else {
      router.push(`/superadmin?tab=jr-college-${tab}`);
    }
  };

  if (activeTab === 'home') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-[#0D1B3E] tracking-tight">Jr College Management</h1>
            <p className="text-gray-500 mt-1">Manage notices and gallery events for the Junior College.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
          {/* Notices Box */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#123B6D]/30 hover:shadow-md transition-all group flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3FF] flex items-center justify-center text-[#123B6D]">
                <Bell size={24} />
              </div>
            </div>
            <div className="flex-1 mt-2">
              <h3 className="font-bold text-[#123B6D] text-lg leading-snug mb-1">Notice Board</h3>
              <p className="text-sm text-gray-500">Manage announcements, circulars and timetables for junior college students.</p>
            </div>
            <button onClick={() => setActiveTab('notices')}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-[#F0F5FF] hover:bg-[#123B6D] text-[#123B6D] hover:text-white px-4 py-3 rounded-xl text-sm font-bold transition-all">
              <Edit2 size={16} /> Manage Notices
            </button>
          </div>

          {/* Gallery Box */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#123B6D]/30 hover:shadow-md transition-all group flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <ImageIcon size={24} />
              </div>
            </div>
            <div className="flex-1 mt-2">
              <h3 className="font-bold text-[#123B6D] text-lg leading-snug mb-1">Event Gallery</h3>
              <p className="text-sm text-gray-500">Manage departmental events, photos, and news happening across the junior college.</p>
            </div>
            <button onClick={() => setActiveTab('gallery')}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white px-4 py-3 rounded-xl text-sm font-bold transition-all">
              <Edit2 size={16} /> Manage Gallery
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#0D1B3E] tracking-tight">
            {activeTab === 'notices' ? 'Jr College Notice Board' : 'Jr College Event Gallery'}
          </h1>
          <p className="text-gray-500 mt-1">
            {activeTab === 'notices' ? 'Manage announcements, circulars and timetables' : 'Manage departmental events, photos, and news'}
          </p>
        </div>
        <button onClick={() => setActiveTab('home')}
          className="flex items-center justify-center gap-2 text-[#123B6D] bg-[#F0F5FF] hover:bg-[#123B6D] hover:text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all w-fit">
          &larr; Back to Jr College
        </button>
      </div>

      {activeTab === 'notices' && (
        <div className="space-y-6">
          <NoticeUploadForm />
          <NoticeListSection />
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <GalleryUploadForm />
          <GalleryListSection />
        </div>
      )}
    </div>
  );
}
