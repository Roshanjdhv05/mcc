'use client';
import React, { useState, useEffect } from 'react';
import {
  Bell, X, Upload, Calendar, Clock, ChevronDown, ChevronUp, CheckSquare, Square, Loader2, CalendarDays, MapPin
} from 'lucide-react';
import {
  NOTICE_CATEGORIES, DEPARTMENTS, ALL_COURSE_IDS, ALL_DEPT_IDS, Notice, CALENDAR_CATEGORIES
} from '@/lib/noticeTypes';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { qk, cacheLog } from '@/lib/cache';
import { processFileForUpload } from '@/lib/fileUtils';

interface NoticeFormProps {
  onSuccess?: (notice: Notice) => void;
  onCancel?: () => void;
  initialData?: Notice;
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

export default function NoticeForm({ onSuccess, onCancel, initialData }: NoticeFormProps) {
  const isEditMode = !!initialData?.id;
  const qc = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isGeneral, setIsGeneral] = useState(false);
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

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setIsGeneral(initialData.is_general ?? false);
      setSelectedCategories(initialData.categories || []);
      setSelectedDepts(initialData.departments || []);
      setSelectedCourses(initialData.courses || []);
      setSelectedSemesters(initialData.semesters || []);
      // Convert ISO strings to datetime-local format
      if (initialData.schedule_time) {
        const d = new Date(initialData.schedule_time);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        setScheduleTime(d.toISOString().slice(0, 16));
      }
      if (initialData.expiry_time) {
        const d = new Date(initialData.expiry_time);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        setExpiryTime(d.toISOString().slice(0, 16));
      }
      setAttachments(initialData.attachments || []);
    }
  }, [initialData]);

  // Calendar fields
  const [publishCalendar, setPublishCalendar] = useState(false);
  const [calTitleSameAsNotice, setCalTitleSameAsNotice] = useState(true);
  const [calTitle, setCalTitle] = useState('');
  const [calCategory, setCalCategory] = useState('');
  const [calDate, setCalDate] = useState('');
  const [calVenue, setCalVenue] = useState('');
  const [calTime, setCalTime] = useState('');

  // Examination Hub fields
  const [publishExam, setPublishExam] = useState(false);
  const [examCategory, setExamCategory] = useState('Time Table Regular Exam');
  const [examPublishMode, setExamPublishMode] = useState<'all' | 'separate'>('all');
  const [examCourses, setExamCourses] = useState<string[]>([]);
  // Per-course upload state (only used in 'separate' mode)
  const [examCourseUploads, setExamCourseUploads] = useState<Record<string, { file: File | null; displayName: string }>>({});
  // Single file for 'all' mode
  const [examFile, setExamFile] = useState<File | null>(null);
  const [examExpiryTime, setExamExpiryTime] = useState('');

  const EXAM_CATEGORIES = [
    'Time Table Regular Exam',
    'Time Table ATKT Exam',
    'Examination Notice',
    'Results',
  ];

  const EXAM_COURSES = [
    'BCOM', 'BAF', 'BFM', 'BBI', 'BMS', 'BAMMC',
    'BSCCS', 'BSCIT', 'BSCDS', 'BCA', 'MCOM',
    'MSCIT', 'MSCFINANCE', 'PhD Programme'
  ];

  const toggleExamCourse = (course: string) => {
    setExamCourses(prev => {
      if (prev.includes(course)) {
        // Remove from selected and clean up its upload
        setExamCourseUploads(u => { const next = { ...u }; delete next[course]; return next; });
        return prev.filter(c => c !== course);
      } else {
        // Add and initialise its upload slot
        setExamCourseUploads(u => ({ ...u, [course]: { file: null, displayName: title.trim() || '' } }));
        return [...prev, course];
      }
    });
  };

  const updateCourseUpload = (course: string, patch: Partial<{ file: File | null; displayName: string }>) => {
    setExamCourseUploads(prev => ({ ...prev, [course]: { ...prev[course], ...patch } }));
  };


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    for (let file of Array.from(files)) {
      try {
        file = await processFileForUpload(file);
      } catch (err: any) {
        setError(err.message);
        setUploading(false);
        return;
      }
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

    let finalAttachments = [...attachments];

    // Also publish to Examination Hub if requested
    let singleExamFileUrl = '';
    const uploadedSeparateFiles: Record<string, string> = {};

    if (publishExam) {
      if (examPublishMode === 'all') {
        if (examFile) {
          const fileExt = examFile.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
          const { error: uploadErr } = await supabase.storage
            .from('notice-attachments')
            .upload(`examination/${fileName}`, examFile);
          if (uploadErr) {
            setError(`Failed to upload exam document: ${uploadErr.message}`);
            setSaving(false);
            return;
          }
          const { data: urlData } = supabase.storage
            .from('notice-attachments')
            .getPublicUrl(`examination/${fileName}`);
          singleExamFileUrl = urlData.publicUrl;
          finalAttachments.push({ name: examFile.name, url: singleExamFileUrl, type: fileExt || 'pdf' });
        }
      } else {
        for (const course of examCourses) {
          const upload = examCourseUploads[course];
          if (upload?.file) {
            const fileExt = upload.file.name.split('.').pop();
            const fileName = `${Date.now()}_${course}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
            const { error: uploadErr } = await supabase.storage
              .from('notice-attachments')
              .upload(`examination/${fileName}`, upload.file);
            if (uploadErr) {
              setError(`Failed to upload exam document for ${course}: ${uploadErr.message}`);
              setSaving(false);
              return;
            }
            const { data: urlData } = supabase.storage
              .from('notice-attachments')
              .getPublicUrl(`examination/${fileName}`);
            uploadedSeparateFiles[course] = urlData.publicUrl;
            finalAttachments.push({ name: upload.file.name, url: urlData.publicUrl, type: fileExt || 'pdf' });
          }
        }
      }
    }

    const payload: Notice = {
      title: title.trim(),
      description: description.trim(),
      is_general: isGeneral,
      categories: selectedCategories,
      departments: selectedDepts,
      courses: selectedCourses,
      semesters: selectedSemesters,
      schedule_time: scheduleTime ? new Date(scheduleTime).toISOString() : new Date().toISOString(),
      expiry_time: new Date(expiryTime).toISOString(),
      attachments: finalAttachments,
      publish_calendar: publishCalendar,
      calendar_title: publishCalendar ? (calTitleSameAsNotice ? title.trim() : calTitle.trim()) : null,
      calendar_category: publishCalendar ? calCategory : null,
      calendar_date: publishCalendar ? calDate : null,
      calendar_venue: publishCalendar && calVenue.trim() ? calVenue.trim() : null,
      calendar_time: publishCalendar && calTime.trim() ? calTime.trim() : null,
    };

    // --- EDIT MODE: UPDATE ---
    if (isEditMode && initialData?.id) {
      const { data, error: dbError } = await supabase
        .from('notices')
        .update({ ...payload })
        .eq('id', initialData.id)
        .select()
        .single();

      if (dbError) {
        setError(dbError.message);
        setSaving(false);
        return;
      }
      
      cacheLog('INVALIDATED', 'notices', 'edit action');
      qc.invalidateQueries({ queryKey: qk.notices() });
      qc.invalidateQueries({ queryKey: qk.jrNotices() });

      onSuccess?.(data as Notice);
      setSaving(false);
      return;
    }

    // --- CREATE MODE: INSERT ---
    const { data, error: dbError } = await supabase
      .from('notices')
      .insert([{ ...payload, expiry_time: payload.expiry_time || null }])
      .select()
      .single();

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    if (publishExam) {
      if (examPublishMode === 'all') {
        await supabase.from('examination_documents').insert({
          title: title.trim(),
          category: examCategory,
          courses: EXAM_COURSES,
          file_url: singleExamFileUrl,
          file_type: examFile?.type || 'application/pdf',
          schedule_time: payload.schedule_time,
          publish_to_notice_board: false,
          notice_expiry_time: examExpiryTime ? new Date(examExpiryTime).toISOString() : null,
        });
      } else {
        // Separate document per selected course
        for (const course of examCourses) {
          const upload = examCourseUploads[course];
          const displayTitle = upload?.displayName?.trim() || title.trim();
          await supabase.from('examination_documents').insert({
            title: displayTitle,
            category: examCategory,
            courses: [course],
            file_url: uploadedSeparateFiles[course] || '',
            file_type: upload?.file?.type || 'application/pdf',
            schedule_time: payload.schedule_time,
            publish_to_notice_board: false,
            notice_expiry_time: examExpiryTime ? new Date(examExpiryTime).toISOString() : null,
          });
        }
      }
    }
    
    cacheLog('INVALIDATED', 'notices', 'create action');
    qc.invalidateQueries({ queryKey: qk.notices() });
    qc.invalidateQueries({ queryKey: qk.jrNotices() });
    if (publishExam) {
      cacheLog('INVALIDATED', 'examination_documents', 'create action from NoticeForm');
      qc.invalidateQueries({ queryKey: qk.examDocs() });
    }

    onSuccess?.(data as Notice);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Bell size={20} className="text-[#123B6D]" /> {isEditMode ? 'Edit Notice' : 'Create New Notice'}
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

      <div className={`rounded-2xl p-4 border-2 transition-all ${isGeneral ? 'border-[#123B6D] bg-blue-50' : 'border-gray-100 bg-white'}`}>
        <label className="flex items-start gap-3 cursor-pointer">
          <button
            type="button"
            onClick={() => {
              const next = !isGeneral;
              setIsGeneral(next);
              if (next) {
                // General ON → auto-select ALL courses and depts
                setSelectedCourses(ALL_COURSE_IDS);
                setSelectedDepts(ALL_DEPT_IDS);
              } else {
                // General OFF → clear selection
                setSelectedCourses([]);
                setSelectedDepts([]);
              }
            }}
            className="flex-shrink-0 mt-0.5"
          >
            {isGeneral ? <CheckSquare size={22} className="text-[#123B6D]" /> : <Square size={22} className="text-gray-400" />}
          </button>
          <div>
            <p className="font-semibold text-gray-800 text-sm">General Notice (Broadcast to All)</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Automatically selects <strong>all programmes</strong>. Notice will appear in the notification bell,
              home page Latest Notices, the main Notice page, and <strong>every programme dashboard</strong>.
            </p>
            {!isGeneral && (
              <p className="text-xs text-amber-600 mt-1 font-medium">
                ⚠ Non-general: notice appears in bell, home latest notices & notice page — plus selected programme dashboards only.
              </p>
            )}
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
      <div className="space-y-6 transition-opacity">
        <label className="block text-sm font-semibold text-gray-700">
          Department / Programmes
          {isGeneral
            ? <span className="ml-2 text-[#123B6D] text-xs font-normal">✓ All selected (General Notice) - You can deselect if needed</span>
            : <span className="text-gray-400 font-normal"> (select targeted programmes)</span>
          }
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
                          setSelectedCourses(prev => prev.filter(c => !deptCourseIds.includes(c)));
                          setSelectedDepts(prev => prev.filter(d => d !== dept.id));
                        } else {
                          setSelectedCourses(prev => {
                            const next = [...prev];
                            deptCourseIds.forEach(id => { if (!next.includes(id)) next.push(id); });
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
                  options={dept.courses.map(c => ({ id: c.id, label: c.label }))}
                  selected={selectedCourses}
                  onChange={(newCourses) => {
                    setSelectedCourses(newCourses);
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

      {/* ── Publish to Examination Hub ── */}
      <div className={`rounded-2xl border-2 transition-all ${
        publishExam ? 'border-blue-400 bg-blue-50' : 'border-gray-100 bg-white'
      }`}>
        <label className="flex items-start gap-3 p-4 cursor-pointer">
          <button type="button" onClick={() => setPublishExam(v => !v)} className="mt-0.5 flex-shrink-0">
            {publishExam
              ? <CheckSquare size={22} className="text-blue-600" />
              : <Square size={22} className="text-gray-400" />}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
              <Upload size={16} className="text-blue-600" /> Also Publish to Examination Hub
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              This notice will also appear in the Examination Timetables &amp; Documents section under the selected course(s). Upload a PDF file for direct download.
            </p>

            {publishExam && (
              <div className="mt-4 space-y-4" onClick={e => e.stopPropagation()}>

                {/* Exam Category */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Examination Category <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EXAM_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setExamCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          examCategory === cat
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Course Target */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Course Target <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={examPublishMode === 'all'} onChange={() => setExamPublishMode('all')} className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium">All Programmes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={examPublishMode === 'separate'} onChange={() => setExamPublishMode('separate')} className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium">Select Specific</span>
                    </label>
                  </div>
                  {examPublishMode === 'separate' && (
                    <div className="space-y-3">
                      {/* Course selector grid */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 p-3 bg-white border border-gray-200 rounded-xl">
                        {EXAM_COURSES.map(course => {
                          const isSelected = examCourses.includes(course);
                          return (
                            <button
                              key={course}
                              type="button"
                              onClick={() => toggleExamCourse(course)}
                              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                                isSelected ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'
                              }`}
                            >
                              {isSelected ? <CheckSquare size={12} /> : <Square size={12} />}
                              {course}
                            </button>
                          );
                        })}
                      </div>

                      {/* Per-course upload cards — appear after selection */}
                      {examCourses.length > 0 && (
                        <div className="space-y-3 mt-2">
                          {examCourses.map(course => {
                            const upload = examCourseUploads[course] || { file: null, displayName: title.trim() };
                            return (
                              <div key={course} className="bg-white border border-blue-100 rounded-2xl p-4 space-y-3">
                                {/* Course header */}
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                                    {course}
                                  </span>
                                  <span className="text-[11px] text-gray-400">Upload PDF &amp; set display name</span>
                                </div>

                                {/* File upload */}
                                <label className="flex items-center gap-3 border-2 border-dashed border-blue-200 rounded-xl px-4 py-2.5 cursor-pointer hover:border-blue-400 transition-colors bg-blue-50/30">
                                  <Upload size={15} className="text-blue-500 shrink-0" />
                                  <span className="text-xs font-medium text-blue-600 truncate">
                                    {upload.file ? upload.file.name : 'Click to upload PDF'}
                                  </span>
                                  <input
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={async e => {
                                      if (e.target.files?.[0]) {
                                        try {
                                          const file = await processFileForUpload(e.target.files[0]);
                                          updateCourseUpload(course, { file });
                                        } catch (err: any) {
                                          setError(err.message);
                                        }
                                      } else {
                                        updateCourseUpload(course, { file: null });
                                      }
                                    }}
                                  />
                                </label>

                                {/* Display name rename */}
                                <div>
                                  <label className="block text-[11px] font-bold text-gray-500 mb-1">Display name in Examination Hub</label>
                                  <input
                                    type="text"
                                    value={upload.displayName}
                                    onChange={e => updateCourseUpload(course, { displayName: e.target.value })}
                                    placeholder={`e.g. ${course} Sem 1 Regular Timetable`}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* PDF Upload — only shown in 'all' mode */}
                {examPublishMode === 'all' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">PDF File (optional)</label>
                  <label className="flex items-center gap-3 border-2 border-dashed border-blue-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition-colors bg-white">
                    <Upload size={16} className="text-blue-600" />
                    <div>
                      <span className="text-sm font-medium text-blue-600">
                        {examFile ? examFile.name : 'Click to upload PDF'}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">PDF only</span>
                    </div>
                    <input type="file" accept="application/pdf" className="hidden"
                      onChange={async e => {
                        if (e.target.files?.[0]) {
                          try {
                            const file = await processFileForUpload(e.target.files[0]);
                            setExamFile(file);
                          } catch (err: any) {
                            setError(err.message);
                          }
                        } else {
                          setExamFile(null);
                        }
                      }} />
                  </label>
                </div>
                )}

                {/* Exam Hub Expiry */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1.5">
                    <Clock size={12} /> Exam Hub Expiry
                    <span className="font-normal text-gray-400">(optional – independent of notice expiry)</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={examExpiryTime}
                    onChange={e => setExamExpiryTime(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  />
                  <p className="text-xs text-gray-400 mt-1">Leave blank to keep it in the Examination Hub permanently.</p>
                </div>

              </div>
            )}
          </div>
        </label>
      </div>

      {/* Attachments */}
      <div className={`transition-opacity ${publishExam ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Attachments (PDF, DOC, Images)
          {publishExam && <span className="ml-2 text-blue-600 text-xs font-normal">⚠ Disabled (Use Exam Hub upload instead)</span>}
        </label>
        <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-[#123B6D]/40 transition-colors">
          <Upload size={18} className="text-[#123B6D]" />
          <div>
            <span className="text-sm font-medium text-[#123B6D]">Click to upload</span>
            <span className="text-xs text-gray-400 ml-1">PDF, DOC, PNG, JPG supported</span>
          </div>
          <input type="file" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className="hidden" onChange={handleFileUpload} disabled={publishExam} />
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
          {saving
            ? <><Loader2 size={16} className="animate-spin" /> {isEditMode ? 'Saving...' : 'Publishing...'}</>
            : <><Bell size={16} /> {isEditMode ? 'Save Changes' : 'Publish Notice'}</>
          }
        </button>
      </div>
    </form>
  );
}
