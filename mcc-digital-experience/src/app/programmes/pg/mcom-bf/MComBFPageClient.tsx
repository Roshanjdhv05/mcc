"use client";

import PGCourseTemplate from '@/components/layout/PGCourseTemplate';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

export default function MComBFPageClient() {
  return (
    <PGCourseTemplate
      title="Master of Commerce (Banking & Finance)"
      fundingType="Self Financing"
      courseKey="mcom-bf"
      syllabusContent={<SyllabusRenderer programKey="MCOM_BF" />}
    />
  );
}
