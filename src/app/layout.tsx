import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/layout/AIAssistant";
import BottomNav from "@/components/layout/BottomNav";
import SplashScreen from "@/components/layout/SplashScreen";
import InstallPWA from "@/components/ui/InstallPWA";

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
};

export const viewport: Viewport = {
  themeColor: "#123B6D",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.deferredPWAEvent = null;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                window.deferredPWAEvent = e;
              });
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC]">
        <SplashScreen />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <AIAssistant />
        <BottomNav />
        <InstallPWA />
      </body>
    </html>
  );
}
