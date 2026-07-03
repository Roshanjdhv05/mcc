import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'M.Com (BM) | MCC Digital Experience Platform',
  description: 'Master of Commerce (Business Management) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">The Master of Commerce (M.Com) in Business Management is a postgraduate program designed to provide advanced knowledge and expertise in the field of business administration and management. This program focuses on developing strategic thinking, leadership skills, and analytical abilities essential for managing businesses effectively in a competitive global environment.</p>
        <p className="mb-4">The curriculum covers key subjects such as corporate governance, financial management, human resource management, marketing strategies, organizational behavior, business ethics, and entrepreneurship development. Through case studies, research projects, and practical applications, students gain a deeper understanding of business dynamics and decision-making processes.</p>
        <p className="mb-4">Graduates of M.Com in Business Management can pursue careers in corporate leadership, financial consulting, marketing management, human resource management, entrepreneurship, and academia. The program also provides a strong foundation for further studies such as Ph.D., Chartered Accountancy (CA), and MBA specialization programs.</p>
        <p className="mb-4">This course is ideal for students who seek to enhance their business acumen, develop managerial competencies, and take on leadership roles in various industries.</p>
      </>
      }
      title="Master of Commerce (Business Management)"
      description="The Master of Commerce (Business Management) programme details will be updated shortly."
    />
  );
}
