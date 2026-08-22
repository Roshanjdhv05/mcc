'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, ExternalLink, Calendar, User, BookOpen } from 'lucide-react';

const courses = ['All', 'BSc IT', 'BCA', 'BBA', 'DS', 'BCom', 'BMS', 'MSc IT', 'MCom'];

const projects = [
  {
    id: 1,
    title: 'CodeShare Platform',
    student: 'Aman Desai',
    course: 'BSc IT',
    date: '12 Oct 2024',
    type: 'Web App',
    description: 'A comprehensive code sharing and collaboration platform built with React and Node.js.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    link: '#',
    actionType: 'preview'
  },
  {
    id: 2,
    title: 'Impact of AI on Financial Markets',
    student: 'Riya Sharma',
    course: 'MCom',
    date: '05 Nov 2024',
    type: 'Research Paper',
    description: 'An in-depth analysis of how algorithmic trading and AI models are reshaping modern finance.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    link: '#',
    actionType: 'download'
  },
  {
    id: 3,
    title: 'Gym Corner Fitness App',
    student: 'Karan Patel',
    course: 'BCA',
    date: '28 Sep 2024',
    type: 'Product Design',
    description: 'A fitness application designed to help users shape their body and track workouts effectively.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    link: '#',
    actionType: 'preview'
  },
  {
    id: 4,
    title: 'Food Lingo Cafe UI/UX',
    student: 'Sneha Kapoor',
    course: 'BMS',
    date: '15 Aug 2024',
    type: 'Website Design',
    description: 'Experience the language of flavors. A complete redesign of a cozy local cafe website.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    link: '#',
    actionType: 'preview'
  },
  {
    id: 5,
    title: 'Predictive Analytics in Retail',
    student: 'Vikram Singh',
    course: 'DS',
    date: '02 Nov 2024',
    type: 'Data Science Model',
    description: 'Using machine learning to predict consumer purchasing patterns in retail stores.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    link: '#',
    actionType: 'download'
  },
  {
    id: 6,
    title: 'E-Commerce Marketing Strategies',
    student: 'Pooja Joshi',
    course: 'BBA',
    date: '10 Oct 2024',
    type: 'Case Study',
    description: 'A study on modern marketing strategies utilized by top e-commerce giants.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    link: '#',
    actionType: 'download'
  }
];

export default function StudentsWorkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourse, setActiveCourse] = useState('All');

  const filteredProjects = projects.filter((project) => {
    const matchesCourse = activeCourse === 'All' || project.course === activeCourse;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      
      {/* ── HEADER & SEARCH ── */}
      <div className="bg-[#123B6D] text-white pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-[var(--font-heading)] mb-4">Student's Work Showcase</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Explore the innovative projects, research papers, and outstanding academic work created by our talented students across all departments.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search by title, student name, or keywords..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-[#1E293B] shadow-xl outline-none border-2 border-transparent focus:border-[#D4A017] transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={20} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-10">
        
        {/* ── FILTERS ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {courses.map(course => (
            <button
              key={course}
              onClick={() => setActiveCourse(course)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCourse === course 
                  ? 'bg-[#123B6D] text-white shadow-md' 
                  : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:text-[#1E293B]'
              }`}
            >
              {course}
            </button>
          ))}
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
              >
                {/* Image Half */}
                <div className="h-48 relative overflow-hidden bg-slate-100 shrink-0 border-b border-[#E2E8F0]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#123B6D] shadow-sm">
                    {project.course}
                  </div>
                </div>

                {/* Content Half */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#1E293B] font-[var(--font-heading)] mb-2 line-clamp-1 group-hover:text-[#123B6D] transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-4 text-xs font-medium text-[#64748B]">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-[#D4A017]" />
                      {project.student}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#D4A017]" />
                      {project.date}
                    </div>
                  </div>
                  
                  <p className="text-sm text-[#64748B] line-clamp-2 mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F1F5F9]">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
                      {project.type}
                    </span>
                    
                    {project.actionType === 'preview' ? (
                      <button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                        Preview Website <ExternalLink size={16} />
                      </button>
                    ) : (
                      <button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                        Download PDF <Download size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">No projects found</h3>
            <p className="text-[#64748B]">We couldn't find any student work matching your search criteria.</p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
