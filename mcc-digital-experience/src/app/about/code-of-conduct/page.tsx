'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Users, Building, BookOpen, CheckCircle2, ShieldCheck, Info } from 'lucide-react';

const conductData = [
  {
    id: 'learners',
    title: 'Learners',
    icon: GraduationCap,
    color: 'bg-blue-600',
    lightBg: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-50',
    rules: [
      "The learners shall abide by all the rules and regulations of college and university as enforced from time to time.",
      "The learners shall actively participate in the learning process.",
      "The learners shall not indulge into acts of ragging in any form.",
      "The learners shall pro-actively participate in extra-curricular and co-curricular activities.",
      "The learners shall co-operate in implementing policies of the institution which are designed for the benefit of themselves and the institute/college.",
      "The learners shall act with politeness while communicating with any staff of the college.",
      "The learners shall not make use of the affiliation to the college in any capacity for personal gains without written authorization from the college.",
      "The learners shall not pass any distasteful remark against anybody which many lead to any conflict or legal action.",
      "The learners shall not use print, digital or any other media to defame/tarnish the image of the college.",
      "The learners shall not deface or damage the college property.",
      "The learners shall raise their grievances, if any, at appropriate forum and in appropriate manner.",
      "The learners shall appreciate the diversity among the individuals and should pro-actively help the college authorities in creating inclusive, enabling and a just environment for all.",
      "The learners shall not consume tobacco, alcohol, or other prohibited substances within college premises nor shall the learners attend college in a state of intoxication."
    ]
  },
  {
    id: 'non-teaching',
    title: 'Non-Teaching Staff',
    icon: Users,
    color: 'bg-emerald-600',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    hoverBg: 'hover:bg-emerald-50',
    rules: [
      "The staff shall be punctual and act with sincerity, honesty, diligence and integrity.",
      "The staff shall behave politely with their colleagues, teachers, students and parents.",
      "The staff shall raise their grievances, if any, at appropriate forum and in appropriate manner.",
      "The staff shall maintain a congenial work environment which would foster co-operation, trust and open communication.",
      "The staff shall not pass any colorful/distasteful remark against any individual.",
      "The staff shall contribute towards betterment of college and services by giving periodic, timely and constructive feedback.",
      "The staff shall not consume tobacco, alcohol, or other prohibited substances within college premises nor shall the staff discharge any of his/her duties in the state of intoxication.",
      "The staff shall not commit any act of moral turpitude inside/outside the campus."
    ]
  },
  {
    id: 'administrators',
    title: 'Administrators',
    icon: Building,
    color: 'bg-purple-600',
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    hoverBg: 'hover:bg-purple-50',
    rules: [
      "The administrators shall work earnestly towards achieving the vision and mission of college.",
      "The administrators shall act within the framework of their defined powers and duties.",
      "The administrators shall not act in contravention to the interest of stakeholders of the college.",
      "The administrators shall never abuse their powers and use their discretions to the detriment of any individuals or the college.",
      "The administrators shall build and promote cohesiveness among all the stakeholders by creating an enabling environment on the foundations of accountability, transparency, trust and openness.",
      "The administrators shall be prompt and pro-active and in the matters of administrations.",
      "The administrators shall resolve the conflicts arising in the course of handling institutional affairs amicably and as per the defined means of disposing the grievances.",
      "The administrators shall not consume tobacco, alcohol, or other prohibited substances within college premises nor shall the staff discharge any of his/her duties in the state of intoxication.",
      "The administrators shall not commit any act of moral turpitude inside/outside the campus."
    ]
  },
  {
    id: 'teachers',
    title: 'Teachers',
    icon: BookOpen,
    color: 'bg-[#D4A017]',
    lightBg: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-[#D4A017]',
    hoverBg: 'hover:bg-yellow-50',
    rules: [
      "The teachers shall maintain transparency in discharge of his duties related to the profession.",
      "The teachers shall act fair and impartial with all his/her learners.",
      "A teacher shall act with an approachable demeanour so as to make it easy for any student to access him/her.",
      "The teachers shall encourage and motivate students towards self, participatory and peer learning.",
      "The teachers shall be punctual in his duties and inculcate the same among students by leading them with example.",
      "The teachers shall regularly update himself of the latest developments in the domain of their subject and be open in adapting new pedagogies and teaching tools.",
      "Through their acts or words, the teachers shall not indulge or promote racism, sexism, regionalism, communalism, casteism, ableism or any other form of discrimination.",
      "The teachers shall co-operate with the management and administrative staff for the implementation of policies for the betterment of the institution.",
      "The teachers shall ensure that a safe congenial environment is maintained in the staff common room and in other places of the campus.",
      "The teachers shall be accountable for any money collected or handled by them during the course of discharge of their duties in the college premises.",
      "The teachers shall know, imbibe and uphold constitutional values and ethos.",
      "The teachers shall be sensitive towards individuals around him/her and not be unreasonable harsh with his/her words/actions or behaviour.",
      "The teachers shall promote scientific temper and communal harmony.",
      "The teachers shall raise grievances, if any, at appropriate forum and in an appropriate manner.",
      "The teachers shall not consume tobacco, alcohol, or other prohibited substances within college premises nor shall the teacher discharge any of his/her duties in the state of intoxication.",
      "The teachers shall not commit any act of moral turpitude inside/outside the campus."
    ]
  }
];

export default function CodeOfConductPage() {
  const [activeTab, setActiveTab] = useState(conductData[0].id);

  // On mount, read hash from URL and set matching tab
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && conductData.find(d => d.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  // When tab changes, update the URL hash without page reload
  const handleTabChange = (id: string) => {
    setActiveTab(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  const activeData = conductData.find(d => d.id === activeTab) || conductData[0];
  const ActiveIcon = activeData.icon;

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-[#123B6D] pt-12 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <ShieldCheck size={32} className="text-[#D4A017]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">Code of Conduct</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">Guiding principles and behavioral expectations for all members of the Mulund College of Commerce family.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-20 relative z-20">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Interactive Sidebar / Tab Navigation */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-4 sticky top-24">
              <div className="mb-4 px-2 pt-2 flex items-center gap-2 text-[#123B6D]">
                <Info size={18} />
                <span className="font-bold text-sm">Select a category:</span>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {conductData.map(category => {
                  const CategoryIcon = category.icon;
                  const isActive = activeTab === category.id;
                  
                  return (
                    <button 
                      key={category.id}
                      onClick={() => handleTabChange(category.id)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-300 text-left shrink-0 lg:shrink w-auto lg:w-full
                        ${isActive 
                          ? `${category.lightBg} ${category.borderColor} shadow-sm scale-[1.02]` 
                          : `bg-white border-transparent text-gray-600 ${category.hoverBg} hover:scale-[1.01]`
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors
                        ${isActive ? category.color + ' text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>
                        <CategoryIcon size={20} />
                      </div>
                      <span className={`font-bold whitespace-nowrap lg:whitespace-normal
                        ${isActive ? category.textColor : 'text-gray-700'}`}>
                        {category.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Content Area */}
          <div className="flex-1">
            <div className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-colors duration-500 ${activeData.borderColor}`}>
              
              {/* Content Header */}
              <div className={`p-8 md:p-10 border-b ${activeData.lightBg} flex items-center gap-6`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm bg-white ${activeData.textColor}`}>
                  <ActiveIcon size={32} />
                </div>
                <div>
                  <h2 className={`text-2xl md:text-3xl font-bold font-[var(--font-heading)] ${activeData.textColor}`}>
                    {activeData.title}
                  </h2>
                  <p className="text-gray-600 mt-1">Rules and responsibilities for {activeData.title.toLowerCase()}.</p>
                </div>
              </div>

              {/* Rules List */}
              <div className="p-8 md:p-10">
                <ul className="space-y-6">
                  {activeData.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-4 group">
                      <div className="pt-1 shrink-0">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors
                          ${activeData.lightBg} ${activeData.textColor} ${activeData.borderColor} group-hover:${activeData.color} group-hover:text-white`}>
                          <CheckCircle2 size={14} />
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-[15px] md:text-[16px]">
                        {rule}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
