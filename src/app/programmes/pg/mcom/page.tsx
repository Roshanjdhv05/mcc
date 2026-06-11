import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'MCom | MCC Digital Experience Platform',
  description: 'Master of Commerce (MCom) at Mulund College of Commerce.',
};

export default function MComPage() {
  return (
    <CourseTemplate 
      title="Master of Commerce (MCom)"
      description="The MCom programme offers postgraduate mastery over commerce, accounting, and advanced financial management."
    />
  );
}
