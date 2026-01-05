import DossierPage from '@/components/DossierPage';

export default function ResponsibleDisclosurePage() {
  return (
    <DossierPage
      title="Responsible Disclosure Policy"
      subtitle="Security Vulnerability Reporting Guidelines"
      classification="COMPLIANCE SUITE"
      sections={[
        {
          title: "DISCLOSURE OVERVIEW",
          content: [
            "G3TI welcomes responsible disclosure of security vulnerabilities from security researchers and the public.",
            "We are committed to working with the security community to protect our systems and users."
          ]
        },
        {
          title: "REPORTING GUIDELINES",
          content: [
            "Report vulnerabilities promptly upon discovery.",
            "Provide sufficient detail to reproduce the vulnerability.",
            "Allow reasonable time for remediation before public disclosure.",
            "Do not access or modify data beyond what is necessary to demonstrate the vulnerability."
          ]
        },
        {
          title: "OUR COMMITMENT",
          content: [
            "Acknowledge receipt of vulnerability reports within 48 hours.",
            "Provide regular updates on remediation progress.",
            "Credit researchers who follow responsible disclosure guidelines.",
            "Not pursue legal action against good-faith security researchers."
          ]
        }
      ]}
    />
  );
}
