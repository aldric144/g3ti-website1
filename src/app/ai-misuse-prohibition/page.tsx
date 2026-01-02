'use client'

import { DossierPage } from '@/components/DossierPage'

export default function AIMisuseProhibitionPage() {
  return (
    <DossierPage
      title="AI Misuse Prohibition Policy"
      subtitle="Strict prohibitions on misuse of G3TI AI systems."
      category="compliance"
      content={[
        "G3TI maintains strict prohibitions on the misuse of our AI systems. While our technology is designed for human protection, we recognize that powerful AI capabilities could potentially be misused. This policy establishes clear boundaries and enforcement mechanisms.",
        "Any use of G3TI systems outside the bounds of this policy is strictly prohibited and will result in immediate termination of access and potential legal action.",
        "We are committed to ensuring our technology is used only for its intended protective purposes.",
      ]}
      sections={[
        {
          title: "Prohibited Uses",
          content: [
            "G3TI systems may never be used for:",
            "• Surveillance of individuals without legal authority",
            "• Discrimination based on protected characteristics",
            "• Suppression of lawful speech or assembly",
            "• Harassment, stalking, or intimidation",
            "• Creating deepfakes or synthetic media for deception",
            "• Unauthorized access to personal information",
            "• Any purpose that violates human rights or dignity",
          ]
        },
        {
          title: "Enforcement",
          content: [
            "G3TI maintains robust enforcement mechanisms including:",
            "• Continuous monitoring of system usage",
            "• Automated detection of policy violations",
            "• Immediate suspension of access for violations",
            "• Cooperation with law enforcement for criminal misuse",
            "• Regular audits of all system deployments",
          ]
        }
      ]}
    />
  )
}
