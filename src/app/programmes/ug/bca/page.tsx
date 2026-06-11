import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'BCA | MCC Digital Experience Platform',
  description: 'Bachelor of Computer Applications (BCA) at Mulund College of Commerce.',
};

export default function BCAPage() {
  return (
    <CourseTemplate 
      title="Bachelor of Computer Applications (BCA)"
      description="The BCA programme equips students with the necessary skills to build successful careers in software development, IT management, and computer applications."
    />
  );
}
