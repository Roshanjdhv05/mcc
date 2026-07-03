import React from 'react';
import Link from 'next/link';
import { ChevronRight, GraduationCap, Users, Calendar, Award, Briefcase, BookOpen, Newspaper } from 'lucide-react';

interface SidebarItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
}

interface CourseLayoutProps {
  courseName: string;
  children: React.ReactNode;
}

export function CourseLayout({ courseName, children }: CourseLayoutProps) {
  const sidebarItems: SidebarItem[] = [
    { title: 'Home', href: '#', active: true, icon: <ChevronRight className="w-4 h-4" /> },
    { title: 'Syllabus', href: '#', icon: <BookOpen className="w-4 h-4" /> },
    { title: 'Faculty', href: '#', icon: <Users className="w-4 h-4" /> },
    { title: 'Management Club - Inspira', href: '#', icon: <Briefcase className="w-4 h-4" /> },
    { title: 'NewsLetter', href: '#', icon: <Newspaper className="w-4 h-4" /> },
    { title: 'Activity', href: '#', icon: <Calendar className="w-4 h-4" /> },
    { title: 'Result & Prize Distribution', href: '#', icon: <Award className="w-4 h-4" /> },
    { title: 'Industrial Visits', href: '#', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-12 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f2142] font-[var(--font-heading)]">
            {courseName}
          </h1>
          <a href="https://enrollonline.co.in/Registration/Apply/MCC" target="_blank" rel="noopener noreferrer" className="bg-[#e41e26] hover:bg-[#c31820] text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-2">
            Apply Now
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-[#0f2142] p-4 rounded-2xl shadow-xl sticky top-24">
              <div className="flex flex-col gap-2">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      item.active
                        ? 'bg-[#e41e26] text-white font-semibold shadow-md'
                        : 'bg-white/10 text-white hover:bg-white/20 hover:translate-x-1'
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 md:p-10 transition-all hover:shadow-md">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
