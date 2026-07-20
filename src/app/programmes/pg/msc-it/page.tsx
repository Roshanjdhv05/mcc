import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'M.Sc. (IT) | MCC Digital Experience Platform',
  description: 'Master of Science (Information Technology) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">Master of Science (M.Sc.) in Information Technology is a postgraduate program that focuses on advanced concepts in computing, software development, data management, networking, and cybersecurity. This course is designed to equip students with in-depth technical expertise and problem-solving abilities required in the rapidly evolving IT industry.</p>
        <p className="mb-4">The curriculum covers a broad range of subjects, including software engineering, database management, artificial intelligence, cloud computing, big data analytics, network security, and web technologies. Through hands-on projects, research, and real-world case studies, students gain practical experience in designing, developing, and managing IT solutions.</p>
        <p className="mb-4">Graduates of M.Sc. IT can pursue careers as software developers, data analysts, cybersecurity experts, IT consultants, system architects, and network administrators in industries such as finance, healthcare, education, and e-commerce. Additionally, they can opt for further research or doctoral studies in specialized IT fields.</p>
        <p className="mb-4">This program is ideal for individuals who seek to enhance their technical knowledge, stay updated with the latest technological trends, and build a rewarding career in the field of information technology.</p>
      </>
      }
      title="Master of Science (Information Technology)"
      description="The Master of Science (Information Technology) programme details will be updated shortly."
      facultyData={[
        { srNo: 1, name: 'Dr. Vishal Borude', designation: 'MS.C IT Co-ordinator', additionalRole: '—', education: 'M.Sc.(IT)., Ph.D.', email: 'vishal.borude@mccmulund.ac.in', teachingExp: '0 yrs' }
      ]}
    />
  );
}
