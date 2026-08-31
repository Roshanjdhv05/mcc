import type { Metadata } from 'next';
import { Download, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Smart Forms Center | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Download and submit all college forms — admission, examination, scholarship, certificates.',
};

import FormsPageClient from './FormsPageClient';

export default function FormsPage() {
  return <FormsPageClient />;
}
