import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

export const metadata: Metadata = {
  title: 'B.Com (MS) | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Management Studies) at Mulund College of Commerce.',
};

const bcomMsFaculty = [
  { srNo: 1, name: 'Dr. Kanchana Sattur', additionalRole: '—', designation: 'Assistant Professor', department: 'BCOM MS', education: 'MCom, M.B.A, NET(Comm& Mgmt), PhD.,', email: 'kanchana.sattur@mccmulund.ac.in', teachingExp: '15 yrs', image: '/Degree College Teachers/Kanchana Sattur.png' },
  { srNo: 2, name: 'Dr. Soumya Monappilly', additionalRole: '—', designation: 'Assistant Professor', department: 'BCOM MS', education: 'MA (Economics), MBA, MCOM, MJMC, PhD (Economics)', email: 'soumya.george@mccmulund.ac.in', teachingExp: '14 yrs', image: '/Degree College Teachers/Soumya George.png' },
  { srNo: 3, name: 'Dr. Shilpi Jawake', additionalRole: '—', designation: 'Assistant Professor', department: 'BCOM MS', education: 'MBA, MCOM, NET, SET, Pursuing PhD', email: 'shilpi.jawake@mccmulund.ac.in', teachingExp: '12 yrs', image: '/Degree College Teachers/Shilpi Juwake.png' },
  { srNo: 4, name: 'Dr. Abhilasha N', additionalRole: '—', designation: 'Assistant Professor', department: 'BCOM MS', education: 'M. Com, MPhil, NET, PhD', email: 'abhilasha.n@mccmulund.ac.in', teachingExp: '12 yrs', image: '/Degree College Teachers/Abilasha N.png' },
  { srNo: 5, name: 'Mr. Felix Anthonysamy', additionalRole: '—', designation: 'Assistant Professor', department: 'BCOM MS', education: 'M.Com., B.Ed., MBA ., MA NET., SET.,', email: 'felix@mccmulund.ac.in', teachingExp: '10 yrs', image: '/Degree College Teachers/Felix Anthonysamy.png' },
];

export default function CoursePage() {
  return (
    <CourseTemplate 
      festivals="Inspira"
      publication="Inspira"
      introductionContent={
        <>
        <p className="mb-4">Bachelor of Commerce (B.Com) in Management Studies is an undergraduate program designed to provide students with in-depth knowledge of business management, financial principles, and organizational strategies. The program combines theoretical and practical aspects of commerce, focusing on business operations, management techniques, and decision-making processes.</p>
        <p className="mb-4">The course covers core subjects such as business management, financial accounting, marketing, human resource management, business law, organizational behavior, and strategic management. It prepares students for leadership roles in various industries by equipping them with analytical, problem-solving, and managerial skills.</p>
        <p className="mb-4">Graduates of B.Com in Management Studies can pursue careers in corporate management, banking, finance, marketing, entrepreneurship, and consulting. They can also opt for higher education like MBA, M.Com, CFA, or other professional certifications to enhance their expertise and career prospects.</p>
        <p className="mb-4">This program is ideal for students who aspire to develop managerial skills, understand business dynamics, and take on leadership roles in the corporate world.</p>
      </>
      }
      syllabusContent={<SyllabusRenderer programKey="BMS" />}
      title="Bachelor of Commerce (Management Studies)"
      shortInfo="A specialized marketing degree designed to build expertise in consumer behavior, digital marketing, brand management, and sales strategies."
      fundingType="Self Financing"
      facultyData={bcomMsFaculty}
    />
  );
}

