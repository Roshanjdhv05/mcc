import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BFM | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Bachelor of Commerce (Financial Markets) at Mulund College of Commerce.',
};

import BFMPageClient from './BFMPageClient';

export default function CoursePage() {
  return <BFMPageClient />;
}
