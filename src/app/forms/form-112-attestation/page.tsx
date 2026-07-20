'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, FileText, User, GraduationCap, Briefcase } from 'lucide-react';
import Link from 'next/link';

type StatusType = 'Current Student' | 'Alumni' | 'Drop Year Student' | '';
type CollegeType = 'Degree College' | 'Jr College' | '';

const JR_CLASSES = ['11th', '12th'];

interface FormData {
  name: string;
  phone: string;
  email: string;
  
  caRegistration: string;
  totalMarks: string;
  principalName: string;
  caFoundationRank: string;
  caInterRank: string;

  status: StatusType;
  collegeType: CollegeType;
  degree: string;
  academicYearOrYear: string;
  rollNumber: string;
}

export default function Form112AttestationPage() {
  const letterRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '',
    caRegistration: '', totalMarks: '', principalName: '', caFoundationRank: '', caInterRank: '',
    status: '', collegeType: '', degree: '', academicYearOrYear: '', rollNumber: ''
  });

  useEffect(() => { setIsClient(true); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'collegeType') {
      setFormData(prev => ({ ...prev, collegeType: value as CollegeType, degree: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDownload = async () => {
    try {
      if (!letterRef.current) return;
      const htmlToImage = await import('html-to-image');
      const { jsPDF } = await import('jspdf');
      const element = letterRef.current;
      const dataUrl = await htmlToImage.toPng(element, { quality: 1, pixelRatio: 2 });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      let pdfHeight = (element.scrollHeight * pdfWidth) / element.scrollWidth;
      if (pdfHeight > pageHeight) {
        const ratio = pageHeight / pdfHeight;
        pdfHeight = pageHeight;
        const newWidth = pdfWidth * ratio;
        pdf.addImage(dataUrl, 'PNG', (pdfWidth - newWidth) / 2, 0, newWidth, pdfHeight);
      } else {
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      pdf.save(`Form112_Attestation_${formData.name.replace(/\s+/g, '_') || 'Student'}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm";
  const labelCls = "block text-sm font-semibold text-[#64748B] mb-1.5";
  
  const isPastStudent = formData.status === 'Alumni' || formData.status === 'Drop Year Student';
  const isCurrentStudent = formData.status === 'Current Student';
  const isJrCollege = formData.collegeType === 'Jr College';
  const isDegreeCollege = formData.collegeType === 'Degree College';
  
  const canDownload = !!(formData.name && formData.status && formData.caRegistration && formData.principalName);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#123B6D] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <Link href="/forms" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Forms
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
              <FileText size={26} className="text-teal-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Form 112 Attestation (ICAI)</h1>
              <p className="text-white/60 text-sm mt-0.5">Fill out the form and download your application letter instantly</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-8 pb-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Form Panel */}
          <div className="lg:col-span-5 space-y-4">
            {/* Personal Details */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#123B6D] font-bold text-base pb-2 border-b border-[#E2E8F0]">
                <User size={18} /> Personal Details
              </div>
              <div>
                <label className={labelCls}>Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 9876543210" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email ID</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. name@email.com" className={inputCls} />
              </div>
            </div>

            {/* ICAI Details */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#123B6D] font-bold text-base pb-2 border-b border-[#E2E8F0]">
                <Briefcase size={18} /> ICAI / Articleship Details
              </div>
              <div>
                <label className={labelCls}>CA Inter Registration Number *</label>
                <input type="text" name="caRegistration" value={formData.caRegistration} onChange={handleChange} placeholder="Enter registration number" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Total Marks Obtained</label>
                <input type="text" name="totalMarks" value={formData.totalMarks} onChange={handleChange} placeholder="Combined for both groups of CA INTER" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Principal / Firm / Industry *</label>
                <input type="text" name="principalName" value={formData.principalName} onChange={handleChange} placeholder="Name of Principal/Firm/Industry" className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>CA Foundation Rank</label>
                  <input type="text" name="caFoundationRank" value={formData.caFoundationRank} onChange={handleChange} placeholder="If any" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>CA Inter Rank</label>
                  <input type="text" name="caInterRank" value={formData.caInterRank} onChange={handleChange} placeholder="If any" className={inputCls} />
                </div>
              </div>
            </div>

            {/* Academic Details */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#123B6D] font-bold text-base pb-2 border-b border-[#E2E8F0]">
                <GraduationCap size={18} /> MCC Academic Details
              </div>
              <div>
                <label className={labelCls}>Status *</label>
                <select name="status" value={formData.status} onChange={handleChange} className={inputCls}>
                  <option value="">Select Status</option>
                  <option value="Current Student">Current Student</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Drop Year Student">Drop Year Student</option>
                </select>
              </div>

              {formData.status && (
                <>
                  <div>
                    <label className={labelCls}>College Section *</label>
                    <select name="collegeType" value={formData.collegeType} onChange={handleChange} className={inputCls}>
                      <option value="">Select College Type</option>
                      <option value="Degree College">Degree College</option>
                      <option value="Jr College">Jr College (11th / 12th)</option>
                    </select>
                  </div>

                  {formData.collegeType && (
                    <div>
                      <label className={labelCls}>
                        {isDegreeCollege ? (isPastStudent ? "Last completed/enrolled degree from MCC" : "Degree Programme Enrolled In") : (isPastStudent ? "Last Class Attended" : "Class")} *
                      </label>
                      {isDegreeCollege ? (
                        <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="e.g. Bachelor in Computer Application" className={inputCls} />
                      ) : (
                        <select name="degree" value={formData.degree} onChange={handleChange} className={inputCls}>
                          <option value="">Select Class</option>
                          {JR_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      )}
                    </div>
                  )}
                  {formData.collegeType && (
                    <>
                      <div>
                        <label className={labelCls}>{isPastStudent ? "Last Academic Year in MCC" : (isJrCollege ? "Year of Study" : "Year of Study")}</label>
                        <input type="text" name="academicYearOrYear" value={formData.academicYearOrYear} onChange={handleChange}
                          placeholder={isPastStudent ? "e.g. 2023-2024" : "First/Second/Third Year or 11th/12th"}
                          className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>{isPastStudent ? "Last Roll Number/Student ID" : "Roll Number/Student ID"}</label>
                        <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="e.g. 1234" className={inputCls} />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <button
              onClick={handleDownload}
              disabled={!canDownload}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-sm ${
                canDownload
                  ? 'bg-[#123B6D] hover:bg-[#0A2240] text-white hover:shadow-md hover:-translate-y-1'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Download size={20} /> Download PDF
            </button>
            <p className="text-xs text-center text-[#64748B]">Fill out Name, Status, CA Registration and Firm to enable download.</p>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-2 border border-[#E2E8F0] shadow-xl overflow-hidden sticky top-8">
              <div className="bg-[#F8FAFC] py-3 px-6 border-b border-[#E2E8F0] flex justify-between items-center rounded-t-2xl">
                <span className="text-sm font-bold text-[#64748B] flex items-center gap-2">
                  <FileText size={16} /> Live Letter Preview
                </span>
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-md">A4 Format</span>
              </div>

              <div className="overflow-y-auto max-h-[70vh] bg-gray-100 p-4 md:p-8 flex justify-center">
                <div
                  id="printable-form112-letter"
                  ref={letterRef}
                  className="bg-white shadow-sm w-full max-w-[210mm] text-black font-serif text-[11px] leading-[1.4] flex flex-col"
                  style={{ boxSizing: 'border-box', padding: '24px 32px', height: '297mm', overflow: 'hidden' }}
                >
                  {/* Header */}
                  <div className="text-center">
                    <h1 className="font-bold text-[12px] mb-0.5">PTVA'S MULUND COLLEGE OF COMMERCE (AUTONOMOUS)</h1>
                    <h2 className="font-semibold text-[11px] mb-0.5 uppercase">{formData.collegeType || 'DEGREE COLLEGE / JR COLLEGE'}</h2>
                    <h3 className="font-bold underline text-[11px] mt-1">APPLICATION FOR ATTESTATION ON THE FORM 112 (of ICAI)</h3>
                  </div>

                  <div style={{flexGrow: 0.15}} />

                  <div className="text-left font-semibold">DATE: {isClient ? currentDate : 'DD/MM/YYYY'}</div>

                  <div style={{flexGrow: 0.1}} />

                  <div>
                    <p>To</p>
                    <p>The Principal</p>
                    <p>Mulund College of Commerce,</p>
                    <p>Mumbai- 400080</p>
                  </div>

                  <div style={{flexGrow: 0.15}} />

                  <div className="font-bold">Subject: Application for attestation on the form 112 by ICAI</div>

                  <div style={{flexGrow: 0.1}} />

                  <div><p>Dear Sir/Madam,</p></div>

                  <div style={{flexGrow: 0.1}} />

                  <div className="indent-8 text-justify text-[10px]">
                    I, the undersigned, need attestation on the form 112 by ICAI for the completion of requirement for the articleship/trainee. I have passed both the groups of CA Inter and I am currently pursuing articleship. I have been made aware that the attestation on the form 112 will be completed within a week and I will be required to come and collect it from the office.
                  </div>

                  <div style={{flexGrow: 0.15}} />

                  {/* ICAI Details */}
                  <div>
                    <p className="mb-1.5 font-bold bg-gray-200/50 inline-block px-1">My details are given as under.</p>
                    <div className="grid gap-1 ml-4" style={{gridTemplateColumns: '200px auto'}}>
                      <div>CA Inter Registration Number</div>
                      <div>: <span className="uppercase font-bold">{formData.caRegistration || 'CA Inter Registration Number'}</span></div>

                      <div>Total Marks obtained</div>
                      <div>: <span className="uppercase font-bold">{formData.totalMarks || 'Total marks obtained (combined)'}</span></div>

                      <div>Principal / Firm / Industry</div>
                      <div>: <span className="uppercase font-bold">{formData.principalName || 'Name of Principal/Firm/Industry'}</span></div>

                      <div>CA Foundation Rank, if any</div>
                      <div>: <span className="uppercase font-bold">{formData.caFoundationRank || '-'}</span></div>

                      <div>CA Inter Rank, if any</div>
                      <div>: <span className="uppercase font-bold">{formData.caInterRank || '-'}</span></div>
                    </div>
                  </div>

                  <div style={{flexGrow: 0.15}} />

                  {/* Academic Details */}
                  <div>
                    <div className="grid gap-1 ml-4" style={{gridTemplateColumns: '200px auto'}}>
                      <div className="font-bold bg-gray-200/50 inline-block px-1">STATUS</div>
                      <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.status || 'Current Student/Alumnus/Drop Year Student'}</span></div>

                      {formData.collegeType && (
                        <>
                          <div className="font-bold bg-gray-200/50 inline-block px-1">COLLEGE SECTION</div>
                          <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.collegeType}</span></div>
                        </>
                      )}

                      {isPastStudent && (
                        <>
                          <div className="col-span-2 font-bold underline mt-1.5">ALUMNI / Drop year Student</div>
                          <div className="font-bold bg-gray-200/50 inline-block px-1">{isJrCollege ? 'CLASS' : 'DEGREE PROGRAMME'}</div>
                          <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.degree || (isJrCollege ? 'LAST CLASS ATTENDED IN MCC' : 'LAST COMPLETED/ENROLLED DEGREE FROM MCC')}</span></div>
                          <div className="font-bold bg-gray-200/50 inline-block px-1">ACADEMIC YEAR</div>
                          <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.academicYearOrYear || 'LAST ACADEMIC YEAR IN MCC'}</span></div>
                          <div className="font-bold bg-gray-200/50 inline-block px-1">LAST ROLL NUMBER/STUDENT ID</div>
                          <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.rollNumber || 'LAST ROLL NUMBER/STUDENT ID IN MCC'}</span></div>
                        </>
                      )}

                      {isCurrentStudent && (
                        <>
                          <div className="col-span-2 font-bold underline mt-1.5">CURRENT STUDENT</div>
                          <div className="font-bold bg-gray-200/50 inline-block px-1">{isJrCollege ? 'CLASS' : 'DEGREE PROGRAMME'}</div>
                          <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.degree || (isJrCollege ? 'CLASS' : 'DEGREE PROGRAMME FOR WHICH ENROLLED')}</span></div>
                          <div className="font-bold bg-gray-200/50 inline-block px-1">YEAR</div>
                          <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.academicYearOrYear || 'YEAR OF STUDY (First/Second/Third Year or 11th/12th)'}</span></div>
                          <div className="font-bold bg-gray-200/50 inline-block px-1">ROLL NUMBER/STUDENT ID</div>
                          <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.rollNumber || 'ROLL NUMBER/STUDENT ID'}</span></div>
                        </>
                      )}
                    </div>
                  </div>

                  <div style={{flexGrow: 0.3}} />

                  {/* Yours truly */}
                  <div>
                    <p>Yours truly,</p>
                    <div className="mt-4">
                      <p>Sign:</p>
                      <p className="font-bold uppercase">{formData.name || '(NAME OF THE STUDENT/ALUMNI)'}</p>
                      <p>({formData.phone || 'Phone No. of the Student/Alumni'})</p>
                      <p>({formData.email || 'Email ID of the Student/Alumni'})</p>
                    </div>
                  </div>

                  <div style={{flexGrow: 0.3}} />

                  {/* Enclosure / Charges / Note / Authority */}
                  <div className="border-t border-gray-400 pt-2 text-[10px]">
                    <div className="flex gap-2">
                      <span className="font-bold">Enclosure:</span>
                      <div>
                        <p>1. A copy of the form 112.</p>
                        <p>2. Photocopy of successful results of CA Foundation and CA Inter</p>
                      </div>
                    </div>

                    <p className="font-bold mt-1.5">Charges: NIL</p>
                    
                    <div className="mt-1.5 font-bold italic text-[9.5px]">
                      <p>Note: Take the approval of the principal on this letter and then obtained the attestation from the office.</p>
                      <p>The college timing for BCOM / BAF / BBI is 7:15 AM to 10:40 AM (enter the same time on the form 112.)</p>
                    </div>

                    <p className="font-bold mt-4 mb-3">Signature of approving authority:</p>
                    <div className="flex items-end gap-2">
                      <span className="font-bold">Received the document: Name:</span>
                      <span className="inline-block border-b border-black" style={{width: '140px'}}></span>
                      <span className="font-bold ml-3">Sign</span>
                      <span className="inline-block border-b border-black" style={{width: '70px'}}></span>
                      <span className="font-bold ml-2">Date</span>
                      <span className="inline-block border-b border-black" style={{width: '70px'}}></span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Instructions Panel */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-[#123B6D] mb-3">About Attestation on Form 112</h2>
          <p className="text-[#64748B] text-sm mb-4 leading-relaxed">
            The attestation on form 112 is given for the compliance of articleship/industrial training to the candidates who have started their articleship/industrial training after being successful in both the groups of the CA Inter Examination.
            <br/><br/>
            The candidates need to furnish the details of their CA Registration, submit the photocopy of the CA Inter results and the filled 112 form. The candidates also need to mention the place of articleship/industrial training.
            <br/><br/>
            <span className="font-bold text-[#123B6D]">Charges:</span> NIL
          </p>
          <h3 className="font-bold text-[#123B6D] mb-3">Application Process:</h3>
          <ol className="list-decimal list-inside text-sm text-[#64748B] space-y-2">
            <li>Fill in the details on the application form below and download the PDF.</li>
            <li>Take two printouts. (One for receiving the acknowledgement after submitting the application).</li>
            <li>Sign the Application Form. Attach the list of documents.</li>
            <li>Visit the college on a working day. (Between 9 AM to 1 PM OR 2 PM to 3 PM)</li>
            <li>Take the signature of the Principal/Vice-Principal or the Office In-Charge.</li>
            <li>Submit the application at the respective office counter and get it attested.</li>
          </ol>
        </div>

      </div>
    </div>
  );
}
