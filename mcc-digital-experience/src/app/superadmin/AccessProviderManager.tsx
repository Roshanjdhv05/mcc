'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Edit2, X, Check, Shield, User, Lock, Key, ChevronDown, ChevronUp, ToggleLeft, ToggleRight } from 'lucide-react';

const ALL_TABS = [
  { key: 'notice',               label: 'Notice System' },
  { key: 'home-events',          label: 'Events Publication' },
  { key: 'home-banners',         label: 'Homepage Banners' },
  { key: 'calendar-management',  label: 'Calendar Management' },
  { key: 'examination',          label: 'Examination Manager' },
  { key: 'programme-management', label: 'Programme Management' },
  { key: 'students-corner',      label: 'Students Corner' },
  { key: 'research',             label: 'Research Manager' },
  { key: 'wall-of-fame',         label: 'Wall of Fame' },
  { key: 'illustrious-alumni',   label: 'Illustrious Alumni' },
  { key: 'statutory-bodies',     label: 'Statutory Bodies' },
  { key: 'jr-college',           label: 'Jr College' },
  { key: 'news',                 label: 'News & Announcements' },
];

const PROGRAMMES = [
  { slug: 'bcom',    label: 'B.Com' },
  { slug: 'baf',     label: 'BAF' },
  { slug: 'bbi',     label: 'BBI' },
  { slug: 'bfm',     label: 'BFM' },
  { slug: 'bfsi',    label: 'BFSI' },
  { slug: 'bcom-ms', label: 'B.Com (MS)' },
  { slug: 'bcom-ba', label: 'B.Com (BA)' },
  { slug: 'bammc',   label: 'BAMMC' },
  { slug: 'bsc-it',  label: 'B.Sc IT' },
  { slug: 'bca',     label: 'BCA' },
  { slug: 'bsc-ds',  label: 'B.Sc DS' },
  { slug: 'bsc-cs',  label: 'B.Sc CS' },
  { slug: 'mcom-aa', label: 'M.Com (AA)' },
  { slug: 'mcom-bm', label: 'M.Com (BM)' },
  { slug: 'mcom-bf', label: 'M.Com (BF)' },
  { slug: 'msf',     label: 'MSF' },
  { slug: 'msc-it',  label: 'M.Sc IT' },
];

type Subadmin = {
  id: string;
  name: string;
  username: string;
  password: string;
  allowed_tabs: string[];
  is_active: boolean;
  created_at: string;
  last_login_at?: string;
  last_active_tab?: string;
};

const EMPTY_FORM = { name: '', username: '', password: '', allowed_tabs: [] as string[], is_active: true };

export default function AccessProviderManager() {
  const [subadmins, setSubadmins] = useState<Subadmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  // Track whether the programme sub-panel should be open (stays open even when 0 slugs selected)
  const [progSubPanelOpen, setProgSubPanelOpen] = useState(false);

  const fetchSubadmins = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('mcc_subadmins')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setSubadmins(data as Subadmin[]);
    setLoading(false);
  };

  useEffect(() => { fetchSubadmins(); }, []);

  const hasProgrammeAccess = form.allowed_tabs.includes('programme-management');
  // Which specific slugs are selected (from 'programme-management:slug' entries)
  const selectedProgSlugs = form.allowed_tabs
    .filter(t => t.startsWith('programme-management:'))
    .map(t => t.split(':')[1]);

  const toggleTab = (key: string) => {
    if (key === 'programme-management') {
      // Toggle full programme-management access — remove any specific slugs too
      if (hasProgrammeAccess && !progSubPanelOpen) {
        // Fully deactivate
        setForm(f => ({
          ...f,
          allowed_tabs: f.allowed_tabs.filter(t => t !== 'programme-management' && !t.startsWith('programme-management:')),
        }));
        setProgSubPanelOpen(false);
      } else if (!hasProgrammeAccess && !progSubPanelOpen && selectedProgSlugs.length === 0) {
        // First click: grant full access and open panel
        setForm(f => ({
          ...f,
          allowed_tabs: [...f.allowed_tabs.filter(t => !t.startsWith('programme-management:')), 'programme-management'],
        }));
        setProgSubPanelOpen(true);
      } else if (progSubPanelOpen || hasProgrammeAccess || selectedProgSlugs.length > 0) {
        // Already open: toggle off entirely
        setForm(f => ({
          ...f,
          allowed_tabs: f.allowed_tabs.filter(t => t !== 'programme-management' && !t.startsWith('programme-management:')),
        }));
        setProgSubPanelOpen(false);
      } else {
        setForm(f => ({
          ...f,
          allowed_tabs: [...f.allowed_tabs.filter(t => !t.startsWith('programme-management:')), 'programme-management'],
        }));
        setProgSubPanelOpen(true);
      }
      return;
    }
    setForm(f => ({
      ...f,
      allowed_tabs: f.allowed_tabs.includes(key)
        ? f.allowed_tabs.filter(t => t !== key)
        : [...f.allowed_tabs, key],
    }));
  };

  const toggleProgSlug = (slug: string) => {
    const key = `programme-management:${slug}`;
    // Remove full access if selecting specific
    const baseWithoutFull = form.allowed_tabs.filter(t => t !== 'programme-management');
    if (baseWithoutFull.includes(key)) {
      setForm(f => ({ ...f, allowed_tabs: baseWithoutFull.filter(t => t !== key) }));
    } else {
      setForm(f => ({ ...f, allowed_tabs: [...baseWithoutFull, key] }));
    }
  };

  const progAccessMode: 'none' | 'all' | 'specific' =
    hasProgrammeAccess ? 'all'
    : selectedProgSlugs.length > 0 ? 'specific'
    : 'none';
  // Panel is visible if explicitly opened, or if there are already selections
  const showProgPanel = progSubPanelOpen || hasProgrammeAccess || selectedProgSlugs.length > 0;

  const openCreate = () => {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setError(null);
    setShowPassword(false);
    setProgSubPanelOpen(false);
    setShowForm(true);
  };

  const openEdit = (sub: Subadmin) => {
    setForm({ name: sub.name, username: sub.username, password: sub.password, allowed_tabs: sub.allowed_tabs, is_active: sub.is_active });
    setEditingId(sub.id);
    setError(null);
    setShowPassword(false);
    // Auto-open sub-panel if this sub-admin has any programme access
    const hasProgAccess = sub.allowed_tabs.includes('programme-management') || sub.allowed_tabs.some(t => t.startsWith('programme-management:'));
    setProgSubPanelOpen(hasProgAccess);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.username.trim() || !form.password.trim()) {
      setError('Name, username and password are required.');
      return;
    }
    if (form.allowed_tabs.length === 0) {
      setError('Please select at least one module to grant access.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        const { error: e } = await supabase.from('mcc_subadmins').update({
          name: form.name.trim(),
          username: form.username.trim(),
          password: form.password,
          allowed_tabs: form.allowed_tabs,
          is_active: form.is_active,
        }).eq('id', editingId);
        if (e) throw e;
      } else {
        const { error: e } = await supabase.from('mcc_subadmins').insert({
          name: form.name.trim(),
          username: form.username.trim(),
          password: form.password,
          allowed_tabs: form.allowed_tabs,
          is_active: form.is_active,
        });
        if (e) throw e;
      }
      setShowForm(false);
      setEditingId(null);
      await fetchSubadmins();
    } catch (e: any) {
      setError(e.message || 'An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await supabase.from('mcc_subadmins').delete().eq('id', id);
    setDeletingId(null);
    await fetchSubadmins();
  };

  const toggleActive = async (sub: Subadmin) => {
    await supabase.from('mcc_subadmins').update({ is_active: !sub.is_active }).eq('id', sub.id);
    await fetchSubadmins();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Access Provider</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage sub-admin accounts and their module permissions.</p>
        </div>
        {!showForm && (
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#123B6D] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm"
          >
            <Plus size={16} /> New Sub-Admin
          </button>
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800">Sub-Admin Portal URL</p>
          <p className="text-sm text-blue-600 mt-0.5">
            Sub-admins log in at:{' '}
            <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-xs">
              {typeof window !== 'undefined' ? window.location.origin : ''}/admin
            </code>
          </p>
        </div>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-800">{editingId ? 'Edit Sub-Admin' : 'Create New Sub-Admin'}</h3>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Display Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/30"
                  placeholder="e.g. Roshan"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Username / Email</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/30"
                  placeholder="e.g. roshanjdhv114@gmail.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/30"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Key size={15} />
                </button>
              </div>
            </div>

            {/* Active toggle */}
            <div className="flex items-center gap-3 self-end pb-1">
              <button
                onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ${form.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform m-0.5 ${form.is_active ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className="text-sm font-medium text-gray-600">Account {form.is_active ? 'Active' : 'Disabled'}</span>
            </div>
          </div>

          {/* Module Permissions */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Module Access</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {ALL_TABS.map(tab => {
                const selected = tab.key === 'programme-management'
                  ? showProgPanel
                  : form.allowed_tabs.includes(tab.key);
                return (
                  <div key={tab.key}>
                    <button
                      onClick={() => toggleTab(tab.key)}
                      className={`w-full flex items-center gap-2 p-3 rounded-xl border text-left text-sm font-medium transition-all ${
                        selected
                          ? 'bg-[#123B6D] border-[#123B6D] text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border ${selected ? 'bg-white border-white' : 'border-gray-300'}`}>
                        {selected && <Check size={10} className="text-[#123B6D]" />}
                      </div>
                      {tab.label}
                      {tab.key === 'programme-management' && progAccessMode === 'specific' && (
                        <span className="ml-auto text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">{selectedProgSlugs.length}</span>
                      )}
                    </button>

                    {/* Programme sub-selector — shown when programme-management is activated */}
                    {tab.key === 'programme-management' && showProgPanel && (
                      <div className="mt-2 ml-1 p-3 bg-slate-50 border border-blue-100 rounded-xl">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Access Scope</p>
                        <div className="flex gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => {
                              // Set full access, clear specific slugs
                              setForm(f => ({
                                ...f,
                                allowed_tabs: [...f.allowed_tabs.filter(t => !t.startsWith('programme-management')), 'programme-management'],
                              }));
                            }}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                              hasProgrammeAccess ? 'bg-[#123B6D] text-white border-[#123B6D]' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            All Programmes
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              // Switch to specific mode (remove full, keep/init slugs)
                              setForm(f => ({
                                ...f,
                                allowed_tabs: f.allowed_tabs.filter(t => t !== 'programme-management'),
                              }));
                            }}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                              !hasProgrammeAccess ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            Specific Programmes
                          </button>
                        </div>

                        {!hasProgrammeAccess && (
                          <div className="grid grid-cols-2 gap-1">
                            {PROGRAMMES.map(prog => {
                              const isOn = selectedProgSlugs.includes(prog.slug);
                              return (
                                <button
                                  key={prog.slug}
                                  type="button"
                                  onClick={() => toggleProgSlug(prog.slug)}
                                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
                                    isOn ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                                  }`}
                                >
                                  <div className={`w-3 h-3 rounded flex items-center justify-center flex-shrink-0 border ${
                                    isOn ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                                  }`}>
                                    {isOn && <Check size={8} className="text-white" />}
                                  </div>
                                  {prog.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setForm(f => ({ ...f, allowed_tabs: f.allowed_tabs.length === ALL_TABS.length ? [] : ALL_TABS.map(t => t.key) }))}
              className="mt-2 text-xs text-[#123B6D] font-semibold hover:underline"
            >
              {form.allowed_tabs.filter(t => ALL_TABS.some(at => at.key === t)).length === ALL_TABS.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {error && <p className="text-sm text-red-500 mb-4 font-medium">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-[#123B6D] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors disabled:opacity-50"
            >
              {saving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : <Check size={16} />}
              {editingId ? 'Update' : 'Create'} Sub-Admin
            </button>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sub-admin list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#123B6D]" />
        </div>
      ) : subadmins.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <Shield size={36} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No sub-admins yet</p>
          <p className="text-gray-400 text-sm mt-1">Click "New Sub-Admin" to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subadmins.map(sub => {
            const isExpanded = expandedId === sub.id;
            return (
              <div key={sub.id} className={`bg-white rounded-2xl border shadow-sm transition-all ${sub.is_active ? 'border-[#E2E8F0]' : 'border-gray-200 opacity-70'}`}>
                <div className="flex items-center gap-4 p-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-[#123B6D]/10 flex items-center justify-center flex-shrink-0">
                    <User size={18} className="text-[#123B6D]" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-800 text-sm">{sub.name}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${sub.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {sub.is_active ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{sub.username}</p>
                  </div>
                  {/* Access count */}
                  <span className="text-xs font-semibold text-[#123B6D] bg-[#123B6D]/10 px-3 py-1 rounded-full hidden sm:block">
                    {sub.allowed_tabs.length} module{sub.allowed_tabs.length !== 1 ? 's' : ''}
                  </span>
                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleActive(sub)} title="Toggle active" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                      {sub.is_active ? <ToggleRight size={18} className="text-green-500" /> : <ToggleLeft size={18} />}
                    </button>
                    <button onClick={() => openEdit(sub)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(sub.id)}
                      disabled={deletingId === sub.id}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      {deletingId === sub.id ? <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-red-500" /> : <Trash2 size={15} />}
                    </button>
                    <button onClick={() => setExpandedId(isExpanded ? null : sub.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 px-4 py-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Allowed Modules</p>
                    <div className="flex flex-wrap gap-1.5">
                      {sub.allowed_tabs.length === 0 ? (
                        <p className="text-xs text-gray-400 italic">No modules assigned.</p>
                      ) : (() => {
                        // Group specific programme access under one badge
                        const specificProgs = sub.allowed_tabs.filter(t => t.startsWith('programme-management:'));
                        const otherTabs = sub.allowed_tabs.filter(t => !t.startsWith('programme-management:'));
                        return (
                          <>
                            {otherTabs.map(tabKey => {
                              const tabLabel = ALL_TABS.find(t => t.key === tabKey)?.label ?? tabKey;
                              return (
                                <span key={tabKey} className="text-xs bg-[#123B6D]/10 text-[#123B6D] px-2.5 py-1 rounded-full font-medium">
                                  {tabLabel}
                                </span>
                              );
                            })}
                            {specificProgs.length > 0 && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                                Programmes: {specificProgs.map(t => PROGRAMMES.find(p => p.slug === t.split(':')[1])?.label ?? t.split(':')[1]).join(', ')}
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password</p>
                        <p className="text-xs font-mono text-gray-600 mt-0.5 bg-gray-100 px-2 py-0.5 rounded">{sub.password}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Created</p>
                        <p className="text-xs text-gray-600 mt-0.5">{new Date(sub.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      </div>
                      {sub.last_login_at && (
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Login</p>
                          <p className="text-xs text-green-600 mt-0.5">{new Date(sub.last_login_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      )}
                      {sub.last_active_tab && (
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Used</p>
                          <p className="text-xs text-blue-600 mt-0.5">{ALL_TABS.find(t => t.key === sub.last_active_tab)?.label ?? sub.last_active_tab}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
