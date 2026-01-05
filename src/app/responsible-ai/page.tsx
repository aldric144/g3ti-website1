import DossierPage from '@/components/DossierPage';

export default function ResponsibleAIPage() {
  return (
    <DossierPage
      title="Responsible AI Commitment"
      subtitle="Our Pledge to Ethical AI Development and Deployment"
      classification="COMPLIANCE SUITE"
      sections={[
        {
          title: "COMMITMENT STATEMENT",
          content: [
            "G3TI is committed to the responsible development and deployment of artificial intelligence technologies.",
            "We believe that AI's potential to protect humanity must be balanced with rigorous ethical standards."
          ]
        },
        {
          title: "RESPONSIBLE AI PRINCIPLES",
          content: [
            "BENEFICIAL PURPOSE: AI systems designed exclusively for protective and defensive purposes.",
            "HUMAN DIGNITY: Respect for human rights and dignity in all AI applications.",
            "SAFETY FIRST: Prioritizing safety in system design and deployment.",
            "CONTINUOUS IMPROVEMENT: Ongoing refinement of ethical practices."
          ]
        },
        {
          title: "ETHICAL GUIDELINES",
          content: [
            "No development of offensive AI capabilities.",
            "No sale of AI systems to entities that may misuse them.",
            "Transparent communication about AI capabilities and limitations.",
            "Active participation in industry ethical standards development."
          ]
        }
      ]}
    />
  );
}
