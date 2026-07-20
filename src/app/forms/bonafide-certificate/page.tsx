'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, FileText, User, GraduationCap } from 'lucide-react';
import Link from 'next/link';

type StatusType = 'Current Student' | 'Alumnus' | 'Drop Year Student' | '';
type CollegeType = 'Degree College' | 'Jr College' | '';

const JR_CLASSES = ['11th', '12th'];

export default function BonafideCertificatePage() {
  const letterRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: '' as StatusType,
    collegeType: '' as CollegeType,
    degree: '',
    academicYear: '',
    yearOfStudy: '',
    rollNumber: '',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = async () => {
    try {
      if (!letterRef.current) return;
      
      const htmlToImage = await import('html-to-image');
      const { jsPDF } = await import('jspdf');

      const element = letterRef.current;
      
      const dataUrl = await htmlToImage.toPng(element, { quality: 1, pixelRatio: 2 });
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      let pdfHeight = (element.scrollHeight * pdfWidth) / element.scrollWidth;
      
      // Ensure it always perfectly fits on exactly ONE page proportionally
      if (pdfHeight > pageHeight) {
        // If it's too tall, scale both width and height proportionally to fit the page height
        const ratio = pageHeight / pdfHeight;
        pdfHeight = pageHeight;
        const newWidth = pdfWidth * ratio;
        // Center it horizontally
        const xOffset = (pdfWidth - newWidth) / 2;
        pdf.addImage(dataUrl, 'PNG', xOffset, 0, newWidth, pdfHeight);
      } else {
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save(`Bonafide_Application_${formData.name.replace(/\s+/g, '_') || 'Student'}.pdf`);
      
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const isCurrentStudent = formData.status === 'Current Student';
  const isAlumniOrDrop = formData.status === 'Alumnus' || formData.status === 'Drop Year Student';
  const isJrCollege = formData.collegeType === 'Jr College';
  const isDegreeCollege = formData.collegeType === 'Degree College';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'collegeType') {
      setFormData(prev => ({ ...prev, collegeType: value as CollegeType, degree: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] print:bg-white">
      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-letter, #printable-letter * {
            visibility: visible;
          }
          #printable-letter {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: none !important;
          }
          /* Hide the scrollable container wrapper in print */
          .print-hide-overflow {
            overflow: visible !important;
            max-height: none !important;
          }
        }
      `}} />

      {/* Header */}
      <div className="bg-[#123B6D] pt-8 pb-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <Link href="/forms" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Forms
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)] mb-2 flex items-center gap-3">
            <FileText className="text-[#D4A017]" size={36} />
            Bonafide Certificate Application
          </h1>
          <p className="text-white/70">Fill out the details below to generate your application letter.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Form Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm">
              <h2 className="text-xl font-bold text-[#1E293B] font-[var(--font-heading)] mb-6 flex items-center gap-2">
                <User className="text-[#123B6D]" size={20} /> Applicant Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#64748B] mb-1.5">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#64748B] mb-1.5">Phone No.</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Mobile Number" className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#64748B] mb-1.5">Email ID</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#64748B] mb-1.5">Current Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm bg-white">
                    <option value="">Select your status...</option>
                    <option value="Current Student">Current Student</option>
                    <option value="Alumnus">Alumnus</option>
                    <option value="Drop Year Student">Drop Year Student</option>
                  </select>
                </div>
              </div>

              {/* Conditional Fields */}
              {formData.status && (
                <div className="mt-8 pt-6 border-t border-[#E2E8F0] animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-lg font-bold text-[#1E293B] font-[var(--font-heading)] mb-4 flex items-center gap-2">
                    <GraduationCap className="text-[#123B6D]" size={20} /> Academic Details
                  </h3>
                  
                  <div className="space-y-4">
                    {/* College Type Selector */}
                    <div>
                      <label className="block text-sm font-semibold text-[#64748B] mb-1.5">College Section</label>
                      <select name="collegeType" value={formData.collegeType} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm bg-white">
                        <option value="">Select College Type...</option>
                        <option value="Degree College">Degree College</option>
                        <option value="Jr College">Jr College (11th / 12th)</option>
                      </select>
                    </div>

                    {isCurrentStudent ? (
                      <>
                        {formData.collegeType && (
                          <div>
                            <label className="block text-sm font-semibold text-[#64748B] mb-1.5">
                              {isDegreeCollege ? 'Degree Programme Enrolled' : 'Class'}
                            </label>
                            {isDegreeCollege ? (
                              <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="e.g. Bachelor in Computer Application" className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm bg-white" />
                            ) : (
                              <select name="degree" value={formData.degree} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm bg-white">
                                <option value="">Select Class...</option>
                                {JR_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            )}
                          </div>
                        )}
                        {isDegreeCollege && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-[#64748B] mb-1.5">Year of Study</label>
                              <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm bg-white">
                                <option value="">Select Year...</option>
                                <option value="First Year">First Year</option>
                                <option value="Second Year">Second Year</option>
                                <option value="Third Year">Third Year</option>
                                <option value="Part I">Part I</option>
                                <option value="Part II">Part II</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-[#64748B] mb-1.5">Roll No / Student ID</label>
                              <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="e.g. 2345" className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm" />
                            </div>
                          </div>
                        )}
                        {isJrCollege && (
                          <div>
                            <label className="block text-sm font-semibold text-[#64748B] mb-1.5">Roll No / Student ID</label>
                            <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="e.g. 2345" className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm" />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {formData.collegeType && (
                          <div>
                            <label className="block text-sm font-semibold text-[#64748B] mb-1.5">
                              {isDegreeCollege ? 'Last Completed/Enrolled Degree' : 'Last Class Attended'}
                            </label>
                            {isDegreeCollege ? (
                              <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="e.g. Bachelor in Computer Application" className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm bg-white" />
                            ) : (
                              <select name="degree" value={formData.degree} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm bg-white">
                                <option value="">Select Class...</option>
                                {JR_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            )}
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-[#64748B] mb-1.5">Last Academic Year</label>
                            <input type="text" name="academicYear" value={formData.academicYear} onChange={handleChange} placeholder="e.g. 2022-2023" className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[#64748B] mb-1.5">Last Roll No / ID</label>
                            <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="e.g. 2345" className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={handleDownload}
              disabled={!formData.name || !formData.status}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-sm print:hidden ${
                formData.name && formData.status 
                  ? 'bg-[#123B6D] hover:bg-[#0A2240] text-white hover:shadow-md hover:-translate-y-1' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Download size={20} /> Download PDF
            </button>
            <p className="text-xs text-center text-[#64748B] mt-2 print:hidden">
              Fill out your details to enable the download button.
            </p>
          </div>

          {/* Live Preview Section */}
          <div className="lg:col-span-7 print:w-full print:m-0 print:p-0">
            <div className="bg-white rounded-3xl p-2 border border-[#E2E8F0] shadow-xl overflow-hidden sticky top-8 print:border-none print:shadow-none print:static">
              <div className="bg-[#F8FAFC] py-3 px-6 border-b border-[#E2E8F0] flex justify-between items-center rounded-t-2xl print:hidden">
                <span className="text-sm font-bold text-[#64748B] flex items-center gap-2">
                  <FileText size={16} /> Live Letter Preview
                </span>
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-md">
                  A4 Format
                </span>
              </div>
              
              <div className="overflow-y-auto max-h-[70vh] bg-gray-100 p-4 md:p-8 flex justify-center print-hide-overflow print:bg-white print:p-0">
                {/* A4 Paper container */}
                <div 
                  id="printable-letter"
                  ref={letterRef}
                  className="bg-white shadow-sm w-full max-w-[210mm] text-black font-serif text-[11.5px] leading-normal flex flex-col"
                  style={{
                    boxSizing: 'border-box',
                    padding: '28px 36px',
                    height: '297mm',
                    overflow: 'hidden'
                  }}
                >
                  {/* Header */}
                  <div className="text-center">
                    <h1 className="font-bold text-[13px] mb-0.5">PTVA'S MULUND COLLEGE OF COMMERCE (AUTONOMOUS)</h1>
                    <h2 className="font-semibold text-[12px] mb-0.5">DEGREE COLLEGE</h2>
                    <h3 className="font-bold underline text-[12px] mt-1 mb-0.5">APPLICATION FOR BONAFIDE CERTIFICATE</h3>
                  </div>

                  <div className="flex-grow" style={{flexGrow: 0.3}} />

                  {/* Date */}
                  <div className="text-right font-semibold">
                    DATE: {isClient ? currentDate : 'DD/MM/YYYY'}
                  </div>

                  <div style={{flexGrow: 0.2}} />

                  {/* To */}
                  <div>
                    <p>To</p>
                    <p>The Principal</p>
                    <p>Mulund College of Commerce,</p>
                    <p>Mumbai- 400080</p>
                  </div>

                  <div style={{flexGrow: 0.25}} />

                  {/* Subject */}
                  <div className="font-bold">
                    Subject: Application for Bonafide Certificate
                  </div>

                  <div style={{flexGrow: 0.2}} />

                  {/* Salutation */}
                  <div><p>Dear Sir/Madam,</p></div>

                  <div style={{flexGrow: 0.2}} />

                  {/* Body */}
                  <div className="indent-8 text-justify">
                    I, the undersigned, need a Bonafide certificate. I have been made aware that my Bonafide certificate will be ready in around two weeks' time and I will have to collect it from college office, when it gets ready. Kindly issue me the same.
                  </div>

                  <div style={{flexGrow: 0.3}} />

                  {/* Details Table */}
                  <div>
                    <p className="mb-1.5">My details are given as under.</p>
                    <div className="grid gap-1 ml-4" style={{gridTemplateColumns: '185px auto'}}>
                      <div>STATUS</div>
                      <div>: <span className="uppercase">{formData.status || 'Current Student/Alumnus/Drop Year Student'}</span></div>

                      {formData.collegeType && (
                        <>
                          <div>COLLEGE SECTION</div>
                          <div>: <span className="uppercase">{formData.collegeType}</span></div>
                        </>
                      )}

                      {isAlumniOrDrop ? (
                        <>
                          <div className="col-span-2 font-bold underline mt-1.5">ALUMNI / DROP YEAR STUDENT</div>
                          <div>{isJrCollege ? 'CLASS' : 'DEGREE PROGRAMME'}</div>
                          <div>: <span className="uppercase">{formData.degree}</span></div>
                          <div>ACADEMIC YEAR</div>
                          <div>: <span className="uppercase">{formData.academicYear}</span></div>
                          <div>LAST ROLL NUMBER/STUDENT ID</div>
                          <div>: <span className="uppercase">{formData.rollNumber}</span></div>
                        </>
                      ) : (
                        <>
                          <div className="col-span-2 font-bold underline mt-1.5">CURRENT STUDENT</div>
                          <div>{isJrCollege ? 'CLASS' : 'DEGREE PROGRAMME'}</div>
                          <div>: <span className="uppercase">{formData.degree}</span></div>
                          {isDegreeCollege && <><div>YEAR</div>
                          <div>: <span className="uppercase">{formData.yearOfStudy}</span></div></>}
                          <div>ROLL NUMBER/STUDENT ID</div>
                          <div>: <span className="uppercase">{formData.rollNumber}</span></div>
                        </>
                      )}
                    </div>
                  </div>

                  <div style={{flexGrow: 0.4}} />

                  {/* Signature block */}
                  <div>
                    <p>Yours truly,</p>
                    <div className="mt-6">
                      <p>Sign:</p>
                      <p className="font-bold uppercase">{formData.name || '(NAME OF THE STUDENT/ALUMNI)'}</p>
                      <p>({formData.phone || 'Phone No. of the Student/Alumni'})</p>
                      <p>({formData.email || 'Email ID of the Student/Alumni'})</p>
                    </div>
                  </div>

                  <div style={{flexGrow: 0.4}} />

                  {/* Enclosure / Charges / Authority */}
                  <div className="border-t border-gray-400 pt-3 text-[10.5px]">
                    <p className="font-bold mb-1">Enclosure:</p>
                    <p className="mb-2">Only For Alumni/Drop Out Student: A photocopy of the last marksheet that you obtained from MCC.</p>

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
                      <span className="inline-block border-b border-black" style={{width: '160px'}}></span>
                      <span className="font-bold ml-4">Sign</span>
                      <span className="inline-block border-b border-black" style={{width: '80px'}}></span>
                      <span className="font-bold ml-2">Date</span>
                      <span className="inline-block border-b border-black" style={{width: '80px'}}></span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Instructions Panel */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 md:p-8 mt-8 mb-8">
          <h2 className="text-xl font-bold text-[#123B6D] mb-3">About Bonafide Certificate</h2>
          <p className="text-[#64748B] text-sm mb-4 leading-relaxed">
            A Bonafide certificate is issued on demand to current students as well as alumni. The certificate is useful for verification by third parties/agencies.
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
