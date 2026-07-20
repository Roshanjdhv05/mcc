import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

export const metadata: Metadata = {
  title: 'B.Com (BA) | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Business Administration) at Mulund College of Commerce.',
};

const bcomBaFaculty = [
  { srNo: 1, name: 'Dr. Viji Kannan',           additionalRole: 'Head of Dept',  designation: 'Associate Professor', email: 'viji.kannan@mccmulund.ac.in',     education: 'BCS, MBA, NET, PhD',                                               teachingExp: '24 yrs' },
  { srNo: 2, name: 'Ms. Prajakta Vaibhav Khamkar', additionalRole: '—',          designation: 'Assistant Professor', email: 'prajakta@gmail.com',             education: 'MBA',                                                              teachingExp: '8 yrs' },
  { srNo: 3, name: 'Ms. Rutuja Birje',           additionalRole: '—',           designation: 'Assistant Professor', email: 'rutuja.birje@mccmulund.ac.in',    education: 'MCom (Accountancy), NET, CS (Executive), Diploma in Tax Management', teachingExp: '9 yrs' },
];

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Commerce (B.Com) in Business Administration is an undergraduate degree program designed to provide students with a strong foundation in business management, finance, economics, and organizational strategies. It equips students with the necessary skills and knowledge to manage and operate businesses efficiently in a dynamic economic environment.</p>
        <p className="mb-4">This program covers a wide range of subjects, including accounting, marketing, human resource management, business law, financial management, entrepreneurship, and corporate governance. It prepares students for careers in various industries, including banking, finance, retail, consulting, and entrepreneurship.</p>
        <p className="mb-4">The B.Com in Business Administration program focuses on developing critical thinking, leadership, and decision-making skills, making graduates well-suited for managerial roles in organizations. Additionally, the program lays a strong academic foundation for those who wish to pursue higher studies, such as an MBA or specialized postgraduate diplomas in business-related fields.</p>
        <p className="mb-4">Overall, this course is ideal for students looking to build a career in business, administration, and management while gaining a comprehensive understanding of the corporate world.</p>
      </>
      }
      syllabusContent={<SyllabusRenderer programKey="BBA" />}
      title="Bachelor of Commerce (Business Administration)"
      description="The Bachelor of Commerce (Business Administration) programme details will be updated shortly."
      facultyData={bcomBaFaculty}
    />
  );
}
