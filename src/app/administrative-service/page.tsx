'use client';

import React, { useState } from 'react';
import {
  Users, ChevronRight, GraduationCap, BookOpen,
  Train, FileText, ArrowRightLeft, Globe, Shield,
  CheckCircle2, Copy, Award, Stamp, Building2, LogOut
} from 'lucide-react';

const grantsInAidStaff: { sr: number; name: string; designation: string }[] = [];
const selfFinanceStaff: { sr: number; name: string; designation: string }[] = [];

const degreeServices = [
  {
    icon: Train,
    label: 'Railway Concession',
    desc: 'Local train season pass concession for Degree college students travelling to and from college.',
  },
  {
    icon: FileText,
    label: 'Bonafide Certificate',
    desc: 'Proof of enrollment at Mulund College of Commerce for bank accounts, visa, etc.',
  },
  {
    icon: ArrowRightLeft,
    label: 'Transfer Certificate',
    desc: 'For progression to other Higher Educational Institution (HEI) of University of Mumbai.',
  },
  {
    icon: Globe,
    label: 'Migration Certificate',
    desc: 'For progression to another University outside University of Mumbai.',
  },
  {
    icon: FileText,
    label: 'Transcript',
    desc: 'Official transcript for Foreign Universities or Employment purposes.',
  },
  {
    icon: Shield,
    label: 'Character Certificate',
    desc: 'Certificate attesting good character and conduct. Required for Government Employments.',
  },
  {
    icon: CheckCircle2,
    label: 'Marksheet Verification',
    desc: 'Official verification of mark sheets issued by the college for employers or institutions.',
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

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">

            {/* Grants-in-Aid Section */}
            <div>
              <div className="px-6 py-4 bg-[#123B6D]/5 border-b border-[#E2E8F0]">
                <h3 className="font-bold text-[#123B6D] text-xs uppercase tracking-widest">Grants-in-Aid Section</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-[#E2E8F0]">
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">Sr. No.</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Designation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {grantsInAidStaff.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-5 py-6 text-center text-sm text-gray-400 italic">
                          Staff details will be updated soon.
                        </td>
                      </tr>
                    ) : (
                      grantsInAidStaff.map((row) => (
                        <tr key={row.sr} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3.5 text-gray-600">{row.sr}</td>
                          <td className="px-5 py-3.5 font-medium text-[#1E293B]">{row.name}</td>
                          <td className="px-5 py-3.5 text-gray-600">{row.designation}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Self-Finance Section */}
            <div>
              <div className="px-6 py-4 bg-[#D4A017]/5 border-b border-[#E2E8F0]">
                <h3 className="font-bold text-[#D4A017] text-xs uppercase tracking-widest">Self-Finance Section</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-[#E2E8F0]">
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">Sr. No.</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Designation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {selfFinanceStaff.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-5 py-6 text-center text-sm text-gray-400 italic">
                          Staff details will be updated soon.
                        </td>
                      </tr>
                    ) : (
                      selfFinanceStaff.map((row) => (
                        <tr key={row.sr} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3.5 text-gray-600">{row.sr}</td>
                          <td className="px-5 py-3.5 font-medium text-[#1E293B]">{row.name}</td>
                          <td className="px-5 py-3.5 text-gray-600">{row.designation}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
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
                  <div
                    key={i}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#123B6D]/5 flex items-center justify-center mb-4 group-hover:bg-[#123B6D]/10 transition-colors">
                      <svc.icon size={22} className="text-[#123B6D]" />
                    </div>
                    <h3 className="font-bold text-[#1E293B] text-sm mb-2 leading-snug">{svc.label}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{svc.desc}</p>
                    <button className="w-full py-2 rounded-lg bg-[#123B6D] text-white text-xs font-semibold hover:bg-[#0d2d54] transition-all flex items-center justify-center gap-1.5">
                      Apply <ChevronRight size={13} />
                    </button>
                  </div>
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
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#D4A017]/5 flex items-center justify-center mb-4 group-hover:bg-[#D4A017]/10 transition-colors">
                      <svc.icon size={22} className="text-[#D4A017]" />
                    </div>
                    <h3 className="font-bold text-[#1E293B] text-sm mb-2 leading-snug">{svc.label}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{svc.desc}</p>
                    <button className="w-full py-2 rounded-lg bg-[#D4A017] text-white text-xs font-semibold hover:bg-[#b8891a] transition-all flex items-center justify-center gap-1.5">
                      Apply <ChevronRight size={13} />
                    </button>
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
