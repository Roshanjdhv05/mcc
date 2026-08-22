import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B.Com | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce at Mulund College of Commerce.',
};

import BComPageClient from './BComPageClient';

export default function CoursePage() {
  return <BComPageClient />;
}
