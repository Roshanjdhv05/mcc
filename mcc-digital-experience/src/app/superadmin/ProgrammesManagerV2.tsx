'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Plus, Edit2, RefreshCw, AlertCircle, GraduationCap, BookOpen, Beaker,
  Search, LayoutGrid, List, Star, Eye, EyeOff
} from 'lucide-react';
import ProgrammeEditor from './ProgrammeEditor';

export interface Programme {
  id: string;
  slug: string;
  name: string;
  code: string | null;
  category: 'UG' | 'PG' | 'PhD';
  status: 'Active' | 'Inactive';
  is_featured: boolean;
  display_order: number;
}

const DEFAULT_PROGRAMMES: Omit<Programme, 'id'>[] = [
  { slug: 'bcom', name: 'Bachelor of Commerce (B.Com)', code: 'B.COM', category: 'UG', status: 'Active', is_featured: true, display_order: 1 },
  { slug: 'baf', name: 'B.COM (Accounting & Finance)', code: 'BAF', category: 'UG', status: 'Active', is_featured: false, display_order: 2 },
  { slug: 'bbi', name: 'B.COM (Banking & Insurance)', code: 'BBI', category: 'UG', status: 'Active', is_featured: false, display_order: 3 },
  { slug: 'bfm', name: 'B.COM (Financial Markets)', code: 'BFM', category: 'UG', status: 'Active', is_featured: false, display_order: 4 },
  { slug: 'bfsi', name: 'B.COM (Banking, Financial Services & Insurance)', code: 'BFSI', category: 'UG', status: 'Active', is_featured: false, display_order: 5 },
  { slug: 'bcom-ms', name: 'B.COM (Management Studies)', code: 'BMS', category: 'UG', status: 'Active', is_featured: false, display_order: 6 },
  { slug: 'bcom-ba', name: 'B.COM (Business Administration)', code: 'BBA', category: 'UG', status: 'Active', is_featured: false, display_order: 7 },
  { slug: 'bammc', name: 'BAMMC (Mass Media & Communication)', code: 'BAMMC', category: 'UG', status: 'Active', is_featured: false, display_order: 8 },
  { slug: 'bsc-it', name: 'B.SC. (Information Technology)', code: 'BSC-IT', category: 'UG', status: 'Active', is_featured: false, display_order: 9 },
  { slug: 'bca', name: 'Bachelor of Computer Applications', code: 'BCA', category: 'UG', status: 'Active', is_featured: false, display_order: 10 },
  { slug: 'bsc-ds', name: 'B.SC. (Data Science)', code: 'BSC-DS', category: 'UG', status: 'Active', is_featured: false, display_order: 11 },
  { slug: 'bsc-cs', name: 'B.SC. (Computer Science)', code: 'BSC-CS', category: 'UG', status: 'Active', is_featured: false, display_order: 12 },
  { slug: 'mcom-aa', name: 'M.COM. (Advanced Accountancy)', code: 'MCOM-AA', category: 'PG', status: 'Active', is_featured: false, display_order: 13 },
  { slug: 'mcom-bm', name: 'M.COM. (Business Management)', code: 'MCOM-BM', category: 'PG', status: 'Active', is_featured: false, display_order: 14 },
  { slug: 'mcom-bf', name: 'M.COM. (Banking & Finance)', code: 'MCOM-BF', category: 'PG', status: 'Active', is_featured: false, display_order: 15 },
  { slug: 'msf', name: 'Master of Science in Finance', code: 'MSF', category: 'PG', status: 'Active', is_featured: false, display_order: 16 },
  { slug: 'msc-it', name: 'M.Sc. (Information Technology)', code: 'MSC-IT', category: 'PG', status: 'Active', is_featured: false, display_order: 17 },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  UG: <GraduationCap size={16} />,
  PG: <BookOpen size={16} />,
  PhD: <Beaker size={16} />,
};

const CATEGORY_COLORS: Record<string, string> = {
  UG: 'bg-blue-50 text-blue-700 border-blue-200',
  PG: 'bg-purple-50 text-purple-700 border-purple-200',
  PhD: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function ProgrammesManagerV2({ allowedSlugs, canDelete }: { allowedSlugs?: string[]; canDelete?: boolean }) {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProgramme, setEditingProgramme] = useState<Programme | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'UG' | 'PG' | 'PhD'>('ALL');
  const searchParams = useSearchParams();
  // If allowedSlugs is provided, filter programmes to only those slugs
  const isScopedAccess = allowedSlugs && allowedSlugs.length > 0;

  useEffect(() => { fetchProgrammes(); }, []);

  useEffect(() => {
    const editSlug = searchParams?.get('edit');
    if (editSlug && programmes.length > 0 && !editingProgramme) {
      const progToEdit = programmes.find(p => p.slug === editSlug || p.id === editSlug);
      if (progToEdit) {
        setEditingProgramme(progToEdit);
        setIsCreatingNew(false);
      }
    }
  }, [programmes, searchParams, editingProgramme]);

  const updateUrlEditParam = (slug: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (slug) params.set('edit', slug);
    else params.delete('edit');
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const fetchProgrammes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('mcc_programmes')
        .select('id, slug, name, code, category, status, is_featured, display_order')
        .order('display_order', { ascending: true });
      if (err) throw err;

      // Auto-seed missing default programmes into DB
      const existingSlugs = new Set((data || []).map(p => p.slug));
      const missingDefaults = DEFAULT_PROGRAMMES.filter(p => !existingSlugs.has(p.slug));
      if (missingDefaults.length > 0) {
        const { data: inserted, error: insertErr } = await supabase
          .from('mcc_programmes')
          .insert(missingDefaults)
          .select('id, slug, name, code, category, status, is_featured, display_order');
        if (!insertErr && inserted) {
          const combined = [...(data || []), ...inserted].sort((a, b) => a.display_order - b.display_order);
          setProgrammes(combined);
          return;
        }
      }
      setProgrammes(data || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };



  const handleEdit = (prog: Programme) => {
    setEditingProgramme(prog);
    setIsCreatingNew(false);
    updateUrlEditParam(prog.slug || prog.id);
  };

  const handleAddNew = () => {
    setEditingProgramme({
      id: '', slug: '', name: '', code: '', category: 'UG',
      status: 'Active', is_featured: false, display_order: programmes.length + 1,
    });
    setIsCreatingNew(true);
  };

  const handleEditorClose = () => {
    setEditingProgramme(null);
    updateUrlEditParam(null);
    fetchProgrammes();
  };

  if (editingProgramme) {
    return (
      <ProgrammeEditor
        programme={editingProgramme}
        isNew={isCreatingNew}
        onClose={handleEditorClose}
      />
    );
  }

  const filtered = programmes.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.code || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'ALL' || p.category === filterCategory;
    const matchAllowed = !isScopedAccess || allowedSlugs!.includes(p.slug);
    return matchSearch && matchCat && matchAllowed;
  });

  const grouped = {
    UG: filtered.filter(p => p.category === 'UG'),
    PG: filtered.filter(p => p.category === 'PG'),
    PhD: filtered.filter(p => p.category === 'PhD'),
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Programme Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {isScopedAccess
              ? `You have access to ${allowedSlugs!.length} programme(s). Manage their content below.`
              : 'Manage all programme content — overview, curriculum, eligibility, SEO and more.'}
          </p>
        </div>
        <div className="flex gap-2">
          {!isScopedAccess && (
            <button onClick={handleAddNew}
              className="flex items-center gap-2 bg-[#123B6D] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm">
              <Plus size={16} /> Add Programme
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[200px] max-w-xs">
          <Search size={16} className="text-gray-400" />
          <input
            type="text" placeholder="Search programmes..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
        <div className="flex gap-1.5 bg-white border border-gray-200 rounded-xl p-1">
          {(['ALL', 'UG', 'PG', 'PhD'] as const).map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterCategory === cat ? 'bg-[#123B6D] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              {cat}
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
          <RefreshCw className="animate-spin mr-2" size={20} /> Loading programmes...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <GraduationCap size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No programmes found.</p>

        </div>
      ) : (
        <div className="space-y-8">
          {(['UG', 'PG', 'PhD'] as const).map(cat => (
            grouped[cat].length > 0 && (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${CATEGORY_COLORS[cat]}`}>
                    {CATEGORY_ICONS[cat]} {cat === 'UG' ? 'Undergraduate' : cat === 'PG' ? 'Post Graduate' : 'Ph.D.'} Programmes
                  </span>
                  <span className="text-xs text-gray-400">({grouped[cat].length})</span>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {grouped[cat].map(prog => (
                      <ProgrammeCard key={prog.id} prog={prog} onEdit={handleEdit} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
                    {grouped[cat].map(prog => (
                      <ProgrammeListRow key={prog.id} prog={prog} onEdit={handleEdit} />
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

function ProgrammeCard({ prog, onEdit }: { prog: Programme; onEdit: (p: Programme) => void }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#123B6D]/30 hover:shadow-md transition-all group flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] flex items-center justify-center text-[#123B6D]">
          {CATEGORY_ICONS[prog.category]}
        </div>
        <div className="flex items-center gap-1.5">
          {prog.is_featured && <Star size={14} className="text-amber-500 fill-amber-500" />}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${prog.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {prog.status === 'Active' ? <Eye size={10} className="inline mr-1" /> : <EyeOff size={10} className="inline mr-1" />}
            {prog.status}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{prog.code || '—'}</p>
        <h3 className="font-bold text-[#123B6D] text-sm leading-snug">{prog.name}</h3>
      </div>
      <button onClick={() => onEdit(prog)}
        className="mt-1 w-full flex items-center justify-center gap-2 bg-[#F0F5FF] hover:bg-[#123B6D] text-[#123B6D] hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">
        <Edit2 size={13} /> Edit Programme
      </button>
    </div>
  );
}

function ProgrammeListRow({ prog, onEdit }: { prog: Programme; onEdit: (p: Programme) => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#EBF3FF] flex items-center justify-center text-[#123B6D]">
          {CATEGORY_ICONS[prog.category]}
        </div>
        <div>
          <span className="text-[10px] font-bold text-gray-400 mr-2">{prog.code}</span>
          <span className="font-semibold text-sm text-gray-800">{prog.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {prog.is_featured && <Star size={14} className="text-amber-400 fill-amber-400" />}
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${prog.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {prog.status}
        </span>
        <button onClick={() => onEdit(prog)}
          className="p-2 text-[#123B6D] bg-[#EBF3FF] hover:bg-[#123B6D] hover:text-white rounded-lg transition-colors">
          <Edit2 size={15} />
        </button>
      </div>
    </div>
  );
}
