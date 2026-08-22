'use client';

import React from 'react';
import CornerPageLayout from '@/components/layout/CornerPageLayout';
import type { CategoryItem, DataItem } from '@/components/layout/CornerPageLayout';
import {
  Users, BookOpen, Activity, FileCheck, Library, Target, Link as LinkIcon, FileSearch, Award, FileText
} from 'lucide-react';

const categories: CategoryItem[] = [
  { id: 'about', label: 'About & Committee', icon: Users },
  { id: 'centre', label: 'Research Centre', icon: Library },
  { id: 'policies', label: 'Policies', icon: FileCheck },
  { id: 'competitions', label: 'Competitions & Events', icon: Activity },
  { id: 'publications', label: 'Publications & Resources', icon: BookOpen },
];

const data: Record<string, DataItem[]> = {
  about: [
    { title: 'Objective', icon: Target, links: [{ label: 'View Details', href: '/research/about?tab=objective' }] },
    { title: 'Committee', icon: Users, links: [{ label: 'View Details', href: '/research/about?tab=committee' }] },
    { title: 'Annual Reports', icon: FileText, links: [{ label: 'View Details', href: '/research/about?tab=reports' }] },
  ],
  centre: [
    { title: 'Research Centre', icon: Library, links: [
      { label: 'Research Centre Recognition', href: '/research/centre?tab=recognition' },
      { label: 'Research Guides', href: '/research/centre?tab=guides' },
      { label: 'Research Scholars', href: '/research/centre?tab=scholars' },
      { label: 'Awarded Thesis', href: '/research/centre?tab=thesis' },
      { label: 'Application Process', href: '/research/centre?tab=application' },
    ] },
  ],
  policies: [
    { title: 'Research Policies', icon: FileCheck, links: [
      { label: 'Research Policy', href: '/research/policies?tab=research-policy' },
      { label: 'Plagiarism Policy', href: '/research/policies?tab=plagiarism-policy' },
      { label: 'Application for Plagiarism check', href: '/research/policies?tab=application-check' },
    ] },
  ],
  competitions: [
    { title: 'Avishkar', description: '(University of Mumbai- Competition)', icon: Activity, links: [{ label: 'View Details', href: '/research/competitions?tab=avishkar' }] },
    { title: 'Shodh', description: '(Inter-collegiate Research Competition)', icon: Activity, links: [{ label: 'View Details', href: '/research/competitions?tab=shodh' }] },
    { title: 'PTVA’s Inter-institutional Research Conclave', icon: Award, links: [{ label: 'View Details', href: '/research/competitions?tab=conclave' }] },
  ],
  publications: [
    { title: 'Research Journal', icon: BookOpen, links: [
      { label: 'About the Journal', href: '/research/publications?tab=journal-about' },
      { label: 'Board of Editors', href: '/research/publications?tab=journal-board' },
      { label: 'Volume and Issues', href: '/research/publications?tab=journal-issues' },
    ] },
    { title: 'Resources', icon: LinkIcon, links: [{ label: 'View Details', href: '/research/publications?tab=resources' }] },
  ],
};

export default function ResearchPage() {
  return (
    <CornerPageLayout
      title="RESEARCH"
      subtitle="Fostering a culture of innovation and inquiry. Explore our research centers, policies, ongoing projects, and major publications."
      heroImage="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop"
      HeroIcon={FileSearch}
      heroLabel="MCC Research"
      categories={categories}
      data={data}
    />
  );
}
