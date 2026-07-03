'use client';

import React from 'react';
import CornerPageLayout from '@/components/layout/CornerPageLayout';
import type { CategoryItem, DataItem } from '@/components/layout/CornerPageLayout';
import {
  Users, BookOpen, UserPlus, Info,
  Activity, UserCircle,
  FileText, Award, Briefcase, Bell
} from 'lucide-react';

const categories: CategoryItem[] = [
  { id: 'general', label: 'General Information', icon: Info },
  { id: 'exams', label: 'Exam Notices', icon: FileText },
  { id: 'admissions', label: 'Admission Notices', icon: UserPlus },
  { id: 'scholarships', label: 'Scholarship Notices', icon: Award },
  { id: 'academic', label: 'Academic Notices', icon: BookOpen },
  { id: 'admin', label: 'Admin & Activities', icon: Briefcase },
];

const data: Record<string, DataItem[]> = {
  general: [
    { title: 'From the Vice Principal\u2019s Desk', icon: UserCircle, links: [] },
    { title: 'About Junior College', icon: Info, links: [] },
    { title: 'Teachers', icon: Users, links: [] },
  ],
  exams: [
    { title: 'Exam Notices', icon: FileText, links: [
      { label: 'Time-Table' },
      { label: 'Exam Form Filling' },
      { label: 'Result Declaration' },
    ] },
  ],
  admissions: [
    { title: 'Admission Notices', icon: UserPlus, links: [
      { label: 'XIth (FYJC) Admissions' },
      { label: 'XIIth (SYJC) Admissions' },
    ] },
  ],
  scholarships: [
    { title: 'Scholarship Notices', icon: Award, links: [] },
  ],
  academic: [
    { title: 'Other Academic Notices', icon: BookOpen, links: [] },
  ],
  admin: [
    { title: 'Other Administrative Notices', icon: Briefcase, links: [] },
    { title: 'Cultural and Sports Notices', icon: Activity, links: [] },
  ],
};

export default function JuniorCollegeCornerPage() {
  return (
    <CornerPageLayout
      title="JUNIOR COLLEGE CORNER"
      subtitle="Stay updated with all Junior College announcements, exam schedules, admission details, and academic notices in one dedicated space."
      heroImage="/college_campus_hero.png"
      HeroIcon={Bell}
      heroLabel="Jr. College Corner"
      categories={categories}
      data={data}
    />
  );
}
