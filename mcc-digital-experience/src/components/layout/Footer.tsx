'use client';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Share2, Rss, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/superadmin')) return null;

  return (
    <footer className="bg-[#123B6D] text-white pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/mcclogo.png" alt="MCC Logo" className="w-12 h-12 object-contain bg-white rounded-full p-1" />
              <div>
                <div className="font-bold font-[var(--font-heading)]">MULUND COLLEGE OF COMMERCE</div>
                <div className="text-xs text-white/70">(AUTONOMOUS)</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              An autonomous institution affiliated with the University of Mumbai, committed to academic excellence since 1970.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, Share2, Rss, MessageSquare].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A017] transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[#D4A017] mb-5 font-[var(--font-heading)]">Quick Links</h3>
            <ul className="space-y-3 text-sm text-white/80">
              {[
                { label: 'About us', href: '/about' },
                { label: 'Degree Programmes', href: '/programmes' },
                { label: 'Junior College', href: '/junior-college' },
                { label: 'Examination', href: '/examination' },
                { label: 'Admission', href: '/admissions' },
                { label: 'Student Corner', href: '/students-corner' },
                { label: 'Accreditation', href: '/accreditation' },
                { label: 'Autonomy', href: '/autonomy' },
                { label: 'IQAC', href: '/iqac' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[#D4A017] hover:pl-1 transition-all">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#D4A017] mb-5 font-[var(--font-heading)]">Contact Us</h3>
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#4DA8DA]" />
                <span>Mulund Vanijya Mahavidyalaya Marg Mulund West, Mumbai 400080</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-[#4DA8DA]" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+918097345311" className="hover:text-white transition-colors">+91 8097345311</a>
                  <a href="tel:+918097876255" className="hover:text-white transition-colors">+91 8097876255</a>
                  <a href="tel:+919082101135" className="hover:text-white transition-colors">+91 9082101135</a>
                  <a href="tel:+919082164576" className="hover:text-white transition-colors">+91 9082164576</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0 text-[#4DA8DA]" />
                <a href="mailto:mccmulund@gmail.com" className="hover:text-white transition-colors">mccmulund@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/50 relative overflow-hidden">
          <p className="text-center md:text-left">
            © 2026 Mulund College of Commerce (Autonomous). All rights reserved.
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="flex flex-col items-center md:items-end relative z-10"
          >
            {/* Thin sweeping line */}
            <motion.div
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                visible: { scaleX: 1, opacity: 1, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="absolute -top-3 md:-top-5 right-0 w-[150px] md:w-[250px] h-[1px] bg-gradient-to-r from-transparent via-[#4DA8DA]/50 to-transparent origin-right"
            />

            <div className="flex items-center gap-2">
              <motion.span
                variants={{
                  hidden: { opacity: 0, filter: "blur(4px)" },
                  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 1, delay: 0.5, ease: "easeOut" } }
                }}
                className="text-white/60 text-[13px] tracking-wide font-medium"
              >
                Designed & Managed by
              </motion.span>

              <a
                href="https://elevi8.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center p-1"
              >
                <div className="flex text-white font-bold text-[15px] tracking-widest relative transition-all duration-300 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_12px_rgba(77,168,218,0.8)]">
                  {['E', 'l', 'e', 'v', 'i'].map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1 + index * 0.08, ease: "easeOut" } }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, scale: 0, rotate: -45 },
                      visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, delay: 1.6, type: "spring", bounce: 0.5 } }
                    }}
                    className="relative text-[#4DA8DA] ml-[1px]"
                  >
                    8
                    {/* Subtle looping particle around the 8 */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-[6px] rounded-full border border-dashed border-[#4DA8DA]/0 group-hover:border-[#4DA8DA]/30 transition-colors duration-500 pointer-events-none"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-[1px] left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_#fff]"
                      />
                    </motion.div>
                  </motion.span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
