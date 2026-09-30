'use client';
import React, { useState, useRef } from 'react';
import { CalendarDays, X, UploadCloud, Loader2, CheckSquare, Square, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const CATEGORIES = [
  'Events & Activities', 'Festivals', 'Publication',
  'Industrial Visits', 'Cultural', 'Sports', 'NSS', 'Academic', 'Workshop', 'Seminar',
];
const DEPARTMENTS = [
  'Commerce', 'Science', 'Arts', 'BMS', 'BAF', 'BBI', 'BMM', 'IT', 'Junior College', 'Other',
];

const PROGRAMMES = [
  { code: 'B.COM', label: 'B.COM' },
  { code: 'BAF',   label: 'BAF' },
  { code: 'BMS',   label: 'BMS' },
  { code: 'BFM',   label: 'BFM' },
  { code: 'BFSI',  label: 'BFSI' },
  { code: 'BBI',   label: 'BBI' },
  { code: 'BCOM-BA', label: 'BCOM-BA' },
  { code: 'BCOM-MS', label: 'BCOM-MS' },
  { code: 'BSC-CS', label: 'BSC-CS (CS)' },
  { code: 'BSC-IT', label: 'BSC-IT' },
  { code: 'BCA',    label: 'BCA' },
  { code: 'BSC-DS', label: 'BSC-DS' },
  { code: 'MSC-CS', label: 'MSC-CS' },
  { code: 'MSC-IT', label: 'MSC-IT' },
  { code: 'SCT',    label: 'SCT' },
  { code: 'BBA',    label: 'BBA' },
  { code: 'BAMMC',  label: 'BAMMC' },
];

const FESTIVAL_SECTIONS: Record<string, string> = {
  'BAF': 'Manthan', 'BBI': 'Manthan + Shodh', 'BFM': 'Manthan',
  'BMS': 'Inspira', 'BSC-CS': 'Hack-A-Thon', 'BSC-IT': 'Hack-A-Thon',
  'BCA': 'Hack-A-Thon', 'BSC-DS': 'Hack-A-Thon', 'MSC-CS': 'Hack-A-Thon',
  'B.COM': 'Festivals', 'BBA': 'Festivals', 'BAMMC': 'Festivals', 'BFSI': 'Festivals',
  'BCOM-BA': 'Quantomania', 'BCOM-MS': 'Spectrum', 'SCT': 'Festivals',
};

const PUBLICATION_SECTIONS: Record<string, string> = {
  'BAF': 'Pratibimb', 'BBI': 'Pratibimb', 'BFM': 'Finanza',
  'BMS': 'Inspira', 'BSC-CS': 'Tech Anugraha', 'BSC-IT': 'Tech Anugraha',
  'BCA': 'Tech Anugraha', 'BSC-DS': 'Tech Anugraha', 'MSC-CS': 'Tech Anugraha',
  'B.COM': 'Publication', 'BBA': 'Publication', 'BAMMC': 'Shutter Speed',
  'BFSI': 'Publication', 'BCOM-BA': 'Publication', 'BCOM-MS': 'Publication', 'SCT': 'Publication',
};

function getProgrammeSectionOptions(code: string) {
  const festival = FESTIVAL_SECTIONS[code] || 'Festivals';
  const publication = PUBLICATION_SECTIONS[code] || 'Publication';
  return [
    { value: 'Events & Activities', label: 'Events & Activities' },
    { value: festival, label: festival },
    { value: publication, label: publication },
    { value: 'Industrial Visits', label: 'Industrial Visits' },
  ];
}

async function uploadFile(file: File, bucket: string, folder: string): Promise<string | null> {
  const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error || !data) { console.error(error); return null; }
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
}

interface EventPublishFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EventPublishForm({ onSuccess, onCancel }: EventPublishFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState('');
  const [publishGallery, setPublishGallery] = useState(true);
  const [publishHome, setPublishHome] = useState(false);
  const [publishProgramme, setPublishProgramme] = useState(false);
  const [selectedProgrammes, setSelectedProgrammes] = useState<string[]>([]);
  const [programmeSections, setProgrammeSections] = useState<Record<string, string>>({});
  const [uploads, setUploads] = useState<{ name: string; url: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setError(null);
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, 'event-images', 'events');
      if (url) setUploads(prev => [...prev, { name: file.name, url }]);
      else setError(`Failed to upload ${file.name}`);
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Event title is required'); return; }
    if (!category) { setError('Category is required'); return; }
    if (!publishGallery && !publishHome && !publishProgramme) {
      setError('Please select at least one publish destination.');
      return;
    }
    if (publishProgramme && selectedProgrammes.length === 0) {
      setError('Please select at least one programme.');
      return;
    }
    setSaving(true);
    setError(null);

    const imageUrls = uploads.map(u => u.url);

    const programmeInserts = publishProgramme && selectedProgrammes.length > 0
      ? selectedProgrammes.map(code => {
          const selectedSection = programmeSections[code] || 'Events & Activities';
          const festival = FESTIVAL_SECTIONS[code] || 'Festivals';
          const publication = PUBLICATION_SECTIONS[code] || 'Publication';
          
          let dbCategory = category || 'Events & Activities';
          if (selectedSection === festival || selectedSection === 'Festivals') {
            dbCategory = 'Festivals';
          } else if (selectedSection === publication || selectedSection === 'Publication') {
            dbCategory = 'Publication';
          } else if (selectedSection === 'Industrial Visits') {
            dbCategory = 'Industrial Visits';
          }

          return {
            title: title.trim(),
            description: description.trim(),
            category: dbCategory,
            department: code,
            programme: code,
            programme_section: selectedSection,
            images: imageUrls,
            videos: [],
            documents: [],
            publish_gallery: publishGallery,
            publish_home: publishHome,
            publish_calendar: false,
            publish_programme: true,
            status: 'published',
            published_at: new Date().toISOString(),
          };
        })
      : [];

    const basePayload: any = {
      title: title.trim(),
      description: description.trim(),
      category,
      department: department || null,
      programme: null,
      programme_section: null,
      images: imageUrls,
      videos: [],
      documents: [],
      publish_gallery: publishGallery,
      publish_home: publishHome,
      publish_calendar: false,
      publish_programme: false,
      status: 'published',
      published_at: new Date().toISOString(),
    };

    const allPayloads: any[] = programmeInserts.length > 0 ? programmeInserts : [basePayload];

    const { error: dbError } = await supabase.from('events').insert(allPayloads);
    setSaving(false);
    if (dbError) { setError(dbError.message); return; }
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <CalendarDays size={18} className="text-[#123B6D]" /> Publish New Event
        </h3>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        )}
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm border border-red-100">{error}</div>}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Title <span className="text-red-500">*</span></label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
          placeholder="e.g. Annual Science Exhibition 2026"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
          placeholder="Brief description of the event..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] resize-none" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
          <select required value={category} onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white">
            <option value="">Select Category...</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department</label>
          <select value={department} onChange={e => setDepartment(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white">
            <option value="">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Publish To</p>
        <label className="flex items-center gap-3 cursor-pointer">
          <button type="button" onClick={() => setPublishGallery(v => !v)} className="flex-shrink-0">
            {publishGallery ? <CheckSquare size={20} className="text-[#123B6D]" /> : <Square size={20} className="text-gray-400" />}
          </button>
          <div>
            <p className="text-sm font-semibold text-gray-800">Events Gallery</p>
            <p className="text-xs text-gray-500">Event appears in the public events/gallery page</p>
          </div>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <button type="button" onClick={() => setPublishHome(v => !v)} className="flex-shrink-0">
            {publishHome ? <CheckSquare size={20} className="text-[#123B6D]" /> : <Square size={20} className="text-gray-400" />}
          </button>
          <div>
            <p className="text-sm font-semibold text-gray-800">Homepage Latest Events</p>
            <p className="text-xs text-gray-500">Event appears in the homepage "Latest Events" section</p>
          </div>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <button type="button" onClick={() => setPublishProgramme(v => !v)} className="flex-shrink-0">
            {publishProgramme ? <CheckSquare size={20} className="text-[#123B6D]" /> : <Square size={20} className="text-gray-400" />}
          </button>
          <div>
            <p className="text-sm font-semibold text-gray-800">Programme Page</p>
            <p className="text-xs text-gray-500">Post this event in a specific programme's section (e.g. CS, IT, etc.)</p>
          </div>
        </label>
      </div>

      {publishProgramme && (
        <div className="border border-purple-200 bg-purple-50/40 rounded-2xl p-4 space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2">Select Programmes <span className="text-red-500">*</span></p>
            <div className="flex flex-wrap gap-2">
              {PROGRAMMES.map(prog => {
                const isSelected = selectedProgrammes.includes(prog.code);
                return (
                  <button
                    key={prog.code}
                    type="button"
                    onClick={() => {
                      setSelectedProgrammes(prev =>
                        isSelected ? prev.filter(c => c !== prog.code) : [...prev, prog.code]
                      );
                      if (isSelected) {
                        setProgrammeSections(prev => { const n = {...prev}; delete n[prog.code]; return n; });
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-purple-400 hover:text-purple-600'
                    }`}
                  >
                    {prog.label}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedProgrammes.length > 0 && (
            <div className="space-y-3">
              {selectedProgrammes.map(code => {
                const sectionOptions = getProgrammeSectionOptions(code);
                return (
                  <div key={code} className="bg-white rounded-xl border border-purple-100 p-3">
                    <p className="text-xs font-bold text-gray-700 mb-2">
                      Select Section for <span className="text-purple-700">{code}</span> <span className="text-red-500">*</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sectionOptions.map(opt => {
                        const isActive = (programmeSections[code] || 'Events & Activities') === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setProgrammeSections(prev => ({ ...prev, [code]: opt.value }))}
                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                              isActive
                                ? 'bg-[#123B6D] text-white border-[#123B6D]'
                                : 'bg-slate-50 text-gray-600 border-gray-200 hover:bg-slate-100'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Event Images <span className="text-gray-400 font-normal">(optional)</span></label>
        <div className="flex gap-4 items-start flex-wrap">
          <button type="button" onClick={() => imageRef.current?.click()} disabled={uploading}
            className="flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#123B6D] hover:bg-blue-50 transition-colors disabled:opacity-50 flex-shrink-0">
            {uploading ? <Loader2 size={22} className="animate-spin text-gray-400" /> : <UploadCloud size={22} className="text-gray-400" />}
            <span className="text-xs font-semibold text-gray-500 mt-1.5">{uploading ? 'Uploading...' : 'Upload'}</span>
          </button>
          <input type="file" accept="image/*" multiple ref={imageRef} className="hidden" onChange={handleImageUpload} />
          {uploads.map((img, i) => (
            <div key={i} className="relative group">
              <img src={img.url} alt={img.name} className="w-28 h-28 object-cover rounded-xl border border-gray-200" />
              <button type="button" onClick={() => setUploads(uploads.filter((_, idx) => idx !== i))}
                className="absolute top-1.5 right-1.5 bg-white text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <X size={13} />
              </button>
            </div>
          ))}
          {uploads.length === 0 && !uploading && (
            <div className="flex items-center gap-2 text-xs text-gray-400 self-center">
              <ImageIcon size={16} /> No images uploaded yet
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2 border-t border-gray-100">
        {onCancel && (
          <button type="button" onClick={onCancel}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        )}
        <button type="submit" disabled={saving || uploading}
          className="flex-1 py-2.5 bg-[#123B6D] text-white rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
          {saving ? <><Loader2 size={15} className="animate-spin" /> Publishing...</> : <><CalendarDays size={15} /> Publish Event</>}
        </button>
      </div>
    </form>
  );
}
