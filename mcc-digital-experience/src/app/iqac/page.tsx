'use client';

import Link from 'next/link';
import { Target, Shield, BookOpen, ArrowRight } from 'lucide-react';

export default function IQACPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-12 font-sans">
      {/* ── Hero ── */}
      <div className="relative py-14 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute left-8 lg:left-16 top-10 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#123B6D]/40" />)}
        </div>
        <div className="absolute right-8 lg:right-16 top-10 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#123B6D]/40" />)}
        </div>
        <div className="inline-flex items-center gap-2 bg-[#123B6D]/10 border border-[#123B6D]/20 text-[#123B6D] px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
          <Target size={13} /> Internal Quality Assurance Cell
        </div>
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-[#123B6D] tracking-tight mb-4">
          IQAC
        </h1>
        <p className="text-gray-600 text-sm lg:text-base max-w-2xl px-4">
          Ensuring continuous quality enhancement through systematic assessment, feedback, and implementation of best practices at Mulund College of Commerce.
        </p>
      </div>

      {/* ── Main Navigation Cards ── */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-2 mb-6">
        <div className="grid md:grid-cols-2 gap-8">
          
          <Link href="/iqac/information-and-policies" className="group block h-full">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#123B6D] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#123B6D] mb-4">Information & Policies</h2>
              <p className="text-gray-600 mb-8 flex-1">
                Access information about the IQAC, quality policies, committee members, meeting minutes, and institutional best practices.
              </p>
              <div className="flex items-center text-[#D4A017] font-bold group-hover:translate-x-2 transition-transform">
                Explore Section <ArrowRight size={20} className="ml-2" />
              </div>
            </div>
          </Link>

          <Link href="/iqac/reports-and-initiatives" className="group block h-full">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#123B6D] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#123B6D] mb-4">Reports & Initiatives</h2>
              <p className="text-gray-600 mb-8 flex-1">
                View annual reports, academic calendars, perspective plans, and information on special initiatives like Deeksharambh and Environmental Commitments.
              </p>
              <div className="flex items-center text-[#D4A017] font-bold group-hover:translate-x-2 transition-transform">
                Explore Section <ArrowRight size={20} className="ml-2" />
              </div>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}
