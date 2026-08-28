"use client";

import PGCourseTemplate from '@/components/layout/PGCourseTemplate';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';
import { Users, Clock, FileText } from 'lucide-react';

export default function MComBFPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'B.Com or equivalent from a recognised University.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '2 Years, 4 Semesters.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '05:30 PM – 08:30 PM' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '60 Seats' },
  ];

  return (
    <PGCourseTemplate
      title="Master of Commerce (Banking & Finance)"
      fundingType="Self Financing"
      courseKey="mcom-bf"
      syllabusContent={<SyllabusRenderer programKey="MCOM_BF" />}
      quickActionsData={quickActions}
    />
  );
}
