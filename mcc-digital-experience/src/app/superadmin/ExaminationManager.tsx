'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { qk, cacheLog } from '@/lib/cache';
import { FileText, Trash2, RefreshCw, Eye, GraduationCap, Bell, User } from 'lucide-react';

const CATEGORIES = [
  'Time Table Regular Exam',
  'Time Table ATKT Exam',
  'Examination Notice',
  'Results',
];

const COURSES = [
  'BCOM', 'BAF', 'BFM', 'BBI', 'BMS', 'BAMMC',
  'BSCCS', 'BSCIT', 'BSCDS', 'BCA', 'MCOM',
  'MSCIT', 'MSCFINANCE', 'PhD Programme',
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
  created_by?: string;
}

export default function ExaminationManager({ canDelete }: { canDelete?: boolean }) {
  const qc = useQueryClient();
  const [documents, setDocuments] = useState<ExamDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');
  const [filterYear, setFilterYear] = useState('All');

  const fetchDocuments = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('examination_documents')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setDocuments(data as ExamDocument[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      await supabase.from('examination_documents').delete().eq('id', id);

      // Clear cache completely so the public /examination page fetches fresh data
      cacheLog('INVALIDATED', 'examination_documents', 'delete action');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cache_ts_examination_documents');
      }
      await qc.refetchQueries({ queryKey: qk.examDocs() });

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
          <p className="text-gray-500 mt-1">
            View and delete timetables, results, and examination notices. To add documents, use the{' '}
            <strong>Notice System → Examination Hub</strong> section.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900">All Examination Documents</h3>
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
            <p className="text-sm mt-2">Upload documents via the Notice System → Examination Hub.</p>
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
                          {doc.created_by && (
                            <span className="text-[#123B6D] font-medium flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                              <User size={10} /> {doc.created_by}
                            </span>
                          )}
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
                      {doc.file_url ? (
                        <a href={doc.file_url} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-[#123B6D] hover:bg-blue-50 rounded-lg transition-all" title="View Document">
                          <Eye size={18} />
                        </a>
                      ) : (
                        <span className="p-2 text-gray-300 cursor-not-allowed" title="No file attached">
                          <Eye size={18} />
                        </span>
                      )}
                      {canDelete !== false && (
                        <button onClick={() => handleDelete(doc.id, doc.file_url)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
