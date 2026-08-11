import type { Metadata } from 'next';
import { Download, AlertCircle, FileText, Users, FileBarChart, BookOpen, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import DynamicTimetables from '@/components/examination/DynamicTimetables';

export const metadata: Metadata = {
  title: 'Examination Hub | MCC Digital Experience Platform',
  description: 'Exam timetables, results, ATKT, revaluation and all examination-related information.',
};

export default function ExaminationPage() {

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-[#123B6D] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)] mb-2">Examination Hub</h1>
          <p className="text-white/70">Timetables, results, ATKT, revaluation and all examination services</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-8 pb-16 space-y-10">
        {/* Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Notices (Direct it to the relevant Section)</p>
            <p className="text-amber-700 text-sm">Please refer to the relevant examination notices and updates below.</p>
          </div>
        </div>

        {/* Board of Examination Section */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Board of Examination</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">
            Board of examination is the body that prepares the structures and systems for
            Examination and Evaluation for all the UG and PG Programmes. The policies and manuals
            framed by the Board are duly passed in Academic Council and Governing Body. The Board
            ensures that transparency, integrity, fairness and structured systems are built and
            maintained to keep the robustness of the exam and evaluation intact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Members */}
            <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0]">
              <h3 className="font-bold text-[#1E293B] mb-3 flex items-center gap-2">
                <Users size={18} className="text-[#123B6D]"/>
                Members
              </h3>
              <div className="relative mb-4">
                <select defaultValue="" className="w-full appearance-none bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#1E293B] font-medium focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer shadow-sm">
                  <option value="" disabled>Select Term</option>
                  <option value="2025-2027">2025-2027</option>
                  <option value="2023-2025">2023-2025</option>
                  <option value="2021-2023">2021-2023</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-[#123B6D] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0d2d54] transition-colors mt-auto">
                <Download size={16} /> Download Document
              </button>
            </div>

            {/* Minutes */}
            <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0]">
              <h3 className="font-bold text-[#1E293B] mb-3 flex items-center gap-2">
                <FileText size={18} className="text-[#123B6D]"/>
                Minutes of Meetings
              </h3>
              <div className="relative mb-4">
                <select defaultValue="" className="w-full appearance-none bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#1E293B] font-medium focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer shadow-sm">
                  <option value="" disabled>Select Academic Year</option>
                  {['2026-27', '2025-26', '2024-25', '2023-24', '2022-23', '2021-22'].map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-[#123B6D] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0d2d54] transition-colors mt-auto">
                <Download size={16} /> Download Minutes
              </button>
            </div>

            {/* Other Documents */}
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center justify-between bg-white border border-[#E2E8F0] p-4 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3">
                  <BookOpen size={20} className="text-[#123B6D] group-hover:text-blue-600" />
                  <span className="font-semibold text-sm text-[#1E293B] group-hover:text-blue-600">Examination Ordinances</span>
                </div>
                <Download size={16} className="text-gray-400 group-hover:text-blue-600" />
              </a>

              <a href="#" className="flex items-center justify-between bg-white border border-[#E2E8F0] p-4 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3">
                  <FileBarChart size={20} className="text-[#123B6D] group-hover:text-blue-600" />
                  <span className="font-semibold text-sm text-[#1E293B] group-hover:text-blue-600">Grade Point & SGPA Calculation</span>
                </div>
                <ImageIcon size={16} className="text-gray-400 group-hover:text-blue-600" />
              </a>
              
              <a href="#" className="flex items-center justify-between bg-white border border-[#E2E8F0] p-4 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-[#123B6D] group-hover:text-blue-600" />
                  <span className="font-semibold text-sm text-[#1E293B] group-hover:text-blue-600">Examination Manual</span>
                </div>
                <Download size={16} className="text-gray-400 group-hover:text-blue-600" />
              </a>
            </div>

            {/* Unfair Means Enquiry */}
            <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] md:col-span-2 lg:col-span-3">
              <h3 className="font-bold text-[#1E293B] mb-3 flex items-center gap-2">
                <ShieldAlert size={18} className="text-red-600"/>
                Unfair Means Enquiry
              </h3>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors">
                  <FileText size={16} /> Policy
                </a>
                <a href="#" className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors">
                  <AlertCircle size={16} /> Notice
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Timetables (Dynamic from public/Examination) */}
        <div id="timetables" className="scroll-mt-32">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)]">Examination Timetables & Documents</h2>
          </div>
          <DynamicTimetables />
        </div>



      </div>
    </div>
  );
}

