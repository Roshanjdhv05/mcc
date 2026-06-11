import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Share2, Rss, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#123B6D] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl font-[var(--font-heading)]">M</div>
              <div>
                <div className="font-bold font-[var(--font-heading)]">MCC Autonomous</div>
                <div className="text-xs text-white/70">Mulund College of Commerce</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              An autonomous institution affiliated with the University of Mumbai, committed to academic excellence since 1964.
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
                { label: 'About MCC', href: '/about' },
                { label: 'Academic Programmes', href: '/academics' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'Examination Hub', href: '/examination' },
                { label: 'Notice Board', href: '/notices' },
                { label: 'Student Services', href: '/services' },
                { label: 'IQAC & NAAC', href: '/iqac' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[#D4A017] hover:pl-1 transition-all">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h3 className="font-semibold text-[#D4A017] mb-5 font-[var(--font-heading)]">Programmes</h3>
            <ul className="space-y-3 text-sm text-white/80">
              {['FYJC Arts & Commerce', 'SYJC Arts & Commerce', 'B.Com (General)', 'M.Com', 'M.Sc. IT', 'Ph.D Research'].map((p) => (
                <li key={p}>
                  <Link href="/academics" className="hover:text-[#D4A017] hover:pl-1 transition-all">{p}</Link>
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
                <span>Ram Mandir Road, Vidyanagari, Mulund (W), Mumbai - 400080</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0 text-[#4DA8DA]" />
                <a href="tel:+912225688888" className="hover:text-white transition-colors">+91 22 2568 8888</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0 text-[#4DA8DA]" />
                <a href="mailto:info@mcc.edu.in" className="hover:text-white transition-colors">info@mcc.edu.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© 2024 Mulund College of Commerce (Autonomous). All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
