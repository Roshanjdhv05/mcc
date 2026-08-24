'use client';

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { StatutoryBodyItem } from './StatutoryBodiesManager';
import {
  ArrowLeft, Save, Loader2, Image as ImageIcon, UploadCloud,
  CheckCircle, AlertCircle, Plus, Trash2, Link2, Users,
  Target, Phone, AlignLeft, List, ChevronDown, ChevronUp,
  FileText, ExternalLink, File,
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

interface ImportantDocument {
  title: string;
  pdf_url: string;
}

interface ContactPerson {
  name: string;
  email: string;
  phone: string;
}

interface FullItem extends StatutoryBodyItem {
  title?: string;
  instagram_link?: string;
  about?: string;
  committee?: CommitteeMember[];
  objectives?: ObjectiveBlock[];
  important_documents?: ImportantDocument[];
  contact_us?: ContactPerson[];
  banner_image?: string;
}

interface StatutoryBodiesEditorProps {
  item: StatutoryBodyItem;
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
export default function StatutoryBodiesEditor({ item, isNew, onClose }: StatutoryBodiesEditorProps) {
  const [formData, setFormData] = useState<FullItem>({ ...item } as FullItem);
  const [about, setAbout] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [objectives, setObjectives] = useState<ObjectiveBlock[]>([]);
  const [documents, setDocuments] = useState<ImportantDocument[]>([]);
  const [contacts, setContacts] = useState<ContactPerson[]>([]);

  const [uploading, setUploading] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState<number | null>(null);
  const [initialFetch, setInitialFetch] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [actionMsg, setActionMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const imageRef = useRef<HTMLInputElement>(null);
  const pdfRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // Fetch full details on open
  useEffect(() => {
    if (!isNew && item.id) {
      supabase.from('mcc_statutory_bodies').select('*').eq('id', item.id).single().then(({ data }) => {
        if (data) {
          setFormData(data as FullItem);
          setAbout(data.about || '');
          setInstagramLink(data.instagram_link || '');
          setBannerImage(data.banner_image || '');
          setCommittee(Array.isArray(data.committee) ? data.committee : []);
          setObjectives(Array.isArray(data.objectives) ? data.objectives : []);
          setDocuments(Array.isArray(data.important_documents) ? data.important_documents : []);
          setContacts(Array.isArray(data.contact_us) ? data.contact_us : []);
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
    setFormData(p => ({ ...p, [name]: value }));
  };

  // ── Banner Image upload ───────────────────────────────────────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const path = `statutory-bodies/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const { error } = await supabase.storage.from('event-images').upload(path, file, { cacheControl: '31536000', upsert: false });
    if (error) { showMsg('error', 'Image upload failed.'); }
    else {
      const { data: urlData } = supabase.storage.from('event-images').getPublicUrl(path);
      setBannerImage(urlData.publicUrl);
    }
    setUploading(false);
    e.target.value = '';
  };

  // ── PDF upload for a specific document row ────────────────────────────────
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let file = e.target.files?.[0];
    if (!file) return;
    setUploadingPdf(index);
    try {
      file = await processFileForUpload(file);
    } catch (err: any) {
      showMsg('error', err.message);
      setUploadingPdf(null);
      e.target.value = '';
      return;
    }
    const path = `statutory-bodies/docs/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const { error } = await supabase.storage.from('event-images').upload(path, file, {
      contentType: 'application/pdf',
      cacheControl: '31536000',
    });
    if (error) { showMsg('error', `PDF upload failed: ${error.message}`); }
    else {
      const { data: urlData } = supabase.storage.from('event-images').getPublicUrl(path);
      updateDocument(index, 'pdf_url', urlData.publicUrl);
    }
    setUploadingPdf(null);
    e.target.value = '';
  };

  // ── Committee helpers ─────────────────────────────────────────────────────
  const addMember = () => setCommittee(p => [...p, { name: '', role: '', phone: '', email: '' }]);
  const removeMember = (i: number) => setCommittee(p => p.filter((_, idx) => idx !== i));
  const updateMember = (i: number, key: keyof CommitteeMember, val: string) =>
    setCommittee(p => p.map((m, idx) => idx === i ? { ...m, [key]: val } : m));

  // ── Objectives helpers ────────────────────────────────────────────────────
  const addObjective = (type: 'paragraph' | 'point') => setObjectives(p => [...p, { type, content: '' }]);
  const removeObjective = (i: number) => setObjectives(p => p.filter((_, idx) => idx !== i));
  const updateObjective = (i: number, key: keyof ObjectiveBlock, val: string) =>
    setObjectives(p => p.map((o, idx) => idx === i ? { ...o, [key]: val } : o));

  // ── Document helpers ──────────────────────────────────────────────────────
  const addDocument = () => setDocuments(p => [...p, { title: '', pdf_url: '' }]);
  const removeDocument = (i: number) => setDocuments(p => p.filter((_, idx) => idx !== i));
  const updateDocument = (i: number, key: keyof ImportantDocument, val: string) =>
    setDocuments(p => p.map((d, idx) => idx === i ? { ...d, [key]: val } : d));

  // ── Contact helpers ───────────────────────────────────────────────────────
  const addContact = () => setContacts(p => [...p, { name: '', email: '', phone: '' }]);
  const removeContact = (i: number) => setContacts(p => p.filter((_, idx) => idx !== i));
  const updateContact = (i: number, key: keyof ContactPerson, val: string) =>
    setContacts(p => p.map((c, idx) => idx === i ? { ...c, [key]: val } : c));

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!formData.name?.trim()) {
      showMsg('error', 'Name is required.');
      return;
    }
    for (const c of contacts) {
      if (!c.email?.trim() && !c.phone?.trim()) {
        showMsg('error', 'Each contact must have at least an email or phone number.');
        return;
      }
    }

    setSaving(true);
    const payload = {
      ...formData,
      about,
      instagram_link: instagramLink,
      banner_image: bannerImage,
      committee,
      objectives,
      important_documents: documents,
      contact_us: contacts,
      updated_at: new Date().toISOString(),
    };

    const { error } = isNew
      ? await supabase.from('mcc_statutory_bodies').insert([payload])
      : await supabase.from('mcc_statutory_bodies').update(payload).eq('id', item.id);

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
            <p className="text-xs text-gray-400">{formData.cell_type || 'Statutory Body'}</p>
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
            <input name="name" type="text" value={formData.name || ''} onChange={handleChange} className={inputClass} placeholder="e.g. Grievance Cell" />
          </div>
          <div>
            <label className={labelClass}>Page Title</label>
            <input name="title" type="text" value={(formData as any).title || ''} onChange={handleChange} className={inputClass} placeholder="e.g. Student Grievance Cell – MCC" />
          </div>
          <div>
            <label className={labelClass}>Cell Type</label>
            <input name="cell_type" type="text" value={formData.cell_type || ''} onChange={handleChange} className={inputClass} placeholder="e.g. Statutory Cell" />
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
            <label className={labelClass}><Link2 size={12} className="inline mr-1" /> Instagram Page Link</label>
            <input
              type="url" value={instagramLink} onChange={e => setInstagramLink(e.target.value)}
              className={inputClass} placeholder="https://www.instagram.com/your_page"
            />
          </div>
        </div>

        {/* Banner Image */}
        <div className="mt-5">
          <label className={labelClass}>Banner Image</label>
          <div className="flex gap-5 items-start mt-1">
            <div className="w-56 h-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden relative group flex-shrink-0">
              {bannerImage ? (
                <>
                  <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button onClick={() => setBannerImage('')} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold">Remove</button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-300 gap-1">
                  <ImageIcon size={24} />
                  <span className="text-[11px] font-semibold">No Image</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-3">Upload a banner image (recommended: 1200×400px).</p>
              <input type="file" accept="image/*" ref={imageRef} className="hidden" onChange={handleImageUpload} />
              <button type="button" onClick={() => imageRef.current?.click()} disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50">
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
                {uploading ? 'Uploading...' : 'Choose Image'}
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 2. About ── */}
      <Section title="About" icon={<AlignLeft size={15} />}>
        <label className={labelClass}>About / Description</label>
        <textarea
          rows={6} value={about} onChange={e => setAbout(e.target.value)}
          placeholder="Write a detailed description about this cell or committee..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
        />
        <p className="text-xs text-gray-400 mt-1.5">{about.length} characters</p>
      </Section>

      {/* ── 3. Committee Members ── */}
      <Section title="Committee Members" icon={<Users size={15} />}>
        <p className="text-xs text-gray-500 mb-4">Add committee members with their name, role, and at least one contact detail.</p>
        <div className="space-y-3">
          {committee.map((m, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" value={m.name} onChange={e => updateMember(i, 'name', e.target.value)} className={inputClass} placeholder="e.g. Dr. Kavita Sharma" />
              </div>
              <div>
                <label className={labelClass}>Role / Designation</label>
                <input type="text" value={m.role} onChange={e => updateMember(i, 'role', e.target.value)} className={inputClass} placeholder="e.g. Chairperson" />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="tel" value={m.phone} onChange={e => updateMember(i, 'phone', e.target.value)} className={inputClass} placeholder="9876543210" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={m.email} onChange={e => updateMember(i, 'email', e.target.value)} className={inputClass} placeholder="member@mcc.edu" />
              </div>
              <button onClick={() => removeMember(i)}
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

      {/* ── 4. Objectives ── */}
      <Section title="Objectives" icon={<Target size={15} />}>
        <p className="text-xs text-gray-500 mb-4">Add objectives as free-form paragraphs or structured bullet points.</p>
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

      {/* ── 5. Important Documents ── */}
      <Section title="Important Documents" icon={<FileText size={15} />}>
        <p className="text-xs text-gray-500 mb-4">
          Upload PDF documents such as policies, guidelines, or reports. Enter a title and upload the PDF file.
        </p>
        <div className="space-y-3">
          {documents.map((doc, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <File size={18} />
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Document Title <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={doc.title}
                      onChange={e => updateDocument(i, 'title', e.target.value)}
                      className={inputClass}
                      placeholder="e.g. Grievance Redressal Policy 2024"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>PDF File</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="hidden"
                        ref={el => { pdfRefs.current[i] = null; }}
                      />
                      <input
                        type="file"
                        accept="application/pdf"
                        id={`pdf-upload-${i}`}
                        className="hidden"
                        onChange={e => handlePdfUpload(e, i)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById(`pdf-upload-${i}`) as HTMLInputElement;
                          input?.click();
                        }}
                        disabled={uploadingPdf === i}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 whitespace-nowrap"
                      >
                        {uploadingPdf === i
                          ? <><Loader2 size={13} className="animate-spin" /> Uploading...</>
                          : <><UploadCloud size={13} /> Upload PDF</>
                        }
                      </button>
                      {doc.pdf_url && (
                        <a
                          href={doc.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors whitespace-nowrap"
                        >
                          <ExternalLink size={12} /> View PDF
                        </a>
                      )}
                    </div>
                    {doc.pdf_url && (
                      <p className="text-[10px] text-gray-400 mt-1 truncate max-w-xs">{doc.pdf_url.split('/').pop()}</p>
                    )}
                    {!doc.pdf_url && (
                      <div className="mt-2">
                        <label className="block text-[10px] text-gray-400 mb-1">Or paste a PDF URL directly:</label>
                        <input
                          type="url"
                          value={doc.pdf_url}
                          onChange={e => updateDocument(i, 'pdf_url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white"
                          placeholder="https://..."
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={() => removeDocument(i)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all mt-5">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addDocument}
          className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#123B6D] bg-[#EBF3FF] hover:bg-[#d8e8ff] rounded-xl transition-colors">
          <Plus size={15} /> Add Document
        </button>
      </Section>

      {/* ── 6. Contact Us ── */}
      <Section title="Contact Us" icon={<Phone size={15} />}>
        <p className="text-xs text-gray-500 mb-4">
          Add contact persons for this cell or committee. Each contact <strong>must have at least an email or phone number</strong>.
        </p>
        <div className="space-y-3">
          {contacts.map((c, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
              <div>
                <label className={labelClass}>Name <span className="text-red-500">*</span></label>
                <input type="text" value={c.name} onChange={e => updateContact(i, 'name', e.target.value)} className={inputClass} placeholder="e.g. Prof. Meena Joshi" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={c.email} onChange={e => updateContact(i, 'email', e.target.value)} className={inputClass} placeholder="contact@mcc.edu" />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input type="tel" value={c.phone} onChange={e => updateContact(i, 'phone', e.target.value)} className={inputClass} placeholder="9876543210" />
              </div>
              <button onClick={() => removeContact(i)}
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
