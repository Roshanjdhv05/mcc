"use client";

import PGCourseTemplate from '@/components/layout/PGCourseTemplate';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

export default function MComBMPageClient() {
  return (
    <PGCourseTemplate
      title="Master of Commerce (Business Management)"
      fundingType="Self Financing"
      courseKey="mcom-bm"
      syllabusContent={<SyllabusRenderer programKey="MCOM_BM" />}
    />
  );
}
