'use client';
import React, { useState } from 'react';
import {
  Bell, X, Upload, Calendar, Clock, ChevronDown, ChevronUp, CheckSquare, Square, Loader2, CalendarDays, MapPin
} from 'lucide-react';
import {
  NOTICE_CATEGORIES, DEPARTMENTS, Notice, CALENDAR_CATEGORIES
} from '@/lib/noticeTypes';
import { supabase } from '@/lib/supabase';

interface NoticeFormProps {
  onSuccess?: (notice: Notice) => void;
  onCancel?: () => void;
}

function MultiSelectChips({
  options, selected, onChange, color = '#123B6D'
}: {
  options: { id: string; label: string }[];
  selected: string[];
  onChange: (val: string[]) => void;
  color?: string;
}) {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const active = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              active
                ? 'text-white border-transparent shadow-sm'
                : 'text-gray-600 border-gray-200 bg-white hover:border-gray-400'
            }`}
            style={active ? { backgroundColor: color } : {}}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function NoticeForm({ onSuccess, onCancel }: NoticeFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isGeneral, setIsGeneral] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);
  const [scheduleTime, setScheduleTime] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [attachments, setAttachments] = useState<{ name: string; url: string; type: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calendar fields
  const [publishCalendar, setPublishCalendar] = useState(false);
  const [calTitleSameAsNotice, setCalTitleSameAsNotice] = useState(true);
  const [calTitle, setCalTitle] = useState('');
  const [calCategory, setCalCategory] = useState('');
  const [calDate, setCalDate] = useState('');
  const [calVenue, setCalVenue] = useState('');
  const [calTime, setCalTime] = useState('');


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop() || '';
      const path = `notices/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('notice-attachments')
        .upload(path, file);

      if (error) {
        console.error('File upload error:', error);
        setError(`Failed to upload ${file.name}: ${error.message}`);
      } else if (data) {
        const { data: urlData } = supabase.storage
          .from('notice-attachments')
          .getPublicUrl(path);
        setAttachments(prev => [...prev, {
          name: file.name,
          url: urlData.publicUrl,
          type: ext.toLowerCase(),
        }]);
      }
    }
    setUploading(false);
  };

  const removeAttachment = (idx: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    if (!expiryTime) { setError('Expiry date & time is required'); return; }
    setSaving(true);
    setError(null);

    if (publishCalendar && !calDate) { setError('Calendar date is required when "Show in Calendar" is enabled'); return; }
    if (publishCalendar && !calCategory) { setError('Calendar category is required when "Show in Calendar" is enabled'); return; }

    const payload: Notice = {
      title: title.trim(),
      description: description.trim(),
      is_general: isGeneral,
      categories: selectedCategories,
      departments: selectedDepts,
      courses: selectedCourses,
      semesters: selectedSemesters,
      // If no schedule set, publish immediately (use current time)
      schedule_time: scheduleTime ? new Date(scheduleTime).toISOString() : new Date().toISOString(),
      expiry_time: new Date(expiryTime).toISOString(),
      attachments,
      // Calendar
      publish_calendar: publishCalendar,
      calendar_title: publishCalendar ? (calTitleSameAsNotice ? title.trim() : calTitle.trim()) : null,
      calendar_category: publishCalendar ? calCategory : null,
      calendar_date: publishCalendar ? calDate : null,
      calendar_venue: publishCalendar && calVenue.trim() ? calVenue.trim() : null,
      calendar_time: publishCalendar && calTime.trim() ? calTime.trim() : null,
    };

    const { data, error: dbError } = await supabase
      .from('notices')
      .insert([{ ...payload, expiry_time: payload.expiry_time || null }])
      .select()
      .single();

    if (dbError) {
      setError(dbError.message);
    } else {
      onSuccess?.(data as Notice);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Bell size={20} className="text-[#123B6D]" /> Create New Notice
        </h3>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm border border-red-100">{error}</div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notice Title <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm"
          placeholder="e.g. Exam Schedule for Semester III"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm resize-none"
          placeholder="Provide details about the notice..."
        />
      </div>

      {/* Scope */}
      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
        <label className="flex items-center gap-3 cursor-pointer">
          <button type="button" onClick={() => setIsGeneral(!isGeneral)} className="flex-shrink-0">
            {isGeneral ? <CheckSquare size={22} className="text-[#123B6D]" /> : <Square size={22} className="text-gray-400" />}
          </button>
          <div>
            <p className="font-semibold text-gray-800 text-sm">General Notice (Broadcast to All)</p>
            <p className="text-xs text-gray-500 mt-0.5">This notice will appear in the notification bell, main notice page, and quick access panel for all users.</p>
          </div>
        </label>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category <span className="text-gray-400 font-normal">(select one)</span>
        </label>
        <MultiSelectChips
          options={NOTICE_CATEGORIES.map(c => ({ id: c, label: c }))}
          selected={selectedCategories}
          onChange={(val) => {
            if (val.length === 0) {
              setSelectedCategories([]);
            } else {
              setSelectedCategories([val[val.length - 1]]);
            }
          }}
        />
      </div>

      {/* Departments & Programmes */}
      <div className="space-y-6">
        <label className="block text-sm font-semibold text-gray-700">
          Department / Programmes <span className="text-gray-400 font-normal">(for targeted notices)</span>
        </label>
        
        <div className="space-y-4">
          {DEPARTMENTS.map(dept => {
            const deptCourseIds = dept.courses.map(c => c.id);
            const deptCoursesSelected = selectedCourses.filter(cid => deptCourseIds.includes(cid));
            const allSelected = deptCoursesSelected.length === dept.courses.length;
            
            return (
              <div key={dept.id} className="space-y-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{dept.label}</span>
                  {dept.courses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (allSelected) {
                          // Deselect all for this department
                          setSelectedCourses(prev => prev.filter(c => !deptCourseIds.includes(c)));
                          setSelectedDepts(prev => prev.filter(d => d !== dept.id));
                        } else {
                          // Select all for this department
                          setSelectedCourses(prev => {
                            const next = [...prev];
                            deptCourseIds.forEach(id => {
                              if (!next.includes(id)) {
                                next.push(id);
                              }
                            });
                            return next;
                          });
                          setSelectedDepts(prev => prev.includes(dept.id) ? prev : [...prev, dept.id]);
                        }
                      }}
                      className="text-[10px] font-semibold text-[#123B6D] hover:underline"
                    >
                      {allSelected ? 'Deselect All' : 'Select All'}
                    </button>
                  )}
                </div>
                
                <MultiSelectChips
                  options={dept.courses.map(c => ({
                    id: c.id,
                    label: c.id === 'jr-college' ? 'Junior College' : (c.id === 'phd' ? 'PhD Programme' : c.id.toUpperCase().replace('-', ''))
                  }))}
                  selected={selectedCourses}
                  onChange={(newCourses) => {
                    setSelectedCourses(newCourses);
                    // Sync selectedDepts dynamically based on course selections
                    const depts = newCourses
                      .map(cId => DEPARTMENTS.find(d => d.courses.some(c => c.id === cId))?.id)
                      .filter((dId): dId is string => !!dId);
                    setSelectedDepts(Array.from(new Set(depts)));
                  }}
                  color="#D4A017"
                />
              </div>
            );
          })}
        </div>
      </div>



      {/* Schedule & Expiry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
            <Calendar size={14} /> Schedule Date & Time
            <span className="text-[10px] font-normal text-gray-400 ml-1">(optional)</span>
          </label>
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={e => setScheduleTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">Leave blank to publish immediately</p>
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
            <Clock size={14} /> Expiry Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={expiryTime}
            onChange={e => setExpiryTime(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">Notice auto-archives after this date</p>
        </div>
      </div>

      {/* ── Show in Calendar ── */}
      <div className={`rounded-2xl border-2 transition-all ${
        publishCalendar ? 'border-emerald-400 bg-emerald-50' : 'border-gray-100 bg-white'
      }`}>
        <label className="flex items-start gap-3 p-4 cursor-pointer">
          <button type="button" onClick={() => setPublishCalendar(v => !v)} className="mt-0.5 flex-shrink-0">
            {publishCalendar
              ? <CheckSquare size={22} className="text-emerald-600" />
              : <Square size={22} className="text-gray-400" />}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
              <CalendarDays size={16} className="text-emerald-600" /> Also Show in Academic Calendar
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              This notice will appear as an event on the home page calendar and the full event-calendar page. It does <strong>not</strong> expire like the notice.
            </p>

            {publishCalendar && (
              <div className="mt-4 space-y-4" onClick={e => e.stopPropagation()}>

                {/* Calendar Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Calendar Title <span className="text-red-500">*</span>
                  </label>
                  <label className="flex items-center gap-2 mb-2 cursor-pointer">
                    <button type="button" onClick={() => setCalTitleSameAsNotice(v => !v)}
                      className="flex-shrink-0">
                      {calTitleSameAsNotice
                        ? <CheckSquare size={16} className="text-emerald-600" />
                        : <Square size={16} className="text-gray-400" />}
                    </button>
                    <span className="text-xs text-gray-600">Same as notice title</span>
                  </label>
                  {!calTitleSameAsNotice && (
                    <input
                      type="text"
                      value={calTitle}
                      onChange={e => setCalTitle(e.target.value)}
                      placeholder="e.g. Orientation Programme 2025"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                    />
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CALENDAR_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCalCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          calCategory === cat
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={calDate}
                    onChange={e => setCalDate(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                  />
                  <p className="text-xs text-gray-400 mt-1">This date is independent of the notice expiry.</p>
                </div>

                {/* Optional: Venue & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1.5">
                      <MapPin size={12} /> Venue
                      <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={calVenue}
                      onChange={e => setCalVenue(e.target.value)}
                      placeholder="e.g. Hall A, Main Building"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1.5">
                      <Clock size={12} /> Time
                      <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={calTime}
                      onChange={e => setCalTime(e.target.value)}
                      placeholder="e.g. 10:00 AM – 12:00 PM"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>
        </label>
      </div>

      {/* Attachments */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Attachments (PDF, DOC, Images)</label>
        <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-[#123B6D]/40 transition-colors">
          <Upload size={18} className="text-[#123B6D]" />
          <div>
            <span className="text-sm font-medium text-[#123B6D]">Click to upload</span>
            <span className="text-xs text-gray-400 ml-1">PDF, DOC, PNG, JPG supported</span>
          </div>
          <input type="file" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className="hidden" onChange={handleFileUpload} />
        </label>
        {uploading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
            <Loader2 size={14} className="animate-spin" /> Uploading...
          </div>
        )}
        {attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {attachments.map((a, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-medium">
                <span>{a.name}</span>
                <button type="button" onClick={() => removeAttachment(i)} className="text-gray-400 hover:text-red-500">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 border-t">
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-3 bg-[#123B6D] text-white rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saving ? <><Loader2 size={16} className="animate-spin" /> Publishing...</> : <><Bell size={16} /> Publish Notice</>}
        </button>
      </div>
    </form>
  );
}
