'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIAssistant from '@/components/layout/AIAssistant';
import BottomNav from '@/components/layout/BottomNav';
import SplashScreen from '@/components/layout/SplashScreen';
import InstallPrompt from '@/components/pwa/InstallPrompt';
import IOSInstallGuide from '@/components/pwa/IOSInstallGuide';
import InstallFloatingButton from '@/components/pwa/InstallFloatingButton';
import UpdateToast from '@/components/pwa/UpdateToast';

// Routes that should render without the site chrome (Navbar, Footer, etc.)
const BARE_ROUTES = ['/admin', '/superadmin'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = BARE_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/') || pathname.startsWith(route + '?'));

  if (isBare) {
    return (
      <main id="main-content" className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
      <SplashScreen />
      <Navbar />
      <main id="main-content" className="flex-1 pt-[92px] md:pt-[178px] lg:pt-[213px] xl:pt-[223px]">
        {children}
      </main>
      <Footer />
      <AIAssistant />
      <BottomNav />
      <InstallPrompt />
      <IOSInstallGuide />
      <InstallFloatingButton />
      <UpdateToast />
    </>
  );
}
