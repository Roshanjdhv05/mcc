import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'B.Sc. (CA) | MCC Digital Experience Platform',
  description: 'Bachelor of Science (Computer Applications) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">Bachelor of Science (B.Sc.) in Computer Applications is an undergraduate program that blends computer science principles with practical application development. This course is designed to provide students with a strong foundation in programming, software development, database management, networking, and system analysis.</p>
        <p className="mb-4">The curriculum includes core subjects such as Data Structures, Web Development, Operating Systems, Cloud Computing, Cybersecurity, Artificial Intelligence, and Mobile Application Development. Students gain hands-on experience through practical labs, projects, and internships, preparing them for the rapidly evolving tech industry.</p>
        <p className="mb-4">Graduates of this program can pursue careers in software development, IT consulting, system administration, web and mobile application development, cybersecurity, and data analytics. They can also opt for higher studies such as M.Sc. in Computer Science, MCA, MBA (IT), or professional certifications like AWS, Google Cloud, or Microsoft certifications.</p>
        <p className="mb-4">This course is ideal for students who are passionate about technology, coding, and problem-solving and want to build a career in the dynamic field of computer applications and software development.</p>
      </>
      }
      title="Bachelor of Science (Computer Applications)"
      description="The Bachelor of Science (Computer Applications) programme details will be updated shortly."
    />
  );
}
