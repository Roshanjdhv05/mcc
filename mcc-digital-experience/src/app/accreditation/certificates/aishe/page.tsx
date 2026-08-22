import CertificatePdfPage from '../_components/CertificatePdfPage';

export const metadata = {
  title: 'AISHE Annual Submissions | MCC Accreditation',
  description: 'View AISHE annual submission reports of Mulund College of Commerce.',
};

export default function AisheCertPage() {
  return (
    <CertificatePdfPage
      title="AISHE"
      subtitle="All India Survey on Higher Education — Annual certificates and data submissions."
      pdfs={[
        { label: 'AISHE 2023–24', url: '/accreditation/AISHE/23-24.pdf' },
        { label: 'AISHE 2022–23', url: '/accreditation/AISHE/C-33510-CERTICICATE 2022-23.pdf' },
        { label: 'AISHE 2021–22', url: '/accreditation/AISHE/C-33510-CERTICICATE 2021-22.pdf' },
        { label: 'AISHE 2020–21', url: '/accreditation/AISHE/C-33510-CERTICICATE 2020-21.pdf' },
      ]}
    />
  );
}
