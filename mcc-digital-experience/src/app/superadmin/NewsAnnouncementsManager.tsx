'use client';
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Archive, Trash2, Calendar, Loader2, Save, X, RefreshCw } from 'lucide-react';

type NewsItem = {
  id: string;
  content: string;
  expiry_date: string;
  is_archived: boolean;
  created_at: string;
};

export default function NewsAnnouncementsManager() {
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [content, setContent] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [saving, setSaving] = useState(false);
  const isSavingRef = useRef(false); // instant lock to prevent double-submit

  const fetchNews = async () => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    
    let query = supabase.from('mcc_news_announcements').select('*').order('created_at', { ascending: false });
    
    if (activeTab === 'active') {
      query = query.eq('is_archived', false).gte('expiry_date', today);
    } else {
      // Archived means manually archived OR expired
      query = query.or(`is_archived.eq.true,expiry_date.lt.${today}`);
    }

    const { data, error } = await query;
    if (!error && data) {
      setNews(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [activeTab]);

  const handleSave = async () => {
    if (isSavingRef.current) return; // block double-click immediately
    if (!content.trim() || !expiryDate) {
      alert('Please fill out all fields.');
      return;
    }
    if (content.length > 350) {
      alert('Content exceeds 350 characters.');
      return;
    }

    isSavingRef.current = true;
    setSaving(true);
    const { error } = await supabase.from('mcc_news_announcements').insert([{
      content: content.trim(),
      expiry_date: expiryDate
    }]);

    isSavingRef.current = false;
    setSaving(false);
    if (!error) {
      setShowForm(false);
      setContent('');
      setExpiryDate('');
      fetchNews();
    } else {
      alert('Failed to save announcement: ' + error.message);
    }
  };

  const handleArchive = async (id: string) => {
    if (!window.confirm('Archive this announcement?')) return;
    const { error } = await supabase.from('mcc_news_announcements').update({ is_archived: true }).eq('id', id);
    if (!error) fetchNews();
    else alert('Failed to archive: ' + error.message);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this announcement permanently?')) return;
    const { error } = await supabase.from('mcc_news_announcements').delete().eq('id', id);
    if (!error) fetchNews();
    else alert('Failed to delete: ' + error.message);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#123B6D]">News & Announcements</h2>
          <p className="text-sm text-gray-500 mt-1">Manage the scrolling marquee on the home page</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#123B6D] text-white rounded-xl text-sm font-bold hover:bg-[#0d2a4f] transition-colors"
        >
          <Plus size={16} /> New Announcement
        </button>
      </div>

      {showForm && (
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#123B6D]">Add Announcement</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-gray-700 mb-1">Content (Max 350 chars)</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={350}
                rows={3}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] outline-none transition-all resize-none"
                placeholder="Enter the announcement text here..."
              />
              <div className="text-right text-xs text-gray-400 mt-1">{content.length}/350</div>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] outline-none transition-all"
              />
              
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#123B6D] text-white rounded-xl text-sm font-bold hover:bg-[#0d2a4f] disabled:opacity-50 transition-colors"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl w-fit mb-6 border border-gray-200">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${
            activeTab === 'active' ? 'bg-white text-[#123B6D] shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab('archived')}
          className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${
            activeTab === 'archived' ? 'bg-white text-[#123B6D] shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Archived
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 text-[#123B6D] animate-spin" /></div>
        ) : news.length === 0 ? (
          <div className="py-12 text-center bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-gray-500 font-medium">No {activeTab} announcements found.</p>
          </div>
        ) : (
          news.map((item) => (
            <div key={item.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-white flex flex-col md:flex-row gap-4 justify-between items-start md:items-center group">
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">{item.content}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 font-semibold">
                  <span className="flex items-center gap-1"><Calendar size={14} /> Expiring: {new Date(item.expiry_date).toLocaleDateString('en-GB')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0">
                {activeTab === 'active' && (
                  <button onClick={() => handleArchive(item.id)} className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Move to Archive">
                    <Archive size={16} />
                  </button>
                )}
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
