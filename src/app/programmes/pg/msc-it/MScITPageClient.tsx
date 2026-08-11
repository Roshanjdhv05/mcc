"use client";

import PGCourseTemplate from '@/components/layout/PGCourseTemplate';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

interface MScITPageClientProps {
  syllabusContent?: React.ReactNode;
}

export default function MScITPageClient({ syllabusContent }: MScITPageClientProps) {
  return (
    <PGCourseTemplate
      title="Master of Science (Information Technology)"
      fundingType="Self Financing"
      courseKey="msc-it"
      syllabusContent={syllabusContent || <SyllabusRenderer programKey="MSC_IT" />}
    />
  );
}
