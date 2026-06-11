import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'MSc IT | MCC Digital Experience Platform',
  description: 'Master of Science in Information Technology (MSc IT) at Mulund College of Commerce.',
};

export default function MScITPage() {
  return (
    <CourseTemplate 
      title="Master of Science in Information Technology (MSc IT)"
      description="The MSc IT programme delivers advanced knowledge in computing technologies, preparing postgraduates for specialized technical roles."
    />
  );
}
