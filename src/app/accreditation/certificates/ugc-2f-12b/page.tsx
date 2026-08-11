import CertificatePdfPage from '../_components/CertificatePdfPage';

export const metadata = {
  title: 'UGC 2(f) & 12(B) Certificates | MCC Accreditation',
  description: 'View UGC 2(f) and 12(B) certificates of Mulund College of Commerce.',
};

export default function UGCCertPage() {
  return (
    <CertificatePdfPage
      title="UGC 2(f) & 12(B)"
      subtitle="University Grants Commission recognition certifying eligibility for grants and recognition of degrees."
      pdfs={[
        { label: 'UGC 2(f) Certificate', url: '/accreditation/2F.pdf' },
        { label: 'UGC 12(B) Certificate', url: '/accreditation/12b.pdf' },
      ]}
    />
  );
}
