'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, X, ArrowRight, BookOpen, GraduationCap, FileText, Users, Award, BarChart2, Phone, Bell, ChevronRight } from 'lucide-react';

const siteIndex = [
  // UG Programmes
  { title: 'B.Com – Bachelor of Commerce', href: '/programmes/ug/bcom', category: 'Programme', icon: GraduationCap, tags: ['bcom', 'b.com', 'commerce', 'bachelor', 'ug', 'undergraduate', 'finance', 'accounting', 'taxation'] },
  { title: 'BMS – Bachelor of Management Studies', href: '/programmes/ug/bms', category: 'Programme', icon: GraduationCap, tags: ['bms', 'management', 'bachelor', 'ug', 'undergraduate', 'business', 'leadership'] },
  { title: 'BBA – Bachelor of Business Administration', href: '/programmes/ug/bba', category: 'Programme', icon: GraduationCap, tags: ['bba', 'business', 'administration', 'bachelor', 'ug', 'undergraduate', 'corporate'] },
  { title: 'BCA – Bachelor of Computer Applications', href: '/programmes/ug/bca', category: 'Programme', icon: GraduationCap, tags: ['bca', 'computer', 'applications', 'bachelor', 'ug', 'undergraduate', 'it', 'software'] },
  { title: 'BSc IT – Bachelor of Science in Information Technology', href: '/programmes/ug/bscit', category: 'Programme', icon: GraduationCap, tags: ['bscit', 'bsc', 'it', 'information technology', 'science', 'bachelor', 'ug', 'network', 'software'] },
  { title: 'Data Science (DS)', href: '/programmes/ug/ds', category: 'Programme', icon: GraduationCap, tags: ['ds', 'data science', 'analytics', 'machine learning', 'big data', 'ug', 'undergraduate'] },
  // PG Programmes
  { title: 'MCom – Master of Commerce', href: '/programmes/pg/mcom', category: 'Programme', icon: GraduationCap, tags: ['mcom', 'm.com', 'master', 'commerce', 'pg', 'postgraduate', 'advanced', 'finance'] },
  { title: 'MSc IT – Master of Science in Information Technology', href: '/programmes/pg/mscit', category: 'Programme', icon: GraduationCap, tags: ['mscit', 'msc', 'it', 'information technology', 'master', 'pg', 'postgraduate', 'computing'] },
  // Junior & Senior College
  { title: 'Jr. College (11th & 12th)', href: '/programmes/jr-college', category: 'Programme', icon: GraduationCap, tags: ['jr college', 'junior college', '11th', '12th', 'fyjc', 'syjc', 'science', 'commerce', 'arts', 'hsc'] },
  { title: 'Sr. College', href: '/programmes/sr-college', category: 'Programme', icon: GraduationCap, tags: ['sr college', 'senior college', 'degree', 'ug'] },
  // Accreditation
  { title: 'IQAC – Internal Quality Assurance Cell', href: '/iqac', category: 'IQAC', icon: Award, tags: ['iqac', 'quality', 'assurance', 'internal', 'aqar', 'feedback', 'audit'] },
  { title: 'NAAC – A+ Accreditation (CGPA 3.42)', href: '/naac', category: 'NAAC', icon: Award, tags: ['naac', 'accreditation', 'cgpa', 'grade', 'a+', 'ssr', 'criteria', 'cycle', '3.42', 'national assessment'] },
  { title: 'NIRF Ranking', href: '/nirf', category: 'NIRF', icon: BarChart2, tags: ['nirf', 'ranking', 'national', 'institutional', 'framework', 'score', 'ministry', 'rank'] },
  // About
  { title: 'Vision & Mission', href: '/about/vision-mission', category: 'About', icon: BookOpen, tags: ['vision', 'mission', 'about', 'mcc', 'values', 'goals'] },
  { title: 'College Management', href: '/about/management', category: 'About', icon: Users, tags: ['management', 'governing body', 'trust', 'committee', 'administration'] },
  { title: "Principal's Message", href: '/about/principal', category: 'About', icon: Users, tags: ['principal', 'message', 'head', 'about'] },
  { title: 'Milestones & Achievements', href: '/about/milestones', category: 'About', icon: Award, tags: ['milestones', 'achievements', 'history', 'awards', 'about'] },
  { title: 'Organogram', href: '/about/organogram', category: 'About', icon: Users, tags: ['organogram', 'structure', 'hierarchy', 'departments'] },
  { title: 'Activity Committees', href: '/about/committees', category: 'About', icon: Users, tags: ['committees', 'activity', 'clubs', 'cultural', 'sports', 'nss'] },
  { title: 'Code of Conduct', href: '/about/conduct', category: 'About', icon: FileText, tags: ['code of conduct', 'rules', 'discipline', 'about'] },
  // Academics & Services
  { title: 'Examination Hub', href: '/examination', category: 'Academics', icon: FileText, tags: ['examination', 'exam', 'timetable', 'schedule', 'results', 'hall ticket', 'admit card'] },
  { title: 'Admissions', href: '/admissions', category: 'Admissions', icon: FileText, tags: ['admissions', 'admission', 'apply', 'enroll', 'registration', 'form', 'merit', 'fees'] },
  { title: 'Notices & Circulars', href: '/notices', category: 'Notices', icon: Bell, tags: ['notices', 'circular', 'announcements', 'updates', 'latest', 'news'] },
  { title: 'Gallery', href: '/gallery', category: 'Gallery', icon: FileText, tags: ['gallery', 'photos', 'events', 'pictures', 'images', 'campus'] },
  { title: 'Contact Us', href: '/contact', category: 'Contact', icon: Phone, tags: ['contact', 'address', 'phone', 'email', 'location', 'map', 'reach', 'helpdesk'] },
  { title: 'Forms & Applications', href: '/forms', category: 'Forms', icon: FileText, tags: ['forms', 'application', 'scholarship', 'bonafide', 'tc', 'certificate', 'ebc', 'download'] },
];

const categoryColors: Record<string, string> = {
  Programme: 'bg-blue-100 text-blue-700',
  NAAC: 'bg-yellow-100 text-yellow-700',
  NIRF: 'bg-purple-100 text-purple-700',
  IQAC: 'bg-green-100 text-green-700',
  Academics: 'bg-indigo-100 text-indigo-700',
  About: 'bg-gray-100 text-gray-700',
  Notices: 'bg-red-100 text-red-700',
  Admissions: 'bg-orange-100 text-orange-700',
  Forms: 'bg-teal-100 text-teal-700',
  Gallery: 'bg-pink-100 text-pink-700',
  Contact: 'bg-slate-100 text-slate-700',
};

const trending = ['B.Com', 'BMS', 'Admissions', 'NAAC', 'Examination', 'BCA', 'Notices', 'NIRF'];

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
      <div className="bg-gradient-to-br from-[#123B6D] to-[#0d2d54] pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)] mb-2">Search MCC</h1>
          <p className="text-white/60 mb-8 text-sm">Find programmes, NAAC documents, notices, forms, and more</p>
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
