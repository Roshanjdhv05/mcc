import type { Metadata } from 'next';
import BAMMCPageClient from '../ba-mmc/BAMMCPageClient';

export const metadata: Metadata = {
  title: 'B.A. (MMC) | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Bachelor of Arts in Multimedia and Mass Communication (BA MMC) at Mulund College of Commerce — blending journalism, digital media, advertising, public relations, and multimedia production.',
};

export default function BAMMCPage() {
  return <BAMMCPageClient />;
}
