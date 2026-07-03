'use client';

import React from 'react';
import CornerPageLayout from '@/components/layout/CornerPageLayout';
import type { CategoryItem, DataItem } from '@/components/layout/CornerPageLayout';
import {
  Users, BookOpen, Activity, FileText, Award, Rocket, FileCheck, Library
} from 'lucide-react';

const categories: CategoryItem[] = [
  { id: 'center', label: 'Center & Committee', icon: Users },
  { id: 'policies', label: 'Policies', icon: FileCheck },
  { id: 'projects', label: 'Projects & Patents', icon: Rocket },
  { id: 'competitions', label: 'Competitions', icon: Award },
  { id: 'publications', label: 'Publications & Reports', icon: Library },
];

const data: Record<string, DataItem[]> = {
  center: [
    { title: 'Research Committee', icon: Users, links: [] },
    { title: 'Research Centre', icon: FileCheck, links: [
      { label: 'About the Research Centre' },
      { label: 'Research Guides' },
      { label: 'Awarded Ph.D.' },
      { label: 'Current Scholars' },
    ] },
  ],
  policies: [
    { title: 'Research Policy', icon: FileCheck, links: [
      { label: 'Plagiarism Policy' },
    ] },
  ],
  projects: [
    { title: 'Minor Research Project (Seed Money)', icon: Rocket, links: [
      { label: 'Policy' },
      { label: 'Application Process' },
      { label: 'Ongoing Projects' },
      { label: 'Completed Projects' },
    ] },
    { title: 'Awarded Patents', icon: Award, links: [] },
  ],
  competitions: [
    { title: 'Avishkar', description: '(Research Competition - University of Mumbai)', icon: Activity, links: [] },
    { title: 'Shodh', description: '(Research Competition \u2013 Mulund college of Commerce)', icon: Activity, links: [] },
  ],
  publications: [
    { title: 'Annual Reports', icon: FileText, links: [] },
    { title: 'Research Journal', icon: BookOpen, links: [
      { label: 'About the Journal' },
      { label: 'Board of Editors' },
      { label: 'Volume and Issues' },
    ] },
    { title: 'PTVA Vidyavachaspati', icon: Award, links: [] },
  ],
};

export default function ResearchPage() {
  return (
    <CornerPageLayout
      title="RESEARCH"
      subtitle="Fostering a culture of innovation and inquiry. Explore our research centers, policies, ongoing projects, and major publications."
      heroImage="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"
      HeroIcon={Rocket}
      heroLabel="MCC Research"
      categories={categories}
      data={data}
    />
  );
}
