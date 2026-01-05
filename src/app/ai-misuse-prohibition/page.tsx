import DossierPage from '@/components/DossierPage';

export default function AIMisuseProhibitionPage() {
  return (
    <DossierPage
      title="AI Misuse Prohibition Policy"
      subtitle="Preventing Harmful Applications of AI Technology"
      classification="COMPLIANCE SUITE"
      sections={[
        {
          title: "POLICY OVERVIEW",
          content: [
            "G3TI maintains strict prohibitions against the misuse of our AI technologies.",
            "This policy defines prohibited uses and enforcement mechanisms."
          ]
        },
        {
          title: "PROHIBITED USES",
          content: [
            "Development of offensive weapons or autonomous weapons systems.",
            "Mass surveillance without legal authorization.",
            "Discrimination based on protected characteristics.",
            "Manipulation of democratic processes.",
            "Violation of human rights or civil liberties."
          ]
        },
        {
          title: "ENFORCEMENT",
          content: [
            "Customer vetting and due diligence procedures.",
            "Contractual prohibitions on misuse.",
            "Technical controls to prevent unauthorized applications.",
            "Termination of access for policy violations."
          ]
        },
        {
          title: "REPORTING",
          content: [
            "Report suspected misuse to our compliance team.",
            "Whistleblower protections for good-faith reports.",
            "Investigation and remediation procedures."
          ]
        }
      ]}
    />
  );
}
