'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, RefreshCw, AlertCircle, Search, LayoutDashboard, Eye, Edit2 } from 'lucide-react';
import WallOfFameEditor, { WallOfFameItem } from './WallOfFameEditor';

export default function WallOfFameManager() {
  const [items, setItems] = useState<WallOfFameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<WallOfFameItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('mcc_wall_of_fame')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setItems(data || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: WallOfFameItem) => {
    setEditingItem(item);
    setIsCreatingNew(false);
  };

  const handleAddNew = () => {
    setEditingItem({
      id: '',
      student_name: '',
      description: '',
      category: 'Professional Courses',
      image_url: '',
      expiry_date: null
    });
    setIsCreatingNew(true);
  };

  const handleEditorClose = () => {
    setEditingItem(null);
    fetchItems();
  };

  if (editingItem) {
    return (
      <WallOfFameEditor
        item={editingItem}
        isNew={isCreatingNew}
        onClose={handleEditorClose}
      />
    );
  }

  const filtered = items.filter(p => {
    const matchSearch = p.student_name?.toLowerCase().includes(search.toLowerCase()) || 
                        p.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'All' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  const categories = ['All', 'Professional Courses', 'Culturals', 'Sports', 'Research', 'Entrepreneurship', 'Academics'];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Wall of Fame Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage student achievements, category, images, and expiry dates.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleAddNew}
            className="flex items-center gap-2 bg-[#123B6D] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm">
            <Plus size={16} /> Add Achievement
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[200px] max-w-xs">
          <Search size={16} className="text-gray-400" />
          <input
            type="text" placeholder="Search achievements..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
        <div className="flex gap-1.5 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterCategory === cat ? 'bg-[#123B6D] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 text-sm">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <RefreshCw className="animate-spin mr-2" size={20} /> Loading Wall of Fame data...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400 bg-white border border-gray-100 rounded-2xl">
          <LayoutDashboard size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No achievements found.</p>
          {items.length === 0 && (
            <p className="text-sm mt-1 text-amber-600">Please run the SQL script to create the table and then add an entry.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#123B6D]/30 hover:shadow-md transition-all group flex flex-col">
              <div className="relative aspect-[4/3] bg-gray-100 w-full">
                {item.image_url ? (
                  <img src={item.image_url} alt="Achievement" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">No Image</div>
                )}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-[#123B6D]">
                  {item.category}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-800 text-sm leading-snug mb-1 line-clamp-1">{item.student_name || 'No Name'}</h3>
                <p className="text-xs text-gray-500 mb-3 flex-1 line-clamp-2">{item.description || 'No description provided.'}</p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-[10px] font-bold text-gray-400">
                    Expires: {item.expiry_date ? item.expiry_date : 'Never'}
                  </span>
                  <button onClick={() => handleEdit(item)}
                    className="p-1.5 bg-[#F0F5FF] hover:bg-[#123B6D] text-[#123B6D] hover:text-white rounded-lg transition-colors">
                    <Edit2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
