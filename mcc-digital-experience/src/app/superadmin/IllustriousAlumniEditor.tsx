'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Save, AlertCircle, Image as ImageIcon, Crop, Trash2, Link2, Plus } from 'lucide-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';
import { processFileForUpload } from '@/lib/fileUtils';

export interface AlumniItem {
  id: string;
  name: string;
  image_url: string;
  hsc: boolean | string;
  ug: boolean | string;
  pg: boolean | string;
  hsc_passout_year: string | null;
  ug_passout_year: string | null;
  pg_passout_year: string | null;
  course: string | null;
  year_passout: string | null;
  company_name: string | null;
  designation: string | null;
  linkedin_link: string | null;
  achieved: string | null;
  testimonial: string | null;
  show_on_home: boolean;
  qualification?: string | null;
  mcc_association?: string | null;
}

interface EditorProps {
  item: AlumniItem;
  isNew: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const FIELD = 'px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] outline-none transition-all';
const LABEL = 'block text-sm font-bold text-gray-700 mb-1.5';

// All programmes (programme name + slug for display)
const ALL_PROGRAMMES = [
  'HSC',
  'B.Com',
  'B.Com (Accounting & Finance)',
  'B.Com (Banking & Insurance)',
  'B.Com (Financial Markets)',
  'B.Com (Management Studies)',
  'B.Com (Business Administration)',
  'B.Com BFSI',
  'B.Sc (Computer Science)',
  'B.Sc (Information Technology)',
  'B.Sc (Computer Applications)',
  'B.Sc (Data Science)',
  'BA (Multimedia & Mass Communication)',
  'M.Com (Advanced Accountancy)',
  'M.Com (Business Management)',
  'M.Com (Banking & Finance)',
  'M.Sc (Information Technology)',
  'M.Sc (Finance)',
  'Ph.D in Business Economics',
];

interface MccEntry { programme: string; batch: string; }

function parseMccAssociation(raw: string | null | undefined): MccEntry[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  // Legacy: plain string like "BCOM (2016), HSC (2015)"
  return raw.split(',').map(s => {
    const m = s.trim().match(/^(.+?)\s*\((\d{4})\)$/);
    if (m) return { programme: m[1].trim(), batch: m[2] };
    return { programme: s.trim(), batch: '' };
  }).filter(e => e.programme);
}

function serializeMccAssociation(entries: MccEntry[]): string {
  return JSON.stringify(entries.filter(e => e.programme));
}

// Format for display on front-end: "HSC (2015), B.Com (2018)"
export function formatMccAssociation(raw: string | null | undefined): string {
  const entries = parseMccAssociation(raw);
  return entries.map(e => e.batch ? `${e.programme} (${e.batch})` : e.programme).join(', ');
}

export default function IllustriousAlumniEditor({ item, isNew, onClose, onSaved }: EditorProps) {
  const [form, setForm] = useState<AlumniItem>(item);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Association with MCC entries
  const [mccEntries, setMccEntries] = useState<MccEntry[]>(() =>
    parseMccAssociation(item.mcc_association || item.course)
  );

  // Crop state
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  const set = (key: keyof AlumniItem, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCropImageSrc(URL.createObjectURL(e.target.files[0]));
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  };

  const handleCropSave = async () => {
    if (!cropImageSrc || !croppedAreaPixels) return;
    setIsCropping(true);
    try {
      const croppedFile = await getCroppedImg(cropImageSrc, croppedAreaPixels);
      setImageFile(croppedFile);
      set('image_url', URL.createObjectURL(croppedFile));
      setCropImageSrc(null);
    } catch {
      setError('Failed to crop image.');
    } finally {
      setIsCropping(false);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return form.image_url;
    setUploadingImage(true);
    try {
      const file = await processFileForUpload(imageFile);
      const ext = file.name.split('.').pop();
      const filePath = `illustrious-alumni/${Math.random()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(filePath, file, { cacheControl: '31536000', upsert: false });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('event-images').getPublicUrl(filePath);
      return data.publicUrl;
    } finally {
      setUploadingImage(false);
    }
  };

  const addMccEntry = () => setMccEntries(prev => [...prev, { programme: ALL_PROGRAMMES[0], batch: '' }]);
  const removeMccEntry = (idx: number) => setMccEntries(prev => prev.filter((_, i) => i !== idx));
  const updateMccEntry = (idx: number, field: keyof MccEntry, value: string) =>
    setMccEntries(prev => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e));

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!form.name.trim()) throw new Error('Name is required.');
      if (!imageFile && !form.image_url) throw new Error('Please upload an image.');

      const imageUrl = await uploadImage();

      const payload = {
        name: form.name,
        image_url: imageUrl,
        // Keep legacy fields for backward compat but populate from mcc_association
        hsc: mccEntries.some(e => e.programme === 'HSC'),
        ug: mccEntries.some(e => !e.programme.startsWith('M.') && !e.programme.startsWith('Ph.') && e.programme !== 'HSC'),
        pg: mccEntries.some(e => e.programme.startsWith('M.') || e.programme.startsWith('Ph.')),
        hsc_passout_year: mccEntries.find(e => e.programme === 'HSC')?.batch || null,
        ug_passout_year: mccEntries.find(e => !e.programme.startsWith('M.') && !e.programme.startsWith('Ph.') && e.programme !== 'HSC')?.batch || null,
        pg_passout_year: mccEntries.find(e => e.programme.startsWith('M.') || e.programme.startsWith('Ph.'))?.batch || null,
        course: mccEntries.map(e => e.programme).join(', ') || null,
        year_passout: form.year_passout || null,
        company_name: form.company_name || null,
        designation: form.designation || null,
        linkedin_link: form.linkedin_link || null,
        achieved: form.achieved || null,
        testimonial: form.testimonial || null,
        show_on_home: form.show_on_home,
        qualification: form.qualification || null,
        mcc_association: serializeMccAssociation(mccEntries),
      };

      if (isNew) {
        const { error: err } = await supabase.from('mcc_illustrious_alumni').insert([payload]);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from('mcc_illustrious_alumni').update(payload).eq('id', form.id);
        if (err) throw err;
      }
      onSaved();
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this alumni entry? This cannot be undone.')) return;
    setLoading(true);
    try {
      const { error: err } = await supabase.from('mcc_illustrious_alumni').delete().eq('id', form.id);
      if (err) throw err;
      onSaved();
      onClose();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Crop Modal */}
      {cropImageSrc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl flex flex-col" style={{ height: '80vh' }}>
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><Crop size={18} className="text-[#123B6D]" /> Crop Image</h3>
              <button onClick={() => setCropImageSrc(null)} className="text-gray-400 hover:text-gray-600"><X size={22} /></button>
            </div>
            <div className="relative flex-1 bg-gray-900">
              <Cropper
                image={cropImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                onZoomChange={setZoom}
              />
            </div>
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-bold text-gray-600 shrink-0">Zoom</span>
                <input type="range" value={zoom} min={1} max={3} step={0.05}
                  onChange={e => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#123B6D]" />
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setCropImageSrc(null)} className="px-5 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
                <button onClick={handleCropSave} disabled={isCropping}
                  className="px-6 py-2 bg-[#123B6D] text-white font-bold rounded-xl hover:bg-[#0d2a4f] disabled:opacity-50">
                  {isCropping ? 'Cropping...' : 'Crop & Use'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Editor Panel */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {isNew ? '✨ Add Illustrious Alumni' : 'Edit Alumni'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm mb-6">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Image */}
            <div className="flex flex-col gap-4">
              <div>
                <label className={LABEL}>Profile Photo <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden bg-gray-50 aspect-square flex items-center justify-center relative">
                  {form.image_url ? (
                    <>
                      <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                      <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity font-bold text-sm">
                        Change Photo
                        <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                      </label>
                    </>
                  ) : (
                    <label className="flex flex-col items-center gap-3 p-6 cursor-pointer text-center">
                      <ImageIcon size={40} className="text-gray-300" />
                      <span className="text-sm font-semibold text-[#123B6D]">Click to upload photo</span>
                      <span className="text-xs text-gray-400">JPG, PNG up to 10MB</span>
                      <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1.5 text-center">Cropped to square format</p>
              </div>

              {/* Show on Home Page toggle */}
              <div className="p-4 bg-[#123B6D]/5 border border-[#123B6D]/20 rounded-xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.show_on_home}
                    onChange={e => set('show_on_home', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 accent-[#123B6D]" />
                  <div>
                    <p className="font-bold text-[#123B6D] text-sm">Show on Home Page</p>
                    <p className="text-xs text-gray-500 mt-0.5">Display in the Illustrious Alumni section of the homepage</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Right: Form Fields */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className={LABEL}>Full Name <span className="text-red-500">*</span></label>
                <input className={FIELD} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Dr. Amit Sharma" />
              </div>

              {/* Qualification */}
              <div className="sm:col-span-2">
                <label className={LABEL}>Qualification</label>
                <textarea
                  className={`${FIELD} resize-none`}
                  rows={3}
                  value={form.qualification || ''}
                  onChange={e => set('qualification', e.target.value)}
                  placeholder="e.g. B.Com (2016), CA, AIR 1 – CA Final, MBA (Harvard)..."
                />
              </div>

              {/* Association with MCC */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className={LABEL + ' mb-0'}>Association with MCC</label>
                  <button
                    type="button"
                    onClick={addMccEntry}
                    className="flex items-center gap-1 text-xs font-bold text-[#123B6D] hover:bg-[#123B6D]/10 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus size={13} /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {mccEntries.length === 0 && (
                    <p className="text-xs text-gray-400 italic py-2">No association added yet. Click "+ Add" to add education at MCC.</p>
                  )}
                  {mccEntries.map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-blue-50/50 border border-blue-100 rounded-xl p-2.5">
                      <select
                        className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#123B6D] transition-all"
                        value={entry.programme}
                        onChange={e => updateMccEntry(idx, 'programme', e.target.value)}
                      >
                        {ALL_PROGRAMMES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <input
                        type="text"
                        className="w-24 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:border-[#123B6D] transition-all"
                        placeholder="Year"
                        value={entry.batch}
                        maxLength={4}
                        onChange={e => updateMccEntry(idx, 'batch', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeMccEntry(idx)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {mccEntries.length > 0 && (
                    <p className="text-[11px] text-gray-400 mt-1">Preview: <span className="font-medium text-gray-600">{mccEntries.filter(e => e.programme).map(e => e.batch ? `${e.programme} (${e.batch})` : e.programme).join(', ')}</span></p>
                  )}
                </div>
              </div>

              {/* Designation */}
              <div>
                <label className={LABEL}>Designation</label>
                <input className={FIELD} value={form.designation || ''} onChange={e => set('designation', e.target.value)} placeholder="e.g. Senior Analyst" />
              </div>

              {/* Company */}
              <div>
                <label className={LABEL}>Company / Organisation</label>
                <input className={FIELD} value={form.company_name || ''} onChange={e => set('company_name', e.target.value)} placeholder="e.g. Deloitte India" />
              </div>

              {/* Achievements */}
              <div className="sm:col-span-2">
                <label className={LABEL}>Achievements</label>
                <input className={FIELD} value={form.achieved || ''} onChange={e => set('achieved', e.target.value)} placeholder="e.g. AIR 1 – CA Final, AIR 3 – CS" />
              </div>

              {/* LinkedIn */}
              <div className="sm:col-span-2">
                <label className={LABEL}><Link2 size={14} className="inline mr-1" />LinkedIn Profile URL</label>
                <input className={FIELD} value={form.linkedin_link || ''} onChange={e => set('linkedin_link', e.target.value)} placeholder="https://linkedin.com/in/..." type="url" />
              </div>

              {/* Testimonial */}
              <div className="sm:col-span-2">
                <label className={LABEL}>Testimonial / Quote</label>
                <textarea className={`${FIELD} resize-none`} rows={5} value={form.testimonial || ''}
                  onChange={e => set('testimonial', e.target.value)}
                  placeholder="Write their message about MCC..." />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <div>
              {!isNew && (
                <button onClick={handleDelete} disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors text-sm">
                  <Trash2 size={16} /> Delete Entry
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors text-sm">
                Cancel
              </button>
              <button onClick={handleSave} disabled={loading || uploadingImage}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#123B6D] text-white font-bold rounded-xl hover:bg-[#0d2a4f] disabled:opacity-50 transition-colors text-sm shadow-sm">
                <Save size={16} />
                {loading ? (uploadingImage ? 'Uploading...' : 'Saving...') : (isNew ? 'Add Alumni' : 'Save Changes')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
