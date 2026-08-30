'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, X, ArrowRight, BookOpen, GraduationCap, FileText, Users, Award, BarChart2, Phone, Bell, ChevronRight } from 'lucide-react';

const siteIndex = [
  // ── Home ──────────────────────────────────────────────────────
  { title: 'Home', href: '/', category: 'General', icon: BookOpen, tags: ['home', 'mcc', 'mulund college of commerce', 'main', 'landing'] },
  { title: 'Contact Us', href: '/contact', category: 'General', icon: Phone, tags: ['contact', 'address', 'phone', 'email', 'location', 'map', 'reach', 'helpdesk'] },
  { title: 'Notices & Circulars', href: '/notices', category: 'Notices', icon: Bell, tags: ['notices', 'circular', 'announcements', 'updates', 'latest', 'news', 'notice board'] },
  { title: 'Search', href: '/search', category: 'General', icon: Search, tags: ['search', 'find', 'lookup'] },
  { title: 'Services', href: '/services', category: 'General', icon: FileText, tags: ['services', 'student services', 'college services'] },
  { title: 'Forms & Applications', href: '/forms', category: 'Forms', icon: FileText, tags: ['forms', 'application', 'scholarship', 'bonafide', 'tc', 'certificate', 'ebc', 'download'] },

  // ── About ─────────────────────────────────────────────────────
  { title: 'About MCC', href: '/about', category: 'About', icon: BookOpen, tags: ['about', 'mcc', 'mulund college', 'overview', 'history'] },
  { title: 'Vision & Mission', href: '/about/vision-mission', category: 'About', icon: BookOpen, tags: ['vision', 'mission', 'about', 'mcc', 'values', 'goals'] },
  { title: 'Milestones & Achievements', href: '/about/milestones', category: 'About', icon: Award, tags: ['milestones', 'achievements', 'history', 'awards', 'about'] },
  { title: 'PTVA Trust', href: '/about/ptva-trust', category: 'About', icon: Users, tags: ['ptva', 'trust', 'patkar', 'varde', 'management', 'about'] },
  { title: 'Board of Trustees', href: '/about/board-of-trustees', category: 'About', icon: Users, tags: ['board', 'trustees', 'management', 'governing', 'about'] },
  { title: 'Organogram', href: '/about/organogram', category: 'About', icon: Users, tags: ['organogram', 'structure', 'hierarchy', 'departments', 'about'] },
  { title: 'Code of Conduct', href: '/about/code-of-conduct', category: 'About', icon: FileText, tags: ['code of conduct', 'rules', 'discipline', 'about', 'policy'] },
  { title: 'Statutory Committees', href: '/about/statuatory', category: 'About', icon: Users, tags: ['statutory', 'statuatory', 'committees', 'about', 'college council'] },
  { title: 'Other Institutions', href: '/about/other-institutions', category: 'About', icon: BookOpen, tags: ['other institutions', 'ptva', 'sister colleges', 'about'] },
  { title: 'Special Lectures', href: '/about/special-lectures', category: 'About', icon: BookOpen, tags: ['special lectures', 'guest lecture', 'talk', 'seminar', 'about'] },
  { title: 'Tilak Lecture', href: '/about/tilak-lecture', category: 'About', icon: BookOpen, tags: ['tilak lecture', 'bal gangadhar tilak', 'lecture', 'about'] },
  { title: 'B.G. Bapat Lecture', href: '/about/bg-bapat-lecture', category: 'About', icon: BookOpen, tags: ['bapat lecture', 'bg bapat', 'lecture', 'about'] },
  { title: "Principal's Profile", href: '/principal', category: 'About', icon: Users, tags: ['principal', 'head', 'about', 'profile', 'dr'] },
  { title: 'Vice Principal – Degree', href: '/vice-principal-degree', category: 'About', icon: Users, tags: ['vice principal', 'degree', 'about', 'profile'] },
  { title: 'Vice Principal – Junior', href: '/vice-principal-junior', category: 'About', icon: Users, tags: ['vice principal', 'junior', 'jr college', 'about', 'profile'] },
  { title: 'Statutory Bodies', href: '/statutory-bodies', category: 'About', icon: Users, tags: ['statutory', 'bodies', 'committees', 'icc', 'grievance', 'anti ragging'] },

  // ── Programmes – UG ──────────────────────────────────────────
  { title: 'Undergraduate Programmes', href: '/programmes/undergraduate', category: 'Programme', icon: GraduationCap, tags: ['undergraduate', 'ug', 'programmes', 'courses', 'bachelor', 'degree'] },
  { title: 'B.Com – Bachelor of Commerce', href: '/programmes/ug/bcom', category: 'Programme', icon: GraduationCap, tags: ['bcom', 'b.com', 'commerce', 'bachelor', 'ug', 'undergraduate', 'finance', 'accounting', 'taxation'] },
  { title: 'BMS – Bachelor of Management Studies', href: '/programmes/ug/bms', category: 'Programme', icon: GraduationCap, tags: ['bms', 'management', 'bachelor', 'ug', 'undergraduate', 'business', 'leadership'] },
  { title: 'BBA – Bachelor of Business Administration', href: '/programmes/ug/bba', category: 'Programme', icon: GraduationCap, tags: ['bba', 'business', 'administration', 'bachelor', 'ug', 'undergraduate', 'corporate'] },
  { title: 'BAF – Bachelor of Accounting & Finance', href: '/programmes/ug/baf', category: 'Programme', icon: GraduationCap, tags: ['baf', 'accounting', 'finance', 'bachelor', 'ug', 'undergraduate', 'ca', 'cma'] },
  { title: 'BBI – Bachelor of Banking & Insurance', href: '/programmes/ug/bbi', category: 'Programme', icon: GraduationCap, tags: ['bbi', 'banking', 'insurance', 'bachelor', 'ug', 'undergraduate', 'bank', 'finance'] },
  { title: 'BFM – Bachelor of Financial Markets', href: '/programmes/ug/bfm', category: 'Programme', icon: GraduationCap, tags: ['bfm', 'financial markets', 'stock', 'investment', 'bachelor', 'ug', 'undergraduate'] },
  { title: 'BFSI – Banking Financial Services & Insurance', href: '/programmes/ug/bfsi', category: 'Programme', icon: GraduationCap, tags: ['bfsi', 'banking', 'financial services', 'insurance', 'bachelor', 'ug', 'undergraduate'] },
  { title: 'BCA – Bachelor of Computer Applications', href: '/programmes/ug/bca', category: 'Programme', icon: GraduationCap, tags: ['bca', 'computer', 'applications', 'bachelor', 'ug', 'undergraduate', 'it', 'software'] },
  { title: 'BSc IT – Information Technology', href: '/programmes/ug/bscit', category: 'Programme', icon: GraduationCap, tags: ['bscit', 'bsc', 'it', 'information technology', 'science', 'bachelor', 'ug', 'network', 'software'] },
  { title: 'BSc CS – Computer Science', href: '/programmes/ug/sct/bsc-cs', category: 'Programme', icon: GraduationCap, tags: ['bsc cs', 'computer science', 'science', 'bachelor', 'ug'] },
  { title: 'BSc CA – Computer Applications', href: '/programmes/ug/sct/bsc-ca', category: 'Programme', icon: GraduationCap, tags: ['bsc ca', 'computer applications', 'science', 'bachelor', 'ug'] },
  { title: 'BSc DS – Data Science', href: '/programmes/ug/sct/bsc-ds', category: 'Programme', icon: GraduationCap, tags: ['bsc ds', 'data science', 'analytics', 'science', 'bachelor', 'ug'] },
  { title: 'BSc IT (SCT) – Information Technology', href: '/programmes/ug/sct/bsc-it', category: 'Programme', icon: GraduationCap, tags: ['bsc it', 'sct', 'information technology', 'science', 'bachelor', 'ug'] },
  { title: 'Data Science (DS)', href: '/programmes/ug/ds', category: 'Programme', icon: GraduationCap, tags: ['ds', 'data science', 'analytics', 'machine learning', 'big data', 'ug', 'undergraduate'] },
  { title: 'BA-MMC – Mass Media Communication', href: '/programmes/ug/bammc', category: 'Programme', icon: GraduationCap, tags: ['bammc', 'ba-mmc', 'mass media', 'communication', 'journalism', 'bachelor', 'ug'] },
  { title: 'B.Com BA – Business Analytics', href: '/programmes/ug/bcom-ba', category: 'Programme', icon: GraduationCap, tags: ['bcom ba', 'business analytics', 'data', 'bachelor', 'ug'] },
  { title: 'B.Com MS – Management Studies', href: '/programmes/ug/bcom-ms', category: 'Programme', icon: GraduationCap, tags: ['bcom ms', 'management studies', 'commerce', 'bachelor', 'ug'] },

  // ── Programmes – PG ──────────────────────────────────────────
  { title: 'Postgraduate Programmes', href: '/programmes/post-graduate', category: 'Programme', icon: GraduationCap, tags: ['postgraduate', 'pg', 'master', 'programmes', 'courses'] },
  { title: 'MCom – Master of Commerce', href: '/programmes/pg/mcom', category: 'Programme', icon: GraduationCap, tags: ['mcom', 'm.com', 'master', 'commerce', 'pg', 'postgraduate', 'advanced', 'finance'] },
  { title: 'MCom – Advanced Accountancy', href: '/programmes/pg/mcom-aa', category: 'Programme', icon: GraduationCap, tags: ['mcom aa', 'advanced accountancy', 'master', 'pg', 'postgraduate', 'accounts'] },
  { title: 'MCom – Banking Management', href: '/programmes/pg/mcom-bm', category: 'Programme', icon: GraduationCap, tags: ['mcom bm', 'banking management', 'master', 'pg', 'postgraduate', 'bank'] },
  { title: 'MCom – Business Finance', href: '/programmes/pg/mcom-bf', category: 'Programme', icon: GraduationCap, tags: ['mcom bf', 'business finance', 'master', 'pg', 'postgraduate', 'finance'] },
  { title: 'MSc IT – Master of Science in Information Technology', href: '/programmes/pg/mscit', category: 'Programme', icon: GraduationCap, tags: ['mscit', 'msc', 'it', 'information technology', 'master', 'pg', 'postgraduate', 'computing'] },
  { title: 'MSF – Master of Science in Finance', href: '/programmes/pg/msf', category: 'Programme', icon: GraduationCap, tags: ['msf', 'ms finance', 'master', 'pg', 'postgraduate', 'finance', 'markets'] },

  // ── Programmes – Jr & Sr College ─────────────────────────────
  { title: 'Jr. College (11th & 12th)', href: '/programmes/jr-college', category: 'Programme', icon: GraduationCap, tags: ['jr college', 'junior college', '11th', '12th', 'fyjc', 'syjc', 'science', 'commerce', 'arts', 'hsc'] },
  { title: 'Sr. College', href: '/programmes/sr-college', category: 'Programme', icon: GraduationCap, tags: ['sr college', 'senior college', 'degree', 'ug', 'graduate'] },
  { title: 'SCT Programmes', href: '/programmes/ug/sct', category: 'Programme', icon: GraduationCap, tags: ['sct', 'science technology', 'bsc', 'ug', 'undergraduate'] },
  { title: 'PhD Programme', href: '/programmes/phd/be', category: 'Programme', icon: GraduationCap, tags: ['phd', 'doctorate', 'research', 'doctor', 'pg', 'be'] },

  // ── Accreditation ─────────────────────────────────────────────
  { title: 'Accreditation Overview', href: '/accreditation', category: 'Accreditation', icon: Award, tags: ['accreditation', 'naac', 'aqar', 'nirf', 'aishe', 'certificates', 'ugc'] },
  { title: 'NAAC – A+ Accreditation', href: '/accreditation/naac', category: 'Accreditation', icon: Award, tags: ['naac', 'accreditation', 'cgpa', 'grade', 'a+', 'ssr', 'criteria', 'cycle', '3.42', 'national assessment'] },
  { title: 'NAAC Certificates', href: '/accreditation/naac/certificates', category: 'Accreditation', icon: Award, tags: ['naac', 'certificate', 'accreditation', 'documents'] },
  { title: 'AQAR – Annual Quality Assurance Report', href: '/accreditation/aqar', category: 'Accreditation', icon: FileText, tags: ['aqar', 'annual quality', 'report', 'iqac', 'accreditation'] },
  { title: 'Certificates', href: '/accreditation/certificates', category: 'Accreditation', icon: Award, tags: ['certificates', 'ugc', 'autonomy', 'naac', 'nirf', 'aishe', 'accreditation'] },
  { title: 'UGC 2(f) & 12(B) Certificate', href: '/accreditation/certificates/ugc-2f-12b', category: 'Accreditation', icon: Award, tags: ['ugc', '2f', '12b', 'certificate', 'university grants commission'] },
  { title: 'Autonomy Certificate', href: '/accreditation/certificates/autonomy', category: 'Accreditation', icon: Award, tags: ['autonomy', 'certificate', 'autonomous', 'accreditation'] },
  { title: 'NAAC Certificate', href: '/accreditation/certificates/naac', category: 'Accreditation', icon: Award, tags: ['naac', 'certificate', 'a+', 'accreditation'] },
  { title: 'NIRF Certificate', href: '/accreditation/certificates/nirf', category: 'Accreditation', icon: BarChart2, tags: ['nirf', 'certificate', 'ranking', 'national institutional ranking'] },
  { title: 'AISHE Certificate', href: '/accreditation/certificates/aishe', category: 'Accreditation', icon: Award, tags: ['aishe', 'certificate', 'all india survey', 'higher education'] },
  { title: 'AISHE Annual Submissions', href: '/accreditation/aishe/annual-submissions', category: 'Accreditation', icon: FileText, tags: ['aishe', 'annual submissions', 'survey', 'higher education', 'data'] },
  { title: 'NIRF Annual Submissions', href: '/accreditation/nirf/annual-submissions', category: 'Accreditation', icon: FileText, tags: ['nirf', 'annual submissions', 'ranking', 'data', 'report'] },
  { title: 'NIRF Ranking', href: '/nirf', category: 'Accreditation', icon: BarChart2, tags: ['nirf', 'ranking', 'national', 'institutional', 'framework', 'score', 'ministry', 'rank'] },
  { title: 'NAAC Overview', href: '/naac', category: 'Accreditation', icon: Award, tags: ['naac', 'overview', 'accreditation', 'grade', 'a+'] },

  // ── IQAC ──────────────────────────────────────────────────────
  { title: 'IQAC – Internal Quality Assurance Cell', href: '/iqac', category: 'IQAC', icon: Award, tags: ['iqac', 'quality', 'assurance', 'internal', 'aqar', 'feedback', 'audit'] },
  { title: 'IQAC Information & Policies', href: '/iqac/information-and-policies', category: 'IQAC', icon: FileText, tags: ['iqac', 'information', 'policies', 'best practices', 'distinctiveness'] },
  { title: "IQAC Reports & Initiatives", href: '/iqac/reports-and-initiatives', category: 'IQAC', icon: FileText, tags: ['iqac', 'reports', 'initiatives', 'academic calendar', 'annual reports', 'perspective plan'] },
  { title: 'SSR Supporting Documents', href: '/iqac/ssr-supporting-documents', category: 'IQAC', icon: FileText, tags: ['ssr', 'supporting documents', 'naac', 'iqac', 'criteria', 'data'] },

  // ── Autonomous Bodies ─────────────────────────────────────────
  { title: 'Autonomous College', href: '/autonomous', category: 'Autonomous', icon: Award, tags: ['autonomous', 'autonomy', 'college', 'conferment'] },
  { title: 'Conferment of Autonomy', href: '/autonomous/Conferment-of-Autonomy', category: 'Autonomous', icon: FileText, tags: ['autonomy', 'conferment', 'autonomous', 'university of mumbai'] },
  { title: 'Governing Body – Members', href: '/autonomous/governing-body/members', category: 'Autonomous', icon: Users, tags: ['governing body', 'members', 'autonomous', 'management'] },
  { title: 'Governing Body – Minutes', href: '/autonomous/governing-body/minutes', category: 'Autonomous', icon: FileText, tags: ['governing body', 'minutes', 'meetings', 'autonomous'] },
  { title: 'Academic Council – Members', href: '/autonomous/academic-council/members', category: 'Autonomous', icon: Users, tags: ['academic council', 'members', 'autonomous', 'academics'] },
  { title: 'Academic Council – Minutes', href: '/autonomous/academic-council/minutes', category: 'Autonomous', icon: FileText, tags: ['academic council', 'minutes', 'meetings', 'autonomous'] },
  { title: 'Board of Studies – Members', href: '/autonomous/bos/members', category: 'Autonomous', icon: Users, tags: ['bos', 'board of studies', 'members', 'autonomous', 'syllabus'] },
  { title: 'Finance Committee – Members', href: '/autonomous/finance-committee/members', category: 'Autonomous', icon: Users, tags: ['finance committee', 'members', 'autonomous', 'budget'] },
  { title: 'Finance Committee – Minutes', href: '/autonomous/finance-committee/minutes', category: 'Autonomous', icon: FileText, tags: ['finance committee', 'minutes', 'meetings', 'autonomous'] },

  // ── Research ──────────────────────────────────────────────────
  { title: 'Research Cell', href: '/research', category: 'Research', icon: BookOpen, tags: ['research', 'cell', 'innovation', 'inquiry', 'projects', 'publications'] },
  { title: 'Research – About & Committee', href: '/research/about', category: 'Research', icon: Users, tags: ['research', 'about', 'committee', 'objective', 'annual reports'] },
  
  { title: 'Research Centre Recognition', href: '/research/centre', category: 'Research', icon: BookOpen, tags: ['research centre', 'recognition', 'phd', 'guides'] },
  { title: 'Research Guides', href: '/research/centre', category: 'Research', icon: Users, tags: ['research guides', 'phd guides', 'mentors'] },
  { title: 'Research Scholars', href: '/research/centre', category: 'Research', icon: Users, tags: ['research scholars', 'phd students', 'scholars'] },
  { title: 'Awarded Thesis', href: '/research/centre', category: 'Research', icon: FileText, tags: ['awarded thesis', 'phd thesis', 'completed'] },
  { title: 'Application Process (Research)', href: '/research/centre', category: 'Research', icon: FileText, tags: ['application', 'process', 'phd admission'] },

  { title: 'Research Policies Overview', href: '/research/policies', category: 'Research', icon: FileText, tags: ['research', 'policy', 'plagiarism', 'application', 'check'] },
  { title: 'Research Policy', href: '/research/policies', category: 'Research', icon: FileText, tags: ['research policy', 'rules', 'guidelines'] },
  { title: 'Plagiarism Policy', href: '/research/policies', category: 'Research', icon: FileText, tags: ['plagiarism policy', 'rules', 'ethics'] },
  { title: 'Application for Plagiarism Check', href: '/research/policies', category: 'Research', icon: FileText, tags: ['plagiarism check', 'application', 'form'] },

  { title: 'Research Competitions & Events', href: '/research/competitions', category: 'Research', icon: Award, tags: ['research', 'avishkar', 'shodh', 'conclave', 'competition', 'events', 'inter-collegiate'] },
  { title: 'Avishkar (University of Mumbai)', href: '/research/competitions', category: 'Research', icon: Award, tags: ['avishkar', 'university of mumbai', 'competition', 'research'] },
  { title: 'Shodh (Inter-collegiate)', href: '/research/competitions', category: 'Research', icon: Award, tags: ['shodh', 'inter-collegiate', 'competition', 'research'] },
  { title: "PTVA's Inter-institutional Conclave", href: '/research/competitions', category: 'Research', icon: Award, tags: ['conclave', 'ptva', 'inter-institutional', 'research'] },

  { title: 'Research Publications & Resources', href: '/research/publications', category: 'Research', icon: BookOpen, tags: ['research', 'publications', 'journal', 'board of editors', 'volume', 'issues', 'resources'] },
  { title: 'About the Research Journal', href: '/research/publications', category: 'Research', icon: BookOpen, tags: ['research journal', 'about'] },
  { title: 'Board of Editors', href: '/research/publications', category: 'Research', icon: Users, tags: ['board of editors', 'journal', 'research'] },
  { title: 'Journal Volume and Issues', href: '/research/publications', category: 'Research', icon: FileText, tags: ['volume', 'issues', 'journal', 'research'] },

  // ── Library ───────────────────────────────────────────────────
  { title: 'Library', href: '/library', category: 'Library', icon: BookOpen, tags: ['library', 'books', 'reading', 'resources', 'journals', 'digital'] },
  { title: 'About the Library', href: '/library/about-us', category: 'Library', icon: BookOpen, tags: ['library', 'about', 'history', 'collection', 'services'] },
  { title: 'Library Staff Profile', href: '/library/staff-profile', category: 'Library', icon: Users, tags: ['library', 'staff', 'librarian', 'profile'] },
  { title: 'E-Resources', href: '/library/e-resources', category: 'Library', icon: FileText, tags: ['library', 'e-resources', 'ebooks', 'online', 'digital', 'database', 'journals'] },
  { title: 'Library Important Links', href: '/library/important-links', category: 'Library', icon: FileText, tags: ['library', 'links', 'resources', 'databases', 'shodhganga'] },
  { title: 'Research Kit', href: '/library/research-kit', category: 'Library', icon: FileText, tags: ['library', 'research kit', 'guide', 'how to', 'research'] },
  { title: 'Library Downloads', href: '/library/download', category: 'Library', icon: FileText, tags: ['library', 'download', 'forms', 'documents', 'membership'] },
  { title: 'Library Contact', href: '/library/contact-us', category: 'Library', icon: Phone, tags: ['library', 'contact', 'timing', 'address', 'email'] },

  // ── Students' Corner ──────────────────────────────────────────
  { title: "Students' Corner", href: '/students-corner', category: 'Students', icon: GraduationCap, tags: ['students', 'corner', 'activities', 'clubs', 'events', 'gallery', 'wall of fame'] },
  { title: 'Event Calendar', href: '/students-corner/event-calendar', category: 'Students', icon: Bell, tags: ['event calendar', 'events', 'schedule', 'academic calendar', 'holidays', 'students'] },
  
  // Events
  { title: 'Events & Festivals', href: '/students-corner/Events-and-Festivals', category: 'Students', icon: Award, tags: ['events', 'festivals', 'cultural', 'celebrations', 'students'] },
  { title: 'Spectrum (Event)', href: '/students-corner/Events-and-Festivals?event=spectrum', category: 'Students', icon: Award, tags: ['spectrum', 'event', 'festival'] },
  { title: 'Inspira (Event)', href: '/students-corner/Events-and-Festivals?event=inspira', category: 'Students', icon: Award, tags: ['inspira', 'event', 'festival'] },
  { title: 'Hack-A-Thon', href: '/students-corner/Events-and-Festivals?event=hackathon', category: 'Students', icon: Award, tags: ['hack-a-thon', 'hackathon', 'coding', 'event'] },
  { title: 'Emporio (Event)', href: '/students-corner/Events-and-Festivals?event=emporio', category: 'Students', icon: Award, tags: ['emporio', 'event', 'festival'] },
  { title: 'Quantomania (Event)', href: '/students-corner/Events-and-Festivals?event=quantomania', category: 'Students', icon: Award, tags: ['quantomania', 'event', 'festival', 'math'] },
  { title: 'Manthan (Event)', href: '/students-corner/Events-and-Festivals?event=manthan', category: 'Students', icon: Award, tags: ['manthan', 'event', 'festival'] },

  // Forums and Clubs
  { title: 'Forums & Clubs', href: '/students-corner/Forums-and-Clubs', category: 'Students', icon: Users, tags: ['forums', 'clubs', 'student activities', 'nss', 'cultural', 'sports'] },
  { title: "Students' Council", href: '/students-corner/Forums-and-Clubs?club=students-council', category: 'Students', icon: Users, tags: ['students council', 'council', 'forum'] },
  { title: 'National Service Scheme (NSS)', href: '/students-corner/Forums-and-Clubs?club=nss', category: 'Students', icon: Users, tags: ['nss', 'national service scheme', 'social work'] },
  { title: 'Cultural Forum', href: '/students-corner/Forums-and-Clubs?club=cultural-forum', category: 'Students', icon: Users, tags: ['cultural forum', 'dance', 'music', 'drama'] },
  { title: 'Sports and Gymkhana', href: '/students-corner/Forums-and-Clubs?club=sports', category: 'Students', icon: Users, tags: ['sports', 'gymkhana', 'athletics', 'games'] },
  { title: 'Natyakarmi (Theatre Group)', href: '/students-corner/Forums-and-Clubs?club=natyakarmi', category: 'Students', icon: Users, tags: ['natyakarmi', 'theatre', 'drama', 'acting'] },
  { title: 'Marathi Vangmay Mandal', href: '/students-corner/Forums-and-Clubs?club=mvm', category: 'Students', icon: Users, tags: ['marathi', 'vangmay mandal', 'mvm', 'literature'] },
  { title: 'Aaroh (Music Club)', href: '/students-corner/Forums-and-Clubs?club=aaroh', category: 'Students', icon: Users, tags: ['aaroh', 'music club', 'singing', 'instruments'] },
  { title: 'Artelier (Fine Arts Club)', href: '/students-corner/Forums-and-Clubs?club=artelier', category: 'Students', icon: Users, tags: ['artelier', 'fine arts', 'painting', 'drawing'] },
  { title: 'Nature Club', href: '/students-corner/Forums-and-Clubs?club=nature-club', category: 'Students', icon: Users, tags: ['nature club', 'environment', 'green', 'eco'] },
  { title: 'Women Development Cell (WDC)', href: '/students-corner/Forums-and-Clubs?club=wdc', category: 'Students', icon: Users, tags: ['women development cell', 'wdc', 'women empowerment'] },
  { title: 'Entrepreneurship Development Cell (EDC)', href: '/students-corner/Forums-and-Clubs?club=edc', category: 'Students', icon: Users, tags: ['edc', 'entrepreneurship', 'business', 'startup'] },
  { title: "Students' Research Club", href: '/students-corner/Forums-and-Clubs?club=research', category: 'Students', icon: Users, tags: ['students research', 'research club'] },
  
  // Publications
  { title: "Students' Publications", href: '/students-corner/Students-Publications', category: 'Students', icon: BookOpen, tags: ['publications', 'magazine', 'newsletter', 'students', 'writing'] },
  { title: 'Pratibimb (Publication)', href: '/students-corner/Students-Publications?publication=pratibimb', category: 'Students', icon: BookOpen, tags: ['pratibimb', 'publication', 'magazine'] },
  { title: 'Finanza (Publication)', href: '/students-corner/Students-Publications?publication=finanza', category: 'Students', icon: BookOpen, tags: ['finanza', 'publication', 'finance magazine'] },
  { title: 'Techanugraha (Publication)', href: '/students-corner/Students-Publications?publication=techanugraha', category: 'Students', icon: BookOpen, tags: ['techanugraha', 'publication', 'tech magazine', 'it'] },

  // General Student Corner
  { title: 'Students Gallery', href: '/students-corner/gallery', category: 'Students', icon: FileText, tags: ['gallery', 'photos', 'events', 'pictures', 'campus', 'students'] },
  { title: 'Wall of Fame', href: '/students-corner/wall-of-fame', category: 'Students', icon: Award, tags: ['wall of fame', 'toppers', 'achievers', 'students', 'merit', 'distinction'] },
  { title: "Students' Work", href: '/students-work', category: 'Students', icon: FileText, tags: ['students work', 'projects', 'creative', 'assignments'] },
  { title: 'Placement & Career Cell', href: '/placement-portal', category: 'Students', icon: GraduationCap, tags: ['placement', 'career', 'job', 'internship', 'recruitment', 'campus', 'portal', 'guidance', 'counselling'] },
  { title: 'Alumni', href: '/alumni', category: 'Students', icon: Users, tags: ['alumni', 'ex-students', 'graduates', 'network', 'association'] },
  { title: 'Anti-Ragging Cell', href: '/anti-ragging-cell', category: 'Students', icon: Users, tags: ['anti ragging', 'ragging', 'cell', 'committee', 'helpline', 'students'] },

  // ── Examination ───────────────────────────────────────────────
  { title: 'Examination Hub', href: '/examination', category: 'Academics', icon: FileText, tags: ['examination', 'exam', 'timetable', 'schedule', 'results', 'hall ticket', 'admit card', 'seating'] },

  // ── Admission ─────────────────────────────────────────────────
  { title: 'Admissions', href: '/admission', category: 'Admissions', icon: FileText, tags: ['admissions', 'admission', 'apply', 'enroll', 'registration', 'form', 'merit', 'fees'] },
  { title: 'Degree College Admission', href: '/admission/degree-college', category: 'Admissions', icon: FileText, tags: ['admission', 'degree college', 'ug', 'undergraduate', 'apply', 'merit'] },
  { title: 'Jr. College Admission', href: '/admission/jr-college', category: 'Admissions', icon: FileText, tags: ['admission', 'jr college', 'junior', '11th', '12th', 'fyjc', 'apply'] },
  { title: 'Fee Structure', href: '/fee-structure', category: 'Admissions', icon: FileText, tags: ['fee', 'fees', 'structure', 'tuition', 'charges', 'cost', 'annual'] },

  // ── Jr. College ───────────────────────────────────────────────
  { title: 'Junior College Corner', href: '/junior-college-corner', category: 'Jr. College', icon: GraduationCap, tags: ['junior college', 'jr college', 'hsc', '11th', '12th', 'arts', 'science', 'commerce'] },
  { title: 'Jr. College Notices', href: '/jr-college/notice', category: 'Jr. College', icon: Bell, tags: ['junior college', 'notices', 'circulars', 'jr college', 'announcements'] },
  { title: 'Jr. College Result Analysis', href: '/jr-college/result-analysis', category: 'Jr. College', icon: BarChart2, tags: ['junior college', 'result', 'analysis', 'hsc', 'performance', 'results'] },
  { title: 'Jr. College Teaching Staff', href: '/jr-college/teaching-staff', category: 'Jr. College', icon: Users, tags: ['junior college', 'staff', 'teachers', 'faculty', 'jr college'] },

  // ── Administrative Services ───────────────────────────────────
  { title: 'Administrative Services', href: '/administrative-service', category: 'Services', icon: FileText, tags: ['administrative', 'services', 'certificates', 'documents', 'tc', 'bonafide'] },
  { title: 'Bonafide Certificate', href: '/administrative-service/bonafide-certificate', category: 'Services', icon: FileText, tags: ['bonafide', 'certificate', 'bonafied', 'student', 'document'] },
  { title: 'Character Certificate', href: '/administrative-service/character-certificate', category: 'Services', icon: FileText, tags: ['character', 'certificate', 'conduct', 'document'] },
  { title: 'Transfer Certificate (TC)', href: '/administrative-service/transfer-certificate', category: 'Services', icon: FileText, tags: ['tc', 'transfer certificate', 'leaving certificate', 'document'] },
  { title: 'Migration Certificate', href: '/administrative-service/migration-certificate', category: 'Services', icon: FileText, tags: ['migration', 'certificate', 'university migration', 'document'] },
  { title: 'Transcript Certificate', href: '/administrative-service/transcript-certificate', category: 'Services', icon: FileText, tags: ['transcript', 'certificate', 'marksheet', 'document', 'attestation'] },
  { title: 'Duplicate Marksheet', href: '/administrative-service/duplicate-marksheet', category: 'Services', icon: FileText, tags: ['duplicate', 'marksheet', 'marks', 'certificate', 'document'] },
  { title: 'Marksheet Verification', href: '/administrative-service/marksheet-verification', category: 'Services', icon: FileText, tags: ['marksheet', 'verification', 'marks', 'document', 'attest'] },
  { title: 'Caste Validity Certificate', href: '/administrative-service/caste-validity', category: 'Services', icon: FileText, tags: ['caste validity', 'certificate', 'sc', 'st', 'obc', 'document'] },
  { title: 'Conversion Certificate', href: '/administrative-service/conversion-certificate', category: 'Services', icon: FileText, tags: ['conversion', 'certificate', 'medium', 'english', 'document'] },
  { title: 'Form 112 Attestation', href: '/administrative-service/form-112-attestation', category: 'Services', icon: FileText, tags: ['form 112', 'attestation', 'document', 'bonafide'] },
  { title: 'Jr. Bonafide Certificate', href: '/administrative-service/jr-bonafide-certificate', category: 'Services', icon: FileText, tags: ['jr', 'junior', 'bonafide', 'certificate', 'jr college', 'document'] },
  { title: 'Jr. Transfer Certificate', href: '/administrative-service/jr-transfer-certificate', category: 'Services', icon: FileText, tags: ['jr', 'junior', 'tc', 'transfer certificate', 'jr college', 'document'] },

  // ── Other ─────────────────────────────────────────────────────
  { title: 'RTI – Right to Information', href: '/rti', category: 'General', icon: FileText, tags: ['rti', 'right to information', 'transparency', 'public information', 'officer'] },
  { title: 'Infrastructure Gallery', href: '/infrastructure-gallery', category: 'General', icon: FileText, tags: ['infrastructure', 'gallery', 'campus', 'facilities', 'building', 'labs', 'classrooms'] },
];

const categoryColors: Record<string, string> = {
  Programme:     'bg-blue-100 text-blue-700',
  Accreditation: 'bg-yellow-100 text-yellow-700',
  IQAC:          'bg-green-100 text-green-700',
  Autonomous:    'bg-violet-100 text-violet-700',
  Research:      'bg-indigo-100 text-indigo-700',
  Library:       'bg-cyan-100 text-cyan-700',
  Students:      'bg-pink-100 text-pink-700',
  Academics:     'bg-purple-100 text-purple-700',
  Admissions:    'bg-orange-100 text-orange-700',
  'Jr. College': 'bg-amber-100 text-amber-700',
  Services:      'bg-teal-100 text-teal-700',
  About:         'bg-gray-100 text-gray-700',
  Notices:       'bg-red-100 text-red-700',
  General:       'bg-slate-100 text-slate-700',
  Forms:         'bg-lime-100 text-lime-700',
};

const trending = ['B.Com', 'Admission', 'NAAC', 'Examination', 'BMS', 'Library', 'Notices', 'Placement'];


export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(!!initialQ);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return siteIndex.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tags.some(tag => tag.includes(q))
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSubmitted(true);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
  };

  const handleTrending = (term: string) => {
    setQuery(term);
    setSubmitted(true);
    router.push(`/search?q=${encodeURIComponent(term)}`, { scroll: false });
  };

  const clearSearch = () => {
    setQuery('');
    setSubmitted(false);
    router.push('/search', { scroll: false });
    inputRef.current?.focus();
  };

  const grouped = useMemo(() => {
    const map: Record<string, typeof siteIndex> = {};
    results.forEach(r => {
      if (!map[r.category]) map[r.category] = [];
      map[r.category].push(r);
    });
    return map;
  }, [results]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#123B6D] to-[#0d2d54] pt-12 pb-14">
        <div className="max-w-3xl mx-auto px-4 md:px-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)] mb-2">Search MCC</h1>
          <p className="text-white/60 mb-6 text-sm">Find programmes, NAAC documents, notices, forms, and more</p>
          <form onSubmit={handleSearch}>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-2xl">
              <Search size={20} className="text-[#94A3B8] flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setSubmitted(false); }}
                placeholder="Try: B.Com, NAAC, admissions, examination..."
                className="flex-1 text-[#1E293B] outline-none text-base placeholder-[#94A3B8] bg-transparent"
                autoComplete="off"
              />
              {query && (
                <button type="button" onClick={clearSearch} className="text-[#94A3B8] hover:text-[#64748B] transition-colors">
                  <X size={18} />
                </button>
              )}
              <button type="submit" className="px-5 py-2 bg-[#123B6D] text-white font-semibold rounded-xl text-sm hover:bg-[#0d2d54] transition-all">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-12 -mt-6 pb-20 space-y-6">
        {/* Trending – shown when no query */}
        {!query && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
            <h2 className="font-bold text-[#1E293B] font-[var(--font-heading)] mb-4">🔥 Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {trending.map(t => (
                <button key={t} onClick={() => handleTrending(t)}
                  className="px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#64748B] hover:border-[#123B6D] hover:text-[#123B6D] transition-all">
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live suggestions – typed but not submitted */}
        {query && !submitted && results.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <span className="text-xs font-semibold text-[#94A3B8]">{results.length} suggestion{results.length !== 1 ? 's' : ''} — press Enter or click Search</span>
            </div>
            {results.slice(0, 6).map(r => (
              <Link key={r.href} href={r.href}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-[#F8FAFC] border-b border-[#E2E8F0] last:border-0 transition-colors group">
                <div className="flex items-center gap-3">
                  <r.icon size={16} className="text-[#94A3B8] group-hover:text-[#123B6D] transition-colors" />
                  <span className="text-sm text-[#1E293B] group-hover:text-[#123B6D] transition-colors">{r.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${categoryColors[r.category] || 'bg-gray-100 text-gray-700'}`}>{r.category}</span>
                  <ChevronRight size={14} className="text-[#CBD5E1] group-hover:text-[#123B6D] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Full submitted results */}
        {submitted && (
          <>
            {results.length > 0 ? (
              <>
                <p className="text-sm text-[#94A3B8] font-medium">
                  {results.length} result{results.length !== 1 ? 's' : ''} for <span className="text-[#123B6D] font-semibold">"{query}"</span>
                </p>
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2 px-1">{category}</h3>
                    <div className="space-y-2">
                      {items.map(r => (
                        <Link key={r.href} href={r.href}
                          className="flex items-center justify-between bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#123B6D]/10 flex items-center justify-center shrink-0 group-hover:bg-[#123B6D]/20 transition-colors">
                              <r.icon size={18} className="text-[#123B6D]" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-[#1E293B] font-[var(--font-heading)] group-hover:text-[#123B6D] transition-colors">{r.title}</h4>
                              <span className="text-xs text-[#94A3B8]">{r.href}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className={`hidden sm:inline px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColors[r.category] || 'bg-gray-100 text-gray-700'}`}>{r.category}</span>
                            <ArrowRight size={16} className="text-[#CBD5E1] group-hover:text-[#123B6D] transition-colors" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-[#CBD5E1]" />
                </div>
                <h3 className="font-bold text-[#1E293B] font-[var(--font-heading)] mb-2">No results found</h3>
                <p className="text-sm text-[#64748B] mb-6">No results for <span className="font-semibold">"{query}"</span>. Try a different keyword.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {trending.map(t => (
                    <button key={t} onClick={() => handleTrending(t)}
                      className="px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#64748B] hover:border-[#123B6D] hover:text-[#123B6D] transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
