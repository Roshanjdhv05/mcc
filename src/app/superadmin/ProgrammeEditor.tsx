'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Programme } from './ProgrammesManagerV2';
import {
  ArrowLeft, Save, Loader2, CheckCircle, AlertCircle,
  LayoutDashboard, Camera, LayoutGrid, BookOpen, GraduationCap, UserCircle, Trophy, Building2, UploadCloud, Plus, Trash2, ChevronDown, ChevronUp, X, Image, Sparkles
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ProgramOverview {
  department?: string; degree?: string; description?: string;
  long_description?: string; banner_image?: string;
  title?: string; funding_type?: string; festivals?: string;
  publication?: string; course_key?: string; eligibility?: string;
  activities_intros?: { title: string; intro: string }[];
}
interface ProgramSnapshot {
  duration?: string; semesters?: number; timing?: string;
  intake?: number; mode?: string;
}
interface ProgramSubject {
  id?: string; subject_name: string; subject_code?: string;
  credits?: number; is_elective: boolean; subject_type?: string; display_order: number;
}
interface ProgramSemester {
  id?: string; semester_number: number; syllabus_pdf?: string; subjects: ProgramSubject[];
}
interface ProgramFaculty {
  id?: string; sr_no?: number; name: string; designation?: string;
  additional_role?: string; department?: string; education?: string;
  teaching_exp?: string; email?: string; image?: string; display_order: number;
}
interface ProgramAlumni {
  id?: string; name: string; programme_name?: string; year?: string;
  designation?: string; organisation?: string; about?: string;
  linkedin?: string; image?: string; initials?: string; display_order: number;
}
interface ProgramIndustrialVisit {
  id?: string; company_name: string; visit_date?: string;
  description?: string; image?: string; display_order: number;
}
interface ProgrammeEvent {
  id: string; title: string; description: string; category: string;
  department: string; images: string[]; published_at: string;
  programme: string; programme_section: string; publish_programme: boolean;
  status: string;
}

type TabKey = 'overview' | 'snapshot' | 'structure' | 'syllabus' | 'faculty' | 'alumni' | 'visits' | 'festivals' | 'publications' | 'activities';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'overview',    label: 'Overview',            icon: <LayoutDashboard size={15} /> },
  { key: 'snapshot',   label: 'Programme Snapshot',   icon: <Camera size={15} /> },
  { key: 'structure',  label: 'Structure',            icon: <LayoutGrid size={15} /> },
  { key: 'syllabus',   label: 'Syllabus',             icon: <BookOpen size={15} /> },
  { key: 'faculty',    label: 'Faculty',              icon: <UserCircle size={15} /> },
  { key: 'alumni',       label: 'Illustrious Alumni',   icon: <Trophy size={15} /> },
  { key: 'visits',       label: 'Industrial Visits',    icon: <Building2 size={15} /> },
  { key: 'festivals',    label: 'Festivals',            icon: <Image size={15} /> },
  { key: 'publications', label: 'Publications',         icon: <BookOpen size={15} /> },
  { key: 'activities',   label: 'Events & Activities',  icon: <Sparkles size={15} /> },
];

interface Props { programme: Programme; isNew: boolean; onClose: () => void; }

// ─── Helper UI ────────────────────────────────────────────────────────────────
function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={`block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider ${className || ''}`}>{children}</label>;
}
function Input({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] transition-all" />
  );
}
function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] transition-all resize-none" />
  );
}
function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] transition-all">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

// ─── Image Upload Component ───────────────────────────────────────────────────
function ImageUpload({
  label, value, onChange, folder = 'uploads', shape = 'rectangle'
}: { label: string; value: string; onChange: (url: string) => void; folder?: string; shape?: 'square' | 'rectangle' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);

    try {
      const ext = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('programme-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (upErr) throw upErr;

      const { data } = supabase.storage.from('programme-images').getPublicUrl(fileName);
      onChange(data.publicUrl);
    } catch (err: any) {
      setError(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">{label}</label>
      <div className="flex flex-col gap-2">
        {value && (
          <div className={`relative overflow-hidden border border-gray-200 bg-gray-50 ${shape === 'square' ? 'w-24 h-24 rounded-lg' : 'w-full h-28 rounded-xl'}`}>
            <img src={value} alt="preview" className="w-full h-full object-cover" />
            <button
              onClick={() => onChange('')}
              className="absolute top-1.5 right-1.5 bg-white/90 text-gray-600 hover:text-red-500 rounded-full p-1 shadow transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Paste URL or upload below"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] transition-all"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 bg-[#123B6D] text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-[#0f2f5a] transition-colors disabled:opacity-60 shrink-0"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>
    </div>
  );
}

// ─── Main Editor ──────────────────────────────────────────────────────────────
export default function ProgrammeEditor({ programme, isNew, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [saveMsg, setSaveMsg] = useState('');

  // Core fields
  const [name, setName] = useState(programme.name || '');
  const [slug, setSlug] = useState(programme.slug || '');
  const [code, setCode] = useState(programme.code || '');
  const [category, setCategory] = useState(programme.category || 'UG');
  const [status, setStatus] = useState(programme.status || 'Active');
  const [displayOrder, setDisplayOrder] = useState(String(programme.display_order ?? 0));

  // Overview
  const [overview, setOverview] = useState<ProgramOverview>({});
  // Snapshot
  const [snapshot, setSnapshot] = useState<ProgramSnapshot>({});
  // Curriculum
  const [semesters, setSemesters] = useState<ProgramSemester[]>([]);
  const [expandedSem, setExpandedSem] = useState<number | null>(null);
  // Faculty
  const [faculty, setFaculty] = useState<ProgramFaculty[]>([]);
  // Alumni
  const [alumni, setAlumni] = useState<ProgramAlumni[]>([]);
  // Industrial Visits
  const [visits, setVisits] = useState<ProgramIndustrialVisit[]>([]);
  // Events
  const [events, setEvents] = useState<ProgrammeEvent[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<ProgrammeEvent>>({ title: '', description: '', category: 'Festivals', images: [] });
  const [savingEvent, setSavingEvent] = useState(false);
  const [festivalIntro, setFestivalIntro] = useState('');
  const [festivalIntroId, setFestivalIntroId] = useState('');
  const [publicationIntro, setPublicationIntro] = useState('');
  const [publicationIntroId, setPublicationIntroId] = useState('');
  const [activitiesIntros, setActivitiesIntros] = useState<{title: string, intro: string}[]>([]);

  // ─── Load existing data ──────────────────────────────────────────────────
  useEffect(() => {
    if (isNew || !programme.id) return;
    const pid = programme.id;

    const load = async () => {
      const [
        { data: ov }, { data: sn },
        { data: sm }, { data: fc },
        { data: al }, { data: iv },
        { data: evData }
      ] = await Promise.all([
        supabase.from('program_overview').select('*').eq('programme_id', pid).single(),
        supabase.from('program_snapshot').select('*').eq('programme_id', pid).single(),
        supabase.from('program_semesters').select('*, program_subjects(*)').eq('programme_id', pid).order('semester_number'),
        supabase.from('program_faculty').select('*').eq('programme_id', pid).order('display_order'),
        supabase.from('program_alumni').select('*').eq('programme_id', pid).order('display_order'),
        supabase.from('program_industrial_visits').select('*').eq('programme_id', pid).order('display_order'),
        supabase.from('events').select('*').eq('publish_programme', true).eq('status', 'published').order('published_at', { ascending: false }),
      ]);
      if (ov) {
        setOverview({ department: ov.department || '', degree: ov.degree || '', description: ov.description || '', long_description: ov.long_description || '', banner_image: ov.banner_image || '', title: ov.title || '', funding_type: ov.funding_type || '', festivals: ov.festivals || '', publication: ov.publication || '', course_key: ov.course_key || '', eligibility: ov.eligibility || '', activities_intros: ov.activities_intros || [] });
        if (ov.activities_intros) setActivitiesIntros(ov.activities_intros);
      }
      if (sn) setSnapshot({ duration: sn.duration || '', semesters: sn.semesters || 6, timing: sn.timing || '', intake: sn.intake || 0, mode: sn.mode || 'Full Time' });
      if (sm) setSemesters(sm.map((s: any) => ({ ...s, subjects: (s.program_subjects || []).sort((a: any, b: any) => a.display_order - b.display_order) })));
      if (fc) setFaculty(fc);
      if (al) setAlumni(al);
      if (iv) setVisits(iv);
      if (evData) {
        // Filter events for this programme
        const adminCode = programme.code || programme.slug.toUpperCase();
        const filtered = evData.filter((ev: any) => ev.programme && ev.programme.includes(adminCode));
        const fIntro = filtered.find((e: any) => e.category === 'Festivals' && e.title === 'Festival Intro');
        if (fIntro) { setFestivalIntro(fIntro.description); setFestivalIntroId(fIntro.id); }
        const pIntro = filtered.find((e: any) => e.category === 'Publication' && e.title === 'Publication Intro');
        if (pIntro) { setPublicationIntro(pIntro.description); setPublicationIntroId(pIntro.id); }
        setEvents(filtered.filter((e: any) =>
          !(e.category === 'Festivals' && e.title === 'Festival Intro') &&
          !(e.category === 'Publication' && e.title === 'Publication Intro') &&
          !(e.category === 'Events & Activities' && e.title === 'Activities Intro') // legacy filter
        ));
      }
    };
    load();
  }, [programme.id, isNew]);

  // ─── Save ────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');
    try {
      let pid = programme.id;

      // 1. Upsert core programme
      if (isNew) {
        const { data, error } = await supabase.from('mcc_programmes').insert([{
          slug, name, code, category, status, display_order: Number(displayOrder)
        }]).select('id').single();
        if (error) throw error;
        pid = data.id;
      } else {
        const { error } = await supabase.from('mcc_programmes').update({
          slug, name, code, category, status, display_order: Number(displayOrder)
        }).eq('id', pid);
        if (error) throw error;
      }

      // 2. Upsert overview
      await supabase.from('program_overview').upsert({ programme_id: pid, ...overview, activities_intros: activitiesIntros }, { onConflict: 'programme_id' });

      // 3. Upsert snapshot
      await supabase.from('program_snapshot').upsert({ programme_id: pid, ...snapshot }, { onConflict: 'programme_id' });

      // 4. Curriculum – delete + re-insert semesters and subjects
      await supabase.from('program_semesters').delete().eq('programme_id', pid);
      for (const sem of semesters) {
        const { data: semRow, error: semErr } = await supabase.from('program_semesters').insert({
          programme_id: pid, semester_number: sem.semester_number, syllabus_pdf: sem.syllabus_pdf || null
        }).select('id').single();
        if (semErr) throw semErr;
        if (sem.subjects.length > 0) {
          await supabase.from('program_subjects').insert(
            sem.subjects.map((s, i) => ({
              semester_id: semRow.id, subject_name: s.subject_name, subject_code: (s as any).subject_code || null,
              credits: s.credits || null, is_elective: s.is_elective, subject_type: (s as any).subject_type || null, display_order: i
            }))
          );
        }
      }

      // 5. Faculty – delete + re-insert
      await supabase.from('program_faculty').delete().eq('programme_id', pid);
      if (faculty.length > 0) {
        await supabase.from('program_faculty').insert(faculty.map((f, i) => {
          const { id, programme_id, ...rest } = f as any;
          return { ...rest, programme_id: pid, display_order: i };
        }));
      }

      // 6. Alumni – delete + re-insert
      await supabase.from('program_alumni').delete().eq('programme_id', pid);
      if (alumni.length > 0) {
        await supabase.from('program_alumni').insert(alumni.map((a, i) => {
          const { id, programme_id, ...rest } = a as any;
          return { ...rest, programme_id: pid, display_order: i };
        }));
      }

      // 7. Industrial Visits – delete + re-insert
      await supabase.from('program_industrial_visits').delete().eq('programme_id', pid);
      if (visits.length > 0) {
        await supabase.from('program_industrial_visits').insert(visits.map((v, i) => {
          const { id, programme_id, ...rest } = v as any;
          return { ...rest, programme_id: pid, display_order: i };
        }));
      }

      // 8. Festival Intro
      if (festivalIntro) {
        const sectionLabel = getSectionLabel('Festivals');
        const introData = {
          title: `Festival Intro`, description: festivalIntro, category: 'Festivals',
          department: sectionLabel, images: [], programme: adminCode, programme_section: sectionLabel,
          publish_programme: true, status: 'published', published_at: new Date().toISOString()
        };
        if (festivalIntroId) {
          await supabase.from('events').update(introData).eq('id', festivalIntroId);
        } else {
          const { data: newIntro } = await supabase.from('events').insert([introData]).select('id').single();
          if (newIntro) setFestivalIntroId(newIntro.id);
        }
      }

      // 9. Publication Intro
      if (publicationIntro) {
        const sectionLabel = getSectionLabel('Publication');
        const introData = {
          title: `Publication Intro`, description: publicationIntro, category: 'Publication',
          department: sectionLabel, images: [], programme: adminCode, programme_section: sectionLabel,
          publish_programme: true, status: 'published', published_at: new Date().toISOString()
        };
        if (publicationIntroId) {
          await supabase.from('events').update(introData).eq('id', publicationIntroId);
        } else {
          const { data: newIntro } = await supabase.from('events').insert([introData]).select('id').single();
          if (newIntro) setPublicationIntroId(newIntro.id);
        }
      }

      // 10. Activities Intro (legacy cleanup, skipped save)

      setSaveStatus('success');
      setSaveMsg('All changes saved successfully!');
      if (isNew) setTimeout(onClose, 1500);
    } catch (e: any) {
      setSaveStatus('error');
      setSaveMsg(e.message || 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  // ─── Curriculum helpers ──────────────────────────────────────────────────
  const addSemester = () => setSemesters(prev => [...prev, { semester_number: prev.length + 1, subjects: [] }]);
  const removeSemester = (i: number) => setSemesters(prev => prev.filter((_, idx) => idx !== i));
  const addSubject = (semIdx: number) => setSemesters(prev => {
    const copy = [...prev];
    copy[semIdx] = { ...copy[semIdx], subjects: [...copy[semIdx].subjects, { subject_name: '', credits: 3, is_elective: false, display_order: copy[semIdx].subjects.length }] };
    return copy;
  });
  const removeSubject = (semIdx: number, subIdx: number) => setSemesters(prev => {
    const copy = [...prev];
    copy[semIdx] = { ...copy[semIdx], subjects: copy[semIdx].subjects.filter((_, i) => i !== subIdx) };
    return copy;
  });
  const updateSubject = (semIdx: number, subIdx: number, field: string, value: any) => setSemesters(prev => {
    const copy = [...prev]; const subCopy = [...copy[semIdx].subjects];
    subCopy[subIdx] = { ...subCopy[subIdx], [field]: value };
    copy[semIdx] = { ...copy[semIdx], subjects: subCopy }; return copy;
  });

  // ─── Faculty helpers ─────────────────────────────────────────────────────
  const addFaculty = () => setFaculty(prev => [...prev, { name: '', designation: '', additional_role: '', department: '', education: '', teaching_exp: '', email: '', image: '', display_order: prev.length }]);
  const removeFaculty = (i: number) => setFaculty(prev => prev.filter((_, idx) => idx !== i));
  const updateFaculty = (i: number, field: keyof ProgramFaculty, val: string) => setFaculty(prev => { const c = [...prev]; c[i] = { ...c[i], [field]: val }; return c; });

  // ─── Alumni helpers ──────────────────────────────────────────────────────
  const addAlumni = () => setAlumni(prev => [...prev, { name: '', programme_name: '', year: '', designation: '', organisation: '', about: '', linkedin: '', image: '', initials: '', display_order: prev.length }]);
  const removeAlumni = (i: number) => setAlumni(prev => prev.filter((_, idx) => idx !== i));
  const updateAlumni = (i: number, field: keyof ProgramAlumni, val: string) => setAlumni(prev => { const c = [...prev]; c[i] = { ...c[i], [field]: val }; return c; });

  // ─── Industrial Visit helpers ─────────────────────────────────────────────
  const addVisit = () => setVisits(prev => [...prev, { company_name: '', visit_date: '', description: '', image: '', display_order: prev.length }]);
  const removeVisit = (i: number) => setVisits(prev => prev.filter((_, idx) => idx !== i));
  const updateVisit = (i: number, field: keyof ProgramIndustrialVisit, val: string) => setVisits(prev => { const c = [...prev]; c[i] = { ...c[i], [field]: val }; return c; });

  // ─── Activities Intros helpers ─────────────────────────────────────────────
  const addActivitiesIntro = () => setActivitiesIntros(prev => [...prev, { title: '', intro: '' }]);
  const removeActivitiesIntro = (i: number) => setActivitiesIntros(prev => prev.filter((_, idx) => idx !== i));
  const updateActivitiesIntro = (i: number, field: 'title' | 'intro', val: string) => setActivitiesIntros(prev => { const c = [...prev]; c[i] = { ...c[i], [field]: val }; return c; });

  // ─── Events helpers ───────────────────────────────────────────────────────
  const adminCode = programme.code || programme.slug.toUpperCase();

  const festivalSections: Record<string, string> = {
    'BAF': 'Manthan', 'BBI': 'Manthan + Shodh', 'BFM': 'Manthan',
    'BMS': 'Inspira', 'BSC-CS': 'Hack-A-Thon', 'BSC-IT': 'Hack-A-Thon',
    'BSC-DS': 'Hack-A-Thon', 'BSC-CA': 'Hack-A-Thon', 'BCA': 'Hack-A-Thon',
    'B.COM': 'Festivals', 'BCOM': 'Festivals', 'BBA': 'Festivals', 'BAMMC': 'Festivals',
  };
  const publicationSections: Record<string, string> = {
    'BAF': 'Pratibimb', 'BBI': 'Pratibimb', 'BFM': 'Finanza',
    'BMS': 'Inspira', 'BSC-CS': 'Tech Anugraha', 'BSC-IT': 'Tech Anugraha',
    'BSC-DS': 'Tech Anugraha', 'BSC-CA': 'Tech Anugraha', 'BCA': 'Tech Anugraha',
    'B.COM': 'Publication', 'BCOM': 'Publication', 'BBA': 'Publication', 'BAMMC': 'Shutter Speed',
  };

  const getSectionLabel = (cat: string) => {
    const code = adminCode?.toUpperCase();
    if (cat === 'Festivals') return festivalSections[code] || 'Festivals';
    if (cat === 'Publication') return publicationSections[code] || 'Publication';
    return cat;
  };

  const handleSaveEvent = async () => {
    if (!newEvent.title || !newEvent.description) return;
    setSavingEvent(true);
    try {
      const sectionLabel = getSectionLabel(newEvent.category || 'Festivals');
      const { error } = await supabase.from('events').insert([{
        title: newEvent.title,
        description: newEvent.description,
        category: newEvent.category || 'Festivals',
        department: sectionLabel,
        images: newEvent.images || [],
        programme: adminCode,
        programme_section: sectionLabel,
        publish_programme: true,
        publish_home: false,
        publish_gallery: false,
        publish_calendar: false,
        status: 'published',
        published_at: new Date().toISOString(),
      }]);
      if (error) throw error;
      // Refresh events list
      const { data: refreshed } = await supabase.from('events').select('*')
        .eq('publish_programme', true).eq('status', 'published').order('published_at', { ascending: false });
      if (refreshed) {
        const filtered = refreshed.filter((ev: any) => ev.programme && ev.programme.includes(adminCode));
        setEvents(filtered);
      }
      setNewEvent({ title: '', description: '', category: 'Festivals', images: [] });
      setShowEventForm(false);
    } catch (e: any) {
      alert('Failed to save event: ' + e.message);
    } finally {
      setSavingEvent(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Delete this event card?')) return;
    await supabase.from('events').delete().eq('id', id);
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleEventImageUpload = async (file: File) => {
    const ext = file.name.split('.').pop();
    const fileName = `events/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('event-images').upload(fileName, file, { cacheControl: '3600', upsert: false });
    if (error) { alert('Image upload failed: ' + error.message); return; }
    const { data } = supabase.storage.from('event-images').getPublicUrl(fileName);
    setNewEvent(prev => ({ ...prev, images: [...(prev.images || []), data.publicUrl] }));
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-gray-50 min-h-screen">

      {/* ── Top Bar ── */}
      <div className="bg-[#123B6D] text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-xl transition-colors"><ArrowLeft size={18} /></button>
          <div>
            <h2 className="font-bold text-base leading-tight">{isNew ? 'New Programme' : name}</h2>
            <p className="text-white/60 text-xs mt-0.5">{isNew ? 'Create a new programme' : `Editing — ${slug}`}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus === 'success' && <span className="flex items-center gap-1.5 text-green-300 text-sm font-semibold"><CheckCircle size={16} />{saveMsg}</span>}
          {saveStatus === 'error' && <span className="flex items-center gap-1.5 text-red-300 text-sm font-semibold"><AlertCircle size={16} />{saveMsg}</span>}
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-[#D4A017] hover:bg-[#c49010] text-[#0D1B3E] font-bold px-5 py-2.5 rounded-xl transition-all text-sm disabled:opacity-60">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* ── Sidebar Tabs ── */}
        <div className="w-56 bg-white border-r border-gray-200 py-4 flex flex-col gap-1 flex-shrink-0 overflow-y-auto">
          {TABS.map((tab, idx) => (
            <React.Fragment key={tab.key}>
              {idx === 7 && <div className="mx-3 my-1 border-t border-gray-100" />}
              <button onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2.5 mx-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === tab.key
                    ? tab.key === 'festivals'
                      ? 'bg-amber-50 text-amber-700'
                      : tab.key === 'publications'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-[#123B6D]/10 text-[#123B6D]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}>
                {tab.icon} {tab.label}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* ── Main Panel ── */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ═══════════════════════════════════════════ OVERVIEW ═══ */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-3xl">
              <h3 className="font-bold text-[#123B6D] text-lg border-b pb-3">Basic Information & Overview</h3>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                <h4 className="font-bold text-gray-700 text-sm">Core Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Programme Name</Label><Input value={name} onChange={setName} placeholder="e.g. Bachelor of Commerce (B.Com)" /></div>
                  <div><Label>Short Code</Label><Input value={code} onChange={setCode} placeholder="e.g. BCOM" /></div>
                  <div><Label>URL Slug</Label><Input value={slug} onChange={setSlug} placeholder="e.g. bcom" /></div>
                  <div><Label>Display Order</Label><Input value={displayOrder} onChange={setDisplayOrder} type="number" /></div>
                  <div><Label>Category</Label><Select value={category} onChange={(v) => setCategory(v as 'UG' | 'PG' | 'PhD')} options={[{value:'UG',label:'UG'},{value:'PG',label:'PG'},{value:'PhD',label:'PhD'}]} /></div>
                  <div><Label>Status</Label><Select value={status} onChange={(v) => setStatus(v as 'Active' | 'Inactive')} options={[{value:'Active',label:'Active'},{value:'Inactive',label:'Inactive'}]} /></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                <h4 className="font-bold text-gray-700 text-sm">Page Content</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Department</Label><Input value={overview.department || ''} onChange={v => setOverview(p => ({...p, department: v}))} placeholder="e.g. Faculty of Commerce" /></div>
                  <div><Label>Degree Awarded</Label><Input value={overview.degree || ''} onChange={v => setOverview(p => ({...p, degree: v}))} placeholder="e.g. B.Com" /></div>
                  <div><Label>Funding Type</Label><Select value={overview.funding_type || 'Self Financing'} onChange={v => setOverview(p => ({...p, funding_type: v}))} options={[{value:'Aided',label:'Aided'},{value:'Self Financing',label:'Self Financing'},{value:'Autonomous',label:'Autonomous'}]} /></div>
                  <div><Label>Course Key (for syllabus)</Label><Input value={overview.course_key || ''} onChange={v => setOverview(p => ({...p, course_key: v}))} placeholder="e.g. BCOM" /></div>
                  <div>
                    <Label>Festival Tab Name</Label>
                    <Input value={overview.festivals || ''} onChange={v => setOverview(p => ({...p, festivals: v}))} placeholder="e.g. Manthan" />
                    <p className="text-[10px] text-gray-400 mt-1">Default for {programme.code}: <strong>{getSectionLabel('Festivals')}</strong></p>
                  </div>
                  <div>
                    <Label>Publication Tab Name</Label>
                    <Input value={overview.publication || ''} onChange={v => setOverview(p => ({...p, publication: v}))} placeholder="e.g. Pratibimb" />
                    <p className="text-[10px] text-gray-400 mt-1">Default for {programme.code}: <strong>{getSectionLabel('Publication')}</strong></p>
                  </div>
                </div>
                <div><Label>Eligibility Criteria</Label><Textarea value={overview.eligibility || ''} onChange={v => setOverview(p => ({...p, eligibility: v}))} rows={2} placeholder="e.g. HSC passed from Maharashtra Board or equivalent." /></div>
                <div>
                  <Label>Short Introduction (Hero subtitle)</Label>
                  <Textarea value={overview.description || ''} onChange={v => setOverview(p => ({...p, description: v}))} rows={3}
                    placeholder="A comprehensive commerce education providing a strong foundation in accounting, business management..." />
                </div>
                <div>
                  <Label>Full Overview (multiple paragraphs — separate with blank line)</Label>
                  <Textarea value={overview.long_description || ''} onChange={v => setOverview(p => ({...p, long_description: v}))} rows={12}
                    placeholder={"Paragraph 1 about the programme...\n\nParagraph 2 about curriculum...\n\nParagraph 3 about career opportunities..."} />
                </div>
                <ImageUpload label="Banner Image" value={overview.banner_image || ''} onChange={v => setOverview(p => ({...p, banner_image: v}))} folder="banners" />
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════ SNAPSHOT ═══ */}
          {activeTab === 'snapshot' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="font-bold text-[#123B6D] text-lg border-b pb-3">Programme Snapshot</h3>
              <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                <p className="text-sm text-gray-500">These appear as the quick info tiles on the programme page hero section.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Duration</Label><Input value={snapshot.duration || ''} onChange={v => setSnapshot(p => ({...p, duration: v}))} placeholder="e.g. 3 Years" /></div>
                  <div><Label>No. of Semesters</Label><Input value={String(snapshot.semesters || '')} onChange={v => setSnapshot(p => ({...p, semesters: Number(v)}))} type="number" placeholder="6" /></div>
                  <div><Label>Timing</Label><Input value={snapshot.timing || ''} onChange={v => setSnapshot(p => ({...p, timing: v}))} placeholder="e.g. 7:15 AM – 11:40 AM" /></div>
                  <div><Label>Intake Capacity (seats)</Label><Input value={String(snapshot.intake || '')} onChange={v => setSnapshot(p => ({...p, intake: Number(v)}))} type="number" placeholder="120" /></div>
                  <div><Label>Mode</Label><Select value={snapshot.mode || 'Full Time'} onChange={v => setSnapshot(p => ({...p, mode: v}))} options={[{value:'Full Time',label:'Full Time'},{value:'Part Time',label:'Part Time'},{value:'Distance',label:'Distance'}]} /></div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════ STRUCTURE ═══ */}
          {activeTab === 'structure' && (
            <div className="space-y-4 max-w-5xl">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-[#123B6D] text-lg">Programme Structure</h3>
                <button onClick={addSemester} className="flex items-center gap-2 bg-[#123B6D] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#0f2f5a] transition-colors">
                  <Plus size={14} /> Add Semester
                </button>
              </div>
              {semesters.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <GraduationCap size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No semesters yet. Click "Add Semester" to begin.</p>
                </div>
              )}
              {semesters.map((sem, semIdx) => (
                <div key={semIdx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3.5 bg-[#F8FAFC] border-b cursor-pointer" onClick={() => setExpandedSem(expandedSem === semIdx ? null : semIdx)}>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#123B6D] text-white text-xs font-black flex items-center justify-center">{sem.semester_number}</span>
                      <span className="font-bold text-gray-800">Semester {sem.semester_number}</span>
                      <span className="text-xs text-gray-400 font-medium">{sem.subjects.length} subjects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={e => { e.stopPropagation(); removeSemester(semIdx); }} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                      {expandedSem === semIdx ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                    </div>
                  </div>
                  {expandedSem === semIdx && (
                    <div className="p-5">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-[#F8FAFC] text-left text-xs text-gray-500 font-bold uppercase">
                              <th className="px-3 py-2 border border-gray-100 w-8">#</th>
                              <th className="px-3 py-2 border border-gray-100">Subject Name</th>
                              <th className="px-3 py-2 border border-gray-100 w-28">Code</th>
                              <th className="px-3 py-2 border border-gray-100 w-20">Credits</th>
                              <th className="px-3 py-2 border border-gray-100 w-24">Type</th>
                              <th className="px-3 py-2 border border-gray-100 w-20">Elective</th>
                              <th className="px-3 py-2 border border-gray-100 w-12"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {sem.subjects.map((sub, subIdx) => (
                              <tr key={subIdx} className="hover:bg-gray-50">
                                <td className="px-3 py-2 border border-gray-100 text-gray-400 text-xs">{subIdx + 1}</td>
                                <td className="px-3 py-2 border border-gray-100">
                                  <input value={sub.subject_name} onChange={e => updateSubject(semIdx, subIdx, 'subject_name', e.target.value)} placeholder="Subject Name"
                                    className="w-full bg-transparent outline-none text-sm" />
                                </td>
                                <td className="px-3 py-2 border border-gray-100">
                                  <input value={(sub as any).subject_code || ''} onChange={e => updateSubject(semIdx, subIdx, 'subject_code', e.target.value)} placeholder="e.g. FIN101"
                                    className="w-full bg-transparent outline-none text-xs text-gray-500" />
                                </td>
                                <td className="px-3 py-2 border border-gray-100">
                                  <input type="number" value={sub.credits || ''} onChange={e => updateSubject(semIdx, subIdx, 'credits', Number(e.target.value))} placeholder="3"
                                    className="w-full bg-transparent outline-none text-sm text-center" />
                                </td>
                                <td className="px-3 py-2 border border-gray-100">
                                  <input value={(sub as any).subject_type || ''} onChange={e => updateSubject(semIdx, subIdx, 'subject_type', e.target.value)} placeholder="Theory/Practical"
                                    className="w-full bg-transparent outline-none text-xs text-gray-500" />
                                </td>
                                <td className="px-3 py-2 border border-gray-100 text-center">
                                  <input type="checkbox" checked={sub.is_elective} onChange={e => updateSubject(semIdx, subIdx, 'is_elective', e.target.checked)}
                                    className="w-4 h-4 accent-[#123B6D]" />
                                </td>
                                <td className="px-3 py-2 border border-gray-100 text-center">
                                  <button onClick={() => removeSubject(semIdx, subIdx)} className="text-red-400 hover:text-red-600 transition-colors"><X size={14} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <button onClick={() => addSubject(semIdx)} className="mt-3 flex items-center gap-1.5 text-[#123B6D] text-xs font-bold hover:underline">
                        <Plus size={13} /> Add Subject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ═══════════════════════════════════════════ SYLLABUS ═══ */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4 max-w-3xl">
              <div className="border-b pb-3 mb-4">
                <h3 className="font-bold text-[#123B6D] text-lg">Syllabus PDF Links</h3>
                <p className="text-sm text-gray-500">Provide the downloadable PDF link for each semester's syllabus.</p>
              </div>
              {semesters.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <BookOpen size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No semesters added yet. Add semesters in the Structure tab first.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {semesters.map((sem, semIdx) => (
                    <div key={semIdx} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center font-bold text-[#123B6D] shrink-0">
                        {sem.semester_number}
                      </div>
                      <div className="flex-1">
                        <Label className="mb-1 block text-xs text-gray-500">Semester {sem.semester_number} PDF URL</Label>
                        <Input value={sem.syllabus_pdf || ''} onChange={v => setSemesters(prev => { const c = [...prev]; c[semIdx] = {...c[semIdx], syllabus_pdf: v}; return c; })} placeholder="https://mcc.edu/syllabus.pdf" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════ FACULTY ═══ */}
          {activeTab === 'faculty' && (
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-[#123B6D] text-lg">Faculty Members</h3>
                <button onClick={addFaculty} className="flex items-center gap-2 bg-[#123B6D] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#0f2f5a] transition-colors">
                  <Plus size={14} /> Add Faculty
                </button>
              </div>
              {faculty.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <UserCircle size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No faculty added yet.</p>
                </div>
              )}
              {faculty.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-gray-700 text-sm">{f.name || `Faculty ${i + 1}`}</span>
                    <button onClick={() => removeFaculty(i)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Full Name</Label><Input value={f.name} onChange={v => updateFaculty(i, 'name', v)} placeholder="e.g. Dr. Anjali Sharma" /></div>
                    <div><Label>Designation</Label><Input value={f.designation || ''} onChange={v => updateFaculty(i, 'designation', v)} placeholder="e.g. Assistant Professor" /></div>
                    <div><Label>Additional Role</Label><Input value={f.additional_role || ''} onChange={v => updateFaculty(i, 'additional_role', v)} placeholder="e.g. HOD, Coordinator" /></div>
                    <div><Label>Department</Label><Input value={f.department || ''} onChange={v => updateFaculty(i, 'department', v)} placeholder="e.g. Commerce" /></div>
                    <div><Label>Education</Label><Input value={f.education || ''} onChange={v => updateFaculty(i, 'education', v)} placeholder="e.g. M.Com, Ph.D (Finance)" /></div>
                    <div><Label>Teaching Experience</Label><Input value={f.teaching_exp || ''} onChange={v => updateFaculty(i, 'teaching_exp', v)} placeholder="e.g. 12 Years" /></div>
                    <div><Label>Email</Label><Input value={f.email || ''} onChange={v => updateFaculty(i, 'email', v)} placeholder="faculty@mcc.edu.in" type="email" /></div>
                    <div className="col-span-2"><ImageUpload label="Faculty Photo" value={f.image || ''} onChange={v => updateFaculty(i, 'image', v)} folder="faculty" shape="square" /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ═══════════════════════════════════════════ ALUMNI ═══ */}
          {activeTab === 'alumni' && (
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-[#123B6D] text-lg">Illustrious Alumni</h3>
                <button onClick={addAlumni} className="flex items-center gap-2 bg-[#123B6D] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#0f2f5a] transition-colors">
                  <Plus size={14} /> Add Alumni
                </button>
              </div>
              {alumni.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <Trophy size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No alumni added yet.</p>
                </div>
              )}
              {alumni.map((a, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-gray-700 text-sm">{a.name || `Alumni ${i + 1}`}</span>
                    <button onClick={() => removeAlumni(i)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Full Name</Label><Input value={a.name} onChange={v => updateAlumni(i, 'name', v)} placeholder="e.g. Rahul Mehta" /></div>
                    <div><Label>Initials (for avatar)</Label><Input value={a.initials || ''} onChange={v => updateAlumni(i, 'initials', v)} placeholder="e.g. RM" /></div>
                    <div><Label>Programme Name</Label><Input value={a.programme_name || ''} onChange={v => updateAlumni(i, 'programme_name', v)} placeholder="e.g. B.Com (Honours)" /></div>
                    <div><Label>Graduation Year</Label><Input value={a.year || ''} onChange={v => updateAlumni(i, 'year', v)} placeholder="e.g. 2019" /></div>
                    <div><Label>Current Designation</Label><Input value={a.designation || ''} onChange={v => updateAlumni(i, 'designation', v)} placeholder="e.g. Senior Financial Analyst" /></div>
                    <div><Label>Organisation</Label><Input value={a.organisation || ''} onChange={v => updateAlumni(i, 'organisation', v)} placeholder="e.g. Deloitte India" /></div>
                    <div className="col-span-2"><Label>About (brief)</Label><Textarea value={a.about || ''} onChange={v => updateAlumni(i, 'about', v)} rows={2} placeholder="Brief description of their work and achievements..." /></div>
                    <div><Label>LinkedIn URL</Label><Input value={a.linkedin || ''} onChange={v => updateAlumni(i, 'linkedin', v)} placeholder="https://linkedin.com/in/..." /></div>
                    <div><ImageUpload label="Alumni Photo" value={a.image || ''} onChange={v => updateAlumni(i, 'image', v)} folder="alumni" /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ═══════════════════════════════════════════ INDUSTRIAL VISITS ═══ */}
          {activeTab === 'visits' && (
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-[#123B6D] text-lg">Industrial Visits</h3>
                <button onClick={addVisit} className="flex items-center gap-2 bg-[#123B6D] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#0f2f5a] transition-colors">
                  <Plus size={14} /> Add Visit
                </button>
              </div>
              {visits.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <Building2 size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No industrial visits added yet.</p>
                </div>
              )}
              {visits.map((v, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-gray-700 text-sm">{v.company_name || `Visit ${i + 1}`}</span>
                    <button onClick={() => removeVisit(i)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Company / Location</Label><Input value={v.company_name} onChange={val => updateVisit(i, 'company_name', val)} placeholder="e.g. Bombay Stock Exchange" /></div>
                    <div><Label>Visit Date</Label><Input value={v.visit_date || ''} onChange={val => updateVisit(i, 'visit_date', val)} placeholder="e.g. March 2024" /></div>
                    <div className="col-span-2"><Label>Description</Label><Textarea value={v.description || ''} onChange={val => updateVisit(i, 'description', val)} rows={2} placeholder="Brief description of the visit and student learnings..." /></div>
                    <div className="col-span-2"><ImageUpload label="Visit Photo" value={v.image || ''} onChange={val => updateVisit(i, 'image', val)} folder="visits" /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ═════════════ FESTIVALS & PUBLICATIONS & ACTIVITIES ═════════════ */}
          {(activeTab === 'festivals' || activeTab === 'publications' || activeTab === 'activities') && (
            <div className="space-y-6 max-w-4xl">
              
              {/* Intro Section */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-[#123B6D] text-lg border-b pb-3">
                  {activeTab === 'festivals' ? 'Festival Introduction' : activeTab === 'publications' ? 'Publication Introduction' : 'Events & Activities Introduction Blocks'}
                </h3>
                <p className="text-sm text-gray-500">
                  Provide an introduction for this section. It will appear at the top of the {activeTab === 'festivals' ? getSectionLabel('Festivals') : activeTab === 'publications' ? getSectionLabel('Publication') : 'Events & Activities'} tab.
                </p>
                
                {activeTab !== 'activities' ? (
                  <Textarea 
                    value={activeTab === 'festivals' ? festivalIntro : publicationIntro} 
                    onChange={activeTab === 'festivals' ? setFestivalIntro : setPublicationIntro} 
                    rows={4} 
                    placeholder={activeTab === 'festivals' ? "e.g. Manthan is the flagship annual festival..." : "e.g. Pratibimb is the annual magazine..."} 
                  />
                ) : (
                  <div className="space-y-4">
                    {activitiesIntros.map((intro, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3 relative">
                        <button onClick={() => removeActivitiesIntro(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                        <div>
                          <Label>Title</Label>
                          <Input value={intro.title} onChange={val => updateActivitiesIntro(i, 'title', val)} placeholder="e.g. Overview" />
                        </div>
                        <div>
                          <Label>Introduction Text</Label>
                          <Textarea value={intro.intro} onChange={val => updateActivitiesIntro(i, 'intro', val)} rows={3} placeholder="Intro text..." />
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={addActivitiesIntro} className="flex items-center gap-2 text-sm text-[#3B82F6] font-bold hover:underline">
                      <Plus size={16} /> Add Introduction Block
                    </button>
                  </div>
                )}
              </div>

              {/* Event Cards Section */}
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-[#123B6D] text-lg">{activeTab === 'festivals' ? 'Festival Events & Highlights' : activeTab === 'publications' ? 'Publications & Articles' : 'Events & Activities'}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Section: <span className="font-semibold text-[#123B6D]">{activeTab === 'festivals' ? getSectionLabel('Festivals') : activeTab === 'publications' ? getSectionLabel('Publication') : 'Events & Activities'}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setNewEvent(p => ({ ...p, category: activeTab === 'festivals' ? 'Festivals' : activeTab === 'publications' ? 'Publication' : 'Events & Activities' }));
                    setShowEventForm(true);
                  }}
                  className="flex items-center gap-2 bg-[#123B6D] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#0f2f5a] transition-colors"
                >
                  <Plus size={14} /> Add {activeTab === 'festivals' ? 'Event' : activeTab === 'publications' ? 'Publication' : 'Activity'}
                </button>
              </div>

              {/* New Event Form */}
              {showEventForm && (
                <div className="bg-white rounded-2xl border-2 border-[#123B6D]/20 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-800 text-sm">New {activeTab === 'festivals' ? 'Event' : activeTab === 'publications' ? 'Publication' : 'Activity'} Card</h4>
                    <button onClick={() => setShowEventForm(false)} className="text-gray-400 hover:text-gray-700"><X size={16} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2"><Label>Title</Label><Input value={newEvent.title || ''} onChange={v => setNewEvent(p => ({ ...p, title: v }))} placeholder="Title" /></div>
                    <div>
                      <Label>Section / Category</Label>
                      <select
                        value={newEvent.category || (activeTab === 'festivals' ? 'Festivals' : activeTab === 'publications' ? 'Publication' : 'Events & Activities')}
                        onChange={e => setNewEvent(p => ({ ...p, category: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] transition-all"
                      >
                        <option value="Festivals">Festivals — {getSectionLabel('Festivals')}</option>
                        <option value="Publication">Publication — {getSectionLabel('Publication')}</option>
                        <option value="Events & Activities">Events &amp; Activities</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Sports">Sports</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="NSS">NSS</option>
                      </select>
                    </div>
                    <div className="col-span-2"><Label>Description</Label><Textarea value={newEvent.description || ''} onChange={v => setNewEvent(p => ({ ...p, description: v }))} rows={3} placeholder="Describe the item..." /></div>
                  </div>
                  {/* Multi Image Upload */}
                  <div>
                    <Label>Images (Up to 5)</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(newEvent.images || []).map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                          <img src={img} alt={`img-${idx}`} className="w-full h-full object-cover" />
                          <button
                            onClick={() => setNewEvent(p => ({ ...p, images: (p.images || []).filter((_, i) => i !== idx) }))}
                            className="absolute top-0.5 right-0.5 bg-black/50 text-white rounded-full p-0.5 hover:bg-red-500 transition-colors"
                          ><X size={10} /></button>
                        </div>
                      ))}
                      {(newEvent.images || []).length < 5 && (
                        <label className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#123B6D] hover:bg-[#123B6D]/5 transition-colors">
                          <UploadCloud size={16} className="text-gray-400" />
                          <span className="text-[10px] text-gray-400 mt-1">Add</span>
                          <input type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleEventImageUpload(e.target.files[0]); }} />
                        </label>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{(newEvent.images || []).length}/5 images added</p>
                  </div>
                  <div className="flex justify-end gap-3 pt-2 border-t">
                    <button onClick={() => setShowEventForm(false)} className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-4 py-2">Cancel</button>
                    <button
                      onClick={handleSaveEvent}
                      disabled={savingEvent || !newEvent.title || !newEvent.description}
                      className="flex items-center gap-2 bg-[#D4A017] hover:bg-[#c49010] text-[#0D1B3E] font-bold px-5 py-2 rounded-xl transition-all text-sm disabled:opacity-60"
                    >
                      {savingEvent ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      {savingEvent ? 'Posting...' : 'Post'}
                    </button>
                  </div>
                </div>
              )}

              {/* Existing Events */}
              {events.filter(e => e.category === (activeTab === 'festivals' ? 'Festivals' : activeTab === 'publications' ? 'Publication' : 'Events & Activities')).length === 0 && !showEventForm && (
                <div className="text-center py-16 text-gray-400">
                  <Image size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No items yet. Click "Add" to create one.</p>
                </div>
              )}
              <div className="space-y-4">
                {events.filter(e => e.category === (activeTab === 'festivals' ? 'Festivals' : activeTab === 'publications' ? 'Publication' : 'Events & Activities')).map(ev => (
                  <div key={ev.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="flex gap-4 p-4">
                      {/* Images strip */}
                      {ev.images && ev.images.length > 0 && (
                        <div className="flex gap-1.5 flex-shrink-0">
                          {ev.images.slice(0, 3).map((img, idx) => (
                            <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100">
                              <img src={img} alt={`ev-img-${idx}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                          {ev.images.length > 3 && (
                            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">+{ev.images.length - 3}</div>
                          )}
                        </div>
                      )}
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h5 className="font-bold text-gray-800 text-sm truncate">{ev.title}</h5>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#123B6D]/10 text-[#123B6D] mt-1">
                              {ev.programme_section || ev.category}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteEvent(ev.id)}
                            className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                          ><Trash2 size={13} /></button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{ev.description}</p>
                        <p className="text-[10px] text-gray-400 mt-2">
                          {new Date(ev.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
