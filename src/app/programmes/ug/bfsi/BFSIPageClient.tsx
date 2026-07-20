"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

export default function BFSIPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: '10+2 from any recognised Board in any stream.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years (NEP 4 Years), 6/8 Semesters.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: 'Morning / Afternoon Batches.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'Contact College Administration.' }
  ];

  return (
    <CourseTemplate
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Commerce (B.Com) in Banking, Financial Services, and Insurance (BFSI) is a specialized undergraduate program designed to provide students with a strong foundation in the financial sector. This program focuses on the principles and practices of banking, investment, risk management, insurance, and financial services, equipping students with the necessary skills to excel in the dynamic world of finance.</p>
        <p className="mb-4">The curriculum covers essential subjects such as financial accounting, banking regulations, risk assessment, investment analysis, insurance laws, financial markets, and economic policies. It prepares students for careers in commercial banking, investment banking, insurance companies, financial consultancies, and regulatory bodies.</p>
        <p className="mb-4">With the increasing demand for skilled professionals in the financial sector, B.Com (BFSI) offers excellent career opportunities in banks, financial institutions, mutual funds, stock markets, and fintech companies. Graduates can also pursue further studies such as MBA in Finance, Chartered Financial Analyst (CFA), Certified Financial Planner (CFP), or professional banking and insurance certifications.</p>
        <p className="mb-4">This program is ideal for students who are interested in financial management, investment strategies, risk assessment, and the functioning of banking and insurance sectors.</p>
      </>
      }
      title="Bachelor of Commerce (Banking, Financial Services and Insurance)"
      description="A specialized undergraduate program focusing on banking, investment, risk management, insurance, and financial services."
      syllabusContent={<SyllabusRenderer programKey="BFSI" />}
      quickActionsData={quickActions}
    />
  );
}
