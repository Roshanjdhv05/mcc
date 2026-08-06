import IQACNav from '@/components/layout/IQACNav';

export default function IQACLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IQACNav />
      {children}
    </>
  );
}
