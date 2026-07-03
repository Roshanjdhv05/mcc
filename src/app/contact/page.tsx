import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | MCC Digital Experience Platform',
  description: 'Get in touch with Mulund College of Commerce. Contact details, inquiry form and department directory.',
};

const departments = [
  { name: 'Principal Office', phone: '022-25688888', email: 'principal@mcc.edu.in' },
  { name: 'Admission Office', phone: '022-25688889', email: 'admissions@mcc.edu.in' },
  { name: 'Examination Section', phone: '022-25688890', email: 'examination@mcc.edu.in' },
  { name: 'Library', phone: '022-25688891', email: 'library@mcc.edu.in' },
  { name: 'Accounts & Fees', phone: '022-25688892', email: 'accounts@mcc.edu.in' },
  { name: 'Student Welfare', phone: '022-25688893', email: 'welfare@mcc.edu.in' },
];

export default function ContactPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-[#123B6D] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-heading)] mb-2">Contact Us</h1>
          <p className="text-white/70">Get in touch with us. We're here to help.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-8 pb-16 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            {[
              { icon: MapPin, label: 'Address', val: 'Mulund Vanijya Mahavidyalaya Marg Mulund West, Mumbai 400080', color: 'bg-blue-50 text-[#123B6D]' },
              { icon: Phone, label: 'Phone', val: '8097345311, 8097876255, 9082101135, 9082164576', color: 'bg-green-50 text-green-700' },
              { icon: Mail, label: 'Email', val: 'mccmulund@gmail.com', color: 'bg-amber-50 text-amber-700' },
              { icon: Clock, label: 'Office Hours', val: 'Mon–Sat: 9:00 AM – 5:00 PM', color: 'bg-purple-50 text-purple-700' },
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium mb-1">{label}</p>
                  <p className="text-sm font-medium text-[#1E293B]">{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-6">Send an Inquiry</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#64748B] mb-1.5">First Name</label>
                  <input className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:border-[#4DA8DA] outline-none transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#64748B] mb-1.5">Last Name</label>
                  <input className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:border-[#4DA8DA] outline-none transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1.5">Email</label>
                <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:border-[#4DA8DA] outline-none transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1.5">Subject</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:border-[#4DA8DA] outline-none transition-colors bg-white text-[#64748B]">
                  <option>Admissions Inquiry</option>
                  <option>Examination Related</option>
                  <option>Student Services</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1.5">Message</label>
                <textarea rows={4} className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:border-[#4DA8DA] outline-none transition-colors resize-none" placeholder="Type your message here..." />
              </div>
              <button className="w-full py-3 bg-[#123B6D] text-white font-semibold rounded-xl hover:bg-[#0d2d54] transition-all shadow-lg shadow-[#123B6D]/20">
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={40} className="text-[#123B6D] mx-auto mb-2" />
            <p className="text-[#64748B] font-medium">Google Maps — Mulund College of Commerce</p>
            <p className="text-sm text-[#94A3B8]">Mulund Vanijya Mahavidyalaya Marg, Mulund West, Mumbai 400080</p>
          </div>
        </div>

        {/* Department Directory */}
        <div>
          <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-5">Department Directory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((d) => (
              <div key={d.name} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 hover:shadow-md transition-all">
                <h3 className="font-semibold text-[#1E293B] mb-3 font-[var(--font-heading)]">{d.name}</h3>
                <div className="space-y-2">
                  <a href={`tel:${d.phone}`} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#123B6D] transition-colors">
                    <Phone size={14} className="text-[#4DA8DA]" /> {d.phone}
                  </a>
                  <a href={`mailto:${d.email}`} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#123B6D] transition-colors">
                    <Mail size={14} className="text-[#4DA8DA]" /> {d.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
