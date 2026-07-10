import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BSc IT | MCC Digital Experience Platform',
  description: 'Bachelor of Science in Information Technology (BSc IT) at Mulund College of Commerce.',
};

import BScITPageClient from './BScITPageClient';

export default function BScITPage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Program Structure: B. Sc. (Information Technology) (As per NEP 2020)</h3>

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
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Imperative Programming</td><td className="p-3 border">Object Oriented Programming with C++</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Web Technologies</td><td className="p-3 border">Database Management Systems</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Digital Electronics</td><td className="p-3 border">Microprocessors</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Numerical Methods</td><td className="p-3 border">Discrete Mathematics</td></tr>
              <tr><td className="p-3 border font-semibold">GE/OE (Choose any one)</td><td className="p-3 border">Essentials of Management<br/>Group Dynamics & Leadership Skills</td><td className="p-3 border">Principles of Accounting<br/>Economics</td></tr>
              <tr><td className="p-3 border font-semibold">GE/OE (Choose any one)</td><td className="p-3 border">-</td><td className="p-3 border">Practical Accounting<br/>Economic Modelling</td></tr>
              <tr><td className="p-3 border font-semibold">AEC</td><td className="p-3 border">Enhancing Soft Skills</td><td className="p-3 border">English Technical Writing Skills</td></tr>
              <tr><td className="p-3 border font-semibold">VEC</td><td className="p-3 border">Green Computing</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">IKS</td><td className="p-3 border">-</td><td className="p-3 border">Fundamentals of Indian Knowledge System</td></tr>
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
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Python Programming</td><td className="p-3 border">Full Stack Development with Java</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Operating Systems</td><td className="p-3 border">Data Structures and Algorithms</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Computer Networks</td><td className="p-3 border">Agile Scrum</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Statistical Techniques</td><td className="p-3 border">Applied Mathematics and MAD Practical</td></tr>
              <tr><td className="p-3 border font-semibold">GE/OE (Choose any one)</td><td className="p-3 border">Advanced Tally<br/>Personal Finance Management</td><td className="p-3 border">E-commerce & Digital Marketing<br/>Start-Up & Entrepreneurship Skills<br/>IT Returns Filing</td></tr>
              <tr><td className="p-3 border font-semibold">SEC</td><td className="p-3 border">C#.NET Core</td><td className="p-3 border">Graphics Primitives</td></tr>
              <tr><td className="p-3 border font-semibold">AEC (Choose any one)</td><td className="p-3 border">Hindi Lekhan Kaushal<br/>Marathi Lekhan Kaushalya<br/>Sanskrit Parichayah</td><td className="p-3 border">Vyavaharik Hindi Lekhan, Batcheet aur Prastuti<br/>Vyavaharik va Upayojik Marathi Lekhan, Sambhashan va Sadarikaran<br/>Sanskrit Proficiency Course</td></tr>
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
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">DevOps</td><td className="p-3 border">Computer Security</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">ASP. NET Core</td><td className="p-3 border">Business Intelligence</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">-</td><td className="p-3 border">Advanced Mobile Programming Practical</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Choose any one)</td><td className="p-3 border">Big Data and NOSQL<br/>Enterprise Java</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">Minor (Choose any one)</td><td className="p-3 border">Internet of Things</td><td className="p-3 border">Principles of GIS<br/>Cloud Computing Fundamentals</td></tr>
              <tr><td className="p-3 border font-semibold">Minor (Choose any one)</td><td className="p-3 border">-</td><td className="p-3 border">IT Service Management<br/>Cyber Laws and Patents</td></tr>
              <tr><td className="p-3 border font-semibold">VSEC (Choose any one)</td><td className="p-3 border">Artificial Intelligence<br/>Virtual Reality & Augmented Reality</td><td className="p-3 border">EARN<br/>Linux Administration</td></tr>
              <tr><td className="p-3 border font-semibold">RP / OJT</td><td className="p-3 border">OJT / Project</td><td className="p-3 border">CAPSTONE Project</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <BScITPageClient syllabusContent={syllabus} />;
}
