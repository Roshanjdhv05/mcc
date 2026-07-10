'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Menu, X, ChevronDown, Home, Award, Users, GraduationCap, BookOpen, Palette, Medal, Library as LibraryIcon, LayoutGrid, Star, ShieldCheck, Landmark, Building2 } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/', icon: <Home size={18} /> },
  {
    label: 'About Us', href: '#', icon: <Users size={18} />, sub: [
      { label: 'Vision-Mission', href: '/about/vision-mission' },
      { label: 'PTVA Trust', href: '/about/ptva-trust' },
      { label: 'Board of Trustees', href: '/about/board-of-trustees' },
      { label: "Principal's Desk", href: '/principal' },
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
    label: 'Accreditation & Rankings', href: '/accreditation', icon: <Medal size={18} />, 
    isMegaMenu: true,
    megaMenuAlign: 'left',
    megaMenuImage: '/objectives_side_img.png',
    megaMenuColumns: [
      {
        title: 'Certificates',
        sections: [
          { links: [{ label: '2 B – Certificate', href: '/accreditation/2b-certificate' }, { label: '12 F – Certificate', href: '/accreditation/12f-certificate' }] },
          { subTitle: 'NAAC', links: [{ label: 'Certificates of Accreditations', href: '/accreditation/naac/certificates' }] }
        ]
      },
      {
        title: 'Rankings',
        sections: [
          { subTitle: 'NIRF', links: [{ label: 'Annual Submissions', href: '/accreditation/nirf/annual-submissions' }] },
          { subTitle: 'AISHE', links: [{ label: 'Annual Submissions', href: '/accreditation/aishe/annual-submissions' }] }
        ]
      },
      {
        title: 'Autonomous HEI',
        sections: [
          { links: [{ label: 'Grant of Autonomy (Certificate)', href: '/accreditation/autonomous/grant' }, { label: 'Mandatory disclosure-Undertaking', href: '/accreditation/autonomous/mandatory-disclosure' }] },
          { subTitle: 'Board of Studies', links: [{ label: 'Members', href: '/accreditation/autonomous/bos/members' }, { label: 'Minutes', href: '/accreditation/autonomous/bos/minutes' }] },
          { subTitle: 'Academic Council', links: [{ label: 'Members', href: '/accreditation/autonomous/academic-council/members' }, { label: 'Minutes', href: '/accreditation/autonomous/academic-council/minutes' }] }
        ]
      },
      {
        title: 'Committees',
        sections: [
          { subTitle: 'Finance Committee', links: [{ label: 'Members', href: '/accreditation/autonomous/finance-committee/members' }, { label: 'Minutes', href: '/accreditation/autonomous/finance-committee/minutes' }] },
          { subTitle: 'Governing Body', links: [{ label: 'Members', href: '/accreditation/autonomous/governing-body/members' }, { label: 'Minutes', href: '/accreditation/autonomous/governing-body/minutes' }] }
        ]
      }
    ],
    sub: [
      { label: '2 B – Certificate', href: '/accreditation/2b-certificate' },
      { label: '12 F – Certificate', href: '/accreditation/12f-certificate' },
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
      },
      {
        label: 'Autonomous HEI', href: '/accreditation/autonomous', sub: [
          { label: 'Grant of Autonomy (Certificate)', href: '/accreditation/autonomous/grant' },
          { label: 'Mandatory disclosure-Undertaking', href: '/accreditation/autonomous/mandatory-disclosure' },
          {
            label: 'Board of Studies', href: '#', sub: [
              { label: 'Members (Year Wise)', href: '/accreditation/autonomous/bos/members' },
              { label: 'Minutes of the meeting', href: '/accreditation/autonomous/bos/minutes' }
            ]
          },
          {
            label: 'Academic Council', href: '#', sub: [
              { label: 'Members (Year Wise)', href: '/accreditation/autonomous/academic-council/members' },
              { label: 'Minutes of the meeting', href: '/accreditation/autonomous/academic-council/minutes' }
            ]
          },
          {
            label: 'Finance Committee', href: '#', sub: [
              { label: 'Members (Year Wise)', href: '/accreditation/autonomous/finance-committee/members' },
              { label: 'Minutes of the meeting', href: '/accreditation/autonomous/finance-committee/minutes' }
            ]
          },
          {
            label: 'Governing Body', href: '#', sub: [
              { label: 'Members (Year Wise)', href: '/accreditation/autonomous/governing-body/members' },
              { label: 'Minutes of the meeting', href: '/accreditation/autonomous/governing-body/minutes' }
            ]
          }
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
              { label: 'IQAC composition -Committee Members (Year Wise)', href: '/iqac#members' },
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
              { label: 'Deeksharambh (Orientation of Learners)', href: '/iqac#deeksharambh' },
              { label: 'Disability Sensitisation (Inclusive Campus)', href: '/iqac#disability' },
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
      { label: 'IQAC composition -Committee Members (Year Wise)', href: '/iqac#members' },
      { label: 'Minutes of the Meeting', href: '/iqac#minutes' },
      { label: 'Best Practices', href: '/iqac#best-practices' },
      { label: 'Institutional Distinctiveness', href: '/iqac#distinctiveness' },
      { label: 'Annual Reports', href: '/iqac#annual-reports' },
      { label: 'AQAR', href: '/iqac#aqar' },
      { label: 'Academic Calendar', href: '/iqac#academic-calendar' },
      { label: 'Perspective plan', href: '/iqac#perspective-plan' },
      { label: 'Tilak Smruti Vyakhyan', href: '/iqac#tilak-lecture' },
      { label: 'B. G. Bapat Memorial Lecture', href: '/iqac#bapat-lecture' },
      { label: 'Deeksharambh (Orientation of Learners)', href: '/iqac#deeksharambh' },
      { label: 'Disability Sensitisation (Inclusive Campus)', href: '/iqac#disability' },
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
    label: 'Programmes', href: '#', icon: <GraduationCap size={18} />, 
    isMegaMenu: true,
    megaMenuImage: '/college_campus_hero.png',
    megaMenuColumns: [
      {
        title: 'Undergraduate\n(Commerce & Management)',
        sections: [
          {
            subTitle: 'Aided',
            links: [
              { label: 'B.Com (General)', href: '/programmes/ug/bcom' },
            ]
          },
          {
            subTitle: 'Self-Financing',
            links: [
              { label: 'B.Com (Accounting & Finance)', href: '/programmes/ug/baf' },
              { label: 'B.Com (Management Studies)', href: '/programmes/ug/bcom-ms' },
              { label: 'B.Com (Business Administration)', href: '/programmes/ug/bcom-ba' },
            ]
          },
          {
            subTitle: 'Apprentice-Embedded',
            links: [
              { label: 'B.Com (Banking, Financial Services & Insurance)', href: '/programmes/ug/bfsi' },
            ]
          }
        ]
      },
      {
        title: 'Undergraduate\n(Science & Technology)',
        sections: [
          {
            links: [
              { label: 'B.Sc (Computer Science)', href: '/programmes/ug/sct/bsc-cs' },
              { label: 'B.Sc (Information Technology)', href: '/programmes/ug/sct/bsc-it' },
              { label: 'B.Sc (Computer Application)', href: '/programmes/ug/sct/bsc-ca' },
              { label: 'B.Sc (Data Science)', href: '/programmes/ug/sct/bsc-ds' },
            ]
          }
        ]
      },
      {
        title: 'Postgraduate',
        sections: [
          {
            subTitle: 'Aided',
            links: [
              { label: 'M.Com (Advanced Accountancy)', href: '/programmes/pg/mcom-aa' },
            ]
          },
          {
            subTitle: 'Self-Financing',
            links: [
              { label: 'M.Com (Banking & Insurance)', href: '/programmes/pg/mcom-bm' },
              { label: 'M.Com (Business Management)', href: '/programmes/pg/mcom-bf' },
              { label: 'M.Sc (Information Technology)', href: '/programmes/pg/msc-it' },
              { label: 'M.Sc (Finance)', href: '/programmes/pg/msf' },
            ]
          }
        ]
      },
      {
        title: 'Ph.D Programmes',
        sections: [
          {
            links: [
              { label: 'Ph.D (Business Economics)', href: '/programmes/phd/be' },
            ]
          }
        ]
      }
    ],
    sub: [
      {
        label: 'Under Graduate', href: '/programmes/undergraduate', sub: [
          { label: 'Bachelor of Commerce', href: '/programmes/ug/bcom' },
          { label: 'B.Com (Accounting & Finance)', href: '/programmes/ug/baf' },
          { label: 'B.Com (Banking & Insurance)', href: '/programmes/ug/bbi' },
          { label: 'B.Com (Financial Markets)', href: '/programmes/ug/bfm' },
          { label: 'B.Com (Management Studies)', href: '/programmes/ug/bcom-ms' },
          { label: 'B.Com (Business Administration)', href: '/programmes/ug/bcom-ba' },
          { label: 'B.Sc (Computer Science)', href: '/programmes/ug/sct/bsc-cs' },
          { label: 'B.Sc (Information Technology)', href: '/programmes/ug/sct/bsc-it' },
          { label: 'B.Sc (Computer Application)', href: '/programmes/ug/sct/bsc-ca' },
          { label: 'B.Sc (Data Science)', href: '/programmes/ug/sct/bsc-ds' },
          { label: 'B.Com (BFSI)', href: '/programmes/ug/bfsi' },
        ]
      },
      {
        label: 'Post Graduate', href: '/programmes/post-graduate', sub: [
          { label: 'M.Com (Advanced Accountancy)', href: '/programmes/pg/mcom-aa' },
          { label: 'M.Com (Banking & Insurance)', href: '/programmes/pg/mcom-bm' },
          { label: 'M.Com (Business Management)', href: '/programmes/pg/mcom-bf' },
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
  { label: 'Examination', href: '/examination', icon: <BookOpen size={18} /> },
  {
    label: 'Admission', href: '/admission', icon: <Users size={18} />,
    isMegaMenu: true,
    megaMenuImage: '/objectives_side_img.png',
    megaMenuColumns: [
      {
        title: 'Information & Policies',
        sections: [
          {
            links: [
              { label: 'Admission Prospectus', href: '/admission/prospectus' },
              { label: 'Admission Policy', href: '/admission/policy' },
              { label: 'Information & Notices of Junior College', href: '/admission/jr-college-info' },
              { label: 'Degree Programmes', href: '/admission/degree-programmes' },
              { label: 'Process of Admission', href: '/admission/process' },
              { label: 'Notices and Cut-Offs', href: '/admission/notices-cutoffs' },
            ]
          }
        ]
      },
      {
        title: 'Forms & Links',
        sections: [
          {
            links: [
              { label: 'Names of our programmes as they appear on the University (E-Samarth)Portal', href: '/admission/samarth-names' },
              { label: 'Link for filling the University Form', href: '/admission/university-form' },
              { label: 'Link for Filling the College Form', href: '/admission/college-form' },
              { label: 'Miscellaneous forms and proformas', href: '/admission/misc-forms' },
              { label: 'Data Correction Application', href: '/admission/data-correction' },
              { label: 'Admission Cancellation Form', href: '/admission/cancellation-form' },
              { label: 'Undertaking for Submission of Documents', href: '/admission/undertaking' },
              { label: 'Contact: admisions@mccmulund.ac.in', href: 'mailto:admisions@mccmulund.ac.in' },
            ]
          }
        ]
      }
    ],
    sub: [
      { label: 'Admission Prospectus', href: '/admission/prospectus' },
      { label: 'Admission Policy', href: '/admission/policy' },
      { label: 'Information & Notices of Junior College', href: '/admission/jr-college-info' },
      { label: 'Degree Programmes', href: '/admission/degree-programmes' },
      { label: 'Process of Admission', href: '/admission/process' },
      { label: 'Notices and Cut-Offs', href: '/admission/notices-cutoffs' },
      { label: 'Names of our programmes as they appear on the University (E-Samarth)Portal', href: '/admission/samarth-names' },
      { label: 'Link for filling the University Form', href: '/admission/university-form' },
      { label: 'Link for Filling the College Form', href: '/admission/college-form' },
      { label: 'Miscellaneous forms and proformas', href: '/admission/misc-forms' },
      { label: 'Data Correction Application', href: '/admission/data-correction' },
      { label: 'Admission Cancellation Form', href: '/admission/cancellation-form' },
      { label: 'Undertaking for Submission of Documents', href: '/admission/undertaking' },
      { label: 'Contact: admisions@mccmulund.ac.in', href: 'mailto:admisions@mccmulund.ac.in' },
    ]
  },
  { label: 'Library', href: '/library', icon: <LibraryIcon size={18} /> },
  {
    label: "Students' Corner", href: '/students-corner', icon: <Users size={18} />,
    isMegaMenu: true,
    megaMenuAlign: 'right',
    megaMenuImage: '/college_campus_hero.png',
    megaMenuColumns: [
      {
        title: 'Activities & Forums',
        sections: [
          {
            links: [
              { label: 'Social Media Handles', href: '/students-corner/social-media' },
              { label: 'National Service Scheme', href: '/students-corner/nss' },
              { label: "Students' Council – About us", href: '/students-corner/council' },
              { label: "Annual Day – Annual Reports", href: '/students-corner/annual-day' },
              { label: "Student's Publication", href: '/students-corner/publication' },
              { label: 'Nature Club', href: '/students-corner/nature-club' },
              { label: 'College Festivals and Events', href: '/students-corner/festivals' },
            ]
          }
        ]
      },
      {
        title: 'Cultural & Arts',
        sections: [
          {
            subTitle: 'Cultural Forum',
            links: [
              { label: 'About us', href: '/students-corner/cultural-forum' },
              { label: 'Youth Festival', href: '/students-corner/cultural-forum/youth-festival' },
              { label: 'Spectrum', href: '/students-corner/cultural-forum/spectrum' },
            ]
          },
          {
            subTitle: 'Natyakarmi (Drama Club)',
            links: [
              { label: 'About', href: '/students-corner/natyakarmi' },
              { label: 'Annual Reports', href: '/students-corner/natyakarmi/annual-reports' },
            ]
          },
          {
            subTitle: 'Aaroh (Music Club)',
            links: [
              { label: 'About', href: '/students-corner/aaroh' },
            ]
          },
          {
            subTitle: 'Marathi Vangmay Mandal',
            links: [
              { label: 'Annual Reports', href: '/students-corner/marathi-mandal/annual-reports' },
            ]
          },
          {
            subTitle: 'Women Development Cell',
            links: [
              { label: 'Annual Reports', href: '/students-corner/wdc/annual-reports' },
            ]
          },
        ]
      },
      {
        title: 'Sports & Research',
        sections: [
          {
            subTitle: 'Sports & Gymkhana',
            links: [
              { label: 'About us', href: '/students-corner/sports' },
              { label: 'Games and Sports', href: '/students-corner/sports/games' },
              { label: 'Annual Sports Day', href: '/students-corner/sports/annual-day' },
              { label: 'Annual Reports', href: '/students-corner/sports/annual-reports' },
            ]
          },
          {
            subTitle: 'Entrepreneurship Development Cell',
            links: [
              { label: 'About us', href: '/students-corner/edc' },
              { label: 'Annual Reports', href: '/students-corner/edc/annual-reports' },
            ]
          },
          {
            subTitle: 'Student Research',
            links: [
              { label: 'Shodh – Annual Reports', href: '/students-corner/research/shodh/annual-reports' },
              { label: 'Avishkar – Annual Reports', href: '/students-corner/research/avishkar/annual-reports' },
              { label: 'Minor Research Project – Policy', href: '/students-corner/research/minor-project/policy' },
              { label: 'Minor Research Project – Application', href: '/students-corner/research/minor-project/application' },
            ]
          },
        ]
      }
    ],
    sub: [
      { label: 'Social Media Handles', href: '/students-corner/social-media' },
      { label: 'National Service Scheme', href: '/students-corner/nss' },
      {
        label: 'Cultural Forum', href: '/students-corner/cultural-forum', sub: [
          { label: 'About us', href: '/students-corner/cultural-forum' },
          { label: 'Youth Festival', href: '/students-corner/cultural-forum/youth-festival' },
          { label: 'Spectrum', href: '/students-corner/cultural-forum/spectrum' },
        ]
      },
      {
        label: "Students' Council", href: '/students-corner/council', sub: [
          { label: 'About us', href: '/students-corner/council' },
        ]
      },
      {
        label: 'Annual Day', href: '/students-corner/annual-day', sub: [
          { label: 'Annual Reports', href: '/students-corner/annual-day' },
        ]
      },
      {
        label: 'Sports & Gymkhana', href: '/students-corner/sports', sub: [
          { label: 'About us', href: '/students-corner/sports' },
          { label: 'Games and Sports', href: '/students-corner/sports/games' },
          { label: 'Annual Sports Day', href: '/students-corner/sports/annual-day' },
          { label: 'Annual Reports', href: '/students-corner/sports/annual-reports' },
        ]
      },
      {
        label: 'Entrepreneurship Development Cell', href: '/students-corner/edc', sub: [
          { label: 'About us', href: '/students-corner/edc' },
          { label: 'Annual Reports', href: '/students-corner/edc/annual-reports' },
        ]
      },
      {
        label: 'Student Research', href: '/students-corner/research', sub: [
          {
            label: 'Shodh', href: '/students-corner/research/shodh', sub: [
              { label: 'Annual Reports', href: '/students-corner/research/shodh/annual-reports' },
            ]
          },
          {
            label: 'Avishkar', href: '/students-corner/research/avishkar', sub: [
              { label: 'Annual Reports', href: '/students-corner/research/avishkar/annual-reports' },
            ]
          },
          {
            label: 'Minor Research Project', href: '/students-corner/research/minor-project', sub: [
              { label: 'Policy', href: '/students-corner/research/minor-project/policy' },
              { label: 'Application Process', href: '/students-corner/research/minor-project/application' },
            ]
          },
        ]
      },
      {
        label: 'Marathi Vangmay Mandal', href: '/students-corner/marathi-mandal', sub: [
          { label: 'Annual Reports', href: '/students-corner/marathi-mandal/annual-reports' },
        ]
      },
      {
        label: 'Women Development Cell', href: '/students-corner/wdc', sub: [
          { label: 'Annual Reports', href: '/students-corner/wdc/annual-reports' },
        ]
      },
      {
        label: 'Natyakarmi (Drama Club)', href: '/students-corner/natyakarmi', sub: [
          { label: 'About', href: '/students-corner/natyakarmi' },
          { label: 'Annual Reports', href: '/students-corner/natyakarmi/annual-reports' },
        ]
      },
      {
        label: 'Aaroh (Music Club)', href: '/students-corner/aaroh', sub: [
          { label: 'About', href: '/students-corner/aaroh' },
        ]
      },
      { label: 'College Festivals and Events', href: '/students-corner/festivals' },
      { label: "Student's Publication", href: '/students-corner/publication' },
      { label: 'Nature Club', href: '/students-corner/nature-club' },
    ]
  },
  {
    label: 'More', href: '#', icon: <LayoutGrid size={18} />, 
    isMegaMenu: true,
    megaMenuAlign: 'right',
    megaMenuImage: '/vision_card_img.png',
    megaMenuColumns: [
      {
        title: 'Quick Access',
        sections: [
          {
            links: [
              { label: 'Statutory Bodies', href: '/statutory-bodies' },
              { label: 'Wall of Fame', href: '/wall-of-fame' },
              { label: 'Infrastructure', href: '/infrastructure' },
              { label: 'Grievance Cell', href: '/grievance-cell' },
              { label: 'Anti-Ragging Cell', href: '/anti-ragging-cell' },
              { label: 'Internal Complaint Cell', href: '/internal-complaint-cell' },
              { label: 'Counselling Cell', href: '/counselling-cell' },
            ]
          }
        ]
      },
      {
        title: 'College Festivals & Event',
        sections: [
          {
            links: [
              { label: 'Spectrum', href: '/festivals/spectrum' },
              { label: 'Inspira', href: '/festivals/inspira' },
              { label: 'Technobeat', href: '/festivals/technobeat' },
              { label: 'Maths’ Wonder', href: '/festivals/maths-wonder' },
              { label: 'Oikonomania', href: '/festivals/oikonomania' },
              { label: 'Quantomania', href: '/festivals/quantomania' },
              { label: 'Commerce', href: '/festivals/commerce' },
              { label: 'Accountancy', href: '/festivals/accountancy' },
              { label: 'My Marathi, Mai Marathi', href: '/festivals/marathi' },
              { label: 'Rasikotsav', href: '/festivals/rasikotsav' },
              { label: 'Annual Day', href: '/festivals/annual-day' },
            ]
          }
        ]
      },
      {
        title: "Students' Achievements",
        sections: [
          {
            subTitle: 'Professional Courses',
            links: [
              { label: 'About', href: '/achievements/professional-courses/about' },
              { label: 'All India Rank Holders', href: '/achievements/professional-courses/rank-holders' },
            ]
          },
          {
            links: [
              { label: 'Cultural', href: '/achievements/cultural' },
              { label: 'Youth Festival', href: '/achievements/youth-festival' },
              { label: 'Theatre (Natyakarmi)', href: '/achievements/theatre' },
              { label: 'Sports', href: '/achievements/sports' },
              { label: 'Research', href: '/achievements/research' },
              { label: 'Entrepreneurship', href: '/achievements/entrepreneurship' },
            ]
          }
        ]
      }
    ],
    sub: [
      { label: 'Statutory Bodies', href: '/statutory-bodies' },
      { label: 'Wall of Fame', href: '/wall-of-fame' },
      { label: 'Infrastructure', href: '/infrastructure' },
      { label: 'Grievance Cell', href: '/grievance-cell' },
      { label: 'Anti-Ragging Cell', href: '/anti-ragging-cell' },
      { label: 'Internal Complaint Cell', href: '/internal-complaint-cell' },
      { label: 'Counselling Cell', href: '/counselling-cell' },
      {
        label: 'College Festivals & Event', href: '#', sub: [
          { label: 'Spectrum', href: '/festivals/spectrum' },
          { label: 'Inspira (Department of Management Studies)', href: '/festivals/inspira' },
          { label: 'Technobeat (Department of Science and Computer Technology)', href: '/festivals/technobeat' },
          { label: 'Maths’ Wonder (Computer Science)', href: '/festivals/maths-wonder' },
          { label: 'Oikonomania (Economics Club)', href: '/festivals/oikonomania' },
          { label: 'Quantomania (Department of Mathematics)', href: '/festivals/quantomania' },
          { label: 'Commerce Festival', href: '/festivals/commerce' },
          { label: 'Accountancy Festival', href: '/festivals/accountancy' },
          { label: 'My Marathi, Mai Marathi', href: '/festivals/marathi' },
          { label: 'Rasikotsav', href: '/festivals/rasikotsav' },
          { label: 'Annual Day', href: '/festivals/annual-day' },
        ]
      },
      {
        label: "Students' Achievements", href: '#', sub: [
          {
            label: 'Professional Courses', href: '/achievements/professional-courses', sub: [
              { label: 'About', href: '/achievements/professional-courses/about' },
              { label: 'All India Rank Holders', href: '/achievements/professional-courses/rank-holders' },
            ]
          },
          { label: 'Cultural', href: '/achievements/cultural' },
          { label: 'Youth Festival', href: '/achievements/youth-festival' },
          { label: 'Theatre (Natyakarmi)', href: '/achievements/theatre' },
          { label: 'Sports', href: '/achievements/sports' },
          { label: 'Research', href: '/achievements/research' },
          { label: 'Entrepreneurship', href: '/achievements/entrepreneurship' },
        ]
      },
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

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: visible ? 0 : -250 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
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
                <img src="/mcclogo.jpg" alt="MCC Logo" className="w-14 h-14 md:w-16 md:h-16 lg:w-[120px] lg:h-[120px] object-contain drop-shadow-sm" />
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
                    MULUND COLLEGE OF COMMERCE AUTONOMOUS
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
                <span className="text-[9px] xl:text-[10px] font-semibold text-[#1E293B]">Quick Links</span>
                <div className="flex items-center gap-1.5 xl:gap-2 flex-wrap justify-end">
                  <Link href="/notice" className="text-[9px] xl:text-[10px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    Notice
                  </Link>
                  <div className="w-[1px] h-2.5 bg-[#E2E8F0]"></div>
                  <Link href="/placement-portal" className="text-[9px] xl:text-[10px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    Placement
                  </Link>
                  <div className="w-[1px] h-2.5 bg-[#E2E8F0]"></div>
                  <Link href="/alumni" className="text-[9px] xl:text-[10px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    Alumni
                  </Link>
                  <div className="w-[1px] h-2.5 bg-[#E2E8F0]"></div>
                  <Link href="/research" className="text-[9px] xl:text-[10px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    Research
                  </Link>
                  <div className="w-[1px] h-2.5 bg-[#E2E8F0]"></div>
                  <Link href="/contact" className="text-[9px] xl:text-[10px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    Contact
                  </Link>
                  <div className="w-[1px] h-2.5 bg-[#E2E8F0]"></div>
                  <Link href="/administrative-service" className="text-[9px] xl:text-[10px] font-medium text-[#475569] hover:text-[#D4A017] transition-colors">
                    Admin Services
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
        <div className="flex w-full max-w-[1600px] mx-auto items-center justify-center px-1 md:px-2 lg:px-8 relative z-30">
          <nav className="flex items-center justify-center flex-wrap gap-0 md:gap-0.5 xl:gap-1 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#E2E8F0] rounded-2xl px-0.5 md:px-1 xl:px-2 py-0.5 md:py-1 xl:py-1.5">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group shrink-0" onMouseEnter={(e) => handleMenuEnter(e, link.label)}>
                {link.sub ? (
                  <Link
                    href={link.href}
                    className="flex items-center gap-0.5 xl:gap-1.5 px-1 md:px-1.5 lg:px-3 xl:px-4 py-1 md:py-1.5 lg:py-2.5 text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] font-semibold text-[#1E293B] hover:text-[#123B6D] rounded-xl hover:bg-[#123B6D]/5 transition-all whitespace-nowrap"
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    {link.label}
                    <ChevronDown size={14} className="text-[#94A3B8] ml-0.5 group-hover:text-[#123B6D]" />
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center gap-0.5 xl:gap-2 px-1 md:px-1.5 lg:px-4 xl:px-5 py-1 md:py-1.5 lg:py-2.5 text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] font-semibold rounded-xl transition-all whitespace-nowrap ${
                      (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                        ? 'bg-[#123B6D] text-white shadow-md' 
                        : 'text-[#1E293B] hover:text-[#123B6D] hover:bg-[#123B6D]/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
                {(link as any).isMegaMenu && (link as any).megaMenuColumns && (
                  <div
                    className={`absolute top-full pt-2 hidden group-hover:block ${(link as any).megaMenuColumns.length > 3 ? 'w-[1100px]' : 'w-[900px]'} ${(link as any).megaMenuAlign === 'right' ? 'right-0' : (link as any).megaMenuAlign === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2'}`}
                    onMouseEnter={() => setOpenDrop(link.label)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-3xl shadow-2xl flex overflow-hidden min-h-[400px]">
                      <div className={`${(link as any).megaMenuColumns.length > 3 ? 'w-[25%]' : 'w-[30%]'} bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 relative`}>
                        <img src={(link as any).megaMenuImage || "/college_campus_hero.png"} alt={link.label} className="w-full h-full object-cover absolute inset-0 rounded-l-3xl" />
                      </div>
                      <div className={`${(link as any).megaMenuColumns.length > 3 ? 'w-[75%]' : 'w-[70%]'} p-8 grid gap-6 relative z-10 ${(link as any).megaMenuColumns.length === 4 ? 'grid-cols-4' : (link as any).megaMenuColumns.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {(link as any).megaMenuColumns.map((col: any, idx: number) => (
                          <div key={idx}>
                            <h4 className="font-bold text-[#123B6D] mb-4 text-[14px] leading-tight whitespace-pre-line border-b border-[#E2E8F0] pb-3">{col.title}</h4>
                            <div className="space-y-4">
                              {col.sections.map((sec: any, sidx: number) => (
                                <div key={sidx}>
                                  {sec.subTitle && (
                                    <h5 className="font-bold text-[#123B6D] text-[12px] mb-2">{sec.subTitle}</h5>
                                  )}
                                  <ul className="space-y-2.5">
                                    {sec.links.map((clink: any) => (
                                      <li key={clink.label}>
                                        <Link href={clink.href} className="text-[12px] font-medium text-[#1E293B] hover:text-[#123B6D] transition-colors flex items-start gap-2 leading-tight">
                                          <span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full shrink-0 mt-1"></span>
                                          <span>{clink.label}</span>
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
            <img src="/mcclogo.jpg" alt="MCC Logo" className="w-10 h-10 object-contain" />
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
              className="fixed inset-0 z-[55] bg-black/40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-[60] bg-white shadow-2xl overflow-y-auto flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <img src="/mcclogo.jpg" alt="MCC Logo" className="w-12 h-12 object-contain" />
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
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.sub ? (
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
                    {link.sub && mobileOpenDrop === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 space-y-1 py-1 border-l-2 border-[#EBF3FF] pl-2">
                          {(link as any).sub.map((s: any) => (
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
                                                          className="block px-4 py-2 text-sm text-[#64748B] rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                                                          onClick={() => { setMobileOpen(false); setMobileOpenDrop(null); setNestedMobileDrop(null); setNestedMobileDrop3(null); }}
                                                        >
                                                          {sss.label}
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
                                              className="block px-4 py-2 text-sm text-[#64748B] rounded-xl hover:bg-[#123B6D]/5 hover:text-[#123B6D] transition-colors"
                                              onClick={() => { setMobileOpen(false); setMobileOpenDrop(null); setNestedMobileDrop(null); setNestedMobileDrop3(null); }}
                                            >
                                              {ss.label}
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
