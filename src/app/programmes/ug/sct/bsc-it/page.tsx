import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'B.Sc (IT) | MCC Digital Experience Platform',
  description: 'Bachelor of Science (Information Technology) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">Bachelor of Science in Information Technology (B.Sc. IT) is an undergraduate program that focuses on the study of computing, software development, networking, data management, and cybersecurity. The course is designed to equip students with technical and analytical skills to solve real-world IT challenges and drive innovation in the digital era.</p>
        <p className="mb-4">The curriculum covers programming languages, database management, web development, cloud computing, artificial intelligence, cybersecurity, and IT infrastructure. Students gain hands-on experience through practical labs, projects, and internships, making them industry-ready professionals.</p>
        <p className="mb-4">Graduates of B.Sc. IT can pursue careers in software development, system administration, IT consulting, cybersecurity, data analytics, and cloud computing. They can also advance their education through M.Sc. IT, MCA, or certifications like AWS, CCNA, and ethical hacking to specialize in various IT domains.</p>
        <p className="mb-4">This program is ideal for individuals passionate about technology, problem-solving, and innovation in the rapidly evolving IT industry.</p>
      </>
      }
      title="Bachelor of Science (Information Technology)"
      description="The Bachelor of Science (Information Technology) programme details will be updated shortly."
      courseKey="BSC_IT"
      category="science"
    />
  );
}
