import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BBI | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Banking & Insurance) at Mulund College of Commerce.',
};

import BBIPageClient from './BBIPageClient';

export default function CoursePage() {
  return <BBIPageClient />;
}
