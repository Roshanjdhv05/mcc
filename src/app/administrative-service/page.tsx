'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users, ChevronRight, GraduationCap, BookOpen,
  Train, FileText, ArrowRightLeft, Globe, Shield,
  CheckCircle2, Copy, Award, Stamp, Building2, LogOut, ChevronDown, ChevronUp
} from 'lucide-react';

const grantsInAidStaff = [
  { sr: 1, name: 'Ms. Sneha. R. Dewaney', designation: 'Junior Stenographer' },
  { sr: 2, name: 'Mr. Devendra. J. Rajput', designation: 'Head Clerk' },
  { sr: 3, name: 'Ms. Shraddha P.Salunke', designation: 'Senior Clerk' },
  { sr: 4, name: 'Mr. Amey P. Ranade', designation: 'Assistant Librarian' },
  { sr: 5, name: 'Mr. Rakesh M. Gosavi', designation: 'Junior Clerk' },
  { sr: 6, name: 'Ms. Pranjali R.Chaini', designation: 'Library Clerk' },
  { sr: 7, name: 'Ms. Ulka P. Gore', designation: 'Junior Clerk' },
  { sr: 8, name: 'Mr. Hansraj Rathod', designation: 'Junior Clerk' },
  { sr: 9, name: 'Mr. Mahesh Kharat', designation: 'Library Clerk' },
  { sr: 10, name: 'Ms. Nirmala Bhalerao', designation: 'Library Clerk' },
  { sr: 11, name: 'Mr. Sandeep Dhawle', designation: 'Junior Clerk' },
  { sr: 12, name: 'Ms. Rohini Asawale', designation: 'Junior Clerk' },
  { sr: 13, name: 'Mr. Ghanshyam.G. Patil', designation: 'Library Attendant' },
  { sr: 14, name: 'Mr. Satish. A. Narkhede', designation: 'Library Attendant' },
  { sr: 15, name: 'Mr. Vijaysingh T. Patil', designation: 'Library Attendant' },
  { sr: 16, name: 'Mr. Rakesh Shitole', designation: 'Library Attendant' },
  { sr: 17, name: 'Mr. Dipak B. Chaugule', designation: 'Library Attendant' },
  { sr: 18, name: 'Mr. Sachin S. Kamble', designation: 'Library Attendant' },
  { sr: 19, name: 'Ms. Suvarna K.Bhangare', designation: 'Library Attendant' }
];

const selfFinanceStaff = [
  { sr: 1, name: 'Ms. Nisha Nilesh Uttekar', designation: 'Office Incharge' },
  { sr: 2, name: 'Ms. Rashmi Anant Kalwankar', designation: 'Jr. Clerk' },
  { sr: 3, name: 'Ms. Hemangi Pradeep Vaity', designation: 'Jr. Clerk' },
  { sr: 4, name: 'Mr. Vinay Vishnu Satpurkar', designation: 'Jr. Clerk (Lib.)' },
  { sr: 5, name: 'Mr. Shamkumar Sasidharan Pil', designation: 'Lab Assistant' },
  { sr: 6, name: 'Mr. Vinod Barku Dhotre', designation: 'Computer Lab Serviceman' },
  { sr: 7, name: 'Mr.Prashant Dattatray Kamble', designation: 'Jr. Clerk (Lib.)' },
  { sr: 8, name: 'Mr. Yash Ramesh Patil', designation: 'Jr. Clerk' },
  { sr: 9, name: 'Ms.Kiran Amit Mhatre', designation: 'Jr. Clerk' },
  { sr: 10, name: 'Ms. Prachi Vivek Mulye', designation: 'Jr. Clerk' },
  { sr: 11, name: 'Ms. Dhanashree P. Bhosale', designation: 'Jr. Clerk' },
  { sr: 12, name: 'Ms. Swati Ramesh Godse', designation: 'Jr. Clerk' },
  { sr: 13, name: 'Mr. Yogesh Shivaji Parte', designation: 'Lab Assistant' },
  { sr: 14, name: 'Mr. Sujit Sunil Umaratkar', designation: 'Lab Assistant' },
  { sr: 15, name: 'Mr. Devendra Ganpat Raut', designation: 'Lab Assistant' }
];

const supportStaff = [
  { sr: 1, name: 'Mr. Dilip. P. Anjara', section: 'Grants-in-aid' },
  { sr: 2, name: 'Mr. Jyotirao R. Kadam', section: 'Grants-in-aid' },
  { sr: 3, name: 'Mr. Dhanji. P. Chawada', section: 'Grants-in-aid' },
  { sr: 4, name: 'Mr. Komal. M. Rathod', section: 'Grants-in-aid' },
  { sr: 5, name: 'Mr. Dinesh Rathod', section: 'Grants-in-aid' },
  { sr: 6, name: 'Mr. Sunil C. Chougule', section: 'Grants-in-aid' },
  { sr: 7, name: 'Mr. Sunny Kamble', section: 'Grants-in-aid' },
  { sr: 8, name: 'Mr. Mohnish P Navrat', section: 'Grants-in-aid' },
  { sr: 9, name: 'Mr. Abhijit Pawar', section: 'Grants-in-aid' },
  { sr: 10, name: 'Ms. Priyanka P.Thore', section: 'Grants-in-aid' },
  { sr: 11, name: 'Mr. Rajesh Dattu Jadhav', section: 'Self-Finance' },
  { sr: 12, name: 'Mrs. Jyoti Prashant Sajurkar', section: 'Self-Finance' },
  { sr: 13, name: 'Mr. Maruti Pandurang Sawant', section: 'Self-Finance' },
  { sr: 14, name: 'Mr. Santosh Ramchandra Shinde', section: 'Self-Finance' },
  { sr: 15, name: 'Mr. Nilesh Govind Moyanak', section: 'Self-Finance' },
  { sr: 16, name: 'Mr. Vipul Siddhartha Salve', section: 'Self-Finance' },
  { sr: 17, name: 'Mr. Sanjay Pandurang Dandkar', section: 'Self-Finance' },
  { sr: 18, name: 'Mr. Dhanaji Mohan Kadam', section: 'Self-Finance' },
  { sr: 19, name: 'Mr. Mahesh Mohansingh Rajput', section: 'Self-Finance' },
  { sr: 20, name: 'Mr. Hiralal Mohan Gohil', section: 'Self-Finance' },
  { sr: 21, name: 'Mr. Dinesh Shriram Bharade', section: 'Self-Finance' }
];

const degreeServices = [
  {
    icon: Train,
    label: 'Railway Concession',
    desc: 'Local train season pass concession for Degree college students travelling to and from college.',
    href: '/forms',
  },
  {
    icon: FileText,
    label: 'Bonafide Certificate',
    desc: 'Proof of enrollment at Mulund College of Commerce for bank accounts, visa, etc.',
    href: '/forms/bonafide-certificate',
  },
  {
    icon: ArrowRightLeft,
    label: 'Transfer Certificate',
    desc: 'For progression to other Higher Educational Institution (HEI) of University of Mumbai.',
    href: '/forms/transfer-certificate',
  },
  {
    icon: Globe,
    label: 'Migration Certificate',
    desc: 'For progression to another University outside University of Mumbai.',
    href: '/forms/migration-certificate',
  },
  {
    icon: FileText,
    label: 'Transcript',
    desc: 'Official transcript for Foreign Universities or Employment purposes.',
    href: '/forms/transcript-certificate',
  },
  {
    icon: Shield,
    label: 'Character Certificate',
    desc: 'Certificate attesting good character and conduct. Required for Government Employments.',
    href: '/forms/character-certificate',
  },
  {
    icon: CheckCircle2,
    label: 'Marksheet Verification',
    desc: 'Official verification of mark sheets issued by the college for employers or institutions.',
    href: '/forms/marksheet-verification',
  },
  {
    icon: Stamp,
    label: 'Caste Validity Verification',
    desc: 'Verification of caste certificate validity as required by government norms.',
    href: '/forms/caste-validity',
  },
  {
    icon: Award,
    label: 'Scholarship & Free-ship',
    desc: 'Apply for government and institutional scholarship and free-ship schemes.',
    href: '/forms',
  },
  {
    icon: Copy,
    label: 'Duplicate Marksheet',
    desc: 'Request a duplicate mark sheet in case of loss or damage of the original.',
    href: '/forms/duplicate-marksheet',
  },
];

const juniorCollegeServices = [
  {
    icon: Train,
    label: 'Railway Concession',
    desc: 'Local train season pass concession for Junior college students travelling to and from college.',
  },
  {
    icon: LogOut,
    label: 'Leaving Certificate',
    desc: 'Issued on departure from Junior College. Required for admission to other institutions.',
  },
  {
    icon: FileText,
    label: 'Bonafide Certificate',
    desc: 'Proof of enrollment at the Junior College for various official purposes.',
  },
  {
    icon: Globe,
    label: 'Migration Certificate',
    desc: 'For students migrating to another Board or institution.',
  },
  {
    icon: Stamp,
    label: 'Caste Validity Verification',
    desc: 'Verification of caste certificate validity as required by government norms.',
  },
  {
    icon: Award,
    label: 'Scholarship & Free-ship',
    desc: 'Apply for government and institutional scholarship and free-ship schemes.',
  },
  {
    icon: Copy,
    label: 'Duplicate Marksheet',
    desc: 'Request a duplicate mark sheet in case of loss or damage of the original.',
  },
];

export default function AdministrativeServicesPage() {
  const [activeTab, setActiveTab] = useState<'degree' | 'junior'>('degree');
  const [expandedStaff, setExpandedStaff] = useState<string | null>(null);

  const toggleStaff = (section: string) => {
    setExpandedStaff(expandedStaff === section ? null : section);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">

      {/* PAGE HEADER */}
      <div className="bg-[#123B6D] pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <span className="text-white/60 text-sm font-medium uppercase tracking-widest">College Office</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)] mb-2">
            Administrative Services
          </h1>
          <p className="text-white/60 max-w-2xl">
            Certificates, verifications and official documents issued by the college office for Degree and Junior College students.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-10 pb-16 space-y-10">

        {/* ── STAFF TABLE ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <Users size={20} className="text-[#123B6D]" />
            <h2 className="text-lg font-bold text-[#123B6D] font-[var(--font-heading)]">Staff</h2>
          </div>

          <div className="flex flex-col">
            {/* Grants-in-Aid Section */}
            <div className="border-b border-[#E2E8F0]">
              <button
                onClick={() => toggleStaff('grants')}
                className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <h3 className="font-bold text-[#123B6D] text-sm uppercase tracking-widest">1] Non Teaching - Grants-in-Aid</h3>
                {expandedStaff === 'grants' ? (
                  <ChevronUp size={20} className="text-[#123B6D]" />
                ) : (
                  <ChevronDown size={20} className="text-[#123B6D]" />
                )}
              </button>
              {expandedStaff === 'grants' && (
                <div className="overflow-x-auto p-6 pt-0 bg-white">
                  <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-[#E2E8F0]">
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">Sr. No.</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name of the Employee</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Designation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0]">
                        {grantsInAidStaff.map((row) => (
                          <tr key={row.sr} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-3.5 text-gray-600">{row.sr}</td>
                            <td className="px-5 py-3.5 font-medium text-[#1E293B]">{row.name}</td>
                            <td className="px-5 py-3.5 text-gray-600">{row.designation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Self-Finance Section */}
            <div className="border-b border-[#E2E8F0]">
              <button
                onClick={() => toggleStaff('sfc')}
                className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <h3 className="font-bold text-[#D4A017] text-sm uppercase tracking-widest">2] Non Teaching - Self Finance</h3>
                {expandedStaff === 'sfc' ? (
                  <ChevronUp size={20} className="text-[#D4A017]" />
                ) : (
                  <ChevronDown size={20} className="text-[#D4A017]" />
                )}
              </button>
              {expandedStaff === 'sfc' && (
                <div className="overflow-x-auto p-6 pt-0 bg-white">
                  <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-[#E2E8F0]">
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">Sr. No.</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name of the Employee</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Designation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0]">
                        {selfFinanceStaff.map((row) => (
                          <tr key={row.sr} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-3.5 text-gray-600">{row.sr}</td>
                            <td className="px-5 py-3.5 font-medium text-[#1E293B]">{row.name}</td>
                            <td className="px-5 py-3.5 text-gray-600">{row.designation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Support Staff Section */}
            <div>
              <button
                onClick={() => toggleStaff('support')}
                className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <h3 className="font-bold text-emerald-700 text-sm uppercase tracking-widest">3] Support Staff</h3>
                {expandedStaff === 'support' ? (
                  <ChevronUp size={20} className="text-emerald-700" />
                ) : (
                  <ChevronDown size={20} className="text-emerald-700" />
                )}
              </button>
              {expandedStaff === 'support' && (
                <div className="overflow-x-auto p-6 pt-0 bg-white">
                  <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-[#E2E8F0]">
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">Sr. No.</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name of the Employee</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Section</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0]">
                        {supportStaff.map((row) => (
                          <tr key={row.sr} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-3.5 text-gray-600">{row.sr}</td>
                            <td className="px-5 py-3.5 font-medium text-[#1E293B]">{row.name}</td>
                            <td className="px-5 py-3.5 text-gray-600">{row.section}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ── SERVICES ── */}
        <div>
          {/* Tab Toggle */}
          <div className="flex items-center gap-3 mb-7">
            <button
              onClick={() => setActiveTab('degree')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'degree'
                  ? 'bg-[#123B6D] text-white shadow-md shadow-[#123B6D]/20'
                  : 'bg-white border border-[#E2E8F0] text-gray-600 hover:border-[#123B6D]/40 hover:text-[#123B6D]'
              }`}
            >
              <GraduationCap size={18} />
              Degree College
            </button>
            <button
              onClick={() => setActiveTab('junior')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'junior'
                  ? 'bg-[#D4A017] text-white shadow-md shadow-[#D4A017]/20'
                  : 'bg-white border border-[#E2E8F0] text-gray-600 hover:border-[#D4A017]/40 hover:text-[#D4A017]'
              }`}
            >
              <BookOpen size={18} />
              Junior College
            </button>
          </div>

          {/* Degree College */}
          {activeTab === 'degree' && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#123B6D] flex items-center justify-center">
                  <GraduationCap size={18} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)]">Degree College</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {degreeServices.map((svc, i) => (
                  <Link
                    key={i}
                    href={svc.href}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#123B6D]/5 flex items-center justify-center mb-4 group-hover:bg-[#123B6D]/10 transition-colors">
                      <svc.icon size={22} className="text-[#123B6D]" />
                    </div>
                    <h3 className="font-bold text-[#1E293B] text-sm mb-2 leading-snug">{svc.label}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{svc.desc}</p>
                    <div className="w-full py-2 rounded-lg bg-[#123B6D] text-white text-xs font-semibold group-hover:bg-[#0d2d54] transition-all flex items-center justify-center gap-1.5 mt-auto">
                      Apply <ChevronRight size={13} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Junior College */}
          {activeTab === 'junior' && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#D4A017] flex items-center justify-center">
                  <BookOpen size={18} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#D4A017] font-[var(--font-heading)]">Junior College</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {juniorCollegeServices.map((svc, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#D4A017]/5 flex items-center justify-center mb-4 group-hover:bg-[#D4A017]/10 transition-colors">
                      <svc.icon size={22} className="text-[#D4A017]" />
                    </div>
                    <h3 className="font-bold text-[#1E293B] text-sm mb-2 leading-snug">{svc.label}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{svc.desc}</p>
                    <div className="w-full py-2 rounded-lg bg-[#D4A017] text-white text-xs font-semibold hover:bg-[#b8891a] transition-all flex items-center justify-center gap-1.5 mt-auto">
                      Apply <ChevronRight size={13} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
