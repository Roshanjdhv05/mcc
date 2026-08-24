'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Upload, X, Image as ImageIcon, Calendar, Trash2, RefreshCw,
  AlertCircle, Eye, LinkIcon, Pencil, Save, Loader2, CheckSquare, Square
} from 'lucide-react';
import { processFileForUpload } from '@/lib/fileUtils';

interface HomeBanner {
  id: string;
  title: string | null;
  short_info: string | null;
  image_url: string;
  expiry_date: string | null;
  button_text: string | null;
  button_link: string | null;
  keep_black_overlay: boolean;
  created_at: string;
}

export default function HomeBannerManager() {
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('manage');
  const [banners, setBanners] = useState<HomeBanner[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload form state
  const [title, setTitle] = useState('');
  const [shortInfo, setShortInfo] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [expiryDate, setExpiryDate] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [keepBlackOverlay, setKeepBlackOverlay] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Edit modal state
  const [editingBanner, setEditingBanner] = useState<HomeBanner | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editShortInfo, setEditShortInfo] = useState('');
  const [editExpiryDate, setEditExpiryDate] = useState('');
  const [editButtonText, setEditButtonText] = useState('');
  const [editButtonLink, setEditButtonLink] = useState('');
  const [editOverlay, setEditOverlay] = useState(true);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState('');

  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('home_banners')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setBanners(data as HomeBanner[]);
    if (error) console.error('Error fetching banners:', error);
    setLoading(false);
  };

  useEffect(() => { fetchBanners(); }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        const processedFile = await processFileForUpload(e.target.files[0]);
        setFile(processedFile);
        setError('');
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      setFile(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccessMsg('');
    if (!file) { setError('Please select an image to upload.'); return; }
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('notice-attachments').upload(`banners/${fileName}`, file, { cacheControl: '31536000', upsert: false });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage
        .from('notice-attachments').getPublicUrl(`banners/${fileName}`);

      const { error: dbError } = await supabase.from('home_banners').insert({
        title: title.trim() || '',
        short_info: shortInfo.trim() || '',
        image_url: urlData.publicUrl,
        expiry_date: expiryDate ? new Date(expiryDate).toISOString() : null,
        button_text: buttonText.trim() || null,
        button_link: buttonLink.trim() || null,
        keep_black_overlay: keepBlackOverlay,
      });
      if (dbError) throw dbError;

      setTitle(''); setShortInfo(''); setFile(null); setExpiryDate('');
      setButtonText(''); setButtonLink(''); setKeepBlackOverlay(true);
      setSuccessMsg('Banner uploaded successfully!');
      fetchBanners();
      setTimeout(() => { setSuccessMsg(''); setActiveTab('manage'); }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    try {
      const pathParts = fileUrl.split('/notice-attachments/');
      if (pathParts.length === 2) {
        await supabase.storage.from('notice-attachments').remove([pathParts[1]]);
      }
      const { error } = await supabase.from('home_banners').delete().eq('id', id);
      if (error) throw error;
      setBanners(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const openEdit = (banner: HomeBanner) => {
    setEditingBanner(banner);
    setEditTitle(banner.title || '');
    setEditShortInfo(banner.short_info || '');
    setEditExpiryDate(
      banner.expiry_date
        ? new Date(banner.expiry_date).toISOString().slice(0, 16)
        : ''
    );
    setEditButtonText(banner.button_text || '');
    setEditButtonLink(banner.button_link || '');
    setEditOverlay(banner.keep_black_overlay);
    setEditError('');
  };

  const handleEditSave = async () => {
    if (!editingBanner) return;
    setEditSaving(true); setEditError('');
    const { error } = await supabase
      .from('home_banners')
      .update({
        title: editTitle.trim() || '',
        short_info: editShortInfo.trim() || '',
        expiry_date: editExpiryDate ? new Date(editExpiryDate).toISOString() : null,
        button_text: editButtonText.trim() || null,
        button_link: editButtonLink.trim() || null,
        keep_black_overlay: editOverlay,
      })
      .eq('id', editingBanner.id);

    if (error) {
      setEditError(error.message);
    } else {
      setEditingBanner(null);
      fetchBanners();
    }
    setEditSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Homepage Banners</h2>
          <p className="text-sm text-gray-500">Manage the hero banners displayed on the main homepage.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'manage' ? 'bg-white text-[#123B6D] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Manage Banners
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'upload' ? 'bg-[#123B6D] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Add New Banner
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-medium border border-emerald-100 flex items-center gap-2">
          <AlertCircle size={16} /> {successMsg}
        </div>
      )}

      {/* ── UPLOAD FORM ── */}
      {activeTab === 'upload' && (
        <form onSubmit={handleUpload} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            {/* Image Upload Area */}
            <div>
              <label className="block text-sm font-semibold text-[#1E293B] mb-2">Banner Image (Required)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-gray-50 hover:bg-gray-100 transition-colors text-center relative group">
                <input
                  type="file" accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-[#123B6D]">
                    <Upload size={24} />
                  </div>
                  {file ? (
                    <div className="text-[#123B6D] font-bold">
                      {file.name}
                      <p className="text-xs text-gray-500 font-normal mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[#1E293B] font-bold">Click or drag image to upload</p>
                      <p className="text-xs text-gray-500 mt-1">Recommended: 1920×1080px (JPG, PNG, WEBP)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Content */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">Heading (Title) <span className="text-xs font-normal text-gray-500">(Optional)</span></label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., Admissions Open 2026"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">Short Information <span className="text-xs font-normal text-gray-500">(Optional)</span></label>
                  <textarea rows={3} value={shortInfo} onChange={e => setShortInfo(e.target.value)}
                    placeholder="e.g., Join the leading commerce college in Mumbai..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] transition-all resize-none" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#1E293B] mb-3 cursor-pointer">
                    <input type="checkbox" checked={keepBlackOverlay} onChange={e => setKeepBlackOverlay(e.target.checked)} className="w-4 h-4 rounded text-[#123B6D]" />
                    Keep Dark Overlay Effect (Improves text readability)
                  </label>
                </div>
              </div>

              {/* Right: Button & Expiry */}
              <div className="space-y-5 bg-blue-50/30 p-5 rounded-2xl border border-blue-100/50 h-fit">
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" /> Expiry Date (Optional)
                  </label>
                  <input type="datetime-local" value={expiryDate} onChange={e => setExpiryDate(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]" />
                  <p className="text-xs text-gray-500 mt-1.5">Banner will automatically hide after this date.</p>
                </div>
                <hr className="border-blue-100" />
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">Button Text (Optional)</label>
                  <input type="text" value={buttonText} onChange={e => setButtonText(e.target.value)}
                    placeholder="e.g., Apply Now"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2 flex items-center gap-2">
                    <LinkIcon size={16} className="text-blue-600" /> Button Link (Optional)
                  </label>
                  <input type="text" value={buttonLink} onChange={e => setButtonLink(e.target.value)}
                    placeholder="e.g., /admissions or https://..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]" />
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="text-gray-500">Quick Links:</span>
                    {['/examination', '/programmes/ug', '/notices'].map(l => (
                      <button key={l} type="button" onClick={() => setButtonLink(l)} className="text-[#123B6D] hover:underline">{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button type="button" onClick={() => setActiveTab('manage')} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-all">Cancel</button>
            <button type="submit" disabled={uploading} className="bg-[#123B6D] hover:bg-blue-800 text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2">
              {uploading ? 'Uploading...' : 'Publish Banner'}
            </button>
          </div>
        </form>
      )}

      {/* ── MANAGE LIST ── */}
      {activeTab === 'manage' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-900">Manage Banners</h3>
            <button onClick={fetchBanners} className="text-gray-500 hover:text-[#123B6D] transition-colors p-2 rounded-lg hover:bg-blue-50">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Default pinned */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50/30">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-200 border border-gray-300">
                  <img src="/banner1.png" alt="Default" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Welcome to Mulund College of Commerce</h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-[#123B6D] bg-blue-100 px-2 py-0.5 rounded border border-blue-200">Default (Pinned)</span>
                    <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Always Active</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">This is the default welcome banner — it always appears first and cannot be deleted.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href="/banner1.png" target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-[#123B6D] hover:bg-blue-50 rounded-lg transition-all" title="View Image">
                  <Eye size={18} />
                </a>
                <div className="p-2 text-gray-200 cursor-not-allowed" title="Cannot delete default banner">
                  <Trash2 size={18} />
                </div>
              </div>
            </div>

            {/* DB banners */}
            {loading ? (
              <div className="py-16 flex justify-center text-gray-400">Loading banners...</div>
            ) : banners.length === 0 ? (
              <div className="py-10 text-center text-gray-400">
                <ImageIcon size={40} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">No additional banners uploaded yet.</p>
              </div>
            ) : (
              banners.map(banner => {
                const isExpired = banner.expiry_date && new Date(banner.expiry_date) < new Date();
                return (
                  <div key={banner.id} className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors group ${isExpired ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-200 border border-gray-300 relative">
                        <img src={banner.image_url} alt={banner.title || 'Banner'} className="w-full h-full object-cover" />
                        {!banner.keep_black_overlay && (
                          <div className="absolute top-1 left-1 bg-white/90 text-xs px-1 rounded shadow-sm text-gray-600">No Overlay</div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{banner.title || <span className="text-gray-400 font-normal italic">No Title (Image Only)</span>}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {isExpired ? (
                            <span className="font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">Expired</span>
                          ) : (
                            <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Active</span>
                          )}
                          {banner.expiry_date && (
                            <span className="text-gray-500 flex items-center gap-1">
                              <Calendar size={12} /> Expires: {new Date(banner.expiry_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {banner.button_text ? (
                          <div className="mt-1.5 text-xs text-gray-500">
                            Button: <span className="font-medium text-[#123B6D]">{banner.button_text}</span> → {banner.button_link}
                          </div>
                        ) : (
                          <div className="mt-1.5 text-xs text-gray-400 italic">No button</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a href={banner.image_url} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-[#123B6D] hover:bg-blue-50 rounded-lg transition-all" title="View Image">
                        <Eye size={18} />
                      </a>
                      <button onClick={() => openEdit(banner)} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Edit Banner">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(banner.id, banner.image_url)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editingBanner && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditingBanner(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl z-10 my-6">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Edit Banner</h2>
                <p className="text-xs text-gray-400 mt-0.5">Update details — image cannot be changed here.</p>
              </div>
              <button onClick={() => setEditingBanner(null)} className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-5">
              {/* Preview */}
              <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                <img src={editingBanner.image_url} alt="" className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-black/40 flex items-end p-4 ${editOverlay ? '' : 'opacity-0'}`}>
                  <p className="text-white font-bold text-sm truncate">{editTitle || <span className="italic opacity-60">No Title</span>}</p>
                </div>
              </div>

              {editError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                  <AlertCircle size={15} /> {editError}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Heading (Title) <span className="text-xs font-normal text-gray-500">(Optional)</span></label>
                <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)}
                  placeholder="e.g., Admissions Open 2026"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]" />
              </div>

              {/* Short Info */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Short Information <span className="text-xs font-normal text-gray-500">(Optional)</span></label>
                <textarea rows={2} value={editShortInfo} onChange={e => setEditShortInfo(e.target.value)}
                  placeholder="e.g., Join the leading commerce college in Mumbai..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] resize-none" />
              </div>

              {/* Overlay toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <button type="button" onClick={() => setEditOverlay(v => !v)} className="flex-shrink-0">
                  {editOverlay ? <CheckSquare size={20} className="text-[#123B6D]" /> : <Square size={20} className="text-gray-400" />}
                </button>
                <span className="text-sm font-semibold text-gray-700">Keep Dark Overlay Effect</span>
              </label>

              {/* Expiry */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                  <Calendar size={14} className="text-blue-500" /> Expiry Date
                </label>
                <div className="flex gap-2">
                  <input type="datetime-local" value={editExpiryDate} onChange={e => setEditExpiryDate(e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]" />
                  {editExpiryDate && (
                    <button type="button" onClick={() => setEditExpiryDate('')}
                      className="px-3 py-2 rounded-xl border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-50 transition-colors">
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Button section */}
              <div className="rounded-2xl border border-blue-100 overflow-hidden">
                <div className="bg-blue-50/50 px-4 py-3 flex items-center justify-between border-b border-blue-100">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-700">Button Settings</p>
                    {editButtonText ? (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Active</span>
                    ) : (
                      <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">No Button</span>
                    )}
                  </div>
                  {/* Always-visible Remove Button */}
                  <button
                    type="button"
                    onClick={() => { setEditButtonText(''); setEditButtonLink(''); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    <X size={13} /> Remove Button
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Button Text <span className="font-normal text-gray-400">(leave blank to hide button on homepage)</span>
                    </label>
                    <input type="text" value={editButtonText} onChange={e => setEditButtonText(e.target.value)}
                      placeholder="e.g., Apply Now"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                      <LinkIcon size={12} /> Button Link
                    </label>
                    <input type="text" value={editButtonLink} onChange={e => setEditButtonLink(e.target.value)}
                      placeholder="e.g., /admissions or https://..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white" />
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="text-gray-400">Quick:</span>
                      {['/examination', '/programmes/ug', '/notices'].map(l => (
                        <button key={l} type="button" onClick={() => setEditButtonLink(l)} className="text-[#123B6D] hover:underline">{l}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-6 py-5 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
              <button onClick={() => setEditingBanner(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button onClick={handleEditSave} disabled={editSaving}
                className="flex-1 py-2.5 bg-[#123B6D] text-white rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {editSaving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
