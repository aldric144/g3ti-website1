'use client'

import { DossierPage } from '@/components/DossierPage'

export default function ThreatArchitectureAddendumPage() {
  return (
    <DossierPage
      title="Threat Architecture Addendum"
      subtitle="Supplementary intelligence on emerging threat vectors and updated defensive protocols."
      category="intelligence"
      content={[
        "This addendum supplements the primary Threat Architecture Whitepaper with updated intelligence on emerging threat vectors identified through G3TI's continuous monitoring operations.",
        "Since the publication of the primary whitepaper, several new threat categories have emerged that require immediate attention from security professionals, law enforcement agencies, and enterprise security teams.",
        "The acceleration of AI capabilities has outpaced even our most aggressive projections. Threat actors are now deploying sophisticated multi-modal attacks that combine voice synthesis, visual deepfakes, and AI-generated text in coordinated campaigns.",
        "G3TI's defensive architectures have been updated to address these emerging threats, with new detection capabilities deployed across all platform modules.",
      ]}
      sections={[
        {
          title: "Emerging Threat Vectors",
          content: [
            "• Multi-Modal Deepfake Attacks: Coordinated use of voice, video, and text synthesis in single attack chains",
            "• AI-Powered Reconnaissance: Automated systems that map organizational vulnerabilities at unprecedented speed",
            "• Synthetic Relationship Building: Long-term AI-driven social engineering that builds trust over months",
            "• Algorithmic Insider Threats: AI systems designed to mimic legitimate user behavior patterns",
          ]
        },
        {
          title: "Updated Defensive Protocols",
          content: [
            "G3TI has deployed enhanced detection capabilities including:",
            "• Cross-modal authenticity verification",
            "• Behavioral baseline deviation detection",
            "• Relationship pattern anomaly identification",
            "• Temporal attack chain analysis",
          ]
        }
      ]}
    />
  )
}
