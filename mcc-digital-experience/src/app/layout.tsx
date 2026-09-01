import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import PageTrackerProvider from "@/components/analytics/PageTrackerProvider";

const sourceSerif = Source_Serif_4({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});
// Cache bust for Next.js hot reload

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mulund College of Commerce (AUTONOMOUS) | Mulund College of Commerce",
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
        <a href="#main-content" className="skip-to-main font-bold focus:ring-2 focus:ring-white rounded-br-lg">Skip to Main Content</a>
        <ReactQueryProvider>
        <PageTrackerProvider />
        <SiteChrome>
          {children}
        </SiteChrome>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
