'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Download, Bell, ChevronRight, X, Globe, Clock, Calendar, FileText, Image as ImageIcon, FileIcon, RefreshCw, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { NOTICE_CATEGORIES, DEPARTMENTS } from '@/lib/noticeTypes';
import type { Notice } from '@/lib/noticeTypes';

const CATEGORY_COLORS: Record<string, string> = {
  Admissions:     'bg-blue-100 text-blue-700',
  Examinations:   'bg-purple-100 text-purple-700',
  Examination:    'bg-purple-100 text-purple-700',
  Academics:      'bg-indigo-100 text-indigo-700',
  Scholarships:   'bg-green-100 text-green-700',
  Events:         'bg-amber-100 text-amber-700',
  Sports:         'bg-orange-100 text-orange-700',
  Cultural:       'bg-pink-100 text-pink-700',
  Placement:      'bg-teal-100 text-teal-700',
  Library:        'bg-cyan-100 text-cyan-700',
  Administration: 'bg-gray-100 text-gray-700',
};

function AttachmentLink({ name, url, type }: { name: string; url: string; type: string }) {
  const icon =
    type === 'pdf' ? <FileText size={13} /> :
    ['png', 'jpg', 'jpeg'].includes(type) ? <ImageIcon size={13} /> :
    <FileIcon size={13} />;
  return (
    <a href={url} target="_blank" rel="noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#123B6D]/10 text-slate-600 hover:text-[#123B6D] rounded-full text-xs font-medium transition-colors">
      {icon} <span className="max-w-[140px] truncate">{name}</span>
    </a>
  );
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  
  // Filter Modal/Slide-over
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Temp filter states for the slide-over
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [tempCourses, setTempCourses] = useState<string[]>([]);

  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchNotices = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    const now = new Date().toISOString();

    // Fetch regular notices
    const { data: regularNotices } = await supabase
      .from('notices')
      .select('*')
      .eq('is_calendar_only', false)
      .lte('schedule_time', now)
      .or(`expiry_time.is.null,expiry_time.gt.${now}`)
      .order('schedule_time', { ascending: false });

    // Fetch examination documents cross-published to the notice board
    const { data: examDocs } = await supabase
      .from('examination_documents')
      .select('*')
      .eq('publish_to_notice_board', true)
      .lte('schedule_time', now)
      .or(`notice_expiry_time.is.null,notice_expiry_time.gt.${now}`)
      .order('schedule_time', { ascending: false });

    // Map examination docs into notice shape
    const examNotices: Notice[] = (examDocs || []).map((doc: any) => ({
      id: `exam-${doc.id}`,
      title: doc.title,
      description: `Category: ${doc.category}. This document is part of the Examination Hub.`,
      categories: ['Examination'],
      courses: doc.courses,
      departments: [],
      semesters: [],
      is_general: doc.courses.length > 10,
      schedule_time: doc.schedule_time,
      expiry_time: doc.notice_expiry_time,
      attachments: [{ name: doc.title, url: doc.file_url, type: 'pdf' }],
      is_calendar_only: false,
    }));

    const combined = [...(regularNotices as Notice[] || []), ...examNotices]
      .sort((a, b) => new Date(b.schedule_time).getTime() - new Date(a.schedule_time).getTime());

    setNotices(combined);
    if (isRefresh) setRefreshing(false);
    else setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotices();
    const channel = supabase
      .channel('public:notices')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notices' },
        () => { fetchNotices(); }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchNotices]);

  // Open filter panel
  const openFilter = () => {
    setTempCategories([...selectedCategories]);
    setTempCourses([...selectedCourses]);
    setIsFilterOpen(true);
  };

  // Apply filters from slide-over
  const applyFilters = () => {
    setSelectedCategories([...tempCategories]);
    setSelectedCourses([...tempCourses]);
    setIsFilterOpen(false);
  };

  // Clear temp filters in slide-over
  const clearFilters = () => {
    setTempCategories([]);
    setTempCourses([]);
  };

  // Filter Logic
  const filtered = notices.filter(n => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.description?.toLowerCase().includes(search.toLowerCase());
    
    // Category match: if no categories selected, match all. Else, must include at least one selected category.
    const matchCat = selectedCategories.length === 0 || n.categories.some(c => selectedCategories.includes(c));
    
    // Course match: if no courses selected, match all. Else, must include at least one selected course, OR be a general notice.
    const matchCourse = selectedCourses.length === 0 || n.courses.some(c => selectedCourses.includes(c)) || n.is_general;
    
    return matchSearch && matchCat && matchCourse;
  });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    return d > 0 ? `${d} day${d > 1 ? 's' : ''} ago` : h > 0 ? `${h}h ago` : 'Just now';
  };

  const activeFilterCount = selectedCategories.length + selectedCourses.length;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-[#123B6D] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex items-center gap-3 mb-2">
            <Bell size={28} className="text-[#D4A017]" />
            <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)]">Notice Board</h1>
          </div>
          <p className="text-white/70">Stay updated with latest circulars, notices, and announcements</p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 -mt-8">
        
        {/* Actions Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-4 mb-6 flex flex-wrap sm:flex-nowrap gap-3">
          {/* Search Bar */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <Search size={18} className="text-[#94A3B8] flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search notices, circulars..."
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
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${activeFilterCount > 0 ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'}`}
            >
              <Filter size={16} /> 
              Filter
              {activeFilterCount > 0 && (
                <span className="bg-[#123B6D] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold ml-1">
                  {activeFilterCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => fetchNotices(true)}
              disabled={refreshing}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#123B6D] text-white text-sm font-semibold hover:bg-[#0f2f5a] transition-colors disabled:opacity-60"
            >
              <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="w-10 h-10 border-4 border-[#123B6D]/20 border-t-[#123B6D] rounded-full animate-spin mb-4" />
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
              const primaryCat = n.categories[0] || 'Administration';
              const colorClass = CATEGORY_COLORS[primaryCat] || 'bg-gray-100 text-gray-700';

              return (
                <div
                  key={n.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all p-6"
                >
                  {/* Tags row */}
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {n.is_general && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#123B6D] text-white">
                          <Globe size={9} /> General
                        </span>
                      )}
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
                  <h3 className="font-bold text-[#1E293B] font-[var(--font-heading)] mb-2 leading-snug">{n.title}</h3>

                  {/* Description */}
                  {n.description && (
                    <p className={`text-sm text-[#64748B] leading-relaxed mb-3 ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {n.description}
                    </p>
                  )}

                  {/* Courses */}
                  {n.courses.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {n.courses.map(c => {
                        const label = c === 'jr-general' || c === 'ug-general' || c === 'pg-general' ? 'General' : c.toUpperCase().replace('-', '');
                        return (
                          <span key={c} className="text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">{label}</span>
                        );
                      })}
                    </div>
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
                        className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#123B6D] transition-colors"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'} <ChevronRight size={14} className={isExpanded ? 'rotate-90' : ''} />
                      </button>
                    )}
                    {n.attachments.length > 0 && (
                      <a
                         href={n.attachments[0].url}
                         target="_blank"
                         rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] hover:gap-2.5 transition-all"
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
              <h2 className="text-xl font-bold text-[#1E293B]">Filters</h2>
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
                <h3 className="font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
                  <Filter size={16} className="text-[#123B6D]" /> By Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {NOTICE_CATEGORIES.map(cat => {
                    const isSelected = tempCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          if (isSelected) setTempCategories(tempCategories.filter(c => c !== cat));
                          else setTempCategories([...tempCategories, cat]);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${isSelected ? 'bg-[#123B6D] border-[#123B6D] text-white' : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'}`}
                      >
                        {isSelected && <Check size={12} />}
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Course Filter */}
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
                  <Globe size={16} className="text-[#123B6D]" /> By Programme
                </h3>
                <div className="space-y-6">
                  {DEPARTMENTS.map(dept => (
                    <div key={dept.id}>
                      <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">{dept.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {dept.courses.map(course => {
                          const isSelected = tempCourses.includes(course.id);
                          return (
                            <button
                              key={course.id}
                              onClick={() => {
                                if (isSelected) setTempCourses([]);
                                else setTempCourses([course.id]);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${isSelected ? 'bg-amber-500 border-amber-600 text-white' : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'}`}
                            >
                              {isSelected && <Check size={12} />}
                              {course.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
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
                className="flex-[2] py-3 rounded-xl bg-[#123B6D] text-white font-semibold shadow-md hover:bg-[#0f2f5a] transition-colors"
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
