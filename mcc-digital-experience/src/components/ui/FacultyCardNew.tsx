"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Target, Building2, Star, UserCircle } from 'lucide-react';
import { FacultyMember } from '@/lib/newFacultyData';

interface FacultyCardNewProps {
  member: FacultyMember;
}

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function FacultyCardNew({ member }: FacultyCardNewProps) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = member.image || `/Degree College Teachers/${member.name}.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl p-6 flex flex-col md:flex-row gap-6 border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-shadow duration-300 w-full max-w-4xl mx-auto"
    >
      {/* LEFT COLUMN */}
      <div className="flex flex-col items-center md:w-[38%] shrink-0 relative">
        {/* Logo */}
        <div className="absolute -top-2 -left-2 w-14 h-14">
          <img src="/mcclogo.png" alt="MCC Logo" className="w-full h-full object-contain" />
        </div>

        {/* Profile Image with Animated Arc */}
        <div className="relative mt-12 mb-5 w-36 h-36 md:w-40 md:h-40 flex items-center justify-center">
          <svg className="absolute w-[115%] h-[115%] -top-[7.5%] -left-[7.5%] drop-shadow-[0_0_8px_rgba(212,160,23,0.5)]" viewBox="0 0 100 100" overflow="visible">
            <motion.path
              d="M 50,5 A 45,45 0 1,1 5,50"
              fill="none"
              stroke="#D4A017"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.circle cx="50" cy="5" r="3" fill="#D4A017"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.3 }}
            />
            <motion.circle cx="5" cy="50" r="3" fill="#D4A017"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.3 }}
            />
          </svg>
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 z-10 flex items-center justify-center shadow-inner border-4 border-white">
            {imgError ? (
              <UserCircle size={64} className="text-slate-300" />
            ) : (
              <img
                src={imageSrc}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>

        {/* Name & Designation */}
        <div className="text-center w-full mb-5">
          <h2 className="text-[#123B6D] text-xl font-bold leading-tight mb-2">{member.name}</h2>
          <div className="overflow-hidden h-6 flex justify-center">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[#D4A017] text-xs font-bold tracking-widest uppercase"
            >
              {member.designation}
            </motion.p>
          </div>
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mx-auto mt-2" />
        </div>

        {/* Pills */}
        <div className="w-full flex flex-col gap-3">
          {member.department && (
            <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-2xl p-3 border border-[#E2E8F0] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#123B6D] flex items-center justify-center shrink-0">
                <Building2 size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">Department</span>
                <span className="text-[#123B6D] font-bold text-sm">{member.department}</span>
              </div>
            </div>
          )}

          {member.role && member.role !== '—' && (
            <div className="flex items-center gap-3 bg-[#FFF8E7] rounded-2xl p-3 border border-[#FBE3B2] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#D4A017] flex items-center justify-center shrink-0">
                <Star size={18} className="text-white fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#B48512] font-medium">Role</span>
                <span className="text-[#123B6D] font-bold text-sm">{member.role}</span>
              </div>
            </div>
          )}

          {/* LinkedIn clickable icon pill - LEFT COLUMN only if no linkedin */}
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-[#E2E8F0] to-transparent mx-1" />

      {/* RIGHT COLUMN */}
      <div className="flex-1 flex flex-col justify-center space-y-0 pl-0 md:pl-2">
        {member.email && (
          <a
            href={`https://mail.google.com/mail/?view=cm&to=${member.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 py-4 border-b border-[#E2E8F0] w-full group cursor-pointer hover:bg-[#F0F9FF] rounded-xl px-2 -mx-2 transition-colors duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-[#F1F5F9] group-hover:bg-[#DBEAFE] flex items-center justify-center shrink-0 transition-colors duration-300 text-[#123B6D]">
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div className="flex flex-col pt-1 min-w-0 w-full">
              <span className="text-[13px] text-[#123B6D] font-bold tracking-wide mb-1">Email</span>
              <span className="text-sm text-[#3B82F6] group-hover:underline break-all leading-snug font-medium">
                {member.email}
              </span>
            </div>
          </a>
        )}
        <DetailRow icon={<GraduationCap size={20} />} title="Qualification" value={member.qualification} />
        <DetailRow icon={<Briefcase size={20} />} title="Teaching Experience" value={member.experience} />
        <DetailRow icon={<Target size={20} />} title="Research Interests" value={member.researchInterest} />
        {member.linkedin && (
          <a
            href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 py-4 border-b border-[#E2E8F0] last:border-b-0 w-full group cursor-pointer hover:bg-[#F0F9FF] rounded-xl px-2 -mx-2 transition-colors duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-[#0077b5] group-hover:bg-[#005f8e] flex items-center justify-center shrink-0 transition-colors duration-200">
              <LinkedinIcon size={18} />
            </div>
            <div className="flex flex-col pt-1">
              <span className="text-[13px] text-[#123B6D] font-bold tracking-wide mb-1">LinkedIn</span>
              <span className="text-sm text-[#3B82F6] group-hover:underline font-medium">View Profile →</span>
            </div>
          </a>
        )}
      </div>
    </motion.div>
  );
}

function DetailRow({ icon, title, value }: { icon: React.ReactNode; title: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-4 py-4 border-b border-[#E2E8F0] last:border-b-0 w-full group">
      <div className="w-12 h-12 rounded-full bg-[#F1F5F9] group-hover:bg-[#EBF3FF] flex items-center justify-center shrink-0 transition-colors duration-300 text-[#123B6D]">
        {icon}
      </div>
      <div className="flex flex-col pt-1 w-full min-w-0">
        <span className="text-[13px] text-[#123B6D] font-bold tracking-wide mb-1">{title}</span>
        <span className="text-sm text-gray-700 leading-snug font-medium break-words">{value}</span>
      </div>
    </div>
  );
}
