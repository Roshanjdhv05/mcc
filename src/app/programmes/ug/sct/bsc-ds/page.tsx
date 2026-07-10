import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'B.Sc. (DS) | MCC Digital Experience Platform',
  description: 'Bachelor of Science (Data Science) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">Bachelor of Science (B.Sc.) in Data Science is an undergraduate program that focuses on the study of data analysis, machine learning, statistics, and computational techniques to extract meaningful insights from large datasets. This interdisciplinary course combines elements of mathematics, computer science, and business intelligence, preparing students for the growing field of data-driven decision-making.</p>
        <p className="mb-4">The curriculum covers key subjects such as statistics, programming (Python, R), data visualization, database management, big data analytics, artificial intelligence, and cloud computing. It emphasizes practical learning through real-world projects, case studies, and internships.</p>
        <p className="mb-4">With the increasing demand for data scientists, analysts, and AI professionals, graduates of B.Sc. in Data Science can pursue careers in diverse industries, including finance, healthcare, e-commerce, technology, and government sectors. They can also opt for advanced studies like M.Sc. in Data Science, AI, or certifications in machine learning and business analytics to enhance their expertise.</p>
        <p className="mb-4">This program is ideal for students interested in problem-solving, predictive modeling, and leveraging data to drive innovation and business growth in the digital era.</p>
      </>
      }
      title="Bachelor of Science (Data Science)"
      description="The Bachelor of Science (Data Science) programme details will be updated shortly."
      courseKey="BSC_DS"
      category="science"
    />
  );
}
