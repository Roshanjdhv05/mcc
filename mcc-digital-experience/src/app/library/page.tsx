'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Metadata } from 'next';
import { BookOpen, FileText, ChevronRight, Bell, Users, Clock, ShieldCheck, HelpCircle, MonitorPlay, Navigation2, File, Link2, BookMarked, Layers, University } from 'lucide-react';
import Link from 'next/link';
import BookshelfCarousel from '@/components/library/BookshelfCarousel';
import LibraryNav from '@/components/library/LibraryNav';

// Removed export const metadata as it is a client component now



const eResources = [
  { title: 'Old Question Papers', desc: 'Past year question banks', icon: <FileText className="w-8 h-8 text-orange-600" />, href: 'https://drive.google.com/drive/u/4/folders/1A3Rc1j3nozvIp5EzKzcC_xiRqkWBMdrB' },
  { title: "College Magazine 'Vision'", desc: 'Annual college publication', icon: <BookOpen className="w-8 h-8 text-green-600" />, href: 'https://drive.google.com/drive/folders/15q6lsDIdoitN6yP_S0B5GDbDK_kCtRWH' },
  { title: 'Various Forms', desc: 'Library & admin forms', icon: <File className="w-8 h-8 text-blue-500" />, href: 'https://drive.google.com/drive/folders/1bkvFwoM_NakdsPUnaABo8qvpZIxkpM21' },
  { title: 'News Paper Clipping', desc: 'College in the news', icon: <FileText className="w-8 h-8 text-yellow-600" />, href: 'https://drive.google.com/drive/folders/1DPjEZDMdBRkCbc-o-RuAlx1p4-Z3oySv' },
  { title: 'Audio/Video Lectures', desc: 'Recorded academic content', icon: <MonitorPlay className="w-8 h-8 text-purple-600" />, href: 'https://drive.google.com/drive/folders/1k7Kgd99LrIjktSPjiH00bOaPeT7_8d6u' },
  { title: 'Library Collection', desc: 'Browse the full catalogue', icon: <BookMarked className="w-8 h-8 text-teal-600" />, href: 'https://drive.google.com/drive/folders/1aGJ2RoQOOgTnX4AKujBJbh2L6sygE-IS' },
  { title: 'Print Journals', desc: 'Subscribed print journals', icon: <Layers className="w-8 h-8 text-rose-500" />, href: 'https://drive.google.com/drive/folders/1ofo5BRQW8Na_TPgojst5kL1zlgnILC7_' },
  { title: 'J-Gate Database', desc: 'Journal gateway database', icon: <University className="w-8 h-8 text-indigo-600" />, href: 'https://jgatenext.com/' },
];

const libraryStaff = [
  { sr: 1, name: 'MR. AMEY RANADE', designation: 'I/C LIBRARIAN' },
  { sr: 2, name: 'MR. RAKESH GOSAVI', designation: 'JR. CLERK' },
  { sr: 3, name: 'MR. VINAY SATPURKAR', designation: 'JR. CLERK (SFC LIBRARY)' },
  { sr: 4, name: 'MR. PRASHANT KAMBLE', designation: 'JR. CLERK (SFC LIBRARY)' },
  { sr: 5, name: 'MR. VIJAYSING TANSING PATIL', designation: '' },
  { sr: 6, name: 'MR. GHANSHYAM GORAKH PATIL', designation: 'LIBRARY ATTENDENT' },
  { sr: 7, name: 'MRS. SUVARNA BHANGRE', designation: 'LIBRARY ATTENDENT' },
  { sr: 8, name: 'MR. DIPAK CHAUGULE', designation: 'LIBRARY ATTENDENT' },
  { sr: 9, name: 'MR. SACHIN KAMBLE', designation: 'LIBRARY ATTENDENT' },
  { sr: 10, name: 'MR. SANTOSH SHINDE', designation: 'PEON' },
  { sr: 11, name: 'MR. NILESH MOYANAK', designation: 'PEON' },
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
  { title: 'Book 16', imageSrc: '/book cover/new (1).jpeg' },
  { title: 'Book 17', imageSrc: '/book cover/new (2).jpeg' },
  { title: 'Book 18', imageSrc: '/book cover/new (3).jpeg' },
  { title: 'Book 19', imageSrc: '/book cover/new (4).jpeg' },
  { title: 'Book 20', imageSrc: '/book cover/new (5).jpeg' },
];

const notices: any[] = [];

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
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex flex-col gap-1">
            {eResources.map((res, i) => (
              <a
                key={i}
                href={res.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  {res.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-[#123B6D] mb-0.5">{res.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-tight">{res.desc}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-[#014d4e] transition-colors shrink-0" />
              </a>
            ))}
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


          {/* Library Staff auto-scroll table */}
          <div className="bg-[#014d4e] rounded-t-xl rounded-b-sm p-4 flex items-center gap-3 text-white shadow-md mt-4">
            <Users size={20} className="opacity-90" />
            <h2 className="font-bold text-sm tracking-wide">LIBRARY STAFF</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '220px' }}>
            <style>{`
              @keyframes staffScrollUp {
                0%   { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
              .staff-marquee {
                animation: staffScrollUp 14s linear infinite;
              }
              .staff-marquee:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="h-full relative overflow-hidden">
              <div className="staff-marquee flex flex-col">
                {[...libraryStaff, ...libraryStaff].map((s, i) => (
                  <div key={i} className={`flex items-center px-4 py-2.5 text-xs gap-3 border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f8fffe]'}`}>
                    <span className="w-6 h-6 rounded-full bg-[#014d4e] text-white flex items-center justify-center font-bold text-[10px] shrink-0">{s.sr}</span>
                    <span className="font-semibold text-[#123B6D] flex-1 leading-snug">{s.name}</span>
                    <span className="text-[#008e59] font-medium text-[10px] text-right shrink-0 max-w-[90px] leading-snug">{s.designation}</span>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>{/* end right column */}

      </div>{/* end main grid */}
    </div>
  );
}
