'use client';
import Link from 'next/link';
import { Home, Search, BookOpen, Bot, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'Courses', href: '/academics', icon: BookOpen },
  { label: 'AI Chat', href: '#', icon: Bot },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-xl border-t border-white/30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-2xl">
      <div className="flex items-center justify-around px-2 pt-2 pb-3">
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                active ? 'text-[#123B6D]' : 'text-[#94A3B8]'
              }`}
            >
              <Icon size={22} />
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
