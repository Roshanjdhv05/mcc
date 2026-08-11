"use client";

import PGCourseTemplate from '@/components/layout/PGCourseTemplate';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

export default function MComAAPageClient() {
  return (
    <PGCourseTemplate
      title="Master of Commerce (Advanced Accountancy)"
      fundingType="Self Financing"
      courseKey="mcom-aa"
      syllabusContent={<SyllabusRenderer programKey="MCOM_AA" />}
    />
  );
}
