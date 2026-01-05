import DossierPage from '@/components/DossierPage';

export default function SecurityNoticePage() {
  return (
    <DossierPage
      title="Security Notice"
      subtitle="Our Commitment to Security and Incident Response"
      classification="LEGAL"
      sections={[
        {
          title: "SECURITY COMMITMENT",
          content: [
            "G3TI is committed to maintaining the security of our systems and protecting user data.",
            "We implement industry-leading security practices and continuously monitor for threats."
          ]
        },
        {
          title: "SECURITY MEASURES",
          content: [
            "Encryption of data at rest and in transit.",
            "Multi-factor authentication for system access.",
            "Regular security assessments and penetration testing.",
            "24/7 security monitoring and incident response."
          ]
        },
        {
          title: "INCIDENT RESPONSE",
          content: [
            "In the event of a security incident, we will promptly investigate and take appropriate action.",
            "We will notify affected parties as required by applicable law.",
            "We maintain incident response procedures aligned with industry best practices."
          ]
        },
        {
          title: "REPORTING SECURITY ISSUES",
          content: [
            "If you discover a security vulnerability, please report it through our responsible disclosure program.",
            "We appreciate the security research community's efforts to help us maintain secure systems."
          ]
        }
      ]}
    />
  );
}
