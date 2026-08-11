import CertificatePdfPage from '../_components/CertificatePdfPage';

export const metadata = {
  title: 'NAAC Accreditation Certificate | MCC Accreditation',
  description: 'View the NAAC accreditation certificate of Mulund College of Commerce.',
};

export default function NaacCertPage() {
  return (
    <CertificatePdfPage
      title="NAAC Accreditation Certificate"
      subtitle="National Assessment and Accreditation Council — Grade A+ with CGPA 3.42 in the 3rd Cycle."
      pdfs={[
        { label: 'NAAC Accreditation Certificate', url: '/accreditation/NACC ACCREDITATION CERTIFICATES.pdf' },
      ]}
    />
  );
}
