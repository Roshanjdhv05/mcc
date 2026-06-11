import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'BSc IT | MCC Digital Experience Platform',
  description: 'Bachelor of Science in Information Technology (BSc IT) at Mulund College of Commerce.',
};

export default function BScITPage() {
  return (
    <CourseTemplate 
      title="Bachelor of Science in Information Technology (BSc IT)"
      description="The BSc IT programme focuses on software development, database management, and network infrastructure, creating industry-ready IT professionals."
    />
  );
}
