'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, FileText, User, GraduationCap } from 'lucide-react';
import Link from 'next/link';

type CollegeType = 'Degree College' | 'Jr College' | '';

const JR_CLASSES = ['11th', '12th'];

interface FormData {
  name: string;
  phone: string;
  email: string;
  collegeType: CollegeType;
  lastDegree: string;
  lastAcademicYear: string;
  lastRollNumber: string;
  newProgramme: string;
  newInstitution: string;
  yearOfEnrollment: string;
}

export default function TransferCertificatePage() {
  const letterRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '', collegeType: '',
    lastDegree: '', lastAcademicYear: '', lastRollNumber: '',
    newProgramme: '', newInstitution: '', yearOfEnrollment: '',
  });

  useEffect(() => { setIsClient(true); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'collegeType') {
      setFormData(prev => ({ ...prev, collegeType: value as CollegeType, lastDegree: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const isJrCollege = formData.collegeType === 'Jr College';
  const isDegreeCollege = formData.collegeType === 'Degree College';

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
      pdf.save(`Transfer_Certificate_${formData.name.replace(/\s+/g, '_') || 'Student'}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm";
  const labelCls = "block text-sm font-semibold text-[#64748B] mb-1.5";
  const canDownload = !!(formData.name && formData.lastDegree && formData.newInstitution);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#123B6D] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <Link href="/forms" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Forms
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
              <FileText size={26} className="text-sky-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Transfer Certificate</h1>
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

            {/* MCC Academic Details */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#123B6D] font-bold text-base pb-2 border-b border-[#E2E8F0]">
                <GraduationCap size={18} /> MCC Academic Details
              </div>
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
                    {isDegreeCollege ? 'Last Completed Degree from MCC' : 'Last Class Attended'} *
                  </label>
                  {isDegreeCollege ? (
                    <input type="text" name="lastDegree" value={formData.lastDegree} onChange={handleChange} placeholder="e.g. Bachelor in Computer Application" className={inputCls} />
                  ) : (
                    <select name="lastDegree" value={formData.lastDegree} onChange={handleChange} className={inputCls}>
                      <option value="">Select Class</option>
                      {JR_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  )}
                </div>
              )}
              <div>
                <label className={labelCls}>Last Academic Year in MCC</label>
                <input type="text" name="lastAcademicYear" value={formData.lastAcademicYear} onChange={handleChange} placeholder="e.g. 2023-2024" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Last Roll Number / Student ID</label>
                <input type="text" name="lastRollNumber" value={formData.lastRollNumber} onChange={handleChange} placeholder="e.g. 2345" className={inputCls} />
              </div>
            </div>

            {/* New Institution Details */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#123B6D] font-bold text-base pb-2 border-b border-[#E2E8F0]">
                <GraduationCap size={18} /> New Institution Details
              </div>
              <div>
                <label className={labelCls}>New Programme Enrolled In</label>
                <input type="text" name="newProgramme" value={formData.newProgramme} onChange={handleChange} placeholder="e.g. MBA, M.Com, CA" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>New Institution Enrolled In *</label>
                <input type="text" name="newInstitution" value={formData.newInstitution} onChange={handleChange} placeholder="Name of college/university" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Year of Enrollment</label>
                <input type="text" name="yearOfEnrollment" value={formData.yearOfEnrollment} onChange={handleChange} placeholder="e.g. 2024-2025" className={inputCls} />
              </div>
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
            <p className="text-xs text-center text-[#64748B]">Fill out Name, Last Degree and New Institution to enable download.</p>
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
                  id="printable-transfer-letter"
                  ref={letterRef}
                  className="bg-white shadow-sm w-full max-w-[210mm] text-black font-serif text-[11.5px] leading-normal flex flex-col"
                  style={{ boxSizing: 'border-box', padding: '28px 36px', height: '297mm', overflow: 'hidden' }}
                >
                  {/* Header */}
                  <div className="text-center">
                    <h1 className="font-bold text-[13px] mb-0.5">PTVA'S MULUND COLLEGE OF COMMERCE (AUTONOMOUS)</h1>
                    <h2 className="font-semibold text-[12px] mb-0.5 uppercase">{formData.collegeType || 'DEGREE COLLEGE / JR COLLEGE'}</h2>
                    <h3 className="font-bold underline text-[12px] mt-1">APPLICATION FOR TRANSFER CERTIFICATE</h3>
                  </div>

                  <div style={{flexGrow: 0.3}} />

                  <div className="text-right font-semibold">DATE: {isClient ? currentDate : 'DD/MM/YYYY'}</div>

                  <div style={{flexGrow: 0.2}} />

                  <div>
                    <p>To</p>
                    <p>The Principal</p>
                    <p>Mulund College of Commerce,</p>
                    <p>Mumbai- 400080.</p>
                  </div>

                  <div style={{flexGrow: 0.2}} />

                  <div className="font-bold">Subject: Application for Transfer Certificate</div>

                  <div style={{flexGrow: 0.15}} />

                  <div><p>Dear Sir/Madam,</p></div>

                  <div style={{flexGrow: 0.15}} />

                  <div className="indent-8 text-justify text-[10.5px]">
                    I, the undersigned, need a transfer certificate. Kindly Issue me the same. I have been made aware that my transfer certificate will be directly sent to my current institute of enrolment.
                  </div>

                  <div style={{flexGrow: 0.25}} />

                  {/* Details Table */}
                  <div>
                    <p className="mb-2">My details are given as under.</p>
                    <div className="grid gap-1.5 ml-4" style={{gridTemplateColumns: '230px auto'}}>
                      <div>{isJrCollege ? 'LAST CLASS ATTENDED IN MCC' : 'LAST COMPLETED DEGREE FROM MCC'}</div>
                      <div>: <span className="uppercase">{formData.lastDegree || 'Last completed degree from MCC'}</span></div>

                      <div>LAST ACADEMIC YEAR IN MCC</div>
                      <div>: <span className="uppercase">{formData.lastAcademicYear || 'Last academic year in MCC'}</span></div>

                      <div>LAST ROLL NUMBER / STUDENT ID</div>
                      <div>: <span className="uppercase">{formData.lastRollNumber || 'Last roll number/student ID in MCC'}</span></div>

                      <div>NEW PROGRAMME ENROLLED IN</div>
                      <div>: <span className="uppercase">{formData.newProgramme || 'New degree/diploma in which enrolled'}</span></div>

                      <div>NEW INSTITUTION IN WHICH ENROLLED</div>
                      <div>: <span className="uppercase">{formData.newInstitution || 'Name of the new institute/college/university'}</span></div>

                      <div>YEAR OF ENROLLMENT</div>
                      <div>: <span className="uppercase">{formData.yearOfEnrollment || 'Academic year of enrollment'}</span></div>
                    </div>
                  </div>

                  <div style={{flexGrow: 0.5}} />

                  {/* Yours truly */}
                  <div>
                    <p>Yours truly,</p>
                    <div className="mt-6">
                      <p>Sign:</p>
                      <p className="font-bold uppercase">{formData.name || '(NAME OF THE STUDENT/ALUMNI)'}</p>
                      <p>({formData.phone || 'Phone No. of the Student/Alumni'})</p>
                      <p>({formData.email || 'Email ID of the Student/Alumni'})</p>
                    </div>
                  </div>

                  <div style={{flexGrow: 0.5}} />

                  {/* Enclosure / Charges / Authority */}
                  <div className="border-t border-gray-400 pt-3 text-[10.5px]">
                    <p className="font-bold mb-1">Enclosure:</p>
                    <p>1. The form/Letter from the other institute giving the admission which demands the transfer certificate.</p>
                    <p className="mb-2">2. A copy of photo ID proof / Student ID card of MCC.</p>

                    <p className="font-bold mb-1">Charges: INR 100/-</p>
                    <div className="grid mb-4 ml-4" style={{gridTemplateColumns: '155px auto', gap: '2px 4px'}}>
                      <div>For Aided Section:</div>
                      <div>Pay the fee and submit the form at Counter No. 4.<br/>Collect the document from Counter No. 2.</div>
                      <div className="mt-1">For Self-Finance Section:</div>
                      <div className="mt-1">Pay the fee and submit the form at Counter No. 7.<br/>Collect the document from Counter No. 8.</div>
                    </div>

                    <p className="font-bold mb-5">Signature of approving authority:</p>
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
          <h2 className="text-xl font-bold text-[#123B6D] mb-3">About Transfer Certificate</h2>
          <p className="text-[#64748B] text-sm mb-4 leading-relaxed">
            A transfer certificate is issued only to the students who have completed UG or PG degree from the college or are seeking a transfer (taking exit) before completing the degree from the college. It is only issued after a student/alumnus secures provisional admission in another institute and the institute demands a transfer certificate in writing from the Mulund College of Commerce.
            <br/><br/>
            Please note if the candidate joins a higher education institute whose affiliation is outside the University of Mumbai, the candidate shall apply for the Migration Certificate. Transfer/Migration Certificate is not issued for candidates enrolling in foreign Universities.
            <br/><br/>
            <span className="font-bold text-[#123B6D]">Charges:</span> INR 100/-
          </p>
          <h3 className="font-bold text-[#123B6D] mb-3">Application Process:</h3>
          <ol className="list-decimal list-inside text-sm text-[#64748B] space-y-2">
            <li>Fill in the details on the application form below and download the PDF.</li>
            <li>Take two printouts. (One for receiving the acknowledgement after submitting the application).</li>
            <li>Sign the Application Form.</li>
            <li>Visit the college on a working day. (Between 9 AM to 1 PM OR 2 PM to 3 PM)</li>
            <li>Take the signature of the Principal/Vice-Principal or the Office In-Charge.</li>
            <li>Pay the charges/fee in cash at the fee counter.</li>
            <li>Submit the application at the respective office counter. After a few days, collect your document from the college.</li>
          </ol>
        </div>

      </div>
    </div>
  );
}
