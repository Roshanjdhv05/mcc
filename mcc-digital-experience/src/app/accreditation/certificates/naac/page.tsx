import CertificatePdfPage from '../_components/CertificatePdfPage';

export const metadata = {
  title: 'NAAC Accreditation Certificate | MCC Accreditation',
  description: 'View the NAAC accreditation certificate of Mulund College of Commerce.',
};

export default function NaacCertPage() {
  return (
    <CertificatePdfPage
      title="NAAC Accreditation Certificate"
      pdfs={[
        { label: 'NAAC Accreditation Certificate', url: '/NACC ACCREDITATION CERTIFICATES.pdf' },
      ]}
    />
  );
}
