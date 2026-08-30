'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Globe, Building2, Calendar,
  Target, Eye, Flag, CheckCircle2, Download,
  Home, UserPlus, FileText, Trophy, BookOpen, Image as ImageIcon, MapPin, Mail,
  ChevronRight, GraduationCap, Briefcase, Star, Quote, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const linkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const illustriousAlumni = [
  {
    name: 'Mandar Pramod Dixit',
    qualification: 'B.Com, CA, CPA',
    role: 'CFO – Copper Business',
    company: 'Hindalco Industries Ltd, Aditya Birla Group',
    education: ['B.Com – 2004–2006'],
    linkedin: 'https://www.linkedin.com/in/dixitmandar/',
    image: '/illustrate alumini/Mandar Dixit.png',
    testimonial: 'MCC has played a key role in my academic journey. It imbibed discipline, rigour, curiosity and learning aptitude. It shaped the speaker within me by giving me platform for elocution competitions. It gave me friends for lifetime and some professors who remained the Guru forever for me. My father graduated from ML Dahanukar College of PTVA and I had a fortune of graduating from MCC, part of same PTVA. So MCC shall always be special for me as an institution and a shaper of my life journey.',
    highlights: 'AIR 1 at all levels of CA Exams; worked at Chairman\'s Office, Reliance Industries; worked with ICAI in various capacities; contributed to students and alma mater.',
  },
  {
    name: 'Amit Gupta',
    qualification: 'B.Com, Associate Actuary',
    role: 'Manager',
    company: 'SBI Life Insurance Company Limited',
    education: ['B.Com – 2020–2022'],
    linkedin: 'https://www.linkedin.com/in/amit-gupta9985/',
    image: '/illustrate alumini/Amit Gupta.jpg',
    testimonial: 'MCC has definitely helped me provide a platform where your peers are working towards a dream of either becoming an CA, CS or graduating with a good degree. Teachers have done their job well but its student as well who have made the competition alive within the college.',
    highlights: 'Cleared 12/13 papers of Actuarial Science; one of the youngest achievers in the field of Actuary.',
  },
  {
    name: 'Aastha N Dedhiya',
    qualification: 'B.Com, CA',
    role: 'CS Trainee',
    company: 'Alpha Alternatives Financial Services Private Limited',
    education: ['B.Com – 2023–2025'],
    linkedin: 'https://www.linkedin.com/in/aastha-dedhiya-a954352b1',
    image: '/illustrate alumini/Aastha Dedhiya.png',
    testimonial: 'My experience at MCC was very positive. As I was simultaneously pursuing the Company Secretary course, I was unable to attend college every day. Despite that, the college was very disciplined and maintained a supportive learning environment. The faculty members were understanding, approachable, and always willing to help whenever needed. I am grateful for the guidance and encouragement I received, and my time at MCC was a valuable and enriching experience.',
    highlights: 'AIR 2 – CS Executive, December 2023; AIR 8 – CS Professional, December 2024; currently undergoing CS training; hands-on experience in corporate secretarial and regulatory compliance.',
  },
  {
    name: 'Sreejesh Pillai',
    qualification: 'B.Com, CA, MBA',
    role: 'Senior Analyst',
    company: 'Citigroup Global Markets India Private Limited',
    education: ['B.Com – 2016–2018'],
    linkedin: 'https://www.linkedin.com/in/sreejesh-pillai',
    image: '/illustrate alumini/Sreejesh Pillai.jpg',
    testimonial: 'MCC has always been more than just a college for so many of us. I still vividly remember the countless moments that shaped us: not just through academics, but through the lessons beyond the classroom and the memories we created with friends. MCC wasn\u2019t merely a place of learning; it was a family, a home that gave us friendships, values, and experiences that will stay with us for a lifetime.',
    highlights: 'IIM Ahmedabad alumnus; Front Office Investment Banker; Chartered Accountant.',
  },
  {
    name: 'Kriti Singhvi',
    qualification: 'B.Com, CA',
    role: 'Associate',
    company: 'EMK Capital',
    education: ['B.Com – 2014–2016'],
    linkedin: 'https://www.linkedin.com/in/kriti-singhvi',
    image: '/illustrate alumini/Kriti Singhvi.jpeg',
    highlights: 'AIR 37 – CA Final; former Boston Consulting Group employee.',
  },
  {
    name: 'Parth Gupta',
    qualification: 'B.Com, CA, MBA, CFA',
    role: 'Junior Associate – Consulting',
    company: 'McKinsey & Company',
    education: ['B.Com – 2019–2021'],
    linkedin: 'http://www.linkedin.com/in/parth-gupta-ca',
    image: '/illustrate alumini/Parth Gupta.jpg',
    testimonial: 'My time at Mulund College of Commerce gave me a strong academic foundation and prepared me well for the next stage of my journey. The dedicated faculty, structured curriculum, and emphasis on discipline helped me build the knowledge and confidence needed to pursue higher education. I am grateful for the guidance and support I received from my professors throughout my time at the college. I am thankful to the faculty and institution for helping build a strong foundation for my future.',
    highlights: 'AIR 8 – CA Final, May 2022; IIM Bangalore alumnus; Director\'s Merit List at IIM Bangalore.',
  },
  {
    name: 'Vidhi Sanghvi',
    qualification: 'B.Com, CS, LLB',
    role: 'Partner in a CS Firm',
    company: 'ANGC & Co. LLP',
    education: ['B.Com – 2016–2018'],
    linkedin: 'https://www.linkedin.com/in/vidhi-sanghvi-b7b9ab138',
    image: '/mcclogo.png',
    highlights: 'AIR 24 – CS Professional.',
  },
  {
    name: 'Sohan Manjrekar',
    qualification: 'B.Com, CA',
    role: 'CA Finalist',
    company: '',
    education: ['B.Com – 2023–2025'],
    linkedin: 'https://www.linkedin.com/in/ca-sohan-manjrekar-188773282',
    image: '/illustrate alumini/Sohan Manjrekar.jpg',
    highlights: 'AIR 3 – CA Final, May 2026; AIR 6 – CA Intermediate, May 2023.',
  },
  {
    name: 'Shweta S. Marathe',
    qualification: 'B.Com, CS, LL.B., LL.M. (Criminal Law), Diploma in Cyber Law',
    role: 'Judicial Research Assistant',
    company: 'High Court of Bombay',
    education: ['XII – 2015', 'B.Com – 2015–2017'],
    linkedin: 'https://www.linkedin.com/in/shweta-marathe-51422b233',
    image: '/illustrate alumini/SHWETA MARATHE.jpeg',
    testimonial: 'Hello! I was a student of Junior College and B.Com. (Batch 2014-2017) in MCC. Today, when I look back after almost a decade at the journey and association with MCC, and now being a part of a profession that demands consistency, hardwork, and making through the challenges irrespective of the results, the realisation which comes to my mind is that the roots of these values, facing and sailing through the challenges, were set in this very institution. MCC taught me to be strong, going ahead and to lead a life not just for mere survival, but one that is worth living. Thank you!',
    highlights: 'AIR 17 – CS Foundation; worked as Judicial Research Assistant to the former Chief Justice of Bombay High Court; practiced law before Supreme Court, Bombay High Court and Delhi High Court; LL.M. in Criminal Law with Silver Medal; Best Team at Lex Communique-2019 National Law Fest.',
  },
  {
    name: 'Rutuja Rajesh Rasika Satam',
    qualification: 'B.Com, CS, PGDM, LLB',
    role: 'Manager – Secretarial',
    company: 'Restaurant Brands Asia Limited',
    education: ['B.Com – 2015–2017'],
    linkedin: 'https://www.linkedin.com/in/rutuja-satam-056362181',
    image: '/illustrate alumini/Rutuja Satam.JPG',
    testimonial: 'The studious environment pushed my ambitions, our incredible professors inspired us to strive for the best and being surrounded by driven and passionate peers made a difference.',
    highlights: 'AIR 5 – CS Foundation; handled Acquisition, Takeover, IPO, Fund Raising through Equity and Debt, and ESOP implementation across different industries.',
  },
  {
    name: 'Ameya Joshi',
    qualification: 'B.Com, CA, MA (International Relations)',
    role: 'Program Manager',
    company: 'AidData at William & Mary',
    education: ['B.Com – 2015–2017'],
    linkedin: 'http://www.linkedin.com/in/ameyaajoshi',
    image: '/illustrate alumini/Ameya Joshi.jpeg',
    testimonial: 'My time at MCC challenged me academically while genuinely investing in my professional trajectory through professors\' mentorship. The blend of rigor and mentorship is what makes MCC click! As a second generation MCCian (my mother is an alumna too), we have nothing but praise at home for the rigor and dedication that MCC faculty show in nurturing their students into becoming talented professionals!',
    highlights: 'Johns Hopkins SAIS alumnus; Chartered Accountant; GPODS Fellow at Global Policy Insights; former intern at South African Reserve Bank; works in economic research at AidData.',
  },
  {
    name: 'Anurag Dhage',
    qualification: 'B.Com, CA, MBA',
    role: 'Management Consultant',
    company: 'PKF Consulting',
    education: ['B.Com – 2016–2018'],
    linkedin: 'https://www.linkedin.com/in/anuragdhage',
    image: '/illustrate alumini/Anurag Dhage.jpg',
    highlights: 'IIM Kozhikode alumnus.',
  },
  {
    name: 'Aishwarya Rajaraman',
    qualification: 'B.Com, CA, MBA',
    role: 'Deputy Manager',
    company: 'Trent',
    education: ['B.Com – 2016–2018'],
    linkedin: 'https://www.linkedin.com/in/aishwarya-r-68847618a',
    image: '/illustrate alumini/Aishwarya Rajaraman.png',
    testimonial: 'I met some of the best people and teachers at MCC, who pushed me to aim high were always there my side.',
    highlights: 'IIM Ahmedabad alumna; Chartered Accountant.',
  },
  {
    name: 'Dr. Hariharan Ramasubramanian',
    qualification: 'B.Com, CA, US CMA, PhD, MBA',
    role: 'Assistant Professor of Managerial Accounting',
    company: 'Frankfurt School of Finance and Management',
    education: ['B.Com – 2004–2006', 'M.Com (AA) – 2006–2008'],
    linkedin: 'https://www.linkedin.com/in/hari-ramasubramanian-97508642/',
    image: '/illustrate alumini/Hariharan R..png',
    testimonial: 'I spent my formative years at MCC and it provided excellent launchpad at an affordable cost. The highlight was the quality of students and the healthy competition among academically inclined students.',
    highlights: 'US CMA Gold Medalist; MBA from Harvard Business School; AIR 26 – CA Foundation; AIR 50 – CA Intermediate; ICAI 40 Under 40 Business Leader Awardee; Deloitte Doctoral Fellowship; Innovations in Management Accounting Education Award.',
  },
  {
    name: 'Rahul Yogesh Pai',
    qualification: 'B.Com, CA',
    role: 'Credit Analyst',
    company: 'Kotak Mahindra Bank',
    education: ['B.Com – 2022–2024'],
    linkedin: 'https://www.linkedin.com/in/ca-rahul-pai-34051b242',
    image: '/illustrate alumini/Rahul Pai.jpg',
    testimonial: 'Great place for continuing my education, with highly experienced faculty and a lot of support provided in my professional education.',
    highlights: 'AIR 40 – CA Intermediate, May 2022.',
  },
  {
    name: 'Supriya Patil',
    qualification: 'B.Com, CFA',
    role: 'Associate Vice President – Finance',
    company: 'Tata Capital Limited',
    education: ['B.Com – 2014–2016'],
    linkedin: 'https://www.linkedin.com/in/supriya-patil-214917108/',
    image: '/illustrate alumini/Supriya Patil.jpeg',
    highlights: 'B.Com Gold Medalist at University of Mumbai; Annual Crest Award recipient; CFO\'s Award for automating Expected Credit Loss model; selected as Emerging Leader in Talent Management Program.',
  },
  {
    name: 'Preethi Shekhar Goundar',
    qualification: 'B.Com, CA',
    role: 'Director',
    company: 'Deloitte Haskins & Sells LLP',
    education: ['B.Com – 2016–2018', 'M.Com (AA) – 2018–2020'],
    linkedin: '#',
    image: '/illustrate alumini/preethi shekar.jpeg',
    highlights: 'One of the youngest Directors at Deloitte India.',
  },
  {
    name: 'Nidhi Savla',
    qualification: 'B.Com, CA',
    role: 'Associate',
    company: 'EY',
    education: ['B.Com – 2023–2025'],
    linkedin: 'https://www.linkedin.com/in/nidhisavla123',
    image: '/illustrate alumini/NIDHI SAVLA.png',
    testimonial: 'My three years at MCC have been an integral part of my journey. The learning, guidance, and experiences I gained here shaped me both personally and professionally and contributed greatly to my journey towards becoming a Chartered Accountant.',
    highlights: 'AIR 40 – CA Intermediate, May 2023.',
  }
];
const categories = [
  'All Alumni',
  'Business Leaders',
  'Academics',
  'Arts & Culture',
  'Public Service',
  'Science & Technology'
];

const TestimonialBox = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 100;
  const displayText = expanded ? text : (isLong ? text.slice(0, 100) + '...' : text);

  return (
    <div className="bg-[#F8F9FB] rounded-[12px] p-4 flex-1 flex items-start gap-2.5 relative overflow-hidden">
      <div className="shrink-0 pt-0.5 relative z-10">
        <Quote size={18} className="text-[#123B6D] fill-[#123B6D] rotate-180" />
        <div className="w-[2px] h-8 bg-[#D4A017] ml-2 mt-1.5 rounded-full"></div>
      </div>
      <div className="z-10 flex-1 pt-0.5">
        <p className="text-[#334155] leading-relaxed italic text-[13px] font-medium">
          {displayText}
        </p>
        {isLong && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 font-semibold text-[12px] mt-1 hover:underline focus:outline-none"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
      <Quote size={40} className="text-[#123B6D]/5 absolute bottom-2 right-2 fill-[#123B6D]" />
    </div>
  );
};

export default function AlumniPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [alumni, setAlumni] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [courseFilter, setCourseFilter] = useState('All');
  const [spotlightOnly, setSpotlightOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    async function fetchAlumni() {
      const { data } = await supabase
        .from('mcc_illustrious_alumni')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) {
        setAlumni(data);
      }
    }
    fetchAlumni();
  }, []);

  const COURSE_OPTIONS = [
    'All',
    'HSC',
    'B.Com',
    'B.Com (Accounting & Finance)',
    'B.Com (Banking & Insurance)',
    'B.Com (Financial Markets)',
    'B.Com (Management Studies)',
    'B.Com (Business Administration)',
    'B.Sc (Computer Science)',
    'B.Sc (Information Technology)',
    'B.Sc (Computer Applications)',
    'B.Sc (Data Science)',
    'BA (Multimedia & Mass Communication)',
    'B.Com BFSI',
    'M.Com (Advanced Accountancy)',
    'M.Com (Business Management)',
    'M.Com (Banking & Finance)',
    'M.Sc (Information Technology)',
    'M.Sc (Finance)',
    'Ph.D',
  ];

  const filteredAlumni = alumni
    .filter(s => spotlightOnly ? s.show_on_home : true)
    .filter(s => {
      if (courseFilter === 'All') return true;
      if (courseFilter === 'HSC') return !!s.hsc;
      // Check each course field individually — show card if ANY field matches the filter (bidirectional partial match)
      const fields = [s.course, s.ug, s.pg, s.hsc].filter(Boolean).map(String);
      const filterLower = courseFilter.toLowerCase();
      return fields.some(f =>
        f.toLowerCase().includes(filterLower) || filterLower.includes(f.toLowerCase())
      );
    })
    .sort((a, b) => {
      const yearA = parseInt(a.ug_passout_year || a.pg_passout_year || a.hsc_passout_year || a.year_passout || '0');
      const yearB = parseInt(b.ug_passout_year || b.pg_passout_year || b.hsc_passout_year || b.year_passout || '0');
      return sortOrder === 'latest' ? yearB - yearA : yearA - yearB;
    });

  const stats = [
    { icon: Users, value: '15,000+', label: 'Alumni' },
    { icon: Globe, value: '50+', label: 'Countries' },
    { icon: Building2, value: '300+', label: 'Companies' },
    { icon: Calendar, value: '1970', label: 'Legacy', prefix: 'Since' },
  ];



  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 mt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Section 1: About Alumni Association */}
              <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-10 items-stretch">

                {/* Left Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg h-[320px] lg:h-auto border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80"
                    alt="Campus"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right: About Text & Mission/Vision/Objectives */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-4xl font-bold text-[#123B6D] mb-5">About Alumni Association</h2>
                  <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                    The MCC Alumni Association is a vibrant community of former students, working together to support the college and each other. We believe in giving back, sharing knowledge, and creating opportunities that make a difference.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 text-[#123B6D] font-bold mb-3">
                        <div className="bg-blue-50 p-2.5 rounded-xl">
                          <Target size={22} />
                        </div>
                        <h3 className="text-lg">Our Mission</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        To connect, engage and empower alumni to contribute to the growth of the college and society.
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 text-[#123B6D] font-bold mb-3">
                        <div className="bg-blue-50 p-2.5 rounded-xl">
                          <Eye size={22} />
                        </div>
                        <h3 className="text-lg">Our Vision</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        To be a globally connected alumni network that inspires lifelong relationships and creates impact.
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 text-[#123B6D] font-bold mb-3">
                        <div className="bg-blue-50 p-2.5 rounded-xl">
                          <Flag size={22} />
                        </div>
                        <h3 className="text-lg">Our Objectives</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Foster networking, encourage mentorship, promote collaboration and support alma mater.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Wall of Fame / Alumni Cards */}
              <div className="mt-16">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Illustrious Alumni</h2>
                    <p className="text-sm text-[#64748B] mt-1">Celebrating our outstanding achievers and prominent alumni</p>
                  </div>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsFilterOpen(true)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                      </svg>
                      Filters
                      {(courseFilter !== 'All' || spotlightOnly || sortOrder !== 'latest') && (
                        <div className="w-2 h-2 rounded-full bg-[#123B6D]"></div>
                      )}
                    </button>
                    
                    {/* Active Filters Preview */}
                    <div className="hidden sm:flex items-center gap-2">
                      {courseFilter !== 'All' && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                          {courseFilter}
                        </span>
                      )}
                      {spotlightOnly && (
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100 flex items-center gap-1">
                          <Star size={12} className="fill-amber-500" /> Spotlight
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Result count */}
                  <span className="text-[13px] font-medium text-gray-400">
                    {filteredAlumni.length} alumni found
                  </span>
                </div>

                {/* Filter Slide Window (Drawer) */}
                <AnimatePresence>
                  {isFilterOpen && (
                    <>
                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsFilterOpen(false)}
                        className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
                      />
                      
                      {/* Drawer */}
                      <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col border-l border-gray-100"
                      >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                          <h3 className="text-xl font-bold text-[#123B6D] flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                            </svg>
                            Filters & Sorting
                          </h3>
                          <button
                            onClick={() => setIsFilterOpen(false)}
                            className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-xl transition-colors"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                          </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                          {/* Sort */}
                          <div>
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Sort By</h4>
                            <div className="flex bg-gray-50 border border-gray-200 rounded-xl p-1">
                              <button
                                onClick={() => setSortOrder('latest')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                                  sortOrder === 'latest' ? 'bg-[#123B6D] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                              >
                                Latest First
                              </button>
                              <button
                                onClick={() => setSortOrder('oldest')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                                  sortOrder === 'oldest' ? 'bg-[#123B6D] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                              >
                                Oldest First
                              </button>
                            </div>
                          </div>

                          {/* Quick Filters */}
                          <div>
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Filters</h4>
                            <button
                              onClick={() => setSpotlightOnly(!spotlightOnly)}
                              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                                spotlightOnly 
                                  ? 'bg-amber-50 border-amber-200' 
                                  : 'bg-white border-gray-200 hover:border-amber-200 hover:bg-amber-50/30'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${spotlightOnly ? 'bg-amber-100' : 'bg-gray-50'}`}>
                                  <Star size={18} className={spotlightOnly ? 'fill-amber-500 text-amber-500' : 'text-gray-400'} />
                                </div>
                                <div className="text-left">
                                  <div className={`font-bold text-sm ${spotlightOnly ? 'text-amber-900' : 'text-gray-700'}`}>Spotlight Alumni</div>
                                  <div className="text-xs text-gray-500 mt-0.5">Show only home page featured alumni</div>
                                </div>
                              </div>
                              <div className={`w-5 h-5 rounded flex items-center justify-center border ${spotlightOnly ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                                {spotlightOnly && <CheckCircle2 size={14} className="text-white" />}
                              </div>
                            </button>
                          </div>

                          {/* Programmes */}
                          <div>
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Programmes</h4>
                            <div className="flex flex-col gap-2">
                              {COURSE_OPTIONS.map(opt => {
                                const isActive = courseFilter === opt;
                                return (
                                  <button
                                    key={opt}
                                    onClick={() => setCourseFilter(opt)}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                                      isActive 
                                        ? 'bg-[#123B6D]/5 border-[#123B6D] text-[#123B6D]' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#123B6D]/30 hover:bg-gray-50'
                                    }`}
                                  >
                                    <span className="text-sm font-bold text-left">{opt}</span>
                                    {isActive && <div className="w-2 h-2 rounded-full bg-[#123B6D]" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-white">
                          <button
                            onClick={() => setIsFilterOpen(false)}
                            className="w-full py-3.5 bg-[#123B6D] text-white rounded-xl font-bold hover:bg-[#0d2a4f] transition-colors"
                          >
                            Show Results ({filteredAlumni.length})
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full pb-12">
                  {filteredAlumni.length === 0 ? (
                    <div className="col-span-2 text-center py-16 text-gray-400">
                      <GraduationCap size={40} className="mx-auto mb-3 opacity-30" />
                      <p className="text-lg font-medium">No alumni found for this filter.</p>
                    </div>
                  ) : filteredAlumni.map((student, i) => (
                    <div key={i} className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col h-full hover:shadow-lg transition-all min-h-[360px]">
                      {/* Top Section */}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-4">
                        {/* Left Column */}
                        <div className="w-full sm:w-[130px] shrink-0 flex flex-col">
                          <div className="w-full aspect-[4/5] rounded-[16px] overflow-hidden bg-gray-50 mb-2.5">
                            <img src={student.image_url} alt={student.name} className="w-full h-full object-cover" />
                          </div>
                          <h3 className="font-extrabold text-[#0a1b3f] text-[18px] leading-tight mb-1 line-clamp-2">{student.name}</h3>
                          <p className="text-[#D4A017] font-bold text-[9px] tracking-[0.2em] uppercase">Alumni</p>
                          <div className="w-8 h-[2px] bg-[#D4A017] mt-2"></div>
                        </div>

                        {/* Right Column */}
                        <div className="flex-1 flex flex-col gap-0 justify-start pt-1">
                          {/* Qualification */}
                          {(student.qualification || student.course) && (
                            <div className="flex items-center gap-2.5 py-1.5 border-b border-gray-100/80 last:border-0">
                              <div className="w-8 h-8 rounded-full bg-orange-50/80 text-orange-500 flex items-center justify-center shrink-0">
                                <GraduationCap size={14} strokeWidth={1.5} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-[#0a1b3f] leading-none mb-0.5">Qualification</span>
                                <span className="text-[12px] text-gray-600 line-clamp-2 leading-snug">{student.qualification || student.course}</span>
                              </div>
                            </div>
                          )}

                          {/* Association with MCC */}
                          {(() => {
                            const raw = student.mcc_association || null;
                            let display = '';
                            if (raw) {
                              try {
                                const parsed = JSON.parse(raw);
                                if (Array.isArray(parsed)) {
                                  display = parsed.filter((e: any) => e.programme).map((e: any) => e.batch ? `${e.programme} (${e.batch})` : e.programme).join(', ');
                                }
                              } catch {
                                display = raw;
                              }
                            } else {
                              const parts = [
                                student.hsc && student.hsc_passout_year ? `HSC (${student.hsc_passout_year})` : student.hsc ? 'HSC' : null,
                                student.ug && student.ug_passout_year ? `UG (${student.ug_passout_year})` : student.ug ? 'UG' : null,
                                student.pg && student.pg_passout_year ? `PG (${student.pg_passout_year})` : student.pg ? 'PG' : null,
                              ].filter(Boolean);
                              display = parts.join(', ');
                            }
                            return display ? (
                              <div className="flex items-center gap-2.5 py-1.5 border-b border-gray-100/80 last:border-0">
                                <div className="w-8 h-8 rounded-full bg-blue-50/80 text-blue-500 flex items-center justify-center shrink-0">
                                  <Calendar size={14} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[11px] font-bold text-[#0a1b3f] leading-none mb-0.5">Association with MCC</span>
                                  <span className="text-[12px] text-gray-600 line-clamp-2 leading-snug">{display}</span>
                                </div>
                              </div>
                            ) : null;
                          })()}

                          {student.designation && (
                            <div className="flex items-center gap-2.5 py-1.5 border-b border-gray-100/80 last:border-0">
                              <div className="w-8 h-8 rounded-full bg-emerald-50/80 text-emerald-600 flex items-center justify-center shrink-0">
                                <Briefcase size={14} strokeWidth={1.5} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-[#0a1b3f] leading-none mb-0.5">Designation</span>
                                <span className="text-[12px] text-gray-600 line-clamp-1 leading-snug">{student.designation}</span>
                              </div>
                            </div>
                          )}

                          {student.company_name && (
                            <div className="flex items-center gap-2.5 py-1.5 border-b border-gray-100/80 last:border-0">
                              <div className="w-8 h-8 rounded-full bg-purple-50/80 text-purple-600 flex items-center justify-center shrink-0">
                                <Building2 size={14} strokeWidth={1.5} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-[#0a1b3f] leading-none mb-0.5">Company</span>
                                <span className="text-[12px] text-gray-600 line-clamp-1 leading-snug">{student.company_name}</span>
                              </div>
                            </div>
                          )}

                          {student.achieved && (
                            <div className="flex items-center gap-2.5 py-1.5 border-b border-gray-100/80 last:border-0">
                              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                <Trophy size={14} strokeWidth={1.5} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-[#0a1b3f] leading-none mb-0.5">Achievement</span>
                                <span className="text-[12px] text-gray-600 line-clamp-2 leading-snug">{student.achieved}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* LinkedIn Button */}
                      {student.linkedin_link && (
                        <a href={student.linkedin_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full px-4 py-2 rounded-[10px] border border-blue-100 bg-[#F4F8FF] text-blue-600 text-[12px] font-bold hover:bg-blue-50 transition-colors mb-4 mt-auto">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          <span>View on LinkedIn</span>
                          <ArrowRight size={14} className="text-blue-500" />
                        </a>
                      )}

                      {/* Description Box */}
                      {student.testimonial && (
                        <TestimonialBox text={student.testimonial} />
                      )}
                    </div>
                  ))}
                </div>
              </div>


            </motion.div>
          )}

          {activeTab !== 'overview' && (
            <motion.div
              key="other"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-20 text-center min-h-[400px] flex flex-col items-center justify-center"
            >
              <h2 className="text-3xl font-bold text-[#123B6D] mb-4 capitalize">{activeTab.replace('-', ' ')}</h2>
              <p className="text-gray-500 max-w-lg mx-auto">This section is currently under development. Please check back later for updates regarding the alumni {activeTab.replace('-', ' ')}.</p>
              {activeTab === 'hall-of-fame' && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
                  {['2015-2025', '2005-2015', '1995-2005', '1986-1995', '1973-1985'].map(batch => (
                    <div key={batch} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-[#123B6D] transition-colors">
                      <span className="font-bold text-[#123B6D]">{batch}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

