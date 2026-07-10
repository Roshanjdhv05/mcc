import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import CourseFeeStructure from '@/components/ui/CourseFeeStructure';

export const metadata: Metadata = {
  title: 'B.A (MMC) | MCC Digital Experience Platform',
  description: 'Bachelor of Arts (Multimedia and Mass Communication) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Arts (BA) in Multimedia and Mass Communication is an undergraduate program that focuses on the dynamic fields of media, journalism, digital content creation, and communication strategies. This interdisciplinary course blends journalism, advertising, public relations, film studies, digital media, and multimedia production, equipping students with the skills needed for the fast-evolving media industry.</p>
        <p className="mb-4">The program covers key subjects such as news reporting, media ethics, digital marketing, photography, videography, scriptwriting, graphic design, and social media management. Students gain hands-on experience through practical assignments, internships, and industry collaborations, allowing them to develop storytelling, creative, and technical expertise.</p>
        <p className="mb-4">Graduates of this course can pursue careers in journalism, filmmaking, digital marketing, public relations, corporate communications, advertising, and content creation. The program also serves as a foundation for higher studies like Master’s in Mass Communication, Media Studies, or specialized certifications in digital media.</p>
        <p className="mb-4">This degree is ideal for individuals passionate about storytelling, media production, and communication, and who wish to make a mark in the ever-growing media and entertainment industry.</p>
      </>
      }
      syllabusContent={<CourseFeeStructure courseKey="BAMMC" category="commerce" />}
      courseKey="BAMMC"
      title="Bachelor of Arts (Multimedia and Mass Communication)"
      description="The Bachelor of Arts (Multimedia and Mass Communication) programme details will be updated shortly."
    />
  );
}
