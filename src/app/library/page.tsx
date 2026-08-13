'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Metadata } from 'next';
import { BookOpen, FileText, ChevronRight, Bell, Users, Clock, ShieldCheck, HelpCircle, MonitorPlay, Navigation2, File, Link2, BookMarked, Layers, University } from 'lucide-react';
import Link from 'next/link';
import BookshelfCarousel from '@/components/library/BookshelfCarousel';
import LibraryNav from '@/components/library/LibraryNav';

// Removed export const metadata as it is a client component now



const eResources = [
  { title: 'Shodhganga', desc: 'A reservoir of Indian theses', icon: <Layers className="w-8 h-8 text-orange-500" /> },
  { title: 'eShodhSindhu', desc: 'Consortium for HE e-Resources', icon: <BookOpen className="w-8 h-8 text-green-600" /> },
  { title: 'National Digital Library of India', desc: 'One Library All of India', icon: <BookMarked className="w-8 h-8 text-green-800" /> },
  { title: 'NDLI Club', desc: 'Learning & Sharing Together', icon: <Users className="w-8 h-8 text-green-700" /> },
];

const featuredBooks = [
  { title: 'Book 1',  imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.27 PM.jpeg' },
  { title: 'Book 2',  imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.46 PM.jpeg' },
  { title: 'Book 3',  imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.48 PM.jpeg' },
  { title: 'Book 4',  imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.49 PM.jpeg' },
  { title: 'Book 5',  imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.51 PM.jpeg' },
  { title: 'Book 6',  imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.52 PM.jpeg' },
  { title: 'Book 7',  imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.53 PM.jpeg' },
  { title: 'Book 8',  imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.55 PM.jpeg' },
  { title: 'Book 9',  imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.56 PM.jpeg' },
  { title: 'Book 10', imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.58 PM.jpeg' },
  { title: 'Book 11', imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.38.59 PM.jpeg' },
  { title: 'Book 12', imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.39.00 PM.jpeg' },
  { title: 'Book 13', imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.39.02 PM.jpeg' },
  { title: 'Book 14', imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.39.03 PM.jpeg' },
  { title: 'Book 15', imageSrc: '/book cover/WhatsApp Image 2026-08-12 at 11.39.05 PM.jpeg' },
];

const notices = [
  { title: 'BOOK EXHIBITIONS', date: '20 May 2025', isNew: true },
  { title: 'ID CARD AND LIBRARY CARD NOTICE', date: '19 May 2025', isNew: true },
  { title: 'LIBRARY ADVISORY COMMITTEE MEETING NOTICE', date: '18 May 2025', isNew: true },
  { title: 'LIBRARY RELATED OTHER NOTICES', date: '17 May 2025', isNew: true },
  { title: 'LIBRARY ORIENTATION PROGRAMME NOTICE', date: '16 May 2025', isNew: true },
];

const features = [
  { title: '24/7 Access', desc: 'Anytime,\nAnywhere', icon: <Clock className="w-5 h-5 text-green-600" /> },
  { title: 'Trusted Resources', desc: 'Quality &\nReliable', icon: <ShieldCheck className="w-5 h-5 text-green-600" /> },
  { title: 'Research Support', desc: 'For Every\nLearner', icon: <HelpCircle className="w-5 h-5 text-green-600" /> },
  { title: 'Digital Learning', desc: 'Smarter Way\nto Learn', icon: <MonitorPlay className="w-5 h-5 text-green-600" /> },
];

export default function LibraryPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12 font-sans">
      <LibraryNav />

      {/* Hero Section */}
      <div className="relative py-12 flex flex-col items-center text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute left-8 lg:left-16 top-12 grid grid-cols-3 gap-2 opacity-60">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-green-600/40" />)}
        </div>
        <div className="absolute right-8 lg:right-16 top-12 grid grid-cols-3 gap-2 opacity-60">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-green-600/40" />)}
        </div>
        
        <p className="text-[#008e59] font-bold tracking-[0.2em] text-sm uppercase mb-3 relative inline-block">
          Welcome To
        </p>
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-[#123B6D] tracking-tight mb-4">
          MCC KNOWLEDGE RESOURCE CENTRE
        </h1>
        <p className="text-gray-600 text-sm lg:text-base max-w-2xl">
          Your gateway to knowledge, learning, and research.
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
        
        {/* Left Column: e-Resources */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#014d4e] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md">
            <BookOpen size={20} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">LIBRARY e-RESOURCES</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex flex-col gap-2">
            {eResources.map((res, i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-colors border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  {res.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-[#123B6D] mb-0.5">{res.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-tight">{res.desc}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-[#014d4e] transition-colors shrink-0" />
              </div>
            ))}
            
            <button className="mt-2 w-full py-3 bg-[#f8f9fa] hover:bg-gray-100 rounded-lg text-sm font-semibold text-[#014d4e] flex items-center justify-center gap-2 transition-colors border border-gray-100">
              <Navigation2 size={16} /> View All e-Resources
            </button>
          </div>
        </div>

        {/* Center Column: Bookshelf */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="bg-[#014d4e] rounded-t-xl rounded-b-sm p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="opacity-90" />
              <h2 className="font-bold text-sm tracking-wide">FEATURED BOOKS</h2>
            </div>
            <button className="text-xs font-semibold text-white/90 hover:text-white flex items-center gap-1">
              View All Books <ChevronRight size={14} />
            </button>
          </div>
          
          {/* Bookshelf */}
          <BookshelfCarousel books={featuredBooks} />
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-full shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-green-700">{f.title}</h4>
                  <p className="text-[10px] text-gray-500 whitespace-pre-line leading-tight mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Notices */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#014d4e] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md">
            <Bell size={20} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">LIBRARY NOTICES</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {notices.map((n, i) => (
                <div key={i} className="flex gap-3 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <FileText size={18} className="text-green-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-[#123B6D] leading-tight flex-1">
                        {n.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      {n.isNew && (
                        <span className="px-1.5 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded-sm uppercase tracking-wider">New</span>
                      )}
                      <span className="text-[10px] text-gray-500 font-medium">{n.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-2 w-full py-3 bg-[#f8f9fa] hover:bg-gray-100 rounded-lg text-sm font-semibold text-[#014d4e] flex items-center justify-center gap-2 transition-colors border border-gray-100">
               View All Notices <ChevronRight size={16} />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="text-[#014d4e]" size={24} />
              <span className="font-bold text-sm tracking-widest text-[#123B6D]">VISITORS</span>
            </div>
            <div className="flex items-center gap-1">
              {['0', '6', '8', '3', '9', '7'].map((digit, i) => (
                <div key={i} className="w-6 h-8 bg-white border border-gray-300 rounded shadow-sm flex items-center justify-center text-lg font-bold font-mono text-gray-800" style={{boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'}}>
                  {digit}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}
