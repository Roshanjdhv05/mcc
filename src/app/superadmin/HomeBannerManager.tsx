'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Upload, X, Image as ImageIcon, Calendar, Trash2, RefreshCw, AlertCircle, Plus, Eye, Link as LinkIcon
} from 'lucide-react';

interface HomeBanner {
  id: string;
  title: string;
  short_info: string;
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

  // Form state
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
  
  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('home_banners')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setBanners(data as HomeBanner[]);
    if (error) console.error("Error fetching banners:", error);
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] || null;
    setFile(picked);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    if (!file || !title) {
      setError('Please select an image and enter a title.');
      return;
    }

    setUploading(true);

    try {
      // 1. Upload File
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('notice-attachments')
        .upload(`banners/${fileName}`, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('notice-attachments')
        .getPublicUrl(`banners/${fileName}`);
        
      const fileUrl = urlData.publicUrl;

      // 2. Insert to DB
      const { error: dbError } = await supabase
        .from('home_banners')
        .insert({
          title: title.trim(),
          short_info: shortInfo.trim() || null,
          image_url: fileUrl,
          expiry_date: expiryDate ? new Date(expiryDate).toISOString() : null,
          button_text: buttonText.trim() || null,
          button_link: buttonLink.trim() || null,
          keep_black_overlay: keepBlackOverlay
        });

      if (dbError) throw dbError;

      // Reset form
      setTitle('');
      setShortInfo('');
      setFile(null);
      setExpiryDate('');
      setButtonText('');
      setButtonLink('');
      setKeepBlackOverlay(true);
      
      setSuccessMsg('Banner uploaded successfully!');
      fetchBanners();
      setTimeout(() => {
        setSuccessMsg('');
        setActiveTab('manage');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    
    try {
      // Extract file path from URL
      const pathParts = fileUrl.split('/notice-attachments/');
      if (pathParts.length === 2) {
        const filePath = pathParts[1];
        await supabase.storage.from('notice-attachments').remove([filePath]);
      }
      
      const { error } = await supabase.from('home_banners').delete().eq('id', id);
      if (error) throw error;
      
      setBanners(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      alert('Failed to delete: ' + err.message);
    }
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

      {activeTab === 'upload' && (
        <form onSubmit={handleUpload} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Image Upload Area */}
            <div>
              <label className="block text-sm font-semibold text-[#1E293B] mb-2">Banner Image (Required)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-gray-50 hover:bg-gray-100 transition-colors text-center relative group">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
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
                      <p className="text-xs text-gray-500 font-normal mt-1">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[#1E293B] font-bold">Click or drag image to upload</p>
                      <p className="text-xs text-gray-500 mt-1">Recommended dimensions: 1920x1080px (JPG, PNG, WEBP)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Content */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">Heading (Title) *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., Admissions Open 2026"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">Short Information</label>
                  <textarea
                    rows={3}
                    value={shortInfo}
                    onChange={e => setShortInfo(e.target.value)}
                    placeholder="e.g., Join the leading commerce college in Mumbai..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] transition-all resize-none"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#1E293B] mb-3 cursor-pointer">
                    <input type="checkbox" checked={keepBlackOverlay} onChange={e => setKeepBlackOverlay(e.target.checked)} className="w-4 h-4 rounded text-[#123B6D]" />
                    Keep Dark Overlay Effect (Improves text readability)
                  </label>
                </div>
              </div>

              {/* Right Column: Button & Expiry */}
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
                  <input
                    type="text"
                    value={buttonText}
                    onChange={e => setButtonText(e.target.value)}
                    placeholder="e.g., Apply Now"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2 flex items-center gap-2">
                    <LinkIcon size={16} className="text-blue-600" /> Button Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={buttonLink}
                    onChange={e => setButtonLink(e.target.value)}
                    placeholder="e.g., /admissions or https://..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
                  />
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="text-gray-500">Quick Links:</span>
                    <button type="button" onClick={() => setButtonLink('/admissions')} className="text-[#123B6D] hover:underline">/admissions</button>
                    <button type="button" onClick={() => setButtonLink('/examination')} className="text-[#123B6D] hover:underline">/examination</button>
                    <button type="button" onClick={() => setButtonLink('/programmes/ug')} className="text-[#123B6D] hover:underline">/programmes/ug</button>
                    <button type="button" onClick={() => setButtonLink('/notices')} className="text-[#123B6D] hover:underline">/notices</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button type="button" onClick={() => setActiveTab('manage')} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={uploading} className="bg-[#123B6D] hover:bg-blue-800 text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2">
              {uploading ? 'Uploading...' : 'Publish Banner'}
            </button>
          </div>
        </form>
      )}

      {activeTab === 'manage' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-900">Manage Banners</h3>
            <button onClick={fetchBanners} className="text-gray-500 hover:text-[#123B6D] transition-colors p-2 rounded-lg hover:bg-blue-50">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Default pinned banner — always shown first, cannot be deleted */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50/30">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-200 border border-gray-300">
                  <img src="/banner1.png" alt="Default Welcome Banner" className="w-full h-full object-cover" />
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
                        <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
                        {!banner.keep_black_overlay && (
                          <div className="absolute top-1 left-1 bg-white/90 text-xs px-1 rounded shadow-sm text-gray-600">No Overlay</div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{banner.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {isExpired ? (
                            <span className="font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">Expired</span>
                          ) : (
                            <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Active</span>
                          )}
                          {banner.expiry_date && (
                            <span className="text-gray-500 flex items-center gap-1">
                              <Calendar size={12} />
                              Expires: {new Date(banner.expiry_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {banner.button_text && (
                          <div className="mt-2 text-xs text-gray-500">
                            Button: <span className="font-medium text-[#123B6D]">{banner.button_text}</span> &rarr; {banner.button_link}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a href={banner.image_url} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-[#123B6D] hover:bg-blue-50 rounded-lg transition-all" title="View Image">
                        <Eye size={18} />
                      </a>
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
    </div>
  );
}
