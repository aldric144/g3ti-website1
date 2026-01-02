'use client'

import { DossierPage } from '@/components/DossierPage'

export default function AIGovernancePage() {
  return (
    <DossierPage
      title="AI Governance Framework"
      subtitle="G3TI's comprehensive framework for responsible AI development and deployment."
      category="compliance"
      content={[
        "G3TI is committed to the responsible development and deployment of artificial intelligence systems. Our AI Governance Framework establishes the principles, policies, and procedures that guide all AI-related activities across our organization.",
        "As a company building autonomous intelligence systems for human protection, we recognize the profound responsibility that comes with developing AI capabilities. Our governance framework ensures that our systems operate ethically, transparently, and in alignment with human values.",
        "This framework is designed to meet or exceed emerging regulatory requirements while maintaining the operational effectiveness required for protective intelligence missions.",
      ]}
      sections={[
        {
          title: "Core Governance Principles",
          content: [
            "• Human Oversight: All autonomous systems include human oversight mechanisms",
            "• Transparency: AI decision-making processes are documented and explainable",
            "• Accountability: Clear chains of responsibility for AI system outcomes",
            "• Fairness: Systems designed to minimize bias and ensure equitable treatment",
            "• Privacy: Data protection integrated into all AI system designs",
          ]
        },
        {
          title: "Governance Structure",
          content: [
            "G3TI maintains a dedicated AI Ethics Board that reviews all AI system deployments, monitors ongoing operations, and ensures compliance with our governance framework. The board includes external advisors with expertise in AI ethics, civil liberties, and national security.",
          ]
        }
      ]}
    />
  )
}
