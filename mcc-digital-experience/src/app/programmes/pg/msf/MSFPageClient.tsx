"use client";

import PGCourseTemplate from '@/components/layout/PGCourseTemplate';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

export default function MSFPageClient() {
  return (
    <PGCourseTemplate
      title="Master of Science in Finance"
      fundingType="Self Financing"
      courseKey="msf"
      syllabusContent={<SyllabusRenderer programKey="MSF" />}
    />
  );
}
