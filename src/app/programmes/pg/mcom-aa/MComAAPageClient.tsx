"use client";

import PGCourseTemplate from '@/components/layout/PGCourseTemplate';

import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const coordinators = [
  {
    name: 'Mr. Nikhil Karkhanis',
    designation: <span className="flex flex-col"><span>Coordinator, M.Com</span> <span>(Advanced Accountancy)</span></span>,
    education: 'M.Com, Ph.D.',
    email: '',
  },
];

export default function MComAAPageClient() {


  return (
    <PGCourseTemplate
      title="Master of Commerce (Advanced Accountancy)"
      fundingType="Self Financing"
      seats="80"
      timing="05:30 PM – 08:30 PM"
      coordinators={coordinators}

      syllabusContent={<SyllabusRenderer programKey="MCOM_AA" />}
      introductionContent={
        <>
          <p className="mb-4">The Master of Commerce (M.Com) in Advanced Accountancy is a specialized postgraduate program designed to provide students with an advanced and rigorous understanding of accounting principles, financial management, and corporate taxation. This program focuses on developing a high level of expertise in analyzing complex financial data and making strategic financial decisions.</p>
          <p className="mb-4">The curriculum includes advanced subjects such as advanced financial accounting, strategic cost accounting, direct and indirect taxes, business valuation, and corporate financial reporting. It aims to equip students with critical analytical skills and a deep understanding of the regulatory frameworks that govern the accounting profession.</p>
          <p className="mb-4">Graduates of the M.Com (Advanced Accountancy) program have promising career prospects in areas like auditing, taxation, financial consulting, corporate finance, and investment banking. It also serves as an excellent foundation for pursuing further professional qualifications such as Chartered Accountancy (CA), Cost and Management Accountancy (CMA), and Certified Public Accountant (CPA).</p>
          <p className="mb-4">This program is ideal for students who have a strong aptitude for numbers and a keen interest in pursuing a successful career in the accounting and finance sectors.</p>
        </>
      }
    />
  );
}

