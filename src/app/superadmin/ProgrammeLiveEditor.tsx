'use client';

import React, { useState } from 'react';
import { Programme } from './ProgrammesManager';
import { Save, X, Plus, Trash2, Clock, Users, FileText, Award, Building2, Calendar, Target, BookOpen, GraduationCap, Info } from 'lucide-react';

interface Props {
  initialData: Programme;
  onSave: (prog: Programme) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export default function ProgrammeLiveEditor({ initialData, onSave, onCancel, isSaving }: Props) {
  const [data, setData] = useState<Programme>({ ...initialData });
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    'Overview',
    'Faculty',
    ...(data.festivals_tab_name ? [data.festivals_tab_name] : []),
    ...(data.publication_tab_name ? [data.publication_tab_name] : []),
    'Settings'
  ];

  const handleUpdate = (field: keyof Programme, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const getSnapshotIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('time')) return <Clock size={20} strokeWidth={2} />;
    if (t.includes('seat') || t.includes('intake')) return <Users size={20} strokeWidth={2} />;
    if (t.includes('fee')) return <Award size={20} strokeWidth={2} />;
    if (t.includes('design') || t.includes('structure')) return <Building2 size={20} strokeWidth={2} />;
    if (t.includes('eligibility')) return <FileText size={20} strokeWidth={2} />;
    return <Target size={20} strokeWidth={2} />;
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col h-[85vh] relative">
      
      {/* ── Editor Toolbar ── */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">Live Editor: {data.title || 'New Programme'}</h3>
            <p className="text-xs text-gray-500 font-medium">WYSIWYG layout</p>
          </div>
        </div>
        <button onClick={() => onSave(data)} disabled={isSaving} className="px-5 py-2.5 bg-[#123B6D] text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-[#0d2d54] shadow-sm transition-colors">
          {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />} 
          Publish Changes
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50">
        
        {/* ── LIVE PREVIEW CANVAS ── */}
        <div className="max-w-7xl mx-auto w-full relative pb-24">
          
          {/* HERO SECTION */}
          <div className="bg-[#123B6D]/5 border-b border-[#123B6D]/10 pt-8 pb-16 md:pt-12 md:pb-20 relative">
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur text-[10px] font-bold tracking-wider text-gray-500 uppercase px-3 py-1 rounded-full shadow-sm border border-gray-200">Hero Section</div>
            <div className="px-4 md:px-12">
              <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Left Content */}
                <div className="flex-1 pt-4">
                  <div className="mb-6 space-y-4 max-w-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0">
                        <GraduationCap size={20} className="text-[#123B6D]" />
                      </div>
                      <input 
                        type="text" 
                        value={data.course_key} 
                        onChange={e => handleUpdate('course_key', e.target.value)} 
                        className="bg-white border border-[#3B82F6] rounded-lg px-3 py-1.5 text-sm font-mono font-bold text-[#123B6D] w-32 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 shadow-sm"
                        placeholder="Key (e.g. BCOM)"
                      />
                      <input 
                        type="text" 
                        value={data.category || ''} 
                        onChange={e => handleUpdate('category', e.target.value)} 
                        className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 w-40 focus:outline-none focus:border-[#3B82F6] shadow-sm"
                        placeholder="Category"
                      />
                    </div>
                    
                    <textarea 
                      value={data.title} 
                      onChange={e => handleUpdate('title', e.target.value)} 
                      rows={2}
                      className="w-full bg-white border border-dashed border-[#123B6D]/30 hover:border-[#123B6D] focus:border-solid focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 rounded-xl px-4 py-3 text-3xl md:text-5xl font-bold text-[#123B6D] leading-tight font-[var(--font-heading)] outline-none resize-none shadow-sm transition-all"
                      placeholder="Programme Title"
                    />
                    
                    <textarea 
                      value={data.short_info || ''} 
                      onChange={e => handleUpdate('short_info', e.target.value)} 
                      rows={2}
                      className="w-full bg-white/50 border border-dashed border-gray-300 hover:border-gray-400 focus:border-solid focus:border-[#3B82F6] focus:bg-white rounded-xl px-4 py-3 text-sm md:text-base text-gray-700 font-medium leading-relaxed outline-none resize-none transition-all"
                      placeholder="Short Information (Subtitle)..."
                    />
                  </div>
                </div>

                {/* Right Placeholder */}
                <div className="hidden lg:flex flex-1 items-center justify-center relative min-h-[300px]">
                  <div className="w-[300px] h-[300px] rounded-full border border-dashed border-[#123B6D]/20 flex items-center justify-center bg-white/40 backdrop-blur-sm">
                    <span className="text-[#123B6D]/40 font-bold text-sm tracking-widest uppercase text-center px-8">Dynamic Graphic Will Render Here</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* SNAPSHOT CARDS */}
          <div className="px-4 md:px-12 -mt-8 relative z-20">
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Snapshot Cards</h3>
                  <p className="text-xs text-gray-500">Quick facts displayed in the middle section</p>
                </div>
                <button 
                  onClick={() => handleUpdate('programme_snapshot', [...(data.programme_snapshot || []), { title: '', info: '' }])}
                  className="flex items-center gap-1.5 text-sm font-bold text-[#3B82F6] bg-[#F0F5FF] px-3 py-1.5 rounded-lg hover:bg-[#EBF3FF] transition-colors"
                >
                  <Plus size={16} /> Add Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.programme_snapshot || []).map((stat, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm relative group hover:border-[#3B82F6] transition-colors">
                    <button 
                      onClick={() => {
                        const arr = [...(data.programme_snapshot || [])];
                        arr.splice(idx, 1);
                        handleUpdate('programme_snapshot', arr);
                      }}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F0F5FF] text-[#3B82F6] flex items-center justify-center shrink-0">
                        {getSnapshotIcon(stat.title)}
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <input 
                          type="text" 
                          value={stat.title} 
                          onChange={e => {
                            const arr = [...(data.programme_snapshot || [])];
                            arr[idx].title = e.target.value;
                            handleUpdate('programme_snapshot', arr);
                          }}
                          className="w-full text-sm font-bold text-gray-500 uppercase tracking-wider bg-transparent outline-none border-b border-transparent focus:border-gray-300 mb-1"
                          placeholder="TITLE (e.g. ELIGIBILITY)"
                        />
                        <input 
                          type="text" 
                          value={stat.info} 
                          onChange={e => {
                            const arr = [...(data.programme_snapshot || [])];
                            arr[idx].info = e.target.value;
                            handleUpdate('programme_snapshot', arr);
                          }}
                          className="w-full text-base font-bold text-[#1E293B] bg-transparent outline-none border-b border-transparent focus:border-gray-300"
                          placeholder="Information..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {(!data.programme_snapshot || data.programme_snapshot.length === 0) && (
                  <div className="col-span-1 md:col-span-2 py-8 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50 text-gray-400 text-sm font-medium">
                    No snapshot cards added yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TABS SECTION */}
          <div className="px-4 md:px-12 mt-10">
            <div className="w-full overflow-x-auto scrollbar-hide py-1">
              <div className="flex items-center gap-2 min-w-max border-b border-[#E2E8F0] pb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold rounded-full transition-all whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-[#123B6D] text-white shadow-md'
                        : 'bg-white text-gray-500 border border-[#E2E8F0] hover:border-[#123B6D]/30 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              {activeTab === 'Overview' && (
                <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E2E8F0] shadow-sm relative">
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button 
                      onClick={() => handleUpdate('overview_content', [...(data.overview_content || []), ''])}
                      className="flex items-center gap-1.5 text-sm font-bold text-[#3B82F6] bg-[#F0F5FF] px-3 py-1.5 rounded-lg hover:bg-[#EBF3FF] transition-colors"
                    >
                      <Plus size={16} /> Add Paragraph
                    </button>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] mb-8 flex items-center gap-3">
                    <BookOpen size={28} className="text-[#3B82F6]" />
                    Programme Overview
                  </h2>
                  <div className="space-y-4 max-w-4xl">
                    {(data.overview_content || []).map((p, idx) => (
                      <div key={idx} className="relative group">
                        <textarea 
                          value={p}
                          onChange={e => {
                            const arr = [...(data.overview_content || [])];
                            arr[idx] = e.target.value;
                            handleUpdate('overview_content', arr);
                          }}
                          rows={4}
                          className="w-full bg-white border border-gray-200 focus:border-[#3B82F6] hover:border-gray-300 rounded-xl p-4 text-base text-gray-600 outline-none shadow-sm transition-all resize-none"
                          placeholder="Write overview paragraph..."
                        />
                        <button 
                          onClick={() => {
                            const arr = [...(data.overview_content || [])];
                            arr.splice(idx, 1);
                            handleUpdate('overview_content', arr);
                          }}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 bg-white shadow-sm border border-gray-100 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {(!data.overview_content || data.overview_content.length === 0) && (
                      <div className="py-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-xl bg-gray-50">
                        No overview paragraphs added.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'Faculty' && (
                <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E2E8F0] shadow-sm relative">
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => handleUpdate('faculty_data', [...(data.faculty_data || []), { name: '', designation: '', department: '', email: '' }])}
                      className="flex items-center gap-1.5 text-sm font-bold text-[#3B82F6] bg-[#F0F5FF] px-3 py-1.5 rounded-lg hover:bg-[#EBF3FF] transition-colors"
                    >
                      <Plus size={16} /> Add Faculty
                    </button>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] mb-8 flex items-center gap-3">
                    <Users size={28} className="text-[#3B82F6]" />
                    Faculty Members
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {(data.faculty_data || []).map((fac, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 hover:border-[#D4A017] rounded-2xl p-5 shadow-sm relative group transition-colors flex flex-col gap-3">
                        <button 
                          onClick={() => {
                            const arr = [...(data.faculty_data || [])];
                            arr.splice(idx, 1);
                            handleUpdate('faculty_data', arr);
                          }}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 bg-white/90 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                        >
                          <Trash2 size={16} />
                        </button>
                        
                        <input type="text" value={fac.name || ''} onChange={e => { const a = [...(data.faculty_data||[])]; a[idx].name = e.target.value; handleUpdate('faculty_data', a); }} className="w-full font-bold text-[#123B6D] text-lg bg-transparent border-b border-transparent focus:border-gray-300 outline-none" placeholder="Faculty Name" />
                        
                        <div className="space-y-2 flex-1">
                          <div className="flex gap-2 items-center text-sm"><span className="w-6 flex justify-center text-gray-400"><Award size={14}/></span><input type="text" value={fac.designation || ''} onChange={e => { const a = [...(data.faculty_data||[])]; a[idx].designation = e.target.value; handleUpdate('faculty_data', a); }} className="flex-1 bg-transparent border-b border-transparent focus:border-gray-300 outline-none" placeholder="Designation" /></div>
                          <div className="flex gap-2 items-center text-sm"><span className="w-6 flex justify-center text-gray-400"><GraduationCap size={14}/></span><input type="text" value={fac.education || ''} onChange={e => { const a = [...(data.faculty_data||[])]; a[idx].education = e.target.value; handleUpdate('faculty_data', a); }} className="flex-1 bg-transparent border-b border-transparent focus:border-gray-300 outline-none" placeholder="Education (e.g. Ph.D)" /></div>
                          <div className="flex gap-2 items-center text-sm"><span className="w-6 flex justify-center text-gray-400"><FileText size={14}/></span><input type="text" value={fac.department || ''} onChange={e => { const a = [...(data.faculty_data||[])]; a[idx].department = e.target.value; handleUpdate('faculty_data', a); }} className="flex-1 bg-transparent border-b border-transparent focus:border-gray-300 outline-none" placeholder="Department" /></div>
                          <div className="flex gap-2 items-center text-sm"><span className="w-6 flex justify-center text-gray-400">@</span><input type="text" value={fac.email || ''} onChange={e => { const a = [...(data.faculty_data||[])]; a[idx].email = e.target.value; handleUpdate('faculty_data', a); }} className="flex-1 bg-transparent border-b border-transparent focus:border-gray-300 outline-none text-blue-500" placeholder="Email Address" /></div>
                        </div>
                      </div>
                    ))}
                    {(!data.faculty_data || data.faculty_data.length === 0) && (
                      <div className="col-span-1 md:col-span-2 xl:col-span-3 py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <Users size={40} className="text-gray-300 mb-3" />
                        <p className="text-gray-500 font-medium">No faculty members added.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'Settings' && (
                <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E2E8F0] shadow-sm max-w-3xl">
                  <h2 className="text-xl md:text-2xl font-bold text-[#123B6D] mb-6 flex items-center gap-3">
                    <Info size={24} className="text-[#3B82F6]" />
                    Advanced Settings & Tabs
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Funding Type</label>
                        <select 
                          value={data.funding_type || ''} 
                          onChange={e => handleUpdate('funding_type', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3B82F6]"
                        >
                          <option value="Aided">Aided</option>
                          <option value="Self Financing">Self Financing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                        <input 
                          type="text" 
                          value={data.category || ''} 
                          onChange={e => handleUpdate('category', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3B82F6]"
                          placeholder="e.g. Commerce"
                        />
                      </div>
                    </div>
                    
                    <div className="p-5 bg-[#123B6D]/5 border border-[#123B6D]/10 rounded-2xl">
                      <h4 className="font-bold text-[#123B6D] mb-4 text-sm uppercase tracking-wider">Dynamic Tabs Configuration</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Custom Festivals Tab Name</label>
                          <p className="text-xs text-gray-500 mb-2">If provided, this will create a new tab for events matching this category.</p>
                          <input 
                            type="text" 
                            value={data.festivals_tab_name || ''} 
                            onChange={e => handleUpdate('festivals_tab_name', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3B82F6]"
                            placeholder="e.g. Hack-A-Thon (Col)"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Custom Publications Tab Name</label>
                          <input 
                            type="text" 
                            value={data.publication_tab_name || ''} 
                            onChange={e => handleUpdate('publication_tab_name', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3B82F6]"
                            placeholder="e.g. Tech Anugraha"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === data.festivals_tab_name && (
                <div className="bg-white rounded-3xl p-10 border border-[#E2E8F0] shadow-sm text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F0F5FF] flex items-center justify-center mx-auto mb-4"><Calendar className="text-[#3B82F6]" size={32}/></div>
                  <h3 className="text-2xl font-bold text-[#123B6D]">{data.festivals_tab_name}</h3>
                  <p className="text-gray-500 mt-2 max-w-md mx-auto">Any events published with this programme section will automatically appear in this tab.</p>
                </div>
              )}

              {activeTab === data.publication_tab_name && (
                <div className="bg-white rounded-3xl p-10 border border-[#E2E8F0] shadow-sm text-center">
                  <div className="w-16 h-16 rounded-full bg-[#FFF8E7] flex items-center justify-center mx-auto mb-4"><BookOpen className="text-[#D4A017]" size={32}/></div>
                  <h3 className="text-2xl font-bold text-[#123B6D]">{data.publication_tab_name}</h3>
                  <p className="text-gray-500 mt-2">Publication view will render here.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
