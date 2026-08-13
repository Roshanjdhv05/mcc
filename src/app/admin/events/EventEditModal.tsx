'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  X, Save, Loader2, Image as ImageIcon, FileText,
  UploadCloud, Trash2, CheckSquare, Square, Globe, Home,
  GraduationCap, ChevronDown, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const EVENT_CATEGORIES = [
  'Events & Activities', 'Festivals', 'Publication',
  'Industrial Visits', 'Cultural', 'Sports', 'NSS', 'Academic', 'Workshop', 'Seminar',
];

const DEPARTMENTS = [
  "Students' Council", "National Service Scheme", "Cultural Forum",
  "Sports and Gymkhana", "Natyakarmi (Theatre Group)", "Marathi Vangmay Mandal",
  "Aaroh (Music Club)", "Nature Club", "Women Development Cell",
  "Entrepreneurship Development Cell", "Students' Research",
  "Spectrum", "Inspira", "Hack-A-Thon", "Emporio", "Quantomania", "Manthan",
];

const PROGRAMMES: { code: string; label: string; sections: string[] }[] = [
  { code: 'BCom',    label: 'B.Com (Commerce)',                    sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'] },
  { code: 'BAF',     label: 'B.Com (Accounting & Finance)',         sections: ['Events & Activities', 'Festivals – Emporio', 'Publication', 'Industrial Visits'] },
  { code: 'BMS',     label: 'BMS (Management Studies)',             sections: ['Events & Activities', 'Festivals – Inspira', 'Publication', 'Industrial Visits'] },
  { code: 'BFM',     label: 'BFM (Financial Markets)',              sections: ['Events & Activities', 'Festivals – Manthan', 'Publication', 'Industrial Visits'] },
  { code: 'BFSI',    label: 'BFSI',                                sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'] },
  { code: 'BBI',     label: 'BBI (Banking & Insurance)',            sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'] },
  { code: 'BCom-BA', label: 'B.Com (Business Analytics)',           sections: ['Events & Activities', 'Festivals – Quantomania', 'Publication', 'Industrial Visits'] },
  { code: 'BCom-MS', label: 'B.Com (Marketing & Salesmanship)',     sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'] },
  { code: 'BSc IT',  label: 'B.Sc. Information Technology',        sections: ['Events & Activities', 'Festivals – Hack-A-Thon', 'Publication', 'Industrial Visits'] },
  { code: 'BCA',     label: 'BCA (Computer Applications)',          sections: ['Events & Activities', 'Festivals – Hack-A-Thon', 'Publication', 'Industrial Visits'] },
  { code: 'DS',      label: 'Data Science',                        sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'] },
  { code: 'SCT',     label: 'Skill-Based Certificate Courses',     sections: ['Events & Activities', 'Publication'] },
  { code: 'BBA',     label: 'BBA (Business Administration)',        sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'] },
  { code: 'BAMMC',   label: 'BA (Mass Media & Communication)',      sections: ['Events & Activities', 'Festivals', 'Publication', 'Industrial Visits'] },
];

type EventRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string | null;
  images: string[];
  documents: string[];
  publish_gallery: boolean;
  publish_home: boolean;
  publish_programme: boolean;
  programme: string | null;
  programme_section: string | null;
  status: string;
  calendar_date?: string | null;
};

async function uploadFile(file: File, bucket: string, folder: string): Promise<string | null> {
  const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error || !data) { console.error(error); return null; }
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
}

export default function EventEditModal({
  event,
  onClose,
  onSaved,
}: {
  event: EventRow;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description || '');
  const [eventDate, setEventDate] = useState(event.calendar_date || '');
  const [category, setCategory] = useState(event.category);
  const [department, setDepartment] = useState(event.department || '');
  const [images, setImages] = useState<string[]>(event.images || []);
  const [documents, setDocuments] = useState<string[]>(event.documents || []);
  const [toGallery, setToGallery] = useState(event.publish_gallery);
  const [toHome, setToHome] = useState(event.publish_home);
  const [toProgramme, setToProgramme] = useState(event.publish_programme ?? false);

  // Parse existing programme/sections
  const parseInitialProgrammes = () => {
    if (!event.programme) return [];
    return event.programme.split(',').map(s => s.trim()).filter(Boolean);
  };
  const parseInitialSections = () => {
    if (!event.programme_section) return {};
    try {
      const parsed = JSON.parse(event.programme_section);
      if (typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
    } catch {}
    // Legacy single string – assign to first programme
    const progs = parseInitialProgrammes();
    if (progs.length > 0) return { [progs[0]]: event.programme_section as string };
    return {};
  };

  const [selectedProgrammes, setSelectedProgrammes] = useState<string[]>(parseInitialProgrammes);
  const [selectedSections, setSelectedSections] = useState<Record<string, string>>(parseInitialSections);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const imageRef = useRef<HTMLInputElement>(null);
  const docRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const MAX_IMAGES = 5;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const currentCount = images.length;
    const remaining = MAX_IMAGES - currentCount;
    if (remaining <= 0) {
      setMsg({ type: 'error', text: `Maximum ${MAX_IMAGES} images allowed.` });
      e.target.value = '';
      return;
    }
    const filesToUpload = Array.from(e.target.files).slice(0, remaining);
    if (filesToUpload.length < e.target.files.length) {
      setMsg({ type: 'error', text: `Only ${remaining} more image(s) can be added (limit: ${MAX_IMAGES}).` });
    }
    setUploading(true);
    for (const file of filesToUpload) {
      const url = await uploadFile(file, 'event-images', 'events');
      if (url) setImages(prev => [...prev, url]);
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    for (const file of Array.from(e.target.files)) {
      const url = await uploadFile(file, 'event-documents', 'events');
      if (url) setDocuments(prev => [...prev, url]);
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleSave = async () => {
    if (!title.trim()) { setMsg({ type: 'error', text: 'Title is required.' }); return; }
    if (!category) { setMsg({ type: 'error', text: 'Category is required.' }); return; }
    if (toProgramme && selectedProgrammes.length === 0) {
      setMsg({ type: 'error', text: 'Select at least one programme.' }); return;
    }
    if (toProgramme) {
      for (const prog of selectedProgrammes) {
        if (!selectedSections[prog]) {
          setMsg({ type: 'error', text: `Select a section for ${prog}.` }); return;
        }
      }
    }

    setSaving(true);
    setMsg(null);

    const payload: Record<string, unknown> = {
      title: title.trim(),
      description: description.trim(),
      category,
      department: department || null,
      images,
      documents,
      publish_gallery: toGallery,
      publish_home: toHome,
      publish_programme: toProgramme,
      programme: toProgramme ? selectedProgrammes.join(', ') : null,
      programme_section: toProgramme ? JSON.stringify(selectedSections) : null,
      calendar_date: eventDate || null,
    };

    const { error } = await supabase.from('events').update(payload).eq('id', event.id);
    if (error) {
      setMsg({ type: 'error', text: error.message });
    } else {
      setMsg({ type: 'success', text: 'Event updated successfully!' });
      setTimeout(() => { onSaved(); onClose(); }, 1200);
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 pt-10 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl z-10 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Edit Event</h2>
            <p className="text-xs text-gray-400 mt-0.5">Changes will reflect instantly on the live site.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          {msg && (
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border ${
              msg.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {msg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              {msg.text}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Event Title <span className="text-red-500">*</span></label>
            <input
              type="text" value={title} onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
            <textarea
              value={description} onChange={e => setDescription(e.target.value)} rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Event Date (When it happened)</label>
            <input
              type="date"
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
            />
          </div>

          {/* Category + Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
              <div className="relative">
                <select value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white pr-8">
                  <option value="">Select…</option>
                  {EVENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Forum / Club</label>
              <div className="relative">
                <select value={department} onChange={e => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white pr-8">
                  <option value="">None</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Publish targets */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Publish To</label>
            <div className="space-y-3">
              {/* Gallery */}
              <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${toGallery ? 'border-[#123B6D] bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                <button type="button" onClick={() => setToGallery(v => !v)} className="flex-shrink-0">
                  {toGallery ? <CheckSquare size={20} className="text-[#123B6D]" /> : <Square size={20} className="text-gray-300" />}
                </button>
                <div>
                  <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                    <Globe size={15} className="text-[#123B6D]" /> Events Gallery Page
                  </div>
                </div>
              </label>

              {/* Homepage */}
              <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${toHome ? 'border-[#D4A017] bg-yellow-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                <button type="button" onClick={() => setToHome(v => !v)} className="flex-shrink-0">
                  {toHome ? <CheckSquare size={20} className="text-[#D4A017]" /> : <Square size={20} className="text-gray-300" />}
                </button>
                <div>
                  <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                    <Home size={15} className="text-[#D4A017]" /> Homepage – Latest in MCC
                  </div>
                </div>
              </label>

              {/* Programme pages */}
              <div className={`p-4 rounded-2xl border-2 transition-all ${toProgramme ? 'border-purple-500 bg-purple-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                <label className="flex items-center gap-3 cursor-pointer mb-0">
                  <button type="button" onClick={() => setToProgramme(v => !v)} className="flex-shrink-0">
                    {toProgramme ? <CheckSquare size={20} className="text-purple-600" /> : <Square size={20} className="text-gray-300" />}
                  </button>
                  <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
                    <GraduationCap size={15} className="text-purple-600" /> Programme Page
                  </div>
                </label>

                {toProgramme && (
                  <div className="mt-4 space-y-4" onClick={e => e.preventDefault()}>
                    {/* Programme pills */}
                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-2">Select Programmes <span className="text-red-500">*</span></p>
                      <div className="flex flex-wrap gap-2">
                        {PROGRAMMES.map(p => {
                          const isSelected = selectedProgrammes.includes(p.code);
                          return (
                            <button key={p.code} type="button"
                              onClick={() => {
                                setSelectedProgrammes(prev => {
                                  if (isSelected) {
                                    const next = prev.filter(c => c !== p.code);
                                    const ns = { ...selectedSections };
                                    delete ns[p.code];
                                    setSelectedSections(ns);
                                    return next;
                                  }
                                  return [...prev, p.code];
                                });
                              }}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                isSelected ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-white text-gray-600 border-gray-200 hover:border-purple-200'
                              }`}
                            >
                              {p.code}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section per programme */}
                    {selectedProgrammes.length > 0 && (
                      <div className="space-y-3">
                        {selectedProgrammes.map(progCode => {
                          const prog = PROGRAMMES.find(p => p.code === progCode);
                          if (!prog) return null;
                          return (
                            <div key={progCode} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                              <p className="text-xs font-bold text-gray-800 mb-2">
                                Section for {progCode} <span className="text-red-500">*</span>
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {prog.sections.map(sec => (
                                  <button key={sec} type="button"
                                    onClick={() => setSelectedSections(prev => ({ ...prev, [progCode]: sec }))}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                      selectedSections[progCode] === sec
                                        ? 'bg-purple-600 text-white border-purple-600'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                                    }`}
                                  >
                                    {sec}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Images
              <span className={`ml-2 text-xs font-normal ${images.length >= MAX_IMAGES ? 'text-red-500' : 'text-gray-400'}`}>
                ({images.length}/{MAX_IMAGES})
              </span>
            </label>
            <div className="flex flex-wrap gap-3 mb-3">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img} alt="" className="w-24 h-24 object-cover rounded-xl border border-gray-200" />
                  <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              {images.length < MAX_IMAGES && (
                <button type="button" onClick={() => imageRef.current?.click()}
                  disabled={uploading}
                  className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-[#123B6D] hover:bg-blue-50 transition-colors disabled:opacity-50">
                  {uploading ? <Loader2 size={20} className="animate-spin text-gray-400" /> : <UploadCloud size={20} className="text-gray-400" />}
                  <span className="text-[10px] font-semibold text-gray-400">{uploading ? 'Uploading' : 'Add'}</span>
                </button>
              )}
              {images.length >= MAX_IMAGES && (
                <div className="w-24 h-24 border-2 border-dashed border-red-200 rounded-xl flex flex-col items-center justify-center gap-1 bg-red-50">
                  <span className="text-[10px] font-bold text-red-500 text-center px-1">Limit reached (5/5)</span>
                </div>
              )}
              <input type="file" ref={imageRef} accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
            </div>
          </div>

          {/* Documents */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Documents</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {documents.map((doc, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-medium">
                  <FileText size={12} />
                  <span className="max-w-[120px] truncate">{doc.split('/').pop()}</span>
                  <button type="button" onClick={() => setDocuments(documents.filter((_, idx) => idx !== i))}
                    className="hover:text-red-600 ml-1">
                    <X size={12} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => docRef.current?.click()} disabled={uploading}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-amber-300 rounded-lg text-xs font-semibold text-amber-700 hover:bg-amber-50 transition-colors disabled:opacity-50">
                <UploadCloud size={13} /> Add Document
              </button>
              <input type="file" ref={docRef} accept=".pdf,.doc,.docx" multiple className="hidden" onChange={handleDocUpload} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving || uploading}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#123B6D] hover:bg-[#0d2d54] rounded-xl transition-colors disabled:opacity-60 shadow-sm">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
