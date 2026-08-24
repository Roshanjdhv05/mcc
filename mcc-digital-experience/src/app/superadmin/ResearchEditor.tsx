'use client';

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ResearchItem, ResearchCategory } from './ResearchManager';
import {
  ArrowLeft, Save, Loader2, Image as ImageIcon, UploadCloud,
  CheckCircle, AlertCircle, Plus, Trash2, Link2, Users,
  Target, Phone, AlignLeft, List, ChevronDown, ChevronUp, GraduationCap, BarChart3, BookOpen
} from 'lucide-react';
import { processFileForUpload } from '@/lib/fileUtils';

// ─── Types ────────────────────────────────────────────────────────────────────
interface CommitteeMember {
  name: string;
  role: string;
  phone: string;
  email: string;
}

interface ObjectiveBlock {
  type: 'paragraph' | 'point';
  content: string;
}

interface ContactPerson {
  name: string;
  email: string;
  phone: string;
}

interface ImportantDocument {
  title: string;
  url: string;
}

interface Scholar {
  guide: string;
  name: string;
  topic: string;
  status: string;
}

interface StatItem {
  label: string;
  value: string;
}

interface Volume {
  title: string;
  date: string;
  url?: string;
}

interface FullItem extends ResearchItem {
  instagram_link?: string;
  about?: string;
  committee?: CommitteeMember[];
  objectives_activities?: ObjectiveBlock[];
  contact_us?: ContactPerson[];
  important_documents?: ImportantDocument[];
  scholars?: Scholar[];
  stats?: StatItem[];
  volumes?: Volume[];
}

interface ResearchEditorProps {
  item: ResearchItem;
  isNew: boolean;
  onClose: () => void;
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gray-50/70 hover:bg-gray-100/60 transition-colors"
      >
        <div className="flex items-center gap-2.5 text-[#123B6D] font-bold text-sm">
          {icon} {title}
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && <div className="p-6">{children}</div>}
    </div>
  );
}

// ─── Input Helpers ─────────────────────────────────────────────────────────────
const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white";
const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";

// ─── Main Editor ──────────────────────────────────────────────────────────────
export default function ResearchEditor({ item, isNew, onClose }: ResearchEditorProps) {
  const [formData, setFormData] = useState<FullItem>({ ...item } as FullItem);
  const [about, setAbout] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [importantDocuments, setImportantDocuments] = useState<ImportantDocument[]>([]);
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [objectives, setObjectives] = useState<ObjectiveBlock[]>([]);
  const [contacts, setContacts] = useState<ContactPerson[]>([]);
  const [scholars, setScholars] = useState<Scholar[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [volumes, setVolumes] = useState<Volume[]>([]);

  const [uploading, setUploading] = useState(false);
  const [initialFetch, setInitialFetch] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [actionMsg, setActionMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  // Fetch full details on open
  useEffect(() => {
    if (!isNew && item.id) {
      supabase.from('mcc_research').select('*, content').eq('id', item.id).single().then(({ data }) => {
        if (data) {
          setFormData(data as FullItem);
          const parsedContent = data.content || {};
          setAbout(parsedContent.about || '');
          setInstagramLink(parsedContent.instagram_link || '');
          setImportantDocuments(Array.isArray(parsedContent.important_documents) ? parsedContent.important_documents : []);
          setCommittee(Array.isArray(parsedContent.committee) ? parsedContent.committee : []);
          setObjectives(Array.isArray(parsedContent.objectives_activities) ? parsedContent.objectives_activities : []);
          setContacts(Array.isArray(parsedContent.contact_us) ? parsedContent.contact_us : []);
          setScholars(Array.isArray(parsedContent.scholars) ? parsedContent.scholars : []);
          setStats(Array.isArray(parsedContent.stats) ? parsedContent.stats : []);
          setVolumes(Array.isArray(parsedContent.volumes) ? parsedContent.volumes : []);
        }
        setInitialFetch(false);
      });
    } else {
      setInitialFetch(false);
    }
  }, [item.id, isNew]);

  const showMsg = (type: 'success' | 'error', text: string) => {
    setActionMsg({ type, text });
    setTimeout(() => setActionMsg(null), 4000);
  };

  // ── Basic field change ────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'name' && isNew) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(p => ({ ...p, name: value, slug }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  // ── Document upload ──────────────────────────────────────────────────────────
  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      file = await processFileForUpload(file);
    } catch (err: any) {
      showMsg('error', err.message);
      setUploading(false);
      e.target.value = '';
      return;
    }
    const path = `research-docs/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const { error } = await supabase.storage.from('event-images').upload(path, file, { cacheControl: '31536000', upsert: false });
    if (error) { showMsg('error', 'Document upload failed.'); }
    else {
      const { data: urlData } = supabase.storage.from('event-images').getPublicUrl(path);
      setImportantDocuments(p => [...p, { title: file.name, url: urlData.publicUrl }]);
    }
    setUploading(false);
    e.target.value = '';
  };

  const removeDocument = (i: number) => setImportantDocuments(p => p.filter((_, idx) => idx !== i));
  const updateDocumentTitle = (i: number, title: string) => setImportantDocuments(p => p.map((d, idx) => idx === i ? { ...d, title } : d));

  // ── Array Helpers ─────────────────────────────────────────────────────
  const updateArray = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, i: number, key: keyof T, val: string) => {
    setter(p => p.map((item, idx) => idx === i ? { ...item, [key]: val } : item));
  };

  const removeFromArray = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, i: number) => {
    setter(p => p.filter((_, idx) => idx !== i));
  };

  // ── Committee ─────────────────────────────────────────────────────
  const addMember = () => setCommittee(p => [...p, { name: '', role: '', phone: '', email: '' }]);

  // ── Objectives ────────────────────────────────────────────────────
  const addObjective = (type: 'paragraph' | 'point') => setObjectives(p => [...p, { type, content: '' }]);
  const updateObjective = (i: number, key: keyof ObjectiveBlock, val: string) => updateArray(setObjectives, i, key, val);
  const removeObjective = (i: number) => removeFromArray(setObjectives, i);

  // ── Contacts ───────────────────────────────────────────────────────
  const addContact = () => setContacts(p => [...p, { name: '', email: '', phone: '' }]);

  // ── Scholars ───────────────────────────────────────────────────────
  const addScholar = () => setScholars(p => [...p, { name: '', guide: '', topic: '', status: 'Work in Progress' }]);

  // ── Stats ───────────────────────────────────────────────────────
  const addStat = () => setStats(p => [...p, { label: '', value: '' }]);

  // ── Volumes ───────────────────────────────────────────────────────
  const addVolume = () => setVolumes(p => [...p, { title: '', date: '', url: '' }]);

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!formData.name?.trim() || !formData.slug?.trim()) {
      showMsg('error', 'Name and Slug are required.');
      return;
    }
    
    setSaving(true);
    const content = {
      about,
      instagram_link: instagramLink,
      important_documents: importantDocuments,
      committee,
      objectives_activities: objectives,
      contact_us: contacts,
      scholars,
      stats,
      volumes,
    };

    const payload = {
      name: formData.name,
      slug: formData.slug,
      category: formData.category,
      status: formData.status,
      display_order: formData.display_order,
      content,
      updated_at: new Date().toISOString(),
    };

    const { error } = isNew
      ? await supabase.from('mcc_research').insert([payload])
      : await supabase.from('mcc_research').update(payload).eq('id', item.id);

    if (error) showMsg('error', error.message);
    else {
      showMsg('success', isNew ? 'Entry created!' : 'Changes saved!');
      setTimeout(onClose, 1000);
    }
    setSaving(false);
  };

  if (initialFetch) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-[#123B6D]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft size={18} className="text-gray-500" />
          </button>
          <div>
            <h2 className="text-base font-bold text-gray-900">{isNew ? 'Add New Entry' : `Editing: ${formData.name}`}</h2>
            <p className="text-xs text-gray-400">{formData.category || 'Research'}</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving || uploading}
          className="flex items-center gap-2 bg-[#123B6D] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm disabled:opacity-60">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save Changes
        </button>
      </div>

      {/* ── Action message ── */}
      {actionMsg && (
        <div className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 border ${
          actionMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {actionMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {actionMsg.text}
        </div>
      )}

      {/* ── 1. Basic Info ── */}
      <Section title="Basic Information" icon={<AlignLeft size={15} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Name <span className="text-red-500">*</span></label>
            <input name="name" type="text" value={formData.name || ''} onChange={handleChange} className={inputClass} placeholder="e.g. Research Policy" />
          </div>
          <div>
            <label className={labelClass}>URL Slug <span className="text-red-500">*</span></label>
            <input name="slug" type="text" value={formData.slug || ''} onChange={handleChange} className={inputClass} placeholder="e.g. research-policy" />
          </div>
          <div>
            <label className={labelClass}>Category <span className="text-red-500">*</span></label>
            <select name="category" value={formData.category || 'About & Committee'} onChange={handleChange} className={inputClass}>
              <option value="About & Committee">About & Committee</option>
              <option value="Research Centre">Research Centre</option>
              <option value="Policies">Policies</option>
              <option value="Competitions">Competitions</option>
              <option value="Research Journal">Research Journal</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={formData.status || 'Active'} onChange={handleChange} className={inputClass}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Display Order</label>
              <input name="display_order" type="number" value={formData.display_order || 0} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}><Link2 size={12} className="inline mr-1" /> External Link (Optional)</label>
            <input
              type="url" value={instagramLink} onChange={e => setInstagramLink(e.target.value)}
              className={inputClass} placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Important Documents */}
        <div className="mt-5">
          <label className={labelClass}>Important Documents</label>
          <p className="text-xs text-gray-500 mb-3">Upload PDF documents related to this research section.</p>
          
          <div className="space-y-3 mb-3">
            {importantDocuments.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100 relative group">
                <div className="flex-1">
                  <input type="text" value={doc.title} onChange={e => updateDocumentTitle(i, e.target.value)} className={inputClass} placeholder="Document Title (e.g. Annual Report 2024)" />
                </div>
                <a href={doc.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#123B6D] hover:underline px-2 flex items-center gap-1">
                  <Link2 size={14} /> View
                </a>
                <button onClick={() => removeDocument(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <input type="file" accept="application/pdf" ref={imageRef} className="hidden" onChange={handleDocumentUpload} />
          <button type="button" onClick={() => imageRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-[#F0F5FF] text-[#123B6D] hover:bg-[#123B6D] hover:text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50">
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
            {uploading ? 'Uploading...' : 'Upload PDF Document'}
          </button>
        </div>
      </Section>

      {/* ── 2. About ── */}
      <Section title="Content" icon={<AlignLeft size={15} />}>
        <label className={labelClass}>Main Content</label>
        <textarea
          rows={6} value={about} onChange={e => setAbout(e.target.value)}
          placeholder="Write a detailed description for this research page..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
        />
        <p className="text-xs text-gray-400 mt-1.5">{about.length} characters</p>
      </Section>

      {/* ── Stats ── */}
      <Section title="Statistics Cards (Optional)" icon={<BarChart3 size={15} />}>
        <div className="space-y-3">
          {stats.map((s, i) => (
            <div key={i} className="flex gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
              <div className="flex-1">
                <label className={labelClass}>Label</label>
                <input type="text" value={s.label} onChange={e => updateArray(setStats, i, 'label', e.target.value)} className={inputClass} placeholder="e.g. Established" />
              </div>
              <div className="flex-1">
                <label className={labelClass}>Value</label>
                <input type="text" value={s.value} onChange={e => updateArray(setStats, i, 'value', e.target.value)} className={inputClass} placeholder="e.g. 2014" />
              </div>
              <button onClick={() => removeFromArray(setStats, i)}
                className="mt-6 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all h-fit">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addStat} className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#123B6D] bg-[#EBF3FF] hover:bg-[#d8e8ff] rounded-xl transition-colors">
          <Plus size={15} /> Add Statistic
        </button>
      </Section>

      {/* ── 3. Committee ── */}
      <Section title="Committee / Members (Optional)" icon={<Users size={15} />}>
        <p className="text-xs text-gray-500 mb-4">Add members associated with this research page.</p>
        <div className="space-y-3">
          {committee.map((m, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" value={m.name} onChange={e => updateArray(setCommittee, i, 'name', e.target.value)} className={inputClass} placeholder="e.g. Rohan Mehta" />
              </div>
              <div>
                <label className={labelClass}>Role / Designation</label>
                <input type="text" value={m.role} onChange={e => updateArray(setCommittee, i, 'role', e.target.value)} className={inputClass} placeholder="e.g. Professor" />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="tel" value={m.phone} onChange={e => updateArray(setCommittee, i, 'phone', e.target.value)} className={inputClass} placeholder="9876543210" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={m.email} onChange={e => updateArray(setCommittee, i, 'email', e.target.value)} className={inputClass} placeholder="member@mcc.edu" />
              </div>
              <button onClick={() => removeFromArray(setCommittee, i)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addMember}
          className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#123B6D] bg-[#EBF3FF] hover:bg-[#d8e8ff] rounded-xl transition-colors">
          <Plus size={15} /> Add Member
        </button>
      </Section>

      {/* ── Scholars ── */}
      <Section title="Scholars / Students (Optional)" icon={<GraduationCap size={15} />}>
        <div className="space-y-3">
          {scholars.map((s, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
              <div>
                <label className={labelClass}>Student Name</label>
                <input type="text" value={s.name} onChange={e => updateArray(setScholars, i, 'name', e.target.value)} className={inputClass} placeholder="e.g. Dr. Shivaji Pawar" />
              </div>
              <div>
                <label className={labelClass}>Guide</label>
                <input type="text" value={s.guide} onChange={e => updateArray(setScholars, i, 'guide', e.target.value)} className={inputClass} placeholder="e.g. Dr. Parvathi Venkatesh" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Topic</label>
                <textarea rows={2} value={s.topic} onChange={e => updateArray(setScholars, i, 'topic', e.target.value)} className={inputClass} placeholder="Research topic..." />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Status</label>
                <select value={s.status} onChange={e => updateArray(setScholars, i, 'status', e.target.value)} className={inputClass}>
                  <option value="Awarded">Awarded</option>
                  <option value="Thesis submitted">Thesis submitted</option>
                  <option value="Work in Progress">Work in Progress</option>
                </select>
              </div>
              <button onClick={() => removeFromArray(setScholars, i)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addScholar} className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#123B6D] bg-[#EBF3FF] hover:bg-[#d8e8ff] rounded-xl transition-colors">
          <Plus size={15} /> Add Scholar
        </button>
      </Section>

      {/* ── Volumes ── */}
      <Section title="Volumes / Issues (Optional)" icon={<BookOpen size={15} />}>
        <div className="space-y-3">
          {volumes.map((v, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
              <div>
                <label className={labelClass}>Title</label>
                <input type="text" value={v.title} onChange={e => updateArray(setVolumes, i, 'title', e.target.value)} className={inputClass} placeholder="e.g. Volume 5, Issue 2" />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input type="text" value={v.date} onChange={e => updateArray(setVolumes, i, 'date', e.target.value)} className={inputClass} placeholder="e.g. December 2024" />
              </div>
              <div>
                <label className={labelClass}>URL / Link (Optional)</label>
                <input type="url" value={v.url || ''} onChange={e => updateArray(setVolumes, i, 'url', e.target.value)} className={inputClass} placeholder="https://..." />
              </div>
              <button onClick={() => removeFromArray(setVolumes, i)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addVolume} className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#123B6D] bg-[#EBF3FF] hover:bg-[#d8e8ff] rounded-xl transition-colors">
          <Plus size={15} /> Add Volume
        </button>
      </Section>

      {/* ── 4. Objectives & Activities ── */}
      <Section title="Additional Details / Bullet Points" icon={<Target size={15} />}>
        <p className="text-xs text-gray-500 mb-4">Add additional content as free-form paragraphs or structured bullet points.</p>
        <div className="space-y-3">
          {objectives.map((o, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => updateObjective(i, 'type', o.type === 'paragraph' ? 'point' : 'paragraph')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    o.type === 'paragraph'
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {o.type === 'paragraph' ? <AlignLeft size={12} /> : <List size={12} />}
                  {o.type === 'paragraph' ? 'Paragraph' : 'Bullet Point'} — click to toggle
                </button>
                <button onClick={() => removeObjective(i)}
                  className="ml-auto opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
              {o.type === 'paragraph' ? (
                <textarea
                  rows={3} value={o.content} onChange={e => updateObjective(i, 'content', e.target.value)}
                  placeholder="Write a paragraph of content..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-[#123B6D] font-black text-lg">•</span>
                  <input
                    type="text" value={o.content} onChange={e => updateObjective(i, 'content', e.target.value)}
                    placeholder="Write a bullet point..."
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => addObjective('paragraph')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
            <Plus size={15} /> Add Paragraph
          </button>
          <button onClick={() => addObjective('point')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
            <Plus size={15} /> Add Bullet Point
          </button>
        </div>
      </Section>

      {/* ── 5. Contact Us ── */}
      <Section title="Contact Us (Optional)" icon={<Phone size={15} />}>
        <p className="text-xs text-gray-500 mb-4">
          Add contact persons.
        </p>
        <div className="space-y-3">
          {contacts.map((c, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" value={c.name} onChange={e => updateArray(setContacts, i, 'name', e.target.value)} className={inputClass} placeholder="e.g. Prof. Kavita Iyer" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={c.email} onChange={e => updateArray(setContacts, i, 'email', e.target.value)} className={inputClass} placeholder="contact@mcc.edu" />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input type="tel" value={c.phone} onChange={e => updateArray(setContacts, i, 'phone', e.target.value)} className={inputClass} placeholder="9876543210" />
              </div>
              <button onClick={() => removeFromArray(setContacts, i)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addContact}
          className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#123B6D] bg-[#EBF3FF] hover:bg-[#d8e8ff] rounded-xl transition-colors">
          <Plus size={15} /> Add Contact Person
        </button>
      </Section>

      {/* ── Bottom save ── */}
      <div className="flex justify-end pb-6">
        <button onClick={handleSave} disabled={saving || uploading}
          className="flex items-center gap-2 bg-[#123B6D] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-md disabled:opacity-60">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save All Changes
        </button>
      </div>
    </div>
  );
}
