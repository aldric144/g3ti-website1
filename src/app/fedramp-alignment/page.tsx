import DossierPage from '@/components/DossierPage';

export default function FedRAMPAlignmentPage() {
  return (
    <DossierPage
      title="FedRAMP Alignment Packet"
      subtitle="Federal Risk and Authorization Management Program Compliance"
      classification="COMPLIANCE SUITE"
      sections={[
        {
          title: "FEDRAMP OVERVIEW",
          content: [
            "G3TI is pursuing FedRAMP authorization to provide cloud-based protective intelligence services to federal agencies.",
            "Our systems are designed to meet FedRAMP Moderate baseline security requirements."
          ]
        },
        {
          title: "SECURITY CONTROLS",
          content: [
            "Implementation of NIST SP 800-53 security controls.",
            "Continuous monitoring and vulnerability management.",
            "Incident response and contingency planning.",
            "Access control and identity management."
          ]
        },
        {
          title: "AUTHORIZATION PATH",
          content: [
            "Engagement with FedRAMP Program Management Office.",
            "Third-party assessment organization (3PAO) evaluation.",
            "Agency sponsorship for authorization.",
            "Continuous monitoring post-authorization."
          ]
        },
        {
          title: "CURRENT STATUS",
          content: [
            "G3TI is actively preparing for FedRAMP authorization.",
            "Contact our government relations team for current status updates and partnership opportunities."
          ]
        }
      ]}
    />
  );
}
