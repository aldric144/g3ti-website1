import DossierPage from '@/components/DossierPage';

export default function AIGovernancePage() {
  return (
    <DossierPage
      title="AI Governance Framework"
      subtitle="Principles and Practices for Responsible AI Development"
      classification="COMPLIANCE SUITE"
      sections={[
        {
          title: "GOVERNANCE OVERVIEW",
          content: [
            "G3TI maintains a comprehensive AI governance framework that ensures our autonomous protective intelligence systems operate within ethical, legal, and operational boundaries.",
            "Our governance structure addresses the unique challenges of deploying AI in security and intelligence contexts."
          ]
        },
        {
          title: "GOVERNANCE PRINCIPLES",
          content: [
            "HUMAN OVERSIGHT: All autonomous systems operate under human supervision and control.",
            "TRANSPARENCY: AI decision-making processes are documented and explainable.",
            "ACCOUNTABILITY: Clear chains of responsibility for AI system outcomes.",
            "FAIRNESS: Systems designed to avoid bias and ensure equitable treatment."
          ]
        },
        {
          title: "IMPLEMENTATION",
          content: [
            "Regular audits of AI system performance and outcomes.",
            "Continuous monitoring for bias and unintended consequences.",
            "Stakeholder engagement in governance decisions.",
            "Alignment with emerging regulatory frameworks."
          ]
        }
      ]}
    />
  );
}
