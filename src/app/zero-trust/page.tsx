import DossierPage from '@/components/DossierPage';

export default function ZeroTrustPage() {
  return (
    <DossierPage
      title="Zero Trust Security Architecture"
      subtitle="Never Trust, Always Verify"
      classification="COMPLIANCE SUITE"
      sections={[
        {
          title: "ZERO TRUST OVERVIEW",
          content: [
            "G3TI implements a comprehensive Zero Trust security architecture across all systems and operations.",
            "Our approach assumes no implicit trust and requires continuous verification of all users, devices, and systems."
          ]
        },
        {
          title: "ZERO TRUST PRINCIPLES",
          content: [
            "VERIFY EXPLICITLY: Always authenticate and authorize based on all available data points.",
            "LEAST PRIVILEGE ACCESS: Limit user access with just-in-time and just-enough-access.",
            "ASSUME BREACH: Minimize blast radius and segment access to limit lateral movement."
          ]
        },
        {
          title: "IMPLEMENTATION",
          content: [
            "Multi-factor authentication for all system access.",
            "Micro-segmentation of network resources.",
            "Continuous monitoring and validation.",
            "Encryption of data at rest and in transit."
          ]
        }
      ]}
    />
  );
}
