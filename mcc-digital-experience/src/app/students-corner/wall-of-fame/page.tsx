'use client';

import React, { useState } from 'react';
import { useCachedWallOfFame } from '@/hooks/useCachedSupabase';
import { Activity, LayoutGrid, List } from 'lucide-react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import WallOfFameCard from '@/components/ui/WallOfFameCard';

type Category = 'All' | 'Professional Courses' | 'Culturals' | 'Sports' | 'Research' | 'Entrepreneurship' | 'Academics';

interface WallOfFameItem {
  id: string;
  student_name: string | null;
  description: string | null;
  category: Category;
  image_url: string;
  expiry_date: string | null;
  achievement_date: string | null;
}

export default function WallOfFamePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: rawItems = [], isLoading: loading } = useCachedWallOfFame();

  // Show ALL items on this page regardless of expiry_date
  const items = (rawItems as WallOfFameItem[]).sort((a, b) => {
    if (a.achievement_date && b.achievement_date) {
      return new Date(b.achievement_date).getTime() - new Date(a.achievement_date).getTime();
    }
    return 0;
  });

  const categories: Category[] = [
    'All', 'Professional Courses', 'Culturals', 'Sports', 'Research', 'Entrepreneurship', 'Academics'
  ];

  const filteredItems = items.filter(item => activeCategory === 'All' || item.category === activeCategory);

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans pb-20">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 flex items-center text-xs text-gray-500 font-semibold tracking-wide">
          <Link href="/" className="hover:text-[#123B6D] transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2 opacity-50" />
          <Link href="/students-corner" className="hover:text-[#123B6D] transition-colors">Students Corner</Link>
          <ChevronRight size={14} className="mx-2 opacity-50" />
          <span className="text-[#123B6D]">Wall of Fame</span>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="bg-[#123B6D] text-white py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
            <Activity size={14} /> Student Achievements
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-[var(--font-heading)] mb-4">Wall of Fame</h1>
          <p className="text-white/80 text-lg">
            Celebrating the outstanding accomplishments of our students across academics, sports, culturals, and more.
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#123B6D] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#123B6D]/30 hover:text-[#123B6D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-gray-200 text-[#123B6D]' : 'bg-white border border-gray-200 text-gray-400'}`}>
              <LayoutGrid size={18} />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-gray-200 text-[#123B6D]' : 'bg-white border border-gray-200 text-gray-400'}`}>
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Loading / Empty State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Activity className="animate-pulse mb-3 text-[#123B6D]" size={32} />
            <p className="font-semibold text-[#123B6D]">Loading achievements...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
            <Activity size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No achievements found</h3>
            <p className="text-gray-500">There are currently no achievements in this category.</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'
              : 'flex flex-col gap-4'
          }>
            {filteredItems.map(item => (
              <WallOfFameCard key={item.id} item={item} layout={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
