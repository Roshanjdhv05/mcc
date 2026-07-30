import type { Metadata } from 'next';
import BAMMCPageClient from './BAMMCPageClient';

export const metadata: Metadata = {
  title: 'B.A. (MMC) | MCC Digital Experience Platform',
  description: 'Bachelor of Arts in Multimedia and Mass Communication (BA MMC) at Mulund College of Commerce — blending journalism, digital media, advertising, public relations, and multimedia production.',
};

export default function BAMMCPage() {
  return <BAMMCPageClient />;
}
