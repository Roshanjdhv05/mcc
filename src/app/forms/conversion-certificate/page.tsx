'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, FileText, User, GraduationCap, Table } from 'lucide-react';
import Link from 'next/link';

type StatusType = 'Current Student' | 'Alumni' | '';
type CollegeType = 'Degree College' | 'Jr College' | '';

const JR_CLASSES = ['11th', '12th'];

interface MarksheetRow {
  programme: string;
  semester: string;
  passingMonthYear: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  status: StatusType;
  collegeType: CollegeType;
  degree: string;
  marksheets: MarksheetRow[];
}

export default function ConversionCertificatePage() {
  const letterRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '', status: '', collegeType: '', degree: '',
    marksheets: Array(6).fill({ programme: '', semester: '', passingMonthYear: '' })
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

  const handleRowChange = (index: number, field: keyof MarksheetRow, value: string) => {
    const newMarksheets = [...formData.marksheets];
    newMarksheets[index] = { ...newMarksheets[index], [field]: value };
    setFormData(prev => ({ ...prev, marksheets: newMarksheets }));
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
      pdf.save(`Conversion_Certificate_${formData.name.replace(/\s+/g, '_') || 'Student'}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#123B6D] focus:ring-1 focus:ring-[#123B6D] outline-none transition-all text-sm";
  const labelCls = "block text-sm font-semibold text-[#64748B] mb-1.5";
  
  const isAlumni = formData.status === 'Alumni';
  const isJrCollege = formData.collegeType === 'Jr College';
  const isDegreeCollege = formData.collegeType === 'Degree College';
  const hasMarksheetRow = formData.marksheets.some(r => r.programme || r.semester || r.passingMonthYear);
  const canDownload = !!(formData.name && formData.status && formData.degree && hasMarksheetRow);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#123B6D] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <Link href="/forms" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Forms
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/30 flex items-center justify-center">
              <FileText size={26} className="text-fuchsia-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Conversion Certificate</h1>
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

            {/* Academic Status */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#123B6D] font-bold text-base pb-2 border-b border-[#E2E8F0]">
                <GraduationCap size={18} /> Academic Details
              </div>
              <div>
                <label className={labelCls}>Status *</label>
                <select name="status" value={formData.status} onChange={handleChange} className={inputCls}>
                  <option value="">Select Status</option>
                  <option value="Current Student">Current Student</option>
                  <option value="Alumni">Alumni</option>
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
                        {isDegreeCollege ? 'Degree Programme' : 'Class'} *
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
                </>
              )}
            </div>

            {/* Marksheets Table Form */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#123B6D] font-bold text-base pb-2 border-b border-[#E2E8F0]">
                <Table size={18} /> Marksheets for Conversion
              </div>
              <p className="text-xs text-[#64748B] mb-2">Fill in the details for the specific marksheets to be converted.</p>
              
              <div className="space-y-3">
                {formData.marksheets.map((row, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 bg-[#F8FAFC] p-2 rounded-xl border border-[#E2E8F0]">
                    <div className="col-span-5">
                      <input type="text" value={row.programme} onChange={(e) => handleRowChange(i, 'programme', e.target.value)} placeholder="Programme Name" className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none" />
                    </div>
                    <div className="col-span-3">
                      <input type="text" value={row.semester} onChange={(e) => handleRowChange(i, 'semester', e.target.value)} placeholder="Sem" className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none" />
                    </div>
                    <div className="col-span-4">
                      <input type="text" value={row.passingMonthYear} onChange={(e) => handleRowChange(i, 'passingMonthYear', e.target.value)} placeholder="Month/Year" className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none" />
                    </div>
                  </div>
                ))}
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
            <p className="text-xs text-center text-[#64748B]">Fill out Name, Status, Degree and at least 1 Marksheet to enable download.</p>
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
                  id="printable-conversion-letter"
                  ref={letterRef}
                  className="bg-white shadow-sm w-full max-w-[210mm] text-black font-serif text-[11.5px] leading-normal flex flex-col"
                  style={{ boxSizing: 'border-box', padding: '28px 36px', height: '297mm', overflow: 'hidden' }}
                >
                  {/* Header */}
                  <div className="text-center">
                    <h1 className="font-bold text-[13px] mb-0.5">PTVA'S MULUND COLLEGE OF COMMERCE (AUTONOMOUS)</h1>
                    <h2 className="font-semibold text-[12px] mb-0.5 uppercase">{formData.collegeType || 'DEGREE COLLEGE / JR COLLEGE'}</h2>
                    <h3 className="font-bold underline text-[12px] mt-1">APPLICATION FOR CONVERSION CERTIFICATE FOR GRADE-CARDS</h3>
                  </div>

                  <div style={{flexGrow: 0.15}} />

                  <div className="text-left font-semibold">DATE : {isClient ? currentDate : 'DD/MM/YYYY'}</div>

                  <div style={{flexGrow: 0.1}} />

                  <div>
                    <p>To</p>
                    <p>The Principal</p>
                    <p>Mulund College of Commerce,</p>
                    <p>Mumbai- 400080</p>
                  </div>

                  <div style={{flexGrow: 0.15}} />

                  <div className="font-bold">Subject: Application for the Conversion Certificate</div>

                  <div style={{flexGrow: 0.12}} />

                  <div><p>Dear Sir/Madam,</p></div>

                  <div style={{flexGrow: 0.12}} />

                  <div className="indent-8 text-justify text-[10.5px]">
                    I, the undersigned, need conversion certificate of my marksheets/grade-cards for applying to higher education/recruitment process. I have been made aware that the conversion certificate of my marksheet/grade-card will be completed in around two weeks' time and I will have to come and collect it from the college. Kindly issue me the same.
                  </div>

                  <div style={{flexGrow: 0.2}} />

                  {/* Details */}
                  <div>
                    <p className="mb-1.5 font-bold bg-gray-200/50 inline-block px-1">My details are given as under</p>
                    <div className="grid gap-1 ml-4" style={{gridTemplateColumns: '185px auto'}}>
                      <div className="font-bold bg-gray-200/50 inline-block px-1">CURRENT STUDENT/ALUMNI</div>
                      <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.status || 'Current Student/Alumni'}</span></div>

                      {formData.collegeType && (
                        <>
                          <div className="font-bold bg-gray-200/50 inline-block px-1">COLLEGE SECTION</div>
                          <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.collegeType}</span></div>
                        </>
                      )}

                      {isAlumni ? (
                        <>
                          <div className="col-span-2 font-bold underline mt-1.5">ALUMNI</div>
                          <div className="font-bold bg-gray-200/50 inline-block px-1">{isJrCollege ? 'CLASS' : 'DEGREE PROGRAMME'}</div>
                          <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.degree || (isJrCollege ? 'CLASS' : 'DEGREE FOR WHICH THE CONVERSION CERTIFICATE IS NEEDED')}</span></div>
                        </>
                      ) : (
                        <>
                          <div className="col-span-2 font-bold underline mt-1.5">CURRENT STUDENT</div>
                          <div className="font-bold bg-gray-200/50 inline-block px-1">{isJrCollege ? 'CLASS' : 'DEGREE PROGRAMME'}</div>
                          <div className="font-bold bg-gray-200/50 underline px-1">: <span className="uppercase">{formData.degree || (isJrCollege ? 'CLASS' : 'DEGREE PROGRAMME FOR WHICH ENROLLED')}</span></div>
                        </>
                      )}
                    </div>
                  </div>

                  <div style={{flexGrow: 0.2}} />

                  {/* Marksheets Table */}
                  <table className="w-full border-collapse border border-black text-center text-[10px]">
                    <thead>
                      <tr className="bg-gray-200/50 font-bold border-b border-black">
                        <th className="border-r border-black p-1 w-1/2">Name of the Programme</th>
                        <th className="border-r border-black p-1 w-1/4">Semester</th>
                        <th className="p-1 w-1/4">Month & Year of Passing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.marksheets.map((row, i) => (
                        <tr key={i} className="border-b border-black h-5">
                          <td className="border-r border-black px-2 text-left uppercase">{row.programme}</td>
                          <td className="border-r border-black px-2 uppercase">{row.semester}</td>
                          <td className="px-2 uppercase">{row.passingMonthYear}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{flexGrow: 0.4}} />

                  {/* Yours truly */}
                  <div>
                    <p>Yours truly,</p>
                    <div className="mt-5">
                      <p>Sign:</p>
                      <p className="font-bold uppercase">{formData.name || '(NAME OF THE STUDENT/ALUMNI)'}</p>
                      <p>({formData.phone || 'Phone No. of the Student/Alumni'})</p>
                      <p>({formData.email || 'Email ID of the Student/Alumni'})</p>
                    </div>
                  </div>

                  <div style={{flexGrow: 0.35}} />

                  {/* Enclosure / Charges / Authority */}
                  <div className="border-t border-gray-400 pt-3 text-[10px]">
                    <p className="font-bold mb-1">Enclosure:</p>
                    <p className="mb-2">1. A copy of photo ID proof/ Student ID card of MCC. Photocopies of all the marksheets/grade cards.</p>

                    <p className="font-bold mb-1">Charges: INR 100/-</p>
                    <div className="grid mb-4 ml-4" style={{gridTemplateColumns: '155px auto', gap: '1px 4px'}}>
                      <div className="font-bold">For Aided Section:</div>
                      <div>Pay the fee and submit the form at Counter No. 4.<br/>Collect the document from Counter No. 2.</div>
                      <div className="font-bold mt-1">For Self-Finance Section:</div>
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
      </div>
    </div>
  );
}
