"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

export default function MSFPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'Graduate with 50% min & Math at HSC or UG first year.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '2 Years, 4 Semesters (104 Credits).' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: 'Weekdays: 6pm-9pm | Sat: 5pm-9pm | Sun: 8am-1pm.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '30 Seats.' }
  ];

  return (
    <CourseTemplate
      introductionContent={
        <>
          <p className="mb-4">
            <strong>M.Sc. Finance</strong> is an appropriate program for students who want to be financial maestros. The program covers econometrics tools to be utilized in the financial domain along with Financial Modelling, Corporate & International Finance.
          </p>
          <p className="mb-4">
            This course will help learners to acquire good job opportunities in the field of Finance. This program is similar to that offered by the University of Mumbai since 2013. As and when the University of Mumbai plans for the progression of this program for higher studies, the same shall be applicable.
          </p>
          <p className="mb-4">
            The curriculum integrates theoretical concepts with practical applications, preparing students for high-level roles in the financial sector, and covers subjects like financial markets, portfolio management, derivatives, econometrics, financial modeling, corporate valuation, and international finance.
          </p>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Eligibility Criteria</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">The candidate should be a graduate in any faculty having scored a minimum of <strong>50% marks</strong>.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">Should have opted for <strong>Mathematics at higher secondary or higher level or in the first year</strong> of the undergraduate program.</span>
            </li>
          </ul>
          
          <div className="bg-[#FFF8E7] border border-[#D4A017]/30 rounded-xl p-4 text-sm text-gray-700 mb-6">
            <strong className="text-[#D4A017]">Program Timing:</strong> Week Days: 6:00 pm to 9:00 pm / Saturday: 5:00 pm – 9:00 pm / Sunday Morning: 8:00 am - 1:00 pm. (Provisional admissions, if given, will be confirmed after fulfillment of eligibility.)
          </div>
        </>
      }
      title="Master of Science (Finance)"
      description="A specialized postgraduate program covering econometrics, financial modelling, corporate finance, and derivatives for aspiring financial professionals."
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
    />
  );
}
