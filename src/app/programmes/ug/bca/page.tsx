import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BSc Computer Applications | MCC Digital Experience Platform',
  description: 'Bachelor of Science in Computer Applications (BSc CA) at Mulund College of Commerce.',
};

import BCAPageClient from './BCAPageClient';

export default function BCAPage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Program Structure: Bachelor of Science (Computer Applications) (As per NEP 2020)</h3>

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
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Fundamentals of Computers</td><td className="p-3 border">Object Oriented Programming with C++</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Imperative Programming</td><td className="p-3 border">Database Management Systems</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Web Technologies</td><td className="p-3 border">Computer Graphics</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Basic Mathematics</td><td className="p-3 border">Calculus</td></tr>
              <tr><td className="p-3 border font-semibold">GE/OE (Choose any one)</td><td className="p-3 border">Essentials of Management<br/>Group Dynamics and Leadership Skills</td><td className="p-3 border">Principles of Accounting<br/>Economics</td></tr>
              <tr><td className="p-3 border font-semibold">GE/OE (Choose any one)</td><td className="p-3 border">-</td><td className="p-3 border">Practical Accounting<br/>Economic Modelling</td></tr>
              <tr><td className="p-3 border font-semibold">AEC</td><td className="p-3 border">Enhancing Soft Skills</td><td className="p-3 border">English Technical Writing Skills</td></tr>
              <tr><td className="p-3 border font-semibold">VEC</td><td className="p-3 border">Green Computing</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">IKS</td><td className="p-3 border">-</td><td className="p-3 border">Fundamentals of Indian Knowledge System</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Second Year */}
      <div className="bg-[#F0F4FF] border border-[#3B82F6]/20 rounded-xl p-4 text-sm text-[#1E293B]">
        <p className="font-semibold text-[#123B6D] mb-1">Second Year (Semester III & IV)</p>
        <p className="text-gray-600">Detailed syllabus for Semester III & IV will be updated shortly.</p>
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
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">C#.NET and ASP.NET Core</td><td className="p-3 border">Enterprise Java</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">AI and ML</td><td className="p-3 border">Human Computer Interaction</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">MERN</td><td className="p-3 border">Cloud Computing Fundamentals</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Choose any one)</td><td className="p-3 border">Ethical Hacking</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Internet of Things</td><td className="p-3 border">Data Science Fundamentals</td></tr>
              <tr><td className="p-3 border font-semibold">VSEC (Choose any one)</td><td className="p-3 border">Linux Administration<br/>Generative AI</td><td className="p-3 border">IT Service Management<br/>Cyber Laws and Patents</td></tr>
              <tr><td className="p-3 border font-semibold">VSEC (Choose any one)</td><td className="p-3 border">-</td><td className="p-3 border">Introduction to Robotic Process Automation<br/>Mobile App Development Practical</td></tr>
              <tr><td className="p-3 border font-semibold">RP / OJT</td><td className="p-3 border">Project / OJT</td><td className="p-3 border">CAPSTONE Project</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <BCAPageClient syllabusContent={syllabus} />;
}
