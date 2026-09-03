'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Plus, Edit2, RefreshCw, AlertCircle, Users, LayoutDashboard, FileText,
  Search, LayoutGrid, List, Eye, EyeOff, BookOpen, Trophy, Shield
} from 'lucide-react';
import ResearchEditor from './ResearchEditor';

export type ResearchCategory = 'About & Committee' | 'Research Centre' | 'Policies' | 'Competitions' | 'Research Journal';

export interface ResearchItem {
  id: string;
  slug: string;
  name: string;
  category: ResearchCategory;
  status: 'Active' | 'Inactive';
  display_order: number;
}

const CATEGORIES = ['About & Committee', 'Research Centre', 'Policies', 'Competitions', 'Research Journal'] as const;

const CATEGORY_ICONS: Record<ResearchCategory, React.ReactNode> = {
  'About & Committee': <Users size={16} />,
  'Research Centre': <LayoutDashboard size={16} />,
  'Policies': <Shield size={16} />,
  'Competitions': <Trophy size={16} />,
  'Research Journal': <BookOpen size={16} />,
};

const CATEGORY_COLORS: Record<ResearchCategory, string> = {
  'About & Committee': 'bg-blue-50 text-blue-700 border-blue-200',
  'Research Centre': 'bg-purple-50 text-purple-700 border-purple-200',
  'Policies': 'bg-red-50 text-red-700 border-red-200',
  'Competitions': 'bg-amber-50 text-amber-700 border-amber-200',
  'Research Journal': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function ResearchManager({ canDelete }: { canDelete?: boolean }) {
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<ResearchItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const searchParams = useSearchParams();
  const [filterCategory, setFilterCategory] = useState<'ALL' | ResearchCategory>('ALL');

  useEffect(() => {
    const filter = searchParams?.get('filter');
    if (filter && CATEGORIES.includes(filter as any)) {
      setFilterCategory(filter as any);
    }
    fetchItems();
  }, [searchParams]);

  useEffect(() => {
    const editSlug = searchParams?.get('edit');
    if (editSlug && items.length > 0 && !editingItem) {
      const itemToEdit = items.find(i => i.slug === editSlug || i.id === editSlug);
      if (itemToEdit) {
        setEditingItem(itemToEdit);
        setIsCreatingNew(false);
      }
    }
  }, [items, searchParams, editingItem]);

  const updateUrlEditParam = (slug: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (slug) params.set('edit', slug);
    else params.delete('edit');
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const updateFilter = (cat: typeof filterCategory) => {
    setFilterCategory(cat);
    const params = new URLSearchParams(window.location.search);
    if (cat === 'ALL') params.delete('filter');
    else params.set('filter', cat);
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('mcc_research')
        .select('id, slug, name, category, status, display_order')
        .order('display_order', { ascending: true });
      if (err) throw err;
      setItems(data || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: ResearchItem) => {
    setEditingItem(item);
    setIsCreatingNew(false);
    updateUrlEditParam(item.slug || item.id);
  };

  const handleAddNew = () => {
    setEditingItem({
      id: '', slug: '', name: '', category: 'About & Committee',
      status: 'Active', display_order: items.length + 1,
    });
    setIsCreatingNew(true);
  };

  const handleEditorClose = () => {
    setEditingItem(null);
    updateUrlEditParam(null);
    fetchItems();
  };

  if (editingItem) {
    return (
      <ResearchEditor
        item={editingItem}
        isNew={isCreatingNew}
        onClose={handleEditorClose}
      />
    );
  }

  const filtered = items.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'ALL' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  const grouped = {
    'About & Committee': filtered.filter(p => p.category === 'About & Committee'),
    'Research Centre': filtered.filter(p => p.category === 'Research Centre'),
    'Policies': filtered.filter(p => p.category === 'Policies'),
    'Competitions': filtered.filter(p => p.category === 'Competitions'),
    'Research Journal': filtered.filter(p => p.category === 'Research Journal'),
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Research Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage pages for Research sections.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleAddNew}
            className="flex items-center gap-2 bg-[#123B6D] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm">
            <Plus size={16} /> Add New Entry
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[200px] max-w-xs">
          <Search size={16} className="text-gray-400" />
          <input
            type="text" placeholder="Search entries..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 bg-white border border-gray-200 rounded-xl p-1">
          {(['ALL', ...CATEGORIES] as const).map(cat => (
            <button key={cat} onClick={() => updateFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterCategory === cat ? 'bg-[#123B6D] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              {cat === 'ALL' ? 'All' : cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 ml-auto">
          <button onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#123B6D] text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
            <LayoutGrid size={16} />
          </button>
          <button onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#123B6D] text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
            <List size={16} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 text-sm">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <RefreshCw className="animate-spin mr-2" size={20} /> Loading research data...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <LayoutDashboard size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No entries found.</p>
          {items.length === 0 && (
            <p className="text-sm mt-1 text-amber-600">Please run the setup SQL script in your Supabase database first!</p>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {CATEGORIES.map(cat => (
            grouped[cat] && grouped[cat].length > 0 && (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${CATEGORY_COLORS[cat]}`}>
                    {CATEGORY_ICONS[cat]} {cat}
                  </span>
                  <span className="text-xs text-gray-400">({grouped[cat].length})</span>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {grouped[cat].map(item => (
                      <ItemCard key={item.id} item={item} onEdit={handleEdit} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
                    {grouped[cat].map(item => (
                      <ItemListRow key={item.id} item={item} onEdit={handleEdit} />
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

function ItemCard({ item, onEdit }: { item: ResearchItem; onEdit: (p: ResearchItem) => void }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#123B6D]/30 hover:shadow-md transition-all group flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] flex items-center justify-center text-[#123B6D]">
          {CATEGORY_ICONS[item.category]}
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {item.status === 'Active' ? <Eye size={10} className="inline mr-1" /> : <EyeOff size={10} className="inline mr-1" />}
            {item.status}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-[#123B6D] text-sm leading-snug mt-2">{item.name}</h3>
      </div>
      <button onClick={() => onEdit(item)}
        className="mt-1 w-full flex items-center justify-center gap-2 bg-[#F0F5FF] hover:bg-[#123B6D] text-[#123B6D] hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">
        <Edit2 size={13} /> Edit Details
      </button>
    </div>
  );
}

function ItemListRow({ item, onEdit }: { item: ResearchItem; onEdit: (p: ResearchItem) => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#EBF3FF] flex items-center justify-center text-[#123B6D]">
          {CATEGORY_ICONS[item.category]}
        </div>
        <div>
          <span className="font-semibold text-sm text-gray-800">{item.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {item.status}
        </span>
        <button onClick={() => onEdit(item)}
          className="p-2 text-[#123B6D] bg-[#EBF3FF] hover:bg-[#123B6D] hover:text-white rounded-lg transition-colors">
          <Edit2 size={15} />
        </button>
      </div>
    </div>
  );
}
