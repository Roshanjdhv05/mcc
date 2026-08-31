import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B.COM (Accounting & Finance) | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Bachelor of Commerce in Accounting & Finance at Mulund College of Commerce.',
};

import BAFPageClient from './BAFPageClient';

export default function CoursePage() {
  return <BAFPageClient />;
}
