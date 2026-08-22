import type { Metadata } from 'next';
import MScITPageClient from './MScITPageClient';

export const metadata: Metadata = {
  title: 'M.Sc. (IT) | Mulund College of Commerce',
  description: 'Master of Science (Information Technology) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return <MScITPageClient />;
}

