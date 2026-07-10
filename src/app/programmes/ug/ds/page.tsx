import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BSc Data Science | MCC Digital Experience Platform',
  description: 'Bachelor of Science in Data Science at Mulund College of Commerce.',
};

import DSPageClient from './DSPageClient';

export default function DSPage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Program Structure: B. Sc. (Data Science) (As per NEP 2020)</h3>

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
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Python for Data Science</td><td className="p-3 border">R-Programming</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Web Technologies</td><td className="p-3 border">Database Management Systems</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Descriptive Statistics</td><td className="p-3 border">Probability and Distributions</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Precalculus</td><td className="p-3 border">Calculus</td></tr>
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
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Data Structures and Algorithms</td><td className="p-3 border">AI and ML</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Data Warehousing</td><td className="p-3 border">Big Data</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Testing of Hypothesis</td><td className="p-3 border">Data Mining</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Discrete Mathematics</td><td className="p-3 border">Linear Algebra</td></tr>
              <tr><td className="p-3 border font-semibold">GE/OE (Choose any one)</td><td className="p-3 border">Advanced Tally<br/>Personal Finance Management</td><td className="p-3 border">E-commerce & Digital Marketing<br/>IT Returns Filing</td></tr>
              <tr><td className="p-3 border font-semibold">SEC (Choose any one)</td><td className="p-3 border">Programming with PL/SQL<br/>Scala</td><td className="p-3 border">Numerical Methods<br/>Introduction to Robotic Process Automation</td></tr>
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
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Data Engineering</td><td className="p-3 border">Deep Learning</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Data Visualisation</td><td className="p-3 border">Exploratory Data Analysis</td></tr>
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Generative AI</td><td className="p-3 border">Sports Analytics</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Choose any one)</td><td className="p-3 border">Marketing and Retail Analytics</td><td className="p-3 border">Healthcare Analytics<br/>Data Governance</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Computer Vision</td><td className="p-3 border">Internet of Things</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Campus to Corporate</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">VSEC (Choose any one)</td><td className="p-3 border">Social Media Analytics<br/>Information Retrieval</td><td className="p-3 border">Applied Business Analytics<br/>Business Forecasting</td></tr>
              <tr><td className="p-3 border font-semibold">RP / OJT</td><td className="p-3 border">Project / OJT</td><td className="p-3 border">CAPSTONE Project</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <DSPageClient syllabusContent={syllabus} />;
}
