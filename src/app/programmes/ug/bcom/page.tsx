import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'B.Com | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (B.Com) at Mulund College of Commerce.',
};

import BComPageClient from './BComPageClient';

export default function BComPage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Program Structure (As Per NEP 2020)</h3>
      
      {/* First Year */}
      <div>
        <h4 className="font-bold text-[#D4A017] mb-4 bg-[#FFF8E7] px-4 py-2 rounded-lg">First Year (Semester I & II)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F8FAFC] text-[#123B6D]">
              <tr>
                <th className="p-3 border">Vertical</th>
                <th className="p-3 border">Semester I</th>
                <th className="p-3 border">Semester II</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Introduction to Accountancy</td><td className="p-3 border">Accountancy and Financial Management</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Introduction to Business Studies</td><td className="p-3 border">Service Sector</td></tr>
              <tr><td className="p-3 border font-semibold">Minor (Any One)</td><td className="p-3 border">-</td><td className="p-3 border">1) Micro Economics<br/>2) Economics for Professionals</td></tr>
              <tr><td className="p-3 border font-semibold">OE I (Any One)</td><td className="p-3 border">1) Intro to Human Rights<br/>2) Intro to Constitution of India<br/>3) Environmental Disasters</td><td className="p-3 border">Environmental Disasters & Risk Reduction</td></tr>
              <tr><td className="p-3 border font-semibold">OE II (Any One)</td><td className="p-3 border">1) Short Story Appreciation<br/>2) Life Skills for Professionals<br/>3) Tourism Development</td><td className="p-3 border">1) Translation Studies<br/>2) Global Etiquettes<br/>3) Tourism Development</td></tr>
              <tr><td className="p-3 border font-semibold">VSC</td><td className="p-3 border">Introduction to Statistics</td><td className="p-3 border">Quantitative Business Techniques</td></tr>
              <tr><td className="p-3 border font-semibold">SEC (Any One)</td><td className="p-3 border">1) Professional Communication<br/>2) Executive/Organizational Communication</td><td className="p-3 border">Corporate Communication</td></tr>
              <tr><td className="p-3 border font-semibold">AEC</td><td className="p-3 border">Professional Competency in English</td><td className="p-3 border">Creative Writing in English</td></tr>
              <tr><td className="p-3 border font-semibold">VEC</td><td className="p-3 border">Environment Conservation</td><td className="p-3 border">Environmental Issues and Management</td></tr>
              <tr><td className="p-3 border font-semibold">IKS</td><td className="p-3 border">Fundamentals of Indian Knowledge System</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">CC</td><td className="p-3 border">Co-curricular Course I</td><td className="p-3 border">Co-curricular Course II</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Second Year */}
      <div>
        <h4 className="font-bold text-[#D4A017] mb-4 bg-[#FFF8E7] px-4 py-2 rounded-lg">Second Year (Semester III & IV)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F8FAFC] text-[#123B6D]">
              <tr>
                <th className="p-3 border">Vertical</th>
                <th className="p-3 border">Semester III</th>
                <th className="p-3 border">Semester IV</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Accounting for Partnership Firms</td><td className="p-3 border">Corporate Accounting</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Management Studies</td><td className="p-3 border">Advertising and Media Management</td></tr>
              <tr><td className="p-3 border font-semibold">Minor (Any One)</td><td className="p-3 border">1) Macro Economics<br/>2) Economic Laws</td><td className="p-3 border">1) Fundamentals of Public Finance<br/>2) Urban Economics</td></tr>
              <tr><td className="p-3 border font-semibold">OE (Any One)</td><td className="p-3 border">1) Criminal Justice System<br/>2) Principles of Business Obligations</td><td className="p-3 border">1) Criminal Justice System<br/>2) Principles of Corporate Governance</td></tr>
              <tr><td className="p-3 border font-semibold">VSC</td><td className="p-3 border">Financial Mathematics</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">SEC (Any One)</td><td className="p-3 border">-</td><td className="p-3 border">Computer Applications in Business / Operation Research</td></tr>
              <tr><td className="p-3 border font-semibold">AEC</td><td className="p-3 border">Hindi / Marathi / Sanskrit Basics</td><td className="p-3 border">Applied Hindi / Marathi / Sanskrit Proficiency</td></tr>
              <tr><td className="p-3 border font-semibold">FP/ CEP</td><td className="p-3 border">Field Project I</td><td className="p-3 border">Community Engagement Project I</td></tr>
              <tr><td className="p-3 border font-semibold">CC</td><td className="p-3 border">Co-curricular Course III</td><td className="p-3 border">Co-curricular Course IV</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Third Year */}
      <div>
        <h4 className="font-bold text-[#D4A017] mb-4 bg-[#FFF8E7] px-4 py-2 rounded-lg">Third Year (Semester V & VI)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F8FAFC] text-[#123B6D]">
              <tr>
                <th className="p-3 border">Vertical</th>
                <th className="p-3 border">Semester V</th>
                <th className="p-3 border">Semester VI</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Financial Accounting - I<br/>Introduction to Cost Accounting<br/>Marketing Management</td><td className="p-3 border">Financial Accounting - II<br/>Elements of Cost<br/>Human Resource Management</td></tr>
              <tr><td className="p-3 border font-semibold">Major Elective</td><td className="p-3 border">Export Marketing<br/>Direct & Indirect Taxation - I</td><td className="p-3 border">Indian Financial System<br/>Direct & Indirect Taxation - II</td></tr>
              <tr><td className="p-3 border font-semibold">Minor Elective</td><td className="p-3 border">Indian Economy<br/>Economics of Money and Banking</td><td className="p-3 border">International Economics<br/>Economics of Sustainable Development</td></tr>
              <tr><td className="p-3 border font-semibold">VSC</td><td className="p-3 border">Research Methodology - A Statistical Approach</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">FP</td><td className="p-3 border">Field Project II</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">OJT</td><td className="p-3 border">-</td><td className="p-3 border">On the Job Training</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <BComPageClient syllabusContent={syllabus} />;
}
