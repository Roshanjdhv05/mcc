import React from 'react';
import AutonomyNav from './_components/AutonomyNav';

export default function AutonomousLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutonomyNav />
      {children}
    </>
  );
}
