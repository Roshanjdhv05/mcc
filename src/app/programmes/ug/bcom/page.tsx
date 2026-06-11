import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'B.Com | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (B.Com) at Mulund College of Commerce.',
};

export default function BComPage() {
  return (
    <CourseTemplate 
      title="Bachelor of Commerce (B.Com)"
      description="The B.Com programme is designed to provide students with a wide range of managerial skills and understanding in streams like finance, accounting, taxation and management."
    />
  );
}
