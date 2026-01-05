import DossierPage from '@/components/DossierPage';

export default function HumanProtectionPledgePage() {
  return (
    <DossierPage
      title="Human Protection Pledge"
      subtitle="Our Commitment to Protecting Humanity"
      classification="COMPLIANCE SUITE"
      sections={[
        {
          title: "THE PLEDGE",
          content: [
            "Global 3 Technology & Intelligence™ pledges to develop and deploy artificial intelligence exclusively for the protection of human beings.",
            "We will never create AI systems designed to harm, manipulate, or exploit people."
          ]
        },
        {
          title: "PROTECTION PRINCIPLES",
          content: [
            "HUMAN LIFE: Prioritize the protection of human life above all other considerations.",
            "VULNERABLE POPULATIONS: Special focus on protecting children, elderly, and vulnerable individuals.",
            "PRIVACY: Respect individual privacy while providing protective intelligence.",
            "DIGNITY: Uphold human dignity in all AI applications."
          ]
        },
        {
          title: "IMPLEMENTATION",
          content: [
            "All systems undergo ethical review before deployment.",
            "Regular assessment of system impact on protected populations.",
            "Stakeholder engagement in protection priority setting.",
            "Transparent reporting on protection outcomes."
          ]
        }
      ]}
    />
  );
}
