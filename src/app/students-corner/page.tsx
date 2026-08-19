'use client';

import React from 'react';
import CornerPageLayout from '@/components/layout/CornerPageLayout';
import type { CategoryItem, DataItem } from '@/components/layout/CornerPageLayout';
import {
  Users, BookOpen, UserPlus, Heart, Link as LinkIcon,
  ShieldAlert, Activity, Music, Leaf, Rocket,
  Compass, Shield, UserCircle, MessageCircle, AlertTriangle, Image as ImageIcon, Calendar
} from 'lucide-react';

const categories: CategoryItem[] = [
  { id: 'forums', label: 'Forums and Clubs', icon: Users },
  { id: 'events', label: 'Events & Festivals', icon: Music },
  { id: 'publications', label: 'Student\'s Publications', icon: BookOpen },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'wall-of-fame', label: 'Wall of Fame', icon: Activity },
];

const data: Record<string, DataItem[]> = {
  forums: [
    { title: 'Students Council', icon: Users, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=students-council' }] },
    { title: 'National Service Scheme', icon: Heart, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=nss' }] },
    { title: 'Cultural Forum', icon: Music, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=cultural-forum' }] },
    { title: 'Sports and Gymkhana', icon: Activity, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=sports' }] },
    { title: 'Natyakarmi (Theatre Group)', icon: UserPlus, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=natyakarmi' }] },
    { title: 'Marathi Vangmay Mandal', icon: BookOpen, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=mvm' }] },
    { title: 'Aaroh (Music Club)', icon: Music, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=aaroh' }] },
    { title: 'Artelier (Fine Arts Club)', icon: Music, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=artelier' }] },
    { title: 'Nature Club', icon: Leaf, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=nature-club' }] },
    { title: 'Women Development Cell', icon: Shield, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=wdc' }] },
    { title: 'Entrepreneurship Development Cell', icon: Rocket, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=edc' }] },
    { title: 'Students\' Research', icon: BookOpen, links: [{ label: 'View Details', href: '/students-corner/Forums-and-Clubs?club=research' }] },
  ],
  events: [
    { title: 'Spectrum', icon: Music, links: [{ label: 'View Details', href: '/students-corner/Events-and-Festivals?event=spectrum' }] },
    { title: 'Inspira', icon: Rocket, links: [{ label: 'View Details', href: '/students-corner/Events-and-Festivals?event=inspira' }] },
    { title: 'Hack-A-Thon', icon: Activity, links: [{ label: 'View Details', href: '/students-corner/Events-and-Festivals?event=hackathon' }] },
    { title: 'Emporio', icon: Users, links: [{ label: 'View Details', href: '/students-corner/Events-and-Festivals?event=emporio' }] },
    { title: 'Quantomania', icon: Activity, links: [{ label: 'View Details', href: '/students-corner/Events-and-Festivals?event=quantomania' }] },
    { title: 'Manthan', icon: Compass, links: [{ label: 'View Details', href: '/students-corner/Events-and-Festivals?event=manthan' }] },
  ],
  publications: [
    { title: 'Pratibimb', icon: BookOpen, links: [{ label: 'View Details', href: '/students-corner/Students-Publications?publication=pratibimb' }] },
    { title: 'Finanza', icon: BookOpen, links: [{ label: 'View Details', href: '/students-corner/Students-Publications?publication=finanza' }] },
    { title: 'Techanugraha', icon: BookOpen, links: [{ label: 'View Details', href: '/students-corner/Students-Publications?publication=techanugraha' }] },
  ],
  gallery: [
    { title: 'Events Gallery', icon: ImageIcon, links: [{ label: 'View Gallery', href: '/students-corner/gallery' }] },
    { title: 'Event Calendar', icon: Calendar, links: [{ label: 'View Calendar', href: '/students-corner/event-calendar' }] },
  ],
  'wall-of-fame': [
    { title: 'Student Achievements', icon: Activity, links: [{ label: 'View Wall of Fame', href: '/students-corner/wall-of-fame' }] },
  ],
};

export default function StudentsCornerPage() {
  return (
    <CornerPageLayout
      title="STUDENTS' CORNER"
      subtitle="Explore, engage, and excel. Discover a wide range of student initiatives, clubs, committees, and opportunities that help you learn, lead, and grow beyond the classroom."
      heroImage="/college_campus_hero.png"
      HeroIcon={UserCircle}
      heroLabel="Students Corner"
      categories={categories}
      data={data}
    />
  );
}
