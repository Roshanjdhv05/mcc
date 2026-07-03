'use client';

import React from 'react';
import CornerPageLayout from '@/components/layout/CornerPageLayout';
import type { CategoryItem, DataItem } from '@/components/layout/CornerPageLayout';
import {
  Users, BookOpen, UserPlus, Heart, Link as LinkIcon,
  ShieldAlert, Activity, Music, Leaf, Rocket,
  Compass, Shield, UserCircle, MessageCircle, AlertTriangle
} from 'lucide-react';

const categories: CategoryItem[] = [
  { id: 'social', label: 'Social & General', icon: LinkIcon },
  { id: 'leadership', label: 'Leadership & Governance', icon: UserCircle },
  { id: 'clubs', label: 'Clubs & Forums', icon: Users },
  { id: 'research', label: 'Research & Innovation', icon: Rocket },
  { id: 'wellness', label: 'Wellness & Support', icon: Heart },
  { id: 'grievance', label: 'Grievance & Safety', icon: ShieldAlert },
];

const data: Record<string, DataItem[]> = {
  social: [
    { title: 'Social Media Handles', icon: LinkIcon, links: [] },
  ],
  leadership: [
    { title: 'National Service Scheme', description: 'Service to society through NSS initiatives.', icon: Compass, links: [] },
    { title: 'Students\u2019 Council', icon: Users, links: [{ label: 'Composition' }, { label: 'Annual Reports' }] },
    { title: 'Sports & Gymkhana', icon: Activity, links: [{ label: 'Composition' }, { label: 'Annual Reports' }] },
  ],
  clubs: [
    { title: 'Cultural Forum', icon: Users, links: [{ label: 'About' }, { label: 'Youth Festival' }] },
    { title: 'Marathi Vangmay Mandal', icon: BookOpen, links: [{ label: 'Annual Reports' }] },
    { title: 'Natyakarmi (Drama Club)', icon: UserPlus, links: [{ label: 'About' }, { label: 'Annual Reports' }] },
    { title: 'Aaroh (Music Club)', icon: Music, links: [{ label: 'About' }] },
    { title: 'Nature Club', icon: Leaf, links: [] },
  ],
  research: [
    { title: 'Entrepreneurship Development Cell', icon: Rocket, links: [{ label: 'Composition' }, { label: 'Annual Reports' }] },
    { title: 'Student Research - Shodh', description: '(Inter-collegiate Research Competition of MCC)', icon: BookOpen, links: [{ label: 'Annual Reports' }] },
    { title: 'Avishkar', description: '(Inter-collegiate Research Competition of University of Mumbai)', icon: BookOpen, links: [{ label: 'Annual Reports' }] },
    { title: 'Minor Research Project', icon: Activity, links: [{ label: 'Policy' }, { label: 'Application Process' }] },
  ],
  wellness: [
    { title: 'Women Development Cell', icon: Heart, links: [{ label: 'Annual Reports' }] },
    { title: 'Counselling Cell', icon: MessageCircle, links: [] },
  ],
  grievance: [
    { title: 'Grievance Cell', icon: AlertTriangle, links: [] },
    { title: 'Anti-Ragging Cell', icon: Shield, links: [] },
    { title: 'Internal Complaint Cell', icon: BookOpen, links: [] },
  ],
};

export default function StudentsCornerPage() {
  return (
    <CornerPageLayout
      title="STUDENTS\u2019 CORNER"
      subtitle="Explore, engage, and excel. Discover a wide range of student initiatives, clubs, committees, and opportunities that help you learn, lead, and grow beyond the classroom."
      heroImage="/college_campus_hero.png"
      HeroIcon={UserCircle}
      heroLabel="Students' Corner"
      categories={categories}
      data={data}
    />
  );
}
