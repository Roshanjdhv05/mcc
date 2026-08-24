'use client';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Home, Archive, Image as ImageIcon, Trash2, RefreshCw,
  CheckCircle, Clock, AlertTriangle, ChevronDown, ChevronUp, Eye, Plus, X, UploadCloud, Loader2, Filter, Edit2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { qk, cacheLog } from '@/lib/cache';
import { processFileForUpload } from '@/lib/fileUtils';

type HomeEvent = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  images: string[];
  published_at: string;
  publish_home: boolean;
  publish_gallery: boolean;
  status: string;
};

const CATEGORIES = [
  'Events & Activities', 'Festivals', 'Publication',
  'Industrial Visits', 'Cultural', 'Sports', 'NSS', 'Academic', 'Workshop', 'Seminar',
];

const FORUMS_CLUBS = [
  "Students' Council",
  'National Service Scheme',
  'Cultural Forum',
  'Sports and Gymkhana',
  'Natyakarmi (Theatre Group)',
  'Marathi Vangmay Mandal',
  'Aaroh (Music Club)',
  'Nature Club',
  'Women Development Cell',
  'Entrepreneurship Development Cell',
  "Students' Research",
  'Spectrum',
  'Inspira',
  'Hack-A-Thon',
  'Emporio',
  'Quantomania',
  'Manthan',
];

const PROGRAMMES = [
  { code: 'B.COM', slug: 'bcom', label: 'B.COM' },
  { code: 'BAF',   slug: 'baf',  label: 'BAF' },
  { code: 'BMS',   slug: 'bms',  label: 'BMS' },
  { code: 'BFM',   slug: 'bfm',  label: 'BFM' },
  { code: 'BFSI',  slug: 'bfsi', label: 'BFSI' },
  { code: 'BBI',   slug: 'bbi',  label: 'BBI' },
  { code: 'BCOM-BA', slug: 'bcom-ba', label: 'BCOM-BA' },
  { code: 'BCOM-MS', slug: 'bcom-ms', label: 'BCOM-MS' },
  { code: 'BSC-IT',  slug: 'bsc-it',  label: 'BSC-IT' },
  { code: 'BCA',     slug: 'bca',     label: 'BCA' },
  { code: 'BSC-DS',  slug: 'bsc-ds',  label: 'BSC-DS' },
  { code: 'SCT',     slug: 'sct',     label: 'SCT' },
  { code: 'BBA',     slug: 'bba',     label: 'BBA' },
  { code: 'BAMMC',   slug: 'bammc',   label: 'BAMMC' },
];

const FESTIVAL_SECTIONS: Record<string, string> = {
  'BAF': 'Manthan', 'BBI': 'Manthan + Shodh', 'BFM': 'Manthan',
  'BMS': 'Inspira', 'BSC-IT': 'Hack-A-Thon', 'BCA': 'Hack-A-Thon',
  'BSC-DS': 'Hack-A-Thon', 'B.COM': 'Festivals', 'BBA': 'Festivals',
  'BAMMC': 'Festivals', 'BFSI': 'Festivals', 'BCOM-BA': 'Quantomania',
  'BCOM-MS': 'Spectrum', 'SCT': 'Festivals',
};

const PUBLICATION_SECTIONS: Record<string, string> = {
  'BAF': 'Pratibimb', 'BBI': 'Pratibimb', 'BFM': 'Finanza',
  'BMS': 'Inspira', 'BSC-IT': 'Tech Anugraha', 'BCA': 'Tech Anugraha',
  'BSC-DS': 'Tech Anugraha', 'B.COM': 'Publication', 'BBA': 'Publication',
  'BAMMC': 'Shutter Speed', 'BFSI': 'Publication', 'BCOM-BA': 'Publication',
  'BCOM-MS': 'Publication', 'SCT': 'Publication',
};

function getProgrammeSectionOptions(code: string) {
  const festival = FESTIVAL_SECTIONS[code] || 'Festivals';
  const publication = PUBLICATION_SECTIONS[code] || 'Publication';
  return [
    { value: 'Events & Activities', label: 'Events & Activities' },
    { value: festival, label: festival },
    { value: publication, label: publication },
    { value: 'Industrial Visits', label: 'Industrial Visits' },
  ];
}

function getDaysAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

async function uploadFile(file: File, bucket: string, folder: string): Promise<string | null> {
  const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error || !data) { console.error(error); return null; }
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
}

function EventCard({
  event,
  isArchived,
  onRemoveFromHome,
  onRestoreToHome,
  onEdit,
}: {
  event: HomeEvent;
  isArchived: boolean;
  onRemoveFromHome: (id: string) => void | Promise<void>;
  onRestoreToHome: (id: string) => void | Promise<void>;
  onEdit?: (event: HomeEvent) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const daysAgo = getDaysAgo(event.published_at);
  const daysLeft = 180 - daysAgo;

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${isArchived ? 'border-gray-200 opacity-80' : 'border-[#E2E8F0]'}`}>
      <div className="flex items-start gap-4 p-4">
        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
          {event.images && event.images[0] ? (
            <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon size={24} className="text-gray-300" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-bold text-gray-900 text-sm truncate">{event.title}</h4>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {event.category && (
                  <span className="px-2 py-0.5 bg-[#123B6D]/10 text-[#123B6D] text-[10px] font-bold rounded-full uppercase">
                    {event.category}
                  </span>
                )}
                {event.department && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-full">
                    {event.department}
                  </span>
                )}
              </div>
            </div>

            {/* Status badge */}
            {isArchived ? (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full flex-shrink-0">
                <Archive size={11} /> Archived
              </span>
            ) : (
              <span className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                daysLeft <= 10 ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                <Clock size={11} />
                {daysLeft <= 0 ? 'Expiring soon' : `${daysLeft}d left`}
              </span>
            )}
          </div>

          <p className="text-[11px] text-gray-400 mt-1.5">
            Published: {new Date(event.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            {' '}· {daysAgo} day{daysAgo !== 1 ? 's' : ''} ago
          </p>

          {event.images && event.images.length > 0 && (
            <p className="text-[11px] text-gray-400 mt-0.5">
              {event.images.length} image{event.images.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Expandable image strip */}
      {event.images && event.images.length > 0 && (
        <div className="px-4 pb-2">
          <button
            onClick={() => setExpanded(v => !v)}
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 font-semibold transition-colors"
          >
            <Eye size={12} /> Preview images {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          {expanded && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {event.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${event.title} ${idx + 1}`}
                  className="h-16 w-24 object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100 flex-wrap">
        {!isArchived ? (
          <button
            onClick={() => onRemoveFromHome(event.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
          >
            <Archive size={13} /> Archive Event
          </button>
        ) : (
          <button
            onClick={() => onRestoreToHome(event.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <CheckCircle size={13} /> Restore Event
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(event)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#123B6D] bg-[#123B6D]/10 hover:bg-[#123B6D]/20 border border-[#123B6D]/20 rounded-lg transition-colors ml-auto"
          >
            <Edit2 size={13} /> Edit Event
          </button>
        )}
      </div>
    </div>
  );
}

export default function HomeEventsManager() {
  const [events, setEvents] = useState<HomeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState('');
  const [publishGallery, setPublishGallery] = useState(true);
  const [publishProgramme, setPublishProgramme] = useState(false);
  const [selectedProgrammes, setSelectedProgrammes] = useState<string[]>([]);
  const [programmeSections, setProgrammeSections] = useState<Record<string, string>>({});
  const [uploads, setUploads] = useState<{name: string, url: string}[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();





  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('id, title, description, category, department, images, published_at, publish_home, publish_gallery, status')
      .or('publish_gallery.eq.true,publish_home.eq.true')
      .eq('status', 'published')
      .is('programme', null)
      .order('published_at', { ascending: false });

    if (!error && data) setEvents(data as HomeEvent[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const showMsg = (type: 'success' | 'error', text: string) => {
    setActionMsg({ type, text });
    setTimeout(() => setActionMsg(null), 3500);
  };

  const handleRemoveFromHome = async (id: string) => {
    const { error } = await supabase.from('events').update({ publish_gallery: false, publish_home: false }).eq('id', id);
    if (error) showMsg('error', 'Failed to update event.');
    else {
      showMsg('success', 'Event archived.');
      cacheLog('INVALIDATED', 'events', 'archive action');
      queryClient.invalidateQueries({ queryKey: qk.gallery() });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      fetchEvents();
    }
  };

  const handleRestoreToHome = async (id: string) => {
    const { error } = await supabase.from('events').update({ publish_gallery: true }).eq('id', id);
    if (error) showMsg('error', 'Failed to restore event.');
    else {
      showMsg('success', 'Event restored to gallery.');
      cacheLog('INVALIDATED', 'events', 'restore action');
      queryClient.invalidateQueries({ queryKey: qk.gallery() });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      fetchEvents();
    }
  };



  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (let file of Array.from(files)) {
      try {
        file = await processFileForUpload(file);
      } catch (err: any) {
        showMsg('error', err.message);
        continue;
      }
      const url = await uploadFile(file, 'event-images', 'events');
      if (url) setUploads(prev => [...prev, { name: file.name, url }]);
      else showMsg('error', `Failed to upload ${file.name}`);
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleEditEvent = (event: HomeEvent) => {
    setTitle(event.title);
    setDescription(event.description);
    setCategory(event.category || '');
    setDepartment(event.department || '');
    setPublishGallery(event.publish_gallery);
    setPublishProgramme(false);
    setSelectedProgrammes([]);
    setProgrammeSections({});
    setEventDate(event.published_at.substring(0, 10)); // YYYY-MM-DD
    setUploads((event.images || []).map((img, i) => ({ name: `Image ${i+1}`, url: img })));
    setEditingEventId(event.id);
    setShowUploadForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setShowUploadForm(false);
    setEditingEventId(null);
    setTitle(''); setDescription(''); setEventDate(''); setCategory(''); setDepartment('');
    setPublishGallery(true); setPublishProgramme(false);
    setSelectedProgrammes([]); setProgrammeSections({}); setUploads([]);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category) {
      showMsg('error', 'Title and Category are required');
      return;
    }
    if (!publishGallery && !publishProgramme) {
      showMsg('error', 'Please select at least one Publish To destination');
      return;
    }
    setSaving(true);
    const imageUrls = uploads.map(u => u.url);

    if (editingEventId) {
      const updatePayload = {
        title: title.trim(),
        description: description.trim(),
        category,
        department: department || null,
        images: imageUrls,
        publish_gallery: publishGallery,
        published_at: eventDate ? new Date(eventDate).toISOString() : new Date().toISOString(),
      };
      const { error } = await supabase.from('events').update(updatePayload).eq('id', editingEventId);
      if (error) {
        showMsg('error', error.message);
      } else {
        showMsg('success', 'Event updated successfully!');
        cacheLog('INVALIDATED', 'events', 'edit action');
        queryClient.invalidateQueries({ queryKey: qk.gallery() });
        queryClient.invalidateQueries({ queryKey: ['events'] });
        resetForm();
        fetchEvents();
      }
    } else {
      // Build per-programme inserts if Programme Page is selected
      const programmeInserts = publishProgramme && selectedProgrammes.length > 0
        ? selectedProgrammes.map(code => {
            const selectedSection = programmeSections[code] || 'Events & Activities';
            const festival = FESTIVAL_SECTIONS[code] || 'Festivals';
            const publication = PUBLICATION_SECTIONS[code] || 'Publication';
            
            let dbCategory = 'Events & Activities';
            if (selectedSection === festival) {
              dbCategory = 'Festivals';
            } else if (selectedSection === publication) {
              dbCategory = 'Publication';
            } else if (selectedSection === 'Industrial Visits') {
              dbCategory = 'Industrial Visits';
            }
            
            return {
              title: title.trim(),
              description: description.trim(),
              category: dbCategory,
              department: code,
              programme: code,
              programme_section: selectedSection,
              images: imageUrls,
              videos: [],
              documents: [],
              publish_gallery: false,
              publish_home: false,
              publish_calendar: false,
              publish_programme: true,
              status: 'published',
              published_at: eventDate ? new Date(eventDate).toISOString() : new Date().toISOString(),
            };
          })
        : [];

      const basePayload: any = {
        title: title.trim(),
        description: description.trim(),
        category,
        department: department || null,
        programme: null,
        programme_section: null,
        images: imageUrls,
        videos: [],
        documents: [],
        publish_gallery: publishGallery,
        publish_home: false,
        publish_calendar: false,
        publish_programme: false,
        status: 'published',
        published_at: eventDate ? new Date(eventDate).toISOString() : new Date().toISOString(),
      };

      // Always insert base record; also insert per-programme records
      const allPayloads = programmeInserts.length > 0 ? [...programmeInserts] : [basePayload];
      if (programmeInserts.length > 0 && publishGallery) {
        allPayloads.push(basePayload);
      }

      const { error } = await supabase.from('events').insert(allPayloads);
      if (error) {
        showMsg('error', error.message);
      } else {
        showMsg('success', 'Event published successfully!');
        cacheLog('INVALIDATED', 'events', 'publish action');
        queryClient.invalidateQueries({ queryKey: qk.gallery() });
        queryClient.invalidateQueries({ queryKey: ['events'] });
        resetForm();
        fetchEvents();
      }
    }
    setSaving(false);
  };

  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const years = useMemo(() => {
    const yrs = events.map(e => new Date(e.published_at).getFullYear().toString());
    return ['all', ...Array.from(new Set(yrs))].sort((a, b) => b.localeCompare(a));
  }, [events]);

  const months = [
    { value: 'all', label: 'All Months' },
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const date = new Date(e.published_at);
      const matchesYear = selectedYear === 'all' || date.getFullYear().toString() === selectedYear;
      const matchesMonth = selectedMonth === 'all' || date.getMonth().toString() === selectedMonth;
      return matchesYear && matchesMonth;
    });
  }, [events, selectedYear, selectedMonth]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#123B6D] mb-1">{editingEventId ? 'Edit Event' : 'Create New Event'}</h3>
          <p className="text-sm text-gray-500 mb-6">{editingEventId ? 'Update event details.' : 'Upload photos and details.'}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchEvents}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          {!showUploadForm ? (
            <button
              onClick={() => { resetForm(); setShowUploadForm(true); }}
              className="flex items-center gap-2 bg-[#123B6D] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm"
            >
              <Plus size={16} /> Add New Event
            </button>
          ) : (
            <button
              onClick={() => resetForm()}
              className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors shadow-sm"
            >
              <X size={16} /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* Action message */}
      {actionMsg && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${
          actionMsg.type === 'success'
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {actionMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {actionMsg.text}
        </div>
      )}

      {/* Upload Form */}
      {showUploadForm && (
        <div className="mb-8 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <form onSubmit={handlePublish} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Event Title <span className="text-red-500">*</span></label>
                <input
                  type="text" required value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Manthan 2025 – BFM Annual Festival"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Description / Information</label>
                <textarea
                  value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the event in detail..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Event Date (When it happened)</label>
                <input
                  type="date" value={eventDate} onChange={e => setEventDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                <select
                  required value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Forum / Club</label>
                <select
                  value={department} onChange={e => setDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white"
                >
                  <option value="">Select forum/club...</option>
                  {FORUMS_CLUBS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <label className="block text-sm font-bold text-gray-700 mb-3">Publish To <span className="text-red-500">*</span> <span className="font-normal text-gray-500 text-xs">(select all that apply)</span></label>
              <div className="flex flex-wrap gap-3">

                {/* Gallery */}
                <label className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-colors flex-1 min-w-[180px] ${
                  publishGallery ? 'border-[#123B6D] bg-[#123B6D]/5' : 'border-gray-200 hover:bg-gray-50'
                }`}>
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      checked={publishGallery}
                      onChange={(e) => setPublishGallery(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#123B6D] focus:ring-[#123B6D]"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Events Gallery</div>
                    <div className="text-xs text-gray-500 mt-0.5">Show in the college Events Gallery page</div>
                  </div>
                </label>



                {/* Programme Page */}
                <label className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-colors flex-1 min-w-[180px] ${
                  publishProgramme ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'
                }`}>
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      checked={publishProgramme}
                      onChange={(e) => setPublishProgramme(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Programme Page</div>
                    <div className="text-xs text-gray-500 mt-0.5">Post this event in a specific programme's section</div>
                  </div>
                </label>

              </div>
            </div>

            {/* Programme Selector – visible when Programme Page is checked */}
            {publishProgramme && (
              <div className="border border-purple-200 bg-purple-50/40 rounded-2xl p-5 space-y-4">
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-2">Select Programmes <span className="text-red-500">*</span></p>
                  <div className="flex flex-wrap gap-2">
                    {PROGRAMMES.map(prog => {
                      const isSelected = selectedProgrammes.includes(prog.code);
                      return (
                        <button
                          key={prog.code}
                          type="button"
                          onClick={() => {
                            setSelectedProgrammes(prev =>
                              isSelected ? prev.filter(c => c !== prog.code) : [...prev, prog.code]
                            );
                            if (isSelected) {
                              setProgrammeSections(prev => { const n = {...prev}; delete n[prog.code]; return n; });
                            }
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                              : 'bg-white text-gray-600 border-gray-300 hover:border-purple-400 hover:text-purple-600'
                          }`}
                        >
                          {prog.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Per-programme section selector */}
                {selectedProgrammes.length > 0 && (
                  <div className="space-y-3">
                    {selectedProgrammes.map(code => {
                      const sectionOptions = getProgrammeSectionOptions(code);
                      return (
                        <div key={code} className="bg-white rounded-xl border border-purple-100 p-4">
                          <p className="text-xs font-bold text-gray-700 mb-2">
                            Select Section for <span className="text-purple-700">{code}</span> <span className="text-red-500">*</span>
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {sectionOptions.map(opt => {
                              const isActive = programmeSections[code] === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => setProgrammeSections(prev => ({ ...prev, [code]: opt.value }))}
                                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                    isActive
                                      ? 'bg-purple-600 text-white border-purple-600'
                                      : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-gray-100 pt-5">
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Media & Attachments</label>
              <p className="text-xs text-gray-500 mb-3">Images (JPG, PNG)</p>
              <div className="flex gap-4 items-start">
                <button
                  type="button" onClick={() => imageRef.current?.click()} disabled={uploading}
                  className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#123B6D] hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  {uploading ? <Loader2 size={24} className="animate-spin text-gray-400" /> : <UploadCloud size={24} className="text-gray-400" />}
                  <span className="text-xs font-semibold text-gray-500 mt-2">{uploading ? 'Uploading...' : 'Upload Image'}</span>
                </button>
                <input type="file" accept="image/*" multiple ref={imageRef} className="hidden" onChange={handleImageUpload} />
                
                {uploads.length > 0 && (
                  <div className="flex flex-wrap gap-3 flex-1">
                    {uploads.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img.url} alt="upload" className="w-32 h-32 object-cover rounded-xl border border-gray-200" />
                        <button
                          type="button" onClick={() => setUploads(uploads.filter((_, idx) => idx !== i))}
                          className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-[#123B6D] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0d2d54] transition-all shadow-sm"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                {saving ? 'Saving...' : editingEventId ? 'Update Event' : 'Publish Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#123B6D]" />
        </div>
      ) : (
        <>
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-500">Filter By:</span>
              </div>
              
              <div className="w-40">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white font-medium text-gray-700"
                >
                  <option value="all">All Years</option>
                  {years.filter(y => y !== 'all').map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="w-44">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] bg-white font-medium text-gray-700"
                >
                  {months.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              {(selectedYear !== 'all' || selectedMonth !== 'all') && (
                <button
                  onClick={() => { setSelectedYear('all'); setSelectedMonth('all'); }}
                  className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="text-xs text-gray-400 font-semibold">
              Showing {filteredEvents.length} of {events.length} event{events.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Events Grid */}
          <div>
            {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 flex flex-col items-center gap-3">
                <ImageIcon size={36} className="text-gray-200" />
                <p className="text-gray-400 font-semibold text-sm">No events found matching current filters</p>
                <p className="text-gray-400 text-xs">Adjust your year/month filters or publish a new event.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredEvents.map(ev => (
                  <EventCard
                    key={ev.id}
                    event={ev}
                    isArchived={!ev.publish_gallery}
                    onRemoveFromHome={handleRemoveFromHome}
                    onRestoreToHome={handleRestoreToHome}
                    onEdit={handleEditEvent}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
