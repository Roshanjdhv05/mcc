'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Save, AlertCircle, Image as ImageIcon, Crop, Trash2, Link2 } from 'lucide-react';
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
}

interface EditorProps {
  item: AlumniItem;
  isNew: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const FIELD = 'px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] outline-none transition-all';
const LABEL = 'block text-sm font-bold text-gray-700 mb-1.5';

const HSC_COURSES = ['HSC – Science', 'HSC – Commerce', 'HSC – Arts'];

const UG_COURSES = [
  'B.Com',
  'B.Com (Accounting & Finance)',
  'B.Com (Financial Markets)',
  'B.Com (Business Administration)',
  'B.Com BFSI',
  'B.Sc (Computer Science)',
  'B.Sc (Information Technology)',
  'B.Sc (Computer Applications)',
  'B.Sc (Data Science)',
  'BA (Multimedia & Mass Communication)',
];

const PG_COURSES = [
  'M.Com (Advanced Accountancy)',
  'M.Com (Business Management)',
  'M.Com (Banking & Finance)',
  'M.Sc (Information Technology)',
  'M.Sc (Finance)',
  'Ph.D in Business Economics',
];

export default function IllustriousAlumniEditor({ item, isNew, onClose, onSaved }: EditorProps) {
  const [form, setForm] = useState<AlumniItem>(item);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!form.name.trim()) throw new Error('Name is required.');
      if (!imageFile && !form.image_url) throw new Error('Please upload an image.');

      const imageUrl = await uploadImage();
      const selectedCourses = [];
      if (typeof form.ug === 'string' && form.ug) selectedCourses.push(form.ug);
      if (typeof form.pg === 'string' && form.pg) selectedCourses.push(form.pg);

      const payload = {
        name: form.name,
        image_url: imageUrl,
        hsc: !!form.hsc,
        ug: !!form.ug,
        pg: !!form.pg,
        hsc_passout_year: form.hsc_passout_year || null,
        ug_passout_year: form.ug_passout_year || null,
        pg_passout_year: form.pg_passout_year || null,
        course: selectedCourses.length > 0 ? selectedCourses.join(', ') : (form.course || null),
        year_passout: form.year_passout || null,
        company_name: form.company_name || null,
        designation: form.designation || null,
        linkedin_link: form.linkedin_link || null,
        achieved: form.achieved || null,
        testimonial: form.testimonial || null,
        show_on_home: form.show_on_home,
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

              {/* Education checkboxes + course + year */}
              <div className="sm:col-span-2">
                <label className={LABEL}>Education at MCC</label>

                {/* HSC */}
                <div className="mb-4 p-3 bg-orange-50/60 border border-orange-100 rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input type="checkbox" checked={!!form.hsc}
                      onChange={e => set('hsc', e.target.checked)}
                      className="w-4 h-4 rounded accent-[#123B6D]" />
                    <span className="text-sm font-bold text-gray-700">HSC</span>
                  </label>
                  {!!form.hsc && (
                    <div className="mt-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1">Passout Year</label>
                      <input className={FIELD} value={form.hsc_passout_year || ''}
                        onChange={e => set('hsc_passout_year', e.target.value)}
                        placeholder="e.g. 2018" maxLength={4} />
                    </div>
                  )}
                </div>

                {/* UG */}
                <div className="mb-4 p-3 bg-blue-50/60 border border-blue-100 rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input type="checkbox" checked={!!form.ug}
                      onChange={e => set('ug', e.target.checked ? UG_COURSES[0] : '')}
                      className="w-4 h-4 rounded accent-[#123B6D]" />
                    <span className="text-sm font-bold text-gray-700">UG (Under Graduate)</span>
                  </label>
                  {!!form.ug && (
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">UG Course</label>
                        <select className={FIELD} value={form.ug as string}
                          onChange={e => set('ug', e.target.value)}>
                          {UG_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Passout Year</label>
                        <input className={FIELD} value={form.ug_passout_year || ''}
                          onChange={e => set('ug_passout_year', e.target.value)}
                          placeholder="e.g. 2021" maxLength={4} />
                      </div>
                    </div>
                  )}
                </div>

                {/* PG */}
                <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input type="checkbox" checked={!!form.pg}
                      onChange={e => set('pg', e.target.checked ? PG_COURSES[0] : '')}
                      className="w-4 h-4 rounded accent-[#123B6D]" />
                    <span className="text-sm font-bold text-gray-700">PG (Post Graduate)</span>
                  </label>
                  {!!form.pg && (
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">PG Course</label>
                        <select className={FIELD} value={form.pg as string}
                          onChange={e => set('pg', e.target.value)}>
                          {PG_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Passout Year</label>
                        <input className={FIELD} value={form.pg_passout_year || ''}
                          onChange={e => set('pg_passout_year', e.target.value)}
                          placeholder="e.g. 2023" maxLength={4} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Year Passout — only show when at least one level is selected */}
              {(!!form.hsc || !!form.ug || !!form.pg) && (
                <div>
                  <label className={LABEL}>Year of Passout <span className="text-gray-400 font-normal text-xs">(overall / general)</span></label>
                  <input className={FIELD} value={form.year_passout || ''} onChange={e => set('year_passout', e.target.value)} placeholder="e.g. 2018" />
                </div>
              )}

              {/* Company */}
              <div>
                <label className={LABEL}>Company / Organisation</label>
                <input className={FIELD} value={form.company_name || ''} onChange={e => set('company_name', e.target.value)} placeholder="e.g. Deloitte India" />
              </div>

              {/* Designation */}
              <div>
                <label className={LABEL}>Designation / Role</label>
                <input className={FIELD} value={form.designation || ''} onChange={e => set('designation', e.target.value)} placeholder="e.g. Senior Analyst" />
              </div>

              {/* Achieved */}
              <div className="sm:col-span-2">
                <label className={LABEL}>Achievement / Highlight</label>
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
