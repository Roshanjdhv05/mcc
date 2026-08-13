import CertificatePdfPage from '../_components/CertificatePdfPage';

export const metadata = {
  title: 'Autonomy Certificate | MCC Accreditation',
  description: 'View the Conferment of Autonomy certificate of Mulund College of Commerce.',
};

export default function AutonCertPage() {
  return (
    <CertificatePdfPage
      title="Autonomy Certificate"
      subtitle="Certificate of autonomous status conferred by UGC and University of Mumbai."
      pdfs={[
        { label: 'Conferment of Autonomy', url: '/Conferment of Autonomy (Grant of Autonomy).pdf' },
      ]}
    />
  );
}
