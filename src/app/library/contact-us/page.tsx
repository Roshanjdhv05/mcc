'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, University } from 'lucide-react';

const libraryNav = [
  { label: 'HOME', href: '/library' },
  { label: 'ABOUT US', href: '/library/about-us' },
  { label: 'WEB OPAC', href: '#' },
  { label: 'E-RESOURCES', href: '/library/e-resources' },
  { label: 'STAFF PROFILE', href: '/library/staff-profile' },
  { label: 'DOWNLOAD', href: '#' },
  { label: 'RESEARCH - KIT', href: '/library/research-kit' },
  { label: 'I. R.', href: 'https://drive.google.com/drive/folders/1bes4sOXN9ePGCVSgdTQ2ZtPg-pYQWyju?usp=drive_link' },
  { label: 'IMPORTANT LINKS', href: '/library/important-links' },
  { label: 'FEEDBACK', href: '#' },
  { label: 'CONTACT US', active: true, href: '/library/contact-us' },
];

export default function LibraryContactPage() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12 font-sans">
      {/* Secondary Library Nav */}
      <div className={`bg-[#014d4e] w-full shadow-md z-40 sticky transition-all duration-300 ${navVisible ? 'top-16 md:top-[160px] lg:top-[190px] xl:top-[200px]' : 'top-0'}`}>
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 overflow-x-auto no-scrollbar flex items-center h-12">
          {libraryNav.map((item, i) => {
            const isExternal = item.href?.startsWith('http');
            return isExternal ? (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 h-full flex items-center px-4 lg:px-5 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider text-white/90 hover:text-white hover:bg-white/10">
                {item.label}
              </a>
            ) : (
              <Link key={i} href={item.href || '#'}
                className={`flex-shrink-0 h-full flex items-center px-4 lg:px-5 text-[11px] lg:text-xs font-bold transition-colors uppercase whitespace-nowrap tracking-wider ${item.active ? 'bg-[#008e59] text-white' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-10">

        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#123B6D] tracking-tight mb-2">CONTACT US</h1>
          <div className="w-16 h-1 bg-[#008e59] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left: Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4522916818314!2d72.95613411421431!3d19.175437753823825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8e5321ecbfb%3A0xf7d295a999c47b89!2sMulund+College+of+Commerce!5e0!3m2!1sen!2sin!4v1553759178297"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mulund College of Commerce Location"
            />
          </div>

          {/* Right: Contact Details */}
          <div className="flex flex-col gap-5">

            {/* Institution & Library Name */}
            <div className="bg-[#014d4e] text-white rounded-2xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <University size={32} className="text-green-300 shrink-0 mt-1" />
                <div>
                  <p className="text-green-200 text-sm font-semibold tracking-wide">Parle Tilak Vidyalaya Association's</p>
                  <h2 className="text-xl font-black uppercase mt-1 leading-tight">Mulund College of Commerce Library</h2>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-[#008e59]" />
              </div>
              <div>
                <h3 className="font-bold text-[#123B6D] mb-2 text-sm uppercase tracking-wide">Address</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sarojini Naidu Road,<br />
                  Near Mulund Court,<br />
                  Mulund West,<br />
                  Mumbai – 400080
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Phone size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#123B6D] mb-3 text-sm uppercase tracking-wide">Contact Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1">College Landline</p>
                    <a href="tel:8097345311" className="text-gray-700 font-semibold hover:text-[#014d4e] transition-colors block">8097345311</a>
                    <a href="tel:8097876255" className="text-gray-700 font-semibold hover:text-[#014d4e] transition-colors block">8097876255</a>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Library Extension</p>
                    <span className="text-gray-700 font-semibold">EXT – 27</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Library Email</p>
                    <a href="mailto:librarymcc70@gmail.com" className="text-blue-600 font-semibold hover:underline break-all text-xs">librarymcc70@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#123B6D] mb-4 text-sm uppercase tracking-wide">Follow Us</h3>
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm shadow-blue-200" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/login?lang=en" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 bg-black hover:bg-gray-800 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm shadow-gray-200" aria-label="Twitter / X">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://in.linkedin.com/" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 bg-blue-700 hover:bg-blue-800 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm shadow-blue-200" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
