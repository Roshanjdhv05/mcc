'use client';
import { usePageTracker } from '@/hooks/usePageTracker';

export default function PageTrackerProvider() {
  usePageTracker();
  return null;
}
