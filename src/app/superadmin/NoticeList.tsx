'use client';
import React, { useState, useEffect } from 'react';
import {
  Bell, Calendar, Archive, RefreshCw, ExternalLink, Trash2, Globe,
  Filter, ChevronDown, Search, Clock, Loader2, FileText, Image, FileIcon
} from 'lucide-react';
import { Notice, NOTICE_CATEGORIES, DEPARTMENTS } from '@/lib/noticeTypes';
import { supabase } from '@/lib/supabase';

function AttachmentBadge({ type, name, url }: { type: string; name: string; url: string }) {
  const icon =
    type === 'pdf' ? <FileText size={12} /> :
    ['png', 'jpg', 'jpeg'].includes(type) ? <Image size={12} /> :
    <FileIcon size={12} />;
  return (
    <a href={url} target="_blank" rel="noreferrer"
      className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-medium transition-colors">
      {icon}
      <span className="max-w-[120px] truncate">{name}</span>
      <ExternalLink size={10} className="text-slate-400" />
    </a>
  );
}

function NoticeCard({ notice, onDelete }: { notice: Notice; onDelete: (id: string) => void }) {
  const isArchived = notice.expiry_time ? new Date(notice.expiry_time) < new Date() : false;
  const isScheduled = new Date(notice.schedule_time) > new Date();

  return (
    <div className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow ${isArchived ? 'border-gray-200 opacity-70' : 'border-[#E2E8F0]'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {notice.is_general && (
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#123B6D] text-white px-2 py-0.5 rounded-full">
                <Globe size={9} /> General
              </span>
            )}
            {isArchived && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Archived</span>
            )}
            {isScheduled && !isArchived && (
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                <Clock size={9} /> Scheduled
              </span>
            )}
            {notice.categories.map(c => (
              <span key={c} className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{c}</span>
            ))}
          </div>
          <h3 className="font-bold text-[#1E293B] text-sm leading-snug mb-1">{notice.title}</h3>
          {notice.description && (
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{notice.description}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-3 text-[11px] text-gray-500">
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
          {notice.courses.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {notice.courses.map(c => {
                const label = c === 'jr-general' || c === 'ug-general' || c === 'pg-general' ? 'General' : c.toUpperCase().replace('-', '');
                return (
                  <span key={c} className="text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">{label}</span>
                );
              })}
            </div>
          )}
          {notice.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {notice.attachments.map((a, i) => <AttachmentBadge key={i} {...a} />)}
            </div>
          )}
        </div>
        <button
          onClick={() => notice.id && onDelete(notice.id)}
          className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default function NoticeList() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'active' | 'scheduled' | 'archive'>('active');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchNotices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('schedule_time', { ascending: false });
    if (!error && data) setNotices(data as Notice[]);
    setLoading(false);
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    await supabase.from('notices').delete().eq('id', id);
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const now = new Date();
  const filtered = notices.filter(n => {
    const scheduled = new Date(n.schedule_time);
    const expired = n.expiry_time ? new Date(n.expiry_time) < now : false;
    const isActive = scheduled <= now && !expired;
    const isSched = scheduled > now;
    const isArch = expired;

    if (view === 'active' && !isActive) return false;
    if (view === 'scheduled' && !isSched) return false;
    if (view === 'archive' && !isArch) return false;
    if (search && !n.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory && !n.categories.includes(filterCategory)) return false;
    if (filterDept && !n.departments.includes(filterDept)) return false;
    if (filterMonth) {
      const d = new Date(n.schedule_time);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (ym !== filterMonth) return false;
    }
    return true;
  });

  const counts = {
    active: notices.filter(n => {
      const s = new Date(n.schedule_time) <= now;
      const e = n.expiry_time ? new Date(n.expiry_time) >= now : true;
      return s && e;
    }).length,
    scheduled: notices.filter(n => new Date(n.schedule_time) > now).length,
    archive: notices.filter(n => n.expiry_time ? new Date(n.expiry_time) < now : false).length,
  };

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {([
          { key: 'active', label: 'Active', icon: <Bell size={14} />, count: counts.active },
          { key: 'scheduled', label: 'Scheduled', icon: <Clock size={14} />, count: counts.scheduled },
          { key: 'archive', label: 'Archive', icon: <Archive size={14} />, count: counts.archive },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setView(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              view === t.key ? 'bg-[#123B6D] text-white shadow-sm' : 'bg-white border border-[#E2E8F0] text-gray-600 hover:border-[#123B6D]/30'
            }`}
          >
            {t.icon}
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${view === t.key ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
              {t.count}
            </span>
          </button>
        ))}

        <button
          onClick={fetchNotices}
          className="ml-auto flex items-center gap-1.5 text-gray-500 hover:text-[#123B6D] text-sm font-medium"
        >
          <RefreshCw size={14} /> Refresh
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5 text-gray-500 hover:text-[#123B6D] text-sm font-medium"
        >
          <Filter size={14} /> Filter <ChevronDown size={12} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Search + Filters */}
      <div className="mb-5 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search notices..."
            className="w-full pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
          />
        </div>
        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-[#E2E8F0]">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Category</label>
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">All</option>
                {NOTICE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Department</label>
              <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">All</option>
                {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Month</label>
              <input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
          </div>
        )}
      </div>

      {/* Notice List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 size={28} className="animate-spin mr-2" /> Loading notices...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-16 flex flex-col items-center text-center">
          <Bell size={36} className="text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No notices found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or create a new notice.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(n => <NoticeCard key={n.id} notice={n} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  );
}
