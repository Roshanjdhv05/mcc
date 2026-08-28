'use client';

import { useState, useRef, useEffect } from 'react';
import { FileText, Download, Folder, ChevronLeft, GraduationCap, RefreshCw } from 'lucide-react';
import { useCachedExamDocs } from '@/hooks/useCachedSupabase';

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------
export type ExamFile = { name: string; url: string; isExpired?: boolean };
export type ExamCategory = { name: string; files: ExamFile[] };
export type ExamProgramme = { name: string; categories: ExamCategory[]; directFiles: ExamFile[] };

// -----------------------------------------------------------------------
// DB type from Supabase
// -----------------------------------------------------------------------
interface ExamDocument {
  id: string;
  title: string;
  category: string;
  courses: string[];
  file_url: string;
  schedule_time: string;
  notice_expiry_time?: string;
}

// -----------------------------------------------------------------------
// Known courses with display names
// -----------------------------------------------------------------------
const COURSES = [
  { id: 'BCOM',         label: 'B.Com' },
  { id: 'BCOM-BA',      label: 'B.Com BA' },
  { id: 'BCOM-MS',      label: 'B.Com MS' },
  { id: 'BAF',          label: 'BAF' },
  { id: 'BBI',          label: 'BBI' },
  { id: 'BFM',          label: 'BFM' },
  { id: 'BMS',          label: 'BMS' },
  { id: 'BFSI',         label: 'BFSI' },
  { id: 'BBA',          label: 'BBA' },
  { id: 'BAMMC',        label: 'BAMMC' },
  { id: 'BSCCS',        label: 'B.Sc CS' },
  { id: 'BSCIT',        label: 'B.Sc IT' },
  { id: 'BSCDS',        label: 'B.Sc DS' },
  { id: 'BCA',          label: 'BCA' },
  { id: 'MCOM',         label: 'M.Com' },
  { id: 'MSCIT',        label: 'M.Sc IT' },
  { id: 'MSCFINANCE',   label: 'M.Sc Finance' },
  { id: 'PhD Programme',label: 'Ph.D. Programme' },
];

// -----------------------------------------------------------------------
// Category colour pills
// -----------------------------------------------------------------------
const CAT_COLORS: Record<string, string> = {
  'Time Table Regular Exam': 'bg-green-100  text-green-700  border-green-200',
  'Time Table ATKT Exam':    'bg-orange-100 text-orange-700 border-orange-200',
  'Examination Notice':      'bg-blue-100   text-blue-700   border-blue-200',
  'Results':                 'bg-purple-100 text-purple-700 border-purple-200',
};

const TAB_CATEGORIES = [
  'Time Table Regular Exam',
  'Time Table ATKT Exam',
  'Examination Notice',
  'Results',
];

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------
export default function DynamicTimetables({ data }: { data?: ExamProgramme[] }) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCat, setSelectedCat]       = useState<string | null>(null);
  const [previewPdf, setPreviewPdf]         = useState<ExamFile | null>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);

  // Cached data
  const { data: dbDocs = [], isLoading: loading } = useCachedExamDocs();

  // Auto-scroll to mobile preview when PDF is selected
  useEffect(() => {
    if (previewPdf && mobilePreviewRef.current) {
      setTimeout(() => {
        mobilePreviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [previewPdf]);

  // Build course → category → files index from Supabase data
  const courseIndex: Record<string, Record<string, ExamFile[]>> = {};
  const nowTime = new Date().getTime();

  for (const doc of dbDocs) {
    let isExpired = false;
    if (doc.notice_expiry_time) {
      const expiryTime = new Date(doc.notice_expiry_time).getTime();
      if (nowTime > expiryTime) {
        // Expired document
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        if (nowTime > expiryTime + thirtyDays) {
          // Remove completely if older than 30 days past expiry
          continue; 
        }
        isExpired = true;
      }
    }

    const file: ExamFile = { name: doc.title, url: doc.file_url, isExpired };
    for (let courseId of doc.courses) {
      // Normalize newer NoticeForm course IDs to match the component's legacy IDs
      if (courseId === 'B.COM') courseId = 'BCOM';
      if (courseId === 'BSC-IT') courseId = 'BSCIT';
      if (courseId === 'BSC-DS') courseId = 'BSCDS';

      if (!courseIndex[courseId]) courseIndex[courseId] = {};
      if (!courseIndex[courseId][doc.category]) courseIndex[courseId][doc.category] = [];
      if (!courseIndex[courseId][doc.category].find(f => f.url === file.url)) {
        courseIndex[courseId][doc.category].push(file);
      }
    }
  }

  // Only show course boxes that actually have data
  const activeCourses = COURSES.filter(c => courseIndex[c.id] && Object.keys(courseIndex[c.id]).length > 0);

  // ---- STEP 1: Loading State ----
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <RefreshCw className="animate-spin mr-2" size={20} /> Loading examination documents...
      </div>
    );
  }

  // ---- STEP 1: Course grid ----
  if (!selectedCourse) {
    if (activeCourses.length === 0) {
      return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-16 text-center text-gray-400">
          <FileText size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-medium">No examination documents have been published yet.</p>
          <p className="text-sm mt-1">Documents uploaded via the Superadmin portal will appear here.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {activeCourses.map(course => {
          const cats = courseIndex[course.id];
          const totalFiles = Object.values(cats).reduce((a, b) => a + b.length, 0);
          return (
            <button
              key={course.id}
              onClick={() => { setSelectedCourse(course.id); setSelectedCat(null); setPreviewPdf(null); }}
              className="flex flex-col items-start p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#123B6D] hover:-translate-y-1 transition-all group text-left gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#123B6D] transition-colors shrink-0">
                <FileText size={20} className="text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-black text-[#1E293B] text-base font-[var(--font-heading)] group-hover:text-[#123B6D] transition-colors">
                {course.label}
              </h3>
              <p className="text-gray-400 text-xs">{totalFiles} document{totalFiles !== 1 ? 's' : ''}</p>
            </button>
          );
        })}
      </div>
    );
  }

  // ---- STEP 2: Split view for selected course ----
  const courseInfo  = COURSES.find(c => c.id === selectedCourse)!;
  const cats        = courseIndex[selectedCourse] || {};
  const catNames    = TAB_CATEGORIES;

  const activeCat   = selectedCat || catNames[0];
  const activeFiles = cats[activeCat] || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden md:h-[75vh] md:min-h-[580px]">

      {/* Top bar */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200 bg-[#123B6D] shrink-0">
        <button
          onClick={() => { setSelectedCourse(null); setSelectedCat(null); setPreviewPdf(null); }}
          className="flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm transition-colors"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <h2 className="text-lg font-black text-white font-[var(--font-heading)]">
          {courseInfo.label} — Timetables & Documents
        </h2>
      </div>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">

        {/* Sidebar: always visible on mobile. On desktop: fixed width column */}
        <div className="w-full md:w-72 lg:w-80 md:border-r border-gray-200 flex flex-col bg-gray-50 md:overflow-y-auto shrink-0">
          {/* Category tabs */}
          <div className="p-3 border-b border-gray-200 flex flex-col gap-1.5 shrink-0">
            {catNames.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCat(cat); setPreviewPdf(null); }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${
                  activeCat === cat
                    ? 'bg-[#123B6D] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-white hover:text-[#123B6D]'
                }`}
              >
                <Folder size={16} />
                {cat}
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border font-semibold ${
                  activeCat === cat ? 'bg-white/20 text-white border-white/30' : (CAT_COLORS[cat] || 'bg-gray-100 text-gray-500 border-gray-200')
                }`}>
                  {(cats[cat] || []).length}
                </span>
              </button>
            ))}
          </div>

          {/* File list */}
          <div className="p-3 space-y-1 overflow-y-auto md:flex-1 max-h-[40vh] md:max-h-none">
            {activeFiles.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">No documents in this category.</div>
            )}
            {activeFiles.map((file, j) => {
              const isSelected = previewPdf?.name === file.name;
              return (
                <button
                  key={j}
                  onClick={() => {
                    if (file.isExpired) {
                      setPreviewPdf({ ...file, url: '' }); // Empty URL to show "No preview available"
                    } else {
                      setPreviewPdf(file);
                    }
                  }}
                  title={file.name}
                  className={`w-full flex items-start gap-2.5 p-3 rounded-xl text-left transition-all group ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 text-gray-700'
                  }`}
                >
                  <FileText size={16} className={`shrink-0 mt-0.5 ${isSelected ? 'text-blue-600' : 'text-gray-400 group-hover:text-[#123B6D]'}`} />
                  <span className={`text-xs leading-relaxed font-medium line-clamp-3 ${file.isExpired ? 'line-through text-gray-400' : ''}`}>
                    {file.name} {file.isExpired && <span className="ml-1 text-[9px] text-red-500 uppercase font-bold no-underline inline-block">(Expired)</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile PDF Preview — rendered below file list on small screens */}
        {previewPdf && (
          <div ref={mobilePreviewRef} className="md:hidden border-t border-gray-200 flex flex-col bg-gray-100" style={{ height: '60vh' }}>
            <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm shrink-0">
              <span className="font-semibold text-gray-800 text-xs truncate mr-3">{previewPdf.name}</span>
              {previewPdf.url && (
                <a href={previewPdf.url} download className="flex items-center gap-1 px-3 py-1.5 bg-[#123B6D] text-white rounded-lg text-xs font-bold hover:bg-[#0d2d54] transition-colors shrink-0">
                  <Download size={12} /> Download
                </a>
              )}
            </div>
            {previewPdf.url ? (
              <iframe key={previewPdf.url} src={previewPdf.url} className="w-full flex-1 border-0" title={previewPdf.name} />
            ) : (
              <div className="w-full flex-1 flex items-center justify-center text-gray-400 bg-white"><p className="text-sm">No preview available</p></div>
            )}
          </div>
        )}

        {/* Desktop PDF Preview Pane (side-by-side, hidden on mobile) */}
        <div className="hidden md:flex flex-1 bg-gray-100 flex-col overflow-hidden">
          {previewPdf ? (
            <>
              <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm shrink-0">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm truncate">{previewPdf.name}</span>
                </div>
                {previewPdf.url && (
                  <a href={previewPdf.url} download className="flex items-center gap-2 px-4 py-2 bg-[#123B6D] text-white rounded-xl text-xs font-bold hover:bg-[#0d2d54] transition-colors shrink-0 ml-4">
                    <Download size={14} /> Download
                  </a>
                )}
              </div>
              {previewPdf.url ? (
                <iframe key={previewPdf.url} src={previewPdf.url} className="w-full flex-1 border-0" title={previewPdf.name} />
              ) : (
                <div className="w-full flex-1 flex items-center justify-center text-gray-400 bg-white"><p className="text-sm">No preview available</p></div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center">
                <GraduationCap size={32} className="text-gray-300" />
              </div>
              <p className="text-sm font-medium">Select a document to preview</p>
              <p className="text-xs text-gray-300">PDF will display here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
