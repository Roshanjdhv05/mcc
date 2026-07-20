"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const bcomFaculty = [
  { srNo: 1,  name: 'Mr.Nikhil Karkhanis',    additionalRole: 'Advanced Accountancy Co-ordinator', designation: 'Assistant Professor', email: 'nikhil.karkhanis@mccmulund.ac.in',   education: 'M.Com., CS., NET., SET., LLB',                   teachingExp: '' },
  { srNo: 2,  name: 'Ms.Riya Dhamaprukar',    additionalRole: '—',                               designation: 'Assistant Professor', email: 'riya.dhamapurkar@mccmulund.ac.in',   education: 'M.Com., B.Ed., NET., SET',                       teachingExp: '' },
  { srNo: 3,  name: 'Ms.Snehal Chavan',       additionalRole: '—',                               designation: 'Assistant Professor', email: 'snehal.chavan@mccmulund.ac.in',      education: 'M.Com., CA., CMA., NET.',                        teachingExp: '' },
  { srNo: 4,  name: 'Ms.Shweta Ghare',        additionalRole: '—',                               designation: 'Assistant Professor', email: 'shweta.ghare@mccmulund.ac.in',       education: 'M. Com., SET',                                   teachingExp: '' },
  { srNo: 5,  name: 'Mr.Prathamesh Bobhate',  additionalRole: '—',                               designation: 'Assistant Professor', email: 'prathamesh.bobhate@mccmulund.ac.in', education: 'M. Com, NET',                                    teachingExp: '' },
  { srNo: 6,  name: 'Suchitra Poojari',       additionalRole: '—',                               designation: 'Assistant Professor', email: 'suchitra.poojari@mccmulund.ac.in',   education: 'M.Com, NET, MH-SET, KSET',                       teachingExp: '' },
  { srNo: 7,  name: 'Dr.Shivaji Pawar',       additionalRole: 'Vice-Principal & Head',           designation: 'Associate Professor', email: 'shivaji.pawar@mccmulund.ac.in',      education: 'M.A., B.Ed., M.Phil., Ph.D., NET',               teachingExp: '' },
  { srNo: 8,  name: 'Dr.Arjun Lakhe',         additionalRole: '—',                               designation: 'Assistant Professor', email: 'arjun.lakhe@mccmulund.ac.in',        education: 'M.A., M.Phil., Ph.D.',                           teachingExp: '12 yrs' },
  { srNo: 9,  name: 'Ms.Gopika Pal',          additionalRole: '—',                               designation: 'Assistant Professor', email: 'gopika.pal@mccmulund.ac.in',         education: 'M.A., PG Diploma in Finance Management & Banking Operations, SET', teachingExp: '' },
  { srNo: 10, name: 'Dr.Anuradha Ganesh',     additionalRole: 'Head & Assistant Professor',      designation: 'Assistant Professor', email: 'anuradha.ganesh@mccmulund.ac.in',    education: 'M.Com, CA., NET, Ph.D',                          teachingExp: '' },
  { srNo: 11, name: 'Dr.Sulbha Dey',          additionalRole: '—',                               designation: 'Assistant Professor', email: 'sulbha.dey@mccmulund.ac.in',         education: 'M.Com, B.Ed., NET, Ph.D',                        teachingExp: '' },
  { srNo: 12, name: 'Dr.Vaishali Patil',      additionalRole: '—',                               designation: 'Assistant Professor', email: 'vaisahali.patil@mccmulund.ac.in',    education: 'M.Com., MBA, NET, SET, M.Phil., Ph.D.',          teachingExp: '19 yrs' },
  { srNo: 13, name: 'Ms.Divya Iyer',          additionalRole: '—',                               designation: 'Assistant Professor', email: 'divya@mccmulund.ac.in',              education: 'M. Com, SET',                                    teachingExp: '' },
  { srNo: 14, name: 'Ms. Dhanvi Mehta',       additionalRole: '—',                               designation: 'Assistant Professor', email: 'dhanviedu@gmail.com',                education: 'MCom (Business Management), UGC NET',            teachingExp: '2 yrs' },
  { srNo: 15, name: 'Dr.Shayeree Ghosh',      additionalRole: 'Head & Assistant Professor',      designation: 'Assistant Professor', email: 'shayeree.ghosh@mccmulund.ac.in',     education: 'M.A., M.Phil., NET., Ph.D.',                     teachingExp: '' },
  { srNo: 16, name: 'Mr.Jayanta Ghorpade',    additionalRole: '—',                               designation: 'Assistant Professor', email: 'jayanta.ghorpade@mccmulund.ac.in',   education: 'M.A., B.Ed., M.Phil., NET.',                     teachingExp: '' },
  { srNo: 17, name: 'Mr.Amit Yadav',          additionalRole: 'Head & Assistant Professor',      designation: 'Assistant Professor', email: 'amit.yadav@mccmulund.ac.in',         education: 'M.Sc., NET., LLB., P.G.D.E.L. (NLSIU)',         teachingExp: '17 yrs' },
  { srNo: 18, name: 'Dr. Minal Mapuskar',     additionalRole: 'Principal & Head',                designation: 'Principal',           email: 'principal@mccmulund.ac.in',          education: 'M.A, NET, SLET, PhD.',                           teachingExp: '20 yrs' },
  { srNo: 19, name: 'Ms .Jui Kadvwekar',      additionalRole: '—',                               designation: 'Assistant Professor', email: 'juikadvekar@gmail.com',              education: 'MA., NET',                                       teachingExp: '' },
  { srNo: 20, name: 'Dr.Pramila D\'souza',    additionalRole: 'Head & Assistant Professor',      designation: 'Assistant Professor', email: 'pramiladsouza@mulund.ac.in',         education: 'LLB., LLM., Ph.D., NET',                         teachingExp: '' },
  { srNo: 21, name: 'Ms. Seema Attarde',      additionalRole: 'HOD (Maths, Stats & Comp. App.)', designation: 'Assistant Professor', email: 'seema.attarde@mccmulund.ac.in',      education: 'M.Sc. (Statistics)',                             teachingExp: '26 yrs' },
  { srNo: 22, name: 'Ms.Komal Bhatt',         additionalRole: '—',                               designation: 'Assistant Professor', email: 'komal.bhat@mccmulund.ac.in',         education: 'M.Sc. (Mathematics)',                            teachingExp: '' },
  { srNo: 23, name: 'Ms. Neha Rajendraprasad Pal', additionalRole: '—',                          designation: 'Assistant Professor', email: 'neha.pal@mccmulund.ac.in',           education: 'M.Sc. (Mathematics), B.Ed',                      teachingExp: '' },
  { srNo: 24, name: 'Ms. Chetna Shailesh Panchal', additionalRole: '—',                          designation: 'Assistant Professor', email: 'chetna.panchal@mccmulund.ac.in',     education: 'M.Sc. (Mathematics), B.Ed.',                     teachingExp: '' },
  { srNo: 25, name: 'Mrs. Gauri A. Atre',     additionalRole: '—',                               designation: 'Assistant Professor', email: 'gauri.atre@mccmulund.ac.in',         education: 'Msc(Mathematics), B.Ed., Mphil',                 teachingExp: '20 yrs' },
];

export default function BComPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: '10+2 from any recognised Board in any stream.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years (NEP 4 Years), 6/8 Semesters.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: 'Morning Batches.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'Contact College Administration.' }
  ];

  return (
    <CourseTemplate
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
      title="Bachelor of Commerce (B.Com)"
      description="A versatile undergraduate program providing a solid foundation in business, accounting, economics, and finance."
      facultyData={bcomFaculty}
      quickActionsData={quickActions}
    />
  );
}
