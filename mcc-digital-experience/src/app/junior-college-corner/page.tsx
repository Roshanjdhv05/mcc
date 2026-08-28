'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  BookOpen, Bell, Calendar, ArrowRight, Palette, RefreshCw,
  Clock, ImageIcon, X, ChevronLeft, ChevronRight
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ── Department config (tab order, labels, colors) ─────────────────────────────
interface DeptConfig {
  id: string;   // matches department value stored in DB
  label: string;
  color: string;
}

const DEPT_CONFIG: DeptConfig[] = [
  { id: 'Hindi',                    label: 'Hindi',                    color: '#e63946' },
  { id: 'Mathematics',              label: 'Mathematics',              color: '#2563eb' },
  { id: 'Marathi',                  label: 'Marathi',                  color: '#f97316' },
  { id: 'Commerce',                 label: 'Commerce',                 color: '#059669' },
  { id: 'French',                   label: 'French',                   color: '#7c3aed' },
  { id: 'Viksit Bharat Buildathon', label: 'Viksit Bharat Buildathon', color: '#0891b2' },
  { id: 'Tarang',                   label: 'Tarang',                   color: '#db2777' },
];

// ── Types ─────────────────────────────────────────────────────────────────────
interface JrGalleryEvent {
  id: string;
  title: string;
  description: string;
  full_description: string | null;
  category: string | null;
  department: string;
  event_date: string;
  images: string[];
}

interface JrNotice {
  id: string;
  title: string;
  description: string;
  category: string;
  schedule_time: string;
  expiry_time: string | null;
  attachments: { name: string; url: string; type: string }[];
  created_at: string;
}

// ── Event Detail Popup ────────────────────────────────────────────────────────
function EventDetailPopup({
  event, deptColor, onClose,
}: {
  event: JrGalleryEvent;
  deptColor: string;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const prev = () => setCurrent(c => (c - 1 + event.images.length) % event.images.length);
  const next = () => setCurrent(c => (c + 1) % event.images.length);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col md:flex-row"
        style={{ animation: 'popIn 0.22s ease' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors shadow-sm"
        >
          <X size={18} />
        </button>

        {/* LEFT — image panel */}
        <div className="md:w-[58%] bg-gray-950 flex flex-col overflow-hidden p-3 min-h-[260px] md:min-h-0">
          {event.images.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-600">
              <ImageIcon size={40} className="opacity-30" />
            </div>
          ) : (
            <div className="flex flex-col gap-2 flex-1 h-full">
              {/* Main image with nav arrows */}
              <div className="rounded-2xl overflow-hidden relative flex-1 min-h-[200px] max-h-[400px]">
                <img
                  src={event.images[current]}
                  alt={event.title}
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ maxHeight: 400 }}
                />
                {event.images.length > 1 && (
                  <>
                    <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors">
                      <ChevronRight size={18} />
                    </button>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {current + 1} / {event.images.length}
                    </span>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {event.images.length > 1 && (
                <div className="grid grid-cols-5 gap-1.5 flex-shrink-0">
                  {event.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`rounded-xl overflow-hidden transition-all border-2 ${i === current ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'}`}
                      style={{ aspectRatio: '1' }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT — details */}
        <div className="md:w-[42%] p-7 overflow-y-auto flex flex-col gap-5">
          <div className="flex flex-wrap gap-2 pt-2">
            <span
              className="px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide"
              style={{ background: deptColor }}
            >
              {event.department} Department
            </span>
            {event.category && (
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wide border border-gray-200">
                {event.category}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-black text-[#0D1B3E] leading-tight">{event.title}</h2>
          {event.event_date && (
            <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
              <Calendar size={16} className="text-[#123B6D]" />
              {new Date(event.event_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>
          )}
          <p className="text-gray-600 text-sm leading-relaxed">
            {event.full_description || event.description}
          </p>
          {event.images.length > 0 && (
            <p className="text-xs text-gray-400 font-medium mt-auto">
              {event.images.length} photo{event.images.length > 1 ? 's' : ''} in this event
            </p>
          )}
        </div>
      </div>
      <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }`}</style>
    </div>
  );
}

// ── Departmental Gallery Component ────────────────────────────────────────────
function DeptGallery() {
  const [activeDeptId, setActiveDeptId] = useState(DEPT_CONFIG[0].id);
  const [allEvents, setAllEvents] = useState<JrGalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<JrGalleryEvent | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('jr_college_events')
        .select('id,title,description,full_description,category,department,event_date,images')
        .order('event_date', { ascending: false });
      if (data) setAllEvents(data as JrGalleryEvent[]);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const dept = DEPT_CONFIG.find(d => d.id === activeDeptId) || DEPT_CONFIG[0];
  const deptEvents = allEvents.filter(e => e.department === activeDeptId);

  // Compute which tabs have events for badge hints
  const deptEventCounts: Record<string, number> = {};
  allEvents.forEach(e => {
    deptEventCounts[e.department] = (deptEventCounts[e.department] || 0) + 1;
  });

  return (
    <div>
      {selectedEvent && (
        <EventDetailPopup
          event={selectedEvent}
          deptColor={dept.color}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Department Tab Bar */}
      <div className="relative mb-6">
        <div className="overflow-x-auto no-scrollbar pb-1">
          <div className="flex gap-2 min-w-max">
            {DEPT_CONFIG.map(d => (
              <button
                key={d.id}
                onClick={() => setActiveDeptId(d.id)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 border"
                style={{
                  background: activeDeptId === d.id ? d.color : 'white',
                  color: activeDeptId === d.id ? 'white' : '#374151',
                  borderColor: activeDeptId === d.id ? d.color : '#E5E7EB',
                  boxShadow: activeDeptId === d.id ? `0 2px 10px ${d.color}40` : 'none',
                }}
              >
                {d.label}
                {deptEventCounts[d.id] > 0 && (
                  <span
                    className="ml-1.5 text-[10px] font-black px-1.5 py-0.5 rounded-full"
                    style={{
                      background: activeDeptId === d.id ? 'rgba(255,255,255,0.25)' : `${d.color}15`,
                      color: activeDeptId === d.id ? 'white' : d.color,
                    }}
                  >
                    {deptEventCounts[d.id]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f8f9fa] to-transparent pointer-events-none" />
      </div>

      {/* Department header strip */}
      <div
        className="rounded-2xl px-6 py-4 mb-5 flex items-center gap-3"
        style={{ background: `${dept.color}12`, borderLeft: `4px solid ${dept.color}` }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: dept.color }} />
        <span className="font-black text-base tracking-wide" style={{ color: dept.color }}>
          {dept.label} Department
        </span>
        {!loading && (
          <span className="ml-auto text-xs font-bold text-gray-400">
            {deptEvents.length} event{deptEvents.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Content area */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <RefreshCw size={22} className="animate-spin mr-2" /> Loading events...
        </div>
      ) : deptEvents.length === 0 ? (
        <div className="py-20 text-center text-gray-300">
          <ImageIcon size={48} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium text-gray-400">No events published for this department yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {deptEvents.map(ev => {
            const cover = ev.images?.[0];
            return (
              <button
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-xl transition-all text-left w-full flex flex-col"
              >
                {/* Cover */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {cover ? (
                    <img
                      src={cover}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                      <ImageIcon size={32} />
                    </div>
                  )}
                  {ev.images?.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      +{ev.images.length - 1} photos
                    </span>
                  )}
                  {/* Color-tinted hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: `${dept.color}99` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                      <Palette size={22} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full self-start text-white"
                    style={{ background: dept.color }}
                  >
                    {dept.label}
                  </span>
                  <h3 className="font-bold text-[#1E293B] text-sm leading-snug line-clamp-2">{ev.title}</h3>
                  <p className="text-[11px] text-gray-400 line-clamp-2 mt-auto leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

import JrCollegeNav from '@/components/layout/JrCollegeNav';

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function JuniorCollegeCornerPage() {
  const [notices, setNotices] = useState<JrNotice[]>([]);
  const [noticesLoading, setNoticesLoading] = useState(true);

  // Fetch active notices
  useEffect(() => {
    const fetchNotices = async () => {
      setNoticesLoading(true);
      const now = new Date().toISOString();
      
      // Fetch legacy jr college notices
      const { data: jrData } = await supabase
        .from('jr_college_notices')
        .select('id,title,description,category,schedule_time,expiry_time,attachments,created_at')
        .lte('schedule_time', now)
        .or(`expiry_time.is.null,expiry_time.gt.${now}`)
        .eq('show_on_home', true)
        .order('schedule_time', { ascending: false })
        .limit(6);
        
      // Fetch global notices
      const { data: globalData } = await supabase
        .from('notices')
        .select('*')
        .eq('is_calendar_only', false)
        .lte('schedule_time', now)
        .or(`expiry_time.is.null,expiry_time.gt.${now}`)
        .order('schedule_time', { ascending: false });

      let combined: any[] = [];
      if (jrData) combined = [...jrData];
      
      if (globalData) {
        const globalJrNotices = globalData.filter(n =>
          n.courses?.includes('jr-college') || 
          n.courses?.includes('junior_college') ||
          n.departments?.includes('junior_college')
        ).map(n => ({
          id: n.id,
          title: n.title,
          description: n.description,
          category: n.categories?.[0] || 'General',
          schedule_time: n.schedule_time,
          expiry_time: n.expiry_time,
          attachments: n.attachments,
          created_at: n.created_at
        }));
        combined = [...combined, ...globalJrNotices];
      }
      
      combined.sort((a, b) => new Date(b.schedule_time).getTime() - new Date(a.schedule_time).getTime());
      setNotices(combined.slice(0, 6));
      setNoticesLoading(false);
    };
    fetchNotices();
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12 font-sans">
      <JrCollegeNav />

      {/* Hero */}
      <div className="relative py-12 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute left-8 lg:left-16 top-12 grid grid-cols-3 gap-2 opacity-60">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#014d4e]/40" />)}
        </div>
        <div className="absolute right-8 lg:right-16 top-12 grid grid-cols-3 gap-2 opacity-60">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#014d4e]/40" />)}
        </div>
        <p className="text-[#008e59] font-bold tracking-[0.2em] text-sm uppercase mb-3 relative inline-block">Welcome To</p>
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-[#123B6D] tracking-tight mb-4">JUNIOR COLLEGE CORNER</h1>
        <p className="text-gray-600 text-sm lg:text-base max-w-2xl px-4">
          Stay updated with all Junior College announcements, exam schedules, admission details, and academic notices in one dedicated space.
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">

        {/* Left: About */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-[#E2E8F0]">
            <h2 className="text-2xl lg:text-3xl font-black text-[#123B6D] mb-6 flex items-center gap-3">
              <BookOpen size={28} className="text-[#3B82F6]" /> About Junior College
            </h2>
            <div className="space-y-4 text-gray-600 text-sm lg:text-base leading-relaxed text-justify">
              <p>The Junior College of Parle Tilak Vidyalaya Association's Mulund College of Commerce is one of the well-known institutions for Higher Secondary Education (Std. XI &amp; XII) in Mumbai. Established in 1976, the Junior College has built a strong reputation for academic excellence, discipline and holistic student development.</p>
              <p><strong className="text-[#123B6D]">Junior college of MCC is A+ accredited by SQAAF (school quality assessment and assurance framework)</strong></p>
              <p>The Junior College offers education in the Commerce stream under the Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE). Experienced and dedicated teachers guide students through their academic journey while encouraging critical thinking, leadership and ethical values.</p>
              <p>Beyond academics, students are encouraged to participate in cultural events, sports, social welfare activities, competitions, and various committees that help to develop confidence, teamwork, and leadership skills.</p>
              <p>With its emphasis on quality education, strict discipline, and all-round growth, the Junior College of Mulund College of Commerce continues to prepare students for professional and higher education and successful careers while nurturing responsible and socially aware citizens.</p>
            </div>
          </div>
        </div>

        {/* Right: Notices */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#123B6D] rounded-t-2xl rounded-b-sm p-5 flex items-center gap-3 text-white shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
            <Bell size={24} className="text-[#D4A017]" />
            <h2 className="font-bold text-lg tracking-wide">LATEST NOTICES</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50 flex-1">
            {noticesLoading ? (
              <div className="flex items-center justify-center py-12 text-gray-400">
                <RefreshCw size={20} className="animate-spin mr-2" /> Loading...
              </div>
            ) : notices.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <Bell size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No notices at this time.</p>
              </div>
            ) : (
              notices.map((n) => {
                const isNew = (Date.now() - new Date(n.schedule_time).getTime()) < 3 * 86400000;
                const isExpiringSoon = n.expiry_time
                  ? (new Date(n.expiry_time).getTime() - Date.now()) < 3 * 86400000
                  : false;
                return (
                  <div key={n.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#D4A017] shrink-0 group-hover:scale-125 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {isNew && <span className="text-[10px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full shrink-0 animate-pulse">NEW</span>}
                        {isExpiringSoon && (
                          <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-0.5">
                            <Clock size={9} /> Expiring soon
                          </span>
                        )}
                        <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{n.category}</span>
                      </div>
                      <p className="text-sm font-bold text-[#1E293B] group-hover:text-[#123B6D] transition-colors leading-snug">{n.title}</p>
                      {n.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.description}</p>}
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                        <Calendar size={12} />
                        <span>{new Date(n.schedule_time).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <Link href="/jr-college/notice"
            className="flex items-center justify-center gap-2 bg-white border border-[#123B6D]/20 text-[#123B6D] rounded-xl py-3 text-sm font-bold hover:bg-[#123B6D] hover:text-white transition-all shadow-sm">
            View All Notices <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Vice Principal's Desk */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 pb-12">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-[#E2E8F0]">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
            <div className="w-48 h-48 lg:w-64 lg:h-64 shrink-0 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              <img src="/Jr. teaching staff/Mr. Milind W. Patil.jpg" alt="Vice Principal (Junior College)" className="w-full h-full object-cover object-top"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/e2e8f0/64748b?text=VP'; }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-[#D4A017] rounded-full"></div>
                <h2 className="text-2xl lg:text-3xl font-black text-[#123B6D]">Vice Principal's Desk</h2>
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-1">Mr. Milind W. Patil</h3>
              <p className="text-[#3B82F6] font-semibold mb-6">Vice Principal, Junior College</p>
              <div className="relative">
                <span className="absolute -left-4 -top-4 text-4xl text-gray-200 font-serif">"</span>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed italic relative z-10 text-justify">
                  "Education is not just about imparting knowledge; it is about building character and fostering values that create responsible global citizens. At the Junior College of Mulund College of Commerce, we strive to provide an environment that encourages intellectual curiosity, personal growth, and a strong sense of community. Our dedicated faculty ensures that every student receives the guidance they need to succeed academically and in their future endeavors."
                </p>
              </div>
              <div className="mt-6">
                <Link href="/vice-principal-junior"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#123B6D] text-white rounded-full text-sm font-bold hover:bg-[#123B6D]/90 transition-colors shadow-sm">
                  Read Full Message <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DEPARTMENTAL ACTIVITIES GALLERY ── */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl lg:text-3xl font-black text-[#123B6D]">Departmental Activities</h2>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-[#E2E8F0] to-transparent"></div>
        </div>
        <DeptGallery />
      </div>

    </div>
  );
}
