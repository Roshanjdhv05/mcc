"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const bammcFaculty = [
  {
    srNo: 1,
    name: 'Dr. Viji Kannan',
    additionalRole: 'Head of Dept',
    designation: 'Associate Professor',
    email: 'viji.kannan@mccmulund.ac.in',
    education: 'BCS, MBA, NET, PhD',
    teachingExp: '24 yrs',
    department: 'Media Studies',
  },
  {
    srNo: 2,
    name: 'Dr. Shriya Shenoy',
    additionalRole: '—',
    designation: 'Assistant Professor',
    email: 'shriya.shenoy@mccmulund.ac.in',
    education: 'PhD, SET-M, MA (Mass Communication & Journalism)',
    teachingExp: '10 yrs',
    department: 'Media Studies',
  },
  {
    srNo: 3,
    name: 'Dr. Nimisha Gadkari',
    additionalRole: '—',
    designation: 'Assistant Professor',
    email: 'nimisha.gadkari@mccmulund.ac.in',
    education: 'PhD in Mass Communication & Journalism, MA in Entertainment, Media & Marketing',
    teachingExp: '7 yrs',
    department: 'Media Studies',
  },
  {
    srNo: 4,
    name: 'Ms. Sanika Ratnaparkhi',
    additionalRole: '—',
    designation: 'Assistant Professor',
    email: 'sanika.ratnaparkhi@mccmulund.ac.in',
    education: 'BA & MA in English Literature, PGDM in Journalism & Mass Communication, Pursuing PhD',
    teachingExp: '1 yr',
    department: 'Media Studies',
  },
];

export default function BAMMCPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: '10+2 from any recognised Board in any stream.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years (NEP 4 Years), 6/8 Semesters.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '12:00 PM – 04:30 PM' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '60 Seats' },
  ];

  return (
    <CourseTemplate
      title="Bachelor of Arts (Multimedia and Mass Communication)"
      fundingType="Self Financing"
      publication="Shutter Speed"
      courseKey="BAMMC"
      facultyData={bammcFaculty}
      quickActionsData={quickActions}
      syllabusContent={<SyllabusRenderer programKey="BAMMC" />}
      introductionContent={
        <>
          <p className="mb-4">
            The Bachelor of Arts (BA) in Multimedia and Mass Communication is an undergraduate program that focuses on the dynamic fields of media, journalism, digital content creation, and communication strategies. This interdisciplinary course blends journalism, advertising, public relations, film studies, digital media, and multimedia production, equipping students with the skills needed for the fast-evolving media industry.
          </p>
          <p className="mb-4">
            The program covers key subjects such as news reporting, media ethics, digital marketing, photography, videography, scriptwriting, graphic design, and social media management. Students gain hands-on experience through practical assignments, internships, and industry collaborations, allowing them to develop storytelling, creative, and technical expertise.
          </p>
          <p className="mb-4">
            Graduates of this course can pursue careers in journalism, filmmaking, digital marketing, public relations, corporate communications, advertising, and content creation. The program also serves as a foundation for higher studies like Master's in Mass Communication, Media Studies, or specialized certifications in digital media.
          </p>
          <p className="mb-4">
            This degree is ideal for individuals passionate about storytelling, media production, and communication, and who wish to make a mark in the ever-growing media and entertainment industry.
          </p>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Programme Highlights</h4>
          <ul className="space-y-3 mb-6">
            {[
              'Hands-on training in photography, videography, and graphic design',
              'Industry collaborations and real-world internship opportunities',
              'Exposure to digital marketing, social media management, and content creation',
              'Practical assignments in news reporting, scriptwriting, and media production',
              'Strong foundation for careers in journalism, PR, advertising, and filmmaking',
              'Gateway to postgraduate studies in Mass Communication and Media Studies',
            ].map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm font-medium text-gray-700">
                <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Career Opportunities</h4>
          <p className="text-sm text-gray-600 mb-3">
            Graduates are well-equipped for diverse roles across the media and communication landscape:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {[
              'Journalist / Reporter',
              'Digital Marketing Specialist',
              'Public Relations Executive',
              'Content Creator / Blogger',
              'Filmmaker / Video Editor',
              'Graphic Designer',
              'Social Media Manager',
              'Corporate Communication Officer',
              'Advertising Copywriter',
            ].map((career, idx) => (
              <div key={idx} className="bg-[#EBF3FF] text-[#123B6D] text-xs font-semibold rounded-lg px-3 py-2 text-center">
                {career}
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}

