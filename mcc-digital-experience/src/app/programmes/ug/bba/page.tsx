import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BBA | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Bachelor of Business Administration (BBA) at Mulund College of Commerce.',
};

import BBAPageClient from './BBAPageClient';

export default function BBAPage() {
  return <BBAPageClient />;
}
