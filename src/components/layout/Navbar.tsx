'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Menu, X, ChevronDown, ChevronUp, Globe, Accessibility, Home, Award, Users, GraduationCap, BookOpen, Palette, Medal, Library as LibraryIcon, LayoutGrid, Star, ShieldCheck, Landmark, Building2, ArrowRight, FileText, Image as ImageIcon, Paperclip } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const formatCourseLabel = (label: string) => {
  if (typeof label !== 'string') return label;
  
  const isCourse = /^(Bachelor|Master|B\.Com|B\.Sc|M\.Com|M\.Sc|B\.A\.|PhD|BAMMC|BNMMC|Commerce)/i.test(label);
  
  if (isCourse) {
    const parenIndex = label.indexOf('(');
    if (parenIndex !== -1) {
      return (
        <>
          <span className="font-bold text-black">{label.substring(0, parenIndex).trim()}</span>
          {' '}<span className="font-medium text-inherit">{label.substring(parenIndex)}</span>
        </>
      );
    }
    return <span className="font-bold text-black">{label}</span>;
  }
  
  return label;
};

const navLinks = [
  { label: 'Home', href: '/', icon: <Home size={18} /> },
  {
    label: 'About Us', href: '/about', icon: <Users size={18} />,
    isMegaMenu: true,
    megaMenuAlign: 'left',
    megaMenuImage: '/college_campus_hero.png',
    megaMenuColumns: [
      {
        title: 'College',
        sections: [
          {
            links: [
              { label: 'Vision-Mission', href: '/about/vision-mission' },
              { label: 'PTVA Trust', href: '/about/ptva-trust' },
              { label: 'Board of Trustees', href: '/about/board-of-trustees' },
              { label: 'Our Milestones', href: '/about/milestones' },
              { label: 'Our Other Institutions', href: '/about/other-institutions' },
              { label: 'Organogram', href: '/about/organogram' },
              { label: 'Code of Conduct', href: '/about/code-of-conduct' },
            ]
          }
        ]
      },
      {
        title: 'Leadership',
        sections: [
          {
            links: [
              { label: "Principal's Desk", href: '/principal' },
              { label: "Vice Principal's Desk (Degree College)", href: '/vice-principal-degree' },
              { label: "Vice Principal's Desk (Junior College)", href: '/vice-principal-junior' },
            ]
          }
        ]
      },
      {
        title: 'Development Committee',
        sections: [
          {
            links: [
              { label: 'Members (Year Wise)', href: '/about/cdc-members' },
              { label: 'Minutes of the meeting', href: '/about/cdc-minutes' },
            ]
          }
        ]
      },
      {
        title: 'Special Lectures',
        sections: [
          {
            links: [
              { label: 'Tilak Smruti Vyakhyan', href: '/about/tilak-lecture' },
              { label: 'B. G. Bapat Memorial Lecture', href: '/about/bg-bapat-lecture' },
            ]
          }
        ]
      },
    ],
    sub: [
      { label: 'Vision-Mission', href: '/about/vision-mission' },
      { label: 'PTVA Trust', href: '/about/ptva-trust' },
      { label: 'Board of Trustees', href: '/about/board-of-trustees' },
      { label: "Principal's Desk", href: '/principal' },
      { label: "Vice Principal's Desk (Degree College)", href: '/vice-principal-degree' },
      { label: "Vice Principal's Desk (Junior College)", href: '/vice-principal-junior' },
      { label: 'Our Milestones', href: '/about/milestones' },
      { label: 'Organogram', href: '/about/organogram' },
      { label: 'Code of Conduct', href: '/about/code-of-conduct' },
      { 
        label: 'College Development Committee', href: '/about/college-development-committee', sub: [
          { label: 'Members (Year Wise)', href: '/about/cdc-members' },
          { label: 'Minutes of the meeting', href: '/about/cdc-minutes' }
        ]
      },
      { label: 'Our Other Institutions', href: '/about/other-institutions' },
      { label: 'Tilak Smruti Vyakhyan', href: '/about/tilak-lecture' },
      { label: 'B. G. Bapat Memorial Lecture', href: '/about/bg-bapat-lecture' },
    ]
  },
  {
    label: 'Accreditation', href: '/accreditation', icon: <Medal size={18} />, 
    isMegaMenu: true,
    megaMenuAlign: 'left',
    megaMenuImage: '/objectives_side_img.png',
    megaMenuColumns: [
      {
        title: 'Certificates',
        sections: [
          { links: [
            { label: 'UGC 2(f) & 12(B)', href: '/accreditation/certificates/ugc-2f-12b' },
            { label: 'Autonomy', href: '/accreditation/certificates/autonomy' },
            { label: 'NAAC Certificate', href: '/accreditation/certificates/naac' },
            { label: 'NIRF', href: '/accreditation/certificates/nirf' },
            { label: 'AISHE', href: '/accreditation/certificates/aishe' }
          ] }
        ]
      },
      {
        title: 'NAAC',
        sections: [
          { 
            subTitle: 'SSR',
            links: [
              { label: '4th NAAC Cycle', href: '/accreditation/naac' },
              { label: '3rd NAAC Cycle', href: '/accreditation/naac' }
            ]
          }
        ]
      },
      {
        title: 'AQAR',
        sections: [
          { links: [
            { label: '2024-2025', href: '/accreditation/aqar' },
            { label: '2023-2024', href: '/accreditation/aqar' },
            { label: '2022-2023', href: '/accreditation/aqar' },
            { label: '2021-2022', href: '/accreditation/aqar' }
          ] }
        ]
      }
    ],
    sub: [
      { 
        label: 'Certificates', href: '#', sub: [
          { label: 'UGC 2(f) & 12(B)', href: '/accreditation/certificates/ugc-2f-12b' },
          { label: 'Autonomy', href: '/accreditation/certificates/autonomy' },
          { label: 'NAAC Certificate', href: '/accreditation/certificates/naac' },
          { label: 'NIRF', href: '/accreditation/certificates/nirf' },
          { label: 'AISHE', href: '/accreditation/certificates/aishe' }
        ]
      },
      { 
        label: 'NAAC', href: '/accreditation/naac', sub: [
          { label: '4th NAAC Cycle', href: '/accreditation/naac' },
          { label: '3rd NAAC Cycle', href: '/accreditation/naac' }
        ]
      },
      {
        label: 'AQAR', href: '/accreditation/aqar', sub: [
          { label: '2024-2025', href: '/accreditation/aqar' },
          { label: '2023-2024', href: '/accreditation/aqar' },
          { label: '2022-2023', href: '/accreditation/aqar' },
          { label: '2021-2022', href: '/accreditation/aqar' }
        ]
      }
    ]
  },
  {
    label: 'Autonomy', href: '/autonomous', icon: <Medal size={18} />,
    isMegaMenu: true,
    megaMenuImage: '/objectives_side_img.png',
    megaMenuColumns: [
      {
        title: 'Information',
        sections: [
          {
            links: [
              { label: 'Conferment of Autonomy (Certificate)', href: '/autonomous/Conferment-of-Autonomy' },
            ]
          }
        ]
      },
      {
        title: 'Statutory Bodies',
        colSpan: 2,
        sections: [
          {
            subTitle: 'Board of Studies',
            links: [
              { label: 'Members', href: '/autonomous/bos/members' },
              { label: 'Minutes', href: '/autonomous/bos/minutes' }
            ]
          },
          {
            subTitle: 'Academic Council',
            links: [
              { label: 'Members', href: '/autonomous/academic-council/members' },
              { label: 'Minutes', href: '/autonomous/academic-council/minutes' }
            ]
          },
          {
            subTitle: 'Finance Committee',
            links: [
              { label: 'Members', href: '/autonomous/finance-committee/members' },
              { label: 'Minutes', href: '/autonomous/finance-committee/minutes' }
            ]
          },
          {
            subTitle: 'Governing Body',
            links: [
              { label: 'Members', href: '/autonomous/governing-body/members' },
              { label: 'Minutes', href: '/autonomous/governing-body/minutes' }
            ]
          }
        ]
      }
    ],
    sub: [
      { label: 'Conferment of Autonomy (Certificate)', href: '/autonomous/Conferment-of-Autonomy' },
      { 
        label: 'Board of Studies', href: '#', sub: [
          { label: 'Members', href: '/autonomous/bos/members' },
          { label: 'Minutes', href: '/autonomous/bos/minutes' }
        ]
      },
      { 
        label: 'Academic Council', href: '#', sub: [
          { label: 'Members', href: '/autonomous/academic-council/members' },
          { label: 'Minutes', href: '/autonomous/academic-council/minutes' }
        ]
      },
      { 
        label: 'Finance Committee', href: '#', sub: [
          { label: 'Members', href: '/autonomous/finance-committee/members' },
          { label: 'Minutes', href: '/autonomous/finance-committee/minutes' }
        ]
      },
      { 
        label: 'Governing Body', href: '#', sub: [
          { label: 'Members', href: '/autonomous/governing-body/members' },
          { label: 'Minutes', href: '/autonomous/governing-body/minutes' }
        ]
      }
    ]
  },
  {
    label: 'IQAC', href: '/iqac', icon: <Award size={18} />, 
    isMegaMenu: true,
    megaMenuImage: '/college_campus_hero.png',
    megaMenuColumns: [
      {
        title: 'Information & Policies',
        sections: [
          {
            links: [
              { label: 'About the IQAC', href: '/iqac/information-and-policies?tab=about' },
              { label: 'Quality Policy', href: '/iqac/information-and-policies?tab=quality-policy' },
              { label: 'IQAC composition -Committee Members', href: '/iqac/information-and-policies?tab=members' },
              { label: 'Minutes of the Meeting', href: '/iqac/information-and-policies?tab=minutes' },
              { label: 'Best Practices', href: '/iqac/information-and-policies?tab=best-practices' },
              { label: 'Institutional Distinctiveness', href: '/iqac/information-and-policies?tab=distinctiveness' },
            ]
          }
        ]
      },
      {
        title: 'Reports & Initiatives',
        sections: [
          {
            links: [
              { label: 'Annual Reports', href: '/iqac/reports-and-initiatives?tab=annual-reports' },
              { label: 'Academic Calendar', href: '/iqac/reports-and-initiatives?tab=academic-calendar' },
              { label: 'Perspective plan', href: '/iqac/reports-and-initiatives?tab=perspective-plan' },
              { label: 'Deeksharambh', href: '/iqac/reports-and-initiatives?tab=deeksharambh' },
              { label: 'Disability Sensitisation', href: '/iqac/reports-and-initiatives?tab=disability' },
              { label: 'Environmental Commitments', href: '/iqac/reports-and-initiatives?tab=environment' },
            ]
          }
        ]
      }
    ],
    sub: [
      { label: 'About the IQAC', href: '/iqac/information-and-policies?tab=about' },
      { label: 'Quality Policy', href: '/iqac/information-and-policies?tab=quality-policy' },
      { label: 'IQAC composition -Committee Members', href: '/iqac/information-and-policies?tab=members' },
      { label: 'Minutes of the Meeting', href: '/iqac/information-and-policies?tab=minutes' },
      { label: 'Best Practices', href: '/iqac/information-and-policies?tab=best-practices' },
      { label: 'Institutional Distinctiveness', href: '/iqac/information-and-policies?tab=distinctiveness' },
      { label: 'Annual Reports', href: '/iqac/reports-and-initiatives?tab=annual-reports' },
      { label: 'Academic Calendar', href: '/iqac/reports-and-initiatives?tab=academic-calendar' },
      { label: 'Perspective plan', href: '/iqac/reports-and-initiatives?tab=perspective-plan' },
      { label: 'Deeksharambh', href: '/iqac/reports-and-initiatives?tab=deeksharambh' },
      { label: 'Disability Sensitisation', href: '/iqac/reports-and-initiatives?tab=disability' },
      { label: 'Environmental Commitments', href: '/iqac/reports-and-initiatives?tab=environment' },
    ]
  },
  {
    label: 'Jr. College', href: '/junior-college-corner', icon: <BookOpen size={18} />, sub: [
      { label: 'Teaching Staff', href: '/jr-college/teaching-staff' },
      { label: 'Result Analysis', href: '/jr-college/result-analysis' },
      { label: 'SMAF/Scholarship/Freeship', href: '/jr-college/scholarships' },
      { label: 'Notice', href: '/jr-college/notice' },
      { label: 'Timetable', href: '/jr-college/timetable' },
    ]
  },
  {
    label: 'Programmes', href: '/programmes', icon: <GraduationCap size={18} />, 
    isMegaMenu: true,
    megaMenuType: 'programmes',
    megaMenuColumns: [
      {
        title: 'Undergraduate',
        colSpan: 2,
        items: [
          { label: 'B.COM', href: '/programmes/ug/bcom', isBoldBlack: true },
          { label: 'B.COM (Accounting & Finance)', href: '/programmes/ug/baf' },
          { label: 'B.COM (Banking & Insurance)', href: '/programmes/ug/bbi' },
          { label: 'B.COM (Financial Markets)', href: '/programmes/ug/bfm' },
          { label: 'B.COM (Management Studies)', href: '/programmes/ug/bcom-ms' },
          { label: 'B.COM (Business Administration)', href: '/programmes/ug/bcom-ba' },
          { label: 'BAMMC (Mass Media & Communication)', href: '/programmes/ug/bammc' },
          { label: 'B.SC. (Computer Science)', href: '/programmes/ug/sct/bsc-cs', isBoldBlack: true },
          { label: 'B.SC. (Information Technology)', href: '/programmes/ug/sct/bsc-it' },
          { label: 'B.SC. (Computer Applications)', href: '/programmes/ug/sct/bsc-ca' },
          { label: 'B.SC. (Data Science)', href: '/programmes/ug/sct/bsc-ds' },
          { label: 'B.COM BFSI (Apprenticeship)', href: '/programmes/ug/bfsi', isBoldBlack: true },
        ]
      },
      {
        title: 'Post Graduate',
        colSpan: 1,
        items: [
          { label: 'M.COM. (Advanced Accountancy)', href: '/programmes/pg/mcom-aa', isBoldBlack: true },
          { label: 'M.COM. (Business Management)', href: '/programmes/pg/mcom-bm', isBoldBlack: true },
          { label: 'M.COM. (Banking & Finance)', href: '/programmes/pg/mcom-bf', isBoldBlack: true },
          { label: 'M.SC. (Information Technology)', href: '/programmes/pg/msc-it' },
          { label: 'M.SC. (Finance)', href: '/programmes/pg/msf' },
        ]
      },
      {
        title: 'Ph.D. Programmes',
        colSpan: 1,
        items: [
          { label: 'Commerce (Specialisation in Business Economics)', href: '/programmes/phd/be' }
        ]
      },
    ],
    sub: [
      {
        label: 'Undergraduate', href: '/programmes/undergraduate', sub: [
          { label: 'B.COM', href: '/programmes/ug/bcom', isBoldBlack: true },
          { label: 'B.COM (Accounting & Finance)', href: '/programmes/ug/baf' },
          { label: 'B.COM (Banking & Insurance)', href: '/programmes/ug/bbi' },
          { label: 'B.COM (Financial Markets)', href: '/programmes/ug/bfm' },
          { label: 'B.COM (Management Studies)', href: '/programmes/ug/bcom-ms' },
          { label: 'B.COM (Business Administration)', href: '/programmes/ug/bcom-ba' },
          { label: 'BAMMC (Mass Media & Communication)', href: '/programmes/ug/bammc' },
          { label: 'B.SC. (Computer Science)', href: '/programmes/ug/sct/bsc-cs', isBoldBlack: true },
          { label: 'B.SC. (Information Technology)', href: '/programmes/ug/sct/bsc-it' },
          { label: 'B.SC. (Computer Applications)', href: '/programmes/ug/sct/bsc-ca' },
          { label: 'B.SC. (Data Science)', href: '/programmes/ug/sct/bsc-ds' },
          { label: 'B.COM BFSI', href: '/programmes/ug/bfsi', isBoldBlack: true },
        ]
      },
      {
        label: 'Post Graduate', href: '/programmes/post-graduate', sub: [
          { label: 'M.COM. (Advanced Accountancy)', href: '/programmes/pg/mcom-aa', isBoldBlack: true },
          { label: 'M.COM. (Business Management)', href: '/programmes/pg/mcom-bm', isBoldBlack: true },
          { label: 'M.COM. (Banking & Finance)', href: '/programmes/pg/mcom-bf', isBoldBlack: true },
          { label: 'M.SC. (Information Technology)', href: '/programmes/pg/msc-it' },
          { label: 'M.SC. (Finance)', href: '/programmes/pg/msf' },
        ]
      },
      {
        label: 'Ph.D. Programmes', href: '/programmes/phd', sub: [
          { label: 'Commerce (Specialisation in Business Economics)', href: '/programmes/phd/be' }
        ]
      },
    ]
  },
  { 
    label: 'Examination', href: '/examination', icon: <BookOpen size={18} />,
    sub: [
      { label: 'Notices', href: '/examination' },
      { label: 'Board of Examination', href: '/examination' },
      { label: 'Examination Ordinances', href: '/examination' },
      { label: 'Grade Point & SGPA', href: '/examination' },
      { label: 'Examination Manual', href: '/examination' },
      { label: 'Unfair Means Enquiry', href: '/examination' }
    ]
  },
  { 
    label: 'Library', href: '/library', icon: <LibraryIcon size={18} />,
    sub: [
      { label: 'WEB OPAC', href: '#' },
      { label: 'E-RESOURCES', href: '/library/e-resources' },
      { label: 'DOWNLOAD', href: '#' },
      { label: 'IMPORTANT LINKS', href: '/library/important-links' }
    ],
    mobileSub: [
      { label: 'HOME', href: '/library' },
      { label: 'ABOUT US', href: '/library/about-us' },
      { label: 'WEB OPAC', href: '#' },
      { label: 'E-RESOURCES', href: '/library/e-resources' },
      { label: 'STAFF PROFILE', href: '/library/staff-profile' },
      { label: 'DOWNLOAD', href: '#' },
      { label: 'RESEARCH - KIT', href: '/library/research-kit' },
      { label: 'I. R.', href: 'https://drive.google.com/drive/folders/1bes4sOXN9ePGCVSgdTQ2ZtPg-pYQWyju?usp=drive_link' },
      { label: 'IMPORTANT LINKS', href: '/library/important-links' },
      { label: 'CONTACT US', href: '/library/contact-us' }
    ]
  },
  {
    label: 'Research', href: '/research', icon: <Star size={18} />,
    isMegaMenu: true,
    megaMenuAlign: 'right',
    megaMenuImage: '/objectives_side_img.png',
    megaMenuColumns: [
      {
        title: 'About & Committee',
        sections: [
          {
            links: [
              { label: 'Objective', href: '/research' },
              { label: 'Committee – List of Members', href: '/research' },
              { label: 'Annual Reports', href: '/research' },
            ]
          }
        ]
      },
      {
        title: 'Research Centre',
        sections: [
          {
            links: [
              { label: 'Research Centre Recognition', href: '/research' },
              { label: 'Research Guides', href: '/research' },
              { label: 'Research Scholars', href: '/research' },
              { label: 'Awarded Thesis', href: '/research' },
              { label: 'Application (Process)', href: '/research' },
            ]
          }
        ]
      },
      {
        title: 'Policies',
        sections: [
          {
            links: [
              { label: 'Research Policy', href: '/research' },
              { label: 'Plagiarism Policy', href: '/research' },
              { label: 'Application for Plagiarism check', href: '/research' },
            ]
          }
        ]
      },
      {
        title: 'Competitions & Publications',
        sections: [
          {
            subTitle: 'Competitions',
            links: [
              { label: 'Avishkar (University of Mumbai)', href: '/research' },
              { label: 'Shodh (Inter-collegiate)', href: '/research' },
              { label: "PTVA's Inter-institutional Conclave", href: '/research' },
            ]
          },
          {
            subTitle: 'Research Journal',
            links: [
              { label: 'About the Journal', href: '/research/publications?tab=journal-about' },
              { label: 'Advisory Board', href: '/research/publications?tab=journal-advisory' },
              { label: 'Board of Editors', href: '/research/publications?tab=journal-board' },
              { label: 'Review Committee', href: '/research/publications?tab=journal-review' },
              { label: 'Guidelines for Paper Submission', href: '/research/publications?tab=journal-guidelines' },
              { label: 'Contact', href: '/research/publications?tab=journal-contact' },
            ]
          }
        ]
      },
    ],
    sub: [
      {
        label: 'About & Committee', href: '#', sub: [
          { label: 'Objective', href: '/research' },
          { label: 'Committee – List of Members', href: '/research' },
          { label: 'Annual Reports', href: '/research' },
        ]
      },
      {
        label: 'Research Centre', href: '#', sub: [
          { label: 'Research Centre Recognition', href: '/research' },
          { label: 'Research Guides', href: '/research' },
          { label: 'Research Scholars', href: '/research' },
          { label: 'Awarded Thesis', href: '/research' },
          { label: 'Application (Process)', href: '/research' },
        ]
      },
      {
        label: 'Policies', href: '#', sub: [
          { label: 'Research Policy', href: '/research' },
          { label: 'Plagiarism Policy', href: '/research' },
          { label: 'Application for Plagiarism check', href: '/research' },
        ]
      },
      {
        label: 'Competitions', href: '#', sub: [
          { label: 'Avishkar (University of Mumbai)', href: '/research' },
          { label: 'Shodh (Inter-collegiate)', href: '/research' },
          { label: "PTVA's Inter-institutional Conclave", href: '/research' },
        ]
      },
      {
        label: 'Research Journal', href: '#', sub: [
          { label: 'About the Journal', href: '/research/publications?tab=journal-about' },
          { label: 'Advisory Board', href: '/research/publications?tab=journal-advisory' },
          { label: 'Board of Editors', href: '/research/publications?tab=journal-board' },
          { label: 'Review Committee', href: '/research/publications?tab=journal-review' },
          { label: 'Guidelines for Paper Submission', href: '/research/publications?tab=journal-guidelines' },
          { label: 'Contact', href: '/research/publications?tab=journal-contact' },
        ]
      },
    ]
  },
  {
    label: "Students Corner", href: '/students-corner', icon: <Users size={18} />,
    isMegaMenu: true,
    megaMenuAlign: 'right',
    megaMenuImage: '/college_campus_hero.png',
    megaMenuColumns: [
      {
        title: 'Forums and Clubs',
        sections: [
          {
            links: [
              { label: "Students' Council", href: '/students-corner/Forums-and-Clubs?club=students-council' },
              { label: 'National Service Scheme', href: '/students-corner/Forums-and-Clubs?club=nss' },
              { label: 'Cultural Forum', href: '/students-corner/Forums-and-Clubs?club=cultural-forum' },
              { label: 'Sports and Gymkhana', href: '/students-corner/Forums-and-Clubs?club=sports' },
              { label: 'Natyakarmi (Theatre Group)', href: '/students-corner/Forums-and-Clubs?club=natyakarmi' },
              { label: 'Marathi Vangmay Mandal', href: '/students-corner/Forums-and-Clubs?club=mvm' },
              { label: 'Aaroh (Music Club)', href: '/students-corner/Forums-and-Clubs?club=aaroh' },
              { label: 'Artelier (Fine Arts Club)', href: '/students-corner/Forums-and-Clubs?club=artelier' },
              { label: 'Nature Club', href: '/students-corner/Forums-and-Clubs?club=nature-club' },
              { label: 'Women Development Cell', href: '/students-corner/Forums-and-Clubs?club=wdc' },
              { label: 'Entrepreneurship Development Cell', href: '/students-corner/Forums-and-Clubs?club=edc' },
              { label: "Students' Research", href: '/students-corner/Forums-and-Clubs?club=research' },
            ]
          }
        ]
      },
      {
        title: 'Events & Festivals',
        sections: [
          {
            links: [
              { label: 'Spectrum', href: '/students-corner/Events-and-Festivals?event=spectrum' },
              { label: 'Inspira', href: '/students-corner/Events-and-Festivals?event=inspira' },
              { label: 'Hack-A-Thon', href: '/students-corner/Events-and-Festivals?event=hackathon' },
              { label: 'Emporio', href: '/students-corner/Events-and-Festivals?event=emporio' },
              { label: 'Quantomania', href: '/students-corner/Events-and-Festivals?event=quantomania' },
              { label: 'Manthan', href: '/students-corner/Events-and-Festivals?event=manthan' },
            ]
          }
        ]
      },
      {
        title: "Student's Publications",
        sections: [
          {
            links: [
              { label: 'Pratibimb', href: '/students-corner/Students-Publications?publication=pratibimb' },
              { label: 'Finanza', href: '/students-corner/Students-Publications?publication=finanza' },
              { label: 'Techanugraha', href: '/students-corner/Students-Publications?publication=techanugraha' },
            ]
          }
        ]
      },
      {
        title: 'Gallery',
        sections: [
          {
            links: [
              { label: 'Events Gallery', href: '/students-corner/gallery' },
              { label: 'Event Calendar', href: '/students-corner/event-calendar' },
              { label: 'Wall of Fame', href: '/students-corner/wall-of-fame' },
            ]
          }
        ]
      }
    ],
    sub: [
      {
        label: 'Forums and Clubs', href: '#', sub: [
          { label: "Students' Council", href: '/students-corner/Forums-and-Clubs?club=students-council' },
          { label: 'National Service Scheme', href: '/students-corner/Forums-and-Clubs?club=nss' },
          { label: 'Cultural Forum', href: '/students-corner/Forums-and-Clubs?club=cultural-forum' },
          { label: 'Sports and Gymkhana', href: '/students-corner/Forums-and-Clubs?club=sports' },
          { label: 'Natyakarmi (Theatre Group)', href: '/students-corner/Forums-and-Clubs?club=natyakarmi' },
          { label: 'Marathi Vangmay Mandal', href: '/students-corner/Forums-and-Clubs?club=mvm' },
          { label: 'Aaroh (Music Club)', href: '/students-corner/Forums-and-Clubs?club=aaroh' },
          { label: 'Artelier (Fine Arts Club)', href: '/students-corner/Forums-and-Clubs?club=artelier' },
          { label: 'Nature Club', href: '/students-corner/Forums-and-Clubs?club=nature-club' },
          { label: 'Women Development Cell', href: '/students-corner/Forums-and-Clubs?club=wdc' },
          { label: 'Entrepreneurship Development Cell', href: '/students-corner/Forums-and-Clubs?club=edc' },
          { label: "Students' Research", href: '/students-corner/Forums-and-Clubs?club=research' },
        ]
      },
      {
        label: 'Events & Festivals', href: '#', sub: [
          { label: 'Spectrum', href: '/students-corner/Events-and-Festivals?event=spectrum' },
          { label: 'Inspira', href: '/students-corner/Events-and-Festivals?event=inspira' },
          { label: 'Hack-A-Thon', href: '/students-corner/Events-and-Festivals?event=hackathon' },
          { label: 'Emporio', href: '/students-corner/Events-and-Festivals?event=emporio' },
          { label: 'Quantomania', href: '/students-corner/Events-and-Festivals?event=quantomania' },
          { label: 'Manthan', href: '/students-corner/Events-and-Festivals?event=manthan' },
        ]
      },
      {
        label: "Student's Publications", href: '#', sub: [
          { label: 'Pratibimb', href: '/students-corner/Students-Publications?publication=pratibimb' },
          { label: 'Finanza', href: '/students-corner/Students-Publications?publication=finanza' },
          { label: 'Techanugraha', href: '/students-corner/Students-Publications?publication=techanugraha' },
        ]
      },
      {
        label: 'Gallery', href: '#', sub: [
          { label: 'Events Gallery', href: '/students-corner/gallery' },
          { label: 'Event Calendar', href: '/students-corner/event-calendar' },
          { label: 'Wall of Fame', href: '/students-corner/wall-of-fame' },
        ]
      }
    ]
  },
  {
    label: 'More', href: '#', icon: <LayoutGrid size={18} />, 
    isMegaMenu: true,
    megaMenuAlign: 'right',
    megaMenuImage: '/vision_card_img.png',
    megaMenuColumns: [
      {
        title: 'Infrastructure (Gallery)',
        sections: [
          {
            links: [
              { label: 'View Gallery', href: '/infrastructure-gallery' },
              { label: 'Library', href: '/library' },
              { label: 'Auditorium', href: '#' },
              { label: 'Class-Rooms', href: '#' },
              { label: 'Computer Labs', href: '#' },
              { label: 'Sports & Gymkhana', href: '#' },
              { label: 'Canteen', href: '#' },
            ]
          }
        ]
      },
      {
        title: 'Statutory Bodies',
        sections: [
          {
            links: [
              { label: 'Grievance Cell', href: '/statutory-bodies?body=grievance-cell' },
              { label: 'Internal Complaint Committee', href: '/statutory-bodies?body=icc' },
              { label: 'Anti-Ragging Committee', href: '/statutory-bodies?body=anti-ragging' },
              { label: 'Counselling cell', href: '/statutory-bodies?body=counselling' },
              { label: 'Career Katta (Govt of Maharashtra)', href: '/statutory-bodies?body=career-katta' },
              { label: 'Special Cell', href: '/statutory-bodies?body=special-cell' },
              { label: 'Remedial Coaching Cell', href: '/statutory-bodies?body=remedial-coaching' },
            ]
          }
        ]
      }
    ],
    sub: [
      {
        label: 'Infrastructure (Gallery)', href: '#', sub: [
          { label: 'View Gallery', href: '/infrastructure-gallery' },
          { label: 'Library', href: '/library' },
          { label: 'Auditorium', href: '#' },
          { label: 'Class-Rooms', href: '#' },
          { label: 'Computer Labs', href: '#' },
          { label: 'Sports & Gymkhana', href: '#' },
          { label: 'Canteen', href: '#' },
        ]
      },
      {
        label: 'Statutory Bodies', href: '#', sub: [
          { label: 'Grievance Cell', href: '/statutory-bodies?body=grievance-cell' },
          { label: 'Internal Complaint Committee', href: '/statutory-bodies?body=icc' },
          { label: 'Anti-Ragging Committee', href: '/statutory-bodies?body=anti-ragging' },
          { label: 'Counselling cell', href: '/statutory-bodies?body=counselling' },
          { label: 'Career Katta (Govt of Maharashtra)', href: '/statutory-bodies?body=career-katta' },
          { label: 'Special Cell', href: '/statutory-bodies?body=special-cell' },
          { label: 'Remedial Coaching Cell', href: '/statutory-bodies?body=remedial-coaching' },
        ]
      }
    ]
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isPeekMode, setIsPeekMode] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Top Layer 1 Quick Links Dropdowns & Utility states
  const [facultyDropOpen, setFacultyDropOpen] = useState(false);
  const [studentDropOpen, setStudentDropOpen] = useState(false);
  const [translateDropOpen, setTranslateDropOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileOpenDrop, setMobileOpenDrop] = useState<string | null>(null);
  const [nestedMobileDrop, setNestedMobileDrop] = useState<string | null>(null);
  const [nestedMobileDrop3, setNestedMobileDrop3] = useState<string | null>(null);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [liveNotices, setLiveNotices] = useState<{ id: string; title: string; schedule_time: string; courses?: string[]; categories?: string[]; attachments?: { name: string; url: string; type: string }[] }[]>([]);
  const [fetchingNotices, setFetchingNotices] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [topNoticeId, setTopNoticeId] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState(1000);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCount = localStorage.getItem('visitorCount');
      if (storedCount) {
        const newCount = parseInt(storedCount, 10) + 1;
        setVisitorCount(newCount);
        localStorage.setItem('visitorCount', newCount.toString());
      } else {
        localStorage.setItem('visitorCount', '1000');
        setVisitorCount(1000);
      }
    }
  }, []);

  const fetchLiveNotices = async () => {
    setFetchingNotices(true);
    const now = new Date().toISOString();
    const { data } = await supabase
      .from('notices')
      .select('id, title, schedule_time, courses, categories, is_general, attachments')
      .lte('schedule_time', now)
      .or(`expiry_time.is.null,expiry_time.gt.${now}`)
      .order('schedule_time', { ascending: false })
      .limit(10);
    
    if (data && data.length > 0) {
      setLiveNotices(data);
      const latestId = data[0].id;
      
      const lastReadId = localStorage.getItem('lastReadNoticeId');
      
      setTopNoticeId((prev) => {
        if (prev !== null && prev !== latestId) {
          setHasUnread(true);
          setIsShaking(true);
          setNoticesOpen(true);
          setTimeout(() => setIsShaking(false), 5000);
        } else if (lastReadId !== latestId) {
          setHasUnread(true);
        }
        return latestId;
      });
    } else {
      setHasUnread(false);
    }
    setFetchingNotices(false);
  };

  const handleOpenNotices = () => {
    setNoticesOpen(true);
    setHasUnread(false);
    if (topNoticeId) {
      localStorage.setItem('lastReadNoticeId', topNoticeId);
    }
  };

  const [menuDirection, setMenuDirection] = useState<Record<string, 'left' | 'right'>>({});

  const handleMenuEnter = (e: React.MouseEvent, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.right + 220 > window.innerWidth) {
      setMenuDirection(prev => ({ ...prev, [id]: 'left' }));
    } else {
      setMenuDirection(prev => ({ ...prev, [id]: 'right' }));
    }
  };

  useEffect(() => {
    fetchLiveNotices();

    const channel = supabase
      .channel('public:notices:navbar')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notices' },
        (payload) => {
          console.log('Realtime event received! New notice:', payload);
          fetchLiveNotices();
        }
      )
      .subscribe((status) => {
        console.log('Supabase Realtime Status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const isDown = currentScrollY > lastScrollYRef.current;
      setScrolled(currentScrollY > 20);

      if (currentScrollY <= 40) {
        // Back at top — return to full default header
        setIsPeekMode(false);
        setIsManuallyExpanded(false);
      } else {
        if (!isPeekMode && currentScrollY > 80) {
          // Scrolling DOWN past threshold — enter peek mode
          setIsPeekMode(true);
          setIsManuallyExpanded(false);
        } else if (isPeekMode && isManuallyExpanded && isDown && (currentScrollY - lastScrollYRef.current > 6)) {
          // User was manually expanded and scrolled DOWN again — collapse back!
          setIsManuallyExpanded(false);
        }
      }

      lastScrollYRef.current = currentScrollY;
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isPeekMode, isManuallyExpanded]);

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '#') return false;
    
    if (pathname === href || pathname.startsWith(href + '/')) {
      const isOverridden = navLinks.some(l => 
        l.href !== '/' && 
        l.href !== '#' && 
        l.href !== href && 
        l.href.length > href.length && 
        (pathname === l.href || pathname.startsWith(l.href + '/'))
      );
      return !isOverridden;
    }
    return false;
  };

  if (pathname?.startsWith('/superadmin')) return null;

  const isHeaderExpanded = !isPeekMode || isManuallyExpanded;

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[100] transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        {/* ── Collapsible "Peek" Header Strip: visible when scrolled down ── */}
        <div
          className={`w-full bg-gradient-to-r from-[#0B2545] via-[#123B6D] to-[#0B2545] text-white border-b-2 border-[#D4A017]/70 px-3 md:px-6 lg:px-12 flex items-center justify-between transition-all duration-300 overflow-hidden ${
            isPeekMode
              ? 'h-[52px] py-1.5 opacity-100 pointer-events-auto'
              : 'h-0 py-0 opacity-0 pointer-events-none border-b-0'
          } ${isManuallyExpanded ? 'rounded-b-none shadow-md' : 'rounded-b-2xl shadow-xl shadow-slate-900/15'}`}
          aria-hidden={!isPeekMode}
        >
          {/* Left: Mini College Brand */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <img src="/mcclogo.png" alt="MCC Logo" className="w-7 h-7 md:w-8 md:h-8 object-contain drop-shadow" />
              <span className="font-extrabold text-xs md:text-sm tracking-wide text-white whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-1.5">
                <span className="font-bold">MULUND COLLEGE OF COMMERCE</span>
                <span className="text-amber-300/90 text-xs font-medium">(AUTONOMOUS)</span>
              </span>
            </Link>
          </div>

          {/* Center/Right: Interactive Expand / Collapse Toggle Pill Button */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsManuallyExpanded(!isManuallyExpanded)}
              className={`font-extrabold text-xs px-3.5 md:px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
                isManuallyExpanded
                  ? 'bg-amber-400 text-[#0B2545] border-amber-300 hover:bg-amber-300'
                  : 'bg-[#D4A017] text-[#0B2545] border-amber-300 hover:bg-amber-400'
              }`}
              title={isManuallyExpanded ? "Collapse full header" : "Expand full header & navigation"}
            >
              <span className="text-[11px] md:text-xs">
                {isManuallyExpanded ? "Collapse Header" : "Header & Links"}
              </span>
              {isManuallyExpanded ? (
                <ChevronUp size={16} className="stroke-[3] text-[#0B2545] transition-transform duration-300" />
              ) : (
                <ChevronDown size={16} className="stroke-[3] text-[#0B2545] transition-transform duration-300 animate-bounce" />
              )}
            </button>

            {/* Right: Quick Action Items */}
            <div className="flex items-center gap-2 md:gap-2.5">
              <Link
                href="/admission"
                className="hidden sm:inline-flex items-center justify-center h-7 px-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-[11px] shadow-sm hover:scale-105 transition-all"
              >
                Admission
              </Link>

              <Link
                href="/search"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105"
                title="Search"
              >
                <Search size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Full 3-Layer Header: collapses via max-height when in peek mode ── */}
        <div
          className={`w-full transition-all duration-500 ease-in-out ${
            isHeaderExpanded ? 'max-h-[1200px] opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="w-full flex flex-col bg-white/95 backdrop-blur-xl">
              {/* ── Layer 1: Top Quick Links Bar ── */}
              <div className="hidden md:flex w-full bg-[#0B2545] text-white/90 border-b border-[#D4A017]/20 text-[11px] xl:text-[12px] py-1 px-4 lg:px-12 items-center justify-between relative z-[160]">
                <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
                  <span className="font-bold text-[#D4A017] tracking-wider uppercase text-[10px] xl:text-[11px]">Quick Links:</span>
                  <Link href="/notices" className="hover:text-amber-300 transition-colors font-medium">Notice</Link>
                  <span className="text-white/30">|</span>
                  <Link href="/placement-portal" className="hover:text-amber-300 transition-colors font-medium">Placement</Link>
                  <span className="text-white/30">|</span>
                  <Link href="/administrative-service" className="hover:text-amber-300 transition-colors font-medium">Admin Services</Link>
                  <span className="text-white/30">|</span>
                  <Link href="/alumni" className="hover:text-amber-300 transition-colors font-medium">Alumni</Link>
                  <span className="text-white/30">|</span>
                  <Link href="/rti" className="hover:text-amber-300 transition-colors font-medium">RTI</Link>
                  <span className="text-white/30">|</span>

                  {/* Faculty Log In Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => { setFacultyDropOpen(!facultyDropOpen); setStudentDropOpen(false); setTranslateDropOpen(false); setAccessibilityOpen(false); }}
                      className="flex items-center gap-1 font-semibold text-amber-200 hover:text-white transition-colors"
                    >
                      Faculty Log In
                      <ChevronDown size={13} className={`transition-transform duration-200 ${facultyDropOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {facultyDropOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute left-0 mt-1 w-44 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 z-[210]"
                        >
                          <Link href="/faculty-login" onClick={() => setFacultyDropOpen(false)} className="block px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-50 hover:text-[#123B6D]">Faculty Portal</Link>
                          <Link href="/faculty" onClick={() => setFacultyDropOpen(false)} className="block px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-50 hover:text-[#123B6D]">Faculty Directory</Link>
                          <a href="#" onClick={() => setFacultyDropOpen(false)} className="block px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-50 hover:text-[#123B6D]">Academic Attendance</a>
                          <a href="#" onClick={() => setFacultyDropOpen(false)} className="block px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-50 hover:text-[#123B6D]">LMS Portal</a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <span className="text-white/30">|</span>

                  {/* Student Log In Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => { setStudentDropOpen(!studentDropOpen); setFacultyDropOpen(false); setTranslateDropOpen(false); setAccessibilityOpen(false); }}
                      className="flex items-center gap-1 font-semibold text-amber-200 hover:text-white transition-colors"
                    >
                      Student Log In
                      <ChevronDown size={13} className={`transition-transform duration-200 ${studentDropOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {studentDropOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute left-0 mt-1 w-48 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 z-[210]"
                        >
                          <Link href="/student-login" onClick={() => setStudentDropOpen(false)} className="block px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-50 hover:text-[#123B6D]">Student ERP Portal</Link>
                          <Link href="/examination" onClick={() => setStudentDropOpen(false)} className="block px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-50 hover:text-[#123B6D]">Examination & Results</Link>
                          <Link href="/library" onClick={() => setStudentDropOpen(false)} className="block px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-50 hover:text-[#123B6D]">Digital Library</Link>
                          <a href="#" onClick={() => setStudentDropOpen(false)} className="block px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-50 hover:text-[#123B6D]">Fee Payment & Receipts</a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Utilities: Accessibility & Translate + Collapse Toggle */}
                <div className="flex items-center gap-3 lg:gap-5">
                  {/* Accessibility Widget */}
                  <div className="relative">
                    <button 
                      onClick={() => { setAccessibilityOpen(!accessibilityOpen); setFacultyDropOpen(false); setStudentDropOpen(false); setTranslateDropOpen(false); }}
                      className="flex items-center gap-1.5 font-medium hover:text-amber-300 transition-colors bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20 text-[11px]"
                    >
                      <Accessibility size={13} className="text-amber-300" />
                      <span>Accessibility</span>
                    </button>
                    <AnimatePresence>
                      {accessibilityOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute right-0 mt-1.5 w-60 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-200 p-3.5 z-[210]"
                        >
                          <h4 className="font-bold text-xs text-[#123B6D] mb-2 border-b pb-1">Accessibility Options</h4>
                          <div className="space-y-2 text-xs">
                            <div>
                              <p className="text-slate-500 font-medium mb-1">Text Size</p>
                              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                                <button onClick={() => setTextSize('normal')} className={`flex-1 py-1 rounded text-[11px] font-bold ${textSize === 'normal' ? 'bg-[#123B6D] text-white' : 'text-slate-700'}`}>Standard</button>
                                <button onClick={() => setTextSize('large')} className={`flex-1 py-1 rounded text-[11px] font-bold ${textSize === 'large' ? 'bg-[#123B6D] text-white' : 'text-slate-700'}`}>Large (+1)</button>
                                <button onClick={() => setTextSize('xlarge')} className={`flex-1 py-1 rounded text-[11px] font-bold ${textSize === 'xlarge' ? 'bg-[#123B6D] text-white' : 'text-slate-700'}`}>XL (+2)</button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t">
                              <span className="font-medium">High Contrast</span>
                              <button 
                                onClick={() => setHighContrast(!highContrast)} 
                                className={`w-9 h-5 rounded-full p-0.5 transition-colors ${highContrast ? 'bg-[#123B6D]' : 'bg-slate-300'}`}
                              >
                                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${highContrast ? 'translate-x-4' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Translate Page Selector */}
                  <div className="relative">
                    <button 
                      onClick={() => { setTranslateDropOpen(!translateDropOpen); setFacultyDropOpen(false); setStudentDropOpen(false); setAccessibilityOpen(false); }}
                      className="flex items-center gap-1.5 font-medium hover:text-amber-300 transition-colors text-[11px]"
                    >
                      <Globe size={13} className="text-sky-300" />
                      <span>Translate page:</span>
                      <span className="font-bold text-amber-300 flex items-center gap-0.5">
                        {selectedLang} <ChevronDown size={12} className={`transition-transform duration-200 ${translateDropOpen ? 'rotate-180' : ''}`} />
                      </span>
                    </button>
                    <AnimatePresence>
                      {translateDropOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute right-0 mt-1.5 w-36 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1 z-[210]"
                        >
                          {['English', 'मराठी (Marathi)', 'हिंदी (Hindi)'].map((lang) => (
                            <button
                              key={lang}
                              onClick={() => { setSelectedLang(lang.split(' ')[0]); setTranslateDropOpen(false); }}
                              className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors flex items-center justify-between ${selectedLang === lang.split(' ')[0] ? 'bg-blue-50 text-[#123B6D]' : 'hover:bg-slate-50'}`}
                            >
                              <span>{lang}</span>
                              {selectedLang === lang.split(' ')[0] && <span className="w-1.5 h-1.5 rounded-full bg-[#123B6D]" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Manual Collapse ↑ Button if expanded while scrolled down */}
                  {isPeekMode && isManuallyExpanded && (
                    <button
                      onClick={() => setIsManuallyExpanded(false)}
                      className="bg-amber-400 hover:bg-amber-300 text-[#0B2545] font-bold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm transition-all transform hover:scale-105"
                      title="Collapse header back to peek strip"
                    >
                      <span>Collapse</span>
                      <ChevronUp size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* ── Layer 2: College Identity & Accreditation Header ── */}
              <div className="hidden md:flex flex-col w-full relative bg-gradient-to-r from-[#F0F5FF] via-white to-[#F0F5FF] pb-0">
                <div className="w-full relative h-auto min-h-[80px] md:min-h-[90px] lg:min-h-[105px] pt-1 pb-0 bg-transparent">
                  <div className="w-full max-w-[1600px] mx-auto h-full flex items-center justify-between px-3 md:px-4 lg:px-12 relative z-[150]">
                    
                    {/* Logo + College Name */}
                    <div className="flex items-center gap-2 md:gap-3 lg:gap-5 shrink min-w-0 bg-transparent pr-2 md:pr-4 lg:pr-6">
                      <Link href="/" className="shrink-0 transition-transform hover:scale-[1.02] flex flex-col items-center justify-center gap-0.5">
                        <img src="/mcclogo.png" alt="MCC Logo" className="w-14 h-14 md:w-16 md:h-16 lg:w-[110px] lg:h-[110px] object-contain drop-shadow-sm" />
                        <span className="text-[#123B6D] font-bold text-[9px] md:text-[10px] lg:text-[13px] leading-tight whitespace-nowrap">
                          Since 1970
                        </span>
                      </Link>
                      <div className="flex flex-col items-start justify-center text-left">
                        <Link href="/" className="group block mb-1 md:mb-1.5 lg:mb-2 transition-transform hover:scale-[1.01]">
                          <span className="block text-[#123B6D] font-semibold text-[9px] md:text-[10px] lg:text-[14px] leading-tight font-[var(--font-heading)] whitespace-nowrap mb-0.5">
                            Parle Tilak Vidyalaya Association's
                          </span>
                          <span className="block text-[#123B6D] font-bold text-[13px] md:text-[15px] lg:text-[24px] leading-tight font-[var(--font-heading)] whitespace-nowrap tracking-wide mb-0.5 group-hover:text-blue-900 transition-colors flex items-baseline gap-2">
                            MULUND COLLEGE OF COMMERCE <span className="text-[#D4A017]">(AUTONOMOUS)</span>
                          </span>
                          <span className="block text-[#64748B] font-medium text-[9px] md:text-[10px] lg:text-[13px] leading-tight whitespace-nowrap">
                            || आ नो भद्राः क्रतवो यन्तु विश्वतः ||
                          </span>
                        </Link>

                        {/* Badges Bar */}
                        <div className="relative mt-0.5 lg:mt-1 py-0.5 pl-2 -ml-2 z-30">
                          <div className="hidden md:flex flex-nowrap items-center gap-1 xl:gap-2 w-max">
                            <div className="flex items-center gap-1 xl:gap-1.5">
                              <Building2 className="text-[#D4A017] w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-4.5" />
                              <span className="text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-[#123B6D] leading-tight flex flex-col">
                                <span>Aided</span>
                                <span>PG College</span>
                              </span>
                            </div>
                            <div className="w-[1px] h-4 lg:h-6 bg-[#D4A017]/40"></div>
                            
                            <div className="flex items-center gap-1 xl:gap-1.5">
                              <ShieldCheck className="text-[#D4A017] w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-4.5" />
                              <span className="text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-[#123B6D] leading-tight flex flex-col">
                                <span>UGC 2(f) and</span>
                                <span>12 (B) certified</span>
                              </span>
                            </div>
                            <div className="w-[1px] h-4 lg:h-6 bg-[#D4A017]/40"></div>
                            
                            <div className="flex items-center gap-1 xl:gap-1.5">
                              <Landmark className="text-[#D4A017] w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-4.5" />
                              <span className="text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-[#123B6D] leading-tight flex flex-col">
                                <span>Affiliated to</span>
                                <span>University of Mumbai</span>
                              </span>
                            </div>
                            <div className="w-[1px] h-4 lg:h-6 bg-[#D4A017]/40"></div>
                            
                            <div className="flex items-center gap-1 xl:gap-1.5">
                              <Award className="text-[#D4A017] w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-4.5" />
                              <span className="text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-[#123B6D] leading-tight flex flex-col">
                                <span>NAAC Accredited</span>
                                <span>A Grade - III Cycle (2016-2026)</span>
                              </span>
                            </div>
                            <div className="w-[1px] h-4 lg:h-6 bg-[#D4A017]/40"></div>

                            <div className="flex items-center gap-1 xl:gap-1.5 pr-2 lg:pr-12">
                              <Star className="text-[#D4A017] w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-4.5" />
                              <span className="text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-[#123B6D] leading-tight flex flex-col">
                                <span>SQAAF Accreditation</span>
                                <span>A+ Grade</span>
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-1.5 md:gap-2 lg:gap-5 shrink-0 ml-auto">
                      
                      {/* Visitors Count Badge */}
                      <div className="hidden xl:flex flex-col items-end gap-1 w-max">
                        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                          <Users size={13} className="text-[#123B6D]" />
                          <span className="text-[11px] font-bold text-[#123B6D]">Visitors: {visitorCount.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Trust Logo */}
                      <a
                        href="https://www.parletilakvidyalayaassociation.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden xl:flex shrink-0 transition-transform hover:scale-105"
                        title="Parle Tilak Vidyalaya Association"
                      >
                        <img
                          src="/trustlogo.png"
                          alt="Parle Tilak Vidyalaya Association Logo"
                          className="h-12 xl:h-15 2xl:h-18 w-auto object-contain drop-shadow-sm"
                        />
                      </a>

                      {/* Admission Button, Search & Notification Bell */}
                      <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3 shrink-0">
                        <Link
                          href="/admission"
                          className="hidden md:flex items-center justify-center h-8 md:h-9 lg:h-10 px-4 lg:px-6 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-[10px] md:text-xs lg:text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all"
                        >
                          Admission
                        </Link>

                        <Link
                          href="/search"
                          className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#123B6D] hover:bg-slate-50 hover:scale-105 transition-all"
                          title="Search Website"
                        >
                          <Search size={16} strokeWidth={1.5} className="md:w-4 md:h-4 lg:w-5 lg:h-5" />
                        </Link>

                        <div className="relative">
                          <button
                            className={`w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center hover:bg-slate-50 hover:scale-105 transition-all relative ${hasUnread ? '' : 'text-[#123B6D]'}`}
                            onClick={() => {
                              const opening = !noticesOpen;
                              setNoticesOpen(opening);
                              if (opening) fetchLiveNotices();
                            }}
                            title="Notifications"
                          >
                            <motion.div
                              animate={(hasUnread || isShaking) ? {
                                rotate: [0, -30, 30, -20, 20, -10, 10, 0],
                                scale: [1, 1.2, 1.2, 1],
                                color: ['#ef4444', '#ef4444', '#123B6D'],
                              } : { color: 'currentColor', rotate: 0, scale: 1 }}
                              transition={{ 
                                repeat: (hasUnread || isShaking) ? Infinity : 0, 
                                repeatDelay: 1.5,
                                duration: 1, 
                                ease: 'easeInOut' 
                              }}
                              style={{ transformOrigin: 'top center' }}
                            >
                              <Bell size={16} strokeWidth={1.5} className="md:w-4 md:h-4 lg:w-5 lg:h-5" />
                            </motion.div>
                            {(hasUnread || isShaking) && (
                              <span className="absolute top-[8px] right-[8px] w-2.5 h-2.5 bg-red-500 rounded-full border-[1.5px] border-white animate-pulse shadow-sm" />
                            )}
                          </button>

                          {/* Notifications dropdown */}
                          <AnimatePresence>
                            {noticesOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden z-[200] origin-top-right"
                              >
                                <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50">
                                  <h3 className="font-bold text-[#1E293B] text-sm">Notifications</h3>
                                  <div className="flex items-center gap-3">
                                    <Link href="/notices" onClick={() => setNoticesOpen(false)} className="text-xs text-[#123B6D] font-semibold hover:underline">
                                      View All
                                    </Link>
                                    <button onClick={() => setNoticesOpen(false)} className="text-gray-400 hover:text-[#123B6D] transition-colors p-1 -mr-1">
                                      <X size={16} />
                                    </button>
                                  </div>
                                </div>
                                <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                                  {fetchingNotices ? (
                                    <div className="p-6 text-center text-sm text-gray-400">Loading...</div>
                                  ) : liveNotices.length === 0 ? (
                                    <div className="p-6 text-center text-sm text-gray-400">No active notices</div>
                                  ) : (
                                    liveNotices.map((n) => {
                                      const timeAgo = (() => {
                                        const diff = Date.now() - new Date(n.schedule_time).getTime();
                                        const h = Math.floor(diff / 3600000);
                                        const d = Math.floor(diff / 86400000);
                                        return d > 0 ? `${d} day${d > 1 ? 's' : ''} ago` : h > 0 ? `${h} hour${h > 1 ? 's' : ''} ago` : 'Just now';
                                      })();
                                      const isExam = n.categories?.includes('Examinations');
                                      const href = isExam ? '/examination#timetables' : '/notices';
                                      return (
                                        <Link
                                          href={href}
                                          key={n.id}
                                          onClick={() => setNoticesOpen(false)}
                                          className="block p-4 border-b border-[#E2E8F0] hover:bg-slate-50 transition-colors"
                                        >
                                          <p className="text-sm font-semibold text-[#1E293B] mb-1 leading-tight">{n.title}</p>
                                          
                                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                            <p className="text-xs text-[#64748B]">{timeAgo}</p>
                                            
                                            {n.categories && n.categories.length > 0 && (
                                              <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                                                {n.categories[0]}{n.categories.length > 1 ? ` +${n.categories.length - 1}` : ''}
                                              </span>
                                            )}
                                            {n.courses && n.courses.length > 0 && (
                                              <span className="text-[10px] font-medium bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">
                                                {n.courses[0].toUpperCase().replace('-', '')}{n.courses.length > 1 ? ` +${n.courses.length - 1}` : ''}
                                              </span>
                                            )}
                                            {n.attachments && n.attachments.length > 0 && (() => {
                                              const hasPdf = n.attachments.some(a => a.type === 'pdf' || a.type === 'doc' || a.type === 'docx');
                                              const hasImage = n.attachments.some(a => ['png', 'jpg', 'jpeg', 'webp'].includes(a.type));
                                              return (
                                                <span className="flex items-center gap-1">
                                                  {hasPdf && (
                                                    <span className="flex items-center gap-0.5 text-[10px] font-medium bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100">
                                                      <FileText size={10} /> PDF
                                                    </span>
                                                  )}
                                                  {hasImage && (
                                                    <span className="flex items-center gap-0.5 text-[10px] font-medium bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded border border-purple-100">
                                                      <ImageIcon size={10} /> Image
                                                    </span>
                                                  )}
                                                </span>
                                              );
                                            })()}
                                          </div>
                                        </Link>
                                      );
                                    })
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>


        {/* ── Row 2 (desktop): Nav Links ── */}
        <div className="flex w-full max-w-[1600px] mx-auto items-center justify-center px-1 md:px-2 lg:px-8 relative z-[50]">
          <Link
            href="/admission"
            className="hidden md:flex absolute right-4 lg:right-12 bottom-full translate-y-1 items-center justify-center h-8 md:h-9 lg:h-10 px-4 lg:px-8 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-[10px] md:text-xs lg:text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            Admission
          </Link>
          <nav className="flex items-center justify-center flex-wrap gap-0 md:gap-0.5 xl:gap-1 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#E2E8F0] rounded-2xl px-0.5 md:px-1 xl:px-2 py-0.5 md:py-1 xl:py-1.5">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group shrink-0" onMouseEnter={(e) => handleMenuEnter(e, link.label)}>
                {link.sub ? (
                  <Link
                    href={link.href}
                    className={`flex items-center gap-0.5 xl:gap-1.5 px-1 md:px-1.5 lg:px-3 xl:px-4 py-1 md:py-1.5 lg:py-2.5 text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] font-semibold rounded-xl transition-all whitespace-nowrap ${
                      isLinkActive(link.href)
                        ? 'bg-[#123B6D] text-white shadow-md' 
                        : 'text-[#1E293B] hover:text-[#123B6D] hover:bg-[#123B6D]/5'
                    }`}
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`${isLinkActive(link.href) ? 'text-white/80 group-hover:text-white' : 'text-[#94A3B8] group-hover:text-[#123B6D]'} ml-0.5 transition-colors`} />
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center gap-0.5 xl:gap-2 px-1 md:px-1.5 lg:px-4 xl:px-5 py-1 md:py-1.5 lg:py-2.5 text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] font-semibold rounded-xl transition-all whitespace-nowrap ${
                      isLinkActive(link.href)
                        ? 'bg-[#123B6D] text-white shadow-md' 
                        : 'text-[#1E293B] hover:text-[#123B6D] hover:bg-[#123B6D]/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
                {(link as any).isMegaMenu && (link as any).megaMenuColumns && !(link as any).megaMenuType && (
                  <div
                    className={`absolute top-full pt-2 hidden group-hover:block z-[100] ${((link as any).megaMenuColumns.reduce((a: number, c: any) => a + (c.colSpan || 1), 0)) > 4 ? 'w-[1200px]' : ((link as any).megaMenuColumns.reduce((a: number, c: any) => a + (c.colSpan || 1), 0)) > 3 ? 'w-[1100px]' : 'w-[900px]'} ${(link as any).megaMenuAlign === 'right' ? 'right-0' : (link as any).megaMenuAlign === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2'}`}
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-3xl shadow-2xl overflow-hidden min-h-[400px]">
                      <div className={`w-full p-8 grid gap-6 relative z-10 ${((link as any).megaMenuColumns.reduce((a: number, c: any) => a + (c.colSpan || 1), 0)) === 5 ? 'grid-cols-5' : ((link as any).megaMenuColumns.reduce((a: number, c: any) => a + (c.colSpan || 1), 0)) === 4 ? 'grid-cols-4' : ((link as any).megaMenuColumns.reduce((a: number, c: any) => a + (c.colSpan || 1), 0)) === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {(link as any).megaMenuColumns.map((col: any, idx: number) => (
                          <div key={idx} className={col.colSpan === 2 ? "col-span-2" : ""}>
                            <h4 className={`font-bold text-[#123B6D] mb-4 text-[18px] leading-snug border-b border-[#E2E8F0] pb-3 text-center`}>
                              {col.title.includes('(') ? (
                                <>
                                  <span className="block">{col.title.substring(0, col.title.indexOf('(')).trim()}</span>
                                  <span className="block text-[14px] text-[#3B6FAD]">{col.title.substring(col.title.indexOf('('))}</span>
                                </>
                              ) : col.title}
                            </h4>
                            <div className={col.colSpan === 2 ? "columns-2 gap-6" : "space-y-4"}>
                              {col.sections.map((sec: any, sidx: number) => (
                                <div key={sidx} className={col.colSpan === 2 ? "break-inside-avoid mb-6" : ""}>
                                  {sec.subTitle && (sec.subTitleHighlight ? (
                                    <p className="font-medium text-[#1E293B] text-[15px] mb-2 flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full shrink-0"></span>
                                      {sec.subTitle}
                                    </p>
                                  ) : (
                                    <h5 className="font-bold text-[#123B6D] text-[15px] mb-2">{sec.subTitle}</h5>
                                  ))}
                                    <ul className="space-y-2.5">
                                      {sec.links.map((clink: any) => (
                                        <li key={clink.label}>
                                          <Link href={clink.href} className={`text-[15px] transition-colors flex items-start gap-2 leading-tight font-medium text-[#1E293B] hover:text-[#123B6D]`}>
                                            <span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full shrink-0 mt-1"></span>
                                            <span>{formatCourseLabel(clink.label)}</span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                                  {(link as any).isMegaMenu && (link as any).megaMenuType === 'programmes' && (
                  <div
                    className={`absolute top-full pt-2 hidden group-hover:block z-[100] w-[1100px] max-w-[95vw] left-1/2 -translate-x-1/2`}
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                     <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex p-6 pb-8">
                           {/* Left Side: UNDERGRADUATE */}
                           <div className="w-[55%] border-r border-[#E2E8F0] pr-6">
                              <h3 className="font-bold text-[#123B6D] text-[20px] text-center mb-6">Undergraduate</h3>
                              
                              <div className="grid grid-cols-2 gap-6">
                                 {/* Col 1 */}
                                 <div>
                                    <h4 className="font-bold text-[#3B6FAD] mb-3 text-[17px]">Commerce</h4>
                                    <ul className="space-y-2.5 mb-6">
                                       <li><Link href="/programmes/ug/bcom" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><strong>B.COM</strong></Link></li>
                                       <li><Link href="/programmes/ug/baf" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>B.COM</strong> (Accounting &amp; Finance)</span></Link></li>
                                       <li><Link href="/programmes/ug/bbi" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>B.COM</strong> (Banking &amp; Insurance)</span></Link></li>
                                       <li><Link href="/programmes/ug/bfm" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>B.COM</strong> (Financial Markets)</span></Link></li>
                                    </ul>
                                    
                                    <h4 className="font-bold text-[#3B6FAD] mb-3 text-[17px]">Business &amp; Management</h4>
                                    <ul className="space-y-2.5">
                                       <li><Link href="/programmes/ug/bcom-ms" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>B.COM</strong> (Management Studies)</span></Link></li>
                                       <li><Link href="/programmes/ug/bcom-ba" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>B.COM</strong> (Business Administration)</span></Link></li>
                                    </ul>
                                 </div>
                                 
                                 {/* Col 2 */}
                                 <div>
                                    <h4 className="font-bold text-[#3B6FAD] mb-3 text-[17px]">Science</h4>
                                    <ul className="space-y-2.5 mb-6">
                                       <li><Link href="/programmes/ug/sct/bsc-cs" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>B.SC.</strong> (Computer Science)</span></Link></li>
                                       <li><Link href="/programmes/ug/sct/bsc-it" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>B.SC.</strong> (Information Technology)</span></Link></li>
                                       <li><Link href="/programmes/ug/sct/bsc-ds" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>B.SC.</strong> (Data Science)</span></Link></li>
                                       <li><Link href="/programmes/ug/sct/bsc-ca" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>B.SC.</strong> (Computer Applications)</span></Link></li>
                                    </ul>
                                    
                                    <h4 className="font-bold text-[#3B6FAD] mb-3 text-[17px]">Arts</h4>
                                    <ul className="space-y-2.5 mb-6">
                                       <li><Link href="/programmes/ug/bammc" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span className="flex flex-col"><strong>BAMMC</strong> <span className="text-[13px] text-[#64748B] -mt-0.5 leading-snug">(Mass Media &amp; Communication)</span></span></Link></li>
                                    </ul>
                                    
                                    <h4 className="font-bold text-[#3B6FAD] mb-3 text-[17px]">Apprenticeship</h4>
                                    <ul className="space-y-2.5">
                                       <li><Link href="/programmes/ug/bfsi" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>B.COM BFSI</strong> (Banking, Financial Services and Insurance)</span></Link></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                           
                           {/* Middle Side: POSTGRADUATE */}
                           <div className="w-[25%] border-r border-[#E2E8F0] px-6">
                              <h3 className="font-bold text-[#123B6D] text-[20px] text-center mb-6">Postgraduate</h3>
                              
                              <div>
                                 <h4 className="font-bold text-[#3B6FAD] mb-3 text-[17px]">Commerce</h4>
                                 <ul className="space-y-4 mb-6">
                                    <li><Link href="/programmes/pg/mcom-aa" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span className="flex flex-col"><strong>M.COM.</strong> <span className="text-[13px] text-[#64748B] -mt-0.5 leading-snug">(Advanced Accountancy)</span></span></Link></li>
                                    <li><Link href="/programmes/pg/mcom-bm" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span className="flex flex-col"><strong>M.COM.</strong> <span className="text-[13px] text-[#64748B] -mt-0.5 leading-snug">(Business Management)</span></span></Link></li>
                                    <li><Link href="/programmes/pg/mcom-bf" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>M.COM.</strong> (Banking &amp; Finance)</span></Link></li>
                                 </ul>
                              </div>
                              <div>
                                 <h4 className="font-bold text-[#3B6FAD] mb-3 text-[17px]">Science</h4>
                                 <ul className="space-y-4">
                                    <li><Link href="/programmes/pg/msc-it" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span className="flex flex-col"><strong>M.SC.</strong> <span className="text-[13px] text-[#64748B] -mt-0.5 leading-snug">(Information Technology)</span></span></Link></li>
                                    <li><Link href="/programmes/pg/msf" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>M.SC.</strong> (Finance)</span></Link></li>
                                 </ul>
                              </div>
                           </div>
                           
                           {/* Right Side: PH.D. */}
                           <div className="w-[20%] pl-6">
                              <h3 className="font-bold text-[#123B6D] text-[20px] text-center mb-6">Ph.D.</h3>
                              <div>
                                 <ul className="space-y-2.5">
                                    <li><Link href="/programmes/phd/be" className="text-[15px] font-medium text-[#475569] hover:text-[#123B6D] flex items-start gap-2 leading-snug"><span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full mt-1.5 shrink-0"></span><span><strong>Commerce</strong> (Specialisation in Business Economics)</span></Link></li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                        {/* Explore all bottom bar */}
                        <Link href="/programmes" className="bg-[#E2E8F0]/30 px-6 py-4 flex justify-center items-center gap-2 text-[#123B6D] font-bold text-[16px] hover:bg-[#E2E8F0]/50 transition-colors border-t border-[#E2E8F0] group/btn">
                           Explore all Programmes <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                     </div>
                  </div>
                )}
                {!(link as any).isMegaMenu && link.sub && (
                  <div
                    className={`absolute top-full pt-2 hidden group-hover:block min-w-[200px] z-[100] ${menuDirection[link.label] === 'left' ? 'right-0' : 'left-0'}`}
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    <div className="bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-xl py-2">
                      {(link as any).sub.map((s: any) => (
                        s.sub ? (
                          <div key={s.label} className="relative w-full group/nested" onMouseEnter={(e) => handleMenuEnter(e, s.label)}>
                            <Link href={s.href} className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#1E293B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors cursor-pointer">
                              {s.label}
                              <ChevronDown size={14} className={`text-[#94A3B8] transition-transform ${menuDirection[s.label] === 'left' ? 'rotate-90' : '-rotate-90'}`} />
                            </Link>
                            <div className={`absolute top-0 hidden group-hover/nested:block min-w-[200px] z-[100] ${menuDirection[s.label] === 'left' ? 'right-full pr-1' : 'left-full pl-1'}`}>
                              <div className="bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-xl py-1">
                                {(s as any).sub.map((ss: any, idx: number) => (
                                  (ss.sub) ? (
                                    <div key={ss.label + idx} className="relative w-full group/nested-3" onMouseEnter={(e) => handleMenuEnter(e, ss.label)}>
                                      <Link href={ss.href} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors cursor-pointer">
                                        {ss.label}
                                        <ChevronDown size={14} className={`text-[#94A3B8] transition-transform ${menuDirection[ss.label] === 'left' ? 'rotate-90' : '-rotate-90'}`} />
                                      </Link>
                                      <div className={`absolute top-0 hidden group-hover/nested-3:block min-w-[200px] z-10 ${menuDirection[ss.label] === 'left' ? 'right-full pr-1' : 'left-full pl-1'}`}>
                                        <div className="bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden py-1">
                                          {(ss.sub as any[]).map((sss: any, sssIdx: number) => (
                                            <Link key={sss.label + sssIdx} href={sss.href} className="block px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors">
                                              {sss.label}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <Link key={ss.label + idx} href={ss.href} className="block px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors">
                                      {ss.label}
                                    </Link>
                                  )
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={s.label}
                            href={s.href}
                            className="flex items-center px-4 py-3 text-sm text-[#1E293B] hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                          >
                            {s.label}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

      {/* ── Mobile Top Bar (logo + hamburger) ── */}
      <div className="md:hidden flex w-full items-center justify-between px-4 h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/mcclogo.png" alt="MCC Logo" className="w-10 h-10 object-contain" />
            <div className="flex flex-col items-start justify-center text-left">
              <span className="text-[#123B6D] font-semibold text-[8px] sm:text-[9px] leading-tight font-[var(--font-heading)] whitespace-nowrap">Parle Tilak Vidyalaya Association's</span>
              <span className="text-[#123B6D] font-bold text-[10px] sm:text-[11px] leading-tight font-[var(--font-heading)] uppercase">
                Mulund College of Commerce <br /> Autonomous
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/search" className="w-9 h-9 rounded-full flex items-center justify-center text-[#123B6D] hover:bg-[#123B6D]/10 transition-colors">
              <Search size={18} />
            </Link>
            <div className="relative">
              <button
                className={`w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors relative ${hasUnread ? '' : 'text-[#123B6D]'}`}
                onClick={() => {
                  setNoticesOpen(!noticesOpen);
                  if (hasUnread) setHasUnread(false);
                }}
              >
                <motion.div
                  animate={hasUnread ? {
                    rotate: [0, -20, 20, -20, 20, 0],
                    color: ['#ef4444', '#eab308', '#ef4444'],
                  } : { color: 'currentColor' }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'top center' }}
                >
                  <Bell size={18} />
                </motion.div>
                {hasUnread && (
                  <span className="absolute top-[6px] right-[6px] w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              <AnimatePresence>
                {noticesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full -right-12 mt-2 w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden z-50 origin-top-right"
                  >
                    <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50">
                      <h3 className="font-bold text-[#1E293B] text-sm">Notifications</h3>
                      <div className="flex items-center gap-3">
                        <Link href="/notices" onClick={() => setNoticesOpen(false)} className="text-xs text-[#123B6D] font-semibold hover:underline">
                          View All
                        </Link>
                        <button onClick={() => setNoticesOpen(false)} className="text-gray-400 hover:text-[#123B6D] transition-colors p-1 -mr-1">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                      {fetchingNotices ? (
                        <div className="p-6 text-center text-sm text-gray-400">Loading...</div>
                      ) : liveNotices.length === 0 ? (
                        <div className="p-6 text-center text-sm text-gray-400">No active notices</div>
                      ) : (
                        liveNotices.map((n) => {
                          const timeAgo = (() => {
                            const diff = Date.now() - new Date(n.schedule_time).getTime();
                            const h = Math.floor(diff / 3600000);
                            const d = Math.floor(diff / 86400000);
                            return d > 0 ? `${d} day${d > 1 ? 's' : ''} ago` : h > 0 ? `${h} hour${h > 1 ? 's' : ''} ago` : 'Just now';
                          })();
                            const isExam = n.categories?.includes('Examinations');
                            const href = isExam ? '/examination#timetables' : '/notices';
                            return (
                              <Link
                                href={href}
                                key={n.id}
                                onClick={() => setNoticesOpen(false)}
                                className="block p-4 border-b border-[#E2E8F0] hover:bg-slate-50 transition-colors"
                              >
                              <div className="flex justify-between items-start gap-2">
                                <p className="text-sm font-semibold text-[#1E293B] mb-1 leading-tight">{n.title}</p>
                              </div>
                              <p className="text-xs text-[#64748B]">{timeAgo}</p>
                            </Link>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#123B6D] hover:bg-[#123B6D]/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>{/* end right flex div */}
        </div>{/* end mobile top bar div */}
      </div>{/* end inner bg-white div */}
    </div>{/* end overflow-hidden wrapper */}
  </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-[120] bg-white shadow-2xl overflow-y-auto flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <img src="/mcclogo.png" alt="MCC Logo" className="w-12 h-12 object-contain" />
                  <span className="text-[#123B6D] font-bold text-sm">Menu</span>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E293B] hover:bg-[#123B6D]/5"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 px-4 py-4 space-y-1">
                {/* Mobile Quick Links */}
                <div className="flex flex-wrap items-center gap-3 pb-4 mb-2 border-b border-[#E2E8F0]">
                  <Link href="/notices" className="text-[11px] font-semibold text-[#475569] hover:text-[#123B6D] transition-colors" onClick={() => setMobileOpen(false)}>Notice</Link>
                  <Link href="/placement-portal" className="text-[11px] font-semibold text-[#475569] hover:text-[#123B6D] transition-colors" onClick={() => setMobileOpen(false)}>Placement</Link>
                  <Link href="/administrative-service" className="text-[11px] font-semibold text-[#475569] hover:text-[#123B6D] transition-colors" onClick={() => setMobileOpen(false)}>Admin Services</Link>
                  <Link href="/alumni" className="text-[11px] font-semibold text-[#475569] hover:text-[#123B6D] transition-colors" onClick={() => setMobileOpen(false)}>Alumni</Link>
                  <Link href="/rti" className="text-[11px] font-semibold text-[#475569] hover:text-[#123B6D] transition-colors" onClick={() => setMobileOpen(false)}>RTI</Link>
                </div>
              {navLinks.map((link) => (
                <div key={link.label}>
                  {(link.mobileSub || link.sub) ? (
                    <div className="flex items-center w-full rounded-xl hover:bg-[#123B6D]/5 transition-colors">
                      <Link 
                        href={link.href || '#'}
                        className="flex-1 px-4 py-3 text-[#1E293B] font-medium hover:text-[#123B6D] transition-colors text-left"
                        onClick={() => {
                          if (link.href && link.href !== '#') setMobileOpen(false);
                          else setMobileOpenDrop(mobileOpenDrop === link.label ? null : link.label);
                        }}
                      >
                        {link.label}
                      </Link>
                      <button
                        className="px-4 py-3 text-[#1E293B] hover:text-[#123B6D]"
                        onClick={() => setMobileOpenDrop(mobileOpenDrop === link.label ? null : link.label)}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 shrink-0 ${mobileOpenDrop === link.label ? 'rotate-180 text-[#123B6D]' : ''}`}
                        />
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-[#1E293B] font-medium rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                  <AnimatePresence>
                    {(link.mobileSub || link.sub) && mobileOpenDrop === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 space-y-1 py-1 border-l-2 border-[#EBF3FF] pl-2">
                          {((link as any).mobileSub || (link as any).sub).map((s: any) => (
                            s.sub ? (
                              <div key={s.label}>
                                <button
                                  className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-[#123B6D] hover:bg-[#123B6D]/5 rounded-xl transition-colors text-left"
                                  onClick={() => setNestedMobileDrop(nestedMobileDrop === s.label ? null : s.label)}
                                >
                                  <span className="flex-1 text-left">{s.label}</span>
                                  <ChevronDown size={14} className={`transition-transform duration-200 shrink-0 ${nestedMobileDrop === s.label ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                  {nestedMobileDrop === s.label && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                      >
                                        <div className="ml-4 space-y-1 py-1 border-l-2 border-[#E2E8F0] pl-2">
                                          {(s as any).sub.map((ss: any, idx: number) => (
                                            (ss.sub) ? (
                                            <div key={ss.label + idx}>
                                              <button
                                                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-[#64748B] hover:bg-[#123B6D]/5 rounded-xl transition-colors text-left"
                                                onClick={() => setNestedMobileDrop3(nestedMobileDrop3 === ss.label ? null : ss.label)}
                                              >
                                                <span className="flex-1 text-left">{ss.label}</span>
                                                <ChevronDown size={14} className={`transition-transform duration-200 shrink-0 ${nestedMobileDrop3 === ss.label ? 'rotate-180' : ''}`} />
                                              </button>
                                              <AnimatePresence>
                                                {nestedMobileDrop3 === ss.label && (
                                                  <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                  >
                                                    <div className="ml-4 space-y-1 py-1 border-l-2 border-[#E2E8F0] pl-2">
                                                        {(ss.sub as any[]).map((sss: any, sssIdx: number) => (
                                                          <Link
                                                            key={sss.label + sssIdx}
                                                            href={sss.href}
                                                            className={`block px-4 py-2 text-sm rounded-xl transition-colors text-[#64748B] hover:bg-[#123B6D]/5 hover:text-[#123B6D]`}
                                                            onClick={() => { setMobileOpen(false); setMobileOpenDrop(null); setNestedMobileDrop(null); setNestedMobileDrop3(null); }}
                                                          >
                                                            {formatCourseLabel(sss.label)}
                                                          </Link>
                                                        ))}
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          ) : (
                                            <Link
                                              key={ss.label + idx}
                                              href={ss.href}
                                              className={`block px-4 py-2 text-sm rounded-xl transition-colors text-[#64748B] hover:bg-[#123B6D]/5 hover:text-[#123B6D]`}
                                              onClick={() => { setMobileOpen(false); setMobileOpenDrop(null); setNestedMobileDrop(null); setNestedMobileDrop3(null); }}
                                            >
                                              {formatCourseLabel(ss.label)}
                                            </Link>
                                          )
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ) : (
                              <Link
                                key={s.label}
                                href={s.href}
                                className="block px-4 py-2 text-sm text-[#64748B] rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                                onClick={() => { setMobileOpen(false); setMobileOpenDrop(null); setNestedMobileDrop(null); setNestedMobileDrop3(null); }}
                              >
                                {s.label}
                              </Link>
                            )
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
