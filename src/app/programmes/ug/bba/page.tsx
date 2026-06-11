import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'BBA | MCC Digital Experience Platform',
  description: 'Bachelor of Business Administration (BBA) at Mulund College of Commerce.',
};

export default function BBAPage() {
  return (
    <CourseTemplate 
      title="Bachelor of Business Administration (BBA)"
      description="The BBA programme provides a fundamental education in business and management principles, preparing students for leadership roles in the corporate sector."
    />
  );
}
