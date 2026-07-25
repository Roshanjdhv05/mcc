'use client';

import { useState } from 'react';
import { FileText, ArrowRight, Home, ChevronRight, Shield, Download } from 'lucide-react';
import Link from 'next/link';

const policies = [
  { title: 'Accessibility for Persons with Disability', file: 'Accessibility for Persons with Disability.pdf' },
  { title: 'Co-Curricular Policy', file: 'Co-Curricular policy.pdf' },
  { title: 'Community Engagement Policy', file: 'Community Engagement policy.pdf' },
  { title: 'Entrepreneurship Development', file: 'ENTREPRENEURSHIP DEVELOPMENT.pdf' },
  { title: 'Field Projects Policy', file: 'Field Projects policy.pdf' },
  { title: 'Grievance Redressal Committee', file: 'Grievance Redressal Committee.pdf' },
  { title: 'Gymkhana Policy', file: 'Gymkhana Policy.pdf' },
  { title: 'IT Policy', file: 'IT Policy.pdf' },
  { title: 'Institutional Social Responsibility', file: 'Institutional Social Responsibility.pdf' },
  { title: 'Learners’ Attendance', file: 'Learners’ Attendance.pdf' },
  { title: 'Library Policy', file: 'Library Policy.pdf' },
  { title: 'On-the-Job Training (OJT) Policy', file: 'On-the-Job Training (0JT) Policy.pdf' },
  { title: 'Placement and Career Counselling', file: 'PLACEMENT AND CAREER  COUNSELLING.pdf' },
  { title: 'Policy Framework', file: 'Policy Framework.pdf' },
  { title: 'Policy for Co-Curricular Courses', file: 'Policy for Co-Curricular Courses.pdf' },
  { title: 'Policy for Field Projects', file: 'Policy for Field Projects.pdf' },
  { title: 'Promotion, Progression and Development of Women in the Campus', file: 'Promotion, Progression and Development of Women in the campus..pdf' },
  { title: 'Publications', file: 'Publications.pdf' },
  { title: 'Purchase and Procurement', file: 'Purchase and  Procurement.pdf' },
  { title: 'Quality Enhancement', file: 'Quality Enhancement.pdf' },
  { title: 'Remedial Coaching', file: 'Remedial Coaching.pdf' },
  { title: 'Research Promotion', file: 'Research Promotion.pdf' },
  { title: 'Students Council', file: 'STUDENTS COUNCIL.pdf' },
  { title: 'Safety Policy', file: 'Safety Policy.pdf' },
  { title: 'Pandemic Policy', file: 'pandemic policy.pdf' },
];

export default function QualityPolicyPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<{title: string, file: string} | null>(null);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-12 font-sans">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#123B6D] transition-colors"><Home size={14} /></Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/iqac" className="hover:text-[#123B6D] transition-colors font-medium">IQAC</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#123B6D] font-semibold">Quality Policy</span>
          </div>
        </div>
      </div>

      {/* ── Page Header ── */}
      <div className="bg-[#123B6D] text-white py-12 md:py-16">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
              <Shield size={32} className="text-[#D4A017]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3">Quality Policy</h1>
              <p className="text-blue-100 max-w-2xl text-sm md:text-base leading-relaxed">
                Explore our institutional policies that ensure continuous quality enhancement and adherence to the best practices at Mulund College of Commerce.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Policies Layout ── */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: List of Policies */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-[#1E293B]">Available Policies</h3>
              </div>
              <div className="divide-y divide-gray-100 max-h-[700px] overflow-y-auto">
                {policies.map((policy, i) => {
                  const isSelected = selectedPolicy?.file === policy.file;
                  return (
                    <div 
                      key={i} 
                      onClick={() => setSelectedPolicy(policy)}
                      className={`px-4 py-3 flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden pr-2">
                        <FileText size={16} className={isSelected ? "text-blue-500 shrink-0" : "text-gray-400 shrink-0"} />
                        <span className={`text-sm truncate ${isSelected ? 'text-blue-700 font-semibold' : 'text-gray-600'}`}>
                          {policy.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a 
                          href={`/policies/${policy.file}`}
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs font-semibold text-white bg-[#123B6D] hover:bg-[#0d2d54] transition-colors p-1.5 rounded"
                        >
                          <Download size={14} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: PDF Preview */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
              <div className="p-4 border-b border-gray-100 bg-[#123B6D] text-white flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText size={18} className="text-[#D4A017] shrink-0" />
                  <h3 className="font-bold truncate text-sm">
                    {selectedPolicy ? selectedPolicy.title : 'No policy selected'}
                  </h3>
                </div>
                {selectedPolicy && (
                  <a 
                    href={`/policies/${selectedPolicy.file}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors shrink-0 flex items-center gap-2"
                  >
                    Open <ArrowRight size={12} />
                  </a>
                )}
              </div>
              
              <div className="flex-1 bg-gray-100 relative">
                {selectedPolicy ? (
                  <iframe 
                    src={`/policies/${selectedPolicy.file}#view=FitH`} 
                    className="w-full h-full border-none"
                    title={selectedPolicy.title}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                    <FileText size={64} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium text-gray-500 mb-2">Preview Area</p>
                    <p className="text-sm">Click on a policy from the list to view it here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
