'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2, Save, AlertCircle, RefreshCw, Database, FileX } from 'lucide-react';
import ProgrammeLiveEditor from './ProgrammeLiveEditor';
import defaultProgrammes from '@/lib/defaultProgrammesData.json';

export interface Programme {
  id: string;
  course_key: string;
  title: string;
  short_info: string | null;
  funding_type: string | null;
  category: string | null;
  overview_content: string[] | null;
  programme_snapshot: { title: string; info: string; icon?: string }[] | null;
  faculty_data: any[] | null;
  alumni_data: any[] | null;
  festivals_tab_name: string | null;
  publication_tab_name: string | null;
  isUnpublished?: boolean;
}

export default function ProgrammesManager() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingProgramme, setEditingProgramme] = useState<Programme | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState<'basic' | 'overview' | 'snapshot' | 'faculty'>('basic');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('programmes')
        .select('*')
        .order('title', { ascending: true });
        
      if (error) throw error;
      
      const dbProgrammes = data || [];
      const dbKeys = new Set(dbProgrammes.map((p: Programme) => p.course_key));
      
      // Filter defaults that aren't in DB yet
      const staticProgrammes = (defaultProgrammes as any[])
        .filter(p => !dbKeys.has(p.course_key))
        .map(p => ({
          ...p,
          id: '',
          isUnpublished: true
        }));
        
      // Merge DB programmes and Static unpublished programmes
      setProgrammes([...dbProgrammes, ...staticProgrammes]);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (prog: Programme) => {
    setEditingProgramme({ ...prog });
    setIsNew(!!prog.isUnpublished || !prog.id);
    setActiveEditorTab('basic');
  };

  const handleAddNew = () => {
    setEditingProgramme({
      id: '',
      course_key: '',
      title: '',
      short_info: '',
      funding_type: 'Self Financing',
      category: 'Commerce',
      overview_content: [],
      programme_snapshot: [],
      faculty_data: [],
      alumni_data: [],
      festivals_tab_name: '',
      publication_tab_name: ''
    });
    setIsNew(true);
    setActiveEditorTab('basic');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this programme?')) return;
    
    try {
      const { error } = await supabase.from('programmes').delete().eq('id', id);
      if (error) throw error;
      fetchProgrammes();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSave = async () => {
    if (!editingProgramme) return;
    setSaving(true);
    try {
      if (isNew) {
        const { id, ...dataToInsert } = editingProgramme;
        const { error } = await supabase.from('programmes').insert([dataToInsert]);
        if (error) throw error;
      } else {
        const { id, ...dataToUpdate } = editingProgramme;
        const { error } = await supabase.from('programmes').update(dataToUpdate).eq('id', id);
        if (error) throw error;
      }
      setEditingProgramme(null);
      fetchProgrammes();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading && programmes.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        <RefreshCw className="animate-spin mr-2" size={20} /> Loading programmes...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Degree Programmes Management</h2>
          <p className="text-sm text-gray-500">Manage overview, faculty, and snapshots for all programmes.</p>
        </div>
        {!editingProgramme && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-[#123B6D] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add New Programme
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 text-sm">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {editingProgramme ? (
        <ProgrammeLiveEditor
          initialData={editingProgramme}
          isSaving={saving}
          onCancel={() => setEditingProgramme(null)}
          onSave={async (prog) => {
            setSaving(true);
            try {
              if (isNew) {
                const { id, ...dataToInsert } = prog;
                const { error } = await supabase.from('programmes').insert([dataToInsert]);
                if (error) throw error;
              } else {
                const { id, ...dataToUpdate } = prog;
                const { error } = await supabase.from('programmes').update(dataToUpdate).eq('id', prog.id);
                if (error) throw error;
              }
              setEditingProgramme(null);
              fetchProgrammes();
            } catch (err: any) {
              alert(err.message);
            } finally {
              setSaving(false);
            }
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">

          {programmes.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No programmes found. Click "Add New Programme" to start.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Programme</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {programmes.map(prog => (
                  <tr key={prog.id || prog.course_key} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-[#123B6D]">{prog.title}</div>
                          <div className="text-xs text-gray-500">{prog.category || 'N/A'} • {prog.funding_type || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {prog.isUnpublished ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
                            <FileX size={12} /> Static (Not in DB)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-200">
                            <Database size={12} /> Live in DB
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(prog)} className="p-2 text-[#3B82F6] hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                          {!prog.isUnpublished && (
                            <button onClick={() => handleDelete(prog.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                          )}
                        </div>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
