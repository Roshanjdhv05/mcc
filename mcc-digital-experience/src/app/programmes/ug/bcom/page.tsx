import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B.Com | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Bachelor of Commerce at Mulund College of Commerce.',
};

import BComPageClient from './BComPageClient';

export default function CoursePage() {
  return <BComPageClient />;
}
