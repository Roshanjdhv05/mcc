import CertificatePdfPage from '../_components/CertificatePdfPage';

export const metadata = {
  title: 'NIRF Annual Submissions | MCC Accreditation',
  description: 'View NIRF annual submission reports of Mulund College of Commerce.',
};

export default function NirfCertPage() {
  return (
    <CertificatePdfPage
      title="NIRF"
      subtitle="National Institutional Ranking Framework — Annual data submission reports."
      pdfs={[
        { label: 'NIRF 2024–25', url: '/accreditation/NIRF/NIRF Report  2024-25.pdf' },
        { label: 'NIRF 2023–24', url: '/accreditation/NIRF/NIRF Report  2023-24.pdf' },
        { label: 'NIRF 2022–23', url: '/accreditation/NIRF/NIRF Report  2022-23.pdf' },
        { label: 'NIRF 2021–22', url: '/accreditation/NIRF/NIRF Report  2021-22.pdf' },
        { label: 'NIRF 2020–21', url: '/accreditation/NIRF/NIRF Report  2020-21.pdf' },
        { label: 'NIRF 2019–20', url: '/accreditation/NIRF/NIRF Report  2019-20.pdf' },
      ]}
    />
  );
}
