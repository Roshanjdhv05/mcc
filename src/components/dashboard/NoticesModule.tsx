'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, Bell, Filter, Loader2, FileText, Image as ImageIcon, FileIcon, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { NOTICE_CATEGORIES } from '@/lib/noticeTypes';
import type { Notice } from '@/lib/noticeTypes';

// Map dashboard course codes → DB course IDs
const COURSE_CODE_MAP: Record<string, string> = {
  // Junior College
  '11th':      'jr-college',
  '12th':      'jr-college',
  // UG
  'bcom':      'BCOM',
  'BCom':      'BCOM',
  'B.Com':     'BCOM',
  'BBA':       'BCOM.BA',
  'BMS':       'BCOM.MS',
  'BCA':       'BSC.CA',
  'BSc IT':    'BSC.IT',
  'BSc CS':    'BSC.CS',
  'DS':        'BSC.DS',
  'BAF':       'BCOM.AF',
  'BFM':       'BCOM.FM',
  'BBI':       'BCOM.BI',
  'BAMMC':     'BAMMC',
  // PG
  'MCom':      'MCOM.AA',
  'M.Com':     'MCOM.AA',
  'MSc IT':    'MSC.IT',
  'MSc Finance':'MSC.FIN',
};

function normaliseCourseCode(code: string): string {
  // Direct map lookup first
  if (COURSE_CODE_MAP[code]) return COURSE_CODE_MAP[code];
  // Try case-insensitive lowercase
  const lower = code.toLowerCase().replace(/[\s.]/g, '');
  const found = Object.entries(COURSE_CODE_MAP).find(
    ([k]) => k.toLowerCase().replace(/[\s.]/g, '') === lower
  );
  return found ? found[1] : code.toLowerCase();
}

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

const CATEGORY_COLORS: Record<string, string> = {
  Admissions:     'bg-blue-100 text-blue-700',
  Examinations:   'bg-purple-100 text-purple-700',
  Academics:      'bg-indigo-100 text-indigo-700',
  Scholarships:   'bg-green-100 text-green-700',
  Events:         'bg-amber-100 text-amber-700',
  Sports:         'bg-orange-100 text-orange-700',
  Cultural:       'bg-pink-100 text-pink-700',
  Placement:      'bg-teal-100 text-teal-700',
  Library:        'bg-cyan-100 text-cyan-700',
  Administration: 'bg-gray-100 text-gray-700',
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  return d > 0 ? `${d} day${d > 1 ? 's' : ''} ago` : h > 0 ? `${h}h ago` : 'Just now';
}

export default function NoticesModule({ courseCode }: { courseCode: string }) {
  const router = useRouter();
  const [notices,       setNotices]       = useState<Notice[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [refreshing,    setRefreshing]    = useState(false);
  const [activeFilter,  setActiveFilter]  = useState('All');
  const [searchQuery,   setSearchQuery]   = useState('');

  const dbCourseId = normaliseCourseCode(courseCode);

  const fetchNotices = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    const now = new Date().toISOString();
    const { data } = await supabase
      .from('notices')
      .select('*')
      .lte('schedule_time', now)
      .or(`expiry_time.is.null,expiry_time.gt.${now}`)
      .order('schedule_time', { ascending: false });
    if (data) {
      const filtered = (data as Notice[]).filter(n =>
        n.is_general || (n.courses && n.courses.includes(dbCourseId))
      );
      setNotices(filtered);
    }
    if (isRefresh) setRefreshing(false);
    else setLoading(false);
  }, [dbCourseId]);

  useEffect(() => {
    fetchNotices();

    // Real-time subscription
    const channel = supabase
      .channel(`notices-dashboard-${dbCourseId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notices' }, () => {
        fetchNotices();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchNotices, dbCourseId]);

  const displayed = notices.filter(n => {
    const matchFilter = activeFilter === 'All' || n.categories.includes(activeFilter);
    const matchSearch = !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">

      {/* Search + Filter bar */}
      <div className="p-4 bg-white border-b border-[#E2E8F0] space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search notices…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#123B6D]/50 focus:bg-white transition-colors"
          />
        </div>
        <button
          onClick={() => fetchNotices(true)}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#123B6D] text-white text-xs font-semibold hover:bg-[#0f2f5a] transition-colors disabled:opacity-60"
        >
          <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">{refreshing ? '...' : 'Refresh'}</span>
        </button>
      </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          <Filter size={13} className="text-[#94A3B8] flex-shrink-0" />
          {['All', ...NOTICE_CATEGORIES].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === f
                  ? 'bg-[#123B6D] text-white shadow-sm'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Notices list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#94A3B8]">
            <Loader2 size={32} className="animate-spin mb-3 opacity-40" />
            <p className="text-sm">Loading notices…</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#94A3B8]">
            <Bell size={40} className="mb-4 opacity-20" />
            <p className="font-medium text-sm">No notices for {courseCode}</p>
            <p className="text-xs mt-1">Check back later for updates</p>
          </div>
        ) : (
          <AnimatePresence>
            {displayed.map((notice, i) => (
              <motion.div
                key={notice.id}
                onClick={() => {
                  if (notice.categories?.includes('Examinations')) {
                    router.push('/examination#timetables');
                  } else {
                    router.push('/notices');
                  }
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Top row: categories + time */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className="text-[10px] text-[#94A3B8]">{timeAgo(notice.schedule_time)}</span>
                  {notice.categories.map(cat => (
                    <span key={cat}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[cat] ?? 'bg-gray-100 text-gray-600'}`}>
                      {cat}
                    </span>
                  ))}
                  {notice.is_general && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                      General
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-[#1E293B] text-sm leading-snug mb-1">
                  {notice.title}
                </h3>

                {/* Description */}
                {notice.description && (
                  <p className="text-xs text-[#64748B] leading-relaxed mb-2">
                    {notice.description}
                  </p>
                )}

                {/* Attachments */}
                {notice.attachments && notice.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-[#F1F5F9]">
                    {notice.attachments.map((att, idx) => (
                      <AttachmentLink key={idx} name={att.name} url={att.url} type={att.type} />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
