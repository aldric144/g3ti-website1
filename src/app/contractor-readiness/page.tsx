import DossierPage from '@/components/DossierPage';

export default function ContractorReadinessPage() {
  return (
    <DossierPage
      title="Contractor Readiness Binder"
      subtitle="Federal Contracting Compliance and Capability Documentation"
      classification="INTELLIGENCE DOSSIER"
      sections={[
        {
          title: "CONTRACTOR OVERVIEW",
          content: [
            "Global 3 Technology & Intelligence™ (G3TI) maintains full readiness for federal contracting opportunities.",
            "This binder documents our compliance posture, capability statements, and partnership readiness for government agencies."
          ]
        },
        {
          title: "COMPLIANCE CERTIFICATIONS",
          content: [
            "FedRAMP Alignment: Pursuing FedRAMP authorization for cloud-based intelligence services.",
            "CJIS Compliance: Full alignment with Criminal Justice Information Services security requirements.",
            "NIST Framework: Adherence to NIST Cybersecurity Framework and AI Risk Management Framework."
          ]
        },
        {
          title: "CAPABILITY STATEMENT",
          content: [
            "G3TI provides autonomous protective intelligence solutions for federal, state, and local government agencies.",
            "Our platforms integrate seamlessly with existing infrastructure to enhance national security and protect communities.",
            "Core capabilities include threat detection, identity verification, fraud prevention, and intelligence fusion."
          ]
        },
        {
          title: "PARTNERSHIP READINESS",
          content: [
            "G3TI is prepared to engage in prime contractor and subcontractor arrangements.",
            "Our veteran-owned status qualifies for relevant set-aside programs.",
            "Contact our government relations team for partnership inquiries."
          ]
        }
      ]}
    />
  );
}
