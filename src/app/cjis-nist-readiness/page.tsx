import DossierPage from '@/components/DossierPage';

export default function CJISNISTReadinessPage() {
  return (
    <DossierPage
      title="CJIS/NIST Readiness"
      subtitle="Criminal Justice and Cybersecurity Framework Compliance"
      classification="COMPLIANCE SUITE"
      sections={[
        {
          title: "COMPLIANCE OVERVIEW",
          content: [
            "G3TI maintains full alignment with Criminal Justice Information Services (CJIS) Security Policy and NIST Cybersecurity Framework requirements.",
            "Our systems are designed to meet the stringent security requirements of law enforcement and government agencies."
          ]
        },
        {
          title: "CJIS COMPLIANCE",
          content: [
            "Personnel security screening and training.",
            "Physical security controls for data centers and facilities.",
            "Access control and authentication requirements.",
            "Audit and accountability measures.",
            "Incident response procedures."
          ]
        },
        {
          title: "NIST FRAMEWORK ALIGNMENT",
          content: [
            "IDENTIFY: Asset management and risk assessment.",
            "PROTECT: Access control and data security.",
            "DETECT: Continuous monitoring and detection processes.",
            "RESPOND: Response planning and communications.",
            "RECOVER: Recovery planning and improvements."
          ]
        }
      ]}
    />
  );
}
