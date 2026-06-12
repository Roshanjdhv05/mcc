import type { Metadata } from "next";
import { Source_Serif_4, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/layout/AIAssistant";
import BottomNav from "@/components/layout/BottomNav";
import SplashScreen from "@/components/layout/SplashScreen";

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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC]">
        <SplashScreen />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <AIAssistant />
        <BottomNav />
      </body>
    </html>
  );
}
