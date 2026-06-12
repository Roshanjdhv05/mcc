'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, BookOpen, Megaphone, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'Courses', href: '/academics', icon: BookOpen },
  { label: 'Broadcasts', href: '#', icon: Megaphone },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [hasUnread, setHasUnread] = useState(true);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-xl border-t border-white/30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-2xl">
      <div className="flex items-center justify-around px-2 pt-2 pb-3">
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              onClick={(e) => {
                if (label === 'Broadcasts') {
                  e.preventDefault();
                  setHasUnread(false);
                  document.dispatchEvent(new CustomEvent('open-assistant'));
                }
              }}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                active ? 'text-[#123B6D]' : 'text-[#94A3B8]'
              }`}
            >
              <div className="relative">
                {label === 'Broadcasts' ? (
                  <motion.div
                    animate={hasUnread ? { rotate: [0, -20, 20, -20, 20, 0], color: ['#94A3B8', '#eab308', '#94A3B8'] } : { color: 'currentColor' }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    style={{ transformOrigin: "top center" }}
                  >
                    <Icon size={22} />
                  </motion.div>
                ) : (
                  <Icon size={22} />
                )}
                {label === 'Broadcasts' && hasUnread && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-[1.5px] border-white rounded-full" />
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
              {active && (
                <span className="w-1 h-1 bg-[#D4A017] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
