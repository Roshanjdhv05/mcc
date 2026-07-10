import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/layout/AIAssistant";
import BottomNav from "@/components/layout/BottomNav";
import SplashScreen from "@/components/layout/SplashScreen";

import InstallPrompt from "@/components/pwa/InstallPrompt";
import IOSInstallGuide from "@/components/pwa/IOSInstallGuide";
import InstallFloatingButton from "@/components/pwa/InstallFloatingButton";
import UpdateToast from "@/components/pwa/UpdateToast";

const sourceSerif = Source_Serif_4({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MCC Digital Experience Platform | Mulund College of Commerce",
  description:
    "The official digital platform of Mulund College of Commerce (Autonomous) — offering seamless access to admissions, academics, notices, and student services.",
  keywords: "MCC, Mulund College of Commerce, Mumbai University, Admissions, BCom, MCom",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png' }
    ]
  },
  appleWebApp: {
    capable: true,
    title: "MCC App",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#123B6D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${sourceSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC]" suppressHydrationWarning>
        <SplashScreen />
        <Navbar />
        <main className="flex-1 pt-16 md:pt-[120px] lg:pt-[150px] xl:pt-[160px]">{children}</main>
        <Footer />
        <AIAssistant />
        <BottomNav />
        
        {/* PWA Components */}
        <InstallPrompt />
        <IOSInstallGuide />
        <InstallFloatingButton />
        <UpdateToast />
      </body>
    </html>
  );
}
