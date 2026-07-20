'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Menu, X, ChevronDown, Home, Award, Users, GraduationCap, BookOpen, Palette, Medal, Library as LibraryIcon, LayoutGrid, Star, ShieldCheck, Landmark, Building2, ArrowRight } from 'lucide-react';

const formatCourseLabel = (label: string) => {
  if (typeof label !== 'string') return label;
  
  const isCourse = /^(Bachelor|Master|B\.Com|B\.Sc|M\.Com|M\.Sc|B\.A\.|PhD)/i.test(label);
  
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
    label: 'About Us', href: '#', icon: <Users size={18} />, sub: [
      { label: 'Vision-Mission', href: '/about/vision-mission' },
      { label: 'PTVA Trust', href: '/about/ptva-trust' },
      { label: 'Board of Trustees', href: '/about/board-of-trustees' },
      { label: "Principal's Desk", href: '/principal' },
      { label: "Vice Principal's Desk", href: '/vice-principal' },
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
          { links: [{ label: '2 B – Certificate', href: '/accreditation/2b-certificate' }, { label: '12 F – Certificate', href: '/accreditation/12f-certificate' }, { label: 'Grant of Autonomy (Certificate)', href: '/accreditation/autonomous/grant' }] }
        ]
      },
      {
        title: 'NAAC',
        sections: [
          { links: [{ label: 'Certificates of Accreditations', href: '/accreditation/naac/certificates' }] }
        ]
      },
      {
        title: 'NIRF',
        sections: [
          { links: [{ label: 'Annual Submissions', href: '/accreditation/nirf/annual-submissions' }] }
        ]
      },
      {
        title: 'AISHE',
        sections: [
          { links: [{ label: 'Annual Submissions', href: '/accreditation/aishe/annual-submissions' }] }
        ]
      }
    ],
    sub: [
      { label: '2 B – Certificate', href: '/accreditation/2b-certificate' },
      { label: '12 F – Certificate', href: '/accreditation/12f-certificate' },
      { label: 'Grant of Autonomy (Certificate)', href: '/accreditation/autonomous/grant' },
      { 
        label: 'NAAC', href: '#', sub: [
          { label: 'Certificates of Accreditations', href: '/accreditation/naac/certificates' }
        ]
      },
      {
        label: 'NIRF', href: '#', sub: [
          { label: 'Annual Submissions', href: '/accreditation/nirf/annual-submissions' }
        ]
      },
      {
        label: 'AISHE', href: '#', sub: [
          { label: 'Annual Submissions', href: '/accreditation/aishe/annual-submissions' }
        ]
      }
    ]
  },
  {
    label: 'Autonomy', href: '/accreditation/autonomous', icon: <Medal size={18} />,
    isMegaMenu: true,
    megaMenuImage: '/objectives_side_img.png',
    megaMenuColumns: [
      {
        title: 'Information',
        sections: [
          {
            links: [
              { label: 'Grant of Autonomy (Certificate)', href: '/accreditation/autonomous/grant' },
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
              { label: 'Members', href: '/accreditation/autonomous/bos/members' },
              { label: 'Minutes', href: '/accreditation/autonomous/bos/minutes' }
            ]
          },
          {
            subTitle: 'Academic Council',
            links: [
              { label: 'Members', href: '/accreditation/autonomous/academic-council/members' },
              { label: 'Minutes', href: '/accreditation/autonomous/academic-council/minutes' }
            ]
          },
          {
            subTitle: 'Finance Committee',
            links: [
              { label: 'Members', href: '/accreditation/autonomous/finance-committee/members' },
              { label: 'Minutes', href: '/accreditation/autonomous/finance-committee/minutes' }
            ]
          },
          {
            subTitle: 'Governing Body',
            links: [
              { label: 'Members', href: '/accreditation/autonomous/governing-body/members' },
              { label: 'Minutes', href: '/accreditation/autonomous/governing-body/minutes' }
            ]
          }
        ]
      }
    ],
    sub: [
      { label: 'Grant of Autonomy (Certificate)', href: '/accreditation/autonomous/grant' },
      { 
        label: 'Board of Studies', href: '#', sub: [
          { label: 'Members', href: '/accreditation/autonomous/bos/members' },
          { label: 'Minutes', href: '/accreditation/autonomous/bos/minutes' }
        ]
      },
      { 
        label: 'Academic Council', href: '#', sub: [
          { label: 'Members', href: '/accreditation/autonomous/academic-council/members' },
          { label: 'Minutes', href: '/accreditation/autonomous/academic-council/minutes' }
        ]
      },
      { 
        label: 'Finance Committee', href: '#', sub: [
          { label: 'Members', href: '/accreditation/autonomous/finance-committee/members' },
          { label: 'Minutes', href: '/accreditation/autonomous/finance-committee/minutes' }
        ]
      },
      { 
        label: 'Governing Body', href: '#', sub: [
          { label: 'Members', href: '/accreditation/autonomous/governing-body/members' },
          { label: 'Minutes', href: '/accreditation/autonomous/governing-body/minutes' }
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
              { label: 'About the IQAC', href: '/iqac#about' },
              { label: 'Quality Policy', href: '/iqac#quality-policy' },
              { label: 'Institutional policies', href: '/iqac#institutional-policies' },
              { label: 'IQAC composition -Committee Members', href: '/iqac#members' },
              { label: 'Minutes of the Meeting', href: '/iqac#minutes' },
              { label: 'Best Practices', href: '/iqac#best-practices' },
              { label: 'Institutional Distinctiveness', href: '/iqac#distinctiveness' },
              { label: 'Annual Reports', href: '/iqac#annual-reports' },
            ]
          }
        ]
      },
      {
        title: 'Reports & Initiatives',
        sections: [
          {
            links: [
              { label: 'AQAR', href: '/iqac#aqar' },
              { label: 'Academic Calendar', href: '/iqac#academic-calendar' },
              { label: 'Perspective plan', href: '/iqac#perspective-plan' },
              { label: 'Tilak Smruti Vyakhyan', href: '/iqac#tilak-lecture' },
              { label: 'B. G. Bapat Memorial Lecture', href: '/iqac#bapat-lecture' },
              { label: 'Deeksharambh', href: '/iqac#deeksharambh' },
              { label: 'Disability Sensitisation', href: '/iqac#disability' },
              { label: 'Environmental Commitments', href: '/iqac#environment' },
            ]
          }
        ]
      }
    ],
    sub: [
      { label: 'About the IQAC', href: '/iqac#about' },
      { label: 'Quality Policy', href: '/iqac#quality-policy' },
      { label: 'Institutional policies', href: '/iqac#institutional-policies' },
      { label: 'IQAC composition -Committee Members', href: '/iqac#members' },
      { label: 'Minutes of the Meeting', href: '/iqac#minutes' },
      { label: 'Best Practices', href: '/iqac#best-practices' },
      { label: 'Institutional Distinctiveness', href: '/iqac#distinctiveness' },
      { label: 'Annual Reports', href: '/iqac#annual-reports' },
      { label: 'AQAR', href: '/iqac#aqar' },
      { label: 'Academic Calendar', href: '/iqac#academic-calendar' },
      { label: 'Perspective plan', href: '/iqac#perspective-plan' },
      { label: 'Tilak Smruti Vyakhyan', href: '/iqac#tilak-lecture' },
      { label: 'B. G. Bapat Memorial Lecture', href: '/iqac#bapat-lecture' },
      { label: 'Deeksharambh', href: '/iqac#deeksharambh' },
      { label: 'Disability Sensitisation', href: '/iqac#disability' },
      { label: 'Environmental Commitments', href: '/iqac#environment' },
    ]
  },
  {
    label: 'Jr. College', href: '/junior-college-corner', icon: <BookOpen size={18} />, sub: [
      { label: "Vice Principal's Desk", href: '/jr-college/vice-principal' },
      { label: 'Teaching Staff', href: '/jr-college/teaching-staff' },
      { label: 'Result Analysis', href: '/jr-college/result-analysis' },
      { label: 'SMAF/Scholarship/Freeship', href: '/jr-college/scholarships' },
      { label: 'Notice', href: '/jr-college/notice' },
      { label: 'Timetable', href: '/jr-college/timetable' },
      { label: 'Sports', href: '/jr-college/sports' },
      { label: 'Cultural', href: '/jr-college/cultural' },
      { label: 'Committee', href: '/jr-college/committee' },
      { label: 'Special Days', href: '/jr-college/special-days' },
    ]
  },
  {
    label: 'Programmes', href: '/academics', icon: <GraduationCap size={18} />, 
    isMegaMenu: true,
    megaMenuColumns: [
      {
        title: 'AIDED',
        sections: [
          {
            subTitle: 'Undergraduate',
            links: [
              { label: 'Bachelor of Commerce', href: '/programmes/ug/bcom', isBoldBlack: true }
            ]
          },
          {
            subTitle: 'Postgraduate',
            links: [
              { label: 'Master of Commerce (Advanced Accountancy)', href: '/programmes/pg/mcom-aa', isBoldBlack: true }
            ]
          }
        ]
      },
      {
        title: 'Self-Financing (Commerce & Management)',
        colSpan: 2,
        sections: [
          {
            subTitle: 'Undergraduate (Commerce)',
            links: [
              { label: 'Bachelor of Commerce (Accounting & Finance)', href: '/programmes/ug/baf', isBoldBlack: true },
              { label: 'Bachelor of Commerce (Banking & Insurance)', href: '/programmes/ug/bbi', isBoldBlack: true },
              { label: 'Bachelor of Commerce (Financial Markets)', href: '/programmes/ug/bfm', isBoldBlack: true }
            ]
          },
          {
            subTitle: 'Undergraduate (Business & Management)',
            links: [
              { label: 'Bachelor of Commerce (Management Studies)', href: '/programmes/ug/bcom-ms', isBoldBlack: true },
              { label: 'Bachelor of Commerce (Business Administration)', href: '/programmes/ug/bcom-ba', isBoldBlack: true }
            ]
          },
          {
            subTitle: 'Apprentice Embedded (Skill Based)',
            links: [
              { label: 'Bachelor of Commerce (Banking, Financial Services and Insurance)', href: '/programmes/ug/bfsi', isBoldBlack: true }
            ]
          },
          {
            subTitle: 'Postgraduate (Commerce)',
            links: [
              { label: 'Master of Commerce (Business Management)', href: '/programmes/pg/mcom-bm', isBoldBlack: true },
              { label: 'Master of Commerce (Banking & Finance)', href: '/programmes/pg/mcom-bf', isBoldBlack: true }
            ]
          },
          {
            subTitle: 'Ph.D.',
            links: [
              { label: 'Commerce (Specialisation in Business Economics)', href: '/programmes/phd/be' }
            ]
          }
        ]
      },
      {
        title: 'Self-Financing (Science & Arts)',
        sections: [
          {
            subTitle: 'Undergraduate (Science)',
            links: [
              { label: 'Bachelor of Science (Computer Science)', href: '/programmes/ug/sct/bsc-cs' },
              { label: 'Bachelor of Science (Information Technology)', href: '/programmes/ug/sct/bsc-it' },
              { label: 'Bachelor of Science (Data Science)', href: '/programmes/ug/sct/bsc-ds' },
              { label: 'Bachelor of Science (Computer Application)', href: '/programmes/ug/sct/bsc-ca' }
            ]
          },
          {
            subTitle: 'Undergraduate (Arts)',
            links: [
              { label: 'Bachelor of Arts (Mass Media & Communication)', href: '/programmes/ug/bammc' }
            ]
          },
          {
            subTitle: 'Postgraduate',
            links: [
              { label: 'Master of Science (Information Technology)', href: '/programmes/pg/msc-it' },
              { label: 'Master of Science (Finance)', href: '/programmes/pg/msf' }
            ]
          }
        ]
      }
    ],
    sub: [
      {
        label: 'Under Graduate', href: '/programmes/undergraduate', sub: [
          { label: 'Bachelor of Commerce', href: '/programmes/ug/bcom', isBoldBlack: true },
          { label: 'B.Com (Accounting & Finance)', href: '/programmes/ug/baf', isBoldBlack: true },
          { label: 'B.Com (Banking & Insurance)', href: '/programmes/ug/bbi', isBoldBlack: true },
          { label: 'B.Com (Financial Markets)', href: '/programmes/ug/bfm', isBoldBlack: true },
          { label: 'B.Com (Management Studies)', href: '/programmes/ug/bcom-ms', isBoldBlack: true },
          { label: 'B.Com (Business Administration)', href: '/programmes/ug/bcom-ba', isBoldBlack: true },
          { label: 'B.Sc (Computer Science)', href: '/programmes/ug/sct/bsc-cs' },
          { label: 'B.Sc (Information Technology)', href: '/programmes/ug/sct/bsc-it' },
          { label: 'B.Sc (Computer Application)', href: '/programmes/ug/sct/bsc-ca' },
          { label: 'B.Sc (Data Science)', href: '/programmes/ug/sct/bsc-ds' },
          { label: 'B.Com (BFSI)', href: '/programmes/ug/bfsi', isBoldBlack: true },
          { label: 'B.A. (Mass Media & Communication)', href: '/programmes/ug/bammc' },
        ]
      },
      {
        label: 'Post Graduate', href: '/programmes/post-graduate', sub: [
          { label: 'M.Com (Advanced Accountancy)', href: '/programmes/pg/mcom-aa', isBoldBlack: true },
          { label: 'M.Com (Banking & Finance)', href: '/programmes/pg/mcom-bm', isBoldBlack: true },
          { label: 'M.Com (Business Management)', href: '/programmes/pg/mcom-bf', isBoldBlack: true },
          { label: 'M.Sc (Information Technology)', href: '/programmes/pg/msc-it' },
          { label: 'M.Sc (Finance)', href: '/programmes/pg/msf' },
        ]
      },
      {
        label: 'PHD Programmes', href: '/programmes/phd', sub: [
          { label: 'PhD (BE)', href: '/programmes/phd/be' }
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
              { label: 'About the Journal', href: '/research' },
              { label: 'Board of Editors', href: '/research' },
              { label: 'Volume and Issues', href: '/research' },
            ]
          },
          {
            links: [
              { label: 'Resources', href: '/research' },
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
          { label: 'About the Journal', href: '/research' },
          { label: 'Board of Editors', href: '/research' },
          { label: 'Volume and Issues', href: '/research' },
        ]
      },
      { label: 'Resources', href: '/research' },
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
              { label: "Students' Council", href: '/students-corner/council' },
              { label: 'National Service Scheme', href: '/students-corner/nss' },
              { label: 'Cultural Forum', href: '/students-corner/cultural-forum' },
              { label: 'Sports and Gymkhana', href: '/students-corner/sports' },
              { label: 'Natyakarmi (Theatre Group)', href: '/students-corner/natyakarmi' },
              { label: 'Marathi Vagmany Mandal', href: '/students-corner/marathi-mandal' },
              { label: 'Aaroh', href: '/students-corner/aaroh' },
              { label: 'Nature Club', href: '/students-corner/nature-club' },
              { label: 'Women Development Cell', href: '/students-corner/wdc' },
              { label: 'Entrepreneurship Development Cell', href: '/students-corner/edc' },
              { label: 'Students\u2019 Research', href: '/research' },
            ]
          }
        ]
      },
      {
        title: 'Events & Festivals',
        sections: [
          {
            links: [
              { label: 'Spectrum', href: '/students-corner/cultural-forum' },
              { label: 'Inspira', href: '/programmes/ug/bms' },
              { label: 'Technobeat', href: '#' },
              { label: 'Math\u2019s Wonder', href: '/programmes/ug/bsc-cs' },
              { label: 'Emporio', href: '/programmes/ug/bcom' },
              { label: 'Quantomania', href: '#' },
              { label: 'Rasikotsav', href: '#' },
              { label: 'My Marathi, Mai Marathi', href: '#' },
              { label: 'Annual Day', href: '#' },
            ]
          }
        ]
      },
      {
        title: "Student's Publications",
        sections: [
          {
            links: [
              { label: 'Pratibimb', href: '/programmes/ug/baf' },
              { label: 'Finanza', href: '/programmes/ug/bfm' },
              { label: 'Muse', href: '/programmes/ug/bammc' },
              { label: 'Commercium', href: '/programmes/ug/bcom' },
            ]
          }
        ]
      }
    ],
    sub: [
      {
        label: 'Forums and Clubs', href: '#', sub: [
          { label: "Students' Council", href: '/students-corner/council' },
          { label: 'National Service Scheme', href: '/students-corner/nss' },
          { label: 'Cultural Forum', href: '/students-corner/cultural-forum' },
          { label: 'Sports and Gymkhana', href: '/students-corner/sports' },
          { label: 'Natyakarmi (Theatre Group)', href: '/students-corner/natyakarmi' },
          { label: 'Marathi Vagmany Mandal', href: '/students-corner/marathi-mandal' },
          { label: 'Aaroh', href: '/students-corner/aaroh' },
          { label: 'Nature Club', href: '/students-corner/nature-club' },
          { label: 'Women Development Cell', href: '/students-corner/wdc' },
          { label: 'Entrepreneurship Development Cell', href: '/students-corner/edc' },
          { label: 'Students\u2019 Research', href: '/research' },
        ]
      },
      {
        label: 'Events & Festivals', href: '#', sub: [
          { label: 'Spectrum', href: '/students-corner/cultural-forum' },
          { label: 'Inspira', href: '/programmes/ug/bms' },
          { label: 'Technobeat', href: '#' },
          { label: 'Math\u2019s Wonder', href: '/programmes/ug/bsc-cs' },
          { label: 'Emporio', href: '/programmes/ug/bcom' },
          { label: 'Quantomania', href: '#' },
          { label: 'Rasikotsav', href: '#' },
          { label: 'My Marathi, Mai Marathi', href: '#' },
          { label: 'Annual Day', href: '#' },
        ]
      },
      {
        label: "Student's Publications", href: '#', sub: [
          { label: 'Pratibimb', href: '/programmes/ug/baf' },
          { label: 'Finanza', href: '/programmes/ug/bfm' },
          { label: 'Muse', href: '/programmes/ug/bammc' },
          { label: 'Commercium', href: '/programmes/ug/bcom' },
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
        title: 'Infrastructure',
        sections: [
          {
            links: [
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
        title: 'Gallery',
        sections: [
          {
            links: [
              { label: 'View Gallery', href: '/gallery' }
            ]
          }
        ]
      },
      {
        title: 'Statutory Bodies',
        sections: [
          {
            links: [
              { label: 'Grievance Cell', href: '/grievance-cell' },
              { label: 'Internal Complaint Committee', href: '/internal-complaint-cell' },
              { label: 'Anti-Ragging Committee', href: '/anti-ragging-cell' },
              { label: 'Counselling cell', href: '/counselling-cell' },
              { label: 'Career Katta (Govt of Maharashtra)', href: '#' },
              { label: 'Special Cell', href: '#' },
              { label: 'Remedial Coaching Cell', href: '#' },
            ]
          }
        ]
      },
      {
        title: 'Wall of Fame (Students)',
        sections: [
          {
            subTitle: 'Professional Course Examinations',
            subTitleHighlight: true,
            links: [
              { label: 'CA', href: '#' },
              { label: 'CS', href: '#' },
              { label: 'CMA', href: '#' },
            ]
          },
          {
            links: [
              { label: 'Sports & Games', href: '#' },
              { label: 'Cultural', href: '#' },
              { label: 'Theatre', href: '#' },
              { label: 'Research', href: '#' },
              { label: 'Entrepreneurship', href: '#' },
            ]
          }
        ]
      }
    ],
    sub: [
      {
        label: 'Infrastructure', href: '#', sub: [
          { label: 'Library', href: '/library' },
          { label: 'Auditorium', href: '#' },
          { label: 'Class-Rooms', href: '#' },
          { label: 'Computer Labs', href: '#' },
          { label: 'Sports & Gymkhana', href: '#' },
          { label: 'Canteen', href: '#' },
        ]
      },
      {
        label: 'Gallery', href: '/gallery', sub: []
      },
      {
        label: 'Statutory Bodies', href: '#', sub: [
          { label: 'Grievance Cell', href: '/grievance-cell' },
          { label: 'Internal Complaint Committee', href: '/internal-complaint-cell' },
          { label: 'Anti-Ragging Committee', href: '/anti-ragging-cell' },
          { label: 'Counselling cell', href: '/counselling-cell' },
          { label: 'Career Katta (Govt of Maharashtra)', href: '#' },
          { label: 'Special Cell', href: '#' },
          { label: 'Remedial Coaching Cell', href: '#' },
        ]
      },
      {
        label: 'Wall of Fame (Students)', href: '#', sub: [
          {
            label: 'Professional Course Examinations', href: '#', sub: [
              { label: 'CA', href: '#' },
              { label: 'CS', href: '#' },
              { label: 'CMA', href: '#' },
            ]
          },
          { label: 'Sports & Games', href: '#' },
          { label: 'Cultural', href: '#' },
          { label: 'Theatre', href: '#' },
          { label: 'Research', href: '#' },
          { label: 'Entrepreneurship', href: '#' },
        ]
      }
    ]
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileOpenDrop, setMobileOpenDrop] = useState<string | null>(null);
  const [nestedMobileDrop, setNestedMobileDrop] = useState<string | null>(null);
  const [nestedMobileDrop3, setNestedMobileDrop3] = useState<string | null>(null);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

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
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hide when scrolling down (past 100px), show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

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

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: visible ? 0 : -250 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-white/30'
            : 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-[#E2E8F0]'
        }`}
      >
        {/* ── Desktop Header Wrapper (Row 1 & 2) ── */}
        <div className="hidden md:flex flex-col w-full relative bg-gradient-to-r from-[#F0F5FF] to-white pb-0">
          
          {/* Background Elements Wrapper (isolated overflow) */}
          <div className="absolute inset-0 overflow-hidden z-0">



        </div>

          {/* Row 1 Content Area */}
          <div className="w-full relative h-auto min-h-[80px] md:min-h-[90px] lg:min-h-[110px] pt-1 pb-0 bg-transparent">
            <div className="w-full max-w-[1600px] mx-auto h-full flex items-center justify-between px-3 md:px-4 lg:px-12 relative z-20">
            
            {/* Logo + College Name */}
            <div className="flex items-center gap-2 md:gap-3 lg:gap-5 shrink min-w-0 bg-transparent pr-2 md:pr-4 lg:pr-6">
              <Link href="/" className="shrink-0 transition-transform hover:scale-[1.02] flex flex-col items-center justify-center gap-0.5">
                <img src="/mcclogo.png" alt="MCC Logo" className="w-14 h-14 md:w-16 md:h-16 lg:w-[120px] lg:h-[120px] object-contain drop-shadow-sm" />
                <span className="text-[#123B6D] font-bold text-[9px] md:text-[10px] lg:text-[14px] leading-tight whitespace-nowrap">
                  Since 1970
                </span>
              </Link>
              <div className="flex flex-col items-start justify-center text-left">
                <Link href="/" className="group block mb-1 md:mb-2 lg:mb-3 transition-transform hover:scale-[1.01]">
                  <span className="block text-[#123B6D] font-semibold text-[9px] md:text-[10px] lg:text-[15px] leading-tight font-[var(--font-heading)] whitespace-nowrap mb-0.5">
                    Parle Tilak Vidyalaya Association's
                  </span>
                  <span className="block text-[#123B6D] font-bold text-[13px] md:text-[15px] lg:text-[26px] leading-tight font-[var(--font-heading)] whitespace-nowrap tracking-wide mb-0.5 group-hover:text-blue-900 transition-colors flex items-baseline gap-2">
                    MULUND COLLEGE OF COMMERCE <span className="text-[#D4A017]">(AUTONOMOUS)</span>
                  </span>
                  <span className="block text-[#64748B] font-medium text-[9px] md:text-[10px] lg:text-[14px] leading-tight whitespace-nowrap">
                    || आ नो भद्राः क्रतवो यन्तु विश्वतः ||
                  </span>
                </Link>

                {/* Information Badges Bar - Single Line Responsive */}
                <div className="relative mt-0.5 lg:mt-1 py-0.5 pl-2 -ml-2 z-30">
                  
                  <div className="hidden md:flex flex-nowrap items-center gap-1 xl:gap-2 w-max">
                    <div className="flex items-center gap-1 xl:gap-1.5">
                      <Building2 className="text-[#D4A017] w-3 h-3 md:w-3.5 md:h-3.5 lg:w-5 lg:h-5" />
                      <span className="text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-[#123B6D] leading-tight flex flex-col">
                        <span>Aided</span>
                        <span>PG College</span>
                      </span>
                    </div>
                    <div className="w-[1px] h-4 lg:h-7 bg-[#D4A017]/40"></div>
                    
                    <div className="flex items-center gap-1 xl:gap-1.5">
                      <ShieldCheck className="text-[#D4A017] w-3 h-3 md:w-3.5 md:h-3.5 lg:w-5 lg:h-5" />
                      <span className="text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-[#123B6D] leading-tight flex flex-col">
                        <span>UGC 2(f) and</span>
                        <span>12 (B) certified</span>
                      </span>
                    </div>
                    <div className="w-[1px] h-4 lg:h-7 bg-[#D4A017]/40"></div>
                    
                    <div className="flex items-center gap-1 xl:gap-1.5">
                      <Landmark className="text-[#D4A017] w-3 h-3 md:w-3.5 md:h-3.5 lg:w-5 lg:h-5" />
                      <span className="text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-[#123B6D] leading-tight flex flex-col">
                        <span>Affiliated to</span>
                        <span>University of Mumbai</span>
                      </span>
                    </div>
                    <div className="w-[1px] h-4 lg:h-7 bg-[#D4A017]/40"></div>
                    
                    <div className="flex items-center gap-1 xl:gap-1.5 pr-2 lg:pr-12">
                      <Award className="text-[#D4A017] w-3 h-3 md:w-3.5 md:h-3.5 lg:w-5 lg:h-5" />
                      <span className="text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-[#123B6D] leading-tight flex flex-col">
                        <span>NAAC Accredited</span>
                        <span>A Grade - III Cycle (2016-2026)</span>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1.5 md:gap-2 lg:gap-5 shrink-0 ml-auto">
              
              {/* Quick Links */}
              <div className="hidden xl:flex flex-col items-end gap-0 w-max">
                <span className="text-[11px] xl:text-[12px] font-semibold text-[#1E293B]">Quick Links</span>
                <div className="flex items-center gap-1.5 xl:gap-2 flex-wrap justify-end">
                  <Link href="/notice" className="text-[12px] xl:text-[13px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    Notice
                  </Link>
                  <div className="w-[1px] h-2.5 bg-[#E2E8F0]"></div>
                  <Link href="/placement-portal" className="text-[12px] xl:text-[13px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    Placement
                  </Link>
                  <div className="w-[1px] h-2.5 bg-[#E2E8F0]"></div>
                  <Link href="/administrative-service" className="text-[12px] xl:text-[13px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    Admin Services
                  </Link>
                  <div className="w-[1px] h-2.5 bg-[#E2E8F0]"></div>
                  <Link href="/alumni" className="text-[12px] xl:text-[13px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    Alumni
                  </Link>
                  <div className="w-[1px] h-2.5 bg-[#E2E8F0]"></div>
                  <Link href="/rti" className="text-[12px] xl:text-[13px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    RTI
                  </Link>
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
                  className="h-12 xl:h-16 2xl:h-20 w-auto object-contain drop-shadow-sm"
                />
              </a>

              {/* Search & Notification Buttons */}
              <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3 shrink-0">

                <Link
                  href="/search"
                  className="w-8 h-8 md:w-9 md:h-9 lg:w-12 lg:h-12 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#123B6D] hover:bg-slate-50 hover:scale-105 transition-all"
                >
                  <Search size={16} strokeWidth={1.5} className="md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </Link>
                <div className="relative">
                  <button
                    className={`w-8 h-8 md:w-9 md:h-9 lg:w-12 lg:h-12 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center hover:bg-slate-50 hover:scale-105 transition-all relative ${hasUnread ? '' : 'text-[#123B6D]'}`}
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
                      <Bell size={16} strokeWidth={1.5} className="md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    </motion.div>
                    {hasUnread && (
                      <span className="absolute top-[10px] right-[10px] w-2.5 h-2.5 bg-red-500 rounded-full border-[1.5px] border-white" />
                    )}
                  </button>

                  {/* Notifications dropdown */}
                  <AnimatePresence>
                    {noticesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden z-50 origin-top-right"
                      >
                        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50">
                          <h3 className="font-bold text-[#1E293B] text-sm">Notifications</h3>
                          <Link href="/notices" onClick={() => setNoticesOpen(false)} className="text-xs text-[#123B6D] font-semibold hover:underline">
                            View All
                          </Link>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                          {[
                            { id: 1, title: 'Final Semester Timetable Released', time: '2 hours ago', unread: true },
                            { id: 2, title: 'Holiday declared on Friday due to heavy rains', time: '1 day ago', unread: false },
                            { id: 3, title: 'Admissions Open for 2024-25', time: '2 days ago', unread: false },
                            { id: 4, title: 'New Scholarship Guidelines Uploaded', time: '4 days ago', unread: false },
                          ].map((n) => (
                            <Link
                              href="/notices"
                              key={n.id}
                              onClick={() => setNoticesOpen(false)}
                              className={`block p-4 border-b border-[#E2E8F0] hover:bg-slate-50 transition-colors ${n.unread ? 'bg-blue-50/30' : ''}`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <p className="text-sm font-semibold text-[#1E293B] mb-1 leading-tight">{n.title}</p>
                                {n.unread && <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0 animate-pulse" />}
                              </div>
                              <p className="text-xs text-[#64748B]">{n.time}</p>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              </div>
            </div>
          </div>


        {/* ── Row 2 (desktop): Nav Links ── */}
        <div className="flex w-full max-w-[1600px] mx-auto items-center justify-center px-1 md:px-2 lg:px-8 relative z-[100]">
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
                {(link as any).isMegaMenu && (link as any).megaMenuColumns && (
                  <div
                    className={`absolute top-full pt-2 hidden group-hover:block z-[100] ${((link as any).megaMenuColumns.reduce((a: number, c: any) => a + (c.colSpan || 1), 0)) > 3 ? 'w-[1100px]' : 'w-[900px]'} ${(link as any).megaMenuAlign === 'right' ? 'right-0' : (link as any).megaMenuAlign === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2'}`}
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-3xl shadow-2xl overflow-hidden min-h-[400px]">
                      <div className={`w-full p-8 grid gap-6 relative z-10 ${((link as any).megaMenuColumns.reduce((a: number, c: any) => a + (c.colSpan || 1), 0)) === 4 ? 'grid-cols-4' : ((link as any).megaMenuColumns.reduce((a: number, c: any) => a + (c.colSpan || 1), 0)) === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {(link as any).megaMenuColumns.map((col: any, idx: number) => (
                          <div key={idx} className={col.colSpan === 2 ? "col-span-2" : ""}>
                            <h4 className={`font-bold text-[#123B6D] mb-4 text-[16px] leading-snug border-b border-[#E2E8F0] pb-3 text-center`}>
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
                                    <h5 className="font-bold text-[#123B6D] text-[13px] mb-2 flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full shrink-0"></span>
                                      {sec.subTitle}
                                    </h5>
                                  ) : (
                                    <h5 className="font-bold text-[#123B6D] text-[13px] mb-2">{sec.subTitle}</h5>
                                  ))}
                                    <ul className="space-y-2.5">
                                      {sec.links.map((clink: any) => (
                                        <li key={clink.label}>
                                          <Link href={clink.href} className={`text-[13px] transition-colors flex items-start gap-2 leading-tight font-medium text-[#1E293B] hover:text-[#123B6D]`}>
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
                    className={`absolute top-full pt-2 hidden group-hover:block z-[100] w-[950px] left-1/2 -translate-x-1/2`}
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                     <div className="bg-white border border-[#E2E8F0] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex p-8 pb-10">
                           {/* Left Side: UNDERGRADUATE */}
                           <div className="w-[70%] border-r border-[#E2E8F0] pr-8">
                              <div className="flex items-center gap-3 mb-6 border-b border-[#D4A017] pb-3 inline-flex">
                                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                    <GraduationCap className="text-[#123B6D]" size={20} />
                                 </div>
                                 <h3 className="font-bold text-[#123B6D] text-[15px] tracking-wide">UNDERGRADUATE</h3>
                              </div>
                              <div className="grid grid-cols-3 gap-6">
                                 {/* Col 1 */}
                                 <div>
                                    <h4 className="font-bold text-[#123B6D] mb-4 text-[14px]">Commerce & Management</h4>
                                    <div className="mb-4">
                                       <h5 className="font-bold text-[#123B6D] text-[12px] mb-2">Aided</h5>
                                       <ul className="space-y-2">
                                          <li><Link href="/programmes/ug/bcom" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>B.Com (General)</Link></li>
                                       </ul>
                                    </div>
                                    <div className="mb-4">
                                       <h5 className="font-bold text-[#123B6D] text-[12px] mb-2">Self-Financing</h5>
                                       <ul className="space-y-2">
                                          <li><Link href="/programmes/ug/baf" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>B.Com (Accounting & Finance)</Link></li>
                                          <li><Link href="/programmes/ug/bbi" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>B.Com (Banking & Insurance)</Link></li>
                                          <li><Link href="/programmes/ug/bfm" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>B.Com (Financial Markets)</Link></li>
                                          <li><Link href="/programmes/ug/bcom-ms" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>B.Com (Management Studies)</Link></li>
                                          <li><Link href="/programmes/ug/bcom-ba" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>B.Com (Business Administration)</Link></li>
                                       </ul>
                                    </div>
                                    <div>
                                       <h5 className="font-bold text-[#123B6D] text-[12px] mb-2">Apprentice Embedded</h5>
                                       <ul className="space-y-2">
                                          <li><Link href="/programmes/ug/bfsi" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full shrink-0"></span>B.Com (Banking, Financial Services & Insurance)</Link></li>
                                       </ul>
                                    </div>
                                 </div>
                                 {/* Col 2 */}
                                 <div>
                                    <h4 className="font-bold text-[#123B6D] mb-4 text-[14px]">Science & Technology</h4>
                                    <ul className="space-y-2">
                                       <li><Link href="/programmes/ug/sct/bsc-cs" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>B.Sc (Computer Science)</Link></li>
                                       <li><Link href="/programmes/ug/sct/bsc-it" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>B.Sc (Information Technology)</Link></li>
                                       <li><Link href="/programmes/ug/sct/bsc-ca" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>B.Sc (Computer Application)</Link></li>
                                       <li><Link href="/programmes/ug/sct/bsc-ds" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>B.Sc (Data Science)</Link></li>
                                    </ul>
                                 </div>
                                 {/* Col 3 */}
                                 <div>
                                    <div className="mb-8">
                                       <h4 className="font-bold text-[#123B6D] mb-4 text-[14px]">Arts</h4>
                                       <ul className="space-y-2">
                                          <li><Link href="/programmes/ug/bammc" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2 leading-tight"><span className="w-1 h-1 bg-[#D4A017] rounded-full shrink-0"></span>B.A. (Mass Media & Communication)</Link></li>
                                       </ul>
                                    </div>
                                    <div>
                                       <h4 className="font-bold text-[#123B6D] mb-4 text-[14px]">Ph.D Programmes</h4>
                                       <ul className="space-y-2">
                                          <li><Link href="/programmes/phd/be" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full shrink-0"></span>Ph.D (Business Economics)</Link></li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           
                           {/* Right Side: POSTGRADUATE */}
                           <div className="w-[30%] pl-8">
                              <div className="flex items-center gap-3 mb-6 border-b border-[#D4A017] pb-3 inline-flex">
                                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                    <GraduationCap className="text-[#123B6D]" size={20} />
                                 </div>
                                 <h3 className="font-bold text-[#123B6D] text-[15px] tracking-wide">POSTGRADUATE</h3>
                              </div>
                              <div className="mb-4">
                                 <h5 className="font-bold text-[#123B6D] text-[12px] mb-2">Aided</h5>
                                 <ul className="space-y-2">
                                    <li><Link href="/programmes/pg/mcom-aa" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full shrink-0"></span>M.Com (Advanced Accountancy)</Link></li>
                                 </ul>
                              </div>
                              <div>
                                 <h5 className="font-bold text-[#123B6D] text-[12px] mb-2">Self-Financing</h5>
                                 <ul className="space-y-2">
                                    <li><Link href="/programmes/pg/mcom-bm" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full shrink-0"></span>M.Com (Banking & Finance)</Link></li>
                                    <li><Link href="/programmes/pg/mcom-bf" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full shrink-0"></span>M.Com (Business Management)</Link></li>
                                    <li><Link href="/programmes/pg/msc-it" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full shrink-0"></span>M.Sc (Information Technology)</Link></li>
                                    <li><Link href="/programmes/pg/msf" className="text-[12px] font-medium text-[#64748B] hover:text-[#123B6D] flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A017] rounded-full shrink-0"></span>M.Sc (Finance)</Link></li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                        {/* Explore all bottom bar */}
                        <Link href="/academics" className="bg-[#F8FAFC] px-8 py-4 flex justify-center items-center gap-2 text-[#123B6D] font-bold text-[14px] hover:bg-slate-100 transition-colors border-t border-[#E2E8F0] group/btn">
                           Explore all Programmes <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                     </div>
                  </div>
                )}
                {!(link as any).isMegaMenu && link.sub && (
                  <div
                    className={`absolute top-full pt-2 hidden group-hover:block min-w-[200px] ${menuDirection[link.label] === 'left' ? 'right-0' : 'left-0'}`}
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
                            <div className={`absolute top-0 hidden group-hover/nested:block min-w-[200px] ${menuDirection[s.label] === 'left' ? 'right-full pr-1' : 'left-full pl-1'}`}>
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
                      <Link href="/notices" onClick={() => setNoticesOpen(false)} className="text-xs text-[#123B6D] font-semibold hover:underline">
                        View All
                      </Link>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                      {[
                        { id: 1, title: 'Final Semester Timetable Released', time: '2 hours ago', unread: true },
                        { id: 2, title: 'Holiday declared on Friday due to heavy rains', time: '1 day ago', unread: false },
                        { id: 3, title: 'Admissions Open for 2024-25', time: '2 days ago', unread: false },
                        { id: 4, title: 'New Scholarship Guidelines Uploaded', time: '4 days ago', unread: false },
                      ].map((n) => (
                        <Link
                          href="/notices"
                          key={n.id}
                          onClick={() => setNoticesOpen(false)}
                          className={`block p-4 border-b border-[#E2E8F0] hover:bg-slate-50 transition-colors ${n.unread ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <p className="text-sm font-semibold text-[#1E293B] mb-1 leading-tight">{n.title}</p>
                            {n.unread && <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0 animate-pulse" />}
                          </div>
                          <p className="text-xs text-[#64748B]">{n.time}</p>
                        </Link>
                      ))}
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
          </div>
        </div>
      </motion.header>

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
                  <Link href="/notice" className="text-[11px] font-semibold text-[#475569] hover:text-[#123B6D] transition-colors" onClick={() => setMobileOpen(false)}>Notice</Link>
                  <Link href="/placement-portal" className="text-[11px] font-semibold text-[#475569] hover:text-[#123B6D] transition-colors" onClick={() => setMobileOpen(false)}>Placement</Link>
                  <Link href="/administrative-service" className="text-[11px] font-semibold text-[#475569] hover:text-[#123B6D] transition-colors" onClick={() => setMobileOpen(false)}>Admin Services</Link>
                  <Link href="/alumni" className="text-[11px] font-semibold text-[#475569] hover:text-[#123B6D] transition-colors" onClick={() => setMobileOpen(false)}>Alumni</Link>
                  <Link href="/rti" className="text-[11px] font-semibold text-[#475569] hover:text-[#123B6D] transition-colors" onClick={() => setMobileOpen(false)}>RTI</Link>
                </div>
              {navLinks.map((link) => (
                <div key={link.label}>
                  {(link.mobileSub || link.sub) ? (
                    <button
                      className="flex items-center w-full px-4 py-3 text-[#1E293B] font-medium rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors text-left"
                      onClick={() => setMobileOpenDrop(mobileOpenDrop === link.label ? null : link.label)}
                    >
                      <span className="flex-1 text-left">{link.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 shrink-0 ${mobileOpenDrop === link.label ? 'rotate-180 text-[#123B6D]' : ''}`}
                      />
                    </button>
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
