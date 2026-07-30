'use client';
import React, { useState, useRef } from 'react';
import {
  Image, Video, FileText, X, CheckSquare,
  Square, Loader2, Globe, Home, BookOpen, Sparkles, ChevronDown, GraduationCap
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ─── Event categories ────────────────────────────────────────────────────────
const EVENT_CATEGORIES = [
  'Events & Activities', 'Festivals', 'Publication',
  'Industrial Visits', 'Cultural', 'Sports', 'NSS', 'Academic', 'Workshop', 'Seminar',
];

// ─── Forums / clubs ──────────────────────────────────────────────────────────
const DEPARTMENTS = [
  "Students' Council", "National Service Scheme", "Cultural Forum",
  "Sports and Gymkhana", "Natyakarmi (Theatre Group)", "Marathi Vangmay Mandal",
  "Aaroh (Music Club)", "Nature Club", "Women Development Cell",
  "Entrepreneurship Development Cell", "Students' Research",
  "Spectrum", "Inspira", "Hack-A-Thon", "Emporio", "Quantomania", "Manthan",
];

// ─── Programmes with their event sections ────────────────────────────────────
const PROGRAMMES: {
  code: string;
  label: string;
  sections: string[];
}[] = [
  {
    code: 'BCom',
    label: 'B.Com (Commerce)',
    sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'BAF',
    label: 'B.Com (Accounting & Finance)',
    sections: ['Events & Activities', 'Festivals – Emporio', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'BMS',
    label: 'BMS (Management Studies)',
    sections: ['Events & Activities', 'Festivals – Inspira', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'BFM',
    label: 'BFM (Financial Markets)',
    sections: ['Events & Activities', 'Festivals – Manthan', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'BFSI',
    label: 'BFSI (Banking, Finance, Services & Insurance)',
    sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'BBI',
    label: 'BBI (Banking & Insurance)',
    sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'BCom-BA',
    label: 'B.Com (Business Analytics)',
    sections: ['Events & Activities', 'Festivals – Quantomania', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'BCom-MS',
    label: 'B.Com (Marketing & Salesmanship)',
    sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'BSc IT',
    label: 'B.Sc. Information Technology',
    sections: ['Events & Activities', 'Festivals – Hack-A-Thon', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'BCA',
    label: 'BCA (Computer Applications)',
    sections: ['Events & Activities', 'Festivals – Hack-A-Thon', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'DS',
    label: 'Data Science',
    sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'SCT',
    label: 'Skill-Based Certificate Courses',
    sections: ['Events & Activities', 'Publication'],
  },
  {
    code: 'BBA',
    label: 'BBA (Business Administration)',
    sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'],
  },
  {
    code: 'BAMMC',
    label: 'BA (Mass Media & Communication)',
    sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'],
  },
];

// ─── Calendar types ───────────────────────────────────────────────────────────
const CALENDAR_TYPES = [
  'Academic', 'Examination', 'Holiday', 'Seminar', 'Workshop',
  'Sports', 'Cultural', 'NSS', 'NCC', 'Event',
];

interface UploadedFile { name: string; url: string; type: 'image' | 'video' | 'document'; }

async function uploadFile(file: File, bucket: string, folder: string): Promise<string | null> {
  const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error || !data) { console.error(error); return null; }
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
}

export default function EventPublishForm({ onSuccess }: { onSuccess?: () => void }) {
  // ── Core fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState('');

  // ── Programme targeting
  const [selectedProgramme, setSelectedProgramme] = useState('');
  const [selectedSection, setSelectedSection]     = useState('');

  // ── Publish targets
  const [toGallery, setToGallery]   = useState(true);
  const [toHome, setToHome]         = useState(false);
  const [toCalendar, setToCalendar] = useState(false);
  const [toProgramme, setToProgramme] = useState(false);

  // ── Calendar-specific
  const [calendarDate, setCalendarDate] = useState('');
  const [calendarType, setCalendarType] = useState('Event');

  // ── Media
  const [uploads, setUploads]   = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [success, setSuccess]   = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const docRef   = useRef<HTMLInputElement>(null);

  const activeProgramme = PROGRAMMES.find(p => p.code === selectedProgramme);

  // ── Upload
  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    bucket: string, folder: string, type: 'image' | 'video' | 'document'
  ) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true); setError(null);
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, bucket, folder);
      if (url) setUploads(prev => [...prev, { name: file.name, url, type }]);
      else setError(`Failed to upload ${file.name}`);
    }
    setUploading(false); e.target.value = '';
  };

  const removeUpload = (idx: number) => setUploads(prev => prev.filter((_, i) => i !== idx));

  // ── Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    if (!category)     { setError('Please select a category'); return; }
    if (!toGallery && !toHome && !toCalendar && !toProgramme) {
      setError('Select at least one publish target'); return;
    }
    if (toCalendar && !calendarDate) {
      setError('Calendar date is required when publishing to calendar'); return;
    }
    if (toProgramme && !selectedProgramme) {
      setError('Please select a programme'); return;
    }
    if (toProgramme && !selectedSection) {
      setError('Please select a programme section'); return;
    }

    setSaving(true); setError(null);

    const imageUrls    = uploads.filter(u => u.type === 'image').map(u => u.url);
    const videoUrls    = uploads.filter(u => u.type === 'video').map(u => u.url);
    const documentUrls = uploads.filter(u => u.type === 'document').map(u => u.url);

    const payload = {
      title:              title.trim(),
      description:        description.trim(),
      category,
      department:         department || null,
      programme:          toProgramme ? selectedProgramme : null,
      programme_section:  toProgramme ? selectedSection   : null,
      images:             imageUrls,
      videos:             videoUrls,
      documents:          documentUrls,
      publish_gallery:    toGallery,
      publish_home:       toHome,
      publish_calendar:   toCalendar,
      publish_programme:  toProgramme,
      calendar_date:      toCalendar ? calendarDate : null,
      calendar_type:      toCalendar ? calendarType : null,
      status:             'published',
      published_at:       new Date().toISOString(),
    };

    const { error: dbError } = await supabase.from('events').insert([payload]);
    if (dbError) { setError(dbError.message); setSaving(false); return; }

    setSuccess(true); setSaving(false);
    setTitle(''); setDescription(''); setCategory(''); setDepartment('');
    setSelectedProgramme(''); setSelectedSection('');
    setToGallery(true); setToHome(false); setToCalendar(false); setToProgramme(false);
    setCalendarDate(''); setCalendarType('Event'); setUploads([]);
    onSuccess?.();
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* ── Alerts ── */}
      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm border border-red-100 flex items-center gap-2">
          <X size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm border border-green-100 flex items-center gap-2">
          <Sparkles size={16} /> Event published successfully!
        </div>
      )}

      {/* ── Title ── */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">
          Event Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text" value={title} onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Manthan 2025 – BFM Annual Festival"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
        />
      </div>

      {/* ── Description ── */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">Description / Information</label>
        <textarea
          value={description} onChange={e => setDescription(e.target.value)}
          rows={4} placeholder="Describe the event in detail..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
        />
      </div>

      {/* ── Category + Department ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] pr-10 bg-white">
              <option value="">Select category...</option>
              {EVENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Forum / Club</label>
          <div className="relative">
            <select value={department} onChange={e => setDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] pr-10 bg-white">
              <option value="">Select forum/club...</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Publish Targets ── */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Publish To <span className="text-red-500">*</span>
          <span className="text-gray-400 font-normal ml-1">(select all that apply)</span>
        </label>
        <div className="space-y-3">

          {/* Gallery */}
          <label className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${toGallery ? 'border-[#123B6D] bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
            <button type="button" onClick={() => setToGallery(v => !v)} className="mt-0.5 flex-shrink-0">
              {toGallery ? <CheckSquare size={20} className="text-[#123B6D]" /> : <Square size={20} className="text-gray-300" />}
            </button>
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                <Globe size={16} className="text-[#123B6D]" /> Events Gallery Page
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Appears in the filterable gallery at /students-corner/gallery</p>
            </div>
          </label>

          {/* Homepage */}
          <label className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${toHome ? 'border-[#D4A017] bg-yellow-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
            <button type="button" onClick={() => setToHome(v => !v)} className="mt-0.5 flex-shrink-0">
              {toHome ? <CheckSquare size={20} className="text-[#D4A017]" /> : <Square size={20} className="text-gray-300" />}
            </button>
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                <Home size={16} className="text-[#D4A017]" /> Homepage – Latest in MCC
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Appears in "Latest Events" section on the home page</p>
            </div>
          </label>

          {/* Calendar */}
          <div className={`p-4 rounded-2xl border-2 transition-all ${toCalendar ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <button type="button" onClick={() => setToCalendar(v => !v)} className="mt-0.5 flex-shrink-0">
                {toCalendar ? <CheckSquare size={20} className="text-green-600" /> : <Square size={20} className="text-gray-300" />}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                  <BookOpen size={16} className="text-green-600" /> Academic Calendar
                </div>
                <p className="text-xs text-gray-500 mt-0.5 mb-3">Adds a dot/entry on the home page & full calendar page</p>
                {toCalendar && (
                  <div className="grid grid-cols-2 gap-3" onClick={e => e.preventDefault()}>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Event Date <span className="text-red-500">*</span>
                      </label>
                      <input type="date" value={calendarDate} onChange={e => setCalendarDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Calendar Type</label>
                      <div className="relative">
                        <select value={calendarType} onChange={e => setCalendarType(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-green-400 bg-white pr-7">
                          {CALENDAR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Programme Page */}
          <div className={`p-4 rounded-2xl border-2 transition-all ${toProgramme ? 'border-purple-500 bg-purple-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <button type="button" onClick={() => setToProgramme(v => !v)} className="mt-0.5 flex-shrink-0">
                {toProgramme ? <CheckSquare size={20} className="text-purple-600" /> : <Square size={20} className="text-gray-300" />}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                  <GraduationCap size={16} className="text-purple-600" /> Programme Page
                </div>
                <p className="text-xs text-gray-500 mt-0.5 mb-3">Post this event in a specific programme's section</p>

                {toProgramme && (
                  <div className="space-y-3" onClick={e => e.preventDefault()}>
                    {/* Programme select */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Select Programme <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={selectedProgramme}
                          onChange={e => { setSelectedProgramme(e.target.value); setSelectedSection(''); }}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-purple-400 bg-white pr-8"
                        >
                          <option value="">Select programme...</option>
                          {PROGRAMMES.map(p => (
                            <option key={p.code} value={p.code}>{p.code} – {p.label}</option>
                          ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Section select – only shows when programme is chosen */}
                    {activeProgramme && (
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Select Section <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {activeProgramme.sections.map(sec => (
                            <button
                              key={sec}
                              type="button"
                              onClick={() => setSelectedSection(sec)}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                selectedSection === sec
                                  ? 'bg-purple-600 text-white border-purple-600'
                                  : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                              }`}
                            >
                              {sec}
                            </button>
                          ))}
                        </div>
                        {selectedProgramme && selectedSection && (
                          <p className="mt-2 text-xs text-purple-700 font-medium">
                            ✓ Will post to: <strong>{selectedProgramme}</strong> → <strong>{selectedSection}</strong>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </label>
          </div>

        </div>
      </div>

      {/* ── Media Upload ── */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">Media & Attachments</label>
        <div className="grid grid-cols-3 gap-3">
          <label className="flex flex-col items-center gap-2 border-2 border-dashed border-blue-200 rounded-xl p-4 cursor-pointer hover:bg-blue-50 transition-colors text-center">
            <Image size={22} className="text-blue-500" />
            <span className="text-xs font-semibold text-blue-700">Images</span>
            <span className="text-[10px] text-gray-400">JPG, PNG, WEBP</span>
            <input ref={imageRef} type="file" multiple accept="image/*" className="hidden"
              onChange={e => handleUpload(e, 'event-images', 'events', 'image')} />
          </label>
          <label className="flex flex-col items-center gap-2 border-2 border-dashed border-purple-200 rounded-xl p-4 cursor-pointer hover:bg-purple-50 transition-colors text-center">
            <Video size={22} className="text-purple-500" />
            <span className="text-xs font-semibold text-purple-700">Videos</span>
            <span className="text-[10px] text-gray-400">MP4, MOV, WEBM</span>
            <input ref={videoRef} type="file" multiple accept="video/*" className="hidden"
              onChange={e => handleUpload(e, 'event-videos', 'events', 'video')} />
          </label>
          <label className="flex flex-col items-center gap-2 border-2 border-dashed border-amber-200 rounded-xl p-4 cursor-pointer hover:bg-amber-50 transition-colors text-center">
            <FileText size={22} className="text-amber-500" />
            <span className="text-xs font-semibold text-amber-700">Documents</span>
            <span className="text-[10px] text-gray-400">PDF, DOC</span>
            <input ref={docRef} type="file" multiple accept=".pdf,.doc,.docx" className="hidden"
              onChange={e => handleUpload(e, 'event-documents', 'events', 'document')} />
          </label>
        </div>
        {uploading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
            <Loader2 size={14} className="animate-spin" /> Uploading media...
          </div>
        )}
        {uploads.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {uploads.map((u, i) => (
              <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                u.type === 'image' ? 'bg-blue-100 text-blue-700'
                  : u.type === 'video' ? 'bg-purple-100 text-purple-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {u.type === 'image' ? <Image size={11} /> : u.type === 'video' ? <Video size={11} /> : <FileText size={11} />}
                <span className="max-w-[120px] truncate">{u.name}</span>
                <button type="button" onClick={() => removeUpload(i)} className="hover:opacity-70 ml-1">
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Submit ── */}
      <div className="pt-2 border-t">
        <button type="submit" disabled={saving || uploading}
          className="w-full py-3.5 bg-[#123B6D] hover:bg-[#0d2d54] text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
          {saving
            ? <><Loader2 size={16} className="animate-spin" /> Publishing Event...</>
            : <><Sparkles size={16} /> Publish Event</>}
        </button>
      </div>
    </form>
  );
}
