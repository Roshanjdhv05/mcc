'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

const images = [
  { src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80', cat: 'Campus', title: 'Main Building' },
  { src: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80', cat: 'Sports', title: 'Zonal Sports Meet' },
  { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80', cat: 'Academics', title: 'Group Study' },
  { src: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&q=80', cat: 'Campus', title: 'College Grounds' },
  { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80', cat: 'Placements', title: 'Placement Drive' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80', cat: 'Cultural', title: 'AURA Fest 2024' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', cat: 'Events', title: 'Convocation Ceremony' },
  { src: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&q=80', cat: 'Library', title: 'Library Reading Hall' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', cat: 'Academics', title: 'Seminar Hall' },
];

const cats = ['All', 'Campus', 'Sports', 'Academics', 'Cultural', 'Events', 'Placements', 'Library'];

export default function GalleryPage() {
  const [selected, setSelected] = useState<typeof images[0] | null>(null);
  const [activecat, setActivecat] = useState('All');

  const filtered = activecat === 'All' ? images : images.filter(i => i.cat === activecat);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-[#123B6D] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)] mb-2">Gallery</h1>
          <p className="text-white/70">Moments from campus life, events, and achievements</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-8 pb-16">
        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
          {cats.map((c, i) => (
            <button
              key={c}
              onClick={() => setActivecat(c)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activecat === c ? 'bg-[#123B6D] text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#123B6D] hover:text-[#123B6D]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-2xl border border-[#E2E8F0]"
              onClick={() => setSelected(img)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-[#D4A017] text-white text-xs font-bold">{img.cat}</span>
                  <p className="text-white font-semibold text-sm mt-1">{img.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30"
            onClick={() => setSelected(null)}
          >
            <X size={20} />
          </button>
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={selected.src}
            alt={selected.title}
            className="max-w-full max-h-[80vh] rounded-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <div className="absolute bottom-8 text-white text-center">
            <span className="px-3 py-1 rounded-full bg-[#D4A017] text-xs font-bold mb-2 inline-block">{selected.cat}</span>
            <p className="font-semibold">{selected.title}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
