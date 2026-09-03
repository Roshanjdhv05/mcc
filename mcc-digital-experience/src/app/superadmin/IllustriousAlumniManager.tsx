'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, RefreshCw, Users, Pencil, Eye, EyeOff, Globe, Building2 } from 'lucide-react';
import IllustriousAlumniEditor, { AlumniItem } from './IllustriousAlumniEditor';

const BLANK: AlumniItem = {
  id: '',
  name: '',
  image_url: '',
  hsc: false,
  ug: true,
  pg: false,
  hsc_passout_year: '',
  ug_passout_year: '',
  pg_passout_year: '',
  course: '',
  year_passout: '',
  company_name: '',
  designation: '',
  linkedin_link: '',
  achieved: '',
  testimonial: '',
  show_on_home: true,
};

export default function IllustriousAlumniManager({ canDelete }: { canDelete?: boolean }) {
  const [items, setItems] = useState<AlumniItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AlumniItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('mcc_illustrious_alumni')
      .select('*')
      .order('created_at', { ascending: false });
    setItems((data as AlumniItem[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = () => { setEditing({ ...BLANK, id: '' }); setIsNew(true); };
  const handleEdit = (item: AlumniItem) => { setEditing(item); setIsNew(false); };
  const handleClose = () => { setEditing(null); setIsNew(false); };

  const toggleHomeVisibility = async (item: AlumniItem) => {
    await supabase.from('mcc_illustrious_alumni').update({ show_on_home: !item.show_on_home }).eq('id', item.id);
    fetchItems();
  };

  const educationBadges = (item: AlumniItem) => {
    const badges = [];
    if (item.hsc) badges.push('HSC');
    if (item.ug) badges.push('UG');
    if (item.pg) badges.push('PG');
    return badges;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Users size={22} className="text-[#123B6D]" /> Illustrious Alumni
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage alumni profiles shown on the website</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchItems} className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
            <RefreshCw size={18} />
          </button>
          <button onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#123B6D] text-white font-bold rounded-xl hover:bg-[#0d2a4f] transition-colors text-sm shadow-sm">
            <Plus size={18} /> Add Alumni
          </button>
        </div>
      </div>

      {/* Editor panel */}
      {editing && (
        <IllustriousAlumniEditor
          item={editing}
          isNew={isNew}
          onClose={handleClose}
          onSaved={fetchItems}
        />
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <RefreshCw className="animate-spin mr-2" size={20} />
          <span className="font-semibold">Loading alumni...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No alumni added yet</h3>
          <p className="text-gray-500 mb-6">Start adding illustrious alumni to showcase their achievements.</p>
          <button onClick={handleAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#123B6D] text-white font-bold rounded-xl hover:bg-[#0d2a4f] text-sm">
            <Plus size={16} /> Add First Alumni
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map(item => (
            <div key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              {/* Photo */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#123B6D]/10">
                    <Users size={48} className="text-[#123B6D]/30" />
                  </div>
                )}
                {/* Home visibility badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${item.show_on_home ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                  {item.show_on_home ? <Eye size={10} /> : <EyeOff size={10} />}
                  {item.show_on_home ? 'Homepage' : 'Hidden'}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-black text-[#1E293B] text-sm leading-tight mb-1">{item.name}</h3>

                {/* Education badges */}
                <div className="flex gap-1 flex-wrap mb-2">
                  {educationBadges(item).map(b => (
                    <span key={b} className="px-1.5 py-0.5 bg-[#123B6D]/10 text-[#123B6D] rounded text-[10px] font-bold">{b}</span>
                  ))}
                  {item.year_passout && (
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px]">'{item.year_passout}</span>
                  )}
                </div>

                {item.designation && item.company_name && (
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1 truncate">
                    <Building2 size={10} className="shrink-0" /> {item.designation}, {item.company_name}
                  </p>
                )}
                {item.achieved && (
                  <p className="text-xs font-bold text-[#D4A017] truncate mb-3">🏅 {item.achieved}</p>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#123B6D] text-white rounded-xl text-xs font-bold hover:bg-[#0d2a4f] transition-colors">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => toggleHomeVisibility(item)}
                    title={item.show_on_home ? 'Hide from homepage' : 'Show on homepage'}
                    className={`p-2 rounded-xl text-xs font-bold transition-colors border ${item.show_on_home ? 'border-green-200 text-green-600 hover:bg-green-50' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
                    {item.show_on_home ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  {item.linkedin_link && (
                    <a href={item.linkedin_link} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-blue-200 text-blue-500 hover:bg-blue-50 transition-colors">
                      <Globe size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {items.length > 0 && (
        <p className="text-sm text-gray-400 text-center">
          {items.length} alumni total · {items.filter(i => i.show_on_home).length} shown on homepage
        </p>
      )}
    </div>
  );
}
