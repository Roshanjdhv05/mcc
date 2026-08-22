'use client';

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { qk, cacheLog } from '@/lib/cache';
import {
  Upload, X, FileText, CheckSquare, Square,
  Calendar, Clock, Trash2, RefreshCw, AlertCircle, Plus, Eye, GraduationCap, Bell
} from 'lucide-react';

const CATEGORIES = [
  'Time Table Regular Exam',
  'Time Table ATKT Exam',
  'Examination Notice',
  'Results'
];

const COURSES = [
  'BCOM', 'BAF', 'BFM', 'BBI', 'BMS', 'BAMMC',
  'BSCCS', 'BSCIT', 'BSCDS', 'BCA', 'MCOM',
  'MSCIT', 'MSCFINANCE', 'PhD Programme'
];

interface ExamDocument {
  id: string;
  title: string;
  category: string;
  courses: string[];
  file_url: string;
  file_type: string;
  schedule_time: string;
  notice_expiry_time: string | null;
  publish_to_notice_board: boolean;
  created_at: string;
}

export default function ExaminationManager() {
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const [documents, setDocuments] = useState<ExamDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');
  const [filterYear, setFilterYear] = useState('All');

  // Form state
  const [displayName, setDisplayName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [publishMode, setPublishMode] = useState<'all' | 'separate'>('all');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [scheduleTime, setScheduleTime] = useState('');
  const [publishToNotice, setPublishToNotice] = useState(true);
  const [noticeExpiryTime, setNoticeExpiryTime] = useState('');
  // Track whether user has manually edited the display name
  const [displayNameEdited, setDisplayNameEdited] = useState(false);
  
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  const fetchDocuments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('examination_documents')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setDocuments(data as ExamDocument[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
    // Default schedule time to now
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setScheduleTime(now.toISOString().slice(0, 16));
  }, []);

  const handleCourseToggle = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course) ? prev.filter(c => c !== course) : [...prev, course]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] || null;
    setFile(picked);
    // Auto-fill display name with filename (no extension) only if user hasn't typed their own name
    if (picked && !displayNameEdited) {
      const nameWithoutExt = picked.name.replace(/\.[^/.]+$/, '');
      setDisplayName(nameWithoutExt);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!file || !category || !scheduleTime) {
      setError('Please select a file and fill all required fields.');
      return;
    }
    
    if (publishMode === 'separate' && selectedCourses.length === 0) {
      setError('Please select at least one course.');
      return;
    }
    
    // Always published to notice board

    // Resolve final title: use the custom display name, or fall back to filename
    const finalTitle = displayName.trim() || file.name.replace(/\.[^/.]+$/, '');

    setUploading(true);

    try {
      // 1. Upload File
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('notice-attachments')
        .upload(`examination/${fileName}`, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('notice-attachments')
        .getPublicUrl(`examination/${fileName}`);
        
      const fileUrl = urlData.publicUrl;

      // 2. Insert to DB
      const finalCourses = publishMode === 'all' ? COURSES : selectedCourses;
      
      const { error: dbError } = await supabase
        .from('examination_documents')
        .insert({
          title: finalTitle,
          category,
          courses: finalCourses,
          file_url: fileUrl,
          file_type: file.type || 'application/pdf',
          schedule_time: new Date(scheduleTime).toISOString(),
          publish_to_notice_board: true,
          notice_expiry_time: noticeExpiryTime ? new Date(noticeExpiryTime).toISOString() : null
        });

      if (dbError) throw dbError;

      cacheLog('INVALIDATED', 'examination_documents', 'upload action');
      qc.invalidateQueries({ queryKey: qk.examDocs() });

      // Reset form
      setDisplayName('');
      setDisplayNameEdited(false);
      setCategory(CATEGORIES[0]);
      setPublishMode('all');
      setSelectedCourses([]);
      setFile(null);
      setPublishToNotice(false);
      setNoticeExpiryTime('');
      setActiveTab('manage');
      fetchDocuments();

    } catch (err: any) {
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await supabase.from('examination_documents').delete().eq('id', id);
      
      cacheLog('INVALIDATED', 'examination_documents', 'delete action');
      qc.invalidateQueries({ queryKey: qk.examDocs() });

      // Delete from storage
      const pathPart = fileUrl.split('/notice-attachments/')[1] || fileUrl.split('/examination/')[1];
      if (pathPart) {
        const cleanPath = pathPart.startsWith('examination/') ? pathPart : `examination/${pathPart}`;
        await supabase.storage.from('notice-attachments').remove([cleanPath]);
      }
      
      setDocuments(docs => docs.filter(d => d.id !== id));
    } catch (err: any) {
      console.error(err);
      alert('Error deleting document: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#0D1B3E] tracking-tight">Examination Hub Management</h1>
          <p className="text-gray-500 mt-1">Upload and manage timetables, results, and examination notices.</p>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-white rounded-xl border border-gray-100 shadow-sm w-fit">
        <button onClick={() => setActiveTab('manage')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'manage' ? 'bg-[#123B6D] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
          <FileText size={16} /> Manage Documents
        </button>
        <button onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'upload' ? 'bg-[#123B6D] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
          <Upload size={16} /> Upload New
        </button>
      </div>

      {activeTab === 'upload' && (
        <form onSubmit={handleUpload} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E2E8F0] bg-gray-50/50">
            <h2 className="text-lg font-bold text-[#1E293B]">Publish Examination Document</h2>
            <p className="text-sm text-gray-500">Upload a PDF file and publish it to the Examination Hub.</p>
          </div>

          <div className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 text-sm">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select value={category} onChange={e => setCategory(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] transition-all">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Course Selection */}
              <div className="space-y-4 border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Target *</label>
                
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={publishMode === 'all'} onChange={() => setPublishMode('all')} className="w-4 h-4 text-[#123B6D]" />
                    <span className="text-sm font-medium">Publish for all programmes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={publishMode === 'separate'} onChange={() => setPublishMode('separate')} className="w-4 h-4 text-[#123B6D]" />
                    <span className="text-sm font-medium">Separate for each</span>
                  </label>
                </div>

                {publishMode === 'separate' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 p-3 bg-white border border-gray-200 rounded-lg">
                    {COURSES.map(course => {
                      const isSelected = selectedCourses.includes(course);
                      return (
                        <button
                          key={course}
                          type="button"
                          onClick={() => handleCourseToggle(course)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all text-left ${
                            isSelected ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'
                          }`}
                        >
                          {isSelected ? <CheckSquare size={14} /> : <Square size={14} />}
                          {course}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* File Upload — shown first */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-[#123B6D] transition-colors bg-gray-50/50">
              <div className="flex flex-col items-center justify-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${file ? 'bg-green-50' : 'bg-blue-50'}`}>
                  <FileText size={32} className={file ? 'text-green-600' : 'text-blue-600'} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{file ? 'File Selected' : 'Upload Document'}</h3>
                {file ? (
                  <p className="text-sm text-green-700 font-medium mb-3 truncate max-w-xs">{file.name}</p>
                ) : (
                  <p className="text-sm text-gray-500 mb-4">Select a PDF file to upload.</p>
                )}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="block w-full max-w-xs text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Rename field — only for 'all programmes' mode, appears after file is selected */}
              {publishMode === 'all' && file && (
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Display Name <span className="text-gray-400 font-normal text-xs">(optional — leave blank to use filename)</span>
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={e => { setDisplayName(e.target.value); setDisplayNameEdited(true); }}
                    placeholder={file.name.replace(/\.[^/.]+$/, '')}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">This is the name students will see in the Examination Hub.</p>
                </div>
              )}
            </div>

            {/* Scheduling & Cross-Publishing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/30 p-5 rounded-2xl border border-blue-100/50">
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2 flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" /> Schedule Publication *
                </label>
                <input type="datetime-local" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]" />
              </div>

              <div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <Bell size={16} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">Always published to Notice Board</p>
                    <p className="text-xs text-emerald-600 mt-0.5">This document will automatically appear on the public notice board.</p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                    <Clock size={14} /> Notice Board Expiry Time <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input type="datetime-local" value={noticeExpiryTime} onChange={e => setNoticeExpiryTime(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400" />
                  <p className="text-[11px] text-gray-500 mt-1.5">Leave blank to keep it on the Notice Board permanently. The document will always remain in the Examination Hub.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button type="button" onClick={() => setActiveTab('manage')} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={uploading} className="bg-[#123B6D] hover:bg-blue-800 text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2">
              {uploading ? 'Uploading...' : 'Publish Document'}
            </button>
          </div>
        </form>
      )}

      {activeTab === 'manage' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-900">Manage Examination Documents</h3>
            <button onClick={fetchDocuments} className="text-gray-500 hover:text-[#123B6D] transition-colors p-2 rounded-lg hover:bg-blue-50">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          {/* Filters */}
          <div className="p-4 bg-gray-50/30 border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
            >
              <option value="All">All Programmes</option>
              {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
            >
              <option value="All">All Months</option>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>

            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D]"
            >
              <option value="All">All Years</option>
              {[new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center text-gray-400">Loading documents...</div>
          ) : documents.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-20" />
              <p>No examination documents found.</p>
            </div>
          ) : (() => {
            const filteredDocuments = documents.filter(doc => {
              const isAllProgrammes = doc.courses.length === COURSES.length || doc.courses.includes('ALL');
              if (filterCourse !== 'All' && !doc.courses.includes(filterCourse) && !isAllProgrammes) return false;
              if (filterCategory !== 'All' && doc.category !== filterCategory) return false;
              
              if (filterMonth !== 'All' || filterYear !== 'All') {
                const date = new Date(doc.schedule_time);
                if (filterMonth !== 'All' && date.getMonth() !== parseInt(filterMonth)) return false;
                if (filterYear !== 'All' && date.getFullYear() !== parseInt(filterYear)) return false;
              }
              return true;
            });

            if (filteredDocuments.length === 0) {
              return (
                <div className="py-20 text-center text-gray-400">
                  <FileText size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No documents match your filters.</p>
                </div>
              );
            }

            return (
              <div className="divide-y divide-gray-100">
                {filteredDocuments.map(doc => {
                  const isAll = doc.courses.length === COURSES.length || doc.courses.includes('ALL');
                return (
                  <div key={doc.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <FileText size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{doc.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-semibold text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">{doc.category}</span>
                          <span className="text-gray-500 flex items-center gap-1">
                            <GraduationCap size={12} />
                            {isAll ? 'All Programmes' : doc.courses.join(', ')}
                          </span>
                        </div>
                        {doc.publish_to_notice_board && (
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit font-medium">
                            <Bell size={12} /> Also published to Notice Board
                            {doc.notice_expiry_time && (
                              <span className="text-emerald-500 ml-1">
                                (Expires: {new Date(doc.notice_expiry_time).toLocaleDateString()})
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <a href={doc.file_url} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-[#123B6D] hover:bg-blue-50 rounded-lg transition-all" title="View Document">
                        <Eye size={18} />
                      </a>
                      <button onClick={() => handleDelete(doc.id, doc.file_url)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
                })}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
