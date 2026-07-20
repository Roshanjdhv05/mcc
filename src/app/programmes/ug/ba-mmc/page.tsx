import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import CourseFeeStructure from '@/components/ui/CourseFeeStructure';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

export const metadata: Metadata = {
  title: 'B.A (MMC) | MCC Digital Experience Platform',
  description: 'Bachelor of Arts (Multimedia and Mass Communication) at Mulund College of Commerce.',
};

const bammcFaculty = [
  { srNo: 1, name: 'Dr. Viji Kannan',              additionalRole: 'Head of Dept',  designation: 'Associate Professor', email: 'viji.kannan@mccmulund.ac.in',           education: 'BCS, MBA, NET, PhD',                                              teachingExp: '24 yrs' },
  { srNo: 2, name: 'Dr. Shriya Sudhakar Shenoy',  additionalRole: '—',            designation: 'Assistant Professor', email: 'shriya.shenoy@mccmulund.ac.in',          education: 'PhD, SET -M, MA (Mass Communication & Journalism)',               teachingExp: '10 yrs' },
  { srNo: 3, name: 'Dr.Nimisha Gadkari',           additionalRole: '—',            designation: 'Assistant Professor', email: 'nimisha.gadkari@mccmulund.ac.in',         education: 'PhD in Mass Communication & Journalism, MA in Entertainment, Media & Marketing', teachingExp: '7 yrs' },
  { srNo: 4, name: 'Ms. Sanika Ratnaparkhi',       additionalRole: '—',            designation: 'Assistant Professor', email: 'sanika.ratnaparkhi@mccmulund.ac.in',     education: 'BA & MA in English Literature, PGDM in Journalism and Mass Communication, Pursuing PhD', teachingExp: '1 yr' },
];

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Arts (BA) in Multimedia and Mass Communication is an undergraduate program that focuses on the dynamic fields of media, journalism, digital content creation, and communication strategies. This interdisciplinary course blends journalism, advertising, public relations, film studies, digital media, and multimedia production, equipping students with the skills needed for the fast-evolving media industry.</p>
        <p className="mb-4">The program covers key subjects such as news reporting, media ethics, digital marketing, photography, videography, scriptwriting, graphic design, and social media management. Students gain hands-on experience through practical assignments, internships, and industry collaborations, allowing them to develop storytelling, creative, and technical expertise.</p>
        <p className="mb-4">Graduates of this course can pursue careers in journalism, filmmaking, digital marketing, public relations, corporate communications, advertising, and content creation. The program also serves as a foundation for higher studies like Master's in Mass Communication, Media Studies, or specialized certifications in digital media.</p>
        <p className="mb-4">This degree is ideal for individuals passionate about storytelling, media production, and communication, and who wish to make a mark in the ever-growing media and entertainment industry.</p>
        </>
      }
      syllabusContent={<SyllabusRenderer programKey="BAMMC" />}
      courseKey="BAMMC"
      title="Bachelor of Arts (Multimedia and Mass Communication)"
      description="The Bachelor of Arts (Multimedia and Mass Communication) programme details will be updated shortly."
      facultyData={bammcFaculty}
    />
  );
}
