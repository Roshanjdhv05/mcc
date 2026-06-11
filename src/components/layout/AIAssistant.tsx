'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, ChevronLeft, Home, MessageSquare, GraduationCap, FileText, BookOpen, Award, CreditCard, ChevronRight } from 'lucide-react';

type ViewState = 'main' | 'admissions' | 'scholarships' | 'examinations' | 'certificates' | 'courses' | 'forms' | 'chat' | 'ug_courses' | 'pg_courses' | 'course_details' | 'generic_details';

interface HistoryState {
  view: ViewState;
  data?: any;
}

interface Message {
  from: 'user' | 'bot';
  text: string;
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<HistoryState[]>([{ view: 'main' }]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const current = history[history.length - 1];
  const view = current.view;
  const data = current.data;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, view]);

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

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { 
        from: 'bot', 
        text: 'I couldn\'t find an exact answer. Would you like to contact the college office?' 
      }]);
    }, 1200);
  };

  // ── DATA DEFINITIONS ──

  const ugCourses = [
    { name: 'B.Com', desc: 'Bachelor of Commerce', duration: '3 Years', seats: 360 },
    { name: 'BAF', desc: 'B.Com Accounting & Finance', duration: '3 Years', seats: 120 },
    { name: 'BBI', desc: 'B.Com Banking & Insurance', duration: '3 Years', seats: 60 },
    { name: 'BFM', desc: 'B.Com Financial Markets', duration: '3 Years', seats: 60 },
    { name: 'BMS', desc: 'Bachelor of Management Studies', duration: '3 Years', seats: 120 },
    { name: 'BSc IT', desc: 'B.Sc Information Technology', duration: '3 Years', seats: 60 },
    { name: 'BSc CS', desc: 'B.Sc Computer Science', duration: '3 Years', seats: 60 },
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
      {view !== 'chat' && (
        <button onClick={() => navigate('chat')} className="p-1.5 rounded-full hover:bg-white/20 transition-colors" title="Ask Anything">
          <MessageSquare size={18} />
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
        onClick={() => setOpen(true)}
        className={`fixed bottom-20 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full bg-[#123B6D] text-white shadow-xl flex items-center justify-center ${open ? 'hidden' : 'flex'}`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bot size={26} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-[70] w-[350px] sm:w-[400px] h-[600px] max-h-[85vh] bg-[#F8FAFC] rounded-3xl shadow-2xl border border-[#E2E8F0] flex flex-col overflow-hidden"
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
                <button onClick={() => setOpen(false)} className="p-1.5 ml-1 rounded-full hover:bg-white/20 transition-colors bg-white/10">
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
                          I can help you with Admissions, Scholarships, Examinations, Certificates, Courses, and Forms.<br/><br/>
                          Please choose an option below to continue.
                        </p>
                      </div>
                      <div className="space-y-2.5">
                        <ActionButton icon={GraduationCap} label="Admissions" onClick={() => navigate('admissions')} />
                        <ActionButton icon={CreditCard} label="Scholarships" onClick={() => navigate('scholarships')} />
                        <ActionButton icon={FileText} label="Examinations" onClick={() => navigate('examinations')} />
                        <ActionButton icon={Award} label="Certificates" onClick={() => navigate('certificates')} />
                        <ActionButton icon={BookOpen} label="Courses" onClick={() => navigate('courses')} />
                        <ActionButton icon={FileText} label="Forms" onClick={() => navigate('forms')} />
                        <ActionButton icon={MessageSquare} label="Ask Anything" highlight onClick={() => navigate('chat')} />
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
                        <ActionButton label="Junior College" onClick={() => navigate('generic_details', { title: 'Junior College Admission', apply: true })} />
                        <ActionButton label="Senior College" onClick={() => navigate('generic_details', { title: 'Senior College Admission', apply: true })} />
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
                        
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b pb-2"><span className="text-[#64748B]">Duration</span><span className="font-medium text-[#1E293B]">{data.duration}</span></div>
                          <div className="flex justify-between border-b pb-2"><span className="text-[#64748B]">Seats Available</span><span className="font-medium text-[#1E293B]">{data.seats}</span></div>
                          <div className="flex justify-between border-b pb-2"><span className="text-[#64748B]">Eligibility</span><span className="font-medium text-[#1E293B]">Min 45% Aggregate</span></div>
                          <div className="flex justify-between border-b pb-2"><span className="text-[#64748B]">Fee Structure</span><span className="font-medium text-[#1E293B]">Check Prospectus</span></div>
                        </div>
                      </div>
                      <button className="w-full py-3.5 bg-[#D4A017] text-white font-bold rounded-xl hover:bg-[#b8891a] transition-all shadow-lg">
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
                    <div className="space-y-2.5 mt-2">
                      {['Admission Forms', 'Scholarship Forms', 'Examination Forms', 'Certificate Forms', 'Concession Forms'].map(lbl => (
                        <ActionButton key={lbl} label={lbl} onClick={() => navigate('generic_details', { title: lbl, apply: true })} />
                      ))}
                    </div>
                  )}

                  {/* ASK ANYTHING (CHAT) */}
                  {view === 'chat' && (
                    <div className="flex flex-col h-full space-y-4 pb-16">
                      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl rounded-tl-sm shadow-sm">
                        <p className="text-sm text-[#1E293B]">
                          You can ask me anything about Admissions, Scholarships, Courses, Exams, or the Campus!
                        </p>
                      </div>
                      
                      {messages.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            msg.from === 'user'
                              ? 'bg-[#123B6D] text-white rounded-tr-sm'
                              : 'bg-white border border-[#E2E8F0] text-[#1E293B] rounded-tl-sm shadow-sm'
                          }`}>
                            {msg.text}
                            {msg.from === 'bot' && msg.text.includes('contact the college office') && (
                              <div className="mt-3 space-y-2">
                                <button className="w-full py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#123B6D] hover:bg-[#123B6D] hover:text-white transition-colors">Contact Office</button>
                                <button className="w-full py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#123B6D] hover:bg-[#123B6D] hover:text-white transition-colors">Email Us</button>
                                <button onClick={goHome} className="w-full py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#123B6D] hover:bg-[#123B6D] hover:text-white transition-colors">Main Menu</button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                      
                      {typing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                          <div className="bg-white border border-[#E2E8F0] px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1 items-center">
                            {[0, 1, 2].map(i => (
                              <motion.span
                                key={i}
                                className="w-2 h-2 bg-[#123B6D] rounded-full"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                      <div ref={endRef} />
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Chat Input (Only visible in Chat view) */}
            {view === 'chat' && (
              <div className="p-4 border-t border-[#E2E8F0] bg-white absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm outline-none focus:border-[#D4A017] transition-colors"
                />
                <button
                  onClick={() => sendMessage(input)}
                  className="w-10 h-10 rounded-xl bg-[#D4A017] text-white flex items-center justify-center hover:bg-[#b8891a] transition-colors shrink-0"
                >
                  <Send size={16} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
