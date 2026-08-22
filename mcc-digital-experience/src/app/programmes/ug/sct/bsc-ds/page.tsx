import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import { renderSyllabusTable } from '@/lib/syllabusData';
import { Users, Clock, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'B.Sc. (DS) | MCC Digital Experience Platform',
  description: 'Bachelor of Science (Data Science) at Mulund College of Commerce.',
};

const bscDsFaculty = [
  {
    srNo: 1,
    name: 'Prof. Dr. Minal Anand Mapuskar',
    additionalRole: '—',
    designation: 'Assistant Professor',
    department: 'B.Sc. DS',
    education: 'M.A. (Political Science), NET, SET, Ph.D.',
    email: '—',
    teachingExp: '20 yrs',
    linkedin: 'https://www.linkedin.com/in/minal-mapuskar-a4705a14b',
    areas_of_interest: 'Policy, Governance',
  },
  {
    srNo: 2,
    name: 'Ms. Jui Kadvekar',
    additionalRole: '—',
    designation: 'Assistant Professor',
    department: 'B.Sc. DS',
    education: 'M.A. (History), NET',
    email: '—',
    teachingExp: '3 yrs',
    linkedin: 'https://www.linkedin.com/in/jui-kadvekar-3831a95a',
    areas_of_interest: 'History of Mumbai and Suburban Mumbai, Indian Knowledge Systems, History of Indian Culture, Society and Cinema',
  },
  {
    srNo: 3,
    name: 'Ms. Komal Bhatt',
    additionalRole: '—',
    designation: 'Assistant Professor',
    department: 'B.Sc. DS',
    education: 'M.Sc. Maths',
    email: '—',
    teachingExp: '7 yrs',
    linkedin: 'https://www.linkedin.com/in/komal-bhatt-555b47227',
    areas_of_interest: 'Applications of Mathematics & Statistics, Operations Research, Data Analytics, Decision-making and Education',
  },
  {
    srNo: 4,
    name: 'Dr. Pramila D\'Souza',
    additionalRole: '—',
    designation: 'Assistant Professor',
    department: 'B.Sc. DS',
    education: 'B.A., L.L.M., NET, Ph.D.',
    email: '—',
    teachingExp: '20 yrs',
    areas_of_interest: 'Human Rights',
  },
];

const quickActions = [
  { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'HSC (any stream) with Maths/Stats OR Diploma in IT/CS/allied branches.' },
  { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
  { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '02:05 PM – 08:10 PM' },
  { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '60 Seats' },
];

export default function CoursePage() {
  return (
    <CourseTemplate 
      festivals="Hack-A-Thon"
      publication="Tech Anugraha"
      introductionContent={
        <>
        <p className="mb-4">Bachelor of Science (B.Sc.) in Data Science is an undergraduate program that focuses on the study of data analysis, machine learning, statistics, and computational techniques to extract meaningful insights from large datasets. This interdisciplinary course combines elements of mathematics, computer science, and business intelligence, preparing students for the growing field of data-driven decision-making.</p>
        <p className="mb-4">The curriculum covers key subjects such as statistics, programming (Python, R), data visualization, database management, big data analytics, artificial intelligence, and cloud computing. It emphasizes practical learning through real-world projects, case studies, and internships.</p>
        <p className="mb-4">With the increasing demand for data scientists, analysts, and AI professionals, graduates of B.Sc. in Data Science can pursue careers in diverse industries, including finance, healthcare, e-commerce, technology, and government sectors. They can also opt for advanced studies like M.Sc. in Data Science, AI, or certifications in machine learning and business analytics to enhance their expertise.</p>
        <p className="mb-4">This program is ideal for students interested in problem-solving, predictive modeling, and leveraging data to drive innovation and business growth in the digital era.</p>
      </>
      }
      title="Bachelor of Science (Data Science)"
      fundingType="Self Financing"
      courseKey="BSC_DS"
      shortInfo="An interdisciplinary program combining mathematics, statistics, and computer science to extract actionable insights from big data."
      category="science"
      facultyData={bscDsFaculty}
      syllabusContent={renderSyllabusTable('BSC_DS')}
      quickActionsData={quickActions}
    />
  );
}

