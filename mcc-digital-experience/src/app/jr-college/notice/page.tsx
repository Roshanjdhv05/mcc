'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search, Filter, Download, Bell, ChevronRight, X,
  Clock, Calendar, FileText, Image as ImageIcon, FileIcon, RefreshCw, Check
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Notice } from '@/lib/noticeTypes';
import JrCollegeNav from '@/components/layout/JrCollegeNav';

// Jr. College specific categories only
const JR_CATEGORIES = ['Sports', 'Examinations', 'Cultural', 'Special Days'] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Examinations: 'bg-purple-100 text-purple-700',
  Sports:       'bg-orange-100 text-orange-700',
  Cultural:     'bg-pink-100 text-pink-700',
  'Special Days': 'bg-amber-100 text-amber-700',
};

function AttachmentLink({ name, url, type }: { name: string; url: string; type: string }) {
  const icon =
    type === 'pdf' ? <FileText size={13} /> :
    ['png', 'jpg', 'jpeg'].includes(type) ? <ImageIcon size={13} /> :
    <FileIcon size={13} />;
  return (
    <a href={url} target="_blank" rel="noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#014d4e]/10 text-slate-600 hover:text-[#014d4e] rounded-full text-xs font-medium transition-colors">
      {icon} <span className="max-w-[140px] truncate">{name}</span>
    </a>
  );
}

export default function JrCollegeNoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Fetch only Jr. College notices
  const fetchNotices = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    const now = new Date().toISOString();

    // Fetch notices that include 'jr-college' in their courses, OR are general
    const { data } = await supabase
      .from('notices')
      .select('*')
      .eq('is_calendar_only', false)
      .lte('schedule_time', now)
      .or(`expiry_time.is.null,expiry_time.gt.${now}`)
      .order('schedule_time', { ascending: false });

    // Fetch dedicated jr college notices
    const { data: jrNoticesData } = await supabase
      .from('jr_college_notices')
      .select('*')
      .eq('show_on_notice_page', true)
      .lte('schedule_time', now)
      .or(`expiry_time.is.null,expiry_time.gt.${now}`)
      .order('schedule_time', { ascending: false });

    let combined: Notice[] = [];

    if (data) {
      // Filter client-side: keep only notices explicitly tagged for jr-college
      const generalJrNotices = (data as Notice[]).filter(n =>
        n.courses.includes('jr-college')
      );
      combined = [...combined, ...generalJrNotices];
    }

    if (jrNoticesData) {
      const mappedJrNotices: Notice[] = jrNoticesData.map((doc: any) => ({
        id: `jr-${doc.id}`,
        title: doc.title,
        description: doc.description,
        categories: [doc.category],
        courses: ['jr-college'],
        departments: [],
        semesters: [],
        is_general: false,
        schedule_time: doc.schedule_time,
        expiry_time: doc.expiry_time,
        attachments: doc.attachments || [],
        is_calendar_only: false,
      }));
      combined = [...combined, ...mappedJrNotices];
    }

    combined.sort((a, b) => new Date(b.schedule_time).getTime() - new Date(a.schedule_time).getTime());
    setNotices(combined);

    if (isRefresh) setRefreshing(false);
    else setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotices();
    const channel = supabase
      .channel('public:jr-notices')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notices' }, () => fetchNotices())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jr_college_notices' }, () => fetchNotices())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchNotices]);

  const openFilter = () => {
    setTempCategories([...selectedCategories]);
    setIsFilterOpen(true);
  };

  const applyFilters = () => {
    setSelectedCategories([...tempCategories]);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setTempCategories([]);
  };

  // Filter logic
  const filtered = notices.filter(n => {
    const matchSearch = !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategories.length === 0 ||
      n.categories.some(c => selectedCategories.includes(c));
    return matchSearch && matchCat;
  });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    return d > 0 ? `${d} day${d > 1 ? 's' : ''} ago` : h > 0 ? `${h}h ago` : 'Just now';
  };

  const activeFilterCount = selectedCategories.length;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <JrCollegeNav />

      {/* Header */}
      <div className="bg-[#014d4e] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex items-center gap-3 mb-2">
            <Bell size={28} className="text-[#90ee90]" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Junior College Notice Board</h1>
          </div>
          <p className="text-white/70">Notices, circulars and announcements for Junior College students</p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 -mt-8">

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-4 mb-6 flex flex-wrap sm:flex-nowrap gap-3">
          {/* Search */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <Search size={18} className="text-[#94A3B8] flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Jr. College notices..."
              className="bg-transparent flex-1 text-sm outline-none text-[#1E293B] placeholder-[#94A3B8]"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={openFilter}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                activeFilterCount > 0
                  ? 'bg-[#014d4e]/10 border-[#014d4e]/30 text-[#014d4e]'
                  : 'bg-white border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              <Filter size={16} />
              Filter
              {activeFilterCount > 0 && (
                <span className="bg-[#014d4e] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold ml-1">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <button
              onClick={() => fetchNotices(true)}
              disabled={refreshing}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#014d4e] text-white text-sm font-semibold hover:bg-[#013636] transition-colors disabled:opacity-60"
            >
              <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Active category filter chips */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategories.map(cat => (
              <span
                key={cat}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#014d4e] text-white"
              >
                {cat}
                <button onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}>
                  <X size={12} />
                </button>
              </span>
            ))}
            <button
              onClick={() => setSelectedCategories([])}
              className="px-3 py-1 rounded-full text-xs font-medium text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="w-10 h-10 border-4 border-[#014d4e]/20 border-t-[#014d4e] rounded-full animate-spin mb-4" />
            <p className="text-sm">Loading notices...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-16 flex flex-col items-center text-center">
            <Bell size={40} className="text-gray-200 mb-4" />
            <h3 className="font-bold text-gray-600 text-lg mb-1">No Notices Found</h3>
            <p className="text-sm text-gray-400">
              {search ? `No results for "${search}"` : 'Check back later for new announcements.'}
            </p>
          </div>
        )}

        {/* Notices Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
            {filtered.map((n) => {
              const isExpanded = expanded === n.id;
              const primaryCat = n.categories[0] || 'Examinations';
              const colorClass = CATEGORY_COLORS[primaryCat] || 'bg-gray-100 text-gray-700';

              return (
                <div
                  key={n.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all p-6"
                >
                  {/* Tags row */}
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {n.categories.slice(0, 2).map(cat => (
                        <span key={cat} className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${CATEGORY_COLORS[cat] || 'bg-gray-100 text-gray-700'}`}>
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                      <Calendar size={11} />
                      {formatDate(n.schedule_time)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-[#1E293B] mb-2 leading-snug">{n.title}</h3>

                  {/* Description */}
                  {n.description && (
                    <p className={`text-sm text-[#64748B] leading-relaxed mb-3 ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {n.description}
                    </p>
                  )}

                  {/* Expiry */}
                  {n.expiry_time && (
                    <div className="flex items-center gap-1 text-xs text-orange-500 mb-3">
                      <Clock size={11} />
                      Expires: {formatDate(n.expiry_time)}
                    </div>
                  )}

                  {/* Attachments */}
                  {n.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {n.attachments.map((a, i) => (
                        <AttachmentLink key={i} {...a} />
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs text-gray-400 mr-auto">{timeAgo(n.schedule_time)}</span>
                    {n.description && n.description.length > 100 && (
                      <button
                        onClick={() => setExpanded(isExpanded ? null : (n.id ?? null))}
                        className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#014d4e] transition-colors"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'} <ChevronRight size={14} className={isExpanded ? 'rotate-90' : ''} />
                      </button>
                    )}
                    {n.attachments.length > 0 && (
                      <a
                        href={n.attachments[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-[#014d4e] hover:gap-2.5 transition-all"
                      >
                        <Download size={14} /> Download
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Slide-over Filter Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0]">
              <h2 className="text-xl font-bold text-[#1E293B]">Filter Notices</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-24">
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-[#1E293B] mb-1 flex items-center gap-2">
                  <Filter size={16} className="text-[#014d4e]" /> By Category
                </h3>
                <p className="text-xs text-gray-400 mb-4">Filter Jr. College notices by category</p>
                <div className="flex flex-wrap gap-2">
                  {JR_CATEGORIES.map(cat => {
                    const isSelected = tempCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          if (isSelected) setTempCategories(tempCategories.filter(c => c !== cat));
                          else setTempCategories([...tempCategories, cat]);
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#014d4e] border-[#014d4e] text-white shadow-sm'
                            : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#014d4e]/40 hover:text-[#014d4e]'
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-[#E2E8F0] flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <button
                onClick={clearFilters}
                className="flex-1 py-3 rounded-xl border border-[#E2E8F0] text-[#64748B] font-semibold hover:bg-slate-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={applyFilters}
                className="flex-[2] py-3 rounded-xl bg-[#014d4e] text-white font-semibold shadow-md hover:bg-[#013636] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
