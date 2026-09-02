'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { processFileForUpload } from '@/lib/fileUtils';

export default function EndowmentEditor({ item, isNew, onClose }: { item: any, isNew: boolean, onClose: () => void }) {
  const [formData, setFormData] = useState(item);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [actionMsg, setActionMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const showMsg = (type: 'success' | 'error', text: string) => {
    setActionMsg({ type, text });
    setTimeout(() => setActionMsg(null), 3000);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const pFile = await processFileForUpload(file);
      const ext = pFile.name.split('.').pop();
      const fn = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
      const { error, data } = await supabase.storage.from('mcc-images').upload(`scholarships/${fn}`, pFile);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('mcc-images').getPublicUrl(`scholarships/${fn}`);
      setFormData({ ...formData, banner_image: publicUrl });
    } catch (e: any) {
      showMsg('error', e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name?.trim() || !formData.slug?.trim()) {
      showMsg('error', 'Name and Slug are required.');
      return;
    }
    setSaving(true);
    const payload = {
      ...formData,
      updated_at: new Date().toISOString(),
    };

    const { error } = isNew
      ? await supabase.from('endowment_scholarships').insert([payload])
      : await supabase.from('endowment_scholarships').update(payload).eq('id', item.id);

    if (error) showMsg('error', error.message);
    else {
      showMsg('success', isNew ? 'Scholarship created!' : 'Changes saved!');
      setTimeout(onClose, 1000);
    }
    setSaving(false);
  };

  const labelClass = "block text-xs font-bold text-gray-700 mb-1.5";
  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] transition-all";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft size={18} className="text-gray-500" />
          </button>
          <div>
            <h2 className="text-base font-bold text-gray-900">{isNew ? 'Add New Scholarship' : `Editing: ${formData.name}`}</h2>
            <p className="text-xs text-gray-400">Endowment and Scholarship</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving || uploading}
          className="flex items-center gap-2 bg-[#123B6D] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm disabled:opacity-60">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save Changes
        </button>
      </div>

      {actionMsg && (
        <div className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 border ${actionMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {actionMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {actionMsg.text}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[#123B6D] mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Name *</label>
            <input type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="Scholarship Name" />
          </div>
          <div>
            <label className={labelClass}>URL Slug *</label>
            <input type="text" value={formData.slug || ''} onChange={e => setFormData({ ...formData, slug: e.target.value })} className={inputClass} placeholder="e.g. ad-oak-scholarship" />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select value={formData.status || 'Active'} onChange={e => setFormData({ ...formData, status: e.target.value })} className={inputClass}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Display Order</label>
            <input type="number" value={formData.display_order || 0} onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[#123B6D] mb-4">Banner Image</h3>
        <div className="flex gap-6 items-start">
          <div className="w-full md:w-1/2">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#123B6D] hover:bg-gray-50 transition-colors cursor-pointer">
              <UploadCloud className="text-gray-400 mb-2" size={24} />
              <span className="text-sm font-semibold text-gray-600">Click to upload new banner</span>
              <span className="text-xs text-gray-400 mt-1">1920x400px recommended</span>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }} />
            </label>
          </div>
          <div className="w-full md:w-1/2">
            {formData.banner_image ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img src={formData.banner_image} alt="Banner" className="w-full h-40 object-cover" />
                <button onClick={() => setFormData({ ...formData, banner_image: '' })} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-600">Remove</button>
              </div>
            ) : (
              <div className="h-40 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 flex-col">
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <span className="text-sm">No banner image uploaded</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[#123B6D] mb-4">Content &amp; Details</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>About (Description)</label>
            <textarea value={formData.about || ''} onChange={e => setFormData({ ...formData, about: e.target.value })} className={inputClass} rows={4} placeholder="About this scholarship..." />
          </div>
          <div>
            <label className={labelClass}>Eligibility Criteria</label>
            <textarea value={formData.eligibility || ''} onChange={e => setFormData({ ...formData, eligibility: e.target.value })} className={inputClass} rows={3} placeholder="• Criteria 1..." />
          </div>
          <div>
            <label className={labelClass}>How to Apply</label>
            <textarea value={formData.how_to_apply || ''} onChange={e => setFormData({ ...formData, how_to_apply: e.target.value })} className={inputClass} rows={3} placeholder="Step by step process..." />
          </div>
          <div>
            <label className={labelClass}>Application Link / Portal (Optional)</label>
            <input type="text" value={formData.link || ''} onChange={e => setFormData({ ...formData, link: e.target.value })} className={inputClass} placeholder="https://..." />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[#123B6D] mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Contact Name</label>
            <input type="text" value={formData.contact_name || ''} onChange={e => setFormData({ ...formData, contact_name: e.target.value })} className={inputClass} placeholder="e.g. Scholarship Cell" />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input type="email" value={formData.contact_email || ''} onChange={e => setFormData({ ...formData, contact_email: e.target.value })} className={inputClass} placeholder="email@example.com" />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="text" value={formData.contact_phone || ''} onChange={e => setFormData({ ...formData, contact_phone: e.target.value })} className={inputClass} placeholder="e.g. +91 9876543210" />
          </div>
        </div>
      </div>
    </div>
  );
}
