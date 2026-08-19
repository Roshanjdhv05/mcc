"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const bcomFaculty = [
  { srNo: 1, name: 'Mr.Nikhil Karkhanis', additionalRole: 'Advanced Accountancy Co-ordinator', designation: 'Assistant Professor', department: 'Accountancy', education: 'M.Com., CS., NET., SET., LLB', email: 'nikhil.karkhanis@mccmulund.ac.in', teachingExp: '', image: '/Degree College Teachers/Nikhil Karkhanis.png' },
  { srNo: 2, name: 'Ms.Riya Dhamaprukar', additionalRole: '—', designation: 'Assistant Professor', department: 'Accountancy', education: 'M.Com., B.Ed., NET.,SET', email: 'riya.dhamapurkar@mccmulund.ac.in', teachingExp: '0 yrs' },
  { srNo: 3, name: 'Ms.Snehal Chavan', additionalRole: '—', designation: 'Assistant Professor', department: 'Accountancy', education: 'M.Com.,CA.,CMA., ,NET.', email: 'snehal.chavan@mccmulund.ac.in', teachingExp: '0 yrs', image: '/Degree College Teachers/Snehal Chavan.png' },
  { srNo: 4, name: 'Ms.Shweta Ghare', additionalRole: '—', designation: 'Assistant Professor', department: 'Accountancy', education: 'M. Com.,SET', email: 'shweta.ghare@mccmulund.ac.in', teachingExp: '0 yrs' },
  { srNo: 5, name: 'Mr.Prathamesh Bobhate', additionalRole: '—', designation: 'Assistant Professor', department: 'Accountancy', education: 'M. Com,NET', email: 'prathamesh.bobhate@mccmulund.ac.in', teachingExp: '0 yrs', image: '/Degree College Teachers/Prathmesh Bobhate.png' },
  { srNo: 6, name: 'Suchitra Poojari', additionalRole: '—', designation: 'Assistant Professor', department: 'Accountancy', education: 'M.Com, NET, MH-SET, KSET', email: 'suchitra.poojari@mccmulund.ac.in', teachingExp: '', image: '/Degree College Teachers/Suchitra Poojary.png' },
  { srNo: 7, name: 'Dr.Shivaji Pawar', additionalRole: '—', designation: 'Vice-Principal & Head', department: 'Business Economics', education: 'M.A.,B.Ed.,M.Phil., Ph.D.,NET', email: 'shivaji.pawar@mccmulund.ac.in', teachingExp: '', image: '/Degree College Teachers/Shivaji Pawar.png' },
  { srNo: 8, name: 'Dr.Arjun Lakhe', additionalRole: '—', designation: 'Assistant Professor', department: 'Business Economics', education: 'M.A.,M.Phil.,Ph.D.', email: 'arjun.lakhe@mccmulund.ac.in', teachingExp: '12 yrs.', image: '/Degree College Teachers/Arjun Lakhe.png' },
  { srNo: 9, name: 'Ms.Gopika Pal', additionalRole: '—', designation: 'Assistant Professor', department: 'Business Economics', education: 'M.A.,Post Graduate Diploma in Finance management and Post Graduate Diploma in Banking Operations,SET', email: 'gopika.pal@mccmulund.ac.in', teachingExp: '0 yrs', image: '/Degree College Teachers/Gopika Pal.png' },
  { srNo: 10, name: 'Dr.Anuradha Ganesh', additionalRole: 'Head & Assistant Professor', designation: 'Assistant Professor', department: 'Commerce', education: 'M.Com,CA., NET,Ph.D', email: 'anuradha.ganesh@mccmulund.ac.in', teachingExp: '0 yrs' },
  { srNo: 11, name: 'Dr.Sulbha Dey', additionalRole: '—', designation: 'Assistant Professor', department: 'Commerce', education: 'M.Com,B.Ed., NET,Ph.D', email: 'sulbha.dey@mccmulund.ac.in', teachingExp: '0 yrs' },
  { srNo: 12, name: 'Dr.Vaishali Patil', additionalRole: '—', designation: 'Assistant Professor', department: 'Commerce', education: 'M.Com.,MBA,NET,SET,M.Phil.,Ph.D.', email: 'vaisahali.patil@mccmulund.ac.in', teachingExp: '19 yrs' },
  { srNo: 13, name: 'Ms.Divya Iyer', additionalRole: '—', designation: 'Assistant Professor', department: 'Commerce', education: 'M. Com,SET', email: 'divya@mccmulund.ac.in', teachingExp: '0 yrs' },
  { srNo: 14, name: 'Ms. Dhanvi Mehta', additionalRole: '—', designation: 'Assistant Professor', department: 'Commerce', education: 'Master of Commerce (Business Management), UGC NET', email: 'dhanviedu@gmail.com', teachingExp: '2 yrs', image: '/Degree College Teachers/Dhanvi Mehta.png' },
  { srNo: 15, name: 'Dr.Shayeree Ghosh', additionalRole: 'Head & Assistant Professor', designation: 'Assistant Professor', department: 'English', education: 'M.A., M.Phil., NET., Ph.D.', email: 'shayeree.ghosh@mccmulund.ac.in', teachingExp: '', image: '/Degree College Teachers/Shayeree Ghosh.png' },
  { srNo: 16, name: 'Mr.Jayanta Ghorpade', additionalRole: '—', designation: 'Assistant Professor', department: 'English', education: 'M.A., B.Ed., M.Phil., NET.', email: 'jayanta.ghorpade@mccmulund.ac.in', teachingExp: '', image: '/Degree College Teachers/Jayanta Ghorpade.png' },
  { srNo: 17, name: 'Mr.Amit Yadav', additionalRole: 'Head & Assistant Professor', designation: 'Assistant Professor', department: 'Environmental Studies', education: 'M.Sc., NET., LLB.,P.G.D.E.L. (NLSIU)', email: 'amit.yadav@mccmulund.ac.in', teachingExp: '17 yrs' },
  { srNo: 18, name: 'Dr. Minal Mapuskar', additionalRole: '—', designation: 'Principal & head', department: 'IKS', education: 'M.A,NET,SLET,PhD.', email: 'principal@mccmulund.ac.in', teachingExp: '20 yrs', image: '/Degree College Teachers/Minal Mapuskar.png' },
  { srNo: 19, name: 'Ms .Jui Kadvwekar', additionalRole: '—', designation: 'Assistant Professor', department: 'IKS', education: 'MA., NET', email: 'juikadvekar@gmail.com', teachingExp: '', image: '/Degree College Teachers/Jui Kudvekar.png' },
  { srNo: 20, name: "Dr.Pramila D'souza", additionalRole: '—', designation: 'Head & Assistant Professor', department: 'Law', education: 'LLB., LLM., Ph.D., NET', email: 'pramiladsouza@mulund.ac.in', teachingExp: '', image: "/Degree College Teachers/Pramila D'Souza.png" },
  { srNo: 21, name: 'Ms. Seema Attarde', additionalRole: 'HOD', designation: 'Assistant Professor', department: 'Mathematics, Statistics and Computer Applications', education: 'M.Sc. (Statistics)', email: 'seema.attarde@mccmulund.ac.in', teachingExp: '26 yrs', image: '/Degree College Teachers/Seema Attarde.png' },
  { srNo: 22, name: 'Ms.Komal Bhatt', additionalRole: '—', designation: 'Assistant Professor', department: 'Mathematics, Statistics and Computer Applications', education: 'M.Sc. (Mathematics)', email: 'komal.bhat@mccmulund.ac.in', teachingExp: '0 yrs', image: '/Degree College Teachers/Komal Bhatt.png' },
  { srNo: 23, name: 'Ms. Neha Rajendraprasad Pal', additionalRole: '—', designation: 'Assistant Professor', department: 'Mathematics, Statistics and Computer Applications', education: 'M.Sc. (Mathematics), B. Ed', email: 'neha.pal@mccmulund.ac.in', teachingExp: '0 yrs', image: '/Degree College Teachers/Neha Pal.png' },
  { srNo: 24, name: 'Ms. Chetna Shailesh Panchal', additionalRole: '—', designation: 'Assistant Professor', department: 'Mathematics, Statistics and Computer Applications', education: 'M.Sc. (Mathematics), B.Ed.', email: 'chetna.panchal@mccmulund.ac.in', teachingExp: '0 yrs', image: '/Degree College Teachers/Chetna Panachal.png' },
  { srNo: 25, name: 'Mrs. Gauri A. Atre', additionalRole: '—', designation: 'Assistant Professor', department: 'Mathematics, Statistics and Computer Applications', education: 'Msc(Mathematics). B. Ed. Mphil', email: 'gauri.atre@mccmulund.ac.in', teachingExp: '20 yrs', image: '/Degree College Teachers/Gauri Atre.png' },
];

export default function BComPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: '10+2 from any recognised Board in any stream.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years (NEP 4 Years), 6/8 Semesters.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '07:15 AM – 10:40 AM' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '600 Seats' }
  ];

  return (
    <CourseTemplate
      festivals="Festivals"
      publication="Publication"
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Commerce (B.Com) program is a versatile and widely recognized undergraduate degree that provides students with a solid foundation in business, accounting, economics, and finance. It is designed to equip students with the necessary skills and knowledge to succeed in various corporate and financial roles.</p>
        <p className="mb-4">The curriculum covers core subjects such as financial accounting, corporate law, business economics, business communication, taxation, and auditing. It blends theoretical knowledge with practical applications, allowing students to develop critical thinking, problem-solving, and analytical skills.</p>
        <p className="mb-4">Graduates of the B.Com program have diverse career opportunities across industries. They can pursue roles in accounting, banking, financial management, human resources, marketing, and taxation. Additionally, a B.Com degree serves as an excellent stepping stone for professional courses like Chartered Accountancy (CA), Company Secretary (CS), Cost and Management Accountancy (CMA), and Master of Business Administration (MBA).</p>
        <p className="mb-4">This program is ideal for students seeking a comprehensive understanding of business operations and aiming to build a successful career in the dynamic world of commerce and industry.</p>
      </>
      }
      syllabusContent={<SyllabusRenderer programKey="BCOM" />}
      courseKey="BCOM"
      shortInfo="A comprehensive commerce education providing a strong foundation in accounting, business management, economics, and finance — preparing students for diverse corporate roles."
      title="Bachelor of Commerce (B.Com)"
      fundingType="Aided"
      facultyData={bcomFaculty}
      quickActionsData={quickActions}
    />
  );
}

