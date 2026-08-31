import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'MCom | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Master of Commerce (MCom) at Mulund College of Commerce.',
};

export default function MComPage() {
  return (
    <CourseTemplate 
      title="Master of Commerce (MCom)"
      fundingType="Self Financing"
    />
  );
}

