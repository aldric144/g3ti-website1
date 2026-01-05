import DossierPage from '@/components/DossierPage';

export default function DataGovernancePage() {
  return (
    <DossierPage
      title="Data Governance Policy"
      subtitle="Standards for Data Collection, Processing, and Protection"
      classification="COMPLIANCE SUITE"
      sections={[
        {
          title: "DATA GOVERNANCE OVERVIEW",
          content: [
            "G3TI maintains rigorous data governance standards that ensure the responsible handling of all information processed by our systems.",
            "Our data governance framework addresses collection, processing, storage, and disposal of data."
          ]
        },
        {
          title: "DATA PRINCIPLES",
          content: [
            "MINIMIZATION: Collect only data necessary for protective intelligence purposes.",
            "PURPOSE LIMITATION: Use data only for stated and authorized purposes.",
            "ACCURACY: Maintain data accuracy and enable correction mechanisms.",
            "SECURITY: Protect data with appropriate technical and organizational measures."
          ]
        },
        {
          title: "COMPLIANCE ALIGNMENT",
          content: [
            "GDPR compliance for applicable data processing activities.",
            "CCPA compliance for California resident data.",
            "HIPAA compliance for healthcare-related data.",
            "CJIS compliance for criminal justice information."
          ]
        }
      ]}
    />
  );
}
