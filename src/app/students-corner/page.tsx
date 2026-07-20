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
  { id: 'forums', label: 'Forums', icon: Users },
  { id: 'events', label: 'Events & Festivals', icon: Music },
  { id: 'publications', label: 'Student\'s Publications', icon: BookOpen },
];

const data: Record<string, DataItem[]> = {
  forums: [
    { title: 'Students Council', icon: Users, links: [] },
    { title: 'National Service Scheme', icon: Heart, links: [] },
    { title: 'Cultural Forum', icon: Music, links: [] },
    { title: 'Sports and Gymkhana', icon: Activity, links: [] },
    { title: 'Natyakarmi (Theatre Group)', icon: UserPlus, links: [] },
    { title: 'Marathi Vagmany Mandal', icon: BookOpen, links: [] },
    { title: 'Aaroh', icon: Music, links: [] },
    { title: 'Nature Club', icon: Leaf, links: [] },
    { title: 'Women Development Cell', icon: Shield, links: [] },
    { title: 'Entrepreneurship Development Cell', icon: Rocket, links: [] },
    { title: 'Students\u2019 Research', icon: BookOpen, links: [{ label: 'Redirect to the Research Cell', href: '/research' }] },
  ],
  events: [
    { title: 'Spectrum', icon: Music, links: [{ label: 'Redirect to Cultural Forum', href: '/students-corner/cultural-forum' }] },
    { title: 'Inspira', icon: Rocket, links: [{ label: 'Redirect to the BCOM MS Section', href: '/programmes/ug/bms' }] },
    { title: 'Technobeat', icon: Activity, links: [] },
    { title: 'Math\u2019s Wonder', icon: Compass, links: [{ label: 'Redirect to Computer Science', href: '/programmes/ug/bsc-cs' }] },
    { title: 'Emporio', icon: Users, links: [{ label: 'Redirect to BCOM Section', href: '/programmes/ug/bcom' }] },
    { title: 'Quantomania', icon: Activity, links: [{ label: 'Redirect to Quantomania', href: '#' }] },
    { title: 'Rasikotsav', icon: UserPlus, links: [{ label: 'Redirect to Natyakarmi', href: '#' }] },
    { title: 'My Marathi, Mai Marathi', icon: BookOpen, links: [{ label: 'Redirect to MVM', href: '#' }] },
    { title: 'Annual Day', icon: Users, links: [{ label: 'Redirect to Students\u2019 Council', href: '#' }] },
  ],
  publications: [
    { title: 'Pratibimb', icon: BookOpen, links: [{ label: 'Redirect to BAF Section', href: '/programmes/ug/baf' }] },
    { title: 'Finanza', icon: BookOpen, links: [{ label: 'Redirect to BCOM FM section', href: '/programmes/ug/bfm' }] },
    { title: 'Muse', icon: BookOpen, links: [{ label: 'Redirect to BAMMC Section', href: '/programmes/ug/bammc' }] },
    { title: 'Commercium', icon: BookOpen, links: [{ label: 'Redirect to BCOM Section', href: '/programmes/ug/bcom' }] },
  ],
};

export default function StudentsCornerPage() {
  return (
    <CornerPageLayout
      title="STUDENTS\u2019 CORNER"
      subtitle="Explore, engage, and excel. Discover a wide range of student initiatives, clubs, committees, and opportunities that help you learn, lead, and grow beyond the classroom."
      heroImage="/college_campus_hero.png"
      HeroIcon={UserCircle}
      heroLabel="Students Corner"
      categories={categories}
      data={data}
    />
  );
}
