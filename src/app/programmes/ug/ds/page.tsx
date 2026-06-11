import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'Data Science (DS) | MCC Digital Experience Platform',
  description: 'Undergraduate Data Science programme at Mulund College of Commerce.',
};

export default function DSPage() {
  return (
    <CourseTemplate 
      title="Data Science (DS)"
      description="The Data Science programme is tailored for students looking to excel in analytics, machine learning, and big data technologies."
    />
  );
}
