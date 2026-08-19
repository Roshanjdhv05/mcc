'use client';

import React from 'react';
import { ExternalLink, FileText, Phone, Mail, Users, Target, CheckCircle2, Link2, BookOpen, ChevronRight } from 'lucide-react';

export interface Scholar {
  guide: string;
  name: string;
  topic: string;
  status: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface Volume {
  title: string;
  date: string;
  url?: string;
}

export interface ResearchContentPayload {
  about?: string;
  external_link?: string;
  instagram_link?: string; // legacy support
  important_documents?: { title: string; url: string }[];
  committee?: { name: string; role: string; phone: string; email: string }[];
  objectives_activities?: { type: 'paragraph' | 'point'; content: string }[];
  contact_us?: { name: string; email: string; phone: string }[];
  scholars?: Scholar[];
  stats?: StatItem[];
  volumes?: Volume[];
}

const statusColor = (status: string) => {
  if (status === 'Awarded') return 'bg-green-100 text-green-700';
  if (status === 'Thesis submitted') return 'bg-blue-100 text-blue-700';
  return 'bg-amber-100 text-amber-700';
};

export default function ResearchContentRenderer({ content }: { content: ResearchContentPayload }) {
  if (!content) return null;

  const hasContent = content.about || content.committee?.length || content.objectives_activities?.length ||
    content.contact_us?.length || content.important_documents?.length || content.scholars?.length ||
    content.stats?.length || content.volumes?.length;

  if (!hasContent) return (
    <div className="text-gray-400 text-sm italic">No content added yet. Use the superadmin to edit this page.</div>
  );

  return (
    <div className="space-y-10">

      {/* Stats Cards */}
      {content.stats && content.stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {content.stats.map((stat, i) => (
            <div key={i} className="bg-[#F8FAFC] border border-gray-100 p-4 rounded-xl">
              <div className="text-2xl font-bold text-[#1E293B]">{stat.value}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* About / Main Content */}
      {content.about && (
        <div>
          <div className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
            {content.about}
          </div>
          {(content.instagram_link || content.external_link) && (
            <div className="mt-6">
              <a href={content.instagram_link || content.external_link} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-blue-50 text-[#123B6D] hover:bg-[#123B6D] hover:text-white px-5 py-2.5 rounded-xl font-semibold transition-colors">
                <Link2 size={18} /> Visit External Link
              </a>
            </div>
          )}
        </div>
      )}

      {/* Objectives / Bullet Points */}
      {content.objectives_activities && content.objectives_activities.length > 0 && (
        <div className="space-y-3">
          {content.objectives_activities.map((obj, i) => (
            obj.type === 'paragraph' ? (
              <p key={i} className="text-gray-600 leading-relaxed">{obj.content}</p>
            ) : (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <CheckCircle2 className="text-[#123B6D] mt-0.5 shrink-0" size={18} />
                <span className="text-gray-700 font-medium">{obj.content}</span>
              </div>
            )
          ))}
        </div>
      )}

      {/* Committee Members */}
      {content.committee && content.committee.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.committee.map((member, i) => (
              <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-2xl px-6 py-5">
                <h4 className="font-bold text-gray-900 text-base mb-0.5">{member.name}</h4>
                <p className="text-[#123B6D] text-sm font-semibold mb-3">{member.role}</p>
                <div className="space-y-1.5">
                  {member.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail size={13} /> <a href={`mailto:${member.email}`} className="hover:text-[#123B6D]">{member.email}</a>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone size={13} /> <a href={`tel:${member.phone}`} className="hover:text-[#123B6D]">{member.phone}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scholars Table */}
      {content.scholars && content.scholars.length > 0 && (
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-bold">Student Name</th>
                <th className="px-6 py-4 font-bold">Guide</th>
                <th className="px-6 py-4 font-bold min-w-[300px]">Topic of Research</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[14px]">
              {content.scholars.map((scholar, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-[#1E293B] whitespace-nowrap">{scholar.name}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">{scholar.guide}</td>
                  <td className="px-6 py-4 text-gray-600 leading-relaxed">{scholar.topic}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${statusColor(scholar.status)}`}>
                      {scholar.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Volumes / Issues */}
      {content.volumes && content.volumes.length > 0 && (
        <div className="space-y-4">
          {content.volumes.map((vol, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 hover:border-[#123B6D] transition-colors rounded-xl p-5 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#EBF3FF] text-[#123B6D] flex items-center justify-center group-hover:bg-[#123B6D] group-hover:text-white transition-colors">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm group-hover:text-[#123B6D]">{vol.title}</p>
                  <p className="text-xs text-gray-500">{vol.date}</p>
                </div>
              </div>
              {vol.url ? (
                <a href={vol.url} target="_blank" rel="noreferrer">
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#123B6D]" />
                </a>
              ) : (
                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#123B6D]" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Important Documents */}
      {content.important_documents && content.important_documents.length > 0 && (
        <div className="bg-[#F0F5FF] rounded-2xl p-6 border border-[#123B6D]/10">
          <h3 className="text-lg font-bold text-[#123B6D] flex items-center gap-2 mb-4">
            <FileText size={20} /> Important Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.important_documents.map((doc, i) => (
              doc.url ? (
                <a key={i} href={doc.url} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between bg-white px-5 py-4 rounded-xl border border-gray-100 hover:border-[#123B6D]/30 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <FileText size={18} />
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-[#123B6D] transition-colors">{doc.title}</span>
                  </div>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-[#123B6D] transition-colors" />
                </a>
              ) : (
                <div key={i} className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl border border-gray-100 opacity-60">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <span className="font-semibold text-gray-500">{doc.title}</span>
                  <span className="ml-auto text-xs text-gray-400">Not uploaded yet</span>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Contact Us */}
      {content.contact_us && content.contact_us.length > 0 && (
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users size={20} className="text-[#123B6D]" /> Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.contact_us.map((contact, i) => (
              <div key={i} className="flex flex-col gap-1">
                <h4 className="font-bold text-gray-800">{contact.name}</h4>
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="text-gray-500 hover:text-[#123B6D] flex items-center gap-2 text-sm">
                    <Mail size={14} /> {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="text-gray-500 hover:text-[#123B6D] flex items-center gap-2 text-sm">
                    <Phone size={14} /> {contact.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
