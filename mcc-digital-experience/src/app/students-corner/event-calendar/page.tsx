import React from 'react';
import CalendarHero from '@/components/calendar/CalendarHero';
import MainCalendarGrid from '@/components/calendar/MainCalendarGrid';
import UpcomingEventsSidebar from '@/components/calendar/UpcomingEventsSidebar';

export const metadata = {
  title: 'Event Calendar | Mulund College of Commerce',
  description:
    'Stay updated with academic events, examinations, holidays, seminars, workshops, and cultural activities at Mulund College of Commerce.',
};

export default function EventCalendarPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <CalendarHero />

      {/* Main Calendar + Sidebar */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Calendar Grid */}
          <MainCalendarGrid />

          {/* Upcoming Events Sidebar */}
          <UpcomingEventsSidebar />
        </div>
      </div>
    </main>
  );
}
