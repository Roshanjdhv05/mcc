'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Sparkles, ChevronLeft, Home, MessageSquare, GraduationCap, FileText, BookOpen, Award, CreditCard, ChevronRight, Megaphone, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type ViewState = 'main' | 'admissions' | 'scholarships' | 'examinations' | 'certificates' | 'courses' | 'forms' | 'broadcast' | 'ug_courses' | 'pg_courses' | 'course_details' | 'generic_details';

interface HistoryState {
  view: ViewState;
  data?: any;
}

interface Message {
  from: 'user' | 'bot';
  text: string;
}

export default function AIAssistant() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<HistoryState[]>([{ view: 'main' }]);
  const [broadcastFilter, setBroadcastFilter] = useState<'all' | 'events' | 'activities'>('all');
  const [hasUnread, setHasUnread] = useState(true);
  const [broadcasts, setBroadcasts] = useState<{ id: string; content: string; created_at: string }[]>([]);
  const [broadcastsLoading, setBroadcastsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const fetchBroadcasts = async () => {
    setBroadcastsLoading(true);
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('mcc_news_announcements')
      .select('id, content, created_at')
      .eq('is_archived', false)
      .gte('expiry_date', today)
      .order('created_at', { ascending: false });
    if (data) setBroadcasts(data);
    setBroadcastsLoading(false);
  };

  const current = history[history.length - 1];
  const view = current.view;
  const data = current.data;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [view]);

  useEffect(() => {
    if (view === 'broadcast') {
      fetchBroadcasts();
    }
  }, [view]);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setHasUnread(false);
      setHistory([{ view: 'main' }, { view: 'broadcast' }]);
      fetchBroadcasts();
    };
    document.addEventListener('open-assistant', handler);
    return () => document.removeEventListener('open-assistant', handler);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setHistory([{ view: 'main' }]);
    }, 300);
  };

  const navigate = (newView: ViewState, newData?: any) => {
    setHistory(prev => [...prev, { view: newView, data: newData }]);
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const goHome = () => {
    setHistory([{ view: 'main' }]);
  };

  // ── DATA DEFINITIONS ──

  const ugCourses = [
    { name: 'B.Com', desc: 'Bachelor of Commerce', duration: '3 Years', seats: 600, timing: '07:15 AM – 10:40 AM', href: '/programmes/ug/bcom' },
    { name: 'B.Com (MS)', desc: 'Bachelor of Commerce (Management Studies)', duration: '3 Years', seats: 120, timing: '12:00 PM – 04:30 PM', href: '/programmes/ug/bcom-ms' },
    { name: 'B.Com (BA)', desc: 'Bachelor of Commerce (Business Administration)', duration: '3 Years', seats: 60, timing: '12:00 PM – 04:30 PM', href: '/programmes/ug/bcom-ba' },
    { name: 'BAF', desc: 'Bachelor of Commerce (Accounting & Finance)', duration: '3 Years', seats: 120, timing: '07:15 AM – 11:40 AM', href: '/programmes/ug/baf' },
    { name: 'BBI', desc: 'Bachelor of Commerce (Banking & Insurance)', duration: '3 Years', seats: 60, timing: '07:15 AM – 11:40 AM', href: '/programmes/ug/bbi' },
    { name: 'BFM', desc: 'Bachelor of Commerce (Financial Markets)', duration: '3 Years', seats: 60, timing: '12:00 PM – 04:30 PM', href: '/programmes/ug/bfm' },
    { name: 'BFSI', desc: 'Bachelor of Commerce (Banking, Financial Services & Insurance)', duration: '3 Years', seats: 60, timing: '—', href: '/programmes/ug/bfsi' },
    { name: 'B.Sc (CS)', desc: 'Bachelor of Science (Computer Science)', duration: '3 Years', seats: 120, timing: '07:15 AM – 11:40 AM', href: '/programmes/ug/sct/bsc-cs' },
    { name: 'B.Sc (IT)', desc: 'Bachelor of Science (Information Technology)', duration: '3 Years', seats: 120, timing: '10:40 AM – 04:15 PM', href: '/programmes/ug/sct/bsc-it' },
    { name: 'B.Sc (DS)', desc: 'Bachelor of Science (Data Science)', duration: '3 Years', seats: 60, timing: '02:05 PM – 08:10 PM', href: '/programmes/ug/sct/bsc-ds' },
    { name: 'B.Sc (CA)', desc: 'Bachelor of Science (Computer Applications)', duration: '3 Years', seats: 60, timing: '02:05 PM – 08:10 PM', href: '/programmes/ug/sct/bsc-ca' },
    { name: 'B.A (MMC)', desc: 'Bachelor of Arts (Multimedia & Mass Communication)', duration: '3 Years', seats: 60, timing: '12:00 PM – 04:30 PM', href: '/programmes/ug/bammc' },
  ];

  const pgCourses = [
    { name: 'M.Com', desc: 'Master of Commerce', duration: '2 Years', seats: 60 },
    { name: 'MSc IT', desc: 'M.Sc Information Technology', duration: '2 Years', seats: 60 },
    { name: 'MSc CS', desc: 'M.Sc Computer Science', duration: '2 Years', seats: 60 },
    { name: 'PhD', desc: 'Doctor of Philosophy', duration: '3-5 Years', seats: 20 },
  ];

  // ── RENDERERS ──

  const renderHeaderOptions = () => (
    <div className="flex items-center gap-2">
      {history.length > 1 && (
        <button onClick={goBack} className="p-1.5 rounded-full hover:bg-white/20 transition-colors" title="Back">
          <ChevronLeft size={18} />
        </button>
      )}
      {view !== 'main' && (
        <button onClick={goHome} className="p-1.5 rounded-full hover:bg-white/20 transition-colors" title="Main Menu">
          <Home size={18} />
        </button>
      )}
      {view !== 'broadcast' && (
        <button onClick={() => { navigate('broadcast'); setHasUnread(false); fetchBroadcasts(); }} className="relative p-1.5 rounded-full hover:bg-white/20 transition-colors" title="College Broadcasts">
          <motion.div
            animate={hasUnread ? { rotate: [0, -20, 20, -20, 20, 0], color: ['#ffffff', '#eab308', '#ffffff'] } : {}}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "top center" }}
          >
            <Megaphone size={18} />
          </motion.div>
          {hasUnread && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#123B6D]" />}
        </button>
      )}
    </div>
  );

  const ActionButton = ({ icon: Icon, label, onClick, highlight = false }: any) => (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
        highlight 
          ? 'bg-[#123B6D] text-white border-[#123B6D] shadow-md' 
          : 'bg-white border-[#E2E8F0] text-[#1E293B] hover:border-[#123B6D]/30 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3 font-medium">
        {Icon && <Icon size={20} className={highlight ? 'text-[#D4A017]' : 'text-[#123B6D]'} />}
        {label}
      </div>
      <ChevronRight size={18} className={highlight ? 'text-white/50' : 'text-[#94A3B8]'} />
    </motion.button>
  );

  return (
    <>
      <motion.button
        onClick={() => { setOpen(true); }}
        className={`fixed bottom-20 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full bg-[#123B6D] text-white shadow-xl flex items-center justify-center ${open ? 'hidden' : 'flex'}`}
        animate={
          hasUnread 
            ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.05, 1] } 
            : { scale: [1, 1.05, 1] }
        }
        transition={{ repeat: Infinity, duration: hasUnread ? 1.5 : 3, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bot size={26} />
        {hasUnread && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-[#123B6D] rounded-full" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-[70] w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[85vh] bg-[#F8FAFC] rounded-3xl shadow-2xl border border-[#E2E8F0] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#123B6D] text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4A017] flex items-center justify-center text-white">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="font-bold text-[15px] font-[var(--font-heading)]">MCC Assistant</p>
                  <p className="text-[11px] text-white/80">Digital Help Desk</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {renderHeaderOptions()}
                <button onClick={handleClose} className="p-1.5 ml-1 rounded-full hover:bg-white/20 transition-colors bg-white/10">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-5 relative no-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  
                  {/* MAIN MENU */}
                  {view === 'main' && (
                    <>
                      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl rounded-tl-sm shadow-sm mb-6">
                        <p className="text-sm text-[#1E293B] leading-relaxed">
                          👋 <strong>Welcome to MCC Digital Assistant.</strong><br/><br/>
                          Get the latest broadcasts, or view details for Admissions, Scholarships, Examinations, Courses, and Forms.<br/><br/>
                          Please choose an option below to continue.
                        </p>
                      </div>
                      <div className="space-y-2.5">
                        <ActionButton icon={GraduationCap} label="Admissions" onClick={() => navigate('admissions')} />
                        <ActionButton icon={CreditCard} label="Scholarships" onClick={() => navigate('scholarships')} />
                        <ActionButton icon={BookOpen} label="Courses" onClick={() => navigate('courses')} />
                        <ActionButton icon={FileText} label="Forms" onClick={() => navigate('forms')} />
                        <ActionButton 
                          icon={Megaphone} 
                          label={
                            <div className="flex items-center gap-2">
                              College Broadcasts 
                              {hasUnread && <span className="px-2 py-0.5 text-[10px] bg-red-500 text-white rounded-full animate-pulse">New</span>}
                            </div>
                          } 
                          highlight 
                          onClick={() => { navigate('broadcast'); setHasUnread(false); fetchBroadcasts(); }} 
                        />
                      </div>
                    </>
                  )}

                  {/* ADMISSIONS */}
                  {view === 'admissions' && (
                    <>
                      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl rounded-tl-sm shadow-sm mb-6">
                        <p className="text-sm text-[#1E293B]">Choose the admission category you are looking for:</p>
                      </div>
                      <div className="space-y-2.5">
                        <ActionButton label="Junior College" onClick={() => router.push('/admission/jr-college')} />
                        <ActionButton label="Senior College" onClick={() => router.push('/admission/degree-college')} />
                        <ActionButton label="Undergraduate" onClick={() => navigate('ug_courses')} />
                        <ActionButton label="Postgraduate" onClick={() => navigate('pg_courses')} />
                      </div>
                    </>
                  )}

                  {/* COURSES (UG/PG LISTS) */}
                  {(view === 'ug_courses' || view === 'pg_courses') && (
                    <>
                      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl rounded-tl-sm shadow-sm mb-6">
                        <p className="text-sm text-[#1E293B]">Select a {view === 'ug_courses' ? 'Undergraduate' : 'Postgraduate'} course to view details:</p>
                      </div>
                      <div className="space-y-2.5">
                        {(view === 'ug_courses' ? ugCourses : pgCourses).map(c => (
                          <ActionButton 
                            key={c.name} 
                            label={`${c.name} - ${c.desc}`} 
                            onClick={() => navigate('course_details', c)} 
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* COURSE DETAILS */}
                  {view === 'course_details' && data && (
                    <div className="space-y-4">
                      <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-lg text-[#123B6D] mb-1 font-[var(--font-heading)]">{data.name}</h3>
                        <p className="text-sm text-[#64748B] mb-4">{data.desc}</p>
                      </div>
                      <button 
                        onClick={() => router.push('/admission/degree-college')}
                        className="block w-full py-3.5 bg-[#123B6D] text-white font-bold rounded-xl hover:bg-[#0d2d56] transition-all shadow-lg text-center text-sm">
                        Apply Now
                      </button>
                    </div>
                  )}

                  {/* GENERIC DETAILS PAGE (Scholarships, Certs, etc) */}
                  {view === 'generic_details' && data && (
                    <div className="space-y-4">
                      <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-lg text-[#123B6D] mb-4 font-[var(--font-heading)]">{data.title}</h3>
                        <div className="space-y-3 text-sm text-[#64748B]">
                          <p><strong>Overview:</strong> General information and guidelines regarding {data.title}.</p>
                          <p><strong>Eligibility / Required Docs:</strong> Valid ID, Previous Marksheets, Photographs.</p>
                          <p><strong>Process:</strong> Submit online form, verify documents, pay fees.</p>
                          <p><strong>Important Dates:</strong> Check the notice board for deadlines.</p>
                        </div>
                      </div>
                      {data.apply && (
                        <button className="w-full py-3.5 bg-[#123B6D] text-white font-bold rounded-xl hover:bg-[#0d2d54] transition-all shadow-lg">
                          Apply / Download Form
                        </button>
                      )}
                    </div>
                  )}

                  {/* SCHOLARSHIPS */}
                  {view === 'scholarships' && (
                    <>
                      <div className="space-y-2.5 mt-2">
                        {['Government Scholarships', 'Minority Scholarships', 'Merit Scholarships', 'Freeship', 'Financial Assistance'].map(lbl => (
                          <ActionButton key={lbl} label={lbl} onClick={() => navigate('generic_details', { title: lbl, apply: true })} />
                        ))}
                      </div>
                    </>
                  )}

                  {/* EXAMINATIONS */}
                  {view === 'examinations' && (
                    <div className="space-y-2.5 mt-2">
                      {['Exam Timetable', 'Result Notices', 'ATKT Information', 'Revaluation', 'Photocopy Request', 'Exam Circulars'].map(lbl => (
                        <ActionButton key={lbl} label={lbl} onClick={() => navigate('generic_details', { title: lbl, apply: true })} />
                      ))}
                    </div>
                  )}

                  {/* CERTIFICATES */}
                  {view === 'certificates' && (
                    <div className="space-y-2.5 mt-2">
                      {['Bonafide Certificate', 'Leaving Certificate', 'Character Certificate', 'Degree Certificate', 'Migration Certificate', 'Duplicate Marksheet'].map(lbl => (
                        <ActionButton key={lbl} label={lbl} onClick={() => navigate('generic_details', { title: lbl, apply: true })} />
                      ))}
                    </div>
                  )}

                  {/* COURSES ROOT */}
                  {view === 'courses' && (
                    <div className="space-y-2.5 mt-2">
                      <ActionButton label="Junior College" onClick={() => navigate('generic_details', { title: 'Junior College Courses' })} />
                      <ActionButton label="Senior College" onClick={() => navigate('generic_details', { title: 'Senior College Courses' })} />
                      <ActionButton label="Undergraduate" onClick={() => navigate('ug_courses')} />
                      <ActionButton label="Postgraduate & PhD" onClick={() => navigate('pg_courses')} />
                    </div>
                  )}

                  {/* FORMS */}
                  {view === 'forms' && (
                    <div className="space-y-3 mt-2">
                      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl rounded-tl-sm shadow-sm">
                        <p className="text-sm text-[#1E293B]">Select the form or certificate you need:</p>
                      </div>
                      {[
                        { name: 'Bonafide Certificate', desc: 'Proof of enrollment at Mulund College of Commerce for bank accounts, visa, etc.', href: '/forms/bonafide-certificate' },
                        { name: 'Transfer Certificate', desc: 'For progression to other Higher Educational Institution (HEI) of University of Mumbai.', href: '/forms/transfer-certificate' },
                        { name: 'Migration Certificate', desc: 'For progression to another University outside University of Mumbai.', href: '/forms/migration-certificate' },
                        { name: 'Transcript', desc: 'Official transcript for Foreign Universities or Employment purposes.', href: '/forms/transcript-certificate' },
                        { name: 'Character Certificate', desc: 'Certificate attesting good character and conduct. Required for Government Employments.', href: '/forms/character-certificate' },
                        { name: 'Marksheet Verification', desc: 'Official verification of mark sheets issued by the college for employers or institutions.', href: '/forms/marksheet-verification' },
                        { name: 'Caste Validity Verification', desc: 'Verification of caste certificate validity as required by government norms.', href: '/administrative-service/caste-validity' },
                        { name: 'Scholarship & Free-ship', desc: 'Apply for government and institutional scholarship and free-ship schemes.', href: '/forms' },
                        { name: 'Duplicate Marksheet', desc: 'Request a duplicate mark sheet in case of loss or damage of the original.', href: '/administrative-service/duplicate-marksheet' },
                      ].map(f => (
                        <div key={f.name} className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
                          <div className="p-4 pb-3">
                            <p className="font-bold text-sm text-[#123B6D] mb-1">{f.name}</p>
                            <p className="text-xs text-[#64748B] leading-snug">{f.desc}</p>
                          </div>
                          <button
                            onClick={() => router.push(f.href)}
                            className="w-full py-2.5 bg-[#123B6D] text-white text-xs font-bold hover:bg-[#0d2d56] transition-colors"
                          >
                            Apply →
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* BROADCAST PAGE */}
                  {view === 'broadcast' && (
                    <div className="flex flex-col h-full space-y-4">
                      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl rounded-tl-sm shadow-sm">
                        <p className="text-sm text-[#1E293B]">
                          Stay updated with the latest news &amp; announcements from Mulund College of Commerce.
                        </p>
                      </div>

                      {broadcastsLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="animate-spin text-[#123B6D]" size={24} />
                        </div>
                      ) : broadcasts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
                          <Megaphone size={32} className="text-[#CBD5E1]" />
                          <p className="text-sm text-[#94A3B8] font-medium">No active announcements at the moment.</p>
                          <p className="text-xs text-[#CBD5E1]">Check back soon for updates.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <AnimatePresence mode="popLayout">
                            {broadcasts.map((b, idx) => (
                              <motion.div
                                layout
                                key={b.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, delay: idx * 0.04 }}
                                className="flex justify-start"
                              >
                                <div className="w-full px-4 py-3 bg-white border border-[#E2E8F0] text-[#1E293B] rounded-2xl rounded-tl-sm shadow-sm relative overflow-hidden">
                                  <div className="absolute top-0 left-0 w-1 h-full bg-[#123B6D]" />
                                  <p className="text-sm leading-relaxed pl-1">{b.content}</p>
                                  <p className="text-[10px] text-[#94A3B8] mt-2 text-right">
                                    {new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      )}
                      <div ref={endRef} />
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
