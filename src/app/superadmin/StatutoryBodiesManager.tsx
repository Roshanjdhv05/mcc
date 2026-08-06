'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Edit2, RefreshCw, AlertCircle, Eye, EyeOff, LayoutDashboard,
  ShieldCheck, MessageCircleWarning, Brain,
  Briefcase, Star, BookMarked, HeartHandshake,
} from 'lucide-react';
import StatutoryBodiesEditor from './StatutoryBodiesEditor';

export interface StatutoryBodyItem {
  id: string;
  slug: string;
  name: string;
  cell_type: string;
  status: 'Active' | 'Inactive';
  display_order: number;
}

const CELL_ICONS: Record<string, React.ReactNode> = {
  'grievance-cell':               <ShieldCheck size={18} />,
  'internal-complaint-committee': <MessageCircleWarning size={18} />,
  'anti-ragging-committee':       <ShieldCheck size={18} />,
  'counselling-cell':             <Brain size={18} />,
  'career-katta':                 <Briefcase size={18} />,
  'special-cell':                 <Star size={18} />,
  'remedial-coaching-cell':       <BookMarked size={18} />,
};

const CELL_COLORS: Record<string, string> = {
  'grievance-cell':               'bg-red-50 text-red-700 border-red-200',
  'internal-complaint-committee': 'bg-orange-50 text-orange-700 border-orange-200',
  'anti-ragging-committee':       'bg-yellow-50 text-yellow-700 border-yellow-200',
  'counselling-cell':             'bg-teal-50 text-teal-700 border-teal-200',
  'career-katta':                 'bg-blue-50 text-blue-700 border-blue-200',
  'special-cell':                 'bg-purple-50 text-purple-700 border-purple-200',
  'remedial-coaching-cell':       'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const CELL_BG: Record<string, string> = {
  'grievance-cell':               'bg-red-100 text-red-700',
  'internal-complaint-committee': 'bg-orange-100 text-orange-700',
  'anti-ragging-committee':       'bg-yellow-100 text-yellow-700',
  'counselling-cell':             'bg-teal-100 text-teal-700',
  'career-katta':                 'bg-blue-100 text-blue-700',
  'special-cell':                 'bg-purple-100 text-purple-700',
  'remedial-coaching-cell':       'bg-emerald-100 text-emerald-700',
};

export default function StatutoryBodiesManager() {
  const [items, setItems] = useState<StatutoryBodyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<StatutoryBodyItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('mcc_statutory_bodies')
        .select('id, slug, name, cell_type, status, display_order')
        .order('display_order', { ascending: true });
      if (err) throw err;
      setItems(data || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: StatutoryBodyItem) => {
    setEditingItem(item);
    setIsCreatingNew(false);
  };

  const handleEditorClose = () => {
    setEditingItem(null);
    fetchItems();
  };

  if (editingItem) {
    return (
      <StatutoryBodiesEditor
        item={editingItem}
        isNew={isCreatingNew}
        onClose={handleEditorClose}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Statutory Bodies (More Section)</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage details for all statutory cells and committees.
          </p>
        </div>
        <button
          onClick={fetchItems}
          className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
        >
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 text-sm">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <RefreshCw className="animate-spin mr-2" size={20} /> Loading statutory bodies data...
        </div>
      ) : items.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <LayoutDashboard size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No entries found.</p>
          <p className="text-sm mt-1 text-amber-600">Please run the setup SQL script in your Supabase database first!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map(item => (
            <BodyCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              iconBg={CELL_BG[item.slug] || 'bg-[#EBF3FF] text-[#123B6D]'}
              icon={CELL_ICONS[item.slug] || <HeartHandshake size={18} />}
              badge={CELL_COLORS[item.slug] || 'bg-gray-50 text-gray-700 border-gray-200'}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BodyCard({
  item, onEdit, iconBg, icon, badge,
}: {
  item: StatutoryBodyItem;
  onEdit: (p: StatutoryBodyItem) => void;
  iconBg: string;
  icon: React.ReactNode;
  badge: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#123B6D]/30 hover:shadow-md transition-all group flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
          item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
          {item.status === 'Active' ? <Eye size={10} /> : <EyeOff size={10} />}
          {item.status}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-[#123B6D] text-sm leading-snug mt-1">{item.name}</h3>
        <span className={`inline-flex items-center mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge}`}>
          {item.cell_type}
        </span>
      </div>

      <button
        onClick={() => onEdit(item)}
        className="mt-1 w-full flex items-center justify-center gap-2 bg-[#F0F5FF] hover:bg-[#123B6D] text-[#123B6D] hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
      >
        <Edit2 size={13} /> Edit Details
      </button>
    </div>
  );
}
