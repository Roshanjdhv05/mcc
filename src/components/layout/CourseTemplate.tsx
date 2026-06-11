"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CourseTemplateProps {
  title: string;
  description?: string;
  introductionContent?: React.ReactNode;
}

export default function CourseTemplate({ title, description, introductionContent }: CourseTemplateProps) {
  const tabs = [
    'Syllabus',
    'Faculty',
    'Management Club - Inspira',
    'NewsLetter',
    'Activity',
    'Result & Prize Distribution',
    'Industrial Visits'
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col gap-6">
        
        {/* Main Content Area (Details & Introduction) */}
        <div className="w-full bg-white p-8 md:p-12 rounded-xl shadow-sm border border-[#E2E8F0]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-[#E2E8F0] pb-6 gap-4">
             <h1 className="text-3xl md:text-4xl font-bold text-[#123B6D] font-[var(--font-heading)]">{title}</h1>
             <Button className="bg-[#123B6D] hover:bg-[#0d2d54] text-white font-semibold px-8 py-2 rounded-md shrink-0">
                Apply Now
             </Button>
          </div>
          
          <div className="prose max-w-none text-[#555555]">
            <h2 className="text-2xl font-semibold text-[#123B6D] mb-6">Introduction</h2>
            {introductionContent ? (
              <div className="space-y-4">
                {introductionContent}
              </div>
            ) : (
              <p>
                {description || 'Programme details will be updated here shortly.'}
              </p>
            )}
          </div>
        </div>

        {/* Horizontal Side-able Tabs Row */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-[#E2E8F0] bg-gray-50/50">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-4 text-sm md:text-base font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-[#123B6D] text-[#123B6D] bg-white'
                    : 'border-transparent text-[#64748B] hover:text-[#123B6D] hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="p-8 md:p-12 min-h-[300px]">
            <div className="py-12 text-center text-gray-500 italic border-2 border-dashed border-gray-200 rounded-lg">
              Content for {activeTab} will be updated shortly.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
