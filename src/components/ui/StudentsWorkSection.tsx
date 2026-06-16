'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

const works = [
  {
    title: 'FinTech App Redesign',
    student: 'Rahul M. (BSc IT)',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    desc: 'A complete redesign of a banking app focusing on accessibility and modern aesthetics.'
  },
  {
    title: 'Marketing Campaign',
    student: 'Priya S. (BMS)',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80',
    desc: 'Award-winning digital marketing strategy developed for sustainable brands.'
  },
  {
    title: 'Financial Analysis Model',
    student: 'Amit K. (BCom)',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    desc: 'Predictive model for stock market trends using historical data and machine learning.'
  }
];

export default function StudentsWorkSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && window.innerWidth < 768) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollReveal>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Students Work</h2>
        <Link href="/students-work" className="text-sm font-semibold text-[#123B6D] flex items-center gap-1 hover:gap-2 transition-all">
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div 
        ref={scrollRef}
        className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory md:snap-none no-scrollbar pb-4"
      >
        {works.map((w, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className="flex-shrink-0 w-full md:w-auto snap-center group cursor-pointer"
          >
            <div className="relative h-52 rounded-2xl overflow-hidden mb-4 border border-[#E2E8F0] shadow-sm">
              <img
                src={w.img}
                alt={w.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#123B6D]">
                  {w.student}
                </span>
              </div>
            </div>
            <h4 className="font-bold text-[#1E293B] font-[var(--font-heading)] group-hover:text-[#123B6D] transition-colors mb-2">{w.title}</h4>
            <p className="text-sm text-[#64748B]">{w.desc}</p>
          </motion.div>
        ))}
      </div>
    </ScrollReveal>
  );
}
