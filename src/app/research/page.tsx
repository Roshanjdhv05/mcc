'use client';

import React from 'react';
import CornerPageLayout from '@/components/layout/CornerPageLayout';
import type { CategoryItem, DataItem } from '@/components/layout/CornerPageLayout';
import {
  Users, BookOpen, Activity, FileText, Award, FileCheck, Library, ChevronRight, Target, FileSearch, Lightbulb, Link as LinkIcon
} from 'lucide-react';

const categories: CategoryItem[] = [
  { id: 'about', label: 'About & Committee', icon: Users },
  { id: 'centre', label: 'Research Centre', icon: Library },
  { id: 'policies', label: 'Policies', icon: FileCheck },
  { id: 'competitions', label: 'Competitions & Events', icon: Activity },
  { id: 'publications', label: 'Publications & Resources', icon: BookOpen },
];

const data: Record<string, DataItem[]> = {
  about: [
    { title: 'Objective', icon: Target, links: [] },
    { title: 'Committee', icon: Users, links: [
      { label: 'List of Members' },
      { label: 'Annual Reports' },
    ] },
  ],
  centre: [
    { title: 'Research Centre', icon: Library, links: [
      { label: 'Research Centre Recognition' },
      { label: 'Research Guides' },
      { label: 'Research Scholars' },
      { label: 'Awarded Thesis' },
      { label: 'Application (Explain the process)' },
    ] },
  ],
  policies: [
    { title: 'Research Policies', icon: FileCheck, links: [
      { label: 'Research Policy' },
      { label: 'Plagiarism Policy' },
      { label: 'Application for Plagiarism check' },
    ] },
  ],
  competitions: [
    { title: 'Avishkar', description: '(University of Mumbai- Competition)', icon: Activity, links: [] },
    { title: 'Shodh', description: '(Inter-collegiate Research Competition)', icon: Activity, links: [] },
    { title: 'PTVA’s Inter-institutional Research Conclave', icon: Award, links: [] },
  ],
  publications: [
    { title: 'Research Journal', icon: BookOpen, links: [
      { label: 'About the Journal' },
      { label: 'Board of Editors' },
      { label: 'Volume and Issues' },
    ] },
    { title: 'Resources', icon: LinkIcon, links: [] },
  ],
};

export default function ResearchPage() {
  return (
    <>
      {/* MOBILE LAYOUT (Unchanged structure, updated data) */}
      <div className="md:hidden">
        <CornerPageLayout
          title="RESEARCH"
          subtitle="Fostering a culture of innovation and inquiry. Explore our research centers, policies, ongoing projects, and major publications."
          heroImage="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"
          HeroIcon={FileSearch}
          heroLabel="MCC Research"
          categories={categories}
          data={data}
        />
      </div>

      {/* DESKTOP LAYOUT (New Redesign) */}
      <div className="hidden md:block bg-[#F8FAFC] font-sans pb-16">
        
        {/* HERO SECTION */}
        <div className="relative w-full h-[450px] bg-white flex overflow-hidden shadow-sm">
          {/* Subtle dotted background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#123B6D 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="w-[55%] h-full flex flex-col justify-center pl-16 xl:pl-24 pr-8 z-10">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#123B6D] font-[var(--font-heading)] tracking-tight mb-6">
              RESEARCH
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-[450px] mb-10">
              Fostering a culture of innovation and inquiry. Explore our research centers, policies, ongoing projects, and major publications.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 pr-8">
                <div className="w-12 h-12 rounded-full bg-[#123B6D] flex items-center justify-center flex-shrink-0">
                  <FileSearch size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1E293B]">12+</h4>
                  <p className="text-xs text-gray-500 font-medium">Research<br/>Projects</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 pr-8">
                <div className="w-12 h-12 rounded-full bg-[#D4A017] flex items-center justify-center flex-shrink-0">
                  <FileText size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1E293B]">25+</h4>
                  <p className="text-xs text-gray-500 font-medium">Publications</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 pr-8">
                <div className="w-12 h-12 rounded-full bg-[#123B6D] flex items-center justify-center flex-shrink-0">
                  <Library size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1E293B]">06</h4>
                  <p className="text-xs text-gray-500 font-medium">Research<br/>Centres</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Curved Image on the Right */}
          <div className="absolute top-0 right-0 w-[55%] h-full">
            <div className="absolute inset-0 bg-[#123B6D] w-full h-full" 
                 style={{ clipPath: 'ellipse(70% 100% at 75% 50%)' }}></div>
            <div className="absolute top-0 right-0 w-[98%] h-full bg-[#D4A017] z-10" 
                 style={{ clipPath: 'ellipse(70% 100% at 75% 50%)' }}></div>
            <div className="absolute top-0 right-0 w-[97%] h-full z-20 overflow-hidden" 
                 style={{ clipPath: 'ellipse(70% 100% at 75% 50%)' }}>
              <img 
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop" 
                alt="Laboratory equipment" 
                className="w-full h-full object-cover opacity-90 mix-blend-multiply filter brightness-110"
              />
              <div className="absolute inset-0 bg-[#123B6D]/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="max-w-[1200px] mx-auto px-8 pt-12 space-y-12">
          
          {/* 1. ABOUT & COMMITTEE */}
          <section>
            <h3 className="flex items-center gap-3 text-sm font-bold text-[#123B6D] uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">
              <Users size={18} />
              ABOUT & COMMITTEE
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-start gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D]/5 transition-colors">
                  <Target size={24} className="text-[#123B6D]" />
                </div>
                <div className="flex-1 mt-1">
                  <h4 className="text-[17px] font-bold text-[#1E293B] mb-2">Objective</h4>
                  <p className="text-sm text-gray-500 leading-relaxed pr-4">Goals and primary objectives driving research within the institution.</p>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-[#123B6D] transition-colors mt-4" />
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-start gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D]/5 transition-colors">
                  <Users size={24} className="text-[#123B6D]" />
                </div>
                <div className="flex-1 mt-1">
                  <h4 className="text-[17px] font-bold text-[#1E293B] mb-3">Committee</h4>
                  <ul className="space-y-2 text-sm text-gray-600 font-medium">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>List of Members</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Annual Reports</li>
                  </ul>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-[#123B6D] transition-colors mt-4" />
              </div>
            </div>
          </section>

          {/* 2. RESEARCH CENTRE */}
          <section>
            <h3 className="flex items-center gap-3 text-sm font-bold text-[#123B6D] uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">
              <Library size={18} />
              RESEARCH CENTRE
            </h3>
            <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-center gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow group cursor-pointer w-full">
              <div className="w-14 h-14 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D]/5 transition-colors">
                <Library size={24} className="text-[#123B6D]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] font-bold text-[#1E293B] mb-3">Research Centre</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-600 font-medium">
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Research Centre Recognition</div>
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Research Guides</div>
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Research Scholars</div>
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Awarded Thesis</div>
                  <div className="flex items-center gap-2 col-span-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Application (Explain the process)</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-[#123B6D] transition-colors" />
            </div>
          </section>

          {/* 3. POLICIES */}
          <section>
            <h3 className="flex items-center gap-3 text-sm font-bold text-[#123B6D] uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">
              <FileCheck size={18} />
              POLICIES
            </h3>
            <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-start gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow group cursor-pointer w-full">
              <div className="w-14 h-14 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D]/5 transition-colors">
                <FileCheck size={24} className="text-[#123B6D]" />
              </div>
              <div className="flex-1 mt-1">
                <h4 className="text-[17px] font-bold text-[#1E293B] mb-3">Research Policies</h4>
                <ul className="space-y-2 text-sm text-gray-600 font-medium">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Research Policy</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Plagiarism Policy</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Application for Plagiarism check</li>
                </ul>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-[#123B6D] transition-colors mt-4" />
            </div>
          </section>

          {/* 4. COMPETITIONS & EVENTS */}
          <section>
            <h3 className="flex items-center gap-3 text-sm font-bold text-[#123B6D] uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">
              <Activity size={18} />
              COMPETITIONS & EVENTS
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-center gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D]/5 transition-colors">
                  <Activity size={24} className="text-[#123B6D]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[17px] font-bold text-[#1E293B] mb-1">Avishkar</h4>
                  <p className="text-[13px] text-gray-500">University of Mumbai- Competition</p>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-[#123B6D] transition-colors" />
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-center gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D]/5 transition-colors">
                  <Activity size={24} className="text-[#123B6D]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[17px] font-bold text-[#1E293B] mb-1">Shodh</h4>
                  <p className="text-[13px] text-gray-500">Inter-collegiate Research Competition</p>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-[#123B6D] transition-colors" />
              </div>
              
              <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-center gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D]/5 transition-colors">
                  <Award size={24} className="text-[#123B6D]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[17px] font-bold text-[#1E293B] mb-1">PTVA Conclave</h4>
                  <p className="text-[13px] text-gray-500">Inter-institutional Research Conclave</p>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-[#123B6D] transition-colors" />
              </div>
            </div>
          </section>

          {/* 5. PUBLICATIONS & RESOURCES */}
          <section>
            <h3 className="flex items-center gap-3 text-sm font-bold text-[#123B6D] uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">
              <BookOpen size={18} />
              PUBLICATIONS & RESOURCES
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-start gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D]/5 transition-colors">
                  <BookOpen size={20} className="text-[#123B6D]" />
                </div>
                <div className="flex-1 mt-1">
                  <h4 className="text-base font-bold text-[#1E293B] mb-3">Research Journal</h4>
                  <ul className="space-y-2 text-sm text-gray-600 font-medium">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>About the Journal</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Board of Editors</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#D4A017]"></div>Volume and Issues</li>
                  </ul>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#123B6D] transition-colors mt-2" />
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#123B6D]/5 transition-colors">
                  <LinkIcon size={20} className="text-[#123B6D]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-[#1E293B] mb-1">Resources</h4>
                  <p className="text-[13px] text-gray-500">Access templates, forms, and external research links.</p>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#123B6D] transition-colors" />
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
